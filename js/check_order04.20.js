$(function() {


    function showTip(obj, msg) {

        $(".miao_yin_t").html("" + msg);
        $(".miao_yin").css({
            top: obj.offset().top - obj.outerHeight() - ($(".miao_yin").outerHeight()) / 2,
            left: obj.offset().left + obj.width() / 2 - $(".miao_yin").width() / 2
        }).fadeIn();

    }

    function hideTip(obj) {

        $(".miao_yin_t").html("");
        $(".miao_yin").css({
            top: 0,
            left: 0
        }).hide();

    }


    var state = 1;
    var tel = "";
    var surname = "";
    var ming = "";
    var quhao = "";
    var haoma = "";
    var mobile = "";
    var iphone = "";
    var address = "";
    var email = "";
    var zipcode = "";
    var room = '';
	
	 var fri=0;
	
	
	var inv_surname = "";
    var inv_ming = "";
    var inv_quhao = "";
    var inv_haoma = "";
    var inv_mobile = "";
    var inv_iphone = "";
    var inv_address = "";
    var inv_email = "";
    var inv_zipcode = "";
    var inv_room = '';
	var inv_types=0;
	var inv_type="";
	var company_name='';
	var inv_payee="";
	var inv_content="";
	
	var step_1=false;
    var step_2=false;
	var step_3=false;
	var step_4=false;
	
	var lowtype=0;
	
	
	var invfptait="";
	
	var inv_fpcontent="";
	
	

	
	
	$(".jie_tis2").click(function(){
	  $(this).hide();
	  $(".jiesuan_box_left44").stop().animate({width:240},100);
	
	});
	
	/*function yz_inpfptype(){
	
	 inv_type = $("#ECS_INVTYPE").val();
        if (inv_type <= 0) {
            showTip($("#ECS_INVTYPE"), "请选择发标税率。");

            return false;

        }
        hideTip($("#ECS_INVTYPE"));
        return true;
	
	
	}
	
   $("#ECS_INVTYPE").live("change",
    function() {
       yz_inpfptype();

    });*/
	
	
		function yz_inpfptait(){
	
	  inv_payee = $("#ECS_INVPAYEE").val();
        if (inv_payee.Trim() == "发票抬头" || inv_payee.Trim() == "") {
            $("#ECS_INVPAYEE").val("发票抬头");
            showTip($("#ECS_INVPAYEE"), "发票抬头不能为空。");

            return false;
        }
        hideTip($("#ECS_INVPAYEE"));
        return true;
	
	}
	
    $("#ECS_INVPAYEE").live("focus keyup",
    function() {

        if ($(this).val().Trim() == "发票抬头" || $(this).val().Trim() == "") {
     
            $(this).val("");
        } else {
            hideTip($(this));
        }
    });

    $("#ECS_INVPAYEE").live("blur",
    function() {
        yz_inpfptait($(this));

    });
	
	
	
		function yz_inpfpcontent(){
	
	      inv_content = $("#ECS_INVCONTENT").val();
        if (inv_content ==="") {
            showTip($("#ECS_INVCONTENT"), "请选择发标内容。");

            return false;

        }
        hideTip($("#ECS_INVCONTENT"));
        return true;
	
	
	}
	
   $("#ECS_INVCONTENT").live("change",
    function() {
       yz_inpfpcontent();

    });
	
	    /*验证发票姓氏*/
    function inv_yxconsignee(obj) {

        inv_surname = $(".inv_surname").val();
        if (inv_surname.Trim() == "姓氏" || inv_surname.Trim() == "") {
            $(".inv_surname").val("姓氏");
            showTip($(".inv_surname"), "姓氏不能为空。");

            return false;
        }
        hideTip($(".inv_surname"));
        return true;
    }

    $(".inv_surname").live("focus keyup",
    function() {

        if ($(this).val().Trim() == "姓氏" || $(this).val().Trim() == "") {
            // showTip($(this),"请输入姓氏。");
            $(this).val("");
        } else {
            hideTip($(this));
        }
    });

    $(".inv_surname").live("blur",
    function() {
        inv_yxconsignee($(this));

    });
	
	//验证发票名
	    function inv_yzming() {
        inv_ming = $(".inv_ming").val();

        if (inv_ming.Trim() === "" || inv_ming.Trim() == "名字") {
            $(".inv_ming").val("名字");
            showTip($(".inv_ming"), "名字不能为空。");

            return false;
        }
        hideTip($(".inv_ming"));

        return true;

    }

    $(".inv_ming").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "名字" || $(this).val().Trim() == "") {
            //  showTip($(this),"请输入名字。");
            $(this).val("");
        } else {
            hideTip($(this));
        }
    });

    $(".inv_ming").live("blur",
    function() {
        inv_yzming();

    });
	
	//验证发票区号
	
	    function inv_yzquhao() {
        inv_quhao = $(".inv_quhao").val();
        if (inv_quhao.Trim() === "" || inv_quhao == "区号") {
            $(".inv_quhao").val("区号");
            showTip($(".inv_quhao"), "请输入电话号码区号。");
            return false;
        }
        if (inv_quhao == 0) {

            inv_quhao = "";

        }
        hideTip($(".inv_quhao"));
        return true;

    }

    $(".inv_quhao").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "区号" || $(this).val().Trim() == "") {
            // showTip($(this),"请输入电话号码区号。");
            $(this).val("");
        } else {
            hideTip($(this));
        }
    });

    $(".inv_quhao").live("blur",
    function() {
        inv_yzquhao();

    });
	
	//验证发票号码
	    function inv_yzhaoma() {
        inv_haoma = $(".inv_haoma").val();
        if (inv_haoma.Trim() === "" || inv_haoma.Trim() == "联系号码 (如手机，区号输0)") {

            $(".inv_haoma").val("联系号码 (如手机，区号输0)");
            showTip($(".inv_haoma"), "请输入电话号码。");
            return false;
        } else {
            if (!inv_haoma.Trim().isMobile()) {

                showTip($(".inv_haoma"), "号码格式不正确。");

                return false;

            } else {

                if (inv_haoma.length == 11) {

                    mobile = inv_haoma;

                } else {
                    tel = quhao + "" + inv_haoma;

                }

                hideTip($(".inv_haoma"));

                return true;

            }

        }

    }
    $(".inv_haoma").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "联系号码 (如手机，区号输0)" || $(this).val().Trim() == "") {
            // showTip($(this),"请输入电话号码。");
            $(this).val("");
        } else {
            hideTip($(this));
        }
    });

    $(".inv_haoma").live("blur",
    function() {
        inv_yzhaoma();

    });
	
	//验证公司名
	    function inv_company() {
        company_name = $(".company_name").val();
        if (company_name.Trim() === "" || company_name.Trim() == "公司名(可选)") {
            $(".company_name").val("公司名(可选)");
            $(this).val("");

          
        } 
        return true;

    }

    $(".company_name").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "公司名(可选)" || $(this).val().Trim() == "") {

            $(this).val("");
        } 
    });

    $(".company_name").live("blur",
    function() {
        inv_company();

    });
	
	
	    /*省份*/
    var inv_selprovince = 0;

    function inv_checkP() {

        inv_selprovince = $("#inv_selprovince").val();
        selCity = 0;
        selDistricts = 0;
        if (inv_selprovince <= 0) {
            showTip($("#inv_selprovince"), "请选择所在的省份。");

            return false;

        }
        hideTip($("#inv_selprovince"));
        return true;

    }

    $("#inv_selprovince").live("change",
    function() {
        inv_selprovince = $("#inv_selprovince").val();
        if (inv_selprovince <= 0) {
            showTip($(this), "请选择所在的区。");

            return false;

        }
        hideTip($(this));
        return true;

    });

    /*城市*/
    var inv_selcity = 0;
    function inv_checkC() {

        inv_selcity = $(".inv_selcity").val();

        if (inv_selcity <= 0) {
            showTip($(".inv_selcity"), "请选择所在的城市。");

            return false;

        }
        hideTip($(".inv_selcity"));
        return true;

    }

    /*区*/
    var inv_seldistricts = 0;

    function inv_checkD() {

        inv_seldistricts = $("#inv_seldistricts").val();

   if($("#inv_seldistricts option").length>1){
 
 if(inv_seldistricts<=0){
     showTip($("#inv_seldistricts"),"请选择所在的区域。");
    
   return false;
 
 }
 
 }
        return true;

    }
	
	
	    function inv_yzaddress() {
        inv_address = $(".inv_address").val();

        if (inv_address.Trim() === "" || inv_address.Trim() == "区，街道编号/名称，楼宇名称") {
            $(".inv_address").val("区，街道编号/名称，楼宇名称");
            showTip($(".inv_address"), "请输入街道地址。");
            $(this).val("");

            return false;
        }

        hideTip($(".inv_address"));
        return true;

    }

    $(".inv_address").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "区，街道编号/名称，楼宇名称" || $(this).val().Trim() == "") {
            //showTip($(this),"请输入街道地址。");
            $(this).val("");
        } else {
            hideTip($(this));
        }
    });

    $(".inv_address").live("blur",
    function() {
        inv_yzaddress();

    });
	
	
	    function inv_yzroom() {
        inv_room = $(".inv_room").val();
        if (inv_room.Trim() === "" || inv_room.Trim() == "房间、套房、单元、楼层或街区") {
            $(".inv_room").val("房间、套房、单元、楼层或街区");
            $(this).val("");

            return true;
        }

        hideTip($(".inv_room"));
        return true;

    }

    $(".inv_room").live("focus keyup",
    function() {
        inv_room = $(this).val();
        if ($(this).val().Trim() == "房间、套房、单元、楼层或街区" || $(this).val().Trim() == "") {

            $(this).val("");
        } else {
            hideTip($(this));
        }
    });

    $(".inv_room").live("blur",
    function() {
        yzTelephone();

    });
	
	
	
	   function inv_yzzipcode() {
        inv_zipcode = $(".inv_zipcode").val();

        if (inv_zipcode.Trim() === "" || inv_zipcode.Trim() == "邮政编码") {

            $(".inv_zipcode").val("邮政编码");
            showTip($(".inv_zipcode"), "请填写邮政编码。");
            return false;
        } else {
            if (!inv_zipcode.Trim().youbian()) {

                showTip($(".inv_zipcode"), "邮政编码格式不正确。");

                return false;

            } else {
                hideTip($(".inv_zipcode"));

                return true;

            }

        }

    }
    $(".inv_zipcode").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "邮政编码" || $(this).val().Trim() == "") {
            //showTip($(this),"请填写必填字段。");
            $(this).val("");
        } else {
            hideTip($(this));
        }
    });

    $(".inv_zipcode").live("blur",
    function() {
        inv_yzzipcode();

    });
	
	
	
	
	
	    function inv_yzemail() {
        inv_email = $(".inv_email").val();
				
        if (inv_email.Trim() === "" || inv_email.Trim() == "电子邮箱") {

            $(".inv_email").val("电子邮箱");
            showTip($(".inv_email"), "请填写电子邮箱。");
            $(this).val(" ");

            return false;
        } else {

            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!filter.test(inv_email.Trim())) {
                showTip($(".inv_email"), "请使用有效的电子邮件地址格式: email@domain.com。");

                return false;

            } else {

                hideTip($(".inv_email"));
                return true;
            }

        }

    }

    $(".inv_email").live("focus keyup",
    function() {

        if ($(this).val().Trim() == "电子邮箱" || $(this).val().Trim() == "") {
            // showTip($(this),"请填写必填字段。");
            $(this).val("");
        } else {
            hideTip($(this));
        }
    });

    $(".inv_email").live("blur",
    function() {
	
	
        inv_yzemail();

    });
    var slspeed = 500;
    $('input:radio[name=fapiao_radio]').eq(0).attr("checked",true);


    /*验证姓氏*/
    function yxconsignee(obj) {

        surname = $(".surname").val();
        if (surname.Trim() == "姓氏" || surname.Trim() == "") {
            $(".surname").val("姓氏");
            showTip($(".surname"), "姓氏不能为空。");

            return false;
        }
        hideTip($(".surname"));
        return true;
    }

    $(".surname").live("focus keyup",
    function() {

        if ($(this).val().Trim() == "姓氏" || $(this).val().Trim() == "") {
            // showTip($(this),"请输入姓氏。");
            $(this).val("");
        } else {
            hideTip($(this));
        }
    });

    $(".surname").live("blur",
    function() {
        yxconsignee($(this));

    });

    /*验证名*/

    function yzming() {
        ming = $(".ming").val();

        if (ming.Trim() === "" || ming.Trim() == "名字") {
            $(".ming").val("名字");
            showTip($(".ming"), "名字不能为空。");

            return false;
        }
        hideTip($(".ming"));

        return true;

    }

    $(".ming").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "名字" || $(this).val().Trim() == "") {
            //  showTip($(this),"请输入名字。");
            $(this).val("");
        } else {
            hideTip($(this));
        }
    });

    $(".ming").live("blur",
    function() {
        yzming();

    });

    /*区号*/

    function yzquhao() {
        quhao = $(".quhao").val();
        if (quhao.Trim() === "" || quhao == "区号") {
            $(".quhao").val("区号");
            showTip($(".quhao"), "请输入电话号码区号。");
            return false;
        }
        if (quhao == 0) {

            quhao = "";

        }
        hideTip($(".quhao"));
        return true;

    }

    $(".quhao").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "区号" || $(this).val().Trim() == "") {
            // showTip($(this),"请输入电话号码区号。");
            $(this).val("");
        } else {
            hideTip($(this));
        }
    });

    $(".quhao").live("blur",
    function() {
        yzquhao();

    });

    /*座机号*/

    function yzhaoma() {
        haoma = $(".haoma").val();
        if (haoma.Trim() === "" || haoma.Trim() == "联系号码 (如手机，区号输0)") {

            $(".haoma").val("联系号码 (如手机，区号输0)");
            showTip($(".haoma"), "请输入电话号码。");
            return false;
        } else {
            if (!haoma.Trim().isMobile()) {

                showTip($(".haoma"), "号码格式不正确。");

                return false;

            } else {

                if (haoma.length == 11) {

                    mobile = haoma;

                } else {
                    tel = quhao + "" + haoma;

                }

                hideTip($(".haoma"));

                return true;

            }

        }

    }
    $(".haoma").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "联系号码 (如手机，区号输0)" || $(this).val().Trim() == "") {
            // showTip($(this),"请输入电话号码。");
            $(this).val("");
        } else {
            hideTip($(this));
        }
    });

    $(".haoma").live("blur",
    function() {
        yzhaoma();

    });
	
	
		
	$(".wenzi2").live("click",function(){
	
	if($(".haoma").val()!="联系号码 (如手机，区号输0)" && yzhaoma()){
$(".iphone").val($(".haoma").val());

}
	
	});
    /*省份*/
    var selProvince = 0;

    function checkP() {

        selProvince = $("#selProvince").val();
        selCity = 0;
        selDistricts = 0;
        if (selProvince <= 0) {
            showTip($("#selProvince"), "请选择所在的省份。");

            return false;

        }
        hideTip($("#selProvince"));
        return true;

    }

    $("#selProvince").live("change",
    function() {
        selProvince = $("#selProvince").val();
        if (selProvince <= 0) {
            showTip($(this), "请选择所在的区。");

            return false;

        }
        hideTip($(this));
        return true;

    });

    /*城市*/
    var selCity = 0;
    function checkC() {

        selCity = $(".city").val();

        if (selCity <= 0) {
            showTip($(".city"), "请选择所在的城市。");

            return false;

        }
        hideTip($(".city"));
        return true;

    }

    /*区*/
    var selDistricts = 0;
    var selDhtml = "";
	
	function checkD(){
  hideTip($("#selDistricts"));
 selDistricts=$("#selDistricts").val();

 if($("#selDistricts option").length>1){
 
 if(selDistricts<=0){
     showTip($("#selDistricts"),"请选择所在的区域。");
    
   return false;
 
 }
 
 }
  hideTip($("#selDistricts"));
  return true;

}


    /*地址*/
    function yzaddress() {
        address = $(".jdaddress").val();

        if (address.Trim() === "" || address.Trim() == "区，街道编号/名称，楼宇名称") {
            $(".jdaddress").val("区，街道编号/名称，楼宇名称");
            showTip($(".jdaddress"), "请输入街道地址。");
            $(this).val("");

            return false;
        }

        hideTip($(".jdaddress"));
        return true;

    }

    $(".jdaddress").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "区，街道编号/名称，楼宇名称" || $(this).val().Trim() == "") {
            //showTip($(this),"请输入街道地址。");
            $(this).val("");
        } else {
            hideTip($(this));
        }
    });

    $(".jdaddress").live("blur",
    function() {
        yzaddress();

    });

    /*街区*/

    function yzTelephone() {
        room = $(".room").val();
        if (room.Trim() === "" || room.Trim() == "房间、套房、单元、楼层或街区") {
            $(".room").val("房间、套房、单元、楼层或街区");
            $(this).val("");

            return true;
        }

        hideTip($(".room"));
        return true;

    }

    $(".room").live("focus keyup",
    function() {
        room = $(this).val();
        if ($(this).val().Trim() == "房间、套房、单元、楼层或街区" || $(this).val().Trim() == "") {

            $(this).val("");
        } else {
            hideTip($(this));
        }
    });

    $(".room").live("blur",
    function() {
        yzTelephone();

    });

    /*邮编*/
    function yzzipcode() {
        zipcode = $(".zipcode").val();

        if (zipcode.Trim() === "" || zipcode.Trim() == "邮政编码") {

            $(".zipcode").val("邮政编码");
            showTip($(".zipcode"), "请填写邮政编码。");
            return false;
        } else {
            if (!zipcode.Trim().youbian()) {

                showTip($(".zipcode"), "邮政编码格式不正确。");

                return false;

            } else {
                hideTip($(".zipcode"));

                return true;

            }

        }

    }
    $(".zipcode").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "邮政编码" || $(this).val().Trim() == "") {
            //showTip($(this),"请填写必填字段。");
            $(this).val("");
        } else {
            hideTip($(this));
        }
    });

    $(".zipcode").live("blur",
    function() {
        yzzipcode();

    });

    /*电子邮箱*/

    function yzemail() {
        email = $(".sf_email").val();
        if (email.Trim() === "" || email.Trim() == "电子邮箱") {
            $(".sf_email").val("电子邮箱");
            showTip($(".sf_email"), "请填写电子邮箱。");
            $(this).val(" ");

            return false;
        } else {

            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!filter.test(email.Trim())) {
                showTip($(".sf_email"), "请使用有效的电子邮件地址格式: email@domain.com。");

                return false;

            } else {

                hideTip($(".sf_email"));
                return true;
            }

        }

    }

    $(".sf_email").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "电子邮箱" || $(this).val().Trim() == "") {
            // showTip($(this),"请填写必填字段。");
            $(this).val(" ");
        } else {
            hideTip($(this));
        }
    });

    $(".sf_email").live("blur",
    function() {
        yzemail();

    });

    /*可选手机号*/
    function yziphone() {
        iphone = $(".iphone").val();
        if (iphone.Trim() === "" || iphone.Trim() == "手机号码(可选)") {
            $(".iphone").val("手机号码(可选)");
            $(this).val("");

            return true;
        } else if (iphone.Trim() != "") {

            if (!iphone.Trim().isPhoneGz()) {

                showTip($(".iphone"), "手机号码格式不正确。");
                return false;
            }
            return true;
        }

        return true;

    }
	
	function openPay(){
	
	  if(step_1 && step_2 && step_3 && step_4){
	  
	    
		 $(".jiesuan_box .jiesuan_box_left3").fadeIn();
		 $(".jiesuan_box .jiesuan_box_right3").fadeIn();
	  }else{
	   $(".jiesuan_box .jiesuan_box_left3").hide();
		 $(".jiesuan_box .jiesuan_box_right3").hide();
	  }
	
	}

    $(".iphone").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "手机号码(可选)" || $(this).val().Trim() == "") {

            $(this).val("");
        } else {
            hideTip($(this));
        }
    });

    $(".iphone").live("blur",
    function() {
        yziphone();

    });

    var caddress = true;
    $(".contiune_address").click(function() {

        if (caddress) {

            $.ajax({
                type: 'POST',
                url: 'ajax-flow.php',
                dataType: "json",
                data: {

                    act: "check_address"

                },
                beforeSend: function(XMLHttpRequest) {

                    caddress = false;
                    $(".contiune_address").addClass("c_loadding");
                    $("a", $(".contiune_address")).hide();
                },
                success: function(data) {
                    $(".contiune_address").removeClass("c_loadding");
                    $("a", $(".contiune_address")).show();
                    $(".contiune_address").hide();
                    switch (data.err) {
                 
                    case "ok":
					   step_1=true;
					openPay();
                        $(".ys_add").html(data.msg);
                        $(".address_contain").html(data.content);
						if($(window).width()<640){
                        var sonchuoH = $(".songhuodizhi .left").innerHeight() + $(".songhuodizhi .dibu ").innerHeight()+$(".songhuodizhi .right").innerHeight() ;
						}else{
						  var sonchuoH = $(".songhuodizhi .left").innerHeight() + $(".songhuodizhi .dibu ").innerHeight();
						}

                        $(".songhuodizhi").stop().animate({
                            height: sonchuoH
                        },
                        500,
                        function() {
                            var topval = $(".jiezhang_title_address").offset().top - $(".jiezhang_title_address").height();
                            $('html,body').animate({
                                scrollTop: topval
                            },
                            800)

                        });
                        $(".hide_aid").val(data.address_id);
                        caddress = true;
                        break;

                    case "not_login":
                        alert("登录超时，请重新登录。");
                        location.href = "user.php?act=login";
						caddress = false;
                        break;

                    }

                }
            });

        }

        var idtanh = 0;
        $(".di_tan .miao_add1_2").each(function(i) {

            idtanh = idtanh + $(".di_tan .miao_add1_2").eq(i).innerHeight();

        });

        $(".address_li").click(function(e) {
            if ($(this).hasClass("address_off")) {
                $(this).removeClass("address_off").addClass("address_on");
                $(".di_tan").css("visibility", "visible").stop().animate({
                    height: idtanh
                },
                500);

            } else {

                $(this).removeClass("address_on").addClass("address_off");
                $(".di_tan").stop().animate({
                    height: 0
                },
                500,
                function() {

                    $(".di_tan").css("visibility", "hidden");
                });

            }
            e.stopPropagation();
        });
		
		
		        $(".fp_address_li").click(function(e) {
            if ($(this).hasClass("address_off")) {
                $(this).removeClass("address_off").addClass("address_on");
                $(".fp_di_tan").css("visibility", "visible").stop().animate({
                    height: idtanh
                },
                500);

            } else {

                $(this).removeClass("address_on").addClass("address_off");
                $(".fp_di_tan").stop().animate({
                    height: 0
                },
                500,
                function() {

                    $(".fp_di_tan").css("visibility", "hidden");
                });

            }
            e.stopPropagation();
        });

        $(".miao_add1_2").click(function(e) {

            e.stopPropagation();

        });

    });

    $(".check_two").click(function() {

        submitEditAdress();
    });

    $(".bianji_address").click(function() {
	
	
      step_1=false;
	  openPay();
        $(".address_show").empty().hide();

        $(".address_c_l").fadeIn(300,
        function() {
            $(".bianji_address").hide();
        });

        $(".check_two").show();
	if($(window).width()<640){
                        var sonchuoH = $(".songhuodizhi .left").innerHeight() + $(".songhuodizhi .dibu ").innerHeight()+$(".songhuodizhi .right").innerHeight() ;
						}else{
						  var sonchuoH = $(".songhuodizhi .left").innerHeight() + $(".songhuodizhi .dibu ").innerHeight();
						}
      //  var sonchuoH = $(".songhuodizhi .left").innerHeight() + $(".songhuodizhi .dibu ").innerHeight();

        $(".songhuodizhi").stop().animate({
            height: sonchuoH
        },
        500,
        function() {
            var topval = $(".jiezhang_title_address").offset().top - $(".jiezhang_title_address").height();
            $('html,body').animate({
                scrollTop: topval
            },
            800)

        });

    });

    var htmlEditStruct = '';
    var iseditload = true;
    var deshtml = '';
    function submitEditAdress() {

        deshtml = '';
        var address_id = parseInt($(".hide_aid").val());

        var default_state = 1;
        htmlStruct = "";
        if (!address_id > 0) {
           var  acts="act_add_address";
        }else{
		  var  acts="act_edit_address";
		}
        if (!yxconsignee()) {

            return false;
        }

        if (!yzming()) {

            return false;
        }

        if (!yzquhao()) {

            return false;
        }

        if (!yzhaoma()) {

            return false;
        }
        if (!checkP()) {

            return false;
        }
        if (!checkC()) {

            return false;
        }
       if (!checkD()) {

            return false;
        }
 

        if (!yzaddress()) {

            return false;
        }

        if (!yzzipcode()) {

            return false;
        }
        if (!yzemail()) {

            return false;
        }

        if (!yziphone()) {

            return false;
        }

        if (iseditload) {

            $.ajax({
                type: 'POST',
                url: 'user.php',
				asyn:false,
                data: {
                    surname: surname,
                    ming: ming,
                    address_id: address_id,
                    quhao: quhao,
                    haoma: haoma,
                    province: selProvince,
                    city: selCity,
                    district: selDistricts,
                    address: address,
                    room: room,
                    tel: tel,
                    mobile: mobile,
                    zipcode: zipcode,
                    email: email,
                    iphone: iphone,
                    default_state: default_state,
                    act:acts

                },
                dataType: "json",
                beforeSend: function(XMLHttpRequest) {
                    iseditload = false;
                    $(".check_two").addClass("c_loadding");
                    $("a", $(".check_two")).hide();
                    //$(".submit_state").empty().show().html("表单正在提交...");
                },
                success: function(data) {
                  
                    switch (data.err) {
                    case 1:
					    step_1=true;
	  openPay();
	                   address_id=data.i_id;
					   $(".hide_aid").val(address_id)
                        Pindex = document.getElementById("selProvince").selectedIndex;
                        var Ptml = document.getElementById("selProvince").options[Pindex].text;
                        Cindex = document.getElementById("selCities").selectedIndex;
                        var Ctml = document.getElementById("selCities").options[Cindex].text;
                        Dindex = document.getElementById("selDistricts").selectedIndex;
                        var Dtml = document.getElementById("selDistricts").options[Dindex].text;
						if(Dtml=="区"){
						
						Dtml="";
						}
                        htmlStruct = ' <div class="miao_add1_2 item_' +address_id +'" onclick="change_address(' + address_id + ');">';
                        htmlStruct += '<div class="miao_add1_2_t">' + surname + ming + '</div>';
                        htmlStruct += ' <div class="miao_add1_2_t">' + Ptml + " " + " " + Ctml + " " + Dtml + '</div>';
                        htmlStruct += ' <div class="miao_add1_2_t">' + address + '</div>';
                        htmlStruct += ' <div class="miao_add1_2_t">' + room + '</div>';
                        htmlStruct += ' <div class="miao_add1_2_t">' + zipcode + '</div>';
                        var selecter = ".item_" + address_id;
                        if ($(selecter).length > 0) {
                            $(selecter).hide();
                            $(selecter).after(htmlStruct);
                            $(selecter).eq(0).remove();

                        }else{
						 
						$(".deng_san_1").next().remove();
						
						$(".deng_san_1").after(htmlStruct);
						}
						fhtmlStruct = ' <div class="miao_add1_2 fpitem_'+address_id+'" onclick="change_fp_address(' + address_id + ');">';
                        fhtmlStruct += '<div class="miao_add1_2_t">' + surname + ming + '</div>';
                        fhtmlStruct += ' <div class="miao_add1_2_t">' + Ptml + " " + " " + Ctml + " " + Dtml + '</div>';
                        fhtmlStruct += ' <div class="miao_add1_2_t">' + address + '</div>';
                        fhtmlStruct += ' <div class="miao_add1_2_t">' + room + '</div>';
                        fhtmlStruct += ' <div class="miao_add1_2_t">' + zipcode + '</div>';
						var fpselecter=".fpitem_"+address_id;
						
						if ($(fpselecter).length > 0) {
                            $(fpselecter).hide();
                            $(fpselecter).after(fhtmlStruct);
                            $(fpselecter).eq(0).remove();

                        }else{
						
						$(".deng_san_2").next().remove();
						
						$(".deng_san_2").after(fhtmlStruct);
						
						}
						if(Dtml=="区"){
						
						Dtml="";
						}
                        deshtml += '<div class="miao_song clearfix"><div class="miao_song_1">送货地址</div><div class="miao_song_r clearfix">';
                        deshtml += '' + surname + ming + '<br/>';
                        deshtml += '' + Ptml + " " + " " + Ctml + " " + Dtml + '<br/>';
                        if (address !== "") {
                            deshtml += '' + address + '<br/>';
                        }
                        if (room !== "") {
                            deshtml += '' + room + '<br/>';
                        }
                        if (zipcode !== "") {
                            deshtml += '' + zipcode + '';
                        }
						if(iphone=="手机号码(可选)"){
						iphone="";
						}
                        deshtml += ' </div></div><div class="miao_song clearfix"><div class="miao_song_1">发货通知</div>';
                        deshtml += '<div class="miao_song_r clearfix"> ' + email + '<br/>' + iphone + '</div></div>';
                        $(".address_c_l").fadeOut(300,function(){
						           $(".address_show").empty().html(deshtml).show();
								   
                        var sonchuoH = $(".songhuodizhi .address_show ").outerHeight() + 40;
						 $.ajax({
                          type: 'POST',
                          url: 'ajax-flow.php',
                          data: {
                  					  
                          act: "act_shipping"

                          },
                dataType: "json",
                beforeSend: function(XMLHttpRequest) {
                     $(".check_two").removeClass("c_loadding");
                    $("a", $(".check_two")).show();
                    $(".check_two").hide();
                    //$(".submit_state").empty().show().html("表单正在提交...");
                },
                success: function(msg) {
				      switch(msg.err){   
					    case "ok" :
						    step_2=true;
	                        openPay();
							  if($(".hdfk_2").find("input").length==0){
						    $(".hdfk_2").empty().html(msg.shippinghtml);
						  }
						 if($(".wszf_2").find("input").length==0){
						    $(".wszf_2").empty().html(msg.payhtml);
						  }
						
						
						 $(".songhuodizhi").stop().animate({
                            height: sonchuoH
                        },
                        500,
                        function() {
                            var topval = $(".fukuan_title").offset().top - $(".fukuan_title").height();
                            $('html,body').animate({
                                scrollTop: topval
                            },
                            800);

                            $(".bianji_address").show();
                            var fukuanH = 0;
                            $(".wszf").each(function() {
                                fukuanH += parseInt($(".wszf").outerHeight());

                            });
                            fukuanH += parseInt($(".hdfk").outerHeight()) + parseInt($(".dibu").outerHeight());
                            $(".fukuan ").animate({
                                height: fukuanH
                            },
                            500);
                        });

                        $(".ys_add").html(Ptml + " " + " " + Ctml + " " + Dtml);
                        if ($(".address_em_c").length > 0) {

                            $(".address_em_c").fadeIn().remove();
                        }
                        $(".morendizhi").eq(0).fadeIn(slspeed);
                        reflash_A();
                        //document.address_list.reset();
                        iseditload = false;
                        setTimeout(function() {
                            $(".submit_state").empty().hide();
                            iseditload = true;
                        },
                        2000);
						
						break;
				}
				      
				}
				});
						
						});
             
           

                        break;

                    case 2:
                        //$(".submit_state").empty().show().html("<span class='ti_error'>收货地址修改失败。</span>");
                        iseditload = true;
                        break;

                    case 3:
                        $(".submit_state").empty().hide();
                        showTip($(".surname"), "姓氏不能为空。");
                        iseditload = true;
                        break;

                    case 4:
                        $(".submit_state").empty().hide();
                        showTip($(".ming"), "请输入名字。");
                        iseditload = true;
                        break;

                    case 5:
                        $(".submit_state").empty().hide();
                        showTip($(".haoma"), "请输入电话号码。");

                        iseditload = true;
                        break;

                    case 6:
                        $(".submit_state").empty().hide();
                        showTip($("#selProvince"), "请选择所在的省份。");

                        iseditload = true;
                        break;

                    case 7:
                        $(".submit_state").empty().hide();
                        showTip($(".city"), "请选择所在的城市。");

                        iseditload = true;
                        break;

                    case 8:
                        $(".submit_state").empty().hide();
                        showTip($("#selDistricts"), "请填写邮政编码。");

                        iseditload = true;
                        break;

                    case 9:
                        $(".submit_state").empty().hide();
                        $(".jdaddress").val("区，街道编号/名称，楼宇名称");

                        iseditload = true;
                        break;
                    case 10:
                        $(".submit_state").empty().hide();
                        showTip($(".sf_email"), "请填写电子邮箱。");

                        iseditload = true;
                        break;

                    case 11:
                        $(".submit_state").empty().hide();
                        showTip($(".iphone"), "手机号码格式不正确。");

                        iseditload = true;
                        break;

                    case 12:
                        $(".submit_state").empty().hide();
                        alert("登录超时，请重新登录。");
                        location.href = "user.php?act=login";

                        break;

                    case 13:
                        $(".submit_state").empty().hide();
                        // $(".submit_state").empty().show().html("<span class='ti_error'>非法数值，保存失败。</span>");
                        $(".check_two").show();
                        alert("非法数值，保存失败。");

                        iseditload = true;
                        break;
                    default:
                        $(".check_two").show();
                        alert("系统错误,请刷新后重试!");

                        //$(".submit_state").empty().show().html("<span class='ti_error'>系统错误,请刷新后重试!</span>");

                    }

                }
            });

        }

    }
	
	var paystate=true;
	$(".pay_type").click(function(){
	var phtml='';
	 var hdfk_2val=$('input:radio[name=shipping]:checked',$(".hdfk_2_1")).val();
	 var hdfk_2valhtml=$('input:radio[name=shipping]:checked',$(".hdfk_2_1")).next().html();
	 var wszf_2valSrc=$($('input:radio[name=payment]:checked',$(".wszf_2_1"))).next().attr("src");
	 var wszf_val=$('input:radio[name=payment]:checked',$(".wszf_2_1")).val();
	 
     if(hdfk_2val>0){
	  
	   if(wszf_val>0){
	   	   $(".tishi_pay").html("").hide();
	            $.ajax({
                type: 'POST',
                url: 'ajax-flow.php',
                dataType: "json",
                data: {
                   
                    act: "check_pay"

                },
                beforeSend: function(XMLHttpRequest) {
                   $(".pay_type").addClass("c_loadding");
                    $("a", $(".pay_type")).hide();
                    $(".pay_type").show();
                  
                    paystate = false;

                },
                success: function(data) {
                        $(".pay_type").removeClass("c_loadding");
                    $("a", $(".pay_type")).show();
                    $(".pay_type").hide();
                    switch (data.err) {

                    case "ok":
                          step_2=true;
	                        openPay();
					    $.ajax({
                type: 'POST',
                url: 'ajax-flow.php',
                dataType: "json",
                data: {
                   
                    act: "check_inv"

                },
                beforeSend: function(XMLHttpRequest) {
                   $(".pay_type").addClass("c_loadding");
                    $("a", $(".pay_type")).hide();
                    $(".pay_type").show();
                  
                    paystate = false;

                },
                success: function(msg) {
                        $(".pay_type").removeClass("c_loadding");
                    $("a", $(".pay_type")).show();
                    $(".pay_type").hide();
                    switch (msg.err) {

                    case "ok":
					
					if($(".fp_info select").length==0){
					
					$(".fp_info").html(msg.htmlsf);
					}
					
				    if($(".fp_address input").length==0){
					$(".fp_address").html(msg.htmls);
					}
					
					
				  if($(".inv_in_email input").length==0){
					$(".inv_in_email").html(msg.ehtmls);
					}
					$(".pay_contain").fadeOut(300,function(){
					
					      phtml+='<div class="miao_song  clearfix"><div class="miao_song_1">送货方式</div>';
                 phtml+=' <div class="miao_song_r clearfix">'+hdfk_2valhtml+'</div></div>';
                 phtml+='  <div class="miao_song  clearfix"><div class="miao_song_1">支付方式</div>';
                 phtml+=' <div class="miao_song_r clearfix"><img src="'+wszf_2valSrc+'"/></div></div> ';
			
						  $(".show_pay").empty().html(phtml).show();
						 
						  var sonchuoP = $(".fukuan  .show_pay ").outerHeight() + 40;
						 $(".fukuan").stop().animate({
                            height: sonchuoP
                        },
                        500,
                        function() {
                            var topval = $(".fapiao_title").offset().top - $(".fapiao_title").height();
                            $('html,body').animate({
                                scrollTop: topval
                            },
                            800);

                            $(".fapiao").show();
							// 
                            var fapiaoH = 0;
                          $(".bianji_pay").show();
						  
						   if($(window).width()<640){
						   
						   	   	    if(fri==0){
							        fapiaoH= parseInt($(".fapiao .left").outerHeight()) +parseInt($(".fapiao .right").outerHeight()) + parseInt($(".fapiao .dibu").outerHeight());
							}else{
							        fapiaoH= parseInt($(".fapiao .right").outerHeight()) + parseInt($(".fapiao .dibu").outerHeight())+parseInt($(".fapiao .left").outerHeight()) ;
							}
						   }else{
						   
						   	    if(fri==0){
							        fapiaoH= parseInt($(".fapiao .left").outerHeight()) + parseInt($(".fapiao .dibu").outerHeight());
							}else{
							        fapiaoH= parseInt($(".fapiao .right").outerHeight()) + parseInt($(".fapiao .dibu").outerHeight());
							}
						   
						   }
					
                    
                            $(".fapiao ").animate({
                                height: fapiaoH
                            },
                            500);
                        });
					
					
					});		
           
					break;
					 case "not_login":
                        alert("登录超时，请重新登录。");
                        location.href = "user.php?act=login";
						paystate = false;
                        break;
					
					
					}
					}})
       
                      //  $(".address_contain").html(data.content);
            
				
                   
                        paystate = true;
                        break;

                    case "not_login":
                        alert("登录超时，请重新登录。");
                        location.href = "user.php?act=login";
						paystate = false;
                        break;

                    }

                }
            });
	   
	   
	   }else{
	   $(".tishi_pay").html("请选择支付方式！").show();
	   //   alert("请选择支付方式！");
	   }
	 
	 }else{
	    $(".tishi_pay").html("请选择配送方式！").show();
	  // alert("请选择配送方式！");
	 }
	 
	 

	});
	
	$(".bianji_pay").click(function(){
	    step_2=false;
	                        openPay();

	       $(".show_pay").empty().hide();

        $(".pay_contain").fadeIn(300,
        function() {
            $(".bianji_pay").hide();
        });

        $(".pay_type").show();

          var fukuanH = 0;
                            $(".wszf").each(function() {
                    fukuanH += parseInt($(".wszf").outerHeight());

                            });
                            fukuanH += parseInt($(".hdfk").outerHeight()) + parseInt($(".dibu").outerHeight());
                            $(".fukuan").animate({
                                height: fukuanH
                            },
                            500,function(){
							   var topval = $(".fukuan_title").offset().top - $(".fukuan_title").height();
            $('html,body').animate({
                scrollTop: topval
            },
            800)
							
							});


	
	});
		var isefpload=true;
	$(".fapiao_raidos").click(function(){
	
	fri=$(this).val();
	  isefpload=true;
	 if(fri==0){
	 $(".need_inv").val(0);
	// $("#ECS_INVTYPE option").eq(0).attr("selected","selected");
	// $("#ECS_INVTYPE").trigger("change");
	 	hideTip();
	   $(".fp_contain").fadeOut(500);
	   	   if($(window).width()<640){
						   
						         fapiaoH= parseInt($(".fapiao .left").outerHeight())+parseInt($(".fapiao .right").outerHeight()) + parseInt($(".fapiao .dibu").outerHeight());
						   }else{
						   
      fapiaoH= parseInt($(".fapiao .left").outerHeight()) + parseInt($(".fapiao .dibu").outerHeight());
						   
						   }
	
                            $(".fapiao ").animate({
                                height: fapiaoH
                            },
                            500);
	 }else{
	 	 $(".need_inv").val(1);
	   $(".fp_contain").fadeIn(500);
	   
	   	   	   if($(window).width()<640){
						   
						         fapiaoH= parseInt($(".fapiao .left").outerHeight())+parseInt($(".fapiao .right").outerHeight()) + parseInt($(".fapiao .dibu").outerHeight());
						   }else{
						   
       fapiaoH= parseInt($(".fapiao .right").outerHeight())+ parseInt($(".fapiao .dibu").outerHeight());
						   
						   }
	 
                            $(".fapiao ").animate({
                                height: fapiaoH
                            },
                            500);
	 }
	});

	var postDate={};
	$(".fapiao_type").click(function(){
	
			
	 if(fri==0){
	 
	   if(!inv_yzemail()){
	      
		  return false;
	   }
	 	 postDate['email']=inv_email;
		  postDate['type']=fri;
		    postDate['act']="act_fapiao";
        
	
	 }else{
	 
	   if(!inv_yzemail()){
	      
		  return false;
	   }
	   
	 //  if(!yz_inpfptype()){
	   
	   //  return false;
	  // }
	   
	   if(!yz_inpfptait()){
	     return false;
	   
	   }
	   
	   if(!yz_inpfpcontent()){
	   
	     return false;
	   }
	   
	   
	   if(!inv_yxconsignee()){
	   
	     return false;
	   }
	   
	   
	   if(!inv_yzming()){
	   
	    return false;
	   }
	   
	   if(!inv_yzquhao()){
	    return false;
	   
	   }
	   
	   if(!inv_yzhaoma()){
	   
	    return false;
	   }

	 
        if (!inv_checkP()) {

            return false;
        }
        if (!inv_checkC()) {

            return false;
        }
		
		      if (!inv_checkD()) {

            return false;
        }


        if (!inv_yzaddress()) {

            return false;
        }

        if (!inv_yzzipcode()) {

            return false;
        }


        if (!yziphone()) {

            return false;
        }
			 postDate['surname']=inv_surname;
		  postDate['ming']=inv_ming;
		    postDate['quhao']=inv_quhao;
			
				    postDate['haoma']=inv_haoma;
					
					  postDate['province']=inv_selprovince;
					  
					    postDate['city']=inv_selcity;
						
						    postDate['district']=inv_seldistricts;
							 postDate['company_name']=company_name;
							   postDate['address']=inv_address;
							      postDate['room']=inv_room;
								     postDate['zipcode']=inv_zipcode;
									   postDate['email']=inv_email;
									      postDate['fptype']=inv_type;
										       postDate['payee']=inv_payee;
											      postDate['content']=inv_content;
												      postDate['type']=fri;
													       postDate['act']="act_fapiao";
	 
		
		

	
		
		   
	   
	 }

	     if (isefpload) {

            $.ajax({
                type: 'POST',
                url: 'ajax-flow.php',
			
                data:postDate,
                dataType: "json",
                beforeSend: function(XMLHttpRequest) {
                    isefpload = false;
                    $(".fapiao_type").addClass("c_loadding");
                    $("a", $(".fapiao_type")).hide();
                    //$(".submit_state").empty().show().html("表单正在提交...");
                },
                success: function(data) {
                  
                    switch (data.err) {
               
			   
			         case "ok":
					 
					     step_3=true;
						 //step_4=false;
	                        openPay();
                         isefpload = false;
						 
						        $(".fapiao_type").removeClass("c_loadding");
                    $("a", $(".fapiao_type")).show();
					$(".fapiao_type").hide();
					
		                 $(".miao_song_fp").empty().html(data.content);
              
						 
						 $(".fp_c").fadeOut(300,function(){
						 
						 $(".miao_song_fp").show();
						 $(".bianji_fapiao").show();
						 var fapiaoM= parseInt($(".fapiao .miao_song_fp").outerHeight()) + parseInt($(".fapiao .dibu").outerHeight());
                            $(".fapiao ").animate({
                                height: fapiaoM
                            },
                            500,function(){
				 var topval = $(".law_title").offset().top - $(".law_title").height();
            $('html,body').animate({
                scrollTop: topval
            },
            800);
			
			if(!lowtype){
			var lacH=$(".tk_content").outerHeight();
			
			
						  $('.tktj_title').animate({
                height: lacH
            },
            800);	
			
			}
							});
						 
						 });
						 
						 
						 
						 
                         setTimeout(function(){
						 
						   isefpload = true;
						 },3000);
                      
                        break;

                    case 3:
                      
                        showTip($(".inv_surname"), "姓氏不能为空。");
                        isefpload = true;
                        break;

                    case 4:
                    
                        showTip($(".inv_ming"), "请输入名字。");
                        isefpload = true;
                        break;

                    case 5:
                    
                        showTip($(".inv_haoma"), "请输入电话号码。");

                        isefpload = true;
                        break;

                    case 6:
                     
                        showTip($("#inv_selprovince"), "请选择所在的省份。");

                        isefpload = true;
                        break;

                    case 7:
                     
                        showTip($("#inv_selcity"), "请选择所在的城市。");

                        isefpload = true;
                        break;

                    case 8:
                     
                        showTip($("#inv_seldistricts"), "请填写所在的区域。");

                        isefpload = true;
                        break;

                    case 9:
                       
                        $(".inv_address").val("请填写区，街道编号/名称，楼宇名称");

                        isefpload = true;
                        break;
                    case 10:
                        
                        showTip($(".inv_email"), "请填写电子邮箱。");

                        isefpload = true;
                        break;

                  /*  case 11:
                    
                        showTip($("#ECS_INVTYPE"), "请选择发票类型。");

                        isefpload = true;
                        break;*/

              case 12:
                    
                        showTip($("#ECS_INVPAYEE"), "请填写发票抬头。");

                        isefpload = true;
                        break;
                       case 13:
                    
                        showTip($("#ECS_INVCONTENT"), "请选择发票内容。");

                        isefpload = true;
                        break;
               
						         case 14:
                    
                        showTip($(".inv_email"), "电子邮箱格式不正确。");

                        isefpload = true;
                        break;
				   case "not_login":
                       
                        alert("登录超时，请重新登录。");
                        location.href = "user.php?act=login";

                        break;
                    default:
                    
                        alert("系统错误,请刷新后重试!");

                        //$(".submit_state").empty().show().html("<span class='ti_error'>系统错误,请刷新后重试!</span>");

                    }

                }
            });

        }
	
	});
	
	
	$(".bianji_fapiao").click(function(){
			  $('.tktj_title').animate({
                height: 0
            },
            800);
			//$(".bianji_law").hide();
	    step_3=false;
	                        openPay();
	  $(".miao_song_fp").empty().hide();
	  
	  $(".fp_c").show();
	    if($(window).width()<640){
		
		      if(fri==0){
							        fapiaoH= parseInt($(".fapiao .left").outerHeight())+parseInt($(".fapiao .right").outerHeight()) + parseInt($(".fapiao .dibu").outerHeight());
							}else{
							        fapiaoH= parseInt($(".fapiao .right").outerHeight()) + parseInt($(".fapiao .dibu").outerHeight());
							}
		}else{
		
			      if(fri==0){
							        fapiaoH= parseInt($(".fapiao .left").outerHeight())+parseInt($(".fapiao .right").outerHeight()) + parseInt($(".fapiao .dibu").outerHeight());
							}else{
							        fapiaoH= parseInt($(".fapiao .right").outerHeight()) + parseInt($(".fapiao .dibu").outerHeight());
							}
		
		}

                    
                            $(".fapiao ").animate({
                                height: fapiaoH
                            },
                            500);
	  $(".bianji_fapiao").hide();
	  $(".fapiao_type").show();
	
	});
	
	

	
	$(".law_btn").click(function(){
	   	                
		    if($("#terms-accept").attr("checked")=="checked"){
		lowtype=1;
		     $(".tishi_law").hide();
			 

		  step_4=true;
	                        openPay();
		 	  $('.tktj_title').animate({
                height: 0
            },
            800,function(){
			
			$(".bianji_law").fadeIn();
			});	
		 
		    }else{
			
				lowtype=0;
	  step_4=false;
	                        openPay();
			  $(".tishi_law").fadeIn();
			
			}
	
	});
	
	$(".bianji_law").click(function(){
			  step_4=false;
	           openPay();
			   $(".bianji_law").hide();
			var lacH=$(".tk_content").outerHeight();
			
			
						  $('.tktj_title').animate({
                height: lacH
            },
            800);	
	});
	
	$(".inputBg").val("");
	$(".inputBg").bind("focus keyup",function(){
	

	 $(".jiesuan_box_left1 .jie_tis").hide();
	
	});
	
	
	
	$(".jiezhang_box_anniu3").click(function(){
	
	
	 document.theForm.submit();
	
	});
    function reflash_A() {

        if (!$(".address_li").hasClass("address_off")) {
            var miaoH = 0;
            $(".miao_add1_2").each(function(i) {
                miaoH += parseInt($(".miao_add1_2").eq(i).innerHeight());

            })
            // miaoH+=parseInt($(".miao_add1_box1_2").innerHeight());
            $(".di_tan").css("visibility", "visible").stop().animate({
                height: miaoH
            },
            500);
            // $(".miao_add1_1").stop().animate({height:miaoH},500);

        }

    }

});
function stopEvent(event) {

    var event = event || window.event;
    if (event.stopPropagation) {

        event.stopPropagation();
    } else {

        event.cancelBubble = true;
    }

}
String.prototype.Trim = function() {
    var m = this.match(/^\s*(\S+(\s+\S+)*)\s*$/);
    return (m == null) ? "": m[1];
}
String.prototype.isMobile = function() {
    return (/(^[0-9]{3,4}\-[0-9]{7}$)|(^[0-9]{7}$)|(^[0-9]{3,4}[0-9]{7}$)|(^0{0,1}13[0-9]{9}$)/.test(this.Trim()));
}
String.prototype.isPhoneGz = function() {
    return (/^1[34578]\d{9}$/.test(this.Trim()));
}
String.prototype.youbian = function() {
    return (/^[0-9]{6}$/.test(this.Trim()));
}
var address_ids = 0;
var changestate = true;
function change_address(id) {

    if (id > 0) {

        if (changestate) {
            $.ajax({
                type: 'POST',
                url: 'ajax-flow.php',
                dataType: "json",
                data: {
                    address_id: id,
                    act: "change_address"

                },
                beforeSend: function(XMLHttpRequest) {

                    $(".songhuodizhi .left").addClass("d_loadding");
                    changestate = false;

                },
                success: function(data) {

                    switch (data.err) {

                    case "ok":

                        $(".songhuodizhi .left").removeClass("d_loadding");
                        $(".address_contain").html(data.content);
                        //var sonchuoH=$(".songhuodizhi .left").innerHeight()+$(".songhuodizhi .dibu ").innerHeight();
                        $(".dibu .left_1").show();
                        $(".hide_aid").val(id);
                        //$(".songhuodizhi").stop().animate({height:sonchuoH},500);
                        changestate = true;
                        break;

                    case "id_empty":

                        alert("非法数值!");
                        changestate = true;
                        break;

                    case "not_login":
                        alert("登录超时，请重新登录。");
                        location.href = "user.php?act=login";
						changestate = false;
                        break;

                    }

                }
            });

        }

    }

}

var fpchangestate=true;
function change_fp_address(id) {

    if (id > 0) {

        if (fpchangestate) {
            $.ajax({
                type: 'POST',
                url: 'ajax-flow.php',
                dataType: "json",
                data: {
                    address_id: id,
                    act: "fp_change_address"

                },
                beforeSend: function(XMLHttpRequest) {

                    $(".fapiao .right").addClass("d_loadding");
                    fpchangestate = false;

                },
                success: function(data) {

                    switch (data.err) {

                    case "ok":

                        $(".fapiao .right").removeClass("d_loadding");
                        $(".fp_address").html(data.content);
                        //var sonchuoH=$(".songhuodizhi .left").innerHeight()+$(".songhuodizhi .dibu ").innerHeight();
                        //$(".dibu .left_1").show();
                        $(".fp_hide_aid").val(id);
                        //$(".songhuodizhi").stop().animate({height:sonchuoH},500);
                        fpchangestate = true;
                        break;

                    case "id_empty":

                        alert("非法数值!");
                        fpchangestate = true;
                        break;

                    case "not_login":
                        alert("登录超时，请重新登录。");
                        location.href = "user.php?act=login";
						fpchangestate = false;
                        break;

                    }

                }
            });

        }

    }

}