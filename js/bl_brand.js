$(function(){

$.stellar.positionProperty.foobar = {
  setPosition: function($el, x, startX, y, startY) {
    $el.css('transform', 'translate3d(' +
      (x - startX) + 'px, ' +
      (y - startY) + 'px, ' +
      '0)');
	  

	 
	 var opacity=Math.abs(startY/y)>1?1:Math.abs(startY/y);
	     var opacity=Math.abs(startY/y)==0?0.2:Math.abs(startY/y); 
				 $el.css("opacity",opacity);

  }
  

}

$.stellar.positionProperty.position = {
    setTop: function($element, newTop, originalTop) {
		 
	 var opacity=Math.abs(originalTop/newTop)>1?1:Math.abs(originalTop/newTop);
	    var opacity=Math.abs(startY/y)==0?0.2:Math.abs(startY/y); 
				 $element.css("opacity",opacity);
    $element.css('top', newTop);
    },
    setLeft: function($element, newLeft, originalLeft) {
    $element.css('left', newLeft);
    }
    }


$.stellar({

    positionProperty: 'foobar',
    responsive: true,
	scrollProperty: 'scroll',
	hideDistantElements:false
});



  $('figure, picture').picture();
  
  
  $(".brand_box").each(function(){
  var omj=$(this).find("img").not(".vid_bg_v img");
  $(".loadding",$(this)).show();
  LoadImg2(omj,$(this));
  
  });
  
  
  function LoadImg2(imgObj,mt) {

    var browser = new Object();
    var obj = new Object();
    obj = imgObj;
    browser.useragent = window.navigator.userAgent.toLowerCase();
    browser.ie = /msie/.test(browser.useragent);
    browser.moz = /gecko/.test(browser.useragent);
    var imgsrc = obj.attr("src");
	
    var image = new Image;
    image.src = imgsrc;
    if (browser.ie) {
        if (image.height === 0) {
            image.onload = function() {
                
                ShowCaseDetailImage2(obj,mt);
            }

        } else {
           
            ShowCaseDetailImage2(obj,mt);

        }
    } else {
        image.onload = function() {
            if (image.complete == true) {
             
                ShowCaseDetailImage2(obj,mt);
            }
        }

    }

    image.onerror = function() {
        obj.parent().removeClass("img_loading").addClass("img_loading_error");
    }

}

var bw=$(window).width();

var bgw=bw*0.4;
			var brand_pian3W=parseInt($(".brand_pian3").width());
		var brand_pian1W=parseInt($(".brand_pian1").width());
	var brand_pian2W=parseInt($(".brand_pian2").width());
	var inleft=parseInt($(".brand_pian2").css("left"));
	
	

var bgs=bw*0.4+bw*0.2;
var llvs=0;
var llvs1=0;
var llvs2=0;
var llvs3=0;
var wwf=parseInt($(window).width());
$(".brand_pian1").css("backgroundPosition","left top");
	$(".brand_pian1").css("width",bgw+"px");
$(".brand_pian2").css("backgroundPosition","-"+bgw+"px top");
	$(".brand_pian2").css("width",bw*0.2+"px");
	
	

$(".brand_pian3").css("backgroundPosition","-"+bgs+"px top");
$(".brand_pian3").css("width",bw*0.4+"px");
if(wwf>960){
$(".brand_box").not(".tanchuan").css("height",parseInt($(window).height())-parseInt($(".head").height()));
}else{
$(".brand_box").css("height","auto");
}

	$(window).resize(function() {
	var bw=$(window).width();
    var bgw=bw*0.4;
    var bgs=bw*0.4+bw*0.2;
	$(".brand_pian1").css("backgroundPosition","left top");
	$(".brand_pian1").css("width",bgw+"px");
    $(".brand_pian2").css("backgroundPosition","-"+bgw+"px top");
	$(".brand_pian2").css("width",bw*0.2+"px");
    $(".brand_pian3").css("backgroundPosition","-"+bgs+"px top");
	$(".brand_pian3").css("width",bw*0.4+"px");
	if(bw>960){
    $(".brand_box").not(".tanchuan").css("height",parseInt($(window).height())-parseInt($(".head").height()));
	}else{
	$(".brand_box").css("height","auto");
	}

	});



	
$(".brand_pian2").mousedown(function(a){

    var d=document;if(!a)a=event | window.event;
	var o=$(this);
        if(!a.pageX)a.pageX=a.clientX;
        if(!a.pageY)a.pageY=a.clientY;
     var x=a.pageX,y=a.pageY;
     if(o.setCapture)
         o.setCapture();
     else if(window.captureEvents)
         window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
     var backData = {y : o.css("left")};
     d.onmousemove=function(a){
         if(!a)a=window.event;
         if(!a.pageX)a.pageX=a.clientX;
       
	     var fx=a.pageX-$(window).width()/2;
		var mv=parseInt(o.css("left"))-a.pageX;
		
         var tx=a.pageX-x+parseInt(o.css("left"));

		 if(tx<=140){
		  return false;
		 }
		 
		  if(tx>=$(window).width()-o.width()-140){
		  return false;
		 }
        o.css("left",tx);
				
		
		//console.log(brand_pian1W);
   
		if(fx>0){
				  $(".brand_pian3").css("width",$(window).width()-brand_pian2W-tx);
				  $(".brand_pian3").css("backgroundPosition",""+$(window).width()-brand_pian2W-tx+"px top");
				  $(".brand_pian1").css("width",$(window).width()-parseInt($(".brand_pian3").width())-brand_pian2W);
				  $(".brand_pian2").css("backgroundPosition","-"+($(window).width()-parseInt($(".brand_pian3").width())-brand_pian2W)+"px top");
				   
		}else{
		  $(".brand_pian3").css("width",$(window).width()-brand_pian2W-tx);
		   $(".brand_pian3").css("backgroundPosition",""+$(window).width()-brand_pian2W-tx+"px top");
		$(".brand_pian1").css("width",$(window).width()-parseInt($(".brand_pian3").width())-brand_pian2W);
		 $(".brand_pian2").css("backgroundPosition","-"+($(window).width()-parseInt($(".brand_pian3").width())-brand_pian2W)+"px top");
		
		}
		
	
            x=a.pageX;
         
     };
     d.onmouseup=function(a){
         if(!a)a=window.event;
         if(o.releaseCapture)
             o.releaseCapture();
         else if(window.captureEvents)
             window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
         d.onmousemove=null;
         d.onmouseup=null;
         if(!a.pageX)a.pageX=a.clientX;
         if(!a.pageY)a.pageY=a.clientY;
         if(!document.body.pageWidth)document.body.pageWidth=document.body.clientWidth;
         if(!document.body.pageHeight)document.body.pageHeight=document.body.clientHeight;
    
     };

});


/*$(".brand_pian2").bind("touchstart",function(a){

    var d=document;if(!a)a=event | window.event;
	var o=$(this);
	
       // if(!a.pageX)a.pageX=a.clientX;
       // if(!a.pageY)a.pageY=a.clientY;
		
		 var a=event.touches[0];
	
     var x=a.pageX,y=a.pageY;
    
     var backData = {y : o.css("left")};
	 $(".brand_pian2").bind("touchmove",function(a){
	

   	 var a=event.touches[0];
       
	     var fx=a.pageX-$(window).width()/2;
		var mv=parseInt(o.css("left"))-a.pageX;
		
         var tx=a.pageX-x+parseInt(o.css("left"));
    
		 if(tx<=40){
		  return false;
		 }
		 
		  if(tx>=$(window).width()-o.width()-80){
		  return false;
		 }
        o.css("left",tx);
				
		
		//console.log(brand_pian1W);
   
		if(fx>0){
				  $(".brand_pian3").css("width",$(window).width()-brand_pian2W-tx);
				  $(".brand_pian3").css("backgroundPosition",""+$(window).width()-brand_pian2W-tx+"px top");
				  $(".brand_pian1").css("width",$(window).width()-parseInt($(".brand_pian3").width())-brand_pian2W);
				  $(".brand_pian2").css("backgroundPosition","-"+($(window).width()-parseInt($(".brand_pian3").width())-brand_pian2W)+"px top");
				   
		}else{
		  $(".brand_pian3").css("width",$(window).width()-brand_pian2W-tx);
		   $(".brand_pian3").css("backgroundPosition",""+$(window).width()-brand_pian2W-tx+"px top");
		$(".brand_pian1").css("width",$(window).width()-parseInt($(".brand_pian3").width())-brand_pian2W);
		 $(".brand_pian2").css("backgroundPosition","-"+($(window).width()-parseInt($(".brand_pian3").width())-brand_pian2W)+"px top");
		
		}
		
	
            x=a.pageX;
	 });

     d.ontouchend=function(a){
         if(!a)a=window.event;
         if(o.releaseCapture)
             o.releaseCapture();
         else if(window.captureEvents)
             window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
         d.onmousemove=null;
         d.ontouchend=null;
         if(!a.pageX)a.pageX=a.clientX;
         if(!a.pageY)a.pageY=a.clientY;
         if(!document.body.pageWidth)document.body.pageWidth=document.body.clientWidth;
         if(!document.body.pageHeight)document.body.pageHeight=document.body.clientHeight;
    
     };

});*/


function ShowCaseDetailImage2(obj,mt) {

$(".loadding",mt).hide();

	
    obj.parent().css("background","url("+obj.attr("src")+") no-repeat scroll center center rgba(0, 0, 0, 0)");
	
   obj.parent().css({"-moz-background-size":"cover","-o-background-size":"cover", "background-size":"cover"});
   


}


$(".read_more").click(function(e){

var remo=$(".read_more").index(this);
if($(".mb_miao_tan").length>0){

$(".miao_tan").eq(remo).fadeIn();
//$(".cont_box ").hide();
}else{

$(".tanchuan").eq(remo).find(".miao_tan").fadeIn();
}

e.stopPropagation();
//$("body").css("overflow-y","hidden");
});

$(".miao_shan").click(function(e){
if($(".mb_miao_tan").length>0){
$(".miao_tan").fadeOut();
//$(".cont_box ").show();
}else{
$(".miao_tan").fadeOut();
}
e.stopPropagation();
});

var bw=$(window).width();

var bgw=bw*0.4;


});