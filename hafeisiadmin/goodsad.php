<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
require_once(ROOT_PATH . 'includes/cls_image.php');
require_once(ROOT_PATH . "includes/fckeditor/fckeditor.php");

if ($_REQUEST['act'] == 'list')
{

       $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 0;

    $smarty->assign('ur_here',    '商城展位管理');
    $smarty->assign('action_link', array('text' =>'展位添加', 'href' => 'goodsad.php?act=add'));
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
	 
    $smarty->display('goodsadlist.htm');
}elseif($_REQUEST['act'] == 'add'){


   $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('goods_position'). 'AS st ' .
            'GROUP BY st.id asc';

 $typelist=$GLOBALS['db']->getAll($sql);
 $smarty->assign("typelist",$typelist);
    $smarty->assign('action',        'add');
	   $smarty->assign('form_act', 'insert');
 $smarty->display('goodsad.htm');
}elseif ($_REQUEST['act'] == 'insert')
{


	$title=isset($_POST['title'])?trim($_POST['title']):"";
    $url=isset($_POST['url'])?trim($_POST['url']):"";
	 $isshow=isset($_POST['isshow'])?(int)$_POST['isshow']:1;
    $position=isset($_POST['position'])?(int)$_POST['position']:0;
	
    handle_gallery_image($_FILES['file'],$title,$url,$isshow,$position);
   
    /* 记录管理员操作 */
    admin_log($_POST['ad_name'], 'add', 'goodsad');

    clear_cache_files(); // 清除缓存文件

    /* 提示信息 */

    $link[1]['text'] = "返回列表";
    $link[1]['href'] = 'goodsad.php?act=list';

    $link[2]['text'] = "继续添加";
    $link[2]['href'] = 'goodsad.php?act=add';
    sys_msg($_LANG['add'] . "&nbsp;" .$_POST['title'] . "&nbsp;" .'添加成功',0, $link);

}elseif ($_REQUEST['act'] == 'edit')
{



    $sql = "SELECT * FROM " .$ecs->table('goodsad'). " WHERE id='".intval($_REQUEST['id'])."'";
    $ads_arr = $db->getRow($sql);
  
    $ads_arr['title'] = htmlspecialchars($ads_arr['title']);


   $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('goods_position'). 'AS st ' .
            'GROUP BY st.id asc';

 $typelist=$GLOBALS['db']->getAll($sql);
 $smarty->assign("typelist",$typelist);
    $smarty->assign('ur_here',       "展位修改");
    $smarty->assign('action_link',   array('href' => 'goodsad.php?act=list', 'text' =>'返回列表'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
    $smarty->assign('ads',           $ads_arr);

    assign_query_info();
    $smarty->display('goodsad.htm');
}
elseif ($_REQUEST['act'] == 'update')
{
  

    /* 初始化变量 */
	   $id   = !empty($_POST['id'])   ? intval($_POST['id'])   : 0;
	$title=isset($_POST['title'])?trim($_POST['title']):"";
    $url=isset($_POST['url'])?trim($_POST['url']):"";
	 $isshow=isset($_POST['isshow'])?(int)$_POST['isshow']:1;
        $position=isset($_POST['position'])?(int)$_POST['position']:0;
    handle_update_gallery_image($id,$_FILES['file'],$title,$url,$isshow,$position);
   /* 记录管理员操作 */
   admin_log($_POST['ad_name'], 'edit', 'goodsad');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回列表', 'href' => 'goodsad.php?act=list');
   sys_msg($_LANG['edit'] .' '.$_POST['title'].' '. '修改成功!', 0, $href);

}else if($_REQUEST['act'] =="deleteimg"){

$id=$_GET['id'];

$sql="SELECT * from ".$ecs->table('goodsad')." where id=".$id;

$image=$db->getRow($sql);

    if ($image['images'] != '' && is_file('../' . $image['images']))
    {
        @unlink('../' . $image['images']);
    }
    if ($image['thump_o'] != '' && is_file('../' . $image['thump_o']))
    {
        @unlink('../' . $image['thump_o']);
    }
	
$sql="Update  ".$ecs->table('goodsad')." SET images='',thump_o='' where id=".$id;

$state=$db->query($sql);

if($state){

 $links[0]['text']    ="返回修改页面";
  $links[0]['href']    = 'goodsad.php?act=edit&id='.$id;
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回修改页面";
  $links[0]['href']    = 'goodsad.php?act=edit&id='.$id;
  sys_msg("图片删除失败", 0, $links);
  }

}elseif ($_REQUEST['act'] == 'remove')
{
  
    $id = intval($_REQUEST['id']);
	
	$sql="SELECT * from ".$ecs->table('goodsad')." where id=".$id;
  
$image=$db->getRow($sql);

    if ($image['images'] != '' && is_file('../' . $image['images']))
    {
        @unlink('../' . $image['images']);
    }
    if ($image['thump_o'] != '' && is_file('../' . $image['thump_o']))
    {
        @unlink('../' . $image['thump_o']);
    }

   
    $sql="DELETE  FROM  ".$ecs->table('goodsad'). " where id=$id";

    $state=$db->query($sql);
	

  $url = 'goodsad.php?act=query&' . str_replace('act=remove', '', $_SERVER['QUERY_STRING']);

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

    make_json_result($smarty->fetch('goodsadlist.htm'), '',
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
    $sql = 'SELECT COUNT(*) FROM ' .$GLOBALS['ecs']->table('goodsad'). ' AS ad ' . $where;
    $filter['record_count'] = $GLOBALS['db']->getOne($sql);

    $filter = page_and_size($filter);
	


    /* 获得广告数据 */
    $arr = array();
    $sql = 'SELECT * '.
            'FROM ' .$GLOBALS['ecs']->table('goodsad'). 'AS ad ' .
            'GROUP BY ad.id desc';

    $res = $GLOBALS['db']->selectLimit($sql, $filter['page_size'], $filter['start']);
  
    while ($rows = $GLOBALS['db']->fetchRow($res))
    {
             $sqls='SELECT t.name FROM ' .$GLOBALS['ecs']->table('goods_position'). ' AS t where t.id='.$rows['position'];
		   $rowf=$GLOBALS['db']->getRow($sqls);
           $rows['type_name']  = $rowf['name'];
	
           $rows['addtime']  = date("Y-m-d H:i:s",$rows['addtime']);


         $arr[] = $rows;
    }

    return array('ads' => $arr, 'filter' => $filter, 'page_count' => $filter['page_count'], 'record_count' => $filter['record_count']);
}

function handle_gallery_image($image_files,$image_title,$image_url,$isshow,$position)

{ 

$show=$isshow;
$path= ROOT_PATH;
$image = new cls_image();
$imgtitle=$image_title;
$url=$image_url;
$positions=$position;

if($image_files['error']==0){
$filename =$image->random_filename() . substr($image_files['name'], strpos($image_files['name'], '.'));

$thumb_url = $image->make_thumb($image_files['tmp_name'],100,50,$path.DATA_DIR . "/goodsad/");  
$orgImg=DATA_DIR . "/goodsad/".$filename;

$thumb_url = DATA_DIR . "/goodsad/".is_string($thumb_url) ? $thumb_url : '';
//原图保存
if (!move_upload_file($image_files['tmp_name'],$path.$orgImg))
    {
        return false;
    }
}



$addtime=time();
$sql = "INSERT INTO ".$GLOBALS['ecs']->table('goodsad')."(title,url,images,addtime,isshow,thump_o,position) ".
            "VALUES ('$imgtitle','$url','$orgImg','$addtime','$show','$thumb_url','$positions')";
	
    $GLOBALS['db']->query($sql);






}


function handle_update_gallery_image($ids,$image_files,$image_title,$image_url,$isshow,$position)

{ 

$show=$isshow;
$path= ROOT_PATH;
$image = new cls_image();
$imgtitle=$image_title;
$url=$image_url;
$positions=$position;

$strs='';

$id=$ids;
if($image_files['error']==0){
$filename =$image->random_filename() . substr($image_files['name'], strpos($image_files['name'], '.'));

$thumb_url = $image->make_thumb($image_files['tmp_name'],100,50,$path.DATA_DIR . "/goodsad/");  
$orgImg=DATA_DIR . "/goodsad/".$filename;

$thumb_url = DATA_DIR . "/goodsad/".is_string($thumb_url) ? $thumb_url : '';
//原图保存
if (!move_upload_file($image_files['tmp_name'],$path.$orgImg))
    {
        return false;
    }
	
$strs.=",images='$orgImg',thump_o='$thumb_url'";
}




    $sql = "UPDATE " .$GLOBALS['ecs']->table('goodsad'). " SET ".
            "title = '$imgtitle', ".
            "url     = '$url', ".
            "position  = '$positions', ".
            "isshow    = '$isshow' ".
			$strs.
            " WHERE id = '$id'";


    $GLOBALS['db']->query($sql);






}

?>