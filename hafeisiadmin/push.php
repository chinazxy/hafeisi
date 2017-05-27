<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
require_once(ROOT_PATH . 'includes/cls_image.php');
require_once(ROOT_PATH . "includes/fckeditor/fckeditor.php");

if ($_REQUEST['act'] == 'list')
{

       $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 0;

    $smarty->assign('ur_here',    '主推管理');
    $smarty->assign('action_link', array('text' =>'主推添加', 'href' => 'push.php?act=add'));
    $smarty->assign('pid',         $pid);
     $smarty->assign('full_page',  1);
	 
	 
	    $ads_list = get_pushlist();

    $smarty->assign('ads_list',     $ads_list['ads']);
    $smarty->assign('filter',       $ads_list['filter']);
    $smarty->assign('record_count', $ads_list['record_count']);
    $smarty->assign('page_count',   $ads_list['page_count']);

    $sort_flag  = sort_flag($ads_list['filter']);
    $smarty->assign($sort_flag['tag'], $sort_flag['img']);

    assign_query_info();
	 
    $smarty->display('pushlist.htm');
}elseif($_REQUEST['act'] == 'add'){

    $smarty->assign('action',        'add');
	   $smarty->assign('form_act', 'insert');
 $smarty->display('push.htm');
}elseif ($_REQUEST['act'] == 'insert')
{


	$title=isset($_POST['title'])?trim($_POST['title']):"";
	$entitle=isset($_POST['entitle'])?trim($_POST['entitle']):"";
	$descript=isset($_POST['descript'])?trim($_POST['descript']):"";
	$endescript=isset($_POST['endescript'])?trim($_POST['endescript']):"";
    $url=isset($_POST['url'])?trim($_POST['url']):"";
	
	 $cat_name=$_POST['cat_name'];
     $cat_enname=$_POST['cat_enname'];
	 $link=$_POST['link'];
	 $resorts=$_POST['resort'];
	 
    $resort=isset($_POST['resort'])?(int)$_POST['resort']:1;
	 $isshow=isset($_POST['isshow'])?(int)$_POST['isshow']:1;
    
	
    handle_gallery_image($_FILES['file'],$_FILES['img2'],$_FILES['img3'],$title,$entitle,$descript,$endescript,$url,$resort,$isshow,$cat_name,$cat_enname,$link,$resorts);
   
    /* 记录管理员操作 */
    admin_log($_POST['ad_name'], 'add', 'push');

    clear_cache_files(); // 清除缓存文件

    /* 提示信息 */

    $link[1]['text'] = "返回列表";
    $link[1]['href'] = 'push.php?act=list';

    $link[2]['text'] = "继续添加";
    $link[2]['href'] = 'push.php?act=add';
    sys_msg($_LANG['add'] . "&nbsp;" .$_POST['title'] . "&nbsp;" .'添加成功',0, $link);

}elseif ($_REQUEST['act'] == 'edit')
{



    $sql = "SELECT * FROM " .$ecs->table('push'). " WHERE id='".intval($_REQUEST['id'])."'";
    $ads_arr = $db->getRow($sql);
	
	
	$navsql="SELECT * FROM " .$ecs->table('nnav'). " WHERE relative_id='".intval($_REQUEST['id'])."' order by resort asc";
    $navlist=$db->getAll($navsql);
    $ads_arr['title'] = htmlspecialchars($ads_arr['title']);


    $smarty->assign('ur_here',       "主推修改");
    $smarty->assign('action_link',   array('href' => 'push.php?act=list', 'text' =>'主推列表'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
	   $smarty->assign('navlist',           $navlist);
    $smarty->assign('ads',           $ads_arr);

    assign_query_info();
    $smarty->display('push.htm');
}
elseif ($_REQUEST['act'] == 'update')
{
  

    /* 初始化变量 */
    $id   = !empty($_POST['id'])   ? intval($_POST['id'])   : 0;
  	$title=isset($_POST['title'])?trim($_POST['title']):"";
	$entitle=isset($_POST['entitle'])?trim($_POST['entitle']):"";
	$descript=isset($_POST['descript'])?trim($_POST['descript']):"";
	$endescript=isset($_POST['endescript'])?trim($_POST['endescript']):"";
    $url=isset($_POST['url'])?trim($_POST['url']):"";
    $resort=isset($_POST['resort'])?(int)$_POST['resort']:1;
	$isshow=isset($_POST['isshow'])?(int)$_POST['isshow']:1;
	
	 $cat_name=$_POST['cat_name'];
     $cat_enname=$_POST['cat_enname'];
	 $link=$_POST['link'];
	 $resorts=$_POST['resort'];
	 
	  $eids=$_POST['e_ids'];
	 	 $ecat_name=$_POST['e_cat_name'];
     $ecat_enname=$_POST['e_cat_enname'];
	 $elink=$_POST['e_link'];
	 $eresorts=$_POST['e_resort'];
    
    handle_update_gallery_image($id,$_FILES['file'],$_FILES['img2'],$_FILES['img3'],$title,$entitle,$descript,$endescript,$url,$resort,$isshow,$cat_name,$cat_enname,$link,$resorts,$eids,$ecat_name,$ecat_enname,$elink,$eresorts);
   /* 记录管理员操作 */
   admin_log($_POST['ad_name'], 'edit', 'push');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回列表', 'href' => 'push.php?act=list');
   sys_msg($_LANG['edit'] .' '.$_POST['title'].' '. '修改成功!', 0, $href);

}else if($_REQUEST['act'] =="deleteimg"){

$id=$_GET['id'];

$sql="SELECT * from ".$ecs->table('push')." where id=".$id;

$image=$db->getRow($sql);

    if ($image['images'] != '' && is_file('../' . $image['images']))
    {
        @unlink('../' . $image['images']);
    }
    if ($image['thump_o'] != '' && is_file('../' . $image['thump_o']))
    {
        @unlink('../' . $image['thump_o']);
    }
	
$sql="Update  ".$ecs->table('push')." SET images='',thump_o='' where id=".$id;
$state=$db->query($sql);

if($state){

 $links[0]['text']    ="返回主推管理页面";
  $links[0]['href']    = 'push.php?act=edit&id='.$id;
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回主推管理页面";
  $links[0]['href']    = 'push.php?act=edit&id='.$id;
  sys_msg("图片删除失败", 0, $links);
  }

}else if($_REQUEST['act'] =="deleteimg2"){

$id=$_GET['id'];

$sql="SELECT * from ".$ecs->table('push')." where id=".$id;

$image=$db->getRow($sql);

    if ($image['thump_s'] != '' && is_file('../' . $image['thump_s']))
    {
        @unlink('../' . $image['thump_s']);
    }

	
$sql="Update  ".$ecs->table('push')." SET thump_s='' where id=".$id;

$state=$db->query($sql);

if($state){

 $links[0]['text']    ="返回主推管理页面";
  $links[0]['href']    = 'push.php?act=edit&id='.$id;
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回主推管理页面";
  $links[0]['href']    = 'push.php?act=edit&id='.$id;
  sys_msg("图片删除失败", 0, $links);
  }

}else if($_REQUEST['act']=="deleteitem"){
	
  require_once(ROOT_PATH . 'includes/cls_json.php');
 $id=$_POST['id'];
 $rs = array('err' => 0,"id"=>$id);
 
 $sql="delete from ".$ecs->table('nnav')."  where id=".$id;
 $state=$db->query($sql);
	
if($state){
$rs['err']=1;

 }else{
 $rs['err']=0;

  }
    $json  = new JSON;
 die($json->encode($rs));	
}else if($_REQUEST['act'] =="deleteimg3"){

$id=$_GET['id'];

$sql="SELECT * from ".$ecs->table('push')." where id=".$id;

$image=$db->getRow($sql);

    if ($image['thump_sx'] != '' && is_file('../' . $image['thump_sx']))
    {
        @unlink('../' . $image['thump_sx']);
    }

	
$sql="Update  ".$ecs->table('push')." SET thump_sx='' where id=".$id;

$state=$db->query($sql);

if($state){

 $links[0]['text']    ="返回主推管理页面";
  $links[0]['href']    = 'push.php?act=edit&id='.$id;
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回主推管理页面";
  $links[0]['href']    = 'push.php?act=edit&id='.$id;
  sys_msg("图片删除失败", 0, $links);
  }

}elseif ($_REQUEST['act'] == 'remove')
{
  
    $id = intval($_REQUEST['id']);
	
	$sql="SELECT * from ".$ecs->table('push')." where id=".$id;
  
$image=$db->getRow($sql);

    if ($image['images'] != '' && is_file('../' . $image['images']))
    {
        @unlink('../' . $image['images']);
    }
    if ($image['thump_o'] != '' && is_file('../' . $image['thump_o']))
    {
        @unlink('../' . $image['thump_o']);
    }
	
   
    $sql="DELETE  FROM  ".$ecs->table('push'). " where id=$id";

    $state=$db->query($sql);
	
	if($state!==false){
		$sql="DELETE  FROM  ".$ecs->table('nnav'). " where relative_id=$id";
       $state=$db->query($sql);

	}
	

  $url = 'push.php?act=query&' . str_replace('act=remove', '', $_SERVER['QUERY_STRING']);

    ecs_header("Location: $url\n");
}elseif ($_REQUEST['act'] == 'query')
{
    $ads_list = get_pushlist();

    $smarty->assign('ads_list',     $ads_list['ads']);
    $smarty->assign('filter',       $ads_list['filter']);
    $smarty->assign('record_count', $ads_list['record_count']);
    $smarty->assign('page_count',   $ads_list['page_count']);

    $sort_flag  = sort_flag($ads_list['filter']);
    $smarty->assign($sort_flag['tag'], $sort_flag['img']);

    make_json_result($smarty->fetch('pushlist.htm'), '',
        array('filter' => $ads_list['filter'], 'page_count' => $ads_list['page_count']));
}


function get_pushlist()
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
    $sql = 'SELECT COUNT(*) FROM ' .$GLOBALS['ecs']->table('push'). ' AS ad ' . $where;
    $filter['record_count'] = $GLOBALS['db']->getOne($sql);

    $filter = page_and_size($filter);
	


    /* 获得广告数据 */
    $arr = array();
    $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('push'). 'AS ad ' .
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

function handle_gallery_image($image_files,$image_fontfile,$image3,$image_title,$image_entitle,$image_des,$image_endes,$image_url,$image_sort,$isshow,$cat_name,$cat_enname,$link,$resorts)

{ 

$show=$isshow;
$path= ROOT_PATH;
$image = new cls_image();
$imgtitle=$image_title;
$entitle=$image_entitle;
$descript=$image_des;
$endescript=$image_endes;
$url=$image_url;
$imgresort=$image_sort;
$catname=$cat_name;
$cat_enname=$cat_enname;
$link=$link;
$resorts=$resorts;

if($image_files['error']==0){
$filename =$image->random_filename() . substr($image_files['name'], strpos($image_files['name'], '.'));

$thumb_url = $image->make_thumb($image_files['tmp_name'],100,50,$path.DATA_DIR . "/push/");  
$orgImg=DATA_DIR . "/push/".$filename;

$thumb_url = DATA_DIR . "/push/".is_string($thumb_url) ? $thumb_url : '';
//原图保存
if (!move_upload_file($image_files['tmp_name'],$path.$orgImg))
    {
        return false;
    }
}else{
$thumb_url="";
$orgImg="";
}





if($image_fontfile['error']==0){
$filename =$image->random_filename() . substr($image_fontfile['name'], strpos($image_fontfile['name'], '.'));
$orgImg2=DATA_DIR . "/pushad/".$filename;
if (!move_upload_file($image_fontfile['tmp_name'],$path.$orgImg2))
    {
	     $links[0]['text']    ="返回主推管理页面";
        $links[0]['href']    = 'push.php?act=edit&id='.$id;
        sys_msg("图片成功", 0, $links);
    }
}else{
$orgImg2="";
}




if($image3['error']==0){
$filename =$image->random_filename() . substr($image3['name'], strpos($image3['name'], '.'));

$orgImg3=DATA_DIR . "/pushad/".$filename;
if (!move_upload_file($image3['tmp_name'],$path.$orgImg3))
    {
        return false;
    }
}else{
$orgImg3="";
}

 $vi_url1=isset($_POST['vi_url1'])?trim($_POST['vi_url1']):"";
 $vi_url2=isset($_POST['vi_url2'])?trim($_POST['vi_url2']):"";
 $vi_url3=isset($_POST['vi_url3'])?trim($_POST['vi_url3']):"";

 $model=isset($_POST['model'])?(int)$_POST['model']:0;


$addtime=time();
$sql = "INSERT INTO ".$GLOBALS['ecs']->table('push')."(title,entitle,descript,endescript,url,images,resort,addtime,isshow,thump_o,thump_s,thump_sx,model,vi_url1,vi_url2,vi_url3) ".
            "VALUES ('$imgtitle','$entitle','$descript','$endescript','$url','$orgImg','$imgresort','$addtime','$show','$thumb_url','$orgImg2','$orgImg3','$model','$vi_url1','$vi_url2','$vi_url3')";
	
    $state=$GLOBALS['db']->query($sql);
	$ids=$GLOBALS['db']->insert_id();
	
	if($state!==false){
		
		for($i=0;$i<count($catname);$i++){
			if(!empty($catname[$i])){
			$sql = "INSERT INTO ".$GLOBALS['ecs']->table('nnav')."(id,cat_name,cat_enname,link,resort,relative_id) ".
            "VALUES (NULL,'".$catname[$i]."','".$cat_enname[$i]."','".$link[$i]."','".$resorts[$i]."','".$ids."')";
	       $GLOBALS['db']->query($sql);
			}
			
		}
		
	}






}


function handle_update_gallery_image($ids,$image_files,$image2,$image3,$image_title,$image_entitle,$image_des,$image_endes,$image_url,$image_sort,$isshow,$cat_name,$cat_enname,$link,$resorts,$eids,$ecat_name,$ecat_enname,$elink,$eresorts)

{ 

$show=$isshow;
$path= ROOT_PATH;
$image = new cls_image();
$imgtitle=$image_title;
$entitle=$image_entitle;
$descript=$image_des;
$endescript=$image_endes;
$url=$image_url;
$imgresort=$image_sort;
$addtime=time();
$id=$ids;
$img2="";
$img3="";

$catname=$cat_name;
$cat_enname=$cat_enname;
$link=$link;
$resorts=$resorts;

$eids=$eids;
$ecatname=$ecat_name;
$ecat_enname=$ecat_enname;
$elink=$elink;
$eresorts=$eresorts;


if($image_files['error']==0){
$filename =$image->random_filename() . substr($image_files['name'], strpos($image_files['name'], '.'));

$thumb_url = $image->make_thumb($image_files['tmp_name'],100,50,$path.DATA_DIR . "/push/");  
$orgImg=DATA_DIR . "/push/".$filename;

$thumb_url = DATA_DIR . "/push/".is_string($thumb_url) ? $thumb_url : '';
//原图保存
if (!move_upload_file($image_files['tmp_name'],$path.$orgImg))
    {
   
		return false;
    }
	
  
}else{
$thumb_url =$_POST['thump_img'];
$orgImg=$_POST['org_img'];
}



if($image2['error']==0){
$filename =$image->random_filename() . substr($image2['name'], strpos($image2['name'], '.'));
$img2=DATA_DIR . "/push/".$filename;
//原图保存
if (!move_upload_file($image2['tmp_name'],$path.$img2))
    {
   
		return false;
    }
	
  
}else{
$img2 =$_POST['img2'];

}


if($image3['error']==0){
$filename =$image->random_filename() . substr($image3['name'], strpos($image3['name'], '.'));
$img3=DATA_DIR . "/push/".$filename;
//原图保存
if (!move_upload_file($image3['tmp_name'],$path.$img3))
    {

		return false;
    }
	
  
}else{
$img3 =$_POST['img3'];

}

$vi_url1=isset($_POST['vi_url1'])?trim($_POST['vi_url1']):"";
 $vi_url2=isset($_POST['vi_url2'])?trim($_POST['vi_url2']):"";
 $vi_url3=isset($_POST['vi_url3'])?trim($_POST['vi_url3']):"";
 $model=isset($_POST['model'])?(int)$_POST['model']:0;

  $sql = "UPDATE " .$GLOBALS['ecs']->table('push'). " SET ".
            "title = '$imgtitle', ".
			"entitle = '$entitle', ".
            "descript     = '$descript', ".
			"endescript     = '$endescript', ".
            "url     = '$url', ".
            "resort  = '$imgresort', ".
            "isshow    = '$isshow', ".
			   "images    = '$orgImg', ".
			   	   "thump_o    = '$thumb_url' ,".
					   	   "thump_s    = '$img2', ".
						   "vi_url1    = '$vi_url1', ".
			   "vi_url2    = '$vi_url2', ".
			   	   "vi_url3    = '$vi_url3' ,".
					   	   "model    = '$model', ".
	   	   "thump_sx    = '$img3' ".						   
            "WHERE id = '$id'";	




    $state=$GLOBALS['db']->query($sql);
	
	if($state!==false){
		
		for($i=0;$i<count($catname);$i++){
			if(!empty($catname[$i])){
			$sql = "INSERT INTO ".$GLOBALS['ecs']->table('nnav')."(id,cat_name,cat_enname,link,resort,relative_id) ".
            "VALUES (NULL,'".$catname[$i]."','".$cat_enname[$i]."','".$link[$i]."','".$resorts[$i]."','".$ids."')";
	       $GLOBALS['db']->query($sql);
			}
			
		}
		
		for($t=0;$t<count($eids);$t++){
			
		   $sql = "UPDATE " .$GLOBALS['ecs']->table('nnav'). " SET cat_name='".$ecat_name[$t]."',cat_enname='".$ecat_enname[$t]."',resort='".$eresorts[$t]."', link='".$elink[$t]."' WHERE id = '".$eids[$t]."'";	
			$GLOBALS['db']->query($sql);
		}
		
	}


}
function handle_upload_image($image_files)
{ 
$array=array();


$path= ROOT_PATH;
$image = new cls_image();

if($image_files['error']==0){
$filename =$image->random_filename() . substr($image_files['name'], strpos($image_files['name'], '.'));

$thumb_url = $image->make_thumb($image_files['tmp_name'],100,50,$path.DATA_DIR . "/pinpai/");  
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
function ecs_reup_image($yuantu,$suolue,$image){//图片更新
    $result=array();
   if($_FILES[$yuantu]['name']){//有的话先删除旧图
		
       if ($image[$yuantu] != '' && is_file('../' . $image[$yuantu]))
        {
        @unlink('../' . $image[$yuantu]);
        }
       if ($image[$suolue] != '' && is_file('../' . $image[$suolue]))
       {
        @unlink('../' . $image[$suolue]);
       }
	   $imageinfo=handle_upload_image($_FILES[$yuantu]);//传递新图
	   $result['orgImg']=   $imageinfo['orgImg'];
	   $result['thumb_url']=   $imageinfo['thumb_url'];
	}
	else{//没有的话执行原来sql中的数据插回原表先当与没有更新图片
		
		$result['orgImg']=$image[$yuantu];
	    $result['thumb_url']=$image[$suolue];
	}
	return $result;
}
function removeImages($yuantu,$suolue,$tablename,$id,$image){//删除图片并使数据库内的路径=NULL
     if ($image[$yuantu] != '' && is_file('../' . $image[$yuantu]))
    {
        @unlink('../' . $image[$yuantu]);
    }
    if ($image[$suolue] != '' && is_file('../' . $image[$suolue]))
    {
        @unlink('../' . $image[$suolue]);
    }
	$sql="Update  ".$GLOBALS['ecs']->table($tablename)." SET {$yuantu}='',{$suolue}='' where id=".$id;

    $state=$GLOBALS['db']->query($sql);
	
	return $state;
}
function removeALLimage($yuantu,$suolue,$image){//纯删除图片
     if ($image[$yuantu] != '' && is_file('../' . $image[$yuantu]))
    {
        @unlink('../' . $image[$yuantu]);
    }
    if ($image[$suolue] != '' && is_file('../' . $image[$suolue]))
    {
        @unlink('../' . $image[$suolue]);
    }
	return true;
}

?>