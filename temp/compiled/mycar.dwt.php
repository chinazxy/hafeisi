<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
<meta name="Generator" content="BOLON v1.0.3" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="<?php echo $this->_var['keywords']; ?>" />
<meta name="Description" content="<?php echo $this->_var['description']; ?>" />
<title><?php echo $this->_var['page_title']; ?></title>
<link rel="stylesheet" type="text/css" href="themes/default/css/css.css" />
<link rel="stylesheet" type="text/css" href="themes/default/css/2016/auto.css" />
<link rel="stylesheet" type="text/css" href="themes/default/css/personal.css" />
<?php echo $this->fetch('library/page_header.lbi'); ?>
	 <script>
 var lang_search='<?php echo $this->_var['lang']['l_search']; ?>';
 </script>
 <?php echo $this->smarty_insert_scripts(array('files'=>'minified/plugins/CSSPlugin.min.js,minified/TweenMax.min.js,jquery.easing.1.3.js')); ?>
   <?php echo $this->smarty_insert_scripts(array('files'=>'jquery-1.9.0.min.js')); ?> 
 <?php echo $this->smarty_insert_scripts(array('files'=>'2016/common.js')); ?>
</head>

<body>
 
    
<div class="gpage clearfix">
<div class="gb clearfix">
<?php echo $this->fetch('library/header.lbi'); ?>

<div class="dapa clearfix">
<div class="daze"></div>
   <div class="gz_contain">
  <?php if ($this->_var['step'] == "cart"): ?>
   <?php echo $this->smarty_insert_scripts(array('files'=>'cart.js')); ?>
	
    <div class="w_top">
	  <div class="cont_personal_box w_por clearfix">
     <div class="title">您的购物车 
	 <div class="car_box_title"> 
	 <?php $_from = $this->_var['shanglanmu']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'shang');$this->_foreach['lanmu'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['lanmu']['total'] > 0):
    foreach ($_from AS $this->_var['shang']):
        $this->_foreach['lanmu']['iteration']++;
