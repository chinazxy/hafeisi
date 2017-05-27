<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');

require_once(ROOT_PATH . 'includes/cls_image.php');
if ($_REQUEST['act'] == 'list')
{



    $smarty->assign('ur_here',    '招商管理');


    $smarty->assign('full_page',  1);

    $ads_list =get_lunbolist();
    //自定义函数获取数据，翻页或者截取内容
    foreach($ads_list['ads'] as $k => $v){
        $pro = $v['pro'];
        $city = $v['city'];
        $dis = $v['dis'];
        $sql1 = "select region_name from " . $ecs->table('region') . " where region_id=$pro";
        $sql2 = "select region_name from " . $ecs->table('region') . " where region_id=$city";
        $sql3 = "select region_name from " . $ecs->table('region') . " where region_id=$dis";
        $pro = $db->getOne($sql1);

        $city = $db->getOne($sql2);
        $dis = $db->getOne($sql3);
        $ads_list['ads'][$k]['cn_pro'] = $pro;
        $ads_list['ads'][$k]['cn_city'] = $city;
        $ads_list['ads'][$k]['cn_dis'] = $dis;
    }

    $smarty->assign('ads_list',     $ads_list['ads']);
    $smarty->assign('filter',       $ads_list['filter']);
    $smarty->assign('record_count', $ads_list['record_count']);
    $smarty->assign('page_count',   $ads_list['page_count']);

    $sort_flag  = sort_flag($ads_list['filter']);
    $smarty->assign($sort_flag['tag'], $sort_flag['img']);

    assign_query_info();

    $smarty->display('gwzs.htm');
}elseif($_REQUEST['is_ajax']){
    echo json_encode(get_lunbolist());
}elseif($_REQUEST['act'] == 'deal'){
    $id = $_POST['id'];
    $deal = $_POST['deal'];
    $sql = "update " . $ecs->table('business') . " set deal='$deal' where id=$id";
    $res = $db->query($sql);
    if($res){

        echo "<td align='center' id='".$id."'>".$deal."</td>";
        return;
    }else{
        echo "<td align='center' id=''></td>";
        return;
    }
}elseif($_REQUEST['act'] == 'remove'){
    $id = $_POST['id'];

    $sql = "delete from " . $ecs->table('business') . " where id=$id";
    $res = $db->query($sql);
    if($res){

        echo 1;
        return;
    }else{
        echo 0;
        return;
    }
}

function get_lunbolist()
{
    /* 过滤查询 */


    $filter = array();



    $where = '';


    /* 获得总记录数据 */
    $sql = 'SELECT COUNT(*) FROM ' .$GLOBALS['ecs']->table('business'). ' AS ad ';
    $filter['record_count'] = $GLOBALS['db']->getOne($sql);
    $filter['keywords'] = empty($_REQUEST['keywords']) ? '' : trim($_REQUEST['keywords']);
    $filter['page_size'] = empty($_REQUEST['page_size']) ? '' : trim($_REQUEST['page_size']);
    $filter['start'] = empty($_REQUEST['start']) ? '' : trim($_REQUEST['start']);
    $filter['page_count'] = empty($_REQUEST['page_count']) ? '' : trim($_REQUEST['page_count']);
    $filter['page'] = empty($_REQUEST['page']) ? '' : trim($_REQUEST['page']);

    if (isset($_REQUEST['is_ajax']) && $_REQUEST['is_ajax'] == 1)
    {
        $filter['keywords'] = json_str_iconv($filter['keywords']);
    }
    $filter = page_and_size($filter);



    /* 获得广告数据 */
    $arr = array();
    $sql = 'SELECT *'.
        'FROM ' .$GLOBALS['ecs']->table('business'). 'AS ad ' .
        'GROUP BY ad.id desc';

    $res = $GLOBALS['db']->selectLimit($sql, $filter['page_size'], $filter['start']);

    while ($rows = $GLOBALS['db']->fetchRow($res))
    {
        /* 广告类型的名称 */

        $rows['addtime']  = date("Y-m-d",$rows['addtime']);
        if(strlen($rows['remark'])>20){
            $rows['content']  = utf8sub($rows['content'],10)."...";
        }

        $arr[] = $rows;
    }

    return array('ads' => $arr, 'filter' => $filter, 'page_count' => $filter['page_count'], 'record_count' => $filter['record_count']);
}



function handle_ad_image($image_files)
{
    $array=array();


    $path= ROOT_PATH;
    $image = new cls_image();

    if($image_files['error']==0){
        //var_dump($image_files);
//exit;
        $filename =$image->random_filename() . substr($image_files['name'], strpos($image_files['name'], '.'));

        $thumb_url = $image->make_thumb($image_files['tmp_name'],100,50,$path.DATA_DIR . "/news/");
        $thumb_url = DATA_DIR . "/news/".is_string($thumb_url) ? $thumb_url : '';
//原图保r存
        $orgImg=DATA_DIR . "/news/".$filename;

        $array['orgImg']=$orgImg;
        $array['thumb_url']=$thumb_url;
//原图保存
        if (!move_upload_file($image_files['tmp_name'],$path.$orgImg))
        {
            return false;
        }
    }


    return $array;




}

function utf8sub($str,$len){
    if($len<0){
        return '';
    }
    $res = '';
    $offset = 0;
    $chars = 0;
    $count = 0;
    $length = strlen($str);//待截取字符串的字节数
    while($chars<$len && $offset<$length){
        $high = decbin(ord(substr($str,$offset,1)));//先截取客串的一个字节，substr按字节进行截取
        //重要突破，已经能够判断高位字节
        if(strlen($high)<8){//英文字符ascii编码长度为7，通过长度小于8来判断
            $count = 1;
            // echo 'hello,I am in','<br>';
        }elseif (substr($high,0,3) == '110') {
            $count = 2; //取两个字节的长度
        }elseif (substr($high,0,4) == '1110') {
            $count = 3; //取三个字节的长度
        }elseif (substr($high,0,5) == '11110') {
            $count = 4;

        }elseif (substr($high,0,6) == '111110') {
            $count = 5;
        }elseif(substr($high,0,7)=='1111110'){
            $count = 6;
        }
        $res .= substr($str,$offset,$count);
        $chars +=1;
        $offset += $count;
    }

    return $res;
}

?>