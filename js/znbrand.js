$(function(){

	var naindex=0;
	var  vcindex=0;
	var movewidth=740;
	var naimglen=$(".sport_right_img1 li").length;
	  var ulobj = $(".sport_right_img1 ul");
	  var nindex=0;
	$(".sport_right_img1 ul").css("width",naimglen*movewidth);
    $(".left1").click(function(){
		
		if (!$("li:first", ulobj).is(":animated")) {
	 if(naimglen<2){
	 
	  return false;
	 
	 }

	  
	  $("li:last", ulobj).prependTo(ulobj);
	   $("li:first", ulobj).css("margin-left", -movewidth).stop().animate({
            "margin-left": 0
        },
        500, "easeInOutSine",function(){

    });

	}
	});

	
    $(".right1").click(function(){

		if (!$("li:first", ulobj).is(":animated")) {
							
					

	 if(naimglen<2){
	 
	  return false;
	 
	 }

	  
       $("li:first", ulobj).animate({
				"margin-left": -movewidth
			},
			500,
			function() {
			// $(".natural_middle li").eq(naindex).addClass("cur").siblings().removeClass("cur"); 
				$(this).css("margin-left", 0).appendTo(ulobj);
			});		

		  
	
   	}
	});
	 // alert($(".sport_right_img1 li").eq(0).attr("item-title"));
	 $(".brand_tou a").html($(".sport_right_img1 li").eq(0).attr("item-title"));
	$(".brand_tou a").attr("href",$(".sport_right_img1 li").eq(0).attr("item-url"));
	var states=setInterval(function(){
	play();
	
	},5000);
	
	$(".brand_tou").mouseenter(function(){
	
	
	clearInterval(states);
	});
	
	
	$(".brand_tou").mouseleave(function(){
	states=setInterval(function(){
	play();
	
	},5000);
	});
	function play(){
	
	 if(naimglen<2){
	 
	  return false;
	 
	 }
	 
	 vcindex++;
	 
	 if(vcindex>naimglen-1){
	 
	 vcindex=0;
	 }

	  
       $("li:first", ulobj).animate({
				"margin-left": -movewidth
			},
			500,
			function() {
			// $(".natural_middle li").eq(naindex).addClass("cur").siblings().removeClass("cur"); 
			
				$(this).css("margin-left", 0).appendTo(ulobj);
				 $(".brand_tou a").html($(".sport_right_img1 li").eq(0).attr("item-title"));
				 	$(".brand_tou a").attr("href",$(".sport_right_img1 li").eq(0).attr("item-url"));
			});		

	
	
	}
	
	
	$(".brand_subnew_sear_t").focus(function() {

   if ($(this).val() == '输入你要搜索的新闻') {

            $(this).val("");

        }


});


$(".brand_subnew_sear_t").blur(function() {

   if ($(this).val() == '输入你要搜索的新闻' ||  $(this).val().Trim() == "") {

            $(this).val("输入你要搜索的新闻");

      }


});


$(".brand_subnew_sear_img").click(function(){

   if ($(".brand_subnew_sear_t").val() == '输入你要搜索的新闻' ||  $(".brand_subnew_sear_t").val().Trim() == "") {

            $(".brand_subnew_sear_t").focus();
			
			 $(".brand_subnew_sear_t").val("");
			 
			 return false;

      }else{
	  
	  location.href=$(".urls").val()+"&keywords="+$(".brand_subnew_sear_t").val();
	  }

});


var monthval=$(".month").val();

if(monthval.Trim()!=""){

$(".brand_subnew_in_t").val(monthval+"月份");

}

});