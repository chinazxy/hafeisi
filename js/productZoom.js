// JavaScript Document
/*

author: lvfei

date: 2012/12/17 12:50:48


*/
$(function() {

    var len = $(".photo_list li").length;

    var speed = 5000;

    var scroll_width = $(".photo_list li:first").width() + 13;
	
	$(".photo_list").css("width",len*scroll_width);

    var current = 0;

    var id = 0;

    var playanimate = "";

    var moveindex = 0;

    var move_l = len - 5;
	
	  $(".photo_list li").eq(0).removeClass("li_unactive").addClass("li_active");


    $(".preview_r").click(function() {

        clearInterval(playanimate);

        id++;

        if (id > len - 1) {

            id = 0;

            var move_width = -scroll_width * id;

            $(".photo_list").stop(true, false).animate({
													   
                "left": move_width
            },
			
            500);

        }
        var modval = len % 5;

        if (len > 5) {

            if (len >= 10) {

                if (id % 5 == 0 && id < 9) {

                    var move_width = -scroll_width * (id);

                } else {

                    if (id > 4 && id < len - 5) {

                        var move_width = -scroll_width * (id);

                    } else if (id >= len - 5) {

                        var move_width = -scroll_width * (len - 5);

                    }

                }

            } else {

                if (id < len - 5) {

                    var move_width = -scroll_width * (id);

                } else if (id >= len - 5) {

                    var move_width = -scroll_width * (len - 5);

                }

            }
            $(".photo_list").stop(true, false).animate({
													   
                "left": move_width
				
            },
			
            500);

        }

        $(".photo_list li").removeClass("li_active").addClass("li_unactive").eq(id).removeClass("li_unactive").addClass("li_active");

        $(".photo_list li a").eq(id).trigger("click");

        current = id;

    });

    $(".preview_l").click(function() {

        clearInterval(playanimate);

        id--;
		
		  if (id < 0) {

                id = len - 1;
				
		  }

        if (len > 5) {

            if (id < 0) {

              //  id = len - 1;

                var move_width = -scroll_width * move_l;

                $(".photo_list").stop(true, false).animate({
														   
                    "left": move_width
					
                },
				
                500);

            }
            var modval = len % 5;

            if (id > modval) {

                if ((len - id - 1) % 5 == 0 && id >= len - modval) {

                    var move_width = -scroll_width * (id - 4);

                } else {

                    if (id < len - 5 && len > 10) {

                        var move_width = -scroll_width * (id);

                    } else if (id < 5 - modval) {

                        var move_width = -scroll_width * (0);

                    }

                }

            } else {

                if (id <= modval) {

                    var move_width = -scroll_width * (0);

                }

            }
            $(".photo_list").stop(true, false).animate({
													   
                "left": move_width
				
            },
			
            500);
        }

        $(".photo_list li").removeClass("li_active").addClass("li_unactive").eq(id).removeClass("li_unactive").addClass("li_active");

        $(".photo_list li a").eq(id).trigger("click");

        current = id;
    })

    $(".photo_list li").mouseenter(function() {

        var index = $(".photo_list li").index(this);

        $(".photo_list li").removeClass("li_active").addClass("li_unactive").eq(index).removeClass("li_unactive").addClass("li_active");

        current = index;

        id = index;
		
		 $(".photo_list li a").eq(index).trigger("click");
		
         clearInterval(playanimate);
		 
      });
	
	
     $(".photo_list li").mouseleave(function() {

        playanimate = setInterval(function() {

            id++;

            playAnimate(id);

        },
        speed);

    });
	 
	 $("#wrap").mouseenter(function(){
										  
			 clearInterval(playanimate);	
		
										  
	 });
	 
	  $("#wrap").mouseleave(function(){
										  
		
										  
			   playanimate = setInterval(function() {

            id++;

            playAnimate(id);

        },
        speed);	
		
										  
	 });
	 
	 
	
	  
	  

    playanimate = setInterval(function() {

        id++;

        playAnimate(id);

    },
    speed);

    function playAnimate(ids) {

        id = ids;

        if (id > len - 1) {

            id = 0;

            var move_width = -scroll_width * id;

            $(".photo_list").stop(true, false).animate({
													   
                "left": move_width
				
            },
            500);

        }
        var modval = len % 5;

        if (len > 5) {

            if (len >= 10) {

                if (id % 5 == 0 && id < 9) {

                    var move_width = -scroll_width * (id);

                } else {

                    if (id > 4 && id < len - 5) {

                        var move_width = -scroll_width * (id);

                    } else if (id >= len - 5) {

                        var move_width = -scroll_width * (len - 5);

                    }

                }

            } else {

                if (id < len - 5) {

                    var move_width = -scroll_width * (id);

                } else if (id >= len - 5) {

                    var move_width = -scroll_width * (len - 5);

                }

            }
            $(".photo_list").stop(true, false).animate({
													   
                "left": move_width
				
            },
            500);

        }

        $(".photo_list li").removeClass("li_active").addClass("li_unactive").eq(id).removeClass("li_unactive").addClass("li_active");

        $(".photo_list li a").eq(id).trigger("click");

        current = id;

    }

   
})