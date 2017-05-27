<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
require_once(ROOT_PATH . 'includes/cls_image.php');
require_once(ROOT_PATH . "includes/fckeditor/fckeditor.php");

if ($_REQUEST['act'] == 'list')
{

       $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 1;

    $smarty->assign('ur_here',    '投诉列表');
	
	    $smarty->assign('action_link',   array('href' => 'tsexcel.php', 'text' =>'导出EXCEL文件'));
  
    $smarty->assign('pid',         $pid);
     $smarty->assign('full_page',  1);
	 
	 
	    $ads_list = get_lunbolist();

    $smarty->assign('ads_list',     $ads_list['ads']);
    $smarty->assign('filter',       $ads_list['filter']);
    $smarty->assign('record_count', $ads_list['record_count']);
    $smarty->assign('page_count',   $ads_list['page_count']);

    $sort_flag  = sort_flag($ads_list['filter']);
    $smarty->assign($sort_flag['tag'], $sort_flag['img']);

    assign_query_info();
	 
    $smarty->display('tslist.htm');
}elseif ($_REQUEST['act'] == 'edit')
{
  
    $ck=time();
    
	$sql="UPDATE  " .$ecs->table('zixun'). " SET check_time='".$ck."' WHERE id='".intval($_REQUEST['id'])."'";
	
	$db->query($sql);

    $sql = "SELECT * FROM " .$ecs->table('zixun'). " WHERE id='".intval($_REQUEST['id'])."'";
    $ads_arr = $db->getRow($sql);

    $ads_arr['title'] = htmlspecialchars($ads_arr['title']);


    $smarty->assign('ur_here',       "查看投诉");
    $smarty->assign('action_link',   array('href' => 'ts.php?act=list&pid=1', 'text' =>'投诉列表'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
    $smarty->assign('ads',           $ads_arr);

    assign_query_info();
    $smarty->display('ts.htm');
}elseif ($_REQUEST['act'] == 'remove')
{
  
    $id = intval($_REQUEST['id']);
	
	$sql="SELECT * from ".$ecs->table('lunbo')." where id=".$id;
  
$image=$db->getRow($sql);

    if ($image['images'] != '' && is_file('../' . $image['images']))
    {
        @unlink('../' . $image['images']);
    }
    if ($image['thump_o'] != '' && is_file('../' . $image['thump_o']))
    {
        @unlink('../' . $image['thump_o']);
    }
	
   
    $sql="DELETE  FROM  ".$ecs->table('lunbo'). " where id=$id";

    $state=$db->query($sql);
	

  $url = 'home.php?act=query&' . str_replace('act=remove', '', $_SERVER['QUERY_STRING']);

    ecs_header("Location: $url\n");
}elseif ($_REQUEST['act'] == 'query')
{
    $ads_list = get_lunbolist();

    $smarty->assign('ads_list',     $ads_list['ads']);
    $smarty->assign('filter',       $ads_list['filter']);
    $smarty->assign('record_count', $ads_list['record_count']);
    $smarty->assign('page_count',   $ads_list['page_count']);

    $sort_flag  = sort_flag($ads_list['filter']);
    $smarty->assign($sort_flag['tag'], $sort_flag['img']);

    make_json_result($smarty->fetch('tslist.htm'), '',
        array('filter' => $ads_list['filter'], 'page_count' => $ads_list['page_count']));
}


function get_lunbolist()
{
    /* 过滤查询 */
    $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 0;
 //   echo $pid;
    $filter = array();
      $filter['pid']    = empty($_REQUEST['pid']) ? 'ad.zhixun_type' : trim($_REQUEST['pid']);


    $where = 'where ad.id >0';
    if ($pid>=0)
    {
        $where .= " AND ad.zhixun_type = '$pid' ";
    }

    /* 获得总记录数据 */
    $sql = 'SELECT COUNT(*) FROM ' .$GLOBALS['ecs']->table('zixun'). ' AS ad ' . $where;
    $filter['record_count'] = $GLOBALS['db']->getOne($sql);

    $filter = page_and_size($filter);
	


    /* 获得广告数据 */
    $arr = array();
    $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('zixun'). 'AS ad ' .$where.' ORDER BY ad.id desc';

    $res = $GLOBALS['db']->selectLimit($sql, $filter['page_size'], $filter['start']);
  
    while ($rows = $GLOBALS['db']->fetchRow($res))
    {
         /* 广告类型的名称 */
	
           $rows['addtime']  = date("Y-m-d H:i:s",$rows['addtime']);


         $arr[] = $rows;
    }

    return array('ads' => $arr, 'filter' => $filter, 'page_count' => $filter['page_count'], 'record_count' => $filter['record_count']);
}

function handle_gallery_image($image_files,$image_title,$image_des,$image_url,$image_sort,$isshow)

{ 

$show=$isshow;
$path= ROOT_PATH;
$image = new cls_image();
$imgtitle=$image_title;
$descript=$image_des;
$url=$image_url;
$imgresort=$image_sort;

if($image_files['error']==0){
$filename =$image->random_filename() . substr($image_files['name'], strpos($image_files['name'], '.'));

$thumb_url = $image->make_thumb($image_files['tmp_name'],100,50,$path.DATA_DIR . "/home/");  
$orgImg=DATA_DIR . "/home/".$filename;

$thumb_url = DATA_DIR . "/home/".is_string($thumb_url) ? $thumb_url : '';
//原图保存
if (!move_upload_file($image_files['tmp_name'],$path.$orgImg))
    {
        return false;
    }
}
$addtime=time();
$sql = "INSERT INTO ".$GLOBALS['ecs']->table('lunbo')."(title,descript,url,images,resort,addtime,isshow,thump_o) ".
            "VALUES ('$imgtitle','$descript','$url','$orgImg','$imgresort','$addtime','$show','$thumb_url')";
	
    $GLOBALS['db']->query($sql);






}


function handle_update_gallery_image($ids,$image_files,$image_title,$image_des,$image_url,$image_sort,$isshow)

{ 

$show=$isshow;
$path= ROOT_PATH;
$image = new cls_image();
$imgtitle=$image_title;
$descript=$image_des;
$url=$image_url;
$imgresort=$image_sort;
$addtime=time();
$id=$ids;
if($image_files['error']==0){
$filename =$image->random_filename() . substr($image_files['name'], strpos($image_files['name'], '.'));

$thumb_url = $image->make_thumb($image_files['tmp_name'],100,50,$path.DATA_DIR . "/home/");  
$orgImg=DATA_DIR . "/home/".$filename;

$thumb_url = DATA_DIR . "/home/".is_string($thumb_url) ? $thumb_url : '';
//原图保存
if (!move_upload_file($image_files['tmp_name'],$path.$orgImg))
    {
        return false;
    }
	
    $sql = "UPDATE " .$GLOBALS['ecs']->table('lunbo'). " SET ".
            "title = '$imgtitle', ".
            "descript     = '$descript', ".
            "url     = '$url', ".
            "resort  = '$imgresort', ".
            "isshow    = '$isshow', ".
			   "images    = '$orgImg', ".
			   	   "thump_o    = '$thumb_url' ".
            "WHERE id = '$id'";	
}else{
    $sql = "UPDATE " .$GLOBALS['ecs']->table('lunbo'). " SET ".
            "title = '$imgtitle', ".
            "descript     = '$descript', ".
            "url     = '$url', ".
            "resort  = '$imgresort', ".
            "isshow    = '$isshow' ".
            "WHERE id = '$id'";

}


    $GLOBALS['db']->query($sql);






}

?>