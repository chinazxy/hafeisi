$(function() {


    var isload=true;
	$(".pro_content").hover(function() {

		$(".pro_opacity", $(this)).stop().animate({
			opacity: .7
		},
		500);

	},
	function() {

		$(".pro_opacity", $(this)).stop().animate({
			opacity: 0
		},
		500);
	});

	/*$(".shai_box1_tbox li div").mouseenter(function() {
		$(this).stop().animate({
			width: 38,
			height: 38,
			left: -2,
			top: -2
		},
		100, "easeInOutSine");
	});

	$(".shai_box1_tbox li div").mouseleave(function() {
		$(this).stop().animate({
			width: 30,
			height: 30,
			left: 2,
			top: 2
		},
		100, "easeInOutSine");
	});*/
	function tutule(method, content) {

		clearTimeout(method.animate_id);

		method.animate_id = setTimeout(function() {

			method.call(content);

		},
		100)

	}
	var shaixun = 0;

	var scrollTop = 0;
	    var ssshaixuan=0;
		//   if(!IsPC()){
		 //   $(".pro_titlew").addClass("sticky");
		//   }else{
	$(window).scroll(function() {
	
     if(!$(".pro_til_in").hasClass("mp")){
		scrollTop = $(this).scrollTop();
		var pro_contentval= $(".pro_content").css("display");
		if(pro_contentval=="none"){
	     shaixun = 0;
		}else{
				shaixun = $(".pro_content").innerHeight();
		}
      
       ssshaixuan=$(".pro_titlew").height();
		if (scrollTop>shaixun) {
            
			 
			 $(".pro_titlew").addClass("sticky");
			 $(".product_wrap").css("marginTop",ssshaixuan);
			
			
		} else {
			$(".pro_titlew").removeClass("sticky");
			$(".product_wrap").css("marginTop",20);
		}
		
		}
	});
	
//	}

	if ($(".shaixuan").hasClass("state")) {
         if($(".mb_sx").length>0){
		 
		 
		 }else{
		$(".shaixuan a").each(function() {
             
			if ($(this).attr("href").indexOf("state") < 0) {

				hrs =$(this).attr("href").trim()+"&state=on";
				$(this).attr("href", hrs);
			}

		});
		
		}

	}
	
	$(".shai_box1_tbox li").not(".no_choice").mouseenter(function(){
	 
	  $(".yanse").html($(this).attr("title"));
	
	});
	
	var sxdeate=[];
    if($(".mb_sx").length>0){
	
	var catid=$(".cat_id").val();
	
	var pagefile=window.location.pathname;
	
	var urls=location.href;
	
	var filterstr=urls.match(/filter_attr=(.*)/);


	//filterstr[1]);
	$(".shai_box1").each(function(i){
	
	sxdeate[i]=0;
	
	});
	
	if(filterstr!=null){

	sxdeate=filterstr[1].split(".");

	  
	}
	


	$(".attr_val").click(function(e){
	
	  if($(this).hasClass("select2")){
	  
	   return false;
	  
	  }
	var attr_key=$(".shai_box1").index($(this).parent().parent());
    $(".shai_box1").eq(attr_key).find(".shai_box1_yuan").removeClass("select");
	 $(".shai_box1").eq(attr_key).find(".shai_box1_tbox1").removeClass("select");

	$(".shai_box1").eq(attr_key).find(".pro_til_close").removeClass("dis_no");
	$(this).find(".pro_til_close").addClass("dis_no");
	$(this).addClass("select");
	var attr_val=$(this).attr("attr_id");
	$(this).children().eq(0).addClass("select");
    sxdeate[attr_key]=attr_val;	
	e.stopPropagation();
	});
	
	
	$(".pro_til_close").click(function(e){
	
	if($(this).hasClass("dis_no")){
	
	   $(this).removeClass("dis_no");
	}
	//alert($(this).parent().parent().attr("class"));
	var attr_key=$(".shai_box1").index($(this).parent().parent().parent());
	 
	    $(".shai_box1").eq(attr_key).find(".shai_box1_tbox1").removeClass("select");
			    $(".shai_box1").eq(attr_key).find(".shai_box1_yuan").removeClass("select");
	  sxdeate[attr_key]=0;
	  e.stopPropagation();
	
	   
	});
	
	$(".shai_box1_tbox li").click(function(){
	
	 if($(this).hasClass("no_choice")){

	   return false;
	 }

	 sxdeate[5]=$(this).attr("attr_id");
	 
	$(this).addClass("select").siblings().removeClass("select");

	})
	
 
  
   $(".qued_img").click(function(){
   
    var filestr=sxdeate.join(".");
	
	location.href=pagefile+"?id="+catid+"&filter_attr="+filestr;
   });
   
   
   $(".color_close").click(function(){
   
    sxdeate[5]=0;
   $(".shai_box1_tbox li").removeClass("select");
   });
   
   
   $(".chonzi").click(function(){
   
   	location.href=pagefile+"?id="+catid;
   })
	
	
	}
	
	
	
	
	function sxmove(){
	
	 		var pro_contentval= $(".pro_content").css("display");
		if(pro_contentval=="none"){
				shaixun = 0;
		}else{
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
			var hrsf = $(".shaixuan a").eq(0).attr("href");
			
			$(".pro_til_san").addClass("select");
			$(".pro_til_in").html("隐藏筛选器");
			$(".shaixuan a").each(function() {
 if($(".mb_sx").length>0){
 
 }else{
				if (hrsf.indexOf("state") < 0) {

					hrs = $(this).attr("href").trim()+"&state=on";
					$(this).attr("href", hrs);
				} else {
					hrs = $(this).attr("href").replace(/\&state=.*/,"");
					hrs = hrs.trim()+"&state=on";
					$(this).attr("href", hrs);
				}
				
				}

			});
			
			      if(!IsPC()){
    
     $(".product_wrap,.product_gengduo").hide();
	   $(".pro_til_in").addClass("mp");
	   		$(".pro_titlew").removeClass("sticky");
			$("html, body").animate({
					scrollTop: 0
				},
				10);
			
		    if($(".shouji_nav").hasClass("menu_on")){
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
			var hrsf = $(".shaixuan a").eq(0).attr("href");
		
			$(".pro_til_san").removeClass("select");
			$(".pro_til_in").html("显示筛选器");
			$(".shaixuan a").each(function() {
 if($(".mb_sx").length>0){
 
 }else{
				if (hrsf.indexOf("state") < 0) {

					hrs=$(this).attr("href").trim()+"&state=off";
					$(this).attr("href", hrs);
				} else {
					hrs = $(this).attr("href").trim().replace(/\&state=.*/,"");
					hrs = hrs+"&state=off";
					$(this).attr("href", hrs);
				}
				
				}

			});
			if (scrollTop>shaixun) {
			  $(".product_wrap").css("marginTop",84);
			}
			
			$(".shaixuan").removeClass("shaixuan_on").addClass("shaixuan_off");
			$(".shaixuan").slideUp(500);
            if(!IsPC()){
  
            $(".product_wrap,.product_gengduo").show();
		  $(".pro_til_in").removeClass("mp");
	   $(".pro_titlew").addClass("sticky");
			
	         }
		}
	
	}

   if($(".mb_sx").length==0){
	$(".pro_til_in").click(function() {

  	tutule(sxmove);
	});
	
	
	$(".shaixuan").mouseleave(function(){
	
	tutule(sxmove);
	
	});
	
	}else{
	
	$(".pro_til_in").click(function() {
 
   		var pro_contentval= $(".pro_content").css("display");
		if(pro_contentval=="none"){
				shaixun = 0;
		}else{
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
			var hrsf = $(".shaixuan a").eq(0).attr("href");
			$(".pro_til_san").addClass("select");
			$(".pro_til_in").html("隐藏筛选器");
	
			
			      if(!IsPC()){
    
     $(".product_wrap,.product_gengduo").hide();
	   $(".pro_til_in").addClass("mp");
	   		$(".pro_titlew").removeClass("sticky");
			$("html, body").animate({
					scrollTop: 0
				},
				10);
			
		    if($(".shouji_nav").hasClass("menu_on")){
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
		
	
			var hrsf = $(".shaixuan a").eq(0).attr("href");
			$(".pro_til_san").removeClass("select");
			$(".pro_til_in").html("显示筛选器");

		
			 $(".product_wrap").css("marginTop",84);
			$(".shaixuan").removeClass("shaixuan_on").addClass("shaixuan_off");
			$(".shaixuan").slideUp(500);
            if(!IsPC()){
            
            $(".product_wrap,.product_gengduo").show();
		  $(".pro_til_in").removeClass("mp");
	   $(".pro_titlew").addClass("sticky");
			
	         }
		}

	});
	
	}

	$(".shai_box1").each(function() {

		var sb2len = $(".shai_box1_tbox", $(this)).length;

		if (sb2len > 1) {

			var sb2wid = sb2len * $(".shai_box1_tbox").innerWidth() + sb2len * 30;

			$(this).width(sb2wid);
			$(".shai_box1_t", $(this)).css("width", "80%");

		}

	});

	$(".shai_box1_yuan").click(function() {
	  if($(this).hasClass("select2")){
	   return false;
	  }
		var hrefs = $("a", $(this).parent()).attr("href");
		location.href = hrefs;

	});
	var stop=true; 
	$(window).scroll(function(){
    tutule(ajaxLoadContent);
	//ajaxLoadContent();
    });

	function tutule(method, content) {

		clearTimeout(method.animate_id);

		method.animate_id = setTimeout(function() {

			method.call(content);

		},
		50);

	}
function ajaxLoadContent(){

        	if (document.documentElement && document.documentElement.scrollTop){

       var st = document.documentElement.scrollTop;
	  }else if (document.body){

       var st = document.body.scrollTop;
	  }
	

    if(st + $(window).height() + 80 >= $(document).height() && st >80){
        if(stop==true){
            stop=false;


	  var p=$(".filter").attr("p");
	  var f=$(".filter").attr("f");
	  var c=$(".filter").attr("c");
	  if(isload){
	  if(p>0 && c>0){
	  //isload=false;
	       $.ajax({
                type: 'POST',
                url: 'ajax-product.php',
				
                data:{
				    id:c,
                    page:p,
					filter_attr:f
					
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				   $(".product_gengduo").show();
				    isload=false;
                },
                success: function(data){
				 if(IsPC()){
				$("html, body").animate({scrollTop:st},"slow");
				}
				 $(".product_gengduo").fadeIn();
				  if(data.count>0 && data.page>=0){
			
			    $(".filter").attr("c",data.id);
				 $(".filter").attr("p",data.page);
				  $(".filter").attr("f",data.filter_str);
				$(".product_box ul").append(data.goodlist);
				$(".product_box ul").find(".reload").each(function(){
				
				      $(this).animate({height:parseInt($(".product_box ul li").eq(0).height())},1000,function(){
				   
				      $(this).removeAttr("overflow");
					   $(this).removeClass("reload");
					    isload=true;
						 stop=true;
				   });
				   
				   LoadImg($(this).find("img"));
				   
				   if(data.page==0){
				   
				     $(".product_gengduo").fadeIn(300,function(){
				   
				   $(this).remove();
				  });
				   isload=false;
				   }
				
				});
				  
				  }else{
				  
				
				  }
                  
		
                }
            });
        }
    }

	  
	  
	  }
	  
	  }
	


}
	
	
	$(".product_gengduo").click(function(){
	if (document.documentElement && document.documentElement.scrollTop){

       var st = document.documentElement.scrollTop;
	  }else if (document.body){

       var st = document.body.scrollTop;
	  }

	  var p=$(".filter").attr("p");
	  var f=$(".filter").attr("f");
	  var c=$(".filter").attr("c");
	  if(isload){
	  if(p>0 && c>0){
	  //isload=false;
	       $.ajax({
                type: 'POST',
                url: 'ajax-product.php',
				
                data:{
				    id:c,
                    page:p,
					filter_attr:f
					
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				    isload=false;
                },
                success: function(data){
				 if(IsPC()){
				$("html, body").animate({scrollTop:st},"slow");
				}
				  if(data.count>0 && data.page>=0){
			
			    $(".filter").attr("c",data.id);
				 $(".filter").attr("p",data.page);
				  $(".filter").attr("f",data.filter_str);
				$(".product_box ul").append(data.goodlist);
				$(".product_box ul").find(".reload").each(function(){
				
				      $(this).animate({height:parseInt($(".product_box ul li").eq(0).height())},1000,function(){
				   
				      $(this).removeAttr("overflow");
					   $(this).removeClass("reload");
					    isload=true;
				   });
				   
				   LoadImg($(this).find("img"));
				   
				   if(data.page==0){
				   
				     $(".product_gengduo").fadeIn(300,function(){
				   
				   $(this).remove();
				  });
				   isload=false;
				   }
				
				});
				  
				  }else{
				  
				
				  }
                  
		
                }
            });
	  
	  
	  }
	  
	  }
	
	
	});

	
	$(".product_box ul li").each(function(){
	
	   LoadImg($(this).find("img"));
	
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
                obj.attr("src",imgsrc) ;
                ShowCaseDetailImage(obj);
            }

        } else {
              obj.attr("src",imgsrc) ;
       ShowCaseDetailImage(obj);

        }
    } else {
        image.onload = function() {
            if (image.complete == true) {
                 obj.attr("src",imgsrc) ;
              ShowCaseDetailImage(obj);
            }
        }

    }

    image.onerror = function() {
        obj.parent().removeClass("img_loading").addClass("img_loading_error");
    }

}



function ShowCaseDetailImage(obj) {

 //resize(obj);
   // obj.prev().removeClass("loadding");
  // console.log(obj.parent().parent().parent().attr("class"));
 obj.parent().parent().parent().find(".loadding").hide();

	obj.removeAttr("style");
obj.removeAttr("data-src");
	obj.fadeIn();
   
 
}

})

String.prototype.trim = function() {
  return this.replace(/^\s+/, '').replace(/\s+$/, '');
}