<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="Generator" content="BOLON v1.0.3" />

<meta name="Keywords" content="<?php echo $this->_var['keywords']; ?>" />
<meta name="Description" content="<?php echo $this->_var['description']; ?>" />
    <?php echo $this->fetch('library/page_header.lbi'); ?>
<title><?php echo $this->_var['page_title']; ?></title>

<link rel="stylesheet" type="text/css" href="themes/default/css/css.css" />

 <?php echo $this->smarty_insert_scripts(array('files'=>'jquery-1.9.0.min.js,jquery.easing.1.3.js,bl_common.js')); ?> 


<style type="text/css"> 

.footer_up{display:none;}
</style> 

</head>

<body>
<?php echo $this->fetch('library/header.lbi'); ?>


<div class="cont_box clearfix">
<div class="content clearfix">
	<div class="login-box-wrap">
	<div class="login-title no_marb"><?php echo $this->_var['pcatinfo']['cat_enname']; ?></div>
	<div class="register_til1"><?php echo $this->_var['pcatinfo']['cat_name']; ?></div>
	<div class="register_wrap">
	
	<div class="register_box mar_bot80">
	<div class="box">
	<div class="h1 h1_sty"><?php echo $this->_var['matas']['title']; ?></div>

	</div>
    
    <div class="vip_box clearfix">
    
  <?php echo $this->_var['matas']['description']; ?>
    </div>
	</div>
	
	</div>

	</div>	
    

    
    
     
</div>
</div>
    <?php echo $this->fetch('library/page_footer.lbi'); ?>

</body>
</html>
