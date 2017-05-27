
$(function(){
	 initDetail();
	 	$(window).resize(function(){
	 initDetail();
	});
	 function initDetail(){
	 
	 var w=$(window).width();
     if(w<1180){
      
      var h=w*640/960;
     }else{
	 var h=667;
	 }
	  $(".viw img").width(w);
	 $(".viw img").height(h);
	 $(".viw ").height(h);
	 }
	 



})