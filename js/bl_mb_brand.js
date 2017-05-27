$(function(){




	  
		  // initVideo();

  $(".head").css("position","relative");

  $(".brand_box").each(function(){
  var omj=$(this).find("img");
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



	



$(".brand_pian2").bind("touchstart",function(a){

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
    
		 if(tx<=60){
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
         var a=event.touches[0];
         d.ontouchmove=null;
         d.ontouchend=null;
         a.pageX=a.pageX;
         a.pageY=a.pageY;
         if(!document.body.pageWidth)document.body.pageWidth=document.body.clientWidth;
         if(!document.body.pageHeight)document.body.pageHeight=document.body.clientHeight;
    
     };

});


function ShowCaseDetailImage2(obj,mt) {


$(mt).find(".loadding").animate({opacity:0},300,function(){

 $(this).remove();

});

obj.css("visibility","visible");

}


$(".tanchuan").click(function(e){


$(".miao_tan").fadeIn();

$(".miao_tan").height($(window).height()*0.95);
$(".miao_tan").css({"position":"relative","top":"50%","marginTop":-$(window).height()*0.95/2-20});

e.stopPropagation();
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