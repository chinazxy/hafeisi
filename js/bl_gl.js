	var oldval=null;

	var ov=0;
	
	var dstr=0;
	var astr=0;
	var videoMove=0;
		var nindexs=0;
	var chinaText="";
	
 var baglen= 0;
	var bagindex=0;
	var  bagcindex=0;
	var step=0;
	var baaner_width=$(window).width();
	var plens=$(".bpage").length;
	if(plens<10){
	  astr="0"+plens;
	}else{
	 astr=plens;
	}
	$(".ban2").html(astr);
function webInit() {
	$("#pageloader").hide(),
	$("#header,#footer").show(),
	pageLength = $(".bpage").length,
	windowWidth = $(window).width(),
	windowHeight = $(window).height(),

	$(window).resize(function() {
		_onResize()
	}),
		windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	fixHeight = windowHeight,
	$(".bpage").css({
		width: windowWidth,
		height: fixHeight
	}),
	
	$("#main").css("height", Math.round(fixHeight * $(".bpage").not(".tanchuan").length+$(".tanchuan").height())),
	setTimeout(_navigate, 300);
var hsf=1080*windowWidth/1920;

	$(".tanchuan_s").css({
		height: hsf
	});
	//_onResize(),
	$(document).keydown(function(e) {
		40 == e.keyCode || 39 == e.keyCode ? gotoPage_Next() : (38 == e.keyCode || 37 == e.keyCode) && gotoPage_Pre()
	});
	//index_bg();
	$(".banner_ul li").css("width",windowWidth+"px");
    $(".slide_ul_swap li").css("width",windowWidth+"px");
		$(".home_ul li").css("width",windowWidth+"px");

	
	



	var index=0;
baaner_width=windowWidth;
var len = $(".home_ul li").length;
var scrollTime=0;
var handindex=0;
var imgindex=0;






    var e = ".scrollbar, .jspVerticalBar";

  $(".b_xiangs").click(function(){

  gotoPage_Next();

  })
    $(".b_xiangx").click(function(){
    gotoPage_Pre();

  })
$("#main").on("mousewheel", _wheelHandler);
	

	

	
	
}



function marginImage(){

  var marginlefts=(1920-windowWidth)/2;
  
  $(".bg_bigs").css("marginLeft",-marginlefts+"px");



}

function gotoPage_Pre() {

	if (currentIndex == 0) return;
	lastIndex = currentIndex,
	currentIndex = Math.max(0, Math.min(pageLength, currentIndex - 1)),
	_navigate();


}
function gotoPage_Next() {
	if (currentIndex == pageLength - 1) return;
	lastIndex = currentIndex,
	currentIndex = Math.max(0, Math.min(pageLength - 1, currentIndex + 1)),
	_navigate();
	
	
}
var nstep=0;
var cstep=0;
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
	


}
function _onResize() {

	windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	fixHeight = windowHeight,
	$(".bpage").css({
		width: windowWidth,
		height: fixHeight
	}),
	$("#main").css("height", Math.round(fixHeight * $(".bpage").length)),
	setTimeout(_navigate, 300);
	
	var topval=(windowHeight-$(".dot_wrap").height())/2+35;
	
	
	

	$(".bg_big").each(function(){
	
	resize($(this));
	
    });
	
		

	
	

	
	

	$(".dot_wrap").css("top",topval+"px");
	//set_ie6_position()
}

function index_bg(){
var win_width = $(window).width();
var win_height = $(window).height();
var number = win_height/win_width;
if(win_width>win_height&&number<0.625){
$(".bg_big").removeClass("max_height").addClass("max_width");}
else{
$(".bg_big").removeClass("max_width").addClass("max_height");
}}

