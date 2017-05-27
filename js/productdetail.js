$(function(){


   $(".guanbi").click(function(){
   
     $(".register_alert_box").fadeOut();
	   $("body").css("overflow-y","");
   });
   
   $(".alertbox").click(function(){
    $(".register_alert_box").fadeIn(100,function(){
	
	$('#scrollbar1').tinyscrollbar({trackSize:300});
	
	});
     $("body").css("overflow-y","hidden");
   });
var ullen=$(".product_p_1_imgbox ul li").length;
var bindex=0;
var pages=Math.ceil(ullen/4);
var ulobj=$(".product_p_1_imgbox ul");

$(".product_p_1_up").click(function(){

prev();

});

$(".product_p_1_down").click(function(){

next();

});

  function prev(){
	
if (!$(".product_p_1_imgbox ul li").eq(bindex).is(":animated")) {

	 if(ullen<4){
	 
	  return false;
	 
	 }
	  bindex--;
	  if(bindex<0){
	  
	  bindex=0;
	  return false;
	  }
	  	
	       var mw=bindex*95;
  
  ulobj.stop().animate({marginTop:[-mw+"px","easeOutCirc"]},1200);

	   
	}
}
	

	
	
	
	
	function next(){
  
	if (!$(".product_p_1_imgbox ul li").eq(bindex).is(":animated")) {			

	 if(ullen<4){
	 
	  return false;
	 
	 }
    
	    bindex++;
	
	  if(bindex>ullen-4){
	
	  bindex=ullen-4;
	  return false;
	  }
	  
	
	

	    // $(".b_line_box li").eq(bindex).addClass("select").siblings().removeClass("select");
		 
 	       var mw=bindex*95;
  
  ulobj.stop().animate({marginTop:[-mw+"px","easeOutCirc"]},1200);	

		  
	
   }
	
	}

	$(".product_p_t5 li").click(function(){
	
	
	  
	  var label=$(this).attr("label");
	  
	    $(".product_p_t4 span").html(label);
		
		$(this).addClass("current").siblings().removeClass("current");
	
	});
	
   var olds=-1;
	
	$(".product_p_t8box_l").not(".alertbox").click(function(){
	
	  var ppt=$(".product_p_t8box_l").index(this);  
	  
	  if(ppt==olds){
	    if($(".product_p_t8_t").eq(ppt).is(":visible")){
		
		$(".product_p_t8_t").eq(ppt).slideUp();
		  $(".product_p_t8box_r").eq(ppt).removeClass("current");
		
		}else{
		
		$(".product_p_t8_t").eq(ppt).slideDown();
		  $(".product_p_t8box_r").eq(ppt).addClass("current");
		}
	    return false;
	  }
	 if($(".product_p_t8_t").eq(ppt).is(":visible")){
	 
	     $(".product_p_t8box_r").eq(ppt).removeClass("current");

	 
	 }else{
	 
	 $(".product_p_t8box_r").removeClass("current").eq(ppt).addClass("current");
	 
	 }
	 
	  $(".product_p_t8_t").slideUp().eq(ppt).slideDown();
	 

	 
	olds=ppt;
	});
	
		$(".product_p_t8box_r").not(".alertbox_r").click(function(){
	
	  var ppt=$(".product_p_t8box_r").index(this);
  if(ppt==olds){
  
  if($(".product_p_t8_t").eq(ppt).is(":visible")){
		
		$(".product_p_t8_t").eq(ppt).slideUp();
		  $(".product_p_t8box_r").eq(ppt).removeClass("current");
		
		}else{
		
		$(".product_p_t8_t").eq(ppt).slideDown();
		  $(".product_p_t8box_r").eq(ppt).addClass("current");
		}
	    return false;
	  }	  
	 if($(".product_p_t8_t").eq(ppt).is(":visible")){
	     $(".product_p_t8box_r").eq(ppt).removeClass("current");

	 
	 }else{
	 
	 $(".product_p_t8box_r").eq(ppt).addClass("current");
	 
	 }
	   $(".product_p_t8_t").slideUp().eq(ppt).slideDown();
	 

	 	olds=ppt;
	
	});
	
	
	$(".product_p_t7_box").hover(function(){
	$(".product_p_t7_box a").removeClass("current");
	  $("a",$(this)).addClass("current");
	
	
	});
	
	
	$(".product_p_t6_r_ul li").click(function(){
	
	   $(".product_inp").val($(this).val());
	
	});

	
	
	
 $(".tab_descript").click(function(){
	$(".des_wenzi").not($(this).next()).slideUp();

    if($(this).next().css("display")==="none"){
   
     $(this).addClass("des_select").siblings().removeClass("des_select");
	 
	
   }else{
   
     $(this).removeClass("des_select");
   }
   
   $(this).next().slideToggle();
   
   
 });
 
 
 $(".product_p_t9").click(function(){
  
   var pt=$(".product_p_t9").index(this);
   $(".product_p_t9 a").not($("a",$(this))).removeClass("current");
   $("a",$(this)).addClass("current");
   
   $(".product_p_centerbox2").hide().eq(pt).show();
 
 
 });
 
 
 
 
 	var naindex=0;
	var  vcindex=0;
	var naimglen=$(".you_may_also_like li").length;
	
	$(".you_may_also_like").css("width",naimglen*135);
    $(".left1").click(function(){
		  var ulobj = $(".you_may_also_like");
		if (!$("li:first", ulobj).is(":animated")) {
	 if(naimglen<5){
	 
	  return false;
	 
	 }

	  
	  $("li:last", ulobj).prependTo(ulobj);
	   $("li:first", ulobj).css("margin-left", -130).stop().animate({
            "margin-left": 0
        },
        500, "easeInOutSine",function(){

    });

	}
	});
  
  
   
	
    $(".right1").click(function(){
	  var ulobj = $(".you_may_also_like");
		if (!$("li:first", ulobj).is(":animated")) {
							
					

	 if(naimglen<2){
	 
	  return false;
	 
	 }

	  
       $("li:first", ulobj).animate({
				"margin-left": -130
			},
			500,
			function() {
			// $(".natural_middle li").eq(naindex).addClass("cur").siblings().removeClass("cur"); 
				$(this).css("margin-left", 0).appendTo(ulobj);
			});		

		  
	
   	}
	});
	
	
	
	
	
		var rvplength=$(".recently_viewed_products li").length;
	
	$(".recently_viewed_products").css("width",naimglen*135);
    $(".left2").click(function(){
		  var ulobj = $(".recently_viewed_products");
		if (!$("li:first", ulobj).is(":animated")) {

	 if(rvplength<5){
	 
	  return false;
	 
	 }

	  
	  $("li:last", ulobj).prependTo(ulobj);
	   $("li:first", ulobj).css("margin-left", -130).stop().animate({
            "margin-left": 0
        },
        500, "easeInOutSine",function(){

    });

	}
	});



    $(".right2").click(function(){
	  var ulobj = $(".recently_viewed_products");
		if (!$("li:first", ulobj).is(":animated")) {

	 if(rvplength<2){
	 
	  return false;
	 
	 }

	  
       $("li:first", ulobj).animate({
				"margin-left": -130
			},
			500,
			function() {

				$(this).css("margin-left", 0).appendTo(ulobj);
			});		

		  
	
   	}
	});
	
	
	
		var hislength=$(".history_goods li").length;
	
	$(".history_goods").css("width",naimglen*135);
    $(".left3").click(function(){
		  var ulobj = $(".history_goods");
		if (!$("li:first", ulobj).is(":animated")) {

	 if(hislength<5){
	 
	  return false;
	 
	 }

	  
	  $("li:last", ulobj).prependTo(ulobj);
	   $("li:first", ulobj).css("margin-left", -130).stop().animate({
            "margin-left": 0
        },
        500, "easeInOutSine",function(){

    });

	}
	});



    $(".right3").click(function(){
	  var ulobj = $(".history_goods");
		if (!$("li:first", ulobj).is(":animated")) {

	 if(hislength<2){
	 
	  return false;
	 
	 }

	  
       $("li:first", ulobj).animate({
				"margin-left": -130
			},
			500,
			function() {

				$(this).css("margin-left", 0).appendTo(ulobj);
			});		

		  
	
   	}
	});
 
 
 $(".pro_number").keyup(function(){  

        $(this).val($(this).val().replace(/\D|^0/g,''));  

    }).bind("paste",function(){

        $(this).val($(this).val().replace(/\D|^0/g,''));  

    });
 
   $(".jia").click(function(){
  
	var inintNums=parseInt($(".pro_number").val());
	if(inintNums<=0){
	
	 $(".pro_number").val(1);
	}else{
	 
	   inintNums=inintNums+1;
	 $(".pro_number").val(inintNums);
	}

 
	//addNums(recid,inintNums,shopprice,dispcount,eleindex);
  
  });
  
  
   $(".jian").click(function(){
  
   	var inintNums=parseInt($(".pro_number").val());

    inintNums=inintNums-1;
	if(inintNums<1){
	
	$(".pro_number").val(1);
	
	}else{
	
	$(".pro_number").val(inintNums);
	
	}
	
	
  
  });
  
  
  $(".product_p_1_imgbox ul li").mouseenter(function(){
   
     $("img",$(this)).trigger("click");
 
  });
  
 
  $(".detail_banner .banner li img").click(function(){
   
    $(this).parent().parent().addClass("red_border").siblings().removeClass("red_border");
  
  });
 
$(".showpic").hover(
function(){
  $(this).find(".pic1").hide();
  $(this).find(".pic2").show();
}
,

function(){
   $(this).find(".pic1").show();
  $(this).find(".pic2").hide();
}

);


$(".des_color_s li").click(function(){

  $(this).addClass("select").siblings().removeClass("select");
  
  $(".des_color_s li input").attr("checked",false);
  
  $(this).find("input").attr("checked",true);

});


$(".xuanze a").click(function(){

   var tabindex=$(".xuanze a").index(this);
   
   $(this).addClass("select").siblings().removeClass("select");
   
   $(".taocang_banner_w").hide().eq(tabindex).fadeIn();
   
   $(".taocang_arrow_left").hide().eq(tabindex).show();
   $(".taocang_arrow_right").hide().eq(tabindex).show();



});
 

});