<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');

  require_once(ROOT_PATH . 'includes/cls_image.php');
if ($_REQUEST['act'] == 'list')
{

       $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 0;

    $smarty->assign('ur_here',    '品牌TVC管理');
    $smarty->assign('action_link', array('text' =>'TVC添加', 'href' => 'brand_tvc.php?act=add'));
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
	 
    $smarty->display('brand_tvc_list.htm');
}elseif($_REQUEST['act'] == 'add'){


    $smarty->assign('action',        'add');
	   $smarty->assign('form_act', 'insert');
 $smarty->display('brand_tvc.htm');
}elseif ($_REQUEST['act'] == 'insert')
{


		$title=isset($_POST['title'])?trim($_POST['title']):"";
	$webm=isset($_POST['webm'])?trim($_POST['webm']):"";
    $mp4=isset($_POST['mp4'])?trim($_POST['mp4']):"";

  
	$isshow=isset($_POST['isshow'])?intval($_POST['isshow']):1;

    $ogv=isset($_POST['ogv'])?trim($_POST['ogv']):"";
	
	
	$imageinfo=handle_ad_image($_FILES['file']);
	
	$thumb_o=$imageinfo['thumb_url'];
	
	$orgimg=$imageinfo['orgImg'];
	
	$addtime=time();
	
	

	$sql = "INSERT INTO ".$GLOBALS['ecs']->table('brand_tvc')."(title,webm,mp4,ogv,images,thump_o,isshow,addtime) ".
            "VALUES ('$title','$webm','$mp4','$ogv','$orgimg','$thumb_o','$isshow','$addtime')";

    $GLOBALS['db']->query($sql);

    /* 记录管理员操作 */
    admin_log($_POST['ad_name'], 'add', 'brand_tvc');

    clear_cache_files(); // 清除缓存文件

    /* 提示信息 */

    $link[1]['text'] = "返回列表";
    $link[1]['href'] = 'brand_tvc.php?act=list';

    $link[2]['text'] = "继续添加";
    $link[2]['href'] = 'brand_tvc.php?act=add';
    sys_msg($_LANG['add'] . "&nbsp;" .$_POST['title'] . "&nbsp;" .'添加成功',0, $link);

}elseif ($_REQUEST['act'] == 'edit')
{



    $sql = "SELECT * FROM " .$ecs->table('brand_tvc'). " WHERE id='".intval($_REQUEST['id'])."'";
    $ads_arr = $db->getRow($sql);

    $ads_arr['title'] = htmlspecialchars($ads_arr['title']);

    $smarty->assign('ur_here',       "科技修改");
    $smarty->assign('action_link',   array('href' => 'brand_tvc.php?act=list', 'text' =>'科技列表'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
    $smarty->assign('ads',           $ads_arr);

    assign_query_info();
    $smarty->display('brand_tvc.htm');
}
elseif ($_REQUEST['act'] == 'update')
{
  
    $id=$_POST['id'];

	$title=isset($_POST['title'])?trim($_POST['title']):"";
	$webm=isset($_POST['webm'])?trim($_POST['webm']):"";
    $mp4=isset($_POST['mp4'])?trim($_POST['mp4']):"";

  
	$isshow=isset($_POST['isshow'])?intval($_POST['isshow']):1;

    $ogv=isset($_POST['ogv'])?trim($_POST['ogv']):"";
			

			if (empty($_FILES['file']['error']) || (!isset($_FILES['file']['error']) && isset($_FILES['file']['tmp_name']) && $_FILES['file']['tmp_name'] != 'none'))
     {
    	$imageinfo=handle_ad_image($_FILES['file']);
			
	$thumb_o=$imageinfo['thumb_url'];
	
	$orgimg=$imageinfo['orgImg'];
	
	
		    $sql = "UPDATE " .$GLOBALS['ecs']->table('brand_tvc'). " SET ".
            "title = '$title', ".
            "webm     = '$webm', ".
            "mp4     = '$mp4', ".
            "ogv  = '$ogv', ".
             "images     = '$orgimg', ".
            "thump_o  = '$thumb_o', ".
			 "isshow    = '$isshow'".
			 

            "WHERE id = '$id'";	
		}else{
			    $sql = "UPDATE " .$GLOBALS['ecs']->table('brand_tvc'). " SET ".
            "title = '$title', ".
            "webm     = '$webm', ".
            "mp4     = '$mp4', ".
            "ogv  = '$ogv', ".
			 "isshow    = '$isshow' ".

            "WHERE id = '$id'";	
		}
	
	//$imageinfo=handle_ad_image($_FILES['file']);


			
		
     $GLOBALS['db']->query($sql);
   /* 记录管理员操作 */
   admin_log($_POST['ad_name'], 'edit', 'brand_tvc');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回列表', 'href' => 'brand_tvc.php?act=list');
   sys_msg($_LANG['edit'] .' '.$_POST['title'].' '. '修改成功!', 0, $href);

}elseif ($_REQUEST['act'] == 'remove')
{
  
    $id = intval($_REQUEST['id']);
	
    $sql="DELETE  FROM  ".$ecs->table('brand_tvc'). " where id=$id";

    $state=$db->query($sql);
	

  $url = 'brand_tvc.php?act=query&' . str_replace('act=remove', '', $_SERVER['QUERY_STRING']);

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

    make_json_result($smarty->fetch('brand_tvc_list.htm'), '',
        array('filter' => $ads_list['filter'], 'page_count' => $ads_list['page_count']));
}elseif($_REQUEST['act']=="deleteimg"){

 $id=$_GET['id'];
 
 $sql="SELECT * FROM ".$ecs->table('brand_tvc')." where id=".$id;

 $image=$db->getRow($sql); 
 
 
    if ($image['images'] != '' && is_file('../' . $image['images']))
    {
        @unlink('../' . $image['images']);
    }
	
	 
    if ($image['thump_o'] != '' && is_file('../' . $image['thump_o']))
    {
        @unlink('../' . $image['thump_o']);
    }

	
$sql="Update  ".$ecs->table('brand_tvc')." SET images='',thump_o='' where id=".$id;

$state=$db->query($sql);

if($state){

 $links[0]['text']    ="返回";
  $links[0]['href']    = 'brand_tvc.php?act=edit&id='.$id;
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回";
  $links[0]['href']    = 'brand_tvc.php?act=edit&id='.$id;
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
    $sql = 'SELECT COUNT(*) FROM ' .$GLOBALS['ecs']->table('brand_tvc'). ' AS ad ' . $where;
    $filter['record_count'] = $GLOBALS['db']->getOne($sql);

    $filter = page_and_size($filter);
	


    /* 获得广告数据 */
    $arr = array();
    $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('brand_tvc'). 'AS ad ' .
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

$thumb_url = $image->make_thumb($image_files['tmp_name'],100,50,$path.DATA_DIR . "/technology/");  
$thumb_url = DATA_DIR . "/technology/".is_string($thumb_url) ? $thumb_url : '';
//原图保r存
$array['thumb_url']=$thumb_url;
$orgImg=DATA_DIR . "/technology/".$filename;
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