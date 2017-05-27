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

<title>韩菲诗-测试结果</title>
<link type="text/css" rel="stylesheet" href="themes/default/mobile/css/css.css" />
<link type="text/css" rel="stylesheet" href="themes/default/mobile/css/pagescss.css" >
    <link type="text/css" rel="stylesheet" href="themes/default/mobile/css/lgcss.css" media="screen">
<script src="themes/default/mobile/js/jquery-1.6.0.min.js"></script>
<script src="themes/default/mobile/js/mob.js"></script>


</head>

<body>

<div id="div1" class="sy_page ">

 <?php echo $this->fetch('mobile/library/mobile_header.lbi'); ?>

<div class="max-w">
<div class="mar-1"><img src="themes/default/mobile/img/title.png" alt="你的护肤顾问"></div>
<div class="max-w1">
		
		<div class="w_zhu">
		<div class="best-1"><h2>第一步 洁净</h2></div>
		<div class="best-2"><p>选择类型：</p><div class="best-3 sever">洁面乳</div></div>
		<div class="w_chan bo_opq">
                    <ul>
                    <?php $_from = $this->_var['one']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('k', 'v');$this->_foreach['name'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['name']['total'] > 0):
    foreach ($_from AS $this->_var['k'] => $this->_var['v']):
        $this->_foreach['name']['iteration']++;
?>
                        <?php if ($this->_foreach['name']['iteration'] % 3 != 0): ?>
                            <li class="">
					        <a target="_blank" href="goods.php?id=<?php echo $this->_var['v']['goods_id']; ?>">
                                <div class="w_tuo"><img src="<?php echo $this->_var['v']['pic']; ?>" /></div>
                                <div class="chan_wenzi"><span class="cha_s1"><?php echo $this->_var['v']['goods_name']; ?></span><span class="cha_s1">￥<?php echo $this->_var['v']['price']; ?> - <?php echo $this->_var['v']['name']; ?></span></div>
                            </a>
							</li>
                            <?php else: ?>
                            <li class="sever">
							 <a target="_blank" href="goods.php?id=<?php echo $this->_var['v']['goods_id']; ?>">
                                <div class="w_tuo"><img src="<?php echo $this->_var['v']['pic']; ?>" /></div>
                                <div class="chan_wenzi"><span class="cha_s1"><?php echo $this->_var['v']['goods_name']; ?></span><span class="cha_s1">￥<?php echo $this->_var['v']['price']; ?> - <?php echo $this->_var['v']['name']; ?></span></div>
                            </a>
							</li>
                        <?php endif; ?>
                    <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                            

                    </ul>
                </div>
		</div>

		<div class="w_zhu">
		<div class="best-1"><h2>第二步 滋养</h2></div>
		<div class="best-2"><p>选择类型：</p><div class="best-3 sever">滋润 护理</div></div>
		<div class="w_chan bo_opq">
                    <ul>
                        <?php $_from = $this->_var['two']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('k', 'v');$this->_foreach['name'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['name']['total'] > 0):
    foreach ($_from AS $this->_var['k'] => $this->_var['v']):
        $this->_foreach['name']['iteration']++;
?>
                        
                        <?php if ($this->_foreach['name']['iteration'] % 3 != 0): ?>
                            <li class="">
                           <a target="_blank" href="goods.php?id=<?php echo $this->_var['v']['goods_id']; ?>">
                                <div class="w_tuo"><img src="<?php echo $this->_var['v']['pic']; ?>" /></div>
                                <div class="chan_wenzi"><span class="cha_s1"><?php echo $this->_var['v']['goods_name']; ?></span><span class="cha_s1">￥<?php echo $this->_var['v']['price']; ?> - <?php echo $this->_var['v']['name']; ?></span></div>
                            </a>
                            </li>
                            <?php else: ?>
                            <li class="sever">
                            <a target="_blank" href="goods.php?id=<?php echo $this->_var['v']['goods_id']; ?>">
                                <div class="w_tuo"><img src="<?php echo $this->_var['v']['pic']; ?>" /></div>
                                <div class="chan_wenzi"><span class="cha_s1"><?php echo $this->_var['v']['goods_name']; ?></span><span class="cha_s1">￥<?php echo $this->_var['v']['price']; ?> - <?php echo $this->_var['v']['name']; ?></span></div>
                            </a>
                            </li>
                        <?php endif; ?>
                    <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>

                    </ul>
                </div>
		</div>

		<div class="w_zhu">
		<div class="best-1"><h2>第三步 防护</h2></div>
		<div class="best-2"><p>选择类型：</p><div class="best-3 sever">隔离霜</div></div>
		<div class="w_chan bo_opq">
                    <ul>
                     <?php $_from = $this->_var['three']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('k', 'v');$this->_foreach['name'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['name']['total'] > 0):
    foreach ($_from AS $this->_var['k'] => $this->_var['v']):
        $this->_foreach['name']['iteration']++;
?>
                        <?php if ($this->_foreach['name']['iteration'] % 3 != 0): ?>
                            <li class="">
                           <a target="_blank" href="goods.php?id=<?php echo $this->_var['v']['goods_id']; ?>">
                                <div class="w_tuo"><img src="<?php echo $this->_var['v']['pic']; ?>" /></div>
                                <div class="chan_wenzi"><span class="cha_s1"><?php echo $this->_var['v']['goods_name']; ?></span><span class="cha_s1">￥<?php echo $this->_var['v']['price']; ?> - <?php echo $this->_var['v']['name']; ?></span></div>
                            </a>
                            </li>
                            <?php else: ?>
                            <li class="sever">
                            <a target="_blank" href="goods.php?id=<?php echo $this->_var['v']['goods_id']; ?>">
                                <div class="w_tuo"><img src="<?php echo $this->_var['v']['pic']; ?>" /></div>
                                <div class="chan_wenzi"><span class="cha_s1"><?php echo $this->_var['v']['goods_name']; ?></span><span class="cha_s1">￥<?php echo $this->_var['v']['price']; ?> - <?php echo $this->_var['v']['name']; ?></span></div>
                            </a>
                            </li>
                        <?php endif; ?>
                    <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>

                    </ul>
                </div>
		</div>

    </div>
 </div>

  
 <?php echo $this->fetch('mobile/library/footer.lbi'); ?>
	</div>


</body>
</html>
