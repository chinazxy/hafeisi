<?php
define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');
$pro = get_regions(1,1);
$smarty->assign('pro' , $pro);

$name = isset($_POST['name']) ? $_POST['name'] : "";

if($name){

    $mobile = $_POST['mobile'];
    $pro = $_POST['pro'];
    $city = $_POST['city'];
    $dis = $_POST['dis'];
    $remark = $_POST['remark'];
    $time = time();
    $sql = "insert into " . $ecs->table('business') . " (name,mobile,pro,city,dis,remark,addtime) values ('$name' , '$mobile' , '$pro' , '$city' , '$dis' , '$remark' , '$time')";

    $res = $db->query($sql);
    if($res){
        echo json_encode(['res' => 1 , 'msg' => '您的申请已提交，我们的客服会尽快联系您！']);
        return;
    }else{
        echo json_encode(['res' => 0 , 'msg' => '系统错误，请重新提交申请！']);
        return;
    }
}

$is_mobile = is_mobile();
if($is_mobile){
    $smarty->display('mobile/has-gwzs.dwt');
}else{
    $smarty->display('mobile/has-gwzs.dwt');
}
?>