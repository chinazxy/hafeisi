<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="Generator" content="BOLON v1.0.3" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" >  
<meta name="Keywords" content="<?php echo $this->_var['keywords']; ?>" />
<meta name="Description" content="<?php echo $this->_var['description']; ?>" />
<title>韩菲诗-防伪查询</title>
<link type="text/css" rel="stylesheet" href="themes/default/mobile/css/css.css" />
<link rel="stylesheet" media="screen and (max-width: 320px)" href="themes/default/mobile/css/auto.css" />
<script type="text/javascript" src="themes/default/mobile/js/jquery-1.7.2.min.js"></script>
<script src="js/2016/fanwei.js"></script>
<script>
  var token="<?php echo $this->_var['token']; ?>";
  var timestamp="<?php echo $this->_var['timestamp']; ?>";
  
  </script>
</head>

<body>

<div class="w_erweit"><span class="w_erweima"><img src="themes/default/mobile/img/er_wma.png"/></span><span class="w_tuca"><img src="themes/default/mobile/img/cha.png"/></span></div>

  <?php echo $this->fetch('mobile/library/mobile_header.lbi'); ?>
<div class="tan">
<div class="po_w"></div>
</div>
<div class="f-bj">
  <div class="f-tisk">
    <div class="f-cha"><img src="themes/default/mobile/img/cha.png"/></div>
    <div class="f-tis">防伪码查询正确——即您所购买的产品为韩菲诗的正牌产品，请您放心使用此产品 </div>
  </div>
</div>
<div class="sy_page">
<div class="han"><span class="logo"><img src="themes/default/mobile/img/logo.png"/></span></div>
<div class="zhong">
<div class="daoh">
<div class="th1">防伪查询</div>
<div class="th2">security check</div>
</div>
<div class="bao">
<div class="q1"><div class="w_z">防伪码：</div><input class="input fw-cenb-2 fanweima" type="text" name="" value=""/><span>*</span></div>
<div class="q1"><div class="w_z">验证码：</div><input class="input fw-cenb-2 code" type="text" name="" value=""/><span>*</span></div>
<div class="q1 margin-bottom"><div class="w_z"></div><div class="mama" id="idcode"><img onclick= this.src="captcha.php?act=captcha&"+Math.random()  src="captcha.php"/></div></div>
<div class="q1 mar"><div class="w_z"></div><div class="w_ff">请输入防伪验证码后查询</div></div>
<div class="fw-cenb-tis errmsg">您输入的验证码有误，请重新输入</div>
<div class="fw-cenb-b fanbtn">查询<div class="f-load"><img src="data/img/loader.gif"/></div>
          </div>

</div>

</div>
 <?php echo $this->fetch('mobile/library/footer.lbi'); ?>

</div>
<script type="text/javascript" src="themes/default/mobile/js/mob.js"></script>
</body>
</html>
