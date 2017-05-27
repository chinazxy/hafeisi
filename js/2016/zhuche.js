$(function(){

  $("#selectyzed_gender").click(function(){
  var selthat=$(this)
     if($(this).hasClass("active")){
	 
	  $(".UlSelectizeContainer").slideUp(300,function(){
	 selthat.removeClass("active");
	  });
	 }else{
	 
	   $(".UlSelectizeContainer").slideDown(300,function(){
	    selthat.addClass("active");
	   
	   });
	 }

  });
  
    $("#selectionCont").click(function(){
    var selthat=$(this);
	var itemlen=$(".item",$(this)).length;
     if($(this).hasClass("active")){
	 
	  $("#selectionCont").animate({height:36},500,function(){
	  
	  	    selthat.removeClass("active");
	  });
	 }else{
	 
	 	  $("#selectionCont").animate({height:itemlen*36},500,function(){
	  
	  	    selthat.addClass("active");
	  });
	 }

  });
  
  

});