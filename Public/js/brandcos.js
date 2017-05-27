$(document).ready(function(){

$(".bg_big").each(function(){

                        $(this).prev().addClass("loadding");
                        LoadImg($(this));
});

function LoadImg(imgObj) {

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
                
                ShowCaseDetailImage(obj);
            }

        } else {
           
            ShowCaseDetailImage(obj);

        }
    } else {
        image.onload = function() {
            if (image.complete == true) {
             
                ShowCaseDetailImage(obj);
            }
        }

    }

    image.onerror = function() {
        obj.parent().removeClass("img_loading").addClass("img_loading_error");
    }

}



function ShowCaseDetailImage(obj) {

    obj.prev().removeClass("loadding");
    obj.parent().css("background","url("+obj.attr("src")+") no-repeat scroll center center / 100% rgba(0, 0, 0, 0)");
    
 
}


		            var winHeight=$(window).height()-60;
					 var winWidth=$(window).width();
		            $(".b_img").css({height:winHeight});
					$('.carousel li').css({height:winHeight});
					$('.carousel li').css({width:winWidth});
					$('.sort').css({height:winHeight});
				


	$(window).resize(function() {
	               var winHeight=$(window).height()-60;
					 var winWidth=$(window).width();
		            $(".b_img").css({height:winHeight});
					$('.carousel li').css({height:winHeight});
					$('.carousel li').css({width:winWidth});
					$('.sort').css({height:winHeight});
	})





})