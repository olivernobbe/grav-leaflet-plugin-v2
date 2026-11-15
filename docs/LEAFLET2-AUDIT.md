# Leaflet-2-Migrationsprüfung für Plugin 2.0.0-beta.4

Prüfung: 2026-11-15. Maßgeblich ist das exakt gepinnte Paket leaflet@2.0.0-beta.4,
nicht der bewegliche Entwicklungsstand main. Zusätzlich wurden der aktuelle
Migrationsleitfaden und die Release Notes bis einschließlich beta.4 gelesen.

Ergebnis: kein zusätzlicher konkreter API-Migrationsfehler im verwendeten
Plugin-Code gefunden. Dies ist keine Zusage, dass sämtliche Leaflet-Optionen als
Shortcode verfügbar oder alle Verhaltensänderungen auf allen Geräten geprüft sind.
Der Audit hat Tests/Dokumentation ergänzt, keinen weiteren Laufzeitfix erfordert.

## Abgleich mit dem Migrationsleitfaden

| Abschnitt | Befund im eigenen Code |
|---|---|
| 1 Module/Imports | Benannte Imports aus leaflet, erlaubter CSS-Import, type=module, kein globales L oder Default-Import. |
| 2 Konstruktoren | new LeafletMap, TileLayer, Marker, DivIcon; keine alten Factories. |
| 3 Flache Namen | new ScaleControl; keine Control.Scale-Nutzung. |
| 4 Pointer Events | Keine eigenen alten mouse*/keypress-Listener. Popup nutzt bindPopup; Eingabe verarbeitet Leaflet. |
| 5 DefaultIcon | Eigene DivIcons; keine PNG-Pfad-Hacks oder Änderungen an Leaflet-Prototypen. |
| 6 Defaults | Optionen pro Instanz, keine prototype.options-Manipulation. |
| 7 Klassen | Keine eigenen Leaflet-Unterklassen oder Class.extend/initialize-Aufrufe. |
| 8 Hilfsfunktionen | Native DOM-Methoden, keine entfernten Leaflet-Utilities oder Browser-Flags. |
| 9 Kleine Änderungen | Koordinaten vor Übergabe numerisch geprüft; eigener Popup-Anker, keine Tooltip-Workarounds. Geänderte Defaults siehe unten. |
| 10 TypeScript | Eigener Code ist JavaScript; keine @types/leaflet-Abhängigkeit. |
| 11 Dualversion | Nicht vorgesehen; V2 bündelt ausschließlich die gepinnte Leaflet-Version. |
| 12 Hooks | Keine eigenen Leaflet-Init-Hooks. |
| 13 Interna | Keine Aufrufe privater Leaflet-Methoden oder entfernten internen Eigenschaften. |
| 14 Plugintypen | Keine Typaugmentationen. |

## Geänderte Defaults und Verhalten

Unser Konstruktor setzt nur Zentrum/Zoom; die Kartenoptionen werden nicht pauschal
auf alte Werte zurückgesetzt. Die neuen Vorgaben werden deshalb bewusst übernommen:

- inertiaMaxSpeed: 1400; kein eigener Override, kein Trägheitsbenchmark durchgeführt.
- tapHold: aktiv; Leaflet verarbeitet einen Long-Press als contextmenu-Ereignis.
  Das Plugin bindet daran keine Aktion. Benutzer meldet keine sichtbare Reaktion
  in mobilem Safari; die Ereignisauslösung selbst wurde nicht instrumentiert.
- Tile-referrerPolicy: Leaflet setzt strict-origin-when-cross-origin. Der Test
  prüft das Attribut am Tile-IMG, nicht den effektiven Referrer einer realen
  Provideranfrage. Keine eigene Policy-Änderung im Plugin.
- detectRetina ist nicht aktiviert. Die neue 1.5-DPR-Schwelle und Native-Zoom-
  Anpassungen wirken daher hier nicht. Die bestehende {r}-URL-Ersetzung ist eine
  separate Leaflet-Funktion; Carto-/Retina-Provider noch manuell prüfen.
