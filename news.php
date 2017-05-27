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

$smarty->assign('page_title',      "新闻"."-".$position['title']);    // 页面标题
$smarty->assign('ur_here',         $position['ur_here']);  // 当前位置

/* meta information */
$keywords = "韩菲诗 护肤 化妆品 美妆";
    $description = "Hey face!韩菲诗 我们从大自然中萃取适用于肌肤的有益物质，改善传统护肤品牌的冗长、繁琐与低效，提倡简单的获取和使用，从体验到购买，从使用乃至携带，韩菲诗都能做到简洁高效、事半功倍，成就您的美丽肌肤。更多了解韩菲诗：新浪微博入口，客服热线400-622-5215！";
    $smarty->assign('keywords',        $keywords);
    $smarty->assign('description',     $description);

$sql = 'SELECT * FROM '.$ecs->table('article').' where(cat_id=12) order by  fp_time desc';

$zxlist= $GLOBALS['db']->getAll($sql);
foreach($zxlist as $key=>$value){

	if(!empty($value['fp_time'])){

		$value['add_time']=$value['fp_time'];

	}
	$zxlist[$key]['addtime']=date('Y',$value['add_time']);
	$zxlist[$key]['month']=date('n',$value['add_time']);
}

$sql = 'SELECT * FROM '.$ecs->table('article_cat').' where(cat_id=12)';

$listtop= $GLOBALS['db']->getRow($sql);
$count=count($zxlist);

$smarty->assign('npage',0);
$states=is_mobile();
$smarty->assign("is_video","false");
$smarty->assign("states",$states);
$smarty->assign("count",$count);
$smarty->assign("zxlist",$zxlist);
$smarty->assign("listtop",$listtop);

$smarty->assign('hasd',  "d");
$is_mobile = is_mobile();
if($is_mobile){
	$smarty->display('mobile/has-xinwen.dwt');
}else {
	$smarty->display('zx.dwt');
}
 
?>