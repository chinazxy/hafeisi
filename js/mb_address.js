jQuery(function(){

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



/*验证姓氏*/
function yxconsignee(obj){
  surname=$(".surname").val();
  if(surname.Trim()=="姓氏" || surname.Trim()==""){
   $(".surname").val("姓氏");
   
   $(".submit_state").addClass("ti_error").show().html("*姓氏不能为空");
   // showTip($(".surname"),"姓氏不能为空。");
	
	return false;
  }
  
     $(".submit_state").addClass("ti_error").hide();
   // hideTip($(".surname"));
   return true;
}

$(".surname").bind("focus keyup",function(){
 if($(this).val().Trim()=="姓氏" || $(this).val().Trim()==""){
  // showTip($(this),"请输入姓氏。");
   $(this).val("");
 }else{
  $(".submit_state").hide();
 }
});

$(".surname").blur(function(){
yxconsignee($(this));

});



/*验证名*/

function yzming(){
  ming=$(".ming").val();

  if(ming.Trim()==="" || ming.Trim()=="名字"){
        $(".ming").val("名字");
		   $(".submit_state").addClass("ti_error").show().html("*名字不能为空");
		//showTip($(".ming"),"名字不能为空。");
 
	return false;
  }
     $(".submit_state").hide();
  
   return true;

}

$(".ming").bind("focus keyup",function(){
 if($(this).val().Trim()=="名字" || $(this).val().Trim()==""){
 //  showTip($(this),"请输入名字。");
   $(this).val("");
 }else{
     $(".submit_state").hide();
 }
});

$(".ming").blur(function(){
yzming();

});


/*区号*/

function yzquhao(){
  quhao=$(".quhao").val();
  if(quhao.Trim()==="" || quhao=="区号"){
  $(".quhao").val("区号");
  	   $(".submit_state").addClass("ti_error").show().html("*请输入电话号码区号");
		  // showTip($(".quhao"),"请输入电话号码区号。");
	return false;
  }
    if(haoma.length==11){
	   
	    quhao="";
	   
	   (".submit_state").hide();
    //hideTip($(".quhao"));
 return true;
   }  
else{
   if(!quhao.Trim().quhao()){
   	   $(".submit_state").addClass("ti_error").show().html("*此输入无效。请检查信息是否正确");
   	// showTip($(".quhao"),"此输入无效。请检查信息是否正确。");
   

    return false;

   }
   }
    $(".submit_state").hide();
  //  hideTip($(".quhao"));
 return true;
}

$(".quhao").bind("focus keyup",function(){
 if($(this).val().Trim()=="区号" || $(this).val().Trim()==""){
  // showTip($(this),"请输入电话号码区号。");
   $(this).val("");
 }else{
   $(".submit_state").hide();
 }
});

$(".quhao").blur(function(){
yzquhao();

});





/*座机号*/

function yzhaoma(){
  haoma=$(".haoma").val();
  if(haoma.Trim()==="" || haoma.Trim()=="联系号码" ){
  
   $(".haoma").val("");
   
    $(".submit_state").addClass("ti_error").show().html("*请输入电话号码");
		// showTip($(".haoma"),"请输入电话号码。");
    return false;
  }else{
   if(!haoma.Trim().isMobile()){
       $(".submit_state").addClass("ti_error").show().html("*号码格不正确");
   	 //showTip($(".haoma"),"号码格式不正确。");
   

    return false;

   }else{
   
      
	   if(haoma.length==11){
	   
	    mobile=haoma;
	   
	   }else{
	    tel=haoma;
	   
	   }
   
     $(".submit_state").hide();
    
     return true;
   
   }
   
   
  }


}
$(".haoma").bind("focus keyup",function(){
 if($(this).val().Trim()=="联系号码" || $(this).val().Trim()==""){
  // showTip($(this),"请输入电话号码。");
   $(this).val("");
 }else{
       $(".submit_state").hide();
 }
});

$(".haoma").blur(function(){
yzhaoma();

});
/*省份*/
var selProvince=0;

function checkP(){

 selProvince=$("#selProvince").val();
 selCity=0;
 selDistricts=0;
 if(selProvince<=0){
	 
	        $(".submit_state").addClass("ti_error").show().html("*请选择所在的省份");
   //  showTip($("#selProvince"),"请选择所在的省份。");
    
   return false;
 
 }
 $(".submit_state").hide();
  // hideTip($("#selProvince"));
  return true;

}

$("#selProvince").change(function(){
 selProvince=$("#selProvince").val();
 if(selProvince<=0){
	         $(".submit_state").addClass("ti_error").show().html("*请选择所在的区");
   // showTip($(this),"请选择所在的区。");
    
   return false;
 
 }
   $(".submit_state").hide();
 //  hideTip($(this));
  return true;

});

/*城市*/
var selCity=0;
function checkC(){

 selCity=$(".city").val();
 
 if(selCity<=0){
	 
	 	         $(".submit_state").addClass("ti_error").show().html("*请选择所在的城市");
  //  showTip($(".city"),"请选择所在的城市。");
    
   return false;
 
 }
  $(".submit_state").hide();
  // hideTip($(".city"));
  return true;

}


/*区*/
var selDistricts=0;
var selDhtml="";
function checkD(){

 selDistricts=$("#selDistricts").val();

 if($("#selDistricts option").length>1){
 
 if(selDistricts<=0){
	 
	  	         $(".submit_state").addClass("ti_error").show().html("*请选择所在的区域");
   //  showTip($("#selDistricts"),"请选择所在的区域。");
    
   return false;
 
 }
 
 }
  $(".submit_state").hide();
 // hideTip($("#selDistricts"));
  return true;

}



/*地址*/
function yzaddress(){
  address=$(".jdaddress").val();
  if(address.Trim()==="" || address.Trim()=="区，街道编号/名称，楼宇名称"){
	$(".jdaddress").val("区，街道编号/名称，楼宇名称");
	   $(".submit_state").addClass("ti_error").show().html("*请输入街道地址");
    // showTip($(".jdaddress"),"请输入街道地址。");
    $(this).val("");
    
	return false;
  }
     $(".submit_state").hide();
  // hideTip($(".jdaddress"));
   return true;

}

$(".jdaddress").bind("focus keyup",function(){
 if($(this).val().Trim()=="区，街道编号/名称，楼宇名称" || $(this).val().Trim()==""){
   //showTip($(this),"请输入街道地址。");
   $(this).val("");
 }else{
      $(".submit_state").hide();
 }
});

$(".jdaddress").blur(function(){
yzaddress();

});




/*街区*/

function yzTelephone(){
  room=$(".room").val();
  if(room.Trim()==="" || room.Trim()=="房间、套房、单元、楼层或街区"){
  $(".room").val("房间、套房、单元、楼层或街区");
    $(this).val("");
    
	return true;
  }
  
   hideTip($(".room"));
   return true;

}


$(".room").bind("focus keyup",function(){
 room=$(this).val();
 if($(this).val().Trim()=="房间、套房、单元、楼层或街区" || $(this).val().Trim()==""){
   
   $(this).val("");
 }else{
    hideTip($(this));
 }
});

$(".room").blur(function(){
yzTelephone();

});

$(".get_iph").click(function(){

if($(".haoma").val()!="联系号码" && yzhaoma()){
$(".iphone").val($(".haoma").val());

}

});
	
/*邮编*/
function yzzipcode(){
 zipcode=$(".zipcode").val();

  if(zipcode.Trim()==="" || zipcode.Trim()=="邮政编码" ){
  
   $(".zipcode").val("邮政编码");
      $(".submit_state").addClass("ti_error").show().html("*请填写邮政编码");
		// showTip($(".zipcode"),"请填写邮政编码。");
    return false;
  }else{
   if(!zipcode.Trim().youbian()){
         $(".submit_state").addClass("ti_error").show().html("*邮政编码格式不正确");
   	// showTip($(".zipcode"),"邮政编码格式不正确。");
   

    return false;

   }else{
      $(".submit_state").hide();
    
     return true;
   
   }
   
   
  }


}
$(".zipcode").bind("focus keyup",function(){
 if($(this).val().Trim()=="邮政编码" || $(this).val().Trim()==""){
   //showTip($(this),"请填写必填字段。");
   $(this).val("");
 }else{
         $(".submit_state").hide();
 }
});

$(".zipcode").blur(function(){
yzzipcode();

});





/*电子邮箱*/

function yzemail(){
  email=$(".sf_email").val();
  if(email.Trim()==="" || email.Trim()=="电子邮箱"){
 $(".sf_email").val("电子邮箱");
 
     showTip($(".sf_email"),"请填写电子邮箱。");
    $(this).val("");
    

    return false;
  }else{
  
	 var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   if(!filter.test(email.Trim())){
 showTip($(".sf_email"),"请使用有效的电子邮件地址格式: email@domain.com。");
	
    return false;

   }else{
   
	   hideTip($(".sf_email"));
     return true;
   }
   
   
  }


}

$(".sf_email").bind("focus keyup",function(){
 if($(this).val().Trim()=="电子邮箱" || $(this).val().Trim()==""){
  // showTip($(this),"请填写必填字段。");
   $(this).val("");
 }else{
    hideTip($(this));
 }
});


$(".sf_email").blur(function(){
yzemail();

});



/*可选手机号*/
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

 var checkval=$(".default_mbaddress").val();

$(".default_mbaddress").click(function(){
	
	if($(".default_mbaddress").val()==0){
		
		$(".default_mbaddress").val(1);
		checkval=1;
	}else{
			$(".default_mbaddress").val(0);
					checkval=0;
			
		
	}
	
});





var htmlStruct='';
 var isload=true;
 function submitAdress(){
 


   if(!yxconsignee()){
   
     return false;
   }
   
      if(!yzming()){
   
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

     var ltbbt = $( 'button' ).ladda();
  
   if(isload){
   
   
   	       $.ajax({
                type: 'POST',
                url: 'user.php',
				
                data:{
				    surname:surname,
					ming:ming,
					quhao:quhao,
					haoma:haoma,					
					province:selProvince,
					city:selCity,
					district:selDistricts,
					address:address,
					room:room,
					tel:tel,
					mobile:mobile,
					zipcode:zipcode,					
					email:email,					
					iphone:iphone,
					default_set:checkval,	
						  token: token,
                timestamp: timestamp,
					act:"act_user_add_address"
					
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				    isload=false;
					$(".submit_state").hide();
							 ltbbt.ladda('start');
                },
                success: function(data){
			     	 ltbbt.ladda('stop');
			       switch(data.err){
				   
				  
					 
					   case 2:
					 	  $(".submit_state").addClass("ti_error").empty().show().html("*超过5条不能再添加");
					   isload=true;
					 break;
					 
					 	   case 1:
					 	  $(".submit_state").removeClass("ti_error").empty().show().html("*保存成功");
						    
						    isload=false;
						  setTimeout(function(){
						    $(".submit_state").empty().hide();
						    isload=true;
						  },2000)
					    
					     break;
						 
						 
					 		 	   case 3:
					 // $(".submit_state").empty().hide();
					  	 	  $(".submit_state").addClass("ti_error").empty().show().html("*姓氏不能为空");
					    // showTip($(".surname"),"姓氏不能为空。");
					   iseditload=true;
					 break;
					 
					  		 	   case 4:
					  $(".submit_state").empty().hide();
					   	  $(".submit_state").addClass("ti_error").empty().show().html("*请输入名字");
					  // showTip($(".ming"),"请输入名字。");
					   iseditload=true;
					 break;
					 
					 		  		 	   case 5:
					//  $(".submit_state").empty().hide();
					  	  $(".submit_state").addClass("ti_error").empty().show().html("*请输入电话号码");
					  //	 showTip($(".haoma"),"请输入电话号码。");
					  //
					   iseditload=true;
					 break;
					 
					 
					 		 		  		 	   case 6:
					//  $(".submit_state").empty().hide();
					   $(".submit_state").addClass("ti_error").empty().show().html("*请选择所在的省份");
					    //   showTip($("#selProvince"),"请选择所在的省份。");
					  
					   iseditload=true;
					 break;
					 
					 
					 	 		 		  		 	   case 7:
					  //$(".submit_state").empty().hide();
					    $(".submit_state").addClass("ti_error").empty().show().html("*请选择所在的城市");
					    //  showTip($(".city"),"请选择所在的城市。");
					  
					   iseditload=true;
					 break;
					 
					 	 	 		 		  		 	   case 8:
					 // $(".submit_state").empty().hide();
					  				    $(".submit_state").addClass("ti_error").empty().show().html("*请填写邮政编码");
					      //   showTip($("#selDistricts"),"请填写邮政编码。");
					  
					   iseditload=true;
					 break;
					 
					 	 	 	 		 		  		 	   case 9:
					  //$(".submit_state").empty().hide();
					  $(".submit_state").addClass("ti_error").empty().show().html("*区，街道编号/名称，楼宇名称");
					    //$(".jdaddress").val("区，街道编号/名称，楼宇名称");
					  
					   iseditload=true;
					 break;
						 	 	 	 	 		 		  		 	   case 10:
					  //$(".submit_state").empty().hide();
					    $(".submit_state").addClass("ti_error").empty().show().html("*请填写电子邮箱");
					        //showTip($(".sf_email"),"请填写电子邮箱。");
					  
					   iseditload=true;
					 break;
					 
					 		  	   case "ver_err":
					   //$(".submit_state").empty().hide();
					   		    $(".submit_state").addClass("ti_error").empty().show().html("*验证失败");
							  // $(".submit_state").empty().show().html("<span class='ti_error'>验证失败。</span>");
					      	
					  
					   iseditload=true;
					 break; 	 	 	 	 		 		  		 	   case 11:
					  $(".submit_state").empty().hide();
					     $(".submit_state").addClass("ti_error").empty().show().html("*手机号码格式不正确");
					      	 /// showTip($(".iphone"),"手机号码格式不正确。");
					  
					   iseditload=true;
					 break;
					 
					 	 		 	 	 	 	 		 		  		 	   case 12:
					  $(".submit_state").empty().hide();
					  
					        alert("登录超时，请重新登录。");
					      	location.href="user.php?act=login";
					  
					 
					 break;
						 
						 default:
						$(".submit_state").addClass("ti_error").empty().show().html("<span class='ti_error'>*系统错误,请刷新后重试!</span>");
						 
				   
				   
				   
				   }
                  
		
                }
            });
   
   
   }
   

 
 
 }
$(".edit_address").click(function(){
submitEditAdress();

});


 var htmlEditStruct='';
 var iseditload=true;
 function submitEditAdress(){
 
   var address_id=$(".address_id").val();
   var checkval=$(".default_mbaddress").val();
   
   if(!yxconsignee()){
   
     return false;
   }
   
      if(!yzming()){
   
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
   var ltbbt = $( 'button' ).ladda();
   if(iseditload){
   
   
   	       $.ajax({
                type: 'POST',
                url: 'user.php',
				
                data:{
				    surname:surname,
					ming:ming,
					address_id:address_id,
					quhao:quhao,
					haoma:haoma,					
					province:selProvince,
					city:selCity,
					district:selDistricts,
					address:address,
					room:room,
					tel:tel,
					mobile:mobile,
					zipcode:zipcode,					
					email:email,	
					default_set:checkval,	
					iphone:iphone,
					  token: token,
                timestamp: timestamp,
					act:"act_user_edit_address"
					
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				    iseditload=false;
					$(".submit_state").hide();
						 ltbbt.ladda('start');
					
                },
                success: function(data){
			     	 ltbbt.ladda('stop');
			       switch(data.err){
					 	   case 1:
					 	  $(".submit_state").removeClass("ti_error").empty().show().html("*修改成功!");
						   
						    iseditload=false;
						  setTimeout(function(){
						    $(".submit_state").empty().hide();
						    iseditload=true;
						  },2000)
					    
					     break;
						 
						 	   case 2:
					  $(".submit_state").empty().show().html("<span class='ti_error'>*收货地址修改失败。</span>");
					   iseditload=true;
					 break;
					 
					 		 	   case 3:
					  $(".submit_state").addClass("ti_error").empty().show().html("*姓氏不能为空!");
					    // showTip($(".surname"),"姓氏不能为空。");
					   iseditload=true;
					 break;
					 
					  		 	   case 4:
					  $(".submit_state").addClass("ti_error").empty().show().html("*请输入名字!");
					  // showTip($(".ming"),"请输入名字。");
					   iseditload=true;
					 break;
					 
					 		  		 	   case 5:
					  $(".submit_state").addClass("ti_error").empty().show().html("*请输入电话号码!");
					  	 //showTip($(".haoma"),"请输入电话号码。");
					  
					   iseditload=true;
					 break;
					 
					 
					 		 		  		 	   case 6:
					  $(".submit_state").addClass("ti_error").empty().show().html("*请选择所在的省份!");
					      // showTip($("#selProvince"),"请选择所在的省份。");
					  
					   iseditload=true;
					 break;
					 
					 
					 	 		 		  		 	   case 7:
						  $(".submit_state").addClass("ti_error").empty().show().html("*请选择所在的城市!");
					      //showTip($(".city"),"请选择所在的城市。");
					  
					   iseditload=true;
					 break;
					 
					 	 	 		 		  		 	   case 8:
					  $(".submit_state").addClass("ti_error").empty().show().html("*请填写邮政编码!");
					       //  showTip($("#selDistricts"),"请填写邮政编码。");
					  
					   iseditload=true;
					 break;
					 
					 	 	 	 		 		  		 	   case 9:
					 // $(".submit_state").empty().hide();
					 	  $(".submit_state").addClass("ti_error").empty().show().html("*请填写区，街道编号/名称，楼宇名称!");
					   // $(".jdaddress").val("区，街道编号/名称，楼宇名称");
					  
					   iseditload=true;
					 break;
						 	 	 	 	 		 		  		 	   case 10:
								 	  $(".submit_state").addClass("ti_error").empty().show().html("*请填写电子邮箱!");
					     //   showTip($(".sf_email"),"请填写电子邮箱。");
					  
					   iseditload=true;
					 break;
					 
					 		 	 	 	 	 		 		  		 	   case 11:
					 		 	  $(".submit_state").addClass("ti_error").empty().show().html("*手机号码格式不正确!");
					      	 // showTip($(".iphone"),"手机号码格式不正确。");
					  
					   iseditload=true;
					 break;
					  	   case "ver_err":
					   	 	  $(".submit_state").addClass("ti_error").empty().show().html("*验证失败!");
							  // $(".submit_state").empty().show().html("<span class='ti_error'>验证失败。</span>");
					      	
					  
					   iseditload=true;
					 break;
					 	 		 	 	 	 	 		 		  		 	   case 12:
					  $(".submit_state").empty().hide();
					        alert("登录超时，请重新登录。");
					      	location.href="user.php?act=login";
					  
					 
					 break;
					 
					 
					 
					 	 	 		 	 	 	 	 		 		  		 	   case 13:
					         $(".submit_state").addClass("ti_error").empty().show().html("*非法数值，保存失败!");
							  // $(".submit_state").empty().show().html("<span class='ti_error'>非法数值，保存失败。</span>");
					     
					      
					  
					   iseditload=true;
					 break;
						 default:
						    $(".submit_state").addClass("ti_error").empty().show().html("*系统错误,请刷新后重试!");
					
						 
				   
				   
				   
				   }
                  
		
                }
            });
   
   
   }
   

 
 
 }
 


   $(".add_address").click(function(){





   submitAdress();

})
 
 

 
 function Alist(){
 
 
   if($(".miao_add1_box1 .add_shan").hasClass("xiangxia3")){
   var miaoH=0;
     $(".miao_add1_2").each(function(i){
	  miaoH+=parseInt($(".miao_add1_2").eq(i).innerHeight());
	  
	  
	 
	
	 })
     miaoH+=parseInt($(".miao_add1_box1_2").innerHeight());
   
     $(".miao_add1_1").stop().animate({height:miaoH},slspeed);
	 
	 $(".miao_add1_box1 .add_shan").removeClasss("xiangxia3");
   
   }else{
   
       var miaoH=parseInt($(".miao_add1_box1_2").innerHeight());
   
     $(".miao_add1_1").stop().animate({height:miaoH},slspeed);
	 
	 $(".miao_add1_box1 .add_shan").addClasss("xiangxia3");
   
   }
 
 }

  $(".miao_add1_box1").click(function(){
 
 Alist();
 

 
 });
 
});



 function reflashA(){
 
    if(!$(".miao_add1_box1 .add_shan").hasClass("xiangxia3")){
   var miaoH=0;
     $(".miao_add1_2").each(function(i){
	  miaoH+=parseInt($(".miao_add1_2").eq(i).innerHeight());
	  
	  
	 
	
	 })
     miaoH+=parseInt($(".miao_add1_box1_2").innerHeight());
   
     $(".miao_add1_1").stop().animate({height:miaoH},500);
	 
   
   }
 
 }

var chload=true;
function checkDefault(id,obj,event){
stopEvent(event);
   if(id>0){
   
     $.ajax({
                type: 'POST',
                url: 'user.php',
				
                data:{
				    address_id:id,
			
					act:"set_default"
					
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				    chload=false;
						//$(obj).parent().parent().parent().next().show();
                },
                success: function(data){
			     	//$(obj).parent().parent().parent().next().hide();
			       switch(data.err){
				   
				  
					 
					   case 0:
					 	alert("默认收货地址设置失败");
					   chload=true;
					 break;
					 
					 	   case 1:
						   window.location.reload();
						  // $(".miao_add1 a").not($(obj).parent().parent().parent().parent()).removeClasss("default");
						  // $(".bag3").not($(obj)).removeClasss("select");
						  // $(obj).addClasss("select");
						 //   $(".miao_add1_2").not($(".miao_add1_2",$(obj).parent().parent().parent().parent())).removeClasss("backg");
						 //  $(obj).parent().parent().parent().parent().addClasss("default");
						 //  $(".miao_add1_2",$(obj).parent().parent().parent().parent()).addClasss("backg");
					 	 // $(".submit_state").empty().show().html("默认收货地址设置成功");
						  
						 
						    chload=false;

					     break;
						 	   case 2:
					 	location.href="user.php?act=login";
					   chload=true;
					 break;
						 default:
						alert("系统错误,请刷新后重试。");
						 
				   
				   
				   
				   }
                  
		
                }
            });
   
   }else{
   
     alert("关键字丢失，操作失败。");
   }

}

var disload=true;
function deleteAddress(id,obj,event){
stopEvent(event);

   if(id>0){
   
     if(disload){
        $.ajax({
                type: 'POST',
                url: 'user.php',
				
                data:{
				    address_id:id,
			
					act:"drop_consignee"
					
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				    isload=false;
	
                },
                success: function(data){
			
			       switch(data.msg){
				   
				  
					 
					   case 0:
					 	alert("收货地址删除失败。");
					    disload=true;
					   break;
					 
					 	   case 1:
						   
						  $(obj).parent().parent().fadeOut(500,function(){
						  // alert( $(obj).parent().parent().parent().parent().parent().attr("class"));
						$(obj).parent().parent().remove();
					 
						  });
                      
					     break;
						 	   case 2:
							    	alert("请选登录。");
					 	location.href="user.php?act=login";
					   disload=true;
					 break;
						 default:
						alert("系统错误,请刷新后重试。");
						 
				   
				   
				   
				   }
                  
		
                }
            });
			
			}
   
   }else{
    alert("关键字丢失，操作失败。");
   
   }

}


var rdisload=true;
function e_deleteAddress(id,obj,event){
stopEvent(event);
var edit_id=$(".address_id").val();


   if(id>0){
   if(id==edit_id){
alert("当前记录处于编辑状态,删除失败。");
return false;
}
     if(disload){
        $.ajax({
                type: 'POST',
                url: 'user.php',
				
                data:{
				    address_id:id,
			
					act:"drop_consignee"
					
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				    rdisload=false;
	
                },
                success: function(data){

			       switch(data.msg){
				   
				  
					 
					   case 0:
					 	alert("收货地址删除失败。");
					    rdisload=true;
					   break;
					 
					 	   case 1:
						   
						  $(obj).parent().parent().fadeOut(500,function(){
						  // alert( $(obj).parent().parent().parent().parent().parent().attr("class"));
						$(obj).parent().parent().remove();
					 
						  });
                      
					     break;
						 	   case 2:
							    	alert("请选登录。");
					 	location.href="user.php?act=login";
					   rdisload=true;
					 break;
						 default:
						alert("系统错误,请刷新后重试。");
						 
				   
				   
				   
				   }
                  
		
                }
            });
			
			}
   
   }else{
    alert("关键字丢失，操作失败。");
   
   }

}

function stopEvent(event){


  var event=event || window.event;
  if (event.stopPropagation) {

event.stopPropagation();
}
else {

event.cancelBubble = true;
} 

}


function editAddress(id,event){

stopEvent(event);

window.location.href="user.php?act=address_edit&address_id="+id;

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
return (/^[0-9]{6}$/.test(this.Trim()));
}
String.prototype.quhao = function() {
return (/^[0-9]{4}$/.test(this.Trim()));

}
