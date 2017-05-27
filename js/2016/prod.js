var orgsf = 0;
var showlen = 0;
var scrollTop = 0;
var shaixun = 0;
var ssshaixuan = 0;
var imgH = 0;
var imgW = 0;

var nh = 0;
var nw = 0;
var bdimgobj = null;
function scrolltops() {

    if (IsPC()) {
	
        if (!$(".pro_til_in").hasClass("mp")) {
            orgsf = $(document).height();

            scrollTop = $(window).scrollTop();

            shaixun = $(".w_potu").outerHeight() + $(".w_cover").outerHeight() + parseInt($(".w_cover").css("marginTop")) + parseInt($(".w_cover").css("marginBottom"));

            ssshaixuan = $(".pro_titlew").height();
            if (scrollTop > shaixun) {
                $(".gs2 ").css("top", scrollTop - shaixun);
                $(".product_wrap").css("marginTop", ssshaixuan);

            } else if (scrollTop < shaixun || scrollTop == 0) {
                $(".gs2").css("top", 0);
                $(".product_wrap").css("marginTop", 20);
            }

        }
    } else {
        //alert(1);
        if (!$(".pro_til_in").hasClass("mp")) {

            orgsf = $(document).height();

            scrollTop = $(window).scrollTop();

            shaixun = $(".w_potu").outerHeight() + $(".w_cover").outerHeight() + parseInt($(".w_cover").css("marginTop")) + parseInt($(".w_cover").css("marginBottom"));

            ssshaixuan = $(".pro_titlew").height();
            if (scrollTop > shaixun) {
                var ffsf = scrollTop - shaixun;
                //$(".gs2 ").css("transform", "translate(0,"+ffsf+"px)");
                $(".gs2 ").addClass("sticky");
                // $(".gs2 ").css("top",95);
                $(".gpw").css("marginTop", $(".gh").innerHeight());

            } else if (scrollTop < shaixun || scrollTop == 0) {
                // $(".gs2").css("transform", "translate(0,"+0+"px)");
                $(".gs2").removeClass("sticky");
                // $(".gs2").css("top",0);
                $(".gpw").css("marginTop", 20);
            }
            /*scrollTop = $(this).scrollTop();
	
		shaixun = $(".gz_contain").innerHeight();
	
      
       ssshaixuan=$(".pro_titlew").height();
		if (scrollTop>shaixun) {
            
			 
			 $(".gs2 ").addClass("sticky");
			 $(".product_wrap").css("marginTop",ssshaixuan);
			
			
		} else {
			$(".gs2 ").removeClass("sticky");
			$(".product_wrap").css("marginTop",20);
		}*/

        }

    }

}
$(window).load(function() {

    scrolltops();
})

