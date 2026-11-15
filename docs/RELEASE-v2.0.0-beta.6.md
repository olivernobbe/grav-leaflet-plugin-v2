# Map Marker Leaflet V2 — 2.0.0-beta.6

## Änderungen

- Admin2 zeigt die eingebauten Provider-Varianten in ihrer nullbasierten Reihenfolge.
- Der Variantenindex ist ein nicht-negatives Zahlenfeld ohne globale Obergrenze.
- CARTO-Basemap-Standard-URLs enthalten den API-Key-Parameter `key`.
- Auch übernommene CARTO-URLs ohne Key-Platzhalter erhalten diesen Parameter.
- Admin2 bietet ein lokales Feld für den CARTO-Basemap-API-Key.
- Der CARTO-Key wird nicht versioniert und muss in der lokalen Plugin-Konfiguration gesetzt werden.

## Grav-Abnahme

1. Das kleine Update-ZIP in den vorhandenen Ordner `user/plugins/map-marker-leaflet-v2`
   übertragen und Dateien überschreiben. Die V2-Benutzerkonfiguration beibehalten.
2. Grav-Cache leeren und Admin2 → Plugins → Map Marker Leaflet V2 öffnen.
3. Prüfen, dass der Variantenindex als Zahlenfeld erscheint und darunter die
   Standardvarianten samt Indizes gelistet sind. CARTO-Key-Feld muss sichtbar sein.
4. Einstellungen speichern und erneut öffnen. Vorhandene Provider- und Markeroptionen
   müssen erhalten bleiben.
5. OSM und Mapbox erneut kurz prüfen.
6. Für CARTO einen eigenen Basemap-Key bei
   https://carto.com/basemaps/apikey/ anfordern, im CARTO-Dashboard nach Möglichkeit
   auf `www.avanti-unterwegs.de` beschränken und lokal im CARTO-Key-Feld eintragen.
   Danach CARTO-Stilindex 0 oder 6 speichern, Cache leeren und eine Karte laden.
   Kacheln, Attribution und fehlendes API-Key-Wasserzeichen prüfen.

Thunderforest und Wikimedia bleiben ungetestet. Die im Admin angezeigten Werte sind
Plugin-Standardkonfigurationen und keine Garantie für die aktuelle Verfügbarkeit
beim Anbieter. Keine API-Keys in Screenshots, Logs oder Repository speichern.
