;(function($) {
    $('.pagination:last a:last').depagify({
        trigger: '#footer',
        container: '#wrapper',
        effect: function() {
            jQuery(this).fadeIn('slow');
        },
        request: function(options) {
            jQuery('.pagination', options.container).remove();
        },
        success: function(event, options) {
            jQuery('#ad_leaderboard', options.container).remove();
        }
    });
})(jQuery);
