<?php

namespace ACHB\Admin;

if ( ! defined( 'ABSPATH' ) ) { exit; }

if ( ! class_exists( __NAMESPACE__ . '\ACHB_PromoBanner' ) ) {

    class ACHB_PromoBanner {
        const environment     = 'production'; // 'development' or 'production'
        const ENVIRONMENT     = self::environment;
        const DISMISSED_KEY   = 'achb_promo_banner_dismissed_permanent';
        const EXPIRATION_DATE = '2026-12-05 23:59:59';

        /** Target landing URL */
        const COUPON_URL      = 'https://bplugins.com/products/advance-custom-html/pricing/?utm_source=admin&utm_medium=dashboard&utm_campaign=bfcm2026';

        private static $instance = null;
        private static $styles_rendered = false;
        private static $scripts_rendered = false;
        private static $banner_rendered = false;

        public static function instance() {
            if ( null === self::$instance ) {
                self::$instance = new self();
            }
            return self::$instance;
        }

        public function __construct() {
            if ( $this->is_development() ) {
                add_action( 'init', function() {
                    if ( get_current_user_id() && isset( $_GET['reset_promo'] ) ) {
                        delete_user_meta( get_current_user_id(), self::DISMISSED_KEY );
                    }
                } );
            }
            add_action( 'admin_notices',                     [ $this, 'render_admin_notices' ] );
            add_action( 'admin_head',                        [ $this, 'enqueue_styles' ] );
            add_action( 'admin_footer',                      [ $this, 'enqueue_scripts' ] );
            add_action( 'wp_ajax_achb_dismiss_promo_banner',  [ $this, 'ajax_dismiss' ] );
        }

        /**
         * Static helper to render directly on dashboard page
         */
        public static function render_banner(): void {
            self::instance()->render();
        }

        /**
         * Render banner via admin_notices on Account or other allowed pages.
         * The Dashboard/Help page is handled directly by BPLACH_Admin_Menu::renderPage().
         */
        public function render_admin_notices(): void {
            if ( isset( $_GET['page'] ) && 'advanced-custom-html' === $_GET['page'] ) {
                return;
            }
            $this->render();
        }

        /* ------------------------------------------------------------------ */
        /*  Screen, Expiration, Dismissal & Pro Helpers                       */
        /* ------------------------------------------------------------------ */

        /**
         * Check if the current admin screen is one of the target Advance Custom HTML screens:
         * - Dashboard / Help (advanced-custom-html)
         * - Freemius Account (contains advanced-custom-html or advance-custom-html)
         * Excludes: "Add New" and post editors.
         */
        private function is_target_screen(): bool {
            global $pagenow;
            // 1. Explicitly exclude post creation and post editing
            if ( 'post-new.php' === $pagenow || 'post.php' === $pagenow ) {
                return false;
            }
            if ( function_exists( 'get_current_screen' ) ) {
                $screen = get_current_screen();
                if ( $screen && 'post' === $screen->base ) {
                    return false;
                }
            }

            // 2. Check for "Help & Demo" / Dashboard page
            if ( isset( $_GET['page'] ) && 'advanced-custom-html' === $_GET['page'] ) {
                return true;
            }

            // 3. Check for Freemius "Account" or related pages
            if ( isset( $_GET['page'] ) && strpos( $_GET['page'], 'account' ) !== false ) {
                if ( strpos( $_GET['page'], 'advanced-custom-html' ) !== false || strpos( $_GET['page'], 'advance-custom-html' ) !== false ) {
                    return true;
                }
            }

            // 4. Fallback via $screen object
            if ( function_exists( 'get_current_screen' ) ) {
                $screen = get_current_screen();
                if ( $screen ) {
                    $id = $screen->id ?? '';
                    if ( strpos( $id, 'advanced-custom-html' ) !== false || strpos( $id, 'advance-custom-html' ) !== false ) {
                        return true;
                    }
                }
            }

            return false;
        }

        /**
         * Check if current date is past December 5, 2026
         */
        private function is_expired(): bool {
            $expiry_timestamp = strtotime( self::EXPIRATION_DATE );
            $current_time     = time();
            return ( $current_time > $expiry_timestamp );
        }

        /**
         * Check if current environment is development
         */
        public static function is_development(): bool {
            $env = strtolower( trim( (string) self::environment ) );
            return in_array( $env, [ 'development', 'developmet', 'dev' ], true );
        }

        /**
         * Check if current user has permanently dismissed the banner
         */
        private function is_dismissed(): bool {
            // In development, never consider it permanently dismissed
            if ( $this->is_development() ) {
                return false;
            }

            if ( isset( $_GET['reset_promo'] ) ) {
                delete_user_meta( get_current_user_id(), self::DISMISSED_KEY );
                return false;
            }
            return (bool) get_user_meta( get_current_user_id(), self::DISMISSED_KEY, true );
        }

        /**
         * Determine if the banner should be omitted
         */
        private function should_skip(): bool {
            // Must be one of the target screens
            if ( ! $this->is_target_screen() ) {
                return true;
            }

            // In development environment, reload will always make it reappear (never skip)
            if ( $this->is_development() ) {
                return false;
            }

            // Production checks:
            // 1. Automatically remove after Dec 5, 2026
            if ( $this->is_expired() ) {
                return true;
            }

            // 2. Never display again once dismissed by the user
            if ( $this->is_dismissed() ) {
                return true;
            }

            // 3. Hide for Pro / Premium users
            if ( defined( 'ACHB_HAS_PRO' ) && ACHB_HAS_PRO ) {
                return true;
            }
            if ( function_exists( 'achb_fs' ) && achb_fs()->can_use_premium_code() ) {
                return true;
            }

            return false;
        }

        /* ------------------------------------------------------------------ */
        /*  CSS Styles                                                        */
        /* ------------------------------------------------------------------ */

        public function enqueue_styles(): void {
            if ( self::$styles_rendered || $this->should_skip() ) { return; }
            self::$styles_rendered = true;
            ?>
            <style id="achb-campaign-card-css">
            #achb-campaign-card {
                --achb-primary:        #e11463;
                --achb-primary-hover:  #c40f54;
                --achb-accent:         #f43f5e;
                --achb-dark:           #070127;
                --achb-text:           #0f172a;
                --achb-muted:          #64748b;

                background: #ffffff !important;
                border: 1px solid #cbd5e1 !important;
                border-radius: 8px !important;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03) !important;
                display: flex !important;
                position: relative !important;
                top: auto !important;
                left: auto !important;
                width: auto !important;
                height: auto !important;
                opacity: 1 !important;
                visibility: visible !important;
                z-index: 99 !important;
                align-items: stretch !important;
                min-height: 84px;
                overflow: hidden;
                margin: 16px 20px 16px 0 !important;
                padding: 0 !important;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
                box-sizing: border-box;
            }

            /* Left Full-Height Brand Ribbon Block */
            #achb-campaign-card .achb-brand-icon-box {
                width: 140px;
                min-width: 140px;
                background: linear-gradient(135deg, var(--achb-primary) 0%, var(--achb-dark) 100%);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 12px 10px;
                gap: 6px;
                box-sizing: border-box;
                flex-shrink: 0;
            }
            #achb-campaign-card .achb-brand-icon-box img {
                width: 44px;
                height: 44px;
                object-fit: contain;
                border-radius: 6px;
                filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.35));
            }
            #achb-campaign-card .achb-brand-icon-box .achb-brand-title {
                font-size: 10px;
                font-weight: 800;
                letter-spacing: .6px;
                text-transform: uppercase;
                color: #ffffff;
                text-align: center;
                line-height: 1.2;
            }

            /* Main Content Zone */
            #achb-campaign-card .achb-main-content {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 4px;
                padding: 14px 20px !important;
            }

            /* Title Line */
            #achb-campaign-card .achb-title-line {
                font-size: 14px;
                font-weight: 700;
                color: var(--achb-text);
                display: flex;
                align-items: center;
                gap: 8px;
                margin: 0;
                line-height: 1.35;
                flex-wrap: wrap;
            }

            /* "Save 45%" Badge beside Title */
            #achb-campaign-card .achb-offer-tag {
                background: #ffedd5;
                color: #c2410c;
                border: 1px solid #fed7aa;
                font-size: 11px;
                font-weight: 700;
                padding: 2px 8px;
                border-radius: 12px;
                letter-spacing: .2px;
                display: inline-flex;
                align-items: center;
            }

            /* Description */
            #achb-campaign-card .achb-description {
                font-size: 12.5px;
                font-weight: 400;
                color: var(--achb-muted);
                line-height: 1.45;
                margin: 0;
            }

            /* 3 Highlighted Pro Features */
            #achb-campaign-card .achb-features-row {
                display: flex;
                align-items: center;
                gap: 14px;
                font-size: 12px;
                color: var(--achb-muted);
                flex-wrap: wrap;
                margin-top: 2px;
            }
            #achb-campaign-card .achb-features-row span {
                display: inline-flex;
                align-items: center;
                gap: 4px;
            }
            #achb-campaign-card .achb-features-row .check-icon {
                color: #10b981;
                font-weight: 800;
            }

            /* Right Action Zone (Single CTA Button) */
            #achb-campaign-card .achb-action-zone {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 14px 38px 14px 12px;
                flex-shrink: 0;
            }
            #achb-campaign-card .achb-action-link {
                background: var(--achb-primary);
                color: #ffffff !important;
                padding: 9px 20px;
                border-radius: 5px;
                font-size: 12.5px;
                font-weight: 600;
                text-decoration: none !important;
                box-shadow: 0 1px 3px rgba(225, 20, 99, 0.3);
                transition: background-color .15s ease, transform .15s ease, box-shadow .15s ease;
                white-space: nowrap;
                display: inline-flex;
                align-items: center;
                gap: 6px;
            }
            #achb-campaign-card .achb-action-link:hover {
                background: var(--achb-primary-hover);
                color: #ffffff !important;
                transform: translateY(-1px);
                box-shadow: 0 3px 10px rgba(225, 20, 99, 0.45);
            }

            /* Close Button (×) */
            #achb-campaign-card .achb-close-trigger {
                position: absolute;
                top: 8px;
                right: 8px;
                background: none;
                border: none;
                cursor: pointer;
                color: #94a3b8;
                font-size: 20px;
                line-height: 1;
                padding: 6px;
                transition: color .15s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10;
            }
            #achb-campaign-card .achb-close-trigger:hover {
                color: var(--achb-text);
            }

            /* Responsive */
            @media (max-width: 960px) {
                #achb-campaign-card .achb-brand-icon-box {
                    width: 100px;
                    min-width: 100px;
                }
            }
            @media (max-width: 782px) {
                #achb-campaign-card {
                    flex-direction: column;
                    align-items: stretch !important;
                }
                #achb-campaign-card .achb-brand-icon-box {
                    width: 100%;
                    min-height: 52px;
                    flex-direction: row;
                    gap: 8px;
                    padding: 8px 16px;
                    justify-content: flex-start;
                }
                #achb-campaign-card .achb-main-content {
                    padding: 14px 16px !important;
                }
                #achb-campaign-card .achb-action-zone {
                    padding: 0 16px 14px 16px;
                    justify-content: flex-start;
                }
            }
            </style>
            <?php
        }

        /* ------------------------------------------------------------------ */
        /*  Dismiss Script (AJAX + Animation)                                 */
        /* ------------------------------------------------------------------ */

        public function enqueue_scripts(): void {
            if ( self::$scripts_rendered || $this->should_skip() ) { return; }
            self::$scripts_rendered = true;
            $dismiss_nonce = wp_create_nonce( 'achb_dismiss_promo' );
            $ajax_url      = admin_url( 'admin-ajax.php' );
            ?>
            <script id="achb-campaign-card-js">
            (function () {
                var dismissTriggers = document.querySelectorAll('.achb-dismiss-action');
                if (!dismissTriggers.length) return;

                dismissTriggers.forEach(function(trigger) {
                    trigger.addEventListener('click', function(e) {
                        // Only respond to trusted user clicks, ignore extension/synthetic triggers
                        if (e && !e.isTrusted) return;
                        e.preventDefault();
                        var card = document.getElementById('achb-campaign-card');
                        if (card) {
                            card.style.transition = 'opacity .25s ease, transform .25s ease';
                            card.style.opacity    = '0';
                            card.style.transform  = 'translateY(-6px)';
                            setTimeout(function() { card.remove(); }, 260);
                        }
                        var fd = new FormData();
                        fd.append('action', 'achb_dismiss_promo_banner');
                        fd.append('nonce',  '<?php echo esc_js( $dismiss_nonce ); ?>');
                        fetch('<?php echo esc_url( $ajax_url ); ?>', {
                            method: 'POST',
                            credentials: 'same-origin',
                            body: fd
                        });
                    });
                });
            })();
            </script>
            <?php
        }

        /* ------------------------------------------------------------------ */
        /*  Render Single Banner                                              */
        /* ------------------------------------------------------------------ */

        public function render(): void {
            if ( self::$banner_rendered || $this->should_skip() ) { return; }
            self::$banner_rendered = true;

            $this->enqueue_styles();

            $coupon_url = esc_url( self::COUPON_URL );
            $icon_url   = esc_url( 'https://ps.w.org/advance-custom-html/assets/icon-128x128.png' );
            $local_logo = defined( 'ACHB_DIR_URL' ) ? esc_url( ACHB_DIR_URL . 'assets/images/logo.svg' ) : '';
            ?>
            <div id="achb-campaign-card">

                <!-- Left Brand Ribbon Block -->
                <div class="achb-brand-icon-box">
                    <img src="<?php echo $icon_url; ?>" alt="Advance Custom HTML" onerror="this.onerror=null;this.src='<?php echo $local_logo; ?>';" />
                    <span class="achb-brand-title"><?php esc_html_e( 'Custom HTML', 'advance-custom-html' ); ?></span>
                </div>

                <!-- Main Content Zone -->
                <div class="achb-main-content">
                    <div class="achb-title-line">
                        <span><?php esc_html_e( 'Black Friday Special: Get an Exclusive Discount on Advance Custom HTML Pro!', 'advance-custom-html' ); ?></span>
                        <span class="achb-offer-tag"><?php esc_html_e( 'Save 45%', 'advance-custom-html' ); ?></span>
                    </div>

                    <p class="achb-description">
                        <?php esc_html_e( 'Get 45% off on Advance Custom HTML Pro this Black Friday! Adds 40+ editor themes, multi-language syntax, and custom snippet controls.', 'advance-custom-html' ); ?>
                    </p>

                    <!-- 3 Highlighted Pro Features -->
                    <div class="achb-features-row">
                        <span><strong class="check-icon">✓</strong> <?php esc_html_e( '40+ Syntax Themes & Multi-Language Support', 'advance-custom-html' ); ?></span>
                        <span><strong class="check-icon">✓</strong> <?php esc_html_e( 'Custom Copy to Clipboard Button & Fold Gutter', 'advance-custom-html' ); ?></span>
                        <span><strong class="check-icon">✓</strong> <?php esc_html_e( 'Line Numbers, Active Line Highlighting & Auto-Wrap', 'advance-custom-html' ); ?></span>
                    </div>
                </div>

                <!-- Right Action Zone: Single CTA Button -->
                <div class="achb-action-zone">
                    <a href="<?php echo $coupon_url; ?>" target="_blank" rel="noopener noreferrer" class="achb-action-link">
                        <?php esc_html_e( 'Unlock PRO Features →', 'advance-custom-html' ); ?>
                    </a>
                </div>

                <!-- Dismiss Button (×) -->
                <button type="button"
                        class="achb-close-trigger achb-dismiss-action"
                        title="<?php esc_attr_e( 'Close', 'advance-custom-html' ); ?>"
                        aria-label="<?php esc_attr_e( 'Close', 'advance-custom-html' ); ?>">
                    &times;
                </button>

            </div>
            <?php
            $this->enqueue_scripts();
        }

        /* ------------------------------------------------------------------ */
        /*  AJAX Handler: Permanent Dismissal                                 */
        /* ------------------------------------------------------------------ */

        public function ajax_dismiss(): void {
            check_ajax_referer( 'achb_dismiss_promo', 'nonce' );
            // In production, permanently dismiss for this user across all pages
            if ( ! $this->is_development() ) {
                update_user_meta( get_current_user_id(), self::DISMISSED_KEY, 1 );
            }
            wp_send_json_success();
        }
    }

    ACHB_PromoBanner::instance();
}
