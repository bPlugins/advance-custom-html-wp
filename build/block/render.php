<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$achb_id   = wp_unique_id('bPluginsCustomHtml-');
$achb_html = $attributes['HTML'];
?>
<div <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> id='<?php echo esc_attr($achb_id); ?>'>
<?php
// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
echo $achb_html;
?>
</div>
