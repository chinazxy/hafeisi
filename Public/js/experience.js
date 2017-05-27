$(function(){
		backgroundList = [];
		
		$( '.imgsrc' ).each( function() { 
         backgroundList.push( { 
        src: $( this ).attr( 'imgsrc' ),
        valign: $( this ).data( 'data-valign' ),
	    fade: 2000,
		complete:function(){
			  $(".main_leftnews").fadeIn();
			  $.vegas( 'stop');
			}
         } );
        } );

	 
	 	$.vegas( 'slideshow', { 
			delay: 3000,
			backgrounds: backgroundList
			
	   });
	   
	   
	   $(".close").click(function(){
	   
	     $(".main_leftnews").fadeOut(500,function(){
		 
		    $(".map_search").animate({bottom:32},800);
		 
		 });
	   
	   });
	   
	   $(".map_search").click(function(){
	   
	   $(".main_leftnews").fadeIn(500,function(){
	   
	       $(".map_search").animate({bottom:0},500);
	   
	   });
	   
	   });
	   
			
})
   
