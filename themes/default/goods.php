<?php


define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');

if ((DEBUG_MODE & 2) != 2)
{
    $smarty->caching = true;
}

$affiliate = unserialize($GLOBALS['_CFG']['affiliate']);
	  $gca=getCatArticle();
		 
     $smarty->assign('article', $gca['artlist']); 
$smarty->assign('affiliate', $affiliate);

/*------------------------------------------------------ */
//-- INPUT
/*------------------------------------------------------ */

$goods_id = isset($_REQUEST['id'])  ? intval($_REQUEST['id']) : 0;

/*------------------------------------------------------ */
//-- 改变属性、数量时重新计算商品价格
/*------------------------------------------------------ */

if (!empty($_REQUEST['act']) && $_REQUEST['act'] == 'price')
{
    include('includes/cls_json.php');
	
	$goodsid=$_GET['id'];
	
	$sql="SELECT * FROM " . $ecs->table('products') . " where goods_id=".$goodsid;
	
	$filter=$db->getAll($sql);
	

	//$res['sql']=$sql;
	$filters=array();
	
	$attrid=$_GET['attr'];
	
	$t=0;
	
	for($i=0;$i<count($filter);$i++){
	  
	  $as=array();
	 $as=explode("|",$filter[$i]['goods_attr']);
	  
	if(in_array($attrid,$as)){
	  
	$filters[$t]=$as[1];
	  
	  $t++;
	  
	 }
	  
	  
	 
	}
	
	 $properties = get_goods_properties($goodsid);
     
	 $ps=$properties['spe'][3]['values'];
	 
	 $html='';
	 $t=0;
	 $initval="";
	 for($i=0;$i<count($ps);$i++){
	   if(in_array($ps[$i]['id'],$filters)){ 
	     if($t==0){
	   $html.='<li label="'.$ps[$i]['label'].'" class="colortrue current2"  onclick="changeSize('.$ps[$i]['id'].',this)"><input type="radio" value="'.$ps[$i]['id'].'" checked="checked"     id="spec_value_'.$ps[$i]['id'].'" name="spec_'.$ps[$i]['id'].'"  style="display:none">'.$ps[$i]['label'].'</li>';
	   $initval=$ps[$i]['label'];
	   }else{
	   
	      $html.='<li label="'.$ps[$i]['label'].'" class="colortrue"  onclick="changeSize('.$ps[$i]['id'].',this)"><input type="radio" value="'.$ps[$i]['id'].'"     id="spec_value_'.$ps[$i]['id'].'" name="spec_'.$ps[$i]['id'].'"  style="display:none">'.$ps[$i]['label'].'</li>';
	   }
	   $t++;
	   }else{
	   
	   //   $html.='<li label="'.$ps[$i]['label'].'" class="current"  ><input type="radio" value="'.$ps[$i]['id'].'"    id="spec_value_'.$ps[$i]['id'].'" name="spec_'.$ps[$i]['id'].'"  style="display:none">'.$ps[$i]['label'].'</li>';
	   }
	 }
    	 

    $json   = new JSON;
    $res    = array('err_msg' => '', 'result' => '', 'qty' => 1,'filter'=>$html,"initval"=>$initval);

    $attr_id    = isset($_REQUEST['attr']) ? explode(',', $_REQUEST['attr']) : array();
    $number     = (isset($_REQUEST['number'])) ? intval($_REQUEST['number']) : 1;

    if ($goods_id == 0)
    {
        $res['err_msg'] = $_LANG['err_change_attr'];
        $res['err_no']  = 1;
    }
    else
    {
        if ($number == 0)
        {
            $res['qty'] = $number = 1;
        }
        else
        {
            $res['qty'] = $number;
        }

        $shop_price  = get_final_price($goods_id, $number, true, $attr_id);
        $res['result'] = price_format($shop_price * $number);
		
		//$res['filter']=$filters;
    }

    die($json->encode($res));
}


