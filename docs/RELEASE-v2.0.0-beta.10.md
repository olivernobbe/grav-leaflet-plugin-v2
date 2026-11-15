# Map Marker Leaflet V2 — 2.0.0-beta.10

## CARTO Raster-Zoomgrenze

CARTO bestätigte beim direkten Aufruf einer Zoom-19-Rasterkachel, dass Rasterkacheln
für den verwendeten Basemaps-Key nur bis Zoom 18 verfügbar sind. Das Plugin setzt
`maxNativeZoom: 18`; bei höheren Karten-Zoomstufen vergrößert Leaflet die Kacheln
von Stufe 18, statt CARTO mit nicht verfügbaren Zoom-19-Anfragen aufzurufen.

Der Karten-Zoom bleibt bis 24 möglich. Oberhalb von 18 entstehen dadurch keine
zusätzlichen Kartendetails.

## Grav-Abnahme

Das ist eine gezielte Providerkorrektur. Nach Installation bitte im CARTO-Stil
über Zoom 18 hinaus zoomen und im Netzwerk-Tab prüfen, dass CARTO-Anfragen auf
`/18/...` bleiben und Kacheln sichtbar bleiben. OSM, Mapbox und Thunderforest
waren in vorherigen Betas manuell bestätigt; diese Betas ändern deren Verhalten
nicht.
