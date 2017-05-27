<?php



define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');

if ((DEBUG_MODE & 2) != 2)
{
    $smarty->caching = true;
}

 $cat_id=$_GET['id'];
 $goods = get_goods_info($cat_id);
 
$cat_arr = get_parent_cats($goods['cat_id']);
$lastarray=end($cat_arr);
$lastpid=$lastarray['cat_id'];




$goodsid=$goods['goods_id'];
$cache_id = $goods_id . '-' . $_SESSION['user_rank'].'-'.$_CFG['lang'];
$cache_id = sprintf('%X', crc32($cache_id));

if (!$smarty->is_cached('productDetail.dwt', $cache_id)){


    $smarty->assign('id',           $goods_id);
    $smarty->assign('type',         0);
    $smarty->assign('cfg',          $_CFG);

    if ($goods === false)
    {
        /* 如果没有找到任何记录则跳回到首页 */
        ecs_header("Location: ./\n");
        exit;
    }
    else
    {
	
	
        if ($goods['brand_id'] > 0)
        {
            $goods['goods_brand_url'] = build_uri('brand', array('bid'=>$goods['brand_id']), $goods['goods_brand']);
        }

     $shop_price   = $goods['shop_price'];

        $smarty->assign('goods',              $goods);
        $smarty->assign('goods_id',           $goods['goods_id']);
        $smarty->assign('promote_end_time',   $goods['gmt_end_time']);

        $keywords = "韩菲诗 护肤 化妆品 美妆";
    $description = "Hey face!韩菲诗 我们从大自然中萃取适用于肌肤的有益物质，改善传统护肤品牌的冗长、繁琐与低效，提倡简单的获取和使用，从体验到购买，从使用乃至携带，韩菲诗都能做到简洁高效、事半功倍，成就您的美丽肌肤。更多了解韩菲诗：新浪微博入口，客服热线400-622-5215！";
    $smarty->assign('keywords',        $keywords);
    $smarty->assign('description',     $description);

        $position = assign_ur_here($goods['cat_id'], $goods['goods_name']);

        /* current position */
        $smarty->assign('page_title',          $position['title']);                    // 页面标题
        $smarty->assign('ur_here',             $position['ur_here']);                  // 当前位置

        $properties = get_goods_properties($goodsid);  // 获得商品的规格和属性
		//print_r($properties["spe"][1]['values']);
	    $firstImg=$properties["spe"][1]['values'][0]['attr_org'];
     	$smarty->assign("nowpage",2);
     	$colors=getColors($goodsid);
		$smarty->assign('firstImg',$firstImg);
        $smarty->assign('colors',$colors);
		$smarty->assign('colornums',count($colors));
        $smarty->assign('properties',          $properties['pro']);                              // 商品属性
        $smarty->assign('specification',       $properties['spe']);                            // 商品规格

    }





/* 更新点击次数 */
$db->query('UPDATE ' . $ecs->table('goods') . " SET click_count = click_count + 1 WHERE goods_id = '$_REQUEST[id]'");


	//$sql = 'SELECT * FROM taihe_product WHERE id='.$cat_id;
    $pinfo=  getCatecoryInfo($goods['cat_id']);

	 $pname=getCatecoryInfo($pinfo['parent_id']);
	$pmenuname=getCatecoryInfo($pname['parent_id']);
   	
    $sql = 'SELECT * FROM taihe_product_img WHERE releave_id='.$cat_id." order by rsort asc";
	$imglist=$GLOBALS['db']->getAll($sql);
	 $pinfo['des']=implode("<br/>",explode("\n",$pinfo['product_prief']));
	for($i=0;$i<count($imglist);$i++){
	   $sql = 'SELECT * FROM taihe_product_style WHERE type='.$imglist[$i]['type']." and releave_id=".$cat_id." order by rsort asc";
	  $imglist[$i]['colors']=$GLOBALS['db']->getAll($sql);
	    $imglist[$i]['width']=count($imglist[$i]['colors']);
	 
	}
	
	$smarty->assign('now_time',  gmtime());   
	    $position = assign_ur_here();
  
    $smarty->assign('page_title',      $goods['goods_name']."--".$pinfo['cat_name']."--".$pname['cat_name']."--".$pmenuname['cat_name']."--".$position['title']);    // 页面标题
    $smarty->assign('ur_here',         $position['ur_here']);  // 当前位置

    /* meta information */
    $smarty->assign('keywords',        htmlspecialchars($_CFG['shop_keywords']));
    $smarty->assign('description',     htmlspecialchars($_CFG['shop_desc']));
	 
	 $smarty->assign("pname",$pname);
	 $smarty->assign("pmenuname",$pmenuname);
     $smarty->assign("cmenuinfo",$cmenuinfo);
    if($lastpid=="13"){
	
	 $smarty->assign("nowpage",3);
	}else{
	 $smarty->assign("nowpage",2);
	
	}

	 $smarty->assign("lastpid",$lastpid);
	 $smarty->assign("pinfo",$pinfo);
	 $smarty->assign("imglist",$imglist);
  

}

$smarty->display('productDetail.dwt');



?>