
var order_id=0;
$(function(){
function hideTip(){

   $(".miao_yin_t").html("");
   $(".miao_yin").css({top:0,left:0}).hide();

}
function initDtch(){


var dtcH=$(".c_address_edit .cont_personal_wrap").height();

$(".c_address_edit .cont_personal_wrap").css("marginTop",dtcH/2);
}
initDTz();
function initDTz(){


var dtcH=$(".c_address_tz .cont_personal_wrap").height();

$(".c_address_tz .cont_personal_wrap").css("marginTop",dtcH/2);
}
initDtch();



$(window).resize(function() {
initDtch();
initDTz();
});


$(".cancle_btn").click(function(){

hideTip();
$("body").css("overflow-y","visible");  
$(".c_address_edit").fadeOut(300,function(){

  $(this).css({visibility:"hidden",zIndex:-1}).show();

});

});


$(".cancle_btn_tz").click(function(){

hideTip();
$("body").css("overflow-y","visible");  
$(".c_address_tz").fadeOut(300,function(){

  $(this).css({visibility:"hidden",zIndex:-1}).show();

});

});




var state=1;
var tel="";
var surname="";
var ming="";
var quhao="";
var haoma="";
var mobile="";
var iphone="";
var address="";
var email="";
var zipcode="";
var room='';
var slspeed=500;








function showTip(obj,msg){
  
   $(".miao_yin_t").html(""+msg);
   $(".miao_yin").css({top:obj.offset().top-obj.outerHeight()-($(".miao_yin").outerHeight())/2,left:obj.offset().left+obj.width()/2-$(".miao_yin").width()/2}).fadeIn();

}



/*验证姓氏*/
function yxconsignee(obj){
  surname=$(".surname").val();
  if(surname.Trim()=="姓氏" || surname.Trim()==""){
   $(".surname").val("姓氏");
    showTip($(".surname"),"姓氏不能为空。");
	
	return false;
  }
    hideTip($(".surname"));
   return true;
}

$(".surname").live("focus keyup",function(){
 if($(this).val().Trim()=="姓氏" || $(this).val().Trim()==""){
  // showTip($(this),"请输入姓氏。");
   $(this).val("");
 }else{
  hideTip($(this));
 }
});

$(".surname").live("blur",function(){
yxconsignee($(this));

});



/*验证名*/

function yzming(){
  ming=$(".ming").val();

  if(ming.Trim()==="" || ming.Trim()=="名字"){
        $(".ming").val("名字");
		showTip($(".ming"),"名字不能为空。");
 
	return false;
  }
     hideTip($(".ming"));
  
   return true;

}

$(".ming").live("focus keyup",function(){
 if($(this).val().Trim()=="名字" || $(this).val().Trim()==""){
 //  showTip($(this),"请输入名字。");
   $(this).val("");
 }else{
    hideTip($(this));
 }
});

$(".ming").live("blur",function(){
yzming();

});


/*区号*/

function yzquhao(){
  quhao=$(".quhao").val();
  if(quhao.Trim()==="" || quhao=="区号"){
  $(".quhao").val("区号");
		   showTip($(".quhao"),"请输入电话号码区号。");
	return false;
  }
    if(quhao==0){
	
	quhao="";
	
	}
    hideTip($(".quhao"));
   return true;

}

$(".quhao").live("focus keyup",function(){
 if($(this).val().Trim()=="区号" || $(this).val().Trim()==""){
  // showTip($(this),"请输入电话号码区号。");
   $(this).val("");
 }else{
    hideTip($(this));
 }
});

$(".quhao").live("blur",function(){
yzquhao();

});





/*座机号*/

function yzhaoma(){
  haoma=$(".haoma").val();
  if(haoma.Trim()==="" || haoma.Trim()=="联系号码 (如手机，区号输0)" ){
  
   $(".haoma").val("联系号码 (如手机，区号输0)");
		 showTip($(".haoma"),"请输入电话号码。");
    return false;
  }else{
   if(!haoma.Trim().isMobile()){
   
   	 showTip($(".haoma"),"号码格式不正确。");
   

    return false;

   }else{
   
      
	   if(haoma.length==11){
	   
	    tel=haoma;
	   
	   }else{
	    mobile=quhao+""+haoma;
	   
	   }
   
       hideTip($(".haoma"));
    
     return true;
   
   }
   
   
  }


}
$(".haoma").live("focus keyup",function(){
 if($(this).val().Trim()=="联系号码 (如手机，区号输0)" || $(this).val().Trim()==""){
  // showTip($(this),"请输入电话号码。");
   $(this).val("");
 }else{
    hideTip($(this));
 }
});

$(".haoma").live("blur",function(){
yzhaoma();

});
/*省份*/
var selProvince=0;

function checkP(){

 selProvince=$("#selProvince").val();
 selCity=0;
 selDistricts=0;
 if(selProvince<=0){
     showTip($("#selProvince"),"请选择所在的省份。");
    
   return false;
 
 }
   hideTip($("#selProvince"));
  return true;

}

$("#selProvince").live("change",function(){
 selProvince=$("#selProvince").val();
 if(selProvince<=0){
    showTip($(this),"请选择所在的区。");
    
   return false;
 
 }
   hideTip($(this));
  return true;

});

/*城市*/
var selCity=0;
function checkC(){

 selCity=$(".city").val();
 
 if(selCity<=0){
    showTip($(".city"),"请选择所在的城市。");
    
   return false;
 
 }
   hideTip($(".city"));
  return true;

}


/*区*/
var selDistricts=0;
var selDhtml="";
function checkD(){

 selDistricts=$("#selDistricts").val();
 if($("#selDistricts option").length>1){
 if(selDistricts<=0){
     showTip($("#selDistricts"),"请选择所在的区域。");
    
   return false;
 
 }
 
 }
   hideTip($("#selDistricts"));
  return true;

}



/*地址*/
function yzaddress(){
  address=$(".jdaddress").val();
  if(address.Trim()==="" || address.Trim()=="区，街道编号/名称，楼宇名称"){
	$(".jdaddress").val("区，街道编号/名称，楼宇名称");
     showTip($(".jdaddress"),"请输入街道地址。");
    $(this).val("");
    
	return false;
  }
  
   hideTip($(".jdaddress"));
   return true;

}

$(".jdaddress").live("focus keyup",function(){
 if($(this).val().Trim()=="区，街道编号/名称，楼宇名称" || $(this).val().Trim()==""){
   //showTip($(this),"请输入街道地址。");
   $(this).val("");
 }else{
    hideTip($(this));
 }
});

$(".jdaddress").live("blur",function(){
yzaddress();

});









/*街区*/

function yzTelephone(){
  room=$(".room").val();
  if(room.Trim()==="" || room.Trim()=="房间、套房、单元、楼层或街区"){
  $(".room").val("房间、套房、单元、楼层或街区");
    
	return true;
  }
  
   hideTip($(".room"));
   return true;

}


$(".room").live("focus keyup",function(){
 room=$(this).val();
 if($(this).val().Trim()=="房间、套房、单元、楼层或街区" || $(this).val().Trim()==""){
   
   $(this).val("");
 }else{
    hideTip($(this));
 }
});

$(".room").live("blur",function(){
yzTelephone();

});
function yziphone(){
  iphone=$(".iphone").val();
  if(iphone.Trim()==="" || iphone.Trim()=="手机号码(可选)"){
  $(".iphone").val("手机号码(可选)");
    $(this).val("");
  
	return true;
  }else if(iphone.Trim()!=""){

	  if(!iphone.Trim().isPhoneGz()){
	  
	  showTip($(".iphone"),"手机号码格式不正确。");
	  return false;
	  }
     return true;
  }
  

   return true;


}


$(".iphone").bind("focus keyup",function(){
 if($(this).val().Trim()=="手机号码(可选)" || $(this).val().Trim()==""){
   
   $(this).val("");
 }else{
    hideTip($(this));
 }
});

$(".iphone").blur(function(){
yziphone();

});

/*邮编*/
function yzzipcode(){
 zipcode=$(".zipcode").val();

  if(zipcode.Trim()==="" || zipcode.Trim()=="邮政编码" ){
  
   $(".zipcode").val("邮政编码");
		 showTip($(".zipcode"),"请填写邮政编码。");
    return false;
  }else{
   if(!zipcode.Trim().youbian()){
   
   	 showTip($(".zipcode"),"邮政编码格式不正确。");
   

    return false;

   }else{
       hideTip($(".zipcode"));
    
     return true;
   
   }
   
   
  }


}
$(".zipcode").live("focus keyup",function(){
 if($(this).val().Trim()=="邮政编码" || $(this).val().Trim()==""){
   //showTip($(this),"请填写必填字段。");
   $(this).val("");
 }else{
    hideTip($(this));
 }
});

$(".zipcode").live("blur",function(){
yzzipcode();

});



 function yzemail() {
        email = $(".sf_email").val();
        if (email.Trim() === "" || email.Trim() == "电子邮箱") {
            $(".sf_email").val("电子邮箱");
            showTip($(".sf_email"), "请填写电子邮箱。");
            $(this).val(" ");

            return false;
        } else {

            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!filter.test(email.Trim())) {
                showTip($(".sf_email"), "请使用有效的电子邮件地址格式: email@domain.com。");

                return false;

            } else {

                hideTip($(".sf_email"));
                return true;
            }

        }

    }

    $(".sf_email").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "电子邮箱" || $(this).val().Trim() == "") {
            // showTip($(this),"请填写必填字段。");
            $(this).val(" ");
        } else {
            hideTip($(this));
        }
    });

    $(".sf_email").live("blur",
    function() {
        yzemail();

    });








