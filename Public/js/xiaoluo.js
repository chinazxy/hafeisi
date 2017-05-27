$(function() {


$(".showpic").hover(
function(){
  $(this).find(".pic1").hide();
  $(this).find(".pic2").show();
}
,

function(){
   $(this).find(".pic1").show();
  $(this).find(".pic2").hide();
}

);

}
)