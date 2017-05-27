$(function(){




$(".guanbi").click(function(){

 $(".baoxiu_xieyi_box").animate({opacity:0,marginTop:[-250,"easeInOutSine"]},600,function(){

   $(".baoxiu_alert_box").fadeOut();
 });

})

  

})

function openBaoxiu(){

   $(".baoxiu_alert_box").fadeIn(300,function(){
      $('#scrollbar1').tinyscrollbar({trackSize:300});
   $(".baoxiu_xieyi_box").animate({opacity:1,marginTop:[-230,"easeOutSine"]},300);
   
   
   });


}


function agree(){

    location.href="baoxiu.php";

}