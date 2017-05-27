$(function(){
	//导航
	
	
  $(".daohan").click(function() {
        $(".w_dao").addClass("sever");
		$('body').addClass('po');
    });
	 $(".w_tuca").click(function() {
        $(".w_dao").removeClass("sever");
		$('body').removeClass('po');
    });

    $(".daohan").mousedown(function(event) {
        return false;
    });
	
   var kk =parseInt($(window).height())-55;
	$('.swiper-container').css('height',kk);
	
  //二维码弹窗
  $('.w_in_er').click(function(){
	  $('.w_erweit').addClass('sever');
	$('body').addClass('po');
  })

   $('.w_tuca').click(function(){
	  $('.w_erweit').removeClass('sever');
	$('body').removeClass('po');
  });
    $(".w_in_er").mousedown(function(event) {
        return false;
    });
   //加入购物车弹窗
   $('.nei_but').click(function(){
	  $('.gou_wu').addClass('sever');
	$('body').addClass('po');
  })

   $('.w_tuca2').click(function(){
	  $('.gou_wu').removeClass('sever');
	$('body').removeClass('po');
  });
    $(".nei_but").mousedown(function(event) {
        return false;
    });
	  //tanc
   $('.wu_xc').click(function(){
	  $('.gou_wu').addClass('sever');
	$('body').addClass('po');
  })

   $('.w_tuca2').click(function(){
	  $('.gou_wu').removeClass('sever');
	$('body').removeClass('po');
  });
    $(".wu_xc").mousedown(function(event) {
        return false;
    });
	
   //配送 赠品fei_pei
     $('.tan_tanchu2').click(function(){
	  $('.fei_pei').addClass('sever');
	$('body').addClass('po');
  })

   $('.w_tuca').click(function(){
	  $('.fei_pei').removeClass('sever');
	$('body').removeClass('po');
  });
    $(".tan_tanchu2").mousedown(function(event) {
        return false;
    });
   
  //送货
      $('.tan_tanchu1').click(function(){
	  $('.songh').addClass('sever');
	$('body').addClass('po');
  })

   $('.w_tuca').click(function(){
	  $('.songh').removeClass('sever');
	$('body').removeClass('po');
  });
    $(".tan_tanchu1").mousedown(function(event) {
        return false;
    });
   //
         $('.xctd').click(function(){
	  $('.zp1').addClass('sever');
	$('body').addClass('po');
  })

   $('.w_tuca').click(function(){
	  $('.zp1').removeClass('sever');
	$('body').removeClass('po');
  });
    $(".xctd").mousedown(function(event) {
        return false;
    });
   //
       $('.mttd').click(function(){
	  $('.zp2').addClass('sever');
	$('body').addClass('po');
  })

   $('.w_tuca').click(function(){
	  $('.zp2').removeClass('sever');
	$('body').removeClass('po');
  });
    $(".mttd").mousedown(function(event) {
        return false;
    });
	   //
       $('.dzlg').click(function(){
	  $('.zp3').addClass('sever');
	$('body').addClass('po');
  })

   $('.w_tuca').click(function(){
	  $('.zp3').removeClass('sever');
	$('body').removeClass('po');
  });
    $(".dzlg").mousedown(function(event) {
        return false;
    });
   
     //返回顶部
    $(window).scroll(function() {
        if ($(window).scrollTop() > 0) {
            $("#gotop").fadeIn(500); //一秒渐入动画
        } else {
            $("#gotop").fadeOut(100); //一秒渐隐动画
        }    

    });
	
	//头部
	   $(window).scroll(function() {
        if ($(window).scrollTop() > 0) {
             $('.han').css('background','#fff');
			$('.w_dl a').css('color','#222');
			$('.w_deng span').css('color','#222');
			$('.hea_ing').css('display','block');
			$('.daohan2').css('display','block');
			
        } else {
             $(".han").css('background','#222222'); 
			 $('.w_dl a').css('color','#fff');
			 $('.w_deng span').css('color','#fff');
			 $('.hea_ing').css('display','none');
			 $('.daohan2').css('display','none');
        }    

    });

    $("#gotop2").click(function() {
        $('body,html').animate({
            scrollTop: 0
        },
        1000);
    });
   //nei_osuo
   var xq = ($('.w_c ').height())+($('.w_head ').height())+30;
     $(".nei_osuo").click(function(){
	  $('body,html').animate({
		  scrollTop:xq
		  
	  },
	    1000); 
  });
   var ditu = ($(window).height())/1.5;
   $('.wuu').css('height',ditu);
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
   //faq


   
   $('.height_40').click(function(){

		$(this).addClass('sever')
		$(this).find('.www').addClass('sever')
		.next().show()
		$(this).siblings().removeClass('sever')
		$(this).siblings().find('.www').removeClass('sever')
        .next().show();
        return false;		
}); 
$('.oB_Tc').click(function(){
	$('.oB_over').addClass('sever');
    $('body').addClass('po');

});
$('.w_tuca').click(function(){
	
	$('.oB_over').removeClass('sever');
	$('body').removeClass('po');
	
	
});
  
$('.oB_Tc').mousedown(function(event){
	return false;
});





});