var htmlStruct='';
 var isload=true;

$(".edit_asddress").click(function(){
submitEditAdress(order_id);

});


 var htmlEditStruct='';
 var iseditload=true;
 function submitEditAdress(order_ids){
   $(".add_law").html("").hide();
    order_id=order_ids;
   var default_state=$(".default_state").val();
   
   if(!yxconsignee()){
   
     return false;
   }
   
      if(!yzming()){
   
     return false;
   }
   
    if(!yzquhao()){
   
     return false;
   }
    
      if(!yzhaoma()){
   
     return false;
   }
      if(!checkP()){
   
     return false;
   }           
   if(!checkC()){
   
     return false;
   }
   
  if(!checkD()){
   
     return false;
   }
   
     if(!yzaddress()){
   
     return false;
   }

   


   if(!yzzipcode()){
   
     return false;
   }

  
   if(iseditload){
   
   
   	       $.ajax({
                type: 'POST',
                url: 'user.php',
				
                data:{
				    order_id:order_id,
				    surname:surname,
					ming:ming,
					address:address,
					quhao:quhao,
					haoma:haoma,					
					province:selProvince,
					city:selCity,
					district:selDistricts,
					room:room,
						tel:tel,
					mobile:mobile,
					zipcode:zipcode,					
					act:"act_edit_order_address"
					
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				    iseditload=false;
					
					$(".add_law").empty().show().html("<span class='ti_si'>表单正在提交...</span>");
					//$(".add_law").empty().show().html("表单正在提交...");
                },
                success: function(data){
			     
			       switch(data.err){
				   
				   	    case "ok":
				        
					
					    $(".add_law").empty().show().html("<span class='ti_si'>保存成功!</span>");
						$(".miao_em_item_"+order_id+" .sftel").empty().html(haoma);
						$(".maio_or_item_"+order_id).empty().html(data.content);
						//$(".sftel").html(haoma); 
						setTimeout(function(){
						 $(".add_law").empty().hide();
										$(".c_address_edit").fadeOut(300,function(){
										hideTip();
   $("body").css("overflow-y","visible");   
  $(this).css({visibility:"hidden",zIndex:-1}).show();

});
						},1000);
					   iseditload=true;
					 break;
					 
				   	    case "fail":
				
					    $(".add_law").empty().show().html("保存失败!");
					   iseditload=true;
					 break;
					 
					 	    case 3:
					
					     showTip($(".surname"),"姓氏不能为空。");
					   iseditload=true;
					 break;
					 
					  		 	   case 4:
					 
					   showTip($(".ming"),"请输入名字。");
					   iseditload=true;
					 break;
					 
					 		  		 	   case 5:
			
					  	 showTip($(".haoma"),"请输入电话号码。");
					  
					   iseditload=true;
					 break;
					 
					 
					 		 		  		 	   case 6:
					  $(".submit_state").empty().hide();
					       showTip($("#selProvince"),"请选择所在的省份。");
					  
					   iseditload=true;
					 break;
					 
					 
					 	 		 		  		 	   case 7:
					  $(".submit_state").empty().hide();
					      showTip($(".city"),"请选择所在的城市。");
					  
					   iseditload=true;
					 break;
					 
					 	 	 		 		  		 	   case 8:
			
					         showTip($("#selDistricts"),"请填写邮政编码。");
					  
					   iseditload=true;
					 break;
					 
					 	 	 	 		 		  		 	   case 9:
				
					    $(".jdaddress").val("区，街道编号/名称，楼宇名称");
					  
					   iseditload=true;
					 break;
					    case 12:
				            alert("请选登录！");
							location.href="user.php?act=login";
							break;
							
							  case 13:
							  $(".add_law").empty().show().html("非法操作！");
				           // alert("非法操作！");
							//location.href="user.php?act=login";
							break;
						 default:
						 $(".add_law").empty().show().html("系统错误,请刷新后重试!");
						//$(".submit_state").empty().show().html("<span class='ti_error'>系统错误,请刷新后重试!</span>");
						 
				   
				   
				   
				   }
                  
		
                }
            });
   
   
   }
   

 
 
 }
 
 
 $(".default_iphone").click(function(){
submitEditTz(order_id);

});
 
 
 
  function submitEditTz(order_ids){
 $(".add_tz").empty().hide();
    order_id=order_ids;
	
	 if(!yzemail()){
   
     return false;
   }
   
   	 if(!yziphone()){
   
     return false;
   }
  
   if(order_id>0){
  

   
   
   	       $.ajax({
                type: 'POST',
                url: 'user.php',
				
                data:{
				    order_id:order_id,
				    email:email,
					iphone:iphone,		
					act:"act_edit_tz"
					
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				    iseditload=false;
					
					$(".add_tz").empty().show().html("<span class='ti_si'>表单正在提交...</span>");
					//$(".add_law").empty().show().html("表单正在提交...");
                },
                success: function(data){
			     
			       switch(data.err){
				   
				   	    case "ok":
				        
					
					    $(".add_tz").empty().show().html("<span class='ti_si'>保存成功!</span>");
						
						$(".miao_em_item_"+order_id).empty().html(data.content);
						
						setTimeout(function(){
						$(".add_tz").empty().hide();
										$(".c_address_tz").fadeOut(300,function(){
										hideTip();
$("body").css("overflow-y","visible");  
  $(this).css({visibility:"hidden",zIndex:-1}).show();

});
						},1000);
					   iseditload=true;
					 break;
					 
				   	    case "fail":
				
					    $(".add_tz").empty().show().html("保存失败!");
					   iseditload=true;
					 break;
					 
					 	  
					 		  		
					    case 12:
				            alert("请选登录！");
							location.href="user.php?act=login";
							break;
							
							  case 13:
							  $(".add_tz").empty().show().html("非法操作！");
				       
							break;
						 default:
						 $(".add_tz").empty().show().html("系统错误,请刷新后重试!");
					
						 
				   
				   
				   
				   }
                  
		
                }
            });
   
   
   }
   

 
 
 }
});

