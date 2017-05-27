$(function() {
    window.onscroll = function(e) {
        var e = e || window.event;
        var t = window.pageYOffset || document.documentElement.scrollTop //用于FF
        || document.body.scrollTop || 0;

        var top_div = document.getElementById("top_div1");
          
        if (t >= 60) {
        
            $(".header_daohan a").css("color", "#000");
            $(".header_xian").css("color", "#000");
            $(".header_lu a").css("color", "#000");
            $(".header_shuz").css("color", "#000");
            $(".header_daohan").css("border-right", "1px solid #000");
            top_div.style.cssText = "background:#fff;border-bottom:1px solid #ccc;";
            $(".hea_ing").css("display", "block");
            $(".hea_ing2").css("display", "block");
        
        } else {
			
            $(".header_daohan a").css("color", "#fff");
            $(".header_xian").css("color", "#fff");
            $(".header_lu a").css("color", "#fff");
            $(".header_shuz").css("color", "#fff");
            $(".header_daohan").css("border-right", "1px solid #fff");
            top_div.style.cssText = "background:#222;border-bottom:none;";
            $(".hea_ing").css("display", "none");
            $(".hea_ing2").css("display", "none");
			
		   
        }
	
   
    
    };

    //返回顶部
    $(window).scroll(function() {
        if ($(window).scrollTop() > 60) {
            $("#gotop").fadeIn(500); //一秒渐入动画
        } else {
            $("#gotop").fadeOut(100); //一秒渐隐动画
        }    

    });

    $("#gotop2").click(function() {
        $('body,html').animate({
            scrollTop: 0
        },
        1000);
    });
	
	//获取当前屏幕的Height
    var wih = parseInt($(window).height()) - 60;//减60px	
    $("#Hei").css('height', wih);
	//点击滑动
   $(".san_jiao").click(function(){
	  $('body,html').animate({
		  scrollTop:wih
		  
	  },
	    1000); 
  });
  /*产品说明的效果
  var po= parseInt($(".nei_bottom").height()); 
  var poe= parseInt($(".nei_tou").height());
  
  $('.nei_osuo').click(function(){
	  $('body,html').animate({
		  scrollTop:po + poe + 60
	    },
	    1000); 
	  
  });
  */
    //hover事件
    $(document).ready(function() {

        $(".i_er2").mouseover(function() {
            $(".in_erweima").css("transform", "scale(1,1)");
        });
        $(".i_er2").mouseout(function() {
            $(".in_erweima").css("transform", "scale(1,0)");
        });
    });

    //点击赋值
    $(".nei_biao").click(function() {
        $(".xiala_nei").toggleClass("sever");

    });

    $(".nei_biao").mousedown(function(event) {
        return false;
    });

    $(".nei_bao").click(function() {
        $('#tab_content').html($(this).html());
    });
    //弹窗

    $(".tan_tanchu1").click(function() {
        $(".t_cha1").addClass("sever");

        $("body").addClass("poi")

    })
	$(".t_caca").click(function() {
        $(".t_cha1").removeClass("sever");

        $("body").removeClass("poi")

    });
    //2
    $(".tan_tanchu2").click(function() {
        $(".t_cha2").addClass("sever");
        $("body").addClass("poi")

    }) 
	$(".t_caca").click(function() {
        $(".t_cha2").removeClass("sever");
        $("body").removeClass("poi")

    });
    //3
    $(".tan_tanchu3").click(function() {
        $(".t_cha3").addClass("sever");

        $("body").addClass("poi")

    }) 
	$(".t_caca").click(function() {
        $(".t_cha3").removeClass("sever");
        $("body").removeClass("poi")

    });
 
    $(".tan_tanchu1").mousedown(function(event) {
        return false;
    });//阻止冒泡

    //二维码
    /*	$(document).ready(function(){
			
           $(".in_er").mouseover(function(){
           $(".youshi_er").css({"transform":"scale(1,1)","display":"block"});
          });
          $(".in_er").mouseout(function(){
          $(".youshi_er").css({"transform":"scale(0)","display":"none"});
            });
            });*/

    /*setTimeout(function(){    //延迟
   callback();
},1000) */


	
/*清除，赋值input value值<script type="text/javascript" src="jquery-min.js"></script> 
	$(function(){ 
$('.c').bind({ 
focus:function(){ 
if (this.value == this.defaultValue){ 
this.value=""; 
} 
}, 
blur:function(){ 
if (this.value == ""){ 
this.value = this.defaultValue; 
} 
} 
}); 
}) */
/* 钥匙
	$(".xia_la").click(function(){
       
		  if($(".w_xiatu",$(this)).hasClass("sever")){
		   $(".w_xiatu",$(this)).removeClass("sever");
		   $(this).next().removeClass("sever")
		 }else{
		   $(".w_xiatu",$(this)).addClass("sever");
		       $(this).next().addClass("sever")
		 }
    });
  $(".xia_la").mousedown(function(event) {
        return false;
    });*/	
	
	

});	

