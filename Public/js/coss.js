$(function(){

 $(".video_main .close").click(function(){
 
  var vcindex=$(".video_main .close").index(this);
  
   $(".video_re").eq(vcindex).animate({"left":-354},550);
 
 
 });
 
 
 $(".video_text .show_arrow").click(function(){
 
 var vcindex=$(".video_text .show_arrow").index(this);
 
   $(".video_re").eq(vcindex).animate({"left":0},550);
 
 });



})