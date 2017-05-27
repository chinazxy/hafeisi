
var price = {},
count = 0,
boxcount = 0,
oindex = -1,
glattr = [],
glprice = [],
glattrid = [],
kcarray = {},
kccfinfo = {},
ompboxi = -1,
jp_type = 0;
var arrleng = 0;
var oldindex = -1;
var liindex = 0;
var pdvals = 0;
var clts = 0;
var clrs = 0;
var navlengs = 0;
var totaldetail = "";
var cfss = 1;
  var mySwiper = null;
$(function() {
	
    var itemlen=$(".citem").length;
	
var winw = $(window).width();
 
var s_con1len=$(".snavcs").length*60+60+($(".snavcs").length-1)*1;

$(".dingzhi_slb").height(s_con1len);

$(".dingzhi_con").height(s_con1len);



	   $(".cfcheckc").click(function(e){
		  
		   if($("input",$(this)).val()==0){
			   $("input",$(this)).val(1);
			   $("span",$(this)).addClass("select");
		   }else{
			      $("input",$(this)).val(0);
			   $("span",$(this)).removeClass("select");
			   
		   }
		   e.stopPropagation();
		   e.preventDefault();
		   
	   });




$(".s_an_con").height(s_con1len-61);

$(".dibu").css("marginTop",s_con1len);

  var imgNum = 0;
    var images = [];
    function preLoadImg() {
        var imgs = document.images;
        for (var i = 0; i < imgs.length; i++) {
            images.push(imgs[i].src)
        }
        var browser = navigator.appName;
        if (browser == "Microsoft Internet Explorer") {
            var b_version = navigator.appVersion;
            var version = b_version.split(";");
            var trim_Version = version[1].replace(/[ ]/g, "");
            if (trim_Version != "MSIE5.0" && trim_Version != "MSIE6.0" && trim_Version != "MSIE7.0" && trim_Version != "MSIE8.0") {
                var cssImages = getallBgimages();
                for (var j = 0; j < cssImages.length; j++) {
                    images.push(cssImages[j])
                }
            }
        } else {
            var cssImages = getallBgimages();
            for (var j = 0; j < cssImages.length; j++) {
                images.push(cssImages[j])
            }
        }
        $.imgpreload(images, {
            each: function() {
                var status = $(this).data('loaded') ? 'success': 'error';
                if (status == "success") {
                    var v = (parseFloat(++imgNum) / images.length).toFixed(2);
                    $(".tebox span").html(Math.round(v * 100))
                }
            },
            all: function() {
				
				setTimeout(function(){
	$(".sb_h").fadeOut();
	
},5000);
                $(".tebox span").html("100");
				 
                 $(".jiaz").fadeOut(500,
                function() {
					$("html").css("height","auto");
                    $(".sb_w").fadeIn(200,function(){
						    mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        slidesPerView: 1,
        speed: 800,
        mousewheelControl: false,
        paginationClickable: true,

        moveStartThreshold: 100,
        loop: false,
		onInit:function(){
			
			var sinis=$(".s_an_cbox").eq(0).height();
			$(".s_jpc").height(sinis-$(".s_wpg").height()-parseInt($(".s_wpg").css("marginTop")));
	 
		},
        onSlideNext: function(swiper) {
			
		    var vactiveIndex = swiper.activeIndex;

      	if(vactiveIndex==0){
				$(".d_fx .d_box2").removeClass("unable");
				$(".d_fx .d_box1").addClass("unable");
			}else{
			$(".d_fx .d_box1").removeClass("unable");
				
			}
			if(vactiveIndex==itemlen-1){
				$(".d_fx .d_box2").addClass("unable");
					$(".d_fx .d_box1").removeClass("unable");
			}else{
					$(".d_fx .d_box2").removeClass("unable");
			}
            $(".sbdang").html(vactiveIndex+1);
            var shtmlt = $("span", $(".citem").eq(vactiveIndex)).html();
			liindex=vactiveIndex;
        if($(".citem").eq(vactiveIndex).hasClass("slide_c")){
			
			 $(".flex-control-nav li a").eq(1).trigger("click");
		}else{
			 $(".flex-control-nav li a").eq(0).trigger("click");
		}
            $(".choice").html(shtmlt);

        },
        onSlidePrev: function(swiper) {

            var vactiveIndex = swiper.activeIndex;
			
		  	if(vactiveIndex==0){
				$(".d_fx .d_box2").removeClass("unable");
				$(".d_fx .d_box1").addClass("unable");
			}else{
			$(".d_fx .d_box1").removeClass("unable");
				
			}
			if(vactiveIndex==itemlen-1){
				$(".d_fx .d_box2").addClass("unable");
					$(".d_fx .d_box1").removeClass("unable");
			}else{
					$(".d_fx .d_box2").removeClass("unable");
			}
			  $(".sbdang").html(vactiveIndex+1);
		     liindex=vactiveIndex;
             var shtmlt = $("span", $(".citem").eq(vactiveIndex)).html();
			  if($(".citem").eq(vactiveIndex).hasClass("slide_c")){
			
			 $(".flex-control-nav li a").eq(1).trigger("click");
		}else{
			 $(".flex-control-nav li a").eq(0).trigger("click");
		}
            $(".choice").html(shtmlt);

        }

    });
						
					});
                    //$('.d_contains').scrollCscrollbar({
                    //    axis: 'y'
                    //});
                }) 
            }
        })
    }

    function getallBgimages() {
        var url, B = [],
        A = document.getElementsByTagName('*');
        A = B.slice.call(A, 0, A.length);
        while (A.length) {
            url = document.deepCss(A.shift(), 'background-image');
            if (url) url = /url\(['"]?([^")]+)/.exec(url) || [];
            url = url[1];
            if (url && B.indexOf(url) == -1) B[B.length] = url
        }
        return B
    }
    document.deepCss = function(who, css) {
        if (!who || !who.style) return '';
        var sty = css.replace(/\-([a-z])/g,
        function(a, b) {
            return b.toUpperCase()
        });
        if (who.currentStyle) {
            return who.style[sty] || who.currentStyle[sty] || ''
        }
        var dv = document.defaultView || window;
        return who.style[sty] || dv.getComputedStyle(who, "").getPropertyValue(css) || ''
    }
    Array.prototype.indexOf = Array.prototype.indexOf ||
    function(what, index) {
        index = index || 0;
        var L = this.length;
        while (index < L) {
            if (this[index] === what) return index; ++index
        }
        return - 1
    }
    preLoadImg();
    if (gl_edit['jj_id'] > 0) {
        glattr = {
            "jk": gl_attr_edit["jk"],
            "qk": gl_attr_edit["qk"],
            "wj": gl_attr_edit["wj"],
            "sj": gl_attr_edit["sj"],
            "jp": gl_attr_edit["jp"],
            "jt": gl_attr_edit["jt"],
            "jtt": gl_attr_edit["jtt"],
           // "size": gl_attr_edit["size"],
           // "size_id": gl_attr_edit["size_id"],
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
            "pd_eye_t": accAdd(gl_attr_edit["l_eye_t"], gl_attr_edit["r_eye_t"]),
            "type_w": gl_attr_edit["type_w"],
            "type_n": gl_attr_edit["type_n"],
            "type_w_text": gl_attr_edit["type_w_text"],
            "type_n_text": gl_attr_edit["type_n_text"],
            "jh_line_two": gl_attr_edit["jh_line_two"],
            "jh_line_one": gl_attr_edit["jh_line_one"]
        };
        jp_type = gl_attr_edit["jp_type"];
       
    } else {

        glattr = {
            "jk": "",
            "qk": "",
            "wj": "",
            "sj": "",
            "jp": "",
            "jt": "",
            "jtt": "",
           // "size": $("a", $(".d_xuanan1").eq(0)).attr("attr_value"),
           // "size_id": $("a", $(".d_xuanan1").eq(0)).attr("attr_id"),
            "jh": "",
            "cz": "",
            "jh_id": "",
            "cz_id": "",
            "l_eye_s":gl_chufang_default['l_eye_s'],
            "l_eye_c":gl_chufang_default['l_eye_c'],
            "l_eye_a":gl_chufang_default['l_eye_a'],
            "l_eye_t":gl_chufang_default['l_eye_t'],
            "r_eye_s":gl_chufang_default['r_eye_s'],
            "r_eye_c":gl_chufang_default['r_eye_c'],
            "r_eye_a":gl_chufang_default['r_eye_a'],
            "r_eye_t":gl_chufang_default['r_eye_t'],
            "pd_eye_t":gl_chufang_default['pd_eye_t'],
            "type_w": 0,
            "type_n": 0,
            "type_w_text": "",
            "type_n_text": "",
            "jh_line_two": "",
            "jh_line_one": ""
        }
		
		var cfsta=true;
	
		
		if(gl_chufang_default['l_eye_s']!="" || gl_chufang_default['l_eye_c']!=""){
		
         var leval = accAdd(gl_chufang_default['l_eye_s'], gl_chufang_default['l_eye_c']);
		 
		// alert(gl_chufang_default['l_eye_s']+"::"+gl_chufang_default['l_eye_c']);
		 if (leval < union_sc) {
			 cfsta=false;
              showcf("*默认处方左眼球镜加左眼柱镜超过联合光度", union_sc, "qm_jg");
                      
          }else{
			  
			  cfsta=true;
		  } 
		  
		}
		  if(cfsta){
		if(gl_chufang_default['r_eye_s']!="" || gl_chufang_default['r_eye_c']!=""){
		
         var levalr = accAdd(gl_chufang_default['r_eye_s'], gl_chufang_default['r_eye_c']);
		 if (levalr < union_sc) {
			 cfsta=false;
              showcf("*默认处方右眼球镜加右眼柱镜不能超过联合光度", union_sc, "qm_jg");
                      
          }else{
			  
			  cfsta=true;
		  } 
		  
		}
		
		  }
		
		  if(cfsta){
			  
               if(gl_chufang_default['pd_eye_t']!=""){
				   
				     if (gl_chufang_default['pd_eye_t'] > tg_max) {
						 cfsta=false;
                        showcf("*默认处方两眼瞳距值大于最大瞳距值", tg_max, "qm_jg");
                     
                    } else if (gl_chufang_default['pd_eye_t'] < tg_min) {
						cfsta=false;
                        showcf("*默认处方两眼瞳距值小于最小瞳距值", tg_min, "qm_jg");
                       
                    }else{
						
						cfsta=true;	
					}
				   
			   }
		   
		
		
		  }
		
		
 
		
		
		
    }
    if (gl_edit['jj_id'] > 0) {
        glprice = {
            "jk_price": accAdd(gl_p_edit['jk_price'], jkprice),
            "qk_price": gl_p_edit['qk_price'],
            "wj_price": gl_p_edit['wj_price'],
            "sj_price": gl_p_edit['sj_price'],
            "jp_price": gl_p_edit['jp_price'],
            "jt_price": gl_p_edit['jt_price'],
            "jtt_price": gl_p_edit['jtt_price']
        }
    } else {
        glprice = {
            "jk_price": jkprice,
            "qk_price": 0,
            "wj_price": 0,
            "sj_price": 0,
            "jp_price": 0,
            "jt_price": 0,
            "jtt_price": 0
        }
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
        }
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
            "jtt_id": 0
        }
    }
	
	 function init() {
   
        $(".j_chuf2 option").removeAttr("selected");
        $(".jk").each(function(i) {
            if ($("img", $(this)).hasClass("select")) {
                glattrid['jk_id'] = $(this).attr("attr_id");
                glprice['jk_price'] = accAdd($(this).attr("attr_p"), jkprice);
                glattr['jk'] = $(this).attr("attr_title")
            }
        });
        if ($(".wj").length > 0) {
            $(".wj").each(function(i) {
                if ($("img", $(this)).hasClass("select")) {
                    glattrid['wj_id'] = $(this).attr("attr_id");
                    glprice['wj_price'] = $(this).attr("attr_p");
                    glattr['wj'] = $(this).attr("attr_title")
                }
            })
        }
        if ($(".qk").length > 0) {
            $(".qk").each(function(i) {
                if ($("img", $(this)).hasClass("select")) {
                    glattrid['qk_id'] = $(this).attr("attr_id");
                    glprice['qk_price'] = $(this).attr("attr_p");
                    glattr['qk'] = $(this).attr("attr_title")
                }
            })
        }
        if ($(".sj").length > 0) {
            $(".sj").each(function(i) {
                if ($("img", $(this)).hasClass("select")) {
                    glattrid['sj_id'] = $(this).attr("attr_id");
                    glprice['sj_price'] = $(this).attr("attr_p");
                    glattr['sj'] = $(this).attr("attr_title")
                }
            })
        }
        if ($(".jtt").length > 0) {
            $(".jtt").each(function(i) {
                if ($("img", $(this)).hasClass("select")) {
                    glattrid['jtt_id'] = $(this).attr("attr_id");
                    glprice['jtt_price'] = $(this).attr("attr_p");
                    glattr['jtt'] = $(this).attr("attr_title")
                }
            })
        }
        $(".jp").each(function(i) {
            if ($("img", $(this)).hasClass("select")) {
                glattrid['jp_id'] = $(this).attr("attr_id");
                glattrid['jp_type_id'] = $(this).attr("jp_id");
                glprice['jp_price'] = $(this).attr("attr_p");
                glattr['jp'] = $(this).attr("attr_title");
                jp_type = $(this).attr("jp_type");
				
                if (jp_type == 1) {
                    $(".js_show").show()
                } else {
                    $(".js_show").hide()
                }
            }
        });
        $(".jt").each(function(i) {
            if ($("img", $(this)).hasClass("select")) {
                glattrid['jt_id'] = $(this).attr("attr_id");
                glprice['jt_price'] = $(this).attr("attr_p");
                glattr['jt'] = $(this).attr("attr_title")
            }
        });
        $(".bl_m_pbox").each(function() {
            if ($("a", $(this)).hasClass("select")) {
                glattr['jh_id'] = $(this).attr("attr_id");
                glattr['jh'] = $(this).attr("attr_title")
            } else {
                glattr['jh'] = $(".bl_m_pbox").eq(0).attr("attr_title");
                glattr['jh_id'] = $(".bl_m_pbox").eq(0).attr("attr_id")
            }
        });
       // $(".d_xuanan1").each(function(i) {
            //if ($("a", $(this)).hasClass("select")) {
              //  glattr["size"] = $("a", $(this)).attr("attr_value");
              //  glattr["size_id"] = $("a", $(this)).attr("attr_id")
            //} else {
              //  glattr["size"] = $("a", $(".d_xuanan1").eq(0)).attr("attr_value");
              //  glattr["size_id"] = $("a", $(".d_xuanan1").eq(0)).attr("attr_id")
            //}
       // });
        $(".bl_mbox_cz").each(function() {
            if ($("img", $(this)).hasClass("select")) {
                $(".jh_xk").attr("style", "color:" + $(this).attr("font_color") + ";");
                glattr['cz_id'] = $(this).attr("attr_id");
                glattr['cz'] = $(this).attr("attr_title")
            } else {
                $(".jh_xk").attr("style", "color:" + $(".bl_mbox_cz").eq(0).attr("font_color") + ";");
                glattr['cz'] = $(".bl_mbox_cz").eq(0).attr("attr_title");
                glattr['cz_id'] = $(".bl_mbox_cz").eq(0).attr("attr_id")
            }
        })
    }
    if (!gl_edit['jj_id'] > 0) {
        init()
    }
    kcinit();

	
	   $('.flexslider').flexslider({
        animation: "fade",
        start: function(slider) {
            $('body').removeClass('loading')
        }
    });
	 deWrite();
	    //cItem(liindex);
	   function deWrite() {
        if (glattr['jk'].Trim() != "") {
            $(".jk_attr_v").html(glattr['jk'])
        }
        if (glattr['wj'].Trim() != "") {
            $(".wj_attr_v").html(glattr['wj'])
        }
        if (glattr['qk'].Trim() != "") {
            $(".qk_attr_v").html(glattr['qk'])
        }
        if (glattr['sj'].Trim() != "") {
            $(".sj_attr_v").html(glattr['sj'])
        }
        if (glattr['jp'].Trim() != "") {
            $(".jp_attr_v").html(glattr['jp'])
        }
        if (glattr['jt'].Trim() != "") {
            $(".jt_attr_v").html(glattr['jt'])
        }
        if (glattr['jtt'].Trim() != "") {
            $(".jtt_attr_v").html(glattr['jtt'])
        }
        //if (glattr['size'].Trim() != "") {
            //$(".size_attr_v").html(glattr['size'])
        //}
        if (glattr['cz'].Trim() != "") {
            $(".jhcz_attr_v").html(glattr['cz'])
        } else {
            $(".jhcz_attr_v").html("默认")
        }
        if (glattr['jh'].Trim() != "") {
            $(".jh_attr_v").html(glattr['jh'])
        } else {
            $(".jh_attr_v").html("默认")
        }
        if (parseInt(glprice['jk_price']) >= 0) {
            $(".jk_attr_p").html("¥" + glprice['jk_price'])
        }
        if (parseInt(glprice['qk_price']) >= 0) {
            $(".qk_attr_p").html("¥" + glprice['qk_price'])
        }
        if (parseInt(glprice['wj_price']) >= 0) {
            $(".wj_attr_p").html("¥" + glprice['wj_price'])
        }
        if (parseInt(glprice['sj_price']) >= 0) {
            $(".sj_attr_p").html("¥" + glprice['sj_price'])
        }
        if (parseInt(glprice['jp_price']) >= 0) {
            $(".jp_attr_p").html("¥" + glprice['jp_price'])
        }
        if (parseInt(glprice['jt_price']) >= 0) {
            $(".jt_attr_p").html("¥" + glprice['jt_price'])
        }
        if (parseInt(glprice['jtt_price']) >= 0) {
            $(".jtt_attr_p").html("¥" + glprice['jtt_price'])
        }
        if (parseInt(glattr['type_w']) >= 0) {
        
            if (glattr['type_w_text'].Trim() == "") {
                $(".kz_attr_w").empty().html("无")
            } else {
                $(".kz_attr_w").empty().html(glattr['type_w_text'])
            }
        }
       // if (parseInt(glattr['type_n']) >= 0) {
          //  switch (glattr['type_n']) {
          //  case 0:
             //   $(".nc_kz").empty().html("(左边)");
             //   break;
          //  case 1:
             //   $(".nc_kz").empty().html("(右边)");
              //  break;
           // case 2:
              //  $(".nc_kz").empty().html("(两边)");
              //  break
           // }
           // if (glattr['type_n_text'].Trim() == "") {
               // $(".kz_attr_n").empty().html("无")
           // } else {
               // $(".kz_attr_n").empty().html(glattr['type_n_text'])
           // }
       // }
		

        if (jp_type == 1) {
	
	    var pdvals = accAdd(glattr['l_eye_t'], glattr['r_eye_t']);
        var total = 0;
        totaldetail = "";
        $(".pd_eye_t").html(pdvals);
            var cfsta = false;
            var jplstr = "";
            var jprstr = "";

            if (glattr['l_eye_s'] != "") {
                jplstr += "球镜/S:" + glattr['l_eye_s'] + ";"
            } else {
                jplstr += "球镜/S:无;"
            }
            if (glattr['l_eye_c'] != "") {
                jplstr += "柱镜/C:" + glattr['l_eye_c'] + ";"
            } else {
                jplstr += "柱镜/C:无;"
            }
            if (glattr['l_eye_a'] != "" && glattr['l_eye_c'] != "") {
                jplstr += "轴位/A:" + glattr['l_eye_a'] + ";"
            } else {
                jplstr += "轴位/A:无;"
            }
            if (glattr['l_eye_t'] != "") {
                jplstr += "左眼瞳距:" + glattr['l_eye_t'] + ";"
            } else {
                jplstr += "左眼瞳距:无;"
            }
            if (glattr['r_eye_s'] != "") {
                jprstr += "球镜/S:" + glattr['r_eye_s'] + ";"
            } else {
                jprstr += "球镜/S:无;"
            }
            if (glattr['r_eye_c'] != "") {
                jprstr += "柱镜/C:" + glattr['r_eye_c'] + ";"
            } else {
                jprstr += "柱镜/C:无;"
            }
            if (glattr['r_eye_c'] != "" && glattr['r_eye_a'] != "") {
                jprstr += "轴位/A:" + glattr['r_eye_a'] + ";"
            } else {
                jprstr += "轴位/A:无;"
            }
            if (glattr['r_eye_t'] != "") {
                jprstr += "右眼瞳距:" + glattr['r_eye_t'] + ";"
            } else {
                jprstr += "右眼瞳距:无;"
            }
            if (glattr['pd_eye_t'] != "") {
                var jppdstr = "瞳距/PD:" + glattr['pd_eye_t'] + ";"
            } else {
                var jppdstr = "瞳距/PD:无;"
            }
			
			if(glattr['l_eye_s']=="" ||  glattr['l_eye_t']=="" || glattr['r_eye_s']=="" ||  glattr['r_eye_t']==""){
			  cfsta=false;
			}else{
			if (glattr['l_eye_c']!="" && glattr['l_eye_a']==""){
			 cfsta=false;
			}else if(glattr['r_eye_c']!="" && glattr['r_eye_a']==""){
			cfsta=false;
			}else{
			cfsta=true;
			}
			}
            if ($(".l_eye_s").find("option:selected").val() == "" && $(".l_eye_c").find("option:selected").val() == "" && ($(".l_eye_a").find("option:selected").val() == "" || typeof $(".l_eye_a").find("option:selected").val() == "undefined") && $(".l_eye_t").find("option:selected").val() == "" && $(".r_eye_s").find("option:selected").val() == "" && $(".r_eye_c").find("option:selected").val() == "" && ($(".r_eye_a").find("option:selected").val() == "" || typeof $(".l_eye_a").find("option:selected").val() == "undefined") && $(".r_eye_t").find("option:selected").val() == "") {
 showcf("请填写处方信息", "", "qm_jg");
            } else {
                if (cfsta === false) {
                    showcf("*处方信息不完整请补充", "", "qm_jg");
                } else {

                    var lenuval = accAdd(glattr['l_eye_s'], glattr['l_eye_c']);

                    if (lenuval < union_sc) {
                        showcf("*左眼球镜加左眼柱镜不能超过联合光度", union_sc, "qm_jg");
                        return false;
                    }
							 if ($(".l_eye_c").val()== "" && $(".l_eye_a").val() != "") {
                        showcf("*请填写左眼轴位", "", "qm_jg");
                        return false
                    }
					
		
                    var rightval = accAdd(glattr['r_eye_s'], glattr['r_eye_c']);
                    if (rightval < union_sc) {
                        showcf("*右眼球镜加右眼柱镜不能超过联合光度", union_sc, "qm_jg");
                        return false;
                    }
					
						 if ($(".r_eye_c").val()== "" && $(".r_eye_a").val() != "") {
                        showcf("*请填写右眼轴位", "", "qm_jg");
                        return false
                    }
                    if (glattr['pd_eye_t'] > tg_max) {
                        showcf("*两眼瞳距值大于最大瞳距值", tg_max, "qm_jg");
                        return false;
                    } else if (glattr['pd_eye_t'] < tg_min) {
                        showcf("*两眼瞳距值小于最小瞳距值", tg_min, "qm_jg");
                        return false;
                    } else {
                        $(".qm_jg").hide().html("")
                    }
					
				
				
					
					
                    if ($(".c_l_eye_s").val() == "" && $(".c_r_eye_s").val() == "" && $(".c_l_eye_t").val() == "" && $(".c_r_eye_t").val() == "") {
                        showcf("*请填写确认处方信息", "", "confirm_bcc");
                        return false
                    } else if (glattr['l_eye_c'] != "" && $(".c_l_eye_c").val() == "") {
                        showcf("*请填写确认处方信息左眼柱镜/C", "", "confirm_bcc");
                        return false;
                    } else if ($(".c_l_eye_c").val() != "" && $(".c_l_eye_a").val() == "") {
                        showcf("*请填写确认处方信息左眼轴位/A", "", "confirm_bcc");
                        return false;

                    } else if (glattr['r_eye_c'] != "" && $(".c_r_eye_c").val() == "") {

                        showcf("*请填写确认处方信息右眼柱镜/C", "", "confirm_bcc");
                        return false
                    } else if ($(".c_r_eye_c").val() != "" && $(".c_r_eye_a").val() == "") {
                        showcf("*请填写确认处方信息右眼轴位/A", "", "confirm_bcc");
                        return false

                    } else {

                        if ($(".c_l_eye_s").find("option:selected").text().Trim() != $(".l_eye_s").find("option:selected").text().Trim()) {
                            $(".confirm_bcc").css("visibility","visible").html("处方信息左眼球镜/S,值不匹配！");
                            showcf("*处方信息左眼球镜/S,值不匹配", "", "confirm_bcc");
                            return false
                        }
                        if (glattr['l_eye_c'] != "") {
                            if ($(".c_l_eye_c").find("option:selected").text().Trim() != glattr['l_eye_c']) {
                                showcf("*处方信息左眼柱镜/C,值不匹配", "", "confirm_bcc");
                                return false

                            }
                            if ($(".c_l_eye_a").find("option:selected").text().Trim() != glattr['l_eye_a']) {

                                showcf("*处方信息左眼轴位/A,值不匹配", "", "confirm_bcc");
                                return false
                            }
                        }
                        if ($(".c_l_eye_t").find("option:selected").text().Trim() != glattr['l_eye_t']) {

                            showcf("*处方信息左眼瞳距,值不匹配", "", "confirm_bcc");
                            return false
                        }
                        if ($(".c_r_eye_s").find("option:selected").text().Trim() != $(".r_eye_s").find("option:selected").text().Trim()) {

                            showcf("*处方信息右眼球镜/S,值不匹配", "", "confirm_bcc");
                            return false
                        }
                        if (glattr['r_eye_c'] != "") {
                            if ($(".c_r_eye_c").find("option:selected").text().Trim() != glattr['r_eye_c']) {
                                showcf("*处方信息右眼柱镜/C,值不匹配", "", "confirm_bcc");
                                return false
                            }
                            if ($(".c_r_eye_a").find("option:selected").text().Trim() != glattr['r_eye_a']) {
                                showcf("*处方信息右眼轴位/A,值不匹配", "", "confirm_bcc");

                                return false

                            }
                        }
                        if ($(".c_r_eye_t").find("option:selected").text().Trim() != glattr['r_eye_t']) {
                            showcf("*处方信息右眼瞳距,值不匹配", "", "confirm_bcc");

                            return false
                        }
                    }

                    $(".chufan_info").show();
                    $(".chufan_tishi").hide();
                    $(".js_show .jp_attr_l").next().empty().html(jplstr);
                    $(".js_show .jp_attr_ri").next().empty().html(jprstr);
                    $(".js_show .jp_attr_t").next().empty().html(jppdstr);

                }

            }

        }

        var pdvals = accAdd(glattr['l_eye_t'], glattr['r_eye_t']);
        var total = 0;
        totaldetail = "";
        $(".pd_eye_t").html(pdvals);
		$(".c_pd_eye_t").html(pdvals);
        $.each(glprice,
        function(n, value) {

            if (n == "jk_price") {
                if (typeof value != "undefined" && value != "" && value > 0) {
                    totaldetail += "镜框:" + value + " ";
                }
            } else if (n == "jp_price") {
                if (typeof value != "undefined" && value != "" && value > 0) {
                    totaldetail += "镜片:" + value + " ";
                }
            } else if (n == "jt_price") {
                if (typeof value != "undefined" && value != "" && value > 0) {
                    totaldetail += "特殊材质:" + value + " ";
                }

            }
            total += (typeof value == "undefined" || value == "") ? 0 : parseInt(value)
        });
        $(".total_detail").html(totaldetail);
        $(".total").html(total)
    }
    function initdinz() {

        var shtmlt = $("span", $(".citem").eq(0)).html();
        $(".choice").html(shtmlt);
    }

    function initCos() {

       winw = $(window).width();

        $(".dingzhi_nav").css("marginLeft", 0);
    
        var liwidw = winw * 0.17*0.93;
        var liwmaw = (winw*0.93-10) * 0.03;
        var selwidw = winw * 0.15-4;
	     var liwids=$(window).width()*0.93*0.17-10;
		 
		 var imghis=winw*1080/1920;
		 
		 $(".s_dz ").height(imghis+80);
		$(".sbsbff").height($(window).height());
	//	$(".jiaz").height($(window).height()-$(".ghd").height()-$(".foot_gai").height());

        $(".s_an_bico ul li").not($(".s_an_bico ul .select")).not($(".s_an_bico ul  #lfdmar")).css({
            width: liwidw,
            marginRight: liwmaw
        });
        $(".s_an_bico ul .select").css({
            width: selwidw,
            marginRight: liwmaw
        });
		
		  $(".s_an_bico ul .select img").css({
            width: liwids
        });
		
		 //$("img",$(obj)).width(liwids);
		
		   $(".s_an_bico ul #lfdmar").css({
            width: liwidw,
            marginRight: 0
        });
		
		 if (jp_type == 1) {
			$(".sjpc").stop().animate({
                left: [-1*winw*0.93, "easeInOutSine"]
            },
            300);
            $(".js_show").show()
        } else {
           	$(".sjpc").stop().animate({
                left: [0, "easeInOutSine"]
            },
            300);
        }
        $(".s_an_bico").width(winw * 0.93);
        $(".s_jpc,.jpcc").width(winw * 0.93);
		
	 

    }
    initCos();
    initdinz();
  


    $(".d_box1").on("click",
    function() {

         mySwiper.swipePrev();

    });

    $(".d_box2").on("click",
    function() {
    mySwiper.swipeNext();
     
    });
    $(".navcontral").addClass("navoff");
    $(".navcontral").click(function() {

        if ($(this).hasClass("navoff")) {
            $(this).addClass("navon").removeClass("navoff");
            $(".dingzhi_nav").stop().animate({
                marginLeft: [0, "easeInOutSine"]
            },
            300);

        } else {

            $(this).addClass("navoff").removeClass("navon");
            $(".dingzhi_nav").stop().animate({
                marginLeft: [ - winw, "easeInOutSine"]
            },
            300);

        }

    });
	
	
	$(".s_wbao  ul li").bind("click",function(){
		
		var bicotit=$(this).attr("attr_title");
		if($(this).hasClass("jp")){
			
			var atrps=$(this).attr("jp_type");
			if(atrps==0){
					$(".itemattr").html("平光"+bicotit);
			}else{
					$(".itemattr").html("近视"+bicotit);
			}
			
		
		}else{
			
				$(".itemattr").html(bicotit);
		}
	
		
	});
	
	    $(".snaclo").click(function() {

        

            $(".navcontral").addClass("navoff").removeClass("navon");
            $(".dingzhi_nav").stop().animate({
                marginLeft: [ - winw, "easeInOutSine"]
            },
            300);
 

    });

    $(".s_caca").click(function() {
        $(".sb_h").fadeOut();

    });
	
	  var scroolstate = false;
    function cItem(ci, obj) {

      

        oldindex = ci;
		  mySwiper.swipeTo(oldindex, 100, gofun());
		if(scroolstate==true){
		 
			
			var scrolvs=$(obj).position().top*($(obj).parent().height()/$(".s_jp_cbox").get(0).scrollHeight);
			$(".s_jp_cbox").stop().animate({scrollTop:scrolvs-38},100)
		 
		}
 
        deWrite()
    }

  $(".j_chuf2").focus(function(e) {
        $(this).prev().hide();
        e.stopPropagation()
    });
    $(".j_chuf2").live("change",
    function(e) {
	      
        if (jp_type == 1) {

            if ($(this).hasClass("l_eye_s")) {
                glattr['l_eye_s'] = !isNaN($(this).find("option:selected").text())?$(this).find("option:selected").text():"";
			    lenuval = accAdd(glattr['l_eye_s'], glattr['l_eye_c']);
				 if (lenuval < union_sc) {
                 $(".qm_jg").fadeIn().html("*左眼球镜加左眼柱镜不能超过联合光度" + union_sc);
				 glattr['l_eye_s']="";
				 $("option",$(this)).eq(0).attr("selected","selected");
				 }else{
				  $(".qm_jg").hide().html("");
				 }

            }
            if ($(this).hasClass("l_eye_c")) {
                glattr['l_eye_c'] = !isNaN($(this).find("option:selected").text())?$(this).find("option:selected").text():"";
			     lenuval = accAdd(glattr['l_eye_s'], glattr['l_eye_c']);
				 	 if (lenuval < union_sc) {
                      $(".qm_jg").fadeIn().html("*左眼球镜加左眼柱镜不能超过联合光度" + union_sc);
					  		 glattr['l_eye_c']="";
				 $("option",$(this)).eq(0).attr("selected","selected");
				 }else if ($(this).find("option:selected").val() != "" && $(".l_eye_a").find("option:selected").val() == "") {
                    $(".qm_jg").fadeIn().html("*请选择左眼轴位！");
                    $(".l_eye_a").removeAttr("disabled");
                } else if ($(this).find("option:selected").val() != "" && $(".l_eye_a").find("option:selected").val() != "") {
                    $(".l_eye_a").removeAttr("disabled");
                    $(".qm_jg").hide().html("");
                } else {
                    $(".qm_jg").hide().html("");
                    $(".l_eye_a option").eq(0).attr("selected", "selected");
                    $(".l_eye_a").attr("disabled", "disabled")
                }
			
            }
            if ($(this).hasClass("c_l_eye_c")) {
                if ($(this).find("option:selected").val() != "" && $(".c_l_eye_a").find("option:selected").val() == "") {
                    $(".qm_jg").fadeIn().html("*请选择左眼轴位！");
                    $(".c_l_eye_a").removeAttr("disabled")
                } else if ($(this).find("option:selected").val() != "" && $(".c_l_eye_a").find("option:selected").val() != "") {
                    $(".c_l_eye_a").removeAttr("disabled");
                    $(".confirm_bcc").hide().html("");
                } else {
                    $(".confirm_bcc").hide().html("");
                    $(".c_l_eye_a option").eq(0).attr("selected", "selected");
                    $(".c_l_eye_a").attr("disabled", "disabled")
                }
            }
            if ($(this).hasClass("l_eye_a")) {
                glattr['l_eye_a'] = !isNaN($(this).find("option:selected").text())?$(this).find("option:selected").text():"";
                if ($(".l_eye_c").find("option:selected").text().Trim() != "" && $(".l_eye_c").find("option:selected").val() != "" && $(".l_eye_a").find("option:selected").val() == "") {
                    $(".qm_jg").fadeIn().html("*请选择左眼轴位！");
                } else {
                    $(".qm_jg").hide().html("");
                }
            }
            if ($(this).hasClass("c_l_eye_a")) {
                if ($(".c_l_eye_c").find("option:selected").text().Trim() != "" && $(".c_l_eye_c").find("option:selected").val() != "" && $(".c_l_eye_a").find("option:selected").val() == "") {
                    $(".qm_jg").fadeIn().html("*请选择左眼轴位！");
                } else {
                    $(".qm_jg").hide().html("");
                }
            }
            if ($(this).hasClass("r_eye_s")) {
                glattr['r_eye_s'] = !isNaN($(this).find("option:selected").text())?$(this).find("option:selected").text():"";
				  rightval = accAdd(glattr['r_eye_s'], glattr['r_eye_c']);
                 if (rightval < union_sc) {
				  glattr['r_eye_s']='';
				  $("option",$(this)).eq(0).attr("selected","selected");
                 $(".qm_jg").fadeIn().html("*右眼球镜加右眼柱镜不能超过联合光度" + union_sc);
				  
                   }
            }
            if ($(this).hasClass("r_eye_c")) {
                glattr['r_eye_c'] = !isNaN($(this).find("option:selected").text())?$(this).find("option:selected").text():"";
					  rightval = accAdd(glattr['r_eye_s'], glattr['r_eye_c']);
                 if (rightval < union_sc) {
                 $(".qm_jg").fadeIn().html("*右眼球镜加右眼柱镜不能超过联合光度" + union_sc);
				 		  glattr['r_eye_c']='';
				  $("option",$(this)).eq(0).attr("selected","selected");
                   }else if ($(this).find("option:selected").val() != "" && $(".r_eye_a").find("option:selected").val() == "") {
                    $(".qm_jg").fadeIn().html("*请选择右眼轴位！");
                    $(".r_eye_a").removeAttr("disabled")
                } else if ($(this).find("option:selected").val() != "" && $(".r_eye_a").find("option:selected").val() != "") {
                    $(".r_eye_a").removeAttr("disabled");
                    $(".qm_jg").hide().html("");
                } else {
                    $(".qm_jg").hide().html("");
                    $(".r_eye_a option").eq(0).attr("selected", "selected");
                    $(".r_eye_a").attr("disabled", "disabled")
                }
            }

            if ($(this).hasClass("c_r_eye_c")) {
                if ($(this).find("option:selected").val() != "" && $(".c_r_eye_a").find("option:selected").val() == "") {
                    $(".qm_jg").fadeIn().html("*请选择右眼轴位！");
                    $(".c_r_eye_a").removeAttr("disabled")
                } else if ($(this).find("option:selected").val() != "" && $(".c_r_eye_a").find("option:selected").val() != "") {
                    $(".c_r_eye_a").removeAttr("disabled");
                    $(".qm_jg").hide().html("");
                } else {
                    $(".qm_jg").hide().html("");
                    $(".c_r_eye_a option").eq(0).attr("selected", "selected");
                    $(".c_r_eye_a").attr("disabled", "disabled")
                }
            }
            if ($(this).hasClass("r_eye_a")) {
                glattr['r_eye_a'] = !isNaN($(this).find("option:selected").text())?$(this).find("option:selected").text():"";
                if ($(".r_eye_c").find("option:selected").text().Trim() != "" && $(".r_eye_c").find("option:selected").val() != "" && $(".r_eye_a").find("option:selected").val() == "") {
                    $(".qm_jg").fadeIn().html("*请选择右眼轴位！");
                } else {
                    $(".qm_jg").hide().html("");
                }
            }
            if ($(this).hasClass("c_r_eye_a")) {
                glattr['c_r_eye_a'] = !isNaN($(this).find("option:selected").text())?$(this).find("option:selected").text():"";
                if ($(".c_r_eye_c").find("option:selected").text().Trim() != "" && $(".c_r_eye_c").find("option:selected").val() != "" && $(".c_r_eye_a").find("option:selected").val() == "") {
                    $(".qm_jg").fadeIn().html("*请选择右眼轴位！");
                } else {
                    $(".qm_jg").hide().html("");
                }
            }
            if ($(this).hasClass("l_eye_t")) {
                glattr['l_eye_t'] =  !isNaN($(this).find("option:selected").text())?$(this).find("option:selected").text():"";
                if (isNaN($(".r_eye_t").find("option:selected").text()) || typeof $(".r_eye_t").find("option:selected").text() == "undefined") {
                    glattr['r_eye_t'] = 0
                }
                if (isNaN($(this).find("option:selected").text()) || typeof $(this).find("option:selected").text() == "undefined") {
                    glattr['l_eye_t'] = 0
                }

                pdvals = accAdd(glattr['l_eye_t'], glattr['r_eye_t']);
                $(".pd_eye_t").html(pdvals);
                glattr['pd_eye_t'] = pdvals;
                if ($(this).find("option:selected").text().Trim() == "" || $(this).find("option:selected").val() == "") {
                    $(".qm_jg").fadeIn().html("*请选择左眼瞳距！");
                    //showLoTip($(".l_eye_t"), "请选择左眼瞳距")
                } else {
				if (glattr['pd_eye_t'] > tg_max) {
                 $(".qm_jg").fadeIn().html("*两眼瞳距值大于最大瞳距值" + tg_max);
				 }else{
                    $(".qm_jg").hide().html("");
					}
                }
            }
            if ($(this).hasClass("c_l_eye_t")) {
                clts = $(this).find("option:selected").text();
                if (isNaN($(".c_r_eye_t").find("option:selected").text()) || typeof $(".c_r_eye_t").find("option:selected").text() == "undefined") {
                    clrs = 0
                }
                if (isNaN($(this).find("option:selected").text()) || typeof $(this).find("option:selected").text() == "undefined") {
                    clts = 0
                }
                pdvals = accAdd(clrs, clts);
                $(".c_pd_eye_t").html(pdvals);
                if ($(this).find("option:selected").text().Trim() == "" || $(this).find("option:selected").val() == "") {
                    $(".qm_jg").fadeIn().html("*请选择左眼瞳距！");
                    // showLoTip($(".c_l_eye_t"), "请选择左眼瞳距")
                } else {
                    $(".qm_jg").hide().html("");
                }
            }
            if ($(this).hasClass("r_eye_t")) {
                glattr['r_eye_t'] = !isNaN($(this).find("option:selected").text())?$(this).find("option:selected").text():"";
                if (isNaN($(".l_eye_t").find("option:selected").text()) || typeof $(".l_eye_t").find("option:selected").text() == "undefined") {
                    glattr['l_eye_t'] = 0
                }
                if (isNaN($(this).find("option:selected").text()) || typeof $(this).find("option:selected").text() == "undefined") {
                    glattr['r_eye_t'] = 0
                }
                pdvals = accAdd(glattr['l_eye_t'], glattr['r_eye_t']);
                $(".pd_eye_t").html(pdvals);
                glattr['pd_eye_t'] = pdvals;
                if ($(this).find("option:selected").text().Trim() == "" || $(this).find("option:selected").val() == "") {
                    $(".qm_jg").fadeIn().html("*请选择右眼瞳距！");
                    // showLoTip($(".r_eye_t"), "请选择右眼瞳距")
                } else {
					if (glattr['pd_eye_t'] > tg_max) {
                 $(".qm_jg").fadeIn().html("*两眼瞳距值大于最大瞳距值" + tg_max);
				 }else{
                    $(".qm_jg").hide().html("");
					}
              
                }
            }
            if ($(this).hasClass("c_r_eye_t")) {
                clrs = $(this).find("option:selected").text();
                if (isNaN($(".c_l_eye_t").find("option:selected").text()) || typeof $(".c_l_eye_t").find("option:selected").text() == "undefined") {
                    clts = 0
                }
                if (isNaN($(this).find("option:selected").text()) || typeof $(this).find("option:selected").text() == "undefined") {
                    clrs = 0
                }
                pdvals = accAdd(clrs, clts);
                $(".c_pd_eye_t").html(pdvals);
                if ($(this).find("option:selected").text().Trim() == "" || $(this).find("option:selected").val() == "") {
                    $(".qm_jg").fadeIn().html("*请选择右眼瞳距！");
                    //showLoTip($(".c_r_eye_t"), "请选择右眼瞳距")
                } else {
                    $(".qm_jg").hide().html("");
                }
            }
        }
        e.stopPropagation()
    });
    var scon = 0;
    $(".citem").click(function() {
        scon = $(".citem").index($(this));
		liindex=scon;
	     if($(this).hasClass("slide_c")){
			
			 $(".flex-control-nav li a").eq(1).trigger("click");
		}else{
			 $(".flex-control-nav li a").eq(0).trigger("click");
		}
        var shtmlt = $("span", $(this)).html();
        $(".choice").html(shtmlt);
		
		       $(".sbdang").html(scon+1);
        mySwiper.swipeTo(scon, 100, gofun());

    });
