var page1_action = {};
page1_action.play = function() {
	//$("#msgtip").val("play1"),
	//showWeixin(),
	//setTimeout(hideWeixin, 2e3)
},
page1_action.reset = function() {
	//$("#msgtip2").val("reset1")
};
var page2_action = {};
page2_action.play = function() {
	$("#msgtip").val("play2"),
	$("#page2_main").stop(!0, !0).animate({
		left: "100px"
	},
	{
		duration: 600,
		queue: !1
	})
},
page2_action.reset = function() {
	$("#msgtip2").val("reset2"),
	$("#page2_main").stop(!0, !0).animate({
		left: "-600px"
	},
	{
		duration: 600,
		queue: !1
	})
};
var page3_action = {};
page3_action.play = function() {
	$("#msgtip").val("play3")
},
page3_action.reset = function() {
	$("#msgtip2").val("reset3")
};
var page4_action = {};
page4_action.play = function() {
	$("#msgtip").val("play4"),
	$("#page4_bear").stop(!0, !1).show().delay(500).animate({
		right: "60px"
	},
	{
		duration: 800,
		queue: !1
	})
},
page4_action.reset = function() {
	$("#msgtip2").val("reset4"),
	$("#page4_bear").stop(!0, !1).show().animate({
		right: "-160px"
	},
	{
		duration: 800,
		queue: !1
	})
};
var page5_action = {};
page5_action.play = function() {
	$("#msgtip").val("play5")
},
page5_action.reset = function() {
	$("#msgtip2").val("reset5")
};
var page6_action = {};
page6_action.play = function() {
	$("#msgtip").val("play6"),
	$("#page6 .page-wrap .page-main").stop(!0, !1).show().delay(500).animate({
		top: "50%"
	},
	{
		duration: 800,
		queue: !1
	})
},
page6_action.reset = function() {
	$("#msgtip2").val("reset6"),
	$("#page6 .page-wrap .page-main").stop(!0, !1).animate({
		top: "150%"
	},
	{
		duration: 800,
		queue: !1
	}).hide()
};