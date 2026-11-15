> Historische Übergabe vor der GitHub-Veröffentlichung. Der Connector ist inzwischen
> verfügbar, das verbundene Konto ist olivernobbe und der native Fork wurde unter
> https://github.com/olivernobbe/grav-leaflet-plugin-v2 angelegt. Aktuellen Status
> über Git-Remotes und die GitHub-Release-Seite prüfen. Die folgenden Angaben zum
> damaligen Verbindungsstatus sind keine Aufforderung zur erneuten Anmeldung.

# Übergabe: GitHub-Fork und erste Beta veröffentlichen

## Auftrag und Autorisierung

Der Eigentümer Oliver Nobbe möchte diesen Fork sowohl auf seiner privaten Forgejo-
Instanz als auch als nativen Fork auf GitHub unter `grav-leaflet-plugin-v2`
veröffentlichen. GitHub-Plugin wurde auf Bitte des Eigentümers in ChatGPT installiert;
Pluginverwaltung bestätigt installed=true. In der bisherigen laufenden Codex-
Unterhaltung waren noch keine GitHub-Werkzeuge verfügbar. In der neuen Sitzung
zuerst Tools und verbundenes Konto prüfen; GitHub-Benutzername ist noch unbekannt.
Nicht erneut Installation verlangen, wenn der Connector verfügbar ist.

## Repository und geprüfter Stand

- Workspace: /Users/olivernobbe/grav-plugin-map-marker-leaflet
- Entwicklungsbranch: feat/grav2-leaflet2
- origin: ssh://git@git.nobbe.eu:22222/OliverNobbe/grav-leaflet-plugin-v2.git (privat)
- upstream: https://github.com/finanalyst/grav-plugin-map-marker-leaflet.git
- Letzter fachlicher Commit vor dieser Übergabe: 397071a; aktuellen HEAD prüfen.
- Pluginversion: 2.0.0-beta.5; Leaflet exakt 2.0.0-beta.4.
- Noch kein Release-Tag und kein GitHub-Fork angelegt.
- Plugin-Slug bleibt map-marker-leaflet-v2; Repositoryname nicht mit Slug verwechseln.

## Abnahme

Manuell durch Eigentümer bestätigt: OSM, sechs Brouwersdam-Marker, korrekte Popups,
Shuttle-Icon, drei unabhängige Karten, alle 20 Farben, Nummer 0, Gruppenicon, Drag,
Spin, reduzierte Bewegung, warmer Grav-Cache, Admin2-Einstellungsspeicherung.
Safari mobil: iPhone 17 Pro Max, iOS 27.2, Pinch-Zoom und Tipp-Popup funktionieren.
Mapbox: alle fünf vordefinierten Stile (0–4) laden sauber. OSM läuft nach beta.5 weiter.

Umgebung laut Eigentümer: Grav CLI Application 2.2.29, PHP 8.3.36,
Shortcode Core 6.2.8, Admin2 2.2.13, API 1.1.18.

Thunderforest/Carto/Wikimedia ausdrücklich auf später verschoben. Bekannter UI-
Mangel: gemeinsames Variantenfeld 0–9; Mapbox nur 0–4, andere Werte fallen auf
Streets zurück. Als Beta-Grenze dokumentiert, kein neuer Umbau vor dem Release nötig.
V1 bleibt deaktiviert, ist unter Grav 2 keine Rückfalllösung. Keine Serverzugriffe
gewünscht; keine Änderungen an einer produktiven Instanz.

## Nächste Aktionen

1. Verbundenes GitHub-Konto ermitteln. Native Fork von
   finanalyst/grav-plugin-map-marker-leaflet mit Namen grav-leaflet-plugin-v2
   im Konto des Eigentümers anlegen. Bestehenden Fork ggf. lesen und weiterverwenden;
   keine fremden Änderungen überschreiben.
2. github-Remote ergänzen (origin bleibt Forgejo), Entwicklungsbranch pushen.
   Der Fork soll unmittelbar den V2-Entwicklungsstand anzeigen; Defaultbranch
   entsprechend einstellen oder vor Änderung vorhandene Struktur prüfen.
3. Verifizierte Fork-/Issue-/Docs-Links in README, Blueprint und package.json
   ergänzen; Originalautor und Originalquellcode ausdrücklich beibehalten.
   Maintainer: Oliver Nobbe, grav-leaflet-v2@nobbe.eu, keine persönliche Website.
4. Finalen Commit auf beide Repositories übertragen. Bei ausschließlich Metadaten-
   Änderungen Quellprüfungen und git diff --check; keine unnötigen Codeänderungen.
5. Paket aus exakt diesem Stand mit python3 scripts/package.py erzeugen und prüfen.
   Lokale vollständige Tests waren zuletzt erfolgreich (3 Tests, keine Fehler).
6. Annotierten Tag v2.0.0-beta.5 auf den finalen Commit setzen und auf beide
   Repositories pushen. Nicht verschieben, falls dieser Tag inzwischen existiert.
7. GitHub-Pre-release veröffentlichen, kein Stable/Latest-Release. Beschreibung:
   docs/RELEASE-v2.0.0-beta.5.md. Voll-ZIP, tar.gz und SHA256SUMS anhängen; das
   kleine Update-ZIP optional zusätzlich, eindeutig als Update kennzeichnen.
   GitHubs automatisch erzeugtes Source-ZIP ist nicht das Installationspaket:
   unser Voll-ZIP enthält bereits den korrekt benannten Pluginordner und Builds.
8. Forgejo-Release ebenfalls vorbereiten/veröffentlichen, soweit authentifizierte
   Werkzeuge es erlauben. Git-SSH funktioniert, gh/tea waren lokal nicht installiert.
   Keine Zugangsdaten ausgeben oder erfragen. Bei fehlender Auth präzise berichten.

## Arbeitsweise

Der Eigentümer möchte einfache, konkrete Schritte, jeweils nur den nächsten
manuellen Schritt. Bereits autorisierte Aktionen autonom erledigen; nicht wieder
für Commit/Push/Fork die grundsätzliche Zustimmung abfragen. Im laufenden Turn vor
Toolnutzung kurz ankündigen. Keine Features/Tests für zusätzliche Provider erzwingen.
Vor Veröffentlichung die konkreten Assets und Release Notes bereitstellen.
