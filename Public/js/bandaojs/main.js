	var oldval=null;

	var ov=0;
	
	
	
	

function webInit() {
	$("#pageloader").hide(),
	$("#header,#footer").show(),
	pageLength = $(".page").length,
	windowWidth = $(window).width(),
	windowHeight = $(window).height(),

	$(window).resize(function() {
		_onResize()
	}),
	_onResize(),
	$(document).keydown(function(e) {
		40 == e.keyCode || 39 == e.keyCode ? gotoPage_Next() : (38 == e.keyCode || 37 == e.keyCode) && gotoPage_Pre()
	});
		
    $(".yswz").css("line-height",windowHeight+"px");
	var e = ".jspHorizontalBar, .jspVerticalBar";
	$(".scroll-pane").bind("jsp-initialised",
	function(e, t) {}).jScrollPane(),
	$("#item-7").hover(function() {
		$(this).find(".item7_subNav").stop(!0, !1).slideDown("fast"),
		$(this).find("#sub_nav_7").removeClass("item-7-default").addClass("item-7-hover")
	},
	function() {
		$(this).find(".item7_subNav").stop(!0, !1).slideUp("fast"),
		$(this).find("#sub_nav_7").removeClass("item-7-hover").addClass("item-7-default")
	}),
	$(".arrow").click(function() {
	   
		gotoPage_Next();
		
		setTimeout(function(){
		$(".yswz").fadeIn(500);
		backgroundList = [];
		
		$( '.imgsrc' ).each( function() { 
         backgroundList.push( { 
        src: $( this ).attr( 'src' ),
        valign: $( this ).data( 'data-valign' ),
	    fade: 2000,
		complete:function(){
		 $.vegas( 'stop');
		setTimeout(function(){
		$(".yswz").fadeOut(500,function(){
		$(".header2").fadeIn();
		$(".grayimg").each(function(){
		  
		  content_loading($(this));
		 
	     });
		
		});
		
		$(".vegas-background").fadeOut();
		
		},1000);
		
		}
         } );
        } );

	 
	 	$.vegas( 'slideshow', { 
			delay: 3000,
			backgrounds: backgroundList
	   });
		},1200);
		
	}),
	
	$(".arrow").mouseenter(function(){
	
	   $(this).stop().animate({marginTop:5},200);
	
	}),
	
		$(".arrow").mouseleave(function(){
	
	$(this).stop().animate({marginTop:0},200);
	
	}),
	$("#main").on("mousewheel", function(){
	
	 return false;
	
	
	});
}

 function content_loading(imageobj) {
        var browser = new Object();
        var obj = new Object();
        obj = imageobj;
        browser.useragent = window.navigator.userAgent.toLowerCase();
        browser.ie = /msie/.test(browser.useragent);
        browser.moz = /gecko/.test(browser.useragent);
        var imgsrc = obj.attr("src");
        var image = new Image;
        image.src = imgsrc;
        if (browser.ie) {
            if (image.height === 0) {
                image.onload = function() {
                    obj.attr("src", image.src);
                    showContentImage(obj);
                }

            } else {
                obj.attr("src", image.src);
                showContentImage(obj);

            }
        } else {
            image.onload = function() {
                if (image.complete == true) {
                    obj.attr("src", image.src);
                    showContentImage(obj);
                }
            }

            image.onerror = function() {
                obj.parent().addClass("img_loading_error");
                $(".img_loading_error").height("250px")
            }

        }

    }

    function showContentImage(obj) {
        $(".wrap-class").removeClass("wrap-class");
		var $contains=obj.parent().parent().parent();
		var $Loading=$contains.prev();
		$Loading.fadeOut(200,function(){
		
			$contains.css("visibility","visible").hide().fadeIn();
		
		})
	
        obj.fadeIn(1000);
    }


function gotoPage_Pre() {

	if (currentIndex == 0) return;
	lastIndex = currentIndex,
	currentIndex = Math.max(0, Math.min(pageLength, currentIndex - 1)),
	_navigate();
	//$("#nav li").eq(currentIndex).addClass("cur").siblings().removeClass("cur");

	//showDetail(currentIndex);
}
function gotoPage_Next() {
	if (currentIndex == pageLength - 1) return;
	lastIndex = currentIndex,
	currentIndex = Math.max(0, Math.min(pageLength - 1, currentIndex + 1)),
	_navigate();
	//showDetail(currentIndex);
		//$("#nav li").eq(currentIndex).addClass("cur").siblings().removeClass("cur");
}
function _navigate() {
	function e() {}
	isScrolling || (isScrolling = !0, $("#main").stop().animate({
		top: -1 * currentIndex * fixHeight
	},
	{
		duration: 1500,
		easing: "easeInOutExpo",
		queue: !1,
		complete: e
	}), currentIndex == 0 ? $("#scrollTips_pre").fadeOut() : $("#scrollTips_pre").fadeIn(), currentIndex == pageLength - 1 ? $("#scrollTips_next").fadeOut() : $("#scrollTips_next").fadeIn()),
	isScrolling = !1;
	//pagesArr[currentIndex].play(),
	//lastIndex >= 0 && lastIndex <= pageLength - 1 && pagesArr[lastIndex].reset()
}
function _onResize() {
	windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	fixHeight = windowHeight,
	$(".page").css({
		width: windowWidth,
		height: fixHeight
	}),
	$("#main").css("height", Math.round(fixHeight * $(".page").length)),
	setTimeout(_navigate, 300);
	
	
var uliswidth=$(".dot_ul_s li").length*40-24;
	$(".wh").css({
		width: windowWidth,
		height: fixHeight
	});
	
		$(".hid_img").css({
		width: windowWidth,
		height: fixHeight
	});
	
	
$(".live_wrap").css("left",(windowWidth)/2-uliswidth/2);
	
	//set_ie6_position()
}

function gotoPage(e) {
	currentIndex != e && (lastIndex = currentIndex, currentIndex = e, _navigate())
}



function addMouseWheel() {
	$("#main").on("mousewheel", _wheelHandler)
}
function removeMouseWheel() {
	$("#main").off("mousewheel", _wheelHandler)
}
function _wheelHandler(e, t, n, r) {
	e.preventDefault(),
	0 > t ? gotoPage_Next() : gotoPage_Pre()
}


function checkIfWinner() {
	var e = getIfWinner();
	$("#ifWinner_tip").html(e.txt)
}




