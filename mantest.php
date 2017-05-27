<?php
define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');
$is_mobile = is_mobile();
if($_GET){
    if($is_mobile){
        $smarty->display('mobile/testresult.dwt');
    }else {
        $smarty->display('testresult.dwt');
    }
}else{
    if($is_mobile){
        $smarty->display('mobile/man.dwt');
    }else {
        $smarty->display('man.dwt');
    }
}

?>