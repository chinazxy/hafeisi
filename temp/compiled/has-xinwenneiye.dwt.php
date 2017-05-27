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

<div class="w_erweit"><span class="w_erweima"><img src="themes/default/mobile/img/er_wma.png"/></span><span class="w_tuca"><img src="themes/default/mobile/img/cha.png"/></span></div>

   <?php echo $this->fetch('mobile/library/mobile_header.lbi'); ?>
  <div class="w_zhong padding_back">



 
  <div class="zhong"> 
    <div class="w_cptu">

  <img src="themes/default/mobile/img/xw.jpg"/>

  </div> 
<div class="gz_dw">
	<h1><?php echo $this->_var['zxlist']['title']; ?></h1>
		<div class="gz_dw1">
	<img src="<?php echo $this->_var['zxlist']['index_plot']; ?>"/>
	<p><span><?php echo $this->_var['looks']; ?> |  HAFEISI</span><br></p>
<div class="color_zi"><?php echo $this->_var['zxlist']['encontent']; ?></div>
						</div>
						<div class="gz_dw2 clearfix" style="width: 100%; position: relative; top: 0px;">
							
							<div class="gz_dt clearfix">
								<div class="gz_dt1">
									<div class="gz_d1">News</div>
									<div class="gz_d2">
                  <?php $_from = $this->_var['conference']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'vo');if (count($_from)):
    foreach ($_from AS $this->_var['vo']):
?>
			             <div class="gz_d3"><a href="zx_detail.php?id=<?php echo $this->_var['vo']['article_id']; ?>"><span class="sj"><img src="themes/default/mobile/img/sj.png"></span><?php echo $this->_var['vo']['title']; ?></a></div>
                  <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>  
																												
									</div>
								</div>
							</div>
						</div>
					</div>
  
</div>

  
  </div>
  
 <?php echo $this->fetch('mobile/library/footer.lbi'); ?>
</div>



	

	

<script type="text/javascript" src="themes/default/mobile/js/mob.js"></script>
</body>
</html>
