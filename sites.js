// Use JSON-P for defining rules & enabling it for the site
depagify.addRules({
    
    'www.fmylife.com': {
        'content':  '#wrapper',
        'next':     '.pagination:last a[innerHTML^=Next]',
        
        'onRequest':    function(params) {
            jQuery('.pagination', params.content).remove();
        },
        'onComplete':   function(event, node, params) {
            jQuery('#ad_leaderboard', node).remove();
        }
    },
    
    'failblog.org': {
        'content':  '#pane2',
        'next':     '.navigation:last a[innerHTML^=Next]',
        
        'onRequest':    function() {
            jQuery('.navigation').remove();
        }
    }
    
}).enable();