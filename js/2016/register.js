$(function(){

   var windowWs=$(window).height();
   
   $(".guanbi").click(function(){
    $(".register_xieyi_box").animate({opacity:0,marginTop:[-250,"easeInOutSine"]},600,function(){

   $(".register_alert_box").fadeOut(300,function(){
   $("body").css("overflow-y","");
   
   });
 });
     //$(".register_alert_box").fadeOut();
	   
   });
   
   $(".showxeiyi").click(function(){
     $("body").css("overflow-y","hidden");
      $(".register_alert_box").fadeIn(300,function(){
      $('#scrollbar1').tinyscrollbar({trackSize:300});
   $(".register_xieyi_box").animate({opacity:1,marginTop:[-230,"easeOutSine"]},300);
   
   
   });
   
   
   
   });
function showTip(obj,msg){
  
   $(".miao_yin_t").html(""+msg);
   $(".miao_yin").css({top:obj.offset().top-obj.outerHeight()-($(".miao_yin").outerHeight())/2+10,left:obj.offset().left+obj.width()/2-$(".miao_yin").width()/2}).fadeIn();

}
function hideTip(obj){

   $(".miao_yin_t").html("");
   $(".miao_yin").css({top:0,left:0}).hide();
$(".miao_login").hide();
}
function showGTip(obj,msg){
  
   $(".miao_yin_t").html(""+msg);
   $(".miao_yin").css({top:obj.offset().top-obj.outerHeight()-($(".miao_yin").outerHeight())/2-10,left:obj.offset().left+obj.width()/2-$(".miao_yin").width()/2}).fadeIn();

}

    var chekcemail=false;
	
	var checkusername=false;
	
			$(".account").bind("focus",function(){
$(this).prev().css("color","#ccc");
});

$(".account").bind("keyup",function(){
hideTip();
if($(this).val().Trim()!=""){
$(this).prev().hide();
}else{
$(this).prev().show();
}
});
	$(".account").bind("blur focusout",function(e){
	
     var email=$(this).val();
	
	if(email.Trim()===""){
	
	$(".account_fmsg").show().html("请输入邮件地址!");
	  return false;
	
	}else{
	  
	   var _reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	   if (!_reg.test($(".account").val().Trim())) {
	 	$(".account_fmsg").show().html("电子邮件格式不正确!"); 
	    return false;
			
		}else{

		 chekcemail=CheckEmail($(".account").val());
		 if(!chekcemail){
		$(".account_fmsg").show().html("邮件已被注册!"); 
		 return false;
		 }
      $(".account_fmsg").hide();
	  $(".account_tmsg").show().html("邮件地址可以使用!"); 
	  return true;
		 
		
		}
	
	
	}
	
	e.stopPropagation();
	
	});

	

$(".bl_password").bind("focus",function(){
$(this).prev().css("color","#ccc");
});

$(".bl_password").bind("keyup",function(){
if($(this).val().Trim()!=""){
$(this).prev().hide();
}else{
$(this).prev().show();
}
});

	
	  var password='';
	$(".bl_password").focusout(function(e){
	e.stopPropagation();
     password=$(".bl_password").val();
	 var unlen=password.replace(/[^\x00-\xff]/g, "**").length;
	if(password.Trim()===""){

		 $(".pass_fmsg").show().html("请输入密码!");
	 
	  return false;
	
	}else{
	   if(unlen<6){
		   	 $(".pass_fmsg").show().html("密码长度不能小于6位数!");
	   }else{
	   $(".pass_fmsg").hide();
	   }

	}
	
	});
	
					$(".conpasswords").bind("focus",function(){
$(this).prev().css("color","#ccc");
});

$(".conpasswords").bind("keyup",function(){
hideTip();
if($(this).val().Trim()!=""){
$(this).prev().hide();
}else{
$(this).prev().show();
}
});
		$(".conpasswords").focusout(function(e){
	e.stopPropagation();
     var conpassword=$(".conpasswords").val();
	 
	if(conpassword.Trim()===""){
		 $(".cpass_fmsg").show().html("请输入确认密码!");
		   
	  return false;
	
	}else{
	   if(conpassword!=password){
		   	 $(".cpass_fmsg").show().html("两次输入密码不一致!");
	   }else{
	    $(".cpass_fmsg").hide();
	   }
	

	}
	
	});
	
	
	
	
	
	
	function chkstr(str)
{
  for (var i = 0; i < str.length; i++)
  {
    if (str.charCodeAt(i) < 127 && !str.substr(i,1).match(/^\w+$/ig))
    {
      return false;
    }
  }
  return true;
}
	
	
	$(".zhuchebtn").click(function(){
	
		submitRegister();




		
	});
	
	
	function keyUp(e) { 
　　       　  var currKey=0,e=e || event;
　　      　   currKey=e.keyCode || e.which || e.charCode;
　　       　 if(currKey===13){
              
			submitRegister();

              }
  }
　document.onkeyup = keyUp;
	
	
	function submitRegister(){
	var email=$(".account").val();
	var password=$(".bl_password").val();
	var conpassword=$(".conpasswords").val();
	if(email.Trim()===""){
		$(".account_fmsg").show().html("请输入邮件地址!");
	  return false;
	
	}else{
	  
	   var _reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	   if (!_reg.test($(".account").val().Trim())) {
		   	$(".account_fmsg").html("邮件格式不正确!").show();
	
	     return false;
			
		}
	
	
	}
	
	
	if(!chekcemail){
	   	$(".account_fmsg").show().html("邮件已被注册!");
		
		   return false;
	
	}

	if(password.Trim()===""){
		 $(".pass_fmsg").show().html("请输入密码!");

	 return false;
	
	}else{
	
   if(password.Trim().length<6){
	   	 $(".pass_fmsg").show().html("密码长度不能小于6位!");

	 return false;
	
	}
	
	
	}
	
	
		if(conpassword.Trim()===""){
	  	 $(".cpass_fmsg").show().html("请输入确认密码!");

	 return false;
	
	}
	
	if(password!==conpassword){
		  	 $(".cpass_fmsg").show().html("两次输入密码不一至!");
	
	  return false;
	}

   
			if($(".regi_butbox").val()==0){
        $(".miao_mima1_ts1").html("<span class='ti_error'>您还未阅读并同意相关服务条款!</span>").show();
	  setTimeout(function(){
	  $(".miao_mima1_ts1").hide();
	  },2000)
	  return false;
	}



    $.ajax({
                type: 'POST',
                url: 'user.php',
                data:{
                    email:email,
					password:password,
					cpassword:conpassword,
					    token:token,
					timestamp:timestamp,
					regival:$(".regi_butbox").val(),
					act:"act_register"
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				  	$(".miao_mima1_ts1").empty().show().html("表单正在提交...");
                },
                success: function(data){
				    //$(".miao_mima1_ts1").empty().hide();
              
               
                		    switch(data.err){
					    case "shop_closed":
						   $(".miao_mima1_ts1").html("<span class='ti_error'>注册功能暂时被关闭!</span>").show();
						 
						break;
						
						case "ver_err":
						   $(".miao_mima1_ts1").html("<span class='ti_error'>验证失败，刷新后重试!</span>").show();
						break;
					   
                        case 1:
						    var back_act=$(".back_act").val();
							
							
						   
                            $(".miao_mima1_ts1").html("注册成功!").show();
							setTimeout(function(){
							
							$(".miao_mima1_ts1").hide();
                           if(back_act===""){
						   	window.location.href="index.php";
						   }else{
							window.location.href="user.php?act=user_person";
							
							}
							},1000);
                         break; 
						    case 2:
			                 	$(".account_fmsg").show().html("邮件格式不正确!");
                    
						
                         break;
                        case 3:
						    	$(".pass_fmsg").show().html("密码长度不能小于6位数!");
						// showTip($(".bl_password"),"密码长度不能小于6位数。");
                       
		         
						  break;
					  
					      case 4:
						  	$(".pass_fmsg").show().html("请输入登录密码!");
						  // showTip($(".bl_password"),"请输入登录密码。");
                           break; 
						       case 5:
							   	 $(".miao_mima1_ts1").html("<span class='ti_error'>注册失败!</span>").show();
							   		setTimeout(function(){
							
							$(".miao_mima1_ts1").hide();
                      
							},1000);
					
                           break; 
						   	   case 6:
							   	$(".cpass_fmsg").show().html("两次输入密码不一致!");
		
                           break; 
						      	   case 7:
								   	$(".cpass_fmsg").show().html("请输入邮件地址!");
		
                           break; 
						   
						        case 8:
						  		   	 $(".miao_mima1_ts1").html("<span class='ti_error'>您还未阅读并同意相关服务条款!</span>").show();
                           break; 
                        default:
						//hideTip();
						  $(".miao_login").html("<span class='ti_error'>系统错误，刷新后重试!</span>").show();
				
					
    
			  
                    }
		
                }
            });	
	
	
	}
	
	
   function CheckEmail(email){
   
   
   
    var bol=false;
    $.ajax({
                type: 'POST',
                url: 'user.php',
				 async:false,
                data:{
                    email:email,
					act:"check_email"
                },
                dataType:"html",
                beforeSend:function(XMLHttpRequest){
				    //$(".register_email_false").hide();
					showTip($(".account"),"邮件地址验证中，请稍等...");
                   // $(".register_email_true").html("邮件地址验证中，请稍等...").show();
                },
                success: function(data){
				$(".register_email_false").hide();
                $(".register_email_true").html(" ").hide();
                     hideTip();
                     switch(data){
					 

                        case "ok":
							//showTip($(".account"),"邮件地址可以注册。");
						     // $(".register_email_false").hide();
                        //$(".register_email_true").html("邮件地址可以注册 ！").show();
				
							 bol=true;
                         break; 
						 
                        case "false":
						showTip($(".account"),"邮件地址已被注册。");
              	
		                 bol=false;
						  break;
					  
						   
                        default:
					 bol=false;
					
    
			  
                    }
		
                }
            });
   
      return bol;
   }
   
   
   
      function CheckUserName(username){
   
   
   
    var ubol=false;
    $.ajax({
                type: 'POST',
                url: 'user.php?act=is_registered',
				 async:false,
                data:{
                    username:username
				
                },
                dataType:"html",
                beforeSend:function(XMLHttpRequest){
				    $(".register_username_false").hide();
                    $(".register_username_true").html("账号验证中，请稍等...").show();
                },
                success: function(data){
				$(".register_email_false").hide();
                $(".register_email_true").html(" ").hide();
               
                     switch(data){
					 
                        
					
    
			  
                    }
		
                }
            });
   
      return ubol;
   }

String.prototype.Trim = function() {
var m = this.match(/^\s*(\S+(\s+\S+)*)\s*$/);
return (m == null) ? "" : m[1];
}





});


