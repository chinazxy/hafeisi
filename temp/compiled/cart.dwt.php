<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
<meta name="Generator" content="BOLON v1.0.3" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="<?php echo $this->_var['keywords']; ?>" />
<meta name="Description" content="<?php echo $this->_var['description']; ?>" />
<title><?php echo $this->_var['page_title']; ?></title>
<link rel="stylesheet" type="text/css" href="themes/default/css/2016/css.css" />
<link rel="stylesheet" type="text/css" href="themes/default/css/2016/auto.css" />
<link rel="stylesheet" type="text/css" href="themes/default/mobile/css/css.css" />
		<link rel="stylesheet" href="js/dist/ladda.min.css" />
<?php echo $this->fetch('library/page_header.lbi'); ?>
	 <script>
 var lang_search='<?php echo $this->_var['lang']['l_search']; ?>';
 
  <?php $timestame=time();?>
var timestamp='<?php echo $timestame;?>';
var token='<?php $mdstr=$GLOBALS['_CFG']['md5str'].$timestame; echo md5($mdstr);?>';
 </script>
 <?php echo $this->smarty_insert_scripts(array('files'=>'minified/plugins/CSSPlugin.min.js,minified/TweenMax.min.js,jquery.easing.1.3.js')); ?>
   <?php echo $this->smarty_insert_scripts(array('files'=>'jquery-1.9.0.min.js')); ?> 
  <?php echo $this->smarty_insert_scripts(array('files'=>'dist/spin.min.js,dist/ladda.min.js,dist/ladda.jquery.min.js')); ?> 
 <?php echo $this->smarty_insert_scripts(array('files'=>'2016/common.js')); ?>
<body>
<div class="gpage clearfix">
<div class="gb clearfix">
<?php echo $this->fetch('library/header.lbi'); ?>

<div class="dapa clearfix">
<div class="daze"></div>
   <?php if ($this->_var['step'] == "cart"): ?>
   <?php echo $this->smarty_insert_scripts(array('files'=>'mb_cart.js')); ?>
<div class="width padt85">

<div class="zhong">
<div class="denglu marginbottom">
<div class="dengludu"><a href="javascript:void(0)">购物车</a></div>
<div class="dengludf">
<div class="sever"><img src="themes/default/mobile/images/zuo.png" /></div> 返回</div>



