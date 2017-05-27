<?php




define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');

if ((DEBUG_MODE & 2) != 2)
{
    $smarty->caching = true;
}
 
    $is_mobile = is_mobile();
    $position = assign_ur_here();

    $smarty->assign('page_title',      $position['title']);    // 页面标题
    $smarty->assign('ur_here',         $position['ur_here']);  // 当前位置

    /* meta information */
    $keywords = "韩菲诗 护肤 化妆品 美妆";
    $description = "Hey face!韩菲诗 我们从大自然中萃取适用于肌肤的有益物质，改善传统护肤品牌的冗长、繁琐与低效，提倡简单的获取和使用，从体验到购买，从使用乃至携带，韩菲诗都能做到简洁高效、事半功倍，成就您的美丽肌肤。更多了解韩菲诗：新浪微博入口，客服热线400-622-5215！";
    $smarty->assign('keywords',        $keywords);
    $smarty->assign('description',     $description);

	 $sql = 'SELECT * FROM '.$ecs->table('lunbo').'order by resort asc';

	 $photolist= $GLOBALS['db']->getAll($sql);

foreach($photolist as $k => $v){
    $descript = !empty($v['descript']) ? $v['descript'] : $v['endescript'];
    $arr = explode("\n" , $descript);
    $photolist[$k]['miaoshu'] = implode("<br/>" , $arr);
}




$sql = 'select cat_plots,cat_enname,cat_name,cat_endesc,cat_id from ' . $ecs->table('category') . 'order by sort_order';
$category = $GLOBALS['db']->getAll($sql);
$data = [];
foreach($category as $k => $v){
    
    if ($is_mobile) {
        $sql = "select goods_id,cat_id,xingou_id,goods_name from " . $ecs->table('goods') . " where is_delete=0 and is_on_sale=1 and cat_id = " . $v['cat_id'] . " limit 0,2";
        
    }else{
        $sql = "select goods_id,cat_id,xingou_id,goods_name from " . $ecs->table('goods') . " where is_delete=0 and is_on_sale=1 and cat_id = " . $v['cat_id'] . " limit 0,3";
    }
    $goods = $db->getAll($sql);

    $sqll = "select count(*) from ". $ecs->table('goods'). " where is_delete=0 and cat_id = ". $v['cat_id'];
    $count = $db->getOne($sqll);
    foreach($goods as $kk => $vv){
        $goodsInfo = json_decode(getInfo($vv['xingou_id']),true);

        $goodsoff = $goodsInfo['data']['goodoff'];
        $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
        $name = $goodsInfo['data']['details'][$item_id]['name'];
        $goodsInfo['name'] = $name;
        $goods[$kk]['goodsinfo'] = $goodsInfo;
        if ($goodsoff == 1) {

            unset($goods[$kk]);

        }
    }

    //var_dump($goods);

    $cat_endesc = !empty($v['cat_desc']) ? $v['cat_desc'] : $v['cat_endesc'];
    $arr = explode("\n" , $cat_endesc);
    $data[$k]['cat_plots'] = $v['cat_plots'];
    $data[$k]['cat_enname'] = $v['cat_enname'];
    $data[$k]['cat_name'] = $v['cat_name'];
    $data[$k]['cat_endesc'] = implode("<br/>" , $arr);
    $data[$k]['cat_id'] = $v['cat_id'];
    $data[$k]['goods'] = $goods;
    $data[$k]['count'] = $count;

}




	$count=count($photolist);


	$smarty->assign("photolist",$photolist);



	$smarty->assign("states",$states);
	$smarty->assign("count",$count);
    //$smart->assign('category',$category);
    $smarty->assign("category",$data);

if($is_mobile){
    $smarty->display('mobile/has-index.dwt');
}else {
    $smarty->display('index.dwt');
}

//function getInfo($id)
//{
//    $url = 'http://api.xingou.net.cn/hanfeishi/info?id=' . $id;
//
//    $ch = curl_init();
//    curl_setopt($ch, CURLOPT_URL, $url);
//    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
//    curl_setopt($ch, CURLOPT_POST, 1); //启用POST提交
//    $file_contents = curl_exec($ch);
//    curl_close($ch);
//    return $file_contents;
//}
/*------------------------------------------------------ */
//-- PRIVATE FUNCTIONS
/*------------------------------------------------------ */

/**
 * 调用发货单查询
 *
 * @access  private
 * @return  array
 */
