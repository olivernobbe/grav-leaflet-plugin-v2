import {test} from 'node:test';
import assert from 'node:assert/strict';
import {prepareProvider} from '../js/providers.js';
const oldURL='https://api.tiles.mapbox.com/v4/{variant}/{z}/{x}/{y}.png?access_token={apikey}';
test('Mapbox: legacy styles upgrade; 512px tiles align; custom URLs stay intact',()=>{
 for (const [legacy,modern] of Object.entries({'mapbox.streets':'mapbox/streets-v12','mapbox.outdoors':'mapbox/outdoors-v12','mapbox.light':'mapbox/light-v11','mapbox.dark':'mapbox/dark-v11','mapbox.satellite':'mapbox/satellite-v9'})) {
  const input={name:'mapbox',tilestanza:oldURL,options:{variant:legacy,apikey:'pk.test-placeholder',maxZoom:24}};
  const result=prepareProvider(input);
  assert.match(result.url,/styles\/v1\/\{variant\}\/tiles\/512/);
  assert.equal(result.options.variant,modern);
  assert.equal(result.options.tileSize,512);
  assert.equal(result.options.zoomOffset,-1);
  assert.equal(result.options.minZoom,1);
  assert.equal(result.options.maxZoom,22);
  assert.equal(input.options.variant,legacy);
  const modernInput=prepareProvider({...input,options:{...input.options,variant:modern}});
  assert.equal(modernInput.url,result.url);
  assert.equal(modernInput.options.variant,modern);
 }
 const custom={name:'mapbox',tilestanza:'https://api.mapbox.com/v4/me.custom/{z}/{x}/{y}.png?access_token={apikey}',options:{apikey:'pk.test-placeholder'}};
 assert.equal(prepareProvider(custom).url,custom.tilestanza);
 assert.equal(prepareProvider(custom).options.tileSize,undefined);
 const osm={tilestanza:'https://tile.openstreetmap.org/{z}/{x}/{y}.png',options:{maxZoom:17}};
 assert.deepEqual(prepareProvider(osm),{url:osm.tilestanza,options:osm.options,isMapbox:false});
});

test('CARTO raster: stop map and tile requests at zoom 18',()=>{
 const carto={name:'carto',tilestanza:'https://basemaps.cartocdn.com/rastertiles/{variant}/{z}/{x}/{y}.png?key={apikey}',options:{variant:'voyager',apikey:'test',maxZoom:20}};
 const result=prepareProvider(carto);
 assert.equal(result.options.maxNativeZoom,18);
 assert.equal(result.options.maxZoom,18);
 assert.equal(result.mapMaxZoom,18);
 assert.match(result.url,/rastertiles\/\{variant\}/);
});

test('standard OpenStreetMap: cap map and tile requests at zoom 19',()=>{
 const osm={name:'openstreetmap',tilestanza:'https://tile.openstreetmap.org/{z}/{x}/{y}.png',options:{maxZoom:17}};
 const result=prepareProvider(osm);
 assert.equal(result.options.maxNativeZoom,19);
 assert.equal(result.options.maxZoom,19);
 assert.equal(result.mapMaxZoom,19);
});
