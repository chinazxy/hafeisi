var page1_action = {};
page1_action.play = function() {

          /*     setTimeout(function(){
	   
	     TweenMax.to($(".jackson_box"), .7, {
			css: {
				marginTop: -175,
				opacity:1
			},
			ease:Circ.easeOut,
			delay: 0
		 });
		 
		  TweenMax.to($(".index_nav_dot"), .7, {
			css: {
				marginTop: 0,
				opacity:1
			},
			ease:Circ.easeOut,
			delay: 0
		 });
  
	   }, 800);*/
	 	
},
page1_action.reset = function() {

     
          /*	TweenMax.to($(".jackson_box"), .5, {
			css: {
				marginTop: -125,
				opacity:0
			},
			ease:Sine.easeInOut,
			delay: 0
		});   */
	 	   

		
		 
	
};
var page2_action = {};
page2_action.play = function() {
           /*	   setTimeout(function(){
	   
	     TweenMax.to($(".dflx_box"), .7, {
			css: {
				marginTop: -175,
				opacity:1
			},
			ease:Circ.easeOut,
			delay: 0,
			onComplete:function(){
			  
			   
			
			}
		 });
		 
		    $(".dflx_box .arrow").fadeIn(1000);
  
	   }, 800);*/
},
page2_action.reset = function() {
  
	 	  /*	TweenMax.to($(".dflx_box"), .5, {
			css: {
				marginTop: -125,
				opacity:0
			},
			ease:Sine.easeInOut,
			delay: 0
			
		});   
		$(".dflx_box .arrow").fadeOut(1000);*/
		 
};
var page31_action = {};
page31_action.play = function() {

},
page31_action.reset = function() {

};
var page3_action = {};
page3_action.play = function() {
           setTimeout(function(){
	   
	  /*   TweenMax.to($(".ppdp_box"), .7, {
			css: {
				marginTop: -175,
				opacity:1
			},
			ease:Circ.easeOut,
			delay: 0,
			onComplete:function(){
			  
			   
			
			}
		 });
		 
		 $(".ppdp_box .arrow").click(function(){
		 
		  gotoPage_Next();
		 
		 });
		 
		    $(".ppdp_box .arrow").fadeIn(1000);
  */
	   }, 800);
},
page3_action.reset = function() {
  /* 	TweenMax.to($(".ppdp_box"), .5, {
			css: {
				marginTop: -125,
				opacity:0
			},
			ease:Sine.easeInOut,
			delay: 0
			
		});   
		$(".ppdp_box .arrow").fadeOut(1000);*/
};



