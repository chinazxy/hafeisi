// author lvfei
// qq:847803784
;(function($) {
    $.fn.moveTop = function(options) {
        var $this = $(this);
        var top = $this.offset().top;
        var posval = $this.css("position");
		  var scrolls=0;
        $(window).scroll(function() {
         scrolls  = $(window).scrollTop();
            if (scrolls > top) {
                if (window.XMLHttpRequest) {
                    $this.css({
                        position: "fixed",
                        top: 0
                    });
                } else {
                    $this.css({
                        position: "absolute",
                        top: scrolls
                    });
                }
            } else {
                $this.css({
                    position: posval,
                    init_top: 0
                });
            }
        });
    }
})(jQuery);