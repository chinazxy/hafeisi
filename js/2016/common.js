


  function showLoadding(){
  var w=$(window).width();
       if($(".glun").length>0){
     if(w>960){
	var height =(w*630)/1920;
	}else{
	var height =(w*600)/960; 
	}

	$(".glun .loadding,.glunfixed,.glunabsoult").height(height);
	
	}
  
     if($(".gz_contain").length>0){
     	 
      if(w<1180){
	 var hsz=w*640/960;
	 if($(".gz_contain .bg_height").length>0){
		 
		  var imgff=$(".w_cover").outerHeight()+(parseInt($(".w_cover").css("marginTop"))+parseInt($(".w_cover").css("marginBottom")));
		  	  $(".w_por").height(hsz+imgff);
	  $(".w_potu").height(hsz);
		   $(".bg_img").height(hsz);
		   	 $(".bg_img").closest(".gz_contain").height(hsz+imgff);
	 }else{
 if($(".gz_contain .newsbg").length>0){
			 
		
						  var hsz=$(window).width()*330/960;
						$(".bg_img,.loadding").height(hsz);
		   	 $(".bg_img").closest(".gz_contain").height(hsz+imgff);
		
		 }else{
			 
			 
		
	 $(".bg_img").height(hsz);
         $(".bg_img .loadding").height(hsz);
	 $(".bg_img").closest(".gz_contain").height(hsz);
	 	  if($(".gz_contain .bg_height").length>0){
		  
		  		    $(".w_por").css("height","auto");
	  $(".w_potu").css("height","auto");
		  }
      }
	   }
     }else{

	  if($(".gz_contain .bg_height").length>0){
	  	  var bgh=$(window).height()-$(".gh").height()-$(".gh1").height();
	  var imghs=bgh-$(".w_cover").outerHeight()-(parseInt($(".w_cover").css("marginTop"))+parseInt($(".w_cover").css("marginBottom")));
	  $(".w_por").height(bgh);
	  $(".w_potu").height(imghs);
	  $(".bg_img").height(imghs);
       $(".gz_contain .loadding").height(imghs);
		 $(".bg_img").closest(".gz_contain").height(bgh);
	  }else{
      $(".bg_img").height(300);
       $(".bg_img .loadding").height(300);
      $(".bg_img").closest(".gz_contain").height(300);
	  }
     }
     
     }else{
     
     if(w<980){
          var hsz=w*600/960;
	  
	 // var hsz2=$(window).width()*440/960
          $(".bg_img").height(hsz);
	  $(".bg_img .loadding").height(hsz);
	//  $(".limgs").height(hsz2);
   	  
	}else{
	    $(".bg_img").height(hsz);
	    $(".bg_img .loadding").height(440);
		// $(".limgs").height("auto");    
        }
     
     
     }
  
  }
  
     function getWordLen(str){
			  var liukval=str;
			  var len=0;
			  for(var i=0;i<liukval.length;i++){
				  var c=liukval.charCodeAt(i);
				  if((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)){
					  
					       len++;
				  }else{
						  len+=2;  
				  }
				 
			 }
			  return len;
		 }
