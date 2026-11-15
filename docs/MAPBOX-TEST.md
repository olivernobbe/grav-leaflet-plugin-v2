# Mapbox-Abnahme ab Plugin 2.0.0-beta.5

Noch nicht live abgenommen. Die bis beta.4 enthaltene Mapbox-Style-Konfiguration
stammt aus dem Originalplugin. beta.5 verwendet für die bekannten Stile die
Static Tiles API. Künftige Releases erst nach diesem zusätzlichen Test markieren.

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

## Manuell schrittweise testen

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
