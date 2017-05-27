jQuery(function(){


var newpass="";

$(".newpass").bind("blur",function(){
 if($(this).val().Trim()==""){
 
	 $(".frogetmsg").addClass("err_msg").html("*请输入新密码!").show();
 }else{
yznewPass();
 }
});

 
function yznewPass(){
  newpass=$(".newpass").val();
if(newpass.Trim()===""){
	 $(".frogetmsg").addClass("err_msg").html("*新密码不能为空!").show();
  
    return false;
  }else{
   if(newpass.Trim().length<6){
   	 $(".frogetmsg").addClass("err_msg").html("*新密码不能少于 6 个字符!").show();
  
       return false;
   }else{
	 $(".frogetmsg").hide();
 
  return true;
  }
  }


}

var confirmpass="";
$(".confirmpass").bind("blur",function(){
 if($(this).val().Trim()==""){
	 
	  	 $(".frogetmsg").addClass("err_msg").html("*请输入确认密码!").show();
 

 }else{
yzComparePass();
 }
});

 

function yzComparePass(){
  confirmpass=$(".confirmpass").val();
  if(confirmpass.Trim()===""){
	  
	   $(".frogetmsg").addClass("err_msg").html("*确认密码不能为空!").show();
 
       return false;

  
  }else{
  
     if(confirmpass===newpass){
  $(".frogetmsg").hide();
	   return true;
	 }else{
		 	   $(".frogetmsg").addClass("err_msg").html("*两次输入密码不一致!").show();
 
	      return false;
	 }

  }


}



 
 
 $(".EditBassBtn").click(function(){

	submitPass();

 });
 
 
 
 var isload=true;
 function submitPass(){
 
 	   if(!yznewPass()){
    return false;
    }
   if(!yzComparePass()){
       return false;
   }
  var uid=$(".uid").val();
  
  var code=$(".code").val();
  var laddrs2=$( '#button' ).ladda();	 
   if(isload){
   
   
   	       $.ajax({
                type: 'POST',
                url: 'user.php',
				
                data:{
				    npassword:newpass,
					cpassword:confirmpass,
					uid:uid,
					code:code,
					token:token,
					timestamp:timestamp,
					act:"act_forget_edit_password"
					
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				    isload=false;
									laddrs2.ladda("restart");
                },
                success: function(data){
							laddrs2.ladda("stop");
			     $(".frogetmsg").hide();
			           switch(data.err){
				   
				     case 0:
					   $(".frogetmsg").addClass("err_msg").html("*新密码不能少于 6 个字符!").show();
					 
					    paload=true;
					 break;
			
					   case 1:
					   			   $(".frogetmsg").removeClass("err_msg").html("密码修改成功，请重新登录!").show();
 
						    paload=false;
						  setTimeout(function(){
						   $(".frogetmsg").hide();
							location.href="user.php?act=login";
						    paload=false;
						  },2000)
					 break;
					 
					 
					   case 2:
					     $(".frogetmsg").addClass("err_msg").html("*密码修改失败!").show();
		 
					   paload=true;
					 break;
					 	   case 3:
						     $(".frogetmsg").addClass("err_msg").html("*两次输入密码不一致!").show();
 
					   paload=true;
					 break;
			 	 	   case 6:
					      $(".frogetmsg").addClass("err_msg").html("*验证信息非法!").show();
 
					   paload=true;
					 break;
					 case "ver_err":
					       $(".frogetmsg").addClass("err_msg").html("*验证失败，请重试!").show();
 
					 break;
						 default:
						    $(".frogetmsg").addClass("err_msg").html("*系统错误,请刷新后重试!").show();
  
						 
				   
				   
				   
				   }
                  
                  
		
                }
            });
   
   
   }
 
 
 }
 
 
 
 
 });
 
 
 