- PinchZoom wird über Leaflets Standardhandler genutzt; kein veralteter touchZoom-
  Optionsname im eigenen Code. Tatsächliche Pinch-Geste noch offen.
- Leaflet übernimmt Fokus/ARIA und Eingabe. Plugin setzt role nicht selbst und
  erhält einen sichtbaren Tastaturfokus trotz Theme-Reset.
- Popup/Tooltip-Vererbung und Richtungsänderungen: keine instanceof-Layer-Tests,
  keine Leaflet-Tooltips und kein tooltipAnchor; der Hovertext ist HTML-title.
  Klick-Popup verwendet die öffentliche bindPopup-API und einen eigenen popupAnchor.
- CSS-Änderungen an Kartenisolation, Drag-Klassen und Textselektion erfordern hier
  keine alten Workarounds. Eigene Marker berücksichtigen Theme-Buttonpadding und
  Leaflets SVG-Stapelfolge. Keine globale Änderung von Leaflet-Styles/Quellcode.

Canvas, Polylines/Polygone, GeoJSON, WMS, eigene Projektionen, Tooltiprichtungen,
LayersControl sowie flyTo werden vom Plugin nicht verwendet. Die dazu gehörenden
Migrationspunkte und Beta-Bugfixes erfordern hier keine Anpassungen.

## Neue Features sind nicht automatisch Plugin-Optionen

FullscreenControl, translate, Marker.rotation sowie weitere Map-/Layeroptionen
können in Leaflet 2 vorhanden sein, sind aber nicht als neue Shortcodeparameter
verdrahtet. Ebenso werden preferCanvas oder alte mouseEventTo*-Methoden nicht
unterstützt; auch das ursprüngliche Plugin bot dafür keine eigene Schnittstelle.
Die vorhandenen Karten-/Markeroptionen stehen in README.md. Es besteht kein
Anspruch auf einen vollständigen Durchgriff auf alle Leaflet-Optionen.

## Prüfungen und verbleibende Grenzen

Browser-Regressionsprüfung erfolgreich: Klick-, Enter- und Space-Popups,
Markerbewegung per Pfeiltaste, emulierter Touch-Tap, Referrer-Attribut, Pin-/Popup-
Geometrie, CSS-Konflikt, zwei Karten und wiederholtes Laden. Keine entfernten
API-Warnungen/JS-Fehler im Desktop-Test. Kacheln werden lokal ersetzt.

Manuell durch Eigentümer bestätigt: Safari mobil mit flüssigem Pinch-Zoom und
Titel-Popup per kurzem Tipp. Long-Press ohne sichtbare Aktion, passend zum fehlenden
Plugin-contextmenu-Handler; das interne Ereignis wurde nicht geprüft. Testgerät
laut Eigentümer: iPhone 17 Pro Max mit iOS 27.2, Safari mobil; separate Safari-
Buildnummer nicht genannt.

Noch offen: Desktop-Safari-/Firefox-Abnahme und weitere Mobilbrowser,
externe Provider/effektive Request-Header, warmer Grav-Cache und Admin2-Speichern
laut BETA-RELEASE.md. Mindestbrowser laut Leaflet: Baseline 2022 / Safari 15.4+;
das ist eine Upstream-Anforderung, kein eigener Test auf jeder Mindestversion.

## Quellen

- https://github.com/Leaflet/Leaflet/blob/main/MIGRATION.md
- https://github.com/Leaflet/Leaflet/blob/v2.0.0-beta.4/MIGRATION.md
- https://github.com/Leaflet/Leaflet/releases
- https://github.com/Leaflet/Leaflet/releases/tag/v2.0.0-beta.4
- Lokal: node_modules/leaflet/MIGRATION.md, CHANGELOG.md und öffentliche
  Konstruktor-/Default-Implementierungen im exakt gepinnten Paket.

Eigener Code: js/map-marker-leaflet-v2.js, js/markers.css,
shortcodes/MapLeafletShortcodeV2.php und MapLeafletMarkerShortcodeV2.php.