function index_get_invoice_query()
{
    $sql = 'SELECT o.order_sn, o.invoice_no, s.shipping_code FROM ' . $GLOBALS['ecs']->table('order_info') . ' AS o' .
            ' LEFT JOIN ' . $GLOBALS['ecs']->table('shipping') . ' AS s ON s.shipping_id = o.shipping_id' .
            " WHERE invoice_no > '' AND shipping_status = " . SS_SHIPPED .
            ' ORDER BY shipping_time DESC LIMIT 10';
    $all = $GLOBALS['db']->getAll($sql);

    foreach ($all AS $key => $row)
    {
        $plugin = ROOT_PATH . 'includes/modules/shipping/' . $row['shipping_code'] . '.php';

        if (file_exists($plugin))
        {
            include_once($plugin);

            $shipping = new $row['shipping_code'];
            $all[$key]['invoice_no'] = $shipping->query((string)$row['invoice_no']);
        }
    }

    clearstatcache();

    return $all;
}

/**
 * 获得最新的文章列表。
 *
 * @access  private
 * @return  array
 */
function index_get_new_articles()
{
    $sql = 'SELECT a.article_id, a.title, ac.cat_name, a.add_time, a.file_url, a.open_type, ac.cat_id, ac.cat_name ' .
            ' FROM ' . $GLOBALS['ecs']->table('article') . ' AS a, ' .
                $GLOBALS['ecs']->table('article_cat') . ' AS ac' .
            ' WHERE a.is_open = 1 AND a.cat_id = ac.cat_id AND ac.cat_type = 1' .
            ' ORDER BY a.article_type DESC, a.add_time DESC LIMIT ' . $GLOBALS['_CFG']['article_number'];
    $res = $GLOBALS['db']->getAll($sql);

    $arr = array();
    foreach ($res AS $idx => $row)
    {
        $arr[$idx]['id']          = $row['article_id'];
        $arr[$idx]['title']       = $row['title'];
        $arr[$idx]['short_title'] = $GLOBALS['_CFG']['article_title_length'] > 0 ?
                                        sub_str($row['title'], $GLOBALS['_CFG']['article_title_length']) : $row['title'];
        $arr[$idx]['cat_name']    = $row['cat_name'];
        $arr[$idx]['add_time']    = local_date($GLOBALS['_CFG']['date_format'], $row['add_time']);
        $arr[$idx]['url']         = $row['open_type'] != 1 ?
                                        build_uri('article', array('aid' => $row['article_id']), $row['title']) : trim($row['file_url']);
        $arr[$idx]['cat_url']     = build_uri('article_cat', array('acid' => $row['cat_id']), $row['cat_name']);
    }

    return $arr;
}


function getIndexBanner(){

$indexinfo=array();

$sql="SELECT * FROM ". $GLOBALS['ecs']->table('home')." limit 1 ";

$indexinfo['adinfo']=$GLOBALS['db']->getRow($sql);

$sql="SELECT * FROM ". $GLOBALS['ecs']->table('home_img')."  order by resort asc";

$indexinfo['lubolist']=$GLOBALS['db']->getAll($sql);

return $indexinfo;
}


function getIndexArticle($cat_id,$index){

  $sql="SELECT * FROM  ". $GLOBALS['ecs']->table('article')." where is_open=1 and  is_show=1  and  cat_id=".$cat_id." order by article_id desc";

  $artticleAttr=$GLOBALS['db']->getAll($sql);

  if($index){

    for($i=0;$i<count($artticleAttr);$i++){



	  $artticleAttr[$i]['index']=$i%3+1;

	}

  }



  return $artticleAttr;


}


/**
 * 获得所有的友情链接
 *
 * @access  private
 * @return  array
 */
function index_get_links()
{
    $sql = 'SELECT link_logo, link_name, link_url, 	link_thump_logo FROM ' . $GLOBALS['ecs']->table('friend_link') . ' ORDER BY show_order';
    $res = $GLOBALS['db']->getAll($sql);

    $links['img'] = $links['txt'] = array();

    foreach ($res AS $row)
    {
        if (!empty($row['link_logo']))
        {
            $links['img'][] = array('name' => $row['link_name'],
                                    'url'  => $row['link_url'],
									'logo_thump'  => $row['link_thump_logo'],
                                    'logo' => $row['link_logo']);
        }
        else
        {
            $links['txt'][] =  array('name' => $row['link_name'],
                                    'url'  => $row['link_url'],
									'logo_thump'  => $row['link_thump_logo'],
                                    'logo' => $row['link_logo']);
        }
    }

    return $links;
}



?>