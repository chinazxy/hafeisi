jQuery(function(){

var state=1;
var telephone="";
var consignee=""
var address="";
var email="";




$(".default_address_check").click(function(){

    if($(this).attr("checked")=="checked"){
	
	  $(this).val(1);
	}else{
	 $(this).val(0);
	
	}


})

function yxconsignee(){
  consignee=$(".u_consignee").val();

  if(consignee.Trim()===""){
   $(".consignee_true").hide();
   $(".consignee_false").show();
	return false;
  }
  
   $(".consignee_true").show();
   $(".consignee_false").hide();
   return true;
}


$(".u_consignee").focusout(function(){
yxconsignee();

});

function yzaddress(){
  address=$(".jdaddress").val();
  if(address.Trim()===""){
      $(".address_true").hide();
   $(".address_false").show();
	return false;
  }
  
     $(".address_true").show();
   $(".address_false").hide();
   return true;

}


$(".jdaddress").focusout(function(){
yzaddress();

});


function yzemail(){
  email=$(".email").val();
  if(email.Trim()===""){
       $(".email_true").hide();
   $(".email_false").html("邮箱不能为空！").show();
    return false;
  }else{
  
	 var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   if(!filter.test(email.Trim())){

	   $(".email_true").hide();
   $(".email_false").html("邮箱格式不正确！").show();
    return false;

   }else{
   
	   $(".email_true").show();
   $(".email_false").hide();
     return true;
   }
   
   
  }


}

$(".email").focusout(function(){
yzemail();

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
var selProvince=0;
function checkP(){

 selProvince=$("#selProvince").val();
 
 if(selProvince<=0){
  
      $(".area_true").hide();
	   $(".area_false").html("请选择收货人所在的省份！").show();
   return false;
 
 }
   $(".area_true").show();
	   $(".area_false").hide();
  return true;

}

var selCities=0;
function checkC(){

 selCity=$("#selCities").val();
 
 if(selCity<=0){
  
   
      $(".area_true").hide();
	   $(".area_false").html("请选择收货人所在的城市！").show();
   return false;
 
 }
   $(".area_true").show();
	   $(".area_false").hide();
  return true;

}




var selDistricts=0;
function checkD(){

 selDistricts=$("#selDistricts").val();
 
 if(selDistricts<=0){
     $(".area_true").hide();
	   $(".area_false").html("请选择收货人所在的区域！").show();
 
   
   return false;
 
 }
   $(".area_true").show();
	   $(".area_false").hide();
 
  return true;

}


 $(".address_botton2").click(function(){


   if(!yxconsignee()){
     
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
   
   if(!yzTelephone()){
   
     return false;
   }
   
   if(!yzemail()){
   
     return false;
   }




  document.theForm.submit();
 });
 
 

 
 
 $(".miao_add1_box1").click(function(){
 
   if($(".add_shan",$(this)).hasClass("xiangxia3")){
   
      var miaoH=$(".miao_add1_2").length*parseInt($(".miao_add1_2").innerHeight())+parseInt($(".miao_add1_box1_2").innerHeight());
   
     $(".miao_add1_1").stop().animate({height:miaoH},500);
	 
	 $(".add_shan",$(this)).removeClass("xiangxia3");
   
   }else{
   
       var miaoH=parseInt($(".miao_add1_box1_2").innerHeight());
   
     $(".miao_add1_1").stop().animate({height:miaoH},500);
	 
	 $(".add_shan",$(this)).addClass("xiangxia3");
   
   }
 

 
 });
  
 

});





 
String.prototype.Trim = function() {
var m = this.match(/^\s*(\S+(\s+\S+)*)\s*$/);
return (m == null) ? "" : m[1];
}
String.prototype.isMobile = function() {
return (/(^[0-9]{3,4}\-[0-9]{7}$)|(^[0-9]{7}$)|(^[0-9]{3,4}[0-9]{7}$)|(^0{0,1}13[0-9]{9}$)/.test(this.Trim()));
}