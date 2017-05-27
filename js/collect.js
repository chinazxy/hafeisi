$(function(){

function recollect(){

collw=$(".li_1").height();

var coolwh=collw*350/450;


$(".jiezhang ul li a img").css({width:coolwh,height:collw});

}
recollect();
$(window).resize(function(){

 recollect();

})


});