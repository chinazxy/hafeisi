<?php
define('IN_ECS', true);
require (dirname(__FILE__) . '/includes/init.php');
require (ROOT_PATH . 'includes/lib_order.php');
/* 载入语言文件 */
require_once (ROOT_PATH . 'languages/' . $_CFG['lang'] . '/user.php');
require_once (ROOT_PATH . 'languages/' . $_CFG['lang'] . '/shopping_flow.php');
/*------------------------------------------------------ */
//-- INPUT
/*------------------------------------------------------ */
if (!isset($_REQUEST['step'])) {
    $_REQUEST['step'] = "cart";
}
/*------------------------------------------------------ */
//-- PROCESSOR
/*------------------------------------------------------ */
assign_template();
assign_dynamic('flow');
$position = assign_ur_here(0, $_LANG['shopping_flow']);
$smarty->assign('page_title', $position['title']); // 页面标题
$smarty->assign('ur_here', $position['ur_here']); // 当前位置
$smarty->assign('lang', $_LANG);
$smarty->assign('show_marketprice', $_CFG['show_marketprice']);
$smarty->assign('data_dir', DATA_DIR); // 数据目录
/*------------------------------------------------------ */
//-- 添加商品到购物车
/*------------------------------------------------------ */
if ($_REQUEST['step'] == 'add_to_cart') {
    include_once ('includes/cls_json.php');
    $_POST['goods'] = json_str_iconv($_POST['goods']);
    $numers = 0;
    $goodsnum = 0;
    if (!empty($_REQUEST['goods_id']) && empty($_POST['goods'])) {
        if (!is_numeric($_REQUEST['goods_id']) || intval($_REQUEST['goods_id']) <= 0) {
            ecs_header("Location:./\n");
        }
        $goods_id = intval($_REQUEST['goods_id']);
        exit;
    }
    $result = array(
        'error' => 0,
        'message' => '',
        'content' => '',
        'goods_id' => '',
        'attr_id' => ''
    );
    $json = new JSON;
    if (empty($_POST['goods'])) {
        $result['error'] = 1;
        die($json->encode($result));
    }
    $goods = $json->decode($_POST['goods']);
    $specstr = implode(",", $goods->spec);
    $goodsinfo = $db->getRow("SELECT goods_number FROM " . $ecs->table('cart') . " WHERE goods_id=" . $goods->goods_id . "  and goods_attr_id='" . $specstr . "' and session_id = '" . SESS_ID . "' ");
    $numers = $goodsinfo['goods_number'];
    /* 检查：如果商品有规格，而post的数据没有规格，把商品的规格属性通过JSON传到前台 */
    if (empty($goods->spec) AND empty($goods->quick)) {
        $sql = "SELECT a.attr_id, a.attr_name, a.attr_type, " . "g.goods_attr_id, g.attr_value,g.color, g.attr_price " . 'FROM ' . $GLOBALS['ecs']->table('goods_attr') . ' AS g ' . 'LEFT JOIN ' . $GLOBALS['ecs']->table('attribute') . ' AS a ON a.attr_id = g.attr_id ' . "WHERE a.attr_type != 0 AND g.goods_id = '" . $goods->goods_id . "' " . 'ORDER BY a.sort_order, g.attr_price, g.goods_attr_id';
        $res = $GLOBALS['db']->getAll($sql);
        if (!empty($res)) {
            $spe_arr = array();
            foreach ($res AS $row) {
                $spe_arr[$row['attr_id']]['attr_type'] = $row['attr_type'];
                $spe_arr[$row['attr_id']]['name'] = $row['attr_name'];
                $spe_arr[$row['attr_id']]['attr_id'] = $row['attr_id'];
                $spe_arr[$row['attr_id']]['values'][] = array(
                    'label' => $row['attr_value'],
                    'price' => $row['attr_price'],
                    'color' => $row['color'],
                    'format_price' => price_format($row['attr_price'], false) ,
                    'id' => $row['goods_attr_id']
                );
            }
            $i = 0;
            $spe_array = array();
            foreach ($spe_arr AS $row) {
                $spe_array[] = $row;
            }
            $result['error'] = ERR_NEED_SELECT_ATTR;
            $result['goods_id'] = $goods->goods_id;
            $result['attr_id'] = $specstr;
            $result['parent'] = $goods->parent;
            $result['message'] = $spe_array;
            die($json->encode($result));
        }
    }
    /* 更新：如果是一步购物，先清空购物车 */
    if ($_REQUEST['bool'] == '1') {
        clear_cart();
    }
    /* 检查：商品数量是否合法 */
    if (!is_numeric($goods->number) || intval($goods->number) <= 0) {
        $result['error'] = 1;
        $result['message'] = $_LANG['invalid_number'];
    }
    /* 更新：购物车 */
    else {
        // $goodsnum= $goods->number+(int)$numers;
        // 更新：添加到购物车
        if (addto_cart($goods->goods_id, $goods->number, $goods->spec, $goods->parent)) {
            if ($_CFG['cart_confirm'] > 2) {
                $result['message'] = '';
            } else {
                $result['message'] = $_CFG['cart_confirm'] == 1 ? $_LANG['addto_cart_success_1'] : $_LANG['addto_cart_success_2'];
            }
            $result['content'] = insert_cart_info();
            $result['one_step_buy'] = $_CFG['one_step_buy'];
        } else {
            $result['message'] = $err->last_message();
            $result['error'] = $err->error_no;
            $result['goods_id'] = stripslashes($goods->goods_id);
            if (is_array($goods->spec)) {
                $result['product_spec'] = implode(',', $goods->spec);
            } else {
                $result['product_spec'] = $goods->spec;
            }
        }
    }
    $result['goods_id'] = stripslashes($goods->goods_id);
    $result['attr_id'] = $specstr;
    $result['confirm_type'] = !empty($_CFG['cart_confirm']) ? $_CFG['cart_confirm'] : 2;
    die($json->encode($result));
} else if ($_REQUEST['step'] == 'add_dingzhi_cart') {
    include_once ('includes/cls_json.php');
    $dztime = array(
        "title" => array() ,
        "type" => array() ,
        "type_id" => array() ,
        "delivery_time" => array()
    );
    $attrid = $_POST['glattrid'];
    $rs = array(
        "err" => '',
        "oldimg_l" => '',
        "thump_img_l" => ''
    );
    $productNumber = array();
    $json = new JSON;
    if ($attrid['jj_id'] > 0) {
        $img_price = array();
        $sql = "SELECT * FROM  " . $ecs->table('dingzhi_type') . " WHERE `id`=" . $attrid['jj_id'];
        $jpinfo = $db->getRow($sql);
        $productNumber['zjk_number'] = $jpinfo['number'];
        $img_price['zjk_price'] = $jpinfo['price'];
        if ($jpinfo['id'] > 0) {
            $img_c_array = array();
            $img_l_array = array();
            $attr_info = array();
            $attr_array = array();
            $glattr = $_POST['glattr'];
            $sql = "SELECT * FROM  " . $ecs->table('dingzhi_attr') . " WHERE `pid`=" . $attrid['jj_id'];
            $attrlist = $db->getAll($sql);
            $sql = "SELECT * FROM  " . $ecs->table('dingzhi_jp_set') . " WHERE `relative_id`=" . $attrid['jj_id'];
            $jplist = $db->getAll($sql);
            $jparray = array();
            for ($i = 0; $i < count($jplist); $i++) {
                $jparray[$i] = $jplist[$i]['jp_t'];
            }
            foreach ($attrlist as $val) {
                $attr_array[$val['id']] = $val;
            }
            foreach ($attrid as $k => $v) {
                if (!empty($v) && $k != "jj_id" && $k != "jp_type_id" && $k != "jp_id") {
                    if ($attr_array[$v]['id'] > 0) {
                        $img_price[$k] = $attr_array[$v]['price'];
                        if ($k != "jt_id") {
                            $img_c_array[$v]['img_c'] = $attr_array[$v]['img_c'];
                        }
                        $img_l_array[$v]['img_l'] = $attr_array[$v]['img_l'];
                        $attr_info[$v]['title'] = $attr_array[$v]['title'];
                        if ($k == "jk_id") {
                            $glattr['jk'] = $attr_info[$v]['title'];
                        } else if ($k == "qk_id") {
                            $glattr['qk'] = $attr_info[$v]['title'];
                        } else if ($k == "sj_id") {
                            $glattr['sj'] = $attr_info[$v]['title'];
                        } else if ($k == "jt_id") {
                            $glattr['jt'] = $attr_info[$v]['title'];
                        } else if ($k == "jtt_id") {
                            $glattr['jtt'] = $attr_info[$v]['title'];
                        } else if ($k == "wj_id") {
                            $glattr['wj'] = $attr_info[$v]['title'];
                        }
                        $k_v = explode("_", $k);
                        $kv = $k_v[0];
                        if (isset($attr_array[$v]['number'])) {
                            $productNumber[$kv] = $attr_array[$v]['number'];
                        }
                        if (isset($attr_array[$v]['r_number'])) {
                            $productNumber[$kv . '_r'] = $attr_array[$v]['r_number'];
                        }
                        $pzrstate = isset($attr_array[$v]['r_number']) ? true : false;
                        $zrstate = isset($attr_array[$v]['number']) ? true : false;
                        if ($pzrstate && $zrstate) {
                            $minnumber = min($attr_array[$v]['r_dingzhi_number'], $attr_array[$v]['dingzhi_number']);
                        } else if (!$pzrstate && $zrstate) {
                            $minnumber = $attr_array[$v]['dingzhi_number'];
                        } else if ($pzrstate && !$zrstate) {
                            $minnumber = $attr_array[$v]['r_dingzhi_number'];
                        }
                        if ($minnumber == 0) {
                            array_push($dztime['type'], $k);
                            array_push($dztime['type_id'], $attr_array[$v]['type_id']);
                            array_push($dztime['title'], $attr_array[$v]['title']);
                            array_push($dztime['delivery_time'], $attr_array[$v]['delivery_time']);
                        }
                        $attr_info[$v]['en_title'] = $attr_array[$v]['en_title'];
                        $attr_info[$v]['color'] = $attr_array[$v]['color'];
                        $attr_info[$v]['color_img'] = $attr_array[$v]['color_img'];
                        $attr_info[$v]['type_id'] = $attr_array[$v]['type_id'];
                    } else {
                        $rs['err'] = $k . "_error";
                        break;
                    }
                }
            }
            if (!empty($attrid['jp_id'])) {
                if (in_array($attrid['jp_id'], $jparray)) {
                    $sql = "SELECT * FROM  " . $ecs->table('dingzhi_attr') . " WHERE `id`=" . $attrid['jp_id'];
                    $jpinfos = $db->getRow($sql);
                    $glattr['jp'] = $jpinfos['title'];
                    $img_price['jp_id'] = $jpinfos['price'];
                    $img_c_array[$attrid['jp_id']]['img_c'] = $jpinfos['img_c'];
                    $img_l_array[$attrid['jp_id']]['img_l'] = $jpinfos['img_l'];
                    $attr_info[$attrid['jp_id']]['en_title'] = $jpinfos['en_title'];
                    $attr_info[$attrid['jp_id']]['color'] = $jpinfos['color'];
                    $attr_info[$attrid['jp_id']]['color_img'] = $jpinfos['color_img'];
                    $attr_info[$attrid['jp_id']]['type_id'] = $jpinfos['type_id'];
                    if ($jpinfos['dingzhi_number'] == 0) {
                        array_push($dztime['type'], "jp_id");
                        array_push($dztime['type_id'], $jpinfos['gid']);
                        array_push($dztime['title'], $jpinfos['title']);
                        array_push($dztime['delivery_time'], $jpinfos['delivery_time']);
                    }
                    $productNumber['jp'] = $jpinfos['number'];
                } else {
                    $rs['err'] = "jp_id_error";
                }
            } else {
                $rs['err'] = "jp_id_error";
            }
            $jp_type = $_POST['jp_type'];
            $old_img = $_POST['old_img'];
           /* if (count($rs) == 0) {
                if (empty($glattr['size_id'])) {
                    $rs['err'] = "size_error";
                } else {
                    $sql = "SELECT * FROM " . $ecs->table('dingzhi_size') . " WHERE id=" . $glattr['size_id'] . " and type_id=" . $attrid['jj_id'];
                    $sizeinfo = $db->getRow($sql);
                    if (!$sizeinfo['id'] > 0) {
                        $glattr['size'] = $sizeinfo['size'];
                        $glattr['size_id'] = $sizeinfo['id'];
                        $rs['err'] = "size_id_error";
                    }
                }
            }*/
            if ($rs['err'] == "") {
                $jptypeid = $attrid['jp_type_id'];
                if ($jptypeid > 0) {
                    if (empty($jptype)) {
                        $sql = "SELECT * FROM " . $ecs->table('dingzhi_jp') . " WHERE cat_id=" . $jptypeid;
                        $jpinfos = $db->getRow($sql);
                        if ($jpinfos['cat_id'] > 0) {
                            $glattr['jp_id'] = $jpinfos['cat_id'];
                            $glattr['jp_cat_name'] = $jpinfos['cat_name'];
                            if ($jpinfos['jp_type'] != $jp_type) {
                                $rs['err'] = "jp_type_error";
                            } else {
                                $glattr['jp_type'] = $jp_type;
                                if ($jp_type == 0) {
                                    $glattr['l_eye_s'] = "";
                                    $glattr['l_eye_c'] = "";
                                    $glattr['l_eye_a'] = "";
                                    $glattr['l_eye_t'] = "";
                                    $glattr['r_eye_s'] = "";
                                    $glattr['r_eye_c'] = "";
                                    $glattr['r_eye_a'] = "";
                                    $glattr['r_eye_t'] = "";
                                    $glattr['pd_eye_t'] = "";
                                } else {
                                    if ($glattr['l_eye_c'] != "" && $glattr['l_eye_a'] == "") {
                                        $rs['err'] = "l_eye_a_error";
                                    } else if ($glattr['r_eye_c'] != "" && $glattr['r_eye_a'] == "") {
                                        $rs['err'] = "r_eye_a_error";
                                    } else if ($glattr['l_eye_t'] == "") {
                                        $rs['err'] = "l_eye_t_error";
                                    } else if ($glattr['r_eye_t'] == "") {
                                        $rs['err'] = "r_eye_t_error";
                                    } else if (((int)$glattr['l_eye_c'] + (int)$glattr['l_eye_s']) < $jpinfos['union_sc']) {
                                        $rs['err'] = "l_union_sc_error";
                                    } else if (((int)$glattr['r_eye_c'] + (int)$glattr['r_eye_s']) < $jpinfos['union_sc']) {
                                        $rs['err'] = "r_union_sc_error";
                                    } else if (((int)$glattr['l_eye_t'] + (int)$glattr['r_eye_t']) > $jpinfo['tg_max']) {
                                        $rs['err'] = "max_pd_error";
                                    } else if (((int)$glattr['l_eye_t'] + (int)$glattr['r_eye_t']) < $jpinfo['tg_min']) {
                                        $rs['err'] = "min_pd_error";
                                    }
                                }
                            }
                        } else {
                            $rs['err'] = "jp_error";
                        }
                    } else {
                        $rs['err'] = "jp_error";
                    }
                }
            }
            $jhid = $glattr["jh_id"];
            $czid = $glattr["cz_id"];
            if ($rs['err'] == "") {
               // if ($jhid >= 0) {
                 //   $sql = "SELECT * FROM " . $ecs->table('glasses_case') . " WHERE id=" . $jhid;
                 //   $jhinfo = $db->getRow($sql);
                    //if ($jhinfo['id'] > 0) {
                     //   $glattr['jh'] = $jhinfo['title'];
                      //  $glattr['jh_id'] = $jhinfo['id'];
                       // if ($czid > 0) {
                         //   $sql = "SELECT * FROM " . $ecs->table('glasses_case_child') . " WHERE parent_id=" . $jhid . " and id=" . $czid;
                          //  $czinfo = $db->getRow($sql);
                          //  if ($czinfo['id'] > 0) {
                               // if ($czinfo['dingzhi_number'] == 0) {
                                 //   array_push($dztime['type'], 'cz_id');
                                 //   array_push($dztime['type_id'], $czinfo['parent_id']);
                                  //  array_push($dztime['title'], $czinfo['title']);
                                 //   array_push($dztime['delivery_time'], $czinfo['delivery_time']);
                               // }
                               // $productNumber['cz'] = $czinfo['number'];
                               // $glattr['cz'] = $czinfo['child_title'];
                               // $glattr['cz_id'] = $czinfo['id'];
                          //  } else {
                              //  $rs['err'] = "cz_error";
                           // }
                      //  }
                  //  } else {
                      //  $rs['err'] = "jh_error";
                  //  }
               // } else {
                  //  $rs['err'] = "jh_error";
               // }
            }
            if ($rs['err'] == "") {
                $jk_w_text = $glattr['type_w_text'];
                $jk_n_text = $glattr['type_n_text'];
                $jh_line_one = $glattr['jh_line_one'];
                $jh_line_two = $glattr['jh_line_two'];
                if (strlen($jk_w_text) > 10) {
                    $rs['err'] = "w_text_length_error";
                } else if (strlen($jk_n_text) > 10) {
                    $rs['err'] = "n_text_length_error";
                } else if (strlen($jh_line_one) > 18) {
                    $rs['err'] = "jh_one_text_length_error";
                } else if (strlen($jh_line_two) > 18) {
                    $rs['err'] = "jh_two_text_length_error";
                }
            }
            $path = ROOT_PATH;
            if ($rs['err'] == "") {
                include_once (ROOT_PATH . '/includes/cls_image.php');
                $image = new cls_image($_CFG['bgcolor']);
                $randomnum = getRandomNum();
                $nimage = imagecreatetruecolor(1920, 1200);
                foreach ($img_c_array as $k => $v) {
                    $im = imagecreatefrompng($v['img_c']);
                    $size = getimagesize($v['img_c']);
                    $bgc = imagecolorallocate($im, 255, 255, 255);
                    $alpha = imagecolorallocatealpha($im, 0, 0, 0, 127);
                    imagefill($nimage, 0, 0, $alpha);
                    imagecopyresampled($nimage, $im, 0, 0, 0, 0, $size[0], $size[1], $size[0], $size[1]);
                    imagesavealpha($nimage, true);
                }
                $imgsrc_c = "data/dingzhi_sc/" . date("ymd") . time() . "_r" . $randomnum . ".png";
                Imagepng($nimage, $imgsrc_c);
                $thumb_c = $image->make_thumb($imgsrc_c, 880, 566, $path . "data/dingzhi_sc/","#f6f6f6");
                ImageDestroy($nimage);
                $nimage_r = imagecreatetruecolor(1920, 1200);
                foreach ($img_l_array as $k => $v) {
                    $ims = imagecreatefrompng($v['img_l']);
                    $size = getimagesize($v['img_l']);
                    $bgc = imagecolorallocate($ims, 255, 255, 255);
                    $alpha = imagecolorallocatealpha($ims, 0, 0, 0, 127);
                    imagefill($nimage_r, 0, 0, $alpha);
                    imagecopyresampled($nimage_r, $ims, 0, 0, 0, 0, $size[0], $size[1], $size[0], $size[1]);
                    imagesavealpha($nimage_r, true);
                }
                $sql = 'SELECT number ' . 'FROM ' . $ecs->table('dingzhi_peij') . 'AS ad ' . 'where relative_id=' . $attrid['jj_id'] . ' GROUP BY ad.id desc';
                $defaultnumber = $db->getAll($sql);
                if ($defaultnumber) {
                    $productNumber['peijian'] = $defaultnumber;
                }
                $randomnum = getRandomNum();
                $imgsrc_l = "data/dingzhi_sc/" . date("ymd") . time() . "_l" . $randomnum . ".png";
                Imagepng($nimage_r, $path . $imgsrc_l);
                ImageDestroy($nimage_r);
                $thumb_l = $image->make_thumb($imgsrc_l, 880, 566, $path . "data/dingzhi_sc/","#f6f6f6");
                $maxtime = max($dztime['delivery_time']);
                $key = array_search($maxtime, $dztime['delivery_time']);
                $type_lx = $dztime['type'][$key];
                $maxid = $dztime['type_id'][$key];
                $title = "";
                if ($maxid > 0) {
                    if ($type_lx != "cz_id" && $type_lx != "jp_id") {
                        $sql = "SELECT a.id,a.cat_name,a.cat_enname,a.type_c,b.name,b.enname FROM  " . $ecs->table('dingzhi_category') . " as a inner join " . $ecs->table('dingzhi_menu') . " as b on a.type_c=b.type_c WHERE a.id=" . $maxid;
                        $maxinfo = $db->getRow($sql);
                        $title = preg_replace("/(\s|\&nbsp\;||\xc2\xa0)/", "", strip_tags($maxinfo['name'])) . $maxinfo['cat_name'] . $dztime['title'][$key];
                    } else if ($type_lx == "jp_id") {
                        $sql = "SELECT * FROM  " . $ecs->table('dingzhi_jp') . " WHERE cat_id=" . $maxid;
                        $maxinfo = $db->getRow($sql);
                        $title = preg_replace("/(\s|\&nbsp\;||\xc2\xa0)/", "", strip_tags($maxinfo['name'])) . $maxinfo['cat_name'] . $dztime['title'][$key];
                    } //else if ($type_lx == "cz_id") {
                     //   $sql = "SELECT *  from " . $ecs->table('glasses_case') . " WHERE `id`=" . $maxid;
                     //   $maxinfo = $db->getRow($sql);
                      //  $title = "镜盒" . $maxinfo['title'] . $dztime['title'][$key];
                  //  }
                }
                if ($maxtime > $GLOBALS['_CFG']['dingzhi_day']) {
                    $glattr['maxtime'] = $maxtime;
                    $glattr['maxtime_title'] = $title;
                } else {
                    $glattr['maxtime'] = $GLOBALS['_CFG']['dingzhi_day'];
                    $glattr['maxtime_title'] = "";
                }
			    $glattr['brand_name'] = $jpinfo['brand'];
                $totalprices = array_sum($img_price);
                $totalprice = number_format($totalprices, 2);
                $sessionid = SESS_ID;
                $userid = $_SESSION['user_id'];
                $sql = "INSERT INTO " . $ecs->table('cart') . " (
`rec_id`, `user_id`, `session_id`, `goods_id`, `goods_sn`, 
`dingzhi_attr`, `dingzhi_img`, `dingzhi_thumb`,`dingzhi_side`, `dingzhi_side_thumb`,`dingzhi_attr_list`,`dingzhi_number`,`dingzhi_price`,`product_id`, `goods_name`, `market_price`, `goods_price`, `goods_number`, `goods_attr`, 
`is_real`, `extension_code`, `parent_id`, `rec_type`, `is_gift`, `is_shipping`, `can_handsel`, `goods_attr_id`, `order_descript`) 
VALUES (NULL, '" . $userid . "', '" . $sessionid . "', '0', '', '" . serialize($attrid) . "', '" . $imgsrc_c . "', '" . $thumb_c . "','" . $imgsrc_l . "','" . $thumb_l . "', '" . serialize($glattr) . "','" . serialize($productNumber) . "','" . serialize($img_price) . "',
 '0', '" . $jpinfo['cat_name'] . "', '" . $totalprices . "', '" . $totalprices . "', '1', '', '1', 'dingzhi', '0', '0', '0', '0', '0', '', '')";
                $state = $db->query($sql);
                if ($state !== false) {
					$cfcheck=$_POST['cfcheck'];
					if($cfcheck==1 && $jp_type==1){
						if($userid>0){
				  $sql="SELECT * FROM " .$ecs->table('chufang'). " WHERE uid = '$userid'";
				  $cfc=$db->getRow($sql);
				  if($cfc['id']>0){
					  		$sql="UPDATE " .$ecs->table('chufang'). " SET 
`l_eye_s` = '".$glattr['l_eye_s']."',
`l_eye_c` = '".$glattr['l_eye_c']."',
`l_eye_a` = '".$glattr['l_eye_a']."',
`l_eye_t` = '".$glattr['l_eye_t']."',
`r_eye_s` = '".$glattr['r_eye_s']."',
`r_eye_c` = '".$glattr['r_eye_c']."',
`r_eye_a` = '".$glattr['r_eye_a']."',
`r_eye_t` = '".$glattr['r_eye_t']."',
`pd_eye_t` = '".((int)$glattr['l_eye_t'] + (int)$glattr['r_eye_t'])."' WHERE `uid` =$userid";			  
$state=$db->query($sql); 
					  
				  }else{
					  
	$sql="INSERT INTO " .$ecs->table('chufang'). " (
`id` ,
`uid` ,
`l_eye_s` ,
`l_eye_c` ,
`l_eye_a` ,
`l_eye_t` ,
`r_eye_s` ,
`r_eye_c` ,
`r_eye_a` ,
`r_eye_t` ,
`pd_eye_t`
)
VALUES (
NULL ,'".$userid."','".$glattr['l_eye_s']."', '".$glattr['l_eye_c']."', '".$glattr['l_eye_a']."', '".$glattr['l_eye_t']."', '".$glattr['r_eye_s']."', '".$glattr['r_eye_c']."', '".$glattr['r_eye_a']."', '".$glattr['r_eye_t']."', '".((int)$glattr['l_eye_t'] + (int)$glattr['r_eye_t'])."')";

$state=$db->query($sql);				  
					  
				  }
							
						}
			
						
					}
                    $rs['err'] = "save_sucess";
                } else {
                    $rs['err'] = "save_fail";
                }
            }
        } else {
            $rs['err'] = "id_error";
        }
    } else {
        $rs['err'] = "id_error";
    }
    die($json->encode($rs));
} else if ($_REQUEST['step'] == "edit_dingzhi_cart") {
    include_once ('includes/cls_json.php');
    $dztime = array(
        "title" => array() ,
        "type" => array() ,
        "type_id" => array() ,
        "delivery_time" => array()
    );
    $tocken = geturl($_POST['tocken'], URL_KEY);
    $rs = array(
        "err" => '',
        "oldimg_l" => '',
        "thump_img_l" => ''
    );
    $json = new JSON;
    $rec_id = $tocken['rec_id'];
    $productNumber = array();
    if ($rec_id > 0) {
        $sql = "SELECT  * FROM " . $ecs->table('cart') . " WHERE rec_id = '$rec_id' AND session_id = '" . SESS_ID . "'";
        $recinfo = $db->getRow($sql);
        $oldimg = $recinfo['dingzhi_img'];
        $oldimgthump = $recinfo['dingzhi_thumb'];
        if ($recinfo['rec_id'] > 0) {
            $attrinfo = unserialize($recinfo['dingzhi_attr']);
            $jjid = $attrinfo['jj_id'];
            $attrid = $_POST['glattrid'];
            if ($jjid > 0) {
                $sql = "SELECT * FROM  " . $ecs->table('dingzhi_type') . " WHERE `id`=" . $jjid;
                $jpinfo = $db->getRow($sql);
                $productNumber['zjk_number'] = $jpinfo['number'];
                if ($jpinfo['id'] > 0) {
                    $img_c_array = array();
                    $img_l_array = array();
                    $img_price = array();
                    $img_price['zjk_price'] = $jpinfo['price'];
                    $attr_info = array();
                    $attr_array = array();
                    $glattr = $_POST['glattr'];
                    $sql = "SELECT * FROM  " . $ecs->table('dingzhi_attr') . " WHERE `pid`=" . $jjid;
                    $attrlist = $db->getAll($sql);
                    $sql = "SELECT * FROM  " . $ecs->table('dingzhi_jp_set') . " WHERE `relative_id`=" . $attrid['jj_id'];
                    $jplist = $db->getAll($sql);
                    $jparray = array();
                    for ($i = 0; $i < count($jplist); $i++) {
                        $jparray[$i] = $jplist[$i]['jp_t'];
                    }
                    foreach ($attrlist as $val) {
                        $attr_array[$val['id']] = $val;
                    }
                    foreach ($attrid as $k => $v) {
                        if (!empty($v) && $k != "jj_id" && $k != "jp_type_id" && $k != "jp_id") {
                            if ($attr_array[$v]['id'] > 0) {
                                $img_price[$k] = $attr_array[$v]['price'];
                                if ($k != "jt_id") {
                                    $img_c_array[$v]['img_c'] = $attr_array[$v]['img_c'];
                                }
                                $img_l_array[$v]['img_l'] = $attr_array[$v]['img_l'];
                                $attr_info[$v]['title'] = $attr_array[$v]['title'];
                                if ($k == "jk_id") {
                                    $glattr['jk'] = $attr_info[$v]['title'];
                                } else if ($k == "qk_id") {
                                    $glattr['qk'] = $attr_info[$v]['title'];
                                } else if ($k == "sj_id") {
                                    $glattr['sj'] = $attr_info[$v]['title'];
                                } else if ($k == "jt_id") {
                                    $glattr['jt'] = $attr_info[$v]['title'];
                                } else if ($k == "jtt_id") {
                                    $glattr['jtt'] = $attr_info[$v]['title'];
                                } else if ($k == "wj_id") {
                                    $glattr['wj'] = $attr_info[$v]['title'];
                                }
                                $k_v = explode("_", $k);
                                $kv = $k_v[0];
                                if (!isset($img_c_array[$v]['number'])) {
                                    $productNumber[$kv] = $img_c_array[$v]['number'];
                                }
                                if (!isset($img_c_array[$v]['r_number'])) {
                                    $productNumber[$kv . "_r"] = $img_c_array[$v]['r_number'];
                                }
                                $attr_info[$v]['en_title'] = $attr_array[$v]['en_title'];
                                $attr_info[$v]['color'] = $attr_array[$v]['color'];
                                $attr_info[$v]['color_img'] = $attr_array[$v]['color_img'];
                                $attr_info[$v]['type_id'] = $attr_array[$v]['type_id'];
                                $pzrstate = isset($attr_array[$v]['r_number']) ? true : false;
                                $zrstate = isset($attr_array[$v]['number']) ? true : false;
                                if ($pzrstate && $zrstate) {
                                    $minnumber = min($attr_array[$v]['r_dingzhi_number'], $attr_array[$v]['dingzhi_number']);
                                } else if (!$pzrstate && $zrstate) {
                                    $minnumber = $attr_array[$v]['dingzhi_number'];
                                } else if ($pzrstate && !$zrstate) {
                                    $minnumber = $attr_array[$v]['r_dingzhi_number'];
                                }
                                if ($minnumber == 0) {
                                    array_push($dztime['type'], $k);
                                    array_push($dztime['type_id'], $attr_array[$v]['type_id']);
                                    array_push($dztime['title'], $attr_array[$v]['title']);
                                    array_push($dztime['delivery_time'], $attr_array[$v]['delivery_time']);
                                }
                            } else {
                                $rs['err'] = $k . "_error";
                                break;
                            }
                        }
                    }
                    if (!empty($attrid['jp_id'])) {
                        if (in_array($attrid['jp_id'], $jparray)) {
                            $sql = "SELECT * FROM  " . $ecs->table('dingzhi_attr') . " WHERE `id`=" . $attrid['jp_id'];
                            $jpinfos = $db->getRow($sql);
                            $glattr['jp'] = $jpinfos['title'];
                            $img_price['jp_id'] = $jpinfos['price'];
                            $img_c_array[$attrid['jp_id']]['img_c'] = $jpinfos['img_c'];
                            $img_l_array[$attrid['jp_id']]['img_l'] = $jpinfos['img_l'];
                            $attr_info[$attrid['jp_id']]['en_title'] = $jpinfos['en_title'];
                            $attr_info[$attrid['jp_id']]['color'] = $jpinfos['color'];
                            $attr_info[$attrid['jp_id']]['color_img'] = $jpinfos['color_img'];
                            $attr_info[$attrid['jp_id']]['type_id'] = $jpinfos['type_id'];
                            if ($jpinfos['dingzhi_number'] == 0) {
                                array_push($dztime['type'], "jp_id");
                                array_push($dztime['type_id'], $jpinfos['gid']);
                                array_push($dztime['title'], $jpinfos['title']);
                                array_push($dztime['delivery_time'], $jpinfos['delivery_time']);
                            }
                            $productNumber['jp'] = $jpinfos['number'];
                        } else {
                            $rs['err'] = "jp_id_error";
                        }
                    } else {
                        $rs['err'] = "jp_id_error";
                    }
                    $jp_type = $_POST['jp_type'];
                    $old_img = $_POST['old_img'];
                    /*if (count($rs) == 0) {
                        if (empty($glattr['size_id'])) {
                            $rs['err'] = "size_error";
                        } else {
                            $sql = "SELECT * FROM " . $ecs->table('dingzhi_size') . " WHERE id=" . $glattr['size_id'] . " and type_id=" . $jjid;
                            $sizeinfo = $db->getRow($sql);
                            if (!$sizeinfo['id'] > 0) {
                                $glattr['size'] = $sizeinfo['size'];
                                $glattr['size_id'] = $sizeinfo['id'];
                                $rs['err'] = "size_id_error";
                            }
                        }
                    }*/
                    if ($rs['err'] == "") {
                        $jptypeid = $attrid['jp_type_id'];
                        if ($jptypeid > 0) {
                            if (empty($jptype)) {
                                $sql = "SELECT * FROM " . $ecs->table('dingzhi_jp') . " WHERE cat_id=" . $jptypeid;
                                $jpinfos = $db->getRow($sql);
                                if ($jpinfos['cat_id'] > 0) {
                                    $glattr['jp_id'] = $jpinfos['cat_id'];
                                    if ($jpinfos['jp_type'] != $jp_type) {
                                        $rs['err'] = "jp_type_error";
                                    } else {
                                        $glattr['jp_type'] = $jp_type;
                                        if ($jp_type == 0) {
                                            $glattr['l_eye_s'] = "";
                                            $glattr['l_eye_c'] = "";
                                            $glattr['l_eye_a'] = "";
                                            $glattr['l_eye_t'] = "";
                                            $glattr['r_eye_s'] = "";
                                            $glattr['r_eye_c'] = "";
                                            $glattr['r_eye_a'] = "";
                                            $glattr['r_eye_t'] = "";
                                            $glattr['pd_eye_t'] = "";
                                        } else {
                                            if ($glattr['l_eye_c'] != "" && $glattr['l_eye_a'] == "") {
                                                $rs['err'] = "l_eye_a_error";
                                            } else if ($glattr['r_eye_c'] != "" && $glattr['r_eye_a'] == "") {
                                                $rs['err'] = "r_eye_a_error";
                                            } else if ($glattr['l_eye_t'] == "") {
                                                $rs['err'] = "l_eye_t_error";
                                            } else if ($glattr['r_eye_t'] == "") {
                                                $rs['err'] = "r_eye_t_error";
                                            } else if (((int)$glattr['l_eye_c'] + (int)$glattr['l_eye_s']) < $jpinfos['union_sc']) {
                                                $rs['err'] = "l_union_sc_error";
                                            } else if (((int)$glattr['r_eye_c'] + (int)$glattr['r_eye_s']) < $jpinfos['union_sc']) {
                                                $rs['err'] = "r_union_sc_error";
                                            } else if (((int)$glattr['l_eye_t'] + (int)$glattr['r_eye_t']) > $jpinfo['tg_max']) {
                                                $rs['err'] = "max_pd_error";
                                            } else if (((int)$glattr['l_eye_t'] + (int)$glattr['r_eye_t']) < $jpinfo['tg_min']) {
                                                $rs['err'] = "min_pd_error";
                                            }
                                        }
                                    }
                                } else {
                                    $rs['err'] = "jp_error";
                                }
                            } else {
                                $rs['err'] = "jp_error";
                            }
                        }
                    }
                   /* $jhid = $glattr["jh_id"];
                    $czid = $glattr["cz_id"];
                    if ($rs['err'] == "") {
                        if ($jhid >= 0) {
                            $sql = "SELECT * FROM " . $ecs->table('glasses_case') . " WHERE id=" . $jhid;
                            $jhinfo = $db->getRow($sql);
                            if ($jhinfo['id'] > 0) {
                                $glattr['jh'] = $jhinfo['title'];
                                $glattr['jh_id'] = $jhinfo['id'];
                                if ($czid > 0) {
                                    $sql = "SELECT * FROM " . $ecs->table('glasses_case_child') . " WHERE parent_id=" . $jhid . " and id=" . $czid;
                                    $czinfo = $db->getRow($sql);
                                    if ($czinfo['id'] > 0) {
                                        if ($czinfo['dingzhi_number'] == 0) {
                                            array_push($dztime['type'], 'cz_id');
                                            array_push($dztime['type_id'], $czinfo['parent_id']);
                                            array_push($dztime['title'], $czinfo['title']);
                                            array_push($dztime['delivery_time'], $czinfo['delivery_time']);
                                        }
                                        $glattr['cz'] = $czinfo['child_title'];
                                        $glattr['cz_id'] = $czinfo['id'];
                                        $productNumber['cz'] = $czinfo['number'];
                                    } else {
                                        $rs['err'] = "cz_error";
                                    }
                                }
                            } else {
                                $rs['err'] = "jh_error";
                            }
                        } else {
                            $rs['err'] = "jh_error";
                        }
                    }*/
                    if ($rs['err'] == "") {
                        $jk_w_text = $glattr['type_w_text'];
                        $jk_n_text = $glattr['type_n_text'];
                        $jh_line_one = $glattr['jh_line_one'];
                        $jh_line_two = $glattr['jh_line_two'];
                        if (strlen($jk_w_text) > 10) {
                            $rs['err'] = "w_text_length_error";
                        } else if (strlen($jk_n_text) > 10) {
                            $rs['err'] = "n_text_length_error";
                        } else if (strlen($jh_line_one) > 18) {
                            $rs['err'] = "jh_one_text_length_error";
                        } else if (strlen($jh_line_two) > 18) {
                            $rs['err'] = "jh_two_text_length_error";
                        }
                    }
                    $path = ROOT_PATH;
                    if ($rs['err'] == "") {
                        include_once (ROOT_PATH . '/includes/cls_image.php');
                        $image = new cls_image($_CFG['bgcolor']);
                        $randomnum = getRandomNum();
                        $nimage = imagecreatetruecolor(1920, 1200);
                        foreach ($img_c_array as $k => $v) {
                            $im = imagecreatefrompng($v['img_c']);
                            $size = getimagesize($v['img_c']);
                            $bgc = imagecolorallocate($im, 255, 255, 255);
                            $alpha = imagecolorallocatealpha($im, 0, 0, 0, 127);
                            imagefill($nimage, 0, 0, $alpha);
                            imagecopyresampled($nimage, $im, 0, 0, 0, 0, $size[0], $size[1], $size[0], $size[1]);
                            imagesavealpha($nimage, true);
                        }
                        $imgsrc_c = "data/dingzhi_sc/" . date("ymd") . time() . "_r" . $randomnum . ".png";
                        Imagepng($nimage, $imgsrc_c);
                        $thumb_c = $image->make_thumb($imgsrc_c, 880, 566, $path . "data/dingzhi_sc/","#f6f6f6");
                        ImageDestroy($nimage);
                        $nimage_r = imagecreatetruecolor(1920, 1200);
                        foreach ($img_l_array as $k => $v) {
                            $iml = imagecreatefrompng($v['img_l']);
                            $size = getimagesize($v['img_l']);
                            $bgc = imagecolorallocate($iml, 255, 255, 255);
                            $alpha = imagecolorallocatealpha($iml, 0, 0, 0, 127);
                            imagefill($nimage_r, 0, 0, $alpha);
                            imagecopyresampled($nimage_r, $iml, 0, 0, 0, 0, $size[0], $size[1], $size[0], $size[1]);
                            imagesavealpha($nimage_r, true);
                        }
                        $randomnum = getRandomNum();
                        $imgsrc_l = "data/dingzhi_sc/" . date("ymd") . time() . "_l" . $randomnum . ".png";
                        Imagepng($nimage_r, $path . $imgsrc_l);
                        ImageDestroy($nimage_r);
                        $thumb_l = $image->make_thumb($imgsrc_l, 880, 566, $path . "data/dingzhi_sc/","#f6f6f6");
                        $maxtime = max($dztime['delivery_time']);
                        $key = array_search($maxtime, $dztime['delivery_time']);
                        $type_lx = $dztime['type'][$key];
                        $maxid = $dztime['type_id'][$key];
                        $title = "";
                        if ($maxid > 0) {
                            if ($type_lx != "cz_id" && $type_lx != "jp_id") {
                                $sql = "SELECT a.id,a.cat_name,a.cat_enname,a.type_c,b.name,b.enname FROM  " . $ecs->table('dingzhi_category') . " as a inner join " . $ecs->table('dingzhi_menu') . " as b on a.type_c=b.type_c WHERE a.id=" . $maxid;
                                $maxinfo = $db->getRow($sql);
                                $title = preg_replace("/(\s|\&nbsp\;||\xc2\xa0)/", "", strip_tags($maxinfo['name'])) . " " . $maxinfo['cat_name'] . $dztime['title'][$key];
                            } else if ($type_lx == "jp_id") {
                                $sql = "SELECT * FROM  " . $ecs->table('dingzhi_jp') . " WHERE cat_id=" . $maxid;
                                $maxinfo = $db->getRow($sql);
                                $title = preg_replace("/(\s|\&nbsp\;||\xc2\xa0)/", "", strip_tags($maxinfo['name'])) . " " . $maxinfo['cat_name'] . $dztime['title'][$key];
                            } //else if ($type_lx == "cz_id") {
                               // $sql = "SELECT *  from " . $ecs->table('glasses_case') . " WHERE `id`=" . $maxid;
                             //   $maxinfo = $db->getRow($sql);
                             //   $title = "镜盒 " . $maxinfo['title'] . $dztime['title'][$key];
                           // }
                        }
                        if ($maxtime > $GLOBALS['_CFG']['dingzhi_day']) {
                            $glattr['maxtime'] = $maxtime;
                            $glattr['maxtime_title'] = $title;
                        } else {
                            $glattr['maxtime'] = $GLOBALS['_CFG']['dingzhi_day'];
                            $glattr['maxtime_title'] = "";
                        }
						$glattr['brand_name'] = $jpinfo['brand'];
                        $rs['oldimg_l'] = $imgsrc_l;
                        $rs['thump_img_l'] = $thumb_l;
                        $sql = 'SELECT number ' . 'FROM ' . $ecs->table('dingzhi_peij') . 'AS ad ' . 'where relative_id=' . $attrid['jj_id'] . ' GROUP BY ad.id desc';
                        $defaultnumber = $db->getAll($sql);
                        if ($defaultnumber) {
                            $productNumber['peijian'] = $defaultnumber;
                        }
                        $totalprices = array_sum($img_price);
                        $totalprice = number_format($totalprices, 2);
                        $sessionid = SESS_ID;
                        $userid = $_SESSION['user_id'];
                        $dzsql = "SELECT * FROM " . $ecs->table('cart') . "  where rec_id=" . $rec_id . " AND session_id = '" . SESS_ID . "'";
                        $dzinfos = $db->getRow($dzsql);
                        $sql = "UPDATE  " . $ecs->table('cart') . " SET   
`dingzhi_attr`='" . serialize($attrid) . "', `dingzhi_img`='" . $imgsrc_c . "', `dingzhi_thumb`='" . $thumb_c . "',`dingzhi_side`='" . $imgsrc_l . "', `dingzhi_side_thumb`='" . $thumb_l . "',
`dingzhi_attr_list`= '" . serialize($glattr) . "',`dingzhi_number`='" . serialize($productNumber) . "',`dingzhi_price`='" . serialize($img_price) . "', `goods_name`= '" . $jpinfo['cat_name'] . "', `market_price`='" . $totalprices . "', `goods_price`='" . $totalprices . "' where rec_id=" . $rec_id . " AND session_id = '" . SESS_ID . "'";
                        $state = $db->query($sql);
                        if ($state !== false) {
                            if (is_file($dzinfos['dingzhi_thumb'])) {
                                @unlink($dzinfos['dingzhi_thumb']);
                            }
                            if (is_file($dzinfos['dingzhi_img'])) {
                                @unlink($dzinfos['dingzhi_img']);
                            }
							
								$cfcheck=$_POST['cfcheck'];
					if($cfcheck==1 && $jp_type==1){
						if($userid>0){
				  $sql="SELECT * FROM " .$ecs->table('chufang'). " WHERE uid = '$userid'";
				  $cfc=$db->getRow($sql);
				  if($cfc['id']>0){
					  		$sql="UPDATE " .$ecs->table('chufang'). " SET 
`l_eye_s` = '".$glattr['l_eye_s']."',
`l_eye_c` = '".$glattr['l_eye_c']."',
`l_eye_a` = '".$glattr['l_eye_a']."',
`l_eye_t` = '".$glattr['l_eye_t']."',
`r_eye_s` = '".$glattr['r_eye_s']."',
`r_eye_c` = '".$glattr['r_eye_c']."',
`r_eye_a` = '".$glattr['r_eye_a']."',
`r_eye_t` = '".$glattr['r_eye_t']."',
`pd_eye_t` = '".((int)$glattr['l_eye_t'] + (int)$glattr['r_eye_t'])."' WHERE `uid` =$userid";			  
$state=$db->query($sql); 
					  
				  }else{
					  
	$sql="INSERT INTO " .$ecs->table('chufang'). " (
`id` ,
`uid` ,
`l_eye_s` ,
`l_eye_c` ,
`l_eye_a` ,
`l_eye_t` ,
`r_eye_s` ,
`r_eye_c` ,
`r_eye_a` ,
`r_eye_t` ,
`pd_eye_t`
)
VALUES (
NULL ,'".$userid."','".$glattr['l_eye_s']."', '".$glattr['l_eye_c']."', '".$glattr['l_eye_a']."', '".$glattr['l_eye_t']."', '".$glattr['r_eye_s']."', '".$glattr['r_eye_c']."', '".$glattr['r_eye_a']."', '".$glattr['r_eye_t']."', '".((int)$glattr['l_eye_t'] + (int)$glattr['r_eye_t'])."')";

$state=$db->query($sql);				  
					  
				  }
							
						}
			
						
					}
							
                            $rs['err'] = "save_sucess";
                        } else {
                            $rs['err'] = "save_fail";
                        }
                    }
                } else {
                    $rs['err'] = "id_error";
                }
            } else {
                $rs['err'] = "id_error";
            }
        } else {
            $rs['err'] = "rec_id_error";
        }
    } else {
        $rs['err'] = "rec_id_error";
    }
    die($json->encode($rs));
} elseif ($_REQUEST['step'] == 'link_buy') {
    $goods_id = intval($_GET['goods_id']);
    if (!cart_goods_exists($goods_id, array())) {
        addto_cart($goods_id);
    }
    ecs_header("Location:./flow.php\n");
    exit;
} elseif ($_REQUEST['step'] == 'login') {
    include_once ('languages/' . $_CFG['lang'] . '/user.php');
    /*
     * 用户登录注册
    */
    $sql = "SELECT * FROM " . $ecs->table('rfinfo') . " WHERE id=1";
    $gginfo = $db->getRow($sql);
    $smarty->assign('gginfo', $gginfo);
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $smarty->assign('anonymous_buy', $_CFG['anonymous_buy']);
        /* 检查是否有赠品，如果有提示登录后重新选择赠品 */
        $sql = "SELECT COUNT(*) FROM " . $ecs->table('cart') . " WHERE session_id = '" . SESS_ID . "' AND is_gift > 0";
        if ($db->getOne($sql) > 0) {
            $smarty->assign('need_rechoose_gift', 1);
        }
        /* 检查是否需要注册码 */
        $captcha = intval($_CFG['captcha']);
        if (($captcha & CAPTCHA_LOGIN) && (!($captcha & CAPTCHA_LOGIN_FAIL) || (($captcha & CAPTCHA_LOGIN_FAIL) && $_SESSION['login_fail'] > 2)) && gd_version() > 0) {
            $smarty->assign('enabled_login_captcha', 1);
            $smarty->assign('rand', mt_rand());
        }
        if ($captcha & CAPTCHA_REGISTER) {
            $smarty->assign('enabled_register_captcha', 1);
            $smarty->assign('rand', mt_rand());
        }
    } else {
        include_once ('includes/lib_passport.php');
        if (!empty($_POST['act']) && $_POST['act'] == 'signin') {
            $captcha = intval($_CFG['captcha']);
            if (($captcha & CAPTCHA_LOGIN) && (!($captcha & CAPTCHA_LOGIN_FAIL) || (($captcha & CAPTCHA_LOGIN_FAIL) && $_SESSION['login_fail'] > 2)) && gd_version() > 0) {
                if (empty($_POST['captcha'])) {
                    show_message($_LANG['invalid_captcha']);
                }
                /* 检查验证码 */
                include_once ('includes/cls_captcha.php');
                $validator = new captcha();
                $validator->session_word = 'captcha_login';
                if (!$validator->check_word($_POST['captcha'])) {
                    show_message($_LANG['invalid_captcha']);
                }
            }
            if ($user->login($_POST['username'], $_POST['password'], isset($_POST['remember']))) {
                update_user_info(); //更新用户信息
                recalculate_price(); // 重新计算购物车中的商品价格
                /* 检查购物车中是否有商品 没有商品则跳转到首页 */
                $sql = "SELECT COUNT(*) FROM " . $ecs->table('cart') . " WHERE session_id = '" . SESS_ID . "' ";
                if ($db->getOne($sql) > 0) {
                    ecs_header("Location: flow.php?step=checkout\n");
                } else {
                    ecs_header("Location:index.php\n");
                }
                exit;
            } else {
                $_SESSION['login_fail']++;
                show_message($_LANG['signin_failed'], '', 'user.php?act=login');
            }
        } elseif (!empty($_POST['act']) && $_POST['act'] == 'signup') {
            if ((intval($_CFG['captcha']) & CAPTCHA_REGISTER) && gd_version() > 0) {
                if (empty($_POST['captcha'])) {
                    show_message($_LANG['invalid_captcha']);
                }
                /* 检查验证码 */
                include_once ('includes/cls_captcha.php');
                $validator = new captcha();
                if (!$validator->check_word($_POST['captcha'])) {
                    show_message($_LANG['invalid_captcha']);
                }
            }
            if (register(trim($_POST['username']) , trim($_POST['password']) , trim($_POST['email']))) {
                /* 用户注册成功 */
                ecs_header("Location: flow.php?step=consignee\n");
                exit;
            } else {
                $err->show();
            }
        } else {
            // TODO: 非法访问的处理
            
        }
    }
} elseif ($_REQUEST['step'] == 'check_address') {
    if ($_SESSION['user_id'] > 0) {
        $sql = "SELECT COUNT(*) FROM " . $ecs->table('cart') . " WHERE session_id = '" . SESS_ID . "' " . "AND parent_id = 0 AND is_gift = 0 AND rec_type = '$flow_type'";
        $goodstotal = $db->getOne($sql);
        if ($goodstotal == 0) {
            show_message($_LANG['no_goods_in_cart'], '', '', 'warning');
        }
        $default_id = $db->getOne("SELECT address_id FROM " . $ecs->table('users') . " where user_id=" . $_SESSION['user_id']);
        $smarty->assign('shop_province_list', get_regions(1, $_CFG['shop_country']));
        $sql = "SELECT * FROM " . $ecs->table('user_address') . " where user_id=" . $_SESSION['user_id'];
        $addresslist = $db->getAll($sql);
        for ($i = 0; $i < count($addresslist); $i++) {
            $province = $db->getOne("SELECT region_name FROM " . $ecs->table('region') . " where region_id=" . $addresslist[$i]['province']);
            $city = $db->getOne("SELECT region_name FROM " . $ecs->table('region') . " where region_id=" . $addresslist[$i]['city']);
            $district = $db->getOne("SELECT region_name FROM " . $ecs->table('region') . " where region_id=" . $addresslist[$i]['district']);
            $addresslist[$i]['address'] = $province . $city . $district . $addresslist[$i]['address'];
        }
        $consignee = get_consignee($_SESSION['user_id']);
        $smarty->assign('addresslist', $addresslist);
        $smarty->assign('user_id', $_SESSION['user_id']);
        $_SESSION['flow_consignee'] = $consignee;
        $smarty->assign('default_id', $default_id);
        // $gca=getCatArticle();
        // $smarty->assign('article', $gca['artlist']);
        
    } else {
        ecs_header("Location: user.php?act=login\n");
    }
} elseif ($_REQUEST['step'] == 'add_check_address') {
    if ($_SESSION['user_id'] > 0) {
        $address_type = $_POST['moren'];
        if ($address_type == "add_new_address") {
            include_once (ROOT_PATH . 'includes/lib_transaction.php');
            include_once (ROOT_PATH . 'languages/' . $_CFG['lang'] . '/shopping_flow.php');
            $consignee_list = get_consignee_all_list($_SESSION['user_id']);
            $count = count($consignee_list);
            if ($count < 10) {
                $smarty->assign('lang', $_LANG);
                $address = array(
                    'user_id' => $_SESSION['user_id'],
                    'country' => isset($_POST['country']) ? intval($_POST['country']) : 1,
                    'province' => isset($_POST['province']) ? intval($_POST['province']) : 0,
                    'city' => isset($_POST['city']) ? intval($_POST['city']) : 0,
                    'district' => isset($_POST['district']) ? intval($_POST['district']) : 0,
                    'address' => isset($_POST['address']) ? trim($_POST['address']) : '',
                    'consignee' => isset($_POST['consignee']) ? trim($_POST['consignee']) : '',
                    'email' => isset($_POST['email']) ? trim($_POST['email']) : '',
                    'tel' => isset($_POST['tel']) ? make_semiangle(trim($_POST['tel'])) : '',
                    'mobile' => isset($_POST['mobile']) ? make_semiangle(trim($_POST['mobile'])) : '',
                    'best_time' => isset($_POST['best_time']) ? trim($_POST['best_time']) : '',
                    'sign_building' => isset($_POST['sign_building']) ? trim($_POST['sign_building']) : '',
                    'zipcode' => isset($_POST['zipcode']) ? make_semiangle(trim($_POST['zipcode'])) : '',
                );
                $insertstate = $GLOBALS['db']->autoExecute($GLOBALS['ecs']->table('user_address') , $address, 'INSERT');
                $address_id = $GLOBALS['db']->insert_id();
                $address['user_id'] = $_SESSION['user_id'];
                if ($count == 0) {
                    if ($insertstate) {
                        $state = $db->query("UPDATE  " . $ecs->table('users') . " SET address_id='$address_id' WHERE user_id=" . $_SESSION['user_id']);
                    }
                    //$consignee['user_id'] = $_SESSION['user_id'];
                    // exit;
                    // $_SESSION['flow_consignee'] = stripslashes_deep($address);
                    // show_message("新增收货地址保存成功", $_LANG['address_list_lnk'], 'user.php?act=address_list');
                    
                }
                ecs_header("Location: flow.php?step=checkout\n");
            } else {
                show_message("已超过最大的10条记录，新增收货地址保存失败", $_LANG['address_list_lnk'], 'flow.php?step=check_address');
            }
        } else {
            if ($address_type > 0) {
                $sql = "UPDATE  " . $ecs->table('users') . " SET address_id=" . $address_type . " where user_id=" . $_SESSION['user_id'];
                $state = $db->query($sql);
                if ($state) {
                    ecs_header("Location: flow.php?step=checkout\n");
                } else {
                    echo "<script>alert('默认地址设置失败!');history.back(-1);</script>";
                    exit();
                }
            } else {
                ecs_header("Location: flow.php?step=checkout\n");
            }
        }
    } else {
        ecs_header("Location: user.php?act=login\n");
    }
} elseif ($_REQUEST['step'] == 'consignee') {
    /*------------------------------------------------------ */
    //-- 收货人信息
    /*------------------------------------------------------ */
    include_once ('includes/lib_transaction.php');
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        /* 取得购物类型 */
        $flow_type = isset($_SESSION['flow_type']) ? intval($_SESSION['flow_type']) : CART_GENERAL_GOODS;
        /*
         * 收货人信息填写界面
        */
        if (isset($_REQUEST['direct_shopping'])) {
            $_SESSION['direct_shopping'] = 1;
        }
        /* 取得国家列表、商店所在国家、商店所在国家的省列表 */
        $smarty->assign('country_list', get_regions());
        $smarty->assign('shop_country', $_CFG['shop_country']);
        $smarty->assign('shop_province_list', get_regions(1, $_CFG['shop_country']));
        /* 获得用户所有的收货人信息 */
        if ($_SESSION['user_id'] > 0) {
            $consignee_list = get_consignee_list($_SESSION['user_id']);
            if (count($consignee_list) < 5) {
                /* 如果用户收货人信息的总数小于 5 则增加一个新的收货人信息 */
                $consignee_list[] = array(
                    'country' => $_CFG['shop_country'],
                    'email' => isset($_SESSION['email']) ? $_SESSION['email'] : ''
                );
            }
        } else {
            if (isset($_SESSION['flow_consignee'])) {
                $consignee_list = array(
                    $_SESSION['flow_consignee']
                );
            } else {
                $consignee_list[] = array(
                    'country' => $_CFG['shop_country']
                );
            }
        }
        $smarty->assign('name_of_region', array(
            $_CFG['name_of_region_1'],
            $_CFG['name_of_region_2'],
            $_CFG['name_of_region_3'],
            $_CFG['name_of_region_4']
        ));
        $smarty->assign('consignee_list', $consignee_list);
        /* 取得每个收货地址的省市区列表 */
        $province_list = array();
        $city_list = array();
        $district_list = array();
        foreach ($consignee_list as $region_id => $consignee) {
            $consignee['country'] = isset($consignee['country']) ? intval($consignee['country']) : 0;
            $consignee['province'] = isset($consignee['province']) ? intval($consignee['province']) : 0;
            $consignee['city'] = isset($consignee['city']) ? intval($consignee['city']) : 0;
            $province_list[$region_id] = get_regions(1, $consignee['country']);
            $city_list[$region_id] = get_regions(2, $consignee['province']);
            $district_list[$region_id] = get_regions(3, $consignee['city']);
        }
        $smarty->assign('province_list', $province_list);
        $smarty->assign('city_list', $city_list);
        $smarty->assign('district_list', $district_list);
        /* 返回收货人页面代码 */
        $smarty->assign('real_goods_count', exist_real_goods(0, $flow_type) ? 1 : 0);
    } else {
        /*
         * 保存收货人信息
        */
        $consignee = array(
            'address_id' => empty($_POST['address_id']) ? 0 : intval($_POST['address_id']) ,
            'consignee' => empty($_POST['consignee']) ? '' : trim($_POST['consignee']) ,
            'country' => empty($_POST['country']) ? '' : $_POST['country'],
            'province' => empty($_POST['province']) ? '' : $_POST['province'],
            'city' => empty($_POST['city']) ? '' : $_POST['city'],
            'district' => empty($_POST['district']) ? '' : $_POST['district'],
            'email' => empty($_POST['email']) ? '' : $_POST['email'],
            'address' => empty($_POST['address']) ? '' : $_POST['address'],
            'zipcode' => empty($_POST['zipcode']) ? '' : make_semiangle(trim($_POST['zipcode'])) ,
            'tel' => empty($_POST['tel']) ? '' : make_semiangle(trim($_POST['tel'])) ,
            'mobile' => empty($_POST['mobile']) ? '' : make_semiangle(trim($_POST['mobile'])) ,
            'sign_building' => empty($_POST['sign_building']) ? '' : $_POST['sign_building'],
            'best_time' => empty($_POST['best_time']) ? '' : $_POST['best_time'],
        );
        if ($_SESSION['user_id'] > 0) {
            include_once (ROOT_PATH . 'includes/lib_transaction.php');
            /* 如果用户已经登录，则保存收货人信息 */
            $consignee['user_id'] = $_SESSION['user_id'];
            save_consignee($consignee, true);
        }
        /* 保存到session */
        $_SESSION['flow_consignee'] = stripslashes_deep($consignee);
        ecs_header("Location: flow.php?step=checkout\n");
        exit;
    }
} elseif ($_REQUEST['step'] == 'drop_consignee') {
    /*------------------------------------------------------ */
    //-- 删除收货人信息
    /*------------------------------------------------------ */
    include_once ('includes/lib_transaction.php');
    $consignee_id = intval($_GET['id']);
    if (drop_consignee($consignee_id)) {
        ecs_header("Location: flow.php?step=consignee\n");
        exit;
    } else {
        show_message($_LANG['not_fount_consignee']);
    }
} elseif ($_REQUEST['step'] == 'checkout') {
    include_once (ROOT_PATH . 'includes/lib_transaction.php');
    /*------------------------------------------------------ */
    //-- 订单确认
    /*------------------------------------------------------ */
    /* 取得购物类型 */
    $flow_type = isset($_SESSION['flow_type']) ? intval($_SESSION['flow_type']) : CART_GENERAL_GOODS;
	
	   $sql = "SELECT COUNT(*) as cun FROM " . $ecs->table('cart') . " WHERE session_id = '" . SESS_ID . "' " . "AND parent_id = 0 AND is_gift = 0 AND rec_type = '$flow_type'";
    $goodstotal = $db->getRow($sql);
    
    if ($goodstotal['cun'] == 0) {
            ecs_header("Location:user.php?act=order_list\n");
        exit;
    }
    /* 团购标志 */
    if ($flow_type == CART_GROUP_BUY_GOODS) {
        $smarty->assign('is_group_buy', 1);
    }
    /* 积分兑换商品 */
    elseif ($flow_type == CART_EXCHANGE_GOODS) {
        $smarty->assign('is_exchange_goods', 1);
    } else {
        //正常购物流程  清空其他购物流程情况
        $_SESSION['flow_order']['extension_code'] = '';
    }
    $consignee_list = get_consignee_list($_SESSION['user_id']);
    $count = count($consignee_list);
    $order = flow_order_info();
    //获取默认地址ID
    //$default_address_id= $db->getOne("SELECT address_id FROM " .$ecs->table('users'). " WHERE user_id = '$user_id'");
    for ($i = 0; $i < count($consignee_list); $i++) {
        $province = getRegionName($consignee_list[$i]['province']);
        $city = getRegionName($consignee_list[$i]['city']);
        $district = getRegionName($consignee_list[$i]['district']);
        $consignee_list[$i]['province_name'] = $province;
        $consignee_list[$i]['city_name'] = $city;
        $consignee_list[$i]['district_name'] = $district;
    }
    $smarty->assign('count', $count);
    $smarty->assign('consignee_list', $consignee_list);
    /* 检查购物车中是否有商品 */
 
    /*
     * 检查用户是否已经登录
     * 如果用户已经登录了则检查是否有默认的收货地址
     * 如果没有登录则跳转到登录和注册页面
    */
    if (empty($_SESSION['direct_shopping']) && $_SESSION['user_id'] == 0) {
        /* 用户没有登录且没有选定匿名购物，转向到登录页面 */
        ecs_header("Location: user.php?act=login\n");
        exit;
    }
	$addressf='';
     $consignee = get_consignee($_SESSION['user_id']);
	 
	 if($consignee['province']>0){
     $consignee['province_name']=getRegionName($consignee['province']);
     $consignee['city_name']=getRegionName($consignee['city']);
	 $consignee['district_name']=getRegionName($consignee['district']);
	 $addressf=$consignee['province_name'].$consignee['city_name'].$consignee['district_name'].$consignee['address'];
	 }

    //
    //$is_default_address=1;
    //print_r($consignee);
    /* 检查收货人信息是否完整 */
    // if (!check_consignee_info($consignee, $flow_type))
    // {
    /* 如果不完整则转向到收货人信息填写界面 */
    //ecs_header("Location: flow.php?step=consignee\n");
    // exit;
    // $is_default_address=0;
    //print_r($consignee);
    //  }
    // $_SESSION['flow_consignee'] = $consignee;
    // $smarty->assign('consignee', $consignee);
    //$smarty->assign('is_default_address', $is_default_address);
    /* 对商品信息赋值 */
    $cart_goods = cart_goods($flow_type); // 取得商品列表，计算合计
	$nums=0;
	$totp=0;
	foreach($cart_goods as $k=>$v){
		
		$nums+=$v['goods_number'];
		$totp+=$v['goods_number']*$v['goods_price'];
	}
	
	//print_r($cart_goods);
    //print_r($cart_goods);
	$smarty->assign('addressf', $addressf);
 	$smarty->assign('deconsignee', $consignee);
	$smarty->assign('nums', $nums);
	$smarty->assign('totp', price_format($totp, false));
    $smarty->assign('goods_list', $cart_goods);
 
    /* 对是否允许修改购物车赋值 */
    if ($flow_type != CART_GENERAL_GOODS || $_REQUEST['bool'] == '1') {
        $smarty->assign('allow_edit_cart', 0);
    } else {
        $smarty->assign('allow_edit_cart', 1);
    }
    /*
     * 取得购物流程设置
    */
    $smarty->assign('config', $_CFG);
    /*
     * 取得订单信息
    */
    $order = flow_order_info();
    $smarty->assign('order', $order);
    /* 计算折扣 */
    if ($flow_type != CART_EXCHANGE_GOODS && $flow_type != CART_GROUP_BUY_GOODS) {
        $discount = compute_discount();
        $smarty->assign('discount', $discount['discount']);
        $favour_name = empty($discount['name']) ? '' : join(',', $discount['name']);
        $smarty->assign('your_discount', sprintf($_LANG['your_discount'], $favour_name, price_format($discount['discount'])));
    }
    if ((!isset($_CFG['can_invoice']) || $_CFG['can_invoice'] == '1') && isset($_CFG['invoice_content']) && trim($_CFG['invoice_content']) != '' && $flow_type != CART_EXCHANGE_GOODS) {
        $inv_content_list = explode("\n", str_replace("\r", '', $_CFG['invoice_content']));
        $smarty->assign('inv_content_list', $inv_content_list);
        $inv_type_list = array();
        foreach ($_CFG['invoice_type']['type'] as $key => $type) {
            if (!empty($type)) {
                $inv_type_list[$type] = $type . ' [' . floatval($_CFG['invoice_type']['rate'][$key]) . '%]';
            }
        }
        $smarty->assign('inv_type_list', $inv_type_list);
    }
    /*
     * 计算订单的费用
    */
    $total = order_fee($order, $cart_goods, $consignee);
	
    $smarty->assign('total', $total);
    $smarty->assign('shopping_money', sprintf($_LANG['shopping_money'], $total['formated_goods_price']));
    $smarty->assign('market_price_desc', sprintf($_LANG['than_market_price'], $total['formated_market_price'], $total['formated_saving'], $total['save_rate']));
    /* 取得配送列表 */
    $region = array(
        $consignee['country'],
        $consignee['province'],
        $consignee['city'],
        $consignee['district']
    );
    $shipping_list = available_shipping_list($region);
    $cart_weight_price = cart_weight_price($flow_type);
    $insure_disabled = true;
    $cod_disabled = true;
    // 查看购物车中是否全为免运费商品，若是则把运费赋为零
    $sql = 'SELECT count(*) FROM ' . $ecs->table('cart') . " WHERE `session_id` = '" . SESS_ID . "' AND `extension_code` != 'package_buy' AND `is_shipping` = 0";
    $shipping_count = $db->getOne($sql);
    foreach ($shipping_list AS $key => $val) {
        $shipping_cfg = unserialize_config($val['configure']);
        $shipping_fee = ($shipping_count == 0 AND $cart_weight_price['free_shipping'] == 1) ? 0 : shipping_fee($val['shipping_code'], unserialize($val['configure']) , $cart_weight_price['weight'], $cart_weight_price['amount'], $cart_weight_price['number']);
        $shipping_list[$key]['format_shipping_fee'] = price_format($shipping_fee, false);
        $shipping_list[$key]['shipping_fee'] = $shipping_fee;
        $shipping_list[$key]['free_money'] = price_format($shipping_cfg['free_money'], false);
        $shipping_list[$key]['insure_formated'] = strpos($val['insure'], '%') === false ? price_format($val['insure'], false) : $val['insure'];
        /* 当前的配送方式是否支持保价 */
        if ($val['shipping_id'] == $order['shipping_id']) {
            $insure_disabled = ($val['insure'] == 0);
            $cod_disabled = ($val['support_cod'] == 0);
        }
    }
    $smarty->assign('order_descript', $_SESSION['order_descript']);
    $smarty->assign('shipping_list', $shipping_list);
    $smarty->assign('insure_disabled', $insure_disabled);
    $smarty->assign('cod_disabled', $cod_disabled);
    /* 取得支付列表 */
    if ($order['shipping_id'] == 0) {
        $cod = true;
        $cod_fee = 0;
    } else {
        $shipping = shipping_info($order['shipping_id']);
        $cod = $shipping['support_cod'];
        if ($cod) {
            /* 如果是团购，且保证金大于0，不能使用货到付款 */
            if ($flow_type == CART_GROUP_BUY_GOODS) {
                $group_buy_id = $_SESSION['extension_id'];
                if ($group_buy_id <= 0) {
                    show_message('error group_buy_id');
                }
                $group_buy = group_buy_info($group_buy_id);
                if (empty($group_buy)) {
                    show_message('group buy not exists: ' . $group_buy_id);
                }
                if ($group_buy['deposit'] > 0) {
                    $cod = false;
                    $cod_fee = 0;
                    /* 赋值保证金 */
                    $smarty->assign('gb_deposit', $group_buy['deposit']);
                }
            }
            if ($cod) {
                $shipping_area_info = shipping_area_info($order['shipping_id'], $region);
                $cod_fee = $shipping_area_info['pay_fee'];
            }
        } else {
            $cod_fee = 0;
        }
    }
    // 给货到付款的手续费加<span id>，以便改变配送的时候动态显示
    $payment_list = available_payment_list(1, $cod_fee);
    if (isset($payment_list)) {
        foreach ($payment_list as $key => $payment) {
            if ($payment['is_cod'] == '1') {
                $payment_list[$key]['format_pay_fee'] = '<span id="ECS_CODFEE">' . $payment['format_pay_fee'] . '</span>';
            }
            /* 如果有易宝神州行支付 如果订单金额大于300 则不显示 */
            if ($payment['pay_code'] == 'yeepayszx' && $total['amount'] > 300) {
                unset($payment_list[$key]);
            }
            /* 如果有余额支付 */
            if ($payment['pay_code'] == 'balance') {
                /* 如果未登录，不显示 */
                if ($_SESSION['user_id'] == 0) {
                    unset($payment_list[$key]);
                } else {
                    if ($_SESSION['flow_order']['pay_id'] == $payment['pay_id']) {
                        $smarty->assign('disable_surplus', 1);
                    }
                }
            }
        }
    }
    $smarty->assign('payment_list', $payment_list);
	
	$shippinghtml="";

    $region            = array($consignee['country'], $consignee['province'], $consignee['city'], $consignee['district']);

		  
    $shipping_list     = available_shipping_list($region);
 
    $cart_weight_price = cart_weight_price($flow_type);
    $insure_disabled   = true;
    $cod_disabled      = true;
    $order = flow_order_info();
	  $total = order_fee($order, $cart_goods, $consignee);

    // 查看购物车中是否全为免运费商品，若是则把运费赋为零
    $sql = 'SELECT count(*) FROM ' . $ecs->table('cart') . " WHERE `session_id` = '" . SESS_ID. "' AND `extension_code` != 'package_buy' AND `is_shipping` = 0";
    $shipping_count = $db->getOne($sql);
	 
	
	


    foreach ($shipping_list AS $key => $val)
    {
        $shipping_cfg = unserialize_config($val['configure']);
        $shipping_fee = ($shipping_count == 0 AND $cart_weight_price['free_shipping'] == 1) ? 0 : shipping_fee($val['shipping_code'], unserialize($val['configure']),
        $cart_weight_price['weight'], $cart_weight_price['amount'], $cart_weight_price['number']);
        $shipping_list[$key]['format_shipping_fee'] = price_format($shipping_fee, false);
        $shipping_list[$key]['shipping_fee']        = $shipping_fee;
        $shipping_list[$key]['free_money']          = price_format($shipping_cfg['free_money'], false);
        $shipping_list[$key]['insure_formated']     = strpos($val['insure'], '%') === false ?
        price_format($val['insure'], false) : $val['insure'];

        /* 当前的配送方式是否支持保价 */
        if ($val['shipping_id'] == $order['shipping_id'])
        {
            $insure_disabled = ($val['insure'] == 0);
            $cod_disabled    = ($val['support_cod'] == 0);
			$checkstate=true;
        }else{
			$checkstate=false;
		}
	   $mobile=is_mobile();
		if($mobile==0){
			
				$shippinghtml.=' <div class="hdfk_2_1"><input class="shipping" name="shipping" type="radio" value="'.$val["shipping_id"].'"   checked="'.$checkstate.'"  supportCod="'.$val['support_cod'].'" insure="'.$val['insure'].'" onclick="selectShipping(this)" /><span>'.$val['name'].'</span></div>';	
		}else{
				$shippinghtml.=' <div class="hdfk_2_1 paddi_color"> <span ';
        if($checkstate){
		$shippinghtml.='class="select" '; 
		}
	    $shippinghtml.='></span><input style="display:none;" class="shipping" name="shipping" type="radio" value="'.$val["shipping_id"].'"   checked="'.$checkstate.'"  supportCod="'.$val['support_cod'].'" insure="'.$val['insure'].'"   />'.$val['name'].'</div>';
	
		}
		
		 
	
    }
	
      $shippinghtml.='<input id="ECS_NEEDINSURE" type="checkbox" style="display:none;"  disabled="" value="1" onclick="selectInsure(this.checked)" name="need_insure">';
	
	  $smarty->assign('shippinghtml', $shippinghtml);
   // $faq = "SELECT * FROM " . $ecs->table('answers') . " WHERE as_type = 0 order by resort asc";
    //$faqlist = $db->getAll($faq);
    //$smarty->assign('faqlist', $faqlist);
    $user_info = user_info($_SESSION['user_id']);
    if ((!isset($_CFG['use_bonus']) || $_CFG['use_bonus'] == '1') && ($flow_type != CART_GROUP_BUY_GOODS && $flow_type != CART_EXCHANGE_GOODS)) {
        // 取得用户可用红包
        $user_bonus = user_bonus($_SESSION['user_id'], $total['goods_price']);
        if (!empty($user_bonus)) {
            foreach ($user_bonus AS $key => $val) {
                $user_bonus[$key]['bonus_money_formated'] = price_format($val['type_money'], false);
            }
            $smarty->assign('bonus_list', $user_bonus);
        }
        //print_r($user_bonus);
        // 能使用红包
        $smarty->assign('allow_use_bonus', 1);
    }
    /* 如果使用积分，取得用户可用积分及本订单最多可以使用的积分 */
    if ((!isset($_CFG['use_integral']) || $_CFG['use_integral'] == '1') && $_SESSION['user_id'] > 0 && $user_info['pay_points'] > 0 && ($flow_type != CART_GROUP_BUY_GOODS && $flow_type != CART_EXCHANGE_GOODS)) {
        // 能使用积分
        $smarty->assign('allow_use_integral', 1);
        $smarty->assign('order_max_integral', flow_available_points()); // 可用积分
        $smarty->assign('your_integral', $user_info['pay_points']); // 用户积分
        
    }
    /* 保存 session */
    $_SESSION['flow_order'] = $order;
} elseif ($_REQUEST['step'] == 'select_shipping') {
    /*------------------------------------------------------ */
    //-- 改变配送方式
    /*------------------------------------------------------ */
    include_once ('includes/cls_json.php');
    $json = new JSON;
    $result = array(
        'error' => '',
        'content' => '',
		'fee_type'=>0,
		'shpping_fee'=>0,
		'shipping_name'=>'',
        'need_insure' => 0
    );
    /* 取得购物类型 */
    $flow_type = isset($_SESSION['flow_type']) ? intval($_SESSION['flow_type']) : CART_GENERAL_GOODS;
    /* 获得收货人信息 */
    $consignee = get_consignee($_SESSION['user_id']);
    /* 对商品信息赋值 */
    $cart_goods = cart_goods($flow_type); // 取得商品列表，计算合计
	//预留判断验证地址
	 // if (empty($cart_goods) || !check_consignee_info($consignee, $flow_type)) {
    if (empty($cart_goods)) {
        $result['error'] =1;
    } else {
        /* 取得购物流程设置 */
        $smarty->assign('config', $_CFG);
        /* 取得订单信息 */
        $order = flow_order_info();
        $order['shipping_id'] = intval($_REQUEST['shipping']);
        $regions = array(
            $consignee['country'],
            $consignee['province'],
            $consignee['city'],
            $consignee['district']
        );
        $shipping_info = shipping_area_info($order['shipping_id'], $regions);
		$result['shipping_name']=$shipping_info['name'];
	 
        /* 计算订单的费用 */
        $total = order_fee($order, $cart_goods, $consignee);
		 
        $smarty->assign('total', $total);
        /* 取得可以得到的积分和红包 */
        $smarty->assign('total_integral', cart_amount(false, $flow_type) - $total['bonus'] - $total['integral_money']);
        $smarty->assign('total_bonus', price_format(get_total_bonus() , false));
        /* 团购标志 */
        if ($flow_type == CART_GROUP_BUY_GOODS) {
            $smarty->assign('is_group_buy', 1);
        }
		if($total['shipping_fee']>0){
			$result['fee_type']=1;
			$result['shpping_fee']=$total['shipping_fee_formated'];
			
		}
        $result['cod_fee'] = $shipping_info['pay_fee'];
        if (strpos($result['cod_fee'], '%') === false) {
            $result['cod_fee'] = price_format($result['cod_fee'], false);
        }
        $result['need_insure'] = ($shipping_info['insure'] > 0 && !empty($order['need_insure'])) ? 1 : 0;
        $result['content'] = $smarty->fetch('library/order_total.lbi');
    }
    echo $json->encode($result);
    exit;
} elseif ($_REQUEST['step'] == 'select_insure') {
    /*------------------------------------------------------ */
    //-- 选定/取消配送的保价
    /*------------------------------------------------------ */
    include_once ('includes/cls_json.php');
    $json = new JSON;
    $result = array(
        'error' => '',
        'content' => '',
        'need_insure' => 0
    );
    /* 取得购物类型 */
    $flow_type = isset($_SESSION['flow_type']) ? intval($_SESSION['flow_type']) : CART_GENERAL_GOODS;
    /* 获得收货人信息 */
    $consignee = get_consignee($_SESSION['user_id']);
    /* 对商品信息赋值 */
    $cart_goods = cart_goods($flow_type); // 取得商品列表，计算合计
    if (empty($cart_goods) || !check_consignee_info($consignee, $flow_type)) {
        $result['error'] = $_LANG['no_goods_in_cart'];
    } else {
        /* 取得购物流程设置 */
        $smarty->assign('config', $_CFG);
        /* 取得订单信息 */
        $order = flow_order_info();
        $order['need_insure'] = intval($_REQUEST['insure']);
        /* 保存 session */
        $_SESSION['flow_order'] = $order;
        /* 计算订单的费用 */
        $total = order_fee($order, $cart_goods, $consignee);
        $smarty->assign('total', $total);
        /* 取得可以得到的积分和红包 */
        $smarty->assign('total_integral', cart_amount(false, $flow_type) - $total['bonus'] - $total['integral_money']);
        $smarty->assign('total_bonus', price_format(get_total_bonus() , false));
        /* 团购标志 */
        if ($flow_type == CART_GROUP_BUY_GOODS) {
            $smarty->assign('is_group_buy', 1);
        }
        $result['content'] = $smarty->fetch('library/order_total.lbi');
    }
    echo $json->encode($result);
    exit;
} elseif ($_REQUEST['step'] == 'select_payment') {
    /*------------------------------------------------------ */
    //-- 改变支付方式
    /*------------------------------------------------------ */
    include_once ('includes/cls_json.php');
    $json = new JSON;
    $result = array(
        'error' => '',
        'content' => '',
        'need_insure' => 0,
        'payment' => 1
    );
    /* 取得购物类型 */
    $flow_type = isset($_SESSION['flow_type']) ? intval($_SESSION['flow_type']) : CART_GENERAL_GOODS;
    /* 获得收货人信息 */
    $consignee = get_consignee($_SESSION['user_id']);
    /* 对商品信息赋值 */
    $cart_goods = cart_goods($flow_type); // 取得商品列表，计算合计
    if (empty($cart_goods)) {
        $result['error'] = $_LANG['no_goods_in_cart'];
    } else {
        /* 取得购物流程设置 */
        $smarty->assign('config', $_CFG);
        /* 取得订单信息 */
        $order = flow_order_info();
        $order['pay_id'] = intval($_REQUEST['payment']);
        $payment_info = payment_info($order['pay_id']);
        $result['pay_code'] = $payment_info['pay_code'];
        /* 保存 session */
        $_SESSION['flow_order'] = $order;
        /* 计算订单的费用 */
        $total = order_fee($order, $cart_goods, $consignee);
        $smarty->assign('total', $total);
        /* 取得可以得到的积分和红包 */
        $smarty->assign('total_integral', cart_amount(false, $flow_type) - $total['bonus'] - $total['integral_money']);
        $smarty->assign('total_bonus', price_format(get_total_bonus() , false));
        /* 团购标志 */
        if ($flow_type == CART_GROUP_BUY_GOODS) {
            $smarty->assign('is_group_buy', 1);
        }
        $result['content'] = $smarty->fetch('library/order_total.lbi');
    }
    echo $json->encode($result);
    exit;
} elseif ($_REQUEST['step'] == 'select_pack') {
    /*------------------------------------------------------ */
    //-- 改变商品包装
    /*------------------------------------------------------ */
    include_once ('includes/cls_json.php');
    $json = new JSON;
    $result = array(
        'error' => '',
        'content' => '',
        'need_insure' => 0
    );
    /* 取得购物类型 */
    $flow_type = isset($_SESSION['flow_type']) ? intval($_SESSION['flow_type']) : CART_GENERAL_GOODS;
    /* 获得收货人信息 */
    $consignee = get_consignee($_SESSION['user_id']);
    /* 对商品信息赋值 */
    $cart_goods = cart_goods($flow_type); // 取得商品列表，计算合计
    if (empty($cart_goods) || !check_consignee_info($consignee, $flow_type)) {
        $result['error'] = $_LANG['no_goods_in_cart'];
    } else {
        /* 取得购物流程设置 */
        $smarty->assign('config', $_CFG);
        /* 取得订单信息 */
        $order = flow_order_info();
        $order['pack_id'] = intval($_REQUEST['pack']);
        /* 保存 session */
        $_SESSION['flow_order'] = $order;
        /* 计算订单的费用 */
        $total = order_fee($order, $cart_goods, $consignee);
        $smarty->assign('total', $total);
        /* 取得可以得到的积分和红包 */
        $smarty->assign('total_integral', cart_amount(false, $flow_type) - $total['bonus'] - $total['integral_money']);
        $smarty->assign('total_bonus', price_format(get_total_bonus() , false));
        /* 团购标志 */
        if ($flow_type == CART_GROUP_BUY_GOODS) {
            $smarty->assign('is_group_buy', 1);
        }
        $result['content'] = $smarty->fetch('library/order_total.lbi');
    }
    echo $json->encode($result);
    exit;
} elseif ($_REQUEST['step'] == 'select_card') {
    /*------------------------------------------------------ */
    //-- 改变贺卡
    /*------------------------------------------------------ */
    include_once ('includes/cls_json.php');
    $json = new JSON;
    $result = array(
        'error' => '',
        'content' => '',
        'need_insure' => 0
    );
    /* 取得购物类型 */
    $flow_type = isset($_SESSION['flow_type']) ? intval($_SESSION['flow_type']) : CART_GENERAL_GOODS;
    /* 获得收货人信息 */
    $consignee = get_consignee($_SESSION['user_id']);
    /* 对商品信息赋值 */
    $cart_goods = cart_goods($flow_type); // 取得商品列表，计算合计
    if (empty($cart_goods) || !check_consignee_info($consignee, $flow_type)) {
        $result['error'] = $_LANG['no_goods_in_cart'];
    } else {
        /* 取得购物流程设置 */
        $smarty->assign('config', $_CFG);
        /* 取得订单信息 */
        $order = flow_order_info();
        $order['card_id'] = intval($_REQUEST['card']);
        /* 保存 session */
        $_SESSION['flow_order'] = $order;
        /* 计算订单的费用 */
        $total = order_fee($order, $cart_goods, $consignee);
        $smarty->assign('total', $total);
        /* 取得可以得到的积分和红包 */
        $smarty->assign('total_integral', cart_amount(false, $flow_type) - $order['bonus'] - $total['integral_money']);
        $smarty->assign('total_bonus', price_format(get_total_bonus() , false));
        /* 团购标志 */
        if ($flow_type == CART_GROUP_BUY_GOODS) {
            $smarty->assign('is_group_buy', 1);
        }
        $result['content'] = $smarty->fetch('library/order_total.lbi');
    }
    echo $json->encode($result);
    exit;
} elseif ($_REQUEST['step'] == 'change_surplus') {
    /*------------------------------------------------------ */
    //-- 改变余额
    /*------------------------------------------------------ */
    include_once ('includes/cls_json.php');
    $surplus = floatval($_GET['surplus']);
    $user_info = user_info($_SESSION['user_id']);
    if ($user_info['user_money'] + $user_info['credit_line'] < $surplus) {
        $result['error'] = $_LANG['surplus_not_enough'];
    } else {
        /* 取得购物类型 */
        $flow_type = isset($_SESSION['flow_type']) ? intval($_SESSION['flow_type']) : CART_GENERAL_GOODS;
        /* 取得购物流程设置 */
        $smarty->assign('config', $_CFG);
        /* 获得收货人信息 */
        $consignee = get_consignee($_SESSION['user_id']);
        /* 对商品信息赋值 */
        $cart_goods = cart_goods($flow_type); // 取得商品列表，计算合计
        if (empty($cart_goods) || !check_consignee_info($consignee, $flow_type)) {
            $result['error'] = $_LANG['no_goods_in_cart'];
        } else {
            /* 取得订单信息 */
            $order = flow_order_info();
            $order['surplus'] = $surplus;
            /* 计算订单的费用 */
            $total = order_fee($order, $cart_goods, $consignee);
            $smarty->assign('total', $total);
            /* 团购标志 */
            if ($flow_type == CART_GROUP_BUY_GOODS) {
                $smarty->assign('is_group_buy', 1);
            }
            $result['content'] = $smarty->fetch('library/order_total.lbi');
        }
    }
    $json = new JSON();
    die($json->encode($result));
} elseif ($_REQUEST['step'] == 'change_integral') {
    /*------------------------------------------------------ */
    //-- 改变积分
    /*------------------------------------------------------ */
    include_once ('includes/cls_json.php');
    $points = floatval($_GET['points']);
    $user_info = user_info($_SESSION['user_id']);
    /* 取得订单信息 */
    $order = flow_order_info();
    $flow_points = flow_available_points(); // 该订单允许使用的积分
    $user_points = $user_info['pay_points']; // 用户的积分总数
    if ($points > $user_points) {
        $result['error'] = $_LANG['integral_not_enough'];
    } elseif ($points > $flow_points) {
        $result['error'] = sprintf($_LANG['integral_too_much'], $flow_points);
    } else {
        /* 取得购物类型 */
        $flow_type = isset($_SESSION['flow_type']) ? intval($_SESSION['flow_type']) : CART_GENERAL_GOODS;
        $order['integral'] = $points;
        /* 获得收货人信息 */
        $consignee = get_consignee($_SESSION['user_id']);
        /* 对商品信息赋值 */
        $cart_goods = cart_goods($flow_type); // 取得商品列表，计算合计
        if (empty($cart_goods) || !check_consignee_info($consignee, $flow_type)) {
            $result['error'] = $_LANG['no_goods_in_cart'];
        } else {
            /* 计算订单的费用 */
            $total = order_fee($order, $cart_goods, $consignee);
            $smarty->assign('total', $total);
            $smarty->assign('config', $_CFG);
            /* 团购标志 */
            if ($flow_type == CART_GROUP_BUY_GOODS) {
                $smarty->assign('is_group_buy', 1);
            }
            $result['content'] = $smarty->fetch('library/order_total.lbi');
            $result['error'] = '';
        }
    }
    $json = new JSON();
    die($json->encode($result));
} elseif ($_REQUEST['step'] == 'change_bonus') {
    /*------------------------------------------------------ */
    //-- 改变红包
    /*------------------------------------------------------ */
    include_once ('includes/cls_json.php');
    $result = array(
        'error' => '',
        'content' => ''
    );
    /* 取得购物类型 */
    $flow_type = isset($_SESSION['flow_type']) ? intval($_SESSION['flow_type']) : CART_GENERAL_GOODS;
    /* 获得收货人信息 */
    $consignee = get_consignee($_SESSION['user_id']);
    /* 对商品信息赋值 */
    $cart_goods = cart_goods($flow_type); // 取得商品列表，计算合计
    if (empty($cart_goods) || !check_consignee_info($consignee, $flow_type)) {
        $result['error'] = $_LANG['no_goods_in_cart'];
    } else {
        /* 取得购物流程设置 */
        $smarty->assign('config', $_CFG);
        /* 取得订单信息 */
        $order = flow_order_info();
        $bonus = bonus_info(intval($_GET['bonus']));
        if ((!empty($bonus) && $bonus['user_id'] == $_SESSION['user_id']) || $_GET['bonus'] == 0) {
            $order['bonus_id'] = $_GET['bonus'];
        } else {
            $order['bonus_id'] = 0;
            $result['error'] = $_LANG['invalid_bonus'];
        }
        /* 计算订单的费用 */
        $total = order_fee($order, $cart_goods, $consignee);
        $smarty->assign('total', $total);
        /* 团购标志 */
        if ($flow_type == CART_GROUP_BUY_GOODS) {
            $smarty->assign('is_group_buy', 1);
        }
        $result['content'] = $smarty->fetch('library/order_total.lbi');
    }
    $json = new JSON();
    die($json->encode($result));
} elseif ($_REQUEST['step'] == 'change_needinv') {
    /*------------------------------------------------------ */
    //-- 改变发票的设置
    /*------------------------------------------------------ */
    include_once ('includes/cls_json.php');
    $result = array(
        'error' => '',
        'content' => ''
    );
    $json = new JSON();
    $_GET['inv_type'] = !empty($_GET['inv_type']) ? json_str_iconv(urldecode($_GET['inv_type'])) : '';
    $_GET['invPayee'] = !empty($_GET['invPayee']) ? json_str_iconv(urldecode($_GET['invPayee'])) : '';
    $_GET['inv_content'] = !empty($_GET['inv_content']) ? json_str_iconv(urldecode($_GET['inv_content'])) : '';
    /* 取得购物类型 */
    $flow_type = isset($_SESSION['flow_type']) ? intval($_SESSION['flow_type']) : CART_GENERAL_GOODS;
    /* 获得收货人信息 */
    $consignee = get_consignee($_SESSION['user_id']);
    /* 对商品信息赋值 */
    $cart_goods = cart_goods($flow_type); // 取得商品列表，计算合计
    if (empty($cart_goods) || !check_consignee_info($consignee, $flow_type)) {
        $result['error'] = $_LANG['no_goods_in_cart'];
        die($json->encode($result));
    } else {
        /* 取得购物流程设置 */
        $smarty->assign('config', $_CFG);
        /* 取得订单信息 */
        $order = flow_order_info();
        if (isset($_GET['need_inv']) && intval($_GET['need_inv']) == 1) {
            $order['need_inv'] = 1;
            $order['inv_type'] = trim(stripslashes($_GET['inv_type']));
            $order['inv_payee'] = trim(stripslashes($_GET['inv_payee']));
            $order['inv_content'] = trim(stripslashes($_GET['inv_content']));
        } else {
            $order['need_inv'] = 0;
            $order['inv_type'] = '';
            $order['inv_payee'] = '';
            $order['inv_content'] = '';
        }
        /* 计算订单的费用 */
        $total = order_fee($order, $cart_goods, $consignee);
        $smarty->assign('total', $total);
        /* 团购标志 */
        if ($flow_type == CART_GROUP_BUY_GOODS) {
            $smarty->assign('is_group_buy', 1);
        }
        die($smarty->fetch('library/order_total.lbi'));
    }
} elseif ($_REQUEST['step'] == 'change_oos') {
    /*------------------------------------------------------ */
    //-- 改变缺货处理时的方式
    /*------------------------------------------------------ */
    /* 取得订单信息 */
    $order = flow_order_info();
    $order['how_oos'] = intval($_GET['oos']);
    /* 保存 session */
    $_SESSION['flow_order'] = $order;
} elseif ($_REQUEST['step'] == 'check_surplus') {
    /*------------------------------------------------------ */
    //-- 检查用户输入的余额
    /*------------------------------------------------------ */
    $surplus = floatval($_GET['surplus']);
    $user_info = user_info($_SESSION['user_id']);
    if (($user_info['user_money'] + $user_info['credit_line'] < $surplus)) {
        die($_LANG['surplus_not_enough']);
    }
    exit;
} elseif ($_REQUEST['step'] == 'check_integral') {
    /*------------------------------------------------------ */
    //-- 检查用户输入的余额
    /*------------------------------------------------------ */
    $points = floatval($_GET['integral']);
    $user_info = user_info($_SESSION['user_id']);
    $flow_points = flow_available_points(); // 该订单允许使用的积分
    $user_points = $user_info['pay_points']; // 用户的积分总数
    if ($points > $user_points) {
        die($_LANG['integral_not_enough']);
    }
    if ($points > $flow_points) {
        die(sprintf($_LANG['integral_too_much'], $flow_points));
    }
    exit;
}
/*------------------------------------------------------ */
//-- 完成所有订单操作，提交到数据库
/*------------------------------------------------------ */
elseif ($_REQUEST['step'] == 'done') {
    include_once ('includes/lib_clips.php');
    include_once ('includes/lib_payment.php');
    $order_descript = $_POST['order_descript'];
    if (!empty($order_descript)) {
        $_SESSION['order_descript'] = $order_descript;
    }
    /* 取得购物类型 */
    $flow_type = isset($_SESSION['flow_type']) ? intval($_SESSION['flow_type']) : CART_GENERAL_GOODS;
    /* 检查购物车中是否有商品 */
    $sql = "SELECT COUNT(*) FROM " . $ecs->table('cart') . " WHERE session_id = '" . SESS_ID . "' " . "AND parent_id = 0 AND is_gift = 0 AND rec_type = '$flow_type'";
    if ($db->getOne($sql) == 0) {
      header("Location:user.php?act=order_list");
    }
    /* 检查商品库存 */
    /* 如果使用库存，且下订单时减库存，则减少库存 */
    if ($_CFG['use_storage'] == '1' && $_CFG['stock_dec_time'] == SDT_PLACE) {
        $cart_goods_stock = get_cart_goods();
        $_cart_goods_stock = array();
        foreach ($cart_goods_stock['goods_list'] as $value) {
            $_cart_goods_stock[$value['rec_id']] = $value['goods_number'];
        }
        flow_cart_stock($_cart_goods_stock);
        unset($cart_goods_stock, $_cart_goods_stock);
    }
	
    /*
     * 检查用户是否已经登录
     * 如果用户已经登录了则检查是否有默认的收货地址
     * 如果没有登录则跳转到登录和注册页面
    */
    if (empty($_SESSION['direct_shopping']) && $_SESSION['user_id'] == 0) {
        /* 用户没有登录且没有选定匿名购物，转向到登录页面 */
        ecs_header("Location: user.php?act=login\n");
        exit;
    }
    $consignee = get_consignee($_SESSION['user_id']);
	
 
    /* 检查收货人信息是否完整 */
    if (!check_consignee_info($consignee, $flow_type)) {
        /* 如果不完整则转向到收货人信息填写界面 */
        ecs_header("Location: user.php?step=address\n");
        exit;
    }
    $_POST['how_oos'] = isset($_POST['how_oos']) ? intval($_POST['how_oos']) : 0;
    $_POST['card_message'] = isset($_POST['card_message']) ? htmlspecialchars($_POST['card_message']) : '';
    $_POST['inv_type'] = !empty($_POST['inv_type']) ? htmlspecialchars($_POST['inv_type']) : '';
    $_POST['inv_payee'] = isset($_POST['inv_payee']) ? htmlspecialchars($_POST['inv_payee']) : '';
    $_POST['inv_content'] = isset($_POST['inv_content']) ? htmlspecialchars($_POST['inv_content']) : '';
    $order_descript = isset($_POST['order_descript']) ? htmlspecialchars($_POST['order_descript']) : '';
    $inv_types = $_POST['fapiao_radio'];
    if ($inv_types == 0) {
        $inv_email = isset($_POST['inv_email']) ? htmlspecialchars($_POST['inv_email']) : '';
    } else {
        $inv_email = isset($_POST['inv_email']) ? htmlspecialchars($_POST['inv_email']) : '';
        $inv_type = $_POST['inv_type'];
        $inv_payee = trim($_POST['inv_payee']);
        $inv_content = $_POST['inv_content'];
        $inv_surname = $_POST['inv_surname'];
        $inv_ming = $_POST['inv_ming'];
        $inv_quhao = $_POST['inv_quhao'];
        $inv_company_name = $_POST['company_name'];
        if ($inv_company_name = "公司名(可选)") {
            $inv_company_name = "";
        }
        $inv_address = $_POST['inv_address'];
        $inv_province = $_POST['inv_selprovince'];
        $inv_city = $_POST['inv_selcity'];
        $inv_district = $_POST['inv_seldistricts'];
        $inv_room = $_POST['inv_room'];
        if ($inv_room = "房间、套房、单元、楼层或街区") {
            $inv_room = "";
        }
        $inv_zipcode = $_POST['inv_zipcode'];
        if (!empty($_POST['inv_haoma'])) {
            if (strlen($_POST['inv_haoma']) == 11) {
                $inv_tel = $_POST['inv_haoma'];
            } else {
                $inv_mp = $_POST['inv_haoma'];
            }
        }
    }
    $iphone = $_POST['iphone'];
    $surname = $_POST['surname'];
    $ming = $_POST['ming'];
    $quhao = $_POST['quhao'];
    $order = array(
        'shipping_id' => intval($_POST['shipping']) ,
        'pay_id' => intval($_POST['payment']) ,
        'pack_id' => isset($_POST['pack']) ? intval($_POST['pack']) : 0,
        'card_id' => isset($_POST['card']) ? intval($_POST['card']) : 0,
        'card_message' => trim($_POST['card_message']) ,
        'surplus' => isset($_POST['surplus']) ? floatval($_POST['surplus']) : 0.00,
        'integral' => isset($_POST['integral']) ? intval($_POST['integral']) : 0,
        'bonus_id' => isset($_POST['bonus']) ? intval($_POST['bonus']) : 0,
        'need_inv' => empty($_POST['need_inv']) ? 0 : 1,
        'iphone' => $iphone,
        'surname' => $surname,
        'ming' => $ming,
        'quhao' => $quhao,
        'inv_type' => $inv_type,
        'inv_payee' => $inv_payee,
        'inv_content' => $inv_content,
        'inv_email' => $inv_email,
        'inv_surname' => $inv_surname,
        'inv_name' => $inv_ming,
        'inv_quhao' => $inv_quhao,
        'inv_tel' => $inv_tel,
        'inv_company_name' => $inv_company_name,
        'inv_address' => $inv_address,
        'inv_province' => $inv_province,
        'inv_city' => $inv_city,
        'inv_district' => $inv_district,
        'inv_room' => $inv_room,
        'inv_types' => $inv_types,
        'inv_zipcode' => $inv_zipcode,
        'inv_number' => $inv_mp,
        'postscript' => $order_descript,
        'how_oos' => isset($_LANG['oos'][$_POST['how_oos']]) ? addslashes($_LANG['oos'][$_POST['how_oos']]) : '',
        'need_insure' => isset($_POST['need_insure']) ? intval($_POST['need_insure']) : 0,
        'user_id' => $_SESSION['user_id'],
        'add_time' => gmtime() ,
        'order_status' => OS_UNCONFIRMED,
        'shipping_status' => SS_UNSHIPPED,
        'pay_status' => PS_UNPAYED,
        'agency_id' => get_agency_by_regions(array(
            $consignee['country'],
            $consignee['province'],
            $consignee['city'],
            $consignee['district']
        ))
    );
    /* 扩展信息 */
    if (isset($_SESSION['flow_type']) && intval($_SESSION['flow_type']) != CART_GENERAL_GOODS) {
        $order['extension_code'] = $_SESSION['extension_code'];
        $order['extension_id'] = $_SESSION['extension_id'];
    } else {
        $order['extension_code'] = '';
        $order['extension_id'] = 0;
    }
    /* 检查积分余额是否合法 */
    $user_id = $_SESSION['user_id'];
    if ($user_id > 0) {
        $user_info = user_info($user_id);
        $order['surplus'] = min($order['surplus'], $user_info['user_money'] + $user_info['credit_line']);
        if ($order['surplus'] < 0) {
            $order['surplus'] = 0;
        }
        // 查询用户有多少积分
        $flow_points = flow_available_points(); // 该订单允许使用的积分
        $user_points = $user_info['pay_points']; // 用户的积分总数
        $order['integral'] = min($order['integral'], $user_points, $flow_points);
        if ($order['integral'] < 0) {
            $order['integral'] = 0;
        }
    } else {
        $order['surplus'] = 0;
        $order['integral'] = 0;
    }
    /* 检查红包是否存在 */
    if ($order['bonus_id'] > 0) {
        $bonus = bonus_info($order['bonus_id']);
        if (empty($bonus) || $bonus['user_id'] != $user_id || $bonus['order_id'] > 0 || $bonus['min_goods_amount'] > cart_amount(true, $flow_type)) {
            $order['bonus_id'] = 0;
        }
    } elseif (isset($_POST['bonus_sn'])) {
        $bonus_sn = trim($_POST['bonus_sn']);
        $bonus = bonus_info(0, $bonus_sn);
        $now = gmtime();
        if (empty($bonus) || $bonus['user_id'] > 0 || $bonus['order_id'] > 0 || $bonus['min_goods_amount'] > cart_amount(true, $flow_type) || $now > $bonus['use_end_date']) {
        } else {
            if ($user_id > 0) {
                $sql = "UPDATE " . $ecs->table('user_bonus') . " SET user_id = '$user_id' WHERE bonus_id = '$bonus[bonus_id]' LIMIT 1";
                $db->query($sql);
            }
            $order['bonus_id'] = $bonus['bonus_id'];
            $order['bonus_sn'] = $bonus_sn;
        }
    }
    /* 订单中的商品 */
    $cart_goods = cart_goods($flow_type);
    if (empty($cart_goods)) {
        show_message($_LANG['no_goods_in_cart'], $_LANG['back_home'], './', 'warning');
    }
    /* 检查商品总额是否达到最低限购金额 */
    if ($flow_type == CART_GENERAL_GOODS && cart_amount(true, CART_GENERAL_GOODS) < $_CFG['min_goods_amount']) {
        show_message(sprintf($_LANG['goods_amount_not_enough'], price_format($_CFG['min_goods_amount'], false)));
    }
    /* 收货人信息 */
    foreach ($consignee as $key => $value) {
        $order[$key] = addslashes($value);
    }
    /* 订单中的总额 */
    $total = order_fee($order, $cart_goods, $consignee);
    $order['bonus'] = $total['bonus'];
    $order['goods_amount'] = $total['goods_price'];
    $order['discount'] = $total['discount'];
    $order['surplus'] = $total['surplus'];
    $order['tax'] = $total['tax'];
    // 购物车中的商品能享受红包支付的总额
    $discount_amout = compute_discount_amount();
    // 红包和积分最多能支付的金额为商品总额
    $temp_amout = $order['goods_amount'] - $discount_amout;
    if ($temp_amout <= 0) {
        $order['bonus_id'] = 0;
    }
    /* 配送方式 */
    if ($order['shipping_id'] > 0) {
        $shipping = shipping_info($order['shipping_id']);
        $order['shipping_name'] = addslashes($shipping['shipping_name']);
    }
    $order['shipping_fee'] = $total['shipping_fee'];
    $order['insure_fee'] = $total['shipping_insure'];
    /* 支付方式 */
    if ($order['pay_id'] > 0) {
        $payment = payment_info($order['pay_id']);
        $order['pay_name'] = addslashes($payment['pay_name']);
    }
    $order['pay_fee'] = $total['pay_fee'];
    $order['cod_fee'] = $total['cod_fee'];
    /* 商品包装 */
    if ($order['pack_id'] > 0) {
        $pack = pack_info($order['pack_id']);
        $order['pack_name'] = addslashes($pack['pack_name']);
    }
    $order['pack_fee'] = $total['pack_fee'];
    /* 祝福贺卡 */
    if ($order['card_id'] > 0) {
        $card = card_info($order['card_id']);
        $order['card_name'] = addslashes($card['card_name']);
    }
    $order['card_fee'] = $total['card_fee'];
    $order['order_amount'] = number_format($total['amount'], 2, '.', '');
    /* 如果全部使用余额支付，检查余额是否足够 */
    if ($payment['pay_code'] == 'balance' && $order['order_amount'] > 0) {
        if ($order['surplus'] > 0) //余额支付里如果输入了一个金额
        {
            $order['order_amount'] = $order['order_amount'] + $order['surplus'];
            $order['surplus'] = 0;
        }
        if ($order['order_amount'] > ($user_info['user_money'] + $user_info['credit_line'])) {
            show_message($_LANG['balance_not_enough']);
        } else {
            $order['surplus'] = $order['order_amount'];
            $order['order_amount'] = 0;
        }
    }
    /* 如果订单金额为0（使用余额或积分或红包支付），修改订单状态为已确认、已付款 */
    if ($order['order_amount'] <= 0) {
        $order['order_status'] = OS_CONFIRMED;
        $order['confirm_time'] = gmtime();
        $order['pay_status'] = PS_PAYED;
        $order['pay_time'] = gmtime();
        $order['order_amount'] = 0;
    }
    $order['integral_money'] = $total['integral_money'];
    $order['integral'] = $total['integral'];
    if ($order['extension_code'] == 'exchange_goods') {
        $order['integral_money'] = 0;
        $order['integral'] = $total['exchange_integral'];
    }
    $order['from_ad'] = !empty($_SESSION['from_ad']) ? $_SESSION['from_ad'] : '0';
    $order['referer'] = !empty($_SESSION['referer']) ? addslashes($_SESSION['referer']) : '';
    /* 记录扩展信息 */
    if ($flow_type != CART_GENERAL_GOODS) {
        $order['extension_code'] = $_SESSION['extension_code'];
        $order['extension_id'] = $_SESSION['extension_id'];
    }
    $affiliate = unserialize($_CFG['affiliate']);
    if (isset($affiliate['on']) && $affiliate['on'] == 1 && $affiliate['config']['separate_by'] == 1) {
        //推荐订单分成
        $parent_id = get_affiliate();
        if ($user_id == $parent_id) {
            $parent_id = 0;
        }
    } elseif (isset($affiliate['on']) && $affiliate['on'] == 1 && $affiliate['config']['separate_by'] == 0) {
        //推荐注册分成
        $parent_id = 0;
    } else {
        //分成功能关闭
        $parent_id = 0;
    }
    $order['parent_id'] = $parent_id;
    /* 插入订单表 */
    $error_no = 0;
    do {
        $order['order_sn'] = get_order_sn(); //获取新订单号
        $GLOBALS['db']->autoExecute($GLOBALS['ecs']->table('order_info') , $order, 'INSERT');
        $error_no = $GLOBALS['db']->errno();
        if ($error_no > 0 && $error_no != 1062) {
            die($GLOBALS['db']->errorMsg());
        }
    } while ($error_no == 1062); //如果是订单号重复则重新提交数据
    $new_order_id = $db->insert_id();
    $order['order_id'] = $new_order_id;
    /* 插入订单商品 */
    $sql = "INSERT INTO " . $ecs->table('order_goods') . "( " . "order_id, goods_id, goods_name, goods_sn,dingzhi_attr,dingzhi_img,dingzhi_number,dingzhi_price,dingzhi_thumb,dingzhi_side,dingzhi_side_thumb,dingzhi_attr_list, product_id, goods_number, market_price, " . "goods_price, goods_attr, is_real, extension_code, parent_id, is_gift, goods_attr_id) " . " SELECT '$new_order_id', goods_id, goods_name, goods_sn,dingzhi_attr,dingzhi_img,dingzhi_number,dingzhi_price,dingzhi_thumb,dingzhi_side,dingzhi_side_thumb,dingzhi_attr_list, product_id, goods_number, market_price, " . "goods_price, goods_attr, is_real, extension_code, parent_id, is_gift, goods_attr_id" . " FROM " . $ecs->table('cart') . " WHERE session_id = '" . SESS_ID . "' AND rec_type = '$flow_type'";
    $db->query($sql);
    $sql = "update" . $GLOBALS['ecs']->table('goods') . " AS a, " . $GLOBALS['ecs']->table('cart') . " AS b " . " set a.salesnum= a.salesnum+ b.goods_number" . " WHERE a.goods_id=b.goods_id AND b.session_id = '" . SESS_ID . "' AND b.rec_type = '$flow_type'";
    $db->query($sql);
    /* 修改拍卖活动状态 */
    if ($order['extension_code'] == 'auction') {
        $sql = "UPDATE " . $ecs->table('goods_activity') . " SET is_finished='2' WHERE act_id=" . $order['extension_id'];
        $db->query($sql);
    }
    /* 处理余额、积分、红包 */
    if ($order['user_id'] > 0 && $order['surplus'] > 0) {
        log_account_change($order['user_id'], $order['surplus'] * (-1) , 0, 0, 0, sprintf($_LANG['pay_order'], $order['order_sn']));
    }
    if ($order['user_id'] > 0 && $order['integral'] > 0) {
        log_account_change($order['user_id'], 0, 0, 0, $order['integral'] * (-1) , sprintf($_LANG['pay_order'], $order['order_sn']));
    }
    if ($order['bonus_id'] > 0 && $temp_amout > 0) {
        use_bonus($order['bonus_id'], $new_order_id);
    }
    /* 如果使用库存，且下订单时减库存，则减少库存 */
    if ($_CFG['use_storage'] == '1' && $_CFG['stock_dec_time'] == SDT_PLACE) {
        change_order_goods_storage($order['order_id'], true, SDT_PLACE);
    }
    /* 给商家发邮件 */
    /* 增加是否给客服发送邮件选项 */
    if ($_CFG['send_service_email'] && $_CFG['service_email'] != '') {
        $tpl = get_mail_template('remind_of_new_order');
        $smarty->assign('order', $order);
        $smarty->assign('goods_list', $cart_goods);
        $smarty->assign('shop_name', $_CFG['shop_name']);
        $smarty->assign('send_date', date($_CFG['time_format']));
        $content = $smarty->fetch('str:' . $tpl['template_content']);
        send_mail($_CFG['shop_name'], $_CFG['service_email'], $tpl['template_subject'], $content, $tpl['is_html']);
    }
    /* 如果需要，发短信 */
    if ($_CFG['sms_order_placed'] == '1' && $_CFG['sms_shop_mobile'] != '') {
        include_once ('includes/cls_sms.php');
        $sms = new sms();
        $msg = $order['pay_status'] == PS_UNPAYED ? $_LANG['order_placed_sms'] : $_LANG['order_placed_sms'] . '[' . $_LANG['sms_paid'] . ']';
        $sms->send($_CFG['sms_shop_mobile'], sprintf($msg, $order['consignee'], $order['tel']) , 0);
    }
    /* 如果订单金额为0 处理虚拟卡 */
    if ($order['order_amount'] <= 0) {
        $sql = "SELECT goods_id, goods_name, goods_number AS num FROM " . $GLOBALS['ecs']->table('cart') . " WHERE is_real = 0 AND extension_code = 'virtual_card'" . " AND session_id = '" . SESS_ID . "' AND rec_type = '$flow_type'";
        $res = $GLOBALS['db']->getAll($sql);
        $virtual_goods = array();
        foreach ($res AS $row) {
            $virtual_goods['virtual_card'][] = array(
                'goods_id' => $row['goods_id'],
                'goods_name' => $row['goods_name'],
                'num' => $row['num']
            );
        }
        if ($virtual_goods AND $flow_type != CART_GROUP_BUY_GOODS) {
            /* 虚拟卡发货 */
            if (virtual_goods_ship($virtual_goods, $msg, $order['order_sn'], true)) {
                /* 如果没有实体商品，修改发货状态，送积分和红包 */
                $sql = "SELECT COUNT(*)" . " FROM " . $ecs->table('order_goods') . " WHERE order_id = '$order[order_id]' " . " AND is_real = 1";
                if ($db->getOne($sql) <= 0) {
                    /* 修改订单状态 */
                    update_order($order['order_id'], array(
                        'shipping_status' => SS_SHIPPED,
                        'shipping_time' => gmtime()
                    ));
                    /* 如果订单用户不为空，计算积分，并发给用户；发红包 */
                    if ($order['user_id'] > 0) {
                        /* 取得用户信息 */
                        $user = user_info($order['user_id']);
                        /* 计算并发放积分 */
                        $integral = integral_to_give($order);
                        log_account_change($order['user_id'], 0, 0, intval($integral['rank_points']) , intval($integral['custom_points']) , sprintf($_LANG['order_gift_integral'], $order['order_sn']));
                        /* 发放红包 */
                        send_order_bonus($order['order_id']);
                    }
                }
            }
        }
    }
    /* 清空购物车 */
    clear_cart($flow_type);
    /* 清除缓存，否则买了商品，但是前台页面读取缓存，商品数量不减少 */
    clear_all_files();
    /* 插入支付日志 */
    $order['log_id'] = insert_pay_log($new_order_id, $order['order_amount'], PAY_ORDER);
    /* 取得支付信息，生成支付代码 */
    if ($order['order_amount'] > 0) {
        $payment = payment_info($order['pay_id']);
		//print_r($payment);
		include_once ('includes/modules/payment/' . $payment['pay_code'] . '.php');
        $pay_obj = new $payment['pay_code'];
        $pay_online = $pay_obj->get_code($order, unserialize_config($payment['pay_config']));		
        $order['pay_desc'] = $payment['pay_desc'];
        $smarty->assign('pay_online', $pay_online);
    }
    if (!empty($order['shipping_name'])) {
        $order['shipping_name'] = trim(stripcslashes($order['shipping_name']));
    }
    /* 订单信息 */
    $order['shenshiqu'] = getRegionName($order['province']) . '&nbsp;&nbsp;' . getRegionName($order['city']) . '&nbsp;&nbsp;' . getRegionName($order['district']);
    if ($order['inv_types'] == 1) {
        if ((!isset($_CFG['can_invoice']) || $_CFG['can_invoice'] == '1') && isset($_CFG['invoice_content']) && trim($_CFG['invoice_content']) != '' && $flow_type != CART_EXCHANGE_GOODS) {
            $inv_content_list = explode("\n", str_replace("\r", '', $_CFG['invoice_content']));
            $smarty->assign('inv_content_list', $inv_content_list);
            $inv_type_list = array();
            foreach ($_CFG['invoice_type']['type'] as $key => $type) {
                if (!empty($type)) {
                    $inv_type_list[$type] = $type . ' [' . floatval($_CFG['invoice_type']['rate'][$key]) . '%]';
                    $inv_type_xl[$type] = floatval($_CFG['invoice_type']['rate'][$key]) . '%';
                }
            }
        }
        $order['inv_content_name'] = $inv_content_list[$order['inv_content']];
        $order['inv_type_val'] = $inv_type_xl[$order['inv_type']];
    }
    $sql = "select pay_icon from " . $GLOBALS['ecs']->table("payment") . " where pay_id='" . $order['pay_id'] . "'";
    $order['pay_icon'] = $GLOBALS['db']->getOne($sql);
    $smarty->assign('new_order_id', $new_order_id);
    $smarty->assign('order', $order);
 
   
    $smarty->assign('total', $total);
    $smarty->assign('goods_list', $cart_goods);
    $smarty->assign('order_submit_back', sprintf($_LANG['order_submit_back'], $_LANG['back_home'], $_LANG['goto_user_center'])); // 返回提示
    $gca = getCatArticle();
    $smarty->assign('help_list', $gca['help_list']);
    $smarty->assign('article', $gca['artlist']);
    user_uc_call('add_feed', array(
        $order['order_id'],
        BUY_GOODS
    )); //推送feed到uc
    unset($_SESSION['flow_consignee']); // 清除session中保存的收货人信息
    unset($_SESSION['flow_order']);
    unset($_SESSION['direct_shopping']);
}
/*------------------------------------------------------ */
//-- 更新购物车
/*------------------------------------------------------ */
elseif ($_REQUEST['step'] == 'update_cart') {
    if (isset($_POST['goods_number']) && is_array($_POST['goods_number'])) {
        flow_update_cart($_POST['goods_number']);
    }
    show_message($_LANG['update_cart_notice'], $_LANG['back_to_cart'], 'flow.php');
    exit;
}
/*------------------------------------------------------ */
//-- 删除购物车中的商品
/*------------------------------------------------------ */
elseif ($_REQUEST['step'] == 'drop_goods') {
    $rec_id = intval($_GET['id']);
    flow_drop_cart_goods($rec_id);
    ecs_header("Location: flow.php\n");
    exit;
}
/* 把优惠活动加入购物车 */
elseif ($_REQUEST['step'] == 'add_favourable') {
    /* 取得优惠活动信息 */
    $act_id = intval($_POST['act_id']);
    $favourable = favourable_info($act_id);
    if (empty($favourable)) {
        show_message($_LANG['favourable_not_exist']);
    }
    /* 判断用户能否享受该优惠 */
    if (!favourable_available($favourable)) {
        show_message($_LANG['favourable_not_available']);
    }
    /* 检查购物车中是否已有该优惠 */
    $cart_favourable = cart_favourable();
    if (favourable_used($favourable, $cart_favourable)) {
        show_message($_LANG['favourable_used']);
    }
    /* 赠品（特惠品）优惠 */
    if ($favourable['act_type'] == FAT_GOODS) {
        /* 检查是否选择了赠品 */
        if (empty($_POST['gift'])) {
            show_message($_LANG['pls_select_gift']);
        }
        /* 检查是否已在购物车 */
        $sql = "SELECT goods_name" . " FROM " . $ecs->table('cart') . " WHERE session_id = '" . SESS_ID . "'" . " AND rec_type = '" . CART_GENERAL_GOODS . "'" . " AND is_gift = '$act_id'" . " AND goods_id " . db_create_in($_POST['gift']);
        $gift_name = $db->getCol($sql);
        if (!empty($gift_name)) {
            show_message(sprintf($_LANG['gift_in_cart'], join(',', $gift_name)));
        }
        /* 检查数量是否超过上限 */
        $count = isset($cart_favourable[$act_id]) ? $cart_favourable[$act_id] : 0;
        if ($favourable['act_type_ext'] > 0 && $count + count($_POST['gift']) > $favourable['act_type_ext']) {
            show_message($_LANG['gift_count_exceed']);
        }
        /* 添加赠品到购物车 */
        foreach ($favourable['gift'] as $gift) {
            if (in_array($gift['id'], $_POST['gift'])) {
                add_gift_to_cart($act_id, $gift['id'], $gift['price']);
            }
        }
    } elseif ($favourable['act_type'] == FAT_DISCOUNT) {
        add_favourable_to_cart($act_id, $favourable['act_name'], cart_favourable_amount($favourable) * (100 - $favourable['act_type_ext']) / 100);
    } elseif ($favourable['act_type'] == FAT_PRICE) {
        add_favourable_to_cart($act_id, $favourable['act_name'], $favourable['act_type_ext']);
    }
    /* 刷新购物车 */
    ecs_header("Location: flow.php\n");
    exit;
} elseif ($_REQUEST['step'] == 'clear') {
    $sql = "DELETE FROM " . $ecs->table('cart') . " WHERE session_id='" . SESS_ID . "'";
    $db->query($sql);
    ecs_header("Location:./\n");
} elseif ($_REQUEST['step'] == 'drop_to_collect') {
    if ($_SESSION['user_id'] > 0) {
        $rec_id = intval($_GET['id']);
        $goods_id = $db->getOne("SELECT  goods_id FROM " . $ecs->table('cart') . " WHERE rec_id = '$rec_id' AND session_id = '" . SESS_ID . "' ");
        $count = $db->getOne("SELECT goods_id FROM " . $ecs->table('collect_goods') . " WHERE user_id = '$_SESSION[user_id]' AND goods_id = '$goods_id'");
        if (empty($count)) {
            $time = gmtime();
            $sql = "INSERT INTO " . $GLOBALS['ecs']->table('collect_goods') . " (user_id, goods_id, add_time)" . "VALUES ('$_SESSION[user_id]', '$goods_id', '$time')";
            $db->query($sql);
        }
        flow_drop_cart_goods($rec_id);
    }
    ecs_header("Location: flow.php\n");
    exit;
}
/* 验证红包序列号 */
elseif ($_REQUEST['step'] == 'validate_bonus') {
    $bonus_sn = trim($_REQUEST['bonus_sn']);
    if (is_numeric($bonus_sn)) {
        $bonus = bonus_info(0, $bonus_sn);
    } else {
        $bonus = array();
    }
 
    $bonus_kill = price_format($bonus['type_money'], false);
    include_once ('includes/cls_json.php');
    $result = array(
        'error' => '',
        'content' => ''
    );
    /* 取得购物类型 */
    $flow_type = isset($_SESSION['flow_type']) ? intval($_SESSION['flow_type']) : CART_GENERAL_GOODS;
    /* 获得收货人信息 */
    $consignee = get_consignee($_SESSION['user_id']);
    /* 对商品信息赋值 */
    $cart_goods = cart_goods($flow_type); // 取得商品列表，计算合计
    if (empty($cart_goods) || !check_consignee_info($consignee, $flow_type)) {
        $result['error'] = 1;
    } else {
        /* 取得购物流程设置 */
        $smarty->assign('config', $_CFG);
        /* 取得订单信息 */
        $order = flow_order_info();
	
        if (((!empty($bonus) && $bonus['user_id'] == $_SESSION['user_id']) || ($bonus['type_money'] > 0 && empty($bonus['user_id']))) && $bonus['order_id'] <= 0) {
            $now = gmtime();
		    if($bonus['goods_type']==1){
			$bonus['usedate']=$bonus['end_time'];	
		    }else{
			$bonus['usedate']=$bonus['use_end_date'];		
			}
            if ($now > $bonus['usedate']) {
                $order['bonus_id'] = '';
                $result['error'] = 2;
            } else {
                $order['bonus_id'] = $bonus['bonus_id'];
                $order['bonus_sn'] = $bonus_sn;
            }
        } else {
            //$order['bonus_kill'] = 0;
            $order['bonus_id'] = '';
            $result['error'] = 3;
        }
	
        /* 计算订单的费用 */
        $total = order_fee($order, $cart_goods, $consignee);
        $smarty->assign('total', $total);
        /* 团购标志 */
        if ($flow_type == CART_GROUP_BUY_GOODS) {
            $smarty->assign('is_group_buy', 1);
        }
        $result['content'] = $smarty->fetch('library/order_total.lbi');
    }
    $json = new JSON();
    die($json->encode($result));
}
/*------------------------------------------------------ */
//-- 添加礼包到购物车
/*------------------------------------------------------ */
elseif ($_REQUEST['step'] == 'add_package_to_cart') {
    include_once ('includes/cls_json.php');
    $_POST['package_info'] = json_str_iconv($_POST['package_info']);
    $result = array(
        'error' => 0,
        'message' => '',
        'content' => '',
        'package_id' => ''
    );
    $json = new JSON;
    if (empty($_POST['package_info'])) {
        $result['error'] = 1;
        die($json->encode($result));
    }
    $package = $json->decode($_POST['package_info']);
    /* 如果是一步购物，先清空购物车 */
    if ($_REQUEST['bool'] == '1') {
        clear_cart();
    }
    /* 商品数量是否合法 */
    if (!is_numeric($package->number) || intval($package->number) <= 0) {
        $result['error'] = 1;
        $result['message'] = $_LANG['invalid_number'];
    } else {
        /* 添加到购物车 */
        if (add_package_to_cart($package->package_id, $package->number)) {
            if ($_CFG['cart_confirm'] > 2) {
                $result['message'] = '';
            } else {
                $result['message'] = $_CFG['cart_confirm'] == 1 ? $_LANG['addto_cart_success_1'] : $_LANG['addto_cart_success_2'];
            }
            $result['content'] = insert_cart_info();
            $result['one_step_buy'] = $_CFG['one_step_buy'];
        } else {
            $result['message'] = $err->last_message();
            $result['error'] = $err->error_no;
            $result['package_id'] = stripslashes($package->package_id);
        }
    }
    $result['confirm_type'] = !empty($_CFG['cart_confirm']) ? $_CFG['cart_confirm'] : 2;
    die($json->encode($result));
} else {
    /*if($_SESSION['user_id']>0){
    
    
    }else{
     ecs_header("Location: flow.php?step=login\n");
    }*/
    /* 标记购物流程为普通商品 */
    $_SESSION['flow_type'] = CART_GENERAL_GOODS;
    /* 如果是一步购物，跳到结算中心 */
    if ($_REQUEST['bool'] == '1') {
        ecs_header("Location: flow.php?step=checkout\n");
        exit;
    }
    /* 取得商品列表，计算合计 */
    $cart_goods = get_cart_goods();
    $cart_goods_list = $cart_goods['goods_list'];
	 

	//print_r($cart_goods_list);
    $cart_goods_count = count($cart_goods_list);
    $smarty->assign('cart_goods_count', $cart_goods_count);

 
    $smarty->assign('goods_list', $cart_goods_list);
    $smarty->assign('total', $cart_goods['total']);
    $smarty->assign('goods_count', $cart_goods['goods_count']);
    $smarty->assign('totalprice', price_format($cart_goods['totalprice'], false));
    $smarty->assign('jsmoney', $cart_goods['jsmoney']);
    $smarty->assign('paymoney', $cart_goods['paymoney']);
    //购物车的描述的格式化
    $smarty->assign('shopping_money', sprintf($_LANG['shopping_money'], $cart_goods['total']['goods_price']));
    $smarty->assign('market_price_desc', sprintf($_LANG['than_market_price'], $cart_goods['total']['market_price'], $cart_goods['total']['saving'], $cart_goods['total']['save_rate']));
    // 显示收藏夹内的商品
    if ($_SESSION['user_id'] > 0) {
        require_once (ROOT_PATH . 'includes/lib_clips.php');
        $collection_goods = get_collection_goods($_SESSION['user_id']);
        $smarty->assign('collection_goods', $collection_goods);
    }
    /* 取得优惠活动 */
    $favourable_list = favourable_list($_SESSION['user_rank']);
    usort($favourable_list, 'cmp_favourable');
    $smarty->assign('favourable_list', $favourable_list);
    /* 计算折扣 */
    //$discount = compute_discount();
    $smarty->assign('discount', $discount['discount']);
    $favour_name = empty($discount['name']) ? '' : join(',', $discount['name']);
    $smarty->assign('your_discount', sprintf($_LANG['your_discount'], $favour_name, price_format($discount['discount'])));
    /* 增加是否在购物车里显示商品图 */
    $smarty->assign('show_goods_thumb', $GLOBALS['_CFG']['show_goods_in_cart']);
    /* 增加是否在购物车里显示商品属性 */
    $smarty->assign('show_goods_attribute', $GLOBALS['_CFG']['show_attr_in_cart']);
    /* 购物车中商品配件列表 */
    //取得购物车中基本件ID
    $sql = "SELECT goods_id " . "FROM " . $GLOBALS['ecs']->table('cart') . " WHERE session_id = '" . SESS_ID . "' " . "AND rec_type = '" . CART_GENERAL_GOODS . "' " . "AND is_gift = 0 " . "AND extension_code <> 'package_buy' " . "AND parent_id = 0 ";
    $parent_list = $GLOBALS['db']->getCol($sql);
    $fittings_list = get_goods_fittings($parent_list);
    $smarty->assign('fittings_list', $fittings_list);
}
$sql = "select * from" . $ecs->table('article') . "where cat_id=10 order by article_id asc";
$result = $db->getAll($sql);
$smarty->assign('shanglanmu', $result);
 $smarty->assign('hasd',  "d"); 
 $smarty->assign('hass',    "d"); 
