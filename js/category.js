$(function(){




  
  $(".chan_fen_1 ").each(function(){

  NewsLoadImg($(this));
  
  });
  
  
function NewsLoadImg(imgObj) {
  
  
  
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
                
                ShowCaseDetailImage(obj,imgsrc);
            }

        } else {
           
       ShowCaseDetailImage(obj,imgsrc);

        }
    } else {
        image.onload = function() {
            if (image.complete == true) {
             
              ShowCaseDetailImage(obj,imgsrc);
            }
        }

    }

    image.onerror = function() {
        obj.parent().removeClass("img_loading").addClass("img_loading_error");
    }

}




function ShowCaseDetailImage(obj,imgsrc) {

    $(".loadding",obj).fadeOut();

	
    obj.css("background","url("+imgsrc+") no-repeat scroll center center rgba(0, 0, 0, 0)");
	
    obj.css({"-moz-background-size":"cover","-o-background-size":"cover","-ms-background-size":"cover", "background-size":"cover"});
   
 
}
$(".page").css("backgroundColor","#000");
init_category();
$(window).resize(function(){

init_category();

});
function init_category(){

var initH=parseInt($(window).height())-parseInt($(".head").innerHeight())-parseInt($(".foot_gai").innerHeight())+1;
if($(window).width()>960){
$(".chan_fen,.chan_fen_1").css("height",initH);
}else{

$(".chan_fen > .chan_fen_1").css("height",initH);
$(".chan_fen").css("height","100%");

}
}



$(".chan_fen_1").mouseenter(function(e){

 
  $(".chan_fen_3",$(this)).animate({opacity:0},300);
  $(".chan_fen_2 a").not($(".chan_fen_2 a",$(this))).removeClass("select");
  $(".chan_fen_2 a",$(this)).addClass("select");
  
 e.stopPropagation();

});

$(".chan_fen_1").mouseleave(function(e){

 
  $(".chan_fen_3",$(this)).animate({opacity:0.7},300);
  
 $(".chan_fen_2 a").removeClass("select");


});

});