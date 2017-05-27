$(function(){

  
    var nowpage=$(".nowpage").val();

      $(".nav_icon").click(function(){
  $(".mobile,.nav_arrow").toggle();
  });
   // alert(1);

  
  $(window).resize(function() { 
  var window_width=$(window).width();
  if(window_width>640){
  
  $(".mobile,.nav_arrow").hide();
  }
  
  });
  
	/*$("#topnav_alixixi .nav_en").prepend("<span></span>"); 
      setTimeout(function(){
		$("#topnav_alixixi .nav_en").each(function(i) { 
		var linkText =$(".nav_cn").eq(i).html(); 
		$(this).find("span").show().html(linkText);
	});	
		
	},200);

	
	 

	$("#topnav_alixixi .nav_en").hover(function() {

	   $("#topnav_alixixi .nav_en").find("span").stop().animate({
			marginTop: "0" 
		}, 500);
		$(this).find("span").stop().animate({
			marginTop: "-40" 
		}, 500);
	} , function() { 
    
	  	   var navindex=$("#topnav_alixixi .nav_en").index(this);
	   
	   if(navindex==nowpage){
	   
	    return false;
	   }
	  	$("#topnav_alixixi .nav_en").find("span").stop().animate({
			marginTop: "0" 
		}, 500,function(){
		
		    $("#topnav_alixixi .nav_en").eq(nowpage).find("span").stop().animate({
			marginTop: "-40" 
		}, 500);
	
		});
	  //	$("#topnav_alixixi .nav_en").eq(cstep).find("span").stop().animate({
			//marginTop: "-40" 
	//	}, 500);
	  

	}	

);
	  	   $("#topnav_alixixi .nav_en").eq(nowpage).find("span").stop().animate({
			marginTop: "-40" 
		}, 500);*/
 })