$smarty->assign('currency_format', $_CFG['currency_format']);
$smarty->assign('integral_scale', $_CFG['integral_scale']);
$smarty->assign('step', $_REQUEST['step']);
assign_dynamic('shopping_flow');
$gca = getCatArticle();
$smarty->assign('help_list', $gca['help_list']);
$smarty->assign('article', $gca['artlist']);
	  	$mobile=is_mobile();

if($mobile==0){
	$smarty->display('mobile/cart.dwt');
	
}else{
$smarty->display('mycar.dwt');
}

/*------------------------------------------------------ */
//-- PRIVATE FUNCTION
/*------------------------------------------------------ */
/**
 * 获得用户的可用积分
 *
 * @access  private
 * @return  integral
 */
function flow_available_points() {
    $sql = "SELECT SUM(g.integral * c.goods_number) " . "FROM " . $GLOBALS['ecs']->table('cart') . " AS c, " . $GLOBALS['ecs']->table('goods') . " AS g " . "WHERE c.session_id = '" . SESS_ID . "' AND c.goods_id = g.goods_id AND c.is_gift = 0 AND g.integral > 0 " . "AND c.rec_type = '" . CART_GENERAL_GOODS . "'";
    $val = intval($GLOBALS['db']->getOne($sql));
    return integral_of_value($val);
}
/**
 * 更新购物车中的商品数量
 *
 * @access  public
 * @param   array   $arr
 * @return  void
 */
