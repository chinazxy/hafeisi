$(function(){
   $('figure, picture').picture();



$(".index2_pre1,.index2_next1").mouseenter(function(e){

 
  $(".index2_pre1").parent().find(".index2_opacity").animate({opacity:0},300)
  
 e.stopPropagation();

});

$(".index2_pre1,.index2_next1").mouseleave(function(e){

 
  $(".index2_pre1").parent().find(".index2_opacity").animate({opacity:0.7},300);
  

  



});






$(".index2_box1").not(".mt30").each(function(){

var omj=$(this).find("img");

LoadImg2(omj,$(this));

});





function LoadImg2(imgObj,mt) {

    var browser = new Object();
    var obj = new Object();
    obj = imgObj;
    browser.useragent = window.navigator.userAgent.toLowerCase();
    browser.ie = /msie/.test(browser.useragent);
    browser.moz = /gecko/.test(browser.useragent);
    var imgsrc = obj.attr("src");
    var image = new Image;
    image.src = imgsrc;
    if (browser.ie) {
        if (image.height === 0) {
            image.onload = function() {
                
                ShowCaseDetailImage2(obj,mt);
            }

        } else {
           
            ShowCaseDetailImage2(obj,mt);

        }
    } else {
        image.onload = function() {
            if (image.complete == true) {
             
                ShowCaseDetailImage2(obj,mt);
            }
        }

    }

    image.onerror = function() {
        obj.parent().removeClass("img_loading").addClass("img_loading_error");
    }

}


function ShowCaseDetailImage2(obj,mt) {


$(mt).find(".index2_opacity").css("opacity",0).removeClass("loading");
obj.css("visibility","visible");

}
lomt();
function lomt(){

$(".content_img1_imgbox ul li").each(function(){
$(".loadding",$(this)).show();
var omj=$(this).find("img").not(".svg_class").not(".video_imgs");

LoadImg(omj,$(this));

});

}

	function LoadImg(imgObj,pobj) {

    var browser = new Object();
    var obj = new Object();
    obj = imgObj;
	pobj=pobj;
    browser.useragent = window.navigator.userAgent.toLowerCase();
    browser.ie = /msie/.test(browser.useragent);
    browser.moz = /gecko/.test(browser.useragent);
    var imgsrc = obj.attr("data-src");
 
 
    var image = new Image;
    image.src = imgsrc;
    if (browser.ie) {
        if (image.height === 0) {
            image.onload = function() {
                obj.attr("src",imgsrc) ;
                ShowCaseDetailImage(obj,pobj);
            }

        } else {
              obj.attr("src",imgsrc) ;
       ShowCaseDetailImage(obj,pobj);

        }
    } else {
        image.onload = function() {
            if (image.complete == true) {
                 obj.attr("src",imgsrc) ;
              ShowCaseDetailImage(obj,pobj);
            }
        }

    }

    image.onerror = function() {
        obj.parent().removeClass("img_loading").addClass("img_loading_error");
    }

}



function ShowCaseDetailImage(obj,pobj) {


 //pobj.removeClass("loadding");
$(".loadding",pobj).hide();
	obj.removeAttr("style");
obj.removeAttr("data-src");
	obj.fadeIn();
   
 
}



if($(".has_opacity").hasClass("has_pc")){
 $(".has_opacity").mouseenter(function(){
 
 	$(".pro_opacity", $(this)).stop().animate({
			opacity: 0
		},
		500);
		
	//$(".content_img2_t a",$(this)).removeClass("select");
 
 });
 
  $(".has_opacity").mouseleave(function(){
 
 	$(".pro_opacity", $(this)).stop().animate({
			opacity: 0.7
		},
		500);
 //$(".content_img2_t a",$(this)).addClass("select");
 });

}

 

 
 
var ulobj="",
ullen=0,
bindex=0,
naimatestate=0,
speed=4000,
linesp=300;
ulobj=$(".content_img1_imgbox .cii_ul");
ullen=$(".content_img1_imgbox .cii_ul > li").length;

var wiw=$(window).width();
var wiws=wiw;
index_lb_init();
$(window).resize(function() {
index_lb_init();
});
function index_lb_init(){

wiw=$(window).width();
if(wiw<=1260){
wiws=$(window).width();

}else{

 wiws=1260;
}

if(wiw>960){

var blf=630;
}else{

var blf=wiws*585/635;

}
$(".content_img1_imgbox").css("width",wiws);
$(".content_img1_imgbox").css("height",blf);
$(".content_img1_imgbox .cii_ul > li").css("height",blf);
$(".content_img1_imgbox .cii_ul > li,.video_c").css("width",wiws);
ulobj.css("width",ullen*wiws);
$("li",ulobj).css("width",wiws);

	 if(!$("#carousel").length>0){
	       var mw=bindex*wiws;
	 ulobj.stop().animate({left:[-mw+"px","easeOutCirc"]},100);
	 }
	 
	 $(".video_img").css("width",wiws);
	 if($("#example_video_1").length>0){

	 
	 $(".video_plays,.video_c").css("width",wiws);
	 }else{
	 $(".example_video_1").css("width",blf);
$(".content_img1_imgbox .video_c").css("height",blf);
$(".content_img1_imgbox .video_c").css("width",wiws);
	 
	 }

}
  function prev(){
	

	 if(ullen<2){
	 
	  return false;
	 
	 }
	 if($(".vjs-playing").length>0){
	    $(".vjs-playing").trigger("click");
		}
	  bindex--;
	  if(bindex<0){
	  
	  bindex=0;
	  return false;
	  }
	  	
	       var mw=bindex*wiws;
  
  ulobj.stop().animate({left:[-mw+"px","easeOutCirc"]},1200);

	   

}


	function next(){
  
	

	 if(ullen<2){
	 
	  return false;
	 
	 }
	  	 if($(".vjs-playing").length>0){
	    $(".vjs-playing").trigger("click");
		}
	    bindex++;
	  if(bindex>ullen-1){
	
	  bindex=ullen-1;
	  return false;
	  }
	
	
		 
 	       var mw=bindex*wiws;
  
  ulobj.stop().animate({left:[-mw+"px","easeOutCirc"]},1200);	

		  
	

	
	}

	
	
	
	 if($("#carousel").length>0){
    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame =
                    window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                        timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());
 
     function Carousel(element)
    {
        var self = this;
        element = $(element);

        var container = $(">ul", element);
        var panes = $(">ul>li", element);

        var pane_width = 0;
        var pane_count = panes.length;

        var current_pane = 0;


        /**
         * initial
         */
        this.init = function() {
            setPaneDimensions();

            $(window).on("load resize orientationchange", function() {
                setPaneDimensions();
			
                //updateOffset();
            })
        };


        /**
         * set the pane dimensions and scale the container
         */
        function setPaneDimensions() {
            pane_width = element.width();
            panes.each(function() {
                $(this).width(pane_width);
            });

            container.width(pane_width*pane_count);
			
			
		

        };


        /**
         * show pane by index
         */
        this.showPane = function(index, animate) {

            index = Math.max(0, Math.min(index, pane_count-1));
            current_pane = index;
         
            var offset = -((100/pane_count)*current_pane);
            setContainerOffset(offset, animate);
        };


        function setContainerOffset(percent, animate) {
            container.removeClass("animate");
           
            if(animate) {
                container.addClass("animate");
            }

            if(Modernizr.csstransforms3d) {
                container.css("transform", "translate3d("+ percent +"%,0,0) scale3d(1,1,1)");
            }
            else if(Modernizr.csstransforms) {
                container.css("transform", "translate("+ percent +"%,0)");
            }
            else {
                var px = ((pane_width*pane_count) / 100) * percent;
                container.css("left", px+"px");
            }
        }

        this.next = function() { return this.showPane(current_pane+1, true); };
        this.prev = function() { return this.showPane(current_pane-1, true); };


       
	

        var hammertime = new Hammer($("#carousel")[0], {});
        hammertime.on("release dragleft dragright swipeleft swiperight", function(ev){
		 ev.gesture.preventDefault();

            switch(ev.type) {
                case 'dragright':
                case 'dragleft':
                    // stick to the finger
                    var pane_offset = -(100/pane_count)*current_pane;
                    var drag_offset = ((100/pane_width)*ev.gesture.deltaX) / pane_count;

                    // slow down at the first and last pane
                    if((current_pane == 0 && ev.gesture.direction == "right") ||
                        (current_pane == pane_count-1 && ev.gesture.direction == "left")) {
                        drag_offset *= .4;
                    }

                    setContainerOffset(drag_offset + pane_offset);
                    break;

                case 'swipeleft':
                    self.next();
                    ev.gesture.stopDetect();
                    break;

                case 'swiperight':
                    self.prev();
                    ev.gesture.stopDetect();
                    break;

                case 'release':
                    // more then 50% moved, navigate
                    if(Math.abs(ev.gesture.deltaX) > pane_width/2) {
                        if(ev.gesture.direction == 'right') {
                            self.prev();
                        } else {
                            self.next();
                        }
                    }
                    else {
                        self.showPane(current_pane, true);
                    }
                    break;
            }
		
		
		});
    }


    var carousel = new Carousel("#carousel");
    carousel.init();
	  var fang_pre = new Hammer($(".fang_pre")[0], {});
	 fang_pre.on("tap",function(){
	
	 	 carousel.prev();
	 
	 });
	 
	 	  var fang_next = new Hammer($(".fang_next")[0], {});
	 fang_next.on("tap",function(){
	  carousel.next();
	 
	 });
 
 }else{
 
  $(".fang_pre").click(function(){

prev();



});

$(".fang_next").click(function(){

next();

});
 
 }

});