$(function() {

 
	$(".glleft li").bind("tap",function(){
		
		var hrefs=$("a",$(this)).attr("href");
		
		location.href=hrefs;
		
	});



    var myPlayer = null;
	if($("#example_video_1").length>0){
    videojs("#example_video_1").ready(function() {

        myPlayer = this;

        // EXAMPLE: Start playing the video.
        myPlayer.pause();

    });

    $(".ad_video").click(function() {

        $(".v_tan").fadeIn(300,
        function() {
  
            myPlayer.play();
			if($("#example_video_2").length>0){
				myPlayer2.pause();
				
			}
        });

    });
	}
	
	
	    var myPlayer2 = null;
		if($("#example_video_2").length>0){
	if($("#example_video_2").length>0){
	
    videojs("#example_video_2").ready(function() {
        myPlayer2 = this;
		myPlayer2.play();
		if($("#example_video_1").length>0){
		 myPlayer.pause();	
		}

    });
	}
	
		}

    $(".svg_class").click(function() {

        $(".v_tan").fadeOut(300,
        function() {

            myPlayer.pause();
        });
    });

    orgsf = $(document).height();

    var isload = true;
    var ww = $(window).width();
    function tutule(method, content) {

        clearTimeout(method.animate_id);

        method.animate_id = setTimeout(function() {

            method.call(content);

        },
        100)

    }

    if ($(".shaixuan").hasClass("state")) {
	
        if ($(".mb_sx").length > 0) {

} else {
            $(".shaixuan a").each(function() {

                if ($(this).attr("href").indexOf("state") < 0) {

                    hrs = $(this).attr("href").trim() + "&state=on";
                    $(this).attr("href", hrs);
                }

            });

        }

    }

    $(".gpk_box1_tbox li").not(".no_choice").mouseenter(function() {

        $(".yanse").html($(this).attr("title"));

    });

    var sxdeate = [];
    if ($(".mb_sx").length > 0) {

        var catid = $(".cat_id").val();

        var pagefile = window.location.pathname;

        var urls = location.href;

        var filterstr = urls.match(/filter_attr=(.*)/);

        //filterstr[1]);
        $(".gpk_box1").each(function(i) {

            sxdeate[i] = 0;

        });

        if (filterstr != null) {

            sxdeate = filterstr[1].split(".");

        }

        $(".attr_val").click(function(e) {

            if ($(this).hasClass("select2")) {

                return false;

            }
            var attr_key = $(".gpk_box1").index($(this).parent().parent());
            $(".gpk_box1").eq(attr_key).find(".gpk_box1_yuan").removeClass("select");
            $(".gpk_box1").eq(attr_key).find(".gpk_box1_tbox1").removeClass("select");

            $(".gpk_box1").eq(attr_key).find(".pro_til_close").removeClass("dis_no");
            $(this).find(".pro_til_close").addClass("dis_no");
            $(this).addClass("select");
            var attr_val = $(this).attr("attr_id");
            $(this).children().eq(0).addClass("select");
            sxdeate[attr_key] = attr_val;
            e.stopPropagation();
        });

        $(".pro_til_close").click(function(e) {

            if ($(this).hasClass("dis_no")) {

                $(this).removeClass("dis_no");
            }
            //alert($(this).parent().parent().attr("class"));
            var attr_key = $(".gpk_box1").index($(this).parent().parent().parent());

            $(".gpk_box1").eq(attr_key).find(".gpk_box1_tbox1").removeClass("select");
            $(".gpk_box1").eq(attr_key).find(".gpk_box1_yuan").removeClass("select");
            sxdeate[attr_key] = 0;
            e.stopPropagation();

        });

        $(".gpk_box1_tbox li").click(function() {
			

            if ($(this).hasClass("no_choice")) {

                return false;
            }

            sxdeate[5] = $(this).attr("attr_id");

            $(this).addClass("select").siblings().removeClass("select");

        })

        $(".qued_img").click(function() {

            var filestr = sxdeate.join(".");

            location.href = pagefile + "?id=" + catid + "&filter_attr=" + filestr;
        });

        $(".color_close").click(function() {

            sxdeate[5] = 0;
            $(".gpk_box1_tbox li").removeClass("select");
        });

        $(".chonzi").click(function() {

            location.href = pagefile + "?id=" + catid;
        })

    }else{
		
		var locas=location.href;
        if(locas.indexOf("filter_attr")>0){
			
				$("html, body").animate({
						scrollTop:$(".pro_titlew").offset().top-40
					},
					10);
			
		}
	}

    $(".c_gb").click(function() {

        sxmove();
    });

    function sxmove() {

        var pro_contentval = $(".pro_content").css("display");
        if (pro_contentval == "none") {
            shaixun = 0;
        } else {
            shaixun = $(".pro_content").innerHeight();
        }

        if (scrollTop < shaixun) {

            $("html,body").stop().animate({
                scrollTop: shaixun
            },
            500,
            function() {});
        }

        if ($(".shaixuan").hasClass("shaixuan_off")) {

            $(".proon").hide();
            $(".prooff").show();
            var hrsf = $(".shaixuan a").eq(0).attr("href");
			
            $(".pro_til_san").addClass("select");

            $(".shaixuan a").each(function() {
                if ($(".mb_sx").length > 0) {

} else {
                    if (hrsf.indexOf("state") < 0) {

                        hrs = $(this).attr("href").trim() + "&state=on";
                        $(this).attr("href", hrs);
                    } else {
                        hrs = $(this).attr("href").replace(/\&state=.*/, "");
                        hrs = hrs.trim() + "&state=on";
                        $(this).attr("href", hrs);
                    }

                }

            });

            if (!IsPC()) {
             // $(".gpw,.foot_gai ").hide();
            //
                $(".pro_til_in").addClass("mp");
                $(".pro_titlew").removeClass("sticky");
                $("html, body").animate({
                    scrollTop: 0
                },
                10);

                if ($(".shouji_nav").hasClass("menu_on")) {
                    $('div.menu_div').slideUp(200,
                    function() {
                        $("html, body").animate({
                            scrollTop: 0
                        },
                        "slow");
                        $(".shouji_nav").addClass("menu_off").removeClass("menu_on");
                    }).css("z-index", "9");
                }

            }

            $(".shaixuan").removeClass("shaixuan_off").addClass("shaixuan_on");
            $(".shaixuan").slideDown(500);

        } else {
            $(".proon").show();
            $(".prooff").hide();
            var hrsf = $(".shaixuan a").eq(0).attr("href");
			
            $(".pro_til_san").removeClass("select");
            //$(".pro_til_in").html("显示筛选器");
			
            $(".shaixuan a").each(function() {
                if ($(".mb_sx").length > 0) {

} else {
                    if (hrsf.indexOf("state") < 0) {

                        hrs = $(this).attr("href").trim() + "&state=off";
                        $(this).attr("href", hrs);
                    } else {
                        hrs = $(this).attr("href").trim().replace(/\&state=.*/, "");
                        hrs = hrs + "&state=off";
                        $(this).attr("href", hrs);
                    }

                }

            });
            if (scrollTop > shaixun) {
                $(".product_wrap").css("marginTop", 84);
            }

            $(".shaixuan").removeClass("shaixuan_on").addClass("shaixuan_off");
            $(".shaixuan").slideUp(500);
            if (!IsPC()) {

                $(".gpw,.foot_gai ").show();
                $(".pro_til_in").removeClass("mp");
               // $(".pro_titlew").addClass("sticky");

            }
        }

    }

    if ($(".mb_sx").length == 0) {
        $(".pro_til_in").click(function() {

            tutule(sxmove);
        });

        $(".shaixuan").mouseleave(function() {

            //tutule(sxmove);
        });

    } else {

        $(".pro_til_in").click(function() {

            var pro_contentval = $(".gz_img").css("display");

            shaixun = $(".gz_img").innerHeight();
            if (scrollTop < shaixun) {

                $("html,body").stop().animate({
                    scrollTop: shaixun
                },
                500,
                function() {});
            }

            if ($(".shaixuan").hasClass("shaixuan_off")) {

                $(".proon").hide();
                $(".prooff").show();
                var hrsf = $(".shaixuan a").eq(0).attr("href");
                $(".pro_til_san").addClass("select");
               // $(".pro_til_in").html("隐藏筛选器");
	
                if (!IsPC()) {

                    // $(".gpw,.foot_gai ").hide();
                    $(".pro_til_in").addClass("mp");
                    $(".pro_titlew").removeClass("sticky");
                    $("html, body").animate({
                        scrollTop: 0
                    },
                    10);

                    if ($(".shouji_nav").hasClass("menu_on")) {
                        $('div.menu_div').slideUp(200,
                        function() {
                            $("html, body").animate({
                                scrollTop: 0
                            },
                            "slow");
                            $(".shouji_nav").addClass("menu_off").removeClass("menu_on");
                        }).css("z-index", "9");
                    }

                }

                $(".shaixuan").removeClass("shaixuan_off").addClass("shaixuan_on");
                $(".shaixuan").slideDown(500);

            } else {
                $(".proon").show();
                $(".prooff").hide();

                var hrsf = $(".shaixuan a").eq(0).attr("href");
			
                $(".pro_til_san").removeClass("select");
               // $(".pro_til_in").html("显示筛选器");

                $(".product_wrap").css("marginTop", 84);
                $(".shaixuan").removeClass("shaixuan_on").addClass("shaixuan_off");
                $(".shaixuan").slideUp(500);
                if (!IsPC()) {

                    $(".gpw,.foot_gai ").show();
                    $(".pro_til_in").removeClass("mp");
                    $(".pro_titlew").addClass("sticky");

                }
            }

        });

    }

    $(".gpk_box1").each(function() {

        var sb2len = $(".gpk_box1_tbox", $(this)).length;

        if (sb2len > 1) {

            var sb2wid = sb2len * $(".gpk_box1_tbox").innerWidth() + sb2len * 30;

            $(this).width(sb2wid);
            $(".gpk_box1_t", $(this)).css("width", "80%");

        }

    });

    $(".gpk_box1_yuan").click(function() {
        if ($(this).hasClass("select2")) {
            return false;
        }
        var hrefs = $("a", $(this).parent()).attr("href");
        location.href = hrefs;

    });
 	 var fxstate=false;
	$(".zm").click(function(){
	     
		if(!fxstate){
			$(".gpb").not(".newitem").each(function(){
				 $("ul",$(this)).removeClass("animate");
				 $(".glleft",$(this)).proloadLeft();
				
			});
			$(".zm").html("正面");
			
			fxstate=true; 
		}else{
		   $(".gpb").not(".newitem").each(function(){
			   	 $("ul",$(this)).removeClass("animate");
		  $(".glcenter",$(this)).proloadImg();
				
				
			});
			fxstate=false; 
			$(".zm").html("侧面");
		}
		
	});
  function scrolls() {

        if ($(document).scrollTop() > $(document).height() - $(window).height() - $(".foot_gai").outerHeight() -40) {
            var times = 200;
            $(".newitem").each(function(i) {
			
                if (i < 8) {
			
					if(fxstate){
							   // console.log(1);
						 $(".glleft",$(this)).proloadLeft();
					}else{
					$(".glcenter",$(this)).proloadImg();	
					}
				
                    var dtime = 200 - 200 / (i + 1);
                    $(this).show().delay(dtime).animate({
                        marginTop: [0, "swing"],
                        opacity: 1
                    },
                    600,
                    function() {
                      	 $(this).removeClass("newitem");  	
                          
                    }

                    );
                }
       
            })

        }

    }

    var stop = true;
    $(window).on("scroll",
    function() {
        scrolltops();
        scrolls();
    });

	    $(".glcenter").each(function() {

        $(this).slide({
            speed: 500,
            easing: "swing"
        });
		
			if(!$(this).hasClass("newitem")){
		
		 $(this).proloadImg();
	     }
		
    });
    if($(".glleft").length>0){
    $(".glleft").each(function() {

        $(this).slide({
            speed: 500,
            easing: "swing"
        });
    });
    $(".glcenter").each(function() {

        $(this).slide({
            speed: 500,
            easing: "swing"
        });
		if(!$(this).closest(".gpb").hasClass("newitem")){
		
		 $(this).proloadImg();
	     }
    });
		 }

    $(".product_gengduo").click(function() {
        if (document.documentElement && document.documentElement.scrollTop) {

            var st = document.documentElement.scrollTop;
        } else if (document.body) {

            var st = document.body.scrollTop;
        }

        var p = $(".filter").attr("p");
        var f = $(".filter").attr("f");
        var c = $(".filter").attr("c");
        if (isload) {
            if (p > 0 && c > 0) {
                //isload=false;
                $.ajax({
                    type: 'POST',
                    url: 'ajax-product.php',

                    data: {
                        id: c,
                        page: p,
                        filter_attr: f

                    },
                    dataType: "json",
                    beforeSend: function(XMLHttpRequest) {
                        isload = false;
                    },
                    success: function(data) {
                        if (IsPC()) {
                            $("html, body").animate({
                                scrollTop: st
                            },
                            "slow");
                        }
                        if (data.count > 0 && data.page >= 0) {

                            $(".filter").attr("c", data.id);
                            $(".filter").attr("p", data.page);
                            $(".filter").attr("f", data.filter_str);
                            $(".product_box ul").append(data.goodlist);
                            $(".product_box ul").find(".reload").each(function() {

                                $(this).animate({
                                    height: parseInt($(".product_box ul li").eq(0).height())
                                },
                                1000,
                                function() {

                                    $(this).removeAttr("overflow");
                                    $(this).removeClass("reload");
                                    isload = true;
                                });

                                LoadImg($(this).find("img"));

                                if (data.page == 0) {

                                    $(".product_gengduo").fadeIn(300,
                                    function() {

                                        $(this).remove();
                                    });
                                    isload = false;
                                }

                            });

                        } else {

}

                    }
                });

            }

        }

    });

    $(".product_box ul li").each(function() {

        LoadImg($(this).find("img"));

    });

    $(".gpb").mouseenter(function() {

        $(".zez", $(this)).stop().animate({
            opacity: 0.2
        },
        500);

    });

    $(".gpb").mouseleave(function() {

        $(".zez", $(this)).stop().animate({
            opacity: 0
        },
        500);

    });

    var tx = 0;
    var mpse = 10;
    var barH = 0;

    function limitMove(obj, tx) {
	
		
		 if(!$(".xcd").length){
			 return false;
		 }

        if (tx >= 160) {
            tx = 160;
            obj.css("top", 160);

        } else if (tx <= $(".bar").position().top) {
            tx = 45;
            obj.css("top", 45);

        } else {
            obj.css("top", tx);
        }
        var hrf = parseInt($(".bar").position().top);
        barH = 1 - (tx - 45) / 115;
        var fdimgh = imgH + imgH * barH;
        var fdimgw = imgW + imgW * barH;
        bdimgobj.css({
            height: fdimgh,
            width: fdimgw,
            marginLeft: -fdimgw / 2,
            marginTop: -fdimgh / 2
        });
		var toph=parseInt(bdimgobj.find("img").css("top"))*barH;
		var lefth=parseInt(bdimgobj.find("img").css("left"))*barH;
       bdimgobj.find("img").css({
            height: fdimgh,
            width: fdimgw,
			top:toph,
			left:lefth
			

        });

        // bdimgobj.css({height:fdimgh,width:fdimgw,marginLeft:-fdimgw/2,marginTop:-fdimgh/2});
        // bdimgobj.find("img").css({height:fdimgh,width:fdimgw});
        breate = 0;

    }
    var prodlie = $(".anythingSlider ul li").length;
    var dcindex = 0;
    $(".prevVisual").click(function() {

        dcindex++;

        if (dcindex > prodlie-1) {
            dcindex = 0;
          
        }
		 anything.setIndex(dcindex);
		$(".anythingSlider li div").not($(".anythingSlider li div").eq(dcindex)).removeClass("active");
		$(".anythingSlider li div").not($(".anythingSlider li div").eq(dcindex)).css("opacity",0.7);
		$(".anythingSlider li div").eq(dcindex).addClass("active").css("opacity",0);
	
        bdimgobj = $(".bd_img>img").eq(dcindex);
        $(".visualWrapper .loadding").show();
        LoadDetail($(".anythingSlider ul li").eq(dcindex));

    });

    $(".nextVisual").click(function() {

        dcindex--;

        if (dcindex < 0) {
            dcindex = prodlie - 1;
         
        }
		 anything.setIndex(dcindex);
   		$(".anythingSlider li div").not($(".anythingSlider li div").eq(dcindex)).removeClass("active");
		$(".anythingSlider li div").not($(".anythingSlider li div").eq(dcindex)).css("opacity",0.7);
		$(".anythingSlider li div").eq(dcindex).addClass("active").css("opacity",0);
        bdimgobj = $(".bd_img>img").eq(dcindex);
        $(".visualWrapper .loadding").show();
        LoadDetail($(".anythingSlider ul li").eq(dcindex));

    });

    $(".cursor").mousedown(function(a) {

        var d = document;
        if (!a) {
            a = event | window.event;
        }
        var o = $(this);
        if (!a.pageY) {
            a.pageY = a.clientY;
        }
        var y = a.pageY;
        if (o.setCapture) {
            o.setCapture();
        } else if (window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        }
        d.onmousemove = function(a) {
            if (!a) {
                a = window.event;
            }
            if (!a.pageY) {
                a.pageY = a.clientY;
            }
            tx = a.pageY - y + parseInt(o.css("top"));
            limitMove(o, tx);
            y = a.pageY;
		 			if (a.stopPropagation) {
				a.stopPropagation();
            }else if (window.event) {
            a.cancelBubble = true;
            }
			 if(a && a.preventDefault){
				 a.preventDefault();
            }else{
             a.returnValue = false;
             }
        };
        d.onmouseup = function(a) {
            if (!a) {
                a = window.event;
            }
            if (o.releaseCapture) {
                o.releaseCapture();
            } else if (window.captureEvents) {
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }
            d.onmousemove = null;
            d.onmouseup = null;
            if (!a.pageY) {
                a.pageY = a.clientY;
            }
	   			if (a.stopPropagation) {
				a.stopPropagation();
            }else if (window.event) {
               a.cancelBubble = true;
            }
			 if(a && a.preventDefault){
				 a.preventDefault();
            }else{
            a.returnValue = false;
             }
        };

    });
	


	
    var initsa = $(".anythingSlider ul>li").eq(0);
    bdimgobj = $(".bd_img>img").eq(0);
    $(".visualWrapper .loadding").show();
    LoadDetail(initsa);
	limitMove($(".cursor"), 160);

    $(".ad_image").click(function() {
        $("body").css("overflow-y", "hidden");
        $(".xcd").fadeIn(500);

    });
    $(".xcd .close").click(function() {
        $("body").css("overflow-y", "visible");
        $(".xcd").fadeOut(500,
        function() {

});

    });

    var breate = 0;
    var addEvent = (function(window, undefined) {
        var deltaVal = function(event) {
            var type = event.type;
            if (type == 'DOMMouseScroll' || type == 'mousewheel') {
                event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
            }
            if (event.srcElement && !event.target) {
                event.target = event.srcElement;
            }
            if (!event.preventDefault && event.returnValue !== undefined) {
                event.preventDefault = function() {
                    event.returnValue = false;
                };
            }
            return event;
        };
        if (window.addEventListener) {
            return function(el, type, fn, capture) {
                if (type === "mousewheel" && document.mozHidden !== undefined) {
                    type = "DOMMouseScroll";
                }
                el.addEventListener(type,
                function(event) {
                    fn.call(this, deltaVal(event));
                },
                capture || false);
            }
        } else if (window.attachEvent) {
            return function(el, type, fn, capture) {
                el.attachEvent("on" + type,
                function(event) {
                    event = event || window.event;
                    fn.call(el, deltaVal(event));
                });
            }
        }
        return function() {};
    })(window);
    var dom = window;
    addEvent(dom, "mousewheel",
    function(event) {
		    var objs = $(".cursor");
		if($(".xcd").css("display")=="block"){
        if (event.delta < 0) {
            tx = parseInt(objs.css("top")) + 10;
            limitMove(objs, tx);
        } else {
            tx = parseInt(objs.css("top")) - 10;
            limitMove(objs, tx);
        }
		}
   

    });
if($(".anythingSlider").length>0){
	
	 var anything=$(".anythingSlider").slideDetail({
        speed: 500,
        easing: "swing"
    });
}

	
 

    $(".js-zoom-more").click(function() {

        var objs = $(".cursor");
        tx = parseInt(objs.css("top")) - mpse;
        limitMove(objs, tx);

    });

    $(".js-zoom-less").click(function() {
        var objs = $(".cursor");
        tx = parseInt(objs.css("top")) + mpse;
        limitMove(objs, tx);

    });

    var oldobjs = -1;
 
    $(".anythingSlider ul>li").bind("click",function() {
		  
		
		
        if (oldobjs == $(".anythingSlider ul>li").index($(this))) {
            return false;
        }
        $(".anythingSlider li div").not($("div",$(this))).removeClass("active");
		$(".anythingSlider li div").not($("div",$(this))).css("opacity",0.7);
        $("div",$(this)).addClass("active");
        dcindex = $(".anythingSlider ul>li").index($(this));
		anything.setIndex(dcindex);
        $(".visualWrapper .loadding").show();
        barH = 0;
        $(".cursor").css("top", 160);
        tx = 160;
        oldobjs = $(".anythingSlider ul>li").index($(this));
        LoadDetail($(this));

    });
	
	$(".anythingSlider ul>li").mouseenter(function(){
	   if($("div",$(this)).hasClass("active")){
	    return false;
	   }
	  $("div",$(this)).stop().animate({opacity:0},500);
	});
	
		$(".anythingSlider ul>li").mouseleave(function(){
	   if($("div",$(this)).hasClass("active")){
	    return false;
	   }
	  $("div",$(this)).stop().animate({opacity:0.7},500);
	
	});

    $(window).on("resize",
    function() {
        showdeinit();
        if (IsPC()) {
            var doh = $(document).height();
            ww = $(window).width();
            scrollTop = $(window).scrollTop();
            shaixun = $(".gz_contain").innerHeight();
            if (scrollTop > shaixun) {
                var f = doh / orgsf;
                $(".gs2").css("top", scrollTop * f - shaixun);
                orgsf = doh;
            }
        }
    });

    var imgH = 0;
    var imgW = 0;
    function LoadDetail(imgObj) {

        var browser = new Object();
        var obj = new Object();
        obj = imgObj;
        browser.useragent = window.navigator.userAgent.toLowerCase();
        browser.ie = /msie/.test(browser.useragent);
        browser.moz = /gecko/.test(browser.useragent);
        var imgsrc = obj.attr("data-src");
     
        var image = new Image;
        image.src = imgsrc;
        if (browser.ie) {
            if (image.height === 0) {
                image.onload = function() {

                    ShowDetailImage(image, imgsrc);
                }

            } else {

                ShowDetailImage(image, imgsrc);

            }
        } else {
            image.onload = function() {
                if (image.complete == true) {

                    ShowDetailImage(image, imgsrc);
                }
            }

        }

        image.onerror = function() {
            obj.parent().removeClass("img_loading").addClass("img_loading_error");
        }

    }
    function getImgNaturalDimensions(img, callback) {
        var nWidth, nHeight;
        if (img.naturalWidth) {
            nWidth = img.naturalWidth;
			nHeight = img.naturalHeight;
        } else {
            var imgae = new Image();
			image.src = img.src;
			image.onload = function() {
            callback(image.width, image.height)
            }
        }
        return [nWidth, nHeight];
    }

    showdeinit();
    function showdeinit() {
        var ww = $(window).width() * 0.9 - (parseInt($(".xcdar").css("marginLeft")) + parseInt($(".xcdar").css("marginRight")) + parseInt($(".visualWrapper").css("marginLeft")) + parseInt($(".visualWrapper").css("marginRight")));
        $(".visualWrapper").width(ww);
        var hh = $(window).height()*0.8;
        $(".visualWrapper").height(hh);
        showlen = Math.ceil((hh - 120) / 85);
		
		$(".xcdar").css({marginTop:-hh/2,height:hh});
        $(".thumbsSlideshow").height(showlen * 85);
        $(".thumbsSlideshow").css("marginTop", -showlen * 85 / 2);
		$(".anythingSlider").height(showlen * 85);
	
        $(".xcd").height($(window).height());

    }

    function ShowDetailImage(image, imgsrc) {
        var ww = $(window).width() * 0.9 - (parseInt($(".xcdar").css("marginLeft")) + parseInt($(".xcdar").css("marginRight")) + parseInt($(".visualWrapper").css("marginLeft")) + parseInt($(".visualWrapper").css("marginRight")));
        var hh = $(window).height()*0.8;
      
        $(".visualWrapper .loadding").hide();
        imgH = image.height;
        imgW = image.width;
        oldimgH = image.height;
        oldimgW = image.width;
        nh = imgH;
        nw = imgW;

        if (imgW > ww && imgH < hh) {
		  
            imgW = ww * imgH / imgW;
            imgH = imgH * imgW / nw;
        } else if (imgH > hh && imgW < ww) {
	
            imgH = hh * imgW / imgH;
            imgW = imgH * imgW / nh;
        } else if (imgH > hh && imgW > ww) {
		    if(imgW<imgH){
		    var hh = $(window).height();
            imgH = hh* imgW / imgH;
		    imgW = imgW * imgH / nh;
			}else{
			 imgW = ww * imgH / imgW;
             imgH = imgH * imgW / nw;
			
			}
 
        }
		
		// console.log(imgW+"::"+imgH);
			 $(".bd_img img").unbind("mousedown");
			 $(".bd_img img").unbind("mousemove");
			 $(".bd_img img").unbind("mouseup");
        $(".bd_img img").removeClass("dragimg");
        $(".bd_img", $(".visualWrapper")).not($(".bd_img:first", $(".visualWrapper"))).remove();
        bdimgobj = $(".bd_img:last", $(".visualWrapper")).css("opacity", 1).clone();
		bdimgobj.removeAttr("style");
		bdimgobj.css("opacity",0);
        bdimgobj.find("img").css("visibility", "visible");
        bdimgobj.find("img").addClass("dragimg")
        bdimgobj.height(imgH);
        bdimgobj.width(imgW);
        bdimgobj.css("marginLeft",  -imgW / 2);
        bdimgobj.css("marginTop", -imgH / 2);
       $(".bd_img:last").hide();
        bdimgobj.find("img").attr("src", imgsrc).css("cursor","grab");
        bdimgobj.prependTo($(".visualWrapper"));
		$("img",bdimgobj).ImgDrag();
      /*  bdimgobj.animate({
            width: imgW,
            height: imgH,
            marginLeft: -imgW / 2,
            marginTop: -imgH / 2
        },
        500);*/
     bdimgobj.find("img").css({
            height: imgH,
            width: imgW,
            top: 0,
            left: 0
        });

        $(".bd_img:last").stop().animate({
            opacity: 0
        },
        500, "easeInOutSine");
		bdimgobj.stop().animate({
            opacity: 1
        },
        800, "easeInOutSine");

    }

    function LoadImg(imgObj) {

        var browser = new Object();
        var obj = new Object();
        obj = imgObj;
        browser.useragent = window.navigator.userAgent.toLowerCase();
        browser.ie = /msie/.test(browser.useragent);
        browser.moz = /gecko/.test(browser.useragent);
        var imgsrc = obj.attr("data-src");
        var image = new Image;
        image.src = imgsrc;
        if (browser.ie) {
            if (image.height === 0) {
                image.onload = function() {
                    obj.attr("src", imgsrc);
                    ShowCaseDetailImage(obj);
                }

            } else {
                obj.attr("src", imgsrc);
                ShowCaseDetailImage(obj);

            }
        } else {
            image.onload = function() {
                if (image.complete == true) {
                    obj.attr("src", imgsrc);
                    ShowCaseDetailImage(obj);
                }
            }

        }

        image.onerror = function() {
            obj.parent().removeClass("img_loading").addClass("img_loading_error");
        }

    }

    function ShowCaseDetailImage(obj) {

        obj.parent().parent().parent().find(".loadding").hide();

        obj.removeAttr("style");
        obj.removeAttr("data-src");
        obj.fadeIn();

    }

})

