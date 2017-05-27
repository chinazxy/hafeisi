$(function() {
    
	var tz_stpe1=false;
	var tz_stpe2=false;
	var tz_stpe3=false;
	var tz_stpeval=0;
	
	
	$(".youhpoint").click(function(e){
		 
			  if($(".youhpoint").hasClass("youhuioff")){
			  
			  $(".youhpoint").removeClass("youhuioff");
			   $(".youhuiinpt").stop().animate({height:40},500);
			   $(".addjt",$(".youhpoint")).addClass("select");
		  }else{
			  $(".youhpoint").addClass("youhuioff");
			  		   $(".youhuiinpt").stop().animate({height:0},500);
					   	   $(".addjt",$(".youhpoint")).removeClass("select");
		  }
		  e.stopPropagation();
		
	});
	
	
     $(".wszf_2").delegate(".zhifubao", "click",
    function(e) {
		
		var objipus=$("input",$(this));
		
		$(".zhifubao").not($(this)).removeClass("select");
       $(this).addClass("select");
		selectPayment(objipus.get(0));
					$(".wszf_2  input").attr("checked",false);
		$("input",$(this)).attr("checked",true);
	});
	
	  $(".product_num").change(function(){
  
    var inintNums=$(this).val();
	

	
	$(this).val($(this).val().replace(/[^\d]/g,""));
	
    if(parseInt($(this).val())>0){
	var recid=$(this).prev().val();
	
    if(inintNums<=0){
	inintNums=1;
	}
	addNums(recid,inintNums,$(this));
	
	}else{
	$("option",$(this)).eq(0).attr("selected","selected");
	}
  
  });
	
	$(".shpping_point").click(function(e){
		
		  if($(".sppin").hasClass("yonf")){
			  
			  $(".sppin").removeClass("yonf");
			   $(".sppin").stop().animate({height:45},500);
			   $(".addjt",$(".shpping_point")).addClass("select");
		  }else{
			  $(".sppin").addClass("yonf");
			  		   $(".sppin").stop().animate({height:0},500);
					   	   $(".addjt",$(".shpping_point")).removeClass("select");
		  }
		  e.stopPropagation();
		
	});
	$(".pstep_1").click(function(){
		
		if(tz_stpe1 && tz_stpeval>0){
			
 
        $(".g_orderinfo").fadeOut();
        addste = 0;
       // $(".cont_personal_box .title1 h1").eq(0).addClass("select");
        $(".pstep_c").not($(".pstep_c").eq(0)).hide();
		$(".pstep_c").eq(0).fadeIn();
        $(".address_li").unbind("click");
        $('html,body').animate({
            scrollTop: 0
        },
        500)
			
			
		}else{
			
			return false;
		}
		
	});
	
		$(".pstep_2").click(function(){
		
		if(tz_stpe2){
			
 //  $(".cont_personal_box .title1 h1").eq(tz_stpeval).removeClass("select");
    //$(".cont_personal_box .title1 h1").eq(1).addClass("select")
		$(".g_orderinfo").fadeIn();
         $(".pstep_c").not($(".pstep_c").eq(1)).hide();
		$(".pstep_c").eq(1).fadeIn();
        $(".address_li").bind("click");
        $('html,body').animate({
            scrollTop: 0
        },
        500)
			
			
		}else{
			
			return false;
		}
		
	});
	
			$(".pstep_3").click(function(){
		
		if(tz_stpe3){
	 //   $(".cont_personal_box .title1 h1").eq(tz_stpeval).removeClass("select");
  //  $(".cont_personal_box .title1 h1").eq(2).addClass("select")
		$(".g_orderinfo").fadeIn();
          $(".pstep_c").not($(".pstep_c").eq(2)).hide();
		$(".pstep_c").eq(2).fadeIn();
        $(".address_li").unbind("click");
        $('html,body').animate({
            scrollTop: 0
        },
        500)
			
			
		}else{
			
			return false;
		}
		
	});
	
	

	
	
	$('input:radio[name=shipping]').eq(0).trigger("click");
	 //var hdfk_2val = $('input:radio[name=shipping]:checked', $(".hdfk_2_1")).val();
     // var hdfk_2valhtml = $('input:radio[name=shipping]:checked', $(".hdfk_2_1")).next().html();
	 
	 $(".addmsg").click(function(){
		 var hsf=$(".g_wbo>.g_liut1").outerHeight()+$(".g_wbo>.g_nqmh").outerHeight()+$(".g_liuk").outerHeight()+parseInt($(".g_wbo>.g_nqmh").css("paddingTop"))+70;
		 if($("span",$(this)).hasClass("select")){
			
			  $("span",$(this)).removeClass("select"); 
			  $(".msgcont",$(this).parent().parent()).stop().animate({height:0},500);
		 }else{
			 
			  $("span",$(this)).addClass("select");
			 $(".msgcont",$(this).parent().parent()).stop().animate({height:hsf},500);
			
		 }
 
	 });
    var addste = 0;
    $(window).click(function(e) {

        if ($(".address_li").hasClass("address_on")) {
            $(".address_li > span").removeClass("select");
            $(".address_li").removeClass("address_on").addClass("address_off");
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

    var fri = 0;

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
    var inv_types = 0;
    var inv_type = "";
    var company_name = '';
    var inv_payee = "";
    var inv_content = "";

    var step_1 = false;
    var step_2 = false;
    var step_3 = false;
    var step_4 = false;

    var lowtype = 0;

    var invfptait = "";

    var inv_fpcontent = "";

    $(".jie_tis2").click(function() {
        $(this).hide();
        $(".jiesuan_box_left44").stop().animate({
            width: 240
        },
        100);

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

    function yz_inpfptait() {

        inv_payee = $("#ECS_INVPAYEE").val();
        if (inv_payee.Trim() == "发票抬头" || inv_payee.Trim() == "") {
            $("#ECS_INVPAYEE").val("发票抬头");
            // showTip($("#ECS_INVPAYEE"), "发票抬头不能为空。");
            $(".addressmsg").html("发票抬头不能为空!").show();
            return false;
        }
        $(".addressmsg").hide();
        // hideTip($("#ECS_INVPAYEE"));
        return true;

    }

    $("#ECS_INVPAYEE").live("focus keyup",
    function() {

        if ($(this).val().Trim() == "发票抬头" || $(this).val().Trim() == "") {

            $(this).val("");
        } else {
            $(".buymsg").hide();
            //  hideTip($(this));
        }
    });

    $("#ECS_INVPAYEE").live("blur",
    function() {
        yz_inpfptait($(this));

    });

    function yz_inpfpcontent() {

        inv_content = $("#ECS_INVCONTENT").val();
        if (inv_content === "") {
            $(".addressmsg").html("请选择发票内容!").show();
            //showTip($("#ECS_INVCONTENT"), "请选择发标内容。");
            return false;

        }
        $(".addressmsg").hide();
        //hideTip($("#ECS_INVCONTENT"));
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
            // showTip($(".inv_surname"), "姓氏不能为空。");
            $(".buymsg").html("姓氏不能为空!").show();
            return false;
        }
        $(".buymsg").hide();
        //hideTip($(".inv_surname"));
        return true;
    }

    $(".inv_surname").live("focus keyup",
    function() {

        if ($(this).val().Trim() == "姓氏" || $(this).val().Trim() == "") {
            // showTip($(this),"请输入姓氏。");
            $(this).val("");
        } else {
            $(".buymsg").hide();
            //hideTip($(this));
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
            //   showTip($(".inv_ming"), "名字不能为空。");
            $(".buymsg").html("名字不能为空!").show();
            return false;
        }
        // hideTip($(".inv_ming"));
        $(".buymsg").hide();
        return true;

    }

    $(".inv_ming").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "名字" || $(this).val().Trim() == "") {
            //  showTip($(this),"请输入名字。");
            $(this).val("");
        } else {
            $(".buymsg").hide();
            // hideTip($(this));
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
            //  showTip($(".inv_quhao"), "请输入电话号码区号。");
            $(".buymsg").html("请输入电话号码区号!").show();
            return false;
        }
        if (inv_quhao == 0) {

            inv_quhao = "";

        }
        $(".buymsg").hide();
        // hideTip($(".inv_quhao"));
        return true;

    }

    $(".inv_quhao").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "区号" || $(this).val().Trim() == "") {
            // showTip($(this),"请输入电话号码区号。");
            $(this).val("");
        } else {
            $(".buymsg").hide();
            // hideTip($(this));
        }
    });

    $(".inv_quhao").live("blur",
    function() {
        inv_yzquhao();

    });

    //验证发票号码
    function inv_yzhaoma() {
        inv_haoma = $(".inv_haoma").val();
        if (inv_haoma.Trim() === "" || inv_haoma.Trim() == "手机号码") {

            $(".inv_haoma").val("手机号码");
            $(".buymsg").html("请输入手机号码!").show();
            //showTip($(".inv_haoma"), "请输入电话号码。");
            return false;
        } else {
            if (!inv_haoma.Trim().isMobile()) {
                $(".buymsg").html("号码格式不正确!").show();
                // showTip($(".inv_haoma"), "号码格式不正确。");
                return false;

            } else {

                if (inv_haoma.length == 11) {

                    mobile = inv_haoma;

                } else {
                    tel = quhao + "" + inv_haoma;

                }
                $(".buymsg").hide();
                // hideTip($(".inv_haoma"));
                return true;

            }

        }

    }
    $(".inv_haoma").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "手机号码" || $(this).val().Trim() == "") {
            // showTip($(this),"请输入电话号码。");
            $(this).val("");
        } else {
            $(".buymsg").hide();
            // hideTip($(this));
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

            $(".buymsg").html("请选择所在的省份!").show();
            // showTip($("#inv_selprovince"), "请选择所在的省份。");
            return false;

        }
        $(".buymsg").hide();
        // hideTip($("#inv_selprovince"));
        return true;

    }

    $("#inv_selprovince").live("change",
    function() {
        inv_selprovince = $("#inv_selprovince").val();
        if (inv_selprovince <= 0) {

            $(".buymsg").html("请选择所在的区!").show();
            // showTip($(this), "请选择所在的区。");
            return false;

        }
        $(".buymsg").hide();
        // hideTip($(this));
        return true;

    });

    /*城市*/
    var inv_selcity = 0;
    function inv_checkC() {

        inv_selcity = $(".inv_selcity").val();

        if (inv_selcity <= 0) {
            // showTip($(".inv_selcity"), "请选择所在的城市。");
            $(".buymsg").html("请选择所在的城市!").show();
            return false;

        }
        $(".buymsg").hide();
        // hideTip($(".inv_selcity"));
        return true;

    }

    /*区*/
    var inv_seldistricts = 0;

    function inv_checkD() {

        inv_seldistricts = $("#inv_seldistricts").val();

        if ($("#inv_seldistricts option").length > 1) {

            if (inv_seldistricts <= 0) {

                $(".buymsg").html("请选择所在的区域!").show();
                // showTip($("#inv_seldistricts"),"请选择所在的区域。");
                return false;

            }

        }
        return true;

    }

    function inv_yzaddress() {
        inv_address = $(".inv_address").val();

        if (inv_address.Trim() === "" || inv_address.Trim() == "收货地址") {
            $(".inv_address").val("收货地址");

            $(".buymsg").html("请输入街道地址!").show();
            // showTip($(".inv_address"), "请输入街道地址。");
            $(this).val("");

            return false;
        }
        $(".buymsg").hide();
        //hideTip($(".inv_address"));
        return true;

    }

    $(".inv_address").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "收货地址" || $(this).val().Trim() == "") {
            //showTip($(this),"请输入街道地址。");
            $(this).val("");
        } else {
            $(".buymsg").hide();
            // hideTip($(this));
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
        $(".buymsg").hide();
        //hideTip($(".inv_room"));
        return true;

    }

    $(".inv_room").live("focus keyup",
    function() {
        inv_room = $(this).val();
        if ($(this).val().Trim() == "房间、套房、单元、楼层或街区" || $(this).val().Trim() == "") {

            $(this).val("");
        } else {
            $(".buymsg").hide();
            // hideTip($(this));
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
            $(".buymsg").html("请填写邮政编码!").show();
            // showTip($(".inv_zipcode"), "请填写邮政编码。");
            return false;
        } else {
            if (!inv_zipcode.Trim().youbian()) {
                $(".buymsg").html("邮政编码格式不正确!").show();
                //  showTip($(".inv_zipcode"), "邮政编码格式不正确。");
                return false;

            } else {
                //hideTip($(".inv_zipcode"));
                $(".buymsg").hide();
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
            $(".buymsg").hide();
            //hideTip($(this));
        }
    });

    $(".inv_zipcode").live("blur",
    function() {
        inv_yzzipcode();

    });

    $(".address_contains").delegate(".dagou,.inuo", "click",
    function(e) {
        if ($(".dagou").hasClass("sever")) {
		 
            $(".wzff").attr("value", 0);
            $(".dagou").removeClass("sever");
            addste = 1;
            initForm();

        } else {
            addste = 0;
            $(".dagou").prev().attr("value", 1);
            $(".dagou").addClass("sever");
            resetForm();
        }
        e.stopPropagation();

    });

    $(".address_contains").delegate(".xyb", "click",
    function(e) {
		 
	   if (msurname.Trim() == "姓氏" || msurname.Trim() == "") {
           $(".m_surname").css("border","1px solid red");
            $(".m_surname").focus();
            return false;
        }
		
         if (mming.Trim() === "" || mming.Trim() == "名字") {
      $(".m_ming").css("border","1px solid red");
             $(".m_ming").focus();
            return false;
        }
		
	   if (mhaoma.Trim() === "" || mhaoma.Trim() == "手机号码") {
  $(".m_haoma").css("border","1px solid red");
            $(".m_haoma").focus();
            return false;
        }else {
            if (!mhaoma.Trim().isMobile()) {
				  $(".m_haoma").css("border","1px solid red");
               $(".m_haoma").focus();
                return false;

            } 

        }
		
		   if ($("#m_selProvince").val() <= 0) {
			     $("#m_selProvince").css("border","1px solid red");
            $("#m_selProvince").focus();
            return false;

        }
		
		    if ($("#m_selCities").val() <= 0) {
       	     $("#m_selCities").css("border","1px solid red");
            $("#m_selCities").focus();
            return false;

           }
		   
		       if (mzipcode.Trim() === "" || mzipcode.Trim() == "邮政编码") {
            $(".m_zipcode").css("border","1px solid red");
            $(".m_zipcode").focus();
            return false;
        } else {
            if (!mzipcode.Trim().youbian()) {
                 $(".m_zipcode").css("border","1px solid red");
				 $(".m_zipcode").focus();
                return false;

            }

        }
		
		 if (maddress.Trim() === "" || maddress.Trim() == "收货地址") {
			   $(".m_jdaddress").css("border","1px solid red");
            $(".m_jdaddress").focus();
            return false;
        }
		
  
        var sths = $(".fapiao").offset().top - 120;
        $('html,body').animate({
            scrollTop: sths
        },
        1000);
    });

    //$(".xyb").

    function initForm() {

        var maddh = 0;

        $(".m_naddress .left_2").each(function() {
 
         maddh += $(this).height();
        });

        //$(".surname").attr("disabled", "disabled");

        //$(".ming").attr("disabled", "disabled");

        //$(".haoma").attr("disabled", "disabled");

        //$("#selProvince").attr("disabled", "disabled");
        //$("#selCities").attr("disabled", "disabled");
        //$("#selDistricts").attr("disabled", "disabled");

       // $(".zipcode").attr("disabled", "disabled");
       // $(".jdaddress").attr("disabled", "disabled");

        $(".address_contains #m_selProvince >option").eq(0).attr("selected", "selected");
        $(".address_contains #m_selProvince").trigger("change");

        $(".address_contains #m_selCities >option").eq(0).attr("selected", "selected");
        $(".address_contains #m_selCities").trigger("change");
      
        $(".m_naddress").stop().animate({
            height: 320
        },
        500,function(){
			$(".m_naddress").height("auto");
			
		});

    }

    function resetForm() {

        //$(".surname").removeAttr("disabled", "disabled");

        //$(".ming").removeAttr("disabled", "disabled");

       // $(".haoma").removeAttr("disabled", "disabled");

       // $("#selProvince").removeAttr("disabled", "disabled");
        //$("#selCities").removeAttr("disabled", "disabled");
      //  $("#selDistricts").removeAttr("disabled", "disabled");

       // $(".zipcode").removeAttr("disabled", "disabled");
       // $(".jdaddress").removeAttr("disabled", "disabled");
        $(".m_naddress").stop().animate({
            height: 0
        },
        500);

    }

    function inv_yzemail() {
        inv_email = $(".inv_email").val();

        if (inv_email.Trim() === "" || inv_email.Trim() == "电子邮箱") {

            $(".inv_email").val("电子邮箱");
            $(".buymsg").html("请填写电子邮箱!").show();
            //showTip($(".inv_email"), "请填写电子邮箱。");
            $(this).val(" ");

            return false;
        } else {

            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!filter.test(inv_email.Trim())) {

                $(".buymsg").html("请使用有效的电子邮件地址格式: email@domain.com!").show();
                //showTip($(".inv_email"), "请使用有效的电子邮件地址格式: email@domain.com。");
                return false;

            } else {
                $(".buymsg").hide();
                // hideTip($(".inv_email"));
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
            $(".buymsg").hide();
            // hideTip($(this));
        }
    });

    $(".inv_email").live("blur",
    function() {

        inv_yzemail();

    });
    var slspeed = 500;
    $('input:radio[name=fapiao_radio]').eq(0).attr("checked", true);

    /*验证姓氏*/
    function yxconsignee(obj) {

        surname = $(".surname").val();
        if (surname.Trim() == "姓氏" || surname.Trim() == "") {
            $(".surname").val("姓氏");
            $(".addressmsg").html("姓氏不能为空!").show();
            // showTip($(".surname"), "姓氏不能为空。");
            return false;
        }
        $(".addressmsg").hide();
        // hideTip($(".surname"));
        return true;
    }

    $(".surname").live("focus keyup",
    function() {

        if ($(this).val().Trim() == "姓氏" || $(this).val().Trim() == "") {
            // showTip($(this),"请输入姓氏。");
            $(this).val("");
        } else {
            $(".addressmsg").hide();
            // hideTip($(this));
        }
    });

    $(".surname").live("blur",
    function() {
        yxconsignee($(this));

    });

    var msurname = '';
    function m_yxconsignee(obj) {

        msurname = $(".m_surname").val();
        if (msurname.Trim() == "姓氏" || msurname.Trim() == "") {
            $(".m_surname").val("姓氏");
            $(".addressmsg").html("姓氏不能为空!").show();
            // showTip($(".surname"), "姓氏不能为空。");
            return false;
        }else{
			
			$(".m_surname").css("border","none");
		}
        $(".addressmsg").hide();
        // hideTip($(".surname"));
        return true;
    }

    $(".m_surname").live("focus keyup",
    function() {

        if ($(this).val().Trim() == "姓氏" || $(this).val().Trim() == "") {
            // showTip($(this),"请输入姓氏。");
            $(this).val("");
        } else {
            $(".addressmsg").hide();
            // hideTip($(this));
        }
    });

    $(".m_surname").live("blur",
    function() {
        m_yxconsignee($(this));

    });

    /*验证名*/

    function yzming() {
        ming = $(".ming").val();

        if (ming.Trim() === "" || ming.Trim() == "名字") {
            $(".ming").val("名字");
            //showTip($(".ming"), "名字不能为空。");
            $(".addressmsg").html("名字不能为空!").show();
            return false;
        }
        //  hideTip($(".ming"));
        $(".addressmsg").hide();
        return true;

    }

    $(".ming").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "名字" || $(this).val().Trim() == "") {
            //  showTip($(this),"请输入名字。");
            $(this).val("");
        } else {
            $(".addressmsg").hide();
            // hideTip($(this));
        }
    });

    $(".ming").live("blur",
    function() {
        yzming();

    });

    var mming = '';
    function m_yzming() {
        mming = $(".m_ming").val();

        if (mming.Trim() === "" || mming.Trim() == "名字") {
            $(".m_ming").val("名字");
            //showTip($(".ming"), "名字不能为空。");
            $(".addressmsg").html("名字不能为空!").show();
            return false;
        }else{
			
			$(".m_ming").css("border","none");
		}
        //  hideTip($(".ming"));
        $(".addressmsg").hide();
        return true;

    }

    $(".m_ming").live("focus keyup",
    function() {

        if ($(this).val().Trim() == "名字" || $(this).val().Trim() == "") {
            //  showTip($(this),"请输入名字。");
            $(this).val("");
        } else {
            $(".addressmsg").hide();
            // hideTip($(this));
        }
    });

    $(".m_ming").live("blur",
    function() {
        m_yzming();

    });
    /*区号*/

    function yzquhao() {
        quhao = $(".quhao").val();
        if (quhao.Trim() === "" || quhao == "区号") {
            $(".quhao").val("区号");
            $(".addressmsg").html("请输入电话号码区号!").show();
            //showTip($(".quhao"), "请输入电话号码区号。");
            return false;
        }
        if (quhao == 0) {

            quhao = "";

        }
        $(".addressmsg").hide();
        // hideTip($(".quhao"));
        return true;

    }

    $(".quhao").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "区号" || $(this).val().Trim() == "") {
            // showTip($(this),"请输入电话号码区号。");
            $(this).val("");
        } else {
            $(".addressmsg").hide();
            //   hideTip($(this));
        }
    });

    $(".quhao").live("blur",
    function() {
        yzquhao();

    });

    /*座机号*/

    function yzhaoma() {
        haoma = $(".haoma").val();
        if (haoma.Trim() === "" || haoma.Trim() == "手机号码") {

            $(".haoma").val("手机号码");
            $(".addressmsg").html("请输入手机号码!").show();
            // showTip($(".haoma"), "请输入电话号码。");
            return false;
        } else {
            if (!haoma.Trim().isMobile()) {

                // showTip($(".haoma"), "号码格式不正确。");
                $(".addressmsg").html("号码格式不正确!").show();
                return false;

            } else {

                if (haoma.length == 11) {

                    mobile = haoma;

                } else {
                    tel = quhao + "" + haoma;

                }
                $(".addressmsg").hide();
                // hideTip($(".haoma"));
                return true;

            }

        }

    }
    $(".haoma").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "手机号码" || $(this).val().Trim() == "") {
            // showTip($(this),"请输入电话号码。");
            $(this).val("");
        } else {
            $(".addressmsg").hide();
            // hideTip($(this));
        }
    });

    $(".haoma").live("blur",
    function() {
        yzhaoma();

    });

    var mhaoma = '';
    function m_yzhaoma() {
        mhaoma = $(".m_haoma").val();
        if (mhaoma.Trim() === "" || mhaoma.Trim() == "手机号码") {

            $(".m_haoma").val("手机号码");
            $(".addressmsg").html("请输入手机号码!").show();
            // showTip($(".haoma"), "请输入电话号码。");
            return false;
        } else {
            if (!mhaoma.Trim().isMobile()) {

                // showTip($(".haoma"), "号码格式不正确。");
                $(".addressmsg").html("号码格式不正确!").show();
                return false;

            } else {

                if (mhaoma.length == 11) {

                    mobile = mhaoma;

                } else {
                    tel = quhao + "" + mhaoma;

                }
				$(".m_haoma").css("border","none");
                $(".addressmsg").hide();
                // hideTip($(".haoma"));
                return true;

            }

        }

    }
    $(".m_haoma").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "手机号码" || $(this).val().Trim() == "") {
            // showTip($(this),"请输入电话号码。");
            $(this).val("");
        } else {
            $(".addressmsg").hide();
            // hideTip($(this));
        }
    });

    $(".m_haoma").live("blur",
    function() {
        m_yzhaoma();

    });

    $(".wenzi2").live("click",
    function() {

        if ($(".haoma").val() != "手机号码" && yzhaoma()) {
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
            // showTip($("#selProvince"), "请选择所在的省份。");
            $(".addressmsg").html("请选择所在的省份!").show();
            return false;

        }
        $(".addressmsg").hide();
        // hideTip($("#selProvince"));
        return true;

    }

    $("#selProvince").live("change",
    function() {
        selProvince = $("#selProvince").val();
        if (selProvince <= 0) {
            //showTip($(this), "请选择所在的区。");
            $(".addressmsg").html("请选择所在的区!").show();
            return false;

        }
        $(".addressmsg").hide();
        //hideTip($(this));
        return true;

    });

    var mselProvince = 0;
    var mselCity = 0;
    var mselDistricts = 0;
    function m_checkP() {

        mselProvince = $("#m_selProvince").val();
        mselCity = 0;
        mselDistricts = 0;
        if (mselProvince <= 0) {
            // showTip($("#m_selProvince"), "请选择所在的省份。");
            $(".addressmsg").html("请选择所在的省份!").show();
            return false;

        }
			$("#m_selProvince").css("border","none");
        $(".addressmsg").hide();
        // hideTip($("#selProvince"));
        return true;

    }

    $("#m_selProvince").live("change",
    function() {
        mselProvince = $("#m_selProvince").val();
        if (mselProvince <= 0) {
            //showTip($(this), "请选择所在的区。");
            $(".addressmsg").html("请选择所在的区!").show();
            return false;

        }
		$(".m_city").css("border","none");
		$("#m_selProvince").css("border","none");
        $(".addressmsg").hide();
        //hideTip($(this));
        return true;

    });

    function m_checkC() {

        mselCity = $(".m_city").val();

        if (mselCity <= 0) {
            // showTip($(".city"), "请选择所在的城市。");
            $(".addressmsg").html("请选择所在的城市!").show();
            return false;

        }
			$(".m_city").css("border","none");
        $(".addressmsg").hide();
        // hideTip($(".city"));
        return true;

    }
	
	    $(".m_city").live("change",
    function() {
  
		$(".m_city").css("border","none");
 
        return true;

    });

    function m_checkD() {
        $(".addressmsg").hide();
        //hideTip($("#selDistricts"));
        mselDistricts = $("#m_selDistricts").val();

        if ($("#m_selDistricts option").length > 1) {

            if (mselDistricts <= 0) {
                $(".addressmsg").html("请选择所在的区域!").show();
                //showTip($("#selDistricts"),"请选择所在的区域。");
                return false;

            }

        }
		$("#m_selDistricts").css("border","none");
        $(".addressmsg").hide();
        // hideTip($("#selDistricts"));
        return true;

    }

    /*城市*/
    var selCity = 0;
    function checkC() {

        selCity = $(".city").val();

        if (selCity <= 0) {
            // showTip($(".city"), "请选择所在的城市。");
            $(".addressmsg").html("请选择所在的城市!").show();
            return false;

        }
        $(".addressmsg").hide();
        // hideTip($(".city"));
        return true;

    }

    /*区*/
    var selDistricts = 0;
    var selDhtml = "";

    function checkD() {
        $(".addressmsg").hide();
        //hideTip($("#selDistricts"));
        selDistricts = $("#selDistricts").val();

        if ($("#selDistricts option").length > 1) {

            if (selDistricts <= 0) {
                $(".addressmsg").html("请选择所在的区域!").show();
                //showTip($("#selDistricts"),"请选择所在的区域。");
                return false;

            }

        }
        $(".addressmsg").hide();
        // hideTip($("#selDistricts"));
        return true;

    }

    /*地址*/
    function yzaddress() {
        address = $(".jdaddress").val();

        if (address.Trim() === "" || address.Trim() == "收货地址") {
            $(".jdaddress").val("收货地址");
            $(".addressmsg").html("请输入收货地址!").show();
            //showTip($(".jdaddress"), "请输入街道地址。");
            $(this).val("");

            return false;
        }
        $(".addressmsg").hide();
        // hideTip($(".jdaddress"));
        return true;

    }

    $(".jdaddress").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "收货地址" || $(this).val().Trim() == "") {
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
var maddress ='';
    function m_yzaddress() {
        maddress = $(".m_jdaddress").val();

        if (maddress.Trim() === "" || maddress.Trim() == "收货地址") {
            $(".m_jdaddress").val("收货地址");
            $(".addressmsg").html("请输入收货地址!").show();
            //showTip($(".jdaddress"), "请输入街道地址。");
            $(this).val("");

            return false;
        }
			$(".m_jdaddress").css("border","none");
        $(".addressmsg").hide();
        // hideTip($(".jdaddress"));
        return true;

    }

    $(".m_jdaddress").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "收货地址" || $(this).val().Trim() == "") {
            //showTip($(this),"请输入街道地址。");
            $(this).val("");
        } else {
            hideTip($(this));
        }
    });

    $(".m_jdaddress").live("blur",
    function() {
        m_yzaddress();

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
            $(".addressmsg").html("请填写邮政编码!").show();
            // showTip($(".zipcode"), "请填写邮政编码。");
            return false;
        } else {
            if (!zipcode.Trim().youbian()) {
                $(".addressmsg").html("邮政编码格式不正确!").show();
                // showTip($(".zipcode"), "邮政编码格式不正确。");
                return false;

            } else {
                // hideTip($(".zipcode"));
                $(".addressmsg").hide();
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
            $(".addressmsg").hide();
            // hideTip($(this));
        }
    });

    $(".zipcode").live("blur",
    function() {
        yzzipcode();

    });
    var mzipcode='';
    function m_yzzipcode() {
        mzipcode = $(".m_zipcode").val();

        if (mzipcode.Trim() === "" || mzipcode.Trim() == "邮政编码") {

            $(".m_zipcode").val("邮政编码");
            $(".addressmsg").html("请填写邮政编码!").show();
            // showTip($(".zipcode"), "请填写邮政编码。");
            return false;
        } else {
            if (!mzipcode.Trim().youbian()) {
                $(".addressmsg").html("邮政编码格式不正确!").show();
                // showTip($(".zipcode"), "邮政编码格式不正确。");
                return false;

            } else {
					$(".m_zipcode").css("border","none");
                // hideTip($(".zipcode"));
                $(".addressmsg").hide();
                return true;

            }

        }

    }
    $(".m_zipcode").live("focus keyup",
    function() {
        if ($(this).val().Trim() == "邮政编码" || $(this).val().Trim() == "") {
            //showTip($(this),"请填写必填字段。");
            $(this).val("");
        } else {
            $(".addressmsg").hide();
            // hideTip($(this));
        }
    });

    $(".m_zipcode").live("blur",
    function() {
        m_yzzipcode();

    });

    /*电子邮箱*/

    function yzemail() {
        email = $(".sf_email").val();
        if (email.Trim() === "" || email.Trim() == "电子邮箱") {
            $(".sf_email").val("电子邮箱");
            $(".addressmsg").html("请填写电子邮箱!").show();
            // showTip($(".sf_email"), "请填写电子邮箱。");
            $(this).val(" ");

            return false;
        } else {

            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!filter.test(email.Trim())) {
                $(".addressmsg").html("请使用有效的电子邮件地址格式: email@domain.com!").show();
                //  showTip($(".sf_email"), "请使用有效的电子邮件地址格式: email@domain.com。");
                return false;

            } else {
                $(".addressmsg").hide();
                // hideTip($(".sf_email"));
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
                $(".addressmsg").html("手机号码格式不正确!").show();
                //  showTip($(".iphone"), "手机号码格式不正确。");
                return false;
            }
            return true;
        }

        return true;

    }

    function openPay() {

        if (step_1 && step_2 && step_3) {

            $(".jiesuan_box .jiesuan_box_left3").fadeIn();
            $(".jiesuan_box .jiesuan_box_right3").fadeIn();
        } else {
            $(".jiesuan_box .jiesuan_box_left3").show();
            $(".jiesuan_box .jiesuan_box_right3").show();
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
       hdfk_2val = $('input:radio[name=shipping]:checked', $(".hdfk_2_1")).val();
       hdfk_2valhtml = $('input:radio[name=shipping]:checked', $(".hdfk_2_1")).next().html();
	  $(".shtype").html(hdfk_2valhtml); 
var laddrs=$( '#button1' ).ladda();	  
     if (hdfk_2val >= 0) {
              $.ajax({
            type: 'POST',
            url: 'ajax-flow.php',
            dataType: "json",
            data: {
                timestamp: timestamp,
                token: token,
                act: "check_address"

            },
            beforeSend: function(XMLHttpRequest) {

                caddress = false;
                $(".ordermsg").html("").hide();
                //$(".contiune_address").addClass("c_loadding");
                $(".contiune_address").prev().show();
			   laddrs.ladda('start');
                //$(".c_loadding")
                // $("a", $(".contiune_address")).hide();
            },
            success: function(data) {
	   laddrs.ladda('stop');
                //$(".address_li").bind("click");
                $(".g_wu").eq(1).addClass("select");
                $(".contiune_address").prev().hide();
                // $(".contiune_address").removeClass("c_loadding");
                $("a", $(".contiune_address")).show();
                if ($(".fp_info select").length == 0) {

                    $(".fp_info").html(data.htmlsf);
                }

                if ($(".fp_address input").length == 0) {
                    $(".fp_address").html(data.htmls);
                }

                if ($(".inv_in_email input").length == 0) {
                    $(".inv_in_email").html(data.ehtmls);
                }

                if ($(".hdfk_2").find("input").length == 0) {
                    $(".hdfk_2").empty().html(data.shippinghtml);
                    //alert(msg.shippinghtml);
                }
                //$(".contiune_address").hide();
                $(".orderlist").hide();
                $(".g_orderinfo").fadeIn();
                $(".addresslist").fadeIn(300,
                function() {
					tz_stpeval=1;
					tz_stpe2=true;
					tz_stpe1=true;
                    $('html,body').animate({
                        scrollTop: 0
                    },
                    500)
                });
                switch (data.err) {

                case "ok":
                    step_1 = true;
                    openPay();
                    $(".ys_add").html(data.msg);
                    $(".address_contains").html(data.content);
                    if ($(window).width() < 640) {
                        var sonchuoH = $(".songhuodizhi .left").innerHeight() + $(".songhuodizhi .dibu ").innerHeight() + $(".songhuodizhi .right").innerHeight();
                    } else {
                        var sonchuoH = $(".songhuodizhi .left").innerHeight() + $(".songhuodizhi .dibu ").innerHeight();
                    }

                    $(".hide_aid").val(data.address_id);
                    caddress = true;
                    break;
                case "cart_not_goods":

                    $(".ordermsg").html("购物车中没有商品！").show();
                    // alert("购物车中没有商品！");
                    break;

                case "ver_err":

                    $(".ordermsg").html("验证失败").show();
                    // alert("购物车中没有商品！");
                    break;

                case "not_login":
                    alert("登录超时，请重新登录。");
                    location.href = "user.php?act=login";
                    caddress = false;
                    break;

                }

            },
            error: function(err) {
                alert("系统错误，请重新登录。");
                caddress = true;

            }
        });

        //}
        var idtanh = 0;

        $(".address_li").bind("click",
        function(e) {

            idtanh = 0;
            $(".di_tan .miao_add1_2").each(function(i) {

                idtanh = idtanh + $(".di_tan .miao_add1_2").eq(i).innerHeight();

            });

            // alert(1);
            if ($(this).hasClass("address_off")) {
                $(".address_li > span").addClass("select");
                $(this).removeClass("address_off").addClass("address_on");
                $(".di_tan").css("visibility", "visible").stop().animate({
                    height: idtanh
                },
                500);

            } else {
                $(".address_li > span").removeClass("select");
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
            idtanh = 0;
            if ($(this).hasClass("address_off")) {
                $(".fp_di_tan .miao_add1_2").each(function(i) {

                    idtanh = idtanh + $(".fp_di_tan .miao_add1_2").eq(i).innerHeight();

                });
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
		
		  } else {
            $(".ordermsg").html("请选择配送方式!").show();
            // $(".tishi_pay").html("请选择配送方式！").show();
            // alert("请选择配送方式！");
        }
        //  if (caddress) {


    });

    $(".chan").click(function() {
        $(".addresslist").hide();
        $(".fukuan").hide();
        $(".g_orderinfo").fadeOut();
        addste = 0;
        $(".cont_personal_box .title1 h1").removeClass("select").eq(0).addClass("select");
        $(".orderlist").fadeIn();
        $(".address_li").unbind("click");
        $('html,body').animate({
            scrollTop: 0
        },
        500)

    });

    $(".check_two").click(function() {

        submitEditAdress();
    });

    $(".bianji_address").click(function() {

        step_1 = false;
        openPay();
        $(".address_show").empty().hide();

        $(".address_c_l").fadeIn(300,
        function() {
            $(".bianji_address").hide();
        });

        $(".check_two").show();
        if ($(window).width() < 640) {
            var sonchuoH = $(".songhuodizhi .left").innerHeight() + $(".songhuodizhi .dibu ").innerHeight() + $(".songhuodizhi .right").innerHeight();
        } else {
            var sonchuoH = $(".songhuodizhi .left").innerHeight() + $(".songhuodizhi .dibu ").innerHeight();
        }
        //  var sonchuoH = $(".songhuodizhi .left").innerHeight() + $(".songhuodizhi .dibu ").innerHeight();
        $(".songhuodizhi").stop().animate({
            height: sonchuoH
        },
        500,
        function() {
            //var topval = $(".jiezhang_title_address").offset().top - $(".jiezhang_title_address").height();
            // $('html,body').animate({
            //     scrollTop: topval
            //  },
            //800)
            //
        });

    });

    var htmlEditStruct = '';
    var iseditload = true;
    var deshtml = '';
    function submitEditAdress() {

        deshtml = '';
		var saddrss='';  
        var address_id = parseInt($('input[name="spaddress"]:checked').val());
  
        var phtml = '';
        var addinfo = {};
        var hdfk_2val = $('input:radio[name=shipping]:checked', $(".hdfk_2_1")).val();
        var hdfk_2valhtml = $('input:radio[name=shipping]:checked', $(".hdfk_2_1")).next().html();
        var wszf_2valSrc = $($('input:radio[name=payment]:checked', $(".wszf_2_1"))).next().attr("src");
        var wszf_val = $('input:radio[name=payment]:checked', $(".wszf_2_1")).val();
        var wzff_val = $(".wzff").val();
        var default_state = 1;
        htmlStruct = "";
		
		if(address_id>0 || wzff_val==0){
         if (!address_id > 0) {
            var acts = "act_add_address";
        } else {
            var acts = "mb_act_edit_address";
        }

        if (wzff_val == 1) {
			
			addinfo['address_id'] = address_id;
		}else{


            if (!m_yxconsignee()) {

                return false;
            }

            if (!m_yzming()) {

                return false;
            }

            if (!m_yzhaoma()) {

                return false;
            }
            if (!m_checkP()) {

                return false;
            }
            if (!m_checkC()) {

                return false;
            }
            if (!m_checkD()) {

                return false;
            }

            if (!m_yzaddress()) {

                return false;
            }

            if (!m_yzzipcode()) {

                return false;
            }
            addinfo['default_set'] = default_state;
            addinfo['ming'] = mming;
            addinfo['surname'] = msurname;
            addinfo['haoma'] = mhaoma;
            addinfo['province'] = mselProvince;
            addinfo['city'] = mselCity;
            addinfo['district'] = mselDistricts;
            addinfo['address'] = maddress;
            addinfo['zipcode'] = mzipcode;
            var acts = "act_add_address";

        }

        if (fri > 0) {

            if (!yz_inpfptait()) {
                return false;

            }

            if (!yz_inpfpcontent()) {

                return false;
            }

            postDate['payee'] = inv_payee;
            postDate['content'] = inv_content;
            postDate['type'] = fri;

        }
       var laddrs2=$( '#button2' ).ladda();	 
        //  if (iseditload) {
        $.ajax({
            type: 'POST',
            url: 'user.php',
            asyn: false,
            data: {
                addinfo: addinfo,
                postDate: postDate,
                default_state: default_state,
                timestamp: timestamp,
                token: token,
                act: acts

            },
            dataType: "json",
            beforeSend: function(XMLHttpRequest) {
                // iseditload = false;
                //$(".check_two").addClass("c_loadding");
                $(".addressmsg").html("").hide();
               laddrs2.ladda('start');
			 
               $(".check_two").prev().show();
                //$("a", $(".check_two")).hide();
                //$(".submit_state").empty().show().html("表单正在提交...");
            },
            success: function(data) {
				    laddrs2.ladda('stop');
                $(".g_wu").eq(2).addClass("select");
				$(".g_you").eq(1).removeClass("sever");
                $(".check_two").removeClass("c_loadding");
                $(".check_two").prev().hide();
                switch (data.err) {
                case 1:

                    step_1 = true;
                    openPay();
                    address_id = data.i_id;
                    $(".hide_aid").val(address_id);

                   // if (acts == "act_add_address") {
                     //   htmlStruct = '';
                        //if (addste == 0) {
                          //  if (document.getElementById("selProvince")) {
                           //     Pindex = document.getElementById("selProvince").selectedIndex;
                           //     var Ptml = document.getElementById("selProvince").options[Pindex].text;
                          //  }
                          //  if (document.getElementById("selCities")) {
                            //    Cindex = document.getElementById("selCities").selectedIndex;
                           //     var Ctml = document.getElementById("selCities").options[Cindex].text;
                          //  }
                          //  if (document.getElementById("selDistricts")) {
                           //     Dindex = document.getElementById("selDistricts").selectedIndex;
                           //     var Dtml = document.getElementById("selDistricts").options[Dindex].text;
                           // }
                           // htmlStruct = ' <div class="miao_add1_2 item_' + address_id + '" onclick="change_address(' + address_id + ');">';
                           // htmlStruct += '<div class="miao_add1_2_t">' + surname + ming + '</div>';
                           // htmlStruct += ' <div class="miao_add1_2_t">' + Ptml + " " + " " + Ctml + " " + Dtml + '</div>';
                           // htmlStruct += ' <div class="miao_add1_2_t">' + address + '</div>';
                            //htmlStruct += ' <div class="miao_add1_2_t">' + zipcode + '</div></div>';
							
							//saddrss=Ptml+Ctml+Dtml+address;
							//$(".sh_addr").html(saddrss);
                       // } else {

                         //   if (document.getElementById("m_selProvince")) {
                          //      Pindex = document.getElementById("m_selProvince").selectedIndex;
                          //      var Ptml = document.getElementById("m_selProvince").options[Pindex].text;
                          //  }
                          //  if (document.getElementById("m_selCities")) {
                           //     Cindex = document.getElementById("m_selCities").selectedIndex;
                           //     var Ctml = document.getElementById("m_selCities").options[Cindex].text;
                          //  }
                          //  if (document.getElementById("m_selDistricts")) {
                          //      Dindex = document.getElementById("m_selDistricts").selectedIndex;
                          //      var Dtml = document.getElementById("m_selDistricts").options[Dindex].text;
                         //   }

                          //  htmlStruct = ' <div class="miao_add1_2 item_' + address_id + '" onclick="change_address(' + address_id + ');">';
                          //  htmlStruct += '<div class="miao_add1_2_t">' + msurname + mming + '</div>';
                           // htmlStruct += ' <div class="miao_add1_2_t">' + Ptml + " " + " " + Ctml + " " + Dtml + '</div>';
                           // htmlStruct += ' <div class="miao_add1_2_t">' + maddress + '</div>';
                           // htmlStruct += ' <div class="miao_add1_2_t">' + mzipcode + '</div></div>';
						//	saddrss=Ptml+Ctml+Dtml+address;
							//$(".sh_addr").html(saddrss);

                     //   }

                        //$(".address_em_c").remove();
                        //$(".di_tan").append(htmlStruct);

                   // }else{
						  //  if (document.getElementById("selProvince")) {
                           //     Pindex = document.getElementById("selProvince").selectedIndex;
                          //      var Ptml = document.getElementById("selProvince").options[Pindex].text;
                          //  }
                           // if (document.getElementById("selCities")) {
                           //     Cindex = document.getElementById("selCities").selectedIndex;
                           //     var Ctml = document.getElementById("selCities").options[Cindex].text;
                           // }
                           // if (document.getElementById("selDistricts")) {
                            //    Dindex = document.getElementById("selDistricts").selectedIndex;
                            //    var Dtml = document.getElementById("selDistricts").options[Dindex].text;
                           // }
							//saddrss=Ptml+Ctml+Dtml+address;
						//	$(".sh_addr").html(saddrss);
						
					//}

                  
						tz_stpe3=true;
						tz_stpeval=2;
                        //  $(".address_show").empty().html(deshtml).show();
                        var sonchuoH = $(".songhuodizhi .address_show ").outerHeight() + 40;
                        $.ajax({
                            type: 'POST',
                            url: 'ajax-flow.php',
                            dataType: "json",
                            data: {
                                timestamp: timestamp,
                                token: token,
                                act: "check_inv"

                            },
                            beforeSend: function(XMLHttpRequest) {
                                $(".pay_type").addClass("c_loadding");
                                //$("a", $(".pay_type")).hide();
                                // $(".pay_type").show();
                                $(".buymsg").html("").hide();
                                paystate = false;

                            },
                            success: function(msg) {
                                $(".pay_type").removeClass("c_loadding");
                                // $("a", $(".pay_type")).show();
                                //$(".pay_type").hide();
                                switch (msg.err) {

                                case "ok":

                                    if ($(".wszf_2").find("input").length == 0) {
                                        $(".wszf_2").empty().html(msg.payhtml);
										
										 $(".wszf_2 input").eq(0).attr("checked",true);
										 $(".wszf_2 .zhifubao").eq(0).addClass("select");
                                    }
                                    $(".addresslist").hide();
                                    $(".fukuan").fadeIn(300,
                                    function() {

                                        //$(".address_li").unbind("click");
                                        $('html,body').animate({
                                            scrollTop: 0
                                        },
                                        500)

                                    });

                                    break;
                                case "not_login":
                                    alert("登录超时，请重新登录。");
                                    location.href = "user.php?act=login";
                                    paystate = false;
                                    break;

                                case "ver_err":
                                    alert("验证失败!");
                                    //  location.href = "user.php?act=login";
                                    paystate = false;
                                    break;

                                }
                            },
                            error: function(err) {
                                alert("系统错误，请重新登录。");
                                caddress = true;

                            }

                        })

                   

                    break;

                case 2:
                    $(".addressmsg").html("收货地址不得超过5条记录!").show();
                    //$(".submit_state").empty().show().html("<span class='ti_error'>收货地址修改失败。</span>");
                    iseditload = true;
                    break;

                case 3:
                    $(".submit_state").empty().hide();
                    $(".addressmsg").html("姓氏不能为空!").show();
                    //showTip($(".surname"), "姓氏不能为空。");
                    iseditload = true;
                    break;

                case 4:
                    $(".submit_state").empty().hide();
                    $(".addressmsg").html("请输入名字!").show();
                    // showTip($(".ming"), "请输入名字。");
                    iseditload = true;
                    break;

                case 5:
                    $(".submit_state").empty().hide();
                    $(".addressmsg").html("请输入电话号码!").show();
                    //showTip($(".haoma"), "请输入电话号码。");
                    iseditload = true;
                    break;

                case 6:
                    $(".submit_state").empty().hide();
                    $(".addressmsg").html("请选择所在的省份!").show();
                    //showTip($("#selProvince"), "请选择所在的省份。");
                    iseditload = true;
                    break;

                case 7:
                    $(".submit_state").empty().hide();

                    $(".addressmsg").html("请选择所在的城市!").show();
                    // showTip($(".city"), "请选择所在的城市。");
                    iseditload = true;
                    break;

                case 8:
                    $(".submit_state").empty().hide();
                    $(".addressmsg").html("请填写邮政编码!").show();
                    // showTip($("#selDistricts"), "请填写邮政编码。");
                    iseditload = true;
                    break;

                case 9:
                    $(".submit_state").empty().hide();
                    $(".addressmsg").html("请填写收货地址!").show();
                    //$(".jdaddress").val("区，街道编号/名称，楼宇名称");
                    iseditload = true;
                    break;
                case 10:
                    $(".submit_state").empty().hide();

                    $(".addressmsg").html("请填写电子邮箱!").show();
                    //showTip($(".sf_email"), "请填写电子邮箱。");
                    iseditload = true;
                    break;

                case 11:
                    $(".submit_state").empty().hide();
                    $(".addressmsg").html("手机号码格式不正确!").show();
                    // showTip($(".iphone"), "手机号码格式不正确。");
                    iseditload = true;
                    break;
                case 17:
                    $(".submit_state").empty().hide();
                    $(".addressmsg").html("请选择发票类型!").show();

                    iseditload = true;
                    break;

                case 20:
                    $(".submit_state").empty().hide();
                    $(".addressmsg").html("发票类型错误!").show();

                    iseditload = true;
                    break;

                case 18:
                    $(".submit_state").empty().hide();
                    $(".addressmsg").html("请填写发票抬头!").show();

                    iseditload = true;
                    break;
                case 12:
                    $(".submit_state").empty().hide();

                    alert("登录超时，请重新登录。");
                    location.href = "user.php?act=login";

                    break;

                case "ver_err":
                    alert("验证失败!");
                    break;

                case 13:
                    $(".submit_state").empty().hide();
                    // $(".submit_state").empty().show().html("<span class='ti_error'>非法数值，保存失败。</span>");
                    $(".check_two").show();
                    // alert("非法数值，保存失败。");
                    $(".addressmsg").html("非法数值，保存失败。!").show();
                    iseditload = true;
                    break;
                default:
                    $(".check_two").show();
                    alert("系统错误,请刷新后重试!");

                    //$(".submit_state").empty().show().html("<span class='ti_error'>系统错误,请刷新后重试!</span>");
                }

            }
        });
		}else{
			  $(".addressmsg").html("您还未选择有效的收货地址!").show();
			
		}
    
    }

    var isefpload = true;
    $(".fapiao_raidos").change(function() {

        fri = $(this).val();
		
      changeMbNeedInv();
        isefpload = true;
        if (fri == 0) {
            $(".need_inv").val(0);
            // $("#ECS_INVTYPE option").eq(0).attr("selected","selected");
            // $("#ECS_INVTYPE").trigger("change");
            //hideTip();
            $(".fapiao .right,.right_1,.inv_in_email").show();
            $(".mbfapiao_catain").hide();
            $(".left2_1").hide();

        } else {
			
            $(".right_1,.inv_in_email").hide();
            // $(".fapiao .right").hide();
            $(".need_inv").val(1);
            $(".mbfapiao_catain").show();
            $(".left2_1").show();

        }
    });

    var postDate = {};

    var isefpload = true;
    $(".pay_type").click(function() {

        var phtml = '';
        var hdfk_2val = $('input:radio[name=shipping]:checked', $(".hdfk_2_1")).val();
        var hdfk_2valhtml = $('input:radio[name=shipping]:checked', $(".hdfk_2_1")).next().html();
        var wszf_2valSrc = $($('input:radio[name=payment]:checked', $(".wszf_2"))).next().attr("src");
        var wszf_val = $('input:radio[name=payment]:checked', $(".wszf_2")).val();

   
        if (hdfk_2val >= 0) {

            if (wszf_val >= 0) {

                  var laddrs3=$( '#button3' ).ladda();	 
                    $(".tishi_pay").html("").hide();
                    $.ajax({
                        type: 'POST',
                        url: 'ajax-flow.php',
                        dataType: "json",
                        data: {
                            timestamp: timestamp,
                            token: token,
                            act: "check_pay"

                        },
                        beforeSend: function(XMLHttpRequest) {
                            //$(".pay_type").addClass("c_loadding");
                            $(".pay_type").prev().show();
                            isefpload = false;
							laddrs3.ladda('start');	

                        },
                        success: function(data) {
							
								laddrs3.ladda('stop');	
                            //   $(".pay_type").removeClass("c_loadding");
                            $(".pay_type").prev().hide();
                            switch (data.err) {

                            case "ok":
                                step_2 = true;
                                openPay();

                                document.theForm.submit();
                                //isefpload = true;
                                break;
                            case 3:
                                $(".buymsg").html("姓氏不能为空!").show();
                                // showTip($(".inv_surname"), "姓氏不能为空。");
                                isefpload = true;
                                break;

                            case 4:
                                $(".buymsg").html("请输入名字!").show();
                                //showTip($(".inv_ming"), "请输入名字。");
                                isefpload = true;
                                break;

                            case 5:
                                $(".buymsg").html("请输入电话号码!").show();
                                //  showTip($(".inv_haoma"), "请输入电话号码。");
                                isefpload = true;
                                break;

                            case 6:
                                $(".buymsg").html("请选择所在的省份!").show();
                                //showTip($("#inv_selprovince"), "请选择所在的省份。");
                                isefpload = true;
                                break;

                            case 7:
                                $(".buymsg").html("请选择所在的城市!").show();
                                //showTip($("#inv_selcity"), "请选择所在的城市。");
                                isefpload = true;
                                break;

                            case 8:
                                $(".buymsg").html("请填写所在的区域!").show();
                                //  showTip($("#inv_seldistricts"), "请填写所在的区域。");
                                isefpload = true;
                                break;

                            case 9:
                                $(".buymsg").html("请填写收货地址!").show();
                                // $(".inv_address").val("请填写区，街道编号/名称，楼宇名称");
                                isefpload = true;
                                break;
                            case 10:
                                $(".buymsg").html("请填写电子邮箱!").show();
                                //showTip($(".inv_email"), "请填写电子邮箱。");
                                isefpload = true;
                                break;

                            case 12:
                                $(".buymsg").html("请填写发票抬头!").show();
                                //  showTip($("#ECS_INVPAYEE"), "请填写发票抬头。");
                                isefpload = true;
                                break;
                            case 13:
                                $(".buymsg").html("请选择发票内容!").show();
                                //  showTip($("#ECS_INVCONTENT"), "请选择发票内容。");
                                isefpload = true;
                                break;

                            case 14:
                                $(".buymsg").html("电子邮箱格式不正确!").show();
                                //showTip($(".inv_email"), "电子邮箱格式不正确。");
                                isefpload = true;
                                break;

                            case "ver_err":
                                $(".buymsg").html("验证失败!").show();

                                break;
                            case "not_login":
                                alert("登录超时，请重新登录。");
                                location.href = "user.php?act=login";
                                paystate = false;
                                break;

                            }

                        },
                        error: function(err) {
                            alert("系统错误，请重新登录。");
                            paystate = true;

                        }
                    });

               

            } else {
                $(".buymsg").html("请选择支付方式!").show();
                // $(".tishi_pay").html("请选择支付方式！").show();
                //   alert("请选择支付方式！");
            }

        } else {
            $(".buymsg").html("请选择配送方式!").show();
            // $(".tishi_pay").html("请选择配送方式！").show();
            // alert("请选择配送方式！");
        }

    });

    $(".bianji_pay").click(function() {

        step_2 = false;
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
        500,
        function() {
            var topval = $(".fukuan_title").offset().top - $(".fukuan_title").height();
            $('html,body').animate({
                scrollTop: topval
            },
            800)

        });

    });

    $(".fapiao_type").click(function() {

        if (fri == 0) {

            if (!inv_yzemail()) {

                return false;
            }
            postDate['email'] = inv_email;
            postDate['type'] = fri;
            postDate['act'] = "act_fapiao";

        } else {

            if (!inv_yzemail()) {

                return false;
            }

            //  if(!yz_inpfptype()){
            //  return false;
            // }
            if (!yz_inpfptait()) {
                return false;

            }

            if (!yz_inpfpcontent()) {

                return false;
            }

            if (!inv_yxconsignee()) {

                return false;
            }

            if (!inv_yzming()) {

                return false;
            }

            if (!inv_yzquhao()) {
                return false;

            }

            if (!inv_yzhaoma()) {

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
            postDate['surname'] = inv_surname;
            postDate['ming'] = inv_ming;
            postDate['quhao'] = inv_quhao;

            postDate['haoma'] = inv_haoma;

            postDate['province'] = inv_selprovince;

            postDate['city'] = inv_selcity;

            postDate['district'] = inv_seldistricts;
            postDate['company_name'] = company_name;
            postDate['address'] = inv_address;
            postDate['room'] = inv_room;
            postDate['zipcode'] = inv_zipcode;
            postDate['email'] = inv_email;
            postDate['fptype'] = inv_type;
            postDate['payee'] = inv_payee;
            postDate['content'] = inv_content;
            postDate['type'] = fri;
            postDate['act'] = "act_fapiao";

        }

        if (isefpload) {

            $.ajax({
                type: 'POST',
                url: 'ajax-flow.php',

                data: postDate,
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

                        step_3 = true;
                        //step_4=false;
                        openPay();
                        isefpload = false;

                        $(".fapiao_type").removeClass("c_loadding");
                        $("a", $(".fapiao_type")).show();
                        $(".fapiao_type").hide();

                        $(".miao_song_fp").empty().html(data.content);

                        $(".fp_c").fadeOut(300,
                        function() {

                            $(".miao_song_fp").show();
                            $(".bianji_fapiao").show();
                            var fapiaoM = parseInt($(".fapiao .miao_song_fp").outerHeight()) + parseInt($(".fapiao .dibu").outerHeight());
                            $(".fapiao ").animate({
                                height: fapiaoM
                            },
                            500,
                            function() {
                                var topval = $(".law_title").offset().top - $(".law_title").height();
                                $('html,body').animate({
                                    scrollTop: topval
                                },
                                800);

                                if (!lowtype) {
                                    var lacH = $(".tk_content").outerHeight();

                                    $('.tktj_title').animate({
                                        height: lacH
                                    },
                                    800);

                                }
                            });

                        });

                        setTimeout(function() {

                            isefpload = true;
                        },
                        3000);

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

                        $(".inv_address").val("请填写收货地址");

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

    $(".bianji_fapiao").click(function() {
        $('.tktj_title').animate({
            height:
            0
        },
        800);
        //$(".bianji_law").hide();
        step_3 = false;
        openPay();
        $(".miao_song_fp").empty().hide();

        $(".fp_c").show();
        if ($(window).width() < 640) {

            if (fri == 0) {
                fapiaoH = parseInt($(".fapiao .left").outerHeight()) + parseInt($(".fapiao .right").outerHeight()) + parseInt($(".fapiao .dibu").outerHeight());
            } else {
                fapiaoH = parseInt($(".fapiao .right").outerHeight()) + parseInt($(".fapiao .dibu").outerHeight());
            }
        } else {

            if (fri == 0) {
                fapiaoH = parseInt($(".fapiao .left").outerHeight()) + parseInt($(".fapiao .right").outerHeight()) + parseInt($(".fapiao .dibu").outerHeight());
            } else {
                fapiaoH = parseInt($(".fapiao .right").outerHeight()) + parseInt($(".fapiao .dibu").outerHeight());
            }

        }

        $(".fapiao ").animate({
            height: fapiaoH
        },
        500);
        $(".bianji_fapiao").hide();
        $(".fapiao_type").show();

    });

    lowtype = 1;
    step_4 = true;
    /*$(".law_btn").click(function(){
	   	                
		    if($("#terms-accept").attr("checked")=="checked"){
	
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
	
	});*/

    $(".bianji_law").click(function() {
        step_4 = false;
        openPay();
        $(".bianji_law").hide();
        var lacH = $(".tk_content").outerHeight();

        $('.tktj_title').animate({
            height: lacH
        },
        800);
    });

    $(".inputBg").val("");
    $(".inputBg").bind("focus keyup",
    function() {

        $(".jiesuan_box_left1 .jie_tis").hide();

    });

    var gnumstate = true;
    /*	$(".cp_box .li_3 .g_numbers").click(function(e){
		if(gnumstate){
		var g_element='';
		 var goonum=parseInt($(this).html().replace(/(^\s*)|(\s*$)/,''));
		 if(goonum<=0){
			 goonum=1;
		 }
		 g_element='<input type="text" size="2" value="'+goonum+'" class="e_goods"  />';
		 $(this).empty().append(g_element);
		 $("input",$(this)).val(goonum);
		 $("input",$(this)).focus();
		gnumstate=false;
		 e.stopPropagation();
		}
		
	});*/

    $(".cp_box .li_3").delegate(".e_goods", "keyup",
    function(e) {

        var goonum = $(this).val();;
        goonum = goonum.replace(/\D/g, '');
        $(this).val(goonum);
        e.stopPropagation();
    });

    $(".cp_box .li_3").delegate(".e_goods", "blur",
    function(e) {

        var that = $(this);
        var numbs = parseInt(that.val());
        var nobjs = that.parent();
        var itemind = $(".cp_box").index(nobjs);

        var rec_id = parseInt(that.parent().parent().attr("rec_id"));
        if (numbs <= 0) {

            numbs = 1;
        }
       
        if (rec_id > 0) {

            $.ajax({
                type: 'POST',
                url: 'ajax-flow.php',
                dataType: "json",
                data: {
                    token: token,
                    timestamp: timestamp,
                    numbs: numbs,
                    rec_id: rec_id,
                    act: "change_num"

                },
                beforeSend: function(XMLHttpRequest) {

                    //$(".songhuodizhi .left").addClass("d_loadding");

                },
                success: function(data) {
                    //   gnumstate = false;
                    switch (data.err) {

                    case "update_success":

                        var e_gpar = that.parent().parent();
                        e_gpar.next().html(data.total_price);
                        // that.remove();
                        $("input", e_gpar).val(data.number);
                        //e_gpar.html(data.number);
                        $(".carnum").html(data.tnums);
                        $(".cartop").html(data.totp);
                        $('#ECS_ORDERTOTAL').empty().html(data.content);
                        $(".l_zq .l_zqnums").eq(itemind).html(data.number);
                        $(".l_zq .t3").eq(itemind).html(data.total_price);
                        e.stopPropagation();

                        break;

                    case "empty_err":

                        alert("非法数值!");

                        break;

                    case "kuc_err":

                        alert("商品库存不足!");
                        var e_gpar = that.parent();
                        $("input", e_gpar).val(data.kuc);
                        changestate = true;
                        break;

                    case "edit_kuc_err":

                        alert("购买数量变更失败，请重试!");
                        break;

                    case "not_item":

                        alert("非法操作!");
                        break;

                    case "ver_err":

                        alert("验证失败!");
                        break;

                    case "not_login":

                        alert("登录超时，请重新登录。");
                        location.href = "user.php?act=login";

                        break;

                    }

                },
                error: function() {

                    alert("系统错误，请重新登录。");
                }
            });

        } else {
            alert("非法数值!");

        }

    });
	

	 $(".sy_jian").click(function(){
  
    var eleindex=$(".sy_jian").index(this);
	
	var inintNums=parseInt($(".e_goods").eq(eleindex).val());
	var recid=$(".li_3").eq(eleindex).attr("rec_id");
	if(inintNums===1){
	 addGoodNums(recid,1,eleindex);
	  
	  return false;
	}else{
    inintNums=inintNums-1;
	addGoodNums(recid,inintNums,$(".e_goods").eq(eleindex));
	
	}
  
  });
  
  
  
  $(".sy_jia").click(function(){
  
    var eleindex=$(".sy_jia").index(this);
	
	var inintNums=parseInt($(".e_goods").eq(eleindex).val());
	var recid=$(".li_3").eq(eleindex).attr("rec_id");
    inintNums=inintNums+1;
	addGoodNums(recid,inintNums,$(".e_goods").eq(eleindex));
	
 
  
  });

    /*$(".jiezhang_box_anniu3").click(function(){
	
	
	// document.theForm.submit();
	
	});*/
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

function addGoodNums(id,number,elm){

  if(id>0){
     var itemind = $(".e_goods").index(elm);
     jQuery.ajax({
                type: 'POST',
				
                url: 'ajax-flow.php',
                data:{
                    token: token,
                    timestamp: timestamp,
                    numbs: number,
                    rec_id: id,
                    act: "change_num"
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){

                },
                success: function(data){
                 
                     switch(data.err){
                        case "update_success":
					
					    var e_gpar = elm.parent().parent();
                        e_gpar.next().html(data.total_price);
                        // that.remove();
                        $("input", e_gpar).val(data.number);
                        //e_gpar.html(data.number);
                        $(".carnum").html(data.tnums);
                        $(".cartop").html(data.totp);
                        $('#ECS_ORDERTOTAL').empty().html(data.content);
                        $(".l_zq .l_zqnums").eq(itemind).html(data.number);
                        $(".l_zq .t3").eq(itemind).html(data.total_price);
                         break; 
						 
						 case "kuc_err":
					     alert("商品库存不足!");
						 elm.val(data.kuc);
						 //alert("对不起，该商品已经库存不足暂停销售!");
						 break;
                     
					     case "empty_err":

                        alert("非法数值!");

                        break;
				 
			           case "edit_kuc_err":

                        alert("购买数量变更失败，请重试!");
                        break;

                    case "not_item":

                        alert("非法操作!");
                        break;

                    case "ver_err":

                        alert("验证失败!");
                        break;
                    }
		
                }
            });
  
  }


}
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
                    token: token,
                    timestamp: timestamp,
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
                        $(".address_li > span").removeClass("select");
                        $(".address_li").removeClass("address_on").addClass("address_off");
                        $(".di_tan").stop().animate({
                            height:
                            0
                        },
                        500,
                        function() {

                            $(".di_tan").css("visibility", "hidden");
                        });

                        $(".songhuodizhi .left").removeClass("d_loadding");
                        $(".address_contains").html(data.content);
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

                    case "ver_err":
                        alert("验证失败!");
                        break;

                    }

                },
                error: function() {

                    alert("系统错误，请重新登录。");
                }
            });

        }

    }

}

function change_car(id) {

    if (id > 0) {
        $.ajax({
            type: 'POST',
            url: 'ajax-flow.php',
            dataType: "json",
            data: {
                id: id,
                act: "chage_car"

            },
            beforeSend: function(XMLHttpRequest) {

},
            success: function(data) {

                switch (data.err) {

                case "ok":

                    break;

                }

            },
            error: function() {

                alert("系统错误，请重试!");
            }
        });

    }

}

var fpchangestate = true;
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

  function drop_goods(id, obj) {
    var nobjs = $(obj);
    var itemind = $(".caca").index(nobjs);

    if (id > 0) {

        $.ajax({
            type: 'POST',
            url: 'ajax-flow.php',
            dataType: "json",
            data: {
                token: token,
                timestamp: timestamp,
                id: id,
                act: "mb_drop_goods"

            },
            beforeSend: function(XMLHttpRequest) {

                 $(".mbloadding",nobjs.parent().parent().parent()).fadeIn();
                fpchangestate = false;

            },
            success: function(data) {
				      $(".mbloadding",nobjs.parent().parent().parent()).fadeOut();
     
                switch (data.err) {

                case "delete_s":
                   
                    $(obj).parent().parent().parent().fadeOut(300,
                    function() {
                        //relashCart();
                        $(obj).parent().parent().parent().remove();
                        var gxhlen = $(".zhong .f_baobao").length;
                         $(".totalmoney").html(data.totp);
                        if (gxhlen == 0) {
                            $(".dengluan").hide();
                            $(".f_dizik").hide();
                            $(".ddw").show();

                        }
                    });

                    break;
                case "no_goods_in_cart":

                    $(obj).parent().parent().parent().fadeOut(300,
                    function() {
                       // relashCart();
                        $(obj).parent().parent().parent().remove();
                           $(".dengluan").hide();
                            $(".f_dizik").hide();
                            $(".ddw").show();
                    });
                    break;

                case "delete_f":
                    alert("删除失败!");

                    break;

                case "not_item":

                    alert("没有找到要删除的记录!");

                    break;
                case "id_empty":

                    alert("没有找到要删除的记录!");

                    break;

                case "not_login":
                    alert("登录超时，请重新登录。");
                    location.href = "user.php?act=login";
                    break;

                case "ver_err":
                    alert("验证失败!");
                    break;

                }

            },
            error: function() {

                alert("系统错误，请重试!");
            }
        });

    } else {

        alert("没有选中要删除的产品！");

    }

}


function relashCart() {

    $.ajax({
        type: 'POST',
        url: 'cart.php?act=refresh',
        dataType: "json",
        beforeSend: function(XMLHttpRequest) {

},
        success: function(data) {

            $(".cat_count").empty().html(data.count);
            $(".deng_cart_list").empty().html(data.content);
            $(".bag_shu").empty().html(data.count);

        }
    });

}

     function getWordLen(str){
			  var liukval=str;
			  var len=0;
			  for(var i=0;i<liukval.length;i++){
				  var c=liukval.charCodeAt(i);
				  if((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)){
					  
					       len++;
				  }else{
						  len+=2;  
				  }
				 
			 }
			  return len;
		 }
		 
		 function addNums(id,number,elm){

  if(id>0){
   
     jQuery.ajax({
                type: 'POST',
				
                url: 'ajax-flow.php',
                data:{
                    token: token,
                    timestamp: timestamp,
                    numbs: number,
                    rec_id: id,
                    act: "change_num"
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
                $(".mbloadding",elm.parent().parent()).fadeIn();
                },
                success: function(data){
                   $(".mbloadding",elm.parent().parent()).fadeOut();
                     switch(data.err){
                        case "update_success":
					
						//elm.val(data.number);
					   
						elm.next().html(data.total_price);
						
 
					
					   $(".totalmoney").html(data.total);
					  // $(".jsmoney").html("-"+data.jsmoney);
                         break; 
						 
						 case "kuc_err":
					     alert("商品库存不足!");
					$("option",elm).eq(0).attr("selected","selected");
						 //alert("对不起，该商品已经库存不足暂停销售!");
						 break;
                     
					     case "empty_err":

                        alert("非法数值!");

                        break;
				 
			           case "edit_kuc_err":

                        alert("购买数量变更失败，请重试!");
                        break;

                    case "not_item":

                        alert("非法操作!");
                        break;

                    case "ver_err":

                        alert("验证失败!");
                        break;
                    }
		
                }
            });
  
  }


}