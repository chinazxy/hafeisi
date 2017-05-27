<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
require_once(ROOT_PATH . "includes/fckeditor/fckeditor.php");
  require_once(ROOT_PATH . 'includes/cls_image.php');
if ($_REQUEST['act'] == 'list')
{

       $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 0;

    $smarty->assign('ur_here',    '品牌视觉管理');
    $smarty->assign('action_link', array('text' =>'品牌视觉添加', 'href' => 'brand_view.php?act=add'));
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
	 
    $smarty->display('brand_view_list.htm');
}elseif($_REQUEST['act'] == 'add'){


    $smarty->assign('action',        'add');
	   $smarty->assign('form_act', 'insert');
 $smarty->display('brand_view.htm');
}elseif ($_REQUEST['act'] == 'insert')
{


	$title=isset($_POST['title'])?trim($_POST['title']):"";
	
	$isshow=isset($_POST['isshow'])?intval($_POST['isshow']):1;
    $resort=isset($_POST['resort'])?intval($_POST['resort']):1;
	
			
	$grayinfo=handle_ad_image($_FILES['gray']);
	
	$gray_thumb=$grayinfo['thumb_url'];
	
	$gray_orgimg=$grayinfo['orgImg'];
		
	$imageinfo=handle_ad_image($_FILES['file']);
	
	$thumb_o=$imageinfo['thumb_url'];
	
	//$orgimg=$imageinfo['orgImg'];
	
	
	$orgsimg=handle_ad_image($_FILES['orgsimg']);
	
		//$org_t=$orgsimg['thumb_url'];
	
	    $org_o=$orgsimg['orgImg'];
	
	$addtime=time();
	
	

	$sql = "INSERT INTO ".$GLOBALS['ecs']->table('brand_view')."(title,images,thump_o,gray_images,gray_thump,resort,isshow,addtime) ".
            "VALUES ('$title','$org_o','$thumb_o','$gray_orgimg','$gray_thumb','$resort','$isshow','$addtime')";

    $GLOBALS['db']->query($sql);

    /* 记录管理员操作 */
    admin_log($_POST['ad_name'], 'add', 'brand_view');

    clear_cache_files(); // 清除缓存文件

    /* 提示信息 */

    $link[1]['text'] = "返回列表";
    $link[1]['href'] = 'brand_view.php?act=list';

    $link[2]['text'] = "继续添加";
    $link[2]['href'] = 'brand_view.php?act=add';
    sys_msg($_LANG['add'] . "&nbsp;" .$_POST['title'] . "&nbsp;" .'添加成功',0, $link);

}elseif ($_REQUEST['act'] == 'edit')
{



    $sql = "SELECT * FROM " .$ecs->table('brand_view'). " WHERE id='".intval($_REQUEST['id'])."'";
    $ads_arr = $db->getRow($sql);

    $ads_arr['title'] = htmlspecialchars($ads_arr['title']);

    $smarty->assign('ur_here',       "品牌视觉修改");
    $smarty->assign('action_link',   array('href' => 'brand_view.php?act=list', 'text' =>'品牌视觉列表'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
    $smarty->assign('ads',           $ads_arr);

    assign_query_info();
    $smarty->display('brand_view.htm');
}
elseif ($_REQUEST['act'] == 'update')
{
  
    $id=$_POST['id'];

	$title=isset($_POST['title'])?trim($_POST['title']):"";
	
	$isshow=isset($_POST['isshow'])?intval($_POST['isshow']):1;
    $resort=isset($_POST['resort'])?intval($_POST['resort']):1;
    $setstr=array();
	
				if (empty($_FILES['orgsimg']['error']) || (!isset($_FILES['orgsimg']['error']) && isset($_FILES['orgsimg']['tmp_name']) && $_FILES['orgsimg']['tmp_name'] != 'none'))
     {
    	$imageinfo=handle_ad_image($_FILES['orgsimg']);
			
	//$thumb_o=$imageinfo['thumb_url'];
	
	$orgimg=$imageinfo['orgImg'];
	array_push($setstr,'images="'.$orgimg.'"');
	
	
		}

			if (empty($_FILES['file']['error']) || (!isset($_FILES['file']['error']) && isset($_FILES['file']['tmp_name']) && $_FILES['file']['tmp_name'] != 'none'))
     {
    	$imageinfo=handle_ad_image($_FILES['file']);
			
	$thumb_o=$imageinfo['thumb_url'];
	
	
	array_push($setstr,'thump_o="'.$thumb_o.'"');
	
	
		}
		
					if (empty($_FILES['gray']['error']) || (!isset($_FILES['gray']['error']) && isset($_FILES['gray']['tmp_name']) && $_FILES['gray']['tmp_name'] != 'none'))
     {
   
	$grayinfo=handle_ad_image($_FILES['gray']);
			
    $gray_thumb=$grayinfo['thumb_url'];
	
	$gray_orgimg=$grayinfo['orgImg'];
	
		array_push($setstr,'gray_images="'.$gray_orgimg.'",gray_thump="'.$gray_thumb.'"');
	
		}
		
		if(!empty($setstr)){
		
		$strs=implode(",",$setstr);
		 $sql = "UPDATE " .$GLOBALS['ecs']->table('brand_view'). " SET ".
            "title = '$title', ".$strs.",".
			 "isshow    = '$isshow', ".
			   "resort    = '$resort' ".

            "WHERE id = '$id'";	
		}else{
				 $sql = "UPDATE " .$GLOBALS['ecs']->table('brand_view'). " SET ".
            "title = '$title',".
			 "isshow    = '$isshow', ".
			   "resort    = '$resort' ".

            "WHERE id = '$id'";	
		}
	
		   
			//print_r($setstr);
			//echo $sql;
			//exit;
	//$imageinfo=handle_ad_image($_FILES['file']);


			
		
     $GLOBALS['db']->query($sql);
   /* 记录管理员操作 */
   admin_log($_POST['ad_name'], 'edit', 'brand_view');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回列表', 'href' => 'brand_view.php?act=list');
   sys_msg($_LANG['edit'] .' '.$_POST['title'].' '. '修改成功!', 0, $href);

}elseif ($_REQUEST['act'] == 'remove')
{
  
    $id = intval($_REQUEST['id']);
	
	$sql="SELECT * FROM ".$ecs->table('brand_view')." where id=".$id;

 $image=$db->getRow($sql); 
 
 
    if ($image['images'] != '' && is_file('../' . $image['images']))
    {
        @unlink('../' . $image['images']);
    }
	
	 
    if ($image['thump_o'] != '' && is_file('../' . $image['thump_o']))
    {
        @unlink('../' . $image['thump_o']);
    }
	
	
	 
    if ($image['gray_images'] != '' && is_file('../' . $image['gray_images']))
    {
        @unlink('../' . $image['gray_images']);
    }
	
	 
    if ($image['gray_thump'] != '' && is_file('../' . $image['gray_thump']))
    {
        @unlink('../' . $image['gray_thump']);
    }

	
    $sql="DELETE  FROM  ".$ecs->table('brand_view'). " where id=$id";

    $state=$db->query($sql);
	

  $url = 'brand_view.php?act=query&' . str_replace('act=remove', '', $_SERVER['QUERY_STRING']);

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

    make_json_result($smarty->fetch('brand_view_list.htm'), '',
        array('filter' => $ads_list['filter'], 'page_count' => $ads_list['page_count']));
}elseif($_REQUEST['act']=="deleteimg"){

 $id=$_GET['id'];
 
 $sql="SELECT * FROM ".$ecs->table('brand_view')." where id=".$id;

 $image=$db->getRow($sql); 
 

	 
    if ($image['thump_o'] != '' && is_file('../' . $image['thump_o']))
    {
        @unlink('../' . $image['thump_o']);
    }
	
	

	
$sql="Update  ".$ecs->table('brand_view')." SET thump_o='' where id=".$id;

$state=$db->query($sql);

if($state){

 $links[0]['text']    ="返回";
  $links[0]['href']    = 'brand_view.php?act=edit&id='.$id;
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回";
  $links[0]['href']    = 'brand_view.php?act=edit&id='.$id;
  sys_msg("图片删除失败", 0, $links);
  }
 
 


}elseif($_REQUEST['act']=="deleteorgimg"){

 $id=$_GET['id'];
 
 $sql="SELECT * FROM ".$ecs->table('brand_view')." where id=".$id;

 $image=$db->getRow($sql); 
 
 
    if ($image['images'] != '' && is_file('../' . $image['images']))
    {
        @unlink('../' . $image['images']);
    }
	
	 

	

	
$sql="Update  ".$ecs->table('brand_view')." SET images='' where id=".$id;

$state=$db->query($sql);

if($state){

 $links[0]['text']    ="返回";
  $links[0]['href']    = 'brand_view.php?act=edit&id='.$id;
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回";
  $links[0]['href']    = 'brand_view.php?act=edit&id='.$id;
  sys_msg("图片删除失败", 0, $links);
  }
 
 


}elseif($_REQUEST['act']=="deletegrayimg"){

 $id=$_GET['id'];
 
 $sql="SELECT * FROM ".$ecs->table('brand_view')." where id=".$id;

 $image=$db->getRow($sql); 
 
 
    if ($image['gray_images'] != '' && is_file('../' . $image['gray_images']))
    {
        @unlink('../' . $image['gray_images']);
    }
	
	 
    if ($image['gray_thump'] != '' && is_file('../' . $image['gray_thump']))
    {
        @unlink('../' . $image['gray_thump']);
    }

	
$sql="Update  ".$ecs->table('brand_view')." SET gray_images='',gray_thump='' where id=".$id;

$state=$db->query($sql);

if($state){

 $links[0]['text']    ="返回";
  $links[0]['href']    = 'brand_view.php?act=edit&id='.$id;
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回";
  $links[0]['href']    = 'brand_view.php?act=edit&id='.$id;
  sys_msg("图片删除失败", 0, $links);
  }
 
 


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
    $sql = 'SELECT COUNT(*) FROM ' .$GLOBALS['ecs']->table('brand_view'). ' AS ad ' . $where;
    $filter['record_count'] = $GLOBALS['db']->getOne($sql);

    $filter = page_and_size($filter);
	


    /* 获得广告数据 */
    $arr = array();
    $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('brand_view'). 'AS ad ' .
            'GROUP BY ad.id desc';

    $res = $GLOBALS['db']->selectLimit($sql, $filter['page_size'], $filter['start']);
  
    while ($rows = $GLOBALS['db']->fetchRow($res))
    {
         /* 广告类型的名称 */
	
           $rows['addtime']  = date("Y-m-d",$rows['addtime']);


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
$filename =$image->random_filename() . substr($image_files['name'], strpos($image_files['name'], '.'));

$thumb_url = $image->make_thumb($image_files['tmp_name'],480,210,$path.DATA_DIR . "/brand_view/");  
$thumb_url = DATA_DIR . "/brand_view/".is_string($thumb_url) ? $thumb_url : '';
//原图保r存
$array['thumb_url']=$thumb_url;
$orgImg=DATA_DIR . "/brand_view/".$filename;
//原图保存
if (!move_upload_file($image_files['tmp_name'],$path.$orgImg))
    {
        return false;
    }
}
$array['orgImg']=$orgImg;

return $array;




}


?>