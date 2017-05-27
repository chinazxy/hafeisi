$(function(){
var orgh=$(document).height();
newsinit();
scrolls();
var nw=$(window).width();
function newsinit(){
nw=$(window).width();
if(nw<960){
var nwleft="100%";
}else{
var nwleft=73.75*16*.32;
}
$(".gz_dw2").width(nwleft);

}

function scrolls(){

var scrollTop =$(window).scrollTop();
orgh=$(document).height();

var mth=parseInt($(".gz_m").css("paddingTop"))+$(".gz_de").outerHeight()+$(".gz_dw h1").outerHeight()-$(".gh").outerHeight()-$(".gh1").outerHeight();
if(nw>=960){
var rigf=(nw-73.75*16)/2;
//console.log(scrollTop+"::::"+$(document).scrollTop()+":::"+($(document).height()-$(window).height()-$(".gfoot").outerHeight())+":::"+$(".gfoot").outerHeight())
var f=($(document).height()-$(window).height())/$(document).height();
console.log($(document).height()*f+"::"+$(".gfoot").outerHeight()*f);
if(scrollTop>=mth && scrollTop>0){
if($(document).scrollTop()<=$(document).height()-$(window).height()-$(".gfoot").outerHeight()*f){
$(".gz_dw2").css({position:"relative",top:$(document).scrollTop()-mth});
}else{
return false;
}

}else{
$(".gz_dw2").css({position:"relative",top:0});

}
}else{
$(".gz_dw2").css({position:"relative",top:0});

}

}

$(window).scroll(function(){

scrolls();

});
  
	$(window).resize(function(){
	var r=$(document).height()/orgh;
    console.log(r+"::"+nw);
var scrollTop =$(window).scrollTop();
	 newsinit();
	if($(window).width()>960){
   var mth=parseInt($(".gz_m").css("paddingTop"))+$(".gz_de").outerHeight()+$(".gz_dw h1").outerHeight()-$(".gh").outerHeight()-$(".gh1").outerHeight();
	// var scrollTop =$(window).scrollTop();
	if(r<1){
	  if($(document).scrollTop()>mth){
	 $(".gz_dw2").css({position:"relative",top:$(document).scrollTop()*r-mth});
	 }else{
	  $(".gz_dw2").css({position:"relative",top:0});
	 }
	 }else if(r>=1 && $(document).scrollTop()>mth){
	  $(".gz_dw2").css({position:"relative",top:$(document).scrollTop()-$(document).scrollTop()*(r-1)-mth});
	 }
	 }else{
	 $(".gz_dw2").css({position:"relative",top:0});
	 
	 }
      orgh=$(document).height();
	});
});