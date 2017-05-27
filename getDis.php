<?php
define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');

$id = isset($_POST['id']) ? $_POST['id'] : '';
if($id){
    $sql = "select region_id, region_name from " . $ecs->table('region') . " where parent_id=$id";
    $city = $db->getAll($sql);
    echo json_encode($city);
}
?>