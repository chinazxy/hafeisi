
	
if ('undefined' != typeof jQuery) { (function($) {
        'use strict';
        $.imgpreload = function(imgs, settings) {
            settings = $.extend({},
            $.fn.imgpreload.defaults, (settings instanceof Function) ? {
                all: settings
            }: settings);

            if ('string' == typeof imgs) {
                imgs = [imgs];
            }

            var loaded = [];

            $.each(imgs,
            function(i, elem) {
                var img = new Image();

                var url = elem;

                var img_obj = img;

                if ('string' != typeof elem) {
                    url = $(elem).attr('src') || $(elem).css('background-image').replace(/^url\((?:"|')?(.*)(?:'|")?\)$/mg, "$1");

                    img_obj = elem;
                }

                $(img).bind('load error',
                function(e) {
                    loaded.push(img_obj);

                    $.data(img_obj, 'loaded', ('error' == e.type) ? false: true);
                    if (settings.each instanceof Function) {
                        settings.each.call(img_obj, loaded.slice(0));
                    }

                    if (loaded.length >= imgs.length && settings.all instanceof Function) {
                        settings.all.call(loaded);
                    }

                    $(this).unbind('load error');
                });

                img.src = url;
            });
        };

        $.fn.imgpreload = function(settings) {
            $.imgpreload(this, settings);

            return this;
        };

        $.fn.imgpreload.defaults = {
            each: null,
            all: null
        };

    })(jQuery);
}


$(function(){
	$(window).load(function(){
		
		 init();
	});
	function init(){
		
			var h=$(window).height();
	var w=$(window).width();
	
	$(".wis").height(h);
	$(".swiper-slide").width(w);
	}
  $(window).resize(function(){
	 init();
  });
  
  

  
  
   var imgNum = 0;
    var images = [];
	    function getallBgimages() {
        var url, B = [],
        A = document.getElementsByTagName('*');
        A = B.slice.call(A, 0, A.length);
        while (A.length) {
            url = document.deepCss(A.shift(), 'background-image');
            if (url) url = /url\(['"]?([^")]+)/.exec(url) || [];
            url = url[1];
            if (url && B.indexOf(url) == -1) B[B.length] = url
        }
        return B
    }
    document.deepCss = function(who, css) {
        if (!who || !who.style) return '';
        var sty = css.replace(/\-([a-z])/g,
        function(a, b) {
            return b.toUpperCase()
        });
        if (who.currentStyle) {
            return who.style[sty] || who.currentStyle[sty] || ''
        }
        var dv = document.defaultView || window;
        return who.style[sty] || dv.getComputedStyle(who, "").getPropertyValue(css) || ''
    }
    Array.prototype.indexOf = Array.prototype.indexOf ||
    function(what, index) {
        index = index || 0;
        var L = this.length;
        while (index < L) {
            if (this[index] === what) return index; ++index
        }
        return - 1
    }
   preLoadImg();

    function preLoadImg() {
		
        var imgs = document.images;
        for (var i = 0; i < imgs.length; i++) {
            images.push(imgs[i].src)
        }
        var browser = navigator.appName;
        if (browser == "Microsoft Internet Explorer") {
            var b_version = navigator.appVersion;
            var version = b_version.split(";");
            var trim_Version = version[1].replace(/[ ]/g, "");
            if (trim_Version != "MSIE5.0" && trim_Version != "MSIE6.0" && trim_Version != "MSIE7.0" && trim_Version != "MSIE8.0") {
                var cssImages = getallBgimages();
                for (var j = 0; j < cssImages.length; j++) {
                    images.push(cssImages[j])
                }
            }
        } else {
            var cssImages = getallBgimages();
            for (var j = 0; j < cssImages.length; j++) {
                images.push(cssImages[j])
            }
        }
        $.imgpreload(images, {
            each: function() {
                var status = $(this).data('loaded') ? 'success': 'error';
                if (status == "success") {
                    var v = (parseFloat(++imgNum) / images.length).toFixed(2);
                    $(".loadbfb").html(Math.round(v * 100)+"%");
	
                }
            },
            all: function() {
				
				
                $(".loadbfb").html("100"+"%");
				
								
					$(".app-loading").fadeOut(200,function(){
						
						$(".gpage").show();
						  var mySwiper = new Swiper('.swip_1',{
      direction: 'vertical',
    slidesPerView: 1,
	speed: 800,
    mousewheelControl: true,
 
	  paginationClickable: true,
  
    moveStartThreshold: 100,
	loop:true

  })
						
					});
                
            }
        })
    }
	
});