var jdtext = "";
    $(".jd_w_text").keyup(function() {
        jdtext = $(this).val().replace(/[^\w\.\/]/ig, '');
        var slens = jdtext.getStringLen();
        if (slens >= 10) {
            var strs = SetSub(jdtext, 10);
            $(this).val(strs);
				$(".kz_attr_w").html(strs);
            $(this).parent().next().find("span").html(0)
        } else {
            var strs = jdtext;
            $(this).val(jdtext);
				$(".kz_attr_w").html(jdtext);
            $(this).parent().next().find("span").html(10 - slens)
        }
        glattr['type_w_text'] = strs;
        $(".jt_wz").html(strs)
    });
	$(".qm_qk_ca").click(function(){
		$(".jd_w_text").val("");
		$(".jt_wz").html("");
		$(".kz_attr_w").html("无");
		glattr['type_w_text'] = ""
		$(".qm_qk_ca").parent().next().find("span").html(10)
	});
    $(".jd_w_text").focusout(function() {
        jdtext = $(this).val().replace(/[^\w\.\/]/ig, '');
        var slens = jdtext.getStringLen();
        if (slens >= 10) {
            var strs = SetSub(jdtext, 10);
            $(this).val(strs);
			$(".kz_attr_w").html(strs);
            $(this).parent().next().find("span").html(0)
        } else {
            var strs = jdtext;
            $(this).val(jdtext);
			$(".kz_attr_w").html(jdtext);
            $(this).parent().next().find("span").html(10 - slens)
        }
        glattr['type_w_text'] = strs
    });
    var jdntext = "";
    $(".jd_n_text").keyup(function() {
        jdntext = $(this).val().replace(/[^\w\.\/]/ig, '');
        var slens = jdntext.getStringLen();
        if (slens >= 10) {
            var strs = SetSub(jdntext, 10);
            $(this).val(strs);
            $(this).next().find("span").html(0)
        } else {
            var strs = jdntext;
            $(this).val(jdntext);
            $(this).next().find("span").html(10 - slens)
        }
        glattr['type_n_text'] = strs;
        $(".jt_wz").html(strs)
    });
    $(".jd_n_text").focusout(function() {
        jdntext = $(this).val().replace(/[^\w\.\/]/ig, '');
        var slens = jdntext.getStringLen();
        if (slens >= 10) {
            var strs = SetSub(jdntext, 10);
            $(this).val(strs);
            $(this).next().find("span").html(0)
        } else {
            var strs = jdntext;
            $(this).val(jdntext);
            $(this).next().find("span").html(10 - slens)
        }
        glattr['type_n_text'] = strs
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
                    break
                }
            }
        } else {
            return str
        }
    }
    function gofun() {
        $(".navcontral").addClass("navoff").removeClass("navon");
        $(".dingzhi_nav").stop().animate({
            marginLeft: [ - winw, "easeInOutSine"]
        },
        300);

    }
	var jptypes=0;
	$(".jpnav .s_wpg1").click(function(){
	jptypes=$(".jpnav .s_wpg1").index($(this));
	$(".jpnav .s_wpg1 a").not($("a",$(this))).removeClass("select");
	$("a",$(this)).addClass("select");

        glattrid['jp_type_id'] = $(this).attr("attr_id");
   
		if(jp_type==0){
		   $(".j_chuf2").attr("disabled","disabled");
		}

	$(".sjpc").stop().animate({
                left: [-jptypes*winw*0.93, "easeInOutSine"]
            },
            300);
	
	});
	
	$(".s_bsshare").click(function(){
		
		if($(this).hasClass("shareoff")){
			  $(".s_bsshare").addClass("shareon").removeClass("shareoff");
			  
			  	$(".dz_fx").stop().animate({
                height: [40, "easeInOutSine"]
            },
            300);
		}else{
			  $(".s_bsshare").addClass("shareoff").removeClass("shareon");
			  	$(".dz_fx").stop().animate({
                height: [0, "easeInOutSine"]
            },
            300);
		}
		
		
	});
	
		$(".dz_center").click(function(){
			$(".dz_side").removeClass("sb_border");
		$(".dz_center").addClass("sb_border");
		 $(".flex-control-nav li a").eq(0).trigger("click");
	});
	
	$(".dz_side").click(function(){
		$(".dz_center").removeClass("sb_border");
		$(".dz_side").addClass("sb_border");
	  $(".flex-control-nav li a").eq(1).trigger("click");
	});
	
	 $(window).resize(function() {
		 
		 initCos();
	 });
	
	
	    var sharestate = true;
    function shareFun(obj, sharetype) {
        $(".sharejiaz").removeClass("loadding_sharea").not($(".sharejiaz", obj)).hide();
		 $(".sharejiaz").not($(".sharejiaz", obj)).css("overflow","hidden")
		 $(".dz_fx").css("overflow","visible");
		      $(".sharejiaz", obj).addClass("loadding_sharea").fadeIn();
        //$(".anbox").css("visibility", "hidden");
      //  $(".anniu").css("visibility", "hidden");
        if (sharestate) {
            $(".sharejiaz", obj).addClass("loadding_sharea").fadeIn();
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
                    sharestate = false
                },
                success: function(data) {
                    $(".sharejiaz", obj).removeClass("loadding_sharea");
                    switch (data.err) {
                    case "id_error":
                        sharestate = true;
                        $(".ding_baocuo").show().html("*非系统参数！");
                        break;
                    case "save_sucess":
                        $(".ding_baocuo").hide().html("");
                        sharestate = true;
                        $(".anbox", obj).css("visibility", "visible");
                        $(".anniu", obj).css("visibility", "visible");
                        if (sharetype == "qzone") {
                            qqzone(obj, data.urls, data.share_content, data.share_title, data.thumb_c)
                        } else if (sharetype == "qqweibo") {
                            postToWb(obj, data.share_title + " " + data.share_content, data.urls, data.thumb_c)
                        } else if (sharetype == "sinaweibo") {
                            weiboShare(obj, data.urls, data.share_title, data.share_content, data.thumb_c)
                        }
                        break;
                    case "save_fail":
                        sharestate = true;
                        $(".ding_baocuo").show().html("*分享失败！");
                        $(".sharejiaz", obj).hide();
                        break;
                    case "jk_id_error":
                        $(".sharejiaz", obj).hide();
                        sharestate = false;
                        $(".ding_baocuo").show().html("*非法镜框值!");
                        break;
                    case "qk_id_error":
                        sharestate = true;
                        $(".sharejiaz", obj).hide();
                        $(".ding_baocuo").show().html("*无效的前框饰布值!");
                        break;
                    case "sj_id_error":
                        $(".sharejiaz", obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("*无效的前框饰件值!");
                        break;
                    case "jp_id_error":
                        $(".sharejiaz", obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("*无效的镜片值!");
                        break;
                    case "jt_id_error":
                        $(".sharejiaz", obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("*无效的镜腿值!");
                        break;
                    case "jtt_id_error":
                        $(".sharejiaz", obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("*无效的脚套值!");
                        break;
                    case "size_error":
                        $(".sharejiaz", obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("*无效的尺寸值!");
                        break;
                    //case "size_id_error":
                       // $(".sharejiaz", obj).hide();
                       // sharestate = true;
                       // $(".ding_baocuo").show().html("无效的尺寸值!");
                       // break;
                    case "jp_type_error":
                        $(".sharejiaz", obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("*无效的镜片类型值!");
                        break;
                    case "jp_error":
                        $(".sharejiaz", obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("*无效的镜片值!");
                        break;
                    case "jh_error":
                        $(".sharejiaz", obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("*无效的镜盒值!");
                        break;
                    case "w_text_length_error":
                        $(".sharejiaz", obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("*镜腿外侧镌刻超过10个字符!");
                        break;
                    case "n_text_length_error":
                        $(".sharejiaz", obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("*镜腿内侧镌刻超过10个字符!");
                        break;
                    case "jh_one_text_length_error":
                        $(".sharejiaz", obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("*镜盒线1镌刻超过18个字符!");
                        break;
                    case "jh_two_text_length_error":
                        $(".sharejiaz", obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("*镜盒线2镌刻超过18个字符!");
                        break;
                    case "cz_error":
                        $(".sharejiaz", obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("*无效的镜盒颜色值!");
                        break;
                    case "rec_id_error":
                        $(".sharejiaz", obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("*无效的订单值!");
                        break;
                    case "rec_id_error":
                        $(".sharejiaz", obj).hide();
                        sharestate = false;
                        $(".ding_baocuo").show().html("*无效的订单值!");
                        break;
                    case "l_eye_a_error":
                        $(".sharejiaz", obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("*请选择左眼轴位!");
                        break;
                    case "r_eye_a_error":
                        $(".sharejiaz", obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("*请选择右眼轴位!");
                        break;
                        $(".sharejiaz", obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("*请选择左眼瞳距!");
                        break;
                    case "r_eye_t_error":
                        $(".sharejiaz", obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("*请选择右眼瞳距!");
                        break;
                    case "l_union_sc_error":
                        $(".sharejiaz", obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("*左眼球镜加左眼柱镜超过联合光度!");
                        break;
                    case "r_union_sc_error":
                        $(".sharejiaz", obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("*右眼球镜加右眼柱镜超过联合光度!");
                        break;
                    case "max_pd_error":
                        $(".sharejiaz", obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("*两眼瞳距值大于最大瞳距值!");
                        break;
                    case "min_pd_error":
                        $(".sharejiaz", obj).hide();
                        sharestate = true;
                        $(".ding_baocuo").show().html("*两眼瞳距值小于最小瞳距值!");
                        break;
                    default:
                        sharestate = false;
                        $(".sharejiaz", obj).hide();
                        $(".ding_baocuo").show().html("*系统错误，刷新后重试!")
                    }
                }
            })
        }
    }
    function qqzone(objs, href, des, title, site, pics) {
        var p = {
            url: href,
            summary: '',
            title: '',
            pics: ''
        };
        var s = [];
        for (var i in p) {
            s.push(i + '=' + encodeURIComponent(p[i] || ''))
        }
        var qzoneurl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?,' + s.join('&') + ',';
        $(".share_link a", objs).attr("href", qzoneurl);
        $(".copy_link a", objs).attr("share_link", href)
    }
    $(".qzone").click(function(e) {
        shareFun($(this), "qzone");
        e.stopPropagation()
    });
    function postToWb(obj, title, url, pic) {
        var _t = encodeURI(title);
        var _url = encodeURI(url);
        var _appkey = encodeURI("801567562");
        var _pic = encodeURI(pic);
        var _u = 'http://v.t.qq.com/share/share.php?title=' + _t + '&url=' + _url + '&appkey=' + _appkey + '&pic=' + _pic;
        $(".share_link a", obj).attr("href", _u);
        $(".copy_link a", obj).attr("share_link", url)
    }
    $(".qqweibo").click(function(e) {
 
        shareFun($(this), "qqweibo");
        e.stopPropagation()
    });
    function weiboShare(obj, url, title, des, pic) {
        var wb_shareBtn = document.getElementById("shareBtn"),
        wb_url = url,
        wb_appkey = "2347999613",
        wb_title = title + '' + des,
        wb_pic = pic,
        wb_language = "zh_cn";
        var weibourl = "http://service.weibo.com/share/share.php?url=" + wb_url + "&appkey=" + wb_appkey + "&title=" + wb_title + "&pic=" + wb_pic + "&language=" + wb_language + "";
        $(".share_link a", obj).attr("href", weibourl);
        $(".copy_link a", obj).attr("share_link", url)
    }
    $(".sinaweibo").click(function(e) {
        shareFun($(this), "sinaweibo");
        e.stopPropagation()
    });
    $(".dingz_guan4").click(function(e) {
        $(".sharejiaz").fadeOut();
        e.stopPropagation()
    });
    $(".share_link a").click(function(e) {
        e.stopPropagation()
    });
    $(".copy_link a").click(function(e) {
        e.stopPropagation()
    });
	
	$(".sb_you").click(function(){
		  $(".gpage").show();	
		$(".sbsbff").fadeOut();
		
	});
	
	$(".sbsbff").height($(window).height());
	
	 $(".dingz_guan4").click(function(e) {
        $(".sharejiaz").fadeOut(200,function(){
			 $(".dz_fx").css("overflow","hidden");
			
		});
        e.stopPropagation()
    });
	
	    var donestate = true;
		
		var chufanstate=false;
		
	$(".sb_zuo").click(function(){
		
		   if (yzcfinfo(pdvals) == false) {
			   	chufanstate=false;
                return false
            }else{
				
				
				$(".sbsbff").fadeOut(); 
                 $(".gpage").show();				
				chufanstate=true;
				if($(".dingzhi_edit").length>0){
						$(".dingzhi_edit").trigger("click");
				}else{
					
					$(".done").trigger("click");	
				}
			
			}
		
	});	
  		
    $(".done").bind("click",function() {
		
		
        if (jp_type == 1) {
	  
			if(!chufanstate){
				
			   $(".sbsbff").fadeIn();
			   $(".gpage").hide();
				return false;
				
			}
          
        }
        if (donestate) {
            var postDate = {};
            postDate['glattr'] = glattr;
            postDate['glattrid'] = glattrid;
            postDate['step'] = "add_dingzhi_cart";
            postDate['jp_type'] = jp_type;
			 postDate['cfcheck'] =$("#cfcheck").val();
	        var lsfs = $("#dbutton_add").ladda();
            $.ajax({
                type: 'POST',
                url: 'flow.php',
                data: postDate,
                dataType: "json",
                beforeSend: function(XMLHttpRequest) {
                   // $(".done").addClass("g_loadding");
                    $(".done>a").css("opacity", 0.5);
					$(".done .ladda-label").html("生成订单中");
					 
					    lsfs.ladda("start");
                    $(".ding_baocuo").hide().html("");
                    donestate = false
                },
                success: function(data) {
				     lsfs.ladda("stop");
                    //$(".ding_baocuo").empty().hide();
                    //$(".done").removeClass("g_loadding");
                    $(".miao_mima1_ts1").empty().hide();
                    switch (data.err) {
                    case "id_error":
                        donestate = true;
                        $(".ding_baocuo").show().html("*非系统参数！");
						$(".done .ladda-label").html("加入购物车");
                        break;
                    case "save_sucess":
                        $(".ding_baocuo").hide().html("");
                        donestate = false;
                        $(".done .ladda-label").html("已经加入");
                        $(".done>a").animate({
                            "opacity": 1
                        },
                        500);
                        reflash_mb_cat
                        setTimeout(function() {
                            location.href = "flow.php?step=cart"
                        },
                        1000);
                        break;
                    case "save_fail":
                        donestate = true;
                        $(".done>a").animate({
                            "opacity": 1
                        },
                        500);
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*保存失败！");
                        break;
                    case "save_fail":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*保存失败！");
                        break;
                    case "jk_id_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*非法镜框值!");
                        break;
                    case "qk_id_error":
                        donestate = true;
                        $(".done>a").animate({
                            "opacity": 1
                        },
                        500);
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*无效的前框饰布值!");
                        break;
                    case "sj_id_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*无效的前框饰件值!");
                        break;
                    case "jp_id_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*无效的镜片值!");
                        break;
                    case "jt_id_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*无效的镜腿值!");
                        break;
                    case "jtt_id_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*无效的脚套值!");
                        break;
                    //case "size_error":
                        //$(".done>a").animate({
                          //  "opacity":
                          //  1
                       // },
                       // 500);
                       // donestate = true;
                       // $(".ding_baocuo").show().html("无效的尺寸值!");
                       // break;
                    //case "size_id_error":
                      //  $(".done>a").animate({
                       //     "opacity":
                       // //    1
                       // },
                       // 500);
                       // donestate = true;
                       // $(".ding_baocuo").show().html("无效的尺寸值!");
                      //  break;
                    case "w_text_length_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*镜腿外侧镌刻超过10个字符!");
                        break;
                    case "n_text_length_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*镜腿内侧镌刻超过10个字符!");
                        break;
                    case "jh_one_text_length_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*镜盒线1镌刻超过18个字符!");
                        break;
                    case "jh_two_text_length_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*镜盒线2镌刻超过18个字符!");
                        break;
                    case "jp_type_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*无效的镜片类型值!");
                        break;
                    case "jp_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*无效的镜片值!");
                        break;
                    case "jh_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*无效的镜盒值!");
                        break;
                    case "cz_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*无效的镜盒颜色值!");
                        break;
                    case "rec_id_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = false;
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*无效的订单值!");
                        break;
                    case "rec_id_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = false;
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*无效的订单值!");
                        break;
                    case "l_eye_a_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*请选择左眼轴位!");
                        break
                    case "r_eye_a_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*请选择右眼轴位!");
                        break
                    case "r_eye_t_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*请选择左眼瞳距!");
                        break
                    case "r_eye_t_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*请选择右眼瞳距!");
                        break
                    case "l_union_sc_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*左眼球镜加左眼柱镜超过联合光度!");
                        break
                    case "r_union_sc_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*右眼球镜加右眼柱镜超过联合光度!");
                        break
                    case "max_pd_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*两眼瞳距值大于最大瞳距值!");
                        break
                    case "min_pd_error":
                        $(".done>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        donestate = true;
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*两眼瞳距值小于最小瞳距值!");
                        break
                    default:
                        donestate = false;
                        $(".done>a").animate({
                            "opacity": 1
                        },
                        500);
						$(".done .ladda-label").html("加入购物车");
                        $(".ding_baocuo").show().html("*系统错误，刷新后重试!")
                    }
                }
            })
        }
    });
    var dingzhiedit = true;
    $(".dingzhi_edit").bind("click",function() {
		
 
		
		     if (jp_type == 1) {
    	if(!chufanstate){
			   $(".sbsbff").fadeIn();
			   	   $(".gpage").hide();
				return false;
				
			}    }
        if (dingzhiedit) {
			
            var editpostDate = {};
            editpostDate['glattr'] = glattr;
            editpostDate['glattrid'] = glattrid;
            editpostDate['step'] = "edit_dingzhi_cart";
            editpostDate['jp_type'] = jp_type;
			 editpostDate['cfcheck'] =$("#cfcheck").val();
            editpostDate['tocken'] = $(".rids").val();
			   var lsfsd = $("#dbutton_edit").ladda();
            $.ajax({
                type: 'POST',
                url: 'flow.php',
                data: editpostDate,
                dataType: "json",
                beforeSend: function(XMLHttpRequest) {
                   // $(".dingzhi_edit").addClass("g_loadding");
                    $(".dingzhi_edit>a").css("opacity", 0.8);
						$(".dingzhi_edit .ladda-label").html("订单修改中");
				 
                    dingzhiedit = false;
						 lsfsd.ladda("start");
                    $(".ding_baocuo").hide().html("")
                },
                success: function(data) {
					 lsfsd.ladda("stop");
                    $(".ding_baocuo").empty().hide();
                  //  $(".dingzhi_edit").removeClass("g_loadding");
                    switch (data.err) {
                    case "id_error":
                        dingzhiedit = false;
                        $(".ding_baocuo").show().html("*非系统参数！");
								$("#dbutton_edit .ladda-label").html("修改");
                        break;
                    case "save_sucess":
                        dingzhiedit = false;
                        $(".ding_baocuo").hide().html("");
								$(".dingzhi_edit .ladda-label").html("保存成功");
                       
                        $(".dingzhi_edit>a").animate({
                            "opacity": 1
                        },
                        500);
                       reflash_mb_cat();
                        setTimeout(function() {
                            location.href = "flow.php?step=cart"
                        },
                        1000);
                        break;
                    case "save_fail":
                        dingzhiedit = true;
                        $(".dingzhi_edit>a").animate({
                            "opacity": 1
                        },
                        500);
							$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("*保存失败！");
                        break;
                    case "save_fail":
                        dingzhiedit = true;
                        $(".dingzhi_edit>a").animate({
                            "opacity": 1
                        },
                        500);
							$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("*保存失败！");
                        break;
                    case "jk_id_error":
                        dingzhiedit = true;
                        $(".dingzhi_edit>a").animate({
                            "opacity": 1
                        },
                        500);
							$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("*非法镜框值!");
                        break;
                    case "qk_id_error":
                        dingzhiedit = true;
                        $(".dingzhi_edit>a").animate({
                            "opacity": 1
                        },
                        500);
							$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("*无效的前框饰布值!");
                        break;
                    case "sj_id_error":
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
							$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("*无效的前框饰件值!");
                        break;
                    case "jp_id_error":
                        dingzhiedit = true;
                        $(".dingzhi_edit>a").animate({
                            "opacity": 1
                        },
                        500);
							$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("*无效的镜片值!");
                        break;
                    case "jt_id_error":
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
							$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("*无效的镜腿值!");
                        break;
                    case "jtt_id_error":
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
							$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("*无效的脚套值!");
                        break;
                   // case "size_error":
                      //  $(".dingzhi_edit>a").animate({
                         //   "opacity":
                       //     1
                      //  },
                      //  500);
                      //  dingzhiedit = true;
                      //  $(".ding_baocuo").show().html("无效的尺寸值!");
                      //  break;
                   // case "size_id_error":
                      //  dingzhiedit = true;
                      //  $(".dingzhi_edit>a").animate({
                       //     "opacity": 1
                       // },
                       // 500);
                       // $(".ding_baocuo").show().html("无效的尺寸值!");
                       // break;
                    case "jp_type_error":
                        dingzhiedit = true;
                        $(".dingzhi_edit>a").animate({
                            "opacity": 1
                        },
                        500);
							$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("*无效的镜片类型值!");
                        break;
                    case "jp_error":
                        dingzhiedit = true;
                        $(".dingzhi_edit>a").animate({
                            "opacity": 1
                        },
                        500);
							$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("*无效的镜片值!");
                        break;
                    case "jh_error":
                        dingzhiedit = true;
                        $(".dingzhi_edit>a").animate({
                            "opacity": 1
                        },
                        500);
							$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("*无效的镜盒值!");
                        break;
                    case "w_text_length_error":
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
							$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("*镜腿外侧镌刻超过10个字符!");
                        break;
                    case "n_text_length_error":
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
							$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("*镜腿内侧镌刻超过10个字符!");
                        break;
                    case "jh_one_text_length_error":
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
							$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("*镜盒线1镌刻超过18个字符!");
                        break;
                    case "jh_two_text_length_error":
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
							$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("*镜盒线2镌刻超过18个字符!");
                        break;
                    case "cz_error":
                        dingzhiedit = true;
                        $(".dingzhi_edit>a").animate({
                            "opacity": 1
                        },
                        500);
							$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("*无效的镜盒颜色值!");
                        break;
                    case "l_eye_a_error":
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
							$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("*请选择左眼轴位!");
                        break
                    case "r_eye_a_error":
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
							$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("*请选择右眼轴位!");
                        break
                    case "r_eye_t_error":
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
							$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("*请选择左眼瞳距!");
                        break
                    case "r_eye_t_error":
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
							$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("*请选择右眼瞳距!");
                        break
                    case "l_union_sc_error":
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
							$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("*左眼球镜加左眼柱镜超过联合光度!");
                        break
                    case "r_union_sc_error":
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
							$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("*右眼球镜加右眼柱镜超过联合光度!");
                        break
                    case "max_pd_error":
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
							$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("*两眼瞳距值大于最大瞳距值!");
                        break
                    case "min_pd_error":
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                        dingzhiedit = true;
							$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("*两眼瞳距值小于最小瞳距值!");
                        break
                    default:
                        $(".dingzhi_edit>a").animate({
                            "opacity":
                            1
                        },
                        500);
                    	$("#dbutton_edit .ladda-label").html("修改");
                        $(".ding_baocuo").show().html("<span class='ti_error'>*系统错误，刷新后重试!</span>").show()
                    }
                }
            })
        }
    });
	var jtcindex = $(".d_xunh").index($(".jp_contain"));
	
	    function ticf(typs) {
        if (typs) {
            $(".chufan_tishi").show();
            $(".dingzhi_cf_ts").html("*处方信息不完整请补充");
        } else {
            $(".chufan_tishi").show();
            $(".dingzhi_cf_ts").html("*请填写处方信息");
        }

    }
    function yzcfinfo() {
		
		 
        
        glattr['r_eye_c'] = ($(".r_eye_c").val() != "") ? $(".r_eye_c").find("option:selected").text().Trim() : "";
        glattr['r_eye_a'] = ($(".r_eye_a").val() != "") ? $(".r_eye_a").find("option:selected").text().Trim() : "";
        glattr['r_eye_t'] = ($(".r_eye_t").val() != "") ? $(".r_eye_t").find("option:selected").text().Trim() : "";
        glattr['r_eye_s'] = ($(".r_eye_s").val() != "") ? $(".r_eye_s").find("option:selected").text().Trim() : "";
        glattr['l_eye_c'] = ($(".l_eye_c").val() != "") ? $(".l_eye_c").find("option:selected").text().Trim() : "";
        glattr['l_eye_a'] = ($(".l_eye_a").val() != "") ? $(".l_eye_a").find("option:selected").text().Trim() : "";
        glattr['l_eye_t'] = ($(".l_eye_t").val() != "") ? $(".l_eye_t").find("option:selected").text().Trim() : "";
        glattr['l_eye_s'] = ($(".l_eye_s").val() != "") ? $(".l_eye_s").find("option:selected").text().Trim() : "";
        if ($(".l_eye_s").val() == "" && $(".r_eye_s").val() == "" && $(".l_eye_t").val() == "" && $(".r_eye_t").val() == "") {
            $(".qm_jg").fadeIn().html("处方信息！");

            cItem(jtcindex, $(".qm_jg"));
            return false
        } else {
            $(".qm_jg").hide().html("");
        }
        if ($(".l_eye_c").find("option:selected").text().Trim() != "" && $(".l_eye_c").find("option:selected").val() != "" && $(".l_eye_a").find("option:selected").val() == "") {
                cItem(jtcindex, $(".qm_jg"));
            liindex = jtcindex;
            ticf(true);
            $(".qm_jg").fadeIn().html("*请填选择左眼轴拉！");
            //  showLoTip($(".l_eye_a"), "请选择轴位");
            return false
        } else {
            $(".qm_jg").hide().html("")
        }
        if ($(".r_eye_c").find("option:selected").text().Trim() != "" && $(".r_eye_c").find("option:selected").val() != "" && $(".r_eye_a").find("option:selected").val() == "") {
           cItem(jtcindex, $(".qm_jg"));
            liindex = jtcindex;
            $(".qm_jg").fadeIn().html("*请填选择右眼轴拉！");
            //showLoTip($(".r_eye_a"), "请选择轴位");
            return false
        } else {
            $(".qm_jg").hide().html("")
        }
        if ($(".l_eye_t").find("option:selected").text().Trim() != "" && $(".l_eye_t").find("option:selected").val() == "") {
                 cItem(jtcindex, $(".qm_jg"));
            liindex = jtcindex;
            $(".qm_jg").fadeIn().html("*请填选择左眼瞳距！");
            // showLoTip($(".l_eye_t"), "请选择左眼瞳距");
            return false
        } else {
            $(".qm_jg").hide().html("")
        }
        if ($(".r_eye_t").find("option:selected").text().Trim() != "" && $(".r_eye_t").find("option:selected").val() == "") {
                 cItem(jtcindex, $(".qm_jg"));
            liindex = jtcindex;
            $(".qm_jg").fadeIn().html("*请选择右眼瞳距！");
            // showLoTip($(".r_eye_t"), "请选择右眼瞳距");
            return false
        } else {
            $(".qm_jg").hide().html("")
        }
        var lenuval = accAdd(glattr['l_eye_s'], glattr['l_eye_c']);
        if (lenuval < union_sc) {
            $(".qm_jg").fadeIn().html("*左眼球镜加左眼柱镜不能超过联合光度" + union_sc);
                cItem(jtcindex, $(".qm_jg"));
            liindex = jtcindex;
            return false
        }
        var rightval = accAdd(glattr['r_eye_s'], glattr['r_eye_c']);
        if (rightval < union_sc) {
            $(".qm_jg").fadeIn().html("*右眼球镜加右眼柱镜不能超过联合光度" + union_sc);
             cItem(jtcindex, $(".qm_jg"));
            liindex = jtcindex;
            return false
        }
        if (glattr['pd_eye_t'] > tg_max) {
            $(".qm_jg").fadeIn().html("*两眼瞳距值大于最大瞳距值" + tg_max);
                cItem(jtcindex, $(".qm_jg"));
            liindex = jtcindex;
            return false
        } else if (glattr['pd_eye_t'] < tg_min) {
            $(".qm_jg").fadeIn().html("*两眼瞳距值小于最小瞳距值" + tg_min);
              cItem(jtcindex, $(".qm_jg"));
            liindex = jtcindex;
            return false
        } else {
            $(".qm_jg").hide().html("")
        }
        if ($(".c_l_eye_s").val() == "" && $(".c_r_eye_s").val() == "" && $(".c_l_eye_t").val() == "" && $(".c_r_eye_t").val() == "") {
            $(".qm_jg").fadeIn().html("*请填写确认处方信息！");
                // cItem(jtcindex, $(".confirm_bcc"));
            liindex = jtcindex;
            return false
        } else if (glattr['l_eye_c'] != "" && $(".c_l_eye_c").val() == "") {
            $(".qm_jg").fadeIn().html("*请填写确认处方信息左眼柱镜/C！");
             // cItem(jtcindex, $(".confirm_bcc"));
            liindex = jtcindex;
            return false
        } else if ($(".c_l_eye_c").val() != "" && $(".c_l_eye_a").val() == "") {
            $(".qm_jg").fadeIn().html("*请填写确认处方信息左眼轴位/A！");
           // cItem(jtcindex, $(".confirm_bcc"));
            liindex = jtcindex;
            return false
        } else if (glattr['r_eye_c'] != "" && $(".c_r_eye_c").val() == "") {
            $(".qm_jg").fadeIn().html("*请填写确认处方信息右眼柱镜/C！");

              //cItem(jtcindex, $(".confirm_bcc"));
            liindex = jtcindex;
            return false
        } else if ($(".c_r_eye_c").val() != "" && $(".c_r_eye_a").val() == "") {
            $(".qm_jg").fadeIn().html("*请填写确认处方信息右眼轴位/A！");
           // cItem(jtcindex, $(".confirm_bcc"));
            liindex = jtcindex;
            return false
        } else {

            if ($(".c_l_eye_s").find("option:selected").text().Trim() != $(".l_eye_s").find("option:selected").text().Trim()) {
                $(".qm_jg").fadeIn().html("*处方信息确认左眼球镜/S,值不匹配！");
                //cItem(jtcindex, $(".confirm_bcc"));
                liindex = jtcindex;
                return false
            }
            if (glattr['l_eye_c'] != "") {
                if ($(".c_l_eye_c").find("option:selected").text().Trim() != glattr['l_eye_c']) {
                    $(".qm_jg").fadeIn().html("*处方信息确认左眼柱镜/C,值不匹配！");
                   // cItem(jtcindex, $(".confirm_bcc"));
                    liindex = jtcindex;
                    return false
                }
                if ($(".c_l_eye_a").find("option:selected").text().Trim() != glattr['l_eye_a']) {
                    $(".qm_jg").fadeIn().html("*处方信息确认左眼轴位/A,值不匹配！");
                  // cItem(jtcindex, $(".confirm_bcc"));
                    liindex = jtcindex;
                    return false
                }
            }
            if ($(".c_l_eye_t").find("option:selected").text().Trim() != glattr['l_eye_t']) {
                $(".qm_jg").fadeIn().html("*处方信息确认左眼瞳距,值不匹配！");
                 //cItem(jtcindex, $(".confirm_bcc"));
                liindex = jtcindex;
                return false
            }
            if ($(".c_r_eye_s").find("option:selected").text().Trim() != $(".r_eye_s").find("option:selected").text().Trim()) {
                $(".qm_jg").fadeIn().html("*处方信息确认右眼球镜/S,值不匹配！");
                // cItem(jtcindex, $(".confirm_bcc"));
                liindex = jtcindex;
                return false
            }
            if (glattr['r_eye_c'] != "") {
                if ($(".c_r_eye_c").find("option:selected").text().Trim() != glattr['r_eye_c']) {
                    $(".qm_jg").fadeIn().html("*处方信息确认右眼柱镜/C,值不匹配！");
                     //cItem(jtcindex, $(".confirm_bcc"));
                    liindex = jtcindex;
                    return false
                }
                if ($(".c_r_eye_a").find("option:selected").text().Trim() != glattr['r_eye_a']) {
                    $(".qm_jg").fadeIn().html("*处方信息确认右眼轴位/A,值不匹配！");
                    //cItem(jtcindex, $(".confirm_bcc"));
                    liindex = jtcindex;
                    return false
                }
            }
            if ($(".c_r_eye_t").find("option:selected").text().Trim() != glattr['r_eye_t']) {
                $(".qm_jg").fadeIn().html("*处方信息确认右眼瞳距,值不匹配！");
                 // cItem(jtcindex, $(".confirm_bcc"));
                liindex = jtcindex;
                return false
            }
        }
    }
	
	    function showcf(msg, msv, msc) {
   
        $(".chufan_info").hide();
        $(".chufan_tishi").show();

        $(".dingzhi_cf_ts").html(msg + "" + msv);
        $("." + msc).html(msg + "" + msv + "!").fadeIn();
        if (typeof msc != "undefined") {

            if (msc == "confirm_bcc") {
                cfss = 0;
            } else if (msc == "qm_jg") {
                cfss = 1;
            }

        }

    }

});

