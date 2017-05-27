$(function(){

   var windowWs=$(window).height();
   


    var chekcemail=false;
	
	var checkusername=false;
	



	$(".account").bind("blur focusout",function(e){
	
     var email=$(this).val();
	
	if(email.Trim()===""){
	
	$(".msgmiao_login").addClass("err_msg").html("*请输入邮件地址!").show();
	  return false;
	
	}else{
	  
	   var _reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	   if (!_reg.test($(".account").val().Trim())) {
	 	$(".msgmiao_login").addClass("err_msg").html("*电子邮件格式不正确!").show(); 
	    return false;
			
		}else{

		// chekcemail=CheckEmail($(".account").val());
		// if(!chekcemail){
	//	$(".account_fmsg").show().html("邮件已被注册!"); 
		// return false;
		// }
      $(".msgmiao_login").hide();
	  //$(".account_tmsg").show().html("邮件地址可以使用!"); 
	  return true;
		 
		
		}
	
	
	}
	
	e.stopPropagation();
	
	});

	

 

	
	  var password='';
	$(".bl_password").focusout(function(e){
	e.stopPropagation();
     password=$(".bl_password").val();
	 var unlen=password.replace(/[^\x00-\xff]/g, "**").length;
	if(password.Trim()===""){

		$(".msgmiao_login").addClass("err_msg").html("*请输入密码!").show();
	 
	  return false;
	
	}else{
	   if(unlen<6){
		  $(".msgmiao_login").addClass("err_msg").html("*密码长度不能小于6位数!").show();
	   }else{
	   $(".msgmiao_login").hide();
	   }

	}
	
	});
	
 
 
		$(".conpasswords").focusout(function(e){
	e.stopPropagation();
     var conpassword=$(".conpasswords").val();
	 
	if(conpassword.Trim()===""){
		 $(".msgmiao_login").addClass("err_msg").html("*请输入确认密码!").show();
		   
	  return false;
	
	}else{
	   if(conpassword!=password){
		 $(".msgmiao_login").addClass("err_msg").html("*两次输入密码不一致!").show();
	   }else{
	    $(".msgmiao_login").hide();
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
	 $(".msgmiao_login").addClass("err_msg").html("*请输入邮件地址!").show();
	  return false;
	
	}else{
	  
	   var _reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	   if (!_reg.test($(".account").val().Trim())) {
		   $(".msgmiao_login").addClass("err_msg").html("*邮件格式不正确!").show();
	
	     return false;
			
		}
	
	
	}
	
	
 

	if(password.Trim()===""){
		 $(".msgmiao_login").addClass("err_msg").html("*请输入密码!").show();

	 return false;
	
	}else{
	
   if(password.Trim().length<6){
	 $(".msgmiao_login").addClass("err_msg").html("*密码长度不能小于6位!").show();

	 return false;
	
	}
	
	
	}
	
	
		if(conpassword.Trim()===""){
	  	  $(".msgmiao_login").addClass("err_msg").html("*请输入确认密码!").show();

	 return false;
	
	}
	
	if(password!==conpassword){
		   $(".msgmiao_login").addClass("err_msg").html("*两次输入密码不一至!").show();
	
	  return false;
	}

   
		//	if($(".regi_butbox").val()==0){
       // $(".miao_mima1_ts1").html("<span class='ti_error'>您还未阅读并同意相关服务条款!</span>").show();
	 // setTimeout(function(){
	 // $(".miao_mima1_ts1").hide();
	//  },2000)
	//  return false;
	//}

        var ltbbt = $( 'button' ).ladda();

    $.ajax({
                type: 'POST',
                url: 'user.php',
                data:{
                    email:email,
					password:password,
					cpassword:conpassword,
					    token:token,
					timestamp:timestamp,
					regival:1,
					act:"act_register"
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				 $(".msgmiao_login").hide();
				 ltbbt.ladda('start');
                },
                success: function(data){
				    //$(".miao_mima1_ts1").empty().hide();
              
               	 ltbbt.ladda('stop');
                		    switch(data.err){
					    case "shop_closed":
						
						 $(".msgmiao_login").addClass("err_msg").html("*注册功能暂时被关闭!").show();
						  // $(".miao_mima1_ts1").html("<span class='ti_error'>注册功能暂时被关闭!</span>").show();
						 
						break;
						
						case "ver_err":
						 $(".msgmiao_login").addClass("err_msg").html("*验证失败，刷新后重试!").show();
						  // $(".miao_mima1_ts1").html("<span class='ti_error'>验证失败，刷新后重试!</span>").show();
						break;
					   
                        case 1:
						    var back_act=$(".back_act").val();
							
							
						   	 $(".msgmiao_login").removeClass("err_msg").html("注册成功!").show();
                           // $(".miao_mima1_ts1").html("注册成功!").show();
							setTimeout(function(){
							
							$(".msgmiao_login").hide();
                           if(back_act===""){
						   	window.location.href="index.php";
						   }else{
							window.location.href="user.php?act=user_person";
							
							}
							},1000);
                         break; 
						    case 2:
			                  $(".msgmiao_login").addClass("err_msg").html("*邮件格式不正确!").show();
                    
						
                         break;
                        case 3:
						      $(".msgmiao_login").addClass("err_msg").html("*密码长度不能小于6位数!").show();
						// showTip($(".bl_password"),"密码长度不能小于6位数。");
                       
		         
						  break;
					  
					      case 4:
						   $(".msgmiao_login").addClass("err_msg").html("*请输入登录密码!").show();
						  // showTip($(".bl_password"),"请输入登录密码。");
                           break; 
						       case 5:
							     $(".msgmiao_login").addClass("err_msg").html("*注册失败!");
							   	 //$(".miao_mima1_ts1").html("<span class='ti_error'>注册失败!</span>").show();
							   		setTimeout(function(){
							
							$(".msgmiao_login").hide();
                      
							},1000);
					
                           break; 
						   	   case 6:
							   
							        $(".msgmiao_login").addClass("err_msg").html("*两次输入密码不一致!").show();;
							   //	$(".cpass_fmsg").show().html("两次输入密码不一致!");
		
                           break; 
						      	   case 7:
								     $(".msgmiao_login").addClass("err_msg").html("*请输入邮件地址!").show();;
								  // 	$(".cpass_fmsg").show().html("请输入邮件地址!");
		
                           break; 
						   
						        
                        default:
						//hideTip();
						   $(".msgmiao_login").addClass("err_msg").html("*系统错误，刷新后重试!").show();
						 // $(".miao_login").html("<span class='ti_error'>系统错误，刷新后重试!</span>").show();
				
					
    
			  
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


