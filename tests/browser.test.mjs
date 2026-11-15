import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {chromium, expect} from '@playwright/test';

const markers = [
  {lat:51.79204,lng:3.87355,icon:'fa-solid fa-van-shuttle',title:'Brouwersdam Camping',markerColor:'black',iconColor:'white'},
  ...[[51.74906,3.82455,'Brouwersdam'],[51.69783,3.81475,'fritureluur'],[51.6497,3.92099,'Zierikzee'],[51.64719,3.92742,'Grand Café de Werk'],[51.78582,3.86603,"Strandbude 't Gorsje"]].map(([lat,lng,title],i)=>({lat,lng,title,text:i+1,markerColor:'green',iconColor:'white'}))
];
const settings = {lat:51.7397,lng:3.8715,zoom:11,scale:true,provider:{tilestanza:'https://tile.openstreetmap.org/{z}/{x}/{y}.png',options:{maxZoom:17,attribution:'© OpenStreetMap'}}};
// Theme regression: Pico/Blades applies button styles to Leaflet's role=button.
const theme = `<style>[role=button]{box-sizing:border-box;padding:12px 20px;border:1px solid purple;border-radius:4px;background:purple;line-height:24px;transition:all .2s}[role=button]:focus{box-shadow:0 0 0 3px #8428df66}</style>`;
const html = `<link rel="stylesheet" href="/assets/map-marker-leaflet-v2.css">${theme}<div class="mml-map" style="height:530px"><script type="application/json">${JSON.stringify(settings)}</script><script type="application/json" class="mml-marker-data">${JSON.stringify(markers)}</script></div><div class="mml-map" style="height:300px"><script type="application/json">${JSON.stringify({...settings,lat:51,lng:3})}</script><script type="application/json" class="mml-marker-data">${JSON.stringify([{lat:51,lng:3,text:0,markerColor:'red',draggable:true,title:'<img src=x onerror=alert(1)>'}])}</script></div><script type="module" src="/assets/map-marker-leaflet-v2.js"></script>`;

const mapboxSettings = {...settings,provider:{name:'mapbox',tilestanza:'https://api.tiles.mapbox.com/v4/{variant}/{z}/{x}/{y}.png?access_token={apikey}',options:{maxZoom:24,variant:'mapbox.streets',apikey:'pk.test-placeholder'}}};
const mapboxHTML=`<link rel="stylesheet" href="/assets/map-marker-leaflet-v2.css"><div class="mml-map" style="height:530px"><script type="application/json">${JSON.stringify(mapboxSettings)}</script><script type="application/json" class="mml-marker-data">${JSON.stringify(markers)}</script></div><script type="module" src="/assets/map-marker-leaflet-v2.js"></script>`;

