# De-Pagify v2.0 (Infinite Scroll)

De-pagify let's you easily enable [endless scroll][el] for paged sites such as
[fmylife][fml], [digg][digg], [failblog][fb] to enable functionality similar to
[Bing image search][bing] on any site that has a *More &raquo;*, *Next &raquo;*
or similar link.

The latest code & documentation will *always* be available at
[http://github.com/ericclemmons/de-pagify](http://github.com/ericclemmons/de-pagify),
but is also available at
[http://plugins.jquery.com/project/de-pagify](http://plugins.jquery.com/project/de-pagify)

---

## [Infinite Scroll Demo][demo]

---

## Usage

Typical usage will follow the pattern:
    
    jQuery(container).depagify(trigger, options);
    
* __container__:    Container for content on the remote page and where it will be
placed on the local page.

* __trigger__:      Link to "click" for the next page's content

### Options

* __find__:         (_defaults to `*`_) Selector or function to filter remote content

* __threshold__:    (_defaults to `0.90`_) Float, integer, string or function to
determine when to load remote content. The default is `0.90`, which is `90%`.  You can use `167`,
for example, to load content when the user scrolls within `167px` of the bottom of the page.
Also, you can specify a selector (such as `#footer`) to load content when the `#footer` element
scrolls into view. Finally, you can write your own function that returns `true` whenever you'd like
load the next page's content.

* __effect__:       (_defaults to `$(this).show()`_) Function to transition newly
loaded content.  (New content is wrapped by `$('<div />).hide()`)

* __events__:       `request` & `success` events are triggered before and after the GET request.

## Bookmarklets

* [jQuerify Bookmarklet][jq] which will inject jQuery into the page
* [De-pagify][dpbm] bookmarklet will inject the latest De-Pagify into the page

## Conclusion

If you can help in any way, please fork this project or provide feedback.

[demo]: http://uxdriven.com/static/js/uxdriven/jquery/de-pagify/demo.php "De-Pagify Demo"

[el]:   http://uipatternfactory.com/p=endless-scrolling/ "Endless Scroll"
[fml]:  http://www.fmylife.com "F My Life"
[digg]: http://digg.com "Digg"
[fb]:   http://failblog.org "Failblog"
[bing]: http://www.bing.com/images/search?q=jquery "jQuery Images"
[jq]:   http://www.learningjquery.com/2009/04/better-stronger-safer-jquerify-bookmarklet "jQuerify"
[dpbm]: https://github.com/ericclemmons/de-pagify/raw/master/bookmarklet.jquery.min.js