String.prototype.trim = function() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
}

$.fn.proloadLeft = function(options) {
	
	var count=0;
	var $objs = $(this);
	var imgleng=$("li",$(this)).length;

    var self = this;
	$("li img",$objs).each(function(){
	    $(".loadding",$objs.parent()).show();
		 LoadImg($(this));
	});
	function LoadImg(imgObj) {

        var browser = new Object();
        var obj = new Object();
        obj = imgObj;
        browser.useragent = window.navigator.userAgent.toLowerCase();
        browser.ie = /msie/.test(browser.useragent);
        browser.moz = /gecko/.test(browser.useragent);
    
        var imgsrc = obj.attr("data-src");
        var image = new Image;
        image.src = imgsrc;
        if (browser.ie) {
            if (image.height === 0) {
                image.onload = function() {
                    obj.attr("src", imgsrc);
                    showImage();
                }

            } else {
                obj.attr("src", imgsrc);
                showImage($objs);

            }
        } else {
            image.onload = function() {
                if (image.complete == true) {
                    obj.attr("src", imgsrc);
                    showImage();
                }
            }

        }

        image.onerror = function() {
            obj.parent().removeClass("img_loading").addClass("img_loading_error");
        }

    }
	
	
    function showImage() {
        count++;

		if(count==imgleng){
			
	    $(".loadding",$objs.parent()).hide();
		$("img",$objs.parent()).css("visibility","visible");
		$objs.stop().animate({opacity:1},500);
		$(".glcenter",$objs.parent()).stop().animate({opacity:0},500);
		}

       // obj.fadeIn();

    }
};
$.fn.proloadImg = function(options) {
	
	var count=0;
	var $objs = $(this);
	var imgleng=$("li",$objs).length;

    var self = this;
	
	$("li img",$objs).each(function(){
	    $(".loadding",$objs).show();
		 LoadImg($(this));
	});
	function LoadImg(imgObj) {

        var browser = new Object();
        var obj = new Object();
        obj = imgObj;
        browser.useragent = window.navigator.userAgent.toLowerCase();
        browser.ie = /msie/.test(browser.useragent);
        browser.moz = /gecko/.test(browser.useragent);
    
        var imgsrc = obj.attr("data-src");
        var image = new Image;
        image.src = imgsrc;
        if (browser.ie) {
            if (image.height === 0) {
                image.onload = function() {
                    obj.attr("src", imgsrc);
                    showImage();
                }

            } else {
                obj.attr("src", imgsrc);
                showImage($objs);

            }
        } else {
            image.onload = function() {
                if (image.complete == true) {
                    obj.attr("src", imgsrc);
                    showImage();
                }
            }

        }

        image.onerror = function() {
            obj.parent().removeClass("img_loading").addClass("img_loading_error");
        }

    }
	
	
    function showImage() {
        count++;

		if(count==imgleng){
			
	    $(".loadding",$objs.parent()).hide();
				$("img",$objs.parent()).css("visibility","visible");
		$objs.stop().animate({opacity:1},500);
		$(".glleft",$objs.parent()).stop().animate({opacity:0},500);
	
		//$("ul",$objs).stop().animate({opacity:1},500);
		}

       // obj.fadeIn();

    }
};
$.fn.slideDetail = function(options) {
    var defaults = {
        speed: '500',
        easing: "swing"
    };
    var opts = $.extend(defaults, options);
    var $objs = $(this);
    var self = this;
    var container = $("ul", $objs);
    var width = 85,oldval=-1,
    showlen = 0,
    lileng = $("li", $objs).length,
    spanindex = 0;
	var avp=1;
    init();
    function init() {
	
 
	showItem();
    

    }
	
	function showItem(){
	    var hh = $(window).height()*0.8;
	
        showlen = Math.ceil((hh - 120) / 85);
		container.height((lileng)*85);
	
		//container.css("top",-(showlen-lileng)*85);
	    avp=Math.floor((spanindex+1)/showlen);

        var yuitem=(spanindex+1)%showlen;
		if(avp>=1){
        var nitem=avp*showlen+yuitem-1;
		}else{
		nitem=0;
		}
		if(nitem+showlen>lileng){
		nitem=lileng-showlen;
		}
	
		oldval=avp;

		if(lileng<showlen){

		 var percent =0;
			
		}else{
	
		 var percent = -((100 /lileng) * nitem);
		}


      if (Modernizr.csstransforms3d) {
          container.css("transform", "translate3d(0," + percent + "%,0) scale3d(1,1,1)");
       } else if (Modernizr.csstransforms) {
            container.css("transform", "translate(0," + percent + "%)");
       } else { 
            container.css("top", 85 * percent*lileng/100);

      }
	
	}
    this.showPane = function(index, animate) {
	  
        index = Math.max(0, Math.min(index, lileng - 1));
        spanindex = index;
        if (spanindex > lileng - showlen) {
            spanindex = lileng - showlen;
            return false;
        }
        var offset = -((100 / lileng) * spanindex);
		
	
		
        setContainerOffset(offset, animate);
    };

    function setContainerOffset(percent, animate) {

        container.removeClass("animate");

        if (animate) {
            container.addClass("animate");
        }

       if (Modernizr.csstransforms3d) {
          container.css("transform", "translate3d(0," + percent + "%,0) scale3d(1,1,1)");
        } else if (Modernizr.csstransforms) {
          container.css("transform", "translate(0," + percent + "%)");
    } else {

            container.stop().animate({
                top: 85 * percent*lileng/100
            },
            500);
      }
    }

    this.next = function() {
	 
        return this.showPane(spanindex + 1, true);
    };
    this.prev = function() {

        return this.showPane(spanindex - 1, true);
    };
	
	this.setIndex=function(index){

	spanindex=index;
	showItem();
	
	
	
	};

    var hammertime = new Hammer($(".anythingSlider")[0], {});
    hammertime.on("release dragup dragdown swipeup swipedown",
    function(ev) {
        //ev.gesture.preventDefault();
        switch (ev.type) {
        case 'dragup':
        case 'dragdown':
            var pane_offset = -(100 / lileng) * spanindex;
            var drag_offset = ((100 / width) * ev.gesture.deltaX) / lileng;
            if ((spanindex == 0 && ev.gesture.direction == "right") || (spanindex == lileng - 1 && ev.gesture.direction == "left")) {
                drag_offset *= .4;
            }
            setContainerOffset(drag_offset + pane_offset);
            break;

        case 'swipeup':
            self.next();
            ev.gesture.stopDetect();
            break;

        case 'swipedown':
            self.prev();
            ev.gesture.stopDetect();
            break;

        case 'release':
            if (Math.abs(ev.gesture.deltaX) > width / 2) {
                if (ev.gesture.direction == 'right') {
                    self.prev();
                } else {
                    self.next();
                }
            } else {
                self.showPane(spanindex, true);
            }
            break;
        }

    });

    $(".thumbsSlideshow .back").click(function() {
  self.next();
       
      
    });

    $(".thumbsSlideshow .forward").click(function() {
 self.prev();
    });

   

    $(window).on("load resize orientationchange",
    function() {
 
        init();
    });
	
	return self;

};

