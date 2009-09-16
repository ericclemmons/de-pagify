/*
    Script:         depagify.jquery.js
    Author:         eric@uxdriven.com
    
    Repository:     http://github.com/ericclemmons/de-pagify
    
    Copyright (c) 2009 Eric Clemmons
    
    Dual licensed under the MIT and GPL licenses:
      http://www.opensource.org/licenses/mit-license.php
      http://www.gnu.org/licenses/gpl.html
*/

;(function($) {
    
    // "Next" link element
    var next;
    
    var options = {
        // Where content is appended and where remote content comes from
        container:      'body',
        // Selector or function to only insert certain elements
        filter:         null,
        // Request when footer becomes visible...
        trigger:    '#footer',
        // or when 167px from the bottom of the page...
        trigger:    167,
        // or when custom function returns true...
        trigger:    function(event) { return true; },
        // or when user scrolls through 90% of document...
        trigger:    0.90,
        
        // Hook before content is requested
        request:    function(options) {},
        // Hook after content is appended
        success:    function(event, options) {},
        
        // Effect to reveal new content
        effect:     function() {
            $(this).show();
        }
    };
    
    $.fn.depagify = function(params) {
        options = $.extend(options, params);
        
        // Store "Next" link for private functions
        next = this;
        
        // Monitor scrolling
        enable();
        
        // Allow chaining
        return next;
    };
    
    var enable = function() {
        $(window).bind("scroll", monitor);
    };
    
    var disable = function() {
        $(window).unbind('scroll', monitor);
    };
    
    var monitor = function(event) {
        if (isTriggered(event)) {
            disable();
            loadNext();
        };
    };
    
    var isTriggered = function(event) {
        switch (typeof options.trigger) {
            case 'function':
                return options.trigger.call(element, event);
                break;
            
            case 'string':
                console.log(jQuery(options.trigger));
                break;
            
            default:
                var w = $(window);
                var progress = w.scrollTop() + w.height();
                
                if (options.trigger <= 1) {
                    var threshold = $('body').innerHeight() * options.trigger;
                    
                    return (progress >= threshold) ? true : false;
                } else {
                    console.log('Offset not supported yet');
                }
                break;
        }
    };
    
    var loadNext = function() {
        // Call request hook
        options.request.call(next, options);
        
        // Format url as "?page=1 div#wrapper div.post"
        var url = [next.attr('href'), options.container, options.filter].join(' ');
        
        // Create a wrapper div, as we're appending content
        jQuery('<div />').hide()
                         .appendTo(options.container)
                         .load(url, loaded);
    };
    
    var loaded = function(event) {
        // Reveal content
        options.effect.call(this);
        
        // Re-assign current "Next" link
        next = $(this).find(next.selector);
        
        // Call success hook
        options.success.apply(next, [event, options]);
        
        // Monitor window scrolling
        enable();
    };
        
})(jQuery);

/*
    Script:         depagify.jquery.js
    Author:         eric@uxdriven.com
    
    Repository:     http://github.com/ericclemmons/de-pagify
*/

;(function($) {
    
    // "Next" link element
    var next;
    
    var options = {
        // Where content is appended and where remote content comes from
        container:      'body',
        // Selector or function to only insert certain elements
        filter:         null,
        // Request when footer becomes visible...
        trigger:    '#footer',
        // or when 167px from the bottom of the page...
        trigger:    167,
        // or when custom function returns true...
        // trigger:    function(event) { return true; },
        // or when user scrolls through 90% of document...
        // trigger:    0.90,
        
        // Hook before content is requested
        request:    function(options) {},
        // Hook after content is appended
        success:    function(event, options) {},
        
        // Effect to reveal new content
        effect:     function() {
            $(this).show();
        }
    };
    
    $.fn.depagify = function(params) {
        options = $.extend(options, params);
        
        // Store "Next" link for private functions
        next = this;
        
        // Monitor scrolling
        enable();
        
        // Allow chaining
        return next;
    };
    
    var enable = function() {
        $(window).bind("scroll", monitor);
    };
    
    var disable = function() {
        $(window).unbind('scroll', monitor);
    };
    
    var monitor = function(event) {
        if (isTriggered(event)) {
            disable();
            loadNext();
        };
    };
    
    var isTriggered = function(event) {
        if ($.isFunction(options.trigger)) {
            return options.trigger.call(next, event);
        }
        
        var w = $(window);
        var progress = w.scrollTop() + w.height();
        
        switch (typeof options.trigger) {
            // If trigger is a selector
            case 'string':
                // Determine trigger's offset
                var threshold = $(options.trigger).offset().top;
                
                break;

            default:
                // Trigger based on scale & offset depends on body height
                var height = $('body').innerHeight();
                
                // If trigger is proportionate to body height...
                if (options.trigger > 0 && options.trigger <= 1) {
                    var threshold = height * options.trigger;
                } else {
                    var threshold = height - options.trigger;
                }
                
                break;
        }
        
        return (progress >= threshold) ? true : false;
    };
    
    var loadNext = function() {
        // Call request hook
        options.request.call(next, options);
        
        // Format url as "?page=1 div#wrapper div.post"
        var url = [next.attr('href'), options.container, options.filter].join(' ');
        
        // Create a wrapper div, as we're appending content
        jQuery('<div />').hide()
                         .appendTo(options.container)
                         .load(url, loaded);
    };
    
    var loaded = function(responseText, status, event) {
        // Reveal content
        options.effect.call(this);
        
        // Re-assign current "Next" link
        next = $("<div />").append(responseText.replace(/<script(.|\s)*?\/script>/g, ""))
                           .find(next.selector);
        
        // Call success hook
        options.success.apply(next, [event, options]);
        
        // Monitor window scrolling
        enable();
    };
        
})(jQuery);