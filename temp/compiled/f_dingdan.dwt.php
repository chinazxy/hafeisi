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
<div class="width mbttom164">

<div class="zhong">
<div class="denglu marginbottom">
<div class="dengludu"><a href="javascript:void(0)">我的订单</a></div>
<div class="dengludf">
<a href="user.php?act=user_person">
<div class="sever"><img src="themes/default/mobile/images/zuo.png" /></div> 返回</a></div>



</div>
	 <?php if ($this->_var['record_count'] > 0): ?>
	 <?php $_from = $this->_var['orders']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'order');if (count($_from)):
    foreach ($_from AS $this->_var['order']):
?>
<div class="f_baobao">
<div class="f_xinhao boldertno">
<div class="f_dix">
<div class="f_a1"><?php echo $this->_var['order']['order_sn']; ?></div>
<div class="f_a2">
 
				<?php if ($this->_var['order']['order_status'] == 0 && $this->_var['order']['shipping_status'] == 0 && $this->_var['order']['pay_status'] == 0): ?>
								<div class="f_a2a">订单未确认</div>&nbsp;&nbsp;<span></span>
                                    
								 <?php endif; ?>
				<?php if ($this->_var['order']['order_status'] == 1 && $this->_var['order']['shipping_status'] == 0 && $this->_var['order']['pay_status'] == 0): ?>
					<div class="f_a2a">等待付款</div>&nbsp;&nbsp;<span></span>
                                     
								 <?php endif; ?>
							<?php if ($this->_var['order']['order_status'] == 2 && $this->_var['order']['shipping_status'] == 0 && $this->_var['order']['pay_status'] == 0): ?>
								<div class="f_a2a">订单已取消</div>&nbsp;&nbsp;<span></span>
                                     
								 <?php endif; ?>
							
										  <?php if ($this->_var['order']['order_status'] == 1 && $this->_var['order']['shipping_status'] == 0 && $this->_var['order']['pay_status'] == 2): ?>
										  	<div class="f_a2a">已付款</div>&nbsp;&nbsp;<span></span>
										
                                     
										 <?php endif; ?>
										 
											  <?php if ($this->_var['order']['order_status'] == 1 && $this->_var['order']['shipping_status'] == 3 && $this->_var['order']['pay_status'] == 2): ?>
											  <div class="f_a2a">配货中</div>&nbsp;&nbsp;<span></span>
										  
                                     
										 <?php endif; ?>
										 
											 	  <?php if ($this->_var['order']['order_status'] == 5 && $this->_var['order']['shipping_status'] == 3 && $this->_var['order']['pay_status'] == 2): ?>
									
                                       <div class="f_a2a">配货中</div>&nbsp;&nbsp;<span></span>
										 <?php endif; ?>
									
										 
										 	 	  <?php if ($this->_var['order']['order_status'] == 5 && $this->_var['order']['shipping_status'] == 1 && $this->_var['order']['pay_status'] == 2): ?>
										
                                     <div class="f_a2a">已发货</div>&nbsp;&nbsp;<span></span>
										 <?php endif; ?>
										 
										 	 	 	  <?php if ($this->_var['order']['order_status'] == 5 && $this->_var['order']['shipping_status'] == 2 && $this->_var['order']['pay_status'] == 2): ?>
										
                                     <div class="f_a2a"> 已收货</div>&nbsp;&nbsp;<span></span>
										 <?php endif; ?>
										 	 	 	  <?php if ($this->_var['order']['order_status'] == 4 && $this->_var['order']['shipping_status'] == 0 && $this->_var['order']['pay_status'] == 0): ?>
										
                                      <div class="f_a2a"> 退货</div>&nbsp;&nbsp;<span></span>
										 <?php endif; ?>	 
 
</div>
</div>
</div>
<div class="f_yjk boldertno">
  <?php $_from = $this->_var['order']['goods_info']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('fs', 'goods');$this->_foreach['items'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['items']['total'] > 0):
    foreach ($_from AS $this->_var['fs'] => $this->_var['goods']):
        $this->_foreach['items']['iteration']++;
?>
					
  <?php if ($this->_var['goods']['extension_code'] == 'dingzhi'): ?>
<div class="f_chaping <?php if (($this->_foreach['items']['iteration'] - 1) == 0): ?> margintop0 <?php endif; ?>">
<div class="f_yjtu "><a href="<?php echo $this->_var['goods']['dingzhi_url']; ?>"><img src="<?php echo $this->_var['goods']['dingzhi_thumb']; ?>" /></a></div>
<div class="f_xinhaok ggy">

<div class="f_th1 fot"><?php echo $this->_var['goods']['goods_name']; ?>  <?php if ($this->_var['goods']['extension_code'] == 'dingzhi'): ?>定制产品<?php else: ?>标准产品<?php endif; ?><span class="carpric">x<?php echo $this->_var['goods']['number']; ?></span></div>

