// JavaScript Document
(function($) {
	var animateState = "",
	navindex = 0,
	step =0,
	imgCollect = "",
	currentEle = $(),
	navHtml = "",
	selfImgList = "",
	imgcount = 0,
	imgArray=new Array(),
	pstate=false,
	pcstate=true,
	thisObj="",
	loading    = $( '<div />' ).addClass( 'slideImg-loading' ),
	Methods = {
		init: function(settings, elem) {
			var self = this;
			var options = {
				imageSelect: '',
				navCls: 'nav_ul',
				hoverClass: 'current',
				delay: 5000,
				fade: 3000,
				loading: true,
				prevClass:'prev',
				nextClass:'next',
				load: function() {},
				complete: function() {}
			}
			self.options = $.extend({},
			$.fn.slideImg.options, settings);
			self.elem = $(elem);
			selfImgList = self.elem.find("li");
			imgArray=selfImgList.clone();
			currentEle = imgArray.eq(0).clone();
			 selfImgList.remove();
			self.elem.append(currentEle.fadeIn(1000));
			currentEle.addClass("ccccc");
			imgcount = imgArray.length;
			if (self.options.fade > self.options.delay) {
				self.options.fade = self.options.delay;
			}
		    	self.showImg();
			
		},

		play: function() {
			
			var self = this;
			// alert(self.options.delay);
			if(pcstate){
			animateState = setInterval(function() {
												
				self.showImg();
				
			},self.options.delay);
			}
		},
		stopP: function() {
			clearInterval(animateState);
		},
		jump: function(s) {

},
		showImg: function() {
			var self = this;
			var nowEle = selfImgList.eq(step).clone();
			nowEle.addClass("ccccc");
			self.stopP();
			 if ( nowEle == currentEle ) {
                    return;
                }
			
			currentEle.stop();
			step++;
			if (step > imgcount - 1) {
				step = 0;
			}
			
			   nowEle.hide().insertAfter(currentEle).fadeIn(self.options.fade,
			function() {
				var that = nowEle;	
				$(".ccccc").not(that).remove();
				$("." + self.options.navCls + " li").eq(step - 1).addClass("" + self.options.hoverClass).siblings().removeClass("" + self.options.hoverClass);
			 self.options.complete.call(that, step - 1);
				
			
			 })	 
			 		 self.play();					
			 currentEle = nowEle;										
												
															
			
		

		},
		
		showFunc:function(){		
			 var self = this;
		   // self.loading();
		     self.stopP();
			var nowEle = selfImgList.eq(step).clone();
			 nowEle.addClass("ccccc");
				$imgObj=nowEle.find("img");
			    self.limg($imgObj);	
			 if ( nowEle == currentEle ) {
                    return;
                }
				
			currentEle.stop();
		
			nowEle.hide().insertAfter(currentEle).fadeIn(self.options.fade,
			function() {
				var that = nowEle;	
				$(".ccccc").not(that).remove();
				$("." + self.options.navCls + " li").eq(step).addClass("" + self.options.hoverClass).siblings().removeClass("" + self.options.hoverClass);
			 self.options.complete.call(that, step - 1);
				
			

			});							
		    currentEle = nowEle;
		
			
		},
		mouseEnterNav: function(s) {
		    pstate=false;
			var self = this;
			self.stopP();
				step = s;
				$("." + self.options.navCls + " li").eq(step).addClass("" + self.options.hoverClass).siblings().removeClass("" + self.options.hoverClass);
				self.showImg();
		},

		mouseLeaveNav: function() {	
			var self = this;
			    self.stopP();
				self.play();

		},
		prev:function(s){
			var self=this;
		 	var prevClass=self.options.prevClass;
	    $("."+prevClass).click(function(){
										pcstate=false;
				  self.stopP();
				  step++;  
				  if (step > imgcount - 1) {
				   step = 0;
			     }
			
				$("." + self.options.navCls + " li").eq(step).addClass("" + self.options.hoverClass).siblings().removeClass("" + self.options.hoverClass);
				self.showFunc();												
	     });
			
		},
		next:function(s){
		    var self=this;
			var nextClass=self.options.nextClass;	
			$("."+nextClass).click(function(){	
				pcstate=false;
				step--;
				if (step < 0) {
				step = imgcount - 1;
			    }
				$("." + self.options.navCls + " li").eq(step).addClass("" + self.options.hoverClass).siblings().removeClass("" + self.options.hoverClass);
				self.showFunc();			
										
			});
			
		},
		loading:function(){
			var self=this;
			var pObj=$( '.'+self.options.imageSelect ).parent();
			loading.prependTo(pObj).fadeIn();
		    var cw=$("."+self.options.imageSelect ).width();
			var ch=$("."+self.options.imageSelect ).height();
			var lw=$(".slideImg-loading").width();
			var lh=$(".slideImg-loading").height();
			var lv=(cw-lw)*.5;
			var tv=(ch-lh)*.5;
			var cssproperty="left:"+lv+"px"+";top:"+tv+"px;";
            loading.attr("style",cssproperty);
			
		},
		loaded:function(){
			
			loading.fadeOut( 'fast', function() {
             $( this ).remove();
            });
			
		},
		limg:function(imgObj){
			
	     var self=this;
	     self.loading();
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
				
                   // obj.attr("src", image.src);
                   self.ShowContentImage(obj);
                }

            } else {
				self.loaded();
              //  obj.attr("src", image.src);
              self.ShowContentImage(obj);

            }
        } else {
            image.onload = function() {
                if (image.complete == true) {
                  //  obj.attr("src", image.src);
                    self.ShowContentImage(obj);
                }
            }

            image.onerror = function() {
                obj.parent().removeClass("slideImg-loading").addClass("slideImg-loading");
            }

        }},
	   	 ShowContentImage:function(obj) {
			 var self=this;
        // obj.parent().removeClass("img_loading");
        // obj.fadeIn(500);
		console.log(1);
		 	self.loaded();
	      }
	
   }

	$.fn.slideImg = function(options) {
	    Methods.init( options,this );

	}

	$.fn.slideImg.options = {
		//   imageSelect: 'imageSelect',
		//   navCls: 'nav_ul',
		//  hoverClass: 'current',
		//   delay: 4000,
		//   fade: 2000,
		//  loading: true,
		//	load: function() {},
		//   complete: function() {
		// alert(s);
		//	}
	};
})(jQuery);;