function flow_update_cart($arr) {
    /* 处理 */
    foreach ($arr AS $key => $val) {
        $val = intval(make_semiangle($val));
        if ($val <= 0) {
            continue;
        }
        //查询：
        $sql = "SELECT `goods_id`, `goods_attr_id`, `product_id`, `extension_code` FROM" . $GLOBALS['ecs']->table('cart') . " WHERE rec_id='$key' AND session_id='" . SESS_ID . "'";
        $goods = $GLOBALS['db']->getRow($sql);
        $sql = "SELECT g.goods_name, g.goods_number " . "FROM " . $GLOBALS['ecs']->table('goods') . " AS g, " . $GLOBALS['ecs']->table('cart') . " AS c " . "WHERE g.goods_id = c.goods_id AND c.rec_id = '$key'";
        $row = $GLOBALS['db']->getRow($sql);
        //查询：系统启用了库存，检查输入的商品数量是否有效
        if (intval($GLOBALS['_CFG']['use_storage']) > 0 && $goods['extension_code'] != 'package_buy') {
            if ($row['goods_number'] < $val) {
                show_message(sprintf($GLOBALS['_LANG']['stock_insufficiency'], $row['goods_name'], $row['goods_number'], $row['goods_number']));
                exit;
            }
            /* 是货品 */
            $goods['product_id'] = trim($goods['product_id']);
            if (!empty($goods['product_id'])) {
                $sql = "SELECT product_number FROM " . $GLOBALS['ecs']->table('products') . " WHERE goods_id = '" . $goods['goods_id'] . "' AND product_id = '" . $goods['product_id'] . "'";
                $product_number = $GLOBALS['db']->getOne($sql);
                if ($product_number < $val) {
                    show_message(sprintf($GLOBALS['_LANG']['stock_insufficiency'], $row['goods_name'], $product_number['product_number'], $product_number['product_number']));
                    exit;
                }
            }
        } elseif (intval($GLOBALS['_CFG']['use_storage']) > 0 && $goods['extension_code'] == 'package_buy') {
            if (judge_package_stock($goods['goods_id'], $val)) {
                show_message($GLOBALS['_LANG']['package_stock_insufficiency']);
                exit;
            }
        }
        /* 查询：检查该项是否为基本件 以及是否存在配件 */
        /* 此处配件是指添加商品时附加的并且是设置了优惠价格的配件 此类配件都有parent_id goods_number为1 */
        $sql = "SELECT b.goods_number, b.rec_id
                FROM " . $GLOBALS['ecs']->table('cart') . " a, " . $GLOBALS['ecs']->table('cart') . " b
                WHERE a.rec_id = '$key'
                AND a.session_id = '" . SESS_ID . "'
                AND a.extension_code <> 'package_buy'
                AND b.parent_id = a.goods_id
                AND b.session_id = '" . SESS_ID . "'";
        $offers_accessories_res = $GLOBALS['db']->query($sql);
        //订货数量大于0
        if ($val > 0) {
            /* 判断是否为超出数量的优惠价格的配件 删除*/
            $row_num = 1;
            while ($offers_accessories_row = $GLOBALS['db']->fetchRow($offers_accessories_res)) {
                if ($row_num > $val) {
                    $sql = "DELETE FROM " . $GLOBALS['ecs']->table('cart') . " WHERE session_id = '" . SESS_ID . "' " . "AND rec_id = '" . $offers_accessories_row['rec_id'] . "' LIMIT 1";
                    $GLOBALS['db']->query($sql);
                }
                $row_num++;
            }
            /* 处理超值礼包 */
            if ($goods['extension_code'] == 'package_buy') {
                //更新购物车中的商品数量
                $sql = "UPDATE " . $GLOBALS['ecs']->table('cart') . " SET goods_number = '$val' WHERE rec_id='$key' AND session_id='" . SESS_ID . "'";
            }
            /* 处理普通商品或非优惠的配件 */
            else {
                $attr_id = empty($goods['goods_attr_id']) ? array() : explode(',', $goods['goods_attr_id']);
                $goods_price = get_final_price($goods['goods_id'], $val, true, $attr_id);
                //更新购物车中的商品数量
                $sql = "UPDATE " . $GLOBALS['ecs']->table('cart') . " SET goods_number = '$val', goods_price = '$goods_price' WHERE rec_id='$key' AND session_id='" . SESS_ID . "'";
            }
        }
        //订货数量等于0
        else {
            /* 如果是基本件并且有优惠价格的配件则删除优惠价格的配件 */
            while ($offers_accessories_row = $GLOBALS['db']->fetchRow($offers_accessories_res)) {
                $sql = "DELETE FROM " . $GLOBALS['ecs']->table('cart') . " WHERE session_id = '" . SESS_ID . "' " . "AND rec_id = '" . $offers_accessories_row['rec_id'] . "' LIMIT 1";
                $GLOBALS['db']->query($sql);
            }
            $sql = "DELETE FROM " . $GLOBALS['ecs']->table('cart') . " WHERE rec_id='$key' AND session_id='" . SESS_ID . "'";
        }
        $GLOBALS['db']->query($sql);
    }
    /* 删除所有赠品 */
    $sql = "DELETE FROM " . $GLOBALS['ecs']->table('cart') . " WHERE session_id = '" . SESS_ID . "' AND is_gift <> 0";
    $GLOBALS['db']->query($sql);
}
/**
 * 检查订单中商品库存
 *
 * @access  public
 * @param   array   $arr
 *
 * @return  void
 */
