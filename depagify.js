var depagify = (function() {
    site = null;
    
    var rulesUrl    =   'http://uxdriven.com/static/js/jquery/de-pagify/sites.js',
        jQueryUrl   =   'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js',
        attempts    =   0,
        options     =   {
            delay:  250,
            limit:  0,
            rules:  {},
            triggerScale:  0.9
        };
    
    var checkForJquery = function() {
        setTimeout(function() {
            if (++attempts === options.limit) {
                alert("Could not load jQuery after " + attempts + " attempts.");
                return false;
            }
            
            if (typeof jQuery === 'undefined') {
                checkForJquery();
            } else {
                loadScript(rulesUrl);
            }
        }, options.delay);
    };
    
    var loadScript = function(url) {
        script = document.createElement('script');
        script.setAttribute('src', url);
        document.getElementsByTagName('head')[0].appendChild(script);
    };
    
    var monitor = function() {
        var triggerOffset = jQuery('body').innerHeight() * options.triggerScale;
        var currentOffset = jQuery(window).scrollTop() + jQuery(window).height();
        
        if (currentOffset > triggerOffset) {
            _disable();
            loadNextPage();
        }
    };
    
    var loadNextPage = function() {
        var url = jQuery(site.next).attr('href');
        
        if (site.onRequest) {
            site.onRequest(site);
        }
        
        jQuery('<div />').appendTo(site.content)
                         .load(url + " " + site.content, function(event) {
                             if (site.onComplete) {
                                 site.onComplete(event, this, site);
                             }
                             
                             jQuery(window).scroll(monitor);
                         });
    };
    
    var _disable = function() {
        jQuery(window).unbind('scroll', monitor);
    };
    
    return {
        init: function() {
            if(typeof jQuery === 'undefined') {
                loadScript(jQueryUrl);
            }
            
            checkForJquery();
        },
        
        addRules: function(rules) {
            options.rules = jQuery.extend(options.rules, rules);
            
            return this;
        },
        
        enable: function() {
            var host = window.location.host || window.location.hostname;
            site = options.rules[host];
            
            if (site) {
                jQuery(window).scroll(monitor);
            } else {
                alert("Sorry, can't find de-pagify rules for " + host + ".");
            }
            
            return this;
        },
        
        disable: function() {
            this._disable();
        }
    };
    
})();