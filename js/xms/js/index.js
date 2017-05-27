$(function(){

$(".has_opacity").mouseenter(function(){

  $(".index2_opacity",$(this)).stop().animate({opacity:.7},300)


});

$(".has_opacity").mouseleave(function(){

  $(".index2_opacity",$(this)).stop().animate({opacity:0},300)


});


$(".index2_pre1,.index2_next1").mouseenter(function(e){

 
  $(".index2_pre1").parent().find(".index2_opacity").animate({opacity:0},300)
  
 e.stopPropagation();

});

$(".index2_pre1,.index2_next1").mouseleave(function(e){

 
  $(".index2_pre1").parent().find(".index2_opacity").animate({opacity:0.7},300)
  



});






$(".index2_box1").not(".mt30").each(function(){

var omj=$(this).find("img");
$(this).find(".index2_opacity").css("opacity",0.7).addClass("loading");
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


function ShowCaseDetailImage2(obj,mt) {


$(mt).find(".index2_opacity").css("opacity",0).removeClass("loading");
obj.css("visibility","visible");

}
lomt();
function lomt(){
$(".has_opacity").each(function(){

var omj=$(this).find("img");

LoadImg(omj,$(this));

});

}

	function LoadImg(imgObj,pobj) {

    var browser = new Object();
    var obj = new Object();
    obj = imgObj;
	pobj=pobj;
    browser.useragent = window.navigator.userAgent.toLowerCase();
    browser.ie = /msie/.test(browser.useragent);
    browser.moz = /gecko/.test(browser.useragent);
    var imgsrc = obj.attr("data-src");
 
 
    var image = new Image;
    image.src = imgsrc;
    if (browser.ie) {
        if (image.height === 0) {
            image.onload = function() {
                obj.attr("src",imgsrc) ;
                ShowCaseDetailImage(obj,pobj);
            }

        } else {
              obj.attr("src",imgsrc) ;
       ShowCaseDetailImage(obj,pobj);

        }
    } else {
        image.onload = function() {
            if (image.complete == true) {
                 obj.attr("src",imgsrc) ;
              ShowCaseDetailImage(obj,pobj);
            }
        }

    }

    image.onerror = function() {
        obj.parent().removeClass("img_loading").addClass("img_loading_error");
    }

}



function ShowCaseDetailImage(obj,pobj) {


 pobj.find(".loadding").hide();

	obj.removeAttr("style");
obj.removeAttr("data-src");
	obj.fadeIn();
   
 
}




 $(".has_opacity").mouseenter(function(){
 
 	$(".pro_opacity", $(this)).stop().animate({
			opacity: .7
		},
		500);
 
 });
 
  $(".has_opacity").mouseleave(function(){
 
 	$(".pro_opacity", $(this)).stop().animate({
			opacity: 0
		},
		500);
 
 });


});