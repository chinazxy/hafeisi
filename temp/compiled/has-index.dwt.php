<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="Generator" content="BOLON v1.0.3" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" >  
<meta name="Keywords" content="<?php echo $this->_var['keywords']; ?>" />
<meta name="Description" content="<?php echo $this->_var['description']; ?>" />
<title>韩菲诗-首页</title>
<link type="text/css" rel="stylesheet" href="themes/default/mobile/css/css.css" />
<link type="text/css" rel="stylesheet" href="themes/default/mobile/css/swiper.min.css" />
</head>
<script type="text/javascript" src="themes/default/mobile/js/jquery-1.7.2.min.js"></script>

<body>
    <div id="Div1" style="display: none"><img id="Img1" width="100%" src="data/img/share.png" style="position: absolute; top: 0; left: 0;"></div>  
<div class="sy_page">



            	<div class="oB_over">
            	   <div class="oB_l">

                <span class="w_tuca"><img src="themes/default/mobile/img/daohan_cha.svg"/></span>
            	   <h2>入口暂未开放</h2>
            	   </div>
            	</div>

 <?php echo $this->fetch('mobile/library/mobile_header.lbi'); ?>
  <div class="w_zhong">
 

  
  <div class="swiper-container">
    <div class="swiper-wrapper">
    <?php $_from = $this->_var['photolist']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('keys', 'vo');if (count($_from)):
    foreach ($_from AS $this->_var['keys'] => $this->_var['vo']):
?>

     <div class="swiper-slide" style=" background:url(<?php echo $this->_var['vo']['thump_s']; ?>) no-repeat center ; background-size: cover;">
          <div class="wen">
            <h2><?php echo $this->_var['vo']['entitle']; ?></h2>
            <div class="anniu"><a href="<?php echo $this->_var['vo']['url']; ?>"><?php echo $this->_var['vo']['linkname']; ?></a></div>
          </div>
        </div>

		 <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
      
 </div>
    <div class="swiper-pagination">
	
    </div>
  </div>
  <div class="oNth">
        	<span class="oNth2" ><img src="themes/default/mobile/img/tools_bar_0w.png"/></span>
        	<span class="oNth1"><a href="skintest.php"><img  src="themes/default/images/img/oN1.jpg"/></a></span>
        	<span class="oNth1" ><a href="mantest.php"><img src="themes/default/images/img/oN2.jpg"/></a></span>
        	<span class="oNth1 oB_Tc" ><a href="javascript:void(0);"><img src="themes/default/images/img/oN3.jpg"/></a></span>
        	<span class="oNth1 oB_Tc" ><a href="javascript:void(0);"><img src="themes/default/images/img/oN4.jpg"/></a></span>
        	</div>
        	
 
  <div class="zhong"> 
  <?php $_from = $this->_var['category']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('kk', 'v');if (count($_from)):
    foreach ($_from AS $this->_var['kk'] => $this->_var['v']):
?>
  <div class="w_zhu">
  <div class="inde_h">
  <h2><?php echo $this->_var['v']['cat_name']; ?></h2>
  <!-- <span class="w_ca"><img src="themes/default/mobile/img/in_ca.png"/></span>
  <div class="w_inde_p"><?php echo $this->_var['v']['cat_enname']; ?></div> -->
  </div>
  <div class="w_chan">
  <ul>
  <?php $_from = $this->_var['v']['goods']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('k', 'vv');if (count($_from)):
    foreach ($_from AS $this->_var['k'] => $this->_var['vv']):
?>
  <li><a href="goods.php?id=<?php echo $this->_var['vv']['goods_id']; ?>&cat=<?php echo $this->_var['v']['cat_id']; ?>"><div class="w_tuo"><img src="http://img.xingou.net.cn/<?php echo $this->_var['vv']['goodsinfo']['data']['pic']; ?>"/></div>
 <div class="chan_wenzi"><span class="cha_s1"><?php echo $this->_var['vv']['goods_name']; ?></span><span class="cha_s1">￥<?php echo $this->_var['vv']['goodsinfo']['data']['price']; ?> - <?php echo $this->_var['vv']['goodsinfo']['name']; ?></span></div></a></li>
 <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
 </ul>
   
  </div>
  </div>
    
<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
  </div>
</div>

 <?php echo $this->fetch('mobile/library/footer.lbi'); ?>
<script type="text/javascript" src="themes/default/mobile/js/swiper.min.js"></script>
   <script>
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable:true,
		autoplay: 5000,
        autoplayDisableOnInteraction: false, 
    });
	  
    </script>
	
	
<!--<script type="text/javascript" src="themes/default/js/lunbo.js"></script>-->
<script type="text/javascript" src="themes/default/mobile/js/mob.js"></script>
</body>
</html>
