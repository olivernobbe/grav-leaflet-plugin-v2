<?php
namespace Grav\Plugin\Shortcodes;

use Thunder\Shortcode\Shortcode\ShortcodeInterface;

class MapLeafletShortcodeV2 extends Shortcode
{
    public function init()
    {
        $this->shortcode->getHandlers()->add('map-leaflet', function (ShortcodeInterface $sc) {
            $params = $sc->getParameters();
            foreach ($params as &$value) {
                if (is_string($value)) $value = $this->twig->processString($value);
            }
            unset($value);
            $config = $this->config->get('plugins.map-marker-leaflet-v2', []);
            $providerName = $config['provider'] ?? 'openstreetmap';
            // Wikimedia Maps terms prohibit unrelated third-party map usage.
            // Redirect legacy saved selections to the supported OSM standard layer.
            if ($providerName === 'wikimedia') $providerName = 'openstreetmap';
            $provider = $config['providers'][$providerName] ?? [];
            $variants = $provider['variants'] ?? [];
            $variant = $params['variant'] ?? $params['style'] ?? $variants[$config['preffered'] ?? 0] ?? $provider['default'] ?? '';
            $tileStanza = $provider['tilestanza'] ?? 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
            // A legacy config can contain another provider's URL under Carto.
            // Do not send a Carto selection to Wikimedia; fall back to Carto's
            // built-in raster endpoint while retaining the selected variant/key.
            if ($providerName === 'carto' && str_contains($tileStanza, 'maps.wikimedia.org/')) {
                $tileStanza = 'https://basemaps.cartocdn.com/rastertiles/{variant}/{z}/{x}/{y}{r}.png?key={apikey}';
            }
            $cartoOldTemplate = 'https://{s}.basemaps.cartocdn.com/{variant}/';
            $cartoNewTemplate = 'https://basemaps.cartocdn.com/rastertiles/{variant}/';
            if ($providerName === 'carto' && str_starts_with($tileStanza, $cartoOldTemplate)) {
                $tileStanza = $cartoNewTemplate . substr($tileStanza, strlen($cartoOldTemplate));
            }
            if ($providerName === 'carto' && str_starts_with($tileStanza, $cartoNewTemplate)) {
                $normalizeCartoVariant = static function ($value) {
                    return is_string($value) && str_starts_with($value, 'rastertiles/')
                        ? substr($value, strlen('rastertiles/'))
                        : $value;
                };
                $variant = $normalizeCartoVariant($variant);
                $variants = array_map($normalizeCartoVariant, $variants);
            }
            $validVariant = in_array($variant, $variants, true);
            // Both old blog aliases and modern style IDs remain usable even
            // when the inherited provider list still contains the other form.
            if ($providerName === 'mapbox') {
                $aliases = [
                    'mapbox.streets' => 'mapbox/streets-v12',
                    'mapbox.outdoors' => 'mapbox/outdoors-v12',
                    'mapbox.light' => 'mapbox/light-v11',
                    'mapbox.dark' => 'mapbox/dark-v11',
                    'mapbox.satellite' => 'mapbox/satellite-v9'
                ];
                $normalize = static function ($value) use ($aliases) { return $aliases[$value] ?? $value; };
                $validVariant = in_array($normalize($variant), array_map($normalize, $variants), true);
            }
            if ($variants && !$validVariant) $variant = $provider['default'] ?? reset($variants);
            if ($providerName === 'carto'
                && str_contains($tileStanza, 'basemaps.cartocdn.com')
                && !preg_match('/[?&]key=/i', $tileStanza)) {
                $tileStanza .= str_contains($tileStanza, '?') ? '&key={apikey}' : '?key={apikey}';
            }
            $number = static function ($value, $default, $min, $max) {
                return is_numeric($value) && is_finite((float)$value) ? max($min, min($max, (float)$value)) : $default;
            };
            $settings = [
                'lat' => $number($params['lat'] ?? null, 51.505, -90, 90),
                'lng' => $number($params['lng'] ?? null, -0.09, -180, 180),
                'zoom' => $number($params['zoom'] ?? null, 13, 0, 24),
                'scale' => array_key_exists('scale', $params) && ($params['scale'] === '' || $params['scale'] === null || filter_var($params['scale'], FILTER_VALIDATE_BOOLEAN)),
                'provider' => [
                    'name' => $providerName,
                    'tilestanza' => $tileStanza,
                    'options' => [
                        'attribution' => $provider['attribution'] ?? '&copy; OpenStreetMap contributors',
                        'maxZoom' => $number($provider['maxzoom'] ?? null, 19, 0, 24),
                        'apikey' => $provider['apikey'] ?? $config['apikey'] ?? '',
                        'variant' => $variant
                    ]
                ]
            ];
            // Only retain generated marker payloads; never execute the content as JS/Twig again.
            preg_match_all('~<script type="application/json" class="mml-marker-data">[\s\S]*?</script>~', $sc->getContent() ?? '', $groups);
            $dimension = static function ($value, $default) {
                return is_string($value) && preg_match('/^(?:0|\d+(?:\.\d+)?(?:px|%|vh|vw|rem|em))$/D', $value) ? $value : $default;
            };
            return $this->twig->processTemplate('partials/mapleaflet.html.twig', [
                'mapname' => $params['mapname'] ?? '',
                'classes' => $params['classes'] ?? '',
                'width' => $dimension($params['width'] ?? null, '100%'),
                'height' => $dimension($params['height'] ?? null, '530px'),
                'settings' => json_encode($settings, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_THROW_ON_ERROR),
                'markers' => implode("\n", $groups[0])
            ]);
        });
    }
}
