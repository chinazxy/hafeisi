 
 
 var category=0;
 
 var brand=0;
 
 var maxprice=0;
 
 var minprice=0;
 
 var brice=0;
 
 $(function(){

	   $content_img = $(".itemhtml").find("img");
                $content_img.each(function() {

               
                    $(this).hide();
                    content_loading($(this));

                });

     var containwidth=parseInt($(".list .right").innerWidth());
	 var containerheight=parseInt($(".list .right").outerHeight());
	 $(".list_loading_wrap").css({height:containerheight+"px",width:containwidth+"px"});
	 var listloadheight=parseInt($(".list_loading").outerHeight());
	 $(".list_loading").css("top",(containerheight-listloadheight)/2+"px");
     $(".title").click(function(){
 
 
   if($(this).next().attr("class")==="list_nav"){
    $(".title").not(this).removeClass("select");
	$(".list_nav").not($(this).next()).slideUp();
   if($(this).next().css("display")==="none"){
   
     $(this).addClass("select");
	 
	
   }else{
   
     $(this).removeClass("select");
   }
   
   $(this).next().slideToggle();
   }
   

 
 
 });
 
 
  $(".left li").click(function(){
     
      var classname=$(this).attr("class");
      
     if($(this).children().next().next().attr("checked")==="checked"){

	 $(this).children().next().next().attr("checked",false);
	 
	 $(this).children().eq(0).removeClass("yes_check");
	 
     var vals=$(this).children().next().next().val();
 	  if(classname=="attrs_category"){
	 
	   if(vals!=""){
	     category=0;
	  }
	 
	 }
	 
	 	 if(classname=="attrs_brand"){
	 
	   if(vals!=""){
	     brand=0;
	  }
	 
	 }
	 
	 	 if(classname=="attrs_price"){
	 
	   if(vals!=""){
	    
		 var brice_explode=vals.split("-");
		  minprice= 0;
		  maxprice= 0;
	  }
	 
	 }
	 
	 
	 
	 console.log(category+":"+brand+":"+minprice+":"+maxprice);
	
	 
	 }else{
	  var aindex=$("."+classname).index(this);
	  var oldval="";
	  $("."+classname).each(function(i){
	       if($("."+classname).eq(i).children().next().next().attr("checked")==="checked"){
		   
		   oldval=$("."+classname).eq(i).children().next().next().val();
		 
		   }
	  });

	
	  // removeArray(searchval,oldval);
	 
	 $(this).children().next().next().attr("checked",true);
	 
	 $("."+classname).not($(this)).children().next().next().attr("checked",false);

	  $(this).children().eq(0).addClass("yes_check");
	  
	  $("."+classname).not($(this)).children().removeClass("yes_check");
	  
	  var vals=$(this).children().next().next().val();
	  
	//  if(vals!=""){
	  
	//  addArray(searchval,vals);
	  
	 // }
	 
	  if(classname=="attrs_category"){
	 
	   if(vals!=""){
	     category=vals;
	  }
	 
	 }
	 
	 	 if(classname=="attrs_brand"){
	 
	   if(vals!=""){
	     brand=vals;
	  }
	 
	 }
	 
	 	 if(classname=="attrs_price"){
	 
	   if(vals!=""){
	    
		 var brice_explode=vals.split("-");
		  minprice= brice_explode[0];
		  maxprice= brice_explode[1];
	  }
	 
	 }
	 }
   //  console.log(category+":"+brand+":"+minprice+":"+maxprice);
  filterProduct(keywords,1,category,brand,minprice,maxprice,true);
  });
  
  
  function addArray(arrayval,val){
  
    arrayval.push(val);

  }
  

  
  function removeArray(arrayval,val){
       
	   
	   var index = arrayval.indexOf(val);
       if(index!=-1){
   		  arrayval.splice(index,1);
		  
		 }
	
	  	
	  return arrayval;
  
  }
  
  step_page(true);
 
});
var nextpage=0;
  function Page(page,obj){
   if(nextpage===page){
   
     return false;
    }
   $(obj).addClass("select").siblings().removeClass("select");
  filterProduct(keywords,page,category,brand,minprice,maxprice,false);
  nextpage=page;
   $('html,body').animate({scrollTop: 200}, 500);
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
  if(allpage>0){
  


  while(allpage){
  if(allpage<12){
  stepstr+=' <a href="JavaScript:void(0);">'+len+'</a>';
  }else{
   stepstr+=' <a href="JavaScript:void(0);">'+allpage*nums+'</a>';
  }
  allpage--;
  }
  
  stepstr+=' <span class="fr">显示</span>';
  



   $(".xianshi_12").empty().html(stepstr);

  if(len>nums){
  
    $(".xianshi_12 a:last").addClass("xz");
    }  
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




var currentAjax=0;

function filterProduct(keyword,page,category,brand_id,minprice,maxprice,pagechange=true){


    if(currentAjax){
    currentAjax.abort();
	}
// var arrays=new Array();
 //arrays=array;
 if(keyword!=" "){
//  var searchStr=arrays.join(",");
 
   currentAjax= $.ajax({
                type: 'POST',
                url: 'ajaxSearch.php',
                data:{
                    keywords:keyword,
					brand:brand_id,
					category:category,
					min_price:minprice,
					max_price:maxprice,
					page:page
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
	
				 $(".list_loading_wrap").show();
                },
                success: function(data){
				$(".list_loading_wrap").hide();
				   if(data.htmlstr!=""){
				      $(".div_line").show();
				
				$(".xianshi_12").show();
				   	  $(".no_shuju").hide();
				   $(".itemhtml").empty().html(data.htmlstr);
				   $content_img = $(".itemhtml").find("img");
				   $length=$content_img.length;
                   var columns=Math.ceil($length/3);
				   var itemheight=parseInt($(".itemhtml li:first").height());
				  // alert(itemheight);
				   var loadingheight=columns*itemheight+parseInt($(".list_page").innerHeight());
				   var containwidth=parseInt($(".list .right").innerWidth());
	               $(".list_loading_wrap").css({height:loadingheight+"px",width:containwidth+"px"});
                   var listloadheight=parseInt($(".list_loading").outerHeight());
	               $(".list_loading").css("top",(columns*itemheight-listloadheight)/2+"px");
                   $content_img.each(function() {

               
                    $(this).hide();
                    content_loading($(this));

                });
				   }else{
				
				      $(".itemhtml").empty();
					  
					  $(".no_shuju").show();
				   }
				   
				   if(data.navhtml!=""){
				    $(".list_page").show();
				      $(".page-ul").empty().html(data.navhtml);
					  $(".page-ul li").eq(page-1).addClass("select").siblings().removeClass("select");
					  step_page(pagechange);
				   }else{
				    $(".list_page").hide();
				    $(".div_line").hide();
				    $(".page-ul").empty();
					$(".xianshi_12").hide();
				   }
		
                }
            });
 
 }
 



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
