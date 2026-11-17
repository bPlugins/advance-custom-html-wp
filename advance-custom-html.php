<?php
/**
 * Plugin Name: Advance Custom HTML
 * Description: Advance Custom HTML lets you write and display HTML, CSS, PHP, and other code snippets on WordPress with live preview and syntax highlighting. 
 * Version: 2.1.1
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
	define('ACHB_VERSION', '2.1.1');
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

	add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), function( $links ) {
		if ( current_user_can( 'manage_options' ) ) {
			$links[] = '<a href="' . esc_url( admin_url( 'tools.php?page=advanced-custom-html' ) ) . '" style="color:#FF7A00;font-weight:bold;">' . esc_html__( 'Help & Demos', 'advance-custom-html' ) . '</a>';

			$expiry     = class_exists( '\ACHB\Admin\ACHB_PromoBanner' ) ? \ACHB\Admin\ACHB_PromoBanner::EXPIRATION_DATE : '2026-12-05 23:59:59';
			$is_expired = time() > strtotime( $expiry );

			$is_premium = ( defined( 'ACHB_HAS_PRO' ) && ACHB_HAS_PRO ) || ( function_exists( 'achbIsPremium' ) && achbIsPremium() ) || ( function_exists( 'achb_fs' ) && achb_fs()->can_use_premium_code() );

			if ( ! $is_expired && ! $is_premium ) {
				$bfcm_url = 'https://bplugins.com/products/advance-custom-html/pricing/?utm_source=admin&utm_medium=plugins&utm_campaign=bfcm2026';
				$links[]  = '<a href="' . esc_url( $bfcm_url ) . '" target="_blank" rel="noopener noreferrer" style="color:#d63638;font-weight:bold;">' . esc_html__( 'Upgrade to Pro & Save 45% This Black Friday!', 'advance-custom-html' ) . '</a>';
			}
		}

		return $links;
	} );

	// Black Friday / Cyber Monday Campaign Banner
	if ( ACHB_HAS_FREE && ! ACHB_HAS_PRO ) {
		require_once ACHB_DIR_PATH . 'includes/BFCMCamping.php';
	}

	// Main Plugin Logic
	require_once ACHB_DIR_PATH . 'includes/class-bplach-main.php';
	new BPLACH_Main();
}