var order_id=0;
function editAddress(id){

  if(id>0){
  

  
     	       $.ajax({
                type: 'POST',
                url: 'user.php',
				
                data:{
				    order_id:id,
						
					act:"act_get_address"
					
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				    iseditload=false;
					 $(".c_address_edit .cont_personal_box ").addClass("d_loadding");
					 $(".miao_content").css("visibility","hidden");
					 $("body").css("overflow-y","hidden");  
					  $(".c_address_edit").fadeIn(300,function(){

  $(this).css({"visibility":"visible",zIndex:99});

});
				  
					//$(".add_law").empty().show().html("<span class='ti_si'>表单正在提交...</span>");
                },
                success: function(data){
			      $(".c_address_edit .cont_personal_box ").removeClass("d_loadding");
			       switch(data.err){
				   
				  
					  
				
					 
					 	   case "ok":
						    order_id=id;
						      $(".miao_content").children().remove();
							   $(".miao_content").empty().html(data.content);
							   $(".miao_content").css("visibility","visible");
					 	 // $(".add_law").empty().show().html("<span class='ti_si'>修改成功!</span>");
                          
					     break;
						 
						 case "fail":
						 				$(".c_address_edit").fadeOut(300,function(){
	 $("body").css("overflow-y","visible");  
  $(this).css({visibility:"hidden",zIndex:-1}).show();

});
						 	
			break;
			
				   case "not_login":
						   
						    alert("请选登录！");
							location.href="user.php?act=login";
                          
					     break;
						 default:
						alert("系统错误,请刷新后重试!");
						 
				   
				   
				   
				   }
                  
		
                },
				error:function(){
				
				$(".c_address_edit").fadeOut(300,function(){
 $("body").css("overflow-y","visible");  
  $(this).css({visibility:"hidden",zIndex:-1}).show();

});
				
				}
            });
  
  

  }


}


