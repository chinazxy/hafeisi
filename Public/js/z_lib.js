$(document).ready(function(){//直接执行
	$(function(){//首页经过显示
	
	 //$(".jx_tit").fadeIn(3000);
//	 $(".tit_pinpai").fadeIn(3300);
//	 $(".pinpai_ul").fadeIn(3300);
	 $(".news_box ").slideDown(3000);
	 $(".contact_info ").fadeIn();
	//$(".iframe").colorbox({iframe:true, width:"100%", height:"100%"});//弹出框

	   $("#pinpai_frist").hover(function(){
		 $("#pinpai_frist_div").slideDown();
		 $("#pinpai_second_div").slideUp();
	});
	});
	$(function(){//首页经过显示
	   $("#pinpai_second").hover(function(){
		 $("#pinpai_second_div").slideDown();
		 $("#pinpai_frist_div").slideUp();
	});
	});
	
	
	
			$('#xl_1').click(function() {
				$("#scrollDiv ul").animate({
					marginTop:0,
				},"slow");
				$(".left_nav li").removeClass("on");
				$("#xl_1").addClass("on");
		    })	
				$('#xl_top').click(function() {
					$("#scrollDiv ul").animate({
						marginTop:0,
					},"slow");
					$(".left_nav li").removeClass("on");
					$("#xl_top").addClass("on");
			    })	
			$('#xl_2').click(function() {
				pm_height = $(window).height();//计算屏幕高度
				$("#scrollDiv ul").animate({
					marginTop:-pm_height,
				},"slow");
				
				$(".left_nav li").removeClass("on");
				$("#xl_2").addClass("on");
		    })	
			$('#xl_3').click(function() {
				pm_height = $(window).height();//计算屏幕高度
				$("#scrollDiv ul").animate({
					marginTop:-2 * pm_height,
				},"slow");
				
				$(".left_nav li").removeClass("on");
				$("#xl_3").addClass("on");
		    })	
			$('#xl_4').click(function() {
				pm_height = $(window).height();//计算屏幕高度
				$("#scrollDiv ul").animate({
					marginTop:-3 * pm_height,
				},"slow");
				
				$(".left_nav li").removeClass("on");
				$("#xl_4").addClass("on");
		    })	
			
			
			//首页左右特效
			
			$(".scroll_li_info").animate({bottom:'40%',opacity:'1'},"slow");//首页文字特效
			
			
			
			
	
});
			








(function($){
	var settings = null;
	var cacheVar = {};
	$.fn.pictrueScrollPlugin = function(options){
		settings = $.extend({}, $.fn.pictrueScrollPlugin.defaults, options);
		return this.each(function(){
			var $this = $(this);
			cacheVar.swidth = $this.width();
			cacheVar.wswidth = $(window).width();//计算屏幕宽度
			cacheVar.licounts = $this.find("li").length,
			cacheVar.picTimer = null,
			cacheVar.index = 0;
			
			$this.find("ul").css("width", cacheVar.swidth*cacheVar.licounts);	//计算ul的宽度
			$this.find(".pic_scroll_li").css("width", cacheVar.wswidth);	//设置li的宽度
//			$this.find(".li").css("width", cacheVar.wswidth);	//设置li的宽度
			if(settings.isPrevNext) //显示左右按钮
			{
				$this.append('<div class="lf_btn prev" ></div><div class="lf_btn next" ></div>');
				$(".lf_btn").hover(function(){
						$(this).css("opacity", "0.5");
					}, function(){
						$(this).css("opacity", "0.2");
						
					});
				$(".prev").bind("click", function(){	//向前的单击事件
					--cacheVar.index;
					if(cacheVar.index == -1) cacheVar.index = cacheVar.licounts-1;
					$(".scroll_li_info").animate({bottom:'40%',opacity:'0.1'},"slow");//首页向前文字特效设置默认值
					showPics(cacheVar.index, $this);
				});
				$(".next").bind("click", function(){	//向后的单击事件
					++cacheVar.index;
					if(cacheVar.index == cacheVar.licounts) cacheVar.index = 0;
					$(".scroll_li_info").animate({bottom:'40%',opacity:'0.1'},"slow");//首页后前文字特效设置默认值
					showPics(cacheVar.index, $this);
				});
			}
			if(settings.autoPlay) //设置是否自动播放
			{
				$this.hover(function(){
					clearInterval(cacheVar.picTimer);	
				}, function(){
					cacheVar.picTimer = setInterval(function(){
						cacheVar.index++;
						if(cacheVar.index == cacheVar.licounts) cacheVar.index = 0;
						showPics(cacheVar.index, $this);
					}, settings.timeout);	
				}).trigger("mouseleave");
			}
			
		});
	};
	$.fn.pictrueScrollPlugin.defaults = {
		timeout:3000,	//设置图片轮播的时间
		autoPlay:true,	//设置是否自动播放
		isPrevNext:true,	//设置是否显示左右按钮
		numClsName:"nums"	//可自定义数字样式，但设置其他需自己写样式
	};
	
	function showPics(index, obj){
		var leftVal = -cacheVar.swidth*index;
		obj.find("ul").stop(true, false).animate({left:leftVal}, 300);		//图片向左移动
		$("."+settings.numClsName+" span").removeClass("on");
		$("."+settings.numClsName+" span:eq("+index+")").addClass("on");	//给数字添加选择样式
//			alert(index);
		$(".scroll_li_info").animate({bottom:'40%',opacity:'1'},"slow");//首页文字特效
	}
	
	
})(jQuery); 



//$(document).ready(function(){//直接执行
//	$(function(){//首页经过显示
//		$('.lf_btn ').click(function() {
////				alert("1");
// $(".scroll_li_info").animate({bottom:'36%',opacity:'1'},"slow");
//		    })
//			
//			
//			
//			//首页左右特效
//			
//			
//	
//});