$.fn.ImgDrag=function(options){

    var $objs = $(this);
	   var ww = $(window).width() * 0.9 - (parseInt($(".xcdar").css("marginLeft")) + parseInt($(".xcdar").css("marginRight")) + parseInt($(".visualWrapper").css("marginLeft")) + parseInt($(".visualWrapper").css("marginRight")));
        var hh = $(window).height()*0.8;
    var self = this;
	    $objs.bind("mousedown",function(a) {
        	 $objs.addClass("grabing");
        var d = document;
        if (!a) {
            a = event | window.event;
        }
        var o = $objs.get(0);
        if (!a.pageY) {
            a.pageY = a.clientY;
        }
		 if (!a.pageX) {
            a.pageX = a.clientX;
        }
        var y = a.pageY;
		var x=a.pageX;
        if (o.setCapture) {
            o.setCapture();
        } else if (window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        }
       $objs.mousemove(function(a) {

            if (!a) {
                a = window.event;
            }
            if (!a.pageY) {
                a.pageY = a.clientY;
            }
			if (!a.pageX) {
            a.pageX = a.clientX;
            }
            tx = a.pageY - y + parseInt($objs.css("top"));
			ty=a.pageX-x+ parseInt($objs.css("left"));
       
		    if($objs.height()>hh || $objs.width()>ww){
			var txh=$objs.height()-hh;
			var txw=$objs.width()-ww;
	         if(Math.abs(ty)<=txw/2){
			 $objs.css("left",ty);
			 
			 }
			
		    if(Math.abs(tx)<=txh/2){
			 $objs.css("top",tx);
			 
			 }
			
		  // $objs.css("left",ty).css("top",tx); 
		   
            y = a.pageY;
			x=a.pageX;	
			}
			if (a.stopPropagation) {
				a.stopPropagation();
            }else if (window.event) {
            a.cancelBubble = true;
            }
			 if(a && a.preventDefault){
				 a.preventDefault();
            }else{
            a.returnValue = false;
             }
		
		
        });
        $objs.mouseup(function(a) {
		 $objs.removeClass("grabing");
            if (!a) {
                a = window.event;
            }
            if (o.releaseCapture) {
                o.releaseCapture();
            } else if (window.captureEvents) {
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }
			// $objs.unbind("mousedown");
		$objs.unbind("mousemove");
		$objs.unbind("mouseup");
            o.onmousemove = null;
            o.onmouseup = null;
            if (!a.pageY) {
                a.pageY = a.clientY;
            }
	     if (!a.pageX) {
            a.pageX = a.clientX;
            }
        });
			if (a.stopPropagation) {
				a.stopPropagation();
            }else if (window.event) {
          a.cancelBubble = true;
            }
			 if(a && a.preventDefault){
				 a.preventDefault();
            }else{
            a.returnValue = false;
             }
    });

}

