<?php 
define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');


$keywords = "韩菲诗 护肤 化妆品 美妆";
    $description = "Hey face!韩菲诗 我们从大自然中萃取适用于肌肤的有益物质，改善传统护肤品牌的冗长、繁琐与低效，提倡简单的获取和使用，从体验到购买，从使用乃至携带，韩菲诗都能做到简洁高效、事半功倍，成就您的美丽肌肤。更多了解韩菲诗：新浪微博入口，客服热线400-622-5215！";
    $smarty->assign('keywords',        $keywords);
    $smarty->assign('description',     $description);
    $is_mobile = is_mobile();
    if ($is_mobile) {
    	$smarty->display('mobile/has-ppy.dwt');
    }else{
		$smarty->display('brand.dwt');
	}
?>