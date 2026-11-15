# 2.0.0-beta.5 (release candidate, unpublished)

- Modernize built-in Mapbox styles using Static Tiles API and 512px tiles.
- Preserve legacy style aliases and custom Raster Tiles API URLs.
- Add Mapbox logo and required attribution, with feedback link following the view.
- Use module-relative logo URL; include all required files in the beta.5 update ZIP.
- Reject secret sk. tokens in browser-side Mapbox initialization.
- Offline provider/browser tests pass; account-backed Mapbox acceptance pending.

# 2.0.0-beta.4 (release candidate, unpublished)

- Isolate custom marker layout from theme button padding, borders and focus shadows.
- Draw the pin within its 32 x 42 px hit box; align popup tip with the marker top.
- Preserve a visible keyboard focus indicator and keyboard popup activation.
- Rename own entry/bundled assets to map-marker-leaflet-v2.js and .css.
- Add geometry, theme-collision, keyboard and plain-text popup regression checks.
- Include a four-file update ZIP for existing beta installations.

# 2.0.0-beta.3 (development)

- Open marker titles as plain-text popups on single click, retaining hover titles.
- Verify popup opening/closing and isolation between maps in browser tests.

# 2.0.0-beta.2 (development)

- Separate installable map-marker-leaflet-v2 folder, plugin class, config and assets.
- Default to disabled; prevent duplicate shortcode registration while original is active.
- Inherit original provider settings without modifying the original configuration.
- Include a ZIP for simple installation alongside the original plugin.

# 2.0.0-beta.1 (development)

- Target Grav 2 and Admin2; retain plugin slug, configuration keys and shortcode names.
- Pin Leaflet 2.0.0-beta.4; bundle ES modules and CSS for installation without npm.
- Replace inline generated JavaScript with escaped JSON and element-based initialization.
- Replace incompatible ExtraMarkers with CSS DivIcons preserving color/icon/text options.
- Fix multiple unnamed maps, group icon defaults, false booleans and number zero.
- Add local browser/source tests and manual Coolify acceptance/rollback instructions.
- Test-instance Grav cache and Admin2 acceptance remain pending.

# v1.1.2
## 22 December 2020
1.[](#Gantry compatibility)
    * Gantry needs raw setting in templates
2.[](Security)
    * js vulnerability recommendation

# v1.1.1
## 24 July 2020
1.[](#bugfixes)

# v1.1.0
## 18 July 2020
1.[](#Enhancement)
   * Work by A----- to change the way map handlers are provided.
   * Improvement of dependency handling
2.[](#security)
   * Require minimist >1.2.3 - github recommendation

# v1.0.8
## 28 Feb 2019
1.[](#typo)
   * in blueprints for README

# v1.0.7
## 1 Jan 2019
1.[](#typo)
   * in Readme, credit to githum/awrog

# v1.0.6
## 28 Dec 2018
1.[](#enhancement)
   * modified Thunderforest stanza to allow for retina support.

# v1.0.5
## 10 Oct 2018
1.[](#enhancement)
   * added scale option to shortcode, default False (to be compatible with existing API)

# v1.0.4
## 4 Oct 2018
1.[](#update)
   * move asset adding from shortcode to plugin initialisation

# v1.0.3
## 27 Sep 2018
1.[](#update)
   * Change width/height option defaults in the presence of a class for the map (to allow for responsive map size).

# v1.0.2
## 19 Sep 2018
1.[](#update)
   * Twig process 'style' option so that it can be set with Twig in page.

# v1.0.1
## 18 Sep 2018
1.[](#update)
   * added 'classes option to map shortcode'
   * changed README to eliminate confusing error

# v1.0.0
## 13 Sep 2018
1.[](#initial)
   * publication for GRAV with new name
