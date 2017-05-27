
		var nindexs=0;

	 var naimglen=0;
var linewidth=0;
  var naindex=0;
  var vcindex=0;
  var ulobj='';
  	var animatestate='';
	var lih=0;
function webInit() {
	$("#pageloader").hide(),
	$("#header,#footer").show(),
	pageLength = $(".page").length,
	windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	pagesArr.push(page1_action),
	pagesArr.push(page2_action),
	pagesArr.push(page3_action),

	$(window).resize(function() {
		_onResize()
	}),
windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	fixHeight = windowHeight,
	$(".page").css({
		width: windowWidth,
		height: fixHeight
	}),
	$("#main").css("height", Math.round(fixHeight * $(".page").length)),
	setTimeout(_navigate, 300);
	$(document).keydown(function(e) {
		40 == e.keyCode || 39 == e.keyCode ? gotoPage_Next() : (38 == e.keyCode || 37 == e.keyCode) && gotoPage_Pre()
	});
   linewidth=(windowWidth/4)-20;
    var e = ".scrollbar, .jspVerticalBar";
	$(".up_arrow").click(function() {
		gotoPage_Pre()
		
	}),
	$(".down_arrow").click(function() {
		gotoPage_Next()
	}),
	$("#main").on("mousewheel", _wheelHandler);
	
	$(".nav2 li").click(function(){
	    
		var nlid=$(".nav2 li").index(this);
		
		
		
		gotoPage(nlid);
	   
	});
	
	$(".nav2 li").mouseenter(function(){
	 $(this).find(".tip_box").stop().animate({opacity:[1,"easeInOutSine"]},200);
	//$(".nav2 li").find(".tip_box").not($(this)).stop().animate({opacity:[0,"easeInOutSine"]},200);
	   $(this).addClass("cur").siblings().removeClass("cur");
	
	});
	
		$(".nav2 li").mouseleave(function(){
	    //$(".nav2 li").find(".tip_box").not($(this)).stop().animate({opacity:[0,"easeInOutSine"]},200);
	    $(this).find(".tip_box").stop().animate({opacity:[0,"easeInOutSine"]},200);
	
	});
   
   	var plens=$(".pro_list ul li").length;
	if(plens<10){
	  astr="0"+plens;
	}else{
	 astr=plens;
	}
	$(".pageAll").html(astr);
	
	$(".pagedang").html("01");
   

  $(".pro_list ul li .img").mouseenter(function(){
  
  
  	 var nowi=$(".img").index(this);
	 if(nowi===oldci){
	    return false;
	   
	   }
	  // $(".an_right").hide().eq(nowi).fadeIn();
	   $(".loading").show();

	   content_loading($(this));
	   nos=nowi;
	   oldci=nowi;
     $(".zhezhao",$(this)).stop().animate({opacity:[0,"easeInOutSine"]},800);
	 $(".hb",$(this)).stop().animate({opacity:[0,"easeInOutSine"]},800)
	 $(".left_line",$(this)).stop().animate({height:[lih-20,"easeInSine"]},800);
	 $(".top_line",$(this)).stop().animate({width:[linewidth,"easeInSine"]},800);
     $(".right_line",$(this)).stop().animate({height:[lih-20,"easeInSine"]},800);
	 $(".bottom_line",$(this)).stop().animate({width:[linewidth,"easeInSine"]},800);
	 $(".img").not($(this)).find(".zhezhao").stop().animate({opacity:[0.5,"easeInOutSine"]},800);
     $(".img").not($(this)).find(".hb").stop().animate({opacity:[1,"easeInOutSine"]},800);
	 	$(".img").not($(this)).find(".left_line").stop().animate({height:[0,"easeInSine"]},800);
		$(".img").not($(this)).find(".top_line").stop().animate({width:[0,"easeInSine"]},800);
		
			$(".img").not($(this)).find(".right_line").stop().animate({height:[0,"easeInSine"]},800);
			$(".img").not($(this)).find(".bottom_line").stop().animate({width:[0,"easeInSine"]},800);
  
  });
  
  $(".product").mouseenter(function(e){
  
    // if($(this).hasClass("hide_list")){

	        $(".product").stop().animate({height:[lih+60,"easeInOutCirc"]},500);
	   $(this).removeClass("show_list").addClass("hide_list"); 
	  e.stopPropagation();
	//}else{
	
	//}
       
  });
  
    $(".product").mouseleave(function(e){
  
    // if($(this).hasClass("hide_list")){
 	   $(".product").stop().animate({height:[60,"easeInOutCirc"]},500)
	   $(this).removeClass("hide_list").addClass("show_list");
	  e.stopPropagation();
	//}else{
	
	//}
       
  });
  


  
   naindex=0;
   vcindex=0;
 naimglen=$(".pro_list ul li").length;
 var imglens=$(".pro_list ul li .img").length;
 ulobj = $(".pro_list ul");

   $(".pro_list ul li").css("width",windowWidth);
   $(".pro_list ul").css("width",windowWidth*naimglen);
    $(".a_left").click(function(){
		  
		  prev();
	});

	
    $(".a_right").click(function(){
	    next();
	});
  
  function prev(){
	

     	vcindex=0;
	 if(naimglen<2){
	 
	  return false;
	 
	 }
	  naindex--;
	  if(naindex<0){
	  
	  naindex=naimglen-1;
	  }
	  
	  if((naindex+1)<10){
	  
	  $(".pagedang").html("0"+(naindex+1));
	  }else{
	    $(".pagedang").html(naindex+1);
	  }
	 var movewidth= windowWidth*naindex;
       ulobj.animate({left:[-movewidth+"px","easeInOutSine"]},500);

	}
	
	function next(){

		
	  vcindex=0;
	 if(naimglen<2){
	 
	  return false;
	 
	 }
	  naindex++;
	  if(naindex>naimglen-1){
	  
	  naindex=0;
	  }
	  
	  	  if((naindex+1)<10){
	  
	  $(".pagedang").html("0"+(naindex+1));
	  }else{
	    $(".pagedang").html(naindex+1);
	  }
	  
 
      var movewidth= windowWidth*naindex;
       ulobj.animate({left:[-movewidth+"px","easeInOutSine"]},500);
		  
	
   	
	
	}
	


	var speed=3000;
	var nos=0;


	function play(){
	
	if(nos<imglens){
	$(".img").eq(nos).find(".zhezhao").stop().animate({opacity:[0,"easeInOutSine"]},800);
	$(".img").eq(nos).find(".hb").stop().animate({opacity:[0,"easeInOutSine"]},800);
	$(".img").not($(".img").eq(nos)).find(".zhezhao").stop().animate({opacity:[0.5,"easeInOutSine"]},800);
    $(".img").not($(".img").eq(nos)).find(".hb").stop().animate({opacity:[1,"easeInOutSine"]},800);
	  $(".left_line",$(".img").eq(nos)).stop().animate({height:[190,"easeInSine"]},800);
	   $(".top_line",$(".img").eq(nos)).stop().animate({width:[linewidth,"easeInSine"]},800);
       $(".right_line",$(".img").eq(nos)).stop().animate({height:[190,"easeInSine"]},800);
	    $(".bottom_line",$(".img").eq(nos)).stop().animate({width:[linewidth,"easeInSine"]},800);
		
		$(".img").not($(".img").eq(nos)).find(".left_line").stop().animate({height:[0,"easeInSine"]},800);
		$(".img").not($(".img").eq(nos)).find(".top_line").stop().animate({width:[0,"easeInSine"]},800);
		
			$(".img").not($(".img").eq(nos)).find(".right_line").stop().animate({height:[0,"easeInSine"]},800);
			$(".img").not($(".img").eq(nos)).find(".bottom_line").stop().animate({width:[0,"easeInSine"]},800);
	}
	
		 if(nos===oldci){
	  return false;
	   
	  }
	  
	  
	   $(".loading").show();

	   content_loading($(".img").eq(nos));
	
	   oldci=nos;
	nos++;
 
	var page=nos%5;
	
	if(page==0){
	 next();
	}else if(nos>imglens-1){
	setTimeout(function(){
    next();
	$(".img").eq(0).find(".zhezhao").stop().animate({opacity:[0,"easeInOutSine"]},800);
	$(".img").eq(0).find(".hb").stop().animate({opacity:[0,"easeInOutSine"]},800);
	},speed);
    nos=0;
	
	}
	}
	//plays();


	
	$(".pro_list").mouseenter(function(){
	
	// clearInterval(animatestate);
	
	});
	
	
		$(".pro_list").mouseleave(function(){
	
	// plays();
	
	});
		function plays(){
	
	animatestate=setInterval(function(){
	
	
	play();
	},speed)
	}
	var oldci=-1;

	
	
		   function content_loading(imageobj) {
        var browser = new Object();
        var obj = new Object();
        obj = imageobj;
        browser.useragent = window.navigator.userAgent.toLowerCase();
        browser.ie = /msie/.test(browser.useragent);
        browser.moz = /gecko/.test(browser.useragent);
        var imgsrc = obj.attr("data-src");
	
        var image = new Image;
        image.src = imgsrc;
        if (browser.ie) {
            if (image.height === 0) {
                image.onload = function() {
                 
                    showContentImage(imgsrc);
                }

            } else {
              
                showContentImage(imgsrc);

            }
        } else {
            image.onload = function() {
                if (image.complete == true) {
                 
                    showContentImage(imgsrc);
                }
            }

            image.onerror = function() {
               
            }

        }

    }

    function showContentImage(imgsrc) {
	     $(".loading").hide();
        $(".bigdata",$(".bigsrc")).not($(".bigdata:first",$(".bigsrc"))).remove();
	    var bdimgobj=$(".bigdata:last",$(".bigsrc")).css("opacity",1).clone();
	    bdimgobj.find("img").attr("src",imgsrc);
	    bdimgobj.prependTo($(".bigsrc"));
		resize($(".bigsrc > img"));
		$(".bigdata:last",$(".bigsrc")).stop().animate({opacity: 0},800,"easeInOutSine");
	   
	   
    }

	
	
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
	if(currentIndex+1<10){
	  
	   dstr="0"+(currentIndex+1);
	
	}else{
	  dstr=currentIndex+1;
	}

	

}
function gotoPage_Next() {
	if (currentIndex == pageLength - 1) return;
	lastIndex = currentIndex,
	currentIndex = Math.max(0, Math.min(pageLength - 1, currentIndex + 1)),
	_navigate();
		if(currentIndex+1<10){
	  
	   dstr="0"+(currentIndex+1);
	
	}else{
	  dstr=currentIndex+1;
	}

	
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
	$(".nav2 li").eq(currentIndex).addClass("cur").siblings().removeClass("cur");
	pagesArr[currentIndex].play();
	

	lastIndex >= 0 && lastIndex <= pageLength - 1 && pagesArr[lastIndex].reset();


}
function _onResize() {

	windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	   $(".pro_list ul li").css("width",windowWidth),
   $(".pro_list ul").css("width",windowWidth*naimglen),
   linewidth=(windowWidth/4)-20,

	$(".bg_big").each(function(){
	
	resize($(this));
	
    });
	imgsr();
	fixHeight = windowHeight,
	$(".page").css({
		width: windowWidth,
		height: fixHeight
	}),
	$("#main").css("height", Math.round(fixHeight * $(".page").length)),
	setTimeout(_navigate, 300);
      movewidth= windowWidth*naindex;
   ulobj.animate({left:[-movewidth+"px","easeInOutSine"]},500);

}

	function imgsr(){
	
	var imgws=$(window).width();
	
	var liw=imgws/4;
	
	lih=liw*7/16;
	$(".pro_list ul").css({height:lih});
	$(".pro_list li").css({height:lih});
	$(".pro_list img").css({height:lih,width:liw});
	$(".img").css({height:lih,width:liw});
	$(".pro_list").css({height:lih});
	$(".kuang ").css({height:lih-20,lineHeight:lih-20+"px"});
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
        var vp = getViewportSize(), ww = vp.width, wh = vp.height, iw = 1920, ih = 1200, rw = wh / ww, ri = ih / iw, newWidth, newHeight, newLeft, newTop, properties;
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

imgsr();
  $(".vjs-control-bar").show();


  $(".start_bg").click(function(){
   $(".vjs-big-play-button").trigger("click");
	$(".start_bg").fadeOut();
  
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



