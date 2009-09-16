# De-Pagify

De-pagify let's you easily enable [endless scroll][el] for paged sites such as
[fmylife][fml], [digg][digg], [failblog][fb] to enable functionality similar to
[Bing image search][bing].


## Demo

[View Demo][demo]

## Usage

Typical usage will follow the pattern:
    
    jQuery(link).depagify(options);

## Recipes

Here are a couple popular, ready-to-go bookmarklets you can inject into everyday
websites.  Keep in mind you may need to either inject jQuery with a bookmarklet
([link][jq]) and the [De-pagify][dpbm] bookmarklet.

* [Digg.com][diggbm] ([source][diggbmsource])
* [FMyLife.com][fmlbm] ([source][fmlbmsource])


### Options

Where _link_ matches the "Next Page" link and _options_ can override
any of the following:

* __container__: (_defaults to `body`_) Where content is appended and where
remote content comes from

* __filter__: (_defaults to `null`_) Selector or function to filter remote content

* __trigger__: (_defaults to `0.90`_) Float, integer, string or function to
determine when to load remote content.
The default is `0.90`, which is `90%`.
You can use `167`, for example, to load content when the user
scrolls within `167px` of the bottom of the page.
Also, you can specify a selector (such as `#footer`) to load
content when the `#footer` element scrolls into view.
Finally, you can write your own function that returns `true`
whenever you'd like load the next page's content.

* __request__: Callback when content is being requested.  Useful for cleaning up
the page or providing UI feedback.

* __success__: Callback when content is appended.  Useful for cleaning up new
content or messaging the user.

* __effect__:  (_defaults to `$(this).show()`_) Function to transition newly
loaded content.  (New content is wrapped by `$('<div />).hide()`)

## Examples

To play around with de-pagify, you should probably get the
[jQuerify Bookmarklet][jq] which will inject jQuery into the page.

Secondly, take advantage of the [De-Pagify Bookmarklet][dpbm]

### Example 1:  FMyLife.com

First & foremost, we can simply enable de-pagify via:
    
    jQuery('.pagination:last a:last').depagify({
        container: '#wrapper',
    });
    
Simply put, `.pagination:last a:last` will grab the last anchor tag in the last
`.pagination` element on the page.  All new content will be pulled from the remote
`#wrapper` element and appended to the current `#wrapper` element.

But let's say we want to only load content when the footer comes into view,
and we'd like a smoother animation instead of showing results immediately:
    
    jQuery('.pagination:last a:last').depagify({
        trigger: '#footer',
        container: '#wrapper',
        effect: function() {
            jQuery(this).fadeIn('slow');
        }
    });
    
When new content is inserted in the page, it is wrapped in a plain `<div>` to
simplify DOM manipulation.  This `<div>` is bound to `this` in the `effect`
callback.

So, we have a pretty nice, smooth experience now.  However, say you want to
remove the page lists (1, 2, 3, Next, Prev, etc.) and the ads to ensure a more
consistent experience:
    
    jQuery('.pagination:last a:last').depagify({
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
    
The code is self-explanatory.  When we send off the request, we remove the
`.pagination` element, as it is not needed anymore.  Similarly, when the new
content is inserted all ads are removed.  Both events could take place entirely
in the `success` callback, but for this example I separated the two.

## Conclusion

If you can help in any way, please fork this project or provide feedback.

[demo]: http://uxdriven.com/static/js/uxdriven/jquery/de-pagify/demo.php "De-Pagify Demo"

[el]:   http://uipatternfactory.com/p=endless-scrolling/ "Endless Scroll"
[fml]:  http://www.fmylife.com "F My Life"
[digg]: http://digg.com "Digg"
[fb]:   http://failblog.org "Failblog"
[bing]: http://www.bing.com/images/search?q=jquery "jQuery Images"
[jq]:   http://www.learningjquery.com/2009/04/better-stronger-safer-jquerify-bookmarklet "jQuerify"
[dpbm]: http://uxdriven.com/static/js/uxdriven/jquery/de-pagify/bookmarklet.jquery.js

[fmlbm]:    http://uxdriven.com/static/js/uxdriven/jquery/de-pagify/recipes/fmylife.bookmarklet.js
[fmlbmsource]:    http://uxdriven.com/static/js/uxdriven/jquery/de-pagify/recipes/fmylife.js
[diggbm]:    http://uxdriven.com/static/js/uxdriven/jquery/de-pagify/recipes/digg.bookmarklet.js
[diggbmsource]:    http://uxdriven.com/static/js/uxdriven/jquery/de-pagify/recipes/digg.js