?>
	 

	 <div class="car_box_title1" <?php if (($this->_foreach['lanmu']['iteration'] - 1) == 0): ?>style="border-left:0px;"<?php endif; ?>><a target="_blank" href="<?php echo $this->_var['shang']['author_email']; ?>"><?php echo $this->_var['shang']['title']; ?></a></div> 

	 <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
	 </div>
	 </div>
	 <div class="jiezhang" style="margin-top:35px;">
   <?php if ($this->_var['cart_goods_count'] > 0): ?>
   <?php $_from = $this->_var['goods_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'goods');$this->_foreach['keys'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['keys']['total'] > 0):
    foreach ($_from AS $this->_var['goods']):
        $this->_foreach['keys']['iteration']++;
?>
    <?php if ($this->_var['goods']['extension_code'] == "dingzhi"): ?>
	
	       <ul class="car_box border clearfix" <?php if (($this->_foreach['keys']['iteration'] - 1) > 0): ?> style="border-top:0px;" <?php endif; ?>>
			 <li class="li_1"><a href="<?php echo $this->_var['goods']['dingzhi_url']; ?>"><img src="<?php echo $this->_var['goods']['dingzhi_thumb']; ?>" /></a></li>
			 <li class="li_2">
                <div class="biaoti1"><a href="<?php echo $this->_var['goods']['dingzhi_url']; ?>"><?php echo $this->_var['goods']['goods_name']; ?> </a></div> <div class="car_box_del"><a href="javascript:if (confirm('您确实要把该商品移出购物车吗？')) location.href='flow.php?step=drop_goods&id=<?php echo $this->_var['goods']['rec_id']; ?>'; ">从购物车中删除</a></div>
             </li> 
			
			 <li class="li_3">定制产品</li>
			
			
			 <li class="li_4"><?php echo $this->_var['goods']['goods_price']; ?></li>
			 <li class="li_5"> <input type="text" value="<?php echo $this->_var['goods']['goods_number']; ?>" class="number product_num" >  <input class="rec_id" type="hidden" value="<?php echo $this->_var['goods']['rec_id']; ?>"> 幅 </li>
			 <li class="li_6 totalprice"><?php echo $this->_var['goods']['formart_subtotal']; ?> </li>
				 <li class="car_box2">
				<div class="car_box3">
					<span>镜框</span><br/>

					<?php if ($this->_var['goods']['dingzhi_attr_list_str']['jk'] != ""): ?>镜框：<?php echo $this->_var['goods']['dingzhi_attr_list_str']['jk']; ?><?php endif; ?>
					<?php if ($this->_var['goods']['dingzhi_attr_list_str']['jp'] != ""): ?>镜片：<?php echo $this->_var['goods']['dingzhi_attr_list_str']['jp_cat_name']; ?> <?php echo $this->_var['goods']['dingzhi_attr_list_str']['jp']; ?>&nbsp;&nbsp;<?php endif; ?>
					<?php if ($this->_var['goods']['dingzhi_attr_list_str']['wj'] != ""): ?>五金：<?php echo $this->_var['goods']['dingzhi_attr_list_str']['wj']; ?>&nbsp;&nbsp;<?php endif; ?>
					<?php if ($this->_var['goods']['dingzhi_attr_list_str']['qk'] != ""): ?>饰布：<?php echo $this->_var['goods']['dingzhi_attr_list_str']['qk']; ?>&nbsp;&nbsp;<?php endif; ?>
					<?php if ($this->_var['goods']['dingzhi_attr_list_str']['sj'] != ""): ?>饰件：<?php echo $this->_var['goods']['dingzhi_attr_list_str']['sj']; ?>&nbsp;&nbsp;<?php endif; ?>
					镜腿：<?php if ($this->_var['goods']['dingzhi_attr_list_str']['jt'] != ""): ?><?php echo $this->_var['goods']['dingzhi_attr_list_str']['jt']; ?><?php else: ?>无<?php endif; ?>
					<?php if ($this->_var['goods']['dingzhi_attr_list_str']['jtt'] != ""): ?>脚套：<?php echo $this->_var['goods']['dingzhi_attr_list_str']['jtt']; ?>&nbsp;&nbsp;<?php endif; ?>
					镌刻：<?php if ($this->_var['goods']['dingzhi_attr_list_str']['type_w_text'] != "" || $this->_var['goods']['dingzhi_attr_list_str']['type_n_text'] != ""): ?> <?php if ($this->_var['goods']['dingzhi_attr_list_str']['type_w_text'] != ""): ?>镜腿外侧<?php if ($this->_var['goods']['dingzhi_attr_list_str']['type_w'] == 0): ?>左边<?php endif; ?> <?php if ($this->_var['goods']['dingzhi_attr_list_str']['type_w'] == 1): ?>右边<?php endif; ?><?php if ($this->_var['goods']['dingzhi_attr_list_str']['type_w'] == 2): ?>两边<?php endif; ?> 镌刻内容：<?php echo $this->_var['goods']['dingzhi_attr_list_str']['type_w_text']; ?><?php endif; ?> <?php if ($this->_var['goods']['dingzhi_attr_list_str']['type_n_text'] != ""): ?>镜腿内侧<?php if ($this->_var['goods']['dingzhi_attr_list_str']['type_n'] == 0): ?>左边<?php endif; ?> <?php if ($this->_var['goods']['dingzhi_attr_list_str']['type_n'] == 1): ?>右边<?php endif; ?><?php if ($this->_var['goods']['dingzhi_attr_list_str']['type_n'] == 2): ?>两边<?php endif; ?> 镌刻内容：<?php echo $this->_var['goods']['dingzhi_attr_list_str']['type_n_text']; ?><?php endif; ?> <?php else: ?> 无 <?php endif; ?> 
					镜盒系列：<?php if ($this->_var['goods']['dingzhi_attr_list_str']['jh'] != ""): ?><?php echo $this->_var['goods']['dingzhi_attr_list_str']['jh']; ?> <?php else: ?> 默认 <?php endif; ?>&nbsp;镜盒材质：<?php if ($this->_var['goods']['dingzhi_attr_list_str']['cz'] != ""): ?><?php echo $this->_var['goods']['dingzhi_attr_list_str']['cz']; ?> <?php else: ?> 默认 <?php endif; ?>&nbsp;
					镜盒镌刻：线1 <?php if ($this->_var['goods']['dingzhi_attr_list_str']['jh_line_one'] != ""): ?><?php echo $this->_var['goods']['dingzhi_attr_list_str']['jh_line_one']; ?><?php else: ?>无<?php endif; ?>&nbsp;线2 <?php if ($this->_var['goods']['dingzhi_attr_list_str']['jh_line_two'] != ""): ?><?php echo $this->_var['goods']['dingzhi_attr_list_str']['jh_line_two']; ?><?php else: ?>无<?php endif; ?>
					
				</div>
				<?php if ($this->_var['goods']['dingzhi_attr_list_str']['jp_type'] == 1): ?>	
				<div class="car_box3">
					<span>处方信息</span><br/>
                    左眼：<?php if ($this->_var['goods']['dingzhi_attr_list_str']['l_eye_s'] != ""): ?><?php echo $this->_var['goods']['dingzhi_attr_list_str']['l_eye_s']; ?><?php else: ?>无<?php endif; ?>/s <?php if ($this->_var['goods']['dingzhi_attr_list_str']['l_eye_c'] != ""): ?><?php echo $this->_var['goods']['dingzhi_attr_list_str']['l_eye_c']; ?><?php else: ?>无<?php endif; ?>/c <?php if ($this->_var['goods']['dingzhi_attr_list_str']['l_eye_a'] != ""): ?><?php echo $this->_var['goods']['dingzhi_attr_list_str']['l_eye_a']; ?><?php else: ?>无<?php endif; ?>/A <?php if ($this->_var['goods']['dingzhi_attr_list_str']['l_eye_t'] != ""): ?><?php echo $this->_var['goods']['dingzhi_attr_list_str']['l_eye_t']; ?><?php else: ?>无<?php endif; ?>/MPD&nbsp;
					右眼：<?php if ($this->_var['goods']['dingzhi_attr_list_str']['r_eye_s'] != ""): ?><?php echo $this->_var['goods']['dingzhi_attr_list_str']['r_eye_s']; ?><?php else: ?>无<?php endif; ?>/s <?php if ($this->_var['goods']['dingzhi_attr_list_str']['r_eye_c'] != ""): ?><?php echo $this->_var['goods']['dingzhi_attr_list_str']['r_eye_c']; ?><?php else: ?>无<?php endif; ?>/c <?php if ($this->_var['goods']['dingzhi_attr_list_str']['r_eye_a'] != ""): ?><?php echo $this->_var['goods']['dingzhi_attr_list_str']['r_eye_a']; ?><?php else: ?>无<?php endif; ?>/A <?php if ($this->_var['goods']['dingzhi_attr_list_str']['r_eye_t'] != ""): ?><?php echo $this->_var['goods']['dingzhi_attr_list_str']['r_eye_t']; ?><?php else: ?>无<?php endif; ?>/MPD&nbsp;
					瞳距：<?php if ($this->_var['goods']['dingzhi_attr_list_str']['pd_eye_t'] != ""): ?><?php echo $this->_var['goods']['dingzhi_attr_list_str']['pd_eye_t']; ?><?php else: ?>无<?php endif; ?>/FD
				</div>
				<?php endif; ?>
			 </li>
			 </ul>
	
	    <?php else: ?>
			 <ul class="car_box border clearfix" <?php if (($this->_foreach['keys']['iteration'] - 1) > 0): ?> style="border-top:0px;" <?php endif; ?>>
			 <li class="li_1"><a href="goods.php?id=<?php echo $this->_var['goods']['goods_id']; ?>"><img src="<?php echo $this->_var['goods']['attr_thumb']; ?>" /></a></li>
			 <li class="li_2">
                <div class="biaoti1"><a href="goods.php?id=<?php echo $this->_var['goods']['goods_id']; ?>"><?php echo $this->_var['goods']['goods_sn']; ?> / <?php echo $this->_var['goods']['goods_name']; ?> </a></div> <div class="car_box_del"><a href="javascript:if (confirm('您确实要把该商品移出购物车吗？')) location.href='flow.php?step=drop_goods&id=<?php echo $this->_var['goods']['rec_id']; ?>'; ">从购物车中删除</a></div>
             </li> 
			 <?php $_from = $this->_var['goods']['goodsattr']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'attrs');if (count($_from)):
    foreach ($_from AS $this->_var['attrs']):
