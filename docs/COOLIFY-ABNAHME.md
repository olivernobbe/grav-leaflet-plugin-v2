# V2 einfach installieren und testen

Nur auf der Grav-2-Testinstanz durchführen.

1. Das neue ZIP entpacken. Den enthaltenen Ordner `map-marker-leaflet-v2` mit dem
   gewohnten Dateiprogramm nach `user/plugins/` der Testinstanz hochladen.
   Danach liegen `map-marker-leaflet` und `map-marker-leaflet-v2` nebeneinander.
2. Im Admin unter Plugins **Map Marker Leaflet** deaktivieren und speichern.
3. **Map Marker Leaflet V2** aktivieren und speichern. Wenn der neue Eintrag nach
   dem Upload fehlt, zunächst im Admin den Cache leeren und die Pluginliste neu laden.
4. Cache im Admin leeren. Brouwersdam auf der Testinstanz öffnen.

V2 übernimmt Karten-/Provideroptionen des Originals als Vorgabe; dessen Datei
`user/config/plugins/map-marker-leaflet.yaml` wird nicht verändert. Eigene
V2-Einstellungen werden separat gespeichert. Bitte nie beide Plugins gleichzeitig
aktivieren: sie verwenden absichtlich dieselben Shortcodes. V2 besitzt dafür eine
Konfliktsperre. Es ist nach dem Upload standardmäßig deaktiviert.

## Abnahme

- Original vorher ansehen: OSM, Zoom 11, Maßstab, sechs Marker; schwarzer Shuttle
  und grüne Nummern 1–5. Titel beim Hover vergleichen.
- Nach Aktivierung dieselbe Seite prüfen. Pinform/Farbtöne können etwas abweichen.
- In V2-Einstellungen OpenStreetMap wählen, speichern und erneut öffnen.
- Für zwei Karten `fixtures/brouwersdam.md` als vorübergehende Testseite verwenden:
  erste Karte sechs Marker, zweite drei; getrenntes Verschieben/Zoomen, Nummer 0,
  coffee-Gruppenicon, Shuttle und ziehbaren Marker prüfen.
- `fixtures/palette.md` enthält eine Testkarte mit allen 20 Farben.
- Cache aktiv lassen, Karte nach Cacheleeren und dann zweimal erneut öffnen.
  Nummern/Icons/Maßstab müssen auch bei warmem Grav-Cache vorhanden sein.
- Bei fehlenden Icons muss das Testtheme die passende Font-Awesome-Version laden.
- Browserkonsole auf Fehler prüfen; Testinstanz und Browser/Pluginversionen notieren.

## Rückbau

V2 im Admin deaktivieren, Original wieder aktivieren, Cache leeren. Der alte
Pluginordner und dessen Konfiguration wurden nicht ersetzt.

## Coolify-Persistenz

Upload ist nur dauerhaft, wenn `user/plugins/` oder ein übergeordneter Pfad im
Teststack persistent eingebunden ist. Bei einem reinen Image-Build den neuen Ordner
zusätzlich in dessen Quelle aufnehmen. Kein npm-Build im Container erforderlich.

## Optionale Versionsprüfung im Containerterminal

Im Grav-Verzeichnis:

```sh
php -v
php bin/grav --version
php -r 'require "vendor/autoload.php"; foreach (["shortcode-core", "admin2", "api"] as $slug) { $p="user/plugins/$slug/blueprints.yaml"; echo $slug, ": ", is_file($p) ? (Symfony\Component\Yaml\Yaml::parseFile($p)["version"] ?? "unknown") : "not installed", PHP_EOL; }'
```

Diese Kommandos sind für die Installation nicht erforderlich. PHP 8.3.36 wurde
bereits im Containerlog bestätigt; genaue Grav-/Admin2-/Shortcode-Core-Versionen
sind noch zu notieren. Kartenregistrierung und Beitragsspeichern wurden vom
Eigentümer geprüft; offene Release-Abnahme siehe BETA-RELEASE.md.

## Schreibrechte beim vorhandenen Bind-Mount

Auf dem Testhost ist `/home/oliver/grav/user` nach `/var/www/html/user` eingebunden.
Der Uploadbenutzer `oliver` benötigt Schreibrechte auf den V2-Pluginordner.
Der PHP-Benutzer benötigt Schreibrechte auf `user/config`, `user/accounts`,
`user/data` und `user/pages`. Diese Aufgaben betreffen verschiedene Ordner;
nicht den gesamten user-Baum pauschal einem Benutzer zuweisen oder chmod 777 setzen.
Falls Cacheleeren per CLI nötig ist, im Container als root:

```sh
su -s /bin/sh www-data -c 'cd /var/www/html && php bin/grav clearcache'
```
