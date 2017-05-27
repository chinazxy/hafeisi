$(function(){

  $(".product_num").keyup(function(){
  
    var inintNums=$(this).val();
	
	$(this).val($(this).val().replace(/[^\d]/g,""));
	
    if(parseInt($(this).val())>0){
	var recid=$(this).next().val();
	
    if(inintNums<=0){
	inintNums=1;
	}
	addNums(recid,inintNums,$(this));
	
	}else{
	$(this).val(1);
	}
  
  })


  $(".reduceNums").click(function(){
  
    var eleindex=$(".reduceNums").index(this);
	
	var inintNums=parseInt($(".good_num").eq(eleindex).val());
	var recid=$(".rec_id").eq(eleindex).val();
	if(inintNums===1){
	
	  alert("订购数量不能少于一件");
	  
	  return false;
	}else{
    inintNums=inintNums-1;
	addNums(recid,inintNums,eleindex);
	
	}
  
  });
  
  
   var checkval=0;
  $(".checkedAll").change(function(){
 
	 checkAll($(this));
  
  });
  
  function checkAll(obj){
     if($(obj).attr("checked")==true){
	     $(".checkedAll").attr("checked",true);
	     $(".recitem").attr("checked",true);
		  $(".checkdd").attr("checked",true);
	 
	 }else{
	   $(".checkedAll").attr("checked",false);
	   $(".recitem").attr("checked",false);
	    $(".checkdd").attr("checked",false);
	 }
  
  
  }
  
  
  $(".deleteItem").click(function(){

  if(confirm("确认要把选中的商品移除购物车吗?")){
  
  //var checkval=$(".checkedAll").eq(0).val();
   // checkAll(obj);

    var cancel=new Array();
	
    $(".recitem").each(function(i){
	
		 if($(this).attr("checked")==true){
	 
	      cancel.push($(this).val());
	 
	 }
	
	
	});
	if(cancel.length>0){
	deleteGoods(cancel);
	}else{
	  alert("请选择要移除购物车的商品");
	}
	
	
  
  }


})

});

function deleteGoods(idarray){

jQuery.ajax({
                type: 'POST',		
                url: 'ajaxcart.php?step=delete_rec_id',
                data:{
                    idarray:idarray
                },
                dataType:"json",
                success: function(data){

                     switch(data.msg){
                        case "sucess":
						
					   location.href="flow.php?step=cart";
						  
                         break; 
                     
					    case "length_error":
						
                           alert('请选择要移除购物车的商品');
					
                         break; 
						   
                        default:
						alert("系统错误，刷新后重试！");
					
    
			  
                    }
		
                }
            });



}


function addNums(id,number,elm){

  if(id>0){
   
     jQuery.ajax({
                type: 'POST',
				
                url: 'ajaxcart.php?step=add_number',
                data:{
                    recid:id,
					number:number
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){

                },
                success: function(data){
                 
                     switch(data.msg){
                        case "sucess":
					
						//elm.val(data.number);
					   
						elm.parent().next().html(data.price);

						$(".totalmoney").html(data.paymoney);
					   $(".heji").html(data.totalprice);
					   $(".jsmoney").html("-"+data.jsmoney);
                         break; 
						 
						 case "kc_error":
					
						 elm.val(data.goods_number);
						 alert("对不起，该商品已经库存不足暂停销售!");
						 break;
                     
					    case "error":
						
                           alert('操作失败');
					
                         break; 
						 
						alert("系统错误，刷新后重试！");
					
    
			  
                    }
		
                }
            });
  
  }


}


