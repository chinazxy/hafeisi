
var bs=0;
var ss=0;
$(function(){


$(".head_nav li").hover(function(){
   var nids=$(".head_nav li").index(this);
   $(".head_nav li > a").removeClass("current").eq(nids).addClass("current");
   
   if($(this).children().next().hasClass("head_subnav")){
    
     $(this).children().next().show();
	  $(this).children().next().css("zIndex",99999);
	  bs=$(".head_nav li .head_subnav").index($(this).children().next());
	  
	  	  if(ss!=bs){
	  
	      $(".head_nav li .head_subnav").not($(this).children().next()).hide();
	      $(this).children().next().css("zIndex",99990);
	  
	  }

   }else{
    $(".head_nav li .head_subnav").hide();
   
   }
 //  $("li").not($(this)).find("a").eq(0).removeClass("current");

},function(){


   if($(this).children().next().hasClass("head_subnav")){
     ss=$(".head_nav li .head_subnav").index($(this).children().next());

	  if(ss!=bs){
	  
	      $(".head_nav li .head_subnav").not($(this).children().next()).hide();
	      $(this).children().next().css("zIndex",99990);
	  
	  }

   }
   
   

});

$(".head_nav ul").mouseleave(function(){
$(".head_nav li .head_subnav").hide();

});

$(".head_nav li").each(function(i){
    if($(this).children().next().hasClass("head_subnav")){
   var s=$(".head_nav li .head_subnav").index($(this).children().next());
   var swidth=s*90+87;
    $(this).find(".subnavul").css("margin-left",swidth+"px");
   
      }

});




$(".search .in_txt").focus(function() {

   if ($(this).val() == '搜索，例如产品或款号') {

            $(this).val("");

        }


});


$(".search .in_txt").blur(function() {

   if ($(this).val() == '搜索，例如产品或款号' ||  $(this).val().Trim() == "") {

            $(this).val("搜索，例如产品或款号");

      }


});

$(".sear").click(function(){
   if ($(".in_txt").val() == '搜索，例如产品或款号' ||  $(".in_txt").val().Trim() == "") {

          $(".in_txt").val("搜索，例如产品或款号");

      }else{
	  $("#searchForm").submit();
	     
	  }


});

$(".sear").keypress(function(e){

 var currKey=0,e=e || event;
　　      　   currKey=e.keyCode || e.which || e.charCode;
　　       　 if(currKey===13){
              
			    var searchVal=$(".in_txt").val().Trim();
				if(searchVal==="搜索，例如产品或款号" || searchVal===""){
					 alert("搜索，例如产品或款号");
				  return false;
				}else{
				  $("#searchForm").submit();
				// location.href=app+"/Search/Index/keyword/"+searchVal;
				 
				}

              }

});


$(".foot_email .foot_email_l").focus(function() {

   if ($(this).val() == '在这里输入电子邮件') {

            $(this).val("");

        }


});


$(".foot_email .foot_email_l").blur(function() {

   if ($(this).val() == '在这里输入电子邮件' ||  $(this).val().Trim() == "") {

            $(this).val("在这里输入电子邮件");

      }


});




	  

 



	 

	

	
	
	var nowpage=$(".nowpage").val();
	
	$(".head_nav li > a").eq(nowpage).addClass("current");
	
	
	  $(".dianpu_in").mouseenter(function(){

    // if($(this).children().hasClass("ling_nav_tan")){
	
	  $(".dianpu_in_txt").stop().animate({height:130,opacity:1},500,"easeInOutSine");
	 //}
   
  });
  
  	  $(".dianpu_in a").click(function(){
         
     $(".dianpu_in_input").val($(this).html());
   
  });
  
    $(".dianpu_in").mouseleave(function(){
   
   //  if($(this).children().hasClass("ling_nav_tan")){
	 
	  $(".dianpu_in_txt").stop().animate({height:0,opacity:0},500,"easeInOutSine");
	// }
  
  });
  
  
  $(".help_navs").click(function(){
  
   var hn=$(".help_navs").index(this);
   
   
         $(".help_alert_box").hide().eq(hn).fadeIn(300,function(){
        	$('.scrollbar2').eq(hn).tinyscrollbar({trackSize:300});
   $(".register_xieyi_box").animate({opacity:1,marginTop:[-230,"easeOutSine"]},300);
   
   
   });
   

  
  

     $("body").css("overflow-y","hidden");
  
  });
  
  $(".help_alert_box .guanbi").click(function(){
  
      $(".register_xieyi_box").animate({opacity:0,marginTop:[-250,"easeInOutSine"]},600,function(){

   $(".help_alert_box").fadeOut(300,function(){
   $("body").css("overflow-y","");
   
   });
 });

  });

})


