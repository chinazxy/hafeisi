$(function(){
var bl_email="";
var bl_password="";
$(".bl_email").val("");
$(".bl_password").val("");

$(".bl_email").bind("focusout blur",function(){

bolon_email();

});

	
function bolon_email(){
  bl_email=$(".bl_email").val();
  if(bl_email.Trim()===""){
	$(".msgmiao_login").addClass("err_msg").show().html("*请输入BOLON账号!")
   
    return false;
  }else{
  
	 var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   if(!filter.test(bl_email.Trim())){
 
	$(".msgmiao_login").addClass("err_msg").show().html("*BOLON账号格式不正确!")
    return false;

   }else{
 $(".msgmiao_login").hide();
     return true;
   }
   
   
  }


}
	
	




	
	function bl_validatePassword(){

bl_password=$(".bl_password").val();

if(bl_password.Trim()===""){
$(".msgmiao_login").addClass("err_msg").show().html("请输入登录密码!")
  $(".bl_password").val("");
 return false;
}else{
$(".msgmiao_login").hide();
 return true;
}

}





$(".bl_password").bind("focusout blur",function(){
    bl_validatePassword();
});
	
	
	$(".bl_login_ajax_submit").click(function(){
	
	
	
      	bl_submitLogin();
	});
	
		$(".zh_dengl").click(function(){
	    if( $(".deng_dac").hasClass("dengoff")){
			 $(".deng_dac").stop().animate({height:220},300);
			  $(".deng_dac").removeClass("dengoff").addClass("dengon");
			
		}else{
				  $(".deng_dac").removeClass("dengon").addClass("dengoff");
		 $(".deng_dac").stop().animate({height:0},300);	
		}
	   
	});
	
	
	function bl_submitLogin(){
	
	 if(!bolon_email()){
	  
	   return false;
	 
	 }
	 
	 if(!bl_validatePassword()){
	  
	   return false;
	 
	 }
	 

	var l = $( 'button' ).ladda();
	
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
			
            l.ladda('start');
                },
                success: function(data){
				    $(".miao_login").empty().hide();
              
                    l.ladda('stop');
                		    switch(data.error){
					 
					   
                        case 1:
						    var back_act=$(".back_act").val();
						   $(".msgmiao_login").removeClass("err_msg").show().html("登录成功!")
                           // $(".miao_login").html("登录成功!").show();
							setTimeout(function(){
							
							$(".msgmiao_login").hide();
                           if(back_act===""){
						   	window.location.href="index.php";
						   }else{
							window.location.href=back_act;
							
							}
							},1000);
                         break; 
                        case 2:
						  $(".msgmiao_login").addClass("err_msg").show().html("请输入BOLON账号!");
						// showTip($(".bl_email"),"请输入BOLON账号。");
                       
		     
						  break;
					    case 3:
			               $(".msgmiao_login").addClass("err_msg").show().html("邮箱或密码错误，登录失败!");
                        //   $(".miao_login").html("<span class='ti_error'>邮箱或密码错误，登录失败!</span>").show();
						
                         break; 
					      case 4:
						     $(".msgmiao_login").addClass("err_msg").show().html("BOLON账号格试不正确!");
						   //showTip($(".bl_email"),"BOLON账号格试不正确。");
                           break; 
						   	   case 5:
							   					     $(".msgmiao_login").addClass("err_msg").show().html("请输入登录密码!");
						   // showTip($(".bl_password"),"请输入登录密码。");
                          
							
                           break; 
						   
                        default:
					      $(".msgmiao_login").addClass("err_msg").show().html("系统错误，刷新后重试!");
						  //$(".miao_login").html("<span class='ti_error'>系统错误，刷新后重试!</span>").show();
				
					
    
			  
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

