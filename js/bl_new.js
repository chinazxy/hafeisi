var api="";
var apis=[];
$(function(){


init_news();
$(window).resize(function(){

init_news();

});
function init_news(){

if($(window).width()>950){
 $(".news_box > ul li").css("width",parseInt($(window).width())*0.31);
  $(".news_box > ul li").css("height",parseInt($(window).width())*0.31);
}else if($(window).width()>640 && $(window).width()<950) {

 $(".news_box > ul li").css("width",parseInt($(window).width())*0.475);
  $(".news_box > ul li").css("height",parseInt($(window).width())*0.475);

}else{

 $(".news_box > ul li").css("width",parseInt($(window).width())*0.8);
  $(".news_box > ul li").css("height",parseInt($(window).width())*0.8);

}


$(".heibei,.news_alert_box").css("height",$(window).height());


$(".news_alert_box").css("height",$(window).height());

$(".scroll-pane").css("height",$(window).height()-$(".title_box").height()-200);

if($(window).width()>950){
$(".scroll-pane,.news_alert_box").css("width",805);
$(".newsdetail_text").css("width",805*0.9);

}else{

$(".news_alert_box,.news_alert_box").css("width",$(window).width());

$(".newsdetail_text").css("width",$(window).width()*0.9);
}
}



$(".news_alert_box .close").click(function(){
 $(".news_alert_box").fadeOut();
  $(".heibei").fadeOut();
$("body").css("overflow-y","");

});

$(".arrow_left .t2").click(function(){
var pid=$(this).attr("prevId");
getItem(pid);

});


$(".arrow_right .t2").click(function(){
var pid=$(this).attr("nextId");
getItem(pid);
});


function getItem(id){


      if(parseInt(id)>0){
	   $("body").css("overflow-y","hidden");
	    $(".news_alert_box").fadeIn();
        $(".heibei").fadeIn();

	
		   $.ajax({
                type: 'POST',
                url: "ajax-news.php",
                data:{
                    id:id
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
                 $(".loadding").show();
			
                 },
                success: function(data){
				            $(".loadding").fadeOut();
                     switch(data.err){
					 
					 case 0:
					   alert("数扰有误!");
					       $(".news_alert_box").fadeOut();
                       $(".heibei").fadeOut();
					 break;
					 
					  case 1:
					  
			 $(".title_box .title").empty().html(data.msg.title);
					  			  $(".title_box .date").empty().html(data.msg.time);
								  $(".arrow_right .t2").attr("nextId",data.nextId);		
                       $(".arrow_left .t2").attr("prevId",data.prevId);	
							$(".newsdetail_text").empty().html(data.msg.article_content);
		  
					 break;
					 
					 default:
					 alert("系统错误,刷新后重试!");
					   
         
    
			  
                    }
		
                }
            });		 
	  
	  }else{
	  

	  
	  }

}


$(".loadding").ajaxStart(function(){


   $(".loadding").show();
});


$(".loadding").ajaxSuccess(function(){

   $(".loadding").hide();
});

});






function getNewsinfo(id){



   

      if(parseInt(id)>0){
	  $("body").css("overflow-y","hidden");
	    $(".news_alert_box").fadeIn();
        $(".heibei").fadeIn();
		
		
		   $.ajax({
                type: 'POST',
                url: "ajax-news.php",
                data:{
                    id:id
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
                 $(".loadding").show();
			
                 },
                success: function(data){
				            $(".loadding").fadeOut();
                     switch(data.err){
					 
					 case 0:
					   alert("数扰有误!");
					       $(".news_alert_box").fadeOut();
                       $(".heibei").fadeOut();
					 break;
					 
					  case 1:
					  
				 $(".title_box .title").empty().html(data.msg.title);
					  			  $(".title_box .date").empty().html(data.msg.time);
								  $(".arrow_right .t2").attr("nextId",data.nextId);		
                       $(".arrow_left .t2").attr("prevId",data.prevId);	
							$(".newsdetail_text").empty().html(data.msg.article_content);
		  
					 break;
					 
					 default:
					 alert("系统错误,刷新后重试!");
					   
         
    
			  
                    }
		
                }
            });		 
	  /*  $('.scroll-pane').load("ajax-news.php?id="+id,function(data){
						  datas=jQuery.parseJSON(data); 
						  if(datas.err==0){
						   $(".news_alert_box").hide();
  $(".heibei").hide();
$("body").css("overflow-y","");
						     $(".loadding").hide();
							 
						   alert("数据有误!");
						   
						  
						  }else{
						 	 $(".title_box .title").empty().html(datas.msg.title);
					  			  $(".title_box .date").empty().html(datas.msg.time);
						              $(".arrow_right .t2").attr("nextId",datas.nextId);		
                            $(".arrow_left .t2").attr("prevId",datas.prevId);
							 api.scrollTo(0,0);
							 var contentPane = api.getContentPane();
						
						     contentPane.empty().append(datas.msg.article_content);
							 
							   api.reinitialise();
							 

							  }
							
						 
						 
	    });*/
 
	  
	  }else{
	  
	  alert("非法传值！");
	  
	  }


}