?>
			 <li class="li_3"><?php echo $this->_var['attrs']['name']; ?>：<?php echo $this->_var['attrs']['attr_value']; ?></li>
			 <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
			
			 <li class="li_4"><?php echo $this->_var['goods']['goods_price']; ?></li>
			 <li class="li_5"> <input type="text" value="<?php echo $this->_var['goods']['goods_number']; ?>" class="number product_num" >  <input class="rec_id" type="hidden" value="<?php echo $this->_var['goods']['rec_id']; ?>"> 幅 </li>
			 <li class="li_6 totalprice"><?php echo $this->_var['goods']['formart_subtotal']; ?> </li>
			 
			 </ul>
		<?php endif; ?>	 
		 <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>	 
			 
			<div class="jiesuan_box">
			 
			    <div class="jiesuan_box_left">
				   <!-- <div class="car_box_left1">
					     <input type="text" class="input5"><div class="jiesuan_box_left1_1"><a href="#">使用</a></div>
					</div>
				    <div class="car_box_left2"> BL2511 / 圆形复古太阳镜     J01 黑色
			 预计发货时间：有现货
			 交付方式：通过顺风速递 运送至 福建 厦门 思明区</div>-->
				    
					<div class="car_box_right3">
                        <div class="car_box_anniu3"><a href="index.php">继续购物</a></div>
			       </div>
				   
				   <div class="car_box_right3">
                                       <div class="car_box_anniu4"><a href="javaScript:void(0);" onclick="javascript:window.open('tencent://message/?uin=2355930317&Site=qq&Menu=yes'+document.location, '_blank', 'height=544, width=644,toolbar=no,scrollbars=no,menubar=no,status=no');">询问在线客服</a></div>
			       </div>
					
					
				    </div>
			    <div class="jiesuan_box_right"style="margin-right:10px;">
				  <div class="jiesuan_box_right1">
				      <div class="jiesuan_box_right1_1">合计</div>
				      <div class="jiesuan_box_right1_2 heji"><?php echo $this->_var['totalprice']; ?></div>
				   </div>
				   <div class="jiesuan_box_right1">
				      <div class="jiesuan_box_right1_1">运费</div>
				      <div class="jiesuan_box_right1_2 jsmoney">¥0.00</div>
				   
				   </div>
				  <!-- <div class="jiesuan_box_right1">
				   <div class="jiesuan_box_right1_1">优惠劵抵扣</div>
				      <div class="jiesuan_box_right1_2 red">¥50.00</div>
				   
				   </div>-->
				   <div class="jiesuan_box_right2">
				   <div class="jiesuan_box_right2_1">总计</div>
				      <div class="jiesuan_box_right2_2 totalmoney"><?php echo $this->_var['paymoney']; ?></div>
				   
				   </div>
				   
				   <div class="jiesuan_box_right3">
                        <div class="car_box_anniu5"><a href="flow.php?step=checkout">结账</a></div>
			       </div>
				   
				</div>
				
				
			 </div>
			
			
			
	
	
  
   
  <?php else: ?>
  <div class="ddw">
      
                <div class="ddw_t">您购物车中没有商品</div>
                <div class="ddw_b"><a href="index.php">继续购物</a></div>
            </div>
  
  <?php endif; ?> </div>
     </div>
  </div>
	<?php endif; ?>
	

	

	  
	  <?php if ($this->_var['step'] == "checkout"): ?>

  <?php echo $this->smarty_insert_scripts(array('files'=>'region.js,shopping_flow.js,check_order.js')); ?>
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
  
   <div class="w_top">
   <div class="g_qnm clearfix">
	  <div class="cont_personal_box g_qnm1 clearfix">

     <div class="title1"><h1>1.BESTELLUNG</h1><span></span><h1>2.PERSÖNLICHE ANGABEN</h1><span></span><h1>3.ZAHLUNG</h1></div>
	  	       <form action="flow.php" method="post" name="theForm" id="theForm" onsubmit="return checkOrderForm(this)">
	<div class="g_nqmh">IHR MODE & ACCESSOIRES WARENKORB</div>
	 <div class="jiezhang">
			 <div class="jiezhang_title dis_none"> 
			 <div class="shuzi"></div>
			 交付产品
			 </div>
			 <div class="g_xh clearfix">
  <?php $_from = $this->_var['goods_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'vo');$this->_foreach['vc'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['vc']['total'] > 0):
    foreach ($_from AS $this->_var['vo']):
        $this->_foreach['vc']['iteration']++;
?>
      <?php if ($this->_var['vo']['extension_code'] == "dingzhi"): ?>
 
	  
				 <ul class="cp_box  <?php if (($this->_foreach['vc']['iteration'] - 1) == 0): ?>b_none border <?php endif; ?>">
			 <li class="li_1"><a href="<?php echo $this->_var['vo']['dingzhi_url']; ?>"><img  src="<?php echo $this->_var['vo']['dingzhi_thumb']; ?>" /></a></li>
			 <li class="li_2">
			 <div class="biaoti"><?php echo $this->_var['vo']['goods_name']; ?> <?php $_from = $this->_var['vo']['goodsattr']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'attrs');if (count($_from)):
    foreach ($_from AS $this->_var['attrs']):
