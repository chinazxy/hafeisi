<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="Generator" content="BOLON v1.0.3" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" >  
<meta name="Keywords" content="<?php echo $this->_var['keywords']; ?>" />
	<meta name="Description" content="<?php echo $this->_var['description']; ?>" />
<title>韩菲诗-新闻页</title>
<link type="text/css" rel="stylesheet" href="themes/default/mobile/css/css.css" />

<link rel="stylesheet" media="screen and (max-width: 320px)" href="themes/default/mobile/css/auto.css" />

</head>
<script type="text/javascript" src="themes/default/mobile/js/jquery-1.7.2.min.js"></script>

<body>
<div class="sy_page">

<?php echo $this->fetch('mobile/library/mobile_header.lbi'); ?>
    <div class="z_index">
  <div class="position_fiexd">
  <img src="themes/default/mobile/img/xw.jpg"/>
    <div class="gz_w">
			<div class="gz_line"></div>
			<div class="gz_t">新闻</div>
			<div class="gz_t1">News</div>
		</div>
  </div>
  <span class="visibility"><img class="visibility" src="themes/default/mobile/img/xw.jpg"/></span>
  </div> 
    
   
  <div class="w_zhong padding_back">
<?php $_from = $this->_var['zxlist']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('k', 'vo');if (count($_from)):
    foreach ($_from AS $this->_var['k'] => $this->_var['vo']):
?>
  <div class="zhong"> 

<div class="gz_box4">
	<div class="w_cptu"><a href="<?php if ($this->_var['vo']['author_email'] == ''): ?>zx_detail.php?id=<?php echo $this->_var['vo']['article_id']; ?> <?php else: ?> <?php echo $this->_var['vo']['author_email']; ?> <?php endif; ?>"><img src="<?php echo $this->_var['vo']['file_url']; ?>"></a></div>
	<div class="gz_bt">
	<a href="zx_detail.php?id=<?php echo $this->_var['vo']['article_id']; ?>">
		<div class="gz_bt1"><?php echo $this->_var['vo']['addtime']; ?>.<?php echo $this->_var['vo']['month']; ?></div>
	<div class="gz_bt2"><?php echo $this->_var['vo']['title']; ?></div>
							</a>
						</div>
					
  
  </div>
</div>
<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>

 <?php echo $this->fetch('mobile/library/mobile_footer.lbi'); ?>
	 </div>

	

<script type="text/javascript" src="themes/default/mobile/js/mob.js"></script>
</body>
</html>
