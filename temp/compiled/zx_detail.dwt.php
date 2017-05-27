<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="Generator" content="BOLON v1.0.3" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta content="text/html; charset=iso-8859-1" http-equiv="content-type">
<meta content="webkit" name="renderer">
<meta name="viewport" content=" initial-scale=1.0, minimum-scale = 1, maximum-scale = 1" />
<meta name="Keywords" content="<?php echo $this->_var['keywords']; ?>" />
<meta name="Description" content="<?php echo $this->_var['description']; ?>" />
<title><?php echo $this->_var['zxlist']['title']; ?>-<?php echo $this->_var['page_title']; ?></title>
    		 <link rel="icon" href="favicon.ico" type="image/x-icon"/>
         <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/> 
<link type="text/css" rel="stylesheet" href="themes/default/css/2016/css.css" />
<link type="text/css" rel="stylesheet" href="themes/default/css/2016/auto.css" />
<script type="text/javascript" src="js/2016/jquery-1.9.0.min.js"></script>
<link type="text/css" rel="stylesheet" href="themes/default/css/css.css" />
   <script type="text/javascript">
var lang_search='<?php echo $this->_var['lang']['l_search']; ?>';
<?php $timestame=time();?>
var timestamp='<?php echo $timestame;?>';
var lang_search='<?php echo $this->_var['lang']['l_search']; ?>';
var token='<?php $mdstr=$GLOBALS['_CFG']['md5str'].$timestame; echo md5($mdstr);?>';
</script>
<script type="text/javascript" src="js/2016/jquery-easing-1.3.js"></script>
<script type="text/javascript" src="js/2016/jquery-picture-min.js"></script>



</head>
<body>
<div class="gpage clearfix">
<div class="gb clearfix">
	<?php echo $this->fetch('library/header.lbi'); ?>

<div class="dapa clearfix">
	<div class="daze"></div>
	<div class="gz_m mar clearfix">
			<div class="gz_con clearfix">
				<div class="gp_box">
					<div class="gz_de"><img src="<?php echo $this->_var['article']['bg']; ?>"/><div class="gzx"><?php echo $this->_var['article']['cat_enname']; ?></div></div>
					<div class="gz_dw">
						<h1><?php echo $this->_var['zxlist']['title']; ?></h1>
							<div class="gz_dw1">
							<img src="<?php echo $this->_var['zxlist']['index_plot']; ?>"/>
							<p><span><?php echo $this->_var['looks']; ?> |  HAFEISI</span><br/></p>
							<div><?php echo $this->_var['zxlist']['encontent']; ?></div>
						</div>
						<div class="gz_dw2 clearfix">
							
							<div class="gz_dt clearfix">
								<div class="gz_dt1">
									<div class="gz_d1">News</div>
									<div class="gz_d2">
									<?php $_from = $this->_var['conference']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'vo');if (count($_from)):
    foreach ($_from AS $this->_var['vo']):
?>
										<div class="gz_d3"><a  href="zx_detail.php?id=<?php echo $this->_var['vo']['article_id']; ?>"><span class="sj"><img src="themes/default/images/sj.png"/></span><?php echo $this->_var['vo']['title']; ?></a></div>
									<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>																			
									</div>
								</div>
							</div>
						</div>
					</div>
				
				
				
				</div>
			</div>
			
	</div>
		<?php echo $this->fetch('library/page_footer.lbi'); ?>
	</div>
</div>

</div>
<script type="text/javascript" src="js/2016/w.js"></script>
<script type="text/javascript" src="js/2016/newsdetail.js"></script>
</body>
</html>