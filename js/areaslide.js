 
$(function(){
if($(".men_b").length>0){
	
	$(".men_b").areaslide({
            speed: 500,
            easing: "swing"
        });
	
}


}) 



$.fn.areaslide = function(options) {
    var defaults = {
        speed: '500',
        easing: "swing"
    };
    var opts = $.extend(defaults, options);
    var $objs = $(this);
    var self = this;
    var container =$("ul", $objs);
         if($(window).width()>1180){
		var width = 16*73.75*0.49;
		var height =440;
		}else if($(window).width()>640 && $(window).width()<1180){
		var width = $(window).width()*0.49;
			var height = 440;
		}else if($(window).width()<=640){
		var width=$(window).width();
			var height =($(window).width()*600)/960; 
		}
	
    lileng = $("li", $objs).length,
    spanindex = 0;
    init();
    function init() {
        if($(window).width()>1180){
		width = 16*73.75*0.49;
		height =440;
			 		$(".gs_tj2").height(height);
		}else if($(window).width()>640 && $(window).width()<1180){
		 width = $(window).width()*0.49;
		 height =440;
		 		$(".gs_tj2").height(height);
		}else if($(window).width()<=640){
			height =($(window).width()*600)/960;
				$(".gs_tj2").height(height*2);
			width=$(window).width();
			
		}
	    $(".men_b2,.men_t").width(width);
        $objs.width(width);
		$objs.height(height);
        container.width(lileng * width);
        $("li", $objs).width(width);
		$("li", $objs).height(height);
        var percent = -((100 / lileng) * spanindex);
        if (Modernizr.csstransforms3d) {
            container.css("transform", "translate3d(" + percent + "%,0,0) scale3d(1,1,1)");
        } else if (Modernizr.csstransforms) {
            container.css("transform", "translate(" + percent + "%,0)");
        } else {
            container.css("left", -width * spanindex);

        }

    }

    this.showPane = function(index, animate) {
        index = Math.max(0, Math.min(index, lileng - 1));
        spanindex = index;

        var offset = -((100 / lileng) * spanindex);
        	var inds=Math.ceil(spanindex);

		$(".men_t").not($(".men_t").eq(inds)).stop().animate({opacity:0},500);
		  $(".men_t").eq(inds).show().stop().animate({opacity:1},1500);
        setContainerOffset(offset, animate);
    };

    function setContainerOffset(percent, animate) {

        container.removeClass("animate");

        if (animate) {
            container.addClass("animate");
        }
	
       
        if (Modernizr.csstransforms3d) {
            container.css("transform", "translate3d(" + percent + "%,0,0) scale3d(1,1,1)");
        } else if (Modernizr.csstransforms) {
            container.css("transform", "translate(" + percent + "%,0)");
        } else {

            container.stop().animate({
                left: -width * spanindex
            },
            500);
        }
    }

    this.next = function() {
        return this.showPane(spanindex + 1, true);
    };
    this.prev = function() {
        return this.showPane(spanindex - 1, true);
    };
    var hammertime = new Hammer($objs.get(0), {});
    hammertime.on("release dragleft dragright swipeleft swiperight",
    function(ev) {
        ev.gesture.preventDefault();
        switch (ev.type) {
        case 'dragright':
        case 'dragleft':
            var pane_offset = -(100 / lileng) * spanindex;
            var drag_offset = ((100 / width) * ev.gesture.deltaX) / lileng;
            if ((spanindex == 0 && ev.gesture.direction == "right") || (spanindex == lileng - 1 && ev.gesture.direction == "left")) {
                drag_offset *= .4;
            }
            setContainerOffset(drag_offset + pane_offset);
            break;

        case 'swipeleft':
            self.next();
            ev.gesture.stopDetect();
            break;

        case 'swiperight':
            self.prev();
            ev.gesture.stopDetect();
            break;

        case 'release':
            if (Math.abs(ev.gesture.deltaX) > width / 2) {
                if (ev.gesture.direction == 'right') {
                    self.prev();
                } else {
                    self.next();
                }
            } else {
                self.showPane(spanindex, true);
            }
            break;
        }

    });

    $(".men_dian1").click(function(){
	   self.prev();
	
	});
	
	  $(".men_dian2").click(function(){
	
	  self.next();
	});
   

    $(window).on("load resize orientationchange",
    function() {
        init();
    });

};