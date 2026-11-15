# Map Marker Leaflet V2 — 2.0.0-beta.12

## OpenStreetMap-Zoomgrenze

Die Standard-OpenStreetMap-Karte auf `tile.openstreetmap.org` ist in der
offiziellen OSM-Website bis Zoom 19 konfiguriert. Beta.12 setzt die maximale
Zoomstufe der Karte und der Rasterkacheln ebenfalls auf 19. Zuvor lag der
Plugin-Standard bei 17; gespeicherte Providerwerte konnten darunter bleiben.

Die OSMF-Tile-Richtlinie garantiert keine Verfügbarkeit und erlaubt Drosselung
bei übermäßiger Nutzung. Für normale interaktive Kartennutzung ist die
Standardgrenze 19 vorgesehen.

CARTO bleibt separat auf Zoom 18 begrenzt. Andere Provider sind unverändert.

## Grav-Abnahme

Mit OpenStreetMap bis Zoom 19 zoomen und prüfen, dass die Karte dort sichtbar
bleibt und weiterer Zoom endet. Im Netzwerk-Tab dürfen OSM-Kachel-URLs keine
Zoomstufe über `/19/` anfordern.
