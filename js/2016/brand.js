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

     
		    var myPlayer2 = null;
		if($("#example_video_2").length>0){
	if($("#example_video_2").length>0){
	
      videojs("#example_video_2").ready(function() {
        myPlayer2 = this;
		if($(".gpage").hasClass("mpgpage")){
				myPlayer2.pause();
			
		}else{
				myPlayer2.play();
			
		}
	

    });
	}
	
		}
	
	
  function initSlide(){
    w = $(window).width();
	$(".wordul").css("width",$(".wordul li").length*w);
	$(".wordul li").css("width",w);
	var libh=$(".worddiv .gt").eq(0).outerHeight();
	$(".worddiv").height(libh);
	if(w>1180){
	   $(".glunfixed").css("position","fixed");
	   $(".shou_head").hide();
	$(".container").show();
	$(".pcimg").hide();
	var height =630; 
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
 
 
$(".gsb").mouseenter(function(){

  $(".gbz1",$(this)).stop().animate({opacity:1},900);

  $(".gbz",$(this)).stop().animate({opacity:0.86},500);

});



$(".gsb").mouseleave(function(){
   $(".gbz1",$(this)).stop().animate({opacity:0},500);

  $(".gbz",$(this)).stop().animate({opacity:0},500);


});
 
 
 $(".vid_bg").mouseenter(function(){
   $(".cs",$(this)).stop().animate({opacity:[0,"easeInOutSine"]},300);
   $(".hp",$(this)).stop().animate({opacity:[1,"easeInOutSine"]},500);



});



$(".vid_bg").mouseleave(function(){
   $(".hp",$(this)).stop().animate({opacity:[0,"easeInOutSine"]},500);
   $(".cs",$(this)).stop().animate({opacity:[1,"easeInOutSine"]},500);
  $(".hp",$(this)).css("zIndex",22);
  $(".cs",$(this)).css("zIndex",33);

});


$(".bbg_img").mouseenter(function(){
	if(!$(this).hasClass("w_jqzhi")){
	 $(this).parent().addClass("bbload");
	}


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
		
	
     function LoadBgImg(objs) {
     if(objs.hasClass("img4")){
	   return false;
	 }
    var browser = new Object();
    var obj = new Object();
    obj = objs;
	    var imgsrc='';
    browser.useragent = window.navigator.userAgent.toLowerCase();
    browser.ie = /msie/.test(browser.useragent);
    browser.moz = /gecko/.test(browser.useragent);
	
	 if(objs.hasClass("img2")){
	 if($(window).width()>=640){
	
      imgsrc = obj.attr("data-img");
	}else{
		
	   imgsrc = obj.attr("data-media");
	
	}
	
	}else{
	 imgsrc = obj.attr("data-img");
	
	}
	

 
 
    var image = new Image;
    image.src = imgsrc;
    if (browser.ie) {
        if (image.height === 0) {
            image.onload = function() {
              
                ShowBBgImage(objs,imgsrc);
            }

        } else {
         ShowBBgImage(objs,imgsrc);

        }
    } else {
        image.onload = function() {
            if (image.complete == true) {
                ShowBBgImage(objs,imgsrc);
            }
        }

    }

    image.onerror = function() {
        obj.parent().removeClass("img_loading").addClass("img_loading_error");
    }

}
function ShowBBgImage(obj,imgsrc) {
     //alert($(window).width());
     if($(window).width()<=640){
	
		   var hsz=$(window).width()*640/960;
        
		   obj.closest(".bbg_img ").css("height",hsz);
	
	}
	  $("img",obj).attr("src",imgsrc);	 
      obj.closest(".bbg_img ").css("background","url("+imgsrc+") no-repeat");
	  obj.closest(".bbg_img ").css({"background-position":"50% 50%","background-size":"cover"});
	  $(".dloadding",obj).fadeOut();
	
   
    
 
}

initBB();
	$(window).resize(function(){
	
	initBB();

	});
	
function initBB(){
       
         if($(window).width()<=640){
	     
		  var hsz=$(window).width()*640/960;
         $(".w_ylu").css("width","100%");
		   $(".bbg_img").css("height",hsz);
		    $(".bbg_img").css("width",$(window).width());
		    $(".dloadding",$(".bbg_img")).css("height",hsz);
	        $(".bgcon").width($(window).width());
			  $(".wz_con").width($(window).width());
			  $(".bbvideo").width($(window).width());
			$(".bbvideo,#example_video_2").css("height",hsz);
		  }else if($(window).width()>640 && $(window).width()<1180){
		        // $(".w_ylu").css("width","82%");
		 
		   $(".bbg_img").css("width","auto");
		    $(".bbg_img").css("height","auto");
			  var cconw=$(window).width()*0.62;
		   var rhf1=cconw*0.322*420/380;
		      $(".img1").height(rhf1);
			  
		    $(".img1 .dloadding").height(rhf1);
			      $(".bbvideo,#example_video_2").height(rhf1);
			   $(".bgcon").width("48.3%");
			    $(".wz_con").width("32.2%");
						  $(".bbvideo").width("64.4%");
						   $("#example_video_2").width("100%");
						  
			 $(".dloadding",$(".bbg_img")).css("height","100%");
		  }else{
		           
			      $(".bbvideo,.w_jqzhi,#example_video_2").height(420);
			     $(".bbg_img").css("width","auto");
			  	   $(".bgcon").width("48.3%");
			    $(".wz_con").width("32.2%");
						  $(".bbvideo").width("64.4%");
						  	   $("#example_video_2").width("100%");
			 $(".dloadding",$(".bbg_img")).css("height","100%");
			  
		  }
	  $(".bbg_img").each(function(){

	  $(".dloadding",$(this)).show();
	  LoadBgImg($(this));
	  });	
}
});
function initBs(){
       
         if($(window).width()<=640){
	
		  var hsz=$(window).width()*640/960;
         $(".w_ylu").css("width","100%");
		   $(".bbg_img").css("height",hsz);
		    $(".bbg_img").css("width",$(window).width());
		   $(".dloadding",$(".bbg_img")).css("height",hsz);
	        $(".bgcon").width($(window).width());
			  $(".wz_con").width($(window).width());
			  $(".bbvideo").width($(window).width());
			$(".bbvideo").css("height",hsz);
		  }else if($(window).width()>640 && $(window).width()<1180){
		  //  alert($(window).width());
		  var cconw=960*0.62;
		   
		   var rhf1=cconw*0.314*420/380;
		      $(".img1").height(rhf1);
		    $(".img1 .dloadding").height(rhf1);
			      $(".bbvideo").height(rhf1);
		    $(".bbvideo .dloadding").height(rhf1);
			 
		   
		  
		   var rh=cconw*0.4855*912/680;
		
		   $(".img2").height(rh);
		    $(".img2 .dloadding").height(rh);
			
			var rhs=cconw*0.4855*430/680;
			   $(".img3").height(rhs);
		    $(".img3 .dloadding").height(rhs);
			
			var rhf=cconw*0.314*248/440;
				   $(".img5").height(rhf);
		    $(".img5 .dloadding").height(rhf);
		  
		  }else{
         
            //alert($(window).width());
		   var cconw=$(window).width()*0.62;
		   var rhf1=cconw*0.314*420/380;
		      $(".img1").height(rhf1);
		    $(".img1 .dloadding").height(rhf1);
			      $(".bbvideo").height(rhf1);
		    $(".bbvideo .dloadding").height(rhf1);
		   var rh=cconw*0.4855*912/680;
		   $(".img2").height(rh);
		    $(".img2 .dloadding").height(rh);
			var rhs=cconw*0.4855*430/680;
			   $(".img3").height(rhs);
		    $(".img3 .dloadding").height(rhs);
			
			var rhf=cconw*0.314*248/440;
				   $(".img5").height(rhf);
		    $(".img5 .dloadding").height(rhf);
			
			
			}
			
			
		   
			  
		  }

window.mobileAndTabletcheck = function() {
    var t = !1;
    return function(e) { (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (t = !0)
    } (navigator.userAgent || navigator.vendor || window.opera),t
}