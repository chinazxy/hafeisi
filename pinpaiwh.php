<?php
define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');

$is_mobile = is_mobile();
if($is_mobile){
	$smarty->display('mobile/has-pinpaiwh.dwt');
}else{
	$smarty->display('has-pinpaiwh.dwt');
}
?>