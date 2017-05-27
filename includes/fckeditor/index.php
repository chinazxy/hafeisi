<?php




define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');
require(dirname(__FILE__) . '/includes/lib_payment.php');
if ((DEBUG_MODE & 2) != 2)
{
    $smarty->caching = true;
}

//order_paid(6);

//ostXml();


    $position = assign_ur_here();
  
    $smarty->assign('page_title',      $position['title']);    // 页面标题
    $smarty->assign('ur_here',         $position['ur_here']);  // 当前位置

    /* meta information */
    $smarty->assign('keywords',        htmlspecialchars($_CFG['shop_keywords']));
    $smarty->assign('description',     htmlspecialchars($_CFG['shop_desc']));

	  $sql = 'SELECT * FROM '.$ecs->table('lunbo').'order by resort asc';

	 $photolist= $GLOBALS['db']->getAll($sql);
	 


     $sql='SELECT  (SELECT id FROM '.$ecs->table('push_pchild').' where position=m.position ORDER BY rand() LIMIT 0,1 ) as b   FROM '.$ecs->table('push_pchild').' AS m   group by position order by position asc';
	
	 $center= $GLOBALS['db']->getAll($sql);	
	 
     for($i=0;$i<count($center);$i++){
	   $sqls="SELECT * FROM ".$ecs->table('push_pchild')." where id=".$center[$i]['b'];
	  
	  $centers[$i]=$GLOBALS['db']->getRow($sqls);
	  	  
	 }

 
	 $count=count($photolist);
	 $smarty->assign("centers",$centers);
	
	 $smarty->assign("photolist",$photolist);

	     $smarty->assign('npage',0);   
	  $states=is_mobile();
	    $smarty->assign("states",$states);
	    $smarty->assign("count",$count);



$smarty->display('index.dwt');


		function is_mobile() {
$user_agent = $_SERVER['HTTP_USER_AGENT'];


$mobile_browser = Array("Android","Touch", "iPhone","BlackBerry OS","mqqbrowser","opera mobi","juc","iuc","fennec","applewebKit/420","applewebkit/525","applewebkit/532","iemobile","windows ce","240x320","480x640","acer","asus","audio","blazer","coolpad","dopod","etouch","hitachi","htc","huawei","jbrowser","lenovo","lg","lg-","lge-","lge", "mobi","moto","nokia","phone","samsung","sony","symbian","tablet","tianyu","wap","xda","xde","zte","SymbianOS", "Windows Phone", "iPad", "iPod");
$is_mobile = 0;
foreach ($mobile_browser as $device) {
if (stristr($user_agent, $device)) {
$is_mobile = 1;
break;
}
}
return $is_mobile;
}
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