var page4_action = {};
page4_action.play = function() {

   setTimeout(function(){
	   
	     TweenMax.to($(".slide_box"), .7, {
			css: {
				bottom: 80,
				opacity:1
			},
			ease:Circ.easeOut,
			delay: 0,
			onComplete:function(){
			  
			   
			
			}
		 });
		 
	
		 
		 
		 
		 //   $(".ppdp_box .arrow").fadeIn(1000);
  
	   }, 800);
    var naindex=0;
	var  vcindex=0;
		  var naimglen= $(".slide_ul_swap li").length;
		  
		  if(naimglen<10){
		  
		     $(".pageAll").html("0"+naimglen);
		  }else{
		    $(".pageAll").html(naimglen);
		  }
		  $(".slide_ul_swap").css("width",windowWidth*naimglen);
    $(".slide_arrow_box .left").click(function(){
		  var ulobj = $(".slide_ul_swap");
		if (!$("li:first", ulobj).is(":animated")) {
   	vcindex=0;
	 if(naimglen<2){
	 
	  return false;
	 
	 }
	  naindex--;
	  if(naindex<0){
	  
	  naindex=naimglen-1;
	  }
	  
	   	  if(naindex<10){
		  
		     $(".pageDang").html("0"+(naindex+1));
		  }else{
		    $(".pageDang").html(naindex+1);
		  }
	  
       $(".title_show .title_ab").eq(naindex).fadeIn("slow").siblings().fadeOut();
         var ulobj = $(".slide_ul_swap");
        
		   $("li:last", ulobj).prependTo(ulobj);
				 $("li:first", ulobj).css("margin-left", -windowWidth).stop().animate({
            "margin-left": 0
        },
        800, "easeInOutSine",function(){
			


		// $(".natural_middle li").eq(naindex).addClass("cur").siblings().removeClass("cur"); 
    });

	}
	});

	
    $(".slide_arrow_box  .right").click(function(){
	  var ulobj = $(".slide_ul_swap");
		if (!$("li:first", ulobj).is(":animated")) {
							
					
	vcindex=0;
	 if(naimglen<2){
	 
	  return false;
	 
	 }
	  naindex++;
	  if(naindex>naimglen-1){
	  
	  naindex=0;
	  }
	  	  if(naindex<10){
		  
		     $(".pageDang").html("0"+(naindex+1));
		  }else{
		    $(".pageDang").html(naindex+1);
		  }
      $(".title_show .title_ab").eq(naindex).fadeIn("slow").siblings().fadeOut();
       
        moveWidth = 357; 
       $("li:first", ulobj).animate({
				"margin-left": -windowWidth
			},
			800,
			function() {
			// $(".natural_middle li").eq(naindex).addClass("cur").siblings().removeClass("cur"); 
				$(this).css("margin-left", 0).appendTo(ulobj);
			});		

		  
	
   	}
	});     	 
},
page4_action.reset = function() {
        TweenMax.to($(".slide_box"), .7, {
			css: {
				bottom: 30,
				opacity:0
			},
			ease:Circ.easeOut,
			delay: 0,
			onComplete:function(){
			  
			   
			
			}
		 });
		 

};

var page5_action = {};
page5_action.play = function() {

 setTimeout(function(){
	   
	     TweenMax.to($(".bag_slide_re"), .7, {
			css: {
				marginTop: 0,
				opacity:1
			},
			ease:Circ.easeOut,
			delay: 0,
			onComplete:function(){
			  
			   
			
			}
		 });
		 
		 //   $(".ppdp_box .arrow").fadeIn(1000);
  
	   }, 800);

     //var vimglen= $(".bag_slide_ul li").length;
	//var vindex=0;
	//var  vcindex=0;
 /*   $(".bag_arrow .left").click(function(){
		  var ulobj = $(".bag_slide_ul");
		if (!$("li:first", ulobj).is(":animated")) {
   	vcindex=0;
	 if(vimglen<2){
	 
	  return false;
	 
	 }
	  vindex--;
	  if(vindex<0){
	  
	  vindex=vimglen-1;
	  }
	  
	   if(vindex<10){
	  
        $(".bagDang").html("0"+(vindex+1));
	  }else{
	  
	   $(".bagDang").html(vindex+1);
	  }
	  
     $(".bag_text .title_ab").hide().eq(vindex).fadeIn("slow"); 

         var ulobj = $(".bag_slide_ul");
        moveWidth = 332;
		   $("li:last", ulobj).prependTo(ulobj);
				 $("li:first", ulobj).css("margin-left", -moveWidth).stop().animate({
            "margin-left": 32
        },
        800, "easeInOutSine",function(){
		
		
    });
		  
	}
	});

	
    $(".bag_arrow .right").click(function(){
	
	  var ulobj = $(".bag_slide_ul");
		if (!$("li:first", ulobj).is(":animated")) {
							
					
	vcindex=0;
	 if(vimglen<2){
	 
	  return false;
	 
	 }
	  vindex++;
	  if(vindex>vimglen-1){
	  
	  vindex=0;
	  }
	  	   if(vindex<10){
	  
        $(".bagDang").html("0"+(vindex+1));
	  }else{
	  
	   $(".bagDang").html(vindex+1);
	  }
       $(".bag_text .title_ab").hide().eq(vindex).fadeIn("slow"); 

        moveWidth = 332; 
       $("li:first", ulobj).animate({
				"margin-left": -moveWidth
			},
			800,
			function() {
				$(this).css("margin-left", 32).appendTo(ulobj);
			});		

		  
	
   	}
	});  */ 	 
},
page5_action.reset = function() {
     TweenMax.to($(".bag_slide_re"), .7, {
			css: {
				marginTop: 50,
				opacity:0
			},
			ease:Circ.easeOut,
			delay: 0,
			onComplete:function(){
			  
			   
			
			}
		 });
		 
};

