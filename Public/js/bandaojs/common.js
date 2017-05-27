$(function(){

 //	 var contextObj=$(".bottom");
  
 //  var nav_c=$(".nav li").filter(".has_childer");
   
  // var parent_nav_c=$(".two_nav_wrap");
   
   var nowpage=$(".nowpage").val();
  
  // parent_nav_c.hide();

/*   
   $(".nav li").mouseenter(function(){
	
	var childIndex=$(".nav  li").index(this);
	
	if($(this).hasClass("has_childer")){
		
	 var index=$(".has_childer").index(this);
	
	  parent_nav_c.hide().eq(index).fadeIn(1000);
		
	}else{
		 parent_nav_c.hide();
		
	}					
	});*/
   
    var nowobj;
	
	var index=0;
	
	var tobj;
	
	 $(".nav li").click(function(){
								 
			 var childIndex=$(".nav  li").index(this);	
			
			 
			$(this).addClass("select-li").siblings().removeClass("select-li");					 
								 
	})
	 var moveObj=$(".green-slide");
	 
	 if(nowpage>0){
	 
	 var startleftval=120*nowpage;
	 
	 moveObj.css("left",startleftval+"px");
	 
	      $(".nav li").eq(nowpage).attr("style","");
	       $(".nav li").eq(nowpage).children().attr("style","color:#000");	
	 
	 }

      $(".nav li").mouseenter(function(){
									   
	  var childIndex=$(".nav  li").index(this);
	  var movewidth=120*childIndex;
	 /// alert(movewidth);
	 
	  var cssVal="background:none";
	  $(this).attr("style",cssVal).siblings().attr("style","");
	
	     var that=this;
	      TweenMax.to( moveObj, .3, { css:{left:movewidth}, ease:Linear.easeIn, delay: 0.1,onComplete:function(){
																							 
		  $(".nav li a").attr("style","");
	       $(that).children().attr("style","color:#000");																								   
																										   
																										   
																										   }}); 
	 if(!$(this).hasClass("select-li")){
	
	
	 if($(this).hasClass("has_childer")){
		 
	     index=$(".has_childer").index(this);
	 
	      tobj= parent_nav_c.eq(index);
		 
		 if(typeof nowobj!=="undefined"){;
	     TweenMax.to( nowobj, .3, { css:{top:0,opacity:0}, ease:Linear.easeOut, delay: 0.1,onComplete:function(){
																													 
				TweenMax.to( tobj, .3, { css:{top:60,opacity:1}, ease:Linear.easeIn, delay: 0.1}); 
	
	             nowobj=tobj; 
;
			 }});

		 }else{
			 	TweenMax.to( tobj, .3, { css:{top:60,opacity:1}, 	ease:Linear.easeIn, delay: 0.1}); 
				
				
	             nowobj=tobj; 
			 
		 }
	
		 
		
		
	}else{
		
	  TweenMax.to( parent_nav_c, .2, { css:{top:-60,opacity:0}, 	ease:Linear.easeInOut, delay: 0.1});
		
	}	
	
	 }
	});
	  
	 
	  
	  
	  
	  $(".nav li").mouseleave(function(){
	
	  //  var childIndex=$(".nav  li").index(this);
		
	    //TweenMax.to( parent_nav_c, .1, { css:{top:-60,opacity:0}, 	ease:Sine.easeIn, delay: 0.1});
		
				
	 });
	  

   
   
	
 })