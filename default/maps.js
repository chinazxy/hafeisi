    function loadMap(){
	
	
	 
       var windowHeight=$(window).height();
      var iframe = document.createElement("iframe");
	  iframe.setAttribute("width","100%");
	    iframe.setAttribute("height",windowHeight+"px");
		   iframe.setAttribute("id","txtFrame");
		    iframe.setAttribute("scrolling","no");
iframe.src = "stonemap.php"; 
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
var bs=0;
var ss=0;
$(function(){






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
                url: "stone.php",
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
	
	$(".sale_map").click(function(){
	 $(".store_alert").fadeIn(500,function(){
	 $('#scrollbar1').tinyscrollbar();
	 
	 });
	 
	 
	  $("body").css("overflow-y","hidden");
	 
	  
	});
	 loadMap();
	$('#scrollbar1').tinyscrollbar();
	$(".alert_close").click(function(){
	 $(".store_alert").fadeOut();
	  $("body").css("overflow-y","");
	});
	
	
	var nowpage=$(".nowpage").val();
	
	$(".head_nav li > a").eq(nowpage).addClass("current");

})

String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}