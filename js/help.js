$(function(){

$(".help_nav").click(function(e){

  $(".slide_ul").not(this).slideUp();
  $(this).find(".slide_ul").slideToggle();
  
  
 
});


$(".help_nav li").click(function(e){


 

  e.stopPropagation();
  
  
 
});


})