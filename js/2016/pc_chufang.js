var union_sc=-15;
var tg_max=90;
var tg_min=45;
var pdvals=0;
var glattr={
	        "l_eye_s": "",
            "l_eye_c": "",
            "l_eye_a": "",
            "l_eye_t": 0,
            "r_eye_s": "",
            "r_eye_c": "",
            "r_eye_a": "",
            "r_eye_t": 0,
            "pd_eye_t": 0 
	  
  };
$(function(){
	
	function initSel(){
		
	    glattr['r_eye_c'] = ($(".r_eye_c").val() != "") ? $(".r_eye_c").find("option:selected").text().Trim() : "";
        glattr['r_eye_a'] = ($(".r_eye_a").val() != "") ? $(".r_eye_a").find("option:selected").text().Trim() : "";
        glattr['r_eye_t'] = ($(".r_eye_t").val() != "") ? $(".r_eye_t").find("option:selected").text().Trim() : "";
        glattr['r_eye_s'] = ($(".r_eye_s").val() != "") ? $(".r_eye_s").find("option:selected").text().Trim() : "";
        glattr['l_eye_c'] = ($(".l_eye_c").val() != "") ? $(".l_eye_c").find("option:selected").text().Trim() : "";
        glattr['l_eye_a'] = ($(".l_eye_a").val() != "") ? $(".l_eye_a").find("option:selected").text().Trim() : "";
        glattr['l_eye_t'] = ($(".l_eye_t").val() != "") ? $(".l_eye_t").find("option:selected").text().Trim() : "";
        glattr['l_eye_s'] = ($(".l_eye_s").val() != "") ? $(".l_eye_s").find("option:selected").text().Trim() : "";
		glattr['pd_eye_t'] =$(".pd_eye_t").val();
		
	}
	
	initSel();
 
     $(".j_chuf2").live("change",
    function(e) {
 
            if ($(this).hasClass("l_eye_s")) {
                glattr['l_eye_s'] = !isNaN($(this).find("option:selected").text())?$(this).find("option:selected").text():"";
			    lenuval = accAdd(glattr['l_eye_s'], glattr['l_eye_c']);
				 if (lenuval < union_sc) {
                 $(".miao_tishi").addClass("err_msg").html("*左眼球镜加左眼柱镜不能超过联合光度" + union_sc).fadeIn();
				 glattr['l_eye_s']="";
				 $("option",$(this)).eq(0).attr("selected","selected");
				 }else{
				  $(".miao_tishi").hide();
				 }

            }
            if ($(this).hasClass("l_eye_c")) {
                glattr['l_eye_c'] = !isNaN($(this).find("option:selected").text())?$(this).find("option:selected").text():"";
			     lenuval = accAdd(glattr['l_eye_s'], glattr['l_eye_c']);
				 	 if (lenuval < union_sc) {
                      $(".miao_tishi").addClass("err_msg").html("*左眼球镜加左眼柱镜不能超过联合光度" + union_sc).fadeIn();
					  		 glattr['l_eye_c']="";
				 $("option",$(this)).eq(0).attr("selected","selected");
				 }else if ($(this).find("option:selected").val() != "" && $(".l_eye_a").find("option:selected").val() == "") {
                     $(".miao_tishi").addClass("err_msg").html("*请选择左眼轴位！").fadeIn();
                    $(".l_eye_a").removeAttr("disabled");
                } else if ($(this).find("option:selected").val() != "" && $(".l_eye_a").find("option:selected").val() != "") {
                    $(".l_eye_a").removeAttr("disabled");
                    $(".miao_tishi").hide();
                } else {
                    $(".miao_tishi").hide();
                    $(".l_eye_a option").eq(0).attr("selected", "selected");
                    $(".l_eye_a").attr("disabled", "disabled")
                }
			
            }

            if ($(this).hasClass("l_eye_a")) {
                glattr['l_eye_a'] = !isNaN($(this).find("option:selected").text())?$(this).find("option:selected").text():"";
                if ($(".l_eye_c").find("option:selected").text().Trim() != "" && $(".l_eye_c").find("option:selected").val() != "" && $(".l_eye_a").find("option:selected").val() == "") {
                   $(".miao_tishi").addClass("err_msg").html("*请选择左眼轴位！").fadeIn();
                } else {
                    $(".miao_tishi").hide().html("");
                }
            }
 
            if ($(this).hasClass("r_eye_s")) {
                glattr['r_eye_s'] = !isNaN($(this).find("option:selected").text())?$(this).find("option:selected").text():"";
				  rightval = accAdd(glattr['r_eye_s'], glattr['r_eye_c']);
                 if (rightval < union_sc) {
				  glattr['r_eye_s']='';
				  $("option",$(this)).eq(0).attr("selected","selected");
                 $(".miao_tishi").addClass("err_msg").html("*右眼球镜加右眼柱镜不能超过联合光度" + union_sc).fadeIn();
				  
                   }
            }
            if ($(this).hasClass("r_eye_c")) {
                glattr['r_eye_c'] = !isNaN($(this).find("option:selected").text())?$(this).find("option:selected").text():"";
					  rightval = accAdd(glattr['r_eye_s'], glattr['r_eye_c']);
                 if (rightval < union_sc) {
                 $(".miao_tishi").html("*右眼球镜加右眼柱镜不能超过联合光度" + union_sc).fadeIn();
				 		  glattr['r_eye_c']='';
				  $("option",$(this)).eq(0).attr("selected","selected");
                   }else if ($(this).find("option:selected").val() != "" && $(".r_eye_a").find("option:selected").val() == "") {
                    $(".miao_tishi").html("*请选择右眼轴位！").fadeIn();
                    $(".r_eye_a").removeAttr("disabled")
                } else if ($(this).find("option:selected").val() != "" && $(".r_eye_a").find("option:selected").val() != "") {
                    $(".r_eye_a").removeAttr("disabled");
                    $(".miao_tishi").hide().html("");
                } else {
                    $(".miao_tishi").hide().html("");
                    $(".r_eye_a option").eq(0).attr("selected", "selected");
                    $(".r_eye_a").attr("disabled", "disabled")
                }
            }

            if ($(this).hasClass("r_eye_a")) {
                glattr['r_eye_a'] = !isNaN($(this).find("option:selected").text())?$(this).find("option:selected").text():"";
                if ($(".r_eye_c").find("option:selected").text().Trim() != "" && $(".r_eye_c").find("option:selected").val() != "" && $(".r_eye_a").find("option:selected").val() == "") {
                    $(".miao_tishi").html("*请选择右眼轴位！").fadeIn();
                } else {
                    $(".miao_tishi").hide().html("");
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
                    $(".miao_tishi").addClass("err_msg").html("*请选择左眼瞳距！").fadeIn();
                    //showLoTip($(".l_eye_t"), "请选择左眼瞳距")
                } else {
				if (glattr['pd_eye_t'] > tg_max) {
                 $(".miao_tishi").addClass("err_msg").html("*两眼瞳距值大于最大瞳距值" + tg_max).fadeIn();
				 }else{
                    $(".miao_tishi").hide().html("");
					}
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
                    $(".miao_tishi").addClass("err_msg").html("*请选择右眼瞳距！").fadeIn();
                    // showLoTip($(".r_eye_t"), "请选择右眼瞳距")
                } else {
					if (glattr['pd_eye_t'] > tg_max) {
                 $(".miao_tishi").addClass("err_msg").html("*两眼瞳距值大于最大瞳距值" + tg_max).fadeIn();
				 }else{
                    $(".miao_tishi").hide().html("");
					}
              
                }
            }
 
       
        e.stopPropagation()
    });
	
	
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
            $(".miao_tishi").addClass("err_msg").html("*请填写处方信息！").fadeIn();
            return false
        } else {
            $(".miao_tishi").hide().html("");
        }
        if ($(".l_eye_c").find("option:selected").text().Trim() != "" && $(".l_eye_c").find("option:selected").val() != "" && $(".l_eye_a").find("option:selected").val() == "") {
            $(".miao_tishi").addClass("err_msg").html("*请填选择左眼轴拉！").fadeIn();
            return false
        } else {
            $(".miao_tishi").hide().html("")
        }
        if ($(".r_eye_c").find("option:selected").text().Trim() != "" && $(".r_eye_c").find("option:selected").val() != "" && $(".r_eye_a").find("option:selected").val() == "") {
            $(".miao_tishi").addClass("err_msg").html("*请填选择右眼轴拉！").fadeIn();
            return false
        } else {
            $(".miao_tishi").hide().html("")
        }
        if ($(".l_eye_t").find("option:selected").text().Trim() != "" && $(".l_eye_t").find("option:selected").val() == "") {
            $(".miao_tishi").addClass("err_msg").html("*请填选择左眼瞳距！").fadeIn();
            return false
        } else {
            $(".miao_tishi").hide().html("")
        }
        if ($(".r_eye_t").find("option:selected").text().Trim() != "" && $(".r_eye_t").find("option:selected").val() == "") {
            $(".miao_tishi").addClass("err_msg").html("*请选择右眼瞳距！").fadeIn();
            return false
        } else {
            $(".miao_tishi").hide().html("")
        }
        var lenuval = accAdd(glattr['l_eye_s'], glattr['l_eye_c']);
        if (lenuval < union_sc) {
            $(".miao_tishi").addClass("err_msg").html("*左眼球镜加左眼柱镜不能超过联合光度" + union_sc).fadeIn();
            return false
        }
        var rightval = accAdd(glattr['r_eye_s'], glattr['r_eye_c']);
        if (rightval < union_sc) {
            $(".miao_tishi").addClass("err_msg").html("*右眼球镜加右眼柱镜不能超过联合光度" + union_sc).fadeIn();
            return false
        }
        if (glattr['pd_eye_t'] > tg_max) {
            $(".miao_tishi").addClass("err_msg").html("*两眼瞳距值大于最大瞳距值" + tg_max).fadeIn();
            return false
        }else {
            $(".miao_tishi").hide().html("")
        }
   
    }
	 
	 $(".sb_marginong").click(function(){
		 
	 if (yzcfinfo(pdvals) == false) {
			 
                return false
         }else{
 
		  $.ajax({
                type:'POST',
                url:'user.php',
				data:{
                token: token,
                timestamp: timestamp,
                glattr: glattr,
                act: "add_chufang"
                 },
  
                dataType: "json",
                beforeSend: function(XMLHttpRequest) {
				$(".miao_tishi").removeClass("err_msg").fadeIn().html("数据提交中");
                },
                success: function(data) {
				 
					 switch(data.err){
						  case "l_eye_s_e":
						 $(".miao_tishi").addClass("err_msg").fadeIn().html("*请选择左眼球镜！");
						 break;
						 case "l_eye_c_e":
						 $(".miao_tishi").addClass("err_msg").fadeIn().html("*请选择左眼柱镜！");
						 break;
						 	 case "l_eye_a_e":
						 $(".miao_tishi").addClass("err_msg").fadeIn().html("*请选择左眼轴位！");
						 break;
						 case "l_eye_t_e":
						  $(".miao_tishi").addClass("err_msg").fadeIn().html("*请填选择左眼瞳距！");
						 break;
						 case "l_eye_pd_e":
						 $(".miao_tishi").addClass("err_msg").fadeIn().html("*左眼球镜加左眼柱镜不能超过联合光度-15");
						 break;
						 case "r_eye_s_e":
						  $(".miao_tishi").addClass("err_msg").fadeIn().html("*请选择右眼球镜！");
						 break;
						 case "r_eye_c_e":
						 		 $(".miao_tishi").addClass("err_msg").fadeIn().html("*请选择右眼柱镜！");
						 break;
						 case "r_eye_a_e":
						 	 $(".miao_tishi").addClass("err_msg").fadeIn().html("*请选择右眼轴位！");
						 break;
						 
						 case "r_eye_t_e":
						  $(".miao_tishi").addClass("err_msg").fadeIn().html("*请填选择右眼瞳距！");
						
						break;
						
						case "r_eye_pd_e":
						  $(".miao_tishi").addClass("err_msg").fadeIn().html("*右眼球镜加右眼柱镜不能超过联合光度-15");
						
						break;
						case "save_s":
						
						 $(".miao_tishi").removeClass("err_msg").fadeIn().html("添加成功");
						setTimeout(function(){
					  $(".miao_tishi").hide();
						},2000);
						break;
						
								case "save_e":
					   $(".miao_tishi").removeClass("err_msg").fadeIn().html("添加失败");
						setTimeout(function(){
							  $(".miao_tishi").hide();
						},2000);
						break;
						
							case "update_s":
						   $(".miao_tishi").removeClass("err_msg").fadeIn().html("修改成功");
						   setTimeout(function(){
							  $(".miao_tishi").hide();
						   },2000);
						 
						break;
						case "update_e":
						$(".miao_tishi").removeClass("err_msg").fadeIn().html("修改失败");
						setTimeout(function(){
							  $(".miao_tishi").hide();
						   },2000);
						break;
                        default:
						alert("系统错误，刷新后重试！");
						
						
						 
					 }
				}
		  });
	    }	 
		 
	 })

 
	
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