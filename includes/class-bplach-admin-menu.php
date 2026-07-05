<?php

if (!defined('ABSPATH')) {
  exit;
}

if (!class_exists('BPLACH_Admin_Menu')) {
  class BPLACH_Admin_Menu {
    public function __construct() {
      add_action('admin_menu', [$this, 'bplach_admin_menu']);
      add_action('admin_enqueue_scripts', [$this, 'bplach_admin_enqueue_scripts']);
    }

    public function bplach_admin_menu() {
      add_submenu_page(
        'tools.php',
        'Advance Custom HTML',
        'Advance Custom HTML',
        'manage_options',
        'advanced-custom-html',
        [$this, 'renderPage'],
        100
      );
    }

    public function renderPage() {
      ?>
      <div id="bplAdminHelpPageWrapper" data-info='<?php echo esc_attr(wp_json_encode([
        'version'  => ACHB_VERSION,
        'adminUrl' => admin_url()
      ])); ?>'></div>
      <?php
    }

    public function bplach_admin_enqueue_scripts($hook) {
      if ('tools_page_advanced-custom-html' === $hook) {
        wp_enqueue_style('achb-admin-help', ACHB_DIR_URL . 'build/admin-dashboard.css', [], ACHB_VERSION);

        if (file_exists(ACHB_DIR_PATH . 'build/admin-dashboard.asset.php')) {
          $asset_file = include ACHB_DIR_PATH . 'build/admin-dashboard.asset.php';
          $deps = array_merge($asset_file['dependencies'], ['wp-util']);
        } else {
          $deps = ['wp-util'];
        }
        wp_enqueue_script('achb-admin-help', ACHB_DIR_URL . 'build/admin-dashboard.js', $deps, ACHB_VERSION, true);
        wp_set_script_translations('achb-admin-help', 'advance-custom-html', ACHB_DIR_PATH . 'languages');
      }
    }

  }
  new BPLACH_Admin_Menu();
}