if (!empty($_REQUEST['act']) && $_REQUEST['act'] == 'initprice')
{
    include('includes/cls_json.php');
	
	$goodsid=$_GET['id'];
	
	$sql="SELECT * FROM " . $ecs->table('products') . " where goods_id=".$goodsid;
	
	$filter=$db->getAll($sql);
	
	
	//$res['sql']=$sql;
	$filters=array();
	
	$attrid=$_GET['attr'];
	
	$t=0;
	
	$filternum=array();
	
	for($i=0;$i<count($filter);$i++){
	  
	  $as=array();
	 $as=explode("|",$filter[$i]['goods_attr']);
	  
	if(in_array($attrid,$as)){
	  
	$filters[$t]=$as[1];
	$filternum[$as[1]]=  $filter[$i]['product_number'];
	  $t++;
	  
	 }
	  
	  
	 
	}
	

	 $properties = get_goods_properties($goodsid);
     
	 $ps=$properties['spe'][3]['values'];
	 

	 $html='';
	 $t=0;
	 $initval="";
	 for($i=0;$i<count($ps);$i++){
	   if(in_array($ps[$i]['id'],$filters)){ 
	  
	   if($filternum[$ps[$i]['id']]>0){
	     if($t==0){
	   $html.='<li label="'.$ps[$i]['label'].'" class="colortrue current2"  onclick="changeSize('.$ps[$i]['id'].',this)"><input type="radio" value="'.$ps[$i]['id'].'" checked="checked"     id="spec_value_'.$ps[$i]['id'].'" name="spec_'.$ps[$i]['id'].'"  style="display:none">'.$ps[$i]['label'].'</li>';
	   $initval=$ps[$i]['label'];
	   $initid=$ps[$i]['id'];
	   }else{
	   
	      $html.='<li label="'.$ps[$i]['label'].'" class="colortrue"  onclick="changeSize('.$ps[$i]['id'].',this)"><input type="radio" value="'.$ps[$i]['id'].'"     id="spec_value_'.$ps[$i]['id'].'" name="spec_'.$ps[$i]['id'].'"  style="display:none">'.$ps[$i]['label'].'</li>';
	   }
	   $t++;
	   }
	   
	   }
	 }
	 
	 $ss=$attrid."|".$initid;

	$sql="SELECT product_number FROM " . $ecs->table('products') . " where goods_attr='".$ss."'";
	
	$ku=$db->getOne($sql);
	if(empty($ku)){
	
	 $ku=0;
	
	}

    	 

    $json   = new JSON;
    $res    = array('err_msg' => '', 'result' => '', 'qty' => 1,'filter'=>$html,"initval"=>$initval,'numbers'=>$ku);

    $attr_id    = isset($_REQUEST['attr']) ? explode(',', $_REQUEST['attr']) : array();
    $number     = (isset($_REQUEST['number'])) ? intval($_REQUEST['number']) : 1;

    if ($goods_id == 0)
    {
        $res['err_msg'] = $_LANG['err_change_attr'];
        $res['err_no']  = 1;
    }
    else
    {
        if ($number == 0)
        {
            $res['qty'] = $number = 1;
        }
        else
        {
            $res['qty'] = $number;
        }

        $shop_price  = get_final_price($goods_id, $number, true, $attr_id);
        $res['result'] = price_format($shop_price * $number);
		
		//$res['filter']=$filters;
    }

    die($json->encode($res));
}


if (!empty($_REQUEST['act']) && $_REQUEST['act'] == 'colorattr')
{
    include('includes/cls_json.php');
	
	$goodsid=$_GET['id'];
	
	$colors=$_GET['color'];
	
	$aid=$_GET['attr'];
	
	$ss=$colors."|".$aid;
	
	$sql="SELECT product_number FROM " . $ecs->table('products') . " where goods_attr='".$ss."'";
	
	$filter=$db->getOne($sql);

	if(empty($filter)){
	
	 $filter=0;
	
	}
    $json   = new JSON;
    $res    = array('err_msg' => '', 'result' => '', 'qty' => 1,'numbers'=>$filter);

    $attr_id    = isset($_REQUEST['attr']) ? explode(',', $_REQUEST['attr']) : array();
    $number     = (isset($_REQUEST['number'])) ? intval($_REQUEST['number']) : 1;

    if ($goods_id == 0)
    {
        $res['err_msg'] = $_LANG['err_change_attr'];
        $res['err_no']  = 1;
    }
    else
    {
        if ($number == 0)
        {
            $res['qty'] = $number = 1;
        }
        else
        {
            $res['qty'] = $number;
        }

        $shop_price  = get_final_price($goods_id, $number, true, $attr_id);
        $res['result'] = price_format($shop_price * $number);
		
		//$res['filter']=$filters;
    }

    die($json->encode($res));
}

/*------------------------------------------------------ */
//-- 商品购买记录ajax处理
/*------------------------------------------------------ */

