$(function(){
	
	$(window).bind("resize",function(){
	
loginH();	
});

loginH();
function loginH(){
	
		var bh=$(window).height();
		
		$("body").height(bh);
	
}
	
	
})