?><?php echo $this->_var['attrs']['name']; ?> <?php echo $this->_var['attrs']['attr_value']; ?><?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?></div>
			 	<div class="car_box3">
					<span>镜框</span><br/>

					镜框：<?php if ($this->_var['vo']['dingzhi_attr_list_str']['jk'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['jk']; ?><?php else: ?>无<?php endif; ?>&nbsp;&nbsp;
					镜片：<?php if ($this->_var['vo']['dingzhi_attr_list_str']['jp'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['jp_cat_name']; ?> <?php echo $this->_var['vo']['dingzhi_attr_list_str']['jp']; ?><?php else: ?>无<?php endif; ?>&nbsp;&nbsp;
					<?php if ($this->_var['vo']['dingzhi_attr_list_str']['wj'] != ""): ?>五金：<?php echo $this->_var['vo']['dingzhi_attr_list_str']['wj']; ?>&nbsp;&nbsp;<?php endif; ?>
					<?php if ($this->_var['vo']['dingzhi_attr_list_str']['qk'] != ""): ?>饰布：<?php echo $this->_var['vo']['dingzhi_attr_list_str']['qk']; ?>&nbsp;&nbsp;<?php endif; ?>
					<?php if ($this->_var['vo']['dingzhi_attr_list_str']['sj'] != ""): ?>饰件：<?php echo $this->_var['vo']['dingzhi_attr_list_str']['sj']; ?>&nbsp;&nbsp;<?php endif; ?>
					镜腿：<?php if ($this->_var['vo']['dingzhi_attr_list_str']['jt'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['jt']; ?><?php else: ?>无<?php endif; ?>
					<?php if ($this->_var['vo']['dingzhi_attr_list_str']['jtt'] != ""): ?>脚套：<?php echo $this->_var['vo']['dingzhi_attr_list_str']['jtt']; ?>&nbsp;&nbsp;<?php endif; ?>
					镌刻：<?php if ($this->_var['vo']['dingzhi_attr_list_str']['type_w_text'] != "" || $this->_var['vo']['dingzhi_attr_list_str']['type_n_text'] != ""): ?> <?php if ($this->_var['vo']['dingzhi_attr_list_str']['type_w_text'] != ""): ?>镜腿外侧<?php if ($this->_var['vo']['dingzhi_attr_list_str']['type_w'] == 0): ?>左边<?php endif; ?> <?php if ($this->_var['vo']['dingzhi_attr_list_str']['type_w'] == 1): ?>右边<?php endif; ?><?php if ($this->_var['vo']['dingzhi_attr_list_str']['type_w'] == 2): ?>两边<?php endif; ?> 镌刻内容：<?php echo $this->_var['vo']['dingzhi_attr_list_str']['type_w_text']; ?><?php endif; ?> <?php if ($this->_var['vo']['dingzhi_attr_list_str']['type_n_text'] != ""): ?>镜腿内侧<?php if ($this->_var['vo']['dingzhi_attr_list_str']['type_n'] == 0): ?>左边<?php endif; ?> <?php if ($this->_var['vo']['dingzhi_attr_list_str']['type_n'] == 1): ?>右边<?php endif; ?><?php if ($this->_var['vo']['dingzhi_attr_list_str']['type_n'] == 2): ?>两边<?php endif; ?> 镌刻内容：<?php echo $this->_var['vo']['dingzhi_attr_list_str']['type_n_text']; ?><?php endif; ?> <?php else: ?> 无 <?php endif; ?>&nbsp;镜盒系列：<?php if ($this->_var['vo']['dingzhi_attr_list_str']['jh'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['jh']; ?> <?php else: ?> 默认 <?php endif; ?>&nbsp;
					镜盒材质：<?php if ($this->_var['vo']['dingzhi_attr_list_str']['cz'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['cz']; ?> <?php else: ?> 默认 <?php endif; ?>&nbsp;
					镜盒镌刻：线1 <?php if ($this->_var['vo']['dingzhi_attr_list_str']['jh_line_one'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['jh_line_one']; ?><?php else: ?>无<?php endif; ?>&nbsp;线2 <?php if ($this->_var['vo']['dingzhi_attr_list_str']['jh_line_two'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['jh_line_two']; ?><?php else: ?>无<?php endif; ?>
				</div>
				<?php if ($this->_var['vo']['dingzhi_attr_list_str']['jp_type'] == 1): ?>	
				<div class="car_box3">
					<span>处方信息</span><br/>
                    左眼：<?php if ($this->_var['vo']['dingzhi_attr_list_str']['l_eye_s'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['l_eye_s']; ?><?php else: ?>无<?php endif; ?>/s <?php if ($this->_var['vo']['dingzhi_attr_list_str']['l_eye_c'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['l_eye_c']; ?><?php else: ?>无<?php endif; ?>/c <?php if ($this->_var['goods']['dingzhi_attr_list_str']['l_eye_a'] != ""): ?><?php echo $this->_var['goods']['dingzhi_attr_list_str']['l_eye_a']; ?><?php else: ?>无<?php endif; ?>/A <?php if ($this->_var['goods']['dingzhi_attr_list_str']['l_eye_t'] != ""): ?><?php echo $this->_var['goods']['dingzhi_attr_list_str']['l_eye_t']; ?><?php else: ?>无<?php endif; ?>/MPD&nbsp;
					右眼：<?php if ($this->_var['vo']['dingzhi_attr_list_str']['r_eye_s'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['r_eye_s']; ?><?php else: ?>无<?php endif; ?>/s <?php if ($this->_var['vo']['dingzhi_attr_list_str']['r_eye_c'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['r_eye_c']; ?><?php else: ?>无<?php endif; ?>/c <?php if ($this->_var['goods']['dingzhi_attr_list_str']['r_eye_a'] != ""): ?><?php echo $this->_var['goods']['dingzhi_attr_list_str']['r_eye_a']; ?><?php else: ?>无<?php endif; ?>/A <?php if ($this->_var['goods']['dingzhi_attr_list_str']['r_eye_t'] != ""): ?><?php echo $this->_var['goods']['dingzhi_attr_list_str']['r_eye_t']; ?><?php else: ?>无<?php endif; ?>/MPD&nbsp;
					瞳距：<?php if ($this->_var['vo']['dingzhi_attr_list_str']['pd_eye_t'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['pd_eye_t']; ?><?php else: ?>无<?php endif; ?>/FD
				</div>
				<?php endif; ?>
	
   
   </li>
			 <li class="li_3"> <?php echo $this->_var['vo']['goods_number']; ?>  幅</li>
			 <li class="li_4"><?php echo $this->_var['vo']['formated_subtotal']; ?></li>
			 <li class="li_5"><img src="themes/default/images/g_ca.png"/></li>
			 </ul>
		<?php else: ?>
					 <ul class="cp_box <?php if (($this->_foreach['vc']['iteration'] - 1) == 0): ?> border <?php endif; ?>">
			 <li class="li_1"><?php $_from = $this->_var['vo']['goodsattr']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'attrs');if (count($_from)):
    foreach ($_from AS $this->_var['attrs']):
?><a href="goods.php?id=<?php echo $this->_var['vo']['goods_id']; ?>"><img  src="<?php echo $this->_var['attrs']['attr_thumb']; ?>" /></a><?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?></li>
			 <li class="li_2">
			 <div class="biaoti"><?php echo $this->_var['vo']['goods_sn']; ?> / <?php echo $this->_var['vo']['goods_name']; ?>     	<?php $_from = $this->_var['vo']['goodsattr']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'attrs');if (count($_from)):
    foreach ($_from AS $this->_var['attrs']):
?><?php echo $this->_var['attrs']['name']; ?> <?php echo $this->_var['attrs']['attr_value']; ?><?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?></div>
<div class="biaoti2">预计交货时间：有现货</div>
<div class="biaoti2">交付方式：三个工作日 通过顺风速递 <div class="ys_add"><?php if ($this->_var['is_default_address'] == 1): ?> 运送至 <?php echo $this->_var['consignee']['province_name']; ?>  <?php echo $this->_var['consignee']['city_name']; ?> <?php echo $this->_var['consignee']['district_name']; ?><?php endif; ?></div></div></li>
			 <li class="li_3"> <?php echo $this->_var['vo']['goods_number']; ?>  幅</li>
			 <li class="li_4"><?php echo $this->_var['vo']['formated_subtotal']; ?></li>
			<li class="li_5"><img src="themes/default/images/g_ca.png"/></li>
			 </ul>
		<?php endif; ?>
			 
	     <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
			<div class="g_nqbox pad_t30 pad_b24">
				<div class="g_nqb1">Zwischensumme </div>
				<div class="g_nqb2">1 幅</div>
				<div class="g_nqb3">¥798.00 </div>
			</div>
			</div>
			
			<div class="g_nqbox pad_b24  pad_t15">
				<div class="g_nqb1">预计发货时间：</div>
				<div class="g_nqb2 wid">有现货</div>				
			</div>
			<div class="g_nqbox pad_b24">
				<div class="g_nqb1">交付方式：</div>
				<div class="g_nqb2 wid">三个工作日 通过顺风速递 </div>				
			</div>
			<div class="g_nqmh">ART DER LIEFERUNG</div>
			<div class="g_nqbox pad_b30 pad_t30">
				<div class="g_nqb4">Art der Lieferung</div>
				<div class="g_nqb5">Geschätztes Lieferdatum</div>
			</div>
			<div class="g_nqbox pad_b24">
				<div class="g_nqb1"><span><a href="#"></a></span><label class="curp">Kostenlose Standard Lieferung</label></div>
				<div class="g_nqb2"> Montag 07 März</div>
				<div class="g_nqb3">¥0.00 </div>
			</div>
			<div class="g_nqbox pad_b24">
				<div class="g_nqb1"><span><a href="#" class="select"></a></span><label class="curp">Kostenlose Standard Lieferung</label></div>
				<div class="g_nqb2"> Montag 07 März</div>
				<div class="g_nqb3">¥0.00 </div>
			</div>
			<div class="g_nqbox1">
				<div class="g_ndiv">
					<span class="text_l">Zwischensumme : </span>
					<span class="text_r">5.600,00 €</span>
				</div>
				<div class="g_ndiv">
					<span class="text_l">Zwischensumme : </span>
					<span class="text_r">5.600,00 €</span>
				</div>
				<div class="g_ndiv">
					<span class="text_l">Geschenkverpackung :</span>
					<span class="text_r">Gratis</span>
				</div>
			</div>
			
			 <div class="dibu">
				<div class="bj"></div>
				<div class="g_nqbox1">
					<div class="g_ndiv mar">
						<span class="text_l">Geschenkverpackung :</span>
						<span class="text_r">Gratis</span>
					</div>
				</div>
				<div class="anb clearfix">
			    <div class="anniu"><a href="flow.php?step=cart">返回购物车</a></div>
				<div class="anniu2 contiune_address"><a href="javaScript:void(0);">继续</a></div>
				</div>
			</div>
			<div class="g_last clearfix">
				<div class="column clearfix">
					<h3>SICHERE ZAHLUNG</h3>
					<p>Der Sicherheitscode gewährleistet eine sichere Zahlung. Wir verwenden das SSL-Verschlüsselungsverfahren, damit sämtliche Daten im Zusammenhang mit personengebundenen Angaben und Zahlungsmodalitäten geschützt sind. Wir arbeiten ebenfalls mit Sicherheitsexperten zusammen, um sämtliche sensiblen Daten im Zusammenhang mit Zahlungsmodalitäten unzugänglich zu machen</p>
				</div>
				<div class="column clearfix">
					<h3>ZAHLUNGSART</h3>
					<p>Es stehen mehrere Zahlungsarten zur Verfügung: Mastercard, Visa, Carte Bleue, American Express</p>
					<ul class="ul_img">
						<li class="li_img"><span><img src="themes/default/images/yhk.png"/></span></li>
						<li class="li_img"><span><img src="themes/default/images/yhk.png"/></span></li>
						<li class="li_img"><span><img src="themes/default/images/yhk.png"/></span></li>
					</ul>
				</div>
				<div class="column clearfix">
					<h3>UMTAUSCH UND ERSTATTUNG</h3>
					<p>Falls Sie mit Ihrer Bestellung nicht absolut zufrieden sind, haben Sie die Möglichkeit, diese innerhalb von 14 Tagen ab Lieferung umzutauschen oder zurückzugeben</p>
				</div>
			</div>
			
			 
            <div class="songhuodizhi" >
			  <div class="address_show" style="display:none">
		       
			   </div>
			<div class="address_c_l">
			<div class="left">
			<div class="left_1">
			<div class="g_nqmh">IHRE ADRESSEN</div>
			

			
			</div>
			
						<div class="left_1_2 address_off address_li" style="position:relative;">从地址簿中选择<span></span><div class="di_tan">
	<div class="deng_san deng_san_1"></div>
	
		<?php if ($this->_var['count'] > 0): ?>
				<?php $_from = $this->_var['consignee_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'consignee');$this->_foreach['name'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['name']['total'] > 0):
    foreach ($_from AS $this->_var['key'] => $this->_var['consignee']):
        $this->_foreach['name']['iteration']++;
?>
				 <?php if ($this->_foreach['name']['iteration'] <= 5): ?>
                    <div class="miao_add1_2 item_<?php echo $this->_var['consignee']['address_id']; ?>" onclick="change_address(<?php echo $this->_var['consignee']['address_id']; ?>);">
                	<div class="miao_add1_2_t"><?php echo htmlspecialchars($this->_var['consignee']['consignee']); ?></div>
                    <div class="miao_add1_2_t"><?php echo $this->_var['consignee']['province_name']; ?> <?php echo $this->_var['consignee']['city_name']; ?> <?php echo $this->_var['consignee']['district_name']; ?></div>
                    <div class="miao_add1_2_t"><?php echo htmlspecialchars($this->_var['consignee']['address']); ?></div>
                    <div class="miao_add1_2_t"><?php echo htmlspecialchars($this->_var['consignee']['room']); ?></div>
                    <div class="miao_add1_2_t"><?php echo htmlspecialchars($this->_var['consignee']['zipcode']); ?></div>
    </div>
	<?php endif; ?>
   <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
   <?php else: ?>
   
        <a href="JavaScript:void(0);" class=" morendizhi address_em_c">  
					<div class="miao_add1_2" >
					
					<div class="address_emp" >您还没添加收货地址!</div>
				
                </div></a>
<?php endif; ?>   
</div></div>
	
			<div class="address_contain">
							
		  </div>
		  
	
			</div>
			
			<div class="right">
			<div class="right1"><div class="right_1_1">bolon送货政策</div></div>
			<div class="right2"></div>
			
			
			<ul class="info-list">
         <li>交付时需要签名</li>
	     <li>如果您所在的城市不在下拉菜单中的城市范围内，我们目前无法送货。</li>
	     <li>送货时间按照送货至市中心地区进行估算。送货至边远地区可能需要更长的时间。您的发货通知电子邮件中将包括按照您的具体地址估算的送货时间。</li>
	     <li>对于军事禁区，保税监管区或者其他任何政府监管区域，我们将无法提供运送服务。</li>
	     <li>送货时间：星期一至星期日 上午 8:30 至下午 5:30 (公众假期暂停交货)</li>
         </ul>

       
			</div>
			
	
			 <div class="dibu clear">
			 <input type="hidden" value="" class="hide_aid" />
			    	<!--<div class="left_1" style="padding-left:10px;width:95%;display:none;"><input type="checkbox"  checked style="float:left; margin-top:16px; margin-right:10px;"><div class="left_1_1">保存为我的默认送货信息</div></div>-->
				<div  class="anniu2 check_two" style="margin-top:0px;" ><a href="javaScript:void(0);">继续</a></div>
			</div>
			</div>
			

     
			</div>
            <div class="jiezhang_title fukuan_title"> 
			 <div class="shuzi shuzi3"></div>
			 付款
			  <div class="bianji bianji_pay"><a href="javaScript:void(0);">编&nbsp;&nbsp;辑</a></div>
			 </div>
			 <div class="fukuan clear " >
			 <div class="show_pay">
	
			</div>
						         <div class="fapiao">
			
			<div class="miao_song clearfix miao_song_fp">
         
            </div>

	  <div class="fp_c">
			<div class="left">
		<div class="left1" style="height:20px;"><div class="left_1_1"></div></div>
	<div class="left2">
	<input type="radio" name="fapiao_radio"  checked="checked" value="0" class="radio fapiao_raidos">	 Bolon 电子收据 </br></br>

Bolon 标准发票 这是您本次购买商品的 Bolon 电子发票。本发票将于您的订单发货后发送到您订单上的电子邮件地址。...</br></br>
<input type="radio" value="1" name="fapiao_radio" onclick="changeNeedInv()" id="ECS_NEEDINV" checked="" class="radio fapiao_raidos">Bolon 标准发票 －（个人，公司）</br></br>

商业发票 -（个人、公司）：在您的订单发货后，发票将邮寄至订单上的发票地址。</br>
在订单发货后的 2-3 周内，发票将通过 EMS 快递服务递送至发票寄送地址。</br></br>

发票抬头：</br></br>  </div>

   <div class="left2_1"> 此字段不得留空；</br>
    您可以在“个人”字段中填写您的姓名或所在部门的名称。</br> </div>
	
	
	





       
			</div>
			
			
			
			
					<div class="right">
			<div class="right_1"><div class="right_1_1">Bolon电子收据邮件地址</div></div>
			<div class="right_2 inv_in_email">
			
		
			</div>
			<div class="fp_contain" style="display:none;">
			<div class="right_1"><div class="right_1_1">开发票</div></div>
			
				<div class="right_2 fp_info">
			
		     </div>
		<div class="right_1"><div class="right_1_1">发票寄送地址</div> <div class="right_1_2 fp_address_li address_off">从地址簿中选择<span></span></div><div class="fp_di_tan">
	<div class="deng_san deng_san_2"></div>
	
		<?php if ($this->_var['count'] > 0): ?>
				<?php $_from = $this->_var['consignee_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'consignee');$this->_foreach['name'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['name']['total'] > 0):
    foreach ($_from AS $this->_var['key'] => $this->_var['consignee']):
        $this->_foreach['name']['iteration']++;
?> 
				 <?php if ($this->_foreach['name']['iteration'] <= 5): ?>
                    <div class="miao_add1_2" item="fpitem_<?php echo $this->_var['consignee']['address_id']; ?>" onclick="change_fp_address(<?php echo $this->_var['consignee']['address_id']; ?>);">
                	<div class="miao_add1_2_t"><?php echo htmlspecialchars($this->_var['consignee']['consignee']); ?></div>
                    <div class="miao_add1_2_t"><?php echo $this->_var['consignee']['province_name']; ?> <?php echo $this->_var['consignee']['city_name']; ?> <?php echo $this->_var['consignee']['district_name']; ?></div>
                    <div class="miao_add1_2_t"><?php echo htmlspecialchars($this->_var['consignee']['address']); ?></div>
                    <div class="miao_add1_2_t"><?php echo htmlspecialchars($this->_var['consignee']['room']); ?></div>
                    <div class="miao_add1_2_t"><?php echo htmlspecialchars($this->_var['consignee']['zipcode']); ?></div>
                   </div>
	<?php endif; ?>
   <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
   <?php else: ?>
   
        <a href="JavaScript:void(0);" class=" morendizhi address_em_c">  
					<div class="miao_add1_2" >
					
					<div class="address_emp" >您还没添加收货地址!</div>
				
                </div></a>
<?php endif; ?>   
</div></div>
			 <div class="fp_address">

			
			</div>
	      </div>
	
		
			</div>
			 <div class="dibu clear">
			   <input name="need_inv" type="hidden"  class="need_inv" value="1"  />
			    		 <input type="hidden" value="" class="fp_hide_aid" />
				<div class="anniu2 fapiao_type"><a href="javaScript:void(0);">继续</a></div>
			</div>
			
			
			</div>
			</div>
			 <div class="pay_contain">
			    <div class="hdfk">
			 <div class="hdfk_1"><div class="hdfk_1_1">货到付款</div></div>
			 <div class="hdfk_2">
	
			 </div>
			     </div>
				 
				 <div class="wszf">
			 <div class="wszf_1"><div class="hdfk_1_1">网上支付</div></div>
			 <div class="wszf_2">

			 
			 </div>
			 
	
			     </div>
				 </div>
				 <div class="wszf" style="border-bottom:0px;">
	
			 
			<!-- <div class="wszf_2 fl" style="margin-bottom:10px;">
			 <span class="saveAsDefault-field" id="coherent_id_686" style=""> <span id="payment-save-as-default-checkbox-toggle-slider" class="toggle-slider"> <input type="checkbox" id="payment-save-as-default" checked="checked"> </span> <label for="payment-save-as-default" id="coherent_id_687"> <span id="coherent_id_688">存储为我的默认付款信息</span> </label> </span>
			 </div>	 -->
			  <div class="tuishi_false tishi_pay"></div>
			 <div class="dibu clear">
			    
				<div class="anniu2 mar_r0 pay_type"><a href="javaScript:void(0);">继续</a></div>
			</div>
			     </div>	  
			
			 </div>
		
			
			
			
	
			
		<!--	<div class="jiezhang_title law_title"> 
			 <div class="shuzi shuzi5"></div>
			 条款与条件
			   <div class="bianji bianji_law"><a href="javaScript:void(0);">查&nbsp;&nbsp;看</a></div>
			 </div>
			 <div class="tktj tktj_title" >
			 <div class="tk_content">
			<input type="checkbox" id="terms-accept" checked="checked" class="checkbox">  通过点击“立即结帐”，我同意接受BOLON在线商店条款和条件。</br>

请注意以下内容：</br>

预计发货时间将根据您的付款方式有所更改。 请参考以上“交付选项”一栏。</br>

装运和交货时间为BOLON做出的最佳估算时间。就少数订单，由于无法预料的产品短缺或超出我们控制以外的因素，实际时间可能会更长。如有迟延，我们将联系您，并给您取消订单及要求完全退款的选择。</br>

我们网站上的产品和定价信息在公布前已经过核实。但是，在极少数情形下会有错误。如果我们发现定价错误，我们将通知您，取消您的订单，并对订单金额全额退款。</br>

对于BOLON的退回要求，BOLON保留收取任何行政费用的权利。详情请参见条款和条件。</br> 
			 <div class="tuishi_false tishi_law">请阅读并接受此订单的条款</div>
			 <div class="dibu clear">
			    
				<div class="anniu2 mar_r0 law_btn"><a href="javaScript:void(0);">继续</a></div>
			</div>
			</div>
			 </div>-->
			
	

            
			 <div class="jiesuan_box">
			 
			    <div class="jiesuan_box_left">
				    <div class="jiesuan_box_left1">
					 <div class="jie_tis2">请输入促销代码</div>
						<div class="jiesuan_box_left44">
					   <div class="jie_tis"><span>请输入促销代码</span></div>
					  
                        <input type="text" name="bonus_sn" class="input5 inputBg" value="促销代码"><div name="validate_bonus" onclick="validateBonus(document.forms['theForm'].elements['bonus_sn'].value)" class="jiesuan_box_left1_1 bnt_blue_1"><a href="javaScript:void(0);">使用</a></div>
						</div>
						
					</div>
				   <div class="jiesuan_box_left2">  <!--BL2511 / 圆形复古太阳镜     J01 黑色
			 预计交货时间：有现货
			 交付方式：三个工作日 通过顺风速递 运送至 福建 厦门 思明区--></div>
				    <div class="jiesuan_box_left3" style="display:none;">单击"立即下单"按钮，即表示您确认自己接受本次销售交易的条款和条件。</div>
				    </div>
					    <div class="jiesuan_box_right" >
						     <?php echo $this->fetch('library/order_total.lbi'); ?>

				<div class="jiesuan_box_right3" style="display:none;">
				  
				       <input type="hidden" name="step" value="done" />
                        <div class="jiezhang_box_anniu3"><a href="javaScript:void(0);">立即下订单</a></div>
			       </div>
				   
				</div>
				
				
			 </div>
			
			
			
			
			 </div>
			
			</form> 
	</div>
	
	<div class="g_qside clearfix">
		<div class="g_qsbox">
			<h2>HILFE</h2>
			<p>Ein Berater steht Ihnen von<br/>
Montag bis Samstag von 10 - 19 Uhr zur Verfügung </p>
			<ul class="ul_wid">
				<li class="li_wid">
					<a href="#"><span><img src="themes/default/images/g_xin.png"/></span>per E-Mail</a>
				</li>
				<li class="li_wid"> 
					<a href="#"><span><img src="themes/default/images/g_chat.png"/></span>per Chat</a>
				</li>
				<li class="li_wid"> 
					<a href="#"><span><img src="themes/default/images/g_phone.png"/></span>per Telefon:+49(0)6929993467</a>
				</li>
			</ul>
			<div class="g_qsbox2">
				<h2>ANRUFEN LASSEN</h2>
				<a href="#">RUFEN SIE MICH ZURÜCK</a>
			</div>
		</div>
		<div class="g_qsbox">
			<h2>IHRE VORTEILE</h2>
			<h3>Lieferung und Rücksendung</h3>
			<p>Lieferung und Rückgabe für alle nicht- kundenspezifische Produkt Auftrag angeboten. </p>
			<h3>Die Kunst des Schenkens</h3>
			<p>Eine elegante Geschenkverpackung, die Ihre Bestellung perfekt macht.</p>
		</div>
	</div>
	
	
	
	
	
	
   </div>
   </div>
   
   
   
   
   
   
   
    <div class="w_top">
	  <div class="cont_personal_box w_por clearfix">
      <div class="title">问题
	 </div>
	 
	  <div class="wenti_box">
	  
	     <div class="wenti_box_top">
		 <?php $_from = $this->_var['faqlist']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'vo');if (count($_from)):
    foreach ($_from AS $this->_var['vo']):
?>
		    <div class="wenti_box_top1">
			   <div class="wenti_box_top1_1"><?php echo $this->_var['vo']['title']; ?></div>
			   <div class="wenti_box_top1_2"><?php echo $this->_var['vo']['content']; ?> </div>
			</div>
			
		 <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
		 
		 
		 </div>
		   
	  
	  </div>
 </div>
 </div>
	    <script type="text/javascript">
	  
	   $(function(){
	   
	    $(".address_botton3").click(function(){
		  var shipping=parseInt($('input[name="shipping"]:checked').val());
		  if(isNaN(shipping)){
		  
		   alert("请选择配送方式!");
		   return false;
		  
		  }
		  
		  var payment=$('input[name="payment"]:checked').val();
		  
		  	  if(isNaN(payment)){
		  
		   alert("请选择支付方式!");
		   return false;
		  
		  }
		  
		document.theForm.submit();
		  
		
		});
	   
	   
	   });
	  
	  </script>
	  
	  <?php endif; ?>

	  
	  
	  <?php if ($this->_var['step'] == "done"): ?>
      <div class="w_top">
	  <div class="cont_personal_box w_por clearfix">

    <div class="jiezhang" style="padding-top:35px;">
      <div class="jiezhang_title te_in"> 付款说明 </div>
      <div class="liucheng clearfix">
        <div class="liucheng1  buy_btn_od">
          <div class="liu_b"> <?php if ($this->_var['pay_online']): ?>
            
                 <?php echo $this->_var['pay_online']; ?>
            <?php endif; ?></div>
          <span>注意：<br />
          1.我们将在验货完毕后处理您的订单，并且依照订单发货后，将会已电子邮件的方式通知您。<br />
          2.在收货时，收货人须向快递员提供买方或订单中列明的接受方的身份证明，或者发货通知邮件。 </span> </div>
      </div>
      <div class="jiezhang_title te_in"> 需要运送的产品 </div>
      <div class="liu_wrap clearfix">
        <div class="liu_song">
          <div class="miao_song  margin_0 clearfix">
            <div class="miao_song_1 width100">送货地址</div>
            <div class="miao_song_r clearfix"><?php echo $this->_var['order']['surname']; ?><?php echo $this->_var['order']['ming']; ?><br/>
              <?php echo $this->_var['order']['shenshiqu']; ?><br/>
	
             <?php echo $this->_var['order']['address']; ?><br/>
			  <?php if ($this->_var['order']['room'] != ''): ?>
              <?php echo $this->_var['order']['room']; ?><br/>
			  <?php endif; ?>
              <?php echo $this->_var['order']['zipcode']; ?></div>
          </div>
          <div class="miao_song margin_0 clearfix">
            <div class="miao_song_1 width100">发货通知</div>
            <div class="miao_song_r clearfix"> <?php echo $this->_var['order']['email']; ?><br/>
              <?php echo $this->_var['order']['iphone']; ?></div>
          </div>
        </div>
        <div class="liucheng2 clearfix">
          <div class="liucheng2_h">收到您的付款后，我们会向您发送一封电子邮件，提供更新后的送货信息。</div>
	
		   <?php $_from = $this->_var['goods_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'vo');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['vo']):
?>
		   <?php if ($this->_var['vo']['extension_code'] != 'dingzhi'): ?>
          <div class="liucheng2_box">
            <div class="liucheng2_box1"><?php $_from = $this->_var['vo']['goodsattr']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'vc');if (count($_from)):
    foreach ($_from AS $this->_var['vc']):
?><a href="goods.php?id=<?php echo $this->_var['vo']['goods_id']; ?>"><img src="<?php echo $this->_var['vc']['attr_thumb']; ?>" /></a><?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?></div>
            <div class="liucheng2_box2"><?php echo $this->_var['vo']['goods_sn']; ?> / <?php echo $this->_var['vo']['goods_name']; ?>
<?php $_from = $this->_var['vo']['goodsattr']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'vc');if (count($_from)):
    foreach ($_from AS $this->_var['vc']):
?>			
			<?php echo $this->_var['vc']['name']; ?>:<?php echo $this->_var['vc']['color']; ?>  
			<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?><br />
              预计交货时间：有现货<br />
              <span>通过<?php echo $this->_var['order']['shipping_name']; ?>送货</span></div>
            <div class="liucheng2_box3"><?php echo $this->_var['vo']['formated_subtotal']; ?></div>
          </div>
		  <?php else: ?>
		  
		     <div class="liucheng2_box">
            <div class="liucheng2_box1"><a href="<?php echo $this->_var['vo']['dingzhi_img']; ?>" target="_blank"><img src="<?php echo $this->_var['vo']['dingzhi_thumb']; ?>" /></a></div>
            <div class="liucheng2_box2"><?php echo $this->_var['vo']['goods_name']; ?><br/><br/>
              			 	
					镜框<br/>

					<span>镜框：<?php if ($this->_var['vo']['dingzhi_attr_list_str']['jk'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['jk']; ?><?php else: ?>无<?php endif; ?>&nbsp;&nbsp;
					镜片：<?php if ($this->_var['vo']['dingzhi_attr_list_str']['jp'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['jp_cat_name']; ?> <?php echo $this->_var['vo']['dingzhi_attr_list_str']['jp']; ?><?php else: ?>无<?php endif; ?>&nbsp;&nbsp;
					<?php if ($this->_var['vo']['dingzhi_attr_list_str']['wj'] != ""): ?>五金：<?php echo $this->_var['vo']['dingzhi_attr_list_str']['wj']; ?>&nbsp;&nbsp;<?php endif; ?>
					<?php if ($this->_var['vo']['dingzhi_attr_list_str']['qk'] != ""): ?>饰布：<?php echo $this->_var['vo']['dingzhi_attr_list_str']['qk']; ?>&nbsp;&nbsp;<?php endif; ?>
					<?php if ($this->_var['vo']['dingzhi_attr_list_str']['sj'] != ""): ?>饰件：<?php echo $this->_var['vo']['dingzhi_attr_list_str']['sj']; ?>&nbsp;&nbsp;<?php endif; ?>
					镜腿：<?php if ($this->_var['vo']['dingzhi_attr_list_str']['jt'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['jt']; ?><?php else: ?>无<?php endif; ?>
					<?php if ($this->_var['vo']['dingzhi_attr_list_str']['jtt'] != ""): ?>脚套：<?php echo $this->_var['vo']['dingzhi_attr_list_str']['jtt']; ?>&nbsp;&nbsp;<?php endif; ?>
					镌刻：<?php if ($this->_var['vo']['dingzhi_attr_list_str']['type_w_text'] != "" || $this->_var['vo']['dingzhi_attr_list_str']['type_n_text'] != ""): ?> <?php if ($this->_var['vo']['dingzhi_attr_list_str']['type_w_text'] != ""): ?>镜腿外侧<?php if ($this->_var['vo']['dingzhi_attr_list_str']['type_w'] == 0): ?>左边<?php endif; ?> <?php if ($this->_var['vo']['dingzhi_attr_list_str']['type_w'] == 1): ?>右边<?php endif; ?><?php if ($this->_var['vo']['dingzhi_attr_list_str']['type_w'] == 2): ?>两边<?php endif; ?> 镌刻内容：<?php echo $this->_var['vo']['dingzhi_attr_list_str']['type_w_text']; ?><?php endif; ?> <?php if ($this->_var['vo']['dingzhi_attr_list_str']['type_n_text'] != ""): ?>镜腿内侧<?php if ($this->_var['vo']['dingzhi_attr_list_str']['type_n'] == 0): ?>左边<?php endif; ?> <?php if ($this->_var['vo']['dingzhi_attr_list_str']['type_n'] == 1): ?>右边<?php endif; ?><?php if ($this->_var['vo']['dingzhi_attr_list_str']['type_n'] == 2): ?>两边<?php endif; ?> 镌刻内容：<?php echo $this->_var['vo']['dingzhi_attr_list_str']['type_n_text']; ?><?php endif; ?> <?php else: ?> 无 <?php endif; ?>&nbsp;镜盒系列：<?php if ($this->_var['vo']['dingzhi_attr_list_str']['jh'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['jh']; ?> <?php else: ?> 默认 <?php endif; ?>&nbsp;
					镜盒材质：<?php if ($this->_var['vo']['dingzhi_attr_list_str']['cz'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['cz']; ?> <?php else: ?> 默认 <?php endif; ?>&nbsp;
					镜盒镌刻：线1 <?php if ($this->_var['vo']['dingzhi_attr_list_str']['jh_line_one'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['jh_line_one']; ?><?php else: ?>无<?php endif; ?>&nbsp;线2 <?php if ($this->_var['vo']['dingzhi_attr_list_str']['jh_line_two'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['jh_line_two']; ?><?php else: ?>无<?php endif; ?>
				<?php if ($this->_var['vo']['dingzhi_attr_list_str']['jp_type'] == 1): ?>	</span>
				
					<br/><br/>处方信息<br/>
                    <span>左眼：<?php if ($this->_var['vo']['dingzhi_attr_list_str']['l_eye_s'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['l_eye_s']; ?><?php else: ?>无<?php endif; ?>/s <?php if ($this->_var['vo']['dingzhi_attr_list_str']['l_eye_c'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['l_eye_c']; ?><?php else: ?>无<?php endif; ?>/c <?php if ($this->_var['vo']['dingzhi_attr_list_str']['l_eye_a'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['l_eye_a']; ?><?php else: ?>无<?php endif; ?>/A <?php if ($this->_var['vo']['dingzhi_attr_list_str']['l_eye_t'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['l_eye_t']; ?><?php else: ?>无<?php endif; ?>/MPD&nbsp;
					右眼：<?php if ($this->_var['vo']['dingzhi_attr_list_str']['r_eye_s'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['r_eye_s']; ?><?php else: ?>无<?php endif; ?>/s <?php if ($this->_var['vo']['dingzhi_attr_list_str']['r_eye_c'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['r_eye_c']; ?><?php else: ?>无<?php endif; ?>/c <?php if ($this->_var['vo']['dingzhi_attr_list_str']['r_eye_a'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['r_eye_a']; ?><?php else: ?>无<?php endif; ?>/A <?php if ($this->_var['vo']['dingzhi_attr_list_str']['r_eye_t'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['r_eye_t']; ?><?php else: ?>无<?php endif; ?>/MPD&nbsp;
					瞳距：<?php if ($this->_var['vo']['dingzhi_attr_list_str']['pd_eye_t'] != ""): ?><?php echo $this->_var['vo']['dingzhi_attr_list_str']['pd_eye_t']; ?><?php else: ?>无<?php endif; ?>/FD</span>
				
				<?php endif; ?>
		
			<br />
              <?php if ($this->_var['vo']['accessories'] == ""): ?>预计发货时间：<?php echo $this->_var['vo']['shipping_date']; ?><?php else: ?><?php echo $this->_var['vo']['accessories']; ?>配件暂无库存,预计发货时间：<?php echo $this->_var['vo']['shipping_date']; ?><?php endif; ?><br />
              <span>通过<?php echo $this->_var['order']['shipping_name']; ?>送货</span></div>
            <div class="liucheng2_box3"><?php echo $this->_var['vo']['formated_subtotal']; ?></div>
          </div>
		   <?php endif; ?>
		  <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
        </div>
      </div>
      <div class="jiezhang_title te_in"> 付款 </div>
      <div class="liu_wrap clearfix liu_bottom">
	  
        <div class="liu_song">
          <div class="miao_song  margin_0 clearfix">
            <div class="miao_song_1 width120">发票类型</div>
			 <?php if ($this->_var['order']['inv_types'] == 0): ?>
            <div class="miao_song_r clearfix">BOLON 电子收据</div>
			<?php else: ?>
			  <div class="miao_song_r clearfix">BOLON 标准发票－（<?php echo $this->_var['order']['inv_content_name']; ?>）</div>
			<?php endif; ?>
          </div>
          <div class="miao_song margin_0 clearfix">
		   <?php if ($this->_var['order']['inv_types'] == 0): ?>
            <div class="miao_song_1 width120">电子邮件地址</div>
            <div class="miao_song_r clearfix"><?php echo $this->_var['order']['inv_email']; ?></div>
		  <?php else: ?>
		     <div class="miao_song_1 width120">发票抬头</div>
             <div class="miao_song_r clearfix"><?php echo $this->_var['order']['inv_payee']; ?></div>
		  <?php endif; ?>
          </div>
        </div>
		
		
        <div class="liu_song">
          <div class="miao_song  margin_0 clearfix">
            <div class="miao_song_1 width120">付款方式</div>
            <div class="miao_song_r clearfix">
              <div class="miao_song_r_img"><img src="<?php echo $this->_var['order']['pay_icon']; ?>"/></div>
              <span></span> </div>
          </div>
        </div>
      </div>
	  
	  
	  	 <div class="jiesuan_box">
			 
			
					    <div class="jiesuan_box_right" >
						     <?php echo $this->fetch('library/order_total.lbi'); ?>

			
				   
				</div>
				
				
			 </div>
    </div>
	
  </div>
	  
	   </div>
	  
	  <?php endif; ?>
	  </div>
	 
	  </div>
   



</div>
<?php echo $this->fetch('library/page_footer.lbi'); ?>
<?php echo $this->fetch('library/page_botter.lbi'); ?>
</div>  


</body>
</html>
