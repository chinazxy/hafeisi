$(function(){

 //initVideo();
        function initVideo(){
			         var vindow=$(window).width();
				     var vh=$(window).width()*9/16;
					   var vhs=$(window).width()*9/16+140;
					 
				      $(".vid_video,.vid_bg").css({width:vindow,height:vh,top:"50%",marginTop:-vhs/2});
				 	  // $("#example_video_1").css({width:vindow,height:vh,top:"50%",marginTop:-vh/2});
				 	
					 
					 }
		      function iVideo(){
			         var vindow=$(window).width();
				     var vh=$(window).width()*9/16;
					   var vhs=$(window).width()*9/16+140;
					 
				     
				 	   $("#example_video_1").css({width:vindow,height:vh,top:"50%",marginTop:-vh/2});
				 	
					 
					 }			 
	$(window).resize(function() {
	initVideo();
	iVideo();
	});

	  
		   initVideo();

var vcon=$(".vid_bg").get(0);

     if(vcon.addEventListener){
		vcon.addEventListener("click",function(){
	   iVideo();
      var media=$("#example_video_1").get(0);
				 $(".vid_bg").hide();
				 media.play();
	            $("#example_video_1").show();
				
					$audio = $("audio").get(0);
					$audio.pause();
					$(".u-globalAudio").removeClass("z-play").addClass("z-pause");
		  },false);
		    
		  }else if(vcon.attachEvent){
		  
		    vcon.attachEvent('onclick'+eventType,function(e){
		  iVideo();
      var media=$("#example_video_1").get(0);
			 $(".vid_bg").hide();
				 media.play();
	            $("#example_video_1").show();
				
					$audio = $("audio").get(0);
					$audio.pause();
					$(".u-globalAudio").removeClass("z-play").addClass("z-pause");
			}
			
		
			);
		  
		  }
     if(vcon.addEventListener){
		vcon.addEventListener("tap",function(){
	 
      var media=$("#example_video_1").get(0);
				 $(".vid_bg").hide();
				 media.play();
	            $("#example_video_1").show();
				  iVideo();
					$audio = $("audio").get(0);
					$audio.pause();
					$(".u-globalAudio").removeClass("z-play").addClass("z-pause");
		  },false);
		    
		  }else if(vcon.attachEvent){
		  
		    vcon.attachEvent('ontap'+eventType,function(e){
		  iVideo();
      var media=$("#example_video_1").get(0);
			 $(".vid_bg").hide();
				 media.play();
	            $("#example_video_1").show();
				
					$audio = $("audio").get(0);
					$audio.pause();
					$(".u-globalAudio").removeClass("z-play").addClass("z-pause");
			}
			
		
			);
		  
		  }
	$(".vid_bg").on("click",function(e){
   
	e.stopPropagation(); 
	}); 
	
		$(".vid_bg").on("tap",function(e){
	 	e.stopPropagation(); 
	
	}); 

 var media=$("#example_video_1").get(0);
     if(media.addEventListener){
		  media.addEventListener("pause",functions,false);
	
		  }else if(media.attachEvent){
		  
		    media.attachEvent('onpause'+eventType,functions);
		 
		  }
     if(media.addEventListener){
		  media.addEventListener("play",functions2,false);
		  
		  
			 
		  }else if(media.attachEvent){
		  
		    media.attachEvent('onplay'+eventType,functions2);
		
		  }

 function  functions(){
 
//$("#example_video_1").hide();
  
	// $(".play_video,.play_video2").fadeIn();
 	$audio = $("audio").get(0);
					$audio.play();
					$(".u-globalAudio").removeClass("z-pause").addClass("z-play");
	
 }
 
 
  function  functions2(){
 

 	 $(".vid_bg").hide();
		   $audio = $("audio").get(0);
					$audio.pause();
					$(".u-globalAudio").removeClass("z-play").addClass("z-pause");
	
 }
 

 $(".fangda").click(function(){

 $(".viewer ").css({width:$(window).width(),height:$(window).height()});
  $(".bgs").fadeIn();
  $(".fs").hide();
 
 $(".viewer").fadeIn();
 $(".viewer").zoomer();
 
 });
 
 

var target = document.querySelector('.circle');
// 获得对应的事件名字
var animateEvent = function () {
    var el = document.createElement('div');
    var map = {
        animation: 'animationend',
        MozAnimation: 'animationend',
        WebkitAnimation: 'webkitAnimationEnd'
    };
    
    for (var name in map) {
        if (el.style[name] !== undefined) {
            return map[name];
        }
    }
}();
target.addEventListener(animateEvent, function (e) {
var target1 = document.querySelector('.bgs1');
var target2 = document.querySelector('.bgs2');
var target3 = document.querySelector('.bgs3');
var target4 = document.querySelector('.zoomer');
target1.style.zIndex="99";
target2.style.display="none";
target3.style.zIndex="99";
target4.style.zIndex="99999";
}, false);

var animateStart = function () {
    var el = document.createElement('div');
    var maps = {
        animation: 'animationstart',
        MozAnimation: 'animationstart',
        WebkitAnimation: 'webkitAnimationStart'
    };
    
    for (var name in maps) {
        if (el.style[name] !== undefined) {
            return maps[name];
        }
    }
}();




target.addEventListener(animateStart, function (e) {

var target1 = document.querySelector('.bgs1');
var target2 = document.querySelector('.bgs2');
var target3 = document.querySelector('.bgs3');
var target4 = document.querySelector('.zoomer');

target4.style.zIndex="9997";
target1.style.zIndex="9996";
target2.style.display="block";
target2.style.zIndex="9996";
target3.style.zIndex="9996";
}, false);
});

 /*window.onorientationchange = function(){
    switch(window.orientation){
        case -90:
        case 90:
        alert("横屏:" + window.orientation);
        case 0:
        case 180:
        alert("竖屏:" + window.orientation);
        break;
    }
}*/