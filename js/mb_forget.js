$(function(){

 

$(".captcha").bind("focus",function(){
 if($(this).val().Trim()=="验证码" || $(this).val().Trim()==""){
	 $(".frogetmsg").addClass("err_msg").html("*请输入验证码").show();
  // showTip($(this),"请输入验证码。");
   $(this).val(" ");
 }
});



  var accountval="";
    $(".captcha").blur(function(){
	
	 accountval=$(".captcha").val();
	
	 if(accountval.Trim()==="" || accountval.Trim()=="验证码"){
		 $(".frogetmsg").addClass("err_msg").html("*请输入验证码").show();
	    //showTip($(this),"请输入验证码。");
        $(this).val("验证码 ");
    
		
		return false;
		
		}else{
		

		$(".frogetmsg").hide();
		return true;
 
		
		
		}
	
    
    });
	
	

	
	var fgemial='';

	function validateEmail(){
	fgemial=$(".fgs_email").val().Trim();
	
	if(fgemial==""){
			 $(".frogetmsg").addClass("err_msg").html("*请输入邮箱地址").show();
	   $(".fgs_email").val("邮箱地址");
	   //	showTip( $(".fg_email"),"请输入邮箱地址。"); 
		//$(".email_false").html("<span class='ti_error'>邮箱地址不能为空!</span>").show();
		return false;
	
	}else{
	
		var _reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if (_reg.test($(".fgs_email").val().Trim())) {
			 
			 $(".frogetmsg").hide();
	
				  return true;
			
			}else{
					 $(".frogetmsg").addClass("err_msg").html("*邮件地址输入格式不正确").show();
	  
			  return false;
			}
	
	}
	
	
	}
	
	
	$(".fgs_email").bind("blur",function(){
 if($(this).val().Trim()=="邮箱地址" || $(this).val().Trim()==""){
 
   $(this).val(" ");
   				 $(".frogetmsg").addClass("err_msg").html("*请输入邮箱地址").show();
     //showTip($(this),"请输入邮箱地址。");
 }else{
	 
	 validateEmail();
	 
 }
});
	
	
 
	

	
	 $(".login_submit").click(function(){
	 

	 
	    submitGetPass();
	 
	 });
	 
	 var fgload=true;
	 function submitGetPass(){
    var Capche=$(".captcha").val();
		if(!validateEmail()){
		
		   return false;
		
		}
	 if(Capche.Trim()==="" || Capche.Trim()==="验证码"){
	 
        $(".captcha").val("验证码");
 //showTip($(".captcha"),"请输入验证码。"); 
		
			 $(".frogetmsg").addClass("err_msg").html("*请输入验证码").show();
		return false;
		
		}
      
		
	
		    var laddrs2=$( '#button' ).ladda();	 
		 if(fgload){
   
   
   	       $.ajax({
                type: 'POST',
                url: 'user.php',
				
                data:{
				    captcha:accountval,
					email:fgemial,
					     timestamp: timestamp,
                token: token,
					act:"send_pwd_email"
					
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				    fgload=false;
					laddrs2.ladda("start");
					//$(".forget_state").empty().show().html("正在提交...");
                },
                success: function(data){
								laddrs2.ladda("stop");
			     $(".forget_state").empty().hide();
			       switch(data.err){
				   
				     case 0:
					 	 $(".frogetmsg").addClass("err_msg").html("*验证码错误").show();
					 
					    fgload=true;
					 break;
			
					   case 1:
					   	 	 $(".frogetmsg").removeClass("err_msg").html("*邮件发送成功").show();
					   	 	 // $(".forget_state").empty().show().html("邮件发送成功!");
						    fgload=false;
						  setTimeout(function(){
						    $(".frogetmsg").empty().hide();
						    fgload=true;
						  },2000)
					  
					   fgload=true;
					 break;
					 
					 
					   case 2:
					    	 	 $(".frogetmsg").addClass("err_msg").html("*邮件发送失败").show();
					 // $(".forget_state").empty().show().html("<span class='ti_error'>邮件发送失败!</span>");
					   fgload=true;
					 break;
					   case 3:
					   $(".frogetmsg").addClass("err_msg").html("*该邮件账户不存在").show();
					   //showTip($(".fg_email"),"该邮件账不存在。"); 
					 	 // $(".forget_state").empty().show().html("<span class='ti_error'>邮件账户不存在!</span>");
					   fgload=true;
					 break;
					    case 4:
						
						$(".frogetmsg").addClass("err_msg").html("*邮件不能为空").show();
							//showTip($(".fg_email"),"邮件不能为空。"); 
					 	 //$(".forget_state").empty().show().html("<span class='ti_error'>邮件不能为空!</span>");
					   fgload=true;
					 break;
					     case 5:
						 			$(".frogetmsg").addClass("err_msg").html("*邮件地址输入格式不正确").show();
					 	 	//showTip($(".fg_email"),"邮件地址输入格式不正确。"); 
					   fgload=true;
					 break;
					 
					     case 6:
						
						$(".frogetmsg").addClass("err_msg").html("*验证失败").show();
							//showTip($(".fg_email"),"邮件不能为空。"); 
					 	 //$(".forget_state").empty().show().html("<span class='ti_error'>邮件不能为空!</span>");
					   fgload=true;
					 break;
					 	  
						 
						 default:
						 $(".frogetmsg").addClass("err_msg").html("*系统错误,请刷新后重试").show();
						//$(".forget_state").empty().show().html("<span class='ti_error'>系统错误,请刷新后重试!</span>");
						 
				   
				   
				   
				   }
                  
		
                }
            });
   
   
   }
		
		
		//document.getPassword.submit();
	 
	 }

function CheckCapche(capche){
   
   
   
    var cabol=false;
    $.ajax({
                type: 'POST',
                url: 'user.php?act=is_capche',
				 async:false,
                data:{
                    capche:capche
				
                },
                dataType:"html",
                beforeSend:function(XMLHttpRequest){
				    //$(".register_username_false").hide();
					  showTip($(".captcha"),"验证码验证中，请稍等...");
        //$(this).val("验证码 ");
                 //   $(".account_false").html("验证码验证中，请稍等...").show();
                },
                success: function(data){
				
                  hideTip($(".captcha"));
               
                     switch(data){
					 

                        case "true":
						   hideTip($(".captcha"));
                       // $(".register_username_true").html("账号可以注册 ！").show();
			
							 cabol=true;
                         break; 
						 
                        case "false":
						 // showTip($(".captcha"),"验证码错误。");
              			    //  $(".account_false").html("验证码错误！").show();
                       // $(".register_username_true").html("").hide();
			
		                 cabol=false;
						  break;
					  
						   
                        default:
					 cabol=false;
					
    
			  
                    }
		
                }
            });
   
      return cabol;
   }
	
function keyUp(e) { 
　　       　  var currKey=0,e=e || event;
　　      　   currKey=e.keyCode || e.which || e.charCode;
　　       　 if(currKey===13){
              
			submitGetPass();

              }
  }
　document.onkeyup = keyUp;


});

