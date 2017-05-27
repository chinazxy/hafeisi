	var oldval=null;

	var ov=0;
	
	
	
	

function webInit() {
	$("#pageloader").hide(),
	$("#header,#footer").show(),
	pageLength = $(".page").length,
	windowWidth = $(window).width(),
	windowHeight = $(window).height(),

	$(window).resize(function() {
		_onResize()
	}),
	_onResize(),
	$(document).keydown(function(e) {
		40 == e.keyCode || 39 == e.keyCode ? gotoPage_Next() : (38 == e.keyCode || 37 == e.keyCode) && gotoPage_Pre()
	});
		


	
	$(".dot_ul_s li").click(function(){
        //$(".moder_bg").css("height",350);
		var nindex=$(".dot_ul_s li").index(this);
		 showDetail(nindex);
	});
	

	

	
	
	
	
	


	//setSlideBtn(currentIndex);

	//load_page3_list(1);
	var e = ".jspHorizontalBar, .jspVerticalBar";
	$(".scroll-pane").bind("jsp-initialised",
	function(e, t) {}).jScrollPane(),
	$("#item-7").hover(function() {
		$(this).find(".item7_subNav").stop(!0, !1).slideDown("fast"),
		$(this).find("#sub_nav_7").removeClass("item-7-default").addClass("item-7-hover")
	},
	function() {
		$(this).find(".item7_subNav").stop(!0, !1).slideUp("fast"),
		$(this).find("#sub_nav_7").removeClass("item-7-hover").addClass("item-7-default")
	}),
	$(".up_arrow").click(function() {
		gotoPage_Pre()
	}),
	$(".down_arrow").click(function() {
		gotoPage_Next()
	}),
	$("#main").on("mousewheel", _wheelHandler);
}


function showDetail(nindex){

if(nindex==ov){
		  return false;
		}
	
		gotoPage(nindex);
		 var cloneele=$(".contain");
		 
		
		 $current.stop();
	   $(".dot_ul_s li").eq(nindex).addClass("cur").siblings().removeClass("cur");
	   

	 
	    ov=nindex;



}


function gotoPage_Pre() {

	if (currentIndex == 0) return;
	lastIndex = currentIndex,
	currentIndex = Math.max(0, Math.min(pageLength, currentIndex - 1)),
	_navigate();
	//$("#nav li").eq(currentIndex).addClass("cur").siblings().removeClass("cur");

	showDetail(currentIndex);
}
function gotoPage_Next() {
	if (currentIndex == pageLength - 1) return;
	lastIndex = currentIndex,
	currentIndex = Math.max(0, Math.min(pageLength - 1, currentIndex + 1)),
	_navigate();
	showDetail(currentIndex);
		//$("#nav li").eq(currentIndex).addClass("cur").siblings().removeClass("cur");
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
	}), currentIndex == 0 ? $("#scrollTips_pre").fadeOut() : $("#scrollTips_pre").fadeIn(), currentIndex == pageLength - 1 ? $("#scrollTips_next").fadeOut() : $("#scrollTips_next").fadeIn()),
	isScrolling = !1;
	//pagesArr[currentIndex].play(),
	//lastIndex >= 0 && lastIndex <= pageLength - 1 && pagesArr[lastIndex].reset()
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
	
	
var uliswidth=$(".dot_ul_s li").length*40-24;
	$(".wh").css({
		width: windowWidth,
		height: fixHeight
	});
	
		$(".hid_img").css({
		width: windowWidth,
		height: fixHeight
	});
	
	
$(".live_wrap").css("left",(windowWidth)/2-uliswidth/2);
	
	//set_ie6_position()
}

function gotoPage(e) {
	currentIndex != e && (lastIndex = currentIndex, currentIndex = e, _navigate())
}



function addMouseWheel() {
	$("#main").on("mousewheel", _wheelHandler)
}
function removeMouseWheel() {
	$("#main").off("mousewheel", _wheelHandler)
}
function _wheelHandler(e, t, n, r) {
	e.preventDefault(),
	0 > t ? gotoPage_Next() : gotoPage_Pre()
}


//function getParent() {
	//var e = Math.floor(imgLoadedNum / imgCount * 100);
	//$("#pernum").html(e + "%")
//}
//function ontimego() {
//	getParent(),
	//imgLoadedNum >= imgCount && (, window.clearInterval(timeHandle))
//}
function checkIfWinner() {
	var e = getIfWinner();
	$("#ifWinner_tip").html(e.txt)
}




