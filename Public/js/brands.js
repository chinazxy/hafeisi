var windowWidch=$(window).width(),
ulobj="",
ullen=0,
bindex=0,
naimatestate=0,
speed=4000,
linesp=300;

var gstate=true;

var lastIndex = 0;

var pagesArr=[];


function play(step){


	   
   setTimeout(function(){
	   gstate=false;
	   TweenMax.to($(".txt_box .animate_1").eq(step), .7, {
			css: {
				bottom: 0,
				opacity:1
			},
			ease:Circ.easeOut,
			delay: 0
		});
		
		   TweenMax.to($(".txt_box .animate_2").eq(step), .7, {
			css: {
				bottom: 0,
				opacity:1
			},
			ease:Circ.easeOut,
			delay: .1
		});
		
		   TweenMax.to($(".txt_box .animate_3").eq(step), .7, {
			css: {
				bottom: 0,
				opacity:1
			},
			ease:Circ.easeOut,
			delay: .2,
			onComplete :function(){
			 gstate=true;
			}
		});
		
		
	   
	 }, 600);



	   
	   }
	   
	   function reset(step){
	 gstate=false;
	   TweenMax.to($(".txt_box .animate_1").eq(step), .5, {
			css: {
				bottom: -80,
				opacity:0
			},
			ease:Sine.easeInOut,
			delay: 0
		});
		
		   TweenMax.to($(".txt_box .animate_2").eq(step), .5, {
			css: {
				bottom: -80,
				opacity:0
			},
			ease:Sine.easeInOut,
			delay: 0
		});
		
		   TweenMax.to($(".txt_box .animate_3").eq(step), .5, {
			css: {
				bottom: -80,
				opacity:0
			},
			ease:Sine.easeInOut,
			delay: 0,
			onComplete :function(){
			// gstate=true;
			}
		});
	   }
$(document).ready(function(){

var upanimate=false;


var oldval=-1;
 ulobj=$(".brand_box_pro ul");
 ullen=$(".brand_box_pro ul li").length;
 var html_li='';
 for(var i=0;i<ullen;i++){
   if(i==0){
   html_li+='<li class="select m0"></li>';
   }else{
    html_li+='<li ></li>';
   }
 }
 $(".b_line_box").css("width",ullen*50);
 $(".b_line_box ul").css("width",ullen*50);
$(".b_line_box ul").empty().html(html_li);

init();
play(0);
//plays();
$(window).resize(function(){

init();

ulobj.css("left",-bindex*windowWidch+"px")


});


$(".b_line_box ul li").click(function(){

if (!$(this).is(":animated")) {

  bindex=$(".b_line_box ul li").index(this);
  
  if(bindex===oldval){
  
    return false;
  }
 

  var mw=bindex*windowWidch;
  
  ulobj.stop().animate({left:[-mw+"px","easeOutCirc"]},800);
  
  $(this).addClass("select").siblings().removeClass("select");
   play(bindex);
 

	lastIndex >= 0 && lastIndex <= ullen - 1 && reset(lastIndex);
	  lastIndex=bindex;	
	oldval=bindex;
		
		}
});





$(".arrow_left").mouseenter(function(){

clearAniate();

});

$(".arrow_right").mouseenter(function(){

clearAniate();

});


$(".arrow_left").mouseleave(function(){
//plays();

});

$(".arrow_right").mouseleave(function(){

//plays();

});







$(".alert_close").click(function(){

$(".alert_box").fadeOut();
});

$(".brand_fotter .boxclose").click(function(){

$(".alert_box").fadeOut();
});



$(".brand_fotter .boxclose").click(function(){

$(".alert_box").fadeOut();
});


$(".gotop").click(function(){
$('.alert_box_content').animate({scrollTop: '0px'}, 500);


});






 



function init(){


windowWidch=$(window).width();

ulobj.css("width",ullen*windowWidch+"px");

$(".brand_box_pro ul li").css("width",windowWidch+"px");



}

   function plays(){
	naimatestate=setInterval(function(){
	
	next();
	},4000);
	
	}





windowWidch=$(window).width();

$(".go_top").click(function(){
$('html,body').animate({scrollTop: '0px'}, 800)

});



$(".arrow_left").click(function(){
if(gstate){
prev();
}
});

$(".arrow_right").click(function(){
if(gstate){
next();
}
});
$(".iframe").click(function(){
clearAniate();
var datahref=$(this).attr("data-href");
$(this).colorbox({href:""+datahref,iframe:true, width:"100%", height:"100%",opacity:"0.85"}); 
});

})



  function prev(){
	
if (!$(".animate_1").eq(bindex).is(":animated")) {

	 if(ullen<2){
	 
	  return false;
	 
	 }
	  bindex--;
	  if(bindex<0){
	  
	  bindex=0;
	  return false;
	  }
	  	
	       var mw=bindex*windowWidch;
  
  ulobj.stop().animate({left:[-mw+"px","easeOutCirc"]},1200);

   $(".b_line_box li").eq(bindex).addClass("select").siblings().removeClass("select");
	   play(bindex);
	   lastIndex >= 0 && lastIndex <= ullen - 1 && reset(lastIndex);
	   lastIndex=bindex;
	   
	}
}
	

	
	
	
	
	function next(){
  
	if (!$(".animate_1").eq(bindex).is(":animated")) {			

	 if(ullen<2){
	 
	  return false;
	 
	 }

	    bindex++;
	  if(bindex>ullen-1){
	
	  bindex=ullen-1;
	  return false;
	  }
	
	 play(bindex);
	 lastIndex >= 0 && lastIndex <= ullen - 1 && reset(lastIndex);
	 lastIndex=bindex;
	     $(".b_line_box li").eq(bindex).addClass("select").siblings().removeClass("select");
		 
 	       var mw=bindex*windowWidch;
  
  ulobj.stop().animate({left:[-mw+"px","easeOutCirc"]},1200);	

		  
	
   }
	
	}

/*function next(){
   
  bindex++;
	if(bindex>ullen-1){
	  bindex=0;
	}
	
	 
	   
	   var mw=bindex*windowWidch;
	   ulobj.stop().animate({left:[-mw+"px","easeOutCirc"]},800);
  
       $(".b_line_box li").eq(bindex).addClass("select").siblings().removeClass("select");
	   
	  play(bindex);
 

	lastIndex >= 0 && lastIndex <= ullen - 1 && reset(lastIndex);
	  lastIndex=bindex;	
	oldval=bindex;
		
	

	

	


}

function prev(){
   bindex--;
	if(bindex<0){
	  bindex=ullen-1;
	}
	
	
	   
	   var mw=bindex*windowWidch;
	   ulobj.stop().animate({left:[-mw+"px","easeOutCirc"]},800);
	    $(".b_line_box li").eq(bindex).addClass("select m0").siblings().removeClass("select");
}  */

function clearAniate(){

naimatestate=window.clearInterval(naimatestate);


}




 String.prototype.Trim = function()   
{   
return this.replace(/(^\s*)|(\s*$)/g, "");   
}    