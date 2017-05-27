  $(window).resize(function(){
 var w = $(window).width();
  if ( w >960){
  $('#link_css').attr('href','css/wide.css')
  }
  
   else if ( w>475 && w<960){
  $('#link_css').attr('href','css/normal.css')
  }
    else if(w<475){
  $('#link_css').attr('href','css/narrow.css')
  }
});

$(function(){
 var w = $(window).width();
  if ( w >960){
  $('#link_css').attr('href','css/wide.css')
  }
  
   else if ( w>475 && w<960){
  $('#link_css').attr('href','css/normal.css')
  }
    else if(w<475){
  $('#link_css').attr('href','css/narrow.css')
  }
})