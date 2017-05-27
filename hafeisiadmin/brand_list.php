<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
require_once(ROOT_PATH . 'includes/cls_image.php');
require_once(ROOT_PATH . "includes/fckeditor/fckeditor.php");

if ($_REQUEST['act'] == 'list')
{

       $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 0;

    $smarty->assign('ur_here',    '品牌列表管理');
    $smarty->assign('action_link', array('text' =>'品牌添加', 'href' => 'brand_list.php?act=add'));
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
	 
    $smarty->display('brandlist.htm');
}elseif($_REQUEST['act'] == 'add'){

    $smarty->assign('action',        'add');
	   $smarty->assign('form_act', 'insert');
 $smarty->display('brand_add.htm');
}elseif ($_REQUEST['act'] == 'insert')
{


	$title=isset($_POST['title'])?trim($_POST['title']):"";
	
	$descript=isset($_POST['brand_des'])?trim($_POST['brand_des']):"";
    $sudu=isset($_POST['sudu'])?intval($_POST['sudu']):0;
 
    $resort=isset($_POST['resort'])?(int)$_POST['resort']:1;
	 $isshow=isset($_POST['isshow'])?(int)$_POST['isshow']:1;
   
	
    handle_gallery_image($_FILES['file'],$title,$descript,$url,$resort,$isshow,$buy_url,$detail_url,$rval,$bval);
   
    /* 记录管理员操作 */
    admin_log($_POST['ad_name'], 'add', 'home');

    clear_cache_files(); // 清除缓存文件

    /* 提示信息 */

    $link[1]['text'] = "返回列表";
    $link[1]['href'] = 'home.php?act=list';

    $link[2]['text'] = "继续添加";
    $link[2]['href'] = 'home.php?act=add';
    sys_msg($_LANG['add'] . "&nbsp;" .$_POST['title'] . "&nbsp;" .'添加成功',0, $link);

}elseif ($_REQUEST['act'] == 'edit')
{



    $sql = "SELECT * FROM " .$ecs->table('lunbo'). " WHERE id='".intval($_REQUEST['id'])."'";
    $ads_arr = $db->getRow($sql);

    $ads_arr['title'] = htmlspecialchars($ads_arr['title']);


    $smarty->assign('ur_here',       "轮播图修改");
    $smarty->assign('action_link',   array('href' => 'home.php?act=list', 'text' =>'轮播图列表'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
    $smarty->assign('ads',           $ads_arr);

    assign_query_info();
    $smarty->display('home.htm');
}
elseif ($_REQUEST['act'] == 'update')
{
  

    /* 初始化变量 */
    $id   = !empty($_POST['id'])   ? intval($_POST['id'])   : 0;
  	$title=isset($_POST['title'])?trim($_POST['title']):"";
	$descript=isset($_POST['descript'])?trim($_POST['descript']):"";
    $url=isset($_POST['url'])?trim($_POST['url']):"";
    $resort=isset($_POST['resort'])?(int)$_POST['resort']:1;
	$isshow=isset($_POST['isshow'])?(int)$_POST['isshow']:1;
     $buy_url=isset($_POST['buy_url'])?trim($_POST['buy_url']):"";
      $detail_url=isset($_POST['detail_url'])?trim($_POST['detail_url']):"";
	  $rval=isset($_POST['right_val'])?(int)$_POST['right_val']:0;
      $bval=isset($_POST['bottom_val'])?(int)$_POST['bottom_val']:0;
    handle_update_gallery_image($id,$_FILES['file'],$title,$descript,$url,$resort,$isshow,$buy_url,$detail_url,$rval,$bval);
   /* 记录管理员操作 */
   admin_log($_POST['ad_name'], 'edit', 'home');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回列表', 'href' => 'home.php?act=list');
   sys_msg($_LANG['edit'] .' '.$_POST['title'].' '. '修改成功!', 0, $href);

}else if($_REQUEST['act'] =="deleteimg"){

$id=$_GET['id'];

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
	
$sql="Update  ".$ecs->table('lunbo')." SET images='',thump_o='' where id=".$id;

$state=$db->query($sql);

if($state){

 $links[0]['text']    ="返回轮播管理页面";
  $links[0]['href']    = 'home.php?act=edit&id='.$id;
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回轮播管理页面";
  $links[0]['href']    = 'home.php?act=edit&id='.$id;
  sys_msg("图片删除失败", 0, $links);
  }

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

    make_json_result($smarty->fetch('homelist.htm'), '',
        array('filter' => $ads_list['filter'], 'page_count' => $ads_list['page_count']));
}


function get_lunbolist()
{
    /* 过滤查询 */
    $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 0;

    $filter = array();
    $filter['title']    = empty($_REQUEST['title']) ? 'ad.title' : trim($_REQUEST['title']);


    $where = '';
    if ($pid > 0)
    {
        $where .= " AND ad.id = '$pid' ";
    }

    /* 获得总记录数据 */
    $sql = 'SELECT COUNT(*) FROM ' .$GLOBALS['ecs']->table('lunbo'). ' AS ad ' . $where;
    $filter['record_count'] = $GLOBALS['db']->getOne($sql);

    $filter = page_and_size($filter);
	


    /* 获得广告数据 */
    $arr = array();
    $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('lunbo'). 'AS ad ' .
            'GROUP BY ad.id desc,ad.resort asc';

    $res = $GLOBALS['db']->selectLimit($sql, $filter['page_size'], $filter['start']);
  
    while ($rows = $GLOBALS['db']->fetchRow($res))
    {
         /* 广告类型的名称 */
	
           $rows['addtime']  = date("Y-m-d H:i:s",$rows['addtime']);


         $arr[] = $rows;
    }

    return array('ads' => $arr, 'filter' => $filter, 'page_count' => $filter['page_count'], 'record_count' => $filter['record_count']);
}

function handle_gallery_image($image_files,$image_title,$image_des,$image_url,$image_sort,$isshow,$buy_url,$detail_url,$rightval,$bottomval)

{ 

$show=$isshow;
$path= ROOT_PATH;
$image = new cls_image();
$imgtitle=$image_title;
$descript=$image_des;
$url=$image_url;
$imgresort=$image_sort;
$burl=$buy_url;
$durl=$detail_url;
$rval=$rightval;

$bval=$bottomval;
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
$sql = "INSERT INTO ".$GLOBALS['ecs']->table('lunbo')."(title,descript,url,images,resort,addtime,isshow,thump_o,buy_url,detail_url,right_val,bottom_val) ".
            "VALUES ('$imgtitle','$descript','$url','$orgImg','$imgresort','$addtime','$show','$thumb_url','$burl','$durl','$rval','$bval')";
	
    $GLOBALS['db']->query($sql);






}


function handle_update_gallery_image($ids,$image_files,$image_title,$image_des,$image_url,$image_sort,$isshow,$buy_url,$detail_url,$rightval,$bottomval)

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
$burl=$buy_url;
$durl=$detail_url;
$rval=$rightval;
$bval=$bottomval;
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
			      "buy_url    = '$burl', ".
				     "detail_url    = '$durl', ".
					    "right_val    = '$rval', ".
				     "bottom_val    = '$bval', ".
			   	   "thump_o    = '$thumb_url' ".
            "WHERE id = '$id'";	
}else{
    $sql = "UPDATE " .$GLOBALS['ecs']->table('lunbo'). " SET ".
            "title = '$imgtitle', ".
            "descript     = '$descript', ".
            "url     = '$url', ".
            "resort  = '$imgresort', ".
			 "buy_url    = '$burl', ".
				     "detail_url    = '$durl', ".
					     "right_val    = '$rval', ".
				     "bottom_val    = '$bval', ".
            "isshow    = '$isshow' ".
            "WHERE id = '$id'";

}


    $GLOBALS['db']->query($sql);






}

?>