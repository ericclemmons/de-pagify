;(function($) {
    var attempts = 0,
        limit    = 10,
        delay    = 250;
        
    var dp = document.createElement('script');
    dp.setAttribute('src', 'https://github.com/ericclemmons/de-pagify/raw/master/depagify.jquery.js');
    document.getElementsByTagName('head')[0].appendChild(dp);
    
    var checkForDepagify = function() {
        setTimeout(function() {
            if (++attempts === limit) {
                alert('Could not load De-Pagify after ' + attempts + ' attempts.');
                return false;
            }
            
            if (typeof $.fn.depagify === 'undefined') {
                checkForDepagify();
            } else {
                $('<div>De-Pagify Loaded!</div>').css({
                    'position': 'fixed',
                    'display': 'inline',
                    'top': '1em',
                    'right': '1em',
                    'padding': '2em',
                    'color': 'white',
                    'border': '0.25em solid rgba(100%, 100%, 100%, 0.25)',
                    'background': '#000',
                    'box-shadow': '0 0.25em 1em rgba(0, 0, 0, 0.5)',
                    '-moz-box-shadow': '0 0.25em 1em rgba(0, 0, 0, 0.5)',
                    '-webkit-box-shadow': '0 0.25em 1em rgba(0, 0, 0, 0.5)',
                    'border-radius': '1em',
                    '-moz-border-radius': '1em',
                    '-webkit-border-radius': '1em'
                }).hide()
                  .appendTo('body')
                  .fadeIn('slow')
                  .animate({opacity: 1.0}, 3000)
                  .fadeOut('slow', function() { $(this).remove(); });
            }
        }, delay);
    };
    
    checkForDepagify();
})(jQuery);