function accAdd(arg1, arg2) {
    var r1, r2, m, c;
    if (typeof arg1 == "undefined" || isNaN(arg1) || arg1 == "") {
        arg1 = 0
    }
    if (typeof arg2 == "undefined" || isNaN(arg2) || arg2 == "") {
        arg2 = 0
    }
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch(e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch(e) {
        r2 = 0
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""))
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""))
    }
    return (arg1 + arg2) / m
}
function dowriteprice() {
    var totals = 0;
    var totaldetail = "";
    $.each(glprice,
    function(n, value) {
        if (n == "jk_price") {
            if (typeof value != "undefined" && value != "" && value > 0) {
                totaldetail += "镜框:" + value + " ";
            }
        } else if (n == "jp_price") {
            if (typeof value != "undefined" && value != "" && value > 0) {
                totaldetail += "镜片:" + value + " ";
            }
        } else if (n == "jt_price") {
            if (typeof value != "undefined" && value != "" && value > 0) {
                totaldetail += "特殊材质:" + value + " ";
            }

        }
        totals += (typeof value == "undefined" || value == "") ? 0 : parseInt(value)
    });

    $(".total_detail").html(totaldetail);

    $(".total").html(totals)
}
function itemAttr(obj) {
	
    var postRundate = {};
    postRundate['act'] = "check_number";
    postRundate['pid'] = glattrid['jj_id'];
    if ($(obj).hasClass("no_s_s")) {
        return false
    }
    var njkindex = $(".jk_box3 li").index($(obj));

    var title = $(obj).attr("attr_title") + "<br/><span>" + $(obj).attr("attr_entitle") + "</span>";
	 var dtitles=$(obj).attr("attr_title");
	 
	 if($(obj).hasClass("jp")){
		
	 var dobjsf=$(".swiper-slide").index($(obj).parent().parent().parent().parent().parent().parent().parent());
	 }else{
	 var dobjsf=$(".swiper-slide").index($(obj).parent().parent().parent().parent().parent());
	 }

	 $(".dingtit").eq(dobjsf).html(dtitles);
 
    var attr_descript = $(obj).attr("attr_descript");
    var imgsrc = $("img", $(obj)).attr("src");
    var parentojb = $(obj).parent().parent().parent();
     var liwids=$(window).width()*0.93*0.17-6;
		  $("img",$(obj)).width(liwids);
         $("img",$(obj)).addClass("select");
        $(".d_xunh").eq(liindex).find("img").not($("img",$(obj))).not(".infotishi").removeClass("select");
		$(".d_xunh").eq(liindex).find("img").not($("img",$(obj))).not(".infotishi").width($(window).width()*0.17);
        var imgarray = [];
        var classarray = [];
        var blclass = $(obj).attr("class");
        $(".miao_load").show();
        if ($(obj).hasClass("jk")) {
            glprice[blclass + "_price"] = accAdd(parseInt($(obj).attr("attr_p")), jkprice)
        } else {
            glprice[blclass + "_price"] = parseInt($(obj).attr("attr_p"))
        }
        glattrid[blclass + "_id"] = $(obj).attr("attr_id");
        kcarray[blclass + '_id'] = $(obj).attr("attr_id");
        if ($(obj).hasClass("jt") || $(obj).hasClass("jtt")) {
            if ($(".jtt_contain").length > 0 && $(obj).hasClass("jtt")) {
                setColor($(obj));
            } else if ($(obj).hasClass("jt") && $(".jtt_contain").length == 0) {
                setColor($(obj));
            }
            postRundate['type'] == $(obj).attr("class");
            count = 0;
            classarray[0] = blclass;
            imgarray[0] = $(obj).attr("img_l")
        } else {
            if ($(obj).hasClass("jk")) {
                postRundate['jpid'] = glattrid['jp_id']
            }
            if ($(obj).hasClass("jp")) {
                jp_type = $(obj).attr("jp_type");
                if (jp_type == 1) {
					if(gl_attr_edit["l_eye_a"]!=''){
						 
						 $(".l_eye_a").removeAttr("disabled");

					}else{
							 $(".l_eye_a").attr("disabled","disabled");
					}
					
					
						if(gl_attr_edit["r_eye_a"]!=''){
							 $(".r_eye_a").removeAttr("disabled");
					     }else{
							 $(".r_eye_a").attr("disabled","disabled"); 
						 }
			       
			       
				 $(".j_chuf2").not(".c_l_eye_a,.c_r_eye_a").removeAttr("disabled");
                    $(".js_show").show()
                } else {
				 $(".j_chuf2").attr("disabled","disabled");
                    $(".js_show").hide()
                }
                kccfinfo['l_eye_s'] = glattr['l_eye_s'];
                kccfinfo['l_eye_c'] = glattr['l_eye_c'];
                kccfinfo['l_eye_a'] = glattr['l_eye_a'];
                kccfinfo['l_eye_t'] = glattr['l_eye_t'];
                kccfinfo['r_eye_s'] = glattr['r_eye_s'];
                kccfinfo['r_eye_c'] = glattr['r_eye_c'];
                kccfinfo['r_eye_a'] = glattr['r_eye_a'];
                kccfinfo['r_eye_t'] = glattr['r_eye_t'];
                postRundate['cf'] = kccfinfo
            }
            postRundate['type'] = blclass;
            count = 0;
            imgarray[0] = $(obj).attr("img_c");
            classarray[0] = blclass;
            imgarray[1] = $(obj).attr("img_l");
            classarray[1] = blclass
        }
        if ($(obj).attr("attr_id") > 0) {
            postRundate['id'] = kcarray;
            getKuc($(obj).attr("attr_id"), postRundate, imgarray, classarray)
        }
        glattr[blclass] = $(obj).attr("attr_title")
 
    dowriteprice();
    oindex = njkindex;
    var njkh = 0;
    var jkcdiv = parentojb.find("div");
    jkcdiv.each(function(i) {
        njkh = njkh + parseInt(jkcdiv.eq(i).outerHeight()) + parseInt(jkcdiv.eq(i).css("marginTop"))
    });
    parentojb.animate({
        height: njkh
    },
    500);

}

