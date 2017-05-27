$(function(){

 $(".sport_left_nav1").click(function(){
   var sinddex=$(".sport_left_nav1").index(this);
   $thisobj=$(this).find(".sport_left_nav2box");
   var lens=$thisobj.length;
   if(lens>0){
   $thisobj.slideDown();
   $(".sport_left_nav2box").not($thisobj).slideUp();
   }
   $(".sport_left_nav1 > a").removeClass("current");
     $(".sport_left_nav1 > a").eq(sinddex).addClass("current");
 });

 $(".nav_second").click(function(){
 
      $(this).next().slideToggle();
 
 });

});