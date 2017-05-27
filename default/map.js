
    function loadMap(){
	
	
	 
       var windowHeight=$(window).height();
      var iframe = document.createElement("iframe");
	  iframe.setAttribute("width","100%");
	    iframe.setAttribute("height",windowHeight+"px");
		   iframe.setAttribute("id","txtFrame");
		    iframe.setAttribute("scrolling","no");
iframe.src = stonemap; 
if (iframe.attachEvent){

iframe.attachEvent("onload", function(){
 $(".store_box_right").removeClass("loadding");
        var x= $(".live-info").eq(0).attr("x");
		  var y=$(".live-info").eq(0).attr("y");
		  var name=$(".live-name").eq(0).html();
		  var address=$(".address").eq(0).html();
		  var tel=$(".phone").eq(0).html();
		  var fax=$(".fax").eq(0).html();
		  var hotline=$(".hotline").eq(0).html();
		
	 	  document.getElementById('txtFrame').contentWindow.setMapCenter(x,y,name,address,tel,fax,hotline);

});
} else {

iframe.onload = function(){
 $(".store_box_right").removeClass("loadding");
        var x= $(".live-info").eq(0).attr("x");
		  var y=$(".live-info").eq(0).attr("y");
		  var name=$(".live-name").eq(0).html();
		  var address=$(".address").eq(0).html();
		  var tel=$(".phone").eq(0).html();
		  var fax=$(".fax").eq(0).html();
		  var hotline=$(".hotline").eq(0).html();
		 
	 	  document.getElementById('txtFrame').contentWindow.setMapCenter(x,y,name,address,tel,fax,hotline);


};
} 

document.getElementById("store_box_right").appendChild(iframe); 
	
	}
  
   function init(){
      
      
   
   
   }
   
     function item(obj){
	   
           x=$(obj).attr("x");
		  y=$(obj).attr("y");
		 name=$(".live-name",$(obj)).html();
		 address=$(".address",$(obj)).html();
		   tel=$(".phone",$(obj)).html();
		 fax=$(".fax",$(obj)).html();
		 hotline=$(".hotline",$(obj)).html();
	 	 document.getElementById('txtFrame').contentWindow.setMapCenter(x,y,name,address,tel,fax,hotline);
	
	 
	 }
 var $ = jQuery.noConflict();
  var faqindex=0;
