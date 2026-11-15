<?php
/**
 * Grav 2 / Leaflet 2 fork maintained by Oliver Nobbe.
 * Contact: grav-leaflet-v2@nobbe.eu
 * Based on Map Marker Leaflet by Richard N Hainsworth (finanalyst).
 * Original source: https://github.com/finanalyst/grav-plugin-map-marker-leaflet
 * License: MIT; original copyright notice retained in LICENSE.
 */
namespace Grav\Plugin;

use Grav\Common\Plugin;
use RocketTheme\Toolbox\Event\Event;
use Symfony\Component\Yaml\Yaml;

class MapMarkerLeafletV2Plugin extends Plugin
{
    public static function getSubscribedEvents()
    {
        return [
            'onPluginsInitialized' => ['onPluginsInitialized', 0]
        ];
    }

    public function onPluginsInitialized()
    {
        // V2 settings override the original; its configuration is never written.
        $config = $this->grav['config'];
        $settings = array_replace_recursive(
            Yaml::parseFile(__DIR__ . '/defaults.yaml'),
            $config->get('plugins.map-marker-leaflet', []),
            $config->get('plugins.map-marker-leaflet-v2', [])
        );
        $config->set('plugins.map-marker-leaflet-v2', $settings);

        // Don't proceed if we are in the admin plugin
        if ($this->isAdmin()) {
            return;
        }
        if ($config->get('plugins.map-marker-leaflet.enabled', false)) {
            $this->grav['log']->warning('Map Marker Leaflet V2: disable the original plugin before enabling V2.');
            return;
        }
        // Enable the main events we are interested in
        $this->enable([
            'onShortcodeHandlers' => ['onShortcodeHandlers', 0],
            'onTwigTemplatePaths' => ['onTwigTemplatePaths',0]
        ]);
        //add assets
        $assets = $this->grav['assets'];

        // Register on every frontend request, including Grav page-cache hits.
        $assets->addCss('plugin://map-marker-leaflet-v2/assets/map-marker-leaflet-v2.css');
        $assets->addJs('plugin://map-marker-leaflet-v2/assets/map-marker-leaflet-v2.js', [
            'type' => 'module', 'group' => 'bottom', 'pipeline' => false
        ]);
    }

    public function onTwigTemplatePaths()
    {
        $this->grav['twig']->twig_paths[] = __DIR__ . '/templates';
    }

    public function onShortcodeHandlers(Event $e)
    {
        $this->grav['shortcode']->registerAllShortcodes(__DIR__.'/shortcodes');
    }
}