function getKuc(id, datas, imagearray, attrclass) {
    imge = imagearray;
    if (id > 0) {
        $.ajax({
            type: 'POST',
            url: 'dingzhi.php',
            data: datas,
            dataType: "json",
            beforeSend: function(XMLHttpRequest) {},
            success: function(data) {
                $(".ding_tqmzt").html(data.maxstr);
                if (typeof data.union_sc != "undefined") {
                    union_sc = data.union_sc
                }
                if (typeof data.info != "undefined") {
                    if (typeof data.info.l_eye_s != "undefined") {
                        $(".l_eye_s option").eq(0).siblings().remove();
                        $(".l_eye_s option").eq(0).after(data.info.l_eye_s.html);
                        $(".c_l_eye_s option").eq(0).siblings().remove();
                        $(".c_l_eye_s option").eq(0).after(data.info.l_eye_s.html);
                        $(".c_l_eye_s option").removeAttr("selected")
                    } else {
                        $(".c_l_eye_s option").eq(0).siblings().remove();
                        $(".l_eye_s option").eq(0).siblings().remove()
                    }
					
					if (typeof data.info.l_eye_a != "undefined") {
                        $(".l_eye_a option").eq(0).siblings().remove();
                        $(".l_eye_a option").eq(0).after(data.info.l_eye_a.html);
                        $(".c_l_eye_a option").eq(0).siblings().remove();
                        $(".c_l_eye_a option").eq(0).after(data.info.l_eye_a.html);
                        $(".c_l_eye_a option").removeAttr("selected")
                    } else {
                        $(".c_l_eye_a option").eq(0).siblings().remove();
                        $(".l_eye_a option").eq(0).siblings().remove()
                    }
                    if (typeof data.info.l_eye_c != "undefined") {
                        $(".l_eye_c option").eq(0).siblings().remove();
                        $(".l_eye_c option").eq(0).after(data.info.l_eye_c.html);
                        $(".c_l_eye_c option").eq(0).siblings().remove();
                        $(".c_l_eye_c option").eq(0).after(data.info.l_eye_c.html);
                        $(".c_l_eye_c option").removeAttr("selected")
                    } else {
                        $(".c_l_eye_c option").eq(0).siblings().remove();
                        $(".l_eye_c option").eq(0).siblings().remove()
                    }
                    if (typeof data.info.l_eye_t != "undefined") {
                        $(".l_eye_t option").eq(0).siblings().remove();
                        $(".l_eye_t option").eq(0).after(data.info.l_eye_t.html);
                        $(".c_l_eye_t option").eq(0).siblings().remove();
                        $(".c_l_eye_t option").eq(0).after(data.info.l_eye_t.html);
                        $(".c_l_eye_t option").removeAttr("selected")
                    } else {
                        $(".c_l_eye_t option").eq(0).siblings().remove();
                        $(".l_eye_t option").eq(0).siblings().remove()
                    }
                    if (typeof data.info.r_eye_s != "undefined") {
                        $(".r_eye_s option").eq(0).siblings().remove();
                        $(".r_eye_s option").eq(0).after(data.info.r_eye_s.html);
                        $(".c_r_eye_s option").eq(0).siblings().remove();
                        $(".c_r_eye_s option").eq(0).after(data.info.r_eye_s.html);
                        $(".c_r_eye_s option").removeAttr("selected")
                    } else {
                        $(".c_r_eye_s option").eq(0).siblings().remove();
                        $(".r_eye_s option").eq(0).siblings().remove()
                    }
                    if (typeof data.info.r_eye_c != "undefined") {
                        $(".r_eye_c option").eq(0).siblings().remove();
                        $(".r_eye_c option").eq(0).after(data.info.r_eye_c.html);
                        $(".c_r_eye_c option").eq(0).siblings().remove();
                        $(".c_r_eye_c option").eq(0).after(data.info.r_eye_c.html);
                        $(".c_r_eye_c option").removeAttr("selected")
                    } else {
                        $(".c_r_eye_c option").eq(0).siblings().remove();
                        $(".r_eye_c option").eq(0).siblings().remove()
                    }
                    if (typeof data.info.r_eye_t != "undefined") {
                        $(".r_eye_t option").eq(0).siblings().remove();
                        $(".r_eye_t option").eq(0).after(data.info.r_eye_t.html);
                        $(".c_r_eye_t option").eq(0).siblings().remove();
                        $(".c_r_eye_t option").eq(0).after(data.info.r_eye_t.html);
                        $(".c_r_eye_t option").removeAttr("selected")
                    } else {
                        $(".c_r_eye_t option").eq(0).siblings().remove();
                        $(".r_eye_t option").eq(0).siblings().remove()
                    }
					
						 if (typeof data.info.r_eye_a != "undefined") {
                        $(".r_eye_a option").eq(0).siblings().remove();
                        $(".r_eye_a option").eq(0).after(data.info.r_eye_a.html);
                        $(".c_r_eye_a option").eq(0).siblings().remove();
                        $(".c_r_eye_a option").eq(0).after(data.info.r_eye_a.html);
                        $(".c_r_eye_a option").removeAttr("selected")
                    } else {
                        $(".c_r_eye_a option").eq(0).siblings().remove();
                        $(".r_eye_a option").eq(0).siblings().remove()
                    }
					
					  var pdvalsg = accAdd(data.info.l_eye_t,data.info.r_eye_t);
             
                      $(".pd_eye_t").html(data.info.pd_eye_t);
                }
                arrleng = imge.length;
                for (var i = 0; i < imge.length; i++) {
                    if (imge[i].Trim() !== "") {
                        bl_loading(imge[i], attrclass[i], i % 2)
                    }
                }
            }
        })
    }
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
                showContentImage(blclass, image.src, count, bisf)
            }
        } else {
            count++;
            showContentImage(blclass, image.src, count, bisf)
        }
    } else {
        image.onload = function() {
            if (image.complete == true) {
                count++;
                showContentImage(blclass, image.src, count, bisf)
            }
        }
        image.onerror = function() {}
    }
}

