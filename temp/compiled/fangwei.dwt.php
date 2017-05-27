<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="Generator" content="BOLON v1.0.3" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>韩菲诗-防伪查询</title>
<link type="text/css" rel="stylesheet" href="themes/default/css/css.css" />

<script src="js/2016/jquery-1.11.1.min.js"></script>
<script src="js/2016/w.js"></script>
<script src="js/2016/fanwei.js"></script>
<meta name="Keywords" content="<?php echo $this->_var['keywords']; ?>" />
<meta name="Description" content="<?php echo $this->_var['description']; ?>" />
  <script>
  var token="<?php echo $this->_var['token']; ?>";
  var timestamp="<?php echo $this->_var['timestamp']; ?>";
  
  </script>
</head>


<body>
<div class="header "> 
  
	<?php echo $this->fetch('library/header.lbi'); ?>
  
  <div class="nei_ye">
 
    <div class="header_center">
	  
	  <div class="fangw">
		<div class="fw-t">
			<div class="fw-t1">防伪查询</div>
			<div class="fw-t2">SECURITY  CHECK</div>
		</div>
		<div class="fw-box">
			<div class="fw-cen">
				<div class="fw-cenb">
					<div class="fw-cenb-1">防伪码：</div>
					<input type="text" value=""  class="fw-cenb-2 fanweima"/>
					<div class="fw-cenb-3">*</div>
				</div>
				<div class="fw-cenb">
					<div class="fw-cenb-1">验证码：</div>
					<input type="text" class="fw-cenb-2 code"/>
					<div class="fw-cenb-3">*</div>
				</div>
				<div class="fw-cenb">
					<div class="fw-cenb-i" id ="Txtidcode"><span id="idcode"><img onclick= this.src="captcha.php?act=captcha&"+Math.random()  src="captcha.php"/></span></div>
					<div class="fw-cenb-x ">请输入防伪验证码后查询</div>
					<div class="fw-cenb-tis errmsg">您输入的验证码有误，请重新输入</div>
					<div class="fw-cenb-b fanbtn">查询
						<div class="f-load"><img src="data/img/loader.gif"/></div>
					</div>
				</div>
			</div>
		</div>
	  </div>
    
     
    </div>
  </div>
  
</div>
<?php echo $this->fetch('library/page_footer.lbi'); ?>
 

<div class="f-bj">
	<div class="f-tisk">
		<div class="f-cha"><img src="data/img/cha.png"/></div>
		<div class="f-tis">防伪码查询正确——即您所购买的产品为韩菲诗的正牌产品，请您放心使用此产品	</div>
	</div>
</div>
 



</body>
</html>
