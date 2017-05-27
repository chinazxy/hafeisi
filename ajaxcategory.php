<?php
define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');
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
//function buildimg($pic){
//
//    $imghost="http://img.xingou.net.cn/";
//
//    if(!empty($pic)){
//        return $imghost.$pic;
//    }
//
//
//}
$length = 9;
$click = $_POST['click'];
$cat_id = $_POST['cat_id'];

$is_mobile = $_POST['is_mobile'];
if ($is_mobile) {
    $start = (($click - 1) * $length) + 2;
}else{
    $start = (($click - 1) * $length) + 3;
}
$data = [];

    $sql = "select goods_id,cat_id,xingou_id,goods_name from " . $ecs->table('goods') . " where is_delete=0 and is_on_sale=1 and cat_id = " . $cat_id. " limit $start,$length" ;
    $goods = $db->getAll($sql);
    /*$sqll = "select count(*) from ". $ecs->table('goods'). " where cat_id = ". $v['cat_id'];
    $count = $db->getOne($sqll);*/
    foreach($goods as $kk => $vv){
        $goodsInfo = json_decode(getInfo($vv['xingou_id']),true);
        $goodsoff = $goodsInfo['data']['goodoff'];
        //var_dump($goodsoff);
        if ($goodsoff == 1) {
            unset($goods[$kk]);
            continue;
        }
        $price = $goodsInfo['data']['price'];
        $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
        $img = $goodsInfo['data']['pic'];
        $name = $goodsInfo['data']['details'][$item_id]['name'];
        $data[$kk]['goods_name'] = $vv['goods_name'];
        //$data[$kk]['goodsinfo'] = $goodsInfo;
        $data[$kk]['goods_id'] = $vv['goods_id'];
        $data[$kk]['price'] = $price;
        $data[$kk]['img'] = buildimg($img);
        $data[$kk]['name'] = $name;
        $data[$kk]['item_id'] = $item_id;
        $data[$kk]['length'] = count($goods);
        
        
    }

    //var_dump($data);exit();
    //$data[$kk]['count'] = $count;



$json_obj = json_encode($data,true);
echo $json_obj;
?>