    function loadMap(){
	
	
	 
       var windowHeight=$(window).height();
      var iframe = document.createElement("iframe");
	  iframe.setAttribute("width","100%");
	    iframe.setAttribute("height","100%");
		   iframe.setAttribute("id","txtFrame"); 
		    iframe.setAttribute("scrolling","no");
				    iframe.setAttribute("frameborder","no");
							    iframe.setAttribute("border","0");
iframe.src = "stonemap.php"; 
if (iframe.attachEvent){

iframe.attachEvent("onload", function(){
 $(".store_box_right").removeClass("map_loadding");
        var x= $(".live-info").eq(0).attr("x");
		  var y=$(".live-info").eq(0).attr("y");
		  var name=$(".live-name").eq(0).html();
		  var address=$(".address").eq(0).html();
		  var tel=$(".phone").eq(0).html();
		  var fax=$(".fax").eq(0).html();
		  var hotline=$(".hotline").eq(0).html();
		
	 	document.getElementById('txtFrame').contentWindow.setMapCenter(x,y,name,address,tel,fax,hotline);
//
});
} else {

iframe.onload = function(){
 $(".store_box_right").removeClass("map_loadding");
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
  
 
   
     function item(obj,event){
	 var e=event || window.event;
           x=$(obj).attr("x");
		  y=$(obj).attr("y");
		 name=$(".live-name",$(obj)).html();
		 address=$(".address",$(obj)).html();
		   tel=$(".phone",$(obj)).html();
		 fax=$(".fax",$(obj)).html();
		 hotline=$(".hotline",$(obj)).html();
	 	 document.getElementById('txtFrame').contentWindow.setMapCenter(x,y,name,address,tel,fax,hotline);
		 
		 		if ($(".map_dian").hasClass("map_mp")) {
	     $(".dian_upsan").removeClass("select");
		  	  $(".map_dian").removeClass("map_on").addClass("map_off");
		    $(".map_yin").stop().animate({height:0},500);
			 	   $(".map_right").show();
				    $(".foot_gai").show();
				     $(".map_left").height(0);
					 
					 }
					 
					 e.stopPropagation();
	 
	 }
var bs=0;
var ss=0;
$(function(){
	
	initMap();
	$(window).resize(function(){
		
		initMap();
		 if(!$(".gpage").hasClass("mpgpage")){
		   $("#scrollbar1").tinyscrollbar_update();
		   
		 }
		// $(".gpage").height($(window).height());
	});

  
    //alert($(window).width());
   function initMap(){
	   

	    // $(".amap-info").width(100);
	    if($(window).width()<960){
			 
		 $(".gz_contain").css("marginTop",60);
		 }else{
			 
			 $(".gz_contain").css("marginTop",95); 
		 }
	
		 if($(window).width()>=1180){
			 
			 var wis=1180*0.75;
		 }else if($(window).width()>960 && $(window).width()<1180){
			  var wis=$(window).width()*0.75;
			  // $(".map_left").width("100%");
		
		 }else  if($(window).width()<=960){
			// $(".map_left").width("100%");
            // $(".map_yin").hide();			 
			 var wis=$(window).width();
		 }
		 
		 if($(".gpage").hasClass("mpgpage")){
			 
			 $(".scrollbar").hide();
			 
			 $("#scrollbar1").height($(window).height()-$(".gh").height()-$(".map_dian").height());
			 // $(".gpage").height("100%");
		 }else{
			 
			 
			//   $(".gpage").height($(window).height()-$(".foot_gai").height());
		 }
		 
		 $(".map_right").width(wis);
		 $(".store_box_right,#txtFrame").width(wis*0.99);
	
	   
   }

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

searchstr=$(".store-filter").eq(0).attr("attr_id");
 $(".store-filter").eq(0).prev().addClass("select");
   ajaxSearch();
     $(".store-filter").click(function() {
           var sitem=$(this).attr("attr_id");
		  $(".store-filter").prev().removeClass("select");
            $(this).prev().addClass("select");
              
			searchstr=sitem;

	
   ajaxSearch();

    });
	
	 
		function ajaxSearch(){
	
		$.ajax({
                type: 'POST',
                url: "stone.php",
                data:{
					searchstr:searchstr,
					inputval:searchinputval
					
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
	             $(".searchContain").addClass("map_loadding");
				 $(".empty").hide();
                },
                success: function(data){
				     $(".searchContain").removeClass("map_loadding");

				   if(data.count>0){
				   $(".searchContain").show();
				       $(".empty").hide();
					  
					
				   }else{
				  $(".empty").fadeIn();
				   }
				   
				   
				   
				   if(data.htmlstr!=""){
				     
		               $(".searchContain").empty().html(data.result);
					   	 if($(".gpage").hasClass("mpgpage")){
			 
			 $(".scrollbar").hide();
			 
			 $(".viewport").css("overflow-y","scroll");
			 
		 }
					        if($(".map_dian").hasClass("map_mp")){
							 var mpsh=hf-60-40-86-56-$(".dian_cha2_right").length*30;
							  if(!$(".gpage").hasClass("mpgpage")){
					       $('#scrollbar1').tinyscrollbar({trackSize:mpsh-40});
							  }
						   
						   }else{
							   	  if(!$(".gpage").hasClass("mpgpage")){
				          $('.scrollbar1').tinyscrollbar();
								  }
					 
					 }
				
		   
				   }
			
		
                }
            });
	
	
	}
	
	$(".sale_map").click(function(){
	 $(".store_alert").fadeIn(500,function(){
		  if(!$(".gpage").hasClass("mpgpage")){
	 $('#scrollbar1').tinyscrollbar();
		  }
	 
	 });
	 
	 
	  $("body").css("overflow-y","hidden");
	 
	  
	});
	 loadMap();
	//$('#scrollbar1').tinyscrollbar();
	$(".alert_close").click(function(){
	 $(".store_alert").fadeOut();
	  $("body").css("overflow-y","");
	});
	
//var hf=$(window).height();	

//$(".gpage").height(hf);
	$(".map_dian").click(function(){
      var mpsh=hf-60-40-86-56-$(".dian_cha2_right").length*30;
	 
        if($(this).hasClass("map_mp")){
		 $(".dian_cha3,.searchContain").height(mpsh);
		 $(".map_left").height(hf);
			
			 
		  if($(this).hasClass("map_off")){
		     
			  if($(".s_d").hasClass("menu_on")){
			    $('.menu_div').hide();
		      	$(".s_d").addClass("menu_off").removeClass("menu_on");
				
			  }
		  
		     if($(".shouji_nav").hasClass("menu_on")){
			 
			 		$('div.menu_div').slideUp(200,
				function() {
					$("html, body").animate({
						scrollTop: 0
					},
					"slow");
			
			   $(".shouji_nav").addClass("menu_off").removeClass("menu_on");
				$(".map_left .map_dian").css({"position":"fixed",top:60});
				$(".map_yin").css({"position":"fixed"});
				}).css("z-index", "9");
			 
			 }else{
			   $(".map_left .map_dian").css({"position":"fixed",top:60});
				$(".map_yin").css({"position":"fixed"});
			 }
		  	
				
				$(".map_right").hide();
	           $(".foot_gai").hide();
		  
		  $(this).removeClass("map_off").addClass("map_on");
	      $(".dian_upsan").addClass("select");
		   $(".map_yin").stop().animate({height:hf-100},500,function(){
		   
	
		   });
		
	 
		  }else{

		    $(".dian_upsan").removeClass("select");
		  	  $(this).removeClass("map_on").addClass("map_off");
		    $(".map_yin").stop().animate({height:0},500);
			 	   $(".map_right").show();
				     $(".map_left").height(0);
					 	  $(".foot_gai").show();
		  }
		
		}else{
				 $(".dian_cha3").height(390);
		          $(".map_left").css("height","auto");
		
		}
	
	
	
	})
	


})

String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}