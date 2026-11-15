# Map Marker Leaflet V2 — 2.0.0-beta.5

Erste Vorabversion des Grav-2-/Admin2-Forks mit Leaflet 2.0.0-beta.4.

## Änderungen

- Beide vorhandenen Shortcodes bleiben erhalten: `[map-leaflet]` und `[a-markers]`.
- ES-Modul-Build mit fertigen JS-/CSS-Dateien; kein npm-Build auf dem Server nötig.
- Strukturierte JSON-Kartendaten, unabhängige Karten auf derselben Seite.
- 20 Markerfarben, Icon-/Nummernmarker, Drag/Spin und Klartext-Klick-Popups.
- Korrekte Pin-/Popupausrichtung und sichtbarer Tastaturfokus trotz Theme-Buttonstilen.
- Animation respektiert die Systemeinstellung „Bewegung reduzieren“.
- Moderne Mapbox-Style-Anbindung einschließlich Logo/Attribution und alter Stilaliase.
- Bestehende Konfiguration des Originalplugins wird als Vorgabe gelesen; V2 speichert
  eigene Einstellungen unter `user/config/plugins/map-marker-leaflet-v2.yaml`.

## Installation

Das **vollständige Plugin-ZIP** entpacken und den enthaltenen Ordner
`map-marker-leaflet-v2` nach `user/plugins/` hochladen. Originalplugin deaktivieren,
V2 aktivieren, Grav-Cache leeren. Bestehende Benutzerkonfiguration nicht ersetzen.
Das kleine Update-ZIP ist ausschließlich für bereits installierte V2-Betas gedacht.

Vor Updates den funktionierenden V2-Ordner samt Konfiguration sichern. Das Original
ist unter Grav 2 keine zugesicherte Rückfalllösung und bleibt deaktiviert.

## Teststand

Manuell bestätigt: Referenzkarte Brouwersdam mit sechs Markern, bis zu drei Karten,
Farbpalette, Icons/Nummern einschließlich 0, Klick-/Tipp-Popups, Drag/Spin,
reduzierte Bewegung, warmer Grav-Cache und Admin2-Einstellungsspeicherung.

Bestätigte Provider: OpenStreetMap sowie Mapbox Streets, Outdoors, Light, Dark und
Satellite. Umgebung laut Eigentümer: Grav CLI 2.2.29, PHP 8.3.36, Shortcode Core
6.2.8, Admin2 2.2.13, API 1.1.18. Safari mobil auf iPhone 17 Pro Max mit iOS 27.2:
Pinch-Zoom und Tipp-Popups funktionieren. Lokale Chromium-/Quelltests ergänzen die
manuelle Abnahme, ersetzen jedoch keine vollständige Browser-/Providermatrix.

## Bekannte Einschränkungen

- Thunderforest, Carto und Wikimedia sind noch nicht getestet.
- Gemeinsames Variantenfeld zeigt 0–9; für Mapbox gelten nur 0–4. Andere Werte
  fallen auf Streets zurück. Anbieterabhängige Auswahl mit Stilnamen folgt später.
- Das Theme muss die gewünschte Iconfont selbst laden, etwa Font Awesome.
- Popupbeschreibungen sind Klartext, kein HTML oder Markdown.
- Leaflet 2 ist selbst noch eine Vorabversion. Diese Veröffentlichung ist als
  **Pre-release** zu markieren; keine pauschale Zusage für produktive Installationen.

## Maintainer und Herkunft

Oliver Nobbe — grav-leaflet-v2@nobbe.eu.

Fork von Map Marker Leaflet, ursprünglich von Richard N Hainsworth (finanalyst):
https://github.com/finanalyst/grav-plugin-map-marker-leaflet

Upstream-Historie und MIT-Lizenz bleiben erhalten. Leaflet-Lizenz und Herkunft des
Mapbox-Logos sind im Paket enthalten. Keine API-Schlüssel in den Release-Dateien.
