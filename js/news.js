var itemh=$(".gz_box4").eq(0).outerHeight();
function newinit(){
showLoadding();
var itemw=$(".gz_box4").eq(0).outerWidth();
 itemh=$(".gz_box4").eq(0).outerHeight();
var itembotoom=parseInt($(".gz_box4").eq(0).css("marginBottom"));
var leitem=itemh*2;
$(".gz_box2").height(itemh);
$(".gz_box1,.gz_box1s").height(itemh);
 
/*if($(window).width()<960 && $(window).width()>884 ){
$(".gz_box3").height(itemh+itembotoom);
$(".gz_box3").width(itemw*3+parseInt($(".gz_box4").eq(1).css("marginRight"))*2);
}else if($(window).width()<884 && $(window).width()>640){
$(".gz_box3").height(itemh+itembotoom);
$(".gz_box3").width(itemw*2+parseInt($(".gz_box4").eq(1).css("marginRight")));
}else if($(window).width()<640){
$(".gz_box3").height(itemh+itembotoom);

$(".gz_box3").width(itemw*2+(parseInt($(".gz_box4").eq(1).css("marginRight")))*2);

}else{
$(".gz_box3").height(itemh*2+itembotoom);
$(".gz_box3").width(itemw);
var h=244*$(window).width()/380;
}*/

if($(window).width()>1180){
	 $(".gz_box4 ").width(380);
	$(".gz_bimg,.loadding").height(244);
	 $(".gz_box1").width("66%");
	
}else if($(window).width()<1180 && $(window).width()>1024){
	
		 var hsf=73.75*16;
	 $(".gz_box1").width("66%");
  $(".gz_box4 ").width($(window).width()*0.32);
	var h=244*$(window).width()*0.32/380;
		$(".gz_bimg,.loadding").height(h);
	
}else if($(window).width()>600 && $(window).width()<1024){
	
	  $(".gz_box4,.gz_box2").width("32%");
	  $(".gz_box1").width("66%");
	  	var h=244*$(window).width()*0.32/380;
		$(".gz_bimg,.loadding").height(h);
		$(".gz_box2,.gz_box1,.gz_box1>.loadding,.gz_box2>.loadding").height(h+$(".gz_bt").eq(0).height());
}else if($(window).width()<=600 && $(window).width()>460){
	  $(".gz_box4,.gz_box2").width("48%");
	   var h=244*$(window).width()*0.48/380;
		$(".gz_bimg,.loadding").height(h);
		$(".gz_box1").width("100%");
		$(".gz_box2,.gz_box1,.gz_box1>.loadding,.gz_box2>.loadding").height(h+$(".gz_bt").eq(0).height());
		//$(".gz_box2,.gz_box4").css("marginRight","4%");
		//$(".mart ").css("marginRight","0");
		//$(".gz_box4 ").css("")
			//	$(".gz_box2").height(h+itembotoom);
}else{

	 //  alert($(window).width());
	    $(".gz_box4 ").width("100%");
		var h=244*$(window).width()/380;
		$(".gz_bimg,.loadding").height(h);
			$(".gz_box2").css("marginRight","0");
		$(".gz_box2,.gz_box1,.gz_box1>.loadding,.gz_box2>.loadding").height(h+itembotoom);
$(".gz_box2,.gz_box1").width("100%");

//$(".gz_tb1").css({"paddingTop":"50%",""})
}

/*else if($(window).width()<640){
$(".gz_box3").height(itemh+itembotoom);
$(".gz_box3").width(itemw*3+parseInt($(".gz_box4").eq(1).css("marginRight"))*2);
}else{

$(".gz_box3").height(itemh+itembotoom);
$(".gz_box3").width(itemw*2+parseInt($(".gz_box4").eq(1).css("marginRight")));
}*/



}

