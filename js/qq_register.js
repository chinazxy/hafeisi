$(function() {

    var nickstate = false;
    var emailstate = false;
    var passwordstate = false;
    var name, email, uid, password, gender, face, mtype,openid,restype;
    initForm();
    $(".bnickname").bind("focus",
    function() {
        if (!nickstate && !checkNickname($(this).val())) {
            $(".nick_c").hide();
            $(".nick_f").hide();
            $(".nick_s").show();
        }
    });

    $(".bnickname").bind("blur",
    function() {
        checkNickname($(this).val());

    });

    $(".binemail").bind("focus",
    function() {
        if (!emailstate && !checkEmial($(this).val())) {
            $(".email_s").show();
            $(".email_c").hide();
            $(".email_f").hide();
        }

    });
    $(".binemail").bind("blur",
    function() {
        checkEmial($(this).val());

    });

    $(".binpassword").bind("focus",
    function() {
        if (!passwordstate && !checkPassword($(this).val())) {
            $(".password_s").show();
            $(".password_f").hide();
            $(".password_c").hide();
        }
    });
    $(".binpassword").bind("blur",
    function() {
        checkPassword($(this).val());

    });

    function checkEmial(email) {

        if (email === "") {
            $(".email_s").show();
            $(".email_c").hide();
            $(".email_f").hide();
            //$(".binemail").focus();
            emailstate = true;
            return false;
        } else {

            var _reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if (!_reg.test(email)) {

                $(".email_s").hide();
                $(".email_f").empty().fadeIn().html("邮件输入格试不正确!");
                $(".email_c").hide();
                emailstate = false;
               // $(".email").focus();

                return false;
            } else {
                $(".email_f").hide();
                $(".email_s").hide();
                $(".email_c").show();
                emailstate = true;
                return true;
            }

        }

    }

    function checkPassword(password) {

        if (password === "") {
            $(".password_s").show();
            $(".password_c").hide();
            $(".password_f").hide();
            //$(".password").focus();
            passwordstate = true;
            return false;
        } else if (password.getStringLen() < 6) {

            $(".password_s").hide();
            $(".password_c").hide();
            $(".password_f").empty().fadeIn().html("密码长度小于6个字符!");
           // $(".password").focus();
            passwordstate = false;
        } else {
            $(".password_f").hide();
            $(".password_s").hide();
            $(".password_c").show();
            passwordstate = true;
            return true;
        }

    }

    function checkNickname(name) {

        if (name === "") {
            $(".nick_c").hide();
            $(".nick_s").show();
            $(".nick_f").hide();
            $(".bnickname").focus();
            nickstate = true;
            return false;
        } else if (name.getStringLen() < 2 || name.getStringLen() > 16) {
            $(".nick_s").hide();
			$(".nick_c").hide();
            $(".nick_f").empty().fadeIn().html("您的昵称，长度为2-16!");
            nickstate = false;
            return false;
        } else {
            $(".nick_c").show();
            $(".nick_s").hide();
            $(".nick_f").hide();
            nickstate = true;
            return true;
        }

    }

    $(".setp_pofile_input_submit").click(function() {
     
        submitEditAdress();

    });

    function submitEditAdress() {

        name = $(".bnickname").val();
        email = $(".binemail").val();
        password = $(".binpassword").val();
        gender = $(".gender").val();
        face = $(".face").val();
		//var province=$(".province").val();
		//var city=$(".city").val();
		openid=$(".openid").val();
		restype=$(".restype").val();

		if(openid==""){
		  alert("非法传值！");
		  return false;
		}
        if (!checkNickname(name)) {

            return false;
        }

        if (!checkEmial(email)) {

            return false;
        }

        if (!checkPassword(password)) {

            return false;
        }

        $.ajax({
            type: 'POST',
            url: 'user.php',
            data: {
                nickname: name,
                email: email,
                mtype: mtype,
                password: password,
                gender: gender,
				openid:openid,
				restype:restype,
                face:face,
				token:token,
				timestamp:timestamp,
				act:"reg_add_qq"

            },
            dataType: "json",
            beforeSend: function(XMLHttpRequest) {
			   $(".w_img").removeClass("w_img1").addClass("w_img2");
                $(".lv_tishi").show();
				$(".lvtsinfo").html("数据提交中,请稍候！");
				
				
            },
            success: function(data) {
               
                switch (data.err) {
				  
				   case "close":
				   	$(".w_img").removeClass("w_img2").removeClass("w_img1");
				   $(".lvtsinfo").html("系统已关闭注册！");
				   setTimeout(function(){
				    $(".lv_tishi").hide();
				   },2000);
				  
				   break;
				   case "login_s":
				    $(".w_img").removeClass("w_img2").addClass("w_img1");
				      $(".lvtsinfo").html("你已经登陆系统，无需重新注册!");
				   setTimeout(function(){
				    $(".lv_tishi").hide();
					
						  location.href="index.php";
					
					
				   },2000);
				   
					
				   break;
				   
				   case "ver_err":
				     $(".lvtsinfo").html("验证失败，请重试!");
					    setTimeout(function(){
				    $(".lv_tishi").hide();
				   },2000);
				   break;
				   	   case "type_err":
				     $(".lvtsinfo").html("类型错误，请重试!");
					    setTimeout(function(){
				    $(".lv_tishi").hide();
				   },2000);
				   break;
				   
				   case "email_em":
				          $(".email_s").hide();
			              $(".email_c").hide();
						  $(".lv_tishi").hide();
                          $(".email_f").empty().fadeIn().html('请输入邮箱！');
				   break;


				    case "email_e":
				          $(".email_s").hide();
			              $(".email_c").hide();
						  $(".lv_tishi").hide();
                          $(".email_f").empty().fadeIn().html('Email格式不正确！');
				   break;
				     case "email_e2":
				          $(".email_s").hide();
			              $(".email_c").hide();
						  $(".lv_tishi").hide();
                          $(".email_f").empty().fadeIn().html('你使用的Email已经被另一帐号注册，请使其它帐号！');
				   break;
				   case "pass_l":
				          $(".password_s").hide();
			              $(".password_c").hide();
						  $(".lv_tishi").hide();
                          $(".password_f").empty().fadeIn().html('你的密码过短，不允许注册！');
				   break;
				   
				   case "pass_e":
				    $(".password_s").hide();
			              $(".password_c").hide();
						  $(".lv_tishi").hide();
                          $(".password_f").empty().fadeIn().html('请输入登录密码!');
			
				   break;
				   
				   case "register_success":
				   $(".w_img").addClass("w_img1").removeClass("w_img2");
				       $(".lvtsinfo").html("注册成功正在跳转请稍候!");
				   setTimeout(function(){
				    $(".lv_tishi").hide();
					 if(data.urls=="" || typeof data.urls=="undefined"){
						  location.href="index.php";
					 }else{  
					    location.href=data.urls;
						
					 }
				   },2000);
				
				   break;
				   
				   case "register_fail":
				   
				   	   $(".w_img").removeClass("w_img1").removeClass("w_img2");
				      $(".lvtsinfo").html("注册失败，请检查资料是否有误或与管理员联系!");
				     setTimeout(function(){
				    $(".lv_tishi").hide();
				   },2000);
				
				   break;
				   
				   

                 }

            }
        });

    }

    function initForm() {

        if (StringTrim($(".bnickname").val()).getStringLen() > 2 && StringTrim($(".bnickname").val()).getStringLen() < 16) {
            $(".nick_c").show();
            $(".nick_f").hide();
            $(".nick_s").hide();
        }

    }

    function StringTrim(str) {　　
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

});

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