var jpcls = "";
function showContentImage(blclass, image, count, bisf) {
    if (blclass == "jt") {
        $(".bl_" + blclass, ".qingdan1").eq(0).find("img").remove();
        $(".bl_" + blclass, ".qingdan1").eq(0).append('<img src="' + image + '" style="display:none" />');
        $(".bl_" + blclass).eq(0).find("img").remove();
        $(".bl_" + blclass).eq(0).append('<img src="' + image + '" style="display:none" />')
		
		 //  $(".sbl_" + blclass, ".qingdan1").eq(0).find("img").remove();
      //  $(".sbl_" + blclass, ".qingdan1").eq(0).append('<img src="' + image + '" style="display:none" />');
        $(".sbl_" + blclass).eq(0).find("img").remove();
        $(".sbl_" + blclass).eq(0).append('<img src="' + image + '" style="display:none" />')
		
				  // $(".tbl_" + blclass, ".qingdan1").eq(0).find("img").remove();
       // $(".tbl_" + blclass, ".qingdan1").eq(0).append('<img src="' + image + '" style="display:none" />');
        $(".tbl_" + blclass).eq(0).find("img").remove();
        $(".tbl_" + blclass).eq(0).append('<img src="' + image + '" style="display:none" />')
    } else {

       $(".bl_" + blclass, ".qingdan1").eq(bisf).empty().append('<img src="' + image + '" style="display:none" />');
        $(".bl_" + blclass).eq(bisf).empty().append('<img src="' + image + '" style="display:none" />')
		// $(".sbl_" + blclass, ".qingdan1").eq(bisf).empty().append('<img src="' + image + '" style="display:none" />');
        $(".sbl_" + blclass).eq(bisf).empty().append('<img src="' + image + '" style="display:none" />')
		
		// $(".tbl_" + blclass, ".qingdan1").eq(bisf).empty().append('<img src="' + image + '" style="display:none" />');
        $(".tbl_" + blclass).eq(bisf).empty().append('<img src="' + image + '" style="display:none" />')
    }
    if (count == arrleng) {
        $(".miao_load").hide();
        $("img", ".hasimg").show();
		$("img", ".ghasimg").show();
		$("img", ".thasimg").show();
        $("img", ".hasimg_t").show()
    }
}
function boxLoading(imagesrc, par, bisf, bdimgobj) {
    var browser = new Object();
    var obj = new Object();
    browser.useragent = window.navigator.userAgent.toLowerCase();
    browser.ie = /msie/.test(browser.useragent);
    browser.moz = /gecko/.test(browser.useragent);
    // var imgsrc = obj.attr("box_img");
    var image = new Image;
    image.src = imagesrc;
    if (browser.ie) {
        if (image.height === 0) {
            image.onload = function() {
                boxcount++;
                showBoxImage(imagesrc, par, boxcount, bisf, bdimgobj);
            }
        } else {
            boxcount++;
            showBoxImage(imagesrc, par, boxcount, bisf, bdimgobj);
        }
    } else {
        image.onload = function() {
            if (image.complete == true) {
                boxcount++;
                showBoxImage(imagesrc, par, boxcount, bisf, bdimgobj);
            }
        }
        image.onerror = function() {}
    }
}
function showBoxImage(imgsrc, parclass, counts, isf, bdimgobj) {
    $("img", bdimgobj).eq(isf).attr("src", imgsrc);
    if (counts == 2) {
        $(".miao_load").hide();
        bdimgobj.prependTo($("." + parclass));
        $(".bl_box:last", $("." + parclass)).stop().animate({
            opacity: 0
        },
        800, "easeInOutSine");
    }
}