if (!empty($_REQUEST['act']) && $_REQUEST['act'] == 'gotopage')
{
    include('includes/cls_json.php');

    $json   = new JSON;
    $res    = array('err_msg' => '', 'result' => '');

    $goods_id   = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 0;
    $page    = (isset($_REQUEST['page'])) ? intval($_REQUEST['page']) : 1;

    if (!empty($goods_id))
    {
        $need_cache = $GLOBALS['smarty']->caching;
        $need_compile = $GLOBALS['smarty']->force_compile;

        $GLOBALS['smarty']->caching = false;
        $GLOBALS['smarty']->force_compile = true;

        /* 商品购买记录 */
        $sql = 'SELECT u.user_name, og.goods_number, oi.add_time, IF(oi.order_status IN (2, 3, 4), 0, 1) AS order_status ' .
               'FROM ' . $ecs->table('order_info') . ' AS oi LEFT JOIN ' . $ecs->table('users') . ' AS u ON oi.user_id = u.user_id, ' . $ecs->table('order_goods') . ' AS og ' .
               'WHERE oi.order_id = og.order_id AND ' . time() . ' - oi.add_time < 2592000 AND og.goods_id = ' . $goods_id . ' ORDER BY oi.add_time DESC LIMIT ' . (($page > 1) ? ($page-1) : 0) * 5 . ',5';
        $bought_notes = $db->getAll($sql);

        foreach ($bought_notes as $key => $val)
        {
            $bought_notes[$key]['add_time'] = local_date("Y-m-d G:i:s", $val['add_time']);
        }

        $sql = 'SELECT count(*) ' .
               'FROM ' . $ecs->table('order_info') . ' AS oi LEFT JOIN ' . $ecs->table('users') . ' AS u ON oi.user_id = u.user_id, ' . $ecs->table('order_goods') . ' AS og ' .
               'WHERE oi.order_id = og.order_id AND ' . time() . ' - oi.add_time < 2592000 AND og.goods_id = ' . $goods_id;
        $count = $db->getOne($sql);


        /* 商品购买记录分页样式 */
        $pager = array();
        $pager['page']         = $page;
        $pager['size']         = $size = 5;
        $pager['record_count'] = $count;
        $pager['page_count']   = $page_count = ($count > 0) ? intval(ceil($count / $size)) : 1;;
        $pager['page_first']   = "javascript:gotoBuyPage(1,$goods_id)";
        $pager['page_prev']    = $page > 1 ? "javascript:gotoBuyPage(" .($page-1). ",$goods_id)" : 'javascript:;';
        $pager['page_next']    = $page < $page_count ? 'javascript:gotoBuyPage(' .($page + 1) . ",$goods_id)" : 'javascript:;';
        $pager['page_last']    = $page < $page_count ? 'javascript:gotoBuyPage(' .$page_count. ",$goods_id)"  : 'javascript:;';

        $smarty->assign('notes', $bought_notes);
        $smarty->assign('pager', $pager);


        $res['result'] = $GLOBALS['smarty']->fetch('library/bought_notes.lbi');

        $GLOBALS['smarty']->caching = $need_cache;
        $GLOBALS['smarty']->force_compile = $need_compile;
    }

    die($json->encode($res));
}


/*------------------------------------------------------ */
//-- PROCESSOR
/*------------------------------------------------------ */
$goods = get_goods_info($goods_id);
$cat_id=$goods['cat_id'];

$goodsid=$goods['goods_id'];
$cache_id = $goods_id . '-' . $_SESSION['user_rank'].'-'.$_CFG['lang'];
$cache_id = sprintf('%X', crc32($cache_id));

    $smarty->assign('image_width',  $_CFG['image_width']);
    $smarty->assign('image_height', $_CFG['image_height']);
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
        $linked_goods = get_linked_goods($goods_id);
		
			foreach($linked_goods as $key=>$val){
	
	  $sqls="SELECT a.attr_value,a.color FROM " . $ecs->table('goods_attr') . " AS a where a.attr_id=1 and a.goods_id=".$val['goods_id'];
	  
	   $linked_goods[$key]['attr']=$db->getAll($sqls);
	   $linked_goods[$key]['keys']=$t;
	   	 $goods_crank  = get_goods_comment_ranks($val['goods_id']);
	   $linked_goods[$key]['widths']=count($linked_goods[$key]['attr'])*14;
	   $linked_goods[$key]['startwidth']=$goods_crank*10;
	   $t++;
	}
 
    $str = str_replace("\n", "", $goods['goods_brief']);
    $strs = str_replace("\r", "", $str);
	$goods['goods_brief_str']=$strs;
        $goods['goods_style_name'] = add_style($goods['goods_name'], $goods['goods_name_style']);

        /* 购买该商品可以得到多少钱的红包 */
        if ($goods['bonus_type_id'] > 0)
        {
            $time = gmtime();
            $sql = "SELECT type_money FROM " . $ecs->table('bonus_type') .
                    " WHERE type_id = '$goods[bonus_type_id]' " .
                    " AND send_type = '" . SEND_BY_GOODS . "' " .
                    " AND send_start_date <= '$time'" .
                    " AND send_end_date >= '$time'";
            $goods['bonus_money'] = floatval($db->getOne($sql));
            if ($goods['bonus_money'] > 0)
            {
                $goods['bonus_money'] = price_format($goods['bonus_money']);
            }
        }

	    $catinfo=$db->getRow("SELECT * FROM " . $ecs->table('category') ." where cat_id=".$goods['cat_id']);
	    $smarty->assign('catinfo',              $catinfo);
        $smarty->assign('goods',              $goods);
        $smarty->assign('goods_id',           $goods['goods_id']);
        $smarty->assign('promote_end_time',   $goods['gmt_end_time']);
       // $smarty->assign('categories',         get_categories_tree($goods['cat_id']));  // 分类树

        /* meta */
        $smarty->assign('keywords',           htmlspecialchars($goods['keywords']));
        $smarty->assign('description',        htmlspecialchars($goods['goods_brief']));

        $prev_gid = $db->getOne("SELECT goods_id FROM " .$ecs->table('goods'). " WHERE cat_id=" . $cat_id. " AND goods_id > " . $goodsid . " AND is_on_sale = 1 AND is_alone_sale = 1 AND is_delete = 0 LIMIT 1");
  

      $smarty->assign("prev_gid",$prev_gid);
        $next_gid = $db->getOne("SELECT max(goods_id) FROM " . $ecs->table('goods') . " WHERE cat_id=".$cat_id." AND goods_id < ".$goodsid  . " AND is_on_sale = 1 AND is_alone_sale = 1 AND is_delete = 0");

