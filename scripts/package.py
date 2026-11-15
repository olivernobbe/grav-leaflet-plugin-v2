#!/usr/bin/env python3
"""Package only reviewed plugin sources/assets; never include local config or .git."""
import hashlib
import json
from pathlib import Path
import sys
import tarfile
import zipfile
root = Path(__file__).resolve().parents[1]
version = json.loads((root / 'package.json').read_text())['version']
output = Path(sys.argv[1] if len(sys.argv) > 1 else f'/private/tmp/map-marker-leaflet-v2-{version}.tar.gz')
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
with zipfile.ZipFile(update_output, 'w', zipfile.ZIP_DEFLATED) as archive:
    for name in ['map-marker-leaflet-v2.php', 'blueprints.yaml',
                 'assets/map-marker-leaflet-v2.js', 'assets/map-marker-leaflet-v2.css',
                 'assets/MAPBOX-ATTRIBUTION.txt', 'defaults.yaml',
                 'shortcodes/MapLeafletShortcodeV2.php'] + [p.relative_to(root).as_posix() for p in sorted((root / 'assets/images').glob('mapbox-logo-*.svg'))]:
        archive.write(root / name, name)
print(update_output)
checksums = output.with_name(f'map-marker-leaflet-v2-{version}-SHA256SUMS.txt')
checksums.write_text(''.join(hashlib.sha256(p.read_bytes()).hexdigest() + '  ' + p.name + '\n'
                             for p in [output, zip_output, update_output]))
print(checksums)
