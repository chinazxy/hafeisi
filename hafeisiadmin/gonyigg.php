<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
require_once(ROOT_PATH . 'includes/cls_image.php');
require_once(ROOT_PATH . "includes/fckeditor/fckeditor.php");

if ($_REQUEST['act'] == 'list')
{

       $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 0;

    $smarty->assign('ur_here',    '工艺图管理');
    $smarty->assign('action_link', array('text' =>'工艺图添加', 'href' => 'gonyigg.php?act=add'));
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
	 
    $smarty->display('gonyigglist.htm');
}elseif($_REQUEST['act'] == 'add'){

    $smarty->assign('action',        'add');
	   $smarty->assign('form_act', 'insert');
 $smarty->display('gonyigg.htm');
}elseif ($_REQUEST['act'] == 'insert')
{


	$title=isset($_POST['title'])?trim($_POST['title']):"";
	$entitle=isset($_POST['entitle'])?trim($_POST['entitle']):"";	
    $url=isset($_POST['url'])?trim($_POST['url']):"";
	$descript=isset($_POST['descript'])?trim($_POST['descript']):"";	
	$endescript=isset($_POST['endescript'])?trim($_POST['endescript']):"";	
    $resort=isset($_POST['resort'])?(int)$_POST['resort']:1;
	 $isshow=isset($_POST['isshow'])?(int)$_POST['isshow']:1;

	
    $arr=handle_gallery_image($_FILES['file']);
	$image_p=$arr['orgImg'];
	$image_p_m=$arr['thumb_url'];
    $arr=handle_gallery_image($_FILES['file_s']);
	$image_s=$arr['orgImg'];
	$image_s_m=$arr['thumb_url'];
	$addtime=time();
$sql = "INSERT INTO ".$GLOBALS['ecs']->table('gonyigg')."(title,entitle,url,descript,endescript,images,resort,addtime,isshow,thump_o,images_s,thump_o_s) ".
            "VALUES ('$title','$entitle','$url','$descript','$endescript','$image_p','$resort','$addtime','$isshow','$image_p_m','$image_s','$image_s_m')";
	
    $GLOBALS['db']->query($sql);
    /* 记录管理员操作 */
    admin_log($_POST['ad_name'], 'add', 'home');

    clear_cache_files(); // 清除缓存文件

    /* 提示信息 */

    $link[1]['text'] = "返回列表";
    $link[1]['href'] = 'gonyigg.php?act=list';

    $link[2]['text'] = "继续添加";
    $link[2]['href'] = 'gonyigg.php?act=add';
    sys_msg($_LANG['add'] . "&nbsp;" .$_POST['title'] . "&nbsp;" .'添加成功',0, $link);

}elseif ($_REQUEST['act'] == 'edit')
{



    $sql = "SELECT * FROM " .$ecs->table('gonyigg'). " WHERE id='".intval($_REQUEST['id'])."'";
    $ads_arr = $db->getRow($sql);

    $ads_arr['title'] = htmlspecialchars($ads_arr['title']);


    $smarty->assign('ur_here',       "工艺图片修改");
    $smarty->assign('action_link',   array('href' => 'gonyigg.php?act=list', 'text' =>'主推图片列表'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
    $smarty->assign('ads',           $ads_arr);

    assign_query_info();
    $smarty->display('gonyigg.htm');
}
elseif ($_REQUEST['act'] == 'update')
{
  

    /* 初始化变量 */
    $id   = !empty($_POST['id'])   ? intval($_POST['id'])   : 0;
  	$title=isset($_POST['title'])?trim($_POST['title']):"";
	$entitle=isset($_POST['entitle'])?trim($_POST['entitle']):"";
    $url=isset($_POST['url'])?trim($_POST['url']):"";
	$descript=isset($_POST['descript'])?trim($_POST['descript']):"";
	$endescript=isset($_POST['endescript'])?trim($_POST['endescript']):"";
    $resort=isset($_POST['resort'])?(int)$_POST['resort']:1;
	$isshow=isset($_POST['isshow'])?(int)$_POST['isshow']:1;
    
    handle_update_gallery_image($id,$_FILES['file'],$_FILES['file_s'],$title,$entitle,$url,$descript,$endescript,$resort,$isshow);
   /* 记录管理员操作 */
   admin_log($_POST['ad_name'], 'edit', 'home');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回列表', 'href' => 'gonyigg.php?act=list');
   sys_msg($_LANG['edit'] .' '.$_POST['title'].' '. '修改成功!', 0, $href);

}else if($_REQUEST['act'] =="deleteimg"){

$id=$_GET['id'];
$din=$_GET['din'];
$sql="SELECT * from ".$ecs->table('gonyigg')." where id=".$id;

$image=$db->getRow($sql);
if($din=='p'){
    if ($image['images'] != '' && is_file('../' . $image['images']))
    {
        @unlink('../' . $image['images']);
    }
    if ($image['thump_o'] != '' && is_file('../' . $image['thump_o']))
    {
        @unlink('../' . $image['thump_o']);
    }
	
$sql="Update  ".$ecs->table('gonyigg')." SET images='',thump_o='' where id=".$id;
}else{
	if ($image['images_s'] != '' && is_file('../' . $image['images_s']))
    {
        @unlink('../' . $image['images_s']);
    }
    if ($image['thump_o_s'] != '' && is_file('../' . $image['thump_o_s']))
    {
        @unlink('../' . $image['thump_o_s']);
    }
	
$sql="Update  ".$ecs->table('gonyigg')." SET images_s='',thump_o_s='' where id=".$id;
}
$state=$db->query($sql);

if($state){

 $links[0]['text']    ="返回工艺管理页面";
  $links[0]['href']    = 'gonyigg.php?act=edit&id='.$id;
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回工艺管理页面";
  $links[0]['href']    = 'gonyigg.php?act=edit&id='.$id;
  sys_msg("图片删除失败", 0, $links);
  }

}elseif ($_REQUEST['act'] == 'remove')
{
  
    $id = intval($_REQUEST['id']);
	
	$sql="SELECT * from ".$ecs->table('gonyigg')." where id=".$id;
  
$image=$db->getRow($sql);

    if ($image['images'] != '' && is_file('../' . $image['images']))
    {
        @unlink('../' . $image['images']);
    }
    if ($image['thump_o'] != '' && is_file('../' . $image['thump_o']))
    {
        @unlink('../' . $image['thump_o']);
    }
	  if ($image['images_s'] != '' && is_file('../' . $image['images_s']))
    {
        @unlink('../' . $image['images_s']);
    }
    if ($image['thump_o_s'] != '' && is_file('../' . $image['thump_o_s']))
    {
        @unlink('../' . $image['thump_o_s']);
    }
	
   
    $sql="DELETE  FROM  ".$ecs->table('gonyigg'). " where id=$id";

    $state=$db->query($sql);
	

  $url = 'gonyigg.php?act=query&' . str_replace('act=remove', '', $_SERVER['QUERY_STRING']);

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

    make_json_result($smarty->fetch('gonyigglist.htm'), '',
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
    $sql = 'SELECT COUNT(*) FROM ' .$GLOBALS['ecs']->table('gonyigg'). ' AS ad ' . $where;
    $filter['record_count'] = $GLOBALS['db']->getOne($sql);

    $filter = page_and_size($filter);
	


    /* 获得广告数据 */
    $arr = array();
    $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('gonyigg'). 'AS ad ' .
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

function handle_gallery_image($image_files)

{ 

$show=$isshow;
$path= ROOT_PATH;
$image = new cls_image();
$imgtitle=$image_title;
$entitle=$image_entitle;
$url=$image_url;
$descript=$image_descript;
$endescript=$image_endescript;
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
/*$addtime=time();
$sql = "INSERT INTO ".$GLOBALS['ecs']->table('zhutui')."(title,url,images,resort,addtime,isshow,thump_o) ".
            "VALUES ('$imgtitle','$url','$orgImg','$imgresort','$addtime','$show','$thumb_url')";
	
    $GLOBALS['db']->query($sql);*/
$arr[]='';
$arr['orgImg']=$orgImg;
$arr['thumb_url']=$thumb_url;
//var_dump($arr);
//exit;
return $arr;




}


function handle_update_gallery_image($ids,$image_files,$image_files_s,$image_title,$image_entitle,$image_url,$image_descript,$image_endescript,$image_sort,$isshow)

{ 
    $image_p='';
	$image_p_m='';
	$image_s='';
	$image_s_m='';
	$sql="SELECT * from ".$GLOBALS['ecs']->table('gonyigg')." where id=".$ids;
    $resultzt=$GLOBALS['db']->getRow($sql);
$show=$isshow;
$path= ROOT_PATH;
$image = new cls_image();
$imgtitle=$image_title;
$entitle=$image_entitle;
$url=$image_url;
$descript=$image_descript;
$endescript=$image_endescript;
$imgresort=$image_sort;
$addtime=time();
$id=$ids;
if($image_files['error']==0){
	 if ($resultzt['images'] != '' && is_file('../' . $resultzt['images']))
    {
        @unlink('../' . $resultzt['images']);
    }
    if ($resultzt['thump_o'] != '' && is_file('../' . $resultzt['thump_o']))
    {
        @unlink('../' . $resultzt['thump_o']);
    }
$filename =$image->random_filename() . substr($image_files['name'], strpos($image_files['name'], '.'));

$thumb_url = $image->make_thumb($image_files['tmp_name'],100,50,$path.DATA_DIR . "/home/");  
$orgImg=DATA_DIR . "/home/".$filename;

$thumb_url = DATA_DIR . "/home/".is_string($thumb_url) ? $thumb_url : '';
//原图保存
if (!move_upload_file($image_files['tmp_name'],$path.$orgImg))
    {
        return false;
    }
	$image_p=$orgImg;
	$image_p_m=$thumb_url;
}else{
	$image_p=$resultzt['images'];
	$image_p_m=$resultzt['thump_o'];
}

if($image_files_s['error']==0){
	 if ($resultzt['images_s'] != '' && is_file('../' . $resultzt['images_s']))
    {
        @unlink('../' . $resultzt['images_s']);
    }
    if ($resultzt['thump_o_s'] != '' && is_file('../' . $resultzt['thump_o_s']))
    {
        @unlink('../' . $resultzt['thump_o_s']);
    }
$filename =$image->random_filename() . substr($image_files_s['name'], strpos($image_files_s['name'], '.'));

$thumb_url = $image->make_thumb($image_files_s['tmp_name'],100,50,$path.DATA_DIR . "/home/");  
$orgImg=DATA_DIR . "/home/".$filename;

$thumb_url = DATA_DIR . "/home/".is_string($thumb_url) ? $thumb_url : '';
//原图保存
if (!move_upload_file($image_files_s['tmp_name'],$path.$orgImg))
    {
        return false;
    }
	$image_s=$orgImg;
	$image_s_m=$thumb_url;
}else{
	$image_s=$resultzt['images_s'];
	$image_s_m=$resultzt['thump_o_s'];
}
	
    $sql = "UPDATE " .$GLOBALS['ecs']->table('gonyigg'). " SET ".
            "title = '$imgtitle', ". 
			"entitle     = '$entitle', ".			
            "url     = '$url', ".
			"descript     = '$descript', ".
			"endescript     = '$endescript', ".
            "resort  = '$imgresort', ".
            "isshow    = '$isshow', ".
			   "images    = '$image_p', ".
			   	   "thump_o    = '$image_p_m',".
				    "images_s   = '$image_s', ".
			   	   "thump_o_s    = '$image_s_m' ".
            "WHERE id = '$id'";	

   /* $sql = "UPDATE " .$GLOBALS['ecs']->table('zhutui'). " SET ".
            "title = '$imgtitle', ".         
            "url     = '$url', ".
            "resort  = '$imgresort', ".
            "isshow    = '$isshow' ".
            "WHERE id = '$id'";*/



    $GLOBALS['db']->query($sql);






}

?>