$(function(){


$(".sb_inu").css({fontFamily:"SimHei",color:"#fff",fontSize:14});
var _y=0;
var _oy=0;
var _oys=0;
var shjh=40;
$('body').on('touchend',function(e) {
	var _touch = e.originalEvent.targetTouches[0]; 
	
	 _oy=$(document).scrollTop();
 
	 if(_oy>20){
		 
		 $(".shj").hide();
	 }else{
		 
		 $(".shj").show();
	 }
    
});

	var mbnavw=$(window).width();
$(".mbs_d").bind("click",function(e){
	
 
 

		$(this).removeClass("mbmenu_off").addClass("mbmenu_on");
		$(".m_wxdh").show();
		$(".m_wbj").fadeIn(300);
		  $(".glunfixed").css("position","relative");
				$(".gh").animate({left:mbnavw},500);
			$(".dapa ").animate({left:mbnavw},500);
		$(".m_xdh").show().stop().animate({left:0},500);


	e.stopPropagation();
	
});


$(".mbs_d img").bind("click",function(e){
	
 
 
    $(this).parent().removeClass("mbmenu_off").addClass("mbmenu_on");
		$(".m_wxdh").show();
		$(".m_wbj").fadeIn(300);
		  $(".glunfixed").css("position","relative");
			 $(".gh ").animate({left:mbnavw},500);
			$(".dapa ").animate({left:mbnavw},500);
		$(".m_xdh").show().stop().animate({left:0},500);
	e.stopPropagation();
	
});

$(".sb_ca").bind("click",function(e){
	
		$(".mbs_d").removeClass("mbmenu_on").addClass("mbmenu_off");
		$(".m_wbj").fadeOut(300);
	
		 $(".gh ").animate({left:0},500);
			$(".dapa ").animate({left:0},500);
		$(".m_xdh").show().stop().animate({left:-mbnavw},500,function(){
			$(".m_wxdh").hide();	
					  $(".glunfixed").css("position","fixed");
		});
		e.stopPropagation();
});

 if(!IsPC()){
	 
 $(".miao_bao1").css("width",$(window).width());
 }



		   
		$(".g_liuk").keyup(function(){
			 var chlen=getWordLen($(this).val());
			  var lefs=0;
			  var strs='';
			  if(chlen>140){
				 $(".charnums").html(0); 
				 chlen=140;
			  }else{
				  
				  $(".charnums").html(140-chlen); 
			  }
			  
			  for(var i=0;lefs<chlen;i++){
				  var c=$(this).val().charCodeAt(i);
				  if((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)){
					 
					       lefs++;
				  }else{
						  lefs+=2;  
				  }
				  
				  
				  strs+=$(this).val().charAt(i);
			    }
			  
			// console.log(lefs);
			  $(this).val(strs);
			
			
		});
	

	function showLoTip(obj,msg){
  
   $(".lo_miao_yin_t").html(""+msg);
   $(".lo_miao_yin").css({top:obj.offset().top-obj.outerHeight()-20,left:obj.offset().left+obj.width()/2}).fadeIn();
 
}

function hideLoTip(obj){

   $(".lo_miao_yin_t").html("");
   $(".lo_miao_yin").css({top:0,left:0}).hide();
$(".miao_login").hide();
}
String.prototype.Trim = function() {

   return this.replace(/(^\s*)|(\s*$)/g, "");

}

var fontws=30;
 $(".signIn .sing").click(function(){
	  $(".lo_miao_yin").hide();
		     $(".glunfixed").css("position","relative");
		     $(".pageWidth").stop().animate({height:[374,"easeInOutSine"]},500);
		     $(".gh").stop().animate({top:[374,"easeInOutSine"]},500);
		     $(".gh1").stop().animate({top:[434,"easeInOutSine"]},500);
			 $(".gh1").stop().animate({top:[434,"easeInOutSine"]},500);
		     $(".daze").css("zIndex",101);
	         $(".daze").show().stop().animate({opacity:0.85},800);
			 if($(".glun").length>0){
			 $(".glun").stop().animate({marginTop:[434,"easeInOutSine"]},500);
			 $(".glun").css("position","none");
		
			 }else{
			  $(".dapa").stop().animate({top:[374,"easeInOutSine"]},500);
			  
			 }
			 
			 if($(".gz_img").length>0){
			 $(".gz_img").css("position","relative");
			 }
			 
			 	  $(".logincontent").fadeIn(500);
				  $(".loginforget").fadeOut(500);
		 
			
	 
	  });
	  
	  $(".closeIcon").click(function(){
		    $(".lo_miao_yin").hide();
		    $(".pageWidth").stop().animate({height:0},500,function(){
			
				 if($(".gz_img").length>0){
			 $(".gz_img").css("position","fixed");
			 }
			
			});
		    $(".gh").stop().animate({top:0},500);
		  	$(".glunfixed").css("position","fixed");
		    $(".gh1").stop().animate({top:60},500);
		  $(".daze").stop().animate({opacity:0},800,function(){
		   $(".daze").hide();
		  
		  });
		    $(".daze").css("zIndex",1);
			 if($(".glun").length>0){
		    $(".glun").stop().animate({marginTop:60},500);
	  	    $(".glun").css("position","relative");
		 
			}else{
			  $(".dapa").stop().animate({top:0},500);
			}
			
			
	
	  });

	  
  $(".gfoot_wmb1").each(function(){
	  $(".foot_tmb",$(this)).width(($(".foot_fontmb",$(this)).outerWidth()+fontws));
	  $(this).closest(".gfoot_wmb1").width(($(".foot_fontmb",$(this)).outerWidth()+fontws));
	  });
	  	  var footarray=new Array();
	  $(".foot_div").each(function(){
	  footarray.push($(this).outerHeight());
	   
	  })
     $(".gfootmb").addClass("foot-close")
	  var maxHeights=Math.max.apply(null,footarray);
      var footime=800;
	  var delaytime=800;
	  var uptime=500;
	  var amimatecatch="swing";
	     $(".jtck").click(function(){
		     
	          if($(".gfootmb").hasClass("foot-open")){
			   return false;
			  }
	           $(".jtck").hide();
			   $(".colsed").show();
			     var avgs=74/4;
			     $(".gfoot_wmb1").each(function(i){
				   if(i==4){
				    $(this).stop().animate({width:["26%",amimatecatch]},footime);
					 
				   }else{
				    $(this).stop().animate({width:[avgs+"%",amimatecatch]},footime);
				   }
				 });
	         
			 $(".gfoot_wmb").stop().delay(delaytime).animate({paddingTop:40},uptime);
		     $(".foot_tmb").stop().delay(delaytime).animate({paddingBottom:40},uptime);
			 $(".colsed").stop().delay(delaytime).animate({paddingTop:20},uptime);
			 
			 $(".gfoot_wmb .foot_contain").stop().delay(delaytime).animate({height:maxHeights},uptime,function(){
			 
			  $(".gfootmb").removeClass("foot-close").addClass("foot-open");
			 });
			 $('html,body').delay(delaytime).animate({scrollTop: $(document).scrollTop()+maxHeights+95}, uptime);
	
		
		 
		
	  
	  });

	  $(".searchpcbtn").click(function(){
    
	  if($(".searchpc .search").val()==lang_search){
	  
	      return false;
	  
	  }else{
	  
	   $(".searchpc").submit();
	  }
	  
	  

});


	  $(".searchmbbbtn").click(function(){
    
	  if($(".sb_inu").val()==lang_search){
	  
	      return false;
	  
	  }else{
	  
	   $(".searchmbbb").submit();
	  }
	  
	  

});


 $(".fandaj").click(function(){
    
 
	   $(".mbsearch").submit();
 
 

});

 $(".searchmbbtn").click(function(){
    
	  if($(".searchmb .search").val()==lang_search){
	  
	      return false;
	  
	  }else{
	  
	   $(".searchmb").submit();
	  }
	  
	  

});

	   $(".colsed").click(function(){
	        
	          if($(".gfootmb").hasClass("foot-close")){
			   return false;
			  }
	           $(".jtck").show();
			   $(".colsed").hide();
	           var pctime=500;
	    	  $(".gfoot_wmb1").each(function(){
			      var tharts=$(this);
				  var avf=($(".foot_fontmb",tharts).outerWidth()+fontws)/pctime;
				   $(".foot_tmb").stop().animate({paddingBottom:0},pctime);
			       $(this).closest(".gfoot_wmb1").animate({width:[$(".foot_fontmb",tharts).outerWidth()+fontws,"easeInQuad"]},pctime-pctime*avf);
				    $(".foot_contain",$(this)).stop().animate({height:[0,"easeInQuad"]},pctime-pctime*avf,function(){
					
						  $(".gfootmb").removeClass("foot-open").addClass("foot-close");
					});
	           });
			     $(".colsed").stop().delay(pctime).animate({paddingTop:0},pctime);
			   	 $(".gfoot_wmb").stop().animate({paddingTop:20},pctime);
	
			   // $(".gfoot_wmb").stop().animate({paddingTop:20,paddingBottom:20},pctime);
			  
					// $('html,body').animate({scrollTop: $(document).scrollTop()-maxHeights-95}, 800);
	
	  
	   });
	   
	   
	   $(".rembercheck").click(function(e){
		  
		   if($("input",$(this)).val()==0){
			   $("input",$(this)).val(1);
			   $("span",$(this)).addClass("select");
		   }else{
			      $("input",$(this)).val(0);
			   $("span",$(this)).removeClass("select");
			   
		   }
		   e.stopPropagation();
		   e.preventDefault();
		   
	   });
	  
     	   $(".agreen").click(function(e){
		  
		   if($("input",$(this)).val()==0){
			   $("input",$(this)).val(1);
			   $("span",$(this)).addClass("select");
		   }else{
			      $("input",$(this)).val(0);
			   $("span",$(this)).removeClass("select");
			   
		   }
		   e.stopPropagation();
		   e.preventDefault();
		   
	   });


  $(".search").focus(function(){
   $(this).addClass("active");
  var searchval=$(this).val();
  if(searchval.Trim()==lang_search){
   $(this).val("");
  }
  });
  
    $(".search").blur(function(){
    $(this).removeClass("active");
  var searchval=$(this).val();
  if(searchval.Trim()==lang_search || searchval.Trim()==""){
   $(this).val(lang_search);
  }
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

backtop();
function backtop(){
	
	var bh=$(".foot_gai").outerHeight();
	
	
	$(".cbbfixed").css("bottom",bh+10);
	
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
					rember:$("input",$(".rembercheck")).val(),
					token:token,
					timestamp:timestamp,
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
						     	   case 6:
						   $(".login_com").html("<span class='ti_error'>验证失败，请重试!</span>").show();
                          
							
                           break; 
						   
						   

						      case 7:
						  	  $(".login_com").html("<span class='ti_error'>验证失败!</span>").show();
                           break; 
                        default:
						  $(".login_com").html("<span class='ti_error'>系统错误，刷新后重试!</span>").show();
				
					
    
			  
                    }
                  
		
                }
            });

});


