<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
require_once(ROOT_PATH . "includes/fckeditor/fckeditor.php");
  require_once(ROOT_PATH . 'includes/cls_image.php');
if ($_REQUEST['act'] == 'edit')
{



    $sql = "SELECT * FROM " .$ecs->table('brand_qs'). " WHERE id=1";
    $ads_arr = $db->getRow($sql);

    $ads_arr['title'] = htmlspecialchars($ads_arr['title']);
// $ads_arr['addtime']=date("Y-m-d H:i:s",$ads_arr['fp_time']);

    create_html_editor3('requirements',$ads_arr['content']);
    $smarty->assign('ur_here',       "品牌权释修改");
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
    $smarty->assign('ads',           $ads_arr);

    assign_query_info();
    $smarty->display('brand_qs.htm');
}
elseif ($_REQUEST['act'] == 'update')
{
  
    $id=$_POST['id'];

	$title=isset($_POST['title'])?trim($_POST['title']):"";
	$entitle=isset($_POST['entitle'])?trim($_POST['entitle']):"";
	
    $requirements=isset($_POST['requirements'])?trim($_POST['requirements']):"";
			

			if (empty($_FILES['file']['error']) || (!isset($_FILES['file']['error']) && isset($_FILES['file']['tmp_name']) && $_FILES['file']['tmp_name'] != 'none'))
     {
    	$imageinfo=handle_ad_image($_FILES['file']);
			
	$thumb_o=$imageinfo['thumb_url'];
	
	$orgimg=$imageinfo['orgImg'];
	
	
		    $sql = "UPDATE " .$GLOBALS['ecs']->table('brand_qs'). " SET ".
            "title = '$title', ".
   "entitle = '$entitle', ".
            "images     = '$orgimg', ".
            "thump_o  = '$thumb_o', ".
			   	   "content    = '$requirements' ".
            "WHERE id =1";	
		}else{
			    $sql = "UPDATE " .$GLOBALS['ecs']->table('brand_qs'). " SET ".
            "title = '$title', ".
  "entitle = '$entitle', ".
			   	   "content    = '$requirements' ".
            "WHERE id = 1";	
		}
	
	//$imageinfo=handle_ad_image($_FILES['file']);


			
		
     $GLOBALS['db']->query($sql);
   /* 记录管理员操作 */
   admin_log($_POST['ad_name'], 'edit', 'brand_qs');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回', 'href' => 'brand_qs.php?act=edit&id={$id}');
   sys_msg($_LANG['edit'] .' '.$_POST['title'].' '. '修改成功!', 0, $href);

}if($_REQUEST['act']=="deleteimg"){

 $id=$_GET['id'];
 
 $sql="SELECT * FROM ".$ecs->table('brand_qs')." where id=".$id;

 $image=$db->getRow($sql); 
 
 
    if ($image['images'] != '' && is_file('../' . $image['images']))
    {
        @unlink('../' . $image['images']);
    }
	
	 
    if ($image['thump_o'] != '' && is_file('../' . $image['thump_o']))
    {
        @unlink('../' . $image['thump_o']);
    }

	
$sql="Update  ".$ecs->table('brand_qs')." SET images='',thump_o='' where id=".$id;

$state=$db->query($sql);

if($state){

 $links[0]['text']    ="返回";
  $links[0]['href']    = 'brand_qs.php?act=edit&id='.$id;
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回";
  $links[0]['href']    = 'brand_qs.php?act=edit&id='.$id;
  sys_msg("图片删除失败", 0, $links);
  }
 
 


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