De-Pagify
=========

__De-pagify__ will let you browse sites such as [failblog][failblog] &
[fmylife][fml] without having to click the _Next_ link.  Instead, the
next page's contents will be loaded dynamically as you near the bottom
of the page.


Install
-------

Simply add the following bookmarklet to your toolbar or favorites:

__<a href="javascript:(function(){var D=0,B=10,C=250;var E=document.createElement("script");E.setAttribute("src","http://uxdriven.com/static/js/jquery/de-pagify/depagify.js");document.getElementsByTagName("head")[0].appendChild(E);var A=function(){setTimeout(function(){if(++D===B){alert("Could not load jQuery after "+D+" attempts.");return false;}if(typeof depagify==="undefined"){A();}else{depagify.init();}},C);};A();})();">de-pagify</a>__
