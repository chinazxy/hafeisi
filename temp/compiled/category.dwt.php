<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="Generator" content="BOLON v1.0.3" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>韩菲诗-品牌页</title>
    <meta name="Keywords" content="<?php echo $this->_var['keywords']; ?>" />
<meta name="Description" content="<?php echo $this->_var['description']; ?>" />
  <link type="text/css" rel="stylesheet" href="themes/default/css/css.css" />
 <script type="text/javascript" src="js/2016/jquery-1.11.1.min.js"></script>
    <script src="js/2016/w.js"></script>
    <script src="js/2016/jquery.load.js"></script>
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
                            $(obj).hide();
                        }
                        if ((i+1)%3 !== 0) {
                            $("#goodslist" + cat_id).append('<li><a href="goods.php?id=' + id + '&cat=' + cat_id + '"><div class="chan_tu"><img class="loading" src="'+img+'"/></div>' +
                                '<div class="chan_wenzi"><span class="cha_s1">'+item.goods_name+'</span><span class="cha_s1">￥'+price+' - '+name+'</span></div></a></li>');
                        }else{
                            $("#goodslist" + cat_id).append('<li class="sever"><a href="goods.php?id=' + id + '&cat=' + cat_id + '"><div class="chan_tu"><img class="loading" src="'+img+'"/></div>' +
                                '<div class="chan_wenzi"><span class="cha_s1">'+item.goods_name+'</span><span class="cha_s1">￥'+price+' - '+name+'</span></div></a></li>');
                        }
                    })
                    click++;
                }
            });
        }
    </script>
</head>
<body>
<div class="header ">
    
    <?php echo $this->fetch('library/header.lbi'); ?>
    
    <div class="nei_ye">
    <?php $_from = $this->_var['category']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('kk', 'v');if (count($_from)):
    foreach ($_from AS $this->_var['kk'] => $this->_var['v']):
?>
        <div class="header_center" style="position:relative;" id="cat_<?php echo $this->_var['v']['cat_id']; ?>">
            <div class="inde_tu sever"><img class="loading" src="<?php echo $this->_var['v']['cat_plots']; ?>"/></div>
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
                <?php if ($this->_var['v']['count'] > 3): ?>
                
                <div style='position:absolute; top:98%; left:47.5%;'><a id='<?php echo $this->_var['v']['cat_id']; ?>' class='<?php echo $this->_var['v']['count']; ?>' href='javascript:;' onclick='loadAll(this)'>查看更多</a></div>
                <?php endif; ?>
            </div>

        </div>
        
        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
    </div></div>

    <?php echo $this->fetch('library/page_footer.lbi'); ?>
</body>
</html>