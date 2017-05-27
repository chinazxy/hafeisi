var windowWidch=$(window).width(),
ulobj="",
ullen=0,
bindex=1,
animatestate=0,
speed=6000,
linesp=300;

var lastIndex = 0;

var pagesArr=[];


var page1_action = {};
page1_action.play = function() {
   setTimeout(function(){
	   
	   TweenMax.to($(".bg_margin").eq(0), .8, {
			css: {
				marginTop: 0,
				opacity:1
			},
			ease:Sine.easeInOut,
			delay: 0
		});
	   
	 }, 600);
	 	
},
page1_action.reset = function() {
   
	 	TweenMax.to($(".bg_margin").eq(0), .8, {
			css: {
				marginTop: 50,
				opacity:0
			},
			ease:Sine.easeInOut,
			delay: 0
		});
};

var page2_action = {};
page2_action.play = function() {
      setTimeout(function(){
	   
	   TweenMax.to($(".bg_margin").eq(1), .8, {
			css: {
				marginTop: 0,
				opacity:1
			},
			ease:Sine.easeInOut,
			delay: 0
		});
	   
	  }, 600);
	 	
},
page2_action.reset = function() {
   
	 	TweenMax.to($(".bg_margin").eq(1), .8, {
			css: {
				marginTop: 50,
				opacity:0
			},
			ease:Sine.easeInOut,
			delay: 0
		});
};

var page3_action = {};
page3_action.play = function() {
      setTimeout(function(){
	   
	   TweenMax.to($(".bg_margin").eq(2), .8, {
			css: {
				marginTop: 0,
				opacity:1
			},
			ease:Sine.easeInOut,
			delay: 0
		});
	   
	  }, 600);
	 	
},
page3_action.reset = function() {
   
	 	TweenMax.to($(".bg_margin").eq(2), .8, {
			css: {
				marginTop: 50,
				opacity:0
			},
			ease:Sine.easeInOut,
			delay: 0
		});
};
var page4_action = {};
page4_action.play = function() {
      setTimeout(function(){
	   
	   TweenMax.to($(".bg_margin").eq(3), .8, {
			css: {
				marginTop: 0,
				opacity:1
			},
			ease:Sine.easeInOut,
			delay: 0
		});
	   
	 }, 600);
	 	
},
page4_action.reset = function() {
   
	 	TweenMax.to($(".bg_margin").eq(3), .8, {
			css: {
				marginTop: 50,
				opacity:0
			},
			ease:Sine.easeInOut,
			delay: 0
		});
};
	pagesArr.push(page1_action);
	pagesArr.push(page2_action);
	pagesArr.push(page3_action);
	pagesArr.push(page4_action);
$(document).ready(function(){

var upanimate=false;

$(".bg_dot li").eq(0).addClass("current").siblings().removeClass("current");

var oldval=-1;
 ulobj=$(".bg_boximg ul");
 ullen=$(".bg_boximg ul li").length;

 var listr='';
 
 for(var i=0;i<ullen;i++){
 if(i==0){
  listr+='<li class="current"></li>';
 
 }else{
 listr+='<li></li>';
 }
 }
 
 $(".bg_dot ul").html(listr);

init();


$(window).resize(function(){

init();

ulobj.css("left",-bindex*windowWidch+"px")


});




 play();
 pagesArr[0].play();
$(".bg_dot li").click(function(){

clearAniate();
if (!$(this).is(":animated")) {

  bindex=$(".bg_dot li").index(this);
  
  if(bindex===oldval){
  
    return false;
  }
 

  var mw=bindex*windowWidch;
  
  ulobj.stop().animate({left:[-mw+"px","easeOutCirc"]},1500);
  
  $(this).addClass("current").siblings().removeClass("current");
   pagesArr[bindex].play();
 

	lastIndex >= 0 && lastIndex <= ullen - 1 && pagesArr[lastIndex].reset();
	   lastIndex=bindex;	
		oldval=bindex;
		
		}
});


$(".bg_dot").mouseenter(function(){

clearAniate();

});


$(".bg_dot").mouseleave(function(){
    play();
   

});


	  var flag = false;  
if(navigator.userAgent.indexOf("MSIE")>0)  
{
    if(navigator.userAgent.indexOf("MSIE 6.0")>0)  
    {   
    flag = true;  
    }   
    if(navigator.userAgent.indexOf("MSIE 7.0")>0)  
    {  
    flag = true;  
    }   
    if(navigator.userAgent.indexOf("MSIE 8.0")>0)  
    {  
    flag = true;
    }   
  
}else  
{  
flag = false;  
}

if(document.all){

if(flag){  
 

 
 $(".show-image .bgimg").mouseenter(function(){
$(this).stop().animate({width:330,height:176,marginLeft:-15,marginTop:-8},200,"easeInOutSine");
});

$(".show-image .bgimg").mouseleave(function(){
$(this).stop().animate({width:300,height:160,marginLeft:0,marginTop:0},200,"easeInOutSine");
});





}

}



 




});


function init(){


windowWidch=$(window).width();

ulobj.css("width",ullen*windowWidch+"px");

$(".bg_boximg ul li").css("width",windowWidch+"px");



windowWidch=$(window).width();


}

function play(){
   
    if(bindex==0){
	  bindex=1;
	}
	if(bindex>ullen-1){
	  bindex=0;
	}
     naimatestate=setInterval(function(){

	
	
	
	  
	  	   var mw=bindex*windowWidch;
	   ulobj.stop().animate({left:[-mw+"px","easeOutCirc"]},800);
       $(".bg_dot li").eq(bindex).addClass("current").siblings().removeClass("current");
	   
	    if(lastIndex!==bindex){
	 	pagesArr[bindex].play();

	   lastIndex >= 0 && lastIndex <= ullen - 1 && pagesArr[lastIndex].reset();

		lastIndex=bindex;
		
		}
		
	   bindex++;

	 if(bindex>ullen-1){
	 
	 bindex=0;
	 }
	 

	},speed);
	


}

function clearAniate(){

naimatestate=window.clearInterval(naimatestate);


}




 String.prototype.Trim = function()   
{   
return this.replace(/(^\s*)|(\s*$)/g, "");   
}    