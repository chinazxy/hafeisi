<?php  

define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');

if ($_GET['act'] == "search") {
	
}elseif ($_GET['act'] == "falv") {
	$smarty->display('mobile/falv.dwt');
}elseif ($_GET['act'] == "jihui") {
	$smarty->display('mobile/jihui.dwt');
}elseif ($_GET['act'] == "zhengce"){
	$smarty->display('mobile/zhengce.dwt');

}elseif ($_GET['act'] == "faq") {
	$smarty->display('mobile/faq.dwt');
}

?>