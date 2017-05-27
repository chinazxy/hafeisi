<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="Generator" content="BOLON v1.0.3" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, width=device-width" />

<title><?php echo $this->_var['page_title']; ?></title>
    		 <link rel="icon" href="favicon.ico" type="image/x-icon"/>
         <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/> 
<link type="text/css" rel="stylesheet" href="themes/default/css/2016/css.css" />
<link type="text/css" rel="stylesheet" href="themes/default/css/2016/auto.css" />
		<link rel="stylesheet" href="js/dist/ladda.min.css">
 <script type="text/javascript" src="js/2016/jquery-1.9.0.min.js"></script>
  <script type="text/javascript" src="js/2016/jquery-easing-1.3.js"></script>
 
	 <script>
 var lang_search='<?php echo $this->_var['lang']['l_search']; ?>';
 <?php $timestame=time();?>
var timestamp='<?php echo $timestame;?>';
var lang_search='<?php echo $this->_var['lang']['l_search']; ?>';
var token='<?php $mdstr=$GLOBALS['_CFG']['md5str'].$timestame; echo md5($mdstr);?>';
 </script>
<script type="text/javascript" src="js/2016/common.js"></script>
<link type="text/css" rel="stylesheet" href="themes/default/mobile/css/css.css" />
<body>
<div class="gpage clearfix">
<?php echo $this->fetch('library/header.lbi'); ?>
<div class="gb clearfix">

<div class="dapa clearfix">
	<div class="daze"></div>
<div class="width padt85">

<div class="zhong">


<div class="f_baobao marb0">
	
	<div class="geren">
		<div class="geren_1">个人中心</div>
		<div class="geren_2"><a href="user.php?act=logout">退出</a></div>
	</div>
	<div class="geren1"><a href="user.php?act=profile">您的账户</a></div>
	<div class="geren1"><a href="user.php?act=order_list">您的订单</a></div>
	<div class="geren1"><a href="user.php?act=collection_list">您的收藏</a></div>
	<div class="geren1"><a href="user.php?act=address_list">您的地址簿</a></div>
	<div class="geren1 botn"><a href="user.php?act=chufang">您的处方信息</a></div>
	
	


</div>


</div>
<div class="yong_hu mat0"><div class="m_zx"><a href="news.php" target="_blank">品&nbsp;牌&nbsp;资&nbsp;讯</a></div></div>
</div>
		
			</div>
				
	</div>	
<?php echo $this->fetch('library/page_footer.lbi'); ?>
    <?php echo $this->fetch('library/page_botter.lbi'); ?>
	</div>

</body>
</html>
