	 var zindex=0;
	 var imgarray="";
	 var  decoumt=0;
	 var lihtml='';
	 var deold=-1;
var noidex=0;
$(function(){

   $(".w_yhp .w_ys").click(function(){
     noidex =$(".w_yhp .w_ys").index($(this));
    if(noidex==deold){
	 return false;
	}
	$(".w_yhp .w_ys").removeClass("select");
	$(".w_yhp .w_ys").eq(noidex).addClass("select");
     zindex=0;
     imgarray=new Array();
	 decoumt=0;
	 lihtml='';
	 $(".loadding").show();
	 imgarray.push($(this).attr("data-left"));
	 imgarray.push($(this).attr("data-center"));
     deold= $(".w_yhp .w_ys").index($(this));
	  for(var i=0;i<imgarray.length;i++){
	  
	  content_loading(imgarray[i]);
	  }
     
   })

	   function content_loading(imageobj) {
        var browser = new Object();
        var obj = new Object();
        browser.useragent = window.navigator.userAgent.toLowerCase();
        browser.ie = /msie/.test(browser.useragent);
        browser.moz = /gecko/.test(browser.useragent);
        var imgsrc = imageobj;
		
        var image = new Image;
        image.src = imgsrc;
        if (browser.ie) {
            if (image.height === 0) {
                image.onload = function() {
                 
                    showContentImage(imgsrc);
                }

            } else {
              
                showContentImage(imgsrc);

            }
        } else {
            image.onload = function() {
                if (image.complete == true) {
                 
                    showContentImage(imgsrc);
                }
            }

            image.onerror = function() {
               
            }

        }

    }

	
	    function showContentImage(imgsrc) {
		
		decoumt++;
		
		if(decoumt==imgarray.length){
		   lihtml+='<ul class="w_yjt w_newjt">';
		   for(var $i=0;$i<imgarray.length;$i++){
		    if($i==1){

		   lihtml+='<li simg="'+imgarray[$i]+'" bimg="'+imgarray[$i]+'" style="display:none;opacity:0;"><img src="'+imgarray[$i]+'" /></li>';
			}else{
		   lihtml+='<li simg="'+imgarray[$i]+'" bimg="'+imgarray[$i]+'"><img src="'+imgarray[$i]+'" /></li>';
		   
		   }
		   }
	     lihtml+='</ul>';
		}
		  $(".w_yb").append(lihtml);
		  	 $(".loadding").hide();
 
		  $(".w_yjt").stop().animate({opacity:0},500,function(){
		  
		    $(".w_yjt").not($(".w_yjt:last")).remove();
		  });
		  
		  $(".w_yjt:last").stop().animate({opacity:1},500,function(){
		  
		
		  });

        }
   
      function zuo(){
	  
	   zindex++;
	 if(zindex>1){
	  zindex=0;
	 }
	  
	  $(".w_yjt li").eq(zindex).show().stop().animate({opacity:1},500);
	   $(".w_item").eq(noidex).find("a").eq(zindex).trigger("click");
	  $(".w_yjt li").not($(".w_yjt li").eq(zindex)).stop().animate({opacity:0},500);
	    e.stopPropagation();
		e.preventDefault();
	  }
    
	 $(".w_zuo").click(function(e){
	zuo();
	 });
	 
	 function you(){
	  zindex--;
	 if(zindex<0){
	  zindex=1;
	 }
	 
	 
	 	   $(".w_item").eq(noidex).find("a").eq(zindex).trigger("click");
	 $(".w_yjt li").eq(zindex).show().stop().animate({opacity:1},500);
 		  $(".w_newjt li a").eq(zindex).trigger("click");
	  $(".w_yjt li").not($(".w_yjt li").eq(zindex)).stop().animate({opacity:0},500);
	 	    e.stopPropagation();
			e.preventDefault();
	 
	 }

	 $(".w_you").click(function(e){
	you();
		
			
	 });
	 
	 initDetail();
	 	$(window).resize(function(){
	
	
	
	 initDetail();
	});
	
	
	function touchFade(hammertime){
	
	
	 var hammertime = new Hammer($(".big_center")[0], {});
        hammertime.on("release dragleft dragright swipeleft swiperight", function(ev){
		 ev.gesture.preventDefault();
            switch(ev.type) {
             
                case 'swipeleft':
                     zuo();
                    ev.gesture.stopDetect();
                    break;

                case 'swiperight':
                       you();
                    ev.gesture.stopDetect();
                    break;

                case 'release':
                    // more then 50% moved, navigate
                    if(Math.abs(ev.gesture.deltaX) > $(window).width()*0.9/2) {
                        if(ev.gesture.direction == 'right') {
                            zuo();
                        } else {
                            you();
                        }
                    }
                    else {
                        you();
                    }
					
					//self.circlepl();
                    break;
            }
		
		
		});
	
	
	}
	 function initDetail(){
	 
	 var w=$(window).width();
     if(w<970){
      
	  var h=w*320/590;
      
     }else{
	 var h=320;
	 }
	 
	 $(".w_yb ").height(h);
	 }
	 
	 $(".w_nav").click(function(){
	  
	  var wnav=$(".w_nav").index($(this));
	  
	  $(".w_p").hide().eq(wnav).show();
	  
	 
	 });



})