$(function(){

    var newbgplay=null;
	

    var myPlayer = null;
	if($("#news_video_1").length>0){
    videojs("#news_video_1").ready(function() {

        myPlayer = this;

        // EXAMPLE: Start playing the video.
        myPlayer.pause();

    });
 $(".vid_bg").addClass("videoOff");
    $(".vid_bg").click(function() {
    $(".gz_p").hide();
	if($(this).hasClass("videoOff")){
		$(".vid_bg").removeClass("videoOff").addClass("videoOn");
		$(".vid_bg").removeClass("bghover");
		    myPlayer.play();
	}else{
			$(".vid_bg").removeClass("videoOn").addClass("videoOff");
		  myPlayer.pause();
	}

	
	 

    });
	}


newinit();


	$(window).resize(function(){
	//tutule(newinit);
newinit();
	});
	
	
	$(".news_bg").each(function(){

	  $(".loadding").show();
	LoadLpImg($(this));
	});

	
	
		function LoadLpImg(objs) {

    var browser = new Object();
    var obj = new Object();
    obj = objs;
    browser.useragent = window.navigator.userAgent.toLowerCase();
    browser.ie = /msie/.test(browser.useragent);
    browser.moz = /gecko/.test(browser.useragent);
    var imgsrc = obj.attr("data-img");

 
    var image = new Image;
    image.src = imgsrc;
    if (browser.ie) {
        if (image.height === 0) {
            image.onload = function() {
              
                ShowLbImage(objs);
            }

        } else {
         ShowLbImage(objs);

        }
    } else {
        image.onload = function() {
            if (image.complete == true) {
                ShowLbImage(objs);
            }
        }

    }

    image.onerror = function() {
        obj.parent().removeClass("img_loading").addClass("img_loading_error");
    }

}


function ShowLbImage(obj) {
       $(".loadding").fadeOut();
     obj.css("background","url("+obj.attr("data-img")+") no-repeat");
	 obj.css({"background-position":"50% 50%","background-size":"cover"});

  
    
 
}
$(window).scroll(function(){
tutule(scrolls);


});
var scrollTop =$(window).scrollTop();
function scrolls(){

scrollTop =$(window).scrollTop();

if($(document).scrollTop()>$(document).height()-$(window).height()-$(".foot_gai").outerHeight()-40){
var times=200;
$(".newitem").each(function(i){
    if(i<7){
    // $(".gz_bimg",$(this)).height($(".gz_bimg").eq(0).height());
	$(this).proloadImg();
     var dtime=200-200/(i+1);
     $(this).show().delay(dtime).animate({marginTop:[0,"swing"],opacity:1},600,function(){


	 $(this).removeClass("newitem");
	 }

	);
}
	   //if(i==8){
	 	
	// $("html, body").animate({
					//	scrollTop: scrollTop-itemh/4
					//},
					//"slow");
	// }
   	
})



}

}

$.fn.proloadImg = function(options) {
	var imgleng=1;
	var count=0;
	var $objs = $(this);
    var self = this;
	$("img",$objs).each(function(){
	    $(".loadding",$objs).show();
		 LoadImg($(this));
	});
	function LoadImg(imgObj) {

        var browser = new Object();
        var obj = new Object();
        obj = imgObj;
        browser.useragent = window.navigator.userAgent.toLowerCase();
        browser.ie = /msie/.test(browser.useragent);
        browser.moz = /gecko/.test(browser.useragent);
    
        var imgsrc = obj.attr("data-src");
        var image = new Image;
        image.src = imgsrc;
        if (browser.ie) {
            if (image.height === 0) {
                image.onload = function() {
                    obj.attr("src", imgsrc);
                    showImage();
                }

            } else {
                obj.attr("src", imgsrc);
                showImage($objs);

            }
        } else {
            image.onload = function() {
                if (image.complete == true) {
                    obj.attr("src", imgsrc);
                    showImage();
                }
            }

        }

        image.onerror = function() {
            obj.parent().removeClass("img_loading").addClass("img_loading_error");
        }

    }
	
	
    function showImage() {
        count++;

		if(count==imgleng){
			
	    $(".loadding",$objs).hide();
		$("img",$objs).animate({opacity:1},200);
		}

       // obj.fadeIn();

    }

	
	

	
	
};

function IeVesion(){
  var browserobj = new Object();

        browserobj.useragent = window.navigator.userAgent.toLowerCase();
        browserobj.ie = /msie/.test(browserobj.useragent);
if(browserobj.ie){
	
	

var browser=navigator.appName;
var b_version=navigator.appVersion;
var version=b_version.split(";");
var trim_Version=version[1].replace(/[ ]/g,"");
var versions=false;
if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0")
{
versions=true;
}
else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0")
{
versions=true;
}
else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0")
{
versions=true;
}
else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0")
{
versions=true;
}else{
	
	versions=false;
}
	
}else{
	
		versions=false;
}
		 return versions;
	}
	
		
	if(IeVesion()){
		
	$(".gz_box4").hover(function(){
		
		$(".gz_bt",$(this)).css("background-color","#000");
		
	},function(){
				$(".gz_bt",$(this)).css("background-color","#fff");
		
	});
		
	}

});