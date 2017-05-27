	var oldval=null;

	var ov=0;
	
	var titleHeight=0;
function webInit() {
	$("#pageloader").hide(),
	$("#header,#footer").show(),
	pageLength = $(".page").length,
	windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	pagesArr.push(page1_action),
	pagesArr.push(page2_action),
	pagesArr.push(page3_action),
	pagesArr.push(page4_action),
	pagesArr.push(page5_action),
	pagesArr.push(page6_action),
	$(window).resize(function() {
		_onResize()
	}),
	_onResize(),
	$(document).keydown(function(e) {
		40 == e.keyCode || 39 == e.keyCode ? gotoPage_Next() : (38 == e.keyCode || 37 == e.keyCode) && gotoPage_Pre()
	});
		
	var color_first=$(".contaner_parent").eq(0).attr("color");

	  $(".detail_box li").css({"background":color_first});
	  
	 $(".moder_bg_absolute").css({"background":color_first});


	
	 $(".container").eq(0).find(".moder_bg").css("height",270+detailHeight);

	
	$("#nav li").click(function(){
        //$(".moder_bg").css("height",350);
		var nindex=$("#nav li").index(this);
		 showDetail(nindex);
	});
	
	
		$(".detail_b").live("click",function(){
	
		$container=$(this).parent().parent();

	   // alert($container.attr("class"));
	var riindex=$(".right").index(this);
	$(".right").removeClass("selcet");
	if(titleHeight>49){
	
		var hh=399+detailHeight;
	
	}else{
		var hh=350+detailHeight;
	
	}
		$container.find(".detail_b").fadeOut();
	 $container.find(".moder_bg_absolute").animate({height:hh,bottom:0},500);
	  $container.find(".moder_bg").animate({height:hh},500);
	 if(titleHeight>49){
	
		 $container.find(".moder_absolute").animate({bottom:0,height:315+detailHeight+49},500,function(){

	});
	
	}else{
			 $container.find(".moder_absolute").animate({bottom:0,height:315+detailHeight},500,function(){

	});
	
	}
	
	});
	
	
	$(".right").live("click",function(){
  
	$container=$(this).parent().parent().parent().parent().parent();
	if($(this).hasClass("selcet")){
	
	var riindex=$(".right").index(this);
	$(this).removeClass("selcet");
	if(titleHeight>49){
	
		var hh=399+detailHeight;
	
	}else{
		var hh=350+detailHeight;
	
	}
	
		$container.find(".detail_b").fadeOut();
	 $container.find(".moder_bg_absolute").animate({height:hh,bottom:0},500);
	  $container.find(".moder_bg").animate({height:hh},500);
	 	if(titleHeight>49){
	
		 $container.find(".moder_absolute").animate({bottom:0,height:315+detailHeight+49},500,function(){

	});
	
	}else{
			 $container.find(".moder_absolute").animate({bottom:0,height:315+detailHeight},500,function(){

	});
	
	}

	
	}else{
	  
		$(this).addClass("selcet");
	$container.find(".moder_bg").css("height",350);
		     $container.find(".moder_bg_absolute").animate({height:350,bottom:0},500);
	     $container.find(".moder_absolute").stop().animate({bottom:64,height:235},500,function(){	   
			       $container.find(".detail_b").fadeIn();
	    })

	}
	
	});
	

	
	$(".up_arrow").hover(function(){
	
	   $(this).stop().animate({top:92},200);
	
	},function(){
	
	 $(this).stop().animate({top:94},200);
	
	});
	
		$(".down_arrow").hover(function(){
	
	   $(this).stop().animate({bottom:60},200);
	
	},function(){
	
	 $(this).stop().animate({bottom:62},200);
	
	});
	
	
		$(".up_arrow2").hover(function(){
	
	   $(this).stop().animate({top:42},200);
	
	},function(){
	
	 $(this).stop().animate({top:44},200);
	
	});
	
		$(".down_arrow2").hover(function(){
	
	   $(this).stop().animate({bottom:20},200);
	
	},function(){
	
	 $(this).stop().animate({bottom:22},200);
	
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
	   $("#nav li").eq(nindex).addClass("cur").siblings().removeClass("cur");
	   

	   var color=$(".page").eq(nindex).attr("color");
	    $(".detail_box li").css({"background":color});
        detailHeight=$(".container").eq(nindex).find(".detail_box").height();
		titleHeight=$(".container").eq(nindex).find(".title").height();
	    var conhtml=$(".container").eq(nindex).find(".moder").html();
   
	   cloneele.find(".moder").empty().html(conhtml);  
	   $(".detail_box li").css({"background":color});
	   cloneele.find(".moder_bg_absolute").css({"background":color,height:350});
	   	   cloneele.find(".moder_absolute").css({"height":235,"bottom":64});
	 
	   cloneele.find(".btn").addClass("right selcet");
	   cloneele.find(".detail_b_s").addClass("detail_b");
	   
	   $(".contain").not(cloneele).find(".moder").empty().fadeIn(500);
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
	
	var topval=(windowHeight-$(".dot_wrap").height())/2+35;

	$(".dot_wrap").css("bottom",54+"px");
	//set_ie6_position()
}

function gotoPage(e) {
	currentIndex != e && (lastIndex = currentIndex, currentIndex = e, _navigate())
}
function openDialog(e, t) {
	art.dialog({
		padding: 20,
		title: t,
		lock: !0,
		fixed: !0,
		padding: 0,
		id: 1,
		content: document.getElementById(e)
	})
}
function closeDialog() {
	var e = art.dialog.list;
	for (var t in e) e[t].close()
}
function showVideo() {
	music_stop(),
	openDialog("video_box", !1)
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
function showWeixin() {
	$("#weixinBtn").hide(),
	$("#weixinBox").stop().fadeIn()
}
function hideWeixin() {
	$("#weixinBox").fadeOut(function() {
		$("#weixinBtn").fadeIn()
	})
}
function showWinner(e) {
	$("#winner_list").hide(),
	$("#winner_loading").show();
	var t = getWinnerList(e),
	n = t.data.length,
	r = "";
	for (var i = 0; i < n; i++) r += "<li><span>" + t.data[i].date + "</span>" + t.data[i].nick + "</li>";
	$("#winner_prize_btn a").each(function() {
		$(this).removeClass("hover")
	}),
	$("#winner_btn" + e).addClass("hover"),
	setTimeout(function() {
		$("#winner_list").fadeIn(),
		$("#winner_loading").hide(),
		$("#winner_list ul").html(r),
		showWinnerImg(e),
		$("#winner_list").bind("jsp-initialised",
		function(e, t) {}).jScrollPane()
	},
	500)
}
function showWinnerImg(e) {
	var t = "";
	switch (e) {
	case 1:
		t = "images/prize1_winner.jpg";
		break;
	case 2:
		t = "images/prize2_winner.jpg";
		break;
	case 3:
		t = "images/prize3_winner.jpg";
		break;
	case 4:
		t = "images/prize4_winner.jpg";
		break;
	case 5:
		t = "images/prize5_winner.jpg";
		break;
	case 6:
		t = "images/prize6_winner.jpg";
		break;
	case 7:
		t = "images/prize7_winner.jpg";
		break;
	case 8:
		t = "images/prize8_winner.jpg";
		break;
	default:
		t = ""
	}
	$("#winner_prize_img").html('<img src="' + t + '" />')
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




