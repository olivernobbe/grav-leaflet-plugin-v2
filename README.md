# Map Marker Leaflet V2

Grav 2 / Admin2 development plugin, version **2.0.0-beta.4**, Leaflet **2.0.0-beta.4**.

## Installation auf der Testinstanz

1. `map-marker-leaflet-v2-2.0.0-beta.4.zip` herunterladen und entpacken.
2. Den Ordner **map-marker-leaflet-v2** nach **user/plugins/** hochladen.
3. Im Admin das Original **Map Marker Leaflet** deaktivieren, dann **Map Marker Leaflet V2** aktivieren.
4. Grav-Cache im Admin leeren und die Kartenseite öffnen.

Kein Terminal, npm oder Build nötig. Das Original bleibt als eigener Ordner erhalten.
Zum Rückbau V2 deaktivieren, Original aktivieren und Cache leeren.
Die ursprüngliche Konfiguration `user/config/plugins/map-marker-leaflet.yaml` bleibt
unverändert. V2 liest deren Karten-/Provideroptionen als Vorgabe. Nach dem Speichern
von V2-Einstellungen stehen eigene Werte in `user/config/plugins/map-marker-leaflet-v2.yaml`.
V2 ist nach dem Upload zunächst deaktiviert. Solange das Original aktiviert ist,
registriert V2 keine Karten und meldet den Konflikt im Grav-Log.

Die Shortcodes `[map-leaflet]` und `[a-markers]` bleiben unverändert. Bestehende
Beiträge brauchen keine Anpassung. Die Referenz ist in `fixtures/brouwersdam.md`
mit einer zweiten Karte enthalten; `fixtures/palette.md` enthält alle 20 Farben.

## Update von beta.2 / beta.3

Am einfachsten den Inhalt des neuen ZIPs in den vorhandenen V2-Ordner hochladen
und vorhandene Dateien ersetzen; Benutzerkonfiguration außerhalb des Pluginordners
beibehalten. Für ein kleines Update enthält `map-marker-leaflet-v2-update-2.0.0-beta.4.zip`
nur diese vier Dateien (innerhalb des bestehenden Pluginordners ersetzen):

- `map-marker-leaflet-v2.php`
- `blueprints.yaml`
- `assets/map-marker-leaflet-v2.js`
- `assets/map-marker-leaflet-v2.css`

Danach Grav-Cache im Admin leeren und die Beitragsseite neu laden. Plugin-Code und
CSS sind eindeutig nach dem Plugin benannt; der Bundle enthält unverändertes
Leaflet und unseren eigenen Initialisierungscode. Leaflet-Quelldateien werden
nicht editiert. Der Quell-Einstieg heißt `js/map-marker-leaflet-v2.js`.

Siehe [Beta-Abnahme und Releasevorbereitung](docs/BETA-RELEASE.md).

## Optionen

Karte: lat, lng, zoom, scale, width, height, classes, mapname, variant und style.
Standardgröße: 100% × 530px. Bei classes definiert das Theme die Größe.
Unterstützte Maße: px, %, vh, vw, rem, em und 0; komplexe Ausdrücke über CSS-Klassen.
Mehrere Karten ohne mapname funktionieren unabhängig; explizite IDs eindeutig wählen.

Marker: lat/lng erforderlich; markerColor, iconColor, icon, text, title, draggable,
spin als Einzelwerte bzw. Gruppenoptionen. Text einschließlich 0 hat Vorrang vor
Icons. Titel erscheinen beim Hover und als Popup nach einfachem Klick. Keine HTML-Ausführung im Text.
Die 20 bisherigen Farboptionen bleiben erhalten; CSS-Pins haben eine leicht andere
Optik als die früheren ExtraMarkers-Sprites.

Das Theme muss die verwendete Iconfont laden, beispielsweise Font Awesome für
`fa-solid fa-van-shuttle`. Diese Schrift wird nicht mitgeliefert. Es gibt kein
globales `L`. Grav-Cache kann aktiv bleiben; JS wird als ES-Modul außerhalb der
Grav-JS-Pipeline eingebunden. Providerdefinitionen einschließlich des historischen
Schlüssels `preffered` bleiben erhalten; alte Mapbox-/Wikimedia-URLs sind nicht
als funktionsfähig zertifiziert. Zunächst mit OpenStreetMap abnehmen.

Siehe auch [Leaflet-2-Migrationsprüfung](docs/LEAFLET2-AUDIT.md).

## Entwicklung

```sh
npm ci
npm run build
npx playwright install chromium
npm test
python3 scripts/package.py
```

Build und Browser-/Quellprüfungen lokal bestanden. Tatsächliche PHP-/Grav-Ausführung,
warmer Grav-Cache und Anzeigen/Speichern in Admin2 sind noch manuell abzunehmen.
Siehe [Abnahme](docs/COOLIFY-ABNAHME.md) und [Portierungsstand](docs/PORTIERUNG.md).

## Repositories

Der Repositoryname für Forgejo und GitHub lautet **grav-leaflet-plugin-v2**.

- [Forgejo-Repository](https://git.nobbe.eu/OliverNobbe/grav-leaflet-plugin-v2) (privat)
- Ein nativer GitHub-Fork ist vorgesehen; dessen Adresse wird nach dem Anlegen ergänzt.

Der Installationsordner und Konfigurationsschlüssel bleiben **map-marker-leaflet-v2**.

## Maintainer und Herkunft

**Oliver Nobbe** pflegt diesen Fork und die Portierung auf Grav 2, Admin2 und
Leaflet 2. Kontakt: [grav-leaflet-v2@nobbe.eu](mailto:grav-leaflet-v2@nobbe.eu).

Das ursprüngliche Plugin **Map Marker Leaflet** stammt von **Richard N Hainsworth
(finanalyst)**. Dieser Fork baut auf dessen Quellcode auf; die Upstream-Git-Historie
bleibt erhalten.

- [Original-Quellcode von Richard N Hainsworth](https://github.com/finanalyst/grav-plugin-map-marker-leaflet)
- [Ursprüngliche MIT-Lizenz](https://github.com/finanalyst/grav-plugin-map-marker-leaflet/blob/master/LICENSE)

Der ursprüngliche Copyrightvermerk und die MIT-Lizenz stehen unverändert in
[LICENSE](LICENSE). Leaflets BSD-Lizenz liegt in `assets/LEAFLET-LICENSE.txt`.