$smarty->assign("next_gid",$next_gid);
        $position = assign_ur_here($goods['cat_id'], $goods['goods_name']);
       
	 
	   
	  if(preg_match("/女士/",$position['title'])){
	  
	     $npage=2;
	  }elseif(preg_match("/男士/",$position['title'])){
	  
	    $npage=1;
	  }
	     $smarty->assign('npage',$npage);    
        /* current position */
        $smarty->assign('page_title',          $position['title']);                    // 页面标题
        $smarty->assign('ur_here',             $position['ur_here']);                  // 当前位置

        $properties = get_goods_properties($goods_id);  // 获得商品的规格和属性
	   
	    $colorfirst=array();
		
	    for($spes=0;$i<count($properties['spe']);$i++){
		 
		  if($properties['spe'][$i]['name']=="颜色"){
		      
			 
			  $colorfirst['attr_thumb']=$properties['spe'][$i]['values'][0]['attr_thumb'];
			    $colorfirst['label']=$properties['spe'][$i]['values'][0]['label'];
			  $colorfirst['attr_org']=$properties['spe'][$i]['values'][0]['attr_org'];
			   
			
		  
		  }
		
		}
	
     	$colors=getColors($goods_id);
        $smarty->assign('colors',$colors);
		$smarty->assign('colornums',count($colors));
        $smarty->assign('properties',          $properties['pro']);                              // 商品属性
        $smarty->assign('specification',       $properties['spe']);                            // 商品规格
        $smarty->assign('attribute_linked',    get_same_attribute_goods($properties));   
		if(count($linked_goods)>0){
			 $smarty->assign('related_goods',       $linked_goods);    
				 $smarty->assign('count_related_goods',count($linked_goods));  
		}else{
		
	   $rsql="SELECT * FROM ". $ecs->table('goods')."  WHERE cat_id=".$goods['cat_id']." and goods_id >= (SELECT floor( RAND() * ((SELECT MAX(goods_id) FROM ". $ecs->table('goods')."  )- (SELECT MIN(goods_id) FROM ". $ecs->table('goods')."  )) + (SELECT MIN(goods_id) FROM ". $ecs->table('goods')."  ))) ORDER BY goods_id LIMIT 10";
         $linkdsid=$db->getAll($rsql);
		 
		 		 $smarty->assign('related_goods',       $linkdsid);    
				 		 $smarty->assign('count_related_goods',count($linkdsid));  
		}        
        $smarty->assign('goods_article_list',  get_linked_articles($goods_id));                  // 关联文章
        $smarty->assign('fittings',            get_goods_fittings(array($goods_id)));                   // 配件
        $smarty->assign('rank_prices',         get_user_rank_prices($goods_id, $shop_price));    // 会员等级价格
		$goodgarray=get_goods_gallery($goods_id);
		
        $smarty->assign('pictures',$goodgarray);                    // 商品相册
	
				 $smarty->assign('colorfirst',$colorfirst);

       // assign_dynamic('goods');
        $volume_price_list = get_volume_price_list($goods['goods_id'], '1');
        $smarty->assign('volume_price_list',$volume_price_list);    // 商品优惠价格区间
    }


/* 记录浏览历史 */
if (!empty($_COOKIE['ECS']['history']))
{
    $history = explode(',', $_COOKIE['ECS']['history']);

    array_unshift($history, $goods_id);
    $history = array_unique($history);
	


    while (count($history) > $_CFG['history_number'])
    {
        array_pop($history);
    }

    setcookie('ECS[history]', implode(',', $history), gmtime() + 3600 * 24 * 30);
}
else
{
    setcookie('ECS[history]', $goods_id, gmtime() + 3600 * 24 * 30);
}
$hiscount=count($history);
$historygoods=array();
 for($i=0;$i<$hiscount;$i++){
 
         $historygoods[$i]=get_goods_info($history[$i]);
$sqls="SELECT a.attr_value,a.color FROM " . $ecs->table('goods_attr') . " AS a where a.attr_id=1 and a.goods_id=".$goods_id;
 $historygoods[$i]['attr']= $GLOBALS['db']->getAll($sqls);


 
 }
 
 
 
 $regoods=category_related_random_goods($cat_id);
 $regoodss=array();
 $godcount=0;
  foreach($regoods as $key=>$val){
 $regoodss[$key]=$val;
  $sqls="SELECT a.attr_value,a.color,a.attr_org FROM " . $ecs->table('goods_attr') . " AS a where a.attr_id=1 and a.goods_id=".$val['goods_id'];
$regoodss[$key]['attr']= $GLOBALS['db']->getAll($sqls);

	   	 $goods_crank  = get_goods_comment_ranks($val['goods_id']);
	    $regoodss[$key]['widths']=count($regoodss[$key]['attr'])*14;
	     $regoodss[$key]['startwidth']=$goods_crank*10;
   $godcount++;
 }
 
 
 $sqls="SELECT * FROM " . $ecs->table('article') . " AS a where a.cat_id=31 order by article_id desc limit 0,1";
 $ps= $GLOBALS['db']->getRow($sqls);
    $comments = assign_comment($goods_id, 0,1);
	

  $ismobile=is_mobile();

    $smarty->assign('comments',     $comments['comments']);
    $smarty->assign('pager',        $comments['pager']);
  $smarty->assign('ps',  $ps);  
 $smarty->assign('godcount',  $godcount);  
  $smarty->assign('ismobile',  $ismobile);  
 $smarty->assign('regoods',  $regoodss);  
 $smarty->assign('historygoods',  $historygoods);  
