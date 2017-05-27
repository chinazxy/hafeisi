$(function () {
   var cfsta = false;
   var pdl=$(".l_eye_t").find("option:selected").text();
   var pdr=$(".r_eye_t").find("option:selected").text();
   var pdval = accAdd(pdl,pdr);
   $(".pd_eye_t").text(pdval);
   
    $(".save_profile").click(function () {

        if ($(".l_eye_s").find("option:selected").val() == "" && $(".l_eye_c").find("option:selected").val() == "" && ($(".l_eye_a").find("option:selected").val() == "" || typeof $(".l_eye_a").find("option:selected").val() == "undefined") && $(".l_eye_t").find("option:selected").val() == "" && $(".r_eye_s").find("option:selected").val() == "" && $(".r_eye_c").find("option:selected").val() == "" && ($(".r_eye_a").find("option:selected").val() == "" || typeof $(".l_eye_a").find("option:selected").val() == "undefined") && $(".r_eye_t").find("option:selected").val() == "") {
           $(".miao_tishi").html("<span class='ti_error'>请填写处方信息</span>");
        } else {
            if (cfsta === false) {
				    $(".miao_tishi").html("<span class='ti_error'>处方信息不完整请补充</span>");
       
            } else {

                var lenuval = accAdd(glattr['l_eye_s'], glattr['l_eye_c']);

               // if (lenuval < union_sc) {
                   // showcf("左眼球镜加左眼柱镜不能超过联合光度", union_sc, "bcc");
                  //  return false;
               // }
                if ($(".l_eye_c").val() == "" && $(".l_eye_a").val() != "") {
					 $(".miao_tishi").html("<span class='ti_error'>请填写左眼轴位</span>");
                   // showcf("请填写左眼轴位", "", "bcc");
                    return false
                }


                var rightval = accAdd(glattr['r_eye_s'], glattr['r_eye_c']);
              //  if (rightval < union_sc) {
                    //showcf("右眼球镜加右眼柱镜不能超过联合光度", union_sc, "bcc");
                   // return false;
                //}

                if ($(".r_eye_c").val() == "" && $(".r_eye_a").val() != "") {
					 $(".miao_tishi").html("<span class='ti_error'>请填写右眼轴位</span>");
                   // showcf("请填写右眼轴位", "", "bcc");
                    return false
                }
               // if (glattr['pd_eye_t'] > tg_max) {
                  //  showcf("两眼瞳距值大于最大瞳距值", tg_max, "bcc");
                   // return false;
              //  } else if (glattr['pd_eye_t'] < tg_min) {
                   // showcf("两眼瞳距值小于最小瞳距值", tg_min, "bcc");
                   // return false;
               // } else {
                   // $(".bcc").hide().html("")
               // }

            }

        }
		
		var l_eye_s=$(".l_eye_s").val();
        var l_eye_c=$(".l_eye_c").val();
		var l_eye_a=$(".l_eye_a").val();
		var l_eye_t=$(".l_eye_t").val();
		var r_eye_s=$(".r_eye_s").val();
        var r_eye_c=$(".r_eye_c").val();
		var r_eye_a=$(".r_eye_a").val();
		var r_eye_t=$(".r_eye_t").val();
		
		    $.ajax({
                type: 'POST',
                url: 'user.php',
				
                data:{
				    l_eye_s:l_eye_s,
					l_eye_c:l_eye_c,
					l_eye_a:l_eye_a,
					l_eye_t:l_eye_t,
					r_eye_s:r_eye_s,
					r_eye_c:r_eye_c,
					r_eye_a:r_eye_a,
					r_eye_t:r_eye_t,
					token:token,
					timestamp:timestamp,
					act:"add_prescription"
					
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				    isload=false;
					$(".miao_tishi").empty().show().html("表单正在提交...");
                },
                success: function(data){
			     $(".miao_tishi").empty().hide();
			    switch(data.err){
					case "l_eye_a_error":
					$(".miao_tishi").show().html("<span class='ti_error'>请选择左眼轴位!</span>").show();
					break;
					case "r_eye_a_error":
					$(".miao_tishi").show().html("<span class='ti_error'>请选择右眼轴位!</span>").show();
					break;
				    case "l_eye_t_error":
					$(".miao_tishi").show().html("<span class='ti_error'>请选择左眼轴位!</span>").show();
					break;
                    case "r_eye_t_error":
					$(".miao_tishi").show().html("<span class='ti_error'>请选择右眼轴位!</span>").show();
					break;
				    case "reg_err":
					$(".miao_tishi").show().html("<span class='ti_error'>验证失败!</span>").show();
					break;
					case "save_success":
					$(".miao_tishi").show().html("保存成功!");
					break;
					case "save_fail":
					$(".miao_tishi").show().html("<span class='ti_error'>保存失败!</span>").show();
					break;
					case "update_success":
					$(".miao_tishi").show().html("修改成功!");
					break;
					case "update_fail":
					$(".miao_tishi").show().html("修改失败!");
					break;
					case "not_login":
					alert("请先登录！");
					location.href="index.php";
					break;
                 default:
				 $(".miao_tishi").show().html("<span class='ti_error'>系统错误，刷新后重试!</span>").show();
                }
                  
		
                }
            });
		

    });
	
	$(".l_eye_t").change(function(){
	pdl=$(this).find("option:selected").text().Trim();
	pdval = accAdd(pdl,pdr);
    $(".pd_eye_t").text(pdval);	
	});
	$(".r_eye_t").change(function(){
	pdr=$(this).find("option:selected").text().Trim();
	pdval = accAdd(pdl,pdr);
    $(".pd_eye_t").text(pdval);	
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
});