$.fn.slide = function(options) {
    var defaults = {
        speed: '500',
        easing: "swing"
    };
    var opts = $.extend(defaults, options);
    var $objs = $(this);
    var self = this;
    var container = $objs;
    var width = $(".gpw .gpb").eq(0).width(),
    lileng = $("li", $objs).length,
    spanindex = 0;
    init();
    function init() {
        if(!$(".gpw .gpb").length){
			return false;
			
		}
        width = $(".gpw .gpb").eq(0).width();
        $objs.width(lileng * width);
        $("li", $objs).width(width);
        var percent = -((100 / lileng) * spanindex);
        if (Modernizr.csstransforms3d) {
            container.css("transform", "translate3d(" + percent + "%,0,0) scale3d(1,1,1)");
        } else if (Modernizr.csstransforms) {
            container.css("transform", "translate(" + percent + "%,0)");
        } else {
            container.css("left", -width * spanindex);

        }

    }

    this.showPane = function(index, animate) {
        index = Math.max(0, Math.min(index, lileng - 1));
        spanindex = index;

        var offset = -((100 / lileng) * spanindex);
        $(".dian span", $objs).removeClass("active");
        $(".dian span", $objs).eq(spanindex).addClass("active");
        setContainerOffset(offset, animate);
    };

    function setContainerOffset(percent, animate) {

        container.removeClass("animate");

        if (animate) {
            container.addClass("animate");
        }

        if (Modernizr.csstransforms3d) {
            container.css("transform", "translate3d(" + percent + "%,0,0) scale3d(1,1,1)");
        } else if (Modernizr.csstransforms) {
            container.css("transform", "translate(" + percent + "%,0)");
        } else {

            container.stop().animate({
                left: -width * spanindex
            },
            500);
        }
    }

    this.next = function() {
        return this.showPane(spanindex + 1, true);
    };
    this.prev = function() {
        return this.showPane(spanindex - 1, true);
    };
    var objsp=$objs.parent();
    var hammertime = new Hammer(objsp.get(0), {});
    hammertime.on("release dragleft dragright swipeleft swiperight",
    function(ev) {
        ev.gesture.preventDefault();
        switch (ev.type) {
        case 'dragright':
        case 'dragleft':
            var pane_offset = -(100 / lileng) * spanindex;
            var drag_offset = ((100 / width) * ev.gesture.deltaX) / lileng;
            if ((spanindex == 0 && ev.gesture.direction == "right") || (spanindex == lileng - 1 && ev.gesture.direction == "left")) {
                drag_offset *= .4;
            }
            setContainerOffset(drag_offset + pane_offset);
            break;

        case 'swipeleft':
            self.next();
            ev.gesture.stopDetect();
            break;

        case 'swiperight':
            self.prev();
            ev.gesture.stopDetect();
            break;

        case 'release':
            if (Math.abs(ev.gesture.deltaX) > width / 2) {
                if (ev.gesture.direction == 'right') {
                    self.prev();
                } else {
                    self.next();
                }
            } else {
                self.showPane(spanindex, true);
            }
            break;
        }

    });

    $(".dian span", $objs.parent().parent()).click(function() {
        spanindex = $(".dian span", $objs.parent().parent()).index($(this));
        if (lileng > 1) {
            var percent = -((100 / lileng) * spanindex);
            container.addClass("animate");
            if (Modernizr.csstransforms3d) {
                container.css("transform", "translate3d(" + percent + "%,0,0) scale3d(1,1,1)");
            } else if (Modernizr.csstransforms) {
                container.css("transform", "translate(" + percent + "%,0)");
            } else {
                container.stop().animate({
                    left: [ - width * spanindex, opts.easing]
                },
                500);
            }
            $(".dian span", $objs).not($(this)).removeClass("active");
            $(this).addClass("active");
        }
    });

    $(window).on("load resize orientationchange",
    function() {
        init();
    });

};

(function() {

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        },
        timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
} ());