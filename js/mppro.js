$(function(){
	

      var mySwiper0='';
	  var mySwiper1='';
	   
function gofun(){
	
	
}	   
 
    	   mySwiper0= new Swiper('.swip_0',{
    direction: 'horizontal',
    speed: 800,
    mousewheelControl: true,
    paginationClickable: true,

	centeredSlides:true,
	loop:false,
    onSlideNext:function(swiper){
	   mySwiper1.swipeTo(swiper.activeIndex, 100, gofun());
	         var id=$(".swip_1 .swiper-slide a").eq(swiper.activeIndex).attr("attrid");
       changePrice(id,$(".swip_1 .swiper-slide img").eq(swiper.activeIndex).get(0));
	},
	onSlidePrev:function(swiper){
	 mySwiper1.swipeTo(swiper.activeIndex, 100, gofun());
	       var id=$(".swip_1 .swiper-slide a").eq(swiper.activeIndex).attr("attrid");
       changePrice(id,$(".swip_1 .swiper-slide img").eq(swiper.activeIndex).get(0));
 
	}

  });					 					  mySwiper1= new Swiper('.swip_1',{
    direction: 'horizontal',
    speed: 800,
    mousewheelControl: true,
    paginationClickable: true,
	  onSlideNext:function(swiper){
 
       var id=$(".swip_1 .swiper-slide a").eq(swiper.activeIndex).attr("attrid");
       changePrice(id,$(".swip_1 .swiper-slide img").eq(swiper.activeIndex).get(0));	 
	  if(typeof mySwiper0=="object"){
		   
	 mySwiper0.swipeTo(swiper.activeIndex,800,gofun());
	  }
	},
	onSlidePrev:function(swiper){
 
     var id=$(".swip_1 .swiper-slide a").eq(swiper.activeIndex).attr("attrid");
     changePrice(id,$(".swip_1 .swiper-slide img").eq(swiper.activeIndex).get(0));	 
	  if(typeof mySwiper0=="object"){
		   
	    mySwiper0.swipeTo(swiper.activeIndex,800,gofun());
	  }
 
	},
 
	centeredSlides: true,
	loop:false

  });
  

  
       $(".z_step_o").on("click",
    function() {
        
        mySwiper1.swipePrev();

    });

    $(".y_step_o").on("click",
    function() {

        mySwiper1.swipeNext();
    });
	
	
	
	    					 					  var mySwiper2= new Swiper('.swip_2',{
    direction: 'horizontal',
    speed: 800,
    mousewheelControl: true,
    paginationClickable: true,
 
	centeredSlides: true,
	loop:false

  });
  
        $(".swipnavzt").on("click",
    function() {
        
        mySwiper2.swipePrev();

    });

    $(".swipnavyt").on("click",
    function() {

        mySwiper2.swipeNext();
    });
	
	
	    					 					  var mySwiper3= new Swiper('.swip_3',{
    direction: 'horizontal',
    speed: 800,
    mousewheelControl: true,
    paginationClickable: true,
         nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
	centeredSlides: true,
	loop:false

  }); 
          $(".swiprez").on("click",
    function() {
        
        mySwiper3.swipePrev();

    });

    $(".swiprey").on("click",
    function() {

        mySwiper3.swipeNext();
    });
 
$(".des_item").click(function(){


	$(this).addClass("select");
	$(".des_item").not($(this)).removeClass("select");
 desinds=$(".des_item").index($(this));
 
$(".des_icon").show().eq(desinds).stop().animate({opacity:1},300);
$(".des_icon").show().not($(".des_icon").eq(desinds)).animate({opacity:0},300);
 
	
});
  
 
 

});