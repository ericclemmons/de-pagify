/*
    Script:         depagify.jquery.js
    Author:         eric@uxdriven.com
    Version:        2.0.1
    Repository:     http://github.com/ericclemmons/de-pagify
    
    Copyright (c) 2011 Eric Clemmons
    
    Dual licensed under the MIT and GPL licenses:
      http://www.opensource.org/licenses/mit-license.php
      http://www.gnu.org/licenses/gpl.html
*/

;(function($) {

    // "Trigger" link element
    var $trigger = null;

    var options = {
        // How many milliseconds to wait between subsequent requests (ie, wait for completed animations)
        delay:      0,
        
        // Selector or function provided to the `filter` function for limiting elements
        filter:     null,
        
        // Request when footer becomes visible...
        threshold:  '#footer',
        // or when 167px from the bottom of the page...
        threshold:  167,
        // or when custom function returns true...
        threshold:  function(event) { return true; },
        // or when user scrolls through 90% of document...
        threshold:  0.90,
        
        // Effect to reveal new content
        effect:     $(this).show,
        
        events:     {}
    };

    $.fn.depagify = function(t, o) {
        $trigger = $(t);
        options = $.extend(options, o);
        
        this.bind(options.events);
        
        enableMonitor.call(this);
        
        return this;
    };

    var enableMonitor = function() {
        $(window).bind('scroll', $.proxy(monitor, this));
        
        monitor.call(this);
    };

    var disableMonitor = function() {
        $(window).unbind('scroll', $.proxy(monitor, this));
    };

    var monitor = function(event) {
        if (isTriggered(event)) {
            loadNext.call(this);
        };
    };

    var isTriggered = function(event) {
        if ($.isFunction(options.threshold)) {
            return options.threshold.call($trigger, event);
        };
        
        var $window     = $(window);
        var progress    = $window.scrollTop() + $window.height();
        
        switch (typeof options.threshold) {
            // If threshold is a selector
            case 'string':
                // Determine threshold's offset
                var offset = $(options.threshold).offset().top;
                
                break;
            
            default:
                // Threshold based on scale & offset depends on body height
                var height = $('body').innerHeight();
                
                var offset = (options.threshold > 0 && options.threshold <= 1)
                           ? height * options.threshold // Threshold is a percentage
                           : height - options.threshold;// Threshold is distance from bottom;
                
                break;
        }
        
        return (progress >= offset) ? true : false;
    };

    var loadNext = function() {
        disableMonitor.call(this);
        
        // Skip if no more pages are found
        if (! $trigger.length) {
            return false;
        };
        
        // Call request hook
        this.trigger('request');
        
        // Format url as "?page=1 div#wrapper div.post"
        var url = [
            $trigger.attr('href'),
            options.container,
            options.filter
        ].join(' ');
        
        // GET next page
        $.get(
            $trigger.attr('href'),
            $.proxy(loaded, this)
        );
    };

    var loaded = function(responseText, status, event) {
        // Narrow down content
        var $content = $(this.selector, responseText);
        
        if (options.filter) {
            $content = $content.find('*').filter(options.filter);
        };
        
        // Hide & append to container
        this.append($content.hide());
        
        // Re-assign trigger to next one
        $trigger = $($trigger.selector, responseText);
        
        // Fade in content
        options.effect.call($content);
        
        // Call success hook
        this.trigger('success');
        
        // Enable monitor (after delay)
        setTimeout($.proxy(enableMonitor, this), options.delay);
    };
        
})(jQuery);