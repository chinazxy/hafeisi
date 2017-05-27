<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="Generator" content="BOLON v1.0.3" />
    <?php echo $this->fetch('library/page_header.lbi'); ?>
<title><?php echo $this->_var['page_title']; ?></title>
    		 <link rel="icon" href="favicon.ico" type="image/x-icon"/>
         <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/> 
<link type="text/css" rel="stylesheet" href="themes/default/css/css.css" />
<link type="text/css" rel="stylesheet" href="themes/default/css/2016/auto.css" />
 <script type="text/javascript" src="js/2016/jquery-1.9.0.min.js"></script>
  <script type="text/javascript" src="js/2016/jquery-easing-1.3.js"></script>
<script type="text/javascript" src="js/2016/common.js"></script>

</head>
<body>
<div class="gpage clearfix">
<div class="gb clearfix">
<?php echo $this->fetch('library/header.lbi'); ?>

<div class="dapa clearfix">
    <div class="miao_yin">
      <div class="miao_yin_t"></div>
      <div class="yin_san"></div>
    </div>
	<div class="daze"></div>
	<div class="gz_m  clearfix">
			<div class="gz_con w_g w_ylu clearfix">
            <div class="w_fudong ww clearfix">
            
            <div class="f_ww">
            <div class="f_wu">提示信息</div>
            <div class="f_an">安全</div>
            
            
            </div>
            
            <div class="f_mima ww_ff">
       	 <div class="neirong">
		<div class="miao_log_nei clearfix">
        	<div class="ddw juzhong">
            			      <?php if ($this->_var['message']['url_info']): ?>
				     <p><?php echo $this->_var['message']['content']; ?></p> <br/>
          <?php $_from = $this->_var['message']['url_info']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('info', 'url');if (count($_from)):
    foreach ($_from AS $this->_var['info'] => $this->_var['url']):
?>
		  <p class="wfwf"><a href="<?php echo $this->_var['url']; ?>" style="text-decoration: underline;"><?php echo $this->_var['info']; ?></a></p>
		   
          <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
           <?php endif; ?>
            </div>
            
            
            
   
            
            
            
		</div>
	 </div>
            
            </div>
            
            </div>
            
            
            
            
            </div>
            </div>
				

	
	</div>
    </div>  
		   <?php echo $this->fetch('library/page_botter.lbi'); ?> 
</div>
 <?php echo $this->fetch('library/page_footer.lbi'); ?>
</body>
</html>