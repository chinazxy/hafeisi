$(function(){
var bl_email="";
var bl_password="";
$(".bl_email").val("");
$(".bl_password").val("");
function showTip(obj,msg){
  
   $(".miao_yin_t").html(""+msg);
   $(".miao_yin").css({top:obj.offset().top-obj.outerHeight()-($(".miao_yin").outerHeight())/2+10-parseInt($(".gz_contain").css("marginTop")),left:obj.offset().left+obj.width()/2-$(".miao_yin").width()/2}).fadeIn();

}

function hideTip(obj){

   $(".miao_yin_t").html("");
   $(".miao_yin").css({top:0,left:0}).hide();
$(".miao_login").hide();
}

$(".bl_email").bind("focusout blur",function(){

bolon_email();

});

$(".bl_email").bind("focus",function(){
$(this).prev().css("color","#ccc");
});

$(".bl_email").bind("keyup",function(){
hideTip();
if($(this).val().Trim()!=""){
$(this).prev().hide();
}else{
$(this).prev().show();
}
});

$(window).bind("resize",function(){
	
loginH();	
});

loginH();
function loginH(){
	
		var bh=$(window).height();
		
		$(".gpage").height(bh);
	
}
	
	
function bolon_email(){
  bl_email=$(".bl_email").val();
  if(bl_email.Trim()===""){
       showTip($(".bl_email"),"请输入BOLON账号。");
    return false;
  }else{
  
	 var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   if(!filter.test(bl_email.Trim())){
  showTip($(".bl_email"),"BOLON账号格式不正确。");
	 
    return false;

   }else{
   
	hideTip($(".bl_email"));
     return true;
   }
   
   
  }


}
	
	




	
	function bl_validatePassword(){

bl_password=$(".bl_password").val();

if(bl_password.Trim()===""){
 showTip($(".bl_password"),"请输入登录密码。");
  $(".bl_password").val("");
 return false;
}else{
   hideTip($(".bl_password"));
 return true;
}

}

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


$(".bl_password").bind("focusout blur",function(){
    bl_validatePassword();
});
	
	
	$(".bl_login_ajax_submit").click(function(){
	
	
	
      	bl_submitLogin();
	});
	
	
	function bl_submitLogin(){
	
	 if(!bolon_email()){
	  
	   return false;
	 
	 }
	 
	 if(!bl_validatePassword()){
	  
	   return false;
	 
	 }
	 

	
	
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
				  	$(".miao_login").empty().show().html("表单正在提交...");
                },
                success: function(data){
				    $(".miao_login").empty().hide();
              
               
                		    switch(data.error){
					 
					   
                        case 1:
						    var back_act=$(".back_act").val();
						   
                            $(".miao_login").html("登录成功!").show();
							setTimeout(function(){
							
							$(".miao_login").hide();
                           if(back_act===""){
						   	window.location.href="index.php";
						   }else{
							window.location.href=back_act;
							
							}
							},1000);
                         break; 
                        case 2:
						
						 showTip($(".bl_email"),"请输入BOLON账号。");
                       
		     
						  break;
					    case 3:
			              
                           $(".miao_login").html("<span class='ti_error'>邮箱或密码错误，登录失败!</span>").show();
						
                         break; 
					      case 4:
						   showTip($(".bl_email"),"BOLON账号格试不正确。");
                           break; 
						   	   case 5:
						    showTip($(".bl_password"),"请输入登录密码。");
                          
							
                           break; 
						   
                        default:
						hideTip();
						  $(".miao_login").html("<span class='ti_error'>系统错误，刷新后重试!</span>").show();
				
					
    
			  
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

