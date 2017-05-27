jQuery(function(){


function showTip(obj,msg){
  
   $(".miao_yin_t").html(""+msg);
   $(".miao_yin").css({top:obj.offset().top-obj.outerHeight()-($(".miao_yin").outerHeight())/2+10,left:obj.offset().left+obj.width()/2-$(".miao_yin").width()/2}).fadeIn();

}

function hideTip(obj){

   $(".miao_yin_t").html("");
   $(".miao_yin").css({top:0,left:0}).hide();

}


var newpass="";

$(".newpass").bind("focus keyup",function(){
 if($(this).val().Trim()==""){
   showTip($(this),"请输入新密码。");

 }else{
   hideTip($(this));
 }
});

$(".newpass").blur(function(e){
 
  yznewPass();
 e.stopPropagation();
});
function yznewPass(){
  newpass=$(".newpass").val();
if(newpass.Trim()===""){
showTip($(".newpass"),"新密码不能为空。");
  // $(".newpass-false-pic").html('新密码不能为空').show();
    return false;
  }else{
   if(newpass.Trim().length<6){
   
showTip($(".newpass"),"新密码不能少于 6 个字符。");
  // $(".newpass-false-pic").html('新密码不能少于 6 个字符').show();
       return false;
   }else{
hideTip($(".newpass"));
  //$(".newpass-false-pic").html('').hide();
  return true;
  }
  }


}


$(".confirmpass").bind("focus keyup",function(){
 if($(this).val().Trim()==""){
   showTip($(this),"请输入确认密码。");

 }else{
   hideTip($(this));
 }
});
var confirmpass="";
$(".confirmpass").blur(function(e){

 yzComparePass();
   
 e.stopPropagation();
});

function yzComparePass(){
  confirmpass=$(".confirmpass").val();
  if(confirmpass.Trim()===""){
 showTip($(".confirmpass"),"确认密码不能为空。");
  // $(".confirm-pass-false").html('确认密码不能为空').show();
       return false;

  
  }else{
  
     if(confirmpass===newpass){
hideTip($(".confirmpass"));
       //$(".confirm-pass-false").html('').hide();
	   return true;
	 }else{
 showTip($(".confirmpass"),"两次输入密码不一致。");
	  //$(".confirm-pass-false").html('两次输入密码不一致').show();
	      return false;
	 }

  }


}



 
 
 $(".EditBassBtn").click(function(){

	submitPass();

 });
 
 
 	function keyUp(e) { 
　　       　  var currKey=0,e=e || event;
　　      　   currKey=e.keyCode || e.which || e.charCode;
　　       　 if(currKey===13){
              
			submitPass();

              }
  }
　document.onkeyup = keyUp;
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
					$(".submit_state").empty().show().html("表单正在提交...");
                },
                success: function(data){
			     $(".submit_state").hide();
			           switch(data.err){
				   
				     case 0:
					 showTip($(".newpass"),"新密码不能少于 6 个字符。");
					   //$(".pass_state").empty().show().html("<span class='ti_error'>新密码不能少于 6 个字符!</span>");
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
			 	 	   case 6:
					  $(".pass_state").empty().show().html("<span class='ti_error'>验证信息非法!</span>");
					   paload=true;
					 break;
					 case "ver_err":
					  $(".pass_state").empty().show().html("<span class='ti_error'>验证失败，请重试!</span>");
					 break;
						 default:
						$(".pass_state").empty().show().html("<span class='ti_error'>系统错误,请刷新后重试!</span>");
						 
				   
				   
				   
				   }
                  
                  
		
                }
            });
   
   
   }
 
 
 }
 
 
 
 
 });
 
 
 
