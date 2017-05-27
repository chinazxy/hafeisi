
$(function(){






$(".career_subnew_sear .career_subnew_sear_t").focus(function() {

   if ($(this).val() == '搜索职位') {

            $(this).val("");

        }


});


$(".career_subnew_sear .career_subnew_sear_t").blur(function() {

   if ($(this).val() == '搜索职位' ||  $(this).val().Trim() == "") {

            $(this).val("搜索职位");

      }


});

$(".joinsearch").click(function(){
   if ($(".career_subnew_sear_t").val() == '搜索职位' ||  $(".career_subnew_sear_t").val().Trim() == "") {

          $(".career_subnew_sear_t").val("搜索职位");

      }else{
	  $("#joinsearchForm").submit();
	     
	  }


});


$(".joinsearch").keypress(function(e) {
                var key = window.event ? e.keyCode : e.which;
                if (key.toString() == "13") {
                     $("#joinsearchForm").submit();
                }
            }); 




})

String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}