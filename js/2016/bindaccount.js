$(function() {

    var emailstate = false;
    var passwordstate = false;
    var email, uid, mtype,openid,restype;

    $(".binemail").bind("focus",
    function() {
	  
		if($(this).val()=="登录邮箱"){
		$(this).val("");
		}
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
   	if($(this).val()=="密码"){
		$(this).val("");
		}
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

        if (email ==="") {
            $(".email_s").show();
            $(".email_c").hide();
            $(".email_f").hide();
		
            emailstate = true;
            return false;
        } else {

            var _reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if (!_reg.test(email)) {

                $(".email_s").hide();
                $(".email_f").empty().fadeIn().html("邮件输入格试不正确!");
                $(".email_c").hide();
                emailstate = false;

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
            passwordstate = true;
            return false;
        } else if (password.getStringLen() < 6) {

            $(".password_s").hide();
            $(".password_c").hide();
            $(".password_f").empty().fadeIn().html("密码长度小于6个字符!");
            passwordstate = false;
        } else {
            $(".password_f").hide();
            $(".password_s").hide();
            $(".password_c").show();
            passwordstate = true;
            return true;
        }

    }


    $(".setp_pofile_input_submit").click(function() {
     
        submitEditAdress();

    });

    function submitEditAdress() {


        email = $(".binemail").val();
        password = $(".binpassword").val();
		openid=$(".openid").val();
		restype=$(".restype").val();
		if(email=="" || openid==""){
		  alert("非法传值！");
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
           
                email: email,
                password: password,
				token:token,
				timestamp:timestamp,
				openid:openid,
				restype:restype,
				act:"bind_account"

            },
            dataType: "json",
            beforeSend: function(XMLHttpRequest) {
                iseditload = false;
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
				   case "account_err":
				    	   $(".w_img").removeClass("w_img1").removeClass("w_img2");
				      $(".lvtsinfo").html("登录邮箱或密码输入错误!");
				     setTimeout(function(){
				    $(".lv_tishi").hide();
				   },2000);
             
				   break; 
				   case "login_success":
				   	   $(".w_img").addClass("w_img1").removeClass("w_img2");
				       $(".lvtsinfo").html("关联账号绑定成功!");
				     setTimeout(function(){
				    $(".lv_tishi").hide();
					  location.href="index.php";
				   },2000);
	
				   break;
				      case "type_err":
				   	   $(".w_img").addClass("w_img1").removeClass("w_img2");
				       $(".lvtsinfo").html("绑定类型未发现，绑定失败!");
				     setTimeout(function(){
				    $(".lv_tishi").hide();
					  location.href="index.php";
				   },2000);
	
				   break;
				   
				   case "login_fail":
				    $(".w_img").removeClass("w_img1").removeClass("w_img2");
				      $(".lvtsinfo").html("绑定失败，请检查资料是否有误或与管理员联系！");
				     setTimeout(function(){
				    $(".lv_tishi").hide();
				   },2000);
				
				   break;
				      case "update_err":
				    $(".w_img").removeClass("w_img1").removeClass("w_img2");
				      $(".lvtsinfo").html("绑定失败，请检查资料是否有误或与管理员联系！");
				     setTimeout(function(){
				    $(".lv_tishi").hide();
				   },2000);
				
				   break;
				   
				  case "pass_err":
				 		    $(".password_s").hide();
			              $(".password_c").hide();
						  $(".lv_tishi").hide();
                          $(".password_f").empty().fadeIn().html('请输入登录密码!');
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
				   
				     	   	  case "qqopenid_err":
				 	        $(".w_img").removeClass("w_img1").removeClass("w_img2");
				      $(".lvtsinfo").html("QQ关联登录授权失败!");
				     setTimeout(function(){
				    $(".lv_tishi").hide();
					  location.href="index.php";
				   },2000);
				   break;
				   
				        	   	  case "sinaopenid_err":
				 	        $(".w_img").removeClass("w_img1").removeClass("w_img2");
				      $(".lvtsinfo").html("SINA关联登录授权失败!");
				     setTimeout(function(){
				    $(".lv_tishi").hide();
					  location.href="index.php";
				   },2000);
				   break;
				   
				      	   	  case "ver_err":
				 	        $(".w_img").removeClass("w_img1").removeClass("w_img2");
				      $(".lvtsinfo").html("验证失败!");
				     setTimeout(function(){
				    $(".lv_tishi").hide();
					  location.href="index.php";
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
				   

                 }

            }
        });

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