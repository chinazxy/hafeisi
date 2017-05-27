$(function() {

	     $(".second").each(function(){
		   var slen=$(this).find(".second_li").length; 
		   $(this).css("height",slen*32);
		}); 
			$(".third").each(function(){
		   var tlen=$(this).find(".third_li").length; 
		   $(this).css("height",tlen*32);
		   });
		   
		   
		$(".b_cn a").each(function(){
		
		   var fontlen=StringTrim($(this).html()).length;
		   
		   if(fontlen>4){
		   
		    $(this).css("marginTop",30+"px");
		   
		   }else{
		   
		       $(this).css("marginTop",32+"px");
		   }
		
		});   
	
	   function StringTrim(str){
        return str.replace(/(^\s*)|(\s*$)/g, "");   
        }
	$(".nav li").mouseenter(function(){
	 if($(this).find(".second").length>0){
	   var that= $(this).find(".second");
	   $(this).find(".second").css({opacity:1,overflow:"visible"}).stop().animate({ opacity: '1', height: 'show' },300,function(){});

	 }

	});	

	$(".second_li").mouseenter(function(){
		  
			 if($(this).find(".third").length>0){
			     
			    $(this).find(".third").css({opacity:0,width:0}).stop().show().animate({opacity:1,width:140},300);
			 
			 }
		});		  		  
		   $(".second_li").mouseleave(function(){		    
			 if($(this).find(".third").length>0){			   
			   $(this).find(".third").hide();			 
			 }		  
		  });
    $(".nav li").mouseleave(function(){
	  $(this).find(".second").stop().animate({ opacity: '0', height: 'hide' },300,function(){});
	});

    $(".second_img_box li").mouseenter(function() {

        var that = $(this);

        var cntitle = $(this).find(".b_cn");
        var grayimg = $(this).find(".grayimg");
		var sindex=$(".second_img_box li").index(this);
        var colorimg = $(this).find(".colorimg");
	   $(".zzc").not($(".zzc").eq(sindex)).fadeOut();
        $(".b_cn").not(cntitle).fadeOut();
  
        $(".grayimg").not(grayimg).stop().animate({
            opacity: 1
        },
        300, "swing");
		grayimg.stop().animate({
            opacity: 0
        },
        200, "swing",
        function() {

            colorimg.stop().animate({
                width: 278,
                height: 178,
                left: -12,
                top: -19,
                right: 12,
                bottom: 7
            },
            300, "swing",
            function() {
$(".zzc").eq(sindex).fadeIn();
                cntitle.fadeIn();
            });

        });
    });

    $(".second_img_box li").mouseleave(function() {

        var that = $(this);
		
		var sindex=$(".second_img_box li").index(this);

        var cntitle = $(this).find(".b_cn");

        var grayimg = $(this).find(".grayimg");

        var colorimg = $(this).find(".colorimg");
		
		$(".zzc").eq(sindex).fadeOut();

        colorimg.stop(false, true).animate({
            width: 240,
            height: 140,
            left: 0,
            top: 0
        },
        300, "jswing",
        function() {
            grayimg.stop().animate({
                opacity: 1
            },
            300, "easeInSine",
            function() {

})
            cntitle.fadeOut();
        });
    });
});