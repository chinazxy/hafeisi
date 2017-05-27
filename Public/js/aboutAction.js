var page1_action = {};
page1_action.play = function() {
    
	  setTimeout(function(){
	  
	     TweenMax.to($(".Brands"), .5, {
			css: {
				
				opacity:1
			},
			ease:Circ.easeOut,
			delay: 0
		 });
	  
	  
	  });
	 	
},
page1_action.reset = function() {
   	     TweenMax.to($(".Brands"), .7, {
			css: {
				
				opacity:0
			},
			ease:Circ.easeOut,
			delay: 0
		 });
};
var page2_action = {};
page2_action.play = function() {

},
page2_action.reset = function() {

};
var page3_action = {};
page3_action.play = function() {

},
page3_action.reset = function() {

};