$(document).ready(function(){

var nowpage=$(".nowpage").val(); 

$(".nav_wrap li a").eq(nowpage).addClass("select");
    var nowobj;
	
	var index=0;
	
	var tobj;
	
	 $(".nav .nav_li").click(function(){								 
			 var childIndex=$(".nav .nav_li").index(this);				 
			$(this).addClass("select-li").siblings().removeClass("select-li");					 
								 
	})
	 var moveObj=$(".green-slide");
	 
	 if(nowpage>0){
	 
	 var startleftval=90*nowpage;
	 
	 moveObj.css("left",startleftval+"px");
	 
	      $(".nav .nav_li").eq(nowpage).attr("style","");
	       $(".nav .nav_li").eq(nowpage).children().attr("style","color:#000");	
	 
	 }

      $(".nav .nav_li").mouseenter(function(){
									   
	  var childIndex=$(".nav  .nav_li").index(this);
	  var movewidth=90*childIndex;

	  var cssVal="background:none";
	  $(this).attr("style",cssVal).siblings().attr("style","");
	
	     var that=this;
	      TweenMax.to( moveObj, .3, { css:{left:movewidth}, ease:Linear.easeIn, delay: 0.1,onComplete:function(){
																							 
		  $(".nav .nav_li a").attr("style","");
	       $(that).children().attr("style","color:#000");																							   }}); 
	 if(!$(this).hasClass("select-li")){
	
	 if($(this).hasClass("has_childer")){
		 
	     index=$(".has_childer").index(this);
	 
	      tobj= parent_nav_c.eq(index);
		 
		 if(typeof nowobj!=="undefined"){;
	     TweenMax.to( nowobj, .3, { css:{top:0,opacity:0}, ease:Linear.easeOut, delay: 0.1,onComplete:function(){
																													 
				TweenMax.to( tobj, .3, { css:{top:60,opacity:1}, ease:Linear.easeIn, delay: 0.1}); 
	
	             nowobj=tobj; 
;
			 }});

		 }else{
			 	TweenMax.to( tobj, .3, { css:{top:60,opacity:1}, 	ease:Linear.easeIn, delay: 0.1}); 
				
				
	             nowobj=tobj; 
			 
		 }
	
	}	
	 }
	});	  
	  $(".nav .nav_li").mouseleave(function(){
	   var that=this;
		   var movewidth=90*nowpage;
		 TweenMax.to( moveObj, .3, { css:{left:movewidth}, ease:Linear.easeIn, delay: 0.1,onComplete:function(){
																							 
		  $(".nav .nav_li a").attr("style","");
	       $(".nav .nav_li a").eq(nowpage).attr("style","color:#000");																							   }});
		
	 });
	  
	  $(".hasChildren ul li").hover(function(){
	  
	    $(this).children().attr("style","color:#000");	
	  
	  },function(){
	  
	  	    $(this).children().attr("style","");	
	  });

   
    	$(".hasChildren").mouseenter(function(){
$(this).find("ul").stop().animate({height:30*$(".hasChildren li").length,opacity:1},500,"easeInOutSine");
});
$(".hasChildren").mouseleave(function(){
$(this).find("ul").stop().animate({height:0,opacity:0},500,"easeInOutSine");
}); 
  
	
var wheight=$(window).height();
var wwidth=$(window).width();
$(".zunon_alert").css({heigth:wheight+"px",width:wwidth+"px"});

$(".faqcontainer").css({top:(wheight-240)/2});

$(".faq_content ul .faqnav").eq(0).addClass("select");
$(".faq_content ul .faqnav").click(function(){

 faqindex=$(".faq_content ul .faqnav").index(this);
  
  $(".box1").hide().eq(faqindex).fadeIn();
  
  $(".faqnav").removeClass("select").eq(faqindex).addClass("select");


});


$(".content_title").click(function(){
   
   $(".content_txt").not($(this).next()).slideUp();
   $(this).next().slideToggle();

})


$("#kkhu").click(function(){

   $(".zunon_alert").show().stop().animate({opacity:[0.8,"jswing"]},500);
   $(".faqcontainer").fadeIn();

});


$(".size_close").click(function(){

   $(".zunon_alert").show().stop().animate({opacity:[0,"jswing"]},500);
   $(".faqcontainer").fadeOut();
});


$(".scrolltop").click(function(){

$('html,body').animate({scrollTop: '0px'}, 800)

});

 $(".search").click(function(){
    if($(".s_input").val().Trim()==="" ||  $(".s_input").val().Trim()=='Search...'){
	if(!$(".s_input").hasClass("zk")){
    $(".nav_wrap").stop().animate({width:[788,"easeOutCirc"],opacity:[1,"easeInOutSine"]},500);
	 $(".s_input").stop().animate({width:[238,"easeOutCirc"],opacity:[1,"easeInOutSine"]},500);
	$(".s_input").addClass("zk");
	}else{
	 $(".nav_wrap").stop().animate({width:[620,"easeOutCirc"],opacity:[1,"easeInOutSine"]},500);
	 	 $(".s_input").stop().animate({width:[0,"easeOutCirc"],opacity:[1,"easeInOutSine"]},500);
	$(".s_input").removeClass("zk");
	}
	
	}else{
	
		$('#myform_search :input[name="q"]').val($(".s_input").val());
		$('#myform_search').submit();
	}
  
 });
 
     $(".s_input").focus(function(){

	  $(this).css("color","#000");
	  if($(this).val()=='Search...'){
	  
	  $(this).val("");

	  
	  }
  
  
  });
 
 $(".s_input").blur(function(){
    
	   if($(this).val().Trim()=='Search...' || $(this).val().Trim()==""){
	  $(this).css("color","#999");
	  $(this).val("Search...");
	  

	  }
 
 });
 
 
 $("#newsbook-btn").click(function(){
 
     var email=$("#news-email").val();
	 
	 if(email.Trim()==""){
	   
	    alert("请填写邮箱地址!");
		return false;
	 
	 }else{
	 
	  if(!(/^(?:[a-z\d]+[_\-\+\.]?)*[a-z\d]+@(?:([a-z\d]+\-?)*[a-z\d]+\.)+([a-z]{2,})+$/i.test(email.Trim()))){
         alert("请填写正确的邮箱地址!");
		 return false;
      }
	 
	 }
	 
	$.ajax({
                type: 'POST',
                url: subscriberurl,
                data:{
				
				email:email
                  
                },
                dataType:"html",
                beforeSend:function(XMLHttpRequest){
                
                 },
                success: function(data){
				
                   alert(data);
		
                }
            });
 
 
 });

 
  var searchinputval='';
		var searchval=new Array();
    var searchstr='';
	 $(".store_input").focus(function(){
	 
	  if($(this).val()=='请输入城市地点'){
	  
	  $(this).val("");

	  
	  }
	 
	 });

	  
 $(".store_input").blur(function(){
    
	   if($(this).val().Trim()=='请输入城市地点' || $(this).val().Trim()==""){
	  $(this).val("请输入城市地点");
	  

	  }
 
 });
 
 $(".store_search").click(function(){
      if($(".store_input").val().Trim()=='请输入城市地点' ||  $(".store_input").val().Trim()==""){
	  searchinputval="";
	  alert("请输入搜索关键字!");
	  }else{
	  searchinputval=$(".store_input").val();
	     ajaxSearch();
	  }

 
 });
 
 
searchval.push($(".store-filter").eq(0).attr("attr_id"));
 
     $(".store-filter").click(function() {
           var sitem=$(this).attr("attr_id");
		  
        if ($(this).hasClass("store-filter-selected")) {
            
            $(this).removeClass("store-filter-selected").addClass("store-filter-no");
						   var item_index = searchval.indexOf(sitem);
       if(item_index!=-1){
   		  searchval.splice(item_index,1);
		  
		 }
        } else {

            $(this).removeClass("store-filter-no").addClass("store-filter-selected");
			searchval.push(sitem);

        }
    searchstr=searchval.join(",");
	
	
   ajaxSearch();

    });
	
	 
		function ajaxSearch(){
	
		$.ajax({
                type: 'POST',
                url: searchUrl,
                data:{
					searchstr:searchstr,
					inputval:searchinputval
					
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
	             $(".searchContain").addClass("loadding");
				 $(".empty").hide();
                },
                success: function(data){
				     $(".searchContain").removeClass("loadding");

				   if(data.count>0){
				   $(".searchContain").show();
				       $(".empty").hide();
					  
					
				   }else{
				  $(".empty").fadeIn();
				   }
				   
				   
				   if(data.htmlstr!=""){
				     
		               $(".searchContain").empty().html(data.result);
					   
					       
				       $('.scrollbar1').tinyscrollbar();
				
		   
				   }
			
		
                }
            });
	
	
	}
	
	$(".zystone").click(function(){
	 $(".store_alert").fadeIn(500,function(){
	 $('#scrollbar1').tinyscrollbar();
	 
	 });
	 
	 
	  $("body").css("overflow-y","hidden");
	  loadMap();
	  
	});
	
	$(".alert_close").click(function(){
	 $(".store_alert").fadeOut();
	  $("body").css("overflow-y","");
	})

});

String.prototype.Trim = function()   
{   
return this.replace(/(^\s*)|(\s*$)/g, "");   
}    