var maps_h = 0;

$(function() {
	var fh = $(".footer").height();
	var fhh = $(".fanhui").height();

	//$(".searchimg").addClass("hasOff");
	var w = $(window).width();
	$(".search").click(function() {
		if ($(this).hasClass("hasOff")) {
			$(".search").removeClass("hasOff").addClass("hasOn");
			if ($(".juxing").hasClass("loginOn")) {
				$(".header_nav2").slideUp(300,
				function() {

					$(".juxing").removeClass("loginOn").addClass("loginOff");

					$(".deng_box").fadeOut();

				});
				$(".search_nav").slideDown();
			} else {
				$(this).removeClass("hasOff").addClass("hasOn");
				$(".search_nav").slideDown();
				$(".deng_box").fadeOut();
				$(".mybl").removeClass("mybl_on").addClass("mybl_off");
			}

		} else {

			$(this).removeClass("hasOn").addClass("hasOff");

			$(".search_nav").slideUp();

		}

	});

	$(".deng_box3").click(function(e) {

		e.stopPropagation();
	})

	$(".box_contevt span").mouseenter(function() {
		$(this).stop().animate({
			backgroundPosition: "20px"
		},
		{
			duration: 500
		})
	});
	$(".box_contevt span").mouseleave(function() {
		$(this).stop().animate({
			backgroundPosition: "(10px)"
		},
		{
			duration: 400,
			complete: function() {
				$(this).css({
					backgroundPosition: "10px"
				})
			}
		})
	});

	$(".m_box_contevt span").mouseenter(function() {
		$(this).stop().animate({
			backgroundPosition: "20px"
		},
		{
			duration: 500
		})
	});
	$(".m_box_contevt span").mouseleave(function() {
		$(this).stop().animate({
			backgroundPosition: "(10px)"
		},
		{
			duration: 400,
			complete: function() {
				$(this).css({
					backgroundPosition: "10px"
				})
			}
		})
	})

	$(".deng_anniu").mouseenter(function() {

		$(".deng_sanjiao", $(this)).stop().animate({
			left: "15px"
		},
		300)
	});
	$(".deng_anniu").mouseleave(function() {
		$(".deng_sanjiao", $(this)).stop().animate({
			left: "10px"
		},
		300);
	});

	$(".deng_anniu2").mouseenter(function() {

		$(".deng_sanjiao", $(this)).stop().animate({
			left: "15px"
		},
		300)
	});
	$(".deng_anniu2").mouseleave(function() {
		$(".deng_sanjiao", $(this)).stop().animate({
			left: "10px"
		},
		300);
	});

	$(".pushServiceCallToAction").mouseenter(function() {
		$(this).stop().animate({
			backgroundPosition: "20px"
		},
		{
			duration: 200
		})
	});
	$(".pushServiceCallToAction").mouseleave(function() {
		$(this).stop().animate({
			backgroundPosition: "(10px)"
		},
		{
			duration: 200,
			complete: function() {
				$(this).css({
					backgroundPosition: "10px"
				})
			}
		})
	});
	$('.menu').click(function() {
          
		if ($(".searchimg").hasClass("hasOn")) {

			$(".searchimg").removeClass("hasOn").addClass("hasOff");
			$(".searchContain").slideUp(100,
			function() {
                if($(".shouji_nav").hasClass("menu_off")){
			
				$('div.menu_div').slideUp(200,
				function() {
					$("html, body").animate({
						scrollTop: 0
					},
					"slow");
						 $(".shouji_nav").addClass("menu_on").removeClass("menu_off");
				}).css("z-index", "9");
				productSx();
				 
				}else{
			
					$('div.menu_div').slideDown(200,
				function() {
					$("html, body").animate({
						scrollTop: 0
					},
					"slow");
						 $(".shouji_nav").addClass("menu_off").removeClass("menu_on");
				}).css("z-index", "9");
				productSxOp();
				}
				
          
			});
		} else {
		
		
		 if($(".shouji_nav").hasClass("menu_off")){
			
				$('div.menu_div').slideDown(200,
				function() {
					$("html, body").animate({
						scrollTop: 0
					},
					"slow");
					$(".shouji_nav").addClass("menu_on").removeClass("menu_off");
				}).css("z-index", "9");
				
				
				if($(".map_left").length>0){
				      if($(".map_dian").hasClass("map_mp")){
				   $(".map_left .map_dian").css({"position":"relative",top:0});
				   $(".map_yin").css({"position":"relative"});
				   if($(".map_dian").hasClass("map_on")){
				   $(".dian_upsan").removeClass("select");
		        	 $(".map_dian").removeClass("map_on").addClass("map_off");
		           $(".map_yin").stop().animate({height:0},200);
			 	    $(".map_right").show();
				     $(".map_left").height(0);
				   }
				   
				   }
				
				}
				
				  
			    if($(".shaixuan").length>0){
				  
			    if($(".shaixuan").hasClass("shaixuan_on")){
				
					$(".shaixuan").removeClass("shaixuan_on").addClass("shaixuan_off");
			       $(".shaixuan").slideUp(200);
				     $(".product_wrap,.product_gengduo").show();
					$(".pro_til_san").removeClass("select");
		         	$(".pro_til_in").html("显示筛选器");
					
				}
				
				}
					productSx();
				}else{
			
					$('div.menu_div').slideUp(200,
				function() {
					$("html, body").animate({
						scrollTop: 0
					},
					"slow");
				if($(".map_left").length>0){
				      if($(".map_dian").hasClass("map_mp")){
				   $(".map_left .map_dian").css({"position":"fixed",top:60});
				     $(".map_yin").css({"position":"fixed"});
				   }
				
				}
						$(".shouji_nav").addClass("menu_off").removeClass("menu_on");
				}).css("z-index", "9");
				productSxOp();
				}

	

		}

	});
	
	function productSx(){
	
	  if($(".page").find(".pro_til_in").length>0){
	   if(!IsPC()){
     

	 
	   $(".pro_til_in").addClass("mp");
	   $(".pro_titlew").removeClass("sticky");
	   
	
	   }
	   
	   }

	}
	
		function productSxOp(){
	
	  if($(".page").find(".pro_til_in").length>0){
	   if(!IsPC()){
	
	 
	   $(".pro_til_in").removeClass("mp");
	   $(".pro_titlew").addClass("sticky");
	   
	 
	   }
	   
	   }
	   
	   
	
	
	}
	function initPusth() {
		w = $(window).width();
		var hs = $(".push4").height();
		var ps2h = $(".push2 ").height();
		var marginP = parseInt($(".push3").css("marginBottom"));
		var hfsd = ps2h - hs - marginP - 2

		var hfsd = Math.abs(ps2h - hs - marginP - 2);

		$(".push3").height(hfsd);

	}

	//initVideo();
	function initVideo() {

		w = $(window).width();

		var r = 9 / 16;
		var videoW = w * 0.8;
		var videoH = videoW * r;

		if (IsPC()) {

			$(".video_contain").css({
				height: videoH,
				width: videoW,
				left: "50%",
				marginLeft: -videoW / 2,
				top: "50%",
				marginTop: -videoH / 2
			});
			$(".video_contain").css({
				height: videoH,
				width: videoW,
				left: "50%",
				marginLeft: -videoW / 2,
				top: "50%",
				marginTop: videoH / 2
			});
			$("#example_video_1").css({
				height: videoH,
				width: videoW,
				left: "50%",
				marginLeft: -videoW / 2,
				top: "50%",
				marginTop: -videoH / 2
			});
			$("#example_video_1").css({
				height: videoH,
				width: videoW
			});

		}

	}

/*	$(".line2 .push2").click(function() {
		$("html,body").css("overflow-y", "visible");
		if (IsPC()) {

			$(".vjs-big-play-button").trigger("click");
			$("#myVideo").remove();
			$(".videoPlay").show();
		} else {

			$("#example_video_1").remove();
			$(".videoPlay").show();
			var video = $("#myVideo").get(0);
			$("#myVideo").css({
				left: "50%",
				marginLeft: -$("#myVideo").width() / 2,
				top: "50%",
				marginTop: -$("#myVideo").height() / 2,
				position: "relative"
			});

			video.play();

			if (video.addEventListener) {
				video.addEventListener("pause", functions, false);

			} else if (video.attachEvent) {

				video.attachEvent('onpause' + eventType, functions);

			}

		}



	});*/
	
	 
	     if($(".content_img3_2 .pro_opacity").length>0){

			if ($(".content_img3_2 .pro_opacity").get(0).addEventListener) {
				$(".content_img3_2 .pro_opacity").get(0).addEventListener("click", functions, false);

			} else if ($(".content_img3_2 .pro_opacity").get(0).attachEvent) {

				$(".content_img3_2 .pro_opacity").get(0).attachEvent('onclick', functions);

			}




	$("#example_video_1").click(function(e) {
e.stopPropagation();

});

}

				function functions(e) {
				
				var e=e || window.event;
	       $(".content_img3_2",$(".content_img3_2")).hide();
	       $("img",$(".content_img3_2")).css({"visibility":"hidden",zIndex:1});
	       $(".pro_opacity",$(".content_img3_2")).hide();
            $(".content_img3_t",$(".content_img3_2")).hide();
		       $(".vjs-big-play-button").trigger("click");
			    if(e.preventDefault) {
     e.preventDefault();
    e.stopPropagation();
    }else{
   e.returnValue = false;
    e.cancelBubble = true;
    }
			   

		}
	/*$(".videoPlay").click(function() {
		if (IsPC()) {

			$(".videoPlay").hide();
			var videojs = $("#example_video_1_html5_api").get(0);
			videojs.pause();

		} else {
			$(".videoPlay").hide();
			var video = $("#myVideo").get(0);
			$("html,body").css("overflow-y", "visible");
			video.pause();
		}

		//$(".vjs-big-play-button").trigger("click");

	});*/
	var bw = 0;
	var bwi = 0;

	function imgLoading(obj) {

		w = $(window).width();

		if (w < 960) {

			var rhs = (533 * 0.4) * 533 / 533;
			bw = (w - w * 0.95) / 2;
			bwi = w * 0.95;
			$(".pro_push2 img").css({
				height: rhs,
				width: (533 * 0.4),
				left: "50%",
				marginLeft: -rhs / 2,
				position: "relative"
			});
			$(".qi_img img").css({
				height: rhs,
				width: (533 * 0.4),
				left: "50%",
				marginLeft: -rhs / 2,
				position: "relative"
			});
			$(".proimg").css({
				height: rhs
			});
		} else if (w >= 960) {

			var rhs = (w * 0.75 * 0.333) * 533 / 533;
			$(".pro_push2 img").removeAttr("maxHeight");
			$(".pro_push2 img").css({
				height: "100%",
				width: "100%",
				left: "0",
				marginLeft: 0
			});

			$(".qi_img img").css({
				height: "100%",
				width: "100%",
				left: "0",
				marginLeft: 0
			});

			$(".proimg").css({
				height: "auto"
			});
		}
	}

	imgHising();
	function imgHising(obj) {

		w = $(window).width();

		if (w >= 960) {

			$(".liulan  img").removeAttr("maxHeight");
			$(".liulan  img").css({
				height: 165,
				width: 165,
				left: "0",
				marginLeft: 0
			});
			$(".liulanimg ").css("height", 165);

			$(".liulanimg ").css("height", 165);

			$(".liulanimg .jianbian1").css({
				height: 165
			});
			$(".liulanimg .jianbian2").css({
				height: 165
			});
		}

	}

	function tutule(method, content) {

		clearTimeout(method.animate_id);

		method.animate_id = setTimeout(function() {

			method.call(content);

		},
		100)

	}

	imgLoading();
	initPusth();
	$(window).resize(function() {
		fh = $(".footer").height();
	
		fhh = $(".fanhui").height();
		// imgLoading();
		//initPusth();
		//getTcWidth();
		//loginH();
		//initVideo();
		//lomt();
		//imgHising();
		tutule(footer);
		tutule(f_maps);
		tutule(loginPage);
		tutule(productDetail);
		
			 if($(window).width()>950){
	 
	    $(".shou_head").hide();
	  	$(".shouji_nav").addClass("menu_off").removeClass("menu_on");
		
					if($(".map_left").length>0){
				    
				   $(".map_left .map_dian").css({position:"static",top:60});
				  $(".map_yin").css({"position":"relative"});
					   $(".map_right").show();
				     $(".map_left").height(0);
					 	  $(".foot").show();
						  	    $(".dian_upsan").removeClass("select");
		  	  $(".map_dian").removeClass("map_on").addClass("map_off");
				   }
	 }
	
	});
	
	

	
	productDetail();
	function  productDetail(){
	
	 if($(window).width()<960){
	  
	  var zhos=$(window).width()-40;
	  
	var zhow=$(".prode_img ").height();
	
	
	}else{
	
	var zhos=$(window).width()*0.6*0.6;
	
	}
	
	$(".mousetrap").css({width:zhos,height:zhow});
	
	}

	//getTcWidth();
	//loginH();
	f_maps();
	function f_maps() {
		w = parseInt($(window).width());
		hf = $(window).height();
		var mhs = hf - 100;

		if (w <= 900) {

			var mpsh = hf - 60 - 40 - 86 - 56;

			$(".dian_cha3,.searchContain").height(mpsh);
			//$(".scrollbar,.track").height(mpsh);

			$(".map_yin").css("width", "100%");
			$(".map_right").css("height", mhs);

		} else {
			$(".map_right").css("height", 500);

			$(".dian_cha3,.searchContain").height(390);
			$(".scrollbar").height(390);
			$(".track").height(390);
			$(".dian_cha3").height(390);

			$(".map_left").css("height", "auto");
			$(".map_yin").css("height", 0);

		}

	}
	function loginH() {

		if (parseInt($(window).width()) > 960) {

			$(".menu_div").hide();
			var cheight = parseInt($(window).height()) - parseInt($(".foot").height()) - parseInt($(".header").height());

			$(".loginContent ").height(cheight);

		} else {

			$(".loginContent ").height("auto");

		}

	}



	function getTcWidth() {
		w = $(window).width();
		var tcwidth = w * 0.6;
		var atcwidth = w * 0.6 + parseInt($(".zezao_txt").css("paddingLeft")) * 2;
		$(".zezao_txt").css({
			width: tcwidth,
			left: "50%",
			marginLeft: -atcwidth / 2
		});

	}
	footer();
	function footer() {

		w = $(window).width();

		if (w <= 960) {
			$(".map_dian").removeClass("map_pc").addClass("map_mp");
			$(".foot").removeClass("footer_pc").addClass("mb_footer_up");

		} else {
			$(".map_dian").removeClass("map_mp").addClass("map_pc");
			$(".foot").removeClass("mb_footer_up").addClass("footer_pc");

		}

	}

	$(".fanhui,.footer_up").click(function() {

		$("html, body").animate({
			scrollTop: 0
		},
		"slow")

	});

	$(".mybl").click(function(e) {

		if ($(this).hasClass("mybl_off")) {
			$(this).removeClass("mybl_off").addClass("mybl_on");
			if ($(".search ").hasClass("hasOn")) {
				$(".search").removeClass("hasOn").addClass("hasOff");
				$(".search_nav").slideUp(300,
				function() {

					$(".deng_box").fadeIn();

				});
			} else {
				$(".deng_box").fadeIn();
			}
		} else {
			$(this).removeClass("mybl_on").addClass("mybl_off");
			$(".deng_box").fadeOut();
		}

		e.stopPropagation();
	});

	$(".deng_close").click(function(e) {

		$(".deng_box").fadeOut();
		$(".mybl").removeClass("mybl_on").addClass("mybl_off");
		e.stopPropagation();

	});

	$(".mybolon ").click(function() {
		$(".shou_dengbox ").slideToggle(300);
		scroolTop = $(".mybolon ").offset().top - 50;

		$("html, body").animate({
			scrollTop: scroolTop
		},
		"slow");

	});
	
	$(".shou_dengbox").click(function(e){
	
	 e.stopPropagation();
	});

	$(".juxing").click(function(e) {
		if ($(this).hasClass("loginOn")) {

			$(".header_nav2").slideUp(300);
			$(this).removeClass("loginOn").addClass("loginOff");
			$(".deng_box").fadeOut();
		} else {
			if ($(".searchimg").hasClass("hasOn")) {

				$(".searchimg").removeClass("hasOn").addClass("hasOff");
				$(".searchContain").slideUp(300,
				function() {

					$(".header_nav2").slideDown(300);
					$(".juxing").removeClass("loginOff").addClass("loginOn");

				});

			} else {

				$(".header_nav2").slideDown(300);
				$(".juxing").removeClass("loginOff").addClass("loginOn");

			}

		}

		e.stopPropagation();
	});

	$(".mybl").click(function(e) {

		e.stopPropagation();

	});
	$(".wishlist").click(function(e) {

		e.stopPropagation();

	});

	$(".mb_foot").find(".triangle").addClass("seke");
	$(".foot .mb_foot").click(function() {
		if ($(".foot").hasClass("mb_footer_up")) {

			var ftindex = $(".mb_foot").index(this);

			var ftlen = $(".f_nav").eq(ftindex).find("a").length;

			var moveH = 20 + ftlen * 30;
			// $(".mb_foot").eq(ftindex).find(".triangle").removeClass("seke");
			var triangle = $(".mb_foot").eq(ftindex).find(".triangle");
			$(".f_nav").not($(".f_nav").eq(ftindex)).animate({
				height: "0"
			},
			500);
			$(".mb_foot").not($(".mb_foot").eq(ftindex)).find(".triangle").addClass("seke");
			if (triangle.hasClass("seke")) {
				$(".f_nav").eq(ftindex).stop().animate({
					height: moveH
				},
				500);
				triangle.removeClass("seke");
			} else {
				triangle.addClass("seke");
				$(".f_nav").eq(ftindex).stop().animate({
					height: 0
				},
				500);
			}

		}

	});

	//lomt();
	function lomt() {
		$(".index2_box1  .mt30").each(function() {

			var omj = $(this).find("img");
			$(this).find(".index2_opacity").css("opacity", 0.7).addClass("loading");
			LoadImg(omj, $(this));

		});

	}

	function LoadImg(imgObj, mt) {

		var browser = new Object();
		var obj = new Object();
		obj = imgObj;
		browser.useragent = window.navigator.userAgent.toLowerCase();
		browser.ie = /msie/.test(browser.useragent);
		browser.moz = /gecko/.test(browser.useragent);
		var imgsrc = obj.attr("src");
		var image = new Image;
		image.src = imgsrc;
		if (browser.ie) {
			if (image.height === 0) {
				image.onload = function() {

					ShowCaseDetailImage(obj, mt);
				}

			} else {

				ShowCaseDetailImage(obj, mt);

			}
		} else {
			image.onload = function() {
				if (image.complete == true) {

					ShowCaseDetailImage(obj, mt);
				}
			}

		}

		image.onerror = function() {
			obj.parent().removeClass("img_loading").addClass("img_loading_error");
		}

	}

	function ShowCaseDetailImage(obj, mt) {

		var h = $(obj).height();
		w = $(window).width();

		if ($(mt).hasClass("mtp30")) {
			w = w / 2;
			var hs = w * h / $(obj).width();

		} else {

			var hs = w * h / $(obj).width();

		}

		if ($(obj).width() < w) {
			hs = $(obj).height();

		}

		mt.height(hs);
		$(mt).find(".index2_opacity").css("opacity", 0).removeClass("loading");
		obj.css("visibility", "visible");

	}

	$(window).scroll(function() {
		var scrollTop = $(this).scrollTop();
		var scrollHeight = getScrollHeight();

		var windowHeight = $(this).height();

		　　
		if (scrollHeight - scrollTop - windowHeight <= fh) {

			$(".fanhui").show().css("bottom", 50);　　
		} else if (scrollTop > windowHeight) {

			$(".fanhui").show().css("bottom", 50);

		} else {
			$(".fanhui").hide().css("bottom", 50);
		}
	});

	/*lvfei 1.20 */

	var fnavl = new Array();
	$(".f_nav").each(function(i) {

		fnavl[i] = $(this).find("a").length;

	});

	var maxLen = Math.max.apply(null, fnavl.join(",").split(","));

	$(".foot ").mouseenter(function() {

		if ($(this).hasClass("footer_pc")) {
			if (maxLen > 0) {
				var fheigh = maxLen * 30 + 30;
				$("html, body").animate({
					scrollTop: $(window).scrollTop() + fheigh
				},
				500);
				$(".footer_3").stop().animate({
					height: [fheigh, "easeInOutQuart"]
				},
				500);

			}

		}

	});

	$(".foot ").mouseleave(function() {
		if ($(this).hasClass("footer_pc")) {
			if (maxLen > 0) {
				$(".footer_3").stop().animate({
					height: [0, "easeInOutQuart"]
				},
				500);
			}

		}

	});

	$(".footer_2 .footer_3_1,.footer_up").mouseenter(function(e) {

		e.stopPropagation();

	});

	$(".footer_2 .footer_3_1").mouseleave(function(e) {

		e.stopPropagation();

	});

	/*登录公共部份*/

	$(".email").focusin(function() {
		if ($(this).val() === "输入用户名") {
			$(this).val("");

		}

	});

	$(".email").focusout(function() {
		if ($(this).val().Trim() === "" || $(this).val().Trim() === "输入用户名") {
			$(this).val("输入用户名");

		} else {

			validateEmail();

		}

	});

	function validateEmail() {

		if ($(".email").val().Trim() === "" || $(".email").val().Trim() === "输入用户名") {
			$(".u_left_t").addClass("false_color");
			$(".deng_false").show().html("用户名不能为空!");
			return false;

		}
		$(".u_left_t").removeClass("false_color");
		return true;

	}

	$(".password").focusout(function() {

		validatePassword();

	});

	function validatePassword() {

		if ($(".password").val().Trim() === "" || $(".password").val().Trim() === "输入密码") {
			$(".p_left_t").addClass("false_color");
			$(".deng_false").show().html("密码不能为空!");
			return false;

		}
		$(".p_left_t").removeClass("false_color");
		return true;

	}

	$(".deng_anniu").click(function() {

		submitLogin();
	});

	function submitLogin() {

		if (!validateEmail()) {

			return false;

		}

		if (!validatePassword()) {

			return false;

		}

		var email = $(".email").val();

		var password = $(".password").val();

		$.ajax({
			type: 'POST',
			url: 'user.php',
			data: {
				email: email,
				password: password,
				act: "signin"
			},
			dataType: "json",
			beforeSend: function(XMLHttpRequest) {

},
			success: function(data) {

				switch (data.error) {

				case 1:
					var back_act = $(".back_act").val();

					setTimeout(function() {

						location.href = back_act;
					},
					100);
					break;
				case 2:

					$(".deng_false").show().html("用户名不能为空!");
					$(".u_left_t").addClass("false_color");

					break;
				case 3:
					$(".u_left_t,.p_left_t").addClass("false_color");
					$(".deng_false").show().html("用户名或密码错误!");

					break;
				case 4:

					$(".deng_false").show().html("邮件格试不正确!");
					$(".u_left_t").addClass("false_color");

					setTimeout(function() {

},
					2000);

					break;
				case 5:

					$(".p_left_t").addClass("false_color");
					$(".deng_false").show().html("登录密码不能为空!");

					break;

				default:
					alert("系统错误，刷新后重试！");

				}

			}
		});

	}
	loginPage();
	function loginPage(){
	
	 $(".login_content").height($(window).height()-$(".head").height()-$(".foot").height());
	 

	
	}

	function keyUp(e) {　　　
		var currKey = 0,
		e = e || event;　　　currKey = e.keyCode || e.which || e.charCode;　　　
		if (currKey === 13) {

			submitLogin();

		}
	};
	　document.onkeyup = keyUp;

})

function getScrollHeight() {　　
	var scrollHeight = 0,
	bodyScrollHeight = 0,
	documentScrollHeight = 0;　　
	if (document.body) {　　　　bodyScrollHeight = document.body.scrollHeight;　　
	}　　
	if (document.documentElement) {　　　　documentScrollHeight = document.documentElement.scrollHeight;　　
	}　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight: documentScrollHeight;　　
	return scrollHeight;
}

function IsPC() {
	var userAgentInfo = navigator.userAgent;

	var Agents = new Array("Android","Touch", "iPhone","BlackBerry OS","mqqbrowser","opera mobi","juc","iuc","fennec","applewebKit/420","applewebkit/525","applewebkit/532","iemobile","windows ce","240x320","480x640","acer","asus","audio","blazer","coolpad","dopod","etouch","hitachi","htc","huawei","jbrowser","lenovo","lg","lg-","lge-","lge", "mobi","moto","nokia","phone","samsung","sony","symbian","tablet","tianyu","wap","xda","xde","zte","SymbianOS", "Windows Phone", "iPad", "iPod");
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}