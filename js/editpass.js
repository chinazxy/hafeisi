jQuery(function(){





var newpass="";

var pass="";

$(".pass").focusout(function(e){
 
  yzPass();
 e.stopPropagation();
});
function yzPass(){
  pass=$(".pass").val();
if(pass.Trim()===""){

   $(".pass-false-pic").html('原密码不能为空').show();
    return false;
  }else{
  
   
  
 // $(".pass-false-pic").show();
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
   $(".newpass-true-pic").hide();
   $(".newpass-false-pic").html('新密码不能为空').show();
    return false;
  }else{
   if(newpass.Trim().length<6){
   
   $(".newpass-true-pic").hide();
   $(".newpass-false-pic").html('新密码不能少于 6 个字符').show();
       return false;
   }else{
  $(".newpass-true-pic").show();
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
    $(".confirm-pass-true").hide();
   $(".confirm-pass-false").html('确认密码不能为空').show();
       return false;

  
  }else{
  
     if(confirmpass===newpass){
	   $(".confirm-pass-true").show();
       $(".confirm-pass-false").html('').hide();
	   return true;
	 }else{
	  $(".confirm-pass-true").hide();
	  $(".confirm-pass-false").html('两次输入密码不一致').show();
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
 
 function submitPass(){
 
 	   if(!yznewPass()){
    return false;
    }
   if(!yzComparePass()){
       return false;
   }


  document.editPassForm.submit();
 
 
 }
 
 
 
 
 });
 
 
 
String.prototype.Trim = function() {
var m = this.match(/^\s*(\S+(\s+\S+)*)\s*$/);
return (m == null) ? "" : m[1];
}
String.prototype.isMobile = function() {
return (/(^[0-9]{3,4}\-[0-9]{7}$)|(^[0-9]{7}$)|(^[0-9]{3,4}[0-9]{7}$)|(^0{0,1}13[0-9]{9}$)/.test(this.Trim()));
}