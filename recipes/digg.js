;(function($) {
    $('.nextprev:last').depagify({
        trigger: '#footer',
        container: 'div.main',
        filter: '.news-summary',
        request: function(options) {
            jQuery('.pages', options.container).remove();
        }
    });
})(jQuery);