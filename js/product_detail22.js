$(function(){

 $(".prode_right_box1 .pro_rbox1").click(function(){
  
    if($(this).find(".pro_rbox2").length>0){
	
	   if($(this).find(".pro_rbox2").hasClass("pro_rbox2_on")){
	         
	      	  $(this).find(".pro_rbox2").slideUp(200);
			   $(this).find(".pro_rbox2").removeClass("pro_rbox2_on").addClass("pro_rbox2_off"); 
			   $(".pro_rb1",$(this)).removeClass("select");
		
	   }else{
	   
	     $(".pro_rbox2").not($(this).find(".pro_rbox2")).slideUp(200);
	   	  $(this).find(".pro_rbox2").slideDown(200);
		  $(".pro_rbox2").not($(this).find(".pro_rbox2")).removeClass("pro_rbox2_on");
	      $(this).find(".pro_rbox2").removeClass("pro_rbox2_off").addClass("pro_rbox2_on");
		  
		   $(".pro_rb1").removeClass("select").not($(".pro_rb1",$(this)));
		  	  $(".pro_rb1",$(this)).addClass("select");
	   }
	

	
	}else{
	 
	  if($(this).hasClass("customer_service")){
	   $("html,body").css("overflow-y","hidden");
	   document.body.style.overflow='visible';
	     $(".sevice").fadeIn();
		 
		var serverH=$(".sevice .zezao_txt").height()+parseInt($(".sevice .zezao_txt").css("paddingLeft"))*2;

		$(".sevice .zezao_txt").css({top:"50%",marginTop:-serverH/2});
	  
	  }
	  
	
	
	}
 
 
 
 });
 
 
 $(".go_buy").click(function(){
 
   $("html,body").css("overflow-y","hidden");
   document.body.style.overflow='hidden';
	     $(".sevice").fadeIn();
 
 });
 
 $(".add_wishlist").click(function(){
 
  $("html,body").css("overflow-y","hidden");
	     $(".wishbak").fadeIn();
 	$(".header").css("position","fixed");
 });
 
 $(".wishlist_close").click(function(){
 
    $(".zezao ").fadeOut();
    $("html,body").css("overflow-y","visible");
	document.body.style.overflow='visible';
	

$(".header").css("position","relative");
 
 });
 
 
 $(".zezao_close").click(function(){
 
  $(".zezao ").fadeOut();
    $("html,body").css("overflow-y","visible");
document.body.style.overflow='visible';
 	
 });
 
 
 $(".pro_rbox2  ul li img").click(function(){
    $("img").removeClass("select");
    $(this).addClass("select");
	
	var ctitle=$(this).attr("data_title");
	$(".show_color").html(ctitle);
 
 })
 
 
  $(".pro_rbox2  ul li a").click(function(e){
  
    e.stopPropagation();
  
  });
  
  
  


})