String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "")
}
String.prototype.getStringLen = function() {
    var realLength = 0,
    len = this.length,
    charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = this.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2
    }
    return realLength
}
function kcinit() {
    kcarray["jk_id"] = glattrid['jk_id'];
    kcarray["qk_id"] = glattrid['qk_id'];
    kcarray["sj_id"] = glattrid['sj_id'];
    kcarray["jt_id"] = glattrid['jt_id'];
    kcarray["jp_id"] = glattrid['jp_id'];
    kcarray["jh_id"] = glattr['jh_id'];
    kcarray["cz_id"] = glattr['cz_id']
}

function setColor(obj) {
    if (typeof obj.attr("font_color") != "undefined") {
        if ($(".wz_big").attr("style").match(/\s*color/)) {
            $(".wz_big").attr("style", $(".wz_big").attr("style").replace(/\s*color:[\w]*;\b|s*color:(.*)\b;|\s*color:\s*rgb\(.*\);/, "color:" + obj.attr("font_color") + ";"))
        } else {
            $(".wz_big").attr("style", "color:" + obj.attr("font_color") + ";" + $(".wz_big").attr("style"))
        }
 
    }

 
}

function oCopy(obj) {
    var couponResultHtml = $(obj).attr("share_link");
    if (window.clipboardData) {
        window.clipboardData.clearData();
        var couponResult = window.clipboardData.setData("couponResult", couponResultHtml);
        if (couponResult) {
            alert("拷贝成功！")
        } else {
            alert("拷贝失败！")
        }
    } else if (navigator.userAgent.indexOf("Opera") != -1) {
        window.location = couponResultHtml
    } else if (window.netscape) {
        try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
        } catch(e) {
            alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'")
        }
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
        if (!clip) return;
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
        if (!trans) return;
        trans.addDataFlavor('text/unicode');
        var str = new Object();
        var len = new Object();
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        var copytext = couponResultHtml;
        str.data = copytext;
        trans.setTransferData("text/unicode", str, copytext.length * 2);
        var clipid = Components.interfaces.nsIClipboard;
        if (!clip) return false;
        clip.setData(trans, null, clipid.kGlobalClipboard)
    }
}
Number.prototype.add = function(arg) {
    return accAdd(arg, this)
}; (function(a) {
    a.scrollC = a.scrollC || {};
    a.scrollC.scrollbar = {
        options: {
            axis: "y",
            wheel: 40,
            scroll: true,
            lockscroll: true,
            size: "auto",
            sizethumb: "auto",
            invertscroll: false
        }
    };
    a.fn.scrollCscrollbar = function(d) {
        var c = a.extend({},
        a.scrollC.scrollbar.options, d);
        this.each(function() {
            a(this).data("tsb", new b(a(this), c))
        });
        return this
    };
    a.fn.scrollCscrollbar_update = function(c) {
        return a(this).data("tsb").update(c)
    };
    a.fn.clickscrollbar_update = function(c) {

        return a(this).data("tsb").updateclick(c)
    };
    function b(q, g) {
        var k = this,
        t = q,
        j = {
            obj: a(".viewport_c", q)
        },
        h = {
            obj: a(".overview_c", q)
        },
        d = {
            obj: a(".scrollbar_c")
        },
        m = {
            obj: a(".track_c")
        },
        p = {
            obj: a(".thumb_c")
        },
        cc = {
            obj: a(".dingz_guan", q)
        },
        l = g.axis === "x",
        n = l ? "left": "top",
        v = l ? "Width": "Height",
        r = 0,
        y = {
            start: 0,
            now: 0
        },
        o = {},
        e = "ontouchstart" in document.documentElement;
        function c() {
            k.update();
            s();
            return k
        }
        this.update = function(z) {
            j[g.axis] = j.obj[0]["offset" + v];
            h[g.axis] = h.obj[0]["scroll" + v];
            h.ratio = j[g.axis] / h[g.axis];
            d.obj.toggleClass("disable", h.ratio >= 1);
            m[g.axis] = g.size === "auto" ? j[g.axis] : g.size;
            p[g.axis] = Math.min(m[g.axis], Math.max(0, (g.sizethumb === "auto" ? (m[g.axis] * h.ratio) : g.sizethumb)));
            d.ratio = g.sizethumb === "auto" ? (h[g.axis] / m[g.axis]) : (h[g.axis] - j[g.axis]) / (m[g.axis] - p[g.axis]);
            r = (z === "relative" && h.ratio <= 1) ? Math.min((h[g.axis] - j[g.axis]), Math.max(0, r)) : 0;
            r = (z === "bottom" && h.ratio <= 1) ? (h[g.axis] - j[g.axis]) : isNaN(parseInt(z, 10)) ? r: parseInt(z, 10);
            w()
        };
        this.updateclick = function(z) {
            j[g.axis] = j.obj[0]["offset" + v];
            h[g.axis] = h.obj[0]["scroll" + v];

            h.ratio = j[g.axis] / h[g.axis];
            d.obj.toggleClass("disable", h.ratio >= 1);
            m[g.axis] = g.size === "auto" ? j[g.axis] : g.size;
            p[g.axis] = Math.min(m[g.axis], Math.max(0, (g.sizethumb === "auto" ? (m[g.axis] * h.ratio) : g.sizethumb)));
            d.ratio = g.sizethumb === "auto" ? (h[g.axis] / m[g.axis]) : (h[g.axis] - j[g.axis]) / (m[g.axis] - p[g.axis]);
            r = (z === "relative" && h.ratio <= 1) ? Math.min((h[g.axis] - j[g.axis]), Math.max(0, r)) : 0;
            r = (z === "bottom" && h.ratio <= 1) ? (h[g.axis] - j[g.axis]) : isNaN(parseInt(z, 10)) ? r: parseInt(z, 10);
            ws()
        };
        function w() {
            var z = v.toLowerCase();
            p.obj.css(n, r / d.ratio);
            h.obj.css(n, -r);
            cc.obj.css(n, r + 10);
            o.start = p.obj.offset()[n];
            d.obj.css(z, m[g.axis]);
            m.obj.css(z, m[g.axis]);
            p.obj.css(z, p[g.axis])
        }
        function ws() {
            var z = v.toLowerCase();
            p.obj.animate({
                top: (r / d.ratio)
            },
            800,
            function() {

});
            h.obj.animate({
                top: -r
            },
            800);

            if (r > 0) {
                hi();
                $(".dingzhi_go_top").animate({
                    opacity: 1
                },
                800,
                function() {
                    $(".dingzhi_go_top").show();
                    $(".dingzhi_go_top").css("opacity", 1);
                });

            } else {
                si();
                $(".dingzhi_go_top").animate({
                    opacity: 0
                },
                800,
                function() {
                    $(".dingzhi_go_top").hide();
                    $(".dingzhi_go_top").css("opacity", 1);
                });

            }
            o.start = p.obj.offset()[n];
            d.obj.css(z, m[g.axis]);
            m.obj.css(z, m[g.axis]);
            p.obj.css(z, p[g.axis])
        }
        function s() {
            if (!e) {
                p.obj.bind("mousedown", i);
                m.obj.bind("mouseup", u)
            } else {
                j.obj[0].ontouchstart = function(z) {
                    if (1 === z.touches.length) {
                        i(z.touches[0]);
                        z.stopPropagation()
                    }
                }
            }
            if (g.scroll && window.addEventListener) {
                t[0].addEventListener("DOMMouseScroll", x, false);
                t[0].addEventListener("mousewheel", x, false);
                t[0].addEventListener("MozMousePixelScroll",
                function(z) {
                    z.preventDefault()
                },
                false);
                $(".scrollCs")[0].addEventListener("DOMMouseScroll", x, false);
                $(".scrollCs")[0].addEventListener("mousewheel", x, false);
                $(".scrollCs")[0].addEventListener("MozMousePixelScroll",
                function(z) {
                    z.preventDefault()
                },
                false)
            } else {
                if (g.scroll) {
                    t[0].onmousewheel = x;
                    $(".scrollCs")[0].onmousewheel = x
                }
            }
        }
        function i(A) {
            a("body").addClass("noSelect");
            var z = parseInt(p.obj.css(n), 10);
            o.start = l ? A.pageX: A.pageY;
            y.start = z == "auto" ? 0 : z;
            if (!e) {
                a(document).bind("mousemove", u);
                a(document).bind("mouseup", f);
                p.obj.bind("mouseup", f)
            } else {
                document.ontouchmove = function(B) {
                    B.preventDefault();
                    u(B.touches[0])
                };
                document.ontouchend = f
            }
        }
        function x(B) {
            if (h.ratio < 1) {
                var A = B || window.event,
                z = A.wheelDelta ? A.wheelDelta / 120 : -A.detail / 3;
                r -= z * g.wheel;

                if (r > $(window).height() - 60) {

                    hi();
                    $(".dingzhi_go_top").fadeIn();
                } else {

                    si();
                    $(".dingzhi_go_top").hide();
                }

                r = Math.min((h[g.axis] - j[g.axis]), Math.max(0, r));
                p.obj.css(n, r / d.ratio);
                h.obj.css(n, -r);
                cc.obj.css(n, r + 10);
                if (g.lockscroll || (r !== (h[g.axis] - j[g.axis]) && r !== 0)) {
                    A = a.event.fix(A);
                    A.preventDefault()
                }
            }
        }
        function u(z) {
            if (h.ratio < 1) {
                if (g.invertscroll && e) {
                    y.now = Math.min((m[g.axis] - p[g.axis]), Math.max(0, (y.start + (o.start - (l ? z.pageX: z.pageY)))))
                } else {
                    y.now = Math.min((m[g.axis] - p[g.axis]), Math.max(0, (y.start + ((l ? z.pageX: z.pageY) - o.start))))
                }
                r = y.now * d.ratio;

                if (r > $(window).height() - 60) {
                    hi();
                    $(".dingzhi_go_top").fadeIn();
                } else {
                    si();
                    $(".dingzhi_go_top").hide();
                }

                h.obj.css(n, -r);
                p.obj.css(n, y.now);
                cc.obj.css(n, r + 10)
            }
        }
        function hi() {
            if ($(".tjlun").height() > 0) {
                $(".tjlun").height(0);
                $(".tjlun").removeClass("hasOn").addClass("hasOff");
                $(".desinger").removeClass("hasOn").addClass("hasOff");
                $(".upbox").removeClass("select");
            }
            $(".tjk").stop().animate({
                top: -$(".tjk").outerHeight(),
                opacity: .5
            },
            600);

        }

        function si() {
            $(".tjk").stop().animate({
                top: 0,
                opacity: 1
            },
            600);

        }
        function f() {
            a("body").removeClass("noSelect");
            a(document).unbind("mousemove", u);
            a(document).unbind("mouseup", f);
            p.obj.unbind("mouseup", f);
            document.ontouchmove = document.ontouchend = null
        }
        return c()
    }
} (jQuery));