</div>
   <?php if ($this->_var['cart_goods_count'] > 0): ?>
   <?php $_from = $this->_var['goods_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'goods');$this->_foreach['keys'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['keys']['total'] > 0):
    foreach ($_from AS $this->_var['goods']):
        $this->_foreach['keys']['iteration']++;
?>
    <?php if ($this->_var['goods']['extension_code'] == "dingzhi"): ?>
<div class="f_baobao marginbottom">


<div class="f_yjk boldertno padding26 fyjkc">
<div class="cmbloadding">

</div>
<div class="mbloadding">
 <div  id="dbutton1" recid="<?php echo $this->_var['goods']['rec_id']; ?>"  class="dengluan delbtns del_sure_btn ladda-button"  data-style="expand-left" data-color="#000">
<span class="ladda-label">确定</span>
<span class="ladda-spinner"></span>
</div>

 <div  id="dbutton2"  class="dengluan delbtns del_cancel_btn ladda-button"  data-style="expand-left" data-color="#000">
<span class="ladda-label">取消</span>
<span class="ladda-spinner"></span>
</div>
 
</div>
<div class="f_chaping margintop0 marginbottom30 ">
<div class="f_yjtu "><a href="<?php echo $this->_var['goods']['dingzhi_url']; ?>"><img src="<?php echo $this->_var['goods']['dingzhi_thumb']; ?>" /></a></div>
<div class="f_xinhaok">
<div class="f_th1 mart mar f_margin_top"><?php echo $this->_var['goods']['goods_name']; ?>  定制产品</div>

<div class="f_th1">镜框：<?php if ($this->_var['goods']['dingzhi_attr_list_str']['jk'] != ""): ?><?php echo $this->_var['goods']['dingzhi_attr_list_str']['jk']; ?><?php else: ?>无<?php endif; ?></div>
<div class="f_th1">镜片：<?php if ($this->_var['goods']['dingzhi_attr_list_str']['jp'] != ""): ?><?php echo $this->_var['goods']['dingzhi_attr_list_str']['jp']; ?><?php else: ?>无<?php endif; ?></div>
				


     
</div>
<div class=" f_float f_margin_top">
<div class="caca top0" onclick="drop_goods(<?php echo $this->_var['goods']['rec_id']; ?>,this);"></div>



     
</div>



</div>
<div class="g_xia">
<input class="rec_id" type="hidden" value="<?php echo $this->_var['goods']['rec_id']; ?>">
<div class="gu_sli"><span class="span_xian"></span>
<div class="ssj"></div>
<div class="ssj2"></div>
<select class="g_sul test12 product_num" name="product_num">

                      <option <?php if ($this->_var['goods']['goods_number'] == 1): ?> selected <?php endif; ?> value="1">1</option>
					        <option <?php if ($this->_var['goods']['goods_number'] == 2): ?> selected <?php endif; ?> value="2">2</option>
							      <option <?php if ($this->_var['goods']['goods_number'] == 3): ?> selected <?php endif; ?> value="3">3</option>
								        <option <?php if ($this->_var['goods']['goods_number'] == 4): ?> selected <?php endif; ?> value="4">4</option>
										      <option <?php if ($this->_var['goods']['goods_number'] == 5): ?> selected <?php endif; ?> value="5">5</option>
					                          </select></div>

<div class="g_jiagege"><?php echo $this->_var['goods']['formart_subtotal']; ?></div>
</div>
</div>
</div>
 <?php else: ?>
 <div class="f_baobao marginbottom">


<div class="f_yjk boldertno padding26 fyjkc">
<div class="cmbloadding">

</div>
<div class="mbloadding">
 <div  id="dbutton1" recid="<?php echo $this->_var['goods']['rec_id']; ?>"  class="dengluan delbtns del_sure_btn ladda-button"  data-style="expand-left" data-color="#000">
<span class="ladda-label">确定</span>
<span class="ladda-spinner"></span>
</div>

 <div  id="dbutton2"  class="dengluan delbtns del_cancel_btn ladda-button"  data-style="expand-left" data-color="#000">
<span class="ladda-label">取消</span>
<span class="ladda-spinner"></span>
</div>
 
</div>
<div class="f_chaping margintop0 marginbottom30 ">
<div class="f_yjtu "><a href="goods.php?id=<?php echo $this->_var['goods']['goods_id']; ?>"><img src="<?php echo $this->_var['goods']['attr_left_thumb']; ?>" /></a></div>
<div class="f_xinhaok">
<div class="f_th1 mart mar f_margin_top"><?php echo $this->_var['goods']['goods_name']; ?>  标准产品</div>

<?php $_from = $this->_var['goods']['goodsattr']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'attrs');if (count($_from)):
    foreach ($_from AS $this->_var['attrs']):
?>
<div class="f_th1">镜框：<?php if ($this->_var['attrs']['frame_des'] != ''): ?><?php echo $this->_var['goods']['frame_des']; ?><?php else: ?>无<?php endif; ?></div>
<div class="f_th1">镜片：<?php if ($this->_var['attrs']['glass_des'] != ''): ?><?php echo $this->_var['goods']['glass_des']; ?><?php else: ?>无<?php endif; ?></div>
<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
   
</div>
<div class=" f_float f_margin_top">
<div class="caca top0" onclick="drop_goods(<?php echo $this->_var['goods']['rec_id']; ?>,this);"></div>



     
</div>



</div>
 

<div class="g_xia">
<input class="rec_id" type="hidden" value="<?php echo $this->_var['goods']['rec_id']; ?>">
<div class="gu_sli"><span class="span_xian"></span>
<div class="ssj"></div>
<div class="ssj2"></div>
<select class="g_sul test12 product_num" name="product_num">

                      <option <?php if ($this->_var['goods']['goods_number'] == 1): ?> selected <?php endif; ?> value="1">1</option>
					        <option <?php if ($this->_var['goods']['goods_number'] == 2): ?> selected <?php endif; ?> value="2">2</option>
							      <option <?php if ($this->_var['goods']['goods_number'] == 3): ?> selected <?php endif; ?> value="3">3</option>
								        <option <?php if ($this->_var['goods']['goods_number'] == 4): ?> selected <?php endif; ?> value="4">4</option>
										      <option <?php if ($this->_var['goods']['goods_number'] == 5): ?> selected <?php endif; ?> value="5">5</option>
					                          </select></div>

