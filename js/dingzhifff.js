﻿var price = {},
count = 0,
oindex = -1,
glattr = [],
glprice = [],
glattrid = [],
kcarray={},
kccfinfo={},
ompboxi = -1,
jp_type = 0;
var arrleng = 0;
var oldindex = -1;
var liindex = 0;
var pdvals=0;
  var clts = 0;
var clrs=0;

$(function() {
   var lubolen=$(".lubox li").length;
var moveWidth=$(".lub").width();
var mlen=0;
	var jtcindex=$(".d_xunh").index($(".jp_contain"));
  $('.d_contains').tinyscrollbar({ axis: 'y'});
  $(".dingz_miao").each(function(i){

   $(".dingz_"+i).tinyscrollbar({ axis: 'y'});

  });

    if (gl_edit['jj_id'] > 0) {

        glattr = {
            "jk": gl_attr_edit["jk"],
            "qk": gl_attr_edit["qk"],
			"wj": gl_attr_edit["wj"],
            "sj": gl_attr_edit["sj"],
            "jp": gl_attr_edit["jp"],
            "jt": gl_attr_edit["jt"],
			 "jtt": gl_attr_edit["jtt"],
            "size": gl_attr_edit["size"],
            "size_id": gl_attr_edit["size_id"],
            "jh": gl_attr_edit["jh"],
            "cz": gl_attr_edit["cz"],
            "jh_id": gl_attr_edit["jh_id"],
            "cz_id": gl_attr_edit["cz_id"],
            "l_eye_s": gl_attr_edit["l_eye_s"],
            "l_eye_c": gl_attr_edit["l_eye_c"],
            "l_eye_a": gl_attr_edit["l_eye_a"],
            "l_eye_t": gl_attr_edit["l_eye_t"],
            "r_eye_s": gl_attr_edit["r_eye_s"],
            "r_eye_c": gl_attr_edit["r_eye_c"],
            "r_eye_a": gl_attr_edit["r_eye_a"],
            "r_eye_t": gl_attr_edit["r_eye_t"],
            "pd_eye_t": accAdd(gl_attr_edit["l_eye_t"],gl_attr_edit["r_eye_t"]),
            "type_w": gl_attr_edit["type_w"],
            "type_n": gl_attr_edit["type_n"],
            "type_w_text": gl_attr_edit["type_w_text"],
            "type_n_text": gl_attr_edit["type_n_text"],
			"jh_line_two":gl_attr_edit["jh_line_two"],
			"jh_line_one":gl_attr_edit["jh_line_one"]

        };
		
        jp_type = gl_attr_edit["jp_type"];
				if (jp_type == 1) {

            $(".js_show").show();
        } else {
            $(".js_show").hide();
        }
    } else {
        glattr = {
            "jk": "",
            "qk": "",
			 "wj": "",
            "sj": "",
            "jp": "",
            "jt": "",
			"jtt": "",
            "size": $("a", $(".d_xuanan1").eq(0)).attr("attr_value"),
            "size_id": $("a", $(".d_xuanan1").eq(0)).attr("attr_id"),
            "jh": $(".bl_m_pbox").eq(0).attr("attr_title"),
            "cz": "",
            "jh_id": $(".bl_m_pbox").eq(0).attr("attr_id"),
            "cz_id": "",
            "l_eye_s": "",
            "l_eye_c": "",
            "l_eye_a": "",
            "l_eye_t": 0,
            "r_eye_s": "",
            "r_eye_c": "",
            "r_eye_a": "",
            "r_eye_t": 0,
            "pd_eye_t": 0,
            "type_w": 0,
            "type_n": 0,
            "type_w_text": "",
            "type_n_text": "",
			"jh_line_two":"",
			"jh_line_one":""

        };

    }
    if (gl_edit['jj_id'] > 0) {
        glprice = {
            "jk_price": accAdd(gl_p_edit['jk_price'],jkprice),
            "qk_price": gl_p_edit['qk_price'],
			 "wj_price": gl_p_edit['wj_price'],
            "sj_price": gl_p_edit['sj_price'],
            "jp_price": gl_p_edit['jp_price'],
            "jt_price": gl_p_edit['jt_price'],
			"jtt_price": gl_p_edit['jtt_price']
        };

		
    } else {
        glprice = {
            "jk_price":jkprice,
            "qk_price": 0,
			 "wj_price": 0,
            "sj_price": 0,
            "jp_price": 0,
            "jt_price": 0,
			"jtt_price":0
        };

    }
    if (gl_edit['jj_id'] > 0) {

        glattrid = {
            "jj_id": gl_edit['jj_id'],
            "jk_id": gl_edit['jk_id'],
			"wj_id": gl_edit['wj_id'],
            "qk_id": gl_edit['qk_id'],
            "sj_id": gl_edit['sj_id'],
            "jp_id": gl_edit['jp_id'],
            "jp_type_id": gl_edit['jp_type_id'],
            "jt_id": gl_edit['jt_id'],
			"jtt_id": gl_edit['jtt_id']
        };

    } else {
        glattrid = {
            "jj_id": cid,
            "jk_id": 0,
			"wj_id": 0,
            "qk_id": 0,
            "sj_id": 0,
            "jp_id": 0,
            "jp_type_id": 0,
            "jt_id": 0,
			"jtt_id":0
        };

    }
 
 
    var imgNum = 0;
    var images = [];
    function preLoadImg() {

        var imgs = document.images;
        for (var i = 0; i < imgs.length; i++) {
            images.push(imgs[i].src);
        }
		var browser=navigator.appName;
		
      
        if(browser=="Microsoft Internet Explorer")
        {  
		    var b_version=navigator.appVersion;
            var version=b_version.split(";");
            var trim_Version=version[1].replace(/[ ]/g,"");
		   if(trim_Version!="MSIE5.0" && trim_Version!="MSIE6.0"  &&  trim_Version!="MSIE7.0"  &&  trim_Version!="MSIE8.0"){
		    var cssImages = getallBgimages();
             for (var j = 0; j < cssImages.length; j++) {
              images.push(cssImages[j]);
             }
		   }
		
		
		}else{
		
		    var cssImages = getallBgimages();
             for (var j = 0; j < cssImages.length; j++) {
              images.push(cssImages[j]);
             }
		}
		

  

        $.imgpreload(images, {
            each: function() {
                var status = $(this).data('loaded') ? 'success': 'error';
                if (status == "success") {
                    var v = (parseFloat(++imgNum) / images.length).toFixed(2);
                    $(".tebox span").html(Math.round(v * 100));

                }
            },
            all: function() {
                $(".tebox span").html("100");

                $(".jiaz").fadeOut(500,
                function() {

                    $(".dingzhi").css("visibility", "visible");
                });

            }
        });
    }
    reaiseImg();
    reaiseBox();
    function reaiseImg() {
        var imgrH = ($(window).width() * 0.65) * 1200 / 1920;
        $(".hasimg").css({
            height: imgrH,
            top: "50%",
            marginTop: -imgrH / 2
        })
    }

    function reaiseBox() {
        var imgrB = ($(window).width() * 0.65 * 0.5) * 1200 / 1920;
        $(".hasimg_t").css({
            height: imgrB,
            top: "50%",
            marginTop: -imgrB / 2
        })
    }
	
	    var windowW = 1440 - 1440 * 0.23;
	var box2w = 1440 * 0.23;
	function initLeft(){
    var windowH = $(window).height() - $(".head").outerHeight() - $(".foot_gai").outerHeight();

    $(".cont_personal_dingzhi,.dingz_box3 ").css({
        height: windowH
    });
	
	$(".dingz_miao").css("height",windowH-$(".dingz_box2_h").height()-$(".dingz_box2_tj").outerHeight()-$(".ding_baocuo").outerHeight()-31-parseInt($(".dingz_box2_tj").css("marginTop"))-parseInt($(".dz_fx").css("marginTop"))-$(".ding_tishi").outerHeight()-$(".dz_fx").outerHeight()-$(".ding_baocuo").outerHeight()-40);
 
    $(".d_xunh,#scrollbar_l .viewport").css("height",windowH-$(".dingz_box2_h").height()-$(".dingz_box2_tj").outerHeight()-$(".ding_baocuo").outerHeight()-31-parseInt($(".dingz_box2_tj").css("marginTop"))-parseInt($(".dz_fx").css("marginTop"))-$(".ding_tishi").outerHeight()-$(".dz_fx").outerHeight()-$(".ding_baocuo").outerHeight()-40);
   }
   	initLeft();
    $(window).resize(function() {
        reaiseImg();
        reaiseBox();
		initLeft();
		  $('.miao_dan').tinyscrollbar_update({ axis: 'y'});
  $(".dingz_miao").each(function(i){
 
            $(".dingz_"+i).tinyscrollbar_update();
		   if(!$(".scrollbar",$(".dingz_"+i)).hasClass("disable")){
		             $(".scrollbar",$(".dingz_"+i)).show();
		            }else{
					   $(".scrollbar",$(".dingz_"+i)).hide();
					}
  });
		  

    });

    function getallBgimages() {
        var url, B = [],
        A = document.getElementsByTagName('*');
        A = B.slice.call(A, 0, A.length);
        while (A.length) {
            url = document.deepCss(A.shift(), 'background-image');
            if (url) url = /url\(['"]?([^")]+)/.exec(url) || [];
            url = url[1];
            if (url && B.indexOf(url) == -1) B[B.length] = url;
        }
        return B;
    }

    document.deepCss = function(who, css) {
        if (!who || !who.style) return '';
        var sty = css.replace(/\-([a-z])/g,
        function(a, b) {
            return b.toUpperCase();
        });
        if (who.currentStyle) {
            return who.style[sty] || who.currentStyle[sty] || '';
        }
        var dv = document.defaultView || window;
        return who.style[sty] || dv.getComputedStyle(who, "").getPropertyValue(css) || '';
    }

    Array.prototype.indexOf = Array.prototype.indexOf ||
    function(what, index) {
        index = index || 0;
        var L = this.length;
        while (index < L) {
            if (this[index] === what) return index; ++index;
        }
        return - 1;
    }

    preLoadImg();

    function init() {
	
	    $(".j_chuf2 option").removeAttr("selected");
 
        $(".jk").each(function(i) {
            if ($("img", $(this)).hasClass("select")) {
                glattrid['jk_id'] = $(this).attr("attr_id");
                glprice['jk_price'] = accAdd($(this).attr("attr_p"),jkprice);
                glattr['jk'] = $(this).attr("attr_title");
            }
        });

       if($(".wj").length>0){
        $(".wj").each(function(i) {
            if ($("img", $(this)).hasClass("select")) {
				// $(".jt_wz,.jt_wz1").attr("style","color:"+$(this).attr("font_color")+";");
		
                glattrid['wj_id'] = $(this).attr("attr_id");
                glprice['wj_price'] = $(this).attr("attr_p");
                glattr['wj'] = $(this).attr("attr_title");
            }
        });
		}
       if($(".qk").length>0){
        $(".qk").each(function(i) {
            if ($("img", $(this)).hasClass("select")) {
				 $(".jt_wz,.jt_wz1").attr("style","color:"+$(this).attr("font_color")+";");
		
                glattrid['qk_id'] = $(this).attr("attr_id");
                glprice['qk_price'] = $(this).attr("attr_p");
                glattr['qk'] = $(this).attr("attr_title");
            }
        });
		}
		if($(".sj").length>0){
        $(".sj").each(function(i) {
            if ($("img", $(this)).hasClass("select")) {
                glattrid['sj_id'] = $(this).attr("attr_id");
                glprice['sj_price'] = $(this).attr("attr_p");
                glattr['sj'] = $(this).attr("attr_title");
            }
        });
		}
		
		if($(".jtt").length>0){
		   
		           $(".jtt").each(function(i) {
            if ($("img", $(this)).hasClass("select")) {
                glattrid['jtt_id'] = $(this).attr("attr_id");
                glprice['jtt_price'] = $(this).attr("attr_p");
                glattr['jtt'] = $(this).attr("attr_title");
            }
        });  
		    
		  
		}

        $(".jp").each(function(i) {
            if ($("img", $(this)).hasClass("select")) {
                glattrid['jp_id'] = $(this).attr("attr_id");
                glattrid['jp_type_id'] = $(this).attr("jp_id");
                glprice['jp_price'] = $(this).attr("attr_p");
                glattr['jp'] = $(this).attr("attr_title");
                jp_type = $(this).attr("jp_type");
				if (jp_type == 1) {

            $(".js_show").show();
        } else {
            $(".js_show").hide();
        }
            }
        });
       
        $(".jt").each(function(i) {
            if ($("img", $(this)).hasClass("select")) {
                glattrid['jt_id'] = $(this).attr("attr_id");
                glprice['jt_price'] = $(this).attr("attr_p");
                glattr['jt'] = $(this).attr("attr_title");
            }
        });

        $(".bl_m_pbox").each(function() {

            if ($("img", $(this)).hasClass("select")) {
                glattr['jh_id'] = $(this).attr("attr_id");
                glattr['jh'] = $(this).attr("attr_title");
            } else {
                glattr['jh'] = $(".bl_m_pbox").eq(0).attr("attr_title");
                glattr['jh_id'] = $(".bl_m_pbox").eq(0).attr("attr_id");
            }

        });
		
		$(".d_xuanan1").each(function(i) {

             if ($("a", $(this)).hasClass("select")) {
                glattr["size"] = $("a", $(this)).attr("attr_value");
                glattr["size_id"] = $("a", $(this)).attr("attr_id");

            } else {
                glattr["size"] = $("a", $(".d_xuanan1").eq(0)).attr("attr_value");
                glattr["size_id"] = $("a", $(".d_xuanan1").eq(0)).attr("attr_id");
            }

        });

        $(".bl_mbox_cz").each(function() {
           
            if ($("img", $(this)).hasClass("select")) {
			
			    $(".jh_xk").attr("style","color:"+$(this).attr("font_color")+";");
                glattr['cz_id'] = $(this).attr("attr_id");
                glattr['cz'] = $(this).attr("attr_title");
            } else {
			    $(".jh_xk").attr("style","color:"+$(".bl_mbox_cz").eq(0).attr("font_color")+";");
                glattr['cz'] = $(".bl_mbox_cz").eq(0).attr("attr_title");
                glattr['cz_id'] = $(".bl_mbox_cz").eq(0).attr("attr_id");
            }

        });
		
	
		

    }
    if (!gl_edit['jj_id'] > 0) {

        init();

    }
   kcinit();
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
		     if (glattr['wj'].Trim() != "") {
            $(".wj_attr_v").html(glattr['wj']);
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
		     if (glattr['jtt'].Trim() != "") {
            $(".jtt_attr_v").html(glattr['jtt']);
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
		
		     if (parseInt(glprice['wj_price']) >= 0) {
            $(".wj_attr_p").html("¥" + glprice['wj_price']);
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
		       if (parseInt(glprice['jtt_price']) >= 0) {
            $(".jtt_attr_p").html("¥" + glprice['jtt_price']);
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
         
            if (glattr['l_eye_s']!= "") {
		
                jplstr += "球镜/S:" + glattr['l_eye_s']+ ";";
            } else {
                jplstr += "球镜/S:无" + ";";
            }

            if (glattr['l_eye_c']!= "") {
                jplstr += "柱镜/C:" + glattr['l_eye_c']+ ";";
            } else {
                jplstr += "柱镜/C:无" + ";";
            }

            if (glattr['l_eye_a']!= "") {
                jplstr += "轴位/A:" + glattr['l_eye_a']+ ";";
            } else {
                jplstr += "轴位/A:无" + ";";
            }
            if (glattr['l_eye_t']!= "") {
                jplstr += "左眼瞳距:" + glattr['l_eye_t']+ ";";
            } else {
                jplstr += "左眼瞳距:无" + ";";
            }

            if (glattr['r_eye_s']!= "") {
                jprstr += "球镜/S:" + glattr['r_eye_s']+ ";";
            } else {
                jprstr += "球镜/S:无" + ";";
            }

            if (glattr['r_eye_c']!= "") {
                jprstr += "柱镜/C:" + glattr['r_eye_c']+ ";";
            } else {
                jprstr += "柱镜/C:无" + ";";
            }

            if (glattr['r_eye_a']!= "") {
                jprstr += "轴位/A:" + glattr['r_eye_a']+ ";";
            } else {
                jprstr += "轴位/A:无" + ";";
            }

            if (glattr['r_eye_t']!= "") {
                jprstr += "右眼瞳距:" + glattr['r_eye_t']+ ";";
            } else {
                jprstr += "右眼瞳距:无;";
            }

            if (glattr['pd_eye_t']!= "") {
                var jppdstr = "瞳距/PD:" + glattr['pd_eye_t'] + ";";
            } else {
                var jppdstr = "瞳距/PD:无" + ";";
            }
          
            $(".js_show .jp_attr_l").next().empty().html(jplstr);

            $(".js_show .jp_attr_ri").next().empty().html(jprstr);

            $(".js_show .jp_attr_t").next().empty().html(jppdstr);

        }
		
		
        		var pdvals=accAdd(glattr['l_eye_t'],glattr['r_eye_t']);
				 var total=0;
					$(".pd_eye_t").html(pdvals);
					$.each(glprice,function(n,value) { 
   
	   total +=(typeof value=="undefined" || value=="")?0:parseInt(value); 
	                });
        //var total = ((typeof glprice['jk_price']=="undefined" || glprice['jk_price']=="")?0:parseInt(glprice['jk_price']))+ ((typeof glprice['qk_price']=="undefined" || glprice['qk_price']=="")?0:parseInt(glprice['qk_price']))+((typeof glprice['sj_price']=="undefined" || glprice['sj_price']=="")?0:parseInt(glprice['sj_price']))+((typeof glprice['jp_price']=="undefined" || glprice['jp_price']=="")?0:parseInt(glprice['jp_price']))+((typeof glprice['jt_price']=="undefined" || glprice['jt_price']=="")?0:parseInt(glprice['jt_price']))+((typeof glprice['jtt_price']=="undefined" || glprice['jtt_price']=="")?0:parseInt(glprice['jtt_price']));
        $(".total").html(total);
    }


    

    //$(".dingzhi ").width(windowW);
    $(".li_item").click(function() {

        liindex = $(".li_item").index(this);
        
        cItem(liindex);
			hideLoTip();
    });
var scroolstate=false;
    function cItem(ci) {
	 
 
        	 
        if ($(".li_item").eq(ci).hasClass("lb_c_g")) {
         
                $(".flex-control-nav li a").eq(0).trigger("click");
                $(".jd_image").show();
       
            $(".dingz_img").not($(".glass_c")).hide();

        }else if($(".li_item").eq(ci).hasClass("lb_c_jt")){

                   $(".flex-control-nav li a").eq(1).trigger("click");
                  $(".jd_image").show();
                   $(".dingz_img").not($(".glass_c")).hide();
        }else if ($(".li_item").eq(ci).hasClass("li_c_item")) {
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
        $(".d_xunh").eq(ci).fadeIn(200,function(){
		  if(scroolstate){
		   ChScroll(ci);
		   }

		});
	   
        //$(".dingzhi").stop().animate({width:1440},500);
        if (parseInt($(".dingz_box2").width()) == 0) {
            $(".dingz_box2").stop().animate({
                width: box2w
            },
            500,
            function() {
                $(".dingz_box2").css("overflow", "visible");
				if(scroolstate===false){
			     ChScroll(ci);
				 scroolstate=true;
				 }
                
            });
        }

        if (ci == $(".li_item").length - 1) {
            $(".next_step").hide();
            $(".d_do").show();
		$(".dingz_box2_tj1 a").not($("a", $(".d_do"))).removeClass("select");
        $("a",$(".d_do")).addClass("select");
        } else {
		$(".dingz_box2_tj1 a").not($("a", $(".prev_step"))).removeClass("select");
        $("a",$(".prev_step")).addClass("select");
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
            500,function(){
			
			//ChScroll(liindex);
			});
            $(".d_yinc", $(this)).addClass("openoff").removeClass("openon");
        } else {
            jkcdiv.each(function(i) {
                jkh = jkh + jkcdiv.eq(i).outerHeight() + parseInt(jkcdiv.eq(i).css("marginTop"))+ parseInt(jkcdiv.eq(i).css("marginBottom"));
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

    $(".d_jpx1").on("click",
    function() {
     
        var djpi = $(".d_jpx1").index($(this));
       // jp_type = $(this).attr("jp_type");
        glattrid['jp_type_id'] = $(this).attr("attr_id");
 
       
        $(".jins").hide().eq(djpi).fadeIn(100,function(){
	   
		 ChScroll(liindex);
		
		});
        $("a", ".d_jpx").not($("a", $(this))).removeClass("select");
        $("a", $(this)).addClass("select");
		hideLoTip();

    });

    $(".d_xuanan1").click(function() {
        $(".d_xuanan1 a").not($("a", $(this))).removeClass("select");
        $("a", $(this)).addClass("select");

        $(".c_size").html($("a", $(this)).attr("attr_value"));

        glattr['size'] = $("a", $(this)).attr("attr_value");
        glattr['size_id'] = $("a", $(this)).attr("attr_id");

    });

    $(".bl_m_pbox").click(function() {

        var mpboxi = $(".bl_m_pbox img").index($("img", $(this)));
        if (ompboxi == mpboxi) {
            return false;
        }
        $(".bl_m_pbox img").not($("img", $(this))).removeClass("select");
        $("img", $(this)).addClass("select");
        var bl_m_i = $(".bl_m_pbox").index($(this));

        $(".jh_box_cz").hide().eq(bl_m_i).fadeIn();
        ompboxi = mpboxi;

    });

    $(".j_chuf2").focus(function(e) {

        $(this).prev().hide();
        e.stopPropagation();

    });
	
	


    $(".j_chuf2").live("change",function(e) {
                 if (jp_type == 1) {
                if ($(this).hasClass("l_eye_s")) {

                    glattr['l_eye_s'] = $(this).find("option:selected").text();
					
				
                }

                if ($(this).hasClass("l_eye_c")) {
			
                   glattr['l_eye_c'] = $(this).find("option:selected").text();
				   if($(this).find("option:selected").val()!="" && $(".l_eye_a").find("option:selected").val()==""){
					     showLoTip($(".l_eye_a"),"请选择轴位");
				  		$(".l_eye_a").removeAttr("disabled");
					}else if($(this).find("option:selected").val()!="" &&  $(".l_eye_a").find("option:selected").val()!=""){
					$(".l_eye_a").removeAttr("disabled");
					hideLoTip(); 
					}else{
					hideLoTip(); 
					   $(".l_eye_a option").eq(0).attr("selected","selected");
					$(".l_eye_a").attr("disabled","disabled");
				
					
					
					}
                }
				
				if ($(this).hasClass("c_l_eye_c")) {
                if($(this).find("option:selected").val()!="" && $(".c_l_eye_a").find("option:selected").val()==""){
					     showLoTip($(".c_l_eye_a"),"请选择轴位");
				  		$(".c_l_eye_a").removeAttr("disabled");
					}else if($(this).find("option:selected").val()!="" &&  $(".c_l_eye_a").find("option:selected").val()!=""){
					$(".c_l_eye_a").removeAttr("disabled");
					hideLoTip(); 
					}else{
					hideLoTip(); 
					   $(".c_l_eye_a option").eq(0).attr("selected","selected");
					$(".c_l_eye_a").attr("disabled","disabled");
				
					
					
					}
                }

                if ($(this).hasClass("l_eye_a")) {

                    glattr['l_eye_a'] = $(this).find("option:selected").text();
					if($(".l_eye_c").find("option:selected").text().Trim()!="" && $(".l_eye_c").find("option:selected").val()!="" &&  $(".l_eye_a").find("option:selected").val()=="" ){
					showLoTip($(".l_eye_a"),"请选择轴位");
					}else{
					hideLoTip();	
					}
                }
				
				           if ($(this).hasClass("c_l_eye_a")) {

                    //glattr['c_l_eye_a'] = $(this).find("option:selected").text();
					if($(".c_l_eye_c").find("option:selected").text().Trim()!="" && $(".c_l_eye_c").find("option:selected").val()!="" &&  $(".c_l_eye_a").find("option:selected").val()=="" ){
					showLoTip($(".c_l_eye_a"),"请选择轴位");
					}else{
					hideLoTip();	
					}
                }

                if ($(this).hasClass("r_eye_s")) {

                    glattr['r_eye_s'] = $(this).find("option:selected").text();
                }

                if ($(this).hasClass("r_eye_c")) {
       
                    glattr['r_eye_c'] = $(this).find("option:selected").text();
			           if($(this).find("option:selected").val()!="" && $(".r_eye_a").find("option:selected").val()==""){
					     showLoTip($(".r_eye_a"),"请选择轴位");
				  		$(".r_eye_a").removeAttr("disabled");
					}else if($(this).find("option:selected").val()!="" &&  $(".r_eye_a").find("option:selected").val()!=""){
					$(".r_eye_a").removeAttr("disabled");
					hideLoTip(); 
					}else{
					hideLoTip(); 
					   $(".r_eye_a option").eq(0).attr("selected","selected");
					$(".r_eye_a").attr("disabled","disabled");
				
					
					
					}
                }
				
				
                if ($(this).hasClass("c_r_eye_c")) {
       
                   // glattr['r_eye_c'] = $(this).find("option:selected").text();
			           if($(this).find("option:selected").val()!="" && $(".c_r_eye_a").find("option:selected").val()==""){
					     showLoTip($(".c_r_eye_a"),"请选择轴位");
				  		$(".c_r_eye_a").removeAttr("disabled");
					}else if($(this).find("option:selected").val()!="" &&  $(".c_r_eye_a").find("option:selected").val()!=""){
					$(".c_r_eye_a").removeAttr("disabled");
					hideLoTip(); 
					}else{
					hideLoTip(); 
					   $(".c_r_eye_a option").eq(0).attr("selected","selected");
					$(".c_r_eye_a").attr("disabled","disabled");
				
					
					
					}
                }

                if ($(this).hasClass("r_eye_a")) {

                    glattr['r_eye_a'] = $(this).find("option:selected").text();
							if($(".r_eye_c").find("option:selected").text().Trim()!="" && $(".r_eye_c").find("option:selected").val()!="" &&  $(".r_eye_a").find("option:selected").val()=="" ){
					showLoTip($(".r_eye_a"),"请选择轴位");
				
					}else{
					hideLoTip();
					
				
					}
                }
				
				       if ($(this).hasClass("c_r_eye_a")) {

                    glattr['c_r_eye_a'] = $(this).find("option:selected").text();
							if($(".c_r_eye_c").find("option:selected").text().Trim()!="" && $(".c_r_eye_c").find("option:selected").val()!="" &&  $(".c_r_eye_a").find("option:selected").val()=="" ){
					showLoTip($(".c_r_eye_a"),"请选择轴位");
				
					}else{
					hideLoTip();
					
				
					}
                }

                if ($(this).hasClass("l_eye_t")) {

                    glattr['l_eye_t'] = $(this).find("option:selected").text();
						if(isNaN($(".r_eye_t").find("option:selected").text()) || typeof $(".r_eye_t").find("option:selected").text()=="undefined" ){
					glattr['r_eye_t']=0;
					}
						if(isNaN($(this).find("option:selected").text()) || typeof $(this).find("option:selected").text()=="undefined"){
					glattr['l_eye_t']=0;
					}
					 pdvals=accAdd(glattr['l_eye_t'],glattr['r_eye_t']);
					$(".pd_eye_t").html(pdvals);
					 glattr['pd_eye_t']=pdvals;
					  if($(this).find("option:selected").text().Trim()=="" || $(this).find("option:selected").val()==""){
					showLoTip($(".l_eye_t"),"请选择左眼瞳距");
					}else{
					hideLoTip();
					
					}
                }
				
				       if ($(this).hasClass("c_l_eye_t")) {

                       clts = $(this).find("option:selected").text();
					
						if(isNaN($(".c_r_eye_t").find("option:selected").text()) || typeof $(".c_r_eye_t").find("option:selected").text()=="undefined" ){
					    clrs=0;
					}
						if(isNaN($(this).find("option:selected").text()) || typeof $(this).find("option:selected").text()=="undefined"){
					     clts=0;
					}
					 pdvals=accAdd(clrs,clts);
					$(".c_pd_eye_t").html(pdvals);
					// glattr['pd_eye_t']=pdvals;
					  if($(this).find("option:selected").text().Trim()=="" || $(this).find("option:selected").val()==""){
					showLoTip($(".c_l_eye_t"),"请选择左眼瞳距");
					}else{
					hideLoTip();
					
					}
                }

                if ($(this).hasClass("r_eye_t")) {

                    glattr['r_eye_t'] = $(this).find("option:selected").text();
						if(isNaN($(".l_eye_t").find("option:selected").text()) || typeof $(".l_eye_t").find("option:selected").text()=="undefined"){
					glattr['l_eye_t']=0;
					}
						if(isNaN($(this).find("option:selected").text()) || typeof $(this).find("option:selected").text()=="undefined"){
					glattr['r_eye_t']=0;
					}
						pdvals=accAdd(glattr['l_eye_t'],glattr['r_eye_t']);
					$(".pd_eye_t").html(pdvals);
					 glattr['pd_eye_t']=pdvals;
					  if($(this).find("option:selected").text().Trim()=="" || $(this).find("option:selected").val()==""){
					showLoTip($(".r_eye_t"),"请选择右眼瞳距");
					}else{
					hideLoTip();
					
					}
                }
				
				           if ($(this).hasClass("c_r_eye_t")) {

                   clrs= $(this).find("option:selected").text();
				  
						if(isNaN($(".c_l_eye_t").find("option:selected").text()) || typeof $(".c_l_eye_t").find("option:selected").text()=="undefined"){
					clts=0;
					}
						if(isNaN($(this).find("option:selected").text()) || typeof $(this).find("option:selected").text()=="undefined"){
					clrs=0;
					}
						pdvals=accAdd(clrs,clts);
					$(".c_pd_eye_t").html(pdvals);
					// glattr['pd_eye_t']=pdvals;
					  if($(this).find("option:selected").text().Trim()=="" || $(this).find("option:selected").val()==""){
					showLoTip($(".c_r_eye_t"),"请选择右眼瞳距");
					}else{
					hideLoTip();
					
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

    $(".prev_step").click(function(e) {

        liindex--;

        if (liindex <= 0) {

            liindex = 0;
        }
		$(".dingz_box2_tj1 a").not($("a",$(this))).removeClass("select");
        $("a",$(this)).addClass("select");

        hideLoTip();
        cItem(liindex);
e.stopPropagation();
    });

    $(".next_step").click(function(e) {

        liindex++;
        if (liindex > $(".dingz_box3 .li_item").length - 1) {

            liindex = $(".dingz_box3 .li_item").length - 1;
            return false;
        }
				$(".dingz_box2_tj1 a").not($("a",$(this))).removeClass("select");
        $("a",$(this)).addClass("select");
		hideLoTip();
        cItem(liindex);
		e.stopPropagation();

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
 $(".jt_wz").html(strs)
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
		$(".jt_wz1").html(strs)

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

    var donestate = true;

    $(".done").click(function() {
        	   if(jp_type==1){
	     if(yzcfinfo(pdvals)==false){
		   return false;
		 }
       }
        if (donestate) {
            var postDate = {};
            postDate['glattr'] = glattr;
            postDate['glattrid'] = glattrid;
            postDate['step'] = "add_dingzhi_cart";
            postDate['jp_type'] = jp_type;

            $.ajax({
                type: 'POST',
                url: 'flow.php',
                data: postDate,
                dataType: "json",
                beforeSend: function(XMLHttpRequest) {
                    $(".done").addClass("c_loadding");
                    $(".done>a").css("opacity", 0.1);
                    $(".ding_baocuo").hide().html("");
                    donestate = false;

                },
                success: function(data) {
                    $(".ding_baocuo").empty().hide();
                    $(".done").removeClass("c_loadding");

                    $(".miao_mima1_ts1").empty().hide();

                    switch (data.err) {

                    case "id_error":
                        donestate = true;
                        $(".ding_baocuo").show().html("非系统参数！");
                        break;
                    case "save_sucess":
                        $(".ding_baocuo").hide().html("");
                        donestate = false;

                        $(".done>a").html("已经加入");
                        $(".done>a").animate({
                            "opacity": 1
                        },
                        500);
                        reflash_cart();
                        setTimeout(function() {
                         location.href = "flow.php?step=cart";
                        },
                        1000);
                        break;
                    case "save_fail":
                        donestate = true;
                        $(".done>a").animate({
                            "opacity": 1
                        },
                        500);
                        $(".ding_baocuo").show().html("保存失败！");
                        break;
                    case "save_fail":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
                        $(".ding_baocuo").show().html("保存失败！");
                        break;
                    case "jk_id_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
                        $(".ding_baocuo").show().html("非法镜框值!");
                        break;
                    case "qk_id_error":
                        donestate = true;
                        $(".done>a").animate({
                            "opacity": 1
                        },
                        500);
                        $(".ding_baocuo").show().html("无效的前框饰布值!");
                        break;
                    case "sj_id_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
                        $(".ding_baocuo").show().html("无效的前框饰件值!");
                        break;
                    case "jp_id_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
                        $(".ding_baocuo").show().html("无效的镜片值!");
                        break;
                    case "jt_id_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
                        $(".ding_baocuo").show().html("无效的镜腿值!");
                        break;
					case "jtt_id_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
                        $(".ding_baocuo").show().html("无效的脚套值!");
                        break;
                    case "size_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
                        $(".ding_baocuo").show().html("无效的尺寸值!");
                        break;
                    case "size_id_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
                        $(".ding_baocuo").show().html("无效的尺寸值!");
                        break;
				       case "w_text_length_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
                        $(".ding_baocuo").show().html("镜腿外侧镌刻超过10个字符!");
                        break;
						       case "n_text_length_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
                        $(".ding_baocuo").show().html("镜腿内侧镌刻超过10个字符!");
                        break;
								       case "jh_one_text_length_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
                        $(".ding_baocuo").show().html("镜盒线1镌刻超过18个字符!");
                        break;
						
					   case "jh_two_text_length_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
                        $(".ding_baocuo").show().html("镜盒线2镌刻超过18个字符!");
                        break;
                    case "jp_type_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
                        $(".ding_baocuo").show().html("无效的镜片类型值!");
                        break;
                    case "jp_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
                        $(".ding_baocuo").show().html("无效的镜片值!");
                        break;
                    case "jh_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
                        $(".ding_baocuo").show().html("无效的镜盒值!");
                        break;
                    case "cz_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
                        $(".ding_baocuo").show().html("无效的镜盒材质值!");
                        break;
                    case "rec_id_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = false;
                        $(".ding_baocuo").show().html("无效的订单值!");
                        break;
                    case "rec_id_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = false;
                        $(".ding_baocuo").show().html("无效的订单值!");
                        break;
						
						  case "l_eye_a_error":
				   
				           $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
                        $(".ding_baocuo").show().html("请选择左眼轴位!");
				   break
				   	   case "r_eye_a_error":
				     
				           $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
                        $(".ding_baocuo").show().html("请选择右眼轴位!");
				   break
				   	   case "r_eye_t_error":
				   	           $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
                        $(".ding_baocuo").show().html("请选择左眼瞳距!");

				   break
				   	   case "r_eye_t_error":
				   		  $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
                        $(".ding_baocuo").show().html("请选择右眼瞳距!");
				
				   break
				   	   case "l_union_sc_error":
				   		   	 $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
                        $(".ding_baocuo").show().html("左眼球镜加左眼柱镜超过联合光度!");
				    
				   break
				    	   case "r_union_sc_error":
				      	 $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
                        $(".ding_baocuo").show().html("右眼球镜加右眼柱镜超过联合光度!");
				
				   break
				    	   case "max_pd_error":
				   
				   	$(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
                        $(".ding_baocuo").show().html("两眼瞳距值大于最大瞳距值!");
				   break
				    	   case "min_pd_error":
				   
				   		$(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
                        $(".ding_baocuo").show().html("两眼瞳距值小于最小瞳距值!");
				   break
                    default:
                        donestate = false;
                        $(".done>a").animate({
                            "opacity": 1
                        },
                        500);
                        $(".ding_baocuo").show().html("系统错误，刷新后重试!");
                        // hideTip();
                        //$(".miao_login").html("<span class='ti_error'>系统错误，刷新后重试!</span>").show();
                    }

                }
            });
        }
    });

   

    var dingzhiedit = true;

    $(".dingzhi_edit").click(function() {
	
	   if(jp_type==1){
	     if(yzcfinfo(pdvals)==false){
		   return false;
		 }
       }
        if (dingzhiedit) {
            var editpostDate = {};

            editpostDate['glattr'] = glattr;
            editpostDate['glattrid'] = glattrid;
            editpostDate['step'] = "edit_dingzhi_cart";
            editpostDate['jp_type'] = jp_type;
            editpostDate['tocken'] = $(".rids").val();

            $.ajax({
                type: 'POST',
                url: 'flow.php',
                data: editpostDate,
                dataType: "json",
                beforeSend: function(XMLHttpRequest) {
                    $(".dingzhi_edit").addClass("c_loadding");
                    $(".dingzhi_edit>a").css("opacity", 0.1);
                    dingzhiedit = false;
                    $(".ding_baocuo").hide().html("");
                },
                success: function(data) {
                    $(".ding_baocuo").empty().hide();
                    $(".dingzhi_edit").removeClass("c_loadding");
                    switch (data.err) {

                    case "id_error":
                        dingzhiedit = false;
                        $(".ding_baocuo").show().html("非系统参数！");
                        break;
                    case "save_sucess":
                        dingzhiedit = false;
                        $(".ding_baocuo").hide().html("");
                        $(".dingzhi_edit>a").html("保存成功");
                        $(".dingzhi_edit>a").animate({
                            "opacity": 1
                        },
                        500);
                        reflash_cart();
                        setTimeout(function() {
                            location.href = "flow.php?step=cart";
                        },
                        1000);
                        break;
                    case "save_fail":
                        dingzhiedit = true;
                        $(".dingzhi_edit>a").animate({
                            "opacity": 1
                        },
                        500);
                        $(".ding_baocuo").show().html("保存失败！");
                        break;
                    case "save_fail":
                        dingzhiedit = false;
                        $(".dingzhi_edit>a").animate({
                            "opacity": 1
                        },
                        500);
                        $(".ding_baocuo").show().html("保存失败！");
                        break;
                    case "jk_id_error":
                        dingzhiedit = true;
                        $(".dingzhi_edit>a").animate({
                            "opacity": 1
                        },
                        500);
                        $(".ding_baocuo").show().html("非法镜框值!");
                        break;
                    case "qk_id_error":
                        dingzhiedit = true;
                        $(".dingzhi_edit>a").animate({
                            "opacity": 1
                        },
                        500);
                        $(".ding_baocuo").show().html("无效的前框饰布值!");
                        break;
                    case "sj_id_error":
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
                        $(".ding_baocuo").show().html("无效的前框饰件值!");
                        break;
                    case "jp_id_error":
                        dingzhiedit = true;
                        $(".dingzhi_edit>a").animate({
                            "opacity": 1
                        },
                        500);
                        $(".ding_baocuo").show().html("无效的镜片值!");
                        break;
                    case "jt_id_error":
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
						     dingzhiedit = true;
                        $(".ding_baocuo").show().html("无效的镜腿值!");
                        break;
						       case "jtt_id_error":
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
						     dingzhiedit = true;
                        $(".ding_baocuo").show().html("无效的脚套值!");
                        break;
                    case "size_error":
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
                        $(".ding_baocuo").show().html("无效的尺寸值!");
                        break;
                    case "size_id_error":
                        dingzhiedit = true;
                        $(".dingzhi_edit>a").animate({
                            "opacity": 1
                        },
                        500);
                        $(".ding_baocuo").show().html("无效的尺寸值!");
                        break;
                    case "jp_type_error":
                        dingzhiedit = true;
                        $(".dingzhi_edit>a").animate({
                            "opacity": 1
                        },
                        500);
                        $(".ding_baocuo").show().html("无效的镜片类型值!");
                        break;
                    case "jp_error":
                        dingzhiedit = true;
                        $(".dingzhi_edit>a").animate({
                            "opacity": 1
                        },
                        500);
                        $(".ding_baocuo").show().html("无效的镜片值!");
                        break;
                    case "jh_error":
                        dingzhiedit = true;
                        $(".dingzhi_edit>a").animate({
                            "opacity": 1
                        },
                        500);
                        $(".ding_baocuo").show().html("无效的镜盒值!");
                        break;
						
						  case "w_text_length_error":
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
                        $(".ding_baocuo").show().html("镜腿外侧镌刻超过10个字符!");
                        break;
						       case "n_text_length_error":
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
                        $(".ding_baocuo").show().html("镜腿内侧镌刻超过10个字符!");
                        break;
								       case "jh_one_text_length_error":
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
                        $(".ding_baocuo").show().html("镜盒线1镌刻超过18个字符!");
                        break;
						
					   case "jh_two_text_length_error":
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
                        $(".ding_baocuo").show().html("镜盒线2镌刻超过18个字符!");
                        break;
                    case "cz_error":
                        dingzhiedit = true;
                        $(".dingzhi_edit>a").animate({
                            "opacity": 1
                        },
                        500);
                        $(".ding_baocuo").show().html("无效的镜盒材质值!");
                        break;
					  case "l_eye_a_error":
				   
				           $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
                        $(".ding_baocuo").show().html("请选择左眼轴位!");
				   break
				   	   case "r_eye_a_error":
				     
				           $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
                        $(".ding_baocuo").show().html("请选择右眼轴位!");
				   break
				   	   case "r_eye_t_error":
				   	           $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
                        $(".ding_baocuo").show().html("请选择左眼瞳距!");

				   break
				   	   case "r_eye_t_error":
				   		  $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
                        $(".ding_baocuo").show().html("请选择右眼瞳距!");
				
				   break
				   	   case "l_union_sc_error":
				   		   	 $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
                        $(".ding_baocuo").show().html("左眼球镜加左眼柱镜超过联合光度!");
				    
				   break
				    	   case "r_union_sc_error":
				      	 $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
                        $(".ding_baocuo").show().html("右眼球镜加右眼柱镜超过联合光度!");
				
				   break
				    	   case "max_pd_error":
				   
				   	$(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
                        $(".ding_baocuo").show().html("两眼瞳距值大于最大瞳距值!");
				   break
				    	   case "min_pd_error":
				   
				   		$(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
                        $(".ding_baocuo").show().html("两眼瞳距值小于最小瞳距值!");
				   break
                    default:
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        data: editpostDate,
                        $(".ding_baocuo").show().html("<span class='ti_error'>系统错误，刷新后重试!</span>").show();

                    }

                }
            });

        }
		

    });

    var xOffset = 25;
    var yOffset = 30;

    $(".jk_box3 li").bind("hover",
    function(e) {

        if (e.type == 'mouseenter') {
            if ($(this).hasClass("no_s_s")) {
                return false;
            }
            var lisrcs = $("img", $(this)).attr("src");
            var lititle = $(this).attr("attr_title");
            $("img", ".s_box1").attr("src", lisrcs);
            $(".s_box2").html(lititle);
            $(".s_box").show();
        } else {
            $(".s_box").hide();
            $("img", ".s_box1").attr("src", "");
            $(".s_box2").html("");
            $(".s_box").css("top", 0 + "px").css("left", 0 + "px");
        }
    });

    $(".jk_box3 li").bind("mousemove",
    function(e) {
        if ($(this).hasClass("no_s_s")) {
            return false;
        }
        if (!e.pageX) {
            e.pageX = e.clientX;
        }
        if (!e.pageY) {

            e.pageY = e.clientY;
        }
        $(".s_box").css("top", (e.pageY - xOffset) + "px").css("left", (e.pageX + yOffset) + "px");
    });
	
		function yzcfinfo(){
		
			glattr['r_eye_c']=($(".r_eye_c").val()!="")?$(".r_eye_c").find("option:selected").text().Trim():"";
			glattr['r_eye_a']=($(".r_eye_a").val()!="")?$(".r_eye_a").find("option:selected").text().Trim():"";
			glattr['r_eye_t']=($(".r_eye_t").val()!="")?$(".r_eye_t").find("option:selected").text().Trim():"";
			glattr['r_eye_s']=($(".r_eye_s").val()!="")?$(".r_eye_s").find("option:selected").text().Trim():"";
		    glattr['l_eye_c']=($(".l_eye_c").val()!="")?$(".l_eye_c").find("option:selected").text().Trim():"";
			glattr['l_eye_a']=($(".l_eye_a").val()!="")?$(".l_eye_a").find("option:selected").text().Trim():"";
			glattr['l_eye_t']=($(".l_eye_t").val()!="")?$(".l_eye_t").find("option:selected").text().Trim():"";
			glattr['l_eye_s']=($(".l_eye_s").val()!="")?$(".l_eye_s").find("option:selected").text().Trim():"";
	   if($(".l_eye_c").find("option:selected").text().Trim()!="" && $(".l_eye_c").find("option:selected").val()!="" &&  $(".l_eye_a").find("option:selected").val()=="" ){
	
			
					cItem(jtcindex);
					liindex=jtcindex;
					showLoTip($(".l_eye_a"),"请选择轴位");
					return false;
					}else{

					hideLoTip();
				
					
	  }

	 
	      if($(".r_eye_c").find("option:selected").text().Trim()!="" && $(".r_eye_c").find("option:selected").val()!="" &&  $(".r_eye_a").find("option:selected").val()=="" ){
					
					cItem(jtcindex);
					liindex=jtcindex;
					showLoTip($(".r_eye_a"),"请选择轴位");
					return false;
					}else{
			
					hideLoTip();
				
					
					}
				
				      if($(".l_eye_t").find("option:selected").text().Trim()!="" && $(".l_eye_t").find("option:selected").val()=="" ){
			
					cItem(jtcindex);
					liindex=jtcindex;
					showLoTip($(".l_eye_t"),"请选择左眼瞳距");
					return false;
					}else{
			
					hideLoTip();
				
					
					}	

	      if($(".r_eye_t").find("option:selected").text().Trim()!="" && $(".r_eye_t").find("option:selected").val()=="" ){
					
					cItem(jtcindex);
					liindex=jtcindex;
					showLoTip($(".r_eye_t"),"请选择右眼瞳距");
					return false;
					}else{
					
					hideLoTip();
				
					
		}
       var lenuval=accAdd(glattr['l_eye_s'],glattr['l_eye_c']);
        if(lenuval<union_sc){
		
		$(".bcc").fadeIn().html("左眼球镜加左眼柱镜不能超过联合光度"+union_sc);
	cItem(jtcindex);		
        return false;
        }		
      var rightval=accAdd(glattr['r_eye_s'],glattr['r_eye_c']);
	  
	          if(rightval<union_sc){
		$(".bcc").fadeIn().html("右眼球镜加右眼柱镜不能超过联合光度"+union_sc);
	cItem(jtcindex);
liindex=jtcindex;	
        return false;
        }	
	  if(glattr['pd_eye_t']>tg_max){
					
		$(".bcc").fadeIn().html("两眼瞳距值大于最大瞳距值"+tg_max);
	cItem(jtcindex);
liindex=jtcindex;	
        return false;		
	}else if(glattr['pd_eye_t']<tg_min){
	  $(".bcc").fadeIn().html("两眼瞳距值小于最小瞳距值"+tg_min);
	  	cItem(jtcindex);
		liindex=jtcindex;
 return false;			  
	}else{
	$(".bcc").hide().html("");
	
	}
	
	if($(".c_l_eye_s").val()=="" && $(".c_r_eye_s").val()=="" && $(".c_l_eye_t").val()=="" && $(".c_r_eye_t").val()==""){
    $(".confirm_bcc").fadeIn().html("请填写确认处方信息！");
	cItem(jtcindex);

	return false;
	   }else if(glattr['l_eye_c']!="" && $(".c_l_eye_c").val()==""){
	   
	   $(".confirm_bcc").fadeIn().html("请填写确认处方信息左眼柱镜/C！");
	   cItem(jtcindex);
return false;
	   
	   }else if($(".c_l_eye_c").val()!="" && $(".c_l_eye_a").val()==""){
	   
	     $(".confirm_bcc").fadeIn().html("请填写确认处方信息左眼轴位/A！");
	   cItem(jtcindex)
	   return false;
	   }else if(glattr['r_eye_c']!="" && $(".c_r_eye_c").val()==""){
	   	   $(".confirm_bcc").fadeIn().html("请填写确认处方信息右眼柱镜/C！");
	   cItem(jtcindex);
return false;
	   
	   }else if($(".c_r_eye_c").val()!="" && $(".c_r_eye_a").val()==""){
	   
	      $(".confirm_bcc").fadeIn().html("请填写确认处方信息右眼轴位/A！");
	   cItem(jtcindex)
	   return false;
	   }else{
	  
	   if($(".c_l_eye_s").find("option:selected").text().Trim()!=glattr['l_eye_s']){
	   $(".confirm_bcc").fadeIn().html("处方信息左眼球镜/S,值不匹配！");
	    cItem(jtcindex);
	    return false;
	   }
	
	    if(glattr['l_eye_c']!=""){
	   	   if($(".c_l_eye_c").find("option:selected").text().Trim()!=glattr['l_eye_c'] ){
	   $(".confirm_bcc").fadeIn().html("处方信息左眼柱镜/C,值不匹配！");
	    cItem(jtcindex);
		 return false;
	   
	   }
	 
	   if( $(".c_l_eye_a").find("option:selected").text().Trim()!=glattr['l_eye_a'] ){
	   $(".confirm_bcc").fadeIn().html("处方信息左眼轴位/A,值不匹配！");
	    cItem(jtcindex);
		 return false;
	   
	   }
	   }
	   
	     if($(".c_l_eye_t").find("option:selected").text().Trim()!=glattr['l_eye_t'] ){
	   $(".confirm_bcc").fadeIn().html("处方信息左眼瞳距,值不匹配！");
	    cItem(jtcindex);
		 return false;
	   
	   }
	   
	   
	 
	   	   if($(".c_r_eye_s").find("option:selected").text().Trim()!=glattr['r_eye_s']){
	   $(".confirm_bcc").fadeIn().html("处方信息右眼球镜/S,值不匹配！");
	    cItem(jtcindex);
	    return false;
	   }
	   
	   	   if(glattr['r_eye_c']!="" ){
		   if($(".c_r_eye_c").find("option:selected").text().Trim()!=glattr['r_eye_c']){
	   $(".confirm_bcc").fadeIn().html("处方信息右眼柱镜/C,值不匹配！");
	    cItem(jtcindex);
		 return false;
		 
		 }
		 
		 if($(".c_r_eye_a").find("option:selected").text().Trim()!=glattr['r_eye_a']){
		 
		  $(".confirm_bcc").fadeIn().html("处方信息右眼轴位/A,值不匹配！");
	    cItem(jtcindex);
		 return false;
		 
		 }
	   
	   }
	   

	   
	     if($(".c_r_eye_t").find("option:selected").text().Trim()!=glattr['r_eye_t'] ){
	   $(".confirm_bcc").fadeIn().html("处方信息右眼瞳距,值不匹配！");
	    cItem(jtcindex);
		 return false;
	   
	   }
	

	 }
	


}


 $(".infoimg").click(function(e){
      $(".viewport").height($(window).height()-$(".foot_gai").outerHeight()-$(".header").outerHeight());
	  $(".dingz_contain").hide();
	  $('.miao_dan').fadeIn(300,function(){
	  		  $(".miao_dan").tinyscrollbar_update();
	     
	  
	  });
	  
	  e.stopPropagation();

 });
 
 
 $(".infoimg").hover(function(){
 
      $("span",$(this)).stop().animate({opacity:1},200);
 },function(){
  $("span",$(this)).stop().animate({opacity:0},200);
 
 });
 
 
  var sharestate = true;
    
	function shareFun(obj,sharetype){
	 
          $(".sharejiaz").removeClass("loadding_sharea").not($(".sharejiaz",obj)).hide();
 		  $(".anbox").css("visibility","hidden");
		  $(".anniu").css("visibility","hidden");
	    if (sharestate) {
		   				
		    $(".sharejiaz",obj).addClass("loadding_sharea").fadeIn();
            var postDate = {};
            postDate['glattr'] = glattr;
            postDate['glattrid'] = glattrid;
            postDate['act'] = "dingzhi_share";
            postDate['jp_type'] = jp_type;

            $.ajax({
                type: 'POST',
                url: 'dingzhi.php',
                data: postDate,
                dataType: "json",
                beforeSend: function(XMLHttpRequest) {
                 
                    sharestate = false;

                },
                success: function(data) {
                    $(".sharejiaz",obj).removeClass("loadding_sharea");

                    switch (data.err) {

                    case "id_error":
                        sharestate = true;
                        $(".ding_baocuo").show().html("非系统参数！");
                        break;
                    case "save_sucess":
                        $(".ding_baocuo").hide().html("");
                          sharestate = true;
                          
						 		  $(".anbox",obj).css("visibility","visible");
						  $(".anniu",obj).css("visibility","visible");
						  if(sharetype=="qzone"){
						    qqzone(obj,data.urls,data.share_content,data.share_title,data.thumb_c);
						  }else if(sharetype=="qqweibo"){
						  
						 postToWb(obj,data.share_title+" "+data.share_content,data.urls,data.thumb_c);
						  }else if(sharetype=="sinaweibo"){
						weiboShare(obj,data.urls,data.share_title,data.share_content,data.thumb_c);
						  
						  }
						
                        break;
                    case "save_fail":
                 
                        sharestate = true;
                        $(".ding_baocuo").show().html("分享失败！");
						  $(".sharejiaz",obj).hide();
                        break;
                    case "jk_id_error":
						  $(".sharejiaz",obj).hide();
                        sharestate = false;
                        $(".ding_baocuo").show().html("非法镜框值!");
                        break;
                    case "qk_id_error":
                        sharestate = true;
						  $(".sharejiaz",obj).hide();
                        $(".ding_baocuo").show().html("无效的前框饰布值!");
                        break;
                    case "sj_id_error":
						  $(".sharejiaz",obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("无效的前框饰件值!");
                        break;
                    case "jp_id_error":
						  $(".sharejiaz",obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("无效的镜片值!");
                        break;
                    case "jt_id_error":
						  $(".sharejiaz",obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("无效的镜腿值!");
                        break;
						       case "jtt_id_error":
						  $(".sharejiaz",obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("无效的脚套值!");
                        break;
                    case "size_error":
						  $(".sharejiaz",obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("无效的尺寸值!");
                        break;
                    case "size_id_error":
						  $(".sharejiaz",obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("无效的尺寸值!");
                        break;
                    case "jp_type_error":
						  $(".sharejiaz",obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("无效的镜片类型值!");
                        break;
                    case "jp_error":
						  $(".sharejiaz",obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("无效的镜片值!");
                        break;
                    case "jh_error":
						  $(".sharejiaz",obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("无效的镜盒值!");
                        break;
						
					  case "w_text_length_error":
                       $(".sharejiaz",obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("镜腿外侧镌刻超过10个字符!");
                        break;
						       case "n_text_length_error":
                       $(".sharejiaz",obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("镜腿内侧镌刻超过10个字符!");
                        break;
								       case "jh_one_text_length_error":
                        $(".sharejiaz",obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("镜盒线1镌刻超过18个字符!");
                        break;
						
					   case "jh_two_text_length_error":
                        $(".sharejiaz",obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("镜盒线2镌刻超过18个字符!");
                        break;
                    case "cz_error":
						  $(".sharejiaz",obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("无效的镜盒材质值!");
                        break;
                    case "rec_id_error":
						  $(".sharejiaz",obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("无效的订单值!");
                        break;
                    case "rec_id_error":
						  $(".sharejiaz",obj).hide();
                        sharestate = false;
                        $(".ding_baocuo").show().html("无效的订单值!");
                        break;
						
				   case "l_eye_a_error":
						  $(".sharejiaz",obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("请选择左眼轴位!");
				   break
				   	   case "r_eye_a_error":
						  $(".sharejiaz",obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("请选择右眼轴位!");
				   break
						  $(".sharejiaz",obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("请选择左眼瞳距!");

				   break
				   	   case "r_eye_t_error":
						  $(".sharejiaz",obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("请选择右眼瞳距!");
				
				   break
				   	   case "l_union_sc_error":
						  $(".sharejiaz",obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("左眼球镜加左眼柱镜超过联合光度!");
				    
				   break
				    	   case "r_union_sc_error":
						  $(".sharejiaz",obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("右眼球镜加右眼柱镜超过联合光度!");
				
				   break
				    	   case "max_pd_error":
						  $(".sharejiaz",obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("两眼瞳距值大于最大瞳距值!");
				   break
				    	   case "min_pd_error":
						  $(".sharejiaz",obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("两眼瞳距值小于最小瞳距值!");
				   break
                    default:
                        sharestate = false;
						  $(".sharejiaz",obj).hide();
                        $(".ding_baocuo").show().html("系统错误，刷新后重试!");

                    }

                }
            });
        }
	
	
	}
	

 
   function qqzone(objs,href,des,title,site,pics){

   var p = {
url:href,
summary:'',/*分享摘要(可选)*/
title:'',/*分享标题(可选)*/
pics:'' /*分享图片的路径(可选)*/
};
var s = [];
for(var i in p){
s.push(i + '=' + encodeURIComponent(p[i]||''));
}

var qzoneurl='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?,'+s.join('&')+',';

 $(".share_link a",objs).attr("href",qzoneurl);
  $(".copy_link a",objs).attr("share_link",href);
  }
  
  $(".qzone").click(function(e){
  
   
    shareFun($(this),"qzone");
	e.stopPropagation();

  });
  
  
  
  function postToWb(obj,title,url,pic){
 
var _t = encodeURI(title);
 
var _url = encodeURI(url);
 
var _appkey = encodeURI("801567562");
 
var _pic = encodeURI(pic);
 
var _u = 'http://v.t.qq.com/share/share.php?title='+_t+'&url='+_url+'&appkey='+_appkey+'&pic='+_pic;
 $(".share_link a",obj).attr("href",_u);
 $(".copy_link a",obj).attr("share_link",url);

}

$(".qqweibo").click(function(e){
 shareFun($(this),"qqweibo");
  e.stopPropagation();
});


function weiboShare(obj,url,title,des,pic){
     var wb_shareBtn = document.getElementById("shareBtn")
          wb_url = url,
          wb_appkey = "2347999613",
          wb_title =title+''+des,
          wb_pic = pic,
         wb_language = "zh_cn";
         var weibourl="http://service.weibo.com/share/share.php?url="+wb_url+"&appkey="+wb_appkey+"&title="+wb_title+"&pic="+wb_pic+"&language="+wb_language+"";
		 $(".share_link a",obj).attr("href",weibourl);
 $(".copy_link a",obj).attr("share_link",url);
}

$(".sinaweibo").click(function(e){
  shareFun($(this),"sinaweibo");
   e.stopPropagation();
});


 
$(".dingz_guan4").click(function(e){
   $(".sharejiaz").fadeOut();
   e.stopPropagation();
});

$(".share_link a").click(function(e){
 e.stopPropagation();
});

$(".copy_link a").click(function(e){
 e.stopPropagation();
});


    var lineone = "";
    $(".jh_line_one").keyup(function() {

        lineone = $(this).val().replace(/[^\w\.\/]/ig, '');
        var slens = lineone.getStringLen();

        if (slens >= 18) {

            var strs = SetSub(lineone, 18);

            $(this).val(strs);
            $(this).next().find("span").html(0);

        } else {
            var strs = lineone;
            $(this).val(lineone);
            $(this).next().find("span").html(18 - slens);
        }
        glattr['jh_line_one'] = strs;
     $(".line_one").html(strs);
    });
	
	
    $(".jh_line_one").focusout(function() {
        lineone = $(this).val().replace(/[^\w\.\/]/ig, '');

        var slens = lineone.getStringLen();

        if (slens >= 18) {

            var strs = SetSub(lineone, 18);

            $(this).val(strs);
            $(this).next().find("span").html(0);

        } else {
            var strs = lineone;
            $(this).val(lineone);
            $(this).next().find("span").html(18 - slens);
        }
        glattr['jh_line_one'] = strs;
    });
	
	
	    var linetwo = "";
    $(".jh_line_two").keyup(function() {

        linetwo = $(this).val().replace(/[^\w\.\/]/ig, '');
        var slens = linetwo.getStringLen();

        if (slens >= 18) {

            var strs = SetSub(linetwo, 18);

            $(this).val(strs);
            $(this).next().find("span").html(0);

        } else {
            var strs = linetwo;
            $(this).val(linetwo);
            $(this).next().find("span").html(18 - slens);
        }
        glattr['jh_line_two'] = strs;
        $(".line_two").html(strs);
    });
	
	
    $(".jh_line_two").focusout(function() {
        linetwo = $(this).val().replace(/[^\w\.\/]/ig, '');

        var slens = linetwo.getStringLen();

        if (slens >= 18) {

            var strs = SetSub(linetwo, 18);

            $(this).val(strs);
            $(this).next().find("span").html(0);

        } else {
            var strs = linetwo;
            $(this).val(linetwo);
            $(this).next().find("span").html(18 - slens);
        }
        glattr['jh_line_two'] = strs;
    });
  
 $(".lubox ul").width(moveWidth*lubolen);
 
 function prev_btn(){
  mlen++;
  selectstate();
  if(mlen>lubolen-1){
    mlen=lubolen-1;
	
    return false;
  }

  $(".lubox ul").animate({left:-moveWidth*mlen},500);
}

var lunboxH=$(".lunbox").height();
$(".desinger").click(function(){
  if($(this).hasClass("hasOff")){
  $(".upbox").addClass("select");
  $(this).removeClass("hasOff").addClass("hasOn");
 $(".tjlun").stop().animate({height:lunboxH},500);
 }else if($(this).hasClass("hasOn")){
 
   $(".upbox").removeClass("select");
  $(this).removeClass("hasOn").addClass("hasOff");
 $(".tjlun").stop().animate({height:0},500);
 }

});

	    $("#owl-dingzhi").owlCarousel({
     
    autoPlay: 5000, 
      stopOnHover : false,
navigation:true,
    items : 5,
	prevClass:$(".tjpre"),
	nextClass:$(".tjnext"),
	autoPlay:false,
    itemsDesktop : [1199,3],
    itemsDesktopSmall : [979,3]
     
    });

selectstate();
function selectstate(){

  

  if(mlen<=0){
    $(".d_m_pre").addClass("select");
   $(".d_m_next").removeClass("select");
  }else if(mlen>=lubolen-1){
    $(".d_m_next").addClass("select");
    $(".d_m_pre").removeClass("select");
  }else if(mlen<lubolen-1 && mlen>0){
   $(".d_m_pre").removeClass("select");
   $(".d_m_next").removeClass("select");
   }

}



function next_btn(){

  mlen--;
   selectstate();
  if(mlen<0){
  mlen=0;
  return false;
  }
  $(".lubox ul").animate({left:-moveWidth*mlen},500);
  

}

function ChScroll(cis){
    $("#scrollbar_l .scrollbar ").hide();
    $(".dingz_"+cis).tinyscrollbar_update(); 
				   if(!$("#scrollbar_l .scrollbar ").eq(cis).hasClass("disable")){
		             $("#scrollbar_l .scrollbar").eq(cis).show();
		            }else{
					    $("#scrollbar_l .scrollbar").eq(cis).hide();
					}


}
 $(".d_m_pre").click(function(){
  next_btn();

 });
	
 $(".d_m_next").click(function(){
  prev_btn();

 });
 
 $(".dingz_guan").click(function(){

 $(".dingz_contain").fadeIn();
  $('.miao_dan').hide();
});





});



function getKuc(id,datas, imagearray, attrclass) {
    imge = imagearray;
    if (id > 0) {

        $.ajax({
            type: 'POST',
            url: 'dingzhi.php',
            data: datas,
            dataType: "json",
            beforeSend: function(XMLHttpRequest) {

},
            success: function(data) {

             //  if(data.delivery_time>$(".sf_day").val()){
                $(".ding_tishi").html(data.maxstr);

              //  }
			  if(typeof data.union_sc!="undefined"){
			  union_sc= data.union_sc;
			  }
                if(typeof data.info!="undefined"){
				 if(typeof data.info.l_eye_s !="undefined"){
				  $(".l_eye_s option").eq(0).siblings().remove();
				  $(".l_eye_s option").eq(0).after(data.info.l_eye_s.html);
				  $(".c_l_eye_s option").eq(0).siblings().remove();
				  $(".c_l_eye_s option").eq(0).after(data.info.l_eye_s.html);
				  $(".c_l_eye_s option").removeAttr("selected");
				 }else{
				    $(".c_l_eye_s option").eq(0).siblings().remove();
				    $(".l_eye_s option").eq(0).siblings().remove();
				 }
					 if(typeof data.info.l_eye_c !="undefined"){
				  $(".l_eye_c option").eq(0).siblings().remove();
				  $(".l_eye_c option").eq(0).after(data.info.l_eye_c.html);
				  
				  	  $(".c_l_eye_c option").eq(0).siblings().remove();
				  $(".c_l_eye_c option").eq(0).after(data.info.l_eye_c.html);
				  $(".c_l_eye_c option").removeAttr("selected");
				 }else{
				    $(".c_l_eye_c option").eq(0).siblings().remove();
				    $(".l_eye_c option").eq(0).siblings().remove();
				 }
				 
				 if(typeof data.info.l_eye_t !="undefined"){
				   $(".l_eye_t option").eq(0).siblings().remove();
				  $(".l_eye_t option").eq(0).after(data.info.l_eye_t.html);
				  
				   $(".c_l_eye_t option").eq(0).siblings().remove();
				  $(".c_l_eye_t option").eq(0).after(data.info.l_eye_t.html);
			  $(".c_l_eye_t option").removeAttr("selected");
				 }else{
				    $(".c_l_eye_t option").eq(0).siblings().remove();
				    $(".l_eye_t option").eq(0).siblings().remove();
				 }
			
		     if(typeof data.info.r_eye_s !="undefined"){
				  $(".r_eye_s option").eq(0).siblings().remove();
				  $(".r_eye_s option").eq(0).after(data.info.r_eye_s.html);
				  $(".c_r_eye_s option").eq(0).siblings().remove();
				  $(".c_r_eye_s option").eq(0).after(data.info.l_eye_t.html);
				  $(".c_r_eye_s option").removeAttr("selected");
				 }else{
				    $(".c_r_eye_s option").eq(0).siblings().remove();
				    $(".r_eye_s option").eq(0).siblings().remove();
				 }
				  	 if(typeof data.info.r_eye_c !="undefined"){
				 $(".r_eye_c option").eq(0).siblings().remove();
				  $(".r_eye_c option").eq(0).after(data.info.r_eye_c.html);
						 $(".c_r_eye_c option").eq(0).siblings().remove();
				  $(".c_r_eye_c option").eq(0).after(data.info.r_eye_c.html);
				    $(".c_r_eye_s option").removeAttr("selected");
				 }else{
				  $(".c_r_eye_c option").eq(0).siblings().remove();
				 	 $(".r_eye_c option").eq(0).siblings().remove();
				 }
				 
				 	  	 if(typeof data.info.r_eye_t !="undefined"){
						 	 			    $(".r_eye_t option").eq(0).siblings().remove();
				  $(".r_eye_t option").eq(0).after(data.info.r_eye_t.html);
									 $(".c_r_eye_t option").eq(0).siblings().remove();
				  $(".c_r_eye_t option").eq(0).after(data.info.r_eye_c.html);
				    $(".c_r_eye_t option").removeAttr("selected");	
				 }else{
				     $(".c_r_eye_t option").eq(0).siblings().remove();
				    $(".r_eye_t option").eq(0).siblings().remove();
				 }

				}

                arrleng = imge.length;

                for (var i = 0; i < imge.length; i++) {
                    if (imge[i].Trim() !== "") {
                        bl_loading(imge[i], attrclass[i], i % 2);
                    }
                }

            }
        });

    }

}

function getKucBox(id,datas) {
    if (id > 0) {

        $.ajax({
            type: 'POST',
            url: 'dingzhi.php',
            data: datas,
            dataType: "json",
            beforeSend: function(XMLHttpRequest) {

},
            success: function(data) {
			  if(data.delivery_time>$(".sf_day").val()){
                $(".ding_tishi").html(data.maxstr);

               }
              
            }
        });

    }

}
function itemAttr(obj) {

    var postRundate = {};
    postRundate['act'] = "check_number";
    postRundate['pid'] = glattrid['jj_id'];

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
        } else if ($(obj).hasClass("bl_mbox_cz")) {
		
		   var jkboxindex=$(".jh_box_cz").index($(obj).parent().parent().parent().parent().parent());
		    	 $(".jh_xk").attr("style","color:"+$(obj).attr("font_color")+";");
		    glattr['jh'] = $(".bl_box_style").eq(jkboxindex).attr("attr_title");
            glattr['jh_id'] = $(".bl_box_style").eq(jkboxindex).attr("attr_id");
			  kcarray['jh_id'] =  $(".bl_box_style").attr("attr_id");
            glattr['cz'] = $(obj).attr("attr_title");
	
            glattr['cz_id'] = $(obj).attr("attr_id");
			kcarray['cz_id'] = $(obj).attr("attr_id");
            boxLoading($(obj), "jh_c");
			if($(obj).attr("attr_id")>0){
			 postRundate['type'] == "jh";
			 postRundate['id'] = kcarray;
			 getKucBox($(obj).attr("attr_id"),postRundate);
			}
		   
		
        }
        $("img", $(".bl_mbox_cz")).removeClass("select").not($("img", $(obj)));

        $("img", $(obj)).addClass("select");
        var box_img = $(obj).attr("box_img");

    } else {
        $("img", $(obj)).addClass("select");
        $(".d_xunh").eq(liindex).find("img").not($("img", $(obj))).removeClass("select");
        var imgarray = [];
        var classarray = [];
        var blclass = $(obj).attr("class");

        $(".miao_load").show();
		       if ($(obj).hasClass("jk")) {
        glprice[blclass + "_price"] = accAdd(parseInt($(obj).attr("attr_p")),jkprice);
		}else{
		  glprice[blclass + "_price"] = parseInt($(obj).attr("attr_p"));
		}
        glattrid[blclass + "_id"] = $(obj).attr("attr_id");
		 kcarray[blclass+'_id'] = $(obj).attr("attr_id");
        if ($(obj).hasClass("jt") || $(obj).hasClass("jtt")) {
		 $(".jt_wz,.jt_wz1").attr("style","color:"+$(obj).attr("font_color")+";");
            postRundate['type'] ==$(obj).attr("class");
            count = 0;
            classarray[0] = blclass;
            imgarray[0] = $(obj).attr("img_l");

        }else {
            if ($(obj).hasClass("jk")) {
                postRundate['jpid'] = glattrid['jp_id'];
            }
		   if ($(obj).hasClass("jp")) {
             jp_type = $(obj).attr("jp_type");
			      if (jp_type == 1) {

            $(".js_show").show();
        } else {
            $(".js_show").hide();
        }
			    kccfinfo['l_eye_s']=glattr['l_eye_s'];
		kccfinfo['l_eye_c']=glattr['l_eye_c'];
		kccfinfo['l_eye_a']=glattr['l_eye_a'];
		kccfinfo['l_eye_t']=glattr['l_eye_t'];
		kccfinfo['r_eye_s']=glattr['r_eye_s'];
		kccfinfo['r_eye_c']=glattr['r_eye_c'];
		kccfinfo['r_eye_a']=glattr['r_eye_a'];
		kccfinfo['r_eye_t']=glattr['r_eye_t'];
	    postRundate['cf'] = kccfinfo;
            }
			
			
            postRundate['type'] = blclass;
            count = 0;
            imgarray[0] = $(obj).attr("img_c");
            classarray[0] = blclass;
            imgarray[1] = $(obj).attr("img_l");
            classarray[1] = blclass;

        }
        if ($(obj).attr("attr_id") > 0) {
            postRundate['id'] = kcarray;

            getKuc($(obj).attr("attr_id"),postRundate, imgarray, classarray);
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

function bl_loading(objsrc, blclass, bisf) {
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
                showContentImage(blclass, image.src, count, bisf);
            }

        } else {

            count++;
            showContentImage(blclass, image.src, count, bisf);
            // showContentImage(obj);
        }
    } else {

        image.onload = function() {
            if (image.complete == true) {

                //showContentImage(blclass,image.src);
                count++;
                showContentImage(blclass, image.src, count, bisf);
                //   showContentImage(obj);
            }
        }

        image.onerror = function() {

            //obj.parent().addClass("img_loading_error");
            // $(".img_loading_error").height("250px")
        }

    }

}
var jpcls = "";
function showContentImage(blclass, image, count, bisf) {
	  
    if (blclass == "jt") {
        $(".bl_" + blclass, ".qingdan1").eq(0).find("img").remove();
		$(".bl_" + blclass, ".qingdan1").eq(0).append('<img src="' + image + '" style="display:none" />');
        $(".bl_" + blclass).eq(0).find("img").remove();
		$(".bl_" + blclass).eq(0).append('<img src="' + image + '" style="display:none" />');
    } else {
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

function kcinit(){

   kcarray["jk_id"]=glattrid['jk_id'];
      kcarray["qk_id"]=glattrid['qk_id'];
	     kcarray["sj_id"]=glattrid['sj_id'];
		  kcarray["jt_id"]=glattrid['jt_id'];
		 kcarray["jp_id"]=glattrid['jp_id'];
   kcarray["jh_id"]= glattr['jh_id'];
   kcarray["cz_id"]=glattr['cz_id'];

}

function showLoTip(obj,msg){
   
   $(".miao_yin_t").html(""+msg);
   $(".miao_yin").css({top:obj.offset().top-obj.outerHeight()-30,left:obj.offset().left-obj.width()/2}).fadeIn();
 
}

function hideLoTip(obj){

   $(".miao_yin_t").html("");
   $(".miao_yin").css({top:0,left:0}).hide();

}



function accAdd(arg1, arg2) {
    var r1, r2, m, c;
	
	if(typeof arg1=="undefined" || isNaN(arg1) || arg1==""){
	
		arg1=0;
		}
		
	if(typeof arg2=="undefined" || isNaN(arg2) || arg2==""){
		arg2=0;
		}
    try {
	
        r1 = arg1.toString().split(".")[1].length;
	
    }
    catch (e) {
        r1 = 0;
    }
    try {
	   
        r2 = arg2.toString().split(".")[1].length;
	
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
		 
            arg1 = Number(arg1.toString().replace(".", ""));
		
			
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
		
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
	
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}

function oCopy(obj){
    var couponResultHtml=$(obj).attr("share_link");
if (window.clipboardData) {
        window.clipboardData.clearData();  
        var couponResult = window.clipboardData.setData("couponResult",  
                couponResultHtml);  
        if (couponResult) {  
            alert("拷贝成功！");  
        } else {  
            alert("拷贝失败！");  
        }  
    } else if (navigator.userAgent.indexOf("Opera") != -1) {  
        window.location = couponResultHtml;  
    } else if (window.netscape) {  
        try {  
            netscape.security.PrivilegeManager  
                    .enablePrivilege("UniversalXPConnect");  
        } catch (e) {  
            alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");  
        }  
        var clip = Components.classes['@mozilla.org/widget/clipboard;1']  
                .createInstance(Components.interfaces.nsIClipboard);  
        if (!clip)  
            return;  
        var trans = Components.classes['@mozilla.org/widget/transferable;1']  
                .createInstance(Components.interfaces.nsITransferable);  
        if (!trans)  
            return;  
        trans.addDataFlavor('text/unicode');  
        var str = new Object();  
        var len = new Object();  
        var str = Components.classes["@mozilla.org/supports-string;1"]  
                .createInstance(Components.interfaces.nsISupportsString);  
        var copytext = couponResultHtml;  
        str.data = copytext;  
        trans.setTransferData("text/unicode", str, copytext.length * 2);  
        var clipid = Components.interfaces.nsIClipboard;  
        if (!clip)  
            return false;  
        clip.setData(trans, null, clipid.kGlobalClipboard);  
    } 
}

Number.prototype.add = function (arg) {
    return accAdd(arg, this);
};