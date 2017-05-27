
$(document).ready(function(){


$(".hid_img").each(function(i){

                        $(this).prev().addClass("loadding");
                        LoadImg($(this),i);
});



function LoadImg(imgObj,i) {

    var browser = new Object();
    var obj = new Object();
    obj = imgObj;
	var s =i;
    browser.useragent = window.navigator.userAgent.toLowerCase();
    browser.ie = /msie/.test(browser.useragent);
    browser.moz = /gecko/.test(browser.useragent);
    var imgsrc = obj.attr("src");
    var image = new Image;
    image.src = imgsrc;
    if (browser.ie) {
        if (image.height === 0) {
            image.onload = function() {
                
                ShowCaseDetailImage(obj,s);
            }

        } else {
           
       ShowCaseDetailImage(obj,s);

        }
    } else {
        image.onload = function() {
            if (image.complete == true) {
             
              ShowCaseDetailImage(obj,s);
            }
        }

    }

    image.onerror = function() {
        obj.parent().removeClass("img_loading").addClass("img_loading_error");
    }

}



function ShowCaseDetailImage(obj,i) {

 //resize(obj);
    obj.prev().removeClass("loadding");

	if(i==1){
	  obj.parent().parent().css("background","url("+obj.attr("src")+") no-repeat scroll center center rgba(0, 0, 0, 0)");

	}else{
    obj.parent().parent().css("background","url("+obj.attr("src")+") no-repeat scroll center center rgba(0, 0, 0, 0)");
	
	}
   
 
}





})