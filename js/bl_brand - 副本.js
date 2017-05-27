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


function ShowCaseDetailImage2(obj,mt) {


$(mt).find(".loadding").animate({opacity:0},300,function(){

 $(this).remove();

});

obj.css("visibility","visible");

}
});