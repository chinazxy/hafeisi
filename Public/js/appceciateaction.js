var page1_action = {};

page1_action.play = function() {
     
       setTimeout(function(){
	   $(".down_arrow").fadeIn();
	   TweenMax.to($(".appreciate_01"), .5, {
			css: {
				marginTop: 0,
				opacity:1
			},
			ease:Sine.easeInOut,
			delay: 0
		});
	   
	   }, 600);
	 	
},
page1_action.reset = function() {

        $(".down_arrow").fadeOut();
	 	TweenMax.to($(".appreciate_01"), .5, {
			css: {
				marginTop: 100,
				opacity:0
			},
			ease:Sine.easeInOut,
			delay: 0
		});
};
var page2_action = {};
page2_action.play = function() {
	 $(".down_arrow").fadeOut();
},
page2_action.reset = function() {
 $(".down_arrow").fadeOut();
};
var page3_action = {};
page3_action.play = function() {
   
 $(".down_arrow").fadeOut();
 setTimeout(function(){
	    
	   
	   TweenMax.to($(".appreciate_03_main"), .5, {
			css: {
				marginTop: 0,
				opacity:1
			},
			ease:Sine.easeInOut,
			delay: 0
		});
	   
	   }, 600);
     var vimglen= $(".v_img li").length;
	var vindex=0;
	var  vcindex=0;
    $(".appre_arrow .appre_left").click(function(){
	$(".video_play").attr("src"," ");
	$(".video_play").hide();
		  var ulobj = $(".v_img ul");
		if (!$("li:first", ulobj).is(":animated")) {
   	vcindex=0;
	 if(vimglen<2){
	 
	  return false;
	 
	 }
	  vindex--;
	  if(vindex<0){
	  
	  vindex=vimglen-1;
	  }
	  
     $(".appre_middle li").eq(vindex).addClass("cur").siblings().removeClass("cur"); 
	 $(".appre_w").html($(".v_img li").eq(vindex).attr("video_title"));
         var ulobj = $(".v_img ul");
        moveWidth = 656;
		   $("li:last", ulobj).prependTo(ulobj);
				 $("li:first", ulobj).css("margin-left", -moveWidth).stop().animate({
            "margin-left": 0
        },
        800, "easeInOutSine",function(){
		
		
    });
		  
	}
	});

	
    $(".appre_arrow .appre_right").click(function(){
	$(".video_play").attr("src"," ");
	$(".video_play").hide();
	  var ulobj = $(".v_img ul");
		if (!$("li:first", ulobj).is(":animated")) {
							
					
	vcindex=0;
	 if(vimglen<2){
	 
	  return false;
	 
	 }
	  vindex--;
	  if(vindex<0){
	  
	  vindex=vimglen-1;
	  }
	  
     $(".appre_middle li").eq(vindex).addClass("cur").siblings().removeClass("cur"); 
       $(".appre_w").html($(".v_img li").eq(vindex).attr("video_title"));
        moveWidth = 656; 
       $("li:first", ulobj).animate({
				"margin-left": -moveWidth
			},
			800,
			function() {
				$(this).css("margin-left", 0).appendTo(ulobj);
			});		

		  
	
   	}
	});
	
	
	$(".appre_video ul li").click(function(){
	
	var videosrc=$(this).attr("video_path");
	if(videosrc===""){
	 
	  alert("不存在该视频！");
	  return false;
	}
	//alert(videosrc);
	$(".video_play").attr("src",videosrc+'&isAutoPlay=true&isShowRelatedVideo=false');
	$(".video_play").show();

	//$(".video_play").play(); 
	
	
	})
	
	
   
},
page3_action.reset = function() {
	   TweenMax.to($(".appreciate_03_main"), .5, {
			css: {
				marginTop: 100,
				opacity:0
			},
			ease:Sine.easeInOut,
			delay: 0
		});
	   
	
};

