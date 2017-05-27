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
	
	showTip($(".account"),"请输入邮件地址。");
	  //$(".email_msg").html("电子邮件地址不能为空！").show();
	 // $(".email").focus();
	  return false;
	
	}else{
	  
	   var _reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	   if (!_reg.test($(".account").val().Trim())) {
	 // $(".email_msg").html("电子邮件格式不正确！").show();
	 	 showTip($(".account"),"电子邮件格式不正确。");
		// $(".email").focus();		 
	    return false;
			
		}else{
		  //alert(CheckEmail($(".email").val()));
		  
		 chekcemail=CheckEmail($(".account").val());
		 if(!chekcemail){
	 	 showTip($(".account"),"邮件已被注册！。");
	 //$(".email_msg").html("邮件已被注册！").show();
	 		
		 return false;
		 }
             hideTip();
	 //$(".email_msg").html("").hide();

	  return true;
		 
		
		}
	
	
	}
	
	e.stopPropagation();
	
	});
	
	
	
/*	$(".username").focusout(function(e){

	e.stopPropagation();
	  var username=$(".username").val();
	  
	  var unlen=username.replace(/[^\x00-\xff]/g, "**").length;
	 
	   if ( username == '' )
       { 
	   
         $('.username_msg').html("账号不能为空！").show();
		
          return false;
       }

    if ( !chkstr( username ) )
    {
          $('.username_msg').html("账号含有非法字符！").show();
		 
		 return false;
    }
if ( unlen < 3 )
   { 
        $('.username_msg').html("账号长度不能少于 3 个字符").show();
		 return false;
		 
 }
  if ( unlen > 14 )
  {
       $('.username_msg').html("账号最长不得超过7个汉字").show();
		  
		return false;
   }
 //  var _reg =/^1[3-8]+\d{9}$/;
  // if (!_reg.test($(".username").val().Trim())) {
   
  //  $('.username_msg').html("手机号码格式不正确!").show();
		//  return false;
  // }
	
	checkusername=CheckUserName($(".username").val());
	
	if(!checkusername){
	  $(".username_msg").html("账号已被注册！").show();
	 			 
		  
		   // $(".username").focus();
		   return false;
		 }
		 
	  $(".username_msg").html("").hide();

		   return true;
	
	})*/
	
	
	

				$(".bl_password").bind("focus",function(){
$(this).prev().css("color","#ccc");
});

