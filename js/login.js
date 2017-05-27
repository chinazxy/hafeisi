$(function(){

  $(".email").focusin(function(){
      if( $(this).val()==="输入邮箱"){
        $(this).val("");
		
		}
  
  });

    $(".email").focusout(function(){
     if($(this).val().Trim()===""){
        $(this).val("输入邮箱");
	
		}else{
		
		
		bl_validateEmail();
		
		}
  
    });
	
	
	function bl_validateEmail(){
	
	if($(".email").val().Trim()==="" ){
	

		return false;
	
	}

	 return true;

	
	
	}
	
	

	

	$(".password").focusout(function(){
	
    bl_validatePassword();
	
	});
	
	
	function bl_validatePassword(){
	
		
	    if($(".password").val().Trim()==="" || $(".password").val().Trim()==="输入密码"){
		 

		  
		   return false;
		 
		 }
		
		 return true;
	
	
	}
	
	
	
	$(".login_ajax_submit").click(function(){
	
	
	
      	bl_submitLogin();
	});
	
	
	function bl_submitLogin(){
	
	 if(!bl_validateEmail()){
	  
	   return false;
	 
	 }
	 
	 if(!bl_validatePassword()){
	  
	   return false;
	 
	 }
	 
	var bl_email=$(".email").val();
	
	var bl_password=$(".password").val();
	
    $.ajax({
                type: 'POST',
                url: 'user.php',
                data:{
                    email:bl_email,
					password:bl_password,
					token:token,
					timestamp:timestamp,
					act:"signin"
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				    $(".login_false").hide();
                    $(".login_true").html("数据提交中，请稍等...").show();
                },
                success: function(data){
				$(".login_false").hide();
                $(".login_true").html("数据提交中，请稍等...").hide();
               
                     switch(data.error){
					 
					   
                        case 1:
						    var back_act=$(".back_act").val();
						    $(".login_false").hide();
                            $(".login_true").html("登录成功!").show();
							setTimeout(function(){
							
							$(".login_false").hide();
                            $(".login_true").hide();
							location.href=back_act;
							},100);
                         break; 
                        case 2:
                           $(".login_true").hide();
                           $(".login_false").html("邮箱不能为空，登录失败!").show();
							setTimeout(function(){
							
							$(".login_false").hide();
                            $(".login_true").hide();
							},2000);
		     
						  break;
					    case 3:
			               $(".login_true").hide();
                           $(".login_false").html("邮箱或密码错误，登录失败!").show();
							setTimeout(function(){
							
							$(".login_false").hide();
                            $(".login_true").hide();
							},2000);
                         break; 
					      case 4:
						
                              $(".login_true").hide();
                           $(".login_false").html("邮件格试不正确，登录失败!").show();
							setTimeout(function(){
							
							$(".login_false").hide();
                            $(".login_true").hide();
							},2000);
					
                           break; 
						   	   case 5:
						
                             $(".login_true").hide();
                           $(".login_false").html("登录密码不能为空，登录失败!").show();
							setTimeout(function(){
							
							$(".login_false").hide();
                            $(".login_true").hide();
							},2000);
					
                           break; 
						   
                        default:
						alert("系统错误，刷新后重试！");
					
    
			  
                    }
		
                }
            });
			
	 
	
	
	}
	
	
function keyUp(e) { 
　　       　  var currKey=0,e=e || event;
　　      　   currKey=e.keyCode || e.which || e.charCode;
　　       　 if(currKey===13){
              
			submitLogin();

              }
  }
　document.onkeyup = keyUp;


});

