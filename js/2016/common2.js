$(function(){
String.prototype.Trim = function() {

   return this.replace(/(^\s*)|(\s*$)/g, "");

}

var fontws=30;
 $(".signIn").click(function(){
		     $(".glunfixed").css("position","relative");
		     $(".pageWidth").stop().animate({height:[374,"easeInOutSine"]},500);
		     $(".gh").stop().animate({top:[374,"easeInOutSine"]},500);
		     $(".gh1").stop().animate({top:[434,"easeInOutSine"]},500);
			 $(".gh1").stop().animate({top:[434,"easeInOutSine"]},500);
		     $(".daze").css("zIndex",101);
	         $(".daze").show().stop().animate({opacity:0.85},800);
			 if($(".glun").length>0){
			 $(".glun").stop().animate({marginTop:[434,"easeInOutSine"]},500);
			 $(".glun").css("position","none");
		
			 }else{
			  $(".dapa").stop().animate({top:[374,"easeInOutSine"]},500);
			  
			 }
			
	 
	  });
	  
	  $(".closeIcon").click(function(){
		    $(".pageWidth").stop().animate({height:0},500);
		    $(".gh").stop().animate({top:0},500);
		  	$(".glunfixed").css("position","fixed");
		    $(".gh1").stop().animate({top:60},500);
		  $(".daze").stop().animate({opacity:0},800,function(){
		   $(".daze").hide();
		  
		  });
		    $(".daze").css("zIndex",1);
			 if($(".glun").length>0){
		    $(".glun").stop().animate({marginTop:60},500);
	  	    $(".glun").css("position","relative");
		 
			}else{
			  $(".dapa").stop().animate({top:0},500);
			}
	
	  });
	 
	  $(".gfoot_wmb1").each(function(){
	  $(".foot_tmb",$(this)).width(($(".foot_fontmb",$(this)).outerWidth()+fontws));
	  $(this).closest(".gfoot_wmb1").width(($(".foot_fontmb",$(this)).outerWidth()+fontws));
	  });
	  	  var footarray=new Array();
	  $(".foot_div").each(function(){
	  footarray.push($(this).outerHeight());
	   
	  })

	  var maxHeights=Math.max.apply(null,footarray);
      var footime=800;
	  var delaytime=800;
	  var uptime=500;
	  var amimatecatch="swing";
	     $(".jtck").click(function(){
	
	           $(".jtck").hide();
			   $(".colsed").show();
			     var avgs=74/4;
			     $(".gfoot_wmb1").each(function(i){
				   if(i==4){
				    $(this).stop().animate({width:["26%",amimatecatch]},footime);
					 
				   }else{
				    $(this).stop().animate({width:[avgs+"%",amimatecatch]},footime);
				   }
				 });
	         
			 $(".gfoot_wmb").stop().delay(delaytime).animate({paddingTop:40},uptime);
		     $(".foot_tmb").stop().delay(delaytime).animate({paddingBottom:40},uptime);
			 $(".colsed").stop().delay(delaytime).animate({paddingTop:20},uptime);
			 
			 $(".gfoot_wmb .foot_contain").stop().delay(delaytime).animate({height:maxHeights},uptime);
			 $('html,body').delay(delaytime).animate({scrollTop: $(document).scrollTop()+maxHeights+95}, uptime);
		
	
	  
	  });

	  
	   $(".colsed").click(function(){
	       $(".jtck").show();
			   $(".colsed").hide();
	        var pctime=500;
	    	  $(".gfoot_wmb1").each(function(){
			      var tharts=$(this);
				  var avf=($(".foot_fontmb",tharts).outerWidth()+fontws)/pctime;
				   $(".foot_tmb").stop().animate({paddingBottom:0},pctime);
			       $(this).closest(".gfoot_wmb1").animate({width:[$(".foot_fontmb",tharts).outerWidth()+fontws,"easeInQuad"]},pctime-pctime*avf);
				    $(".foot_contain",$(this)).stop().animate({height:[0,"easeInQuad"]},pctime-pctime*avf);
	           });
			    $(".colsed").stop().delay(pctime).animate({paddingTop:0},pctime);
			   	 $(".gfoot_wmb").stop().animate({paddingTop:20},pctime);
			   // $(".gfoot_wmb").stop().animate({paddingTop:20,paddingBottom:20},pctime);
			  
					// $('html,body').animate({scrollTop: $(document).scrollTop()-maxHeights-95}, 800);
	
	  
	   });
	  


  $(".search").focus(function(){

  var searchval=$(this).val();
  if(searchval.Trim()=="Search..."){
   $(this).val("");
  }
  });
  
    $(".search").blur(function(){

  var searchval=$(this).val();
  if(searchval.Trim()=="Search..." || searchval.Trim()==""){
   $(this).val("Search...");
  }
  });

 function hasSVG(){

   if(/msie/.test(navigator.userAgent.toLowerCase()) || $.browser.version=="11.0"){
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

		$('.s_s').click(function(){
		   
		     if($('.s_s').hasClass("s_off")){
			  
			     $('.s_nav').stop().animate({height:50},300,function(){
				 $('.s_s').removeClass("s_off").addClass("s_on");
				 });
			 }else{
			      $('.s_nav').stop().animate({height:0},300,function(){
				 $('.s_s').removeClass("s_on").addClass("s_off");
				 });
			 
			 }
			 
			 
		
		});
		
		$(window).scroll(function() {
	
	    
	    	if (document.documentElement && document.documentElement.scrollTop){
       var scrollTop = document.documentElement.scrollTop;
	  }else if (document.body){
       var scrollTop = document.body.scrollTop;
	  }
	 //   console.log(scrollTop);
	  if(scrollTop==0){
	  
	  //  $(".glun").removeAttr("transform");
	  }
		var scrollHeight = getScrollHeight();

		var windowHeight = $(this).height();
 
		if(scrollTop>windowHeight/2){
		 
		  $(".cbbfixed").fadeIn();
		
		}else{
			  $(".cbbfixed").fadeOut();
		}
		
	

	});
	$(".fan_top").click(function(){
$('html,body').animate({scrollTop: '0px'}, 800)

});
	function getScrollHeight() {
	var scrollHeight = 0,
	bodyScrollHeight = 0,
	documentScrollHeight = 0;
	if (document.body) {
	bodyScrollHeight = document.body.scrollHeight;
	}
	if (document.documentElement) {
	documentScrollHeight = document.documentElement.scrollHeight;
	}
	scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight: documentScrollHeight;
	return scrollHeight;
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

	$(".mybolon ").click(function() {
		$(".shou_dengbox ").slideToggle(300);
		scroolTop = $(".mybolon ").offset().top - 50;

		$("html, body").animate({
			scrollTop: scroolTop
		},
		"slow");

	});
	
	$(".shou_dengbox").click(function(e){
	
	 e.stopPropagation();
	});
	$('.s_d').click(function() {
           
		if ($(".s_s").hasClass("s_on")) {

			  
			     $('.s_nav').stop().animate({height:0},300,function(){
	    
				   $(".s_s").removeClass("s_on").addClass("s_off");
				         if($(".s_d").hasClass("menu_off")){
			
				$('.menu_div').slideDown(200,
				function() {
				     $(".glunfixed").css("position","relative");
					$("html, body").animate({
						scrollTop: 0
					},
					"slow");
						 $(".s_d").addClass("menu_on").removeClass("menu_off");
				}).css("z-index", "11");
				}else{
			
					$('.menu_div').slideUp(200,
				function() {
						     $(".glunfixed").css("position","fixed");
					$("html, body").animate({
						scrollTop: 0
					},
					"slow");
						 $(".s_d").addClass("menu_off").removeClass("menu_on");
				}).css("z-index", "11");
				}
				 });
	
		} else {
		
		
		 if($(".s_d").hasClass("menu_off")){
			
				$('.menu_div').slideDown(200,
				function() {
				     $(".glunfixed").css("position","relative");
					$("html, body").animate({
						scrollTop: 0
					},
					"slow");
					$(".s_d").addClass("menu_on").removeClass("menu_off");
				}).css("z-index", "11");

		
				}else{
			
					$('.menu_div').slideUp(200,
				function() {
				     $(".glunfixed").css("position","fixed");
					$("html, body").animate({
						scrollTop: 0
					},
					"slow");
		
						$(".s_d").addClass("menu_off").removeClass("menu_on");
				}).css("z-index", "11");
		
				}

	

		}

	});

	resbig();
		$(window).resize(function(){
	  if($(window).width()>960){
	    
		$(".gfootmb").show();
	  	$(".gfoot").hide();
	  }else{
	  		$(".gfootmb").hide();
	  	$(".gfoot").show();
	  }
	 resbig();
	});
	function resbig(){
	    
		   $(".bg_img").each(function(){
		   
		   $(".loadding",$(this)).show();
		   LoadBgImg($(this));
		   
		   });
		
	
		
	
	
	}


   

   
   function LoadBgImg(objs) {

    var browser = new Object();
    var obj = new Object();
    obj = objs;
	    var imgsrc='';
    browser.useragent = window.navigator.userAgent.toLowerCase();
    browser.ie = /msie/.test(browser.useragent);
    browser.moz = /gecko/.test(browser.useragent);
	
	    if($(window).width()>960){
      imgsrc = obj.attr("data-img");
	}else{
	   imgsrc = obj.attr("data-media");
	
	}
 
 
    var image = new Image;
    image.src = imgsrc;
    if (browser.ie) {
        if (image.height === 0) {
            image.onload = function() {
              
                ShowBgImage(objs,imgsrc);
            }

        } else {
         ShowBgImage(objs,imgsrc);

        }
    } else {
        image.onload = function() {
            if (image.complete == true) {
                ShowBgImage(objs,imgsrc);
            }
        }

    }

    image.onerror = function() {
        obj.parent().removeClass("img_loading").addClass("img_loading_error");
    }

}


function ShowBgImage(obj,imgsrc) {
      $(".loadding",obj).fadeOut();
	  $(".bgimg",obj).attr("src",imgsrc);
	  if($(".gz_contain").length>0){
	  	  $(".gz_contain").height(obj.outerHeight());
	  
	   }
     obj.css("background","url("+imgsrc+") no-repeat");
	 obj.css({"background-position":"50% 50%","background-size":"cover"});

  
    
 
}
	
	


function ShowCaseDetailImage(obj,pobj) {

    $(".loadding",pobj).fadeOut();
     obj.removeAttr("style");
     obj.removeAttr("data-src");
    //obj.fadeIn();
   
 
}
lomt();
function lomt(){
$(".limgs").each(function(){
$(".loadding",$(this)).show();
var omj=$(this).find("img").not(".video_ico");
LoadImg(omj,$(this));
});

}  

})
function IsPC() {
	var userAgentInfo = navigator.userAgent;

	var Agents = new Array("Android","Touch", "iPhone","BlackBerry OS","mqqbrowser","opera mobi","juc","iuc","fennec","applewebKit/420","applewebkit/525","applewebkit/532","iemobile","windows ce","240x320","480x640","acer","asus","audio","blazer","coolpad","dopod","etouch","hitachi","htc","huawei","jbrowser","lenovo","lg","lg-","lge-","lge", "mobi","moto","nokia","phone","samsung","sony","symbian","tablet","tianyu","wap","xda","xde","zte","SymbianOS", "Windows Phone", "iPad", "iPod");
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}
	function tutule(method, content) {

		clearTimeout(method.animate_id);

		method.animate_id = setTimeout(function() {

			method.call(content);

		},
		100)

	}