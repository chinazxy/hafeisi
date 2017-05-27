
    var index=0;
	     var current_pane = 0;
    /**
     * requestAnimationFrame and cancel polyfill
     */
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



    function Carousel(element)
    {
        var self = this;
        element = $(element);

        var container = $(">.contains", element);
        var panes = $(">.contains>div", element);

        var pane_width = 0;
        var pane_count = panes.length;

   


    
        this.init = function() {
            setPaneDimensions();

            $(window).on("load resize orientationchange", function() {
                setPaneDimensions();
			
            
            })
        };


      
        function setPaneDimensions() {
            pane_width = $(window).width();
            panes.each(function() {
                $(this).width(pane_width);
            });

            container.width(pane_width*pane_count);
			
			
		

        };


        /**
         * show pane by index
         */
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
				//$(">.contains>div").eq(current_pane).css("transform", "scale(0.2)");
            }
            else if(Modernizr.csstransforms) {
                container.css("transform", "translate("+ percent +"%,0)");
            }
            else {
                var px = ((pane_width*pane_count) / 100) * percent;
                container.css("left", px+"px");
            }
        }

        this.next = function() { return this.showPane(current_pane+1, true); };
        this.prev = function() { return this.showPane(current_pane-1, true); };


       
	

        var hammertime = new Hammer($("#carousel")[0], {});
        hammertime.on("release dragleft dragright swipeleft swiperight", function(ev){
		 ev.gesture.preventDefault();
         if($("#carousel").hasClass("dangCu")){
		 
		  return false;
		 }
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

		    var msdf= $(".miao_pre").get(0);
	 if(msdf.addEventListener){
		msdf.addEventListener("touchstart",function(e){
e.stopPropagation();
		 carousel.prev();
		},false);
		
		}
		
		
				    var miao_next= $(".miao_next").get(0);
	 if(miao_next.addEventListener){
		miao_next.addEventListener("touchstart",function(e){
     e.stopPropagation();
		carousel.next();
		},false);
		
		}
		
		
		
		$(".hot_ding").each(function(i){
		var hot_ding=$(".hot_ding").eq(i).get(0);
				 if(hot_ding.addEventListener){
		hot_ding.addEventListener("touchstart",function(e){

			$(".miao_box2").eq(current_pane).show().removeClass("a-fadeout").addClass("a-fadein");
				$(".miao_box2").eq(current_pane).removeClass("page1_22");
		$(".miao_box22").eq(current_pane).addClass("a-divinout");
		
	 
	   $(".miao_box").css("zIndex",44);
	   $("#carousel").addClass("dangCu");
	   	    e.stopPropagation();
		},false);
		
		}
		
		});
		
		var dang_cu_5=$(".zz_dang").get(0);
					 if(dang_cu_5.addEventListener){
		dang_cu_5.addEventListener("touchstart",function(e){

		   $(".miao_box_v").get(0).style.display="block";
	   	    e.stopPropagation();
		},false);
		
		}
		
		var chabox_cu_t=$(".miao_box_v .chabox").get(0);
					 if(chabox_cu_t.addEventListener){
		chabox_cu_t.addEventListener("touchstart",function(e){

		   $(".miao_box_v").fadeOut();
	   	    e.stopPropagation();
		},false);
		
		}

	   
	   		$(".chabox").each(function(i){
		var chabox=$(".chabox").eq(i).get(0);
				 if(chabox.addEventListener){
		chabox.addEventListener("touchstart",function(e){

			$(".miao_box22").eq(current_pane).removeClass("a-divinout").addClass("a-divinin");
		
		$(".miao_box2").eq(current_pane).removeClass("a-fadein");
		
				$(".miao_box2").fadeOut(500);
		 $("#carousel").removeClass("dangCu");
		   $(".miao_box").css("zIndex",11);
		    e.stopPropagation();
		},false);
		
		}
		
		});
	   
	   
	  	
	
	$(function(){
	 var windowW=$(window).width();
	 
	 $(".contains").width(windowW*$(".contains > div").length);
	 
	  $(".contains > div").width(windowW);
	

	
	});