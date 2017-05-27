function play(step){
$(".detail_box_ab").eq(step).css("zIndex",2);
	   TweenMax.to($(".detail_box_ab").eq(step), .5, {
			css: {
				bottom: 0,
				opacity:1
			},
			ease:Sine.easeInOut,
			delay: 0
		});
	   



	   
	   }
	   
	   function reset(step){
	$(".detail_box_ab").css("zIndex",0);
	      	   TweenMax.to($(".detail_box_ab").eq(step), .5, {
			css: {
				bottom: -50,
				opacity:0
			},
			ease:Sine.easeInOut,
			delay: 0
		});
	   }
 var nowindex=0;
$(function(){
var lends=$(".detail_box_pro li").length;


$(".color").each(function(i){

   var clens=$(".color").eq(i).find("li").length*23;
		 
		 $(".color").eq(i).css("width",clens+"px");

});

$(".line_box").css("width",(lends*50)+"px");

//$(".flex-control-nav li:first").css("margin-left","0px");

     $(".clone").remove();
        $(".click_detail").click(function(){
		      
			  var cdes=$(".click_detail").index(this);
			 if(!$(this).hasClass("hide_detail")){
			 
			   $(".detail_box_ab").eq(cdes).stop().animate({height:[310,"easeOutCirc"]},800);
			 
			 $(this).addClass("hide_detail");
			 }else{
			 
			 	   $(".detail_box_ab").eq(cdes).stop().animate({height:[140,"easeOutCirc"]},800);
			 
			 $(this).removeClass("hide_detail");
			 }
			
		   
		
		});
		
		
		  var lastIndex=-1;
   var pageLength=$(".detail_box_ab").length;
    	play(0),
	 lastIndex=0;
	
	
    $(window).load(function(){
      $('.flexslider').flexslider({
        animation: "fade",
		before:function(slider){
     lastIndex=slider.currentSlide;
 var now=lastIndex+1;
   if(now>lends-1){
   
     now=0;
   }
  $(".color").hide().eq(now).fadeIn();	

		}, 
		after:function(slider){
	
		//nowindex=lastIndex;
	
	  
		//play(slider.currentSlide);
		// $(".click_detail").removeClass("hide_detail");
		 // $(".detail_box_ab").stop().animate({height:[140,"easeOutCirc"]},800);
		},
        start: function(slider){
          $('body').removeClass('loading');
        }
      });
    });
  
		
		  var oldci=-1;
   
		$(".color").find("li").click(function(){
        var parentobj=$(this).parent().parent();
	      var cindex=$(".color").index(parentobj);
	
		
        
	   var nowi=$(".color").eq(cindex).find("li").index(this);
	  
	   $(".color").find("li").removeClass("select");
	 //  $(".color").eq(cindex).find("li").eq(nowi).addClass("select");
	   
	   if(nowi===oldci){
	    return false;
	   
	   }
    
	   $(".an_right").hide().eq(nowi).fadeIn();
	   $(".loading").show();
       $(".color").each(function(i){
	  
		 
	      $(".color").eq(i).find("li").eq(nowi).addClass("select");
	     content_loading($("li",$(".color").eq(i)).eq(nowi),$(".slides li").eq(i));
	   
	   });
	 
	   
	   oldci=nowi;
	
	});
      

	   function init_loading(imageobj) {
        var browser = new Object();
        var obj = new Object();
        obj = imageobj;
        browser.useragent = window.navigator.userAgent.toLowerCase();
        browser.ie = /msie/.test(browser.useragent);
        browser.moz = /gecko/.test(browser.useragent);
        var imgsrc = obj.attr("bigpic");
	
        var image = new Image;
        image.src = imgsrc;
        if (browser.ie) {
            if (image.height === 0) {
                image.onload = function() {
                   
                    showInitImage(imgsrc);
                }

            } else {
              
                showInitImage(imgsrc);

            }
        } else {
            image.onload = function() {
                if (image.complete == true) {
                   // obj.attr("src", image.src);
                    showInitImage(imgsrc);
                }
            }

            image.onerror = function() {
               
            }

        }

    }

    function showInitImage(imgsrc) {
	    $(".loading").hide();
		 $(".an_left_img").find("img").attr("src",imgsrc);
        $(".bd_img").fadeIn();
		
	   
    }
	
	
	   function content_loading(imageobj,objs) {
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
                 
                    showContentImage(imgsrc,objs);
                }

            } else {
              
                showContentImage(imgsrc,objs);

            }
        } else {
            image.onload = function() {
                if (image.complete == true) {
                 
                    showContentImage(imgsrc,objs);
                }
            }

            image.onerror = function() {
               
            }

        }

    }

   /* function showContentImage(imgsrc) {
	 

        $(".bd_img",$(".flex-active-slide")).not($(".bd_img:first",$(".flex-active-slide"))).remove();
	    var bdimgobj=$(".bd_img:last",$(".flex-active-slide")).css("opacity",1).clone();
	    bdimgobj.find("img").attr("src",imgsrc);
	    bdimgobj.prependTo($(".flex-active-slide"));
		
		$(".bd_img:last",$(".flex-active-slide")).stop().animate({opacity: 0},500,"easeInOutSine");
	   
	   
    }*/
	
	    function showContentImage(imgsrc,obj) {
	 

        $(".bd_img",$(obj)).not($(".bd_img:first",$(obj))).remove();
	    var bdimgobj=$(".bd_img:last",$(obj)).css("opacity",1).clone();
	    bdimgobj.find("img").attr("src",imgsrc);
	    bdimgobj.prependTo($(obj));
		
		$(".bd_img:last",$(obj)).stop().animate({opacity: 0},500,"easeInOutSine");
	   
	   
     }
	 
	 
	 
	 $(".guanbi").click(function(){
	 
	   $(".pro_alert_box").fadeOut();
	 
	 });
	 
	 $(".go_buy").click(function(){
	    $(".pro_alert_box").show();
	 
	 });
	 
	 $(".buybtn").hover(function(){
	 $(".buybtn a").not($("a",$(this))).css("color","#000")
	  $(".buybtn").not($(this)).removeClass("current");
	  
	   $(this).find("a").eq(0).css("color","#fff")
	 $(this).addClass("current")
	 });
	 var nms=1;
	 $(".jia").click(function(){
	
	 var pnums=parseInt($(".kucunnum").html());
	 
	 nms++;
	 
	 if(nms<=pnums){
	
	 $(".pro_number").val(nms);
	 
	 }else{
	  $(".pro_number").val(pnums);
	  nms=pnums;
	 }
	 

	 
	 });
	 
	 
	 	 $(".jian").click(function(){
	
	// var pnums=parseInt($(".kucunnum").html());
	 
	 nms--;
	 
	 if(nms>0){
	
	 $(".pro_number").val(nms);
	 
	 }else{
	 nms=1;
	 }
	 

	 
	 });
	 	  


})