<?php
    if (!defined('THINK_PATH')) exit();
    $config = require './config.php';
    $array = array(
        //是否开启验证码 1代表启验证码，0关闭验证码
		'VERITY_STATE'=>0,
    	'USER_AUTH_KEY'=>'taihe',
		"USER_MODEL"=>false,
		"EMAIL_CEALLBACK"=>"http://localhost/easy/index.php/Register/RegisterMailCheck/",
		
		"EMAIL_CHECK_SUCESS"=>"http://localhost/easy/index.php/Register/EmailCheckSucess/",
    );
    
    return array_merge($config, $array);
?>