<div class="f_th1">镜框：<?php if ($this->_var['goods']['dingzhi_attr_list_str']['jk'] != ""): ?><?php echo $this->_var['goods']['dingzhi_attr_list_str']['jk']; ?><?php else: ?>无<?php endif; ?></div>
<div class="f_th1">镜片：<?php if ($this->_var['goods']['dingzhi_attr_list_str']['jp'] != ""): ?><?php echo $this->_var['goods']['dingzhi_attr_list_str']['jp']; ?><?php else: ?>无<?php endif; ?></div>
</div>
<div class=" f_float ggy">
<div class="f_th1 let f_textright">X<?php echo $this->_var['goods']['number']; ?></div>
<div class="f_th1 let fot f_textright"><?php echo $this->_var['goods']['goods_total']; ?></div>  
</div>
</div>
  <?php elseif ($this->_var['goods']['extension_code'] != "package_buy"): ?>
  
  <div class="f_chaping <?php if (($this->_foreach['items']['iteration'] - 1) == 0): ?> margintop0 <?php endif; ?>">
  		 <?php $_from = $this->_var['goods']['goodsattr']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'attrs');if (count($_from)):
    foreach ($_from AS $this->_var['attrs']):
?>
<div class="f_yjtu "><a href="goods.php?id=<?php echo $this->_var['goods']['goods_id']; ?>"><img src="<?php echo $this->_var['attrs']['attr_left_thumb']; ?>" /></a></div>
<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
<div class="f_xinhaok ggy">

<div class="f_th1 fot"><?php echo $this->_var['goods']['goods_name']; ?>  <?php if ($this->_var['goods']['extension_code'] == 'dingzhi'): ?>定制产品<?php else: ?>标准产品<?php endif; ?></div>
<?php $_from = $this->_var['goods']['goodsattr']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'attrs');if (count($_from)):
    foreach ($_from AS $this->_var['attrs']):
?>
<div class="f_th1">镜框：<?php if ($this->_var['goods']['frame_des'] != ''): ?><?php echo $this->_var['goods']['frame_des']; ?><?php else: ?>无<?php endif; ?></div>
<div class="f_th1">镜片：<?php if ($this->_var['goods']['glass_des'] != ''): ?><?php echo $this->_var['goods']['glass_des']; ?><?php else: ?>无<?php endif; ?></div>
<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
</div>
<div class=" f_float ggy">
<!--<div class="f_th1 let f_textright">x<?php echo $this->_var['goods']['number']; ?></div>-->
<div class="f_th1  fot f_textright"><?php echo $this->_var['goods']['shop_price']; ?></div>  
</div>
</div>
  
<?php endif; ?>

<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>

</div>
<div class="f_dizik">
<div class="f_dizik_th1"><?php echo $this->_var['order']['consignee']; ?><span class="f_dizik_th1span">电话:<?php echo $this->_var['order']['mobile']; ?></span></div>
<div class="f_dizik_th1"><?php echo $this->_var['order']['province_val']; ?><?php echo $this->_var['order']['city_val']; ?><?php echo $this->_var['order']['district_val']; ?><?php echo $this->_var['order']['address']; ?>,<?php echo $this->_var['order']['zipcode']; ?></div>
<div class="f_dizik_th2">运送方式：<?php if ($this->_var['order']['shipping_name'] == "顺丰快递"): ?>顺丰快递<?php else: ?>EMS快递<?php endif; ?></div>

</div>
<div class="f_dizik bolderbottom">
		 <?php if ($this->_var['order']['formated_shipping_fee'] != ""): ?>
<div class="f_xiaoji">运费：</div>
<div class="f_jiage"><?php echo $this->_var['order']['formated_shipping_fee']; ?></div>
<?php endif; ?>
	 <?php if ($this->_var['order']['bonus'] > 0): ?>
	 <div class="f_xiaoji">优惠券抵扣：</div>
<div class="f_jiage"><?php echo $this->_var['order']['formated_bonus']; ?></div>
	 	<?php endif; ?>
				
<div class="f_xiaoji">总计：</div>
<div class="f_jiage"><?php echo $this->_var['order']['total_fee']; ?></div>

</div>
<?php if ($this->_var['order']['pay_online']): ?>
<div class="dengluan"><?php echo $this->_var['order']['pay_online']; ?></div>
<?php endif; ?>
</div>
 
 <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
	  <?php else: ?>
		 <div class="neirong">
		<div class="miao_log_nei clearfix">
        	<div class="ddw">
            	<div class="ddw_h1"></div>
                <div class="ddw_t">暂无订单</div>
               
            </div>
		</div>
	 </div>
	  
	
	 
	 <?php endif; ?>
	
</div>
<div class="yong_hu"><div class="m_zx"><a href="news.php" target="_blank">品&nbsp;牌&nbsp;资&nbsp;讯</a></div></div>
</div>
	
			</div>
				
	</div>	
	<?php echo $this->fetch('library/page_footer.lbi'); ?>
    <?php echo $this->fetch('library/page_botter.lbi'); ?>
	</div>

</body>
</html>
