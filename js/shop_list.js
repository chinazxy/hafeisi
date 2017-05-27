$(function(){

var orderval=$(".hide_order_val").val();
$("li",$(".list_right_box2_l_2 ul").eq(0)).each(function(i){
  if($(this).attr("order-val")==orderval){
 $(".list_right_box2_in").val($("a",$(this)).html());
  }

});

});