function reflash_cart(){

					 $.ajax({
                type: 'POST',
                url: 'cart.php?act=refresh',
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				 
                },
                success: function(data){
		
					    $(".cat_count").empty().html(data.count);
					    $(".deng_cart_list").empty().html(data.content);
			             $(".bag_shu").empty().html(data.count);
                 
		
                }
            });


}

function reflash_cat(){

$(".priceButtonb .w_sho").data('click',true);

  	
  	//e.stopPropagation();
					var $target=$(".priceButtonb .w_sho"),
					    dis=$target.data('click'),
					    x = (($(".w_yb").width()-60)/2),
						y = $(".w_yb").height()/2-39/2,
			            
						X = $(".bag").offset().left-$(".w_yb").offset().left-23.5,
						Y = $('.gh').offset().top+39/2;
					
					var imgsrc=$(".w_yjt li").eq(0).find("img").attr("src");
				
					if(dis){
						if ($('#floatOrder').length <= 0) {
							$('.w_yb').after('<div id="floatOrder" style="position:absolute;z-index:99999999"><img src="'+imgsrc+'" width="60" height="39"  /></div');
						};
						$target.data('click',false)
	
						var $obj=$('#floatOrder');
		if(!$obj.is(':animated')){
					
					     $obj.css({'left': x,'top': y}).animate({'left': [X,"easeInOutQuart"],'top': Y-$(".w_yb").offset().top/2},800,function() {
										
		
								$obj.stop(false, false).animate({'top': Y-$(".w_yb").offset().top,'opacity':0},600,function(){
									$obj.fadeOut(300,function(){
									$obj.remove();	
										$target.data('click',true);
			
										
									});
									
																		 $.ajax({
                type: 'POST',
                url: 'cart.php?act=refresh',
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				 
                },
                success: function(data){
		
					    $(".cat_count").empty().html(data.count);
					    $(".deng_cart_list").empty().html(data.content);
			             $(".bag_shu").empty().html(data.count);
                 
		
                }
            });
		
								});
							});	
						};
					};
  





}



function reflash_mb_cat(){

	 $.ajax({
                type: 'POST',
                url: 'cart.php?act=refresh',
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				 
                },
                success: function(data){
		
					    $(".cat_count").empty().html(data.count);
					    $(".deng_cart_list").empty().html(data.content);
			             $(".bag_shu").empty().html(data.count);
                 
		
                }
            });



}




function reflash_collect_cat(goods_id){
var goodsid=goods_id;
$(".buybtn_"+goodsid).data('click',true);

  	
  	//e.stopPropagation();
					var $target=$("#gwc_"+goodsid),
					    dis=$target.data('click'),
					    x = $(".gwcd_"+goodsid).offset().left+$(".gwcd_"+goodsid).width()/2-$("#floatOrder").width()/2,
						y = $(".gwcd_"+goodsid).offset().top+$(".gwcd_"+goodsid).height()/2-$("#floatOrder").height()/2,
			     
						X = $(".bag").offset().left-(parseInt($(".bag").outerWidth())+parseInt($(".bag").css("marginRight")))/2,
						Y = $('.header').offset().top;
					
					var imgsrc= $(".gwcd_"+goodsid).find("img").attr("src");
					if(dis){
						if ($('#floatOrder').length <= 0) {
							$(".gwcd_"+goodsid).append('<div id="floatOrder" style="position:absolute;z-index:99999"><img src="'+imgsrc+'" width="50" height="21"  /></div');
						};
						$target.data('click',false)
	
						var $obj=$('#floatOrder');
				
						if(!$obj.is(':animated')){
				
							$obj.css({'left': x,'top': y}).animate({'left': [X,"easeInOutQuart"],'top': Y-(parseInt($(".bag").outerHeight())+parseInt($(".bag").css("marginTop")))/2},800,function() {
										
		
								$obj.stop(false, false).animate({'top': Y-$(".gwcd_"+goodsid).offset().top,'opacity':0},600,function(){
									$obj.fadeOut(300,function(){
									  $obj.remove();	
										$target.data('click',true);
			
										
									});
									
																		 $.ajax({
                type: 'POST',
                url: 'cart.php?act=refresh',
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				 
                },
                success: function(data){
		
					    $(".cat_count").empty().html(data.count);
					    $(".deng_cart_list").empty().html(data.content);
			             $(".bag_shu").empty().html(data.count);
                 
		
                }
            });
		
								});
							});	
						};
					};
  





}


String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}