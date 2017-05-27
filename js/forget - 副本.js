$(function(){

  $(".captcha").focusin(function(){
      if( $(this).val()==="请输入验证码"){
        $(this).val("");
		
		}
  
  });
  var accountval="";
    $(".captcha").blur(function(){
	
	 accountval=$(".captcha").val();
	
	 if(accountval.Trim()==="" || accountval.Trim()==="请输入验证码"){
	 
        $(".captcha").val("请输入验证码");

		$(".account_false").html("<span class='ti_error'>验证码不能为空!</span>").show();
		
		return false;
		
		}else{
		
		
      		var checkcaptcha=CheckCapche(accountval);
	
	   if(!checkcaptcha){
	     $(".account_false").html("<span class='ti_error'>验证码错误!</span>").show();
	 			 
	
		   return false;
		 }else{
		
		return true;
		}
		
		
		}
	
    
    });
	
	

	
	var fgemial='';
	function validateEmail(){
	fgemial=$(".fg_email").val().Trim();
	if($(".fg_email").val().Trim()==="" || $(".fg_email").val().Trim()==="请输入邮箱地址"){
	
	$(".fg_email").val("请输入邮箱地址");
		$(".email_false").html("<span class='ti_error'>邮箱地址不能为空!</span>").show();
		return false;
	
	}else{
	
		var _reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if (_reg.test($(".fg_email").val().Trim())) {
			 
			 
		        $(".email_false").html(" ").hide();
				  return true;
			
			}else{
			
	
		    $(".email_false").html("<span class='ti_error'>邮件地址输入格式不正确!</span>").show();
			  return false;
			}
	
	}
	
	
	}
	
	
	$(".fg_email").focusin(function(){
	
	     if($(this).val().Trim()==="" || $(this).val().Trim()==="请输入邮箱地址"){
		 
		  $(this).val("");
		  
		 }
	
	});
	
	
	$(".fg_email").blur(function(){
	
	
	  
	    
	  validateEmail();

	
	});
	

	
	 $(".login_submit").click(function(){
	 

	 
	    submitGetPass();
	 
	 });
	 
	 var fgload=true;
	 function submitGetPass(){
var Capche=$(".captcha").val();
	 if(Capche.Trim()==="" || Capche.Trim()==="请输入验证码"){
	 
        $(".captcha").val("请输入验证码");

		$(".account_false").html("<span class='ti_error'>验证码不能为空!</span>").show();
		
		return false;
		
		}
      
		
		if(!validateEmail()){
		
		   return false;
		
		}
		
		 if(fgload){
   
   
   	       $.ajax({
                type: 'POST',
                url: 'user.php',
				
                data:{
				    captcha:accountval,
					email:fgemial,
					act:"send_pwd_email"
					
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				    fgload=false;
					$(".forget_state").empty().show().html("正在提交...");
                },
                success: function(data){
			     
			       switch(data.err){
				   
				     case 0:
					   $(".forget_state").empty().show().html("<span class='ti_error'>验证码错误!</span>");
					    fgload=true;
					 break;
			
					   case 1:
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
					 	  $(".forget_state").empty().show().html("<span class='ti_error'>邮件账户不存在!</span>");
					   fgload=true;
					 break;
					    case 4:
					 	  $(".forget_state").empty().show().html("<span class='ti_error'>邮件不能为空!</span>");
					   fgload=true;
					 break;
					     case 5:
					 	  $(".forget_state").empty().show().html("<span class='ti_error'>邮件格式不正确!</span>");
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
                    $(".account_false").html("验证码验证中，请稍等...").show();
                },
                success: function(data){
				
                $(".account_false").html(" ").hide();
               
                     switch(data){
					 

                        case "true":
						      $(".account_false").hide();
                       // $(".register_username_true").html("账号可以注册 ！").show();
			
							 cabol=true;
                         break; 
						 
                        case "false":
              			      $(".account_false").html("验证码错误！").show();
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

