import {LeafletMap, TileLayer, Marker, DivIcon, ScaleControl} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './markers.css';

export const colors = {red:'#d63e2a',orange:'#f69730',green:'#72b026',blue:'#38aadd',purple:'#d252b9',darkred:'#a23336',darkblue:'#005a8b',darkgreen:'#728224',darkpurple:'#5b396b',cadetblue:'#436978',lightred:'#ff8e7f',beige:'#ffcb92',lightgreen:'#bbf970',lightblue:'#8adaff',pink:'#ff91ea',salmon:'#ff8a80',white:'#fff',lightgray:'#ddd',gray:'#575757',black:'#303030'};
export function markerIcon(data) {
  const body = document.createElement('span');
  body.className = 'mml-pin';
  body.style.setProperty('--mml-color', colors[data.markerColor] || colors.blue);
  // Own SVG geometry stays entirely inside the 32 x 42 px Leaflet hit box.
  const shape = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  shape.setAttribute('viewBox', '0 0 32 42');
  shape.setAttribute('aria-hidden', 'true');
  shape.classList.add('mml-pin-shape');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M16 0C7.16 0 0 7.16 0 16C0 27 16 42 16 42S32 27 32 16C32 7.16 24.84 0 16 0Z');
  shape.append(path);
  body.append(shape);
  const content = document.createElement('span');
  content.className = 'mml-pin-content';
  content.style.color = CSS.supports('color', data.iconColor || '') ? data.iconColor : 'white';
  if (data.text !== '' && data.text !== null && data.text !== undefined) {
    content.textContent = String(data.text);
  } else if (data.icon) {
    const icon = document.createElement('i');
    const classes = String(data.icon).split(/\s+/).filter(x => /^[a-zA-Z0-9_-]+$/.test(x));
    if (!classes.some(x => /^(fa|fas|far|fab|fa-solid|fa-regular|fa-brands|glyphicon)$/.test(x))) classes.unshift('fa');
    if (classes.length === 2 && !classes[1].startsWith('fa-')) classes[1] = `fa-${classes[1]}`;
    icon.classList.add(...classes);
    if (data.spin) icon.classList.add('mml-spin');
    icon.setAttribute('aria-hidden', 'true');
    content.append(icon);
  }
  body.append(content);
  return new DivIcon({html:body,className:'mml-marker',iconSize:[32,42],iconAnchor:[16,42],popupAnchor:[0,-42]});
}
const maps = new WeakMap();
export function initializeMaps(root = document) {
  for (const element of root.querySelectorAll('.mml-map')) {
    if (maps.has(element)) continue;
    const payload = element.querySelector('script[type="application/json"]');
    if (!payload) continue;
    let map;
    try {
      const data = JSON.parse(payload.textContent);
      map = new LeafletMap(element).setView([data.lat,data.lng],data.zoom);
      new TileLayer(data.provider.tilestanza, data.provider.options).addTo(map);
      if (data.scale) new ScaleControl().addTo(map);
      for (const group of element.querySelectorAll('.mml-marker-data')) {
        for (const marker of JSON.parse(group.textContent)) {
          const layer = new Marker([marker.lat,marker.lng], {icon:markerIcon(marker),title:marker.title || '',draggable:marker.draggable});
          if (marker.title) {
            const description = document.createElement('div');
            description.textContent = String(marker.title);
            layer.bindPopup(description, {offset:[0,0]});
          }
          layer.addTo(map);
        }
      }
      maps.set(element,map);
      element.dataset.mmlReady = 'true';
      const observer = new ResizeObserver(() => map.invalidateSize());
      observer.observe(element);
    } catch (error) {
      map?.remove();
      console.error('Map Marker Leaflet: initialization failed', error);
    }
  }
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => initializeMaps(), {once:true});
else initializeMaps();
