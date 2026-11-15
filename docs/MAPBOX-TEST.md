# Mapbox-Abnahme ab Plugin 2.0.0-beta.5

Der Eigentümer bestätigt den Live-Test mit eigenem Mapbox-Konto: Streets (Index 0)
sowie Outdoors, Light, Dark und Satellite (Indizes 1–4) laden sauber. Nach dem
Update auf beta.5 funktionieren auch die bisherigen OSM-Karten weiter.

Getestete Umgebung laut Eigentümer: PHP 8.3.36, Grav CLI Application 2.2.29,
Shortcode Core 6.2.8, Admin2 2.2.13 und API 1.1.18. Eine separate browserbezogene
Mapbox-Testmatrix bzw. Prüfung einzelner HTTP-Header wurde nicht gemeldet.

Die bis beta.4 enthaltene Style-Konfiguration stammt aus dem Originalplugin.
beta.5 nutzt für diese bekannten Stile die Static Tiles API.

## Vorbereitet und offline geprüft

- Styles-Endpunkt mit 512px-Kacheln, tileSize 512 und zoomOffset -1. minZoom 1
  verhindert negative API-Zoomlevel; maxZoom 22 begrenzt die Leafletansicht.
- Bestehende Kurzformen und neue IDs funktionieren in den alten bzw. neuen
  Variantenlisten: mapbox.streets → mapbox/streets-v12, outdoors → outdoors-v12,
  light → light-v11, dark → dark-v11, satellite → satellite-v9.
- Upgrade nur für die bekannte alte Style-URL mit diesen Stilen. Eigene v4-
  Raster-Tileset-URLs werden nicht pauschal ersetzt; die Raster Tiles API existiert
  weiterhin. Benutzerkonfiguration wird dabei nicht auf die Platte zurückgeschrieben.
- Bekanntes bevorzugtes Variantenindex bleibt bestehen; bestehende Beiträge müssen
  nicht geändert werden. API-Key-Feld bleibt providers.mapbox.apikey.
- Offizielles Mapbox-Logo und Quellenlinks; Improve-this-map-Link folgt der Ansicht.
- Browser prüft URL, Zoomstufe, 512px, sechs Marker, Popup und geladenes Logo;
  die Kacheln werden lokal ersetzt. Unit-Test prüft alle fünf Stylepaare und
  unveränderte Custom-URLs. Kein echter Token benutzt, keine Live-Kosten ausgelöst.

## Bekannte UI-Grenze

Die gemeinsame Variantenliste zeigt weiterhin 0–9 an. Mapbox hat nur fünf
vordefinierte Varianten (0–4); 5–9 fallen auf Streets zurück. Die anbieterabhängige
Auswahl mit Stilnamen ist für eine spätere Verbesserung vorgesehen. Dies ist ein
bekannter UI-Mangel, keine zusätzliche Mapbox-Stilunterstützung.

## Schritte zur Wiederholung des Tests

1. Funktionierenden V2-Pluginordner und eigene V2-Konfiguration vor dem Update
   sichern. Neues beta.5-Update-ZIP vollständig mit Unterordnern in den vorhandenen
   Pluginordner hochladen. Benutzerkonfiguration nicht ersetzen.
2. Grav-Cache leeren und OSM-Karte als kurzen Regressionstest öffnen.
3. Im eigenen Mapbox-Konto einen öffentlichen pk.-Token bereithalten. Nicht in den
   Chat, ins Repository oder in Screenshots kopieren. Keine sk.-Secret-Tokens;
   diese lehnt der Browsercode ab. URL-beschränkte Tokens müssen die Testdomain
   erlauben. Konto-/API-Zugang muss für Static Tiles nutzbar sein.
4. Admin → Plugins → Map Marker Leaflet V2: Provider Mapbox, Variantenindex 0,
   eigenen öffentlichen Token in das Mapbox-Feld eintragen und speichern.
5. Cache leeren, Brouwersdam öffnen: Straßenkarte, sechs Marker, Popups, Maßstab,
   richtige Positionen, Mapbox-Logo und Textquellen müssen sichtbar sein.
6. Falls grau: im Browser nur Statuscode der Mapbox-Anfrage prüfen, keine URL mit
   access_token weitergeben. 401: Token prüfen; 403: Account/URL-Freigabe prüfen;
   404: Style prüfen. Wenn nötig zurück auf OpenStreetMap und Cache leeren.
7. Nacheinander Index 1 Outdoors, 2 Light, 3 Dark und 4 Satellite testen (jeweils
   speichern und Cache leeren). Bei Satellite zusätzliche Maxar-Attribution prüfen.
8. Zwei Karten, Warm-Cache und Safari mobil stichprobenartig wiederholen. Danach
   gewünschten Provider und Index einstellen; das alte V1-Plugin bleibt deaktiviert.

Mapbox-Standard-Stile werden von der Static Tiles API nicht unterstützt. Der Test
verwendet deshalb Streets v12. Die API wird pro Kachelanfrage abgerechnet; es gelten
die Bedingungen des eigenen Mapbox-Kontos, keine angenommene Gratiszusage.

## Quellen und Logoherkunft

- https://docs.mapbox.com/api/maps/static-tiles/
- https://docs.mapbox.com/api/maps/raster-tiles/
- https://docs.mapbox.com/help/dive-deeper/attribution/
- Original-Logo: unverändertes SVG aus dem offiziellen Attribution-Beispiel,
  js/mapbox-logo.svg. Der Build liefert es aus assets/images aus. Herkunft und
  Markenhinweis stehen in assets/MAPBOX-ATTRIBUTION.txt. Keine Mapbox-GL-JS-Abhängigkeit.
