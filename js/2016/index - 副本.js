$(function(){

  var imgcount=0;
  var numsf=0;
  var lastIndex=-1;
  var tindex=0;
  var w = $(window).width();
    $(".glun ul li").not(".wordul li").each(function(){
	      $(".loadding").show();
	      LoadLpImg($(this));
	
	});
	  $(".gt1").delegate(".leftdiv", "mouseenter",function(){
	 $(".leimg",$(this)).fadeIn();
	  });
	  
	 $(".gt1").delegate(".leftdiv", "mouseleave",function(){
	 $(".leimg",$(this)).fadeOut();
	  });
	
	  $(".gt1").delegate(".rightdiv", "mouseenter",function(){
	 $(".rigimg",$(this)).fadeIn();
	  });
	  
	 $(".gt1").delegate(".rightdiv", "mouseleave",function(){
	 $(".rigimg",$(this)).fadeOut();
	  });
	
	 wordAnimate(0);
	function flexslides(){
	$(".divslide").flexslider({
		  animation: "fade",
		  controlNav: false,
		  easing:"easeInOutQuart",
		  prevText: "<",
          nextText: ">", 
		  useCSS: cssstate,
		  animationLoop:false,
		  controlsContainer:".gt1",
		slideshowSpeed: 4000, //展示时间间隔ms
		animationSpeed: 1000, //滚动时间ms
		touch: true, //是否支持触屏滑动
		start:function(slider){
		
		 
		 var nums=slider.count;
		  var nowindex=slider.currentSlide+1;
		 if(nums>1 && IsPC()){
		 $('.gt1').show();
		 }else{
		  return false;
		 }
		if(nowindex<10){
		   nowindex="0"+nowindex;
		 }
		$('.now_n').html(nowindex); 
		 if(nums<10){
		   nums="0"+nums;
		 }
		$('.count_n').html(nums); 
		
		},
		before:function(slider){
		   
	      reset(tindex);
		},
		after:function(slider){
	
		 var nowindex=slider.currentSlide+1;
		 tindex=slider.currentSlide;
		 wordAnimate(slider.currentSlide);
		 	// lastIndex >= 0 && lastIndex <= ullen - 1 && reset(lastIndex);
	    // lastIndex=bindex;
		 numsf=nowindex;
         if(nowindex<10){
		   nowindex="0"+nowindex;
		 }
		$('.now_n').html(nowindex);  
	  
		}
	    });
		
		}

		

  function wordAnimate(i){
		
		 var tops=$('.worddiv .gt').eq(0).outerHeight();
		 $('.worddiv .gt').delay(50).eq(i).stop().animate({top:[0,"easeOutQuad"],opacity:1},200);
       
		}
		
		function reset(i){
		
		$('.worddiv .gt').eq(i).stop().animate({top:[25,"easeOutQuad"],opacity:0},200);
		
		}
  
  

  function initSlide(){
    w = $(window).width();
	$(".wordul").css("width",$(".wordul li").length*w);
	$(".wordul li").css("width",w);
	var libh=$(".worddiv .gt").eq(0).outerHeight();
	$(".worddiv").height(libh);
	$(".glt").css({top:"50%",marginTop:-$(".glt").height()/2});
	if(w>960){
	   $(".glunfixed").css("position","fixed");
	   $(".shou_head").hide();
  	$(".container").show();
	$(".pcimg").hide();
	var height =(w*630)/1920;
	
	}else{
		$(".container").hide();
	$(".pcimg").show();
	var height =(w*600)/960; 
	}
	
	
	
	$(".glun").height(height);
	$(".glun ul li").not(".wordul li").height(height);
	$(".glun").width(w);
	$(".glun ul li").not(".wordul li").width(w);
	}

    initSlide();
	$(window).resize(function(){
	
	
	
	 initSlide();
	});
	
	 initparallax();
	function initparallax() {
    var a = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return a.Android() || a.BlackBerry() || a.iOS() || a.Opera() || a.Windows();
        }
    };
    trueMobile = a.any();
    if (null == trueMobile) {
           var b = $(".glun");
           
    }
    if (trueMobile) {
		$(".background-video").remove();
		$('.grid-item-holder').attr("onclick","return true");		
	}	 
}
  



	
	function LoadLpImg(objs) {

    var browser = new Object();
    var obj = new Object();
    obj = objs;
    browser.useragent = window.navigator.userAgent.toLowerCase();
    browser.ie = /msie/.test(browser.useragent);
    browser.moz = /gecko/.test(browser.useragent);
    var imgsrc = obj.attr("data-src");
 
 
    var image = new Image;
    image.src = imgsrc;
    if (browser.ie) {
        if (image.height === 0) {
            image.onload = function() {
              
                ShowLbImage(objs);
            }

        } else {
         ShowLbImage(objs);

        }
    } else {
        image.onload = function() {
            if (image.complete == true) {
                ShowLbImage(objs);
            }
        }

    }

    image.onerror = function() {
        obj.parent().removeClass("img_loading").addClass("img_loading_error");
    }

}