<div class="g_jiagege"><?php echo $this->_var['goods']['formart_subtotal']; ?></div>
</div>
</div>
</div>
 
 <?php endif; ?>
 <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
 
											  <div class="f_dizik bolderbottom bordertop">
											  
											    <div class="f_xiaoji">总计：</div>
											     <div class="f_jiage g_color totalmoney"><?php echo $this->_var['paymoney']; ?></div>
											  
											  
											  
											  
											  
											  
											  </div>

<div class="dengluan marginbottom40"><a href="flow.php?step=checkout">结账</a></div>
  <div class="ddw" style="display:none;">
      
                <div class="ddw_t">您购物车中没有商品</div>
               
            </div>
<?php else: ?>

  <div class="ddw">
      
                <div class="ddw_t">您购物车中没有商品</div>
               
            </div>
<?php endif; ?>
</div>
<div class="yong_hu"><div class="m_zx"><a href="news.php" target="_blank">品&nbsp;牌&nbsp;资&nbsp;讯</a></div></div>

</div>

<?php endif; ?>


<?php if ($this->_var['step'] == "checkout"): ?>

  <?php echo $this->smarty_insert_scripts(array('files'=>'region.js,shopping_flow.js,other.js,mb_check_order.js')); ?>
   <script type="text/javascript">
              region.isAdmin = false;
			  
	</script>
  <script type="text/javascript">
  <?php $_from = $this->_var['lang']['password_js']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'item');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['item']):
?>
    var <?php echo $this->_var['key']; ?> = "<?php echo $this->_var['item']; ?>";
  <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>

  </script>
 <div class="width mbttom164">
  <form action="flow.php" method="post" name="theForm" id="theForm" onsubmit="return checkOrderForm(this)">
<div class="zhong">
<div class="denglu marginbottom">
<div class="dengludu"><a href="javascript:void(0)">购物车</a></div>
<div class="dengludf">
<div class="sever"><img src="themes/default/mobile/images/zuo.png" /></div> 返回</div>



</div>
<div class="denglu marginbottom g_height">

<div class="g_wu psteps pstep_1"><a href="javascript:void(0)">1.订单</a></div>
<div class="g_you "></div>
<div class="g_wu sever psteps pstep_2"><a href="javascript:void(0)">2.送货地</a></div>
<div class="g_you sever"></div>
<div class="g_wu sever psteps pstep_3"><a href="javascript:void(0)">3.付款</a></div>


</div>