test('bundled Leaflet 2: reference, independent maps, colors, icons, text, repeated cached HTML', async () => {
 const server = createServer(async (req,res) => {
   if (req.url === '/') {res.setHeader('Content-Type','text/html; charset=utf-8');res.end(html);return;}
   if (req.url === '/mapbox') {res.setHeader('Content-Type','text/html; charset=utf-8');res.end(mapboxHTML);return;}
   if (!/^\/assets\/[a-zA-Z0-9./_-]+$/.test(req.url)) {res.writeHead(404).end();return;}
   try {res.setHeader('Content-Type',req.url.endsWith('.svg')?'image/svg+xml':req.url.endsWith('.css')?'text/css':'text/javascript');res.end(await readFile(new URL('..'+req.url,import.meta.url)));} catch {res.writeHead(404).end();}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 let browser;
 try {
   browser = await chromium.launch({headless:true});
   const page = await browser.newPage();
   // Offline deterministic tile substitute: no bulk requests to OSM.
   await page.route('https://tile.openstreetmap.org/**',route=>route.fulfill({contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a6S8AAAAASUVORK5CYII=','base64')}));
   const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error') errors.push(m.text());});
   for(let visit=0;visit<2;visit++) {
     await page.goto(`http://127.0.0.1:${server.address().port}`);
     if (process.env.MML_THEME_CSS) await page.addStyleTag({content:await readFile(process.env.MML_THEME_CSS,'utf8')});
     await page.waitForSelector('.mml-map[data-mml-ready="true"]');
     assert.equal(await page.locator('[data-mml-ready="true"]').count(),2);
     assert.equal(await page.locator('.mml-map').nth(0).locator('.mml-marker').count(),6);
     assert.equal(await page.locator('.mml-map').nth(1).locator('.mml-marker').count(),1);
     assert.equal(await page.locator('.fa-solid.fa-van-shuttle').count(),1);
     assert.deepEqual(await page.locator('.mml-map').nth(0).locator('.mml-pin-content').allTextContents(),['','1','2','3','4','5']);
     assert.equal(await page.locator('.mml-map').nth(1).locator('.mml-pin-content').textContent(),'0');
     assert.equal(await page.locator('.leaflet-control-scale').count(),2);
     assert.equal(await page.locator('[title="Strandbude \'t Gorsje"]').count(),1);
     await page.locator('.mml-map').nth(0).locator('[title="Brouwersdam"]').click();
     await expect(page.locator('.leaflet-popup-content')).toHaveText('Brouwersdam');
     assert.equal(await page.locator('.mml-map').nth(1).locator('.leaflet-popup').count(),0);
     // Visible pin, Leaflet hit box and popup tip must share the same position.
     const marker = page.locator('.mml-map').nth(0).locator('[title="Brouwersdam"]');
     await expect.poll(async()=>marker.evaluate(el=>{
       const box=el.getBoundingClientRect();
       const pin=el.querySelector('.mml-pin-shape').getBoundingClientRect();
       const tip=el.closest('.mml-map').querySelector('.leaflet-popup-tip-container').getBoundingClientRect();
       return Math.max(Math.abs(box.x-pin.x),Math.abs(box.y-pin.y),Math.abs(box.width-pin.width),Math.abs(box.height-pin.height),Math.abs(tip.x+tip.width/2-(box.x+box.width/2)),Math.abs(tip.bottom-box.top));
     })).toBeLessThan(2);
     assert.equal(await marker.evaluate(el=>getComputedStyle(el).boxShadow),'none');
     assert.ok(await marker.evaluate(el=>Number(getComputedStyle(el.querySelector('.mml-pin-content')).zIndex)>Number(getComputedStyle(el.querySelector('svg')).zIndex)));
     await expect(page.locator('.leaflet-popup')).toHaveCSS('opacity','1');
     if (process.env.MML_SCREENSHOT) {
       await page.screenshot({path:process.env.MML_SCREENSHOT,fullPage:true});
     }
     await page.locator('.leaflet-popup-close-button').click();
     await expect(page.locator('.leaflet-popup')).toHaveCount(0);
     await page.keyboard.press('Tab');
     await marker.focus();
     assert.equal(await marker.evaluate(el=>getComputedStyle(el).outlineStyle),'solid');
     await page.keyboard.press('Enter');
     await expect(page.locator('.leaflet-popup-content')).toHaveText('Brouwersdam');
     await page.locator('.leaflet-popup-close-button').click();
     await expect(page.locator('.leaflet-popup')).toHaveCount(0);
     await marker.focus();
     await page.keyboard.press('Space');
     await expect(page.locator('.leaflet-popup-content')).toHaveText('Brouwersdam');
     await page.locator('.leaflet-popup-close-button').click();
     await expect(page.locator('.leaflet-popup')).toHaveCount(0);
     const secondMarker=page.locator('.mml-map').nth(1).locator('.mml-marker');
     await secondMarker.click();
     await expect(page.locator('.leaflet-popup-content')).toHaveText('<img src=x onerror=alert(1)>');
     assert.equal(await page.locator('.leaflet-popup-content img').count(),0);
     await page.locator('.leaflet-popup-close-button').click();
     await expect(page.locator('.leaflet-popup')).toHaveCount(0);
     await secondMarker.focus();
     const beforeDrag=await secondMarker.boundingBox();
     await page.keyboard.press('ArrowRight');
     await expect.poll(async()=>Math.abs((await secondMarker.boundingBox()).x-beforeDrag.x)).toBeGreaterThan(0);
     assert.ok(await page.locator('.leaflet-tile').evaluateAll(tiles=>tiles.length>0 && tiles.every(tile=>tile.getAttribute('referrerpolicy')==='strict-origin-when-cross-origin')));
     await page.evaluate(async()=>{const m=await import('/assets/map-marker-leaflet-v2.js');m.initializeMaps();});
     assert.equal(await page.locator('.leaflet-tile-pane').count(),2);
   }
   const touch=await browser.newPage({hasTouch:true,viewport:{width:390,height:844}});
   await touch.route('https://tile.openstreetmap.org/**',route=>route.fulfill({contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a6S8AAAAASUVORK5CYII=','base64')}));
   touch.on('pageerror',e=>errors.push(e.message));
   await touch.goto(`http://127.0.0.1:${server.address().port}`);
   await touch.locator('.mml-map').nth(0).locator('[title="Brouwersdam"]').tap();
   await expect(touch.locator('.leaflet-popup-content')).toHaveText('Brouwersdam');
   await touch.close();
   const mapbox=await browser.newPage();
   mapbox.on('pageerror',e=>errors.push(e.message));
   mapbox.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
   const tileURLs=[];
   await mapbox.route('https://api.mapbox.com/**',route=>{
     tileURLs.push(route.request().url());
     return route.fulfill({contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a6S8AAAAASUVORK5CYII=','base64')});
   });
   await mapbox.goto(`http://127.0.0.1:${server.address().port}/mapbox`);
   await mapbox.waitForSelector('[data-mml-ready="true"]');
   await expect(mapbox.locator('.mml-mapbox-logo img')).toBeVisible();
   await expect.poll(()=>mapbox.locator('.mml-mapbox-logo img').evaluate(img=>img.complete && img.naturalWidth>0)).toBe(true);
   await expect.poll(()=>tileURLs.length).toBeGreaterThan(0);
   assert.ok(tileURLs.every(url=>url.includes('/styles/v1/mapbox/streets-v12/tiles/512/10/')));
   assert.equal(await mapbox.locator('.leaflet-tile').first().evaluate(tile=>tile.style.width),'512px');
   assert.equal(await mapbox.locator('.mml-marker').count(),6);
   await mapbox.locator('[title="Brouwersdam"]').click();
   await expect(mapbox.locator('.leaflet-popup-content')).toHaveText('Brouwersdam');
   assert.match(await mapbox.locator('.mml-mapbox-feedback').getAttribute('href'),/feedback\/#\//);
   if (process.env.MML_SCREENSHOT) await mapbox.screenshot({path:process.env.MML_SCREENSHOT.replace('.png','-mapbox.png'),fullPage:true});
   await mapbox.close();
   const values = await page.evaluate(async()=>{
     const m=await import('/assets/map-marker-leaflet-v2.js');
     return Object.keys(m.colors).map(markerColor=>{
       const icon=m.markerIcon({markerColor,text:'<img onerror=alert(1)>',iconColor:'red'}).createIcon();
       return [markerColor,icon.querySelector('.mml-pin').style.getPropertyValue('--mml-color'),icon.querySelectorAll('img').length];
     });
   });
   assert.equal(values.length,20);assert.ok(values.every(([,color,images])=>color && images===0));
   assert.deepEqual(errors,[]);
 } finally {await browser?.close();await new Promise(resolve=>server.close(resolve));}
});
