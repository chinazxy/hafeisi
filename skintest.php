<?php
define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');
$keywords = "韩菲诗 护肤 化妆品 美妆";
$description = "Hey face!韩菲诗 我们从大自然中萃取适用于肌肤的有益物质，改善传统护肤品牌的冗长、繁琐与低效，提倡简单的获取和使用，从体验到购买，从使用乃至携带，韩菲诗都能做到简洁高效、事半功倍，成就您的美丽肌肤。更多了解韩菲诗：新浪微博入口，客服热线400-622-5215！";
$smarty->assign('keywords',        $keywords);
$smarty->assign('description',     $description);
//var_dump($_GET);exit;
$is_mobile = is_mobile();


if($_GET){
    $q1 = $_GET['q1'];
    $q2 = $_GET['q2'];
    $q2_2 = $_GET['q2_2'];
    $q3 = $_GET['q3'];
    $q4 = $_GET['q4'];
    $q5 = $_GET['q5'];
    $q6 = $_GET['q6'];
    $q7 = $_GET['q7'];

    $sql = "select goods_id from ". $ecs->table('tag') . " where tag_words='女士'";
    $lady = $db->getAll($sql);

    $sql = "select goods_id from ". $ecs->table('tag') . " where tag_words='洁净'";
    $fir = $db->getAll($sql);
    foreach($lady as $k => $v){
        foreach($fir as $kk => $vv){
            if($v == $vv){
                $first[] = $vv;
            }
        }
    }

    $sql = "select goods_id from ". $ecs->table('tag') . " where tag_words='滋养'";
    $sec = $db->getAll($sql);
    foreach($lady as $k => $v){
        foreach($sec as $kk => $vv){
            if($v == $vv){
                $second[] = $vv;
            }
        }
    }
    $sql = "select goods_id from ". $ecs->table('tag') . " where tag_words='防护'";
    $thir = $db->getAll($sql);
    foreach($lady as $k => $v){
        foreach($thir as $kk => $vv){
            if($v == $vv){
                $third[] = $vv;
            }
        }
    }
    if($q2 == "干燥缺水" || $q2_2 == "干燥缺水"){

        $sql ="select goods_id,xingou_id from ". $ecs->table('tag') . " where tag_words='干燥缺水'";
        $goods_id = $db->getAll($sql);

        $r1 = array();
        $r2 = array();
        $r3 = array();
        foreach($first as $k => $v){
            foreach($goods_id as $kk => $vv){
                if($vv['goods_id'] == $v['goods_id']){
                    $r1[] = $vv['xingou_id'];
                }
            }
        }

        if($r1){
            foreach($r1 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $one[] = $arr;

            }
        }

        foreach($second as $k => $v){
            foreach($goods_id as $kk => $vv){
                if($vv['goods_id'] == $v['goods_id']){
                    $r2[] = $vv['xingou_id'];
                }
            }
        }
        if($r2){

            foreach($r2 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $two[] = $arr;

            }

        }

        foreach($third as $k => $v){
            foreach($goods_id as $kk => $vv){
                if($vv['goods_id'] == $v['goods_id']){
                    $r3[] = $vv['xingou_id'];
                }
            }
        }
        if($r3){
            foreach($r3 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $three[] = $arr;

            }
        }

    }

    if($q2 == "出油缺水" || $q2_2 == "出油缺水"){

        $sql ="select goods_id,xingou_id from ". $ecs->table('tag') . " where tag_words='出油缺水'";
        $goods_id = $db->getAll($sql);

        $r1 = array();
        $r2 = array();
        $r3 = array();
        foreach($first as $k => $v){
            foreach($goods_id as $kk => $vv){
                if($vv['goods_id'] == $v['goods_id']){
                    $r1[] = $vv['xingou_id'];
                }
            }
        }
        if($r1){
            foreach($r1 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $one[] = $arr;

            }
        }

        foreach($second as $k => $v){
            foreach($goods_id as $kk => $vv){

                if($vv['goods_id'] == $v['goods_id']){
                    $r2[] = $vv['xingou_id'];
                }
            }
        }

        if($r2){

            foreach($r2 as $kkk => $vvv){
                $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                $goods_name = $db->getRow($sql);
                $goodsInfo = json_decode(getInfo($vvv), true);

                $price = $goodsInfo['data']['price'];
                $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                $name = $goodsInfo['data']['details'][$item_id]['name'];
                $pic = $goodsInfo['data']['pic'];
                $arr = array();
                $arr['goods_id'] = $goods_name['goods_id'];
                $arr['xingou_id'] = $vvv;
                $arr['price'] = $price;
                $arr['name'] = $name;
                $arr['goods_name'] = $goods_name['goods_name'];
                $arr['pic'] = buildimg($pic);
                $two[] = $arr;


            }


        }

        foreach($third as $k => $v){
            foreach($goods_id as $kk => $vv){
                if($vv['goods_id'] == $v['goods_id']){
                    $r3[] = $vv['xingou_id'];
                }
            }
        }
        if($r3){
            foreach($r3 as $kkk => $vvv){

                $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                $goods_name = $db->getRow($sql);
                $goodsInfo = json_decode(getInfo($vvv), true);

                $price = $goodsInfo['data']['price'];
                $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                $name = $goodsInfo['data']['details'][$item_id]['name'];
                $pic = $goodsInfo['data']['pic'];
                $arr = array();
                $arr['goods_id'] = $goods_name['goods_id'];
                $arr['xingou_id'] = $vvv;
                $arr['price'] = $price;
                $arr['name'] = $name;
                $arr['goods_name'] = $goods_name['goods_name'];
                $arr['pic'] = buildimg($pic);
                $three[] = $arr;

            }
        }

    }
    if($q2 == "毛孔粗大" || $q2_2 == "毛孔粗大"){
        $sql ="select goods_id,xingou_id from ". $ecs->table('tag') . " where tag_words='毛孔粗大'";
        $goods_id = $db->getAll($sql);

        $r1 = array();
        $r2 = array();
        $r3 = array();
        foreach($first as $k => $v){
            foreach($goods_id as $kk => $vv){
                if($vv['goods_id'] == $v['goods_id']){
                    $r1[] = $vv['xingou_id'];
                }
            }
        }
        if($r1){
            foreach($r1 as $kkk => $vvv){
                $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                $goods_name = $db->getRow($sql);
                $goodsInfo = json_decode(getInfo($vvv), true);

                $price = $goodsInfo['data']['price'];
                $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                $name = $goodsInfo['data']['details'][$item_id]['name'];
                $pic = $goodsInfo['data']['pic'];
                $arr = array();
                $arr['goods_id'] = $goods_name['goods_id'];
                $arr['xingou_id'] = $vvv;
                $arr['price'] = $price;
                $arr['name'] = $name;
                $arr['goods_name'] = $goods_name['goods_name'];
                $arr['pic'] = buildimg($pic);
                $one[] = $arr;

            }

        }

        foreach($second as $k => $v){

            foreach($goods_id as $kk => $vv){

                if($vv['goods_id'] == $v['goods_id']){
                    $r2[] = $vv['xingou_id'];
                }
            }
        }

        if($r2){

            foreach($r2 as $kkk => $vvv){

                $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                $goods_name = $db->getRow($sql);
                $goodsInfo = json_decode(getInfo($vvv), true);

                $price = $goodsInfo['data']['price'];
                $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                $name = $goodsInfo['data']['details'][$item_id]['name'];
                $pic = $goodsInfo['data']['pic'];
                $arr = array();
                $arr['goods_id'] = $goods_name['goods_id'];
                $arr['xingou_id'] = $vvv;
                $arr['price'] = $price;
                $arr['name'] = $name;
                $arr['goods_name'] = $goods_name['goods_name'];
                $arr['pic'] = buildimg($pic);
                $two[] = $arr;

            }


        }


        foreach($third as $k => $v){
            foreach($goods_id as $kk => $vv){
                if($vv['goods_id'] == $v['goods_id']){
                    $r3[] = $vv['xingou_id'];
                }
            }
        }
        if($r3){
            foreach($r3 as $kkk => $vvv){
                $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                $goods_name = $db->getRow($sql);
                $goodsInfo = json_decode(getInfo($vvv), true);

                $price = $goodsInfo['data']['price'];
                $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                $name = $goodsInfo['data']['details'][$item_id]['name'];
                $pic = $goodsInfo['data']['pic'];
                $arr = array();
                $arr['goods_id'] = $goods_name['goods_id'];
                $arr['xingou_id'] = $vvv;
                $arr['price'] = $price;
                $arr['name'] = $name;
                $arr['goods_name'] = $goods_name['goods_name'];
                $arr['pic'] = buildimg($pic);
                $three[] = $arr;

            }
        }
    }
    if($q2 == "细纹" || $q2_2 == "细纹"){
        $sql ="select goods_id,xingou_id from ". $ecs->table('tag') . " where tag_words='细纹'";
        $goods_id = $db->getAll($sql);

        $r1 = array();
        $r2 = array();
        $r3 = array();
        foreach($first as $k => $v){
            foreach($goods_id as $kk => $vv){
                if($vv['goods_id'] == $v['goods_id']){
                    $r1[] = $vv['xingou_id'];
                }
            }
        }
        if($r1){
            foreach($r1 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $one[] = $arr;

            }
        }

        foreach($second as $k => $v){
            foreach($goods_id as $kk => $vv){

                if($vv['goods_id'] == $v['goods_id']){
                    $r2[] = $vv['xingou_id'];
                }
            }
        }

        if($r2){

            foreach($r2 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $two[] = $arr;


            }

        }

        foreach($third as $k => $v){
            foreach($goods_id as $kk => $vv){
                if($vv['goods_id'] == $v['goods_id']){
                    $r3[] = $vv['xingou_id'];
                }
            }
        }
        if($r3){
            foreach($r3 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $three[] = $arr;

            }
        }
    }
    if($q2 == "松弛" || $q2_2 == "松弛"){
        $sql ="select goods_id,xingou_id from ". $ecs->table('tag') . " where tag_words='松弛'";
        $goods_id = $db->getAll($sql);

        $r1 = array();
        $r2 = array();
        $r3 = array();
        foreach($first as $k => $v){
            foreach($goods_id as $kk => $vv){
                if($vv['goods_id'] == $v['goods_id']){
                    $r1[] = $vv['xingou_id'];
                }
            }
        }
        if($r1){
            foreach($r1 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $one[] = $arr;

            }
        }

        foreach($second as $k => $v){
            foreach($goods_id as $kk => $vv){

                if($vv['goods_id'] == $v['goods_id']){
                    $r2[] = $vv['xingou_id'];
                }
            }
        }

        if($r2){

            foreach($r2 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $two[] = $arr;


            }

        }

        foreach($third as $k => $v){
            foreach($goods_id as $kk => $vv){
                if($vv['goods_id'] == $v['goods_id']){
                    $r3[] = $vv['xingou_id'];
                }
            }
        }
        if($r3){
            foreach($r3 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $three[] = $arr;

            }
        }
    }
    if($q2 == "皱纹" || $q2_2 == "皱纹"){
        $sql ="select goods_id,xingou_id from ". $ecs->table('tag') . " where tag_words='皱纹'";
        $goods_id = $db->getAll($sql);

        $r1 = array();
        $r2 = array();
        $r3 = array();
        foreach($first as $k => $v){
            foreach($goods_id as $kk => $vv){
                if($vv['goods_id'] == $v['goods_id']){
                    $r1[] = $vv['xingou_id'];
                }
            }
        }
        if($r1){
            foreach($r1 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $one[] = $arr;

            }
        }

        foreach($second as $k => $v){
            foreach($goods_id as $kk => $vv){

                if($vv['goods_id'] == $v['goods_id']){
                    $r2[] = $vv['xingou_id'];
                }
            }
        }

        if($r2){

            foreach($r2 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $two[] = $arr;


            }

        }

        foreach($third as $k => $v){
            foreach($goods_id as $kk => $vv){
                if($vv['goods_id'] == $v['goods_id']){
                    $r3[] = $vv['xingou_id'];
                }
            }
        }
        if($r3){
            foreach($r3 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $three[] = $arr;

            }
        }
    }
    if($q2 == "肌肤黯沉" || $q2_2 == "肌肤黯沉"){
        $sql ="select goods_id,xingou_id from ". $ecs->table('tag') . " where tag_words='肌肤暗沉'";
        $goods_id = $db->getAll($sql);

        $r1 = array();
        $r2 = array();
        $r3 = array();
        foreach($first as $k => $v){
            foreach($goods_id as $kk => $vv){
                if($vv['goods_id'] == $v['goods_id']){
                    $r1[] = $vv['xingou_id'];
                }
            }
        }
        if($r1){
            foreach($r1 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $one[] = $arr;

            }
        }

        foreach($second as $k => $v){
            foreach($goods_id as $kk => $vv){

                if($vv['goods_id'] == $v['goods_id']){
                    $r2[] = $vv['xingou_id'];
                }
            }
        }

        if($r2){

            foreach($r2 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $two[] = $arr;


            }

        }

        foreach($third as $k => $v){
            foreach($goods_id as $kk => $vv){
                if($vv['goods_id'] == $v['goods_id']){
                    $r3[] = $vv['xingou_id'];
                }
            }
        }
        if($r3){
            foreach($r3 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $three[] = $arr;

            }
        }
    }
    if($q2 == "肌肤暗黄" || $q2_2 == "肌肤暗黄"){
        $sql ="select goods_id,xingou_id from ". $ecs->table('tag') . " where tag_words='肌肤暗黄'";
        $goods_id = $db->getAll($sql);

        $r1 = array();
        $r2 = array();
        $r3 = array();
        foreach($first as $k => $v){
            foreach($goods_id as $kk => $vv){
                if($vv['goods_id'] == $v['goods_id']){
                    $r1[] = $vv['xingou_id'];
                }
            }
        }
        if($r1){
            foreach($r1 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $one[] = $arr;

            }

        }

        foreach($second as $k => $v){
            foreach($goods_id as $kk => $vv){

                if($vv['goods_id'] == $v['goods_id']){
                    $r2[] = $vv['xingou_id'];
                }
            }
        }

        if($r2){

            foreach($r2 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $two[] = $arr;


            }

        }

        foreach($third as $k => $v){
            foreach($goods_id as $kk => $vv){
                if($vv['goods_id'] == $v['goods_id']){
                    $r3[] = $vv['xingou_id'];
                }
            }
        }
        if($r3){
            foreach($r3 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $three[] = $arr;

            }
        }
    }
    if($q2 == "斑点" || $q2_2 == "斑点"){
        $sql ="select goods_id,xingou_id from ". $ecs->table('tag') . " where tag_words='斑点'";
        $goods_id = $db->getAll($sql);

        $r1 = array();
        $r2 = array();
        $r3 = array();
        foreach($first as $k => $v){
            foreach($goods_id as $kk => $vv){
                if($vv['goods_id'] == $v['goods_id']){
                    $r1[] = $vv['xingou_id'];
                }
            }
        }
        if($r1){
            foreach($r1 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $one[] = $arr;

            }
        }

        foreach($second as $k => $v){
            foreach($goods_id as $kk => $vv){

                if($vv['goods_id'] == $v['goods_id']){
                    $r2[] = $vv['xingou_id'];
                }
            }
        }

        if($r2){

            foreach($r2 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $two[] = $arr;


            }

        }

        foreach($third as $k => $v){
            foreach($goods_id as $kk => $vv){
                if($vv['goods_id'] == $v['goods_id']){
                    $r3[] = $vv['xingou_id'];
                }
            }
        }
        if($r3){
            foreach($r3 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $three[] = $arr;

            }
        }
    }
    if($q2 == "长痘" || $q2_2 == "长痘"){
        $sql ="select goods_id,xingou_id from ". $ecs->table('tag') . " where tag_words='长痘'";
        $goods_id = $db->getAll($sql);

        $r1 = array();
        $r2 = array();
        $r3 = array();
        foreach($first as $k => $v){
            foreach($goods_id as $kk => $vv){
                if($vv['goods_id'] == $v['goods_id']){
                    $r1[] = $vv['xingou_id'];
                }
            }
        }
        if($r1){
            foreach($r1 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $one[] = $arr;

            }
        }

        foreach($second as $k => $v){
            foreach($goods_id as $kk => $vv){

                if($vv['goods_id'] == $v['goods_id']){
                    $r2[] = $vv['xingou_id'];
                }
            }
        }

        if($r2){

            foreach($r2 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $two[] = $arr;


            }

        }

        foreach($third as $k => $v){
            foreach($goods_id as $kk => $vv){
                if($vv['goods_id'] == $v['goods_id']){
                    $r3[] = $vv['xingou_id'];
                }
            }
        }
        if($r3){
            foreach($r3 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $three[] = $arr;

            }
        }
    }
    if($q3){
        $sql ="select goods_id,xingou_id from ". $ecs->table('tag') . " where tag_words='眼部细纹'";
        $goods_id = $db->getAll($sql);
        $r1 = array();
        $r2 = array();
        $r3 = array();
        foreach($first as $k => $v){
            foreach($goods_id as $kk => $vv){
                if($vv['goods_id'] == $v['goods_id']){
                    $r1[] = $vv['xingou_id'];
                }
            }
        }
        if($r1){
            foreach($r1 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $one[] = $arr;

            }
        }

        foreach($second as $k => $v){
            foreach($goods_id as $kk => $vv){

                if($vv['goods_id'] == $v['goods_id']){
                    $r2[] = $vv['xingou_id'];
                }
            }
        }

        if($r2){

            foreach($r2 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $two[] = $arr;


            }

        }

        foreach($third as $k => $v){
            foreach($goods_id as $kk => $vv){
                if($vv['goods_id'] == $v['goods_id']){
                    $r3[] = $vv['xingou_id'];
                }
            }
        }
        if($r3){
            foreach($r3 as $kkk => $vvv){

                    $sql = "select goods_name,goods_id from " . $ecs->table('goods') . " where xingou_id=$vvv";
                    $goods_name = $db->getRow($sql);
                    $goodsInfo = json_decode(getInfo($vvv), true);

                    $price = $goodsInfo['data']['price'];
                    $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
                    $name = $goodsInfo['data']['details'][$item_id]['name'];
                    $pic = $goodsInfo['data']['pic'];
                    $arr = array();
                    $arr['goods_id'] = $goods_name['goods_id'];
                    $arr['xingou_id'] = $vvv;
                    $arr['price'] = $price;
                    $arr['name'] = $name;
                    $arr['goods_name'] = $goods_name['goods_name'];
                    $arr['pic'] = buildimg($pic);
                    $three[] = $arr;

            }
        }
    }

    if(empty($one)){
        $sql = "select goods_id,xingou_id,goods_name from " . $ecs->table('goods') . " where goods_name like '%焕颜洗颜泥%' and is_delete=0 and is_on_sale=1";
        $goods = $db->getRow($sql);
        $goodsInfo = json_decode(getInfo($goods['xingou_id']),true);
        $price = $goodsInfo['data']['price'];
        $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
        $name = $goodsInfo['data']['details'][$item_id]['name'];
        $pic = $goodsInfo['data']['pic'];
        $arr1 = array();
        $arr1['goods_id'] = $goods['goods_id'];
        $arr1['xingou_id'] = $goods['xingou_id'];
        $arr1['price'] = $price;
        $arr1['name'] = $name;
        $arr1['goods_name'] = $goods['goods_name'];
        $arr1['pic'] = buildimg($pic);
        $one = array();
        $one[] = $arr1;
    }
    if(empty($two)){

        $sql = "select goods_id,xingou_id,goods_name from " . $ecs->table('goods') . " where goods_name like '%保湿锁水喷雾%' and is_delete=0 and is_on_sale=1";
        $goods = $db->getRow($sql);
        $goodsInfo = json_decode(getInfo($goods['xingou_id']),true);
        $price = $goodsInfo['data']['price'];
        $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
        $name = $goodsInfo['data']['details'][$item_id]['name'];
        $pic = $goodsInfo['data']['pic'];
        $arr2 = array();
        $arr2['goods_id'] = $goods['goods_id'];
        $arr2['xingou_id'] = $goods['xingou_id'];
        $arr2['price'] = $price;
        $arr2['name'] = $name;
        $arr2['goods_name'] = $goods['goods_name'];
        $arr2['pic'] = buildimg($pic);
        $two = array();
        $two[] = $arr2;
    }
    if(empty($three)){
        $sql = "select goods_id,xingou_id,goods_name from " . $ecs->table('goods') . " where goods_name like '%美颜隔离霜%' and is_delete=0 and is_on_sale=1";
        $goods = $db->getRow($sql);

        $goodsInfo = json_decode(getInfo($goods['xingou_id']),true);
        $price = $goodsInfo['data']['price'];
        $item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
        $name = $goodsInfo['data']['details'][$item_id]['name'];
        $pic = $goodsInfo['data']['pic'];
        $arr3 = array();
        $arr3['goods_id'] = $goods['goods_id'];
        $arr3['xingou_id'] = $goods['xingou_id'];
        $arr3['price'] = $price;
        $arr3['name'] = $name;
        $arr3['goods_name'] = $goods['goods_name'];
        $arr3['pic'] = buildimg($pic);
        $three = array();
        $three[] = $arr3;
    }
    $one = array_unique_fb($one);
    $two = array_unique_fb($two);
    $three = array_unique_fb($three);
    //var_dump($two);exit;
    $smarty->assign('one' , $one);
    $smarty->assign('two' , $two);
    $smarty->assign('three' , $three);
if ($is_mobile) {
        $smarty->display('mobile/testresult.dwt');
    } else {
        $smarty->display('testresult.dwt');
    }
    
}else {

    if ($is_mobile) {
        $smarty->display('mobile/skintest.dwt');
    } else {
        $smarty->display('skintest.dwt');
    }
}
function array_unique_fb($array2D)
{
    foreach ($array2D as $k=>$v)
    {
        $v = join(",",$v); //降维,也可以用implode,将一维数组转换为用逗号连接的字符串
        $temp[$k] = $v;
    }
    $temp = array_unique($temp); //去掉重复的字符串,也就是重复的一维数组
    foreach ($temp as $k => $v)
    {
        $array=explode(",",$v); //再将拆开的数组重新组装
        $temp2[$k]["goods_id"] =$array[0];
        $temp2[$k]["xingou_id"] =$array[1];
        $temp2[$k]["price"] =$array[2];
        $temp2[$k]["name"] =$array[3];
        $temp2[$k]["goods_name"] =$array[4];
        $temp2[$k]["pic"] =$array[5];
    }
    return $temp2;
}
?>