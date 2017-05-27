jQuery(function(){

   var checkval=0;
  $(".checkedAll").change(function(){
 
	 checkAll($(this));
  
  });
  
  function checkAll(obj){
    checkval=$(obj).val();
     if($(obj).attr("checked")==true){
	     $(".checkedAll").attr("checked",true);
	    $(".goods_check_"+checkval).attr("checked",true);
	 
	 }else{
	   $(".checkedAll").attr("checked",false);
	   $(".goods_check_"+checkval).attr("checked",false);
	 }
  
  
  }
  
  $(".cart").click(function(){
    var checkval=$(".checkedAll").eq(0).val();
    //checkAll(obj);
    var len= $(".goods_check_"+checkval).length;
	if(len>0){
   var addCari=new Array();
	
    $(".goods_check_"+checkval).each(function(i){
	
		 if($(this).attr("checked")==true){
	 
	      addCari.push($(this).val());
	 
	 }
	
	
	});
	if(addCari.length>0){
	CollectAddCar(addCari);
	}else{
	
	  alert("请选择要添加到购物车的商品");
	}
	
	}else{
	
	  alert("请选择要添加到购物车的商品");
	
	}
	 
});

$(".cancelfollow").click(function(){

  if(confirm("确认取消选中商品的关注吗?")){
  
  var checkval=$(".checkedAll").eq(0).val();
   // checkAll(obj);
    var len= $(".goods_check_"+checkval).length;
	if(len>0){
    var cancel=new Array();
	
    $(".goods_check_"+checkval).each(function(i){
	
		 if($(this).attr("checked")==true){
	 
	      cancel.push($(this).attr("rec_id"));
	 
	 }
	
	
	});
	if(cancel.length>0){
	cancelFollow(cancel);
	}else{
	
	  alert("请选择要取消关注的商品");
	}
	
	}else{
	
	  alert("请选择要取消关注的商品");
	
	}
  
  
  }


})


  

});

function CollectAddCar(idarray){
 
   jQuery.ajax({
                type: 'POST',		
                url: 'user.php?act=add_collect_to_car',
                data:{
                    idarray:idarray
                },
                dataType:"json",
                success: function(data){

                     switch(data.msg){
                        case "add_sucess":
					
					      location.href="flow.php";
						  
                         break; 
                     
					    case "add_empty":
						
                           alert('请选择要添加到购物车的商品');
					
                         break; 
						   
                        default:
						alert("系统错误，刷新后重试！");
					
    
			  
                    }
		
                }
            });

}

function cancelFollow(idarray){

jQuery.ajax({
                type: 'POST',		
                url: 'user.php?act=cancel_follow',
                data:{
                    idarray:idarray
                },
                dataType:"json",
                success: function(data){

                     switch(data.msg){
                        case "delete_sucess":
					   location.href="user.php?act=collection_list";
						  
                         break; 
                     
					    case "cancel_empay":
						
                           alert('请选择要取消关注的商品');
					
                         break; 
						   
                        default:
						alert("系统错误，刷新后重试！");
					
    
			  
                    }
		
                }
            });



}