function flow_cart_stock($arr) {
    //print_r($arr);
    foreach ($arr AS $key => $val) {
        $val = intval(make_semiangle($val));
        if ($val <= 0) {
            continue;
        }
        $sql = "SELECT `goods_id`, `goods_attr_id`, `extension_code` FROM" . $GLOBALS['ecs']->table('cart') . " WHERE rec_id='$key' AND session_id='" . SESS_ID . "'";
        $goods = $GLOBALS['db']->getRow($sql);
        $sql = "SELECT g.goods_name, g.goods_number, c.product_id " . "FROM " . $GLOBALS['ecs']->table('goods') . " AS g, " . $GLOBALS['ecs']->table('cart') . " AS c " . "WHERE g.goods_id = c.goods_id AND c.rec_id = '$key'";
        $row = $GLOBALS['db']->getRow($sql);
        //系统启用了库存，检查输入的商品数量是否有效
        if (intval($GLOBALS['_CFG']['use_storage']) > 0 && $goods['extension_code'] != 'package_buy' && $goods['extension_code'] != 'dingzhi') {
            if ($row['goods_number'] < $val) {
                show_message(sprintf($GLOBALS['_LANG']['stock_insufficiency'], $row['goods_name'], $row['goods_number'], $row['goods_number']));
                exit;
            }
            /* 是货品 */
            $row['product_id'] = trim($row['product_id']);
            if (!empty($row['product_id'])) {
                $sql = "SELECT product_number FROM " . $GLOBALS['ecs']->table('products') . " WHERE goods_id = '" . $goods['goods_id'] . "' AND product_id = '" . $row['product_id'] . "'";
                $product_number = $GLOBALS['db']->getOne($sql);
                if ($product_number < $val) {
                    show_message(sprintf($GLOBALS['_LANG']['stock_insufficiency'], $row['goods_name'], $row['goods_number'], $row['goods_number']));
                    exit;
                }
            }
        } elseif (intval($GLOBALS['_CFG']['use_storage']) > 0 && $goods['extension_code'] == 'package_buy') {
            if (judge_package_stock($goods['goods_id'], $val)) {
                show_message($GLOBALS['_LANG']['package_stock_insufficiency']);
                exit;
            }
        } elseif (intval($GLOBALS['_CFG']['use_storage']) > 0 && $goods['extension_code'] == 'dingzhi') {
            //定制库存验证，暂无此项
            
        }
    }
}
/**
 * 删除购物车中的商品
 *
 * @access  public
 * @param   integer $id
 * @return  void
 */