<div class="orderlist pstep_c">
  <?php $_from = $this->_var['goods_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'vo');$this->_foreach['vc'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['vc']['total'] > 0):
    foreach ($_from AS $this->_var['vo']):
        $this->_foreach['vc']['iteration']++;
?>
      <?php if ($this->_var['vo']['extension_code'] == "dingzhi"): ?>
 
<div class="f_baobao marginbottom">


<div class="f_yjk boldertno padding26">
<div class="cmbloadding">

</div>
<div class="mbloadding">
 <div  id="dbutton1" recid="<?php echo $this->_var['vo']['rec_id']; ?>"  class="dengluan delbtns del_sure_btn ladda-button"  data-style="expand-left" data-color="#000">
<span class="ladda-label">确定</span>
<span class="ladda-spinner"></span>
</div>

 <div  id="dbutton2"  class="dengluan delbtns del_cancel_btn ladda-button"  data-style="expand-left" data-color="#000">
<span class="ladda-label">取消</span>
<span class="ladda-spinner"></span>
</div>
 
</div>
<div class="f_chaping margintop0 marginbottom30 ">
<div class="f_yjtu "><a href="<?php echo $this->_var['vo']['dingzhi_url']; ?>"><img  src="<?php echo $this->_var['vo']['dingzhi_thumb']; ?>" /></a></div>
<div class="f_xinhaok">
<div class="f_th1 mart mar f_margin_top"><?php echo $this->_var['vo']['goods_name']; ?>  定制产品 </div>

<div class="f_th1">镜框：<?php if ($this->_var['vo']['dingzhi_attr_list_str']['jk'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['jk']; ?><?php else: ?>无<?php endif; ?></div>
<div class="f_th1">镜片：<?php if ($this->_var['vo']['dingzhi_attr_list_str']['jp'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['jp']; ?><?php else: ?>无<?php endif; ?></div>

</div>
<div class=" f_float f_margin_top">
<div class="caca top0"  onclick="drop_goods(<?php echo $this->_var['vo']['rec_id']; ?>,this);"></div>
</div>



</div>
<div class="g_xia">
<input class="rec_id" type="hidden" value="<?php echo $this->_var['vo']['rec_id']; ?>">
<div class="gu_sli"><span class="span_xian"></span>
<div class="ssj"></div>
<div class="ssj2"></div>
<select class="g_sul test12 product_num" name="product_num">

                      <option <?php if ($this->_var['vo']['goods_number'] == 1): ?> selected <?php endif; ?> value="1">1</option>
					        <option <?php if ($this->_var['vo']['goods_number'] == 2): ?> selected <?php endif; ?> value="2">2</option>
							      <option <?php if ($this->_var['vo']['goods_number'] == 3): ?> selected <?php endif; ?> value="3">3</option>
								        <option <?php if ($this->_var['vo']['goods_number'] == 4): ?> selected <?php endif; ?> value="4">4</option>
										      <option <?php if ($this->_var['vo']['goods_number'] == 5): ?> selected <?php endif; ?> value="5">5</option>
					                          </select></div>

<div class="g_jiagege"><?php echo $this->_var['vo']['formated_subtotal']; ?></div>
</div></div></div>

	<?php else: ?>
	
	<div class="f_baobao marginbottom">


<div class="f_yjk boldertno padding26">
<div class="cmbloadding">

</div>
<div class="mbloadding">
 <div  id="dbutton1" recid="<?php echo $this->_var['vo']['rec_id']; ?>"  class="dengluan delbtns del_sure_btn ladda-button"  data-style="expand-left" data-color="#000">
<span class="ladda-label">确定</span>
<span class="ladda-spinner"></span>
</div>

 <div  id="dbutton2"  class="dengluan delbtns del_cancel_btn ladda-button"  data-style="expand-left" data-color="#000">
<span class="ladda-label">取消</span>
<span class="ladda-spinner"></span>
</div>
 
</div>
<div class="f_chaping margintop0 marginbottom30 ">
<div class="f_yjtu "><?php $_from = $this->_var['vo']['goodsattr']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'attrs');if (count($_from)):
    foreach ($_from AS $this->_var['attrs']):
?><a href="goods.php?id=<?php echo $this->_var['vo']['goods_id']; ?>"><img  src="<?php echo $this->_var['attrs']['attr_left_thumb']; ?>" /></a><?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?></div>
<div class="f_xinhaok">
<div class="f_th1 mart mar f_margin_top"><?php echo $this->_var['vo']['goods_name']; ?>  标准产品</div>
  <?php $_from = $this->_var['vo']['goodsattr']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'attrs');if (count($_from)):
    foreach ($_from AS $this->_var['attrs']):
?>
			 <div class="f_th1">镜框：   <?php if ($this->_var['attrs']['frame_des'] != ''): ?>
			 <?php echo $this->_var['vo']['frame_des']; ?>
			   <?php else: ?>无
			   <?php endif; ?></div>
			   <div class="f_th1">镜片：  <?php if ($this->_var['attrs']['glass_des'] != ''): ?>
			  <?php echo $this->_var['vo']['glass_des']; ?>
			   <?php else: ?>无
			   <?php endif; ?></div>
 <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
 


     
</div>
<div class=" f_float f_margin_top">
<div class="caca top0" onclick="drop_goods(<?php echo $this->_var['vo']['rec_id']; ?>,this);"></div>



     
</div>



</div>
<div class="g_xia">
<input class="rec_id" type="hidden" value="<?php echo $this->_var['vo']['rec_id']; ?>">
<div class="gu_sli"><span class="span_xian"></span>
<div class="ssj"></div>
<div class="ssj2"></div>
<select class="g_sul test12 product_num" name="product_num">

                      <option <?php if ($this->_var['vo']['goods_number'] == 1): ?> selected <?php endif; ?> value="1">1</option>
					        <option <?php if ($this->_var['vo']['goods_number'] == 2): ?> selected <?php endif; ?> value="2">2</option>
							      <option <?php if ($this->_var['vo']['goods_number'] == 3): ?> selected <?php endif; ?> value="3">3</option>
								        <option <?php if ($this->_var['vo']['goods_number'] == 4): ?> selected <?php endif; ?> value="4">4</option>
										      <option <?php if ($this->_var['vo']['goods_number'] == 5): ?> selected <?php endif; ?> value="5">5</option>
					                          </select></div>

<div class="g_jiagege"><?php echo $this->_var['vo']['formated_subtotal']; ?></div>
</div></div></div>
	
	<?php endif; ?>
 <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
   <div class="ddw" style="display:none;">
      
                <div class="ddw_t">您购物车中没有商品</div>
               
            </div>
<div class="point shpping_point">
 配送方式 (<span id="shtype_s"></span>)
	<span class="addjt"></span> </div>
	<div class="yinchan sppin yonf" >
 	      <?php echo $this->_var['shippinghtml']; ?>
	
	</div>
	 
											  <div class="f_dizik bolderbottom bordertop">
											  
											    <div class="f_xiaoji">总计：</div>
											     <div class="f_jiage g_color totalmoney"><?php echo $this->_var['total']['formated_goods_price']; ?></div>
											  
											  
											  
											  
											  
											  
											  </div>

											  
	 <div  id="button1"  class="dengluan marginbottom40 ladda-button zhuchebtn contiune_address"  data-style="expand-left" data-color="#000">
<span class="ladda-label">下一步</span>
<span class="ladda-spinner"></span>
</div>
 

</div>




<div class="addresslist pstep_c" style="display:none;">

<div class="g_shoujian">
收件人地址
</div>
<?php if ($this->_var['count'] > 0): ?>
<div class="yinchan " style="height:auto;">


				 <?php $_from = $this->_var['consignee_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'consignee');$this->_foreach['name'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['name']['total'] > 0):
    foreach ($_from AS $this->_var['key'] => $this->_var['consignee']):
        $this->_foreach['name']['iteration']++;
?>
	<?php if ($this->_var['consignee']['address_id'] == $this->_var['deconsignee']['address_id']): ?>
		<div class="heig4 paddi_color tesd cadres miaoaoff">
		<div class="ssj top7"></div>
      <div class="addselect"><?php echo htmlspecialchars($this->_var['consignee']['consignee']); ?><?php echo $this->_var['consignee']['province_name']; ?><?php echo $this->_var['consignee']['city_name']; ?><?php echo $this->_var['consignee']['district_name']; ?><?php echo $this->_var['consignee']['address']; ?></div>
	</div>
	
	
	
	  <div class="miao_xl clearfix " style="display:none;">
	   		 <?php $_from = $this->_var['consignee_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'consignee');$this->_foreach['name'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['name']['total'] > 0):
    foreach ($_from AS $this->_var['key'] => $this->_var['consignee']):
        $this->_foreach['name']['iteration']++;
?>
 
       <div class="addlis" style="height:auto;">
   

		<div class="shippingbao textd paddi_color">
	 <!--<span <?php if ($this->_var['consignee']['address_id'] == $this->_var['deconsignee']['address_id']): ?> class="select" <?php endif; ?> ></span>	-->
	<input style="display:none;" type="radio" <?php if ($this->_var['consignee']['address_id'] == $this->_var['deconsignee']['address_id']): ?> checked="checked" <?php endif; ?> name="spaddress" class="addinput marginbottom" value="<?php echo $this->_var['consignee']['address_id']; ?>" />
	<div class="adrhtm"><?php echo htmlspecialchars($this->_var['consignee']['consignee']); ?><?php echo $this->_var['consignee']['province_name']; ?><?php echo $this->_var['consignee']['city_name']; ?><?php echo $this->_var['consignee']['district_name']; ?><?php echo $this->_var['consignee']['address']; ?></div>
	</div>
    

 
   </div>	 
   <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
</div>
	<?php endif; ?>
   <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
   
   <!-- <div class="addedit">修改发货地址</div>-->

   				
 
     </div>
	 				
 	<div class="address_contains">
							
		  </div>
	 
   <?php else: ?>
   
             <a href="JavaScript:void(0);" class=" morendizhi address_em_c">  
					<div class="miao_add1_2" style="height:50px;line-height:50px;font-size:14px;" >
					
					<div class="address_emp" >您还没添加收货地址!</div>
				
                </div></a>
				
 	<div class="address_contains">
							
		  </div>
<?php endif; ?> 


 
<div class="g_shoujian">
发票


</div>
<select id="ECS_NEEDINV" class="dianzi wid100 marginbottom fapiao_raidos"  name="fapiao_raidos">
                      <option value="0">Bolon 电子收据 </option>
					<option value="1" class="radio fapiao_raidos">Bolon 标准发票 －（个人，公司）</option>
					                          </select>
			  <div class="mbyong_ying mbfapiao_catain" style="height:auto;">
			   <div class="left2_1" ><div>发票抬头：</div>
			   <div>此字段不得留空；</div>
   <div> 您可以在“个人”字段中填写您的姓名或所在部门的名称。</div></div>
	
	<div class="fp_contain">
 
			
				<div class="right_2 fp_info">
			
		     </div>
	    </div>
	      
			  </div>
<div class="f_baobao marginbottom">




	<div class="addressmsg "></div>	
		 <div  id="prevbutton "  class="dengluan  ladda-button margintop20 wid prevbutton "  data-style="expand-left" data-color="#000">

<span class="ladda-label">上一步</span>
<span class="ladda-spinner"></span>
</div>	
	 <div  id="button2"  class="dengluan ladda-button margintop20 marginbottom20 wid1 check_two"  data-style="expand-left" data-color="#000">

<span class="ladda-label">下一步</span>
<span class="ladda-spinner"></span>
</div>	
 
</div>

</div>





	 <div class="fukuan clear pstep_c" >
			
<div class="g_shoujian g_color">
支付方式


</div>
<div class="z_ying marginbottom23">

 <div class="wszf_2">

			 
 </div>

</div>
<div class="border_bottom_top bortn">
<div class="point youhpoint padt30  youhuioff">
优惠券
	<span class="addjt"></span> </div>
	<div  class="youhuiinpt ">
	

	
	 <input type="text" name="bonus_sn" class="input5 inputBg" value="促销代码">
	 <div name="validate_bonus" onclick="validateMbBonusResponse(document.forms['theForm'].elements['bonus_sn'].value)" class="jiesuan_box_left1_1 bnt_blue_1">
	 <div class="youshiyong"><a href="javaScript:void(0);">使用</a>
	 </div>
	
	</div></div>
	
	
<div class="line"></div>	
<div class="f_dizik bolderbottom">
	 <?php echo $this->fetch('library/order_total.lbi'); ?>
</div>


<div class="buymsg"></div>
 <input type="hidden" name="step" value="done" />
 
 	 <div  id="button3"  class="dengluan marginbottom40  ladda-button  pay_type"  data-style="expand-left" data-color="#000">
<span class="ladda-label">立即购买</span>
<span class="ladda-spinner"></span>
</div>	
 


</div></div>
<div id="shtype_s" class="shtype_s"></div>
<div id="shpping_feed" class="shpping_feed"></div>


</div>
</form>
<div class="yong_hu"><div class="m_zx"><a href="news.php" target="_blank">品&nbsp;牌&nbsp;资&nbsp;讯</a></div></div>
</div>
 
 
 
 <?php endif; ?>
 
 
 	   <?php if ($this->_var['step'] == "done" || $this->_var['step'] == "ok"): ?>
		  
		  <div class="width mbttom164">

<div class="zhong">
<div class="denglu marginbottom">
<div class="dengludu"><a href="javascript:void(0)">我的订单</a></div>
<div class="dengludf">
<a href="user.php?act=order_list">
<div class="sever"><img src="themes/default/mobile/images/zuo.png" /></div> 返回</a></div>



</div>
<div class="denglu marginbottom g_height">

<div class="g_wu"><a href="javascript:void(0)">1.订单</a></div>
<div class="g_you"></div>
<div class="g_wu"><a href="javascript:void(0)">2.送货地</a></div>
<div class="g_you"></div>
<div class="g_wu"><a href="javascript:void(0)">3.付款</a></div>


</div>
<div class="f_baobao">


<div class="f_yjk boldertno">
  <?php $_from = $this->_var['goods_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('keys', 'vo');if (count($_from)):
    foreach ($_from AS $this->_var['keys'] => $this->_var['vo']):
?>
		   <?php if ($this->_var['vo']['extension_code'] == 'dingzhi'): ?>
<div class="f_chaping <?php if ($this->_var['keys'] == 0): ?> margintop0 <?php endif; ?> ">
<div class="f_yjtu "><a href="<?php echo $this->_var['vo']['dingzhi_url']; ?>"><img src="<?php echo $this->_var['vo']['dingzhi_thumb']; ?>" /></a></div>
<div class="f_xinhaok ggy">
<div class="f_th1 mart mar fot f_margin_top"><?php echo $this->_var['vo']['goods_name']; ?>  定制产品 <span class="carpric">x<?php echo $this->_var['vo']['goods_number']; ?></span></div>
<div class="f_th1">镜框：<?php if ($this->_var['vo']['dingzhi_attr_list_str']['jk'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['jk']; ?><?php else: ?>无<?php endif; ?></div>
<div class="f_th1">镜片：<?php if ($this->_var['vo']['dingzhi_attr_list_str']['jp'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['jp']; ?><?php else: ?>无<?php endif; ?></div>


     
</div>
<div class=" f_float ggy">
<!--<div class="f_th1 f_margin_top f_textright">x<?php echo $this->_var['vo']['goods_number']; ?></div>-->
<div class="f_th1 fot f_textright">￥<?php echo $this->_var['vo']['goods_price']; ?></div>
</div>
</div>
<?php else: ?>

<div class="f_chaping <?php if ($this->_var['keys'] == 0): ?> margintop0 <?php endif; ?> ">

<div class="f_yjtu "><?php $_from = $this->_var['vo']['goodsattr']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'vc');if (count($_from)):
    foreach ($_from AS $this->_var['vc']):
?><a href="goods.php?id=<?php echo $this->_var['vo']['goods_id']; ?>"><img src="<?php echo $this->_var['vc']['attr_left_thumb']; ?>" /></a><?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?></div>

<div class="f_xinhaok ggy">
<div class="f_th1 mart mar fot f_margin_top"><?php echo $this->_var['vo']['goods_name']; ?>   标准产品<span class="carpric">x<?php echo $this->_var['vo']['goods_number']; ?></span></div>
<?php $_from = $this->_var['vo']['goodsattr']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'attrs');if (count($_from)):
    foreach ($_from AS $this->_var['attrs']):
?>
<div class="f_th1">镜框：<?php if ($this->_var['attrs']['frame_des'] != ''): ?><?php echo $this->_var['attrs']['frame_des']; ?><?php else: ?>无<?php endif; ?></div>
<div class="f_th1">镜片：<?php if ($this->_var['attrs']['glass_des'] != ''): ?><?php echo $this->_var['attrs']['glass_des']; ?><?php else: ?>无<?php endif; ?></div>
<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>


     
</div>
<div class=" f_float ggy">
<!--<div class="f_th1 let f_margin_top mart0 f_textright">x<?php echo $this->_var['vo']['goods_number']; ?></div>-->
<div class="f_th1  fot f_textright">￥<?php echo $this->_var['vo']['shop_price']; ?></div>
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
		 <?php if ($this->_var['total']['shipping_fee_formated'] != ""): ?>
<div class="f_xiaoji">运费：</div>
<div class="f_jiage"><?php echo $this->_var['total']['shipping_fee_formated']; ?></div>
<?php endif; ?>
	 <?php if ($this->_var['total']['bonus'] > 0): ?>
	 <div class="f_xiaoji">优惠券抵扣：</div>
<div class="f_jiage">-<?php echo $this->_var['total']['bonus_formated']; ?></div>
	 	<?php endif; ?>
				
<div class="f_xiaoji">总计：</div>
<div class="f_jiage"><?php echo $this->_var['total']['formated_goods_price']; ?></div>

</div>
 <?php if ($this->_var['pay_online']): ?>
<div class="dengluan"> <?php echo $this->_var['pay_online']; ?></div>
<?php endif; ?>
<div class="f_women margintop33">1.我们将在验货完毕后处理您的订单，并且依照订单发货后，将会已电子邮件的方式通知您。</div>
<div class="f_women"> 2.在收货时，收货人须向快递员提供买方或订单中列明的接受方式的身份证明，或者发货通知邮件。</div>


</div>


</div>
<div class="yong_hu"><div class="m_zx"><a href="news.php" target="_blank">品&nbsp;牌&nbsp;资&nbsp;讯</a></div></div>
</div>

		  
		  
		  <?php endif; ?>

	
			</div>
				<?php echo $this->fetch('library/page_footer.lbi'); ?>	
	</div>	

    <?php echo $this->fetch('library/page_botter.lbi'); ?>
	</div>
	
	
	

</body>
</html>
