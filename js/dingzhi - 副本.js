var price = {},
count = 0,
oindex = -1,
glattr = [],
glprice = [],
glattrid = [],
ompboxi=-1,
jp_type = 0;
  var arrleng = 0;
      var oldindex = -1;
    var liindex = 0;
$(function() {


    	if(gl_edit['jj_id']>0){
    glattr = {
        "jk": gl_attr_edit["jk"],
        "qk": gl_attr_edit["qk"],
        "sj": gl_attr_edit["sj"],
        "jp": gl_attr_edit["jp"],
        "jt": gl_attr_edit["jt"],
        "size": gl_attr_edit["size"],
		"size_id":gl_attr_edit["size_id"],
        "jh": gl_attr_edit["jh"],
        "cz": gl_attr_edit["cz"],
		"jh_id":gl_attr_edit["jh_id"],
        "cz_id":gl_attr_edit["cz_id"],
		"l_eye_s":gl_attr_edit["l_eye_s"],
        "l_eye_c": gl_attr_edit["l_eye_c"],
        "l_eye_a": gl_attr_edit["l_eye_a"],
        "l_eye_t":gl_attr_edit["l_eye_t"],
        "r_eye_s":gl_attr_edit["r_eye_s"],
        "r_eye_c":gl_attr_edit["r_eye_c"],
        "r_eye_a":gl_attr_edit["r_eye_a"],
        "r_eye_t":gl_attr_edit["r_eye_t"],
        "pd_eye_t":gl_attr_edit["pd_eye_t"],
		"type_w": gl_attr_edit["type_w"],
        "type_n": gl_attr_edit["type_n"],
        "type_w_text":gl_attr_edit["type_w_text"],
        "type_n_text":gl_attr_edit["type_n_text"]

    };
	jp_type=gl_attr_edit["jp_type"];
	}else{
	    glattr = {
        "jk": "",
        "qk": "",
        "sj": "",
        "jp": "",
        "jt": "",
        "size": $("a", $(".d_xuanan1").eq(0)).attr("attr_value"),
		"size_id": $("a", $(".d_xuanan1").eq(0)).attr("attr_id"),
        "jh": $(".bl_m_pbox").eq(0).attr("attr_title"),
        "cz": "",
		"jh_id": $(".bl_m_pbox").eq(0).attr("attr_id"),
        "cz_id": "",
		"l_eye_s": "",
        "l_eye_c": "",
        "l_eye_a": "",
        "l_eye_t": "",
        "r_eye_s": "",
        "r_eye_c": "",
        "r_eye_a": "",
        "r_eye_t": "",
        "pd_eye_t": "",
		"type_w": 0,
        "type_n": 0,
        "type_w_text": "",
        "type_n_text": ""

    };
	
	}
	if(gl_edit['jj_id']>0){
    glprice = {
        "jk_price": gl_p_edit['jk_price'],
        "qk_price": gl_p_edit['qk_price'],
        "sj_price": gl_p_edit['sj_price'],
        "jp_price": gl_p_edit['jp_price'],
        "jt_price": gl_p_edit['jt_price']
    };
	
	}else{
	    glprice = {
        "jk_price": 0,
        "qk_price": 0,
        "sj_price": 0,
        "jp_price": 0,
        "jt_price": 0
    };
	
	}
    if(gl_edit['jj_id']>0){
	
	    glattrid = {
	    "jj_id":gl_edit['jj_id'],
        "jk_id": gl_edit['jk_id'],
        "qk_id": gl_edit['qk_id'],
        "sj_id": gl_edit['sj_id'],
        "jp_id": gl_edit['jp_id'],
        "jp_type_id": gl_edit['jp_type_id'],
        "jt_id":gl_edit['jt_id']
    };
	
	}else{
    glattrid = {
	    "jj_id":cid,
        "jk_id": 0,
        "qk_id": 0,
        "sj_id": 0,
        "jp_id": 0,
        "jp_type_id": 0,
        "jt_id": 0
    };
	
	}





var imgNum = 0;
var images = [];
function preLoadImg() {

    var imgs = document.images;
    for (var i = 0; i < imgs.length; i++) {
        images.push(imgs[i].src);
    }

    var cssImages = getallBgimages();
    for (var j = 0; j < cssImages.length; j++) {
        images.push(cssImages[j]);
    }
 
  
    $.imgpreload(images,
    {
        each: function () {
            var status = $(this).data('loaded') ? 'success' : 'error';
            if (status == "success") {                
                var v = (parseFloat(++imgNum) / images.length).toFixed(2);
                $(".tebox span").html(Math.round(v * 100));      

            }
        },
        all: function () {
             $(".tebox span").html("100");
 
            $(".jiaz").fadeOut(500,function(){
                $(".dingzhi").css("visibility","visible"); 
            });            
           
        }
    });
}
reaiseImg();
  reaiseBox();
function reaiseImg(){
    var imgrH=($(window).width()*0.65)*1200/1920;
    $(".hasimg").css({height:imgrH,top:"50%",marginTop:-imgrH/2})
}

function reaiseBox(){
    var imgrB=($(window).width()*0.65*0.5)*1200/1920;
    $(".hasimg_t").css({height:imgrB,top:"50%",marginTop:-imgrB/2})
}
    $(window).resize(function() {
      reaiseImg(); 
      reaiseBox();
    
    });

function getallBgimages() {
    var url, B = [], A = document.getElementsByTagName('*');
    A = B.slice.call(A, 0, A.length);
    while (A.length) {
        url = document.deepCss(A.shift(), 'background-image');
        if (url) url = /url\(['"]?([^")]+)/.exec(url) || [];
        url = url[1];
        if (url && B.indexOf(url) == -1) B[B.length] = url;
    }
    return B;
}
 
document.deepCss = function (who, css) {
    if (!who || !who.style) return '';
    var sty = css.replace(/\-([a-z])/g, function (a, b) {
        return b.toUpperCase();
    });
    if (who.currentStyle) {
        return who.style[sty] || who.currentStyle[sty] || '';
    }
    var dv = document.defaultView || window;
    return who.style[sty] ||
    dv.getComputedStyle(who, "").getPropertyValue(css) || '';
}
 
Array.prototype.indexOf = Array.prototype.indexOf ||
 function (what, index) {
     index = index || 0;
     var L = this.length;
     while (index < L) {
         if (this[index] === what) return index;
         ++index;
     }
     return -1;
 }
 

 preLoadImg();

    function init() {
         
		 $(".jk").each(function(i){
            if($("img",$(this)).hasClass("select")){
			 glattrid['jk_id']=$(this).attr("attr_id");
			 glprice['jk_price']=$(this).attr("attr_p");
			 glattr['jk']=$(this).attr("attr_title");
			}
		 });

         $(".d_xuanan1").each(function(i){

            if($("a",$(this)).hasClass("select")){
        glattr["size"]=$("a",$(this)).attr("attr_value");
        glattr["size_id"]=$("a",$(this)).attr("attr_id");

            }else{
              glattr["size"]=$("a", $(".d_xuanan1").eq(0)).attr("attr_value");
              glattr["size_id"]=$("a", $(".d_xuanan1").eq(0)).attr("attr_id");
            }


         });
		 
	    $(".qk").each(function(i){
            if($("img",$(this)).hasClass("select")){
			 glattrid['qk_id']=$(this).attr("attr_id");
			 glprice['qk_price']=$(this).attr("attr_p");
			 glattr['qk']=$(this).attr("attr_title");
			}
		 });
       $(".sj").each(function(i){
            if($("img",$(this)).hasClass("select")){
             glattrid['sj_id']=$(this).attr("attr_id");
             glprice['sj_price']=$(this).attr("attr_p");
             glattr['sj']=$(this).attr("attr_title");
            }
         });

         $(".jp").each(function(i){
            if($("img",$(this)).hasClass("select")){
             glattrid['jp_id']=$(this).attr("attr_id");
             glattrid['jp_type_id']=$(this).attr("jp_id");
             glprice['jp_price']=$(this).attr("attr_p");
             glattr['jp']=$(this).attr("attr_title");
             jp_type=$(this).attr("jp_type");
            }
         });


           $(".jt").each(function(i){
            if($("img",$(this)).hasClass("select")){
             glattrid['jt_id']=$(this).attr("attr_id");
             glprice['jt_price']=$(this).attr("attr_p");
             glattr['jt']=$(this).attr("attr_title");
            }
         });

        $(".bl_m_pbox").each(function(){


          if($("img",$(this)).hasClass("select")){
             glattr['jh_id']=$(this).attr("attr_id");
             glattr['jh']=$(this).attr("attr_title");
            }else{
             glattr['jh']=$(".bl_m_pbox").eq(0).attr("attr_title");
             glattr['jh_id']=$(".bl_m_pbox").eq(0).attr("attr_id");
            }

        });

          $(".bl_mbox_cz").each(function(){


          if($("img",$(this)).hasClass("select")){
             glattr['cz_id']=$(this).attr("attr_id");
             glattr['cz']=$(this).attr("attr_title");
            }else{
             glattr['cz']=$(".bl_mbox_cz").eq(0).attr("attr_title");
             glattr['cz_id']=$(".bl_mbox_cz").eq(0).attr("attr_id");
            }

        });

    }
      if(!gl_edit['jj_id']>0){

         init();

      }



    function showTip(obj, msg) {

        $(".miao_yin_t").html("" + msg);
        $(".miao_yin").css({
            top: obj.offset().top - obj.outerHeight() - ($(".miao_yin").outerHeight()) / 2 + 10,
            left: obj.offset().left + obj.width() / 2 - $(".miao_yin").width() / 2
        }).fadeIn();

    }
    function hideTip(obj) {

        $(".miao_yin_t").html("");
        $(".miao_yin").css({
            top: 0,
            left: 0
        }).hide();
        $(".miao_login").hide();
    }

    function deWrite() {

        if (glattr['jk'].Trim() != "") {
            $(".jk_attr_v").html(glattr['jk']);
        }
        if (glattr['qk'].Trim() != "") {
            $(".qk_attr_v").html(glattr['qk']);
        }
        if (glattr['sj'].Trim() != "") {
            $(".sj_attr_v").html(glattr['sj']);
        }
        if (glattr['jp'].Trim() != "") {
            $(".jp_attr_v").html(glattr['jp']);
        }
        if (glattr['jt'].Trim() != "") {
            $(".jt_attr_v").html(glattr['jt']);
        }
        if (glattr['size'].Trim() != "") {
            $(".size_attr_v").html(glattr['size']);
        }
        if (glattr['cz'].Trim() != "") {
            $(".jhcz_attr_v").html(glattr['cz']);
        } else {
            $(".jhcz_attr_v").html("默认");
        }
        if (glattr['jh'].Trim() != "") {
            $(".jh_attr_v").html(glattr['jh']);
        } else {
            $(".jh_attr_v").html("默认");
        }

        if (parseInt(glprice['jk_price']) >= 0) {
            $(".jk_attr_p").html("¥" + glprice['jk_price']);
        }
        if (parseInt(glprice['qk_price']) >= 0) {
            $(".qk_attr_p").html("¥" + glprice['qk_price']);
        }

        if (parseInt(glprice['sj_price']) >= 0) {
            $(".sj_attr_p").html("¥" + glprice['sj_price']);
        }

        if (parseInt(glprice['jp_price']) >= 0) {
            $(".jp_attr_p").html("¥" + glprice['jp_price']);
        }

        if (parseInt(glprice['jt_price']) >= 0) {
            $(".jt_attr_p").html("¥" + glprice['jt_price']);
        }

        if (parseInt(glattr['type_w']) >= 0) {

            switch (glattr['type_w']) {

            case 0:
                $(".wc_kz").empty().html("(左边)");
                break;

            case 1:
                $(".wc_kz").empty().html("(右边)");
                break;

            case 2:
                $(".wc_kz").empty().html("(两边)");
                break;

            }

            if (glattr['type_w_text'].Trim() == "") {
                $(".kz_attr_w").empty().html("无");
            } else {
                $(".kz_attr_w").empty().html(glattr['type_w_text']);
            }
        }

        if (parseInt(glattr['type_n']) >= 0) {

            switch (glattr['type_n']) {

            case 0:
                $(".nc_kz").empty().html("(左边)");
                break;

            case 1:
                $(".nc_kz").empty().html("(右边)");
                break;

            case 2:
                $(".nc_kz").empty().html("(两边)");
                break;

            }

            if (glattr['type_n_text'].Trim() == "") {
                $(".kz_attr_n").empty().html("无");
            } else {
                $(".kz_attr_n").empty().html(glattr['type_n_text']);
            }
        }

        if (jp_type == 1) {

            var jplstr = "";
            var jprstr = "";

            if (glattr['l_eye_s'].Trim() != "") {
                jplstr += "球镜/S:" + glattr['l_eye_s'].Trim() + ";";
            } else {
                jplstr += "球镜/S:无" + ";";
            }

            if (glattr['l_eye_c'].Trim() != "") {
                jplstr += "柱镜/C:" + glattr['l_eye_c'].Trim() + ";";
            } else {
                jplstr += "柱镜/C:无" + ";";
            }

            if (glattr['l_eye_a'].Trim() != "") {
                jplstr += "轴位/A:" + glattr['l_eye_a'].Trim() + ";";
            } else {
                jplstr += "轴位/A:无" + ";";
            }
            if (glattr['l_eye_t'].Trim() != "") {
                jplstr += "左眼瞳距:" + glattr['l_eye_t'].Trim() + ";";
            } else {
                jplstr += "左眼瞳距:无" + ";";
            }

            if (glattr['r_eye_s'].Trim() != "") {
                jprstr += "球镜/S:" + glattr['r_eye_s'].Trim() + ";";
            } else {
                jprstr += "球镜/S:无" + ";";
            }

            if (glattr['r_eye_c'].Trim() != "") {
                jprstr += "柱镜/C:" + glattr['r_eye_c'].Trim() + ";";
            } else {
                jprstr += "柱镜/C:无" + ";";
            }

            if (glattr['r_eye_a'].Trim() != "") {
                jprstr += "轴位/A:" + glattr['r_eye_a'].Trim() + ";";
            } else {
                jprstr += "轴位/A:无" + ";";
            }

            if (glattr['r_eye_t'].Trim() != "") {
                jprstr += "右眼瞳距:" + glattr['r_eye_t'].Trim() + ";";
            } else {
                jprstr += "右眼瞳距:无;";
            }

            if (glattr['pd_eye_t'].Trim() != "") {
                var jppdstr = "瞳距/PD:" + glattr['pd_eye_t'].Trim() + ";";
            } else {
                var jppdstr = "瞳距/PD:无" + ";";
            }

            $(".js_show .jp_attr_l").next().empty().html(jplstr);

            $(".js_show .jp_attr_r").next().empty().html(jprstr);

            $(".js_show .jp_attr_t").next().empty().html(jppdstr);

        }

        var total = parseInt(glprice['jk_price']) + parseInt(glprice['qk_price']) + parseInt(glprice['sj_price']) + parseInt(glprice['jp_price']) + parseInt(glprice['jt_price']);

        $(".total").html(total);
    }

    var windowW = 1440 - 1440 * 0.23;
    var windowH = $(window).height() - $(".head").outerHeight() - $(".foot_gai").outerHeight();

    $(".cont_personal_dingzhi").css({
        height: windowH
    });

    var box2w = 1440 * 0.23;


    //$(".dingzhi ").width(windowW);
    $(".li_item").click(function() {

        liindex = $(".li_item").index(this);

        cItem(liindex);
    });
	
	

    function cItem(ci) {

        if ($(".li_item").eq(ci).hasClass("lb_c_g")) {
            if (ci == 4 || ci==5) {
                // $(".jd_image").eq(1).show();
                //  $(".glass_c").not($(".glass_c").eq(1)).hide();
                $(".flex-control-nav li a").eq(1).trigger("click");
                $(".jd_image").show();

            } else {
                //$(".glass_c").eq(0).show();
                $(".flex-control-nav li a").eq(0).trigger("click");
                $(".jd_image").show();
                //  $(".glass_c").not($(".glass_c").eq(0)).hide();

            }
            $(".dingz_img").not($(".glass_c")).hide();

        } else if ($(".li_item").eq(ci).hasClass("li_c_item")) {
            if ($(".qingdan").css("display") == "block") {

} else {
                $(".jd_image").hide();
                $(".dingz_img").not($(".qingdan")).not($(".jd_image > .dingz_img")).hide();
                $(".qingdan").fadeIn();
            }

        } else if ($(".li_item").eq(ci).hasClass("lb_c_jh")) {

            if ($(".jh_c").css("display") == "block") {

} else {

                $(".dingz_img").not($(".jh_c")).not($(".jd_image > .dingz_img")).hide();
                $(".jd_image").hide();
                $(".jh_c").fadeIn();
            }
        }
        if (ci == oldindex) {
            return false;
        }
        $(".d_xunh").not(ci).hide();
        $(".d_xunh").eq(ci).fadeIn();
        //$(".dingzhi").stop().animate({width:1440},500);
        if (parseInt($(".dingz_box2").width()) == 0) {
            $(".dingz_box2").stop().animate({
                width: box2w
            },
            500,
            function() {
                $(".dingz_box2").css("overflow", "visible");

            });
        }
		
		if(ci==$(".li_item").length-1){
		 $(".next_step").hide();
		 $(".d_do").show();
		}else{
			 $(".d_do").hide();
		 $(".next_step").show();
		}
        oldindex = ci;
        deWrite();
    }

    $(".jk_box1_w").click(function(e) {
        if ($(this).hasClass("no_z")) {
            return false;
        }
        var jkcdiv = $(".d_yinc", $(this)).find(">div");
        var jkh = 0;
        if ($(".d_yinc", $(this)).hasClass("openon")) {
            jkh = 0;
            $(".d_yinc", $(this)).animate({
                height: jkh
            },
            500);
            $(".d_yinc", $(this)).addClass("openoff").removeClass("openon");
        } else {
            jkcdiv.each(function(i) {
                jkh = jkh + jkcdiv.eq(i).outerHeight() + parseInt(jkcdiv.eq(i).css("marginTop"));
            });
            $(".d_yinc", $(this)).animate({
                height: jkh
            },
            500);
            $(".d_yinc", $(this)).addClass("openon").removeClass("openoff");
        }
        var jkbox = $(".d_xunh").eq(liindex).find(".jk_box");
        e.stopPropagation();
    });

    $("div,li,ul", ".jk_box1_w .d_yinc").click(function(e) {
        e.stopPropagation();

    });
  
	

  //  $(".jk_box3 li").bind("click",function() {
	  //  alert(1);
       
   // });

    $(".dingz_font_s_w ul li").click(function() {
        glattr['font_size'] = $(this).attr("attr_fs");
        $("a", $(this)).addClass("select");
        $("a", ".dingz_font_s_w ul li").not($("a", $(this))).removeClass("select");
        glattr['type_w'] = $(".dingz_font_s_w ul li").index($(this));

    });

    $(".dingz_font_s_n ul li").click(function() {
        glattr['font_size'] = $(this).attr("attr_fs");
        $("a", $(this)).addClass("select");
        $("a", ".dingz_font_s_n ul li").not($("a", $(this))).removeClass("select");
        glattr['type_n'] = $(".dingz_font_s_n ul li").index($(this));

    });

    $(".dingz_font").focusout(function() {
        glattr['font'] = $(this).val();

    });



    $('.flexslider').flexslider({
        animation: "fade",
        start: function(slider) {

            $('body').removeClass('loading');
        }
    });

    $(".d_jpx1").live("click",function() {

        var djpi = $(".d_jpx1").index($(this));
        jp_type = $(this).attr("jp_type");
		glattrid['jp_type_id']=$(this).attr("attr_id");
        if (jp_type == 1) {

            $(".js_show").show();
        } else {
            $(".js_show").hide();
        }
        $(".jins").hide().eq(djpi).fadeIn();
        $("a", ".d_jpx").not($("a", $(this))).removeClass("select");
        $("a", $(this)).addClass("select");

    });

    $(".d_xuanan1").click(function() {
        $(".d_xuanan1 a").not($("a", $(this))).removeClass("select");
        $("a", $(this)).addClass("select");

        $(".c_size").html($("a", $(this)).attr("attr_value"));

        glattr['size'] = $("a", $(this)).attr("attr_value");
		 glattr['size_id'] = $("a", $(this)).attr("attr_id");
		

    });

    $(".bl_m_pbox").click(function() {
  
   
    
		 var mpboxi=$(".bl_m_pbox img").index($("img", $(this)));
	     if(ompboxi==mpboxi){
		 return false;
		 }
	   $(".bl_m_pbox img").not($("img", $(this))).removeClass("select");
        $("img", $(this)).addClass("select");
        var bl_m_i = $(".bl_m_pbox").index($(this));

        $(".jh_box_cz").hide().eq(bl_m_i).fadeIn();
		ompboxi=mpboxi;

    });

    $(".j_chuf2").focus(function(e) {

        $(this).prev().hide();
        e.stopPropagation();

    });

    $(".j_chuf2").blur(function(e) {
        if ($(this).val().Trim() == "") {

            $(this).prev().show();
        } else {
            if (jp_type == 1) {
                if ($(this).hasClass("l_eye_s")) {

                    glattr['l_eye_s'] = $(this).val();
                }

                if ($(this).hasClass("l_eye_c")) {

                    glattr['l_eye_c'] = $(this).val();
                }

                if ($(this).hasClass("l_eye_a")) {

                    glattr['l_eye_a'] = $(this).val();
                }

                if ($(this).hasClass("r_eye_s")) {

                    glattr['r_eye_s'] = $(this).val();
                }

                if ($(this).hasClass("r_eye_c")) {

                    glattr['r_eye_c'] = $(this).val();
                }

                if ($(this).hasClass("r_eye_a")) {

                    glattr['r_eye_a'] = $(this).val();
                }

                if ($(this).hasClass("l_eye_t")) {

                    glattr['l_eye_t'] = $(this).val();
                }

                if ($(this).hasClass("r_eye_t")) {

                    glattr['r_eye_t'] = $(this).val();
                }

                if ($(this).hasClass("pd_eye_t")) {

                    glattr['pd_eye_t'] = $(this).val();
                }
            }

        }
        e.stopPropagation();

    });

    $(".wenzits2 span").click(function(e) {

        // $(this).hide();
        $(this).next().focus();
        e.stopPropagation();

    });
	


    $(".prev_step").click(function() {

        liindex--;

        if (liindex <= 0) {

            liindex = 0;
        }

        cItem(liindex);

    });

    $(".next_step").click(function() {

        liindex++;
        if (liindex > $(".dingz_box3 .li_item").length - 1) {

            liindex = $(".dingz_box3 .li_item").length - 1;
            return false;
        }
        cItem(liindex);

    });

    var jdtext = "";
    $(".jd_w_text").keyup(function() {

        jdtext = $(this).val().replace(/[^\w\.\/]/ig, '');
        var slens = jdtext.getStringLen();

        if (slens >= 10) {

            var strs = SetSub(jdtext, 10);

            $(this).val(strs);
            $(this).next().find("span").html(0);

        } else {
            var strs = jdtext;
            $(this).val(jdtext);
            $(this).next().find("span").html(10 - slens);
        }
        glattr['type_w_text'] = strs;

    });

    var jdntext = "";
    $(".jd_n_text").keyup(function() {

        jdntext = $(this).val().replace(/[^\w\.\/]/ig, '');
        var slens = jdntext.getStringLen();

        if (slens >= 10) {

            var strs = SetSub(jdntext, 10);

            $(this).val(strs);
            $(this).next().find("span").html(0);

        } else {
            var strs = jdntext;
            $(this).val(jdntext);
            $(this).next().find("span").html(10 - slens);
        }
        glattr['type_n_text'] = strs;

    });

    $(".jd_n_text").focusout(function() {
        jdntext = $(this).val().replace(/[^\w\.\/]/ig, '');
        var slens = jdntext.getStringLen();

        if (slens >= 10) {

            var strs = SetSub(jdntext, 10);

            $(this).val(strs);
            $(this).next().find("span").html(0);

        } else {
            var strs = jdntext;
            $(this).val(jdntext);
            $(this).next().find("span").html(10 - slens);
        }
        glattr['type_n_text'] = strs;

    });

    $(".jd_w_text").focusout(function() {
        jdtext = $(this).val().replace(/[^\w\.\/]/ig, '');
 
        var slens = jdtext.getStringLen();

        if (slens >= 10) {

            var strs = SetSub(jdtext, 10);

            $(this).val(strs);
            $(this).next().find("span").html(0);

        } else {
            var strs = jdtext;
            $(this).val(jdtext);
            $(this).next().find("span").html(10 - slens);
        }
        glattr['type_w_text'] = strs;
    });

    function SetSub(str, n) {

        var strReg = /[^\x00-\xff]/g;

        var _str = str.replace(strReg, "**");
        var _str = _str.replace(/[^\w\.\/]/ig, '');
        var _len = _str.length;

        if (_len > n) {

            var _newLen = Math.floor(n / 2);

            var _strLen = str.length;

            for (var i = _newLen; i < _strLen; i++) {

                var _newStr = str.substr(0, i).replace(strReg, "**");

                if (_newStr.length >= n) {

                    return str.substr(0, i);

                    break;

                }

            }

        } else {

            return str;

        }

    }
	
	  var donestate=true;
	
	    $(".done").click(function() {
        if(donestate){
		var postDate={};
		postDate['glattr']=glattr;
		postDate['glattrid']=glattrid;
		postDate['step']="add_dingzhi_cart";
		postDate['jp_type']=jp_type;
		
        $.ajax({
            type: 'POST',
            url: 'flow.php',
            data:postDate,
            dataType: "json",
            beforeSend: function(XMLHttpRequest) {
             $(".done").addClass("c_loadding");
             $(".done>a").css("opacity",0.1);
             $(".ding_baocuo").hide().html("");
              donestate=false;

},        
            success: function(data) {
                        $(".ding_baocuo").empty().hide();
                         $(".done").removeClass("c_loadding");
                     
                  
                $(".miao_mima1_ts1").empty().hide();

                switch (data.err) {

                case "id_error":
                  donestate=true;
                 $(".ding_baocuo").show().html("非系统参数！");
                break;
                case "save_sucess":
                  $(".ding_baocuo").hide().html("");
                 donestate=false;
             
                        $(".done>a").html("已经加入");
                       $(".done>a").animate({"opacity":1},500);
reflash_cart();
                 setTimeout(function(){
                 location.href="flow.php?step=cart";
                 },1000);
                break;
				   case "save_fail":
                          donestate=true;
                                 $(".done>a").animate({"opacity":1},500);
                $(".ding_baocuo").show().html("保存失败！");
                break;	   
				case "save_fail":
                         $(".done>a").animate({"opacity":1},500);
                       donestate=true;
                 $(".ding_baocuo").show().html("保存失败！");
                break;
				case "jk_id_error":
                         $(".done>a").animate({"opacity":1},500);
                       donestate=false;
                 $(".ding_baocuo").show().html("非法镜框值!");
                break;
				case "qk_id_error":
                       donestate=false;
                                $(".done>a").animate({"opacity":1},500);
                 $(".ding_baocuo").show().html("无效的前框饰布值!");
                break;
				case "sj_id_error":
                         $(".done>a").animate({"opacity":1},500);
                       donestate=false;
                 $(".ding_baocuo").show().html("无效的前框饰件值!");
                break;
				case "jp_id_error":
                         $(".done>a").animate({"opacity":1},500);
                       donestate=false;
                 $(".ding_baocuo").show().html("无效的镜片值!");
                break;
				case "jt_id_error":
                         $(".done>a").animate({"opacity":1},500);
                       donestate=false;
                $(".ding_baocuo").show().html("无效的镜腿值!");
                break;
				case "size_error":
                         $(".done>a").animate({"opacity":1},500);
                       donestate=false;
                 $(".ding_baocuo").show().html("无效的尺寸值!");
                break;
				case "size_id_error":
                         $(".done>a").animate({"opacity":1},500);
                       donestate=false;
                 $(".ding_baocuo").show().html("无效的尺寸值!");
                break;
			    case "jp_type_error":
                         $(".done>a").animate({"opacity":1},500);
                       donestate=false;
                 $(".ding_baocuo").show().html("无效的镜片类型值!");
                break;
				case "jp_error":
                         $(".done>a").animate({"opacity":1},500);
                       donestate=false;
                 $(".ding_baocuo").show().html("无效的镜片值!");
                break;
				case "jh_error":
                         $(".done>a").animate({"opacity":1},500);
                       donestate=false;
                 $(".ding_baocuo").show().html("无效的镜盒值!");
                break;
                 case "cz_error":
                          $(".done>a").animate({"opacity":1},500);
                        donestate=false;
                 $(".ding_baocuo").show().html("无效的镜盒材质值!");
                break;
				     case "rec_id_error":
                              $(".done>a").animate({"opacity":1},500);
                            donestate=false;
                 $(".ding_baocuo").show().html("无效的订单值!");
                break;
					     case "rec_id_error":
                                  $(".done>a").animate({"opacity":1},500);
                                donestate=false;
                 $(".ding_baocuo").show().html("无效的订单值!");
                break;
                default:
                       donestate=false;
                         $(".done>a").animate({"opacity":1},500);
                         $(".ding_baocuo").show().html("系统错误，刷新后重试!");
                   // hideTip();
                    //$(".miao_login").html("<span class='ti_error'>系统错误，刷新后重试!</span>").show();

                }

            }
        });
     }
    });


  var sharestate=true;
    
        $(".share").click(function() {
        if(sharestate){
        var postDate={};
        postDate['glattr']=glattr;
        postDate['glattrid']=glattrid;
        postDate['act']="dingzhi_share";
        postDate['jp_type']=jp_type;
        
        $.ajax({
            type: 'POST',
            url: 'dingzhi.php',
            data:postDate,
            dataType: "json",
            beforeSend: function(XMLHttpRequest) {
             $(".share").addClass("c_loadding");
             $(".share>a").css("opacity",0.1);
           //  $(".ding_baocuo").hide().html("");
              donestate=false;

},        
            success: function(data) {
                      //  $(".ding_baocuo").empty().hide();
                         $(".share").removeClass("c_loadding");
   
                switch (data.err) {

                case "id_error":
                  donestate=true;
                 $(".ding_baocuo").show().html("非系统参数！");
                break;
                case "save_sucess":
                  $(".ding_baocuo").hide().html("");
                 donestate=false;
             
                        $(".done>a").html("已经加入");
                       $(".done>a").animate({"opacity":1},500);
reflash_cart();
                 setTimeout(function(){
                 location.href="flow.php?step=cart";
                 },1000);
                break;
                   case "save_fail":
                          donestate=true;
                                 $(".done>a").animate({"opacity":1},500);
                $(".ding_baocuo").show().html("保存失败！");
                break;     
                case "save_fail":
                         $(".done>a").animate({"opacity":1},500);
                       donestate=true;
                 $(".ding_baocuo").show().html("保存失败！");
                break;
                case "jk_id_error":
                         $(".done>a").animate({"opacity":1},500);
                       donestate=false;
                 $(".ding_baocuo").show().html("非法镜框值!");
                break;
                case "qk_id_error":
                       donestate=false;
                                $(".done>a").animate({"opacity":1},500);
                 $(".ding_baocuo").show().html("无效的前框饰布值!");
                break;
                case "sj_id_error":
                         $(".done>a").animate({"opacity":1},500);
                       donestate=false;
                 $(".ding_baocuo").show().html("无效的前框饰件值!");
                break;
                case "jp_id_error":
                         $(".done>a").animate({"opacity":1},500);
                       donestate=false;
                 $(".ding_baocuo").show().html("无效的镜片值!");
                break;
                case "jt_id_error":
                         $(".done>a").animate({"opacity":1},500);
                       donestate=false;
                $(".ding_baocuo").show().html("无效的镜腿值!");
                break;
                case "size_error":
                         $(".done>a").animate({"opacity":1},500);
                       donestate=false;
                 $(".ding_baocuo").show().html("无效的尺寸值!");
                break;
                case "size_id_error":
                         $(".done>a").animate({"opacity":1},500);
                       donestate=false;
                 $(".ding_baocuo").show().html("无效的尺寸值!");
                break;
                case "jp_type_error":
                         $(".done>a").animate({"opacity":1},500);
                       donestate=false;
                 $(".ding_baocuo").show().html("无效的镜片类型值!");
                break;
                case "jp_error":
                         $(".done>a").animate({"opacity":1},500);
                       donestate=false;
                 $(".ding_baocuo").show().html("无效的镜片值!");
                break;
                case "jh_error":
                         $(".done>a").animate({"opacity":1},500);
                       donestate=false;
                 $(".ding_baocuo").show().html("无效的镜盒值!");
                break;
                 case "cz_error":
                          $(".done>a").animate({"opacity":1},500);
                        donestate=false;
                 $(".ding_baocuo").show().html("无效的镜盒材质值!");
                break;
                     case "rec_id_error":
                              $(".done>a").animate({"opacity":1},500);
                            donestate=false;
                 $(".ding_baocuo").show().html("无效的订单值!");
                break;
                         case "rec_id_error":
                                  $(".done>a").animate({"opacity":1},500);
                                donestate=false;
                 $(".ding_baocuo").show().html("无效的订单值!");
                break;
                default:
                       donestate=false;
                         $(".done>a").animate({"opacity":1},500);
                         $(".ding_baocuo").show().html("系统错误，刷新后重试!");
                   // hideTip();
                    //$(".miao_login").html("<span class='ti_error'>系统错误，刷新后重试!</span>").show();

                }

            }
        });
     }
    });
	
	     var dingzhiedit=true;
	
		    $(".dingzhi_edit").click(function() {

        if(dingzhiedit){
		var editpostDate={};

		editpostDate['glattr']=glattr;
		editpostDate['glattrid']=glattrid;
		editpostDate['step']="edit_dingzhi_cart";
		editpostDate['jp_type']=jp_type;
		editpostDate['tocken']=$(".rids").val();
		

		
        $.ajax({
            type: 'POST',
            url: 'flow.php',
            data:editpostDate,
            dataType: "json",
            beforeSend: function(XMLHttpRequest) {
                  $(".dingzhi_edit").addClass("c_loadding");
             $(".dingzhi_edit>a").css("opacity",0.1);
              dingzhiedit=false;
                $(".ding_baocuo").hide().html("");
},
            success: function(data) {
                $(".ding_baocuo").empty().hide();
       $(".dingzhi_edit").removeClass("c_loadding");
                switch (data.err) {

                case "id_error":
                    dingzhiedit=false;
                 $(".ding_baocuo").show().html("非系统参数！");
                break;
                case "save_sucess":
                    dingzhiedit=false;
                      $(".ding_baocuo").hide().html("");
                          $(".dingzhi_edit>a").html("保存成功");
                       $(".dingzhi_edit>a").animate({"opacity":1},500);
                    reflash_cart();
                 setTimeout(function(){
                 location.href="flow.php?step=cart";
                 },1000);
                break;
				   case "save_fail":
                       dingzhiedit=true;
                             $(".dingzhi_edit>a").animate({"opacity":1},500);
                 $(".ding_baocuo").show().html("保存失败！");
                break;	   
				case "save_fail":
                    dingzhiedit=false;
                          $(".dingzhi_edit>a").animate({"opacity":1},500);
                 $(".ding_baocuo").show().html("保存失败！");
                break;
				case "jk_id_error":
                         dingzhiedit=false;
                               $(".dingzhi_edit>a").animate({"opacity":1},500);
                 $(".ding_baocuo").show().html("非法镜框值!");
                break;
				case "qk_id_error":
                         dingzhiedit=false;
                               $(".dingzhi_edit>a").animate({"opacity":1},500);
                 $(".ding_baocuo").show().html("无效的前框饰布值!");
                break;
				case "sj_id_error":
                      $(".dingzhi_edit>a").animate({"opacity":1},500);
                         dingzhiedit=false;
                 $(".ding_baocuo").show().html("无效的前框饰件值!");
                break;
				case "jp_id_error":
                         dingzhiedit=false;
                               $(".dingzhi_edit>a").animate({"opacity":1},500);
                 $(".ding_baocuo").show().html("无效的镜片值!");
                break;
				case "jt_id_error":
                      $(".dingzhi_edit>a").animate({"opacity":1},500);
                 $(".ding_baocuo").show().html("无效的镜腿值!");
                break;
				case "size_error":
                      $(".dingzhi_edit>a").animate({"opacity":1},500);
                         dingzhiedit=false;
                 $(".ding_baocuo").show().html("无效的尺寸值!");
                break;
				case "size_id_error":
                         dingzhiedit=false;
                               $(".dingzhi_edit>a").animate({"opacity":1},500);
                 $(".ding_baocuo").show().html("无效的尺寸值!");
                break;
			    case "jp_type_error":
                         dingzhiedit=false;
                               $(".dingzhi_edit>a").animate({"opacity":1},500);
                 $(".ding_baocuo").show().html("无效的镜片类型值!");
                break;
				case "jp_error":
                         dingzhiedit=false;
                               $(".dingzhi_edit>a").animate({"opacity":1},500);
                 $(".ding_baocuo").show().html("无效的镜片值!");
                break;
				case "jh_error":
                         dingzhiedit=false;
                               $(".dingzhi_edit>a").animate({"opacity":1},500);
                 $(".ding_baocuo").show().html("无效的镜盒值!");
                break;
                 case "cz_error":
                          dingzhiedit=false;
                                $(".dingzhi_edit>a").animate({"opacity":1},500);
                 $(".ding_baocuo").show().html("无效的镜盒材质值!");
                break;
                default:
                      $(".dingzhi_edit>a").animate({"opacity":1},500);
               data:editpostDate,
                    $(".ding_baocuo").show().html("<span class='ti_error'>系统错误，刷新后重试!</span>").show();

                }

            }
        });
		
    }
    });
	

	   var xOffset = 25;
   var yOffset = 30;	
	
	$(".jk_box3 li").live("hover",function(e){
	
	if(e.type=='mouseenter'){
	  	if($(this).hasClass("no_s_s")){
	return false;
	}
	var lisrcs=$("img",$(this)).attr("src");
	var lititle=$(this).attr("attr_title");
	 $("img",".s_box1").attr("src",lisrcs);
	  $(".s_box2").html(lititle);
    $(".s_box").show(); 
	}else{
	$(".s_box").hide();
	 $("img",".s_box1").attr("src","");
	  $(".s_box2").html("");
$(".s_box").css("top",0 + "px").css("left",0+ "px");
		  }
	});


	
	$(".jk_box3 li").live("mousemove",function(e){
		if($(this).hasClass("no_s_s")){
	return false;
	}
     if(!e.pageX){
	 e.pageX=e.clientX;
	 }
        if(!e.pageY){
		
		e.pageY=e.clientY; 
		}	
   $(".s_box").css("top",(e.pageY - xOffset) + "px").css("left",(e.pageX + yOffset) + "px");
});   

});

    function getKuc(datas,imagearray,attrclass){
	  imge=imagearray;
	  if(datas.id>0){
	  
	      $.ajax({
            type: 'POST',
            url: 'dingzhi.php',
            data:datas,
            dataType: "json",
            beforeSend: function(XMLHttpRequest) {
			
			},
			success:function(data){
		
			    //if(data.delivery_time>$(".sf_day").val()){
				 
				 $(".ding_tishi").html(data.maxstr);
			

			//	}
				
				
				 if(data.html!=""){
			
				  $(".jp_contains").empty().html(data.html);
				 }
				 
				
					  if(data.jp_info.id>0){
				  glattrid['jp_id']=data.jp_info.id;
				   imge.push(data.jp_info.img_c);
				   attrclass.push("jp");
				   imge.push(data.jp_info.img_l);
				    attrclass.push("jp");
				  }
				  arrleng=imge.length;
				  
				  for(var i=0;i<imge.length;i++){
				   if(imge[i].Trim()!==""){
				   bl_loading(imge[i], attrclass[i],i%2);
				   }
				  }
			
			
			}
	  });
	
	}
	
	}
	function itemAttr(obj){
	
	 var postRundate={};
	 postRundate['act']="check_number";
	  postRundate['pid']=glattrid['jj_id'];
	
	 if ($(obj).hasClass("no_s_s")) {
            return false;
        }
        var njkindex = $(".jk_box3 li").index($(obj));
        if (njkindex == oindex) {
            return false;
        }
        var title = $(obj).attr("attr_title") + "<br/>" + "<span>" + $(obj).attr("attr_entitle") + "</span>";
        var attr_descript = $(obj).attr("attr_descript");
        var imgsrc = $("img", $(obj)).attr("src");
        var parentojb = $(obj).parent().parent().parent();

        if ($(obj).hasClass("bl_mbox") || $(obj).hasClass("bl_mbox_cz")) {
            var box_img = $(obj).attr("box_img");
            if ($(obj).hasClass("bl_mbox")) {
                glattr['jh'] = $(obj).attr("attr_title");
				 glattr['jh_id'] = $(obj).attr("attr_id");
                glattr['cz'] = "";
				 glattr['cz_id'] = "";
                boxLoading($(obj), "jh_c");
            } else if ($(obj).hasClass("bl_mbox_cz")) {
                glattr['cz'] = $(obj).attr("attr_title");
				glattr['cz_id'] = $(obj).attr("attr_id");
                boxLoading($(obj), "jh_c");
            }
            $("img",$(".bl_mbox_cz")).removeClass("select").not($("img",$(obj)));
			
			$("img",$(obj)).addClass("select");
            var box_img = $(obj).attr("box_img");

        } else {
		    $("img",$(obj)).addClass("select");
	        $(".d_xunh").eq(liindex).find("img").not($("img",$(obj))).removeClass("select");
            var imgarray = [];
			var classarray=[];
            var blclass = $(obj).attr("class");
          
            $(".miao_load").show();
            glprice[blclass + "_price"] = parseInt($(obj).attr("attr_p"));
            glattrid[blclass + "_id"] = $(obj).attr("attr_id");
			if($(obj).hasClass("jt")){
			postRundate['type']=="jt";
			      count = 0;
		     	   classarray[0]=blclass;
              imgarray[0] = $(obj).attr("img_l");
				
			}else{
			if($(obj).hasClass("jk")){
			 postRundate['jpid']=glattrid['jp_id'];
			}
			 postRundate['type']=blclass;
			  count = 0;
			  imgarray[0] = $(obj).attr("img_c");
			  classarray[0]=blclass;
              imgarray[1] = $(obj).attr("img_l");
			  classarray[1]=blclass;
			
			}
	      if($(obj).attr("attr_id")>0){
			postRundate['id']=$(obj).attr("attr_id");
		
		    getKuc(postRundate,imgarray,classarray);
		   }
			       glattr[blclass] = $(obj).attr("attr_title");
        }
		
		
      	
        oindex = njkindex;
        var njkh = 0;
        var jkcdiv = parentojb.find("div");
        jkcdiv.each(function(i) {
            njkh = njkh + parseInt(jkcdiv.eq(i).outerHeight()) + parseInt(jkcdiv.eq(i).css("marginTop"));

        });

        parentojb.animate({
            height: njkh
        },
        500);

	
	}
	
	

    function bl_loading(objsrc, blclass,bisf) {
        var browser = new Object();
        var obj = new Object();

        browser.useragent = window.navigator.userAgent.toLowerCase();
        browser.ie = /msie/.test(browser.useragent);
        browser.moz = /gecko/.test(browser.useragent);

        var imgsrc = objsrc;

        var image = new Image;
        image.src = imgsrc;
        if (browser.ie) {
            if (image.height === 0) {
                image.onload = function() {

                    count++;
                    showContentImage(blclass, image.src, count,bisf);
                }

            } else {

                count++;
                showContentImage(blclass, image.src, count,bisf);
                // showContentImage(obj);
            }
        } else {

            image.onload = function() {
                if (image.complete == true) {

                    //showContentImage(blclass,image.src);
                    count++;
                    showContentImage(blclass, image.src, count,bisf);
                    //   showContentImage(obj);
                }
            }

            image.onerror = function() {

                //obj.parent().addClass("img_loading_error");
                // $(".img_loading_error").height("250px")
            }

        }

    }
    var jpcls="";
    function showContentImage(blclass, image, count,bisf) {
       
		if(blclass=="jt"){
		    $(".bl_" + blclass, ".qingdan1").eq(0).empty().append('<img src="' + image + '" style="display:none" />');
        $(".bl_" + blclass).eq(0).empty().append('<img src="' + image + '" style="display:none" />');
		}else{
		     $(".bl_" + blclass, ".qingdan1").eq(bisf).empty().append('<img src="' + image + '" style="display:none" />');
        $(".bl_" + blclass).eq(bisf).empty().append('<img src="' + image + '" style="display:none" />');
		}
		
   
        if (count == arrleng) {
            $(".miao_load").hide();
		
            $("img", ".hasimg").show();
			$("img", ".hasimg_t").show();
			
        }
    }

    function boxLoading(imageobj, par) {
        var browser = new Object();
        var obj = new Object();
        obj = imageobj;
        browser.useragent = window.navigator.userAgent.toLowerCase();
        browser.ie = /msie/.test(browser.useragent);
        browser.moz = /gecko/.test(browser.useragent);
        var imgsrc = obj.attr("box_img");

        var image = new Image;
        image.src = imgsrc;
        if (browser.ie) {
            if (image.height === 0) {
                image.onload = function() {

                    showBoxImage(imgsrc, par);
                }

            } else {

                showBoxImage(imgsrc, par);

            }
        } else {
            image.onload = function() {
                if (image.complete == true) {

                    showBoxImage(imgsrc, par);
                }
            }

            image.onerror = function() {

}

        }

    }

    function showBoxImage(imgsrc, parclass) {
        $(".loading").hide();
        $(".bl_box", $("." + parclass)).not($(".bl_box:first", $("." + parclass))).remove();
        var bdimgobj = $(".bl_box:last", $("." + parclass)).css("opacity", 1).clone();
        bdimgobj.find("img").attr("src", imgsrc);
        bdimgobj.prependTo($("." + parclass));

        $(".bl_box:last", $("." + parclass)).stop().animate({
            opacity: 0
        },
        800, "easeInOutSine");

    }
String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.getStringLen = function() {

    var realLength = 0,
    len = this.length,
    charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = this.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;

}