$smarty->assign('hiscount',  $hiscount);   

/* 更新点击次数 */
$db->query('UPDATE ' . $ecs->table('goods') . " SET click_count = click_count + 1 WHERE goods_id = '$_REQUEST[id]'");

$smarty->assign('now_time',  gmtime());           // 当前系统时间
$smarty->display('productDetail.dwt');

	function is_mobile() {
$user_agent = $_SERVER['HTTP_USER_AGENT'];


$mobile_browser = Array(
"mqqbrowser", //手机QQ浏览器
"opera mobi", //手机opera
"juc","iuc",//uc浏览器
"fennec","ios","applewebKit/420","applewebkit/525","applewebkit/532","ipad","iphone","ipaq","ipod",
"iemobile", "windows ce",//windows phone
"240x320","480x640","acer","android","anywhereyougo.com","asus","audio","BlackBerry OS","blackberry","blazer","coolpad" ,"dopod", "etouch", "hitachi","htc","huawei", "jbrowser", "lenovo","lg","lg-","lge-","lge", "mobi","moto","nokia","phone","samsung","sony","symbian","tablet","tianyu","wap","xda","xde","zte"
);
$is_mobile =2;
foreach ($mobile_browser as $device) {
if (stristr($user_agent, $device)) {
$is_mobile = 1;
break;
}
}
return $is_mobile;
}


/*------------------------------------------------------ */
//-- PRIVATE FUNCTION
/*------------------------------------------------------ */


/**
 * 获得指定商品的关联商品
 *
 * @access  public
 * @param   integer     $goods_id
 * @return  array
 */
function get_linked_goods($goods_id)
{
    $sql = 'SELECT g.goods_id, g.goods_name,g.brand_id, g.goods_thumb, g.goods_img, g.shop_price AS org_price, ' .
                "IFNULL(mp.user_price, g.shop_price * '$_SESSION[discount]') AS shop_price, ".
                'g.market_price, g.promote_price, g.promote_start_date, g.promote_end_date ' .
            'FROM ' . $GLOBALS['ecs']->table('link_goods') . ' lg ' .
            'LEFT JOIN ' . $GLOBALS['ecs']->table('goods') . ' AS g ON g.goods_id = lg.link_goods_id ' .
            "LEFT JOIN " . $GLOBALS['ecs']->table('member_price') . " AS mp ".
                    "ON mp.goods_id = g.goods_id AND mp.user_rank = '$_SESSION[user_rank]' ".
            "WHERE lg.goods_id = '$goods_id' AND g.is_on_sale = 1 AND g.is_alone_sale = 1 AND g.is_delete = 0 ".
            "LIMIT 20";
    $res = $GLOBALS['db']->query($sql);

    $arr = array();
    while ($row = $GLOBALS['db']->fetchRow($res))
    {
        $arr[$row['goods_id']]['goods_id']     = $row['goods_id'];
        $arr[$row['goods_id']]['goods_name']   = $row['goods_name'];
        $arr[$row['goods_id']]['short_name']   = $GLOBALS['_CFG']['goods_name_length'] > 0 ?
            sub_str($row['goods_name'], $GLOBALS['_CFG']['goods_name_length']) : $row['goods_name'];
        $arr[$row['goods_id']]['goods_thumb']  = get_image_path($row['goods_id'], $row['goods_thumb'], true);
        $arr[$row['goods_id']]['goods_img']    = get_image_path($row['goods_id'], $row['goods_img']);
        $arr[$row['goods_id']]['market_price'] = price_format($row['market_price']);
        $arr[$row['goods_id']]['shop_price']   = price_format($row['shop_price']);
        $arr[$row['goods_id']]['url']          = build_uri('goods', array('gid'=>$row['goods_id']), $row['goods_name']);
	$arr[$row['goods_id']]['brand_name']=$GLOBALS['db']->getOne("SELECT brand_name FROM " .$GLOBALS['ecs']->table('brand')." where brand_id=".$row['brand_id']);
        if ($row['promote_price'] > 0)
        {
            $arr[$row['goods_id']]['promote_price'] = bargain_price($row['promote_price'], $row['promote_start_date'], $row['promote_end_date']);
            $arr[$row['goods_id']]['formated_promote_price'] = price_format($arr[$row['goods_id']]['promote_price']);
        }
        else
        {
            $arr[$row['goods_id']]['promote_price'] = 0;
        }
    }

    return $arr;
}

/**
 * 获得指定商品的关联文章
 *
 * @access  public
 * @param   integer     $goods_id
 * @return  void
 */
