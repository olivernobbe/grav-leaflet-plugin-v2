# V2-Beta: Kandidat 2.0.0-beta.5

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
  gezielter Rechtekorrektur wieder möglich. Versionen vom Eigentümer über CLI ermittelt: PHP 8.3.36, Grav CLI Application
  2.2.29, Shortcode Core 6.2.8, Admin2 2.2.13, API 1.1.18.

## Mapbox vor Veröffentlichung zusätzlich testen

Der Eigentümer hat einen zusätzlichen Mapbox-Test beauftragt. beta.5 modernisiert
dafür die Standard-Style-Anbindung (Static Tiles API, 512px, Zoomoffset -1,
Logo/Attribution). Offline geprüft, live mit Benutzeraccount noch nicht abgenommen.
Die bisherigen OSM-Abnahmen beziehen sich auf beta.4; nach Update kurzer OSM-
Regressionstest und danach Mapbox-Test entsprechend MAPBOX-TEST.md.

## Update installieren

Das beta.5-Update-ZIP enthält PHP-Einstieg, Blueprint, Karten-Shortcode, Defaults,
gebautes JS/CSS sowie das offizielle Mapbox-Logo und seinen Herkunftshinweis.
Alle Dateien samt Unterordnern in den vorhandenen Pluginordner zusammenführen.

ZIP lokal entpacken. Inhalt mit Cyberduck in den bestehenden Pluginordner
`/home/oliver/grav/user/plugins/map-marker-leaflet-v2/` hochladen und vorhandene
Dateien ersetzen. Kein zusätzlicher gleichnamiger Unterordner. Grav-Cache im Admin
leeren und die Karte neu laden. Benutzerkonfiguration und Beiträge bleiben erhalten.
Alternativ das vollständige Plugin-ZIP verwenden.

## Manuelle Rückmeldung: aktuelles Beta-4-Update

Eigentümer bestätigt nach Update: Popup-Spitze zeigt auf den richtigen Marker,
versetzter violetter Rahmen ist nicht mehr sichtbar. Schwarzer Shuttle-Marker mit
Bus-Icon ist sichtbar. Die Rückmeldung nennt für diesen Schritt keinen Browser.
Der Eigentümer bestätigt den Mehrkartentest sogar mit drei Karten: unabhängiges
Verschieben/Zoomen und Marker-/Popupzuordnung. Der vorgegebene Test mit grüner 0,
roter 2 sowie Maßstab nur auf der ersten Karte funktioniert laut Rückmeldung.
Der Eigentümer bestätigt außerdem den Markeroptionentest: blaue ziehbare 0,
violettes Gruppenicon coffee in Gelb mit spin und beide Beschreibungen funktionieren.
Animation läuft ohne reduzierte Bewegung und stoppt mit aktivierter Systemeinstellung;
der Eigentümer meldet den gesamten Schritt als tadellos funktionierend.
Der Eigentümer bestätigt den Cache-Test: Cache aktiviert, einmal geleert,
Kartentestseite danach mehrfach normal sowie im privaten Fenster geöffnet;
Karten, Marker und Popups funktionieren laut Rückmeldung sauber.
Der Eigentümer bestätigt Admin2: Variantenindex ändern, speichern, Pluginseite
verlassen und erneut öffnen zeigt den gespeicherten Wert; Originalwert wieder
herstellen funktioniert ebenfalls. Kartenanbieter blieb OpenStreetMap.
API-Key-Felder und Wechsel zu externen Providern wurden damit nicht abgenommen.
Der Eigentümer hat die Testpalette mit allen 20 nummerierten Farben geöffnet und
als sehr gut aussehend bestätigt. Damit ist die visuelle Farbpalette abgenommen.
Der Eigentümer bestätigt, dass die Umschaltung zwischen Original und V2 funktioniert.
Er bewertet das Original unter Grav 2 jedoch als unzureichend und verwirft es als
Rückfalllösung. Betriebsentscheidung: Original deaktiviert lassen, V2 aktiv nutzen;
kein Löschen des Originals beauftragt. Künftige Rücksicherung über Backup eines
bekannt funktionierenden V2-Stands und der Konfiguration, nicht über V1.

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
5. Versionsangaben sind erfasst: Grav CLI 2.2.29, PHP 8.3.36, Shortcode Core
   6.2.8, Admin2 2.2.13 und API 1.1.18 (Benutzerausgabe).
6. Umschaltung wurde bestätigt. Auf ausdrücklichen Benutzerwunsch ist V1 keine
   Rückfalllösung unter Grav 2; das Original bleibt deaktiviert. Vor zukünftigen
   Updates funktionierenden V2-Stand samt Konfiguration separat sichern.

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
veröffentlicht werden. Erst danach den annotierten Tag v2.0.0-beta.5 setzen und
als Vorabversion veröffentlichen. Voll-ZIP,
tar.gz, SHA256-Prüfsummen und Release Notes beilegen. Das kleine Update-ZIP ist
nur für vorhandene Beta-Installationen bestimmt, nicht für Neuinstallationen.
