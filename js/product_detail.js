$(function(){




var scroolTop=0;
 $(".prode_right_box1 .pro_rbox1").click(function(){
  
    if($(this).find(".pro_rbox2").length>0){
	
	   if($(this).find(".pro_rbox2").hasClass("pro_rbox2_on")){
	         
	      	 // $(this).find(".pro_rbox2").slideUp(200);
			 //  $(this).find(".pro_rbox2").removeClass("pro_rbox2_on").addClass("pro_rbox2_off"); 
			  // $(".pro_rb1 .position1 ",$(this)).removeClass("select");
		
	   }else{
	   
	   //  $(".pro_rbox2").not($(this).find(".pro_rbox2")).slideUp(200);
	   	 // $(this).find(".pro_rbox2").slideDown(200);
		 // $(".pro_rbox2").not($(this).find(".pro_rbox2")).removeClass("pro_rbox2_on");
	    //  $(this).find(".pro_rbox2").removeClass("pro_rbox2_off").addClass("pro_rbox2_on");
		  
		  // $(".pro_rb1 .position1 ").removeClass("select").not($(".pro_rb1",$(this)));
		  	//  $(".pro_rb1 .position1 ",$(this)).addClass("select");
	   }
	

	
	}else{
	 
	  if($(this).hasClass("customer_service")){
	  scroolTop=$(document).scrollTop();
	// alert(scroolTop);
	   $("html,body").css("overflow-y","hidden");
	      $("html,body").addClass("noscroll");
	     document.body.style.overflow='hidden';
	     $(".sevice").fadeIn();
		  $(".zezao_xiang").slideDown();
		    $(".zezao_fuwu").removeClass("zxOff").addClass("zxOn");
	  $(".zezao_title2").removeClass("select");
	  $(".zezao_title2").addClass("select");
		   	if(!IsPC()){
    $(".page ").hide();
     }
		var serverH=$(".sevice .zezao_txt").height()+parseInt($(".sevice .zezao_txt").css("paddingLeft"))*2;

		$(".sevice .zezao_txt").css({top:"50%",marginTop:-serverH/2});
	  
	  }
	  
	
	
	}
 
 
 
 });
 
 $(".zezao_xiang div").click(function(e){
 
  e.stopPropagation();
 })
 
 
 $(".go_buy").click(function(){
   
   $("html,body").css("overflow-y","hidden");
	      $("html,body").addClass("noscroll");
   document.body.style.overflow='hidden';
   	if(!IsPC()){
    $(".page ").hide();
     }

	     $(".sevice").fadeIn();
		 
 
 });
 
 

 
 $(".add_wishlist").click(function(){
 
 /* $("html,body").css("overflow-y","hidden");
  	      $("html,body").addClass("noscroll");
	
	     $(".wishbak").fadeIn();
		 	  	if(!IsPC()){
 	$(".header").css("position","fixed");
	}else{
		$(".header").css("position","absolute");
		$("html, body").animate({scrollTop:0},"slow");
		$(".wishlist_nav").width($(".header").width());
	}
	   $("body").addClass("noscroll");*/
 });
 
 $(".wishlist_close").click(function(){
 
    $(".zezao ").fadeOut();
    $("html,body").css("overflow-y","visible");
		if(!IsPC()){
 $(".page ").show();


 }else{
  $(".header").css("position","absolute");
 }


	

//$(".header").css("position","relative");
 
 });
 
 
 $(".zezao_close").click(function(){
 
  $(".zezao ").fadeOut();
    $("html,body").css("overflow-y","visible");
	if(!IsPC()){
 $(".page ").show();
 }
      $("html, body").animate({scrollTop:scroolTop},"slow")
 	
 });
 
  $(".m_prode_right .pro_rbox2  ul li .p_color").eq(0).addClass("select");
 $(".pro_rbox2  ul li .p_color").click(function(e){
    $(".pro_rbox2  ul li .p_color").removeClass("select");
    $(this).addClass("select");
	$(".viewer img").attr("src",$(this).attr("data-big"));
	content_loading($(this),$(".bd_imgs"));
	
	var ctitle=$(this).attr("data_title");
	$(".show_color").html(ctitle);
	  $(".triggera",$(this)).trigger("click");
	  
	  e.stopPropagation();
 
 
 });
 
 $(".bd_imgs,.fangda").click(function(){
 $(".page").hide();
 $(".viewer ").css({width:$(window).width(),height:$(window).height()})
 $(".viewer").fadeIn();
 $(".viewer").zoomer();
 
 });
 

 
 
  $(".pro_rbox2  ul li a").click(function(e){
  
    e.stopPropagation();
  
  });
  
  $(".zezao_tbox .zezao_fuwu").addClass("zxOff");
  $(".zezao_tbox .zezao_fuwu").click(function(){
  
     $(".zezao_xiang").not($(".zezao_xiang",$(this))).removeClass("select").slideUp();
  
     if($(this).hasClass("zxOff")){
	  $(".zezao_xiang").slideUp();
	  $(".zezao_xiang",$(this)).slideDown();
	  $(".zezao_tbox .zezao_fuwu").not($(this)).removeClass("zxOn").addClass("zxOff");
	  $(this).removeClass("zxOff").addClass("zxOn");
	  $(".zezao_title2").removeClass("select");
	  $(".zezao_title2",$(this)).addClass("select");
	 }else{
	 
	  $(".zezao_xiang",$(this)).slideUp();
	  $(".zezao_title2",$(this)).removeClass("select");
	  $(this).removeClass("zxOn").addClass("zxOff");
	 
	 }
  });
  
  
    $(".fenxi_le").click(function(){
   
     if($(this).hasClass("share_off")){
	   
	    $(this).removeClass("share_off").addClass("share_on");
	    $(".fenxiang_re",$(this)).slideUp();
	 
	 }else{
	 
	    	    $(this).removeClass("share_on").addClass("share_off");
	    $(".fenxiang_re",$(this)).slideDown();
	 }
   

  
   });
   
   
   $(".fenxiang_re_close").click(function(e){
     $(".fenxi_le").removeClass("share_off").addClass("share_on");
       $(".fenxiang_re").slideUp();
	   	e.stopPropagation();
   });
   
   $(".fenxiang_re_share a").click(function(e){
   
     	e.stopPropagation();
   });
  
  
  	  $("#owl-demo").owlCarousel({
     
    autoPlay: 3000, //Set AutoPlay to 3 seconds
      stopOnHover : false,
navigation:true,
    items : 3,
	prevClass:$(".owl-prev"),
	nextClass:$(".owl-next"),
    itemsDesktop : [1199,3],
    itemsDesktopSmall : [979,3]
     
    });
	
	    $("#owl-his").owlCarousel({
     
    autoPlay: 5000, //Set AutoPlay to 3 seconds
      stopOnHover : false,
navigation:true,
    items : 5,
	prevClass:$(".his_prev"),
	nextClass:$(".his_next"),
	autoPlay:false,
    itemsDesktop : [1199,3],
    itemsDesktopSmall : [979,3]
     
    });
	
	

	
	
	
		   function content_loading(imageobj,objs) {
        var browser = new Object();
        var obj = new Object();
        obj = imageobj;
        browser.useragent = window.navigator.userAgent.toLowerCase();
        browser.ie = /msie/.test(browser.useragent);
        browser.moz = /gecko/.test(browser.useragent);
        var imgsrc = obj.attr("data-src");
	
        var image = new Image;
        image.src = imgsrc;
        if (browser.ie) {
            if (image.height === 0) {
                image.onload = function() {
                 
                    showContentImage(imgsrc,objs);
                }

            } else {
              
                showContentImage(imgsrc,objs);

            }
        } else {
            image.onload = function() {
                if (image.complete == true) {
                 
                    showContentImage(imgsrc,objs);
                }
            }

            image.onerror = function() {
               
            }

        }

    }

	
	    function showContentImage(imgsrc,obj) {
	 

        $(".bd_img",$(obj)).not($(".bd_img:first",$(obj))).remove();
	    var bdimgobj=$(".bd_img:last",$(obj)).css("opacity",1).clone();
	    bdimgobj.find("img").attr("src",imgsrc);
	    bdimgobj.prependTo($(obj));
		
		$(".bd_img:last",$(obj)).stop().animate({opacity: 0},500,"easeInOutSine");
		
		
	   
	   
     }
	 $(window).resize(function() {

		bimgs();
	
	});
	 
		 bimgs();
function bimgs(){

var w=$(window).width();

$(".viewer").css({width:w,height:$(window).height()})

if(w*0.9>639){

$(".bd_imgs ").height(639);
}else{

$(".bd_imgs ").height($(window).width()*0.9);
}	 
$(".viewer").zoomer("resize");
$(".viewer").zoomer("pan",50,50);


}


	 



})