function flow_drop_cart_goods($id) {
    /* 取得商品id */
    $sql = "SELECT * FROM " . $GLOBALS['ecs']->table('cart') . " WHERE rec_id = '$id'";
    $row = $GLOBALS['db']->getRow($sql);
    if ($row) {
        //如果是超值礼包
        if ($row['extension_code'] == 'package_buy' || $row['extension_code'] == 'dingzhi') {
            $sql = "DELETE FROM " . $GLOBALS['ecs']->table('cart') . " WHERE session_id = '" . SESS_ID . "' " . "AND rec_id = '$id' LIMIT 1";
        }
        //如果是普通商品，同时删除所有赠品及其配件
        elseif ($row['parent_id'] == 0 && $row['is_gift'] == 0) {
            /* 检查购物车中该普通商品的不可单独销售的配件并删除 */
            $sql = "SELECT c.rec_id
                    FROM " . $GLOBALS['ecs']->table('cart') . " AS c, " . $GLOBALS['ecs']->table('group_goods') . " AS gg, " . $GLOBALS['ecs']->table('goods') . " AS g
                    WHERE gg.parent_id = '" . $row['goods_id'] . "'
                    AND c.goods_id = gg.goods_id
                    AND c.parent_id = '" . $row['goods_id'] . "'
                    AND c.extension_code <> 'package_buy'
                    AND gg.goods_id = g.goods_id
                    AND g.is_alone_sale = 0";
            $res = $GLOBALS['db']->query($sql);
            $_del_str = $id . ',';
            while ($id_alone_sale_goods = $GLOBALS['db']->fetchRow($res)) {
                $_del_str.= $id_alone_sale_goods['rec_id'] . ',';
            }
            $_del_str = trim($_del_str, ',');
            $sql = "DELETE FROM " . $GLOBALS['ecs']->table('cart') . " WHERE session_id = '" . SESS_ID . "' " . "AND (rec_id IN ($_del_str) OR parent_id = '$row[goods_id]' OR is_gift <> 0)";
        }
        //如果不是普通商品，只删除该商品即可
        else {
            $sql = "DELETE FROM " . $GLOBALS['ecs']->table('cart') . " WHERE session_id = '" . SESS_ID . "' " . "AND rec_id = '$id' LIMIT 1";
        }
        $GLOBALS['db']->query($sql);
    }
    flow_clear_cart_alone();
}
/**
 * 删除购物车中不能单独销售的商品
 *
 * @access  public
 * @return  void
 */
