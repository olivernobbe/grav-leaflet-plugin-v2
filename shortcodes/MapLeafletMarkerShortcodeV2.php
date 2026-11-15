<?php
namespace Grav\Plugin\Shortcodes;

use Thunder\Shortcode\Shortcode\ShortcodeInterface;

class MapLeafletMarkerShortcodeV2 extends Shortcode
{
    public function init()
    {
        $this->shortcode->getHandlers()->add('a-markers', function (ShortcodeInterface $sc) {
            $source = $this->twig->processString($sc->getContent() ?? '');
            $source = preg_replace('~</?p\b[^>]*>|<br\s*/?>~i', '', $source);
            $items = json_decode(html_entity_decode($source, ENT_QUOTES | ENT_HTML5, 'UTF-8'), true);
            if (!is_array($items) || !array_is_list($items)) {
                return '';
            }
            $defaults = $sc->getParameters();
            foreach ($defaults as &$value) {
                if (is_string($value)) $value = $this->twig->processString($value);
            }
            unset($value);
            $markers = [];
            foreach ($items as $item) {
                if (!is_array($item) || !isset($item['lat'], $item['lng']) ||
                    !is_numeric($item['lat']) || !is_numeric($item['lng']) ||
                    abs((float)$item['lat']) > 90 || abs((float)$item['lng']) > 180) continue;
                $options = array_replace($defaults, $item);
                $marker = ['lat' => (float)$item['lat'], 'lng' => (float)$item['lng']];
                foreach (['title' => '', 'icon' => '', 'text' => '', 'iconColor' => 'white', 'markerColor' => 'blue'] as $key => $fallback) {
                    $marker[$key] = is_scalar($options[$key] ?? null) ? (string)$options[$key] : $fallback;
                }
                foreach (['draggable', 'spin'] as $key) {
                    $marker[$key] = array_key_exists($key, $options) &&
                        ($options[$key] === '' || $options[$key] === null || filter_var($options[$key], FILTER_VALIDATE_BOOLEAN));
                }
                $markers[] = $marker;
            }
            return $this->twig->processTemplate('partials/mapleafletmarker.html.twig', [
                'markers' => json_encode($markers, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_THROW_ON_ERROR)
            ]);
        });
    }
}
