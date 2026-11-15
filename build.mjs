import {copyFile} from 'node:fs/promises';
import {build} from 'esbuild';
await build({entryPoints:['js/map-marker-leaflet-v2.js'], bundle:true, format:'esm', minify:true,
  outfile:'assets/map-marker-leaflet-v2.js', loader:{'.png':'file','.svg':'file'}, assetNames:'images/[name]-[hash]',
  legalComments:'eof', target:['es2022']});
await copyFile('node_modules/leaflet/LICENSE', 'assets/LEAFLET-LICENSE.txt');