function flow_clear_cart_alone() {
    /* 查询：购物车中所有不可以单独销售的配件 */
    $sql = "SELECT c.rec_id, gg.parent_id
            FROM " . $GLOBALS['ecs']->table('cart') . " AS c
                LEFT JOIN " . $GLOBALS['ecs']->table('group_goods') . " AS gg ON c.goods_id = gg.goods_id
                LEFT JOIN" . $GLOBALS['ecs']->table('goods') . " AS g ON c.goods_id = g.goods_id
            WHERE c.session_id = '" . SESS_ID . "'
            AND c.extension_code <> 'package_buy'
            AND gg.parent_id > 0
            AND g.is_alone_sale = 0";
    $res = $GLOBALS['db']->query($sql);
    $rec_id = array();
    while ($row = $GLOBALS['db']->fetchRow($res)) {
        $rec_id[$row['rec_id']][] = $row['parent_id'];
    }
    if (empty($rec_id)) {
        return;
    }
    /* 查询：购物车中所有商品 */
    $sql = "SELECT DISTINCT goods_id
            FROM " . $GLOBALS['ecs']->table('cart') . "
            WHERE session_id = '" . SESS_ID . "'
            AND extension_code <> 'package_buy'";
    $res = $GLOBALS['db']->query($sql);
    $cart_good = array();
    while ($row = $GLOBALS['db']->fetchRow($res)) {
        $cart_good[] = $row['goods_id'];
    }
    if (empty($cart_good)) {
        return;
    }
    /* 如果购物车中不可以单独销售配件的基本件不存在则删除该配件 */
    $del_rec_id = '';
    foreach ($rec_id as $key => $value) {
        foreach ($value as $v) {
            if (in_array($v, $cart_good)) {
                continue 2;
            }
        }
        $del_rec_id = $key . ',';
    }
    $del_rec_id = trim($del_rec_id, ',');
    if ($del_rec_id == '') {
        return;
    }
    /* 删除 */
    $sql = "DELETE FROM " . $GLOBALS['ecs']->table('cart') . "
            WHERE session_id = '" . SESS_ID . "'
            AND rec_id IN ($del_rec_id)";
    $GLOBALS['db']->query($sql);
}
/**
 * 比较优惠活动的函数，用于排序（把可用的排在前面）
 * @param   array   $a      优惠活动a
 * @param   array   $b      优惠活动b
 * @return  int     相等返回0，小于返回-1，大于返回1
 */
