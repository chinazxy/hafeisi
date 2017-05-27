
function play(step){

  setTimeout(function(){
	   
	   TweenMax.to($(".brands_text1").eq(step), .5, {
			css: {
				bottom: 0,
				opacity:1
			},
			ease:Sine.easeInOut,
			delay: 0
		});
	   
	   }, 600);


	   
	   }
	   
	   function reset(step){
	   
	      	   TweenMax.to($(".brands_text1").eq(step), .5, {
			css: {
				bottom: -50,
				opacity:0
			},
			ease:Sine.easeInOut,
			delay: 0
		});
	   }

var page1_action = {};
page1_action.play = function() {

  setTimeout(function(){
	   
	   TweenMax.to($(".brands_text1"), .5, {
			css: {
				bottom: 0,
				opacity:1
			},
			ease:Sine.easeInOut,
			delay: 0
		});
	   
	   }, 600);
	 	
},
page1_action.reset = function() {
   	   TweenMax.to($(".brands_text1"), .5, {
			css: {
				bottom: 80,
				opacity:0
			},
			ease:Sine.easeInOut,
			delay: 0
		});
	
};
var page2_action = {};
page2_action.play = function() {
	       setTimeout(function(){
	   	   TweenMax.to($(".brands_text2"), .5, {
			css: {
				bottom: 0,
				opacity:1
			},
			ease:Sine.easeInOut,
			delay: 0
		});
	 
	   
	   }, 700);
},
page2_action.reset = function() {
	   TweenMax.to($(".brands_text2"), .5, {
			css: {
				bottom: 80,
				opacity:0
			},
			ease:Sine.easeInOut,
			delay: 0
		});
};


var page3_action = {};
page3_action.play = function() {
	       setTimeout(function(){
	   
	 	   TweenMax.to($(".brands_text3"), .5, {
			css: {
				bottom: 50,
				opacity:1
			},
			ease:Sine.easeInOut,
			delay: 0
		});
	   
	   }, 700);
},
page3_action.reset = function() {
	   TweenMax.to($(".brands_text3"), .5, {
			css: {
				bottom:10,
				opacity:0
			},
			ease:Sine.easeInOut,
			delay: 0
		});
};


var page4_action = {};
page4_action.play = function() {
	       setTimeout(function(){
	   
	 	   TweenMax.to($(".brands_text4"), .5, {
			css: {
				bottom: 50,
				opacity:1
			},
			ease:Sine.easeInOut,
			delay: 0
		});
	   
	   }, 700);
},
page4_action.reset = function() {
	   TweenMax.to($(".brands_text4"), .5, {
			css: {
				bottom: 10,
				opacity:0
			},
			ease:Sine.easeInOut,
			delay: 0
		});
};
