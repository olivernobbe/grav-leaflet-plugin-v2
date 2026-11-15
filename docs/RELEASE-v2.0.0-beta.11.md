# Map Marker Leaflet V2 — 2.0.0-beta.11

## CARTO Raster-Zoomgrenze

CARTO bestätigt beim direkten Abruf einer Rasterkachel, dass der verwendete
Basemaps-Key Rasterkacheln bis Zoomstufe 18 liefert. Beta.11 begrenzt deshalb
sowohl Leaflets Raster-TileLayer als auch die Karte selbst auf Zoom 18.
Zoomversuche darüber hinaus werden verhindert. Damit entstehen weder abgelehnte
Zoom-19-Anfragen noch ein leerer grauer Kartenbereich.

Die übrigen Kartenanbieter behalten ihre bisherigen Zoom-Einstellungen.

## Grav-Abnahme

Nach dem Update CARTO auswählen und bis Zoom 18 zoomen. Die Karte soll dort
Kartendetails zeigen; weiterer Zoom muss enden, ohne graue Fläche. OSM, Mapbox
und Thunderforest verwenden weiterhin ihre vorhandenen Anbietergrenzen.
