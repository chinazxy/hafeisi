// JavaScript Document
(function($) {
    $.fn.carousel = function(options) {
        var background_nums = 0,
        steps = 0,
        index = 0,
		t1=null,
		timeoutstate=null,
		state=true;
        backgronuds =[],
		startattr=[],
		endattr=[],
        wrapnavCls =null;
		$(".animated-text").css("opacity",0);
		var len=$(".animated-text").length;
        var opts = $.extend({}, $.fn.carousel.defaults, options);
        background_nums = $("." + opts.imageContain).children("img").length;
        if (opts.navCls !== null) {
            wrapnavCls = "<ul>";
            for (var i = 0; i < background_nums; i++) {
				if(i<background_nums-1){
					if(i==0){
                wrapnavCls += "<li class='dot-select'></li><div class='dot-line'></div>";
					}else{
					 wrapnavCls += "<li></li><div class='dot-line'></div>";	
						
					}
				}else if(i==background_nums-1){
				 wrapnavCls += "<li></li>";
				}
            }
            wrapnavCls += "</ul>";
            $("." + opts.navCls).append(wrapnavCls);
            $("." + opts.imageContain).children("img").each(function(i) {
                backgronuds[i] = {
                    src: '' + $(this).attr("src"),
                    fade: opts.fade,
					load:function(){
						 if(len>0){
				 animationBefor();
				 }
						
					},
                    complete: function() {
					   completeed();

                    
                    }
					
					
                };
            });
            $("." + opts.navCls + " ul li:first").addClass( opts.hoverClass);
            $("." + opts.navCls + " ul li").hover(function() {

                index = $("." + opts.navCls + " ul li").index(this);
                $("." + opts.navCls + " ul li").eq(index).addClass(opts.hoverClass).siblings().removeClass(opts.hoverClass);
                $.vegas('jump', index);
                $.vegas('pause');
				
				clearTimeout(timeoutstate);
            },
            function() {
                $.vegas('start');

            });
        } else {
            $("." + opts.imageClass).each(function(i) {
                backgronuds[i] = {
                    src: '' + $(this).attr("src"),
                    fade: opts.fade
                };
            });
        }

        $.vegas('slideshow', {
            delay: opts.delay,
            backgrounds: backgronuds,
            walk: function(step) {
                 steps = step;
				 if(steps>0){
				 animationBefor();
				// resetShowing();
				 }
				
            }
        })('overlay', {
            src: ''+opts.backgroup_texture
        });

        function completeed() {
            $("." + opts.navCls + " ul li").eq(steps).addClass(opts.hoverClass).siblings().removeClass(opts.hoverClass);
			if(len>0){
		    animationIn();
			
			}else{
				
				
			}
			
			if(steps===0){
		    fontMove();	
		  // checkCaption();
				
			}else if(steps===1){
				//fontMoveClear();
			//	checkCaption();
				//fontMoveClear();
				
				
			}
			
			//console.log(steps);
			
	
        };
		
		
		function animationBefor(){
			
		
		   /*  if(state){
	
				    $("." + opts.imageContain).eq(steps).find("div").each(function(i){
						
			    if(i>0){
					var that=this;
	
					if(opts.textAttr[steps].startCss['top']>0){
					 startattr={};
					 $.each(opts.textAttr[steps].startCss,function(key,val){
						if(key==="top")	{
							startattr[key]=val+10+$(that).height();	
						}else{
						    startattr[key]=val;		
						}				   
					 })
					}
					//  startattr=JSON.stringify(startattr);
					  startattr=[].concat(startattr);
					  startattr=startattr[0];
					  
			     }else{
					  startattr=[]; 
					  startattr=opts.textAttr[steps].startCss;
					    
				 }
				  $(this).css(startattr);
			 
				 });
			
			 }*/
	
		}
		
		 var fontObj=""; 
		 
		 var txt="";
		 
		 	 var txt2="";
	  fontObj=$(".content-img-1");
  
	  function fontMove(){
		  
		  
		
		
/*
			

			var leftval=(parseInt($(".content").width())-parseInt($(".content-img-2").width()))/2;
			
            var cssval="left:"+leftval+"px";
			
		   $(".content-img-2").attr("style",cssval);
		//	
			
				var leftval2=(parseInt($(".content").width())-parseInt($(".content-img-3").width()))/2;
				
            var cssval="left:"+leftval2+"px";
			
		 	$(".content-img-3").attr("style",cssval);*/
			
			//$(".text-1-1").css("opacity",0);
		  
		     
		     $(".text-1-1").fadeIn(2500);
		  
		  	
		/*
	     var list = ["拔弦而知音"];

           txt = $('.content-img-2');
			
			  txt2 = $('.content-img-3');
		
			
				var twidth=$(".content-img-2").width();
			
			var leftval=(parseInt($(".content").width())-parseInt($(".content-img-2").width()))/2;
			
            var cssval="left:"+leftval+"px";
			
			txt.attr("style",cssval);

            var options = {
                duration: 2000,          // 每段句子在页面中的停留时间(ms)
                rearrangeDuration: 1000, // 单词切换间隔时间(ms)
                effect: 'slideTop'         // 显示的动画效果：random, fadeIn, slideLeft, slideTop
            }

            txt.textualizer(list,options);
            txt.textualizer('start');

   
   	         var list2 = ["聚德而知进"];

         
			
			var twidth=$(".content-img-3").width();
			
			var leftval2=(parseInt($(".content").width())-parseInt($(".content-img-3").width()))/2;
			
			
            var cssval="left:"+leftval2+"px";
			
			txt2.attr("style",cssval);

            var options = {
                duration: 2000,          // 每段句子在页面中的停留时间(ms)
                rearrangeDuration: 1000, // 单词切换间隔时间(ms)
                effect: 'slideTop'         // 显示的动画效果：random, fadeIn, slideLeft, slideTop
            }

            txt2.textualizer(list2,options);
            txt2.textualizer('start');*/
	  
	  }
	  
	  
	  function fontMoveClear(){
		    
		txt.empty();
		
		txt2.empty();
	  }
	    var textArray=new Array("拔弦而知音","福建弦德投资有限公司");
		
  
	       var captions = new Array();
            var captionsW = new Array();	
			var j = 0;
			$('.content' ).children().filter(".text-2-2").each(function(i){
				captions[ j ] = $(this);
                captionsW[ j ] = $(this).width();
			    $(this ).text(textArray[i]);
				j++;
			}); 
  
			var slidesArray		    = new Array();
			
				slidesArray[ 0 ] = new Array();
			slidesArray[ 0 ][ 1 ] = captions;
            slidesArray[ 0 ][ 2 ] = captionsW;   
			
      function checkCaption(){
		 
           
        if( slidesArray[ 0 ][ 1 ].length != 0 ){
            showingInProgress = 1;
            var i = 0;
            var total = slidesArray[ 0 ][ 1 ].length;
            var windowH = $(window).height();
            var windowW = $(window).width();
		
            for( i = 0; i < total; i++ ){
                var obj = slidesArray[ 0 ][ 1 ][ i ];
				//obj.css("width","");
					var tlvet1val=(parseInt($(window).width())-parseInt(obj.width()))/2+(parseInt($(".content").width())-parseInt(obj.width()))/2;
    			var width = slidesArray[ 0 ][ 2 ][ i ] + 10; 
                var val = (i == total - 1) ? tlvet1val : -(0);  
                var styleValue = "left:" + val +"px;opacity:1;";
                obj.attr("style", styleValue);                
    			if( i == total - 1 ){ 
		       TweenMax.to( obj,4, { css:{left: -(tlvet1val-windowW*.5-190) +'px'}, ease:SlowMo.ease.config(0.9, 0.96), onComplete:resetShowing }); 
				}
    			else{ 
				 // alert($(".content").width()*0.5+obj.width());
		         TweenMax.to( obj,4, { css:{left:$(".content").width()+obj.width()*0.5-70+'px'}, ease:SlowMo.ease.config(0.9, 0.96) });
				}    			
    		}
        }       
    }
	 
			 function resetShowing(){ 
        showingInProgress = 0;
        if( slidesArray[ 0 ][ 1 ].length != 0 ){
            var i = 0;
            var total = slidesArray[ 0 ][ 1 ].length; 
             for( i = 0; i < total; i++ ){
              slidesArray[ 0 ][ 1 ][ i ].css("opacity", "0");   
             }
        }
    } 

	  


		function animationIn(){
		// fontMove(); 
		/*   tl = new TimelineLite();	
		   
          $("." + opts.imageContain).eq(steps).find("div").each(function(i){	
		           	var that=this;
						   
		            if(i>0){ 

				if(opts.textAttr[steps].endCss['top']>0){
						 endattr={};
		            $.each(opts.textAttr[steps].endCss,function(key,val){
						if(key==="top")	{
							endattr[key]=val+10+$(that).height();	
						}else{
						    endattr[key]=val;		
						}				   
					 });
					  endattr=[].concat(endattr);
					  endattr=endattr[0];
					}
					
				    }else{
					   endattr=[];
					  endattr=opts.textAttr[steps].endCss;	
						
					}
		    tl.append(TweenLite.to($(this), 0.5, {
		    css: endattr,
			ease: opts.textAttr[steps].ease,
			immediateRender: true
		}));									 
													 
		 })*/
		}
		
		function animationOut(){			
			/*timeoutstate= setTimeout(function(){
				  try{
					  
					tl.timeScale(2);
					
		            tl.reverse();
					
                    state=true;
					
				   }catch(e){
				   
			   }	},opts.textdelay);
*/
		}

    };

    $.fn.carousel.defaults = {
        imageClass: 'backgroup-image',
        navCls: 'status',
        hoverClass: 'current',
		backgroup_texture:'overlays/11.png',
		textAttr:[],
		textdelay:1500,
        delay: 4000,
        fade: 2000
    };
})(jQuery);