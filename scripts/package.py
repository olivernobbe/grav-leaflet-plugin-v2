#!/usr/bin/env python3
"""Package only reviewed plugin sources/assets; never include local config or .git."""
import hashlib
import json
import re
import argparse
from pathlib import Path
import sys
import tarfile
import zipfile
root = Path(__file__).resolve().parents[1]
version = json.loads((root / 'package.json').read_text())['version']
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('output', nargs='?', help='Output tar.gz path')
parser.add_argument('--base-archive', type=Path,
                    help='Previous full plugin ZIP to diff against; defaults to the previous beta ZIP beside the output')
args = parser.parse_args()
output = Path(args.output or f'/private/tmp/map-marker-leaflet-v2-{version}.tar.gz')
entries = ['map-marker-leaflet-v2.php', 'map-marker-leaflet-v2.yaml', 'defaults.yaml', 'blueprints.yaml',
           'templates', 'shortcodes', 'assets', 'js', 'build.mjs', 'package.json',
           'package-lock.json', 'README.md', 'LICENSE', 'CHANGELOG.md', 'docs',
           'fixtures', 'tests', 'scripts']
with tarfile.open(output, 'w:gz') as archive:
    for name in entries:
        archive.add(root / name, arcname='map-marker-leaflet-v2/' + name)
print(output)
print(hashlib.sha256(output.read_bytes()).hexdigest() + '  ' + output.name)

zip_output = output.with_name(output.name.removesuffix('.tar.gz') + '.zip')
with zipfile.ZipFile(zip_output, 'w', zipfile.ZIP_DEFLATED) as archive:
    for name in entries:
        path = root / name
        for file in sorted(path.rglob('*')) if path.is_dir() else [path]:
            if file.is_file():
                archive.write(file, 'map-marker-leaflet-v2/' + file.relative_to(root).as_posix())
print(zip_output)

update_output = output.with_name(f'map-marker-leaflet-v2-update-{version}.zip')
base_archive = args.base_archive
if base_archive is None:
    match = re.fullmatch(r'(.+-beta\.)(\d+)', version)
    if not match or int(match.group(2)) < 2:
        raise SystemExit('Pass --base-archive with the previous full plugin ZIP to create a changed-files update.')
    previous_version = f'{match.group(1)}{int(match.group(2)) - 1}'
    base_archive = output.with_name(f'map-marker-leaflet-v2-{previous_version}.zip')
if not base_archive.is_file():
    raise SystemExit(f'Previous full plugin ZIP not found: {base_archive}. Pass --base-archive explicitly.')

def archive_files(archive):
    result = {}
    with zipfile.ZipFile(archive) as source:
        for name in source.namelist():
            prefix = 'map-marker-leaflet-v2/'
            if name.startswith(prefix) and not name.endswith('/'):
                result[name[len(prefix):]] = hashlib.sha256(source.read(name)).hexdigest()
    return result

previous_files = archive_files(base_archive)
current_files = archive_files(zip_output)
changed_files = sorted(name for name, digest in current_files.items()
                       if previous_files.get(name) != digest)
removed_files = sorted(previous_files.keys() - current_files.keys())
with zipfile.ZipFile(update_output, 'w', zipfile.ZIP_DEFLATED) as archive:
    for name in changed_files:
        archive.write(root / name, name)
    if removed_files:
        archive.writestr('UPDATE-REMOVALS.txt', '\n'.join(removed_files) + '\n')
print(update_output)
print(f'Changed files compared with {base_archive.name}: {len(changed_files)}')
for name in changed_files:
    print(f'  {name}')
if removed_files:
    print(f'Removed files listed in UPDATE-REMOVALS.txt: {len(removed_files)}')
checksums = output.with_name(f'map-marker-leaflet-v2-{version}-SHA256SUMS.txt')
checksums.write_text(''.join(hashlib.sha256(p.read_bytes()).hexdigest() + '  ' + p.name + '\n'
                             for p in [output, zip_output, update_output]))
print(checksums)