var page6_action = {};
page6_action.play = function() {
                setTimeout(function(){
	   
	     TweenMax.to($(".about_us"), .7, {
			css: {
				marginTop: -140,
				opacity:1
			},
			ease:Circ.easeOut,
			delay: 0,
			onComplete:function(){
			  
			   
			
			}
		 });
		 
		 
  
	   }, 800); 
   
       $(".know").click(function(){
	   
	      $(".alert_box").fadeIn();
	   }); 

       $(".alert_close").click(function(){
	   
	    $(".alert_box").fadeOut();
	   });	   
},
page6_action.reset = function() {
    TweenMax.to($(".about_us"), .7, {
			css: {
				marginTop: -90,
				opacity:0
			},
			ease:Circ.easeOut,
			delay: 0,
			onComplete:function(){
			  
			   
			
			}
		 });
		 
};

var page7_action = {};
page7_action.play = function() {
  setTimeout(function(){

	     if(document.all){
		 
		 	   var browser=navigator.appName

var b_version=navigator.appVersion

var version=b_version.split(";");

var trim_Version=version[1].replace(/[ ]/g,"");
var bottom=0;
if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0")

{

bottom=50;

}else{
bottom=80;

}
		 
		 }else{
	   
bottom=80;
		 
		 }
		 
	
			     TweenMax.to($(".product_container"), .7, {
			css: {
				bottom: bottom,
				opacity:1
			},
			ease:Circ.easeOut,
			delay: 0,
			onComplete:function(){
			  
			   
			
			}
		 }); 
		 
		 
		 //   $(".ppdp_box .arrow").fadeIn(1000);
  
	   }, 800);
    var vimglen= $(".product_box .wrap_li").length;
	var vindex=0;
	var  vcindex=0;
    $(".num_arrow_left").click(function(){
		  var ulobj = $(".product_box ul");
		if (!$(".wrap_li:first", ulobj).is(":animated")) {
   	vcindex=0;
	 if(vimglen<2){
	 
	  return false;
	 
	 }
	  vindex--;
	  if(vindex<0){
	  
	  vindex=vimglen-1;
	  }
	  
	   if(vindex<10){
	  
        $(".proDang").html("0"+(vindex+1));
	  }else{
	  
	   $(".proDang").html(vindex+1);
	  }
	  
   //  $(".bag_text .title_ab").hide().eq(vindex).fadeIn("slow"); 

      	  var ulobj = $(".product_box ul");
        moveWidth = 960;
		   $(".wrap_li:last", ulobj).prependTo(ulobj);
				 $(".wrap_li:first", ulobj).css("margin-left", -moveWidth).stop().animate({
            "margin-left": 10
        },
        800, "easeInOutSine",function(){
		
		
    });
		  
	}
	});

	
    $(".num_arrow_right").click(function(){
	
	  var ulobj = $(".product_box ul");
		if (!$(".wrap_li:first", ulobj).is(":animated")) {
							
					
	vcindex=0;
	 if(vimglen<2){
	 
	  return false;
	 
	 }
	  vindex++;
	  if(vindex>vimglen-1){
	  
	  vindex=0;
	  }
	  	   if(vindex<10){
	  
        $(".proDang").html("0"+(vindex+1));
	  }else{
	  
	   $(".proDang").html(vindex+1);
	  }
      // $(".bag_text .title_ab").hide().eq(vindex).fadeIn("slow"); 

        moveWidth = 960; 
       $(".wrap_li:first", ulobj).animate({
				"margin-left": -moveWidth
			},
			800,
			function() {
				$(this).css("margin-left", 10).appendTo(ulobj);
			});		

		  
	
   	}
	});   
         	 
},
page7_action.reset = function() {
   
	     TweenMax.to($(".product_container"), .7, {
			css: {
				bottom: -50,
				opacity:0
			},
			ease:Circ.easeOut,
			delay: 0,
			onComplete:function(){
			  
			   
			
			}
		 });
};


