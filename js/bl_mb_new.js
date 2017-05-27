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

//$(".news_alert_box").css("width",$(window).width());
$(".news_alert_box").css("height",$(window).height());
$(".scroll-pane").css("height",$(window).height()-$(".title_box").height());

}



$(".news_alert_box .close").click(function(){

$(".cont_news_box").show();
 $(".news_alert_box").fadeOut();
  $(".heibei").fadeOut();

});





});




function getNewsinfo(id){

      if(parseInt(id)>0){
	  $(".cont_news_box").hide();
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
								  
								$(".newsdetail_text").empty().html(data.msg.article_content);
					 
           	
					   
					 break;
					 
					 default:
					 alert("系统错误,刷新后重试!");
					   
         
    
			  
                    }
		
                }
            });		  
	  
	  }else{
	  
	  alert("非法传值！");
	  
	  }


}
