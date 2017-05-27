$(function(){
//rimg();
 ws = $(window).width();

  function rimg(){

             ws = $(window).width();
			
			
	$(".hid_img").each(function() {
  
var img_w = 640;
var img_h = $(window).height();

height = (ws*1136)/img_w; 

$(this).css({"width":ws,"height":height});


	

	});
}


	function tutule(method,content){

  clearTimeout(method.animate_id);
  
  method.animate_id=setTimeout(function(){
  
     method.call(content);
  
  },100)



}
	$(window).on("resize", function() {
		
		
//tutule(rimg);


            });


});