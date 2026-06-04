<?php

if (!defined('ABSPATH')) {
	exit;
}

if (!class_exists('BPLACH_Main')) {
	class BPLACH_Main {
		public function __construct() {
			add_action('init', [$this, 'init']);
			
			// Load dependencies
			$this->includes();
		}

		private function includes() {
			require_once ACHB_DIR_PATH . 'includes/class-bplach-admin-menu.php';
		}

		public function init() {
			register_block_type(ACHB_DIR_PATH . 'build/block');
			wp_set_script_translations('achb-editor', 'advance-custom-html', ACHB_DIR_PATH . 'languages');
		}
		
	}
}