var page4_action = {};
page4_action.play = function() {
	
	 $(".down_arrow").fadeOut();
	 setTimeout(function(){
	 	   TweenMax.to($(".apprebottom"), .5, {
			css: {
				marginTop: 0,
				opacity:.5
			},
			ease:Sine.easeInOut,
			delay: 0
		});
	   
	   }, 600);
      var naimglen= $(".appreciate_04_ul li").length;
		  $(".appreciate_04_ul").css("width",windowWidth*naimglen);
		  // var ncimglen= $(".n_word_08 .n_wordbox1 ul li").length;
		 // $(".n_word_08 .n_wordbox1 ul").css("width",530*ncimglen);

	var naindex=0;
	var  vcindex=0;
    $(".midbox .appre1").click(function(){
		  var ulobj = $(".appreciate_04_ul");
		if (!$("li:first", ulobj).is(":animated")) {
   	vcindex=0;
	 if(naimglen<2){
	 
	  return false;
	 
	 }
	  naindex--;
	  if(naindex<0){
	  
	  naindex=naimglen-1;
	  }
	   
     // $(".n_word_08  .n_wordbox1 li").eq(naindex).fadeIn().siblings().fadeOut();
         var ulobj = $(".appreciate_04_ul");
        
		   $("li:last", ulobj).prependTo(ulobj);
				 $("li:first", ulobj).css("margin-left", -windowWidth).stop().animate({
            "margin-left": 0
        },
        500, "easeInOutSine",function(){
			
$(".appre_word a").html($(".appreciate_04_ul li").eq(0).attr("map-title")); 

		// $(".natural_middle li").eq(naindex).addClass("cur").siblings().removeClass("cur"); 
    });

	}
	});

	
    $(".midbox .next1").click(function(){
	  var ulobj = $(".appreciate_04_ul");
		if (!$("li:first", ulobj).is(":animated")) {
							
					
	vcindex=0;
	 if(naimglen<2){
	 
	  return false;
	 
	 }
	  naindex++;
	  if(naindex>naimglen-1){
	  
	  naindex=0;
	  }
	  
   //  $(".n_word_08  .n_wordbox1 li").eq(naindex).fadeIn().siblings().fadeOut();
    
       // moveWidth = 357; 
       $("li:first", ulobj).animate({
				"margin-left": -windowWidth
			},
			500,
			function() {
			   
			// $(".natural_middle li").eq(naindex).addClass("cur").siblings().removeClass("cur"); 
				$(this).css("margin-left", 0).appendTo(ulobj);
				 $(".appre_word a").html($(".appreciate_04_ul li:first").attr("map-title")); 
			});		

		  
	
   	}
	});
	 	
},
page4_action.reset = function() {
    $(".down_arrow").fadeOut();
 	   TweenMax.to($(".apprebottom"), .5, {
			css: {
				marginTop: 100,
				opacity:0
			},
			ease:Sine.easeInOut,
			delay: 0
		});
};

var page5_action = {};
page5_action.play = function() {
 $(".down_arrow").fadeOut();
	setTimeout(function(){
	    
	   
	   TweenMax.to($(".appreciate_05_main"), .5, {
			css: {
				marginTop: 0,
				opacity:1
			},
			ease:Sine.easeInOut,
			delay: 0
		});
	   
	   }, 600);
},
page5_action.reset = function() {
 $(".down_arrow").fadeOut();
		  	TweenMax.to($(".appreciate_05_main"), .5, {
			css: {
				marginTop: 100,
				opacity:0
			},
			ease:Sine.easeInOut,
			delay: 0
		});
};


$(function(){

	  $(".appre_w").html($(".v_img li").eq(0).attr("video_title"));
	  $(".appre_word a").html($(".appreciate_04_ul li:first").attr("map-title")); 
	  

	$(".jiao_close").click(function(){
	
	  $(".jiaotong_left").fadeOut();
	
	});

})
