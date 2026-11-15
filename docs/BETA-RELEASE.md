# V2-Beta: Kandidat 2.0.0-beta.4

Noch nicht veröffentlicht oder getaggt. Leaflet bleibt exakt 2.0.0-beta.4;
Pluginversion und Leafletversion sind voneinander unabhängig.

## Fertig

- Eigenständiger Slug map-marker-leaflet-v2; Original bleibt separat installiert.
- Bestehende Shortcodes und Provideroptionen; alte Konfiguration wird als Vorgabe
  gelesen, nicht überschrieben. Neue Einstellungen werden separat gespeichert.
- Leaflet 2 ES-Modul-Bundle und fertige CSS-Datei, kein npm-Build auf dem Server.
- Eigenes JS/CSS jetzt eindeutig als assets/map-marker-leaflet-v2.js bzw. .css
  benannt. Die Quelldateien des Leaflet-Pakets werden nicht editiert.
- Eigene SVG-Pins innerhalb ihrer 32 x 42 Pixel großen Klickfläche, eigener
  CSS-Reset gegen Theme-Buttonstile. Nummern/Icons liegen über der SVG-Fläche.
- Popup-Spitze am oberen Pinrand, Beschreibung nach einfachem Klick, nativer
  Hover-Titel bleibt. Tastaturfokus bleibt sichtbar; Enter öffnet das Popup.
- Lokale Chromiumtests: Referenzmarker, zweite Karte, Farben, 0 und 1–5, Popup
  öffnen/schließen, Text statt HTML, Tastatur, erneute Initialisierung und Laden.
- Geometrie zusätzlich mit öffentlichen Blades-/Pico-Theme-Stilen geprüft und
  lokal visuell kontrolliert. Tests laden deterministische Ersatzkacheln.
- PHP statisch geparst, YAML/Blueprint und Leaflet-Lock geprüft.
- Benutzer bestätigt auf seiner Instanz: Original-/V2-Umschaltung, Karten und alle
  sechs Referenzmarker, Klick-Popup in vorherigem Build, Beitragsspeichern nach
  gezielter Rechtekorrektur wieder möglich. PHP 8.3.36 aus Containerlog bekannt.

## Update installieren

Das Update-ZIP enthält nur vier Dateien:

```text
map-marker-leaflet-v2.php
blueprints.yaml
assets/map-marker-leaflet-v2.js
assets/map-marker-leaflet-v2.css
```

ZIP lokal entpacken. Inhalt mit Cyberduck in den bestehenden Pluginordner
`/home/oliver/grav/user/plugins/map-marker-leaflet-v2/` hochladen und vorhandene
Dateien ersetzen. Kein zusätzlicher gleichnamiger Unterordner. Grav-Cache im Admin
leeren und die Karte neu laden. Benutzerkonfiguration und Beiträge bleiben erhalten.
Alternativ das vollständige Plugin-ZIP verwenden.

## Manuelle Rückmeldung: Safari mobil

Vom Eigentümer bestätigt: Pinch-Zoom läuft flüssig; kurzer Tipp auf einen Marker
öffnet dessen Titel-Popup. Bei Long-Press auf Karte oder Marker ist keine sichtbare
Aktion vorhanden. Das Plugin registriert keinen contextmenu-Handler und definiert
keine eigene Long-Press-Funktion; die Rückmeldung ist daher kein belegter Defekt.
Ob das interne contextmenu-Ereignis ausgelöst wurde, wurde dabei nicht gemessen.
Testgerät laut Eigentümer: iPhone 17 Pro Max, iOS 27.2, Safari mobil. Eine separate
Safari-Buildnummer wurde nicht genannt. Desktop-Safari und weitere Mobilbrowser
sind damit nicht abgenommen.

## Leaflet-2-Abgleich

Der [vollständige Migrationsabgleich](LEAFLET2-AUDIT.md) deckt alle Abschnitte des
Leitfadens ab und trennt verwendete APIs, übernommene Standardwerte, ungenutzte
Funktionen und ausstehende Gerätetests. Zusätzliche Browserprüfungen für Space,
Tastatur-Drag, Touch-Tap und Tile-Referrer-Attribut bestehen.

## Noch vor dem ersten Release abnehmen

1. Neues Update auf der Testinstanz: Popup-Spitze am angeklickten Pin, Nummer/Icon
   sichtbar, kein versetzter violetter Buttonrahmen bei Mausklick. Per Tab weiterhin
   sichtbarer Fokus und per Enter Popup. Firefox und Desktop-Safari prüfen; mobile
   Safari-Rückmeldung siehe oben.
2. `fixtures/brouwersdam.md` als temporäre Testseite: zwei Karten, Marker getrennt,
   Nummer 0 ziehbar, Gruppenicon und spin. Palette über fixtures/palette.md prüfen.
3. Grav-Cache eingeschaltet: nach Cacheleeren zweimal anonym erneut öffnen.
   Beide Karten/Popups bleiben korrekt. Falls die Asset-Pipeline genutzt wird,
   diese aktiviert prüfen; das ES-Modul bleibt davon ausgeschlossen.
4. In Admin2 Provider-Einstellungen anzeigen, ändern, speichern, neu öffnen;
   gespeicherten Wert bestätigen und OSM wiederherstellen. Beitrag mit Kartenblock
   speichern und prüfen, dass der Quelltext unverändert enthalten bleibt.
5. Genaue Grav-, Shortcode-Core- und Admin2-Versionen notieren. PHP ist bekannt.
6. Rückbau: V2 deaktivieren, Original aktivieren, Cache leeren und Originalkarte
   prüfen; danach wieder auf V2 umschalten.

Diese Punkte sind manuelle Abnahme, keine Zugriffs-/Freigabeanforderung. Ein
privates Forgejo-Repository kann bereits vorbereitet werden; der Kandidat sollte
vor Abschluss dieser Checks nicht als vollständig abgenommen bezeichnet werden.

## Für die Beta dokumentierte Grenzen

- Erste Provider-Abnahme mit OpenStreetMap. Thunderforest/Carto/Mapbox/Wikimedia
  bleiben konfigurierbar, sind nicht live abgenommen; alte URLs ggf. anpassen.
- Theme stellt passende Iconfont bereit. Pinform ist nicht pixelgleich zu ExtraMarkers.
- Beschreibungen sind Klartext, kein HTML oder Markdown in Popups.
- V2 und Original nicht gleichzeitig aktiv betreiben.
- Die Ursache des im Beitrag fehlenden Kartenblocks ist nicht belegt. Wiederherstellung
  aus Benutzerbackup; bisher kein Nachweis, dass V2 Beitragsdateien verändert hat.

## Forgejo und Release

Upstream-Historie und MIT-Lizenz bleiben erhalten. Der vom Eigentümer gewählte
Repositoryname auf Forgejo und GitHub ist `grav-leaflet-plugin-v2`; der installierte
Plugin-Slug bleibt `map-marker-leaflet-v2`. Forgejo bleibt entsprechend dem
ursprünglichen Auftrag privat; der GitHub-Fork basiert auf dem öffentlichen Original.
Der Entwicklungsstand kann vor Abschluss der manuellen Abnahme als Branch
veröffentlicht werden. Erst danach den annotierten Tag v2.0.0-beta.4 setzen und
als Vorabversion veröffentlichen. Voll-ZIP,
tar.gz, SHA256-Prüfsummen und Release Notes beilegen. Das kleine Update-ZIP ist
nur für vorhandene Beta-Installationen bestimmt, nicht für Neuinstallationen.
