var maps_h = 0;

$(function() {




$("window,body").click(function(){

		if ($(".mybl").hasClass("mybl_on")) {
				$(".mybl").removeClass("mybl_on").addClass("mybl_off");

					$(".deng_box").hide();
				
			     } 
			
				if ($(".bag").hasClass("bagon")) {
				
				 $(".bag").removeClass("bagon").addClass("bagoff");
			$(".miao_bao1").hide();
				}

});

$(".head_gouwu").click(function(e){

 e.stopPropagation();
})


$(".mybl ").mouseenter(function(){
   hideLoTip();
  if($(this).hasClass("no_login") && !$(this).hasClass("login_type")){
  
      if($(this).hasClass("login_off")){
 
   $(".miao_log").stop().animate({height:270},500,function(){
   
   $(this).addClass("login_on").removeClass("login_off");

   });
   
   }
  }

});

/*$(".miao_log_b").mouseleave(function(){

    $(".miao_log").stop().animate({height:0},500,function(){
   
   $(this).addClass("login_off").removeClass("login_on");
   });

});*/
$(".bl_co_pass").val("");
$(".bl_co_email").val("");
function showLoTip(obj,msg){
  
   $(".lo_miao_yin_t").html(""+msg);
   $(".lo_miao_yin").css({top:obj.offset().top-obj.outerHeight()-20,left:obj.offset().left+obj.width()/2}).fadeIn();
 
}

function hideLoTip(obj){

   $(".lo_miao_yin_t").html("");
   $(".lo_miao_yin").css({top:0,left:0}).hide();
$(".miao_login").hide();
}

$(".miao_log_cl").click(function(){
   hideLoTip();
$(".lo_miao_yin").hide();
    $(".miao_log").stop().animate({height:0},500,function(){
   
   $(this).addClass("login_off").removeClass("login_on");
   });

});

var bl_co_email_val="";
function bolon_yz_email(){
  bl_co_email_val=$(".bl_co_email").val();
  if(bl_co_email_val.Trim()===""){
       showLoTip($(".bl_co_email"),"请输入BOLON账号。");
    return false;
  }else{
  
	 var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   if(!filter.test(bl_co_email_val.Trim())){
  showLoTip($(".bl_co_email"),"BOLON账号格式不正确。");
	 
    return false;

   }else{
   
	hideLoTip($(".bl_co_email"));
     return true;
   }
   
   
  }


}

function bl_co_pass(){

bl_co_pass_val=$(".bl_co_pass").val();

if(bl_co_pass_val.Trim()===""){
 showLoTip($(".bl_co_pass"),"请输入登录密码。");
  $(".bl_co_pass").val("");
 return false;
}else{
   hideLoTip($(".bl_co_pass"));
 return true;
}

}


$(".bl_co_email").bind("focusout blur",function(){

bolon_yz_email();

});

$(".bl_co_email").bind("focus",function(){
$(this).prev().css("color","#ccc");
});

$(".bl_co_email").bind("keyup",function(){
hideLoTip();
if($(this).val().Trim()!=""){
$(this).prev().hide();
}else{
$(this).prev().show();
}
});
var bl_co_pass_val="";
$(".bl_co_pass").bind("focus",function(){
$(this).prev().css("color","#ccc");
});

$(".bl_co_pass").bind("keyup",function(){
hideLoTip();
if($(this).val().Trim()!=""){
$(this).prev().hide();
}else{
$(this).prev().show();
}
});


$(".bl_co_pass").bind("focusout blur",function(){
bl_co_pass();
});




var bl_mp_email_val="";
function bolon_mp_email(){
  bl_mp_email_val=$(".mp_account").val();
  if(bl_mp_email_val.Trim()===""){
    $(".login_mp_ti").html("<span class='ti_error'>请输入BOLON账号。</span>").show();

    return false;
  }else{
  
	 var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   if(!filter.test(bl_mp_email_val.Trim())){
 
	  $(".login_mp_ti").html("<span class='ti_error'>BOLON账号格式不正确。</span>").show();
    return false;

   }else{
   

     return true;
   }
   
   
  }


}
var bl_mp_pass_val="";
function bl_mp_pass(){

bl_mp_pass_val=$(".mp_password").val();

if(bl_mp_pass_val.Trim()===""){
    $(".login_mp_ti").html("<span class='ti_error'>请输入登录密码。</span>").show();;

  $(".login_mp_ti").val("");
 return false;
}else{
   
 return true;
}

}



$(".deng_mp_lu").click(function(){

      if(!bolon_mp_email()){
	  
	    return false;
	  }
        if(!bl_mp_pass()){
	  
	    return false;
	  }
	  
	  
	  	    $.ajax({
                type: 'POST',
                url: 'user.php',
				
                data:{
				    email:bl_mp_email_val,
					password:bl_mp_pass_val,
					act:"signin"
					
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				    isload=false;
					    $(".login_mp_ti").empty().html("表单正在提交...").show();;
		
                },
                success: function(data){
			     $(".login_mp_ti").empty().hide();
			    switch(data.error){
					 
					   
                        case 1:
						    var back_act=$(".back_act").val();
						      $(".login_mp_ti").empty().html("登录成功").show();;
                         
							setTimeout(function(){
							
							$(".login_mp_ti").hide();
                       
							window.location.href=window.location.href;
							},1000);
                         break; 
                        case 2:
					   $(".login_mp_ti").empty().html("<span class='ti_error'>请输入BOLON账号。</span>").show();;
						 
                       
		     
						  break;
					    case 3:
			               
                           $(".login_mp_ti").empty().html("<span class='ti_error'>邮箱或密码错误，登录失败!</span>").show();
						
                         break; 
					      case 4:
						    $(".login_mp_ti").empty().html("<span class='ti_error'>BOLON账号格试不正确。</span>").show();
						 
                           break; 
						   	   case 5:
							   			    $(".login_mp_ti").empty().html("<span class='ti_error'>请输入登录密码。</span>").show();
						 
                          
							
                           break; 
						   
                        default:
						    $(".login_mp_ti").empty().html("<span class='ti_error'>系统错误，刷新后重试!</span>").show();
						
				
					
    
			  
                    }
                  
		
                }
            });
});

$(".bl_submit_login").click(function(){

      if(!bolon_yz_email()){
	  
	    return false;
	  }
        if(!bl_co_pass()){
	  
	    return false;
	  }
	  
	    $.ajax({
                type: 'POST',
                url: 'user.php',
				
                data:{
				    email:bl_co_email_val,
					password:bl_co_pass_val,
					act:"signin"
					
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				    isload=false;
					$(".login_com").empty().show().html("表单正在提交...");
                },
                success: function(data){
			     $(".login_com").empty().hide();
			    switch(data.error){
					 
					   
                        case 1:
						    var back_act=$(".back_act").val();
						   
                            $(".login_com").html("登录成功!").show();
							setTimeout(function(){
							
							$(".login_com").hide();
                       
							window.location.href=window.location.href;
							},1000);
                         break; 
                        case 2:
						
						 showLoTip($(".bl_co_email"),"请输入BOLON账号。");
                       
		     
						  break;
					    case 3:
			              
                           $(".login_com").html("<span class='ti_error'>邮箱或密码错误，登录失败!</span>").show();
						
                         break; 
					      case 4:
						   showLoTip($(".bl_co_email"),"BOLON账号格试不正确。");
                           break; 
						   	   case 5:
						    showLoTip($(".bl_co_pass"),"请输入登录密码。");
                          
							
                           break; 
						   
                        default:
						  $(".login_com").html("<span class='ti_error'>系统错误，刷新后重试!</span>").show();
				
					
    
			  
                    }
                  
		
                }
            });

});




$(".fan_top").hide();
var npage=$(".n_page").val();

if(npage>0){

npage=npage;
}else{
npage=0;
}

$(".head_nav li .he_line").eq(npage).addClass("select");
 if($(window).width()>960){
	 // $(".fan_top").show();
	  
	 }else{
	 
	  $(".fan_top").hide();
	 }
$(".fan_top").click(function(){
$('html,body').animate({scrollTop: '0px'}, 800)

});
 function hasSVG(){

    SVG_NS = 'http://www.w3.org/2000/svg';

    return !!document.createElementNS && !!document.createElementNS(SVG_NS, 'svg').createSVGRect;
   
    }


	/*$(".search").hover(function(){
	
	 $(".search_t").css("zIndex",2);
	},function(){
	
	 $(".search_t").css("zIndex",0);
	
	});*/
	
if (!hasSVG()) {
  //alert(1);
   $(".svg_class").each(function(){
   
     $(this).attr("src",$(this).attr("date-src"));
	 var svgscc=$(this).attr("date-style");
	 $(this).attr("style"," ");
	  $(this).attr("style",svgscc);
   });
   

}
	var fh = $(".footer").height();
	var fhh = $(".fanhui").height();

	//$(".searchimg").addClass("hasOff");
	var w = $(window).width();
	$(".he_line2").click(function(e){
	
			if ($(this).parent().hasClass("hasOff")) {
			$(".search").removeClass("hasOff").addClass("hasOn");
			/*if ($(".juxing").hasClass("loginOn")) {
				$(".header_nav2").slideUp(300,
				function() {

					$(".juxing").removeClass("loginOn").addClass("loginOff");

					$(".deng_box").fadeOut();

				});
				
			} else {
				$(this).removeClass("hasOff").addClass("hasOn");
				$(".search_nav").slideDown();
				$(".deng_box").fadeOut();
				$(".mybl").removeClass("mybl_on").addClass("mybl_off");
			}*/
            $(".search_nav").slideDown();
		} else {

			$(this).parent().removeClass("hasOn").addClass("hasOff");

			$(".search_nav").slideUp();

		}
	e.stopPropagation();
	});
	
	$(".wenhao").click(function(e){
	 
		if ($(this).hasClass("hasOff")) {
		
		 $(".wenhao").removeClass("hasOff").addClass("hasOn");
		 
		 if ($(".search").hasClass("hasOn")) {
				$(".search_nav").slideUp(300,
				function() {

					$(".search").removeClass("hasOn").addClass("hasOff");

					//$(".deng_box").fadeOut();

				});
				
			} 
			
				if ($(".mybl").hasClass("mybl_on")) {
				$(".mybl").removeClass("mybl_on").addClass("mybl_off");

					$(".deng_box").hide();
				
			     } 
			
				if ($(".bag").hasClass("bagon")) {
				
				 $(".bag").removeClass("bagon").addClass("bagoff");
			$(".miao_bao1").hide();
				}
			   $(".dianhua_nav").slideDown();
		}else{
		
			$(this).removeClass("hasOn").addClass("hasOff");

			$(".dianhua_nav").slideUp();
		
		}
		e.stopPropagation();
	
	});
	
	
	$(".bag").click(function(e){
	
	if ($(this).hasClass("bagoff")) {
	 $(this).removeClass("bagoff").addClass("bagon");
	  		 if ($(".search").hasClass("hasOn")) {
				$(".search_nav").slideUp(300,
				function() {

					$(".search").removeClass("hasOn").addClass("hasOff");

					//$(".deng_box").fadeOut();

				});
				
			}


		if ($(".wenhao").hasClass("hasOn")) {
				$(".dianhua_nav").slideUp(300,
				function() {

					$(".wenhao").removeClass("hasOn").addClass("hasOff");

					//$(".deng_box").fadeOut();

				});
				
			} 			
			
				if ($(".mybl").hasClass("mybl_on")) {
				$(".mybl").removeClass("mybl_on").addClass("mybl_off");

					$(".deng_box").hide();
				
			} 
			
				$(".deng_box").hide();
				
				$(".miao_bao1").show();
	
	}else{
	 $(this).removeClass("bagon").addClass("bagoff");
			$(".miao_bao1").hide();
	
	}
	
	e.stopPropagation();
	});
	

	
	$(".search").click(function(e) {
	
		if ($(this).hasClass("hasOff")) {
			$(".search").removeClass("hasOff").addClass("hasOn");
			if ($(".mybl ").hasClass("mybl_on")) {
				$(".mybl").removeClass("mybl_on").addClass("mybl_off");

					$(".deng_box").hide();
				
			} 
			if ($(".wenhao").hasClass("hasOn")) {
				$(".dianhua_nav").slideUp(300,
				function() {

					$(".wenhao").removeClass("hasOn").addClass("hasOff");

					//$(".deng_box").fadeOut();

				});
				
			}
					if ($(".bag").hasClass("bagon")) {
				
				 $(".bag").removeClass("bagon").addClass("bagoff");
			$(".miao_bao1").hide();
				}
            $(".search_nav").slideDown();
		} else {

			$(this).removeClass("hasOn").addClass("hasOff");

			$(".search_nav").slideUp();

		}
     e.stopPropagation();
	});

	$(".deng_box3").click(function(e) {

		e.stopPropagation();
	})

	$(".box_contevt span").mouseenter(function() {
		$(this).stop().animate({
			backgroundPosition: "20px"
		},
		{
			duration: 500
		})
	});
	$(".box_contevt span").mouseleave(function() {
		$(this).stop().animate({
			backgroundPosition: "(10px)"
		},
		{
			duration: 400,
			complete: function() {
				$(this).css({
					backgroundPosition: "10px"
				})
			}
		})
	});

	$(".m_box_contevt span").mouseenter(function() {
		$(this).stop().animate({
			backgroundPosition: "20px"
		},
		{
			duration: 500
		})
	});
	$(".m_box_contevt span").mouseleave(function() {
		$(this).stop().animate({
			backgroundPosition: "(10px)"
		},
		{
			duration: 400,
			complete: function() {
				$(this).css({
					backgroundPosition: "10px"
				})
			}
		})
	})

	$(".deng_anniu").mouseenter(function() {

		$(".deng_sanjiao", $(this)).stop().animate({
			left: "15px"
		},
		300)
	});
	$(".deng_anniu").mouseleave(function() {
		$(".deng_sanjiao", $(this)).stop().animate({
			left: "10px"
		},
		300);
	});

	$(".deng_anniu2").mouseenter(function() {

		$(".deng_sanjiao", $(this)).stop().animate({
			left: "15px"
		},
		300)
	});
	$(".deng_anniu2").mouseleave(function() {
		$(".deng_sanjiao", $(this)).stop().animate({
			left: "10px"
		},
		300);
	});

	$(".pushServiceCallToAction").mouseenter(function() {
		$(this).stop().animate({
			backgroundPosition: "20px"
		},
		{
			duration: 200
		})
	});
	$(".pushServiceCallToAction").mouseleave(function() {
		$(this).stop().animate({
			backgroundPosition: "(10px)"
		},
		{
			duration: 200,
			complete: function() {
				$(this).css({
					backgroundPosition: "10px"
				})
			}
		})
	});
	$('.menu').click(function() {
          
		if ($(".searchimg").hasClass("hasOn")) {

			$(".searchimg").removeClass("hasOn").addClass("hasOff");
			$(".searchContain").slideUp(100,
			function() {
                if($(".shouji_nav").hasClass("menu_off")){
			
				$('div.menu_div').slideUp(200,
				function() {
					$("html, body").animate({
						scrollTop: 0
					},
					"slow");
						 $(".shouji_nav").addClass("menu_on").removeClass("menu_off");
				}).css("z-index", "11");
				productSx();
				 
				}else{
			
					$('div.menu_div').slideDown(200,
				function() {
					$("html, body").animate({
						scrollTop: 0
					},
					"slow");
						 $(".shouji_nav").addClass("menu_off").removeClass("menu_on");
				}).css("z-index", "11");
				productSxOp();
				}
				
          
			});
		} else {
		
		
		 if($(".shouji_nav").hasClass("menu_off")){
			
				$('div.menu_div').slideDown(200,
				function() {
					$("html, body").animate({
						scrollTop: 0
					},
					"slow");
					$(".shouji_nav").addClass("menu_on").removeClass("menu_off");
				}).css("z-index", "11");
				
				
				if($(".map_left").length>0){
				      if($(".map_dian").hasClass("map_mp")){
				   $(".map_left .map_dian").css({"position":"relative",top:0});
				   $(".map_yin").css({"position":"relative"});
				   if($(".map_dian").hasClass("map_on")){
				   $(".dian_upsan").removeClass("select");
		        	 $(".map_dian").removeClass("map_on").addClass("map_off");
		           $(".map_yin").stop().animate({height:0},200);
			 	    $(".map_right").show();
				     $(".map_left").height(0);
				   }
				   
				   }
				
				}
				
				  
			    if($(".shaixuan").length>0){
				  
			    if($(".shaixuan").hasClass("shaixuan_on")){
				
					$(".shaixuan").removeClass("shaixuan_on").addClass("shaixuan_off");
			       $(".shaixuan").slideUp(200);
				     $(".product_wrap,.product_gengduo").show();
					$(".pro_til_san").removeClass("select");
		         	$(".pro_til_in").html("显示筛选器");
					
				}
				
				}
					productSx();
				}else{
			
					$('div.menu_div').slideUp(200,
				function() {
					$("html, body").animate({
						scrollTop: 0
					},
					"slow");
				if($(".map_left").length>0){
				      if($(".map_dian").hasClass("map_mp")){
				   $(".map_left .map_dian").css({"position":"fixed",top:60});
				     $(".map_yin").css({"position":"fixed"});
				   }
				
				}
						$(".shouji_nav").addClass("menu_off").removeClass("menu_on");
				}).css("z-index", "11");
				productSxOp();
				}

	

		}

	});
	
	function productSx(){
	
	  if($(".page").find(".pro_til_in").length>0){
	   if(!IsPC()){
     

	 
	   $(".pro_til_in").addClass("mp");
	   $(".pro_titlew").removeClass("sticky");
	   
	
	   }
	   
	   }

	}
	
		function productSxOp(){
	
	  if($(".page").find(".pro_til_in").length>0){
	   if(!IsPC()){
	
	 
	   $(".pro_til_in").removeClass("mp");
	   $(".pro_titlew").addClass("sticky");
	   
	 
	   }
	   
	   }
	   
	   
	
	
	}
	function initPusth() {
		w = $(window).width();
		var hs = $(".push4").height();
		var ps2h = $(".push2 ").height();
		var marginP = parseInt($(".push3").css("marginBottom"));
		var hfsd = ps2h - hs - marginP - 2

		var hfsd = Math.abs(ps2h - hs - marginP - 2);

		$(".push3").height(hfsd);

	}

	//initVideo();
	function initVideo() {

		w = $(window).width();

		var r = 9 / 16;
		var videoW = w * 0.8;
		var videoH = videoW * r;

		if (IsPC()) {

			$(".video_contain").css({
				height: videoH,
				width: videoW,
				left: "50%",
				marginLeft: -videoW / 2,
				top: "50%",
				marginTop: -videoH / 2
			});
			$(".video_contain").css({
				height: videoH,
				width: videoW,
				left: "50%",
				marginLeft: -videoW / 2,
				top: "50%",
				marginTop: videoH / 2
			});
			$("#example_video_1").css({
				height: videoH,
				width: videoW,
				left: "50%",
				marginLeft: -videoW / 2,
				top: "50%",
				marginTop: -videoH / 2
			});
			$("#example_video_1").css({
				height: videoH,
				width: videoW
			});

		}

	}

/*	$(".line2 .push2").click(function() {
		$("html,body").css("overflow-y", "visible");
		if (IsPC()) {

			$(".vjs-big-play-button").trigger("click");
			$("#myVideo").remove();
			$(".videoPlay").show();
		} else {

			$("#example_video_1").remove();
			$(".videoPlay").show();
			var video = $("#myVideo").get(0);
			$("#myVideo").css({
				left: "50%",
				marginLeft: -$("#myVideo").width() / 2,
				top: "50%",
				marginTop: -$("#myVideo").height() / 2,
				position: "relative"
			});

			video.play();

			if (video.addEventListener) {
				video.addEventListener("pause", functions, false);

			} else if (video.attachEvent) {

				video.attachEvent('onpause' + eventType, functions);

			}

		}



	});*/
	
	
	if($(".lb_mp").length>0){
	
    if($(".video_img").length>0){
			 var videoImg=0;
			 var videoClickEvent="tap";
		 
		 $(".video_img_button").bind(""+videoClickEvent,function(e){
		 	var  wiw=$(window).width();
if(wiw<=1260){
wiws=$(window).width();

}else{

 wiws=1260;
}
if(wiw>960){

var blf=630;
}else{

var blf=wiws*585/635;

}

	
		        $(this).css("z-index",0);
				  
				  $(this).prev().find("#example_video_2").css("width",wiws);
				  $(this).prev().find("#example_video_2").css("height",blf);
				  
				  
				  $(this).prev().find("video").css("width",wiws);
				  $(this).prev().find("video").css("height",blf);
		
				 $("#example_video_2").addClass("video_plays");
			           var objsf=$(this).prev().find("#example_video_2").get(0);
			       $("#example_video_2").not($(this).prev().find("#example_video_2")).each(function(i){
					
					 $(this).get(0).pause();
					     
					 $(this).prev().find(".video_c").css("zIndex",1);
	 
	              
					 
				});
				     objsf.play();
	            
				$(this).prev().css("backgroundColor","#000");
				
				if($(".lb_mp").length>0){
				//$(this).hide();
					$(this).next().next().css("zIndex",3);
					
		    	}
		 });
			
            $(".video_img").bind(""+videoClickEvent,function(e){
		   
				  e.stopPropagation();
			  if($(this).parent().find(".video_c").length>0){
		
			var  wiw=$(window).width();
if(wiw<=1260){
wiws=$(window).width();

}else{

 wiws=1260;
}
if(wiw>960){

var blf=630;
}else{

var blf=wiws*585/635;

}

	
		         videoImg=$(".video_img").index(this);
				  $(this).next().next().next().css("z-index",0);
				  $(this).parent().find("#example_video_2").css("width",wiws);
				  $(this).parent().find("#example_video_2").css("height",blf);
				  
			
				  $(this).parent().find("video").css("width",wiws);
				  $(this).parent().find("video").css("height",blf);
		
				 $("#example_video_2").addClass("video_plays");
			           var objsf=$(this).parent().find("#example_video_2").get(0);
			       $("#example_video_2").not($(this).parent().find("#example_video_2")).each(function(i){
					
					 $(this).get(0).pause();
					     
					 $(this).parent().find(".video_c").css("zIndex",1);
	 
	                // $(this).parent().prev().prev().show();
					 
				});
				     objsf.play();
	
				$(this).parent().find(".video_c").css("backgroundColor","#000");
				
				if($(".lb_mp").length>0){
				//$(this).hide();
					$(this).next().next().css("zIndex",3);
					
		    	}
			

			  }
			
		
			});



  


}
   $("video").bind("play",function(e){
   //alert(1);
	  var vids=$("video").index(this);
	  //alert(1);
	  $("video").not($(this)).each(function(){

	    that=this;
	  $(that).get(0).pause();
	  
	  });
	  //alert($(this).parent().attr("class"));
	
	 $(this).parent().css("zIndex",3);
	  $(this).parent().next().css("zIndex",0);
	 $(this).parent().prev().prev().css("zIndex",1);

     //$(".video_img").css("zIndex",1);
	//$(this).parent().prev().prev().hide();
	 
	    
	
	});

    $("video").bind("pause",function(e){
     $(this).get(0).pause();
	  $(this).parent().find("#example_video_2").css("width",1);
	   $(this).parent().find("#example_video_2").css("height",1);
				  
			
				  $(this).parent().find("video").css("width",1);
				  $(this).parent().find("video").css("height",1);
	  var vids=$("video").index(this);
	  
	  	// $(this).parent().prev().prev().show();
		// $(".video_img").show();
	   $(".video_c").css("zIndex",1);
	    $(this).parent().prev().prev().css("zIndex",3);
		 $(this).parent().next().css("zIndex",3);
	 // alert($(this).parent().prev().prev().attr("class"));

	
	});
	


	
	}else{
		     if($(".video_img").length>0){
			 var videoImg=0;
			 var videoClickEvent="click";
			
		
			
            $(".video_img").bind(""+videoClickEvent,function(e){
		      
				  e.stopPropagation();
			  if($(this).parent().find(".video_c").length>0){
		
			var  wiw=$(window).width();
if(wiw<=1260){
wiws=$(window).width();

}else{

 wiws=1260;
}
if(wiw>960){

var blf=630;
}else{

var blf=wiws*585/635;

}

	
		         videoImg=$(".video_img").index(this);
				  
				  $(this).parent().find("#example_video_1").css("width",wiws);
				  $(this).parent().find("#example_video_1").css("height",blf);
				  
				  	
				  $(this).parent().find("video").css("width","100%");
				  $(this).parent().find("video").css("height","100%");
			 
				 $("#example_video_1").addClass("video_plays");
			    $(".vjs-big-play-button",$(this).next().next()).trigger("click");
				$(".vjs-playing").not($(this).next().next()).trigger("click");
					$(".vjs-playing").not($(this).next().next()).css("zIndex",1);
				//$(this).children().find("video_c").css("zIndex",3);
				$(this).parent().find(".video-js").css("backgroundColor","#000");
				$(this).parent().find(".video_c").css("backgroundColor","#000");
				
				if($(".lb_mp").length>0){
				$(this).css("opacity",0);
					$(".video_img").not($(this)).css("opacity",1);
					
			}else{
			$(this).next().next().css("zIndex",3);
			}
			

			  }
			
		
			});


      $(".video_img_button").bind(""+videoClickEvent,function(e){
		     
				  e.stopPropagation();
			
		
			var  wiw=$(window).width();
if(wiw<=1260){
wiws=$(window).width();

}else{

 wiws=1260;
}
if(wiw>960){

var blf=630;
}else{

var blf=wiws*585/635;

}

	
		         //videoImg=$(".video_img").index(this);
				   
				  $(this).prev().find("#example_video_1").css("width",wiws);
				  $(this).prev().find("#example_video_1").css("height",blf);
				  
				  	
		  $(this).parent().find("video").css("width","100%");
				  $(this).parent().find("video").css("height","100%");
		
				 $("#example_video_1").addClass("video_plays");
			    $(".vjs-big-play-button",$(this).prev()).trigger("click");
				$(".vjs-playing").not($(this).prev()).trigger("click");
					$(".vjs-playing").not($(this).prev()).css("zIndex",1);
				//$(this).children().find("video_c").css("zIndex",3);
				$(this).prev().find(".video-js").css("backgroundColor","#000");
				$(this).prev().find(".video_c").css("backgroundColor","#000");
				
				if($(".lb_mp").length>0){
				$(this).css("opacity",0);
					$(".video_img").not($(this).prev()).css("opacity",1);
					
			}else{
			$(this).prev().css("zIndex",3);
			}
			

			
			
		
			});

		

	   

 

	$(".video_c,.video_img").bind(""+videoClickEvent,function(e) {
e.stopPropagation();

});
	$(".video_img").bind(""+videoClickEvent,function(e) {
e.stopPropagation();

});







	$("#example_video_1_html5_api").bind(""+videoClickEvent,function(e) {
e.stopPropagation();

});
	$("#example_video_1").bind(""+videoClickEvent,function(e) {
e.stopPropagation();

});

}

}
  $(".shi_p").hide();
 
  var lbvb=0;
		     if($(".brand_video_bg").length>0){
 
  var bvb=0;
              $(".brand_video_bg_click").bind("click",function(e){
			   bvb=$(".brand_video_bg_click").index(this);
			   $(".video-js",$(this).prev()).css("background","#000");
			   $(".shi_p").eq(bvb).show();
			 // alert(bvb);
			   				var e=e || window.event;
	            $(".brand_video_bg").eq(bvb).css("zIndex",8888);
		        $(this).parent().find("video").css({width:"100%",height:"100%"});
				$(".vjs-playing").not($(".brand_video_bg").eq(bvb)).trigger("click");
				$(".brand_video_bg").not($(".brand_video_bg").eq(bvb)).css("zIndex","-1");
				$("video").not($(this).parent().find("video")).css({width:"1px",height:"1px"});
		       $(".vjs-big-play-button").eq(bvb).trigger("click");
                  e.stopPropagation();
		         lbvb=bvb;
			  
			  });
			
           $(".shi_p").click(function(e){
		   $(this).show();
		
		  var vidoeship=$(this).prev().find("video").get(0);
		  
		     vidoeship.pause();
		     $(this).prev().css("zIndex",-1);
		      e.stopPropagation();
		   })
	$("video").bind("pause",function(e){
	
	$(".shi_p").hide();

	});

	$("#example_video_1").click(function(e) {
e.stopPropagation();

});

}


    var media=$("#example_video_4 video").get(0);
	 if($(".brand_video_bg_br").length>0){
          
       		 $(".brand_video_img_button").bind("tap",function(e){
			 

			
				$(this).parent().prev().css("width",$(window).width());
			 $(this).parent().prev().css("height",$(window).height());
				 $(this).parent().prev().css({position:"relative",backgroundColor:"#000"}); 
				//  $(this).parent().prev().find("#example_video_3").css("a");
			$(this).parent().prev().find("video").css("height",$(window).height()/2);
		$(this).parent().prev().find("video").css("width",$(window).width());
	
			 $(this).parent().prev().find("video").css({marginTop:($(window).height()/2)/2});
			           var objsfd=$(this).parent().prev().find("#example_video_4").get(0);
			       $(".example_video_4").not($(this).prev().find(".example_video_4")).each(function(i){
					
					 $(".example_video_4").eq(i).get(0).pause();
					   
				  $(".example_video_4").eq(i).css("zIndex",-1);
	                
	              
					 
				});
				     objsfd.play();
	          $(this).parent().prev().css("backgroundColor","#000");
			  e.stopPropagation();
			   $(this).parent().prev().css("zIndex",999);
				//$(this).prev().css("backgroundColor","#000");
				
			
					
		 });
		 
		 
		 
	$("video").bind("pause",function(e){
	
	
     $(this).get(0).pause();
        // alert($(this).parent().find("#example_video_3").length);
	 $(this).parent().find("#example_video_4").css("width",1);
	  $(this).parent().find("#example_video_4").css("height",1);
				  
			
			 $(this).parent().prev().find("video").css("width",1);
			 $(this).parent().prev().find("video").css("height",1);
	  var vids=$("video").index(this);
	
	  $(this).parent().css("zIndex",-1);
	   $(this).parent().css("backgroundColor","");
	});


	 } 	    
  function  functions2(){

  $(".vid_bg").hide();
	
 }
 
 function pauseFunction(e){
 
     if( $(".brand_video_bg").length>0){
       $(".brand_video_bg").css("zIndex","-1");
	   }
 			    if(e.preventDefault) {
     e.preventDefault();
    e.stopPropagation();
    }else{
   e.returnValue = false;
    e.cancelBubble = true;
    }
 }

				function functions(e) {
				
				
		
				var e=e || window.event;
	       $(".content_img3_2",$(".content_img3_2")).hide();
	       $("img",$(".content_img3_2")).css({"visibility":"hidden",zIndex:1});
	       $(".pro_opacity",$(".content_img3_2")).hide();
            $(".content_img3_t",$(".content_img3_2")).hide();
		
			  $(".vid_bg").hide();
		       $(".vjs-big-play-button").trigger("click");
			    if(e.preventDefault) {
     e.preventDefault();
    e.stopPropagation();
    }else{
   e.returnValue = false;
    e.cancelBubble = true;
    }
			   

		}
		
		
						function brand_video(e) {
				
	   

		}
	/*$(".videoPlay").click(function() {
		if (IsPC()) {

			$(".videoPlay").hide();
			var videojs = $("#example_video_1_html5_api").get(0);
			videojs.pause();

		} else {
			$(".videoPlay").hide();
			var video = $("#myVideo").get(0);
			$("html,body").css("overflow-y", "visible");
			video.pause();
		}

		//$(".vjs-big-play-button").trigger("click");

	});*/
	var bw = 0;
	var bwi = 0;

	function imgLoading(obj) {

		w = $(window).width();

		if (w < 960) {

			var rhs = (533 * 0.4) * 533 / 533;
			bw = (w - w * 0.95) / 2;
			bwi = w * 0.95;
			$(".pro_push2 img").css({
				height: rhs,
				width: (533 * 0.4),
				left: "50%",
				marginLeft: -rhs / 2,
				position: "relative"
			});
			$(".qi_img img").css({
				height: rhs,
				width: (533 * 0.4),
				left: "50%",
				marginLeft: -rhs / 2,
				position: "relative"
			});
			$(".proimg").css({
				height: rhs
			});
		} else if (w >= 960) {

			var rhs = (w * 0.75 * 0.333) * 533 / 533;
			$(".pro_push2 img").removeAttr("maxHeight");
			$(".pro_push2 img").css({
				height: "100%",
				width: "100%",
				left: "0",
				marginLeft: 0
			});

			$(".qi_img img").css({
				height: "100%",
				width: "100%",
				left: "0",
				marginLeft: 0
			});

			$(".proimg").css({
				height: "auto"
			});
		}
	}

	//imgHising();
	function imgHising(obj) {

		w = $(window).width();

		if (w >= 960) {

	
		}

	}

	function tutule(method, content) {

		clearTimeout(method.animate_id);

		method.animate_id = setTimeout(function() {

			method.call(content);

		},
		100)

	}

	imgLoading();
	initPusth();
	$(window).resize(function() {
		fh = $(".footer").height();
	
		fhh = $(".fanhui").height();
		// imgLoading();
		//initPusth();
		//getTcWidth();
		//loginH();
		//initVideo();
		//lomt();
		//imgHising();
		tutule(footer);
		tutule(f_maps);
		//tutule(loginPage);
		tutule(productDetail);
		
			 if($(window).width()>950){
	 // $(".fan_top").show();
	    $(".shou_head").hide();
	  	$(".shouji_nav").addClass("menu_off").removeClass("menu_on");
		
					if($(".map_left").length>0){
				    
				   $(".map_left .map_dian").css({position:"static",top:60});
				  $(".map_yin").css({"position":"relative"});
					   $(".map_right").show();
				     $(".map_left").height(0);
					 	  $(".foot").show();
						  	    $(".dian_upsan").removeClass("select");
		  	  $(".map_dian").removeClass("map_on").addClass("map_off");
				   }
	 }else{
	 
	  $(".fan_top").hide();
	 }
	
	});
	
	

	
	productDetail();
	function  productDetail(){
	
	 if($(window).width()<960){
	  
	  var zhos=$(window).width()-40;
	  
	var zhow=$(".prode_img ").height();
	
	
	}else{
	
	var zhos=$(window).width()*0.6*0.6;
	
	}
	
	$(".mousetrap").css({width:zhos,height:zhow});
	
	}

	//getTcWidth();
	//loginH();
	f_maps();
	function f_maps() {
		w = parseInt($(window).width());
		hf = $(window).height();
		var mhs = hf - 100;

		if (w <= 900) {

			var mpsh = hf - 60 - 40 - 86 - 56;

			$(".dian_cha3,.searchContain").height(mpsh);
			//$(".scrollbar,.track").height(mpsh);

			$(".map_yin").css("width", "100%");
			$(".map_right").css("height", mhs);

		} else {
			$(".map_right").css("height", 500);

			$(".dian_cha3,.searchContain").height(390);
			$(".scrollbar").height(390);
			$(".track").height(390);
			$(".dian_cha3").height(390);

			$(".map_left").css("height", "auto");
			$(".map_yin").css("height", 0);

		}

	}
	function loginH() {

		if (parseInt($(window).width()) > 960) {

			$(".menu_div").hide();
			var cheight = parseInt($(window).height()) - parseInt($(".foot").height()) - parseInt($(".header").height());

			$(".loginContent ").height(cheight);

		} else {

			$(".loginContent ").height("auto");

		}

	}



	function getTcWidth() {
		w = $(window).width();
		var tcwidth = w * 0.6;
		var atcwidth = w * 0.6 + parseInt($(".zezao_txt").css("paddingLeft")) * 2;
		$(".zezao_txt").css({
			width: tcwidth,
			left: "50%",
			marginLeft: -atcwidth / 2
		});

	}
	footer();
	function footer() {

		w = $(window).width();

		if (w <= 960) {
			$(".map_dian").removeClass("map_pc").addClass("map_mp");
			$(".foot").removeClass("footer_pc").addClass("mb_footer_up");

		} else {
			$(".map_dian").removeClass("map_mp").addClass("map_pc");
			$(".foot").removeClass("mb_footer_up").addClass("footer_pc");

		}

	}

	$(".fanhui,.footer_up").click(function() {

		$("html, body").animate({
			scrollTop: 0
		},
		"slow")

	});

	$(".mybl").click(function(e) {

		if ($(this).hasClass("mybl_off")) {
			$(this).removeClass("mybl_off").addClass("mybl_on");
			if ($(".search ").hasClass("hasOn")) {
				$(".search").removeClass("hasOn").addClass("hasOff");
				$(".search_nav").slideUp(300,
				function() {

					

				});
			}
			
		if ($(".wenhao").hasClass("hasOn")) {
				$(".dianhua_nav").slideUp(300,
				function() {

					$(".wenhao").removeClass("hasOn").addClass("hasOff");

					//$(".deng_box").fadeOut();

				});
			
			}
				if ($(".bag").hasClass("bagon")) {
				
				 $(".bag").removeClass("bagon").addClass("bagoff");
			$(".miao_bao1").hide();
				}
$(".deng_box").show();			
		} else {
			$(this).removeClass("mybl_on").addClass("mybl_off");
			$(".deng_box").hide();
		}

		e.stopPropagation();
	});

	$(".deng_close").click(function(e) {

		$(".deng_box").hide();
		$(".mybl").removeClass("mybl_on").addClass("mybl_off");
		e.stopPropagation();

	});

	$(".mybolon ").click(function() {
		$(".shou_dengbox ").slideToggle(300);
		scroolTop = $(".mybolon ").offset().top - 50;

		$("html, body").animate({
			scrollTop: scroolTop
		},
		"slow");

	});
	
	$(".shou_dengbox").click(function(e){
	
	 e.stopPropagation();
	});

	$(".juxing").click(function(e) {
		if ($(this).hasClass("loginOn")) {

			$(".header_nav2").slideUp(300);
			$(this).removeClass("loginOn").addClass("loginOff");
			$(".deng_box").fadeOut();
		} else {
			if ($(".searchimg").hasClass("hasOn")) {

				$(".searchimg").removeClass("hasOn").addClass("hasOff");
				$(".searchContain").slideUp(300,
				function() {

					$(".header_nav2").slideDown(300);
					$(".juxing").removeClass("loginOff").addClass("loginOn");

				});

			} else {

				$(".header_nav2").slideDown(300);
				$(".juxing").removeClass("loginOff").addClass("loginOn");

			}

		}

		e.stopPropagation();
	});

	$(".mybl").click(function(e) {

		e.stopPropagation();

	});
	$(".wishlist").click(function(e) {

		e.stopPropagation();

	});
	
	
	
	$("#searchForm .search_box1").focus(function() {

   if ($(this).val() == '产品') {

            $(this).val("");

        }


});


$("#searchForm .search_box1").blur(function() {

   if ($(this).val() == '产品' ||  $(this).val().Trim() == "") {

            $(this).val("产品");

      }


});

$(".search_box2").click(function(){
   if ($(".search_box1").val() == '产品' ||  $(".search_box1").val().Trim() == "") {

          $(".search_box1").val("产品");

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


	$(".mb_foot").find(".triangle").addClass("seke");
	$(".foot .mb_foot").click(function() {
		if ($(".foot").hasClass("mb_footer_up")) {

			var ftindex = $(".mb_foot").index(this);

			var ftlen = $(".f_nav").eq(ftindex).find("a").length;

			var moveH = 20 + ftlen * 30;
			// $(".mb_foot").eq(ftindex).find(".triangle").removeClass("seke");
			var triangle = $(".mb_foot").eq(ftindex).find(".triangle");
			$(".f_nav").not($(".f_nav").eq(ftindex)).animate({
				height: "0"
			},
			500);
			$(".mb_foot").not($(".mb_foot").eq(ftindex)).find(".triangle").addClass("seke");
			if (triangle.hasClass("seke")) {
				$(".f_nav").eq(ftindex).stop().animate({
					height: moveH
				},
				500);
				triangle.removeClass("seke");
			} else {
				triangle.addClass("seke");
				$(".f_nav").eq(ftindex).stop().animate({
					height: 0
				},
				500);
			}

		}

	});

	//lomt();
	function lomt() {
		$(".index2_box1  .mt30").each(function() {

			var omj = $(this).find("img");
			$(this).find(".index2_opacity").css("opacity", 0.7).addClass("loading");
			LoadImg(omj, $(this));

		});

	}

	function LoadImg(imgObj, mt) {

		var browser = new Object();
		var obj = new Object();
		obj = imgObj;
		browser.useragent = window.navigator.userAgent.toLowerCase();
		browser.ie = /msie/.test(browser.useragent);
		browser.moz = /gecko/.test(browser.useragent);
		var imgsrc = obj.attr("src");
		var image = new Image;
		image.src = imgsrc;
		if (browser.ie) {
			if (image.height === 0) {
				image.onload = function() {

					ShowCaseDetailImage(obj, mt);
				}

			} else {

				ShowCaseDetailImage(obj, mt);

			}
		} else {
			image.onload = function() {
				if (image.complete == true) {

					ShowCaseDetailImage(obj, mt);
				}
			}

		}

		image.onerror = function() {
			obj.parent().removeClass("img_loading").addClass("img_loading_error");
		}

	}

	function ShowCaseDetailImage(obj, mt) {

		var h = $(obj).height();
		w = $(window).width();

		if ($(mt).hasClass("mtp30")) {
			w = w / 2;
			var hs = w * h / $(obj).width();

		} else {

			var hs = w * h / $(obj).width();

		}

		if ($(obj).width() < w) {
			hs = $(obj).height();

		}

		mt.height(hs);
		$(mt).find(".index2_opacity").css("opacity", 0).removeClass("loading");
		obj.css("visibility", "visible");

	}

	$(window).scroll(function() {
	 var scrollTop=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		//var scrollTop = $(this).scrollTop();
		var scrollHeight = getScrollHeight();

		var windowHeight = $(this).height();
      if(IsPC()){
		if(scrollTop>windowHeight/2){
		 
		  $(".fan_top").fadeIn();
		
		}else{
			  $(".fan_top").fadeOut();
		}
		
		}

	});

	/*lvfei 1.20 */

	var fnavl = new Array();
	$(".f_nav").each(function(i) {

		fnavl[i] = $(this).find("a").length;

	});

	var maxLen = Math.max.apply(null, fnavl.join(",").split(","));

	$(".foot ").mouseenter(function() {

		if ($(this).hasClass("footer_pc")) {
			if (maxLen > 0) {
				var fheigh = maxLen * 30 + 30;
				$("html, body").animate({
					scrollTop: $(window).scrollTop() + fheigh
				},
				500);
				$(".footer_3").stop().animate({
					height: [fheigh, "easeInOutQuart"]
				},
				500);

			}

		}

	});

	$(".foot ").mouseleave(function() {
		if ($(this).hasClass("footer_pc")) {
			if (maxLen > 0) {
				$(".footer_3").stop().animate({
					height: [0, "easeInOutQuart"]
				},
				500);
			}

		}

	});

	$(".footer_2 .footer_3_1,.footer_up").mouseenter(function(e) {

		e.stopPropagation();

	});

	$(".footer_2 .footer_3_1").mouseleave(function(e) {

		e.stopPropagation();

	});

	/*登录公共部份*/


	function keyUp(e) {　　　
		var currKey = 0,
		e = e || event;　　　currKey = e.keyCode || e.which || e.charCode;　　　
		if (currKey === 13) {

			submitLogin();

		}
	};
	　document.onkeyup = keyUp;

})

function getScrollHeight() {　　
	var scrollHeight = 0,
	bodyScrollHeight = 0,
	documentScrollHeight = 0;　　
	if (document.body) {　　　　bodyScrollHeight = document.body.scrollHeight;　　
	}　　
	if (document.documentElement) {　　　　documentScrollHeight = document.documentElement.scrollHeight;　　
	}　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight: documentScrollHeight;　　
	return scrollHeight;
}

function IsPC() {
	var userAgentInfo = navigator.userAgent;

	var Agents = new Array("Android","Touch", "iPhone","BlackBerry OS","mqqbrowser","opera mobi","juc","iuc","fennec","applewebKit/420","applewebkit/525","applewebkit/532","iemobile","windows ce","240x320","480x640","acer","asus","audio","blazer","coolpad","dopod","etouch","hitachi","htc","huawei","jbrowser","lenovo","lg","lg-","lge-","lge", "mobi","moto","nokia","phone","samsung","sony","symbian","tablet","tianyu","wap","xda","xde","zte","SymbianOS", "Windows Phone", "iPad", "iPod");
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}


String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}