function resize($img) {
        var options = {
            align: "center",
            valign: "center"
        };
		
var windowW=$(window).width();

var windowH=$(window).height();
$(".natural_04_ul").css("width",windowW*$(".natural_04_ul li").length);
$(".natural_04_ul li").css("width",windowW);
  //var widths=$(".imgc").eq(0).width();

  //var moveW=windowW*index;


 
   if ($img.height() === 0) {
            $img.load(function() {
                resize($(this),options);
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

	 currentIndex = e;
	 _navigate();
	$("#nav li").eq(currentIndex).addClass("cur").siblings().removeClass("cur");
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
    }, 200));
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

$(".close").click(function(){

  $(".video_main").fadeOut();

});


$(".page-pop").click(function(){

  $(".sub_body_bg").fadeIn();

});

$(".sub_body_bg .alert_close").click(function(){
  $(".sub_body_bg").fadeOut();

});


		
		

 
 
 
  


 

 







content_loading($(".product_box ul li").eq(0));
$(".proloading").show();





 function content_loading(imageobj) {
	
        var browser = new Object();
        var obj = new Object();
        obj = imageobj;
        browser.useragent = window.navigator.userAgent.toLowerCase();
        browser.ie = /msie/.test(browser.useragent);
        browser.moz = /gecko/.test(browser.useragent);
        var imgsrc = obj.attr("big-src");
		
        var image = new Image;
        image.src = imgsrc;
        if (browser.ie) {
            if (image.height === 0) {
                image.onload = function() {
                    //$(".show_big_pic").attr("src", image.src);
                    showContentImage(imgsrc);
                }

            } else {
               // obj.attr("src", image.src);
                showContentImage(imgsrc);

            }
        } else {
            image.onload = function() {
                if (image.complete == true) {
                   // obj.attr("src", image.src);
                    showContentImage(imgsrc);
                }
            }

            image.onerror = function() {
               
            }

        }

    }

    function showContentImage(imgsrc) {
	    // $(".jiao_loading").hide();
		// $(".jiao_white").fadeOut();
	//	$(".img_jt").removeClass("loadding");
	    $(".proloading").hide();
        $(".imgs").not($(".imgs:first")).remove();
	    var bdimgobj=$(".imgs:last").css("opacity",1).clone();
	    bdimgobj.find("img").attr("src",imgsrc);
	    bdimgobj.prependTo($(".img_jt"));
		resize($(".imgs > img"));
		$(".imgs:last").animate({opacity: 0},800,"easeInOutSine");
	   
	   
    }
	
	
	$(".law").click(function(){
	
	  $(".alert_box2").fadeIn();
	
	});
	
	$(".alert_box2 .alert_close").click(function(){
	
	$(".alert_box2").fadeOut();
	});

});

function stopEvent(e){
 
  if(e && e.preventDefault){
  
    e.preventDefault(); 
  
  }else{
  
    window.event.returnValue=false;
	

  
  }

	return false;

}

function prevPro(plids){


      var ulobj = $(".bag_slide_ul").eq(plids);
       baglen= $("li",ulobj).length;
		if (!$("li:first", ulobj).is(":animated")) {
   	bagcindex=0;
	 if(baglen<2){
	 
	  return false;
	 
	 }
	  bagindex--;
	  if(bagindex<0){
	  
	  bagindex=baglen-1;
	  }
	  
	   if(bagindex<10){
	  
        $(".bagDang").html("0"+(bagindex+1));
	  }else{
	  
	   $(".bagDang").html(bagindex+1);
	  }
	  
     $(".bag_text .title_ab").hide().eq(bagindex).fadeIn("slow"); 

         
           moveWidth = 332;
		   $("li:last", ulobj).prependTo(ulobj);
				 $("li:first", ulobj).css("margin-left", -moveWidth).stop().animate({
            "margin-left": 32
        },
        800, "easeInOutSine",function(){
		
		
    });
		  
	}


}


function nextPro(plids){


 var ulobj = $(".bag_slide_ul").eq(plids);
       baglen= $("li",ulobj).length;
		if (!$("li:first", ulobj).is(":animated")) {
							
	 if(baglen<2){
	 
	  return false;
	 
	 }
	  bagindex++;
	  if(bagindex>baglen-1){
	  
	  bagindex=0;
	  }
	  	   if(bagindex<10){
	  
        $(".bagDang").html("0"+(bagindex+1));
	  }else{
	  
	   $(".bagDang").html(bagindex+1);
	  }
       $(".bag_text .title_ab").hide().eq(bagindex).fadeIn("slow"); 

        moveWidth = 332; 
       $("li:first", ulobj).animate({
				"margin-left": -moveWidth
			},
			800,
			function() {
				$(this).css("margin-left", 32).appendTo(ulobj);
			});		

		  
	
   	}


}