function ShowLbImage(obj) {
     imgcount++; 
 
     obj.css("background","url("+obj.attr("data-src")+") no-repeat");
	 obj.css({"background-position":"50% 50%","background-size":"cover"});
     if($(".glun ul li").not(".wordul li").length==imgcount){
	   $(".loadding").fadeOut();
	   flexslides();
	 }
  
    
 
}


 $(".vid_bg_v").bind("click",function(){
 
        var objsf=$(this).parent().parent().find("#example_video_1");
	    var videos=$("video",objsf);
	    videos.get(0).pause();
	    $(this).parent().prev().css("width","100%");
		$("video",$(this).parent().prev()).css({height:"100%",width:"100%"});
	    $(".vjs-big-play-button",$(this).parent().prev()).trigger("click");
     //  objsf.play();
 });
 
 
 $(".vid_bg").mouseenter(function(){
   $(".cs",$(this)).stop().animate({opacity:[0,"easeInOutSine"]},500);
   $(".hp",$(this)).stop().animate({opacity:[1,"easeInOutSine"]},500);



});


$(".vid_bg").mouseleave(function(){
   $(".hp",$(this)).stop().animate({opacity:[0,"easeInOutSine"]},500);
   $(".cs",$(this)).stop().animate({opacity:[1,"easeInOutSine"]},500);
  $(".hp",$(this)).css("zIndex",22);
  $(".cs",$(this)).css("zIndex",33);

});


 function hasSVG(){
    if(document.all){
	  return false;
	}else{
    SVG_NS = 'http://www.w3.org/2000/svg';

    return !!document.createElementNS && !!document.createElementNS(SVG_NS, 'svg').createSVGRect;
   
    }
	}

	
if (!hasSVG()) {
   $(".svg_class").each(function(){
   
      $(this).attr("src",$(this).attr("date-src"));
	  var svgscc=$(this).attr("date-style");
	  $(this).attr("style"," ");
	  $(this).attr("style",svgscc);
   });
   

}
 
     $("video").bind("pause",function(e){
       $(".vid_bg_v").parent().prev().css("zIndex",1);
	  $(".vid_bg_v").parent().prev().prev().css("zIndex",3);
	 });
	 
	    $("video").bind("play",function(e){
          $(".vid_bg_v").parent().prev().css("zIndex",999);
	  $(".vid_bg_v").parent().prev().prev().css("zIndex",1);
	    });
		
	
		    var n = $("#explosion");
		    n.css({
                        "background-position": "0 0"
                    });
 if ($(window).on("scroll",
                function() {
                  
                }), window.onresize = function() {
				   var n = $("#explosion");
				    n.css({
                        "background-position": "0 0"
                    });
				
				}, !window.mobileAndTabletcheck()) {
			
                    $("#glasses-main .row:first-child").prepend('<div class="explosionWrapper col-sm-6"><div id="explosion"></div></div>'); {
                        var n = $("#explosion");
					
					
						
                    }
                    n.css({
                        "background-position": "0 0"
                    });
					var f=$(document).scrollTop()>$(document).height()-$(window).height()-$(".gfoot").outerHeight()+100;
					alert(f);
                    for (var s = 0,
                    o = 51; o >= 0;) 
                   n.attr("data-" + (f-s) + "-top", "background-position:0 -" +(25100-491 * o) + "px"),
                    s % 12 === 1 && o--,
                    s++; {
     
                        skrollr.init({
                            forceHeight: !1,
                            render: function() {
                              
                            }
                        })
                    }
                }
});

window.mobileAndTabletcheck = function() {
    var t = !1;
    return function(e) { (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (t = !0)
    } (navigator.userAgent || navigator.vendor || window.opera),t
}