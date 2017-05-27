jQuery(function(){

var state=1;
var telephone="";
var consignee=""
var address="";
var email="";



function yxconsignee(){
  consignee=$(".u_consignee").val();

  if(consignee.Trim()===""){
 
   alert("姓名不能为空！");
    $(".u_consignee").focus();
	return false;
  }
  

   return true;
}




function yzaddress(){
  address=$(".jdaddress").val();
  if(address.Trim()===""){
    alert("收货地址不能为空！");
	 $(".jdaddress").focus();
	return false;
  }

   return true;

}





function yzemail(){
  email=$(".email").val();
  if(email.Trim()===""){
     
  alert("邮箱不能为空！");
   $(".email").focus();
    return false;
  }else{
  
	 var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   if(!filter.test(email.Trim())){

	
    alert("邮箱格式不正确！");
	   $(".email").focus();
    return false;

   }else{
  
     return true;
   }
   
   
  }


}


function yzTelephone(){
  telephone=$(".tel").val();
  if(telephone.Trim()===""){
  	 
  alert("手机号码不能为空！");

    return false;
  }else{
   if(!telephone.Trim().isMobile()){
  
     alert("号码格式不正确！");
       $(".tel").focus();
    return false;

   }else{

     return true;
   
   }
   
   
  }


}


var selProvince=0;
function checkP(){

 selProvince=$("#selProvince").val();
 
 if(selProvince<=0){
  
   
	   alert("请选择收货人所在的省份！");
	       $("#selProvince").focus();
   return false;
 
 }

  return true;

}

var selCities=0;
function checkC(){

 selCity=$("#selCities").val();
 
 if(selCity<=0){
  
   

	  alert("请选择收货人所在的城市！");
	    $("#selCities").focus();
   return false;
 
 }
   
  return true;

}




var selDistricts=0;
function checkD(){

 selDistricts=$("#selDistricts").val();
 
 if(selDistricts<=0){
    
	  alert("请选择收货人所在的区域！");
 
     $("#selDistricts").focus();
   return false;
 
 }
  return true;

}


 $(".address_botton3").click(function(){

   var select_address=$("input[name='moren']:checked").val();
   
   var len=$(".address_list").length;
   
   if(len>10){
   
   //  alert("收货地址记录不能超过10条！");
	 
//	 return false;
   }

   if(typeof select_address=="undefined"){
   
       alert("请选择默认的收货地址！");
	   return false;
   }else if(select_address==="add_new_address"){
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
      if(!yzemail()){
   
     return false;
   }
   if(!yzTelephone()){
   
     return false;
   }

  
  }
   document.theForm.submit();
 });
 
 

 
  
 

});





 
String.prototype.Trim = function() {
var m = this.match(/^\s*(\S+(\s+\S+)*)\s*$/);
return (m == null) ? "" : m[1];
}
String.prototype.isMobile = function() {
return (/(^[0-9]{3,4}\-[0-9]{7}$)|(^[0-9]{7}$)|(^[0-9]{3,4}[0-9]{7}$)|(^0{0,1}13[0-9]{9}$)/.test(this.Trim()));
}