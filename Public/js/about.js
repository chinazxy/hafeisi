	var oldval=null;

	var ov=0;
	
	
function webInit() {
	$("#pageloader").hide(),
	$("#header,#footer").show(),
	pageLength = $(".page").length,
	windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	pagesArr.push(page1_action),
	pagesArr.push(page2_action),
	pagesArr.push(page3_action),

	$(window).resize(function() {
		_onResize()
	}),
	_onResize(),
	$(document).keydown(function(e) {
		40 == e.keyCode || 39 == e.keyCode ? gotoPage_Next() : (38 == e.keyCode || 37 == e.keyCode) && gotoPage_Pre()
	});
var e = ".scrollbar, .jspVerticalBar";
	$(".up_arrow").click(function() {
		gotoPage_Pre()
		
	}),
	$(".down_arrow").click(function() {
		gotoPage_Next()
	}),
	$("#main").on("mousewheel", _wheelHandler);
	
	$(".nav2 li").click(function(){
	    
		var nlid=$(".nav2 li").index(this);
		
		gotoPage(nlid);
	   
	})
	
	
}




function gotoPage_Pre() {

	if (currentIndex == 0) return;
	lastIndex = currentIndex,
	currentIndex = Math.max(0, Math.min(pageLength, currentIndex - 1)),
	_navigate();
	$("#nav li").eq(currentIndex).addClass("cur").siblings().removeClass("cur");

}
function gotoPage_Next() {
	if (currentIndex == pageLength - 1) return;
	lastIndex = currentIndex,
	currentIndex = Math.max(0, Math.min(pageLength - 1, currentIndex + 1)),
	_navigate();
	$("#nav li").eq(currentIndex).addClass("cur").siblings().removeClass("cur");
	
}
function _navigate() {
	function e() {}
	isScrolling || (isScrolling = !0, $("#main").stop().animate({
		top: -1 * currentIndex * fixHeight
	},
	{
		duration: 1500,
		easing: "easeInOutExpo",
		queue: !1,
		complete: e
	}), 
	currentIndex == 0 ? $("#scrollTips_pre").fadeOut() : $("#scrollTips_pre").fadeIn(), 
	currentIndex == pageLength - 1 ? $("#scrollTips_next").fadeOut() : $("#scrollTips_next").fadeIn()),
	isScrolling = !1;
	
	pagesArr[currentIndex].play(),
	lastIndex >= 0 && lastIndex <= pageLength - 1 && pagesArr[lastIndex].reset()
}
function _onResize() {
	windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	fixHeight = windowHeight,
	$(".page").css({
		width: windowWidth,
		height: fixHeight
	}),
	$("#main").css("height", Math.round(fixHeight * $(".page").length)),
	setTimeout(_navigate, 300);
	
	var topval=(windowHeight-$(".dot_wrap").height())/2+35;

	//$(".dot_wrap").css("top",topval+"px");
	//set_ie6_position()
}

function gotoPage(e) {
	currentIndex != e && (lastIndex = currentIndex, currentIndex = e, _navigate())
	$("#nav li").eq(currentIndex).addClass("cur").siblings().removeClass("cur");
}

function addMouseWheel() {
	$("#main").on("mousewheel", _wheelHandler)
}
function removeMouseWheel() {
	$("#main").off("mousewheel", _wheelHandler)
}
function _wheelHandler(e, t, n, r) {
	e.preventDefault(),
	0 > t ? gotoPage_Next() : gotoPage_Pre();

}


function loadImg(e) {
	var t = new Image;
	t.onload = function() {
		imgLoadedNum += 1,
		getParent()
	},
	t.onerror = function() {
		alert(e)
	},
	t.src = imgsrc[e],
	e < imgCount - 1 && loadImg(e + 1)
}
function getParent() {
	var e = Math.floor(imgLoadedNum / imgCount * 100);
	$("#pernum").html(e + "%")
}
function ontimego() {
	getParent(),
	imgLoadedNum >= imgCount && (webInit(), window.clearInterval(timeHandle))
}
function checkIfWinner() {
	var e = getIfWinner();
	$("#ifWinner_tip").html(e.txt)
}




