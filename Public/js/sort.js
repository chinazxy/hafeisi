

$(function(){

  $("html").css("overflow","scroll");
  var index=0;
  var dindex=0;
  var windowWidth=$(window).width();
  var len=$(".b_img li").length;
  inits();
  $(".dot_box").css({"width":len*32,"marginLeft":-((len*32)/2)+8});
  $(".dot_box ul").css("width",len*32);
 $(".dot_box li").eq(0).addClass("current");
  $(".dot_box li").hover(function(){
  
    dindex=$(".dot_box li").index(this);
	var moveWidth=windowWidth*dindex;
	$(".b_img ul").stop().animate({left:[-moveWidth,"easeOutCirc"]},800);
	
	$(this).addClass("current").siblings().removeClass("current");
  
  });
  
  function play(){
  
  
  }
  
  function inits(){
  windowWidth=$(window).width();
  windowHeight=$(window).height();
  $(".b_img li").css("width",windowWidth);
   $(".b_img ul").css("width",len*windowWidth);
    $(".b_img ul").css("height",windowHeight-240);
  }
  
  $(window).resize(function(){

inits();
$(".b_img ul").css("left",-dindex*windowWidth);

});



// ÷ª˙…Ã


	  
	  



});


  

	
	