if ('undefined' != typeof jQuery) { (function($) {
        'use strict';
        $.imgpreload = function(imgs, settings) {
            settings = $.extend({},
            $.fn.imgpreload.defaults, (settings instanceof Function) ? {
                all: settings
            }: settings);

            if ('string' == typeof imgs) {
                imgs = [imgs];
            }

            var loaded = [];

            $.each(imgs,
            function(i, elem) {
                var img = new Image();

                var url = elem;

                var img_obj = img;

                if ('string' != typeof elem) {
                    url = $(elem).attr('src') || $(elem).css('background-image').replace(/^url\((?:"|')?(.*)(?:'|")?\)$/mg, "$1");

                    img_obj = elem;
                }

                $(img).bind('load error',
                function(e) {
                    loaded.push(img_obj);

                    $.data(img_obj, 'loaded', ('error' == e.type) ? false: true);
                    if (settings.each instanceof Function) {
                        settings.each.call(img_obj, loaded.slice(0));
                    }

                    if (loaded.length >= imgs.length && settings.all instanceof Function) {
                        settings.all.call(loaded);
                    }

                    $(this).unbind('load error');
                });

                img.src = url;
            });
        };

        $.fn.imgpreload = function(settings) {
            $.imgpreload(this, settings);

            return this;
        };

        $.fn.imgpreload.defaults = {
            each: null,
            all: null
        };

    })(jQuery);
}