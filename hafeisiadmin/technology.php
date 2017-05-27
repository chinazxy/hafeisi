<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
require_once(ROOT_PATH . "includes/fckeditor/fckeditor.php");
  require_once(ROOT_PATH . 'includes/cls_image.php');
if ($_REQUEST['act'] == 'list')
{

       $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 0;

    $smarty->assign('ur_here',    '科技管理');
    $smarty->assign('action_link', array('text' =>'科技添加', 'href' => 'technology.php?act=add'));
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
	 
    $smarty->display('technologylist.htm');
}elseif($_REQUEST['act'] == 'add'){

 create_html_editor3('requirements',"");
    $smarty->assign('action',        'add');
	   $smarty->assign('form_act', 'insert');
 $smarty->display('technology.htm');
}elseif ($_REQUEST['act'] == 'insert')
{


	$title=isset($_POST['title'])?trim($_POST['title']):"";
	$descript=isset($_POST['descript'])?trim($_POST['descript']):"";
      $css=isset($_POST['css'])?trim($_POST['css']):"";

  
	$isshow=isset($_POST['isshow'])?intval($_POST['isshow']):1;
    $resort=isset($_POST['resort'])?intval($_POST['resort']):1;
		
    $requirements=isset($_POST['requirements'])?trim($_POST['requirements']):"";
	
	
	$imageinfo=handle_ad_image($_FILES['file']);
	
	$thumb_o=$imageinfo['thumb_url'];
	
	$orgimg=$imageinfo['orgImg'];
	
	$addtime=time();
	
	

	$sql = "INSERT INTO ".$GLOBALS['ecs']->table('technology')."(title,descript,images,thump_o,cssstyle,content,resort,isshow,addtime) ".
            "VALUES ('$title','$descript','$orgimg','$thumb_o','$css','$requirements','$resort','$isshow','$addtime')";

    $GLOBALS['db']->query($sql);

    /* 记录管理员操作 */
    admin_log($_POST['ad_name'], 'add', 'technology');

    clear_cache_files(); // 清除缓存文件

    /* 提示信息 */

    $link[1]['text'] = "返回列表";
    $link[1]['href'] = 'technology.php?act=list';

    $link[2]['text'] = "继续添加";
    $link[2]['href'] = 'technology.php?act=add';
    sys_msg($_LANG['add'] . "&nbsp;" .$_POST['title'] . "&nbsp;" .'添加成功',0, $link);

}elseif ($_REQUEST['act'] == 'edit')
{



    $sql = "SELECT * FROM " .$ecs->table('technology'). " WHERE id='".intval($_REQUEST['id'])."'";
    $ads_arr = $db->getRow($sql);

    $ads_arr['title'] = htmlspecialchars($ads_arr['title']);
// $ads_arr['addtime']=date("Y-m-d H:i:s",$ads_arr['fp_time']);

    create_html_editor3('requirements',$ads_arr['content']);
    $smarty->assign('ur_here',       "科技修改");
    $smarty->assign('action_link',   array('href' => 'technology.php?act=list', 'text' =>'科技列表'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
    $smarty->assign('ads',           $ads_arr);

    assign_query_info();
    $smarty->display('technology.htm');
}
elseif ($_REQUEST['act'] == 'update')
{
  
    $id=$_POST['id'];

	$title=isset($_POST['title'])?trim($_POST['title']):"";
	$descript=isset($_POST['descript'])?trim($_POST['descript']):"";
    $css=isset($_POST['css'])?trim($_POST['css']):"";

  
	$isshow=isset($_POST['isshow'])?intval($_POST['isshow']):1;
    $resort=isset($_POST['resort'])?intval($_POST['resort']):1;
		
    $requirements=isset($_POST['requirements'])?trim($_POST['requirements']):"";
			

			if (empty($_FILES['file']['error']) || (!isset($_FILES['file']['error']) && isset($_FILES['file']['tmp_name']) && $_FILES['file']['tmp_name'] != 'none'))
     {
    	$imageinfo=handle_ad_image($_FILES['file']);
			
	$thumb_o=$imageinfo['thumb_url'];
	
	$orgimg=$imageinfo['orgImg'];
	
	
		    $sql = "UPDATE " .$GLOBALS['ecs']->table('technology'). " SET ".
            "title = '$title', ".
            "descript     = '$descript', ".
            "images     = '$orgimg', ".
            "thump_o  = '$thumb_o', ".
            "cssstyle    = '$css', ".
			 "isshow    = '$isshow', ".
			   "resort    = '$resort', ".
			   	   "content    = '$requirements' ".
            "WHERE id = '$id'";	
		}else{
			    $sql = "UPDATE " .$GLOBALS['ecs']->table('technology'). " SET ".
            "title = '$title', ".
            "descript     = '$descript', ".
            "cssstyle    = '$css', ".
			 "isshow    = '$isshow', ".
			   "resort    = '$resort', ".
			   	   "content    = '$requirements' ".
            "WHERE id = '$id'";	
		}
	
	//$imageinfo=handle_ad_image($_FILES['file']);


			
		
     $GLOBALS['db']->query($sql);
   /* 记录管理员操作 */
   admin_log($_POST['ad_name'], 'edit', 'technology');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回列表', 'href' => 'technology.php?act=list');
   sys_msg($_LANG['edit'] .' '.$_POST['title'].' '. '修改成功!', 0, $href);

}elseif ($_REQUEST['act'] == 'remove')
{
  
    $id = intval($_REQUEST['id']);
	
    $sql="DELETE  FROM  ".$ecs->table('technology'). " where id=$id";

    $state=$db->query($sql);
	

  $url = 'technology.php?act=query&' . str_replace('act=remove', '', $_SERVER['QUERY_STRING']);

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

    make_json_result($smarty->fetch('technologylist.htm'), '',
        array('filter' => $ads_list['filter'], 'page_count' => $ads_list['page_count']));
}elseif($_REQUEST['act']=="deleteimg"){

 $id=$_GET['id'];
 
 $sql="SELECT * FROM ".$ecs->table('technology')." where id=".$id;

 $image=$db->getRow($sql); 
 
 
    if ($image['images'] != '' && is_file('../' . $image['images']))
    {
        @unlink('../' . $image['images']);
    }
	
	 
    if ($image['thump_o'] != '' && is_file('../' . $image['thump_o']))
    {
        @unlink('../' . $image['thump_o']);
    }

	
$sql="Update  ".$ecs->table('technology')." SET images='',thump_o='' where id=".$id;

$state=$db->query($sql);

if($state){

 $links[0]['text']    ="返回";
  $links[0]['href']    = 'technology.php?act=edit&id='.$id;
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回";
  $links[0]['href']    = 'technology.php?act=edit&id='.$id;
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
    $sql = 'SELECT COUNT(*) FROM ' .$GLOBALS['ecs']->table('technology'). ' AS ad ' . $where;
    $filter['record_count'] = $GLOBALS['db']->getOne($sql);

    $filter = page_and_size($filter);
	


    /* 获得广告数据 */
    $arr = array();
    $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('technology'). 'AS ad ' .
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