$(".dcforget").click(function(){
	
		  $(".lo_miao_yin").hide();
		     $(".glunfixed").css("position","relative");
		     $(".pageWidth").stop().animate({height:[374,"easeInOutSine"]},500);
		     $(".gh").stop().animate({top:[374,"easeInOutSine"]},500);
		     $(".gh1").stop().animate({top:[434,"easeInOutSine"]},500);
			 $(".gh1").stop().animate({top:[434,"easeInOutSine"]},500);
		     $(".daze").css("zIndex",101);
	         $(".daze").show().stop().animate({opacity:0.85},800);
			 if($(".glun").length>0){
			 $(".glun").stop().animate({marginTop:[434,"easeInOutSine"]},500);
			 $(".glun").css("position","none");
		
			 }else{
			  $(".dapa").stop().animate({top:[374,"easeInOutSine"]},500);
			  
			 }
			 
			 if($(".gz_img").length>0){
			 $(".gz_img").css("position","relative");
			 }
	
	
	  $(".logincontent").hide();
				  $(".loginforget").fadeIn(500);
			$(".lo_miao_yin").hide();
	 
});


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
					rember:$("input",$(".rembercheck")).val(),
					token:token,
					timestamp:timestamp,
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
						      	   case 6:
						   $(".login_mp_ti").empty().html("<span class='ti_error'>验证失败，请重试!</span>").show();
                          
							
                           break; 
						   
                        default:
						    $(".login_mp_ti").empty().html("<span class='ti_error'>系统错误，刷新后重试!</span>").show();
						
				
					
    
			  
                    }
                  
		
                }
            });
});

  
  	$(".mybl").click(function(e) {

		e.stopPropagation();

	});
	
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

 function hasSVG(){

   if(/msie/.test(navigator.userAgent.toLowerCase()) || !!window.ActiveXObject || "ActiveXObject" in window){
	  return false;
	}else{
    SVG_NS = 'http://www.w3.org/2000/svg';

    return !!document.createElementNS && !!document.createElementNS(SVG_NS, 'svg').createSVGRect;
   
    }
	}

	
