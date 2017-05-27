 
   (function($) {
    $.fn.swap = function(options) {
    var eleBack = null, eleFront = null;
    
 	$nowcon=this;

		$nowcon.mouseenter(function(){
	    //alert(1);

		eleFront=$(this).find(".tximg").eq(0);
        eleBack=$(this).find(".tximg").eq(1);
	    eleFront.addClass("out").removeClass("in");	

        setTimeout(function() {
       eleBack.addClass("in").removeClass("out");
	
    }, 225);
	   });
	   
	   		$nowcon.mouseleave(function(){
	    //alert(1);
	eleFront=$(this).find(".tximg").eq(1);
        eleBack=$(this).find(".tximg").eq(0);
	    eleFront.addClass("out").removeClass("in");	

        setTimeout(function() {
       eleBack.addClass("in").removeClass("out");
	
    }, 225);
   

	
	});
	
  }
	  
	  })(jQuery);