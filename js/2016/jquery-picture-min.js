/**
 * jQuery Picture
 * http://jquerypicture.com
 * http://github.com/Abban/jQuery-Picture
 * 
 * May 2012
 * 
 * @version 0.9
 * @author Abban Dunne http://abandon.ie
 * @license MIT
 * 
 * jQuery Picture is a plugin to add support for responsive images to your layouts.
 * It supports both figure elements with some custom data attributes and the new
 * proposed picture format. This plugin will be made redundant when the format is
 * approved and implemented by browsers. Lets hope that happens soon. In the meantime
 * this plugin will be kept up to date with latest developments.
 * 
 */
(function(e) {
	e.fn.picture = function(t) {
		var n = {
			container: null
		},
		r = e.extend({},
		n, t);
		this.each(function() {
			function a(o) {
				if (o) if (s.get(0).tagName.toLowerCase() == "figure") {
					var a = s.data();
					e.each(a,
					function(e) {
						var n;
						n = e.replace(/[^\d.]/g, "");
						n && t.push(n)
					})
				} else s.find("source").each(function() {
					var n, r;
					n = e(this).attr("media");
					if (n) {
						r = n.replace(/[^\d.]/g, "");
						t.push(r)
					}
				});
				var c = 0;
				
				r.container == null ? n = e(window).width() * u: n = e(r.container).width() * u;
				e.each(t,
				function(e, t) {
					parseInt(n) >= parseInt(t) && parseInt(c) <= parseInt(t) && (c = t)
				});
				if (i !== c) {
					i = c;
					s.get(0).tagName.toLowerCase() == "figure" ? l() : f()
				}
			}
			function f() {
				var t = new Object;
				s.find("source").each(function() {
					var n, r, i;
					n = e(this).attr("media");
					r = e(this).attr("src");
					
					n ? i = n.replace(/[^\d.]/g, "") : i = 0;
					t[i] = r
				});
				
				if (s.find("img").length == 0) {
					var n = '<img src="' + t[i] + '" style="' + s.attr("style") + '" alt="' + s.attr("alt") + '">';
					s.find("a").length == 0 ? s.append(n) : s.find("a").append(n)
				} else s.find("img").attr("src", t[i])
			}
			function l() {
				var t = new Object,
				n = s.data();
				e.each(n,
				function(e, n) {
					var r;
					r = e.replace(/[^\d.]/g, "");
					r || (r = 0);
					t[r] = n;
					//console.log(t);
				});
				if (s.find("img").length == 0) {
			
					var r = '<div class="loading"><img src="' + t[i] + '" alt="' + s.attr("title") + '"></div>';
					
					ShowCaseDetailImage(t[i]);
					s.find("a").length == 0 ? s.prepend(r) : s.find("a").prepend(r)
				} else s.find("img").attr("src", t[i])
			}
			
			function LoadImg(src) {

    var browser = new Object();
    var obj = new Object();
  //  obj = imgObj;
    browser.useragent = window.navigator.userAgent.toLowerCase();
    browser.ie = /msie/.test(browser.useragent);
    browser.moz = /gecko/.test(browser.useragent);
   // var imgsrc = obj.attr("src");
    var image = new Image;
    image.src = src;
    if (browser.ie) {
        if (image.height === 0) {
            image.onload = function() {
                
                ShowCaseDetailImage();
            }

        } else {
           
            ShowCaseDetailImage();

        }
    } else {
        image.onload = function() {
            if (image.complete == true) {
             
                ShowCaseDetailImage();
            }
        }

    }

    image.onerror = function() {
        obj.parent().removeClass("img_loading").addClass("img_loading_error");
    }

}

function ShowCaseDetailImage() {

   // obj.parent().removeClass("loadding");
   // obj.parent().css("background","url("+obj.attr("src")+") no-repeat scroll center center / 100% 100% rgba(0, 0, 0, 0)");
	

    
 
}
			var t = new Array,
			n, i, s, o, u = 1;
			window.devicePixelRatio !== undefined && (u = window.devicePixelRatio);
			s = e(this);
			a(!0);
			o = !1;
			e(window).resize(function() {
				o !== !1 && clearTimeout(o);
				o = setTimeout(a, 200)
			})
		})
	}
})(jQuery);