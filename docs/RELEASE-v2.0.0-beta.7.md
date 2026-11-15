# Map Marker Leaflet V2 — 2.0.0-beta.7

## CARTO correction

Beta 6 used an obsolete/incomplete raster path for some default variants. Beta 7
uses CARTO's documented `https://basemaps.cartocdn.com/rastertiles/{variant}/...`
endpoint, the seven variants listed in CARTO's current raster documentation, and
the required `?key={apikey}` parameter. Old built-in URLs inherited from V1 or
beta 6 are converted at render time; old `rastertiles/` variant prefixes are
normalized for the new endpoint. The local provider configuration is not rewritten.

## Grav-Abnahme

1. Den Inhalt des Update-ZIPs in `user/plugins/map-marker-leaflet-v2/` hochladen
   und vorhandene Plugin-Dateien überschreiben. `user/config/plugins/` nicht ersetzen.
2. Grav-Cache leeren.
3. Admin2 → Plugins → Map Marker Leaflet V2 öffnen. Prüfen, dass CARTO ausgewählt
   werden kann, die Variantenübersicht die CARTO-Indizes 0–6 zeigt und der CARTO-Key
   noch gespeichert ist. Falls nicht, eigenen Key eintragen und speichern.
4. Eine CARTO-Karte mit Variantenindex 0 (Positron/light) laden. Bei Erfolg zusätzlich
   Index 4 (Voyager) testen. Die Karte muss Kacheln und die CARTO/OSM-Attribution zeigen.
5. OpenStreetMap und Mapbox kurz gegenprüfen.

CARTO-Anfragen und Providerverfügbarkeit wurden vom Maintainer noch nicht live
abgenommen. Bei einem Fehlschlag den Browser-Netzwerkstatus einer Kachel notieren
(z. B. 401/403/404); keine URL mit dem API-Key weitergeben.

Quelle für Endpoint und Varianten:
https://www.carto.com/basemaps/
