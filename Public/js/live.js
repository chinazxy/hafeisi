$(function(){

    var screen_height = $(window).height();
    var at_bu_top =(screen_height-130-280)/2
	var line_top =(screen_height-1)/2
	 $('.at_bu').css({"top":at_bu_top+"px"});
	 $('.line_01,.line_02').css({"top":line_top+"px"});
 var screen_width = $(window).width();

 
 $(window).resize(function(){


 var screen_width = $(window).width();

 var screen_height = $(window).height();
    var at_bu_top =(screen_height-130-280)/2
	var line_top =(screen_height-1)/2
	 $('.at_bu').css({"top":at_bu_top+"px"});
	 $('.line_01,.line_02').css({"top":line_top+"px"});
 var screen_width = $(window).width();
 
  if(screen_width<960){
 $('.line_01').hide();
	  $('.line_02').hide();
	 $('.show_line_01').show();
	  $('.show_line_02').show();


	}
	else{
	    var div_width = (screen_width - 479) / 2;
 $('.line_01').show();
	  $('.line_02').show();
	   $('.show_line_01').hide();
	  $('.show_line_02').hide();
     $('.line_01').width(div_width);
	 $('.line_02').width(div_width);
	

	}

});
 
 
  if(screen_width<960){
 $('.line_01').hide();
	  $('.line_02').hide();
	 $('.show_line_01').show();
	  $('.show_line_02').show();


	}
	else{
	    var div_width = (screen_width - 479) / 2;
 $('.line_01').show();
	  $('.line_02').show();
	   $('.show_line_01').hide();
	  $('.show_line_02').hide();
     $('.line_01').width(div_width);
	 $('.line_02').width(div_width);
	

	}

     $.vegas( 'stop' )( { 
            src: $(".l_img").eq(0).find("a").attr( 'ihref' ),
            valign:$(".l_img").eq(0).find("a").attr( 'data-valign' ),
			fade: 1500,
			complete      : function(){}
      });
  
  
	  
	  $(".l_img").mouseenter(function(){
	  
	    if($(this).find("a").attr("ihref")!="" || $(this).find("a").attr("ihref")!="#" || $(this).find("a").attr("ihref")!="JavaScript:void(0);"){
		
		
		    $.vegas( 'stop' )( { 
            src: $(this).find("a").attr( 'ihref' ),
            valign:$(this).find("a").attr( 'data-valign' ),
			fade: 1500
        });
		
		}
	  
	  
	  });
	  
	  
	 
	  
	
	//moveAnimate();
   
   })
   
   
   function moveAnimate() {

	$(".bu_at").mouseenter(function() {
		requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
		function(callback) {
			setTimeout(callback, 1000 / 60);
		};
		var iRatioX = 0.1,
		iRatioY = 0,
		iSlow = 30,
		iMouseX = 0,
		iMouseY = 0,
		iWindowX = 0,
		iWindowY = 0,
		iMemoryX = 0,
		iMemoryY = 0,
		iMoveX = 0,
		iMoveY = 0,
		figures = $('.item_deep');
		var deepRedraw = function() {
			window.requestAnimationFrame(deepRedraw);

			iMemoryX += (iMouseX - iMemoryX) / iSlow;
			iMemoryY += (iMouseY - iMemoryY) / iSlow;
			iMoveX = iMemoryX - (iWindowX / 2);
			iMoveY = iMemoryY - (iWindowY / 2);

			figures.each(function() {

				$(this).css({
					'margin-left': ((iMoveX * iRatioX * $(this).attr('deepness')) + 'px')
				});
			});
		};

		var updateViewport = function() {
			iWindowX = $(window).width();
			iWindowY = $(window).height();
		};

		$(window).resize(updateViewport);

		$(document).mousemove(function(oEvent) {
			iMouseX = oEvent.clientX;
			iMouseY = oEvent.clientY;
		});

		updateViewport();
		window.requestAnimationFrame(deepRedraw);

	})
}