function get_linked_articles($goods_id)
{
    $sql = 'SELECT a.article_id, a.title, a.file_url, a.open_type, a.add_time ' .
            'FROM ' . $GLOBALS['ecs']->table('goods_article') . ' AS g, ' .
                $GLOBALS['ecs']->table('article') . ' AS a ' .
            "WHERE g.article_id = a.article_id AND g.goods_id = '$goods_id' AND a.is_open = 1 " .
            'ORDER BY a.add_time DESC';
    $res = $GLOBALS['db']->query($sql);

    $arr = array();
    while ($row = $GLOBALS['db']->fetchRow($res))
    {
        $row['url']         = $row['open_type'] != 1 ?
            build_uri('article', array('aid'=>$row['article_id']), $row['title']) : trim($row['file_url']);
        $row['add_time']    = local_date($GLOBALS['_CFG']['date_format'], $row['add_time']);
        $row['short_title'] = $GLOBALS['_CFG']['article_title_length'] > 0 ?
            sub_str($row['title'], $GLOBALS['_CFG']['article_title_length']) : $row['title'];

        $arr[] = $row;
    }

    return $arr;
}

/**
 * 获得指定商品的各会员等级对应的价格
 *
 * @access  public
 * @param   integer     $goods_id
 * @return  array
 */
function get_user_rank_prices($goods_id, $shop_price)
{
    $sql = "SELECT rank_id, IFNULL(mp.user_price, r.discount * $shop_price / 100) AS price, r.rank_name, r.discount " .
            'FROM ' . $GLOBALS['ecs']->table('user_rank') . ' AS r ' .
            'LEFT JOIN ' . $GLOBALS['ecs']->table('member_price') . " AS mp ".
                "ON mp.goods_id = '$goods_id' AND mp.user_rank = r.rank_id " .
            "WHERE r.show_price = 1 OR r.rank_id = '$_SESSION[user_rank]'";
    $res = $GLOBALS['db']->query($sql);

    $arr = array();
    while ($row = $GLOBALS['db']->fetchRow($res))
    {

        $arr[$row['rank_id']] = array(
                        'rank_name' => htmlspecialchars($row['rank_name']),
                        'price'     => price_format($row['price']));
    }

    return $arr;
}

/**
 * 获得购买过该商品的人还买过的商品
 *
 * @access  public
 * @param   integer     $goods_id
 * @return  array
 */
function get_also_bought($goods_id)
{
    $sql = 'SELECT COUNT(b.goods_id ) AS num, g.goods_id, g.goods_name, g.goods_thumb, g.goods_img, g.shop_price, g.promote_price, g.promote_start_date, g.promote_end_date ' .
            'FROM ' . $GLOBALS['ecs']->table('order_goods') . ' AS a ' .
            'LEFT JOIN ' . $GLOBALS['ecs']->table('order_goods') . ' AS b ON b.order_id = a.order_id ' .
            'LEFT JOIN ' . $GLOBALS['ecs']->table('goods') . ' AS g ON g.goods_id = b.goods_id ' .
            "WHERE a.goods_id = '$goods_id' AND b.goods_id <> '$goods_id' AND g.is_on_sale = 1 AND g.is_alone_sale = 1 AND g.is_delete = 0 " .
            'GROUP BY b.goods_id ' .
            'ORDER BY num DESC ' .
            'LIMIT ' . $GLOBALS['_CFG']['bought_goods'];
    $res = $GLOBALS['db']->query($sql);

    $key = 0;
    $arr = array();
    while ($row = $GLOBALS['db']->fetchRow($res))
    {
        $arr[$key]['goods_id']    = $row['goods_id'];
        $arr[$key]['goods_name']  = $row['goods_name'];
        $arr[$key]['short_name']  = $GLOBALS['_CFG']['goods_name_length'] > 0 ?
            sub_str($row['goods_name'], $GLOBALS['_CFG']['goods_name_length']) : $row['goods_name'];
        $arr[$key]['goods_thumb'] = get_image_path($row['goods_id'], $row['goods_thumb'], true);
        $arr[$key]['goods_img']   = get_image_path($row['goods_id'], $row['goods_img']);
        $arr[$key]['shop_price']  = price_format($row['shop_price']);
        $arr[$key]['url']         = build_uri('goods', array('gid'=>$row['goods_id']), $row['goods_name']);

        if ($row['promote_price'] > 0)
        {
            $arr[$key]['promote_price'] = bargain_price($row['promote_price'], $row['promote_start_date'], $row['promote_end_date']);
            $arr[$key]['formated_promote_price'] = price_format($arr[$key]['promote_price']);
        }
        else
        {
            $arr[$key]['promote_price'] = 0;
        }

        $key++;
    }

    return $arr;
}

/**
 * 获得指定商品的销售排名
 *
 * @access  public
 * @param   integer     $goods_id
 * @return  integer
 */
