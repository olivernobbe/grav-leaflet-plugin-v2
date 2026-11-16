# Map Marker Leaflet V2

Grav 2 / Admin2 beta plugin, version **2.0.0-beta.14**, Leaflet **2.0.0-beta.4**.

## Installation auf der Testinstanz

1. `map-marker-leaflet-v2-2.0.0-beta.14.zip` herunterladen und entpacken.
2. Den Ordner **map-marker-leaflet-v2** nach **user/plugins/** hochladen.
3. Im Admin das Original **Map Marker Leaflet** deaktivieren, dann **Map Marker Leaflet V2** aktivieren.
4. Grav-Cache im Admin leeren und die Kartenseite öffnen.

Kein Terminal, npm oder Build nötig. Das Original bleibt als eigener Ordner erhalten.
Das Original bleibt deaktiviert: Der Eigentümer bewertet V1 unter Grav 2 nicht als
verlässliche Rückfalllösung. Vor zukünftigen Updates den funktionierenden V2-Ordner
und die eigene Plugin-Konfiguration sichern.
Die ursprüngliche Konfiguration `user/config/plugins/map-marker-leaflet.yaml` bleibt
unverändert. V2 liest deren Karten-/Provideroptionen als Vorgabe. Nach dem Speichern
von V2-Einstellungen stehen eigene Werte in `user/config/plugins/map-marker-leaflet-v2.yaml`.
V2 ist nach dem Upload zunächst deaktiviert. Solange das Original aktiviert ist,
registriert V2 keine Karten und meldet den Konflikt im Grav-Log.

Die Shortcodes `[map-leaflet]` und `[a-markers]` bleiben unverändert. Bestehende
Beiträge brauchen keine Anpassung. Die Referenz ist in `fixtures/brouwersdam.md`
mit einer zweiten Karte enthalten; `fixtures/palette.md` enthält alle 20 Farben.

## Update auf beta.14

Das Update-ZIP `map-marker-leaflet-v2-update-2.0.0-beta.14.zip` in den
vorhandenen V2-Ordner hochladen und die Datei ersetzen. Es enthält nur die
geänderten Dateien. Die Benutzerkonfiguration außerhalb des Pluginordners
beibehalten. Danach Grav-Cache leeren und die Kartenseite neu laden.

Beta 14 macht den Hintergrund hinter dem Mapbox-Logo transparent. Logo und
Größe bleiben unverändert. Details: [Beta-14-Änderungen](docs/RELEASE-v2.0.0-beta.14.md).

Siehe [Beta-9-Änderungen und Grav-Abnahme](docs/RELEASE-v2.0.0-beta.9.md).

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
Schlüssels `preffered` bleiben erhalten. OpenStreetMap und alle fünf mitgelieferten
Mapbox-Stile sind auf der Benutzerinstanz getestet; siehe [Mapbox-Test](docs/MAPBOX-TEST.md).
Thunderforest und CARTO wurden vom Eigentümer getestet. Wikimedia Maps wird wegen
der Nutzungsbedingungen nicht unterstützt. Für Thunderforest und CARTO ist jeweils
ein eigener API-Key erforderlich.
CARTO-Basemap-Keys können
unter [carto.com/basemaps/apikey](https://carto.com/basemaps/apikey/) beantragt und
auf die eigene Website beschränkt werden. Im Admin stehen die Standardvarianten
mit ihren nullbasierten Indizes; eigene `providers.<anbieter>.variants`-Listen
ändern diese Zuordnung.

Siehe auch [Leaflet-2-Migrationsprüfung](docs/LEAFLET2-AUDIT.md).

## Entwicklung

```sh
npm ci
npm run build
npx playwright install chromium
npm test
python3 scripts/package.py
```

Build und Browser-/Quellprüfungen lokal bestanden. Der Eigentümer bestätigt
Kartenfunktionen, warmen Grav-Cache und Anzeigen/Speichern der Plugin-Einstellungen
in Admin2. Umgebung: Grav CLI 2.2.29, PHP 8.3.36, Shortcode Core 6.2.8,
Admin2 2.2.13, API 1.1.18. Safari-Mobiltest: iPhone 17 Pro Max, iOS 27.2.
Siehe [Abnahme](docs/COOLIFY-ABNAHME.md) und [Portierungsstand](docs/PORTIERUNG.md).

## Repositories

Der Repositoryname für Forgejo und GitHub lautet **grav-leaflet-plugin-v2**.

- [Forgejo-Repository](https://git.nobbe.eu/OliverNobbe/grav-leaflet-plugin-v2) (privat)
- [GitHub-Fork](https://github.com/olivernobbe/grav-leaflet-plugin-v2) (öffentlich)
- [GitHub-Releases und Installationspakete](https://github.com/olivernobbe/grav-leaflet-plugin-v2/releases)
- [Fehler und Verbesserungsvorschläge](https://github.com/olivernobbe/grav-leaflet-plugin-v2/issues)

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
