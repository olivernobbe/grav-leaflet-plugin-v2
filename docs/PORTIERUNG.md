# Portierungsstand

Aktueller Kandidat: **2.0.0-beta.4**, Branch `feat/grav2-leaflet2`.
[Abnahme und Releasevorbereitung](BETA-RELEASE.md) ist der aktuelle Teststand.

## Ausgangspunkt und Kompatibilität

Basis: Upstream df687aa, Plugin 1.1.2, Webpack 4 / Leaflet ^1.6.0 /
ExtraMarkers 1.1.0. Upstream-Historie und MIT-Lizenz bleiben erhalten.
Auf ausdrücklichen Benutzerwunsch wurde der ursprüngliche Auftrag zum identischen
Slug geändert: V2 heißt jetzt map-marker-leaflet-v2 und ist neben dem Original
installierbar. Nur eines der Plugins darf die gemeinsamen Shortcodes registrieren.
V2 ist bei Erstinstallation deaktiviert und blockiert seine Registrierung, wenn
laut Konfiguration das Original noch aktiv ist.

Beide Shortcodes bleiben unverändert: map-leaflet und a-markers. V2 führt Defaults,
Originalkonfiguration und eigene Einstellungen zusammen. Das Original-YAML bleibt
unverändert; Admin2 speichert eigene V2-Einstellungen separat. Der historische
Schlüssel preffered sowie Providerdefinitionen bleiben kompatibel.

## Referenz und Integrationsprüfung

Öffentlich ausgeliefertes Original zum Entwicklungsbeginn:
https://www.avanti-unterwegs.de/de/blog/brouwersdam

Bestätigt: Zentrum 51.7397/3.8715, Zoom 11, OSM/maxZoom 17, Maßstab,
schwarzer Shuttle-Pin mit weißem FA-Icon und fünf grüne Nummernmarker.
Font Awesome 7.0.1 wurde vom Theme geladen. Das Original setzte native title-
Tooltips; auf Benutzerwunsch gibt es in V2 zusätzlich Klick-Popups.

Vor dem Leaflet-Umbau geprüft: offizieller Shortcode-Core-develop-Quellcode,
PluginsInitialized / ThemeInitialized / onShortcodeHandlers und Registrierung
über registerAllShortcodes. Die vom Benutzer gezeigte installierte Implementierung
bestätigt dieselbe Verzeichnisregistrierung. Tatsächliche Shortcodeausgabe und
sechs Marker wurden inzwischen durch Benutzer bestätigt.

Admin2-Blueprint nutzt einfache toggle/select/text-Felder. Doppelte bedingte
preffered-Definitionen wurden entfernt; beide Provider-Key-Felder sind sichtbar.
Providerindex bleibt numerisch. Anzeigen/Aktivieren des Plugins ist bestätigt;
Speichern und Wiederöffnen der Providerkonfiguration noch explizit abnehmen.

## Leaflet und eigene Assets

Leaflet 2.0.0-beta.4 exakt im Lockfile; benannte ESM-Importe und öffentliche APIs.
Leaflet-Quelldateien werden nicht bearbeitet. esbuild bündelt Leaflet und unseren
Code in assets/map-marker-leaflet-v2.js sowie die Styles in der gleichnamigen CSS.
Der Einstieg heißt js/map-marker-leaflet-v2.js; Leaflets BSD-Lizenz ist mitgeliefert.

ExtraMarkers 1.1.0 erklärt Leaflet <2 als Peer-Abhängigkeit und verwendet alte
Factories. Seine 20 Farben und Optionen wurden mit Originaltemplates und
Referenz verglichen. Eigene DivIcons mit SVG-Pinform erhalten Farben, Icons,
Nummern, Spin und Drag. Die Optik ist nicht identisch zu den alten Sprites.

Karten- und Markerparameter werden als JSON statt als generierter JavaScripttext
übergeben. JSON_HEX_* verhindert Scriptabschluss im Payload; HTML-Attribute sind
escaped, Texte werden im DOM per textContent gesetzt. Ungültige Marker werden
übersprungen. Separate DOM-Elemente erlauben mehrere Karten ohne gemeinsame ID.
Module/CSS werden auch bei gecachtem Seiteninhalt auf jeder Frontendanfrage
registriert; JS bleibt außerhalb der Grav-Konkatenationspipeline.

## Optionen

| Option | Stand |
|---|---|
| lat/lng/zoom/scale | Referenz funktioniert auf Benutzerinstanz |
| mehrere Karten ohne mapname | lokal getestet; manuell offen |
| mapname/classes/width/height | implementiert; Theme-Maße manuell prüfen |
| 20 Markerfarben | lokal zugeordnet; Palette manuell offen |
| icon/iconColor/text, 0 und 1–5 | lokal geprüft, Referenzmarker manuell bestätigt |
| title | Hover und Klartext-Klick-Popup; neue Ausrichtung noch manuell bestätigen |
| draggable/spin/Gruppenicon | implementiert; Interaktion manuell offen |
| variant/style/preffered | erhalten; ungültige Variante fällt auf erste Vorgabe zurück |
| Provider-/API-Key-Konfiguration | erhalten; OSM ist erste Abnahmebasis |
| warmer Grav-Cache und Admin2-Speichern | noch explizit bestätigen |

## Testgrenzen und Betrieb

Lokal kein PHP/Composer und kein laufender Docker-Daemon. PHP wurde statisch,
Browsercode mit Chromium geprüft; tatsächliche Grav-Ausführung erfolgt manuell
beim Benutzer. PHP-Version laut Testcontainerlog 8.3.36. Genaue übrige Versionen
noch erfassen. Keine Coolify-/Backendzugriffe durch den Entwickler.

Bind-Mount-Rechte wurden beim Benutzer für config/accounts/data/pages korrigiert;
SFTP-Benutzer darf den V2-Pluginordner schreiben. Probleme beim Beitragsspeichern
sind nach dessen Rückmeldung behoben. Der fehlende Kartenblock wurde aus Backup
wiederhergestellt; seine Verlustursache ist ungeklärt. Keine produktiven
Konfigurationen, privaten Schlüssel oder Benutzerkontodaten im Repository.

## Quellen

- https://github.com/getgrav/grav-plugin-shortcode-core/tree/develop
- https://learn.getgrav.org/2/admin-panel
- https://github.com/Leaflet/Leaflet/blob/main/MIGRATION.md
- node_modules/leaflet/src/layer/marker/DivIcon.js, Icon.js, Marker.js und Popup.js
  des exakt gepinnten Pakets (lokal geprüft)

Repositoryname: grav-leaflet-plugin-v2; Forgejo-Ziel und Releaseablauf siehe
BETA-RELEASE.md. Veröffentlichungsstatus über die Git-Remotes prüfen.