$(".bl_password").bind("keyup",function(){
hideTip();
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
	 showTip($(".bl_password"),"请输入密码。");
	 // $(".password_msg").html("密码不能为空！").show();
	 // $(".password").focus();
	  return false;
	
	}else{
	   if(unlen<6){
	    showTip($(".bl_password"),"密码长度不能小于6位数。");
	  // $(".password_msg").html("密码长度不能小于6位数！").show();
	   }else{
	  hideTip();
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
		    showTip($(".conpasswords"),"请输入确认密码。");
	  //$(".conpassword_msg").html("确认密码不能为空！").show();
	  //$(".conpassword").focus();
	  return false;
	
	}else{
	   if(conpassword!=password){
	       showTip($(".conpasswords"),"两次输入密码不一致。");
	    // $(".conpassword_msg").html("两次输入密码不一致!").show();
	   }else{
	     hideTip();
	     // $(".conpassword_msg").html("").hide();
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
	
	
	$(".regi_title6_b").click(function(){
	
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
	    
		
	  //  var username=$(".emails").val();
	
		var email=$(".account").val();
	
	
	
	var password=$(".bl_password").val();
	
	var conpassword=$(".conpasswords").val();
	
	
	// var unlen=username.replace(/[^\x00-\xff]/g, "**").length;
	 
	 
	  
	 
	 
	   //if ( username == '' )
      // { 
	    
	    
      //   $('.username_msg').html("账号不能为空！").show();
		
        //  return false;
     //  }

   // if ( !chkstr( username ) )
   // {
         // $('.register_username_true').hide();
       //   $('.username_msg').html("账号含有非法字符！").show();
		 
		// return false;
 //   }
   // if ( unlen < 3 )
   // { 
      //  $('.register_username_true').hide();
       //   $('.username_msg').html("账号长度不能少于 3 个字符").show();
		//  return false;
		 
  //  }
    //if ( unlen > 14 )
   // {
         // $('.register_username_true').hide();
     //     $('.username_msg').html("账号最长不得超过7个汉字").show();
		  
		//  return false;
  //  }
	
	
	//if(!checkusername){
	
	// $(".register_username_true").hide();
	//  $(".username_msg").html("账号已被注册！").show();
	//   return false;
	//}
	
	
	
	
	if(email.Trim()===""){
	
		 // $(".register_email_true").hide();
		showTip($(".account"),"请输入邮件地址。");
	  
	 // $(".email").focus();
	  return false;
	
	}else{
	  
	   var _reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	   if (!_reg.test($(".account").val().Trim())) {
		showTip($(".account"),"邮件格式不正确。");
	 // $(".email_msg").html("电子邮件格式不正确！").show();
	  // $(".email").focus();		 
	     return false;
			
		}
	
	
	}
	
	
	if(!chekcemail){
	
		showTip($(".account"),"邮件已被注册。");
	  //$(".email_msg").html("邮件已被注册！").show();
	 			 
	
		   return false;
	
	}

	if(password.Trim()===""){
	 // $(".password_msg").html("密码不能为空！").show();
 showTip($(".bl_password"),"请输入密码。");
	// $(".password").focus();
	 return false;
	
	}else{
	
   if(password.Trim().length<6){
    showTip($(".bl_password"),"密码长度不能小于6位。");
	// $(".password_msg").html("密码长度不能小于6位！").show();
	
	// $(".password").focus();
	 return false;
	
	}
	
	
	}
	
	
		if(conpassword.Trim()===""){
			  //$(".conpassword_msg").html("确认密码不能为空！").show();
	
	 showTip($(".conpasswords"),"请输入确认密码。");
	// $(".conpassword").focus();
	 return false;
	
	}
	
	if(password!==conpassword){
	 showTip($(".conpasswords"),"两次输入密码不一至。");
		  //$(".conpassword_msg").html("两次输入密码不一至！").show();
	
	
	
	 //  $(".conpassword").focus();
	  return false;
	}

   
			if(!$(".regi_butbox").attr("checked")){
	

	  showGTip($(".zcxy"),"您还未阅读并同意相关服务条款。");
	  setTimeout(function(){
	   hideTip();
	  
	  },1000)
	  
	  return false;
	//alert("您还阅读并同意相关服务条款！");
	}



    $.ajax({
                type: 'POST',
                url: 'user.php',
                data:{
                    email:email,
					password:password,
					cpassword:conpassword,
					act:"act_register"
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				  	$(".miao_mima1_ts1").empty().show().html("表单正在提交...");
                },
                success: function(data){
				    $(".miao_mima1_ts1").empty().hide();
              
               
                		    switch(data.err){
					 
					   
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
			              
                       showTip($(".account"),"邮箱格式不正确。");
						
                         break;
                        case 3:
						
						 showTip($(".bl_password"),"密码长度不能小于6位数。");
                       
		         
						  break;
					  
					      case 4:
						   showTip($(".bl_password"),"请输入登录密码。");
                           break; 
						       case 5:
							   	 $(".miao_mima1_ts1").html("注册失败!").show();
							   		setTimeout(function(){
							
							$(".miao_mima1_ts1").hide();
                      
							},1000);
					
                           break; 
						   	   case 6:
						    showTip($(".bl_password"),"两次输入密码不一致。");
                           break; 
						      	   case 7:
						    showTip($(".bl_password"),"请输入邮件地址。");
                           break; 
                        default:
						hideTip();
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


