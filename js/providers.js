const mapboxStyles = {
  'mapbox.streets':'mapbox/streets-v12',
  'mapbox.outdoors':'mapbox/outdoors-v12',
  'mapbox.light':'mapbox/light-v11',
  'mapbox.dark':'mapbox/dark-v11',
  'mapbox.satellite':'mapbox/satellite-v9'
};
const legacyMapbox = /^https:\/\/api(?:\.tiles)?\.mapbox\.com\/v4\/\{variant\}\/\{z\}\/\{x\}\/\{y\}\.png\?access_token=\{apikey\}$/;
const modernMapbox = /^https:\/\/api\.mapbox\.com\/styles\/v1\//;
export function prepareProvider(provider) {
  const options = {...provider.options};
  let url = provider.tilestanza;
  // Upgrade only the original built-in style endpoint. Custom raster tileset
  // URLs are preserved; the v4 Raster Tiles API itself is still valid.
  if (legacyMapbox.test(url) && (Object.hasOwn(mapboxStyles, options.variant) || Object.values(mapboxStyles).includes(options.variant))) {
    url = 'https://api.mapbox.com/styles/v1/{variant}/tiles/512/{z}/{x}/{y}?access_token={apikey}';
  }
  const isMapbox = modernMapbox.test(url) || provider.name === 'mapbox';
  if (modernMapbox.test(url)) {
    options.variant = mapboxStyles[options.variant] || options.variant;
    if (/\/tiles\/512\//.test(url)) {
      options.tileSize = 512;
      options.zoomOffset = -1;
      options.minZoom = 1;
    }
    options.maxZoom = Math.min(Number(options.maxZoom) || 22, 22);
  }
  return {url, options, isMapbox};
}
