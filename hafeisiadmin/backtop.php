<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
require_once(ROOT_PATH . 'includes/cls_image.php');
require_once(ROOT_PATH . "includes/fckeditor/fckeditor.php");
$action=isset($_REQUEST['act'])?trim($_REQUEST['act']):"add";
if($action=="add"){

$sql="SELECT * FROM ".$ecs->table('backtop')." limit 1 ";

$info=$db->getRow($sql);


$smarty->assign("info",$info);


$smarty->assign('ur_here', "图标管理");
 
$smarty->display('backtop.htm');
}elseif($action=="add_submit"){


if(isset($_FILES['images']['name']) && $_FILES['images']['name'] != ''  && $_FILES['images']['error']==0) {

$path= ROOT_PATH;
$image = new cls_image();
$filename =$image->random_filename() . substr($_FILES['images']['name'], strpos($_FILES['images']['name'], '.'));
$orgImg=DATA_DIR . "/backtop/".$filename;


//原图保存
if (!move_upload_file($_FILES['images']['tmp_name'],$path.$orgImg))
    {
        return false;
    }
	

	
 $sql = "UPDATE ".$GLOBALS['ecs']->table('backtop')."SET images= '".$orgImg."' where id=1";
			
    $state=$GLOBALS['db']->query($sql);
}


  $links[0]['text']    ="返回";
  $links[0]['href']    = 'backtop.php?act=add';
  sys_msg("修改成功", 0, $links);



}else if($action=="deleteimg"){

$id=$_GET['id'];

$sql="SELECT * from ".$ecs->table('home_img')." where id=".$id;

$image=$db->getRow($sql);

    if ($image['thump_o'] != '' && is_file('../' . $image['thump_o']))
    {
        @unlink('../' . $image['thump_o']);
    }
    if ($image['thump_t'] != '' && is_file('../' . $image['thump_t']))
    {
        @unlink('../' . $image['thump_t']);
    }
	

 $sql = "UPDATE ".$GLOBALS['ecs']->table('home_img')."SET images= '".$orgImg."' where id=1";

$state=$db->query($sql);

if($state){

 $links[0]['text']    ="返回首页管理页面";
  $links[0]['href']    = 'home.php?act=add';
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回首页管理页面";
  $links[0]['href']    = 'home.php?act=add';
  sys_msg("图片删除失败", 0, $links);
  }

}




function handle_bg_image($news_id, $image_files,$width,$hight,$type)

{ 


$articel_width = $width;

$articel_height =$hight;

$path= ROOT_PATH;
$image = new cls_image();
$thumb_url = $image->make_thumb($image_files['tmp_name'],$articel_width,$articel_height,$path.DATA_DIR . "/home/");  
$sql="SELECT * FROM ".$GLOBALS['ecs']->table('home')." where id=".$news_id;
$image=$GLOBALS['db']->getRow($sql);

if($type=="left"){
 
   echo is_file("../".$image['left_plot']) ;
  
    if ($image['left_plot'] != '' && is_file("../".$image['left_plot']))
    {

        @unlink('../' . $image['left_plot']);
    }
	
	$thumb_url = DATA_DIR . "/home/".is_string($thumb_url) ? $thumb_url : '';

$sql = "UPDATE  ".$GLOBALS['ecs']->table('home')." SET left_plot='".$thumb_url."' WHERE id=".$news_id;
			


}else if($type=="right1"){

    if ($image['right_pro'] != '' && is_file("../".$image['right_pro']))
    {
        @unlink("../".$image['right_pro']);
    }
$sql = "UPDATE  ".$GLOBALS['ecs']->table('home')." SET right_pro='".$thumb_url."' WHERE id=".$image['id'];
}else if($type=="right2"){

   if ($image['right_pro2'] != '' && is_file("../".$image['right_pro2']))
    {
        @unlink("../".$image['right_pro2']);
    }

$sql = "UPDATE  ".$GLOBALS['ecs']->table('home')." SET right_pro2='".$thumb_url."' WHERE id=".$image['id'];
}




$GLOBALS['db']->query($sql);



}




function handle_gallery_image($image_files,$image_title,$image_des,$image_url,$image_sort,$width,$hight)

{ 



$articel_width = $width;

$articel_height =$hight;

$path= ROOT_PATH;
$image = new cls_image();
foreach ($image_title AS $key => $title)

{
$imgtitle=$title;
$descript=$image_des[$key];
$url=$image_url[$key];
$imgresort=$image_sort[$key];
$filename =$image->random_filename() . substr($image_files['name'][0], strpos($image_files['name'][0], '.'));
$orgImg=DATA_DIR . "/home/".$filename;

$path_m    = DATA_DIR . "/home/"."m_".$filename;
$thumb_url = $image->make_thumb($image_files['tmp_name'][$key],$articel_width,$articel_height,$path.DATA_DIR . "/home/");  

$thumb_url = DATA_DIR . "/home/".is_string($thumb_url) ? $thumb_url : '';
//原图保存
if (!move_upload_file($image_files['tmp_name'][$key],$path.$orgImg))
    {
        return false;
    }


$sql = "INSERT INTO ".$GLOBALS['ecs']->table('home_img')."(title,descript,url,thump_o,thump_t,resort) ".
            "VALUES ('$imgtitle','$descript','$url','$orgImg','$thumb_url','$imgresort')";
			
    $GLOBALS['db']->query($sql);


}



}


function handle_update_image($item_id,$image_name,$tempname,$width,$height)
{ 

$articel_width = $width;

$articel_height =$hight;
$path= ROOT_PATH;
$image = new cls_image();
$filename =$image->random_filename() . substr($image_name, strpos($image_name, '.'));
$orgImg=DATA_DIR . "/home/".$filename;
$thumb_url = $image->make_thumb($tempname,$articel_width,$articel_height,$path.DATA_DIR . "/home/"); 

$sql="SELECT * from ".$GLOBALS['ecs']->table('home_img')." where id=".$item_id;

$image=$GLOBALS['db']->getRow($sql);

    if ($image['thump_o'] != '' && is_file('../' . $image['thump_o']))
    {
        @unlink('../' . $image['thump_o']);
    }
    if ($image['thump_t'] != '' && is_file('../' . $image['thump_t']))
    {
        @unlink('../' . $image['thump_t']);
    }
//原图保存

if (!move_upload_file($tempname,$path.$orgImg))
    {
        return false;
    }


 $sql = "UPDATE ".$GLOBALS['ecs']->table('home_img')."SET thump_o= '".$orgImg."',thump_t='$thumb_url' where id=".$item_id;

 $state=$GLOBALS['db']->query($sql);
 
 if($state){
 
  return true;
 }else{
   return false;
  }
 

 




}




?>