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
            $provider = $config['providers'][$config['provider'] ?? 'openstreetmap'] ?? [];
            $variants = $provider['variants'] ?? [];
            $variant = $params['variant'] ?? $params['style'] ?? $variants[$config['preffered'] ?? 0] ?? $provider['default'] ?? '';
            if ($variants && !in_array($variant, $variants, true)) $variant = $provider['default'] ?? reset($variants);
            $number = static function ($value, $default, $min, $max) {
                return is_numeric($value) && is_finite((float)$value) ? max($min, min($max, (float)$value)) : $default;
            };
            $settings = [
                'lat' => $number($params['lat'] ?? null, 51.505, -90, 90),
                'lng' => $number($params['lng'] ?? null, -0.09, -180, 180),
                'zoom' => $number($params['zoom'] ?? null, 13, 0, 24),
                'scale' => array_key_exists('scale', $params) && ($params['scale'] === '' || $params['scale'] === null || filter_var($params['scale'], FILTER_VALIDATE_BOOLEAN)),
                'provider' => [
                    'tilestanza' => $provider['tilestanza'] ?? 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                    'options' => [
                        'attribution' => $provider['attribution'] ?? '&copy; OpenStreetMap contributors',
                        'maxZoom' => $number($provider['maxzoom'] ?? null, 17, 0, 24),
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
