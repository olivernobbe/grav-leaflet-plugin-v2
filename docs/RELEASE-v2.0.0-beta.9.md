# Map Marker Leaflet V2 — 2.0.0-beta.9

## CARTO-Zoom

CARTO liefert Rasterdaten bis zur in der Providerkonfiguration gesetzten nativen
Zoomstufe. Beta 9 setzt diesen Wert als Leaflet-Option `maxNativeZoom` und erlaubt
weitere Zoomstufen bis 24. Leaflet skaliert dort die letzte verfügbare Kachel;
zusätzliche Kartendetails entstehen dadurch nicht.

## Grav-Abnahme

1. Das Update-ZIP in den vorhandenen V2-Pluginordner übertragen und Dateien
   überschreiben. `user/config/plugins/` nicht ersetzen.
2. Grav-Cache leeren, dieselbe CARTO-Karte öffnen und über die bisherige Grenze
   hinaus zoomen. Die Kacheln sollen sichtbar bleiben, auch wenn sie pixeliger sind.
3. OSM und Mapbox kurz gegenprüfen.

Die CARTO-Quelle liefert oberhalb der nativen Zoomstufe keine zusätzlichen Details.
