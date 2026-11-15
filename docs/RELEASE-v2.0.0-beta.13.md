# Map Marker Leaflet V2 — 2.0.0-beta.13

## Wikimedia Maps removed

Wikimedia Maps is no longer offered as a provider. The Wikimedia Foundation
terms prohibit using its Maps service for unrelated third-party websites, while
this plugin is intended for general Grav sites. The tiles use OpenStreetMap data
but are hosted and styled by Wikimedia; that does not make the service equivalent
to the publicly usable OSM standard tile service.

If an existing V2 configuration still selects `wikimedia`, the shortcode now
uses the standard OpenStreetMap provider. The legacy URL conversion for a
CARTO setting that accidentally inherited a Wikimedia URL remains in place.
