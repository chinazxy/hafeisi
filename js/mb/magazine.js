$(function(){
var mgli=$(".zazhi_navbox ul li").length;

var mga=Math.ceil(mgli/7);

var mindex=0;

var nowobj=$(".zazhi_navbox ul").find(".li-select");

var zli=$(".zazhi_navbox ul li").index(nowobj);

if(zli>=0){

var zzli=zli%7;

$(".sanjiao").css("left",zzli*125+"px");

}

$(".zazhi_navbox").width(((125*7)-20)*mga);

$(".zazhi_nav_pre").click(function(){

  mindex--;
 if(mindex<0){
    mindex=0;
	return false;
 }
 var movewidth=mindex*((125*7)-20);
 
 $(".zazhi_navbox").stop().animate({marginLeft:-movewidth+"px"},800);
 
});


$(".zazhi_nav_net").click(function(){
 mindex++;
 if(mindex>mga-1){
    mindex=mga-1;
	return false;
 }
 var movewidth=mindex*((125*7)-20);
 $(".zazhi_navbox").stop().animate({marginLeft:-movewidth+"px"},800);
});


$(".mulu_right_down").click(function(){

var muluheight=$(".mulu_left_t").height();

$(".mulu").stop().animate({height:[muluheight+"px","easeOutElastic"]},1500);

});

$(".mulu_right_up").click(function(){


$(".mulu").stop().animate({height:[41+"px","easeOutElastic"]},1500);

});


$(".mulu_tu ul li").mouseenter(function(){
   $(".hp",$(this)).stop().animate({opacity:[0,"easeInOutSine"]},800);
   $(".cs",$(this)).stop().animate({opacity:[1,"easeInOutSine"]},800);



});


$(".mulu_tu ul li").mouseleave(function(){
   $(".cs",$(this)).stop().animate({opacity:[0,"easeInOutSine"]},800);
   $(".hp",$(this)).stop().animate({opacity:[1,"easeInOutSine"]},800);
  $(".hp",$(this)).css("zIndex",100);
$(".cs",$(this)).css("zIndex",98);

})




});