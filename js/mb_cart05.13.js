$(function(){

  $(".product_num").change(function(){
  
    var inintNums=$(this).val();
	

	
	$(this).val($(this).val().replace(/[^\d]/g,""));
	
    if(parseInt($(this).val())>0){
	var recid=$(this).prev().val();
	
    if(inintNums<=0){
	inintNums=1;
	}
	addNums(recid,inintNums,$(this));
	
	}else{
	$("option",$(this)).eq(0).attr("selected","selected");
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
				
                url: 'ajax-flow.php',
                data:{
                    token: token,
                    timestamp: timestamp,
                    numbs: number,
                    rec_id: id,
                    act: "change_num"
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
                $(".mbloadding",elm.parent().parent()).fadeIn();
                },
                success: function(data){
                   $(".mbloadding",elm.parent().parent()).fadeOut();
                     switch(data.err){
                        case "update_success":
					
						//elm.val(data.number);
					   
						elm.next().html(data.total_price);
						
 
					
					   $(".totalmoney").html(data.total);
					  // $(".jsmoney").html("-"+data.jsmoney);
                         break; 
						 
						 case "kuc_err":
					     alert("商品库存不足!");
					$("option",elm).eq(0).attr("selected","selected");
						 //alert("对不起，该商品已经库存不足暂停销售!");
						 break;
                     
					     case "empty_err":

                        alert("非法数值!");

                        break;
				 
			           case "edit_kuc_err":

                        alert("购买数量变更失败，请重试!");
                        break;

                    case "not_item":

                        alert("非法操作!");
                        break;

                    case "ver_err":

                        alert("验证失败!");
                        break;
                    }
		
                }
            });
  
  }


}

  function drop_goods(id, obj) {
    var nobjs = $(obj);
    var itemind = $(".caca").index(nobjs);

    if (id > 0) {

        $.ajax({
            type: 'POST',
            url: 'ajax-flow.php',
            dataType: "json",
            data: {
                token: token,
                timestamp: timestamp,
                id: id,
                act: "mb_drop_goods"

            },
            beforeSend: function(XMLHttpRequest) {

                 $(".mbloadding",nobjs.parent().parent().parent()).fadeIn();
                fpchangestate = false;

            },
            success: function(data) {
				      $(".mbloadding",nobjs.parent().parent().parent()).fadeOut();
     
                switch (data.err) {

                case "delete_s":
                   
                    $(obj).parent().parent().parent().fadeOut(300,
                    function() {
                        //relashCart();
                        $(obj).parent().parent().parent().remove();
                        var gxhlen = $(".zhong .f_baobao").length;
                         $(".totalmoney").html(data.totp);
                        if (gxhlen == 0) {
                            $(".dengluan").hide();
                            $(".f_dizik").hide();
                            $(".ddw").show();

                        }
                    });

                    break;
                case "no_goods_in_cart":

                    $(obj).parent().parent().parent().fadeOut(300,
                    function() {
                       // relashCart();
                        $(obj).parent().parent().parent().remove();
                           $(".dengluan").hide();
                            $(".f_dizik").hide();
                            $(".ddw").show();
                    });
                    break;

                case "delete_f":
                    alert("删除失败!");

                    break;

                case "not_item":

                    alert("没有找到要删除的记录!");

                    break;
                case "id_empty":

                    alert("没有找到要删除的记录!");

                    break;

                case "not_login":
                    alert("登录超时，请重新登录。");
                    location.href = "user.php?act=login";
                    break;

                case "ver_err":
                    alert("验证失败!");
                    break;

                }

            },
            error: function() {

                alert("系统错误，请重试!");
            }
        });

    } else {

        alert("没有选中要删除的产品！");

    }

}