function editTz(id){

  if(id>0){
  

  
     	       $.ajax({
                type: 'POST',
                url: 'user.php',
				
                data:{
				    order_id:id,
						
					act:"act_get_tz"
					
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				    iseditload=false;
					 $(" .c_address_tz .cont_personal_box ").addClass("d_loadding");
					 $(".miao_tz_edit").css("visibility","hidden");
					  $(".c_address_tz").fadeIn(300,function(){
$("body").css("overflow-y","hidden");  
              $(this).css({"visibility":"visible",zIndex:99});

});
				  
					//$(".add_law").empty().show().html("<span class='ti_si'>表单正在提交...</span>");
                },
                success: function(data){
			      $(".c_address_tz .cont_personal_box ").removeClass("d_loadding");
			       switch(data.err){
				   
				  
					  
				
					 
					 	   case "ok":
						    order_id=id;
						      $(".miao_em").empty().html(data.html_t);
							  $(".miao_sj").empty().html(data.html_f);
							   $(".miao_tz_edit").css("visibility","visible");
							  
					 	 // $(".add_law").empty().show().html("<span class='ti_si'>修改成功!</span>");
                          
					     break;
						 
						 case "no_empty":
						 				$(".c_address_tz").fadeOut(300,function(){
 $("body").css("overflow-y","visible");  
  $(this).css({visibility:"hidden",zIndex:-1}).show();

});
						 	
			break;
			
				   case "not_login":
						   
						    alert("请选登录！");
							location.href="user.php?act=login";
                          
					     break;
						 default:
						alert("系统错误,请刷新后重试!");
						 
				   
				   
				   
				   }
                  
		
                },
				error:function(){
				
				$(".c_address_tz").fadeOut(300,function(){
 $("body").css("overflow-y","visible");  
  $(this).css({visibility:"hidden",zIndex:-1}).show();

});
				
				}
            });
  
  

  }


}
 
String.prototype.Trim = function() {
var m = this.match(/^\s*(\S+(\s+\S+)*)\s*$/);
return (m == null) ? "" : m[1];
}
String.prototype.isMobile = function() {
return (/(^[0-9]{3,4}\-[0-9]{7}$)|(^[0-9]{7}$)|(^[0-9]{3,4}[0-9]{7}$)|(^0{0,1}13[0-9]{9}$)/.test(this.Trim()));
}
String.prototype.isPhoneGz = function() {
return (/^1[34578]\d{9}$/.test(this.Trim()));
}
String.prototype.youbian = function() {
return ( /^[0-9]{6}$/.test(this.Trim()));
}