if (!hasSVG()) {
   $(".svg_class").each(function(){
   
      $(this).attr("src",$(this).attr("date-src"));
	  var svgscc=$(this).attr("date-style");
	  $(this).attr("style"," ");
	  $(this).attr("style",svgscc);
   });
   

}
       $(".forgetPass").click(function(){
	     
		 
		    $(".logincontent").fadeOut(500,function(){
			
			  $(".loginforget").fadeIn(500);
			});
			
			$(".lo_miao_yin").hide();
	   
	   
	   });
	   
	          $(".btnCancels").click(function(){
	     
		 
		    $(".loginforget").fadeOut(500,function(){
			
			  $(".logincontent").fadeIn(500);
			})
	   
	   
	   });

		$('.s_s img').click(function(){
		   
		     if($('.s_s').hasClass("s_off")){
			  
			     $('.s_nav').stop().animate({height:50},300,function(){
				 $('.s_s').removeClass("s_off").addClass("s_on");
				 });
			 }else{
			      $('.s_nav').stop().animate({height:0},300,function(){
				 $('.s_s').removeClass("s_on").addClass("s_off");
				 });
			 
			 }
			 
			 
		
		});
		
		
		var fgemial='';
	function validateEmail(){
	fgemial=$(".fg_email").val().Trim();
	if($(".fg_email").val().Trim()==="" || $(".fg_email").val().Trim()==="邮箱地址"){
	   $(".fg_email").val("邮箱地址");
	   $(".field-validation-valid").html("请输入邮箱地址!");
		return false;
	}else{
	
		var _reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if (_reg.test($(".fg_email").val().Trim())) {
			   $(".field-validation-valid").html("");
				  return true;
			}else{
			 $(".field-validation-valid").html("邮件地址输入格式不正确!");
			  return false;
			}
	
	}
	
	
	}
	
	
	$(".fg_email").bind("focus keyup",function(){
 if($(this).val().Trim()=="邮箱地址" || $(this).val().Trim()==""){
 
   $(this).val(" ");
   	   $(".field-validation-valid").html("请输入邮箱地址!");
 }
});
	
	
	
	$(".fg_email").blur(function(){
	
	
	  
	    
	  validateEmail();

	
	});
	

	
	 $(".forget_submit").click(function(){
	 

	 
	    submitGetPass();
	 
	 });
	 
	 var fgload=true;
	 function submitGetPass(){
		if(!validateEmail()){
		
		   return false;
		
		}
		
		 if(fgload){
   
   
   	       $.ajax({
                type: 'POST',
                url: 'user.php',
				
                data:{
					email:fgemial,
				     token:token,
					timestamp:timestamp,
					act:"send_pwd_email"
					
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				    fgload=false;
					$(".forget_state").empty().show().html("正在提交...");
                },
                success: function(data){
			     $(".forget_state").empty().hide();
			       switch(data.err){
				   
				
			
					   case 1:
					    $(".field-validation-valid").html("");
					   	 	  $(".forget_state").empty().show().html("邮件发送成功!");
						    fgload=false;
						  setTimeout(function(){
						    $(".forget_state").empty().hide();
						    fgload=true;
						  },2000)
					  
					   fgload=true;
					 break;
					 
					 
					   case 2:
					  $(".forget_state").empty().show().html("<span class='ti_error'>邮件发送失败!</span>");
					   fgload=true;
					 break;
					   case 3:
					   	 $(".field-validation-valid").html("该邮件地址输入格式不正确!");
					   fgload=true;
					 break;
					    case 4:
								   	 $(".field-validation-valid").html("邮件不能为空!");
							
					   fgload=true;
					 break;
					     case 5:
						 		   	 $(".field-validation-valid").html("邮件地址输入格式不正确!");
		
					   fgload=true;
					 break;
					 	  
						    case 6:
						 $(".field-validation-valid").html("验证失败!");
		
					   fgload=true;
					 break;
						 default:
						$(".forget_state").empty().show().html("<span class='ti_error'>系统错误,请刷新后重试!</span>");
						 
				   
				   
				   
				   }
                  
		
                }
            });
   
   
   }
		
		
		//document.getPassword.submit();
	 
	 }
		
		$(window).scroll(function() {
	
	    
	    	if (document.documentElement && document.documentElement.scrollTop){
       var scrollTop = document.documentElement.scrollTop;
	  }else if (document.body){
       var scrollTop = document.body.scrollTop;
	  }
	 //   console.log(scrollTop);
	 
	  if(scrollTop==0){
			//  $(".gh1").fadeIn();
	    $(".gh1").stop().animate({height:35,opacity:1},100);
		if($(window).width()<970){
			  $(".glun,.gz_contain,.w_gw,.move_div").stop().animate({"marginTop":60},100);
		}else{
			
			  $(".glun,.gz_contain,.w_gw,.move_div").stop().animate({"marginTop":60},100);
		}
	 
	   
	   //  $(".glun").css("marginTop",95);
	  //  $(".glun").removeAttr("transform");
	  }else{
		  	//  $(".gh1").fadeOut();
			//  $(".glun").css("marginTop",60);
		    $(".gh1").stop().animate({height:0,opacity:0},100);
		     $(".glun,.gz_contain,.w_gw,.move_div").stop().animate({"marginTop":60},100);
		 	  // $(".gh1").fadeOut();
		  
	  }
		var scrollHeight = getScrollHeight();

		var windowHeight = $(this).height();
 
		if(scrollTop>windowHeight/2){
		 
		  $(".cbbfixed").fadeIn();
		
		}else{
			  $(".cbbfixed").fadeOut();
		}
		
	

	});
	$(".fan_top img").click(function(){
	
$('html,body').animate({scrollTop: '0px'}, 800)

});

	function getScrollHeight() {
	var scrollHeight = 0,
	bodyScrollHeight = 0,
	documentScrollHeight = 0;
	if (document.body) {
	bodyScrollHeight = document.body.scrollHeight;
	}
	if (document.documentElement) {
	documentScrollHeight = document.documentElement.scrollHeight;
	}
	scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight: documentScrollHeight;
	return scrollHeight;
}

	function LoadImg(imgObj,pobj) {

    var browser = new Object();
    var obj = new Object();
    obj = imgObj;
	pobj=pobj;
    browser.useragent = window.navigator.userAgent.toLowerCase();
    browser.ie = /msie/.test(browser.useragent);
    browser.moz = /gecko/.test(browser.useragent);
    var imgsrc = obj.attr("data-src");
 
 
    var image = new Image;
    image.src = imgsrc;
    if (browser.ie) {
        if (image.height === 0) {
            image.onload = function() {
                obj.attr("src",imgsrc) ;
                ShowCaseDetailImage(obj,pobj);
            }

        } else {
              obj.attr("src",imgsrc) ;
       ShowCaseDetailImage(obj,pobj);

        }
    } else {
        image.onload = function() {
            if (image.complete == true) {
                 obj.attr("src",imgsrc) ;
              ShowCaseDetailImage(obj,pobj);
            }
        }

    }

    image.onerror = function() {
        obj.parent().removeClass("img_loading").addClass("img_loading_error");
    }

}

    
    $(".gfoot_w1").click(function(e){
	   if($(".gfoot").hasClass("mpfoot")){
	  if($(this).hasClass("footOff")){
	   var footH=$(".foot_t2").outerHeight();
	   var mbH=$(".foot_t2",$(this)).length*footH;
	   $(".mb_foot_contain",$(this)).stop().animate({height:mbH},500);
	    $(".mb_foot_contain").not($(".mb_foot_contain",$(this))).animate({height:0},500);
		$(".triangle").not($(".triangle",$(this))).addClass("seke");
	   $(".triangle",$(this)).removeClass("seke");
	   $(this).addClass("footOn").removeClass("footOff");
       $(".gfoot_w1").not($(this)).removeClass("footOn").addClass("footOff");
	   }else{
	    $(".mb_foot_contain",$(this)).stop().animate({height:0},500);
	   $(".triangle",$(this)).addClass("seke");
	   $(this).addClass("footOff").removeClass("footOn"); 
	   }
	  }
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
	$('.pc_sd img').click(function() {
       
		if ($(".s_s").hasClass("s_on")) {
                    
					
		
			  
			     $('.s_nav').stop().animate({height:0},300,function(){
	    
				   $(".s_s").removeClass("s_on").addClass("s_off");
				         if($(".pc_sd").hasClass("menu_off")){
			
				$('.menu_div').slideDown(200,
				function() {
				     $(".glunfixed").css("position","relative");
					$("html, body").animate({
						scrollTop: 0
					},
					"slow");
						 $(".pc_sd").addClass("menu_on").removeClass("menu_off");
				}).css("z-index", "11");
				}else{
			
					$('.menu_div').slideUp(200,
				function() {
						     $(".glunfixed").css("position","fixed");
					$("html, body").animate({
						scrollTop: 0
					},
					"slow");
						 $(".pc_sd").addClass("menu_off").removeClass("menu_on");
				}).css("z-index", "111");
				}
				 });
	
		} else {
		
		
		 if($(".pc_sd").hasClass("menu_off")){
			   
				  if($(".map_dian").hasClass("map_on")){
				  
				  $(".map_yin,.map_left").height(0);
                   $(".map_dian").removeClass("map_on").addClass("map_off");
				   $(".dian_upsan").removeClass("select");
				    $(".map_right").show();
				   
					 	  $(".foot_gai").show();

			  }	  
				$('.menu_div').slideDown(200,
				function() {
				     $(".glunfixed").css("position","relative");
					$("html, body").animate({
						scrollTop: 0
					},
					"slow");
					$(".pc_sd").addClass("menu_on").removeClass("menu_off");
				}).css("z-index", "111");

		
				}else{
			
					$('.menu_div').slideUp(200,
				function() {
				     $(".glunfixed").css("position","fixed");
					$("html, body").animate({
						scrollTop: 0
					},
					"slow");
		
						$(".pc_sd").addClass("menu_off").removeClass("menu_on");
				}).css("z-index", "111");
		
				}

	

		}

	});
	
	$(".s_b").addClass("bagoff");
		$(".s_b").click(function(e){

	if ($(this).hasClass("bagoff")) {
	 $(this).removeClass("bagoff").addClass("bagon");
	 
		
			
				if ($(".mybl").hasClass("mybl_on")) {
				$(".mybl").removeClass("mybl_on").addClass("mybl_off");

					$(".deng_box").hide();
				
			} 
			
				//$(".deng_box,.mybl,.gdh ul li.pad2 img,.pc_bag_shu").hide();
				
				$(".gdh,.miao_bao1").show();
	
	}else{
	 $(this).removeClass("bagon").addClass("bagoff");
			$(".miao_bao1").hide();
	
	}
	
	e.stopPropagation();
	});
		
	$(".bag").click(function(e){
	 // alert(1);
	if ($(this).hasClass("bagoff")) {
	 $(this).removeClass("bagoff").addClass("bagon");
	 
		
			
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
	
		$(".bag img").click(function(e){
	 
	if ($(".bag").hasClass("bagoff")) {
	 $(".bag").removeClass("bagoff").addClass("bagon");
	 
		
			
				if ($(".mybl").hasClass("mybl_on")) {
				$(".mybl").removeClass("mybl_on").addClass("mybl_off");

					$(".deng_box").hide();
				
			} 
			
				$(".deng_box").hide();
				
				$(".miao_bao1").show();
	
	}else{
	 $(".bag").removeClass("bagon").addClass("bagoff");
			$(".miao_bao1").hide();
	
	}
	
	e.stopPropagation();
	});
	

$("#user_email").focus(function() {

   if ($(this).val() == '在这里输入电子邮件') {

            $(this).val("");

        }


});


$("#user_email").blur(function() {

   if ($(this).val() == '在这里输入电子邮件' ||  $(this).val().Trim() == "") {

            $(this).val("在这里输入电子邮件");

      }


});

$(".email_list").click(function(){
	
	add_email_list();
});

var dfemail =$("#user_email").val();
function add_email_list()
{
  if (check_email())
  {
    Ajax.call('user.php?act=email_list&job=add&email=' + dfemail.value, '', rep_add_email_list, 'GET', 'TEXT');
  }
}
function rep_add_email_list(text)
{
  alert(text);
}
function cancel_email_list()
{
  if (check_email())
  {
    Ajax.call('user.php?act=email_list&job=del&email=' + dfemail.value, '', rep_cancel_email_list, 'GET', 'TEXT');
  }
}
function rep_cancel_email_list(text)
{
  alert(text);
}
function check_email()
{
 var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   if(!filter.test(dfemail.value)){
    return true;
  }
  else
  {
    alert('邮件地址非法！');
    return false;
  }
}

     
	  resbig();
		$(window).resize(function(){
			mbnavw=$(window).width();
	showLoadding();
	 resbig();
	backtop();
	 if($(window).width()>970){
		 $(".shou_head").hide();
$(".s_nav").height(0);
	     $(".s_nav").removeClass("s_on").addClass("s_off");
		 $(".pc_sd").removeClass("menu_on").addClass("menu_off");
	 }
	 
	 		if($(".map_left").length>0){
				    f_maps();
						bolon_map();
				   $(".map_left .map_dian").css({position:"static",top:60});
				  $(".map_yin").css({"position":"relative"});
					   $(".map_right").show();
				     $(".map_left").height(0);
					 	  $(".foot").show();
						  	    $(".dian_upsan").removeClass("select");
		  	  $(".map_dian").removeClass("map_on").addClass("map_off");
			  

				   }
	 
	});
	bolon_map();
	function bolon_map(){
		
					  		if ($(window).width() <= 960) {
			$(".map_dian").removeClass("map_pc").addClass("map_mp");


		} else {
			$(".map_dian").removeClass("map_mp").addClass("map_pc");

		}
		
	}
	
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
			$(".map_right").css("height", "100%");

			$(".dian_cha3,.searchContain").height(353);
			$(".scrollbar").height(353);
			$(".track").height(353);
			$(".dian_cha3").height(353);

			$(".map_left").css("height", "auto");
			$(".map_yin").css("height", 0);

		}

	}
	function resbig(){
	  if($(window).width()<960){ 
	      $(".gfoot").addClass("mpfoot");
	     $(".gfoot_w1").addClass("footOff");
		      $(".mb_foot_contain").css("height","0");
			     $(".triangle").addClass("seke");
	  }else{
	   $(".gfoot").removeClass("mpfoot");
	      $(".mb_foot_contain").css("height","auto");
	      $(".gfoot_w1").removeClass("footOff");
	   
	  }
	    if(IsPC()){
		
		   $(".bg_img").each(function(){

		   $(".loadding",$(this)).show();
		   LoadBgImg($(this));
		  
		   
		   });
		
	   }
	   
	      if(!IsPC()){
   	   $(".bg_img").each(function(){
	
		   $(".loadding",$(this)).show();
		   LoadBgImg($(this));
		   
		   });
   
   }
		
	
	
	}




   function LoadBgImg(objs) {

    var browser = new Object();
    var obj = new Object();
    obj = objs;
	    var imgsrc='';
    browser.useragent = window.navigator.userAgent.toLowerCase();
    browser.ie = /msie/.test(browser.useragent);
    browser.moz = /gecko/.test(browser.useragent);
		  if($(".gz_contain").length>0){
	    if($(window).width()>1180){
      imgsrc = obj.attr("data-img");
	}else{
	   imgsrc = obj.attr("data-media");
	
	}
	}else{
	
		    if($(window).width()>960){
      imgsrc = obj.attr("data-img");
	}else{
	   imgsrc = obj.attr("data-media");
	
	}
	}
 
 
    var image = new Image;
    image.src = imgsrc;
    if (browser.ie) {
        if (image.height === 0) {
            image.onload = function() {
              
                ShowBgImage(objs,imgsrc);
            }

        } else {
         ShowBgImage(objs,imgsrc);

        }
    } else {
        image.onload = function() {
            if (image.complete == true) {
                ShowBgImage(objs,imgsrc);
            }
        }

    }

    image.onerror = function() {
        obj.parent().removeClass("img_loading").addClass("img_loading_error");
    }

}
  var imgcount=0;
  var bganshow=true;
  var bganimate=0;
  

    
function ShowBgImage(obj,imgsrc) {
 
        var bglen=$(".gz_contain .bg_img").length;
	  if($(".gz_contain").length>0){
	  
	    if(!bganshow){
		$(".gz_contain .loadding").hide();
		
		}
	 
		   if(obj.hasClass("gz_bj")){
		   
		   bganimate=obj.attr("data-media-left");
		   if(bganimate.Trim()!="" && bganshow){
		   var bgleft=parseInt(bganimate)/100*$(window).width();
		 //  alert(parseInt(bganimate));
		    obj.css("marginLeft",bgleft);
		    obj.css("opacity",0);
		   }
		   }
	      if($(window).width()<1180){
	
		    var hsz=$(window).width()*640/960;
		if($(".gz_contain .bg_height").length>0){
         
	  $(".w_por").css("height","auto");
	  $(".w_potu").height(hsz);
	  $(".bg_img").height(hsz);
       $(".gz_contain .loadding").height(hsz);
	   var chs=hsz+($(".w_cover").outerHeight()+parseInt($(".w_cover").css("marginTop"))+parseInt($(".w_cover").css("marginBottom")));
	     	  $(".gz_contain").height(chs);
			
			}else{
					if($(".gz_contain .newsbg").length>0){
						  var hsz=$(window).width()*330/960;
						  	  $(".gz_contain",obj).height(hsz);
							    $(".gz_contain .loadding").height(hsz);
					}else{
						  	  $(".gz_contain",obj).height(obj.outerHeight());
						
					}
						
						
						
				
			
			}
		     obj.css("height",hsz);
	
if($(".gz_contain .newsbg").length>0){
	
$(".gz_contain").height(hsz);
		  	  obj.height(hsz);
			  
}else{
		  	  obj.height(obj.outerHeight());
	
}
		   obj.css("background","url("+imgsrc+") no-repeat");
	       obj.css({"background-position":"50% 50%","background-size":"cover"});
		  }else{
		 
		  	  if($(".gz_contain .bg_height").length>0){
				  
				   if($(".gz_contain .bgsearch").length>0){
				
					  $(".w_por").height(440);
	  $(".w_potu").height(440);
	  $(".bg_img").height(440);
	   $(".gz_contain").height(440);
       $(".gz_contain .loadding").height(440);      
					   
				   }else{
								    var bgh=$(window).height()-$(".gh").height()-$(".gh1").height();
	  var imghs=bgh-$(".w_cover").outerHeight()-(parseInt($(".w_cover").css("marginTop"))+parseInt($(".w_cover").css("marginBottom")));
	  $(".w_por").height(bgh);
	  $(".w_potu").height(imghs);
	  $(".bg_img").height(imghs);
	   $(".gz_contain").height(bgh);
       $(".gz_contain .loadding").height(imghs);   
					   
				   }

	
	  }else{

		      var parobj=$(".bg_img").closest(".gz_contain");
		 
				 obj.height(300);
				
		  }
		  
		     obj.css("background","url("+imgsrc+") no-repeat");
	      obj.css({"background-position":"50% 50%","background-size":"cover"});
		  }
		  imgcount++;
		  
		  if(imgcount==bglen && bganshow){
	
		     $(".gz_contain .loadding").fadeOut(200,function(){
			 	      obj.stop().animate({marginLeft:[0,"swing"],opacity:1},500);
		      bganshow=false;
			 
			 });
 
	
		
		  
			 
			
		  }
	  
	   }else{
	    $(".loadding",obj).hide();
	     if($(window).width()<960){
		    var hsz=$(window).width()*600/960
		      obj.css("height",hsz);
		  	 // $(".bg_img").height(obj.outerHeight());
			 
			
		   obj.css("background","url("+imgsrc+") no-repeat");
		   
		   if(obj.hasClass("noy")){
			 obj.css({"background-position":"50% 0%","background-size":"cover"});   
		   }else{
			  obj.css({"background-position":"50% 50%","background-size":"cover"});  
		   }
	      
		  }else{
		 
				  obj.height(440);
				   obj.css("background","url("+imgsrc+") no-repeat");
				      if(obj.hasClass("noy")){
			 obj.css({"background-position":"50% 0%","background-size":"cover"});   
		   }else{
			  obj.css({"background-position":"50% 50%","background-size":"cover"});  
		   }

		  }
	   
	   
	   }
    

  
    
 
}
	
	


function ShowCaseDetailImage(obj,pobj) {

    $(".loadding",pobj).fadeOut();
     obj.removeAttr("style");
     obj.removeAttr("data-src");
    //obj.fadeIn();
   
 
}
lomt();
function lomt(){
$(".limgs").each(function(){
$(".loadding",$(this)).show();
var omj=$(this).find("img").not(".video_ico");
LoadImg(omj,$(this));
});

}  

})
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
	function tutule(method, content) {

		clearTimeout(method.animate_id);

		method.animate_id = setTimeout(function() {

			method.call(content);

		},
		100)

	}
	
	
