$(function(){


 var searchval=new Array();

 $(".title").click(function(){
 
 
   if($(this).next().attr("class")==="list_nav"){
   
   if($(this).next().css("display")==="none"){
   
     $(this).addClass("select");
   }else{
   
     $(this).removeClass("select");
   }
   
   $(this).next().slideToggle();
   }
   

 
 
 });
 
 
  $(".container li").click(function(){
  
     if($(this).children().next().next().attr("checked")==="checked"){

	 $(this).children().next().next().attr("checked",false);
	 
	 $(this).children().eq(0).removeClass("yes_check");
	 
     var vals=$(this).children().next().next().val();
	  
	  removeArray(searchval,vals);
	 
	 }else{
	 
	   $(this).children().next().next().attr("checked",true);
	  $(this).children().eq(0).addClass("yes_check");
	  var vals=$(this).children().next().next().val();
	  
	  if(vals!=""){
	  
	  addArray(searchval,vals);
	  
	  }
	 }
  
  
  });
  
  
  function addArray(arrayval,val){
  
    arrayval.push(val);
	
	console.log(arrayval.join(","));
  
  
  }
  
  function removeArray(arrayval,val){
       
	   
	   var index = arrayval.indexOf(val);
       if(index!=-1){
   		  arrayval.splice(index,1);
		  
		 }
		 console.log(arrayval.join(","));
	  	
	  return arrayval;
  
  }
 
});