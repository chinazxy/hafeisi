$(function() {

    var isload=true;
	var stop=true; 
	$(window).scroll(function(){
    tutule(ajaxLoadContent);
	//ajaxLoadContent();
    });
$(".product_gengduo").hide();
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
	  var f=$(".filter").attr("k");
	  var a=$(".filter").attr("a");
	  if(isload){
	  if(p>0){
	  //isload=false;
	       $.ajax({
                type: 'POST',
                url: 'search.php',
				
                data:{
				    action:a,
                    page:p,
					keywords:f
					
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
			
			  
				 $(".filter").attr("p",data.page);
				  $(".filter").attr("f",data.keyword);
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