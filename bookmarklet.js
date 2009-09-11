;(function() {
    var attempts = 0,
        limit    = 10,
        delay    = 250;
        
    var dp = document.createElement('script');
    dp.setAttribute('src', 'http://uxdriven.com/static/js/jquery/de-pagify/depagify.js');
    document.getElementsByTagName('head')[0].appendChild(dp);
    
    var checkForDepagify = function() {
        setTimeout(function() {
            if (++attempts === limit) {
                alert("Could not load jQuery after " + attempts + " attempts.");
                return false;
            }
            
            if (typeof depagify === 'undefined') {
                checkForDepagify();
            } else {
                depagify.init();
            }
        }, delay);
    };
    
    checkForDepagify();
})();