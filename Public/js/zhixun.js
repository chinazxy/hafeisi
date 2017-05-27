$(function(){
var name="";
/*$(".name").focusout(function(){
 name=$(this).val();
 if(name.Trim()===""){
 
   alert("姓名不能为空!");
   
 $(".name").focus();
   
   return false;
 
 }

});

var sex=$(".sex").val();

var email="";

$(".email").focusout(function(){
  email=$(this).val();
 if(email.Trim()===""){
 
   alert("邮箱不能为空!");
   
 $(".email").focus();
   
   return false;
 
 }else{
 
 	   var _reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	   if (!_reg.test($(".email").val().Trim())) {
	    
	 alert("电子邮件格式不正确！");
	 	  $(".email").focus();
	    return false;
			
		}
 
 
 }

});

var telephone="";

$(".telephone").focusout(function(){
telephone=$(this).val();
if(telephone.Trim()===""){
   alert("联系号码不能为空!");
   
     $(".telephone").focus();
   
   return false;

}else{

  var _reg =/^1[3-8]+\d{9}$/;
    
	
  
   if (_reg.test($(".telephone").val().Trim())) {
    
    }else{
	
	   
        alert("联系号码格式不正确!");
		  return false;
	}

}


});


var title="";

$(".msgtitle").focusout(function(){

title=$(".msgtitle").val();

if(msgtitle.Trim()===""){

alert("标题不能为空!");

return false;

$(".title").focus();

}

});



var content="";

$(".content").focusout(function(){

content=$(".content").val();

if(content.Trim()===""){

alert("留言内容不能为空!");

return false;
$(".content").focus();

}

});*/

var substate=true;
$(".reset").click(function(){

$(".zhixun").attr("checked",false);
$(".zhixun").eq(0).attr("checked",true);

$(".sex").attr("checked",false);
$(".sex").eq(0).attr("checked",true);
$(".name").val("");
$(".email").val("");
$(".telephone").val("");
$(".msgtitle").val("");
$(".msg_content").val("");


});


$(".submit").click(function(){


 name=$(".name").val();
 if(name.Trim()===""){
 
   alert("姓名不能为空!");
   
 $(".name").focus();
   
   return false;
 
 }



var sex=$('input[name="sex"]:checked').val();

var email="";


  email=$(".email").val();
 if(email.Trim()===""){
 
   alert("邮箱不能为空!");
   
 $(".email").focus();
   
   return false;
 
 }else{
 
 	   var _reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	   if (!_reg.test($(".email").val().Trim())) {
	    
	 alert("电子邮件格式不正确！");
	 	  $(".email").focus();
	    return false;
			
		}
 
 
 }



var telephone="";


telephone=$(".telephone").val();
if(telephone.Trim()===""){
   alert("联系号码不能为空!");
   
     $(".telephone").focus();
   
   return false;

}else{

  var _reg =/^1[3-8]+\d{9}$/;
    
	
  
   if (_reg.test($(".telephone").val().Trim())) {
    
    }else{
	
	   
        alert("联系号码格式不正确!");
		 $(".telephone").focus();
		  return false;
	}

}





var title="";


title=$(".msgtitle").val();

if(title.Trim()===""){

alert("标题不能为空!");

$(".msgtitle").focus();
return false;


}





var content="";


content=$(".msg_content").val();

if(content.Trim()===""){

alert("留言内容不能为空!");
$(".msg_content").focus();

return false;

}

var zhixun=$('input[name="zhixun"]:checked').val();

if(substate){

  $.ajax({
                type: 'POST',
                url: 'live_zixun.php',
                data:{
				    name:name,
					sex:sex,
                    email:email,
					telephone:telephone,
					title:title,
					content:content,
					zhixun:zhixun,
					act:"submit_info"
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				    $(".tijiao_false").hide();
                    $(".tijiao_true").html("数据提交中，请稍等...").show();
                },
                success: function(data){
				
                     switch(data.err){
					 
					   
                        case "name_empty":
						  $(".tijiao_false").html("姓名不能为空!").show();
                         $(".tijiao_true").html("").hide();
						 substate=true;
            
                         break; 
                        case "email_empty":
						  $(".tijiao_false").html("邮箱不能为空!").show();
                         $(".tijiao_true").html("").hide();
                    substate=true;
						  break;
					    case "email_format":
							  $(".tijiao_false").html("邮箱格式不正确!").show();
                         $(".tijiao_true").html("").hide();
			            substate=true;
                         break; 
						 
						 case "title_empty":
						 		  $(".tijiao_false").html("标题不能为空!").show();
                         $(".tijiao_true").html("").hide();
					 substate=true;
						 break;
						 
						 	 case "save_fail":
							 	  $(".tijiao_false").html("提交失败!").show();
                         $(".tijiao_true").html("").hide();
					 substate=true;
						 break;
						 
						 		 	 case "submit_false":
							 	  $(".tijiao_false").html("您已提交过，请不要重复提交!").show();
                         $(".tijiao_true").html("").hide();
					 substate=true;
						 break;
						 
						 	 	 case "save_ok":
								    $(".tijiao_false").hide();
                    $(".tijiao_true").html("数据提交成功!").show();
						  substate=false;
						 break;
				
						   
                        default:
						alert("系统错误，刷新后重试！");
						 substate=true;
					
    
			  
                    }
		
                }
            });


   }else{
   
    	  $(".tijiao_false").html("您已提交过，请不要重复提交!").show();
                         $(".tijiao_true").html("").hide();
   }



});






});