function cmp_favourable($a, $b) {
    if ($a['available'] == $b['available']) {
        if ($a['sort_order'] == $b['sort_order']) {
            return 0;
        } else {
            return $a['sort_order'] < $b['sort_order'] ? -1 : 1;
        }
    } else {
        return $a['available'] ? -1 : 1;
    }
}
/**
 * 取得某用户等级当前时间可以享受的优惠活动
 * @param   int     $user_rank      用户等级id，0表示非会员
 * @return  array
 */
function favourable_list($user_rank) {
    /* 购物车中已有的优惠活动及数量 */
    $used_list = cart_favourable();
    /* 当前用户可享受的优惠活动 */
    $favourable_list = array();
    $user_rank = ',' . $user_rank . ',';
    $now = gmtime();
    $sql = "SELECT * " . "FROM " . $GLOBALS['ecs']->table('favourable_activity') . " WHERE CONCAT(',', user_rank, ',') LIKE '%" . $user_rank . "%'" . " AND start_time <= '$now' AND end_time >= '$now'" . " AND act_type = '" . FAT_GOODS . "'" . " ORDER BY sort_order";
    $res = $GLOBALS['db']->query($sql);
    while ($favourable = $GLOBALS['db']->fetchRow($res)) {
        $favourable['start_time'] = local_date($GLOBALS['_CFG']['time_format'], $favourable['start_time']);
        $favourable['end_time'] = local_date($GLOBALS['_CFG']['time_format'], $favourable['end_time']);
        $favourable['formated_min_amount'] = price_format($favourable['min_amount'], false);
        $favourable['formated_max_amount'] = price_format($favourable['max_amount'], false);
        $favourable['gift'] = unserialize($favourable['gift']);
        foreach ($favourable['gift'] as $key => $value) {
            $favourable['gift'][$key]['formated_price'] = price_format($value['price'], false);
            $sql = "SELECT COUNT(*) FROM " . $GLOBALS['ecs']->table('goods') . " WHERE is_on_sale = 1 AND goods_id = " . $value['id'];
            $is_sale = $GLOBALS['db']->getOne($sql);
            if (!$is_sale) {
                unset($favourable['gift'][$key]);
            }
        }
        $favourable['act_range_desc'] = act_range_desc($favourable);
        $favourable['act_type_desc'] = sprintf($GLOBALS['_LANG']['fat_ext'][$favourable['act_type']], $favourable['act_type_ext']);
        /* 是否能享受 */
        $favourable['available'] = favourable_available($favourable);
        if ($favourable['available']) {
            /* 是否尚未享受 */
            $favourable['available'] = !favourable_used($favourable, $used_list);
        }
        $favourable_list[] = $favourable;
    }
    return $favourable_list;
}
/**
 * 根据购物车判断是否可以享受某优惠活动
 * @param   array   $favourable     优惠活动信息
 * @return  bool
 */
