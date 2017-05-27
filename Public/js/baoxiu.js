$(function(){

var substate=true;
$(".catergory").change(function(){

 var cid=$(this).val();
  $(".children_c").remove();
 if(cid>0){
 
 changCate(cid);
 }else{
   $(".category_childre option").not($(".category_childre option").eq(0)).remove();
 }


});


$(".category_childre").change(function(){

 var tid=$(this).val();
   $(".children_c").remove();
 if(tid>0){
 
 getChildren(tid);
 
 }else{
   //$(".category_childre option").not($(".category_childre option").eq(0)).remove();
 }


});

$(".back_url").click(function(){

location.href="server.php";

});




function changCate(id){

   if(id>0){
    
	  
  $.ajax({
                type: 'POST',
                url: 'baoxiu.php',
                data:{
				    cat_id:id,
			
					act:"chang_cat"
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				   
                },
                success: function(data){
				
                     switch(data.err){
					 
					   
                         case "ok":
						  $(".category_childre option").not($(".category_childre option").eq(0)).remove();
						  $(".category_childre option").eq(0).after(data.html);
            
                         break;
             
				
						   
                        default:
						alert("系统错误，刷新后重试！");
						 substate=true;
					
    
			  
                    }
		
                }
            });
   
   }else{
   
    alert("非法操作!");
   
   }


}


function getChildren(id){

  if(id>0){
    
	  
  $.ajax({
                type: 'POST',
                url: 'baoxiu.php',
                data:{
				    cat_id:id,
					act:"chang_children"
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				   
                },
                success: function(data){
				
                      if(data.count>0){
					  
					  $(".categroy_c").after(data.html);
					  }else{
					  $(".children_c").remove();
					  }
		
                }
            });
   
   }else{
   
    alert("非法操作!");
   
   }

}
var bao_txt="";
$(".bao_txt").keyup(function(){

 bao_txt=$(this).val();
 
 var slens=bao_txt.getStringLen();
 
 if(slens>=200){
 
 var strs=SetSub(bao_txt,200);
 
 $(this).val(strs);
 $(".font_num").html(0);
  
 }else{
 
 $(".font_num").html(200-slens);
 }


});


$(".submit").click(function(){

var catergory=$(".catergory").val();

var category_childre=$(".category_childre").val();

var children_c=$(".children_s").val();


if(catergory==0 || category_childre==0){

  alert("请选择产品类型");
  return false;
}

var server_time=$(".server_time").val();

if(server_time.Trim()===""){
  // $(".server_time").focus();
   
   alert("请选择联系服务时间!");
   

   return false;
}

var buy_time=$(".buy_time").val();

if(buy_time.Trim()===""){
 // $(".buy_time").focus();
   alert("请选择购买日期!");
   

   
   return false;
}


if(bao_txt===""){


   alert("请填写眼镜损坏描述!");
   
  $(".bao_txt").focus();
   
   return false;

}




 var name=$(".name").val();
 if(name.Trim()===""){
 
   alert("请填写用户姓名!");
   
 $(".name").focus();
   
   return false;
 
 }
 
 var selProvince=$("#selProvince").val();
 
 if(selProvince<=0){
     $("#selProvince").focus();
  alert("请选择您所在的省份!");
   return false;
 
 }
 
var selCity=0;

selCity=$("#selCities").val();
 
 if(selCity<=0){
  
$("#selCities").focus();
    alert("请选择您所在的地市!");
   return false;
 
 }
 
 var selDistricts=$("#selDistricts").val();
 
 var address=$(".d_address").val();
 if(address.Trim()===""){
 
   alert("请填写详细地址!");
   
 $(".d_address").focus();
   
   return false;
 
 }
 

var telephone=$(".telephone").val();
if(telephone.Trim()===""){
   alert("请填写手机号码!");
   
     $(".telephone").focus();
   
   return false;

}else{

  var _reg =/^1[3-8]+\d{9}$/;
    
	
  
   if (_reg.test($(".telephone").val().Trim())) {
    
    }else{
	
	   
        alert("手机号码格式不正确!");
		 $(".telephone").focus();
		  return false;
	}

}

var phone_q=$(".phone_q").val();

var phone_h=$(".phone_h").val();

var phones=phone_q+"-"+phone_h;

if(phone_q.Trim()!="" && phone_h.Trim()!=""){

  if(!istell(phones)){
  
    alert("电话号码格式不正确!");
	$(".phone_q").focus();
	return false;
  
  }
  
  
  

}

var post=$(".post").val();



var paoxiutime=$('input[name="paoxiutime"]:checked').val();

if(substate){

  $.ajax({
                type: 'POST',
                url: 'baoxiu.php',
                data:{
				    catergory:catergory,
					category_c:category_childre,
                    children_s:children_c,
					server_time:server_time,
					buy_time:buy_time,
					paoxiutime:paoxiutime,
					bao_txt:bao_txt,
					name:name,
					province:selProvince,
					city:selCity,
					districts:selDistricts,
					address:address,
					telephone:telephone,
					phones:phones,
					post:post,
					act:"submit_info"
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				    $(".tijiao_false").hide();
                    $(".tijiao_true").html("数据提交中，请稍等...").show();
                },
                success: function(data){
				   
                     switch(data.err){
					 
					   
                        case 0:
						  $(".tijiao_false").html("您未选择产品类型!").show();
                          $(".tijiao_true").html("").hide();
						 substate=true;
            
                         break; 
                        case 1:
						  $(".tijiao_false").html("您未选择产品类型!").show();
                          $(".tijiao_true").html("").hide();
						 substate=true;
                  
						  break;
					    case 3:
							  $(".tijiao_false").html("您未填写联系服务时间!").show();
                         $(".tijiao_true").html("").hide();
			            substate=true;
                         break; 
						 
						 case 4:
						 		  $(".tijiao_false").html("您未填写购买日期!").show();
                         $(".tijiao_true").html("").hide();
					 substate=true;
						 break;
						 
						 	 case 5:
							 	  $(".tijiao_false").html("您未填写眼镜损坏描述!").show();
                         $(".tijiao_true").html("").hide();
					 substate=true;
						 break;
						 
						 		 	 case 6:
							 	  $(".tijiao_false").html("您未填写用户姓名!").show();
                         $(".tijiao_true").html("").hide();
					 substate=true;
						 break;
						 
						 	 	 case 7:
								 
								 	  $(".tijiao_false").html("您未选择所在城市!").show();
                         $(".tijiao_true").html("").hide();
								
						 substate=true;
						 break;
						 
						  	 case 8:
						
							 	  $(".tijiao_false").html("您未选择所在城市!").show();
                         $(".tijiao_true").html("").hide();
					
						 substate=true;
						 break;
						 
						 		  	 case 9:
										 	  $(".tijiao_false").html("您未填写详细地址!").show();
                         $(".tijiao_true").html("").hide();	 
									 
							
						 substate=true;
						 break;
						 
						 		 		  	 case 10:
					
											 	  $(".tijiao_false").html("您未填写手机号码!").show();
                         $(".tijiao_true").html("").hide();	 
						 substate=true;
						 break;
						 
						 case 11:
							    $(".tijiao_false").hide();
                    $(".tijiao_true").html("数据提交成功!").show();
						  substate=false;
						
						 break;
						 
						 			 		 		  	 case 12:
						 $(".tijiao_false").html("数据提交失败!").show();
                         $(".tijiao_true").html("").hide();			 
						
						 substate=true;
						 break;
						 
						 		 			 		 		  	 case 13:
						 $(".tijiao_false").html("您已提交过，请不要重复提交!").show();
                         $(".tijiao_true").html("").hide();			 
						
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



 function SetSub(str,n){  

   var strReg=/[^\x00-\xff]/g;  

   var _str=str.replace(strReg,"**");  

   var _len=_str.length;  

   if(_len>n){  

     var _newLen=Math.floor(n/2);  

     var _strLen=str.length;  

     for(var i=_newLen;i<_strLen;i++){  

         var _newStr=str.substr(0,i).replace(strReg,"**");  

         if(_newStr.length>=n){  

             return str.substr(0,i)+"...";  

             break;  

        }  

     }  

   }else{  

     return str;  

   }  

}

function istell(str)
{
var result=str.match(/\d{3}-\d{8}|\d{4}-\d{7}/);
if(result==null) return false;
return true;
}
})




String.prototype.getStringLen=function(){

 var realLength = 0, len = this.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = this.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
  

}