function get_goods_rank($goods_id)
{
    /* 统计时间段 */
    $period = intval($GLOBALS['_CFG']['top10_time']);
    if ($period == 1) // 一年
    {
        $ext = " AND o.add_time > '" . local_strtotime('-1 years') . "'";
    }
    elseif ($period == 2) // 半年
    {
        $ext = " AND o.add_time > '" . local_strtotime('-6 months') . "'";
    }
    elseif ($period == 3) // 三个月
    {
        $ext = " AND o.add_time > '" . local_strtotime('-3 months') . "'";
    }
    elseif ($period == 4) // 一个月
    {
        $ext = " AND o.add_time > '" . local_strtotime('-1 months') . "'";
    }
    else
    {
        $ext = '';
    }

    /* 查询该商品销量 */
    $sql = 'SELECT IFNULL(SUM(g.goods_number), 0) ' .
        'FROM ' . $GLOBALS['ecs']->table('order_info') . ' AS o, ' .
            $GLOBALS['ecs']->table('order_goods') . ' AS g ' .
        "WHERE o.order_id = g.order_id " .
        "AND o.order_status = '" . OS_CONFIRMED . "' " .
        "AND o.shipping_status " . db_create_in(array(SS_SHIPPED, SS_RECEIVED)) .
        " AND o.pay_status " . db_create_in(array(PS_PAYED, PS_PAYING)) .
        " AND g.goods_id = '$goods_id'" . $ext;
    $sales_count = $GLOBALS['db']->getOne($sql);

    if ($sales_count > 0)
    {
        /* 只有在商品销售量大于0时才去计算该商品的排行 */
        $sql = 'SELECT DISTINCT SUM(goods_number) AS num ' .
                'FROM ' . $GLOBALS['ecs']->table('order_info') . ' AS o, ' .
                    $GLOBALS['ecs']->table('order_goods') . ' AS g ' .
                "WHERE o.order_id = g.order_id " .
                "AND o.order_status = '" . OS_CONFIRMED . "' " .
                "AND o.shipping_status " . db_create_in(array(SS_SHIPPED, SS_RECEIVED)) .
                " AND o.pay_status " . db_create_in(array(PS_PAYED, PS_PAYING)) . $ext .
                " GROUP BY g.goods_id HAVING num > $sales_count";
        $res = $GLOBALS['db']->query($sql);

        $rank = $GLOBALS['db']->num_rows($res) + 1;

        if ($rank > 10)
        {
            $rank = 0;
        }
    }
    else
    {
        $rank = 0;
    }

    return $rank;
}

/**
 * 获得商品选定的属性的附加总价格
 *
 * @param   integer     $goods_id
 * @param   array       $attr
 *
 * @return  void
 */
function get_attr_amount($goods_id, $attr)
{
    $sql = "SELECT SUM(attr_price) FROM " . $GLOBALS['ecs']->table('goods_attr') .
        " WHERE goods_id='$goods_id' AND " . db_create_in($attr, 'goods_attr_id');

    return $GLOBALS['db']->getOne($sql);
}

/**
 * 取得跟商品关联的礼包列表
 *
 * @param   string  $goods_id    商品编号
 *
 * @return  礼包列表
 */
function get_package_goods_list($goods_id)
{

    $now = gmtime();
    $sql = "SELECT pg.goods_id, ga.act_id, ga.act_name, ga.act_desc, ga.goods_name, ga.start_time,
                   ga.end_time, ga.is_finished, ga.ext_info
            FROM " . $GLOBALS['ecs']->table('goods_activity') . " AS ga, " . $GLOBALS['ecs']->table('package_goods') . " AS pg
            WHERE pg.package_id = ga.act_id
            AND ga.start_time <= '" . $now . "'
            AND ga.end_time >= '" . $now . "'
            AND pg.goods_id = " . $goods_id . "
            GROUP BY ga.act_id
            ORDER BY ga.act_id";
    $res = $GLOBALS['db']->getAll($sql);

    foreach ($res as $tempkey => $value)
    {
        $subtotal = 0;
        $row = unserialize($value['ext_info']);
        unset($value['ext_info']);
        if ($row)
        {
            foreach ($row as $key=>$val)
            {
                $res[$tempkey][$key] = $val;
            }
        }

        $sql = "SELECT g.shop_price,pg.package_id, pg.goods_id, pg.goods_number, pg.admin_id, p.goods_attr, g.goods_sn, g.goods_name, g.market_price, g.goods_thumb,g.brand_id, IFNULL(mp.user_price, g.shop_price * '$_SESSION[discount]') AS rank_price
                FROM " . $GLOBALS['ecs']->table('package_goods') . " AS pg
                    LEFT JOIN ". $GLOBALS['ecs']->table('goods') . " AS g
                        ON g.goods_id = pg.goods_id
                    LEFT JOIN ". $GLOBALS['ecs']->table('products') . " AS p
                        ON p.product_id = pg.product_id
                    LEFT JOIN " . $GLOBALS['ecs']->table('member_price') . " AS mp
                        ON mp.goods_id = g.goods_id AND mp.user_rank = '$_SESSION[user_rank]'
                WHERE pg.package_id = " . $value['act_id']. "
                ORDER BY pg.package_id, pg.goods_id";

        $goods_res = $GLOBALS['db']->getAll($sql);

        foreach($goods_res as $key => $val)
        {
            $goods_id_array[] = $val['goods_id'];
            $goods_res[$key]['goods_thumb']  = get_image_path($val['goods_id'], $val['goods_thumb'], true);
            $goods_res[$key]['market_price'] = price_format($val['market_price']);
            $goods_res[$key]['rank_price']   = price_format($val['rank_price']);
            $subtotal += $val['rank_price'] * $val['goods_number'];
			$goods_res[$key]['brand_name']=$GLOBALS['db']->getOne("SELECT brand_name FROM " .$GLOBALS['ecs']->table('brand')." where brand_id=".$val['brand_id']);
        }

        /* 取商品属性 */
        $sql = "SELECT ga.goods_attr_id, ga.attr_value
                FROM " .$GLOBALS['ecs']->table('goods_attr'). " AS ga, " .$GLOBALS['ecs']->table('attribute'). " AS a
                WHERE a.attr_id = ga.attr_id
                AND a.attr_type = 1
                AND " . db_create_in($goods_id_array, 'goods_id');
        $result_goods_attr = $GLOBALS['db']->getAll($sql);

        $_goods_attr = array();
        foreach ($result_goods_attr as $value)
        {
            $_goods_attr[$value['goods_attr_id']] = $value['attr_value'];
        }

        /* 处理货品 */
        $format = '[%s]';
        foreach($goods_res as $key => $val)
        {
            if ($val['goods_attr'] != '')
            {
                $goods_attr_array = explode('|', $val['goods_attr']);

                $goods_attr = array();
                foreach ($goods_attr_array as $_attr)
                {
                    $goods_attr[] = $_goods_attr[$_attr];
                }

                $goods_res[$key]['goods_attr_str'] = sprintf($format, implode('，', $goods_attr));
            }
        }

        $res[$tempkey]['goods_list']    = $goods_res;
        $res[$tempkey]['subtotal']      = price_format($subtotal);
        $res[$tempkey]['saving']        = price_format(($subtotal - $res[$tempkey]['package_price']));
        $res[$tempkey]['package_price'] = price_format($res[$tempkey]['package_price']);
    }

    return $res;
}





