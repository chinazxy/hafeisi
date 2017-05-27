 var searchval=new Array();
 
 $(function(){
 
  $(".order_container ul").each(function(i){
  
   var thisheight=$(".div1",$(".more_pro").eq(i)).length*150;
   
   $("li",$(this)).not(".more_pro").css("height",thisheight+"px");
  
  });

	   $content_img = $(".itemhtml").find("img");
                $content_img.each(function() {

               
                    $(this).hide();
                    content_loading($(this));

                });
	var nowpage=$(".now_page").val()-1;			
	 var initlen=$(".page-ul li").length;
  
  var initpageWidth=$(".page_list").outerWidth();
 
  
  var initnums=Math.ceil(initpageWidth/40);
  
    
  var initallpage=Math.ceil(initlen/initnums);
  
  if(nowpage>initallpage){
  
  nowpage=initallpage;
  }
		

				
				
	var  div1len= $(".div1",$(".order_container").eq(nowpage)).length;
    var  ullen= $("ul",$(".order_container").eq(nowpage)).length;

	
	var order_height=div1len*146+ullen*80;

	
	$(".order_container").eq(nowpage).css("height",order_height+"px");
	
	$(".page-ul li").eq(nowpage).addClass("select").siblings().removeClass("select");

    step_page(true);
 
});
var nextpage=0;
  function ClickPage(page,obj){
   if(nextpage===page){
   
     return false;
    }
   $(obj).addClass("select").siblings().removeClass("select");
  filterProduct(1,page,searchval,false);
  nextpage=page;
  }

function step_page(pagechange){

  var len=$(".page-ul li").length;
  
  var pageWidth=$(".page_list").outerWidth();
  
  var moveWidth=40;
  
   $(".page-ul").css("width",len*moveWidth+"px");
  
  var moveElementNums=0;
  
  var pagestep=1;
  
  var nums=Math.ceil(pageWidth/40);
  

  
  var allpage=Math.ceil(len/nums);
  
  
  $(".page-ul li").hover(function(){
  
     var liindex=$(".page-ul li").index(this);
	 
	 var movew=(liindex%nums)*40;
	 $(".div_line").stop().animate({left:movew},200);
  
  
  },function(){
  
  
  });
  
      $(".div_line").animate({left:0},200);
	
    var stepstr=""; 
	if(pagechange){
	 $(".xianshi_12").empty();
	 $(".page-ul").css("left",0+"px");
  if(allpage>1){
  


  while(allpage){
  stepstr+=' <a href="JavaScript:void(0);">'+allpage*nums+'</a>';
  allpage--;
  }
  
  stepstr+=' <span class="fr">显示</span>';
  



   $(".xianshi_12").empty().html(stepstr);

    if(len>nums){
  
    $(".xianshi_12 a:last").addClass("xz");
    }  
	}else{
	
	  stepstr+=' <a href="JavaScript:void(0);">'+len+'</a>';

  
     stepstr+=' <span class="fr">显示</span>';
	  $(".xianshi_12").empty().html(stepstr);
	   $(".xianshi_12 a:last").addClass("xz");
	}
   }
  $(".xianshi_12 a").click(function(){
  $(".div_line").animate({left:0},200);
     if(parseInt($(this).html())>0){
	 
	  moveElementNums=parseInt($(this).html());
	  pagestep=Math.ceil(moveElementNums/nums);
	  
	 }
	 
	 $(this).addClass("xz").siblings().removeClass("xz");
	 
	 if(moveElementNums>len){
	 
	 moveElementNums=len;
	 }
	 
	 var moveele=(pagestep-1)*nums;
	 
	 if(moveele>len){
	 
	  moveele=pagestep*nums-(pagestep-1)*nums;
	  
	 }
	 
	 var mleft=moveele*moveWidth;
	 
	 
	 $(".page-ul").animate({left:-mleft},500);
	
	 
    
  });


}


var oldpage=0;
function Page(page,obj){

 if(page===oldpage){
 
   return false;
 }

 if(page>0){
    var pstep=page-1;
     $(obj).addClass("select").siblings().removeClass("select");

	var  div1len= $(".div1",$(".order_container").eq(pstep)).length;
    var  ullen= $("ul",$(".order_container").eq(pstep)).length;

	
	var order_height=div1len*146+ullen*80;
	 $('html,body').animate({scrollTop: 200}, 500);
	$(".order_container").eq(pstep).css("height",order_height+"px");
     $(".order_container").eq(pstep).fadeIn().siblings().not(".list_page").fadeOut();

 }
oldpage=page;

}

  function content_loading(imageobj) {
        var browser = new Object();
        var obj = new Object();
        obj = imageobj;
        browser.useragent = window.navigator.userAgent.toLowerCase();
        browser.ie = /msie/.test(browser.useragent);
        browser.moz = /gecko/.test(browser.useragent);
        var imgsrc = obj.attr("src");
        var image = new Image;
        image.src = imgsrc;
        if (browser.ie) {
            if (image.height === 0) {
                image.onload = function() {
                    obj.attr("src", image.src);
                    showContentImage(obj);
                }

            } else {
                obj.attr("src", image.src);
                showContentImage(obj);

            }
        } else {
            image.onload = function() {
                if (image.complete == true) {
                    obj.attr("src", image.src);
                    showContentImage(obj);
                }
            }

            image.onerror = function() {
                obj.parent().addClass("img_loading_error");
               // $(".img_loading_error").height("250px")
            }

        }

    }

    function showContentImage(obj) {
      
        obj.fadeIn(1000);
    }

    function showImage(obj) {

  
        obj.parent().parent().removeClass("img_loading");
        obj.fadeIn(1000);
    }
