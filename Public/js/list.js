$(function(){

var lilen=$(".pro_box ul li").length;



var window_width=$(window).width();

var avgeli=window_width/5;

$(".danPage").html("0"+1);

var index=0;

if(window_width>640){
var page=Math.ceil(lilen/3);
  if(3*page-lilen<3 && 3*page-lilen>0){
  page=page-1;

  }
  if(page>=10){
    $(".allPage").html(page);
  }else{
  
      $(".allPage").html("0"+page);
  }



  $(window).resize(function() { 
  window_width=$(window).width();
  if(window_width>640){
   if(3*page-lilen<3 && 3*page-lilen>0){
  page=page-1;

  }

  if(page>=10){
    $(".allPage").html(page);
  }else{
  
      $(".allPage").html("0"+page);
  }
  avgeli=window_width/5;

  $(".mobile,.nav_arrow").hide();

  }else{

  }
  
  });
  
        $(window).load(function(){
		if($(".pro_box ul li").length>5){
      $('.flexslider').flexslider({
        animation: "slide",
        start: function(slider){
          $('body').removeClass('loading');
        },
		after:function(slider){
		var current= slider.currentSlide+1;
		
		  if(current>=10){
    $(".danPage").html(current);
  }else{
  
      $(".danPage").html("0"+current);
  }
		}
      });
	  
	  }
    });

 }else{
 
   if(lilen>=10){
   
     $(".allPage").html(lilen);
  }else{
  
      $(".allPage").html("0"+lilen);
  }
  
  var ulobj=$(".slides");
  
  var bindex=0;
  
  var movewidth=window_width;
  
  $(".a_left").click(function(){
  prev();
  
  });
  
    $(".a_right").click(function(){
  next();
  
  });
    $(".slides").css("width",lilen*window_width);
	$(".slides li").css("width",window_width);
  	 $(window).resize(function() { 
	 
       window_width=$(window).width();
	   
	   if(window_width<640){
	    movewidth=window_width;
      $(".slides").css("width",lilen*window_width);
  	   $(".slides li").css("width",window_width);
	   }else{
	    movewidth=window_width/5;
		 avgeli=window_width/5;
	     $(".slides").css("width",lilen*window_width);
  	   $(".slides li").css("width",avgeli);
	   }
     });
    function prev(){
	
if (!$("li:first",ulobj).is(":animated")) {

	 if(lilen<2){
	 
	  return false;
	 
	 }
	  bindex--;
	  if(bindex<0){
	  
	  bindex=lilen-1;
	  }
	  	
	     
		   $("li:last",ulobj).prependTo(ulobj);
				 $("li:first",ulobj).css("margin-left", -movewidth).stop().animate({
            "margin-left": [0,"easeOutCirc"]
        },
        800, "easeOutCirc",function(){
    });
  var ps=bindex+1;
  if(ps>=10){
   
    $(".danPage").html(ps);
  }else{
  
      $(".danPage").html("0"+ps);
  }
	   
	}
}
	

	
	
	
	
	function next(){

	if (!$("li:first",ulobj).is(":animated")) {			

	 if(lilen<2){
	 
	  return false;
	 
	 }

	    bindex++;
	  if(bindex>lilen-1){
	  
	  bindex=0;
	  }

       $("li:first",ulobj).animate({
				"margin-left": [-movewidth,"easeOutCirc"]
			},
			800,
			function() {
				$(this).css("margin-left", 0).appendTo(ulobj);
			});		
  var ps=bindex+1;
		  if(ps>=10){
    $(".danPage").html(ps);
  }else{
  
      $(".danPage").html("0"+ps);
  }
	
   }
	
	}

 
 
 }





});
