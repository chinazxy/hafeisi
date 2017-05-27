<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="Generator" content="BOLON v1.0.3" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta property="qc:admins" content="417303730346274766367164506000" />
<meta property="qc:admins" content="417303730346274766367164506000" />
<meta content="text/html; charset=iso-8859-1" http-equiv="content-type">
<meta content="webkit" name="renderer">
<meta name="viewport" content=" initial-scale=1.0, minimum-scale = 1, maximum-scale = 1" />
<meta name="Keywords" content="<?php echo $this->_var['keywords']; ?>" />
<meta name="Description" content="<?php echo $this->_var['description']; ?>" />



<title>韩菲诗-首页</title>
<link type="text/css" rel="stylesheet" href="themes/default/css/css.css" />
 <script type="text/javascript" src="js/2016/jquery-1.11.1.min.js"></script>


   <script type="text/javascript" src="js/2016/w.js"></script>  
   
 <script>
 var _hmt = _hmt || [];
 (function() {
   var hm = document.createElement("script");
   hm.src = "https://hm.baidu.com/hm.js?4e3ecdb5c097aa7bce45a4667f9470c7";
   var s = document.getElementsByTagName("script")[0];
   s.parentNode.insertBefore(hm, s);
 })();
 </script>
	 
</head>
<body onload="">


<div class="header">
	<?php echo $this->fetch('library/header.lbi'); ?>
<div class="nei_ye">
		
		<div class="po_jo">
			<div class="prev" ><img src="data/img/prev.png" /></div>
			<div class="next" ><img src="data/img/next.png" /></div>
			<div class="xiala"><div class="san_jiao">点击下拉</div></div>
			<div class="po_bao">



				<div class="po_hd">
					<ul>
						
						<li class="on"></li>
						<?php for($i = 1; $i < $count;$i++){?>
							<li class=""></li>
						<?php }?>
						
						


					</ul>
				</div>


			</div>
			<div  class="po_lubo">
				<ul id="Hei">
					<?php $_from = $this->_var['photolist']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'vo');$this->_foreach['keys'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['keys']['total'] > 0):
    foreach ($_from AS $this->_var['vo']):
        $this->_foreach['keys']['iteration']++;
?>
					<li style="width:100%;height:100%;float:left;background:url(<?php echo $this->_var['vo']['images']; ?>) no-repeat center;"><div class="new_wenzi" style="display:none"><h2><?php echo $this->_var['vo']['entitle']; ?></h2><p><?php echo $this->_var['vo']['miaoshu']; ?></p><div class="new_anniu"><a href="<?php echo $this->_var['vo']['url']; ?>"><?php echo $this->_var['vo']['linkname']; ?></a></div></div></li>
					<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>



				</ul>
			</div>
		</div>
		
		<div class="oNth" style="width:100%;height:auto;display:inline-block;max-width:79.75em;margin-top: 60px;">
        	<span class="oNth2" style="width:100%;height:auto;float:left; text-align:center;"><img style="max-width:100%;" src="themes/default/images/img/tools_bar_01.png"/></span>
        	<span class="oNth1" style="width:25%;height:auto;float:left;"><a href="skintest.php"><img style="max-width:100%;" src="themes/default/images/img/oN11.jpg"/></a></span>
        	<span class="oNth1" style="width:25%;height:auto;float:left;"><a href="mantest.php"><img style="max-width:100%;" src="themes/default/images/img/oN21.jpg"/></a></span>
        	<span class="oNth1 oB_Tc" style="width:25%;height:auto;float:left;"><a href="javascript:void(0);"><img style="max-width:100%;" src="themes/default/images/img/oN31.jpg"/></a></span>
        	<span class="oNth1 oB_Tc" style="width:25%;height:auto;float:left;"><a href="javascript:void(0);"><img style="max-width:100%;" src="themes/default/images/img/oN41.jpg"/></a></span>
        	</div>
        	

            	<div class="oB_over">
            	   <div class="oB_l">

                <span class="t_caca"></span>
            	   <h2>入口暂未开放</h2>
            	   </div>
            	</div>
		<?php $_from = $this->_var['category']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('kk', 'v');if (count($_from)):
    foreach ($_from AS $this->_var['kk'] => $this->_var['v']):
?>
        <div class="header_center" style="position:relative;" id="cat_<?php echo $this->_var['v']['cat_id']; ?>">
            <div class="inde_h sever2">
                <h2><?php echo $this->_var['v']['cat_name']; ?></h2>
                <span class="ca"><img src="data/img/in_ca.png"/></span>
                <div class="inde_p sever"><?php echo $this->_var['v']['cat_enname']; ?></div>
                
                    <div class="fen_w"><?php echo $this->_var['v']['cat_endesc']; ?></div>
            </div>
            <div class="nei_bottom sever">
                <div class="chanping_nei">
                    <ul id="goodslist<?php echo $this->_var['v']['cat_id']; ?>">
                    <?php $_from = $this->_var['v']['goods']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('k', 'vv');if (count($_from)):
    foreach ($_from AS $this->_var['k'] => $this->_var['vv']):
?>
                    <?php if (( $this->_var['k'] + 1 ) % 3 != 0): ?>
                        <li><a href="goods.php?id=<?php echo $this->_var['vv']['goods_id']; ?>&cat=<?php echo $this->_var['v']['cat_id']; ?>">
                                <div class="chan_tu"><img class="loading" src="http://img.xingou.net.cn/<?php echo $this->_var['vv']['goodsinfo']['data']['pic']; ?>"/></div>
                                <div class="chan_wenzi"><span class="cha_s1"><?php echo $this->_var['vv']['goods_name']; ?></span><span class="cha_s1">￥<?php echo $this->_var['vv']['goodsinfo']['data']['price']; ?> - <?php echo $this->_var['vv']['goodsinfo']['name']; ?></span></div>
                            </a></li>
                            <?php else: ?>
                                
                                <li class="sever"><a href="goods.php?id=<?php echo $this->_var['vv']['goods_id']; ?>&cat=<?php echo $this->_var['v']['cat_id']; ?>">
                                <div class="chan_tu"><img class="loading" src="http://img.xingou.net.cn/<?php echo $this->_var['vv']['goodsinfo']['data']['pic']; ?>"/></div>
                                <div class="chan_wenzi"><span class="cha_s1"><?php echo $this->_var['vv']['goods_name']; ?></span><span class="cha_s1">￥<?php echo $this->_var['vv']['goodsinfo']['data']['price']; ?> - <?php echo $this->_var['vv']['goodsinfo']['name']; ?></span></div>
                            </a></li>
                                <?php endif; ?>
                        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>

                    </ul>
                </div>
                
            </div>

        </div>
        
        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
	</div>

</div>
<?php echo $this->fetch('library/page_footer.lbi'); ?>

<script type="text/javascript" src="js/2016/jquery.min.js"></script>
<script type="text/javascript" src="js/2016/jquery.SuperSlide.2.1.2.js"></script>
<script type="text/javascript">
	jQuery(".po_jo").slide({titCell:".po_hd ul", mainCell:".po_lubo ul", effect:"leftLoop", vis:"auto", autoPlay:true, autoPage:true, trigger:"click"});
</script>
</body>
</html>