function favourable_available($favourable) {
    /* 会员等级是否符合 */
    $user_rank = $_SESSION['user_rank'];
    if (strpos(',' . $favourable['user_rank'] . ',', ',' . $user_rank . ',') === false) {
        return false;
    }
    /* 优惠范围内的商品总额 */
    $amount = cart_favourable_amount($favourable);
    /* 金额上限为0表示没有上限 */
    return $amount >= $favourable['min_amount'] && ($amount <= $favourable['max_amount'] || $favourable['max_amount'] == 0);
}
/**
 * 取得优惠范围描述
 * @param   array   $favourable     优惠活动
 * @return  string
 */
function act_range_desc($favourable) {
    if ($favourable['act_range'] == FAR_BRAND) {
        $sql = "SELECT brand_name FROM " . $GLOBALS['ecs']->table('brand') . " WHERE brand_id " . db_create_in($favourable['act_range_ext']);
        return join(',', $GLOBALS['db']->getCol($sql));
    } elseif ($favourable['act_range'] == FAR_CATEGORY) {
        $sql = "SELECT cat_name FROM " . $GLOBALS['ecs']->table('category') . " WHERE cat_id " . db_create_in($favourable['act_range_ext']);
        return join(',', $GLOBALS['db']->getCol($sql));
    } elseif ($favourable['act_range'] == FAR_GOODS) {
        $sql = "SELECT goods_name FROM " . $GLOBALS['ecs']->table('goods') . " WHERE goods_id " . db_create_in($favourable['act_range_ext']);
        return join(',', $GLOBALS['db']->getCol($sql));
    } else {
        return '';
    }
}
/**
 * 取得购物车中已有的优惠活动及数量
 * @return  array
 */
function cart_favourable() {
    $list = array();
    $sql = "SELECT is_gift, COUNT(*) AS num " . "FROM " . $GLOBALS['ecs']->table('cart') . " WHERE session_id = '" . SESS_ID . "'" . " AND rec_type = '" . CART_GENERAL_GOODS . "'" . " AND is_gift > 0" . " GROUP BY is_gift";
    $res = $GLOBALS['db']->query($sql);
    while ($row = $GLOBALS['db']->fetchRow($res)) {
        $list[$row['is_gift']] = $row['num'];
    }
    return $list;
}
/**
 * 购物车中是否已经有某优惠
 * @param   array   $favourable     优惠活动
 * @param   array   $cart_favourable购物车中已有的优惠活动及数量
 */
function favourable_used($favourable, $cart_favourable) {
    if ($favourable['act_type'] == FAT_GOODS) {
        return isset($cart_favourable[$favourable['act_id']]) && $cart_favourable[$favourable['act_id']] >= $favourable['act_type_ext'] && $favourable['act_type_ext'] > 0;
    } else {
        return isset($cart_favourable[$favourable['act_id']]);
    }
}
/**
 * 添加优惠活动（赠品）到购物车
 * @param   int     $act_id     优惠活动id
 * @param   int     $id         赠品id
 * @param   float   $price      赠品价格
 */
function add_gift_to_cart($act_id, $id, $price) {
    $sql = "INSERT INTO " . $GLOBALS['ecs']->table('cart') . " (" . "user_id, session_id, goods_id, goods_sn, goods_name, market_price, goods_price, " . "goods_number, is_real, extension_code, parent_id, is_gift, rec_type ) " . "SELECT '$_SESSION[user_id]', '" . SESS_ID . "', goods_id, goods_sn, goods_name, market_price, " . "'$price', 1, is_real, extension_code, 0, '$act_id', '" . CART_GENERAL_GOODS . "' " . "FROM " . $GLOBALS['ecs']->table('goods') . " WHERE goods_id = '$id'";
    $GLOBALS['db']->query($sql);
}
/**
 * 添加优惠活动（非赠品）到购物车
 * @param   int     $act_id     优惠活动id
 * @param   string  $act_name   优惠活动name
 * @param   float   $amount     优惠金额
 */
function add_favourable_to_cart($act_id, $act_name, $amount) {
    $sql = "INSERT INTO " . $GLOBALS['ecs']->table('cart') . "(" . "user_id, session_id, goods_id, goods_sn, goods_name, market_price, goods_price, " . "goods_number, is_real, extension_code, parent_id, is_gift, rec_type ) " . "VALUES('$_SESSION[user_id]', '" . SESS_ID . "', 0, '', '$act_name', 0, " . "'" . (-1) * $amount . "', 1, 0, '', 0, '$act_id', '" . CART_GENERAL_GOODS . "')";
    $GLOBALS['db']->query($sql);
}
/**
 * 取得购物车中某优惠活动范围内的总金额
 * @param   array   $favourable     优惠活动
 * @return  float
 */
function cart_favourable_amount($favourable) {
    /* 查询优惠范围内商品总额的sql */
    $sql = "SELECT SUM(c.goods_price * c.goods_number) " . "FROM " . $GLOBALS['ecs']->table('cart') . " AS c, " . $GLOBALS['ecs']->table('goods') . " AS g " . "WHERE c.goods_id = g.goods_id " . "AND c.session_id = '" . SESS_ID . "' " . "AND c.rec_type = '" . CART_GENERAL_GOODS . "' " . "AND c.is_gift = 0 " . "AND c.goods_id > 0 ";
    /* 根据优惠范围修正sql */
    if ($favourable['act_range'] == FAR_ALL) {
        // sql do not change
        
    } elseif ($favourable['act_range'] == FAR_CATEGORY) {
        /* 取得优惠范围分类的所有下级分类 */
        $id_list = array();
        $cat_list = explode(',', $favourable['act_range_ext']);
        foreach ($cat_list as $id) {
            $id_list = array_merge($id_list, array_keys(cat_list(intval($id) , 0, false)));
        }
        $sql.= "AND g.cat_id " . db_create_in($id_list);
    } elseif ($favourable['act_range'] == FAR_BRAND) {
        $id_list = explode(',', $favourable['act_range_ext']);
        $sql.= "AND g.brand_id " . db_create_in($id_list);
    } else {
        $id_list = explode(',', $favourable['act_range_ext']);
        $sql.= "AND g.goods_id " . db_create_in($id_list);
    }
    /* 优惠范围内的商品总额 */
    return $GLOBALS['db']->getOne($sql);
}
function getRegionName($id) {
    $sql = "SELECT region_name FROM " . $GLOBALS['ecs']->table('region') . " WHERE region_id=" . $id;
    $region_name = $GLOBALS['db']->getOne($sql);
    return $region_name;
}
function getRandomNum() {
    for ($j = 0; $j <= 5; $j++) {
        srand((double)microtime() * 1000000);
        $randomnumber = rand(!$j ? 1 : 0, 9);
        $randomnum.= $randomnumber;
    }
    return $randomnum;
}
?>