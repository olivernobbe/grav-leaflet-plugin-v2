# Map Marker Leaflet V2 — 2.0.0-beta.8

## Korrektur

Die Browserprüfung zeigte `provider: carto`, aber eine effektive Tile-URL auf
`maps.wikimedia.org`. Beta 8 erkennt diese konkrete, widersprüchliche geerbte
Konfiguration und verwendet dann CARTOs Standard-Raster-URL. CARTO-Stil und
lokaler API-Key bleiben erhalten.

## Grav-Abnahme

1. Das Update-ZIP in den vorhandenen Ordner `user/plugins/map-marker-leaflet-v2/`
   übertragen und Plugin-Dateien überschreiben. `user/config/plugins/` beibehalten.
2. Grav-Cache leeren und die Kartenseite neu laden.
3. Admin2-Einstellung CARTO und gespeicherten Key unverändert lassen. In der
   Browserkonsole muss die Kartenkonfiguration `provider: carto` und eine URL mit
   `basemaps.cartocdn.com/rastertiles/` zeigen. Die URL darf keinen echten Key
   enthalten, wenn sie geteilt wird.
4. Im Netzwerk-Tab müssen Kachel-Anfragen an `basemaps.cartocdn.com` erscheinen.
   Bei Erfolg Karte und Attribution prüfen.

Der tatsächliche CARTO-Kacheldienst wurde weiterhin nicht vom Maintainer live
getestet. Den HTTP-Status bei einem Fehler mitteilen, niemals die vollständige
URL mit API-Key.
