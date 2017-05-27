$(function(){


$(".hid_img").each(function(){
         
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
                obj.attr("src",image.src);
                ShowCaseDetailImage(obj);
            }

        } else {
             obj.attr("src",image.src);
            ShowCaseDetailImage(obj);

        }
    } else {
        image.onload = function() {
            if (image.complete == true) {
               obj.attr("src",image.src);
                ShowCaseDetailImage(obj);
            }
        }

    }

    image.onerror = function() {
        obj.parent().removeClass("img_loading").addClass("img_loading_error");
    }

}



function ShowCaseDetailImage(obj) {

obj.prev().hide();
obj.fadeIn();

}


})