	var oldval=null;

	var ov=0;
	
	
function webInit() {
    		var color=$(".brands_text").eq(0).attr("color");
	  $(".dot_wrap_about_nav").css("color",color);
	  $(".show_arrow .detailBox").css("color",color);
	pageLength = $(".page").length,
	windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	//pagesArr.push(page1_action),
	//pagesArr.push(page2_action),
	//pagesArr.push(page3_action),
	//pagesArr.push(page4_action),
	
	$(window).resize(function() {
		_onResize()
	}),
	_onResize(),
	$(document).keydown(function(e) {
		40 == e.keyCode || 39 == e.keyCode ? gotoPage_Next() : (38 == e.keyCode || 37 == e.keyCode) && gotoPage_Pre()
	});
		

	var e = ".jspHorizontalBar, .jspVerticalBar";

	
	$(".up").click(function() {
		gotoPage_Pre()
		
	}),
	$(".down").click(function() {
		gotoPage_Next()
	}),
	$("#main").on("mousewheel", _wheelHandler);
	
	$(".spans").mouseenter(function(){
	
	   var spindex=$(".spans").index(this);
	   
	   gotoPage(spindex);
	
	})
	
	
	
}




function gotoPage_Pre() {

	if (currentIndex == 0) return;
	lastIndex = currentIndex,
	currentIndex = Math.max(0, Math.min(pageLength, currentIndex - 1)),
	_navigate();
	var color=$(".brands_text").eq(currentIndex).attr("color");
    	setTimeout(function(){
	
	  $(".dot_wrap_about_nav").css("color",color);
	   $(".show_arrow .detailBox").css("color",color);
	},600);
	$("#nav .spans").eq(currentIndex).addClass("cur").siblings().removeClass("cur");
}
function gotoPage_Next() {
	if (currentIndex == pageLength - 1) return;
	lastIndex = currentIndex,
	currentIndex = Math.max(0, Math.min(pageLength - 1, currentIndex + 1)),
	_navigate();
	var color=$(".brands_text").eq(currentIndex).attr("color");
	setTimeout(function(){
	
	  $(".dot_wrap_about_nav").css("color",color);
	   $(".show_arrow .detailBox").css("color",color);
	},600);
  
	$("#nav .spans").eq(currentIndex).addClass("cur").siblings().removeClass("cur");
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
	}), 
	currentIndex == 0 ? $("#scrollTips_pre").fadeOut() : $("#scrollTips_pre").fadeIn(), 
	currentIndex == pageLength - 1 ? $("#scrollTips_next").fadeOut() : $("#scrollTips_next").fadeIn()),
	isScrolling = !1;
	
	play(currentIndex),
	lastIndex >= 0 && lastIndex <= pageLength - 1 && reset(lastIndex)
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
	$(".zunon_alert").css({heigth:windowHeight+"px",width:windowWidth+"px"});
    if(windowWidth<1450){
   //  $(".contaner_parent").css({"-moz-background-size":"100%","-webkit-background-size":"100%","-o-background-size":"100%", "background-size":"100%"});
     }
	//var topval=(windowHeight-$(".dot_wrap").height())/2+35;

  	var number = windowHeight/windowWidth;
	    if(windowWidth<1440){

	   if(windowWidth>windowHeight&&number<0.625){
       $(".contaner_parent").css("");
       }
       }	


	
	

//	$(".dot_wrap").css("top",topval+"px");

}


function resize($img) {
        var options = {
            align: "center",
            valign: "center"
        };
		
var windowW=$(window).width();

var windowH=$(window).height();

   if ($img.height() === 0) {
            $img.load(function() {
                resize($(this));
            });
            return;
        }
        var vp = getViewportSize(), ww = vp.width, wh = vp.height, iw = $img.width(), ih = $img.height(), rw = wh / ww, ri = ih / iw, newWidth, newHeight, newLeft, newTop, properties;
        if (rw > ri) {
            newWidth = wh / ri;
            newHeight = wh;
        } else {
            newWidth = ww;
            newHeight = ww * ri;
        }
        properties = {
            width: newWidth + "px",
            height: newHeight + "px",
            top: "auto",
            bottom: "auto",
            left: "auto",
            right: "auto"
        };
        if (!isNaN(parseInt(options.valign, 10))) {
            properties.top = 0 - (newHeight - wh) / 100 * parseInt(options.valign, 10) + "px";
        } else if (options.valign == "top") {
            properties.top = 0;
        } else if (options.valign == "bottom") {
            properties.bottom = 0;
        } else {
            properties.top = (wh - newHeight) / 2;
        }
        if (!isNaN(parseInt(options.align, 10))) {
            properties.left = 0 - (newWidth - ww) / 100 * parseInt(options.align, 10) + "px";
        } else if (options.align == "left") {
            properties.left = 0;
        } else if (options.align == "right") {
            properties.right = 0;
        } else {
            properties.left = (ww - newWidth) / 2;
        }
        $img.css(properties);
    }

    function getViewportSize() {
        var elmt = window, prop = "inner";
        if (!("innerWidth" in window)) {
            elmt = document.documentElement || document.body;
            prop = "client";
        }
        return {
            width: elmt[prop + "Width"],
            height: elmt[prop + "Height"]
        };
    }
function gotoPage(e) {
	currentIndex != e && (lastIndex = currentIndex, currentIndex = e, _navigate())
	$("#nav .spans").eq(currentIndex).addClass("cur").siblings().removeClass("cur");
}

function addMouseWheel() {
	$("#main").on("mousewheel", _wheelHandler)
}
function removeMouseWheel() {
	$("#main").off("mousewheel", _wheelHandler)
}
function _wheelHandler(e, t, n, r) {
var $this = $(this),
        timeoutId = $this.data('timeoutId');
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
	   $this.data('timeoutId', setTimeout(function() {
    
   try{

   }catch(eve){
    e.stopPropagation(); 
	
	}
  
	    0 > t ? gotoPage_Next() : gotoPage_Pre();

        $this.removeData('timeoutId');
        $this = null
    }, 500));
    return false;
}


function loadImg(e) {
	var t = new Image;
	t.onload = function() {
		imgLoadedNum += 1,
		getParent()
	},
	t.onerror = function() {
		alert(e)
	},
	t.src = imgsrc[e],
	e < imgCount - 1 && loadImg(e + 1)
}
function getParent() {
	var e = Math.floor(imgLoadedNum / imgCount * 100);
	$("#pernum").html(e + "%")
}
function ontimego() {
	getParent(),
	imgLoadedNum >= imgCount && (webInit(), window.clearInterval(timeHandle))
}
function checkIfWinner() {
	var e = getIfWinner();
	$("#ifWinner_tip").html(e.txt)
}



$(function(){

  $(".detailBox").click(function(){
    
	  var db=$(".detailBox").index(this);
	  
	  $(".alert_box").eq(db).fadeIn(500);
	  
	  
  
  }); 
  
  $(".alert_close").click(function(){
  
   $(".alert_box").fadeOut(500);
  });
  
  $(".closealert").click(function(){
   $(".alert_box").fadeOut(500);
  
  });
  

	
	$(".gotop").click(function(){

	});
  



})



