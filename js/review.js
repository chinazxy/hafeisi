
$(document).ready(function(){
 
  $(".v_box1_right_sixbox_box1 li a").eq(0).addClass("current");
 $(".v_box1_right_sixbox_box1 li").mouseenter(function(){
 
   $(this).addClass("current").siblings().removeClass("current");
 });
 

  $(".whw-null img").each(function(){
  
  $(this).wrap("<div class='wrap_div'></div>");
  
  });
  $(".wrap_div:first").css("marginLeft",0+"px");
  
  
  var flag = false;  
if(navigator.userAgent.indexOf("MSIE")>0)  
{
    if(navigator.userAgent.indexOf("MSIE 6.0")>0)  
    {   
    flag = true;  
    }   
    if(navigator.userAgent.indexOf("MSIE 7.0")>0)  
    {  
    flag = true;  
    }   
    if(navigator.userAgent.indexOf("MSIE 8.0")>0)  
    {  
    flag = true;
    }   
  
}else  
{  
flag = false;  
}

if(document.all){

if(flag){  

$(".wrap_div  img").hover(function(){
$(this).stop().animate({width:120,height:70,marginLeft:-10,marginTop:-10},300,"easeInOutSine");
},
function(){
$(this).stop().animate({width:100,height:50,marginLeft:0,marginTop:0},200,"easeInOutSine");
}
)

}

}
  
  $(".size_big").css("height",$(window).height());
  $(window).resize(function() {
	  $(".size_big").css("height",$(window).height());	
	});
  $(".visit_comment_box4_left_box4").click(function(){
    
	 $(".reviewBox").fadeIn();
  
  });
  
  
     $(".v_box1_right_sevenbox_allbox .whw-null img").click(
		function(){
			$(".size_bg .size_mid .size_mid img").attr("src",$(this).attr("src"));
			$(".size_bg").fadeIn();
		}
   );
   $(".size_bg .size_mid .size_close").click(
		function(){
			$(".size_bg").fadeOut();
		}
   );
  
  

  

  
	var naindex=0;
	var vcindex=0; 
	var naimglen=$(".v_box1_left_img2 ul li").length;
    var ulobj = $(".v_box1_left_img2 ul");
	ulobj.css("width",naimglen*100);
  $(".imgarrow_left").click(function(event){
   
   	if (!$("li:first", ulobj).is(":animated")) {
	 if(naimglen<4){
	 
	  return false;
	 
	 }
	 
	$("li:last", ulobj).prependTo(ulobj);
				 $("li:first", ulobj).css("margin-left", -80).stop().animate({
            "margin-left": 10
        },
        500,function(){
			
    });
	 
	 
	 }
	 
	 event.stopPropagation();
  
  
  });
  
  
  $(".imgarrow_right").click(function(event){
  
  	if (!$("li:first", ulobj).is(":animated")) {
	 
	    if(naimglen<4){
	 
	  return false;
	 
	 }
	 
	        $("li:first", ulobj).animate({
				"margin-left": -80
			},
			500,
			function() {
				$(this).css("margin-left", 10).appendTo(ulobj);
			});		
	  
	}
	
	 event.stopPropagation();
  
   });
   
  
  $(".v_box1_right_fivebox_box2 ul li").click(function(){
  
    var bval=parseInt($(this).html());
		  // $(".hidden-color").val($(this).attr("value"));
	$(".input_box").val(bval);
  
  });
  
  
  $(".v_box1_right_threebox li").click(function(){
  
      var color_index=$(".v_box1_right_threebox li").index(this);
	  $(".hidden-color").val($(this).attr("value"));
	  $(this).addClass("select").siblings().removeClass("select");
  
  });
  
  $(".detailbox").click(function(){
   //  alert($(this).next().attr("class"));
   $(".v_box1_right_sevenbox_allbox").not($(this).next()).slideUp();
if($(this).next().css("display")==="none"){
$(".v_box1_right_sevenbox_arrow").removeClass("select");
$(this).prev().addClass("select")

}else{
$(this).prev().removeClass("select");
}
$(this).next().slideToggle(); 
  
  });
  
  
  $(".v_box1_right_fivebox_box1 li").click(function(){
  
    $(this).addClass("select").siblings().removeClass("select");
      $(".hidden-size").val($(this).attr("value"));
  });
  
  
  var vboxlen=$(".visit_comment_box2_contentbox ul:first  > li").length;

  var vbulobj=$(".visit_comment_box2_contentbox ul:first");
  
  var vcindex=0;
  var vindex=0;
 $(".visit_comment_box2_headbox_app_box").click(function(){
 
		if (!$(".visit_comment_box2_contentbox ul:first > li").eq(0).is(":animated")) {
   	vcindex=0;
	 if(vboxlen<2){
	 
	  return false;
	 
	 }
	  vindex--;
	  if(vindex<0){
	  
	  vindex=vboxlen-1;
	  }
	  
    
      $(".visit_comment_box2_headbox_mid_box ul li").eq(vindex).fadeIn().siblings().hide();
        moveWidth = 990;
		   $(".visit_comment_box2_contentbox ul:first  > li:last").prependTo(vbulobj);
				$(".visit_comment_box2_contentbox ul:first  > li").eq(0).css("margin-left", -moveWidth).stop().animate({
            "margin-left": 0
        },
        800, "easeInOutSine",function(){
		
		
    });
		  
	}
 
 
 });
 
 
 $(".visit_comment_box2_headbox_next_box").click(function(){
 
 
		if (!$(".visit_comment_box2_contentbox ul:first  > li").eq(0).is(":animated")) {
							
					
	vcindex=0;
	 if(vboxlen<2){
	 
	  return false;
	 
	 }
	  vindex--;
	  if(vindex<0){
	  
	  vindex=vboxlen-1;
	  }
	  
   $(".visit_comment_box2_headbox_mid_box ul li").eq(vindex).fadeIn().siblings().hide();
        moveWidth = 990; 
      $(".visit_comment_box2_contentbox ul:first  > li").eq(0).animate({
				"margin-left": -moveWidth
			},
			800,
			function() {
				$(this).css("margin-left", 0).appendTo(vbulobj);
			});	

		  
	
   	}
 
 });
 
 



});



String.prototype.Trim = function()   
{   
return this.replace(/(^\s*)|(\s*$)/g, "");   
}    