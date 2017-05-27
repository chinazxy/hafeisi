<?php




define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');

if ((DEBUG_MODE & 2) != 2)
{
    $smarty->caching = true;
}

//require(ROOT_PATH . 'includes/lib_payment.php');
//require(ROOT_PATH . 'includes/lib_order.php');
 //order_paid();

    $position = assign_ur_here();

    $smarty->assign('page_title',      $position['title']);    // 页面标题
    $smarty->assign('ur_here',         $position['ur_here']);  // 当前位置

    /* meta information */
    $keywords = "韩菲诗 护肤 化妆品 美妆";
    $description = "Hey face!韩菲诗 我们从大自然中萃取适用于肌肤的有益物质，改善传统护肤品牌的冗长、繁琐与低效，提倡简单的获取和使用，从体验到购买，从使用乃至携带，韩菲诗都能做到简洁高效、事半功倍，成就您的美丽肌肤。更多了解韩菲诗：新浪微博入口，客服热线400-622-5215！";
    $smarty->assign('keywords',        $keywords);
    $smarty->assign('description',     $description);
	 $id=$_GET['id'];
	 $sql = "SELECT * FROM " .$GLOBALS['ecs']->table('article'). " WHERE article_id = '$id'";

	 $zxlist= $GLOBALS['db']->getRow($sql);
	 $looks=$zxlist['add_time'] = local_date("m.Y",$zxlist['add_time'] );
	 //print_r($looks);
	 $sqls = "SELECT * FROM " .$GLOBALS['ecs']->table('article_cat'). " WHERE cat_id = 12";
	 $sqlm = "SELECT * FROM " .$GLOBALS['ecs']->table('article'). " WHERE cat_id=12 order by article_id desc limit 5";
	 $conference= $GLOBALS['db']->getAll($sqlm);
	 $article= $GLOBALS['db']->getRow($sqls);
	 $zxlist= $GLOBALS['db']->getRow($sql);
	     $smarty->assign('npage',0);   
	  $states=is_mobile();
	   if(!empty($zxlist['content'])){
       $strs=preg_replace('/<img.+src=\"?(.+\.(jpg|gif|bmp|bnp|png))\"?.+>/'," <div class='portfolio-item-full-width'><img class='responsive-image' src='$1'></div>",$zxlist['content']);
       $zxlist['content']=$strs;
       }

	    $smarty->assign("states",$states);
		$smarty->assign("conference",$conference);
		$smarty->assign("looks",$looks);
	    $smarty->assign("count",$count);
		$smarty->assign("zxlist",$zxlist);
		$smarty->assign("article",$article);

$smarty->assign('hasd',  "d");
$smarty->assign('hasd',  "d");
$is_mobile = is_mobile();
if($is_mobile){
	$smarty->display('mobile/has-xinwenneiye.dwt');
}else {
	$smarty->display('zx_detail.dwt');
}


?>