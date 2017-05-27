  (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame =
                    window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                        timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());
	var pane_width =0
	 var pane_count=0;
  function Carousel(element)
    {
        var self = this;
        element = $(element);

        var container = $(">ul", element);
        var panes = $(">ul>li", element);

        pane_width = 0;
        pane_count = panes.length;

        var current_pane = 0;


        /**
         * initial
         */
        this.init = function() {
            setPaneDimensions();

            $(window).on("load resize orientationchange", function() {
                setPaneDimensions();
			
                //updateOffset();
            })
        };


        /**
         * set the pane dimensions and scale the container
         */
        function setPaneDimensions() {
            pane_width = $(window).width();
			
            panes.each(function() {
                $(this).width(pane_width);
            });

            container.width(pane_width*pane_count);
			
			
		

        };


        this.showPane = function(index, animate) {
 
            index = Math.max(0, Math.min(index, pane_count-1));
            current_pane = index;
			
			
            var offset = -((100/pane_count)*current_pane);
		$(".big_text").removeClass("toanimate").addClass("init").eq(index).addClass("toanimate");
            setContainerOffset(offset, animate);
        };


        function setContainerOffset(percent, animate) {
		 
		
            container.removeClass("animate");
           
            if(animate) {
                container.addClass("animate");
            }

         if(Modernizr.csstransforms3d) {
           container.css("transform", "translate3d("+ percent +"%,0,0) scale3d(1,1,1)");
           }
          else if(Modernizr.csstransforms) {
             container.css("transform", "translate("+ percent +"%,0)");
         }
        else {
                var px = ((pane_width*pane_count) / 100) * percent;
                container.stop().animate({left:px+"px"},500);
        }
        }

        this.next = function() { return this.showPane(current_pane+1, true); };
        this.prev = function() { return this.showPane(current_pane-1, true); };


       
	

        var hammertime = new Hammer($(".big_center")[0], {});
        hammertime.on("release dragleft dragright swipeleft swiperight", function(ev){
		 ev.gesture.preventDefault();

            switch(ev.type) {
                case 'dragright':
                case 'dragleft':
                    // stick to the finger
                    var pane_offset = -(100/pane_count)*current_pane;
                    var drag_offset = ((100/pane_width)*ev.gesture.deltaX) / pane_count;

                    // slow down at the first and last pane
                    if((current_pane == 0 && ev.gesture.direction == "right") ||
                        (current_pane == pane_count-1 && ev.gesture.direction == "left")) {
                        drag_offset *= .4;
                    }
                    // console.log(drag_offset);
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
                    // more then 50% moved, navigate
                    if(Math.abs(ev.gesture.deltaX) > pane_width/2) {
                        if(ev.gesture.direction == 'right') {
                            self.prev();
                        } else {
                            self.next();
                        }
                    }
                    else {
                        self.showPane(current_pane, true);
                    }
                    break;
            }
		
		
		});
    }
	
	
	
	  function Carousel2(element)
    {
        var self = this;
        element = $(element);

        var container = $(">ul", element);
        var panes = $(">ul>li", element);

        pane_width = 0;
        pane_count = panes.length;

        var current_pane = 0;


        /**
         * initial
         */
        this.init = function() {
            setPaneDimensions();

            $(window).on("load resize orientationchange", function() {
                setPaneDimensions();
			
                //updateOffset();
            })
        };


        /**
         * set the pane dimensions and scale the container
         */
        function setPaneDimensions() {
            pane_width = $(window).width();
			
            panes.each(function() {
                $(this).width(pane_width);
            });

            container.width(pane_width*pane_count);
			
			
		

        };


        this.showPane = function(index, animate) {
 
            index = Math.max(0, Math.min(index, pane_count-1));
            current_pane = index;
			
			
            var offset = -((100/pane_count)*current_pane);
	
            setContainerOffset(offset, animate);
        };


        function setContainerOffset(percent, animate) {
		 
		
            container.removeClass("animate");
           
            if(animate) {
                container.addClass("animate");
            }

         if(Modernizr.csstransforms3d) {
           container.css("transform", "translate3d("+ percent +"%,0,0) scale3d(1,1,1)");
           }
          else if(Modernizr.csstransforms) {
             container.css("transform", "translate("+ percent +"%,0)");
         }
        else {
                var px = ((pane_width*pane_count) / 100) * percent;
                container.stop().animate({left:px+"px"},500);
        }
        }

        this.next = function() { return this.showPane(current_pane+1, true); };
        this.prev = function() { return this.showPane(current_pane-1, true); };


       
	

        var hammertime = new Hammer($(".index_cen4_boxwrap")[0], {});
        hammertime.on("release dragleft dragright swipeleft swiperight", function(ev){
		 ev.gesture.preventDefault();

            switch(ev.type) {
                case 'dragright':
                case 'dragleft':
                    // stick to the finger
                    var pane_offset = -(100/pane_count)*current_pane;
                    var drag_offset = ((100/pane_width)*ev.gesture.deltaX) / pane_count;

                    // slow down at the first and last pane
                    if((current_pane == 0 && ev.gesture.direction == "right") ||
                        (current_pane == pane_count-1 && ev.gesture.direction == "left")) {
                        drag_offset *= .4;
                    }
                   //  console.log(drag_offset);
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
                    // more then 50% moved, navigate
                    if(Math.abs(ev.gesture.deltaX) > pane_width/2) {
                        if(ev.gesture.direction == 'right') {
                            self.prev();
                        } else {
                            self.next();
                        }
                    }
                    else {
                        self.showPane(current_pane, true);
                    }
                    break;
            }
		
		
		});
    }



    var carousel = new Carousel("#carousel");
    carousel.init();
	
	var carousel2=new Carousel2("#carouse2");
  carousel2.init();


	$(function(){


	   var hammercontent1 = new Hammer($(".dot_box ul").get(0), {}); 
	     
	    //   alert(hammercontent1.attr("class"))
	     $("li",$(".dot_box ul")).on("tap",function(ev){
	       var tindex=$(".dot_box ul li").index(this);
		   
		$(".dot_box ul li").eq(tindex).addClass("current").siblings().removeClass("current");
	      var px = -pane_width*tindex;
                $("#carousel ul").stop().animate({left:px+"px"},500);
	        ev.gesture.stopDetect();
	  });



	  var w = $(window).width();
	$(".hid_img").each(function() {
  	var height = (w*700)/700; 
	 $(".big_img").css("height",height);
 $("#carousel").css("height",height);
  $("#carousel ul").css("height",height);
var img_w = 700;
var img_h = 700;
if(img_w>w){
height = (w*img_h)/img_w; 
$(this).css({"width":w,"height":height});
}


	});
	
		$(window).on("resize", function() {
             w = $(window).width();
			var height = (w*700)/700; 
			 $(".big_img").css("height",height);
 $("#carousel").css("height",height);
 
  $("#carousel ul").css("height",height);
	$(".hid_img").each(function() {
  
var img_w = 700;
var img_h = 700;
if(img_w>w){
height = (w*img_h)/img_w; 
$(this).css({"width":w,"height":height});
} 


	});
	
            })

	


	  

	  
	 
	
	})