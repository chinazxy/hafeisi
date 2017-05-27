<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="Generator" content="BOLON v1.0.3" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, width=device-width" />
<meta name="Keywords" content="<?php echo $this->_var['keywords']; ?>" />
<meta name="Description" content="<?php echo $this->_var['description']; ?>" />
<title><?php echo $this->_var['page_title']; ?></title>

<link type="text/css" rel="stylesheet" href="themes/default/css/2016/css.css" />
<link type="text/css" rel="stylesheet" href="themes/default/css/2016/auto.css" />
<link type="text/css" rel="stylesheet" href="themes/default/mobile/css/css.css" />
		<link rel="stylesheet" href="js/dist/ladda.min.css">
 <script>
 var lang_search='<?php echo $this->_var['lang']['l_search']; ?>';
 <?php $timestame=time();?>
var timestamp='<?php echo $timestame;?>';
var lang_search='<?php echo $this->_var['lang']['l_search']; ?>';
var token='<?php $mdstr=$GLOBALS['_CFG']['md5str'].$timestame; echo md5($mdstr);?>';
 </script>
 <?php echo $this->smarty_insert_scripts(array('files'=>'jquery-1.9.0.min.js,jquery.easing.1.3.js,2016/common.js,dist/spin.min.js,dist/ladda.min.js,dist/ladda.jquery.min.js,bl_mb_login.js')); ?> 
 
</head>

<body>
<div class="gpage clearfix"> <?php echo $this->fetch('library/header.lbi'); ?>
 <div class="gb clearfix">

 <div class="dapa clearfix">
	<div class="daze"></div>
<div class="width padt85">

<div class="zhong">
<div class="denglu">
<div class="dengludu"><a href="javascript:void(0)">用户登录</a></div>
<div class="dengludf">
<div class="sever" onclick="history.back(-1);"><img src="themes/default/mobile/images/zuo.png" /></div> 返回</div>



</div>
<div class="zh_dengl">账户登录</div>
<div class="deng_dac dengoff" >
<input class="dianzi bl_email" value="" type="text" name="" placeholder="电子邮箱" />
<input class="dianzi bl_password" value="" type="password" name="" placeholder="密码" />

<div class="wanji"><a href="user.php?act=get_password">忘记您的密码？</a></div>
<div class="msgmiao_login"></div>
 
<input type="hidden" name="back_act" class="back_act" value="<?php echo $this->_var['back_act']; ?>" />

<button class="dengluan marginbottom15 ladda-button bl_login_ajax_submit" data-style="expand-left" data-color="#000">
<span class="ladda-label">登录</span>
<span class="ladda-spinner"></span>
</button>
</div>
<div class="zh_zhuc"><a href="user.php?act=register">创建账户</a></div> 

<div class="disan">
第三方登陆

</div>
<div class="wqbao">
<div class="weibo"><a href="sinaLogin/redirect_to_login.php"><img src="themes/default/mobile/images/weibo.png"/></a></div>
<div class="qq"><a href="qqLogin/redirect_to_login.php"><img src="themes/default/mobile/images/qq.png"/></a></div>
</div>
<!--<div class="chanjian"><a href="user.php?act=register">创建账户</a></div>
<div class="zhuche">注册BOLON账户以便追踪您的订单，管理收货地址，获取更多个性化信息。</div>-->

</div>




</div>

</div>

</div><?php echo $this->fetch('library/page_footer.lbi'); ?>
<?php echo $this->fetch('library/page_botter.lbi'); ?>
</div>



</body>
</html>
