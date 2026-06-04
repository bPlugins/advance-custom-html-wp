<?php
/**
 * Plugin Name: Advance Custom HTML
 * Description: Advance Custom HTML lets you write and display HTML, CSS, PHP, and other code snippets on WordPress with live preview and syntax highlighting. 
 * Version: 2.1.0
 * Author: bPlugins
 * Author URI: http://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: advance-custom-html
 * @fs_premium_only /vendor/freemius, /includes/class-bplach-license-activation.php
 * @fs_free_only /vendor/freemius-lite
 */

if (!defined('ABSPATH')) {
	exit;
}

if (function_exists('achb_fs')) {
	achb_fs()->set_basename( true, __FILE__ );
} else {
	define('ACHB_VERSION', '2.1.0');
	define('ACHB_DIR_URL', plugin_dir_url(__FILE__));
	define('ACHB_DIR_PATH', plugin_dir_path(__FILE__));
	define('ACHB_HAS_FREE', 'advance-custom-html/advance-custom-html.php' === plugin_basename(__FILE__));
	define('ACHB_HAS_PRO', 'advance-custom-html-pro/advance-custom-html.php' === plugin_basename(__FILE__));


	if (!function_exists('achb_fs')) {
		function achb_fs() {
			global $achb_fs;

			if (!isset($achb_fs)) {
				$fsStartPath = dirname(__FILE__) . '/vendor/freemius/start.php';
				$bSDKInitPath = dirname(__FILE__) . '/vendor/freemius-lite/start.php';

				if (ACHB_HAS_PRO && file_exists($fsStartPath)) {
					require_once $fsStartPath;
				} else if (ACHB_HAS_FREE && file_exists($bSDKInitPath)) {
					require_once $bSDKInitPath;
				}

				$achbConfig = [
					'id' => '16894',
					'slug' => 'advance-custom-html',
					'premium_slug' => 'advance-custom-html-pro',
					'type' => 'plugin',
					'public_key' => 'pk_e99f567863d84a62f963ac66aeb42',
					'is_premium' => false,
					'premium_suffix' => 'Pro',
					'menu' => array(
						'slug' => 'advanced-custom-html',
						'first-path' => 'tools.php?page=advanced-custom-html#/dashboard',
						'contact' => false,
						'support' => false,
						'parent' => array(
							'slug' => 'tools.php',
						),
					)
				];

				$achb_fs = (ACHB_HAS_PRO && file_exists($fsStartPath)) ? fs_dynamic_init($achbConfig) : fs_lite_dynamic_init($achbConfig);
			}

			return $achb_fs;
		}

		achb_fs();
		do_action('achb_fs_loaded');
	}

	// Main Plugin Logic
	require_once ACHB_DIR_PATH . 'includes/class-bplach-main.php';
	new BPLACH_Main();
}

