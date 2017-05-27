jQuery(function(){

var state=1;
var telephone="";
var email="";
var name="";

var surname="";

var qq="";


function yzname(){
  name=$(".account_name").val();
  if(name.Trim()===""){
   $(".true_username_false").html("<span class='ti_error'>名不能为空!</span>").show();
	return false;
  }
  
   $(".true_username_false").empty().hide();
   return true;

}


$(".account_name").focusout(function(){
yzname();

});



function yzsurname(){
  surname=$(".surname").val();
  if(surname.Trim()===""){

   $(".true_surname_false").html("<span class='ti_error'>姓不能为空!</span>").show();
	return false;
  }
  
   $(".true_surname_false").empty().hide();
   return true;

}


$(".surname").focusout(function(){
yzsurname();

});


 
 /*$(".qq_number").keyup(function(){  

        $(this).val($(this).val().replace(/\D|^0/g,''));  

    }).bind("paste",function(){

        $(this).val($(this).val().replace(/\D|^0/g,''));  

    });
	
	
	function yzqq(){
  qq=$(".qq_number").val();
  if(qq.Trim()===""){
      $(".qq_true").hide();
   $(".qq_false").show();
	return false;
  }
  
     $(".qq_true").show();
   $(".qq_false").hide();
   return true;

}


$(".qq_number").focusout(function(){
yzqq();

});*/



function yzemail(){
   email=$(".emails").val();
  if(email.Trim()===""){
       $(".email_true").hide();
   $(".email_false").html("<span class='ti_error'>邮箱不能为空！</span>").show();
    return false;
  }else{
  
	 var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   if(!filter.test(email.Trim())){

	   $(".email_true").hide();
   $(".email_false").html("<span class='ti_error'>邮箱格式不正确！</span>").show();
    return false;

   }else{
   
	   $(".email_true").show();
   $(".email_false").hide();
     return true;
   }
   
   
  }


}

var  n_email='';

function nemail(){
   n_email=$(".n_email").val();
  if(n_email.Trim()===""){

   $(".n_email_false").html("<span class='ti_error'>新邮箱不能为空！</span>").show();
    return false;
  }else{
  
	 var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   if(!filter.test(n_email.Trim())){

   $(".n_email_false").html("<span class='ti_error'>新邮箱格式不正确！</span>").show();
    return false;

   }else{
   
   $(".n_email_false").hide();
     return true;
   }
   
   
  }


}
$(".n_email").focusout(function(){
nemail();

});



var c_email='';
function cemail(){
   c_email=$(".c_email").val();
  if(c_email.Trim()===""){

   $(".c_email_false").html("<span class='ti_error'>新邮箱不能为空！</span>").show();
    return false;
  }else{
  
	 var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   if(!filter.test(c_email.Trim())){

   $(".c_email_false").html("<span class='ti_error'>新邮箱格式不正确！</span>").show();
    return false;

   }else{
   
     if(c_email!==n_email){
	 
	      $(".c_email_false").html("<span class='ti_error'>两次输入邮件不一致!</span>").show();
     return false;
	 }else{
	    $(".c_email_false").hide();
     return true;
	 }
   

   }
   
   
  }


}
$(".c_email").focusout(function(){
cemail();

});

var x_password="";
function xpassword(){
  x_password=$(".x_password").val();
if(x_password.Trim()===""){

   $(".xpass-false-pic").html('<span class="ti_error">现有密码不能为空</span>').show();
    return false;
  }else{
  
  $(".xpass-false-pic").html('').hide();
  return true;
  
  }
  
  


}

$(".x_password").focusout(function(){
xpassword();

});

function yzTelephone(){
  telephone=$(".tel").val();
  if(telephone.Trim()===""){
  	   $(".tel_true").hide();
   $(".tel_false").show().html("电话/手机号码不能为空！");

    return false;
  }else{

   if(!telephone.Trim().isMobile()){
     $(".tel_true").hide();
     $(".tel_false").show().html("电话/手机号码格式不正确！");

    return false;

   }else{
        $(".tel_true").show();
     $(".tel_false").hide();
     return true;
   
   }
   
   
  }


}

$(".tel").focusout(function(){
yzTelephone();

});

 $(".miao_xin_but").click(function(){
     if($(this).hasClass("save_profile")){
     submitUser();
	 
	 }else if($(this).hasClass("save_account_profile")){
	 
	  submitAccountUser();
	 
	 }
 });
 
 
 	function keyUp(e) { 
　　       　  var currKey=0,e=e || event;
　　      　   currKey=e.keyCode || e.which || e.charCode;
　　       　 if(currKey===13){
              
			    if($(".miao_xin_but").hasClass("save_profile")){
     submitUser();
	 
	 }else if($(".miao_xin_but").hasClass("save_account_profile")){
	  submitAccountUser();
	 
	 }

              }
  }
　document.onkeyup = keyUp;
 
 var isload=true;
 function submitUser(){
 
 

   
   
   
   

 
   if(!yzname()){
   
     return false;
   }
   
   
   if(!yzsurname()){
   
     return false;
   }
      if(!yzemail()){
   
     return false;
   }
   
   if(isload){
   
   
   	       $.ajax({
                type: 'POST',
                url: 'user.php',
				
                data:{
				    name:name,
					email:email,
                    surname:surname,
					token:token,
					timestamp:timestamp,
					act:"act_edit_profile"
					
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				    isload=false;
					$(".submit_state").empty().show().html("表单正在提交...");
                },
                success: function(data){
			     
			       switch(data.err){
				   
				     case 1:
					   $(".submit_state").empty().show().html("<span class='ti_error'>名不能为空!</span>");
					    isload=true;
					 break;
			
					   case 2:
					  $(".submit_state").empty().show().html("<span class='ti_error'>姓不能为空!</span>");
					   isload=true;
					 break;
					 
					 
					   case 3:
					  $(".submit_state").empty().show().html("<span class='ti_error'>邮箱格式不正确!</span>");
					   isload=true;
					 break;
					 
					 
					   case 4:
					 	  $(".submit_state").empty().show().html("<span class='ti_error'>邮箱地址已经存在!</span>");
					   isload=true;
					 break;
					 
					 
					   case 5:
					 	  $(".submit_state").empty().show().html("<span class='ti_error'>提交失败!</span>");
					   isload=true;
					 break;
					 
					 	   case 6:
					 	  $(".submit_state").empty().show().html("保存成功!");
						  $(".mybl_b").empty().html(surname+name);
						    isload=false;
						  setTimeout(function(){
						    $(".submit_state").empty().hide();
						    isload=true;
						  },2000)
					    
					     break;
						 	   case 7:
					 	  $(".submit_state").empty().show().html("<span class='ti_error'>验证失败!</span>");
					   isload=true;
					 break;
						 default:
						$(".submit_state").empty().show().html("<span class='ti_error'>系统错误,请刷新后重试!</span>");
						 
				   
				   
				   
				   }
                  
		
                }
            });
   
   
   }
     /* if(!yzqq()){
   
     return false;
   }*/
   

  /* if(!yzTelephone()){
   
     return false;
   }*/
   





 // document.formEdit.submit();
 
 
 }
 

 
  var isload=true;
 function submitAccountUser(){
 
 
   if(!yzname()){
   
     return false;
   }
   
   
   if(!yzsurname()){
   
     return false;
   }
      if(!yzemail()){
   
     return false;
   }
   
   
      if(!cemail()){
   
     return false;
   }
   
   if(!nemail()){
   
     return false;
   }
   
  if(!xpassword()){
    return false;
  }
   if(isload){
   
   
   	       $.ajax({
                type: 'POST',
                url: 'user.php',
				
                data:{
				    name:name,
					 surname:surname,
					email:email,
					cemail:c_email,
					nemail:n_email,
					password:x_password,
                   					token:token,
					timestamp:timestamp,
					act:"act_edit_account"
					
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				    isload=false;
					$(".submit_state").empty().show().html("表单正在提交...");
                },
                success: function(data){
			     
			       switch(data.err){
				   
				     case 1:
					   $(".submit_state").empty().show().html("<span class='ti_error'>名不能为空!</span>");
					    isload=true;
					 break;
			
					   case 2:
					  $(".submit_state").empty().show().html("<span class='ti_error'>姓不能为空!</span>");
					   isload=true;
					 break;
					 
					 
					   case 3:
					  $(".submit_state").empty().show().html("<span class='ti_error'>邮箱格式不正确!</span>");
					   isload=true;
					 break;
					 
					 
					   case 4:
					 	  $(".submit_state").empty().show().html("<span class='ti_error'>邮箱地址已经存在!</span>");
					   isload=true;
					 break;
					 
					 
					   case 5:
					 	  $(".submit_state").empty().show().html("<span class='ti_error'>提交失败!</span>");
					   isload=true;
					 break;
					 
					 	   case 6:
					 	  $(".submit_state").empty().show().html("修改成功,请重新登录!");
						    isload=false;
						  setTimeout(function(){
						    $(".submit_state").empty().hide();
						    isload=false;
							location.href="user.php?act=login"
						  },1000)
					    
					     break;
						 
						     case 7:
					   $(".submit_state").empty().show().html("<span class='ti_error'>新邮箱格式不正确!</span>");
					    isload=true;
					 break;
					 
					 
					 	     case 8:
					   $(".submit_state").empty().show().html("<span class='ti_error'>确认邮箱格式不正确!</span>");
					    isload=true;
					 break;
					 
					 	 	     case 9:
					   $(".submit_state").empty().show().html("<span class='ti_error'>两次输入邮件地址不一致!</span>");
					    isload=true;
					 break;
					 
					 	 	 	     case 10:
					   $(".submit_state").empty().show().html("<span class='ti_error'>现有密码输入不正确!</span>");
					    isload=true;
					 break;
						  	 	 	     case 11:
					   $(".submit_state").empty().show().html("<span class='ti_error'>新邮件地址已存在!</span>");
					    isload=true;
					 break;
					 
					 case "ver_err":
					    $(".submit_state").empty().show().html("<span class='ti_error'>验证失败!</span>");
					    isload=true;
					 
					 break;
					 
					 	 	   case 12:
					 	  $(".submit_state").empty().show().html("您没登录，请先登录!");
						    isload=false;
						  setTimeout(function(){
						    $(".submit_state").empty().hide();
						    isload=false;
							location.href="user.php?act=login"
						  },1000)
					    
					     break;
						 default:
						$(".submit_state").empty().show().html("<span class='ti_error'>系统错误,请刷新后重试!</span>");
						 
				   
				   
				   
				   }
                  
		
                }
            });
   
   
   }

 }
 
 

 $(".edit_account").click(function(){
 
 var xwh=$(".e_emial_contain >.miao_xinx_wrap").length*(parseInt($(".miao_xinx_wrap").outerHeight())+parseInt($(".e_emial_contain >.miao_xinx_wrap").css("marginBottom")));
 if($(this).hasClass("has_off")){
 $(".e_emial_contain").stop().animate({height:xwh},500);
 $(this).removeClass("has_off").addClass("has_on");
 $(".edit_account").empty().html("取消修改登录电邮地址");
 $(".miao_xin_but").removeClass("save_profile").addClass("save_account_profile");
 $(".c_email").val("");
$(".n_email").val("");
$(".x_password").val("");
$(".ti_error").html("");
 }else{
  $(".e_emial_contain").stop().animate({height:0},500);
 $(this).removeClass("has_on").addClass("has_off");
  $(".edit_account").empty().html("修改登录电邮地址");
   $(".miao_xin_but").removeClass("save_account_profile").addClass("save_profile");
 }

 });

 var newpass="";

var pass="";

$(".pass").focusout(function(e){
 
  yzPass();
 e.stopPropagation();
});
function yzPass(){
  pass=$(".pass").val();
if(pass.Trim()===""){

   $(".pass-false-pic").html('<span class="ti_error">现有密码不能为空</span>').show();
    return false;
  }else{
  
  $(".pass-false-pic").html('').hide();
  return true;
  
  }
  
  


}

$(".newpass").focusout(function(e){
 
  yznewPass();
 e.stopPropagation();
});
function yznewPass(){
  newpass=$(".newpass").val();
if(newpass.Trim()===""){

   $(".newpass-false-pic").html('<span class="ti_error">新密码不能为空</span>').show();
    return false;
  }else{
   if(newpass.Trim().length<6){
   

   $(".newpass-false-pic").html('<span class="ti_error">新密码不能少于 6 个字符</span>').show();
       return false;
   }else{

  $(".newpass-false-pic").html('').hide();
  return true;
  }
  }


}
var confirmpass="";
$(".confirm-password").focusout(function(e){

 yzComparePass();
   
 e.stopPropagation();
});

function yzComparePass(){
  confirmpass=$(".confirm-password").val();
  if(confirmpass.Trim()===""){
   $(".confirm-pass-false").html('<span class="ti_error">确认密码不能为空</span>').show();
       return false;

  
  }else{
  
     if(confirmpass===newpass){

       $(".confirm-pass-false").html('').hide();
	   return true;
	 }else{

	  $(".confirm-pass-false").html('<span class="ti_error">两次输入密码不一致</span>').show();
	      return false;
	 }

  }


}



 
 
 $(".submit_pass").click(function(){

	submitPass();

 });
 
 
var paload=true;
 
 function submitPass(){
 
 
   if(!yzPass()){
   
    return false;
   }
 	   if(!yznewPass()){
    return false;
    }
   if(!yzComparePass()){
       return false;
   }

   if(paload){
   	       $.ajax({
                type: 'POST',
                url: 'user.php',
				
                data:{
				    password:pass,
					npassword:newpass,
                    cpassword:confirmpass,
					token:token,
					timestamp:timestamp,
					act:"act_edit_password"
					
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				    paload=false;
					$(".pass_state").empty().show().html("表单正在提交...");
                },
                success: function(data){
			     
			       switch(data.err){
				   
				     case 0:
					   $(".pass_state").empty().show().html("<span class='ti_error'>新密码不能少于 6 个字符!</span>");
					    paload=true;
					 break;
			
					   case 1:
					  	  $(".pass_state").empty().show().html("密码修改成功，请重新登录!");
						    paload=false;
						  setTimeout(function(){
						    $(".pass_state").empty().hide();
							location.href="user.php?act=login";
						    paload=false;
						  },2000)
					 break;
					 
					 
					   case 2:
					  $(".pass_state").empty().show().html("<span class='ti_error'>密码修改失败!</span>");
					   paload=true;
					 break;
					 	   case 3:
					  $(".pass_state").empty().show().html("<span class='ti_error'>两次输入密码不一致!</span>");
					   paload=true;
					 break;
			 	    case 4:
					  $(".pass_state").empty().show().html("<span class='ti_error'>原密码不能为空!</span>");
					   paload=true;
					 break;
						  case 5:
					  $(".pass_state").empty().show().html("<span class='ti_error'>原密码输入不正确!</span>");
					   paload=true;
					 break; 
					 
					 case "ver_err":
					 	  $(".pass_state").empty().show().html("<span class='ti_error'>验证失败!</span>");
					   paload=true;
					 break;
						 default:
						$(".pass_state").empty().show().html("<span class='ti_error'>系统错误,请刷新后重试!</span>");
						 
				   
				   
				   
				   }
                  
		
                }
            });

   }
 
 }
 
 

  
 

});






 
String.prototype.Trim = function() {
var m = this.match(/^\s*(\S+(\s+\S+)*)\s*$/);
return (m == null) ? "" : m[1];
}
String.prototype.isMobile = function() {
return (/(^[0-9]{3,4}\-[0-9]{7}$)|(^[0-9]{7}$)|(^[0-9]{3,4}[0-9]{7}$)|(^1[3-8]+\d{9}$)/.test(this.Trim()));
}