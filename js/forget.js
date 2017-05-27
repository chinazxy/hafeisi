$(function(){

function showTip(obj,msg){
  
   $(".miao_yin_t").html(""+msg);
   $(".miao_yin").css({top:obj.offset().top-obj.outerHeight()-($(".miao_yin").outerHeight())/2+10,left:obj.offset().left+obj.width()/2-$(".miao_yin").width()/2}).fadeIn();

}

function hideTip(obj){

   $(".miao_yin_t").html("");
   $(".miao_yin").css({top:0,left:0}).hide();

}


$(".captcha").bind("focus",function(){
 if($(this).val().Trim()=="验证码" || $(this).val().Trim()==""){
   showTip($(this),"请输入验证码。");
   $(this).val(" ");
 }
});



  var accountval="";
    $(".captcha").blur(function(){
	
	 accountval=$(".captcha").val();
	
	 if(accountval.Trim()==="" || accountval.Trim()=="验证码"){
	
	    showTip($(this),"请输入验证码。");
        $(this).val("验证码 ");
    
		
		return false;
		
		}else{
		
		
      		var checkcaptcha=CheckCapche(accountval);
	
	   if(!checkcaptcha){
	    
	 			showTip($(this),"验证码错误。"); 
	
		   return false;
		 }else{
		hideTip($(this));
		return true;
		}
		
		
		}
	
    
    });
	
	

	
	var fgemial='';
	function validateEmail(){
	fgemial=$(".fg_email").val().Trim();
	if($(".fg_email").val().Trim()==="" || $(".fg_email").val().Trim()==="邮箱地址"){
	
	   $(".fg_email").val("邮箱地址");
	   	showTip( $(".fg_email"),"请输入邮箱地址。"); 
		//$(".email_false").html("<span class='ti_error'>邮箱地址不能为空!</span>").show();
		return false;
	
	}else{
	
		var _reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if (_reg.test($(".fg_email").val().Trim())) {
			 
			 hideTip($(".fg_email"));
		       // $(".email_false").html(" ").hide();
				  return true;
			
			}else{
			
	   	showTip($(".fg_email"),"邮件地址输入格式不正确。"); 
		   // $(".email_false").html("<span class='ti_error'>邮件地址输入格式不正确!</span>").show();
			  return false;
			}
	
	}
	
	
	}
	
	
	$(".fg_email").bind("focus keyup",function(){
 if($(this).val().Trim()=="邮箱地址" || $(this).val().Trim()==""){
 
   $(this).val(" ");
     showTip($(this),"请输入邮箱地址。");
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
	 if(Capche.Trim()==="" || Capche.Trim()==="验证码"){
	 
        $(".captcha").val("验证码");
 showTip($(".captcha"),"请输入验证码。"); 
		
		
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
			     $(".forget_state").empty().hide();
			       switch(data.err){
				   
				     case 0:
					 showTip($(".captcha"),"验证码错误"); 
					 //  $(".forget_state").empty().show().html("<span class='ti_error'>验证码错误!</span>");
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
					   showTip($(".fg_email"),"该邮件账户不存在。"); 
					 	 // $(".forget_state").empty().show().html("<span class='ti_error'>邮件账户不存在!</span>");
					   fgload=true;
					 break;
					    case 4:
							showTip($(".fg_email"),"邮件不能为空。"); 
					 	 //$(".forget_state").empty().show().html("<span class='ti_error'>邮件不能为空!</span>");
					   fgload=true;
					 break;
					     case 5:
					 	 	showTip($(".fg_email"),"邮件地址输入格式不正确。"); 
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