function getColorPrice($id){

 if($id>0){
 
    $sql="SELECT price FROM ".$GLOBALS['ecs']->table('goods_color')." WHERE id=".$id;
  
  
    $price=$GLOBALS['db']->getOne($sql);
	
	
 
 }
 
 

  return $price;

}
function get_goods_comment_ranks($goods_id)
{
 if (empty($goods_id))
    {
        return '5';
    }

    $sql = "select AVG(comment_rank) as goods_crank   from ". $GLOBALS['ecs']->table('comment') .
        " where id_value ='$goods_id' AND comment_type = 0 AND parent_id = 0 AND status = 1";
 $val = $GLOBALS['db']->getOne($sql);
 $val = ceil($val) == 0 ? 5 : ceil($val);

    return $val;
}

function category_related_random_goods($category_id)
{
    $where = "g.is_on_sale = 1 AND g.is_alone_sale = 1 AND ".
            "g.is_delete = 0 AND g.cat_id=$category_id ";
    $sql = 'SELECT g.goods_id, g.goods_name, g.goods_name_style, g.market_price, g.is_new, g.is_best, g.is_hot, g.shop_price AS org_price, ' .
                "IFNULL(mp.user_price, g.shop_price * '$_SESSION[discount]') AS shop_price, g.promote_price, g.goods_type, " .
                'g.promote_start_date, g.promote_end_date, g.goods_brief, g.goods_thumb , g.goods_img ' .
            'FROM ' . $GLOBALS['ecs']->table('goods') . ' AS g ' .
            'LEFT JOIN ' . $GLOBALS['ecs']->table('member_price') . ' AS mp ' .
                "ON mp.goods_id = g.goods_id AND mp.user_rank = '$_SESSION[user_rank]' " .
            "WHERE $where ORDER BY rand() limit 5";
    $res = $GLOBALS['db']->query($sql);
    $arr = array();
    while ($row = $GLOBALS['db']->fetchRow($res))
    {
        $arr[$row['goods_id']]['goods_id']     = $row['goods_id'];
        $arr[$row['goods_id']]['goods_name']   = $row['goods_name'];
        $arr[$row['goods_id']]['short_name']   = $GLOBALS['_CFG']['goods_name_length'] > 0 ?
            sub_str($row['goods_name'], $GLOBALS['_CFG']['goods_name_length']) : $row['goods_name'];
        $arr[$row['goods_id']]['goods_thumb']  = get_image_path($row['goods_id'], $row['goods_thumb'], true);
        $arr[$row['goods_id']]['goods_img']    = get_image_path($row['goods_id'], $row['goods_img']);
        $arr[$row['goods_id']]['market_price'] = price_format($row['market_price']);
        $arr[$row['goods_id']]['shop_price']   = price_format($row['shop_price']);
        $arr[$row['goods_id']]['url']          = build_uri('goods', array('gid'=>$row['goods_id']), $row['goods_name']);
        if ($row['promote_price'] > 0)
        {
            $arr[$row['goods_id']]['promote_price'] = bargain_price($row['promote_price'], $row['promote_start_date'], $row['promote_end_date']);
            $arr[$row['goods_id']]['formated_promote_price'] = price_format($arr[$row['goods_id']]['promote_price']);
        }
        else
        {
            $arr[$row['goods_id']]['promote_price'] = 0;
        }
    }
    return $arr;
}

?>