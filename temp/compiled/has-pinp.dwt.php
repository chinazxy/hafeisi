<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="Generator" content="BOLON v1.0.3" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" >  
<title>韩菲诗-品牌页</title>
<link type="text/css" rel="stylesheet" href="themes/default/mobile/css/css.css" />
<link type="text/css" rel="stylesheet" href="themes/default/mobile/css/has-pinp.css" />
<link rel="stylesheet" media="screen and (max-width: 320px)" href="themes/default/mobile/css/auto.css" />

</head>
<script type="text/javascript" src="themes/default/mobile/js/jquery-1.7.2.min.js"></script>
<script>

        function loadAll(obj){
            var cat_id = $(obj).attr("id");
            var count = $(obj).attr("class");
            var is_mobile = <?php echo $this->_var['is_mobile']; ?>;
            var str;
            var click = 1;
            $.ajax({
               type : "POST",
                url : "ajaxcategory.php",
                data: {cat_id : cat_id , click : click , is_mobile : is_mobile},
                success : function(data){
                    var goodsobj = eval(data);
                    $.each(goodsobj, function(i,item){
                        var price = goodsobj[i].price;
                        var id = goodsobj[i].goods_id;
                        var img = goodsobj[i].img;
                        var name = goodsobj[i].name;
                        var length = goodsobj[i].length;
                        if (length < 9){
                            $(obj).parent().hide();
                        }
                        
                            $("#goodslist" + cat_id).append('<li><a href="goods.php?id=' + id + '&cat=' + cat_id + '"><div class="w_tuo"><img class="loading" src="'+img+'"/></div>' +
                                '<div class="chan_wenzi"><span class="cha_s1">'+item.goods_name+'</span><span class="cha_s1">￥'+price+' - '+name+'</span></div></a></li>');
                        
                    })
                    click++;
                }
            });
        }
    </script>
<body>
<div class="sy_page">



  <?php echo $this->fetch('mobile/library/mobile_header.lbi'); ?>
  <div class="w_zhong">
<?php $_from = $this->_var['category']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('kk', 'v');if (count($_from)):
    foreach ($_from AS $this->_var['kk'] => $this->_var['v']):
?>
  <div class="zhong" style="position:relative;" id="cat_<?php echo $this->_var['v']['cat_id']; ?>">
  
  <div class="pinp_1">
  <img src="<?php echo $this->_var['v']['cat_plotsx']; ?>"/>
  </div>
  
  <div class="w_zhu">
  <div class="inde_h">
  <h2><?php echo $this->_var['v']['cat_name']; ?></h2>

  <!-- <span class="w_ca"><img src="themes/default/mobile/img/in_ca.png"/></span>
  <div class="w_inde_p"><?php echo $this->_var['v']['cat_enname']; ?></div> -->
  </div>
  <div class="w_chan">
  <ul id="goodslist<?php echo $this->_var['v']['cat_id']; ?>">
  <?php $_from = $this->_var['v']['goods']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('k', 'vv');if (count($_from)):
    foreach ($_from AS $this->_var['k'] => $this->_var['vv']):
?>
  <li><a href="goods.php?id=<?php echo $this->_var['vv']['goods_id']; ?>&cat=<?php echo $this->_var['v']['cat_id']; ?>"><div class="w_tuo"><img src="http://img.xingou.net.cn/<?php echo $this->_var['vv']['goodsinfo']['data']['pic']; ?>"/></div>
  <div class="chan_wenzi"><span class="cha_s1"><?php echo $this->_var['vv']['goods_name']; ?></span><span class="cha_s1">￥<?php echo $this->_var['vv']['goodsinfo']['data']['price']; ?> - <?php echo $this->_var['vv']['goodsinfo']['name']; ?></span></div></a></li>
  <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
  </ul>
  <?php if ($this->_var['v']['count'] > 2): ?>
  <div class="w_chakan"><span class="w_kan"><a id='<?php echo $this->_var['v']['cat_id']; ?>' class='<?php echo $this->_var['v']['count']; ?>' href='javascript:;' onclick='loadAll(this)'>查看更多</a></span></div>
  <?php endif; ?>
  </div>
  </div>
  
  </div>
  
  <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
  
  </div>
  
 <?php echo $this->fetch('mobile/library/footer.lbi'); ?>
</div>

	

	

<script type="text/javascript" src="themes/default/mobile/js/mob.js"></script>
</body>
</html>
