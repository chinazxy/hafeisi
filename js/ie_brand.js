$(function(){
	
		
	function init(){
		
		var h=$(window).width()*1080/1920;
		
		//$(".swiper-slide,.luno,.slides>li,.bg").height(h);
		
		$(".slides>li,.flexslider ").width(1300);
		
		
	
		
	}
	
	$(window).resize(function() {
		
		init();
	});
	
	$(window).load(function() {
		    init();
								     $(".flexslider").flexslider({
        animation: "slide"
		
      });
		});
});