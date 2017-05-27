<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
require_once(ROOT_PATH . 'includes/cls_image.php');
require_once(ROOT_PATH . "includes/fckeditor/fckeditor.php");
if(empty($_REQUEST['act'])){
	
$_REQUEST['act']="add";
}
if($_REQUEST['act'] == 'add'){

	   $glsql="SELECT * FROM " .$GLOBALS['ecs']->table('cat_addtype'). " WHERE cat_id=".$_GET['id']." and type=".$_GET['type'];
	   $glinfo=$GLOBALS['db']->getRow($glsql);
	     $smarty->assign('glinfo',        $glinfo);	
			  $smarty->assign('attrlist',        $attrlist);
		  
	    $smarty->assign('res',        $res);		
	  $smarty->assign('id',        $_GET['id']);
	    $smarty->assign('type',        $_GET['type']);
    $smarty->assign('action',        'add');
	if($glinfo['id']>0){
	   $smarty->assign('form_act', 'update');
	}else{
		   $smarty->assign('form_act', 'insert');
		
	}
	   //exit;
 $smarty->display('cat_video.htm');
}elseif ($_REQUEST['act'] == 'insert')
{

$type=isset($_POST['type'])?(int)$_POST['type']:0;
$id=isset($_POST['id'])?(int)$_POST['id']:0;

	$title=isset($_POST['title'])?trim($_POST['title']):"";
    $entitle=isset($_POST['entitle'])?trim($_POST['entitle']):"";
	$mp4=isset($_POST['mp4'])?trim($_POST['mp4']):"";
      $webm=isset($_POST['webm'])?trim($_POST['webm']):"";
	
  $ogg=isset($_POST['ogg'])?trim($_POST['ogg']):"";
	   if(!$_FILES['files']['error'] > 0){
		   
		       $imagearray=handle_upload_image($_FILES['files']);
		      $images=$imagearray['orgImg'];
			  $images_t=$imagearray['thumb_url'];
	   }else{
		     $images=$_POST['images'];
			  $images_t=$_POST['images_t'];
		   
		 
	   }
	  
$sql = "INSERT INTO ".$GLOBALS['ecs']->table('cat_addtype')."(id,title,entitle,type,cat_id,image,images_t,mp4,webm,ogg) ".
            "VALUES ('NULL','$title','$entitle','$type','$id','$images','$images_t','$mp4','$webm','$ogg')";
	
    $state=$GLOBALS['db']->query($sql);

    /* 记录管理员操作 */
    admin_log($_POST['ad_name'], 'add', 'dingzhi');

    clear_cache_files(); // 清除缓存文件

    /* 提示信息 */

    $link[1]['text'] = "返回";
    $link[1]['href'] = 'cat_video.php?act=add&id='.$id.'&type='.$type;

    sys_msg($_LANG['add'] . "&nbsp;" .$_POST['title'] . "&nbsp;" .'添加成功',0, $link);

}else if ($_REQUEST['act'] == 'update')
{
 
   $id=$_REQUEST['id'];
  $type=$_REQUEST['type'];

  
    /* 初始化变量 */
 	$title=isset($_POST['title'])?trim($_POST['title']):"";
    $entitle=isset($_POST['entitle'])?trim($_POST['entitle']):"";
  	$mp4=isset($_POST['mp4'])?trim($_POST['mp4']):"";
      $webm=isset($_POST['webm'])?trim($_POST['webm']):"";
	
  $ogg=isset($_POST['ogg'])?trim($_POST['ogg']):"";
	$uploadte=false;
     if(!$_FILES['files']['error'] > 0){
		   $uploadte=true;
		       $imagearray=handle_upload_image($_FILES['files']);
		      $images=$imagearray['orgImg'];
			  $images_t=$imagearray['thumb_url'];
	   }else{
		    $uploadte=false;
		       $images=$_POST['images'];
			  $images_t=$_POST['images_t'];    
		 
	   }
    $sql = "UPDATE " .$GLOBALS['ecs']->table('cat_addtype'). " SET ".
            "title = '$title', ".     
            "entitle     = '$entitle', ".   
			"image = '$images', ".   
			"mp4 = '$mp4', ".  
			"webm = '$webm', ".  
				"ogg = '$ogg', ".  
            "images_t = '$images_t' ".   
				 
            "WHERE cat_id = '$id' and type='$type'";	


   $state=$GLOBALS['db']->query($sql);
   if($state && $uploadte){
	   
	   	    $old=$_POST['images'];
		$olds=$_POST['images_t'];
		   if ($old!= '' && is_file('../' . $old))
    {
        @unlink('../' . $old);
    }
    if ($olds!= '' && is_file('../' . $olds))
    {
        @unlink('../' . $olds);
    }
	   
   }

   /* 记录管理员操作 */
   admin_log($_POST['ad_name'], 'edit', 'jk');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回', 'href' => 'cat_video.php?act=add&id='.$id.'&type='. $type);
   sys_msg($_LANG['edit'] .' '.$_POST['title'].' '. '修改成功!', 0, $href);

}

function handle_upload_image($image_files)
{ 
$array=array();


$path= ROOT_PATH;
$image = new cls_image();

if($image_files['error']==0){
$filename =$image->random_filename() . substr($image_files['name'], strpos($image_files['name'], '.'));

$thumb_url = $image->make_thumb($image_files['tmp_name'],172,97,$path.DATA_DIR . "/pinpai/");  
$thumb_url = DATA_DIR . "/pinpai/".is_string($thumb_url) ? $thumb_url : '';
//原图保r存
$orgImg=DATA_DIR . "/pinpai/".$filename;

$array['thumb_url']=$thumb_url;
$array['orgImg']=$orgImg;


//原图保存
if (!move_upload_file($image_files['tmp_name'],$path.$orgImg))
    {
        return false;
    }
}

return $array;



}
?>