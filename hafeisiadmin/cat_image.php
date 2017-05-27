<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
require_once(ROOT_PATH . 'includes/cls_image.php');
require_once(ROOT_PATH . "includes/fckeditor/fckeditor.php");
if(empty($_REQUEST['act'])){
	
$_REQUEST['act']="add";
}
if($_REQUEST['act'] == 'add'){

     	    $sqls = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('cat_images'). 'AS ad ' .
            'where  ad.cat_id='.$_GET['id'].' order by ad.resort asc ';
	   $attrlist=$db->getAll($sqls);
	   $glsql="SELECT * FROM " .$GLOBALS['ecs']->table('cat_addtype'). " WHERE cat_id=".$_GET['id']." and type=".$_GET['type'];
	   $glinfo=$GLOBALS['db']->getRow($glsql);
	  // var_dump($attrlist);
	  // exit;
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
 $smarty->display('cat_image.htm');
}elseif ($_REQUEST['act'] == 'insert')
{

$type=isset($_POST['type'])?(int)$_POST['type']:0;
$id=isset($_POST['id'])?(int)$_POST['id']:0;

	$title=isset($_POST['title'])?trim($_POST['title']):"";
    $entitle=isset($_POST['entitle'])?trim($_POST['entitle']):"";
    $resort=isset($_POST['resort'])?(int)$_POST['resort']:1;
	

	   if(!$_FILES['files']['error'] > 0){
		   
		       $imagearray=handle_upload_image($_FILES['files']);
		      $images=$imagearray['orgImg'];
			  $images_t=$imagearray['thumb_url'];
	   }else{
		     $images=$_POST['images'];
			  $images_t=$_POST['images_t'];
		   
		 
	   }
	  
$sql = "INSERT INTO ".$GLOBALS['ecs']->table('cat_addtype')."(id,title,entitle,type,cat_id,image,images_t) ".
            "VALUES ('NULL','$title','$entitle','$type','$id','$images','$images_t')";
	
    $state=$GLOBALS['db']->query($sql);

    /* 记录管理员操作 */
    admin_log($_POST['ad_name'], 'add', 'dingzhi');

    clear_cache_files(); // 清除缓存文件

    /* 提示信息 */

    $link[1]['text'] = "返回";
    $link[1]['href'] = 'cat_image.php?act=add&id='.$id.'&type='.$type;

    sys_msg($_LANG['add'] . "&nbsp;" .$_POST['title'] . "&nbsp;" .'添加成功',0, $link);

}elseif ($_REQUEST['act'] == 'edit')
{



    $sql = "SELECT * FROM " .$ecs->table('dingzhi_category'). " WHERE id='".intval($_REQUEST['cid'])."' and type_c=".$_GET['type_c'];
    $ads_arr = $db->getRow($sql);
   if( $_GET['id']>0){
    $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('dingzhi_category'). 'AS ad ' .
            'where type_id='.$_GET['id'].' and type_c='.$_GET['type_c'].' and gid='.$_GET['gid'].' GROUP BY ad.id desc,ad.resort asc ';
	$res=$GLOBALS['db']->getAll($sql);
	
	
			}
			if($_GET['gid']>0){
				   $glsql="SELECT * FROM " .$GLOBALS['ecs']->table('dingzhi_jp'). " WHERE id=".$_GET['gid'];
	   $glinfo=$GLOBALS['db']->getRow($glsql);
	     $smarty->assign('glinfo',        $glinfo);	
		 }
    $ads_arr['title'] = htmlspecialchars($ads_arr['title']);

	    $smarty->assign('res',        $res);		
    $smarty->assign('type_c',        $_GET['type_c']);
	  $smarty->assign('ids',        $_GET['id']);
	  	  $smarty->assign('cid',        $_GET['cid']);
		  	  	  $smarty->assign('gid',        $_GET['gid']);
    $smarty->assign('ur_here',       "修改");
    $smarty->assign('action_link',   array('href' => 'jk.php?act=add&id='.$_GET['id'].'type_c='. $_GET['type_c'].'&gid='.$_GET['gid'], 'text' =>'返回'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
    $smarty->assign('ads',           $ads_arr);

    assign_query_info();
    $smarty->display('cat_image.htm');
}
elseif ($_REQUEST['act'] == 'update')
{
 
   $id=$_REQUEST['id'];
  $type=$_REQUEST['type'];

  
    /* 初始化变量 */
 	$title=isset($_POST['title'])?trim($_POST['title']):"";
    $entitle=isset($_POST['entitle'])?trim($_POST['entitle']):"";
    $resort=isset($_POST['resort'])?(int)$_POST['resort']:1;
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
   $href[] = array('text' => '返回', 'href' => 'cat_image.php?act=add&id='.$id.'&type='. $type);
   sys_msg($_LANG['edit'] .' '.$_POST['title'].' '. '修改成功!', 0, $href);

}else if($_REQUEST['act'] =="deleteitem"){



require_once(ROOT_PATH . 'includes/cls_json.php');

$id=$_POST['id'];


 $rs = array('err' => 0,"id"=>$id);
$sql="SELECT * from ".$ecs->table('cat_images')." where id=".$id;

$image=$db->getRow($sql);

 if ($image['images'] != '' && is_file('../' . $image['images']))
    {
        @unlink('../' . $image['images']);
    }
    if ($image['images_t'] != '' && is_file('../' . $image['images_t']))
    {
        @unlink('../' . $image['images_t']);
    }
	


$sql="delete from ".$ecs->table('cat_images')."  where id=".$id;

$state=$db->query($sql);
$state=true;
if($state){



$rs['err']=1;

 }else{
 $rs['err']=0;

  }
    $json  = new JSON;
 die($json->encode($rs));
}elseif ($_REQUEST['act'] == 'remove')
{


  require_once(ROOT_PATH . 'includes/cls_json.php');
    $id = intval($_REQUEST['id']);
	$cid = intval($_REQUEST['ids']);
    $ctype = intval($_REQUEST['ctype']);
   $gid = intval($_REQUEST['gid']);
   $sql="SELECT * FROM ".$ecs->table('dingzhi_attr'). " where type_id=".$id;
   $attrlist=$db->getAll($sql);

   foreach($attrlist as $k=>$val){
   
    if ($val['img_c'] != '' && is_file('../' . $val['img_c']))
    {
        @unlink('../' . $val['img_c']);
    }
    if ($val['img_c_t'] != '' && is_file('../' . $val['img_c_t']))
    {
        @unlink('../' . $val['img_c_t']);
    }
	
	
    if ($val['img_l'] != '' && is_file('../' . $val['img_l']))
    {
        @unlink('../' . $val['img_l']);
    }
    if ($val['img_l_t'] != '' && is_file('../' . $val['img_l_t']))
    {
        @unlink('../' . $val['img_l_t']);
    }
	
	
	 if ($val['img_r'] != '' && is_file('../' . $val['img_r']))
    {
        @unlink('../' . $val['img_r']);
    }
    if ($val['img_r_t'] != '' && is_file('../' . $val['img_r_t']))
    {
        @unlink('../' . $val['img_r_t']);
    }
	
	
   if ($val['img_b'] != '' && is_file('../' . $val['img_b']))
    {
        @unlink('../' . $val['img_b']);
    }
    if ($val['img_b_t'] != '' && is_file('../' . $val['img_b_t']))
    {
        @unlink('../' . $val['img_b_t']);
    }

      $sqls="DELETE  FROM  ".$ecs->table('dingzhi_attr'). " where id=".$val['id'];

	  $state=$db->query($sqls);
   
   }


    $sql="DELETE  FROM  ".$ecs->table('dingzhi_category'). " where id=$id";

    $states=$db->query($sql);
	

   if($states!==false){
   
    $rs = array('err' => 1,"id"=>$cid,"c_type"=>$ctype,"gid"=>$gid);
   }else{
       $rs = array('err' => 0,"id"=>$cid,"c_type"=>$ctype,"gid"=>$gid);
   }
   
       $json  = new JSON;
 die($json->encode($rs));
}elseif ($_REQUEST['act'] == 'query')
{
    $ads_list = get_lunbolist();

    $smarty->assign('ads_list',     $ads_list['ads']);
    $smarty->assign('filter',       $ads_list['filter']);
    $smarty->assign('record_count', $ads_list['record_count']);
    $smarty->assign('page_count',   $ads_list['page_count']);

    $sort_flag  = sort_flag($ads_list['filter']);
    $smarty->assign($sort_flag['tag'], $sort_fla['img']);

    make_json_result($smarty->fetch('dingzhilist.htm'), '',
        array('filter' => $ads_list['filter'], 'page_count' => $ads_list['page_count']));
}elseif($_REQUEST['act'] == 'attr_add'){


$image = new cls_image();
$path= ROOT_PATH;
 $id=$_POST['ids'];
  $types=$_POST['types'];
 $resort=$_POST['attr_resort'];
 $hidval=$_POST['hidval'];
 if(!empty($hidval)){
 
   for($i=0;$i<count($hidval);$i++){

		
   if($_FILES['attr_jdl']['error'][$i]!=4){
		
	$filename =$image->random_filename() . substr($_FILES['attr_jdl']['name'][$i], strpos($_FILES['attr_jdl']['name'][$i], '.'));
    $img_l_t = $image->make_thumb($_FILES['attr_jdl']['tmp_name'][$i],53,70,$path.DATA_DIR . "/cat_image/");  
    $img_l=DATA_DIR . "/cat_image/".$filename;
    $img_l_t = DATA_DIR . "/cat_image/".is_string($img_l_t) ? $img_l_t : '';
   if (!move_upload_file($_FILES['attr_jdl']['tmp_name'][$i],$path.$img_l))
    {
        return false;
    }

			$sql="INSERT INTO ".$ecs->table('cat_images'). " (`id`, `resort`,`cat_id`,`images`,`images_t`) 
		VALUES (NULL,'".$resort[$i]."','".$id."','".$img_l."','".$img_l_t."')";
	    $state=$db->query($sql);
		}

	
	  }

 
 
 
 }

 $eid=$_POST['jd_id'];

  $jd_hide_l=$_POST['jd_hide_l'];
   $jd_hide_l_t=$_POST['jd_hide_l_t'];
      $attr_resort_e=$_POST['attr_resort_e'];
 
	if(!empty($eid)){
	
	   for($t=0;$t<count($eid);$t++){
	   

		
		
			      if($_FILES['attr_jdl_e']['error'][$t]!=4){
		  
		  $itemsql="SELECT * FROM ".$ecs->table('cat_images'). " WHERE id=".$eid[$t];
		  $imageinfo=$db->getRow($itemsql);
		 
		   if ($imageinfo['images'] != '' && is_file('../' . $imageinfo['images']))
    {
        @unlink('../' . $imageinfo['images']);
    }
    if ($imageinfo['images_t'] != '' && is_file('../' . $imageinfo['images_t']))
    {
        @unlink('../' . $imageinfo['images_t']);
    }
	
	
  
		
	$filename =$image->random_filename() . substr($_FILES['attr_jdl_e']['name'][$t], strpos($_FILES['attr_jdl_e']['name'][$t], '.'));
    $img_l_t_e = $image->make_thumb($_FILES['attr_jdl_e']['tmp_name'][$t],53,70,$path.DATA_DIR . "/cat_image/");  
    $img_l_e=DATA_DIR . "/cat_image/".$filename;
    $img_l_t_e = DATA_DIR . "/cat_image/".is_string($img_l_t_e) ? $img_l_t_e : '';
   if (!move_upload_file($_FILES['attr_jdl_e']['tmp_name'][$t],$path.$img_l_e))
    {
        return false;
    }		
		}else{
		
		$img_l_t_e =$jd_hide_l_t[$t];  
        $img_l_e=$jd_hide_l[$t]; 
		
		
		}
		

		
		$sql="UPDATE ".$ecs->table('cat_images'). " SET 
		`images` = '".$img_l_e."',
`resort` = '".$attr_resort_e[$t]."',

`images_t` = '".$img_l_t_e."' WHERE `id` =".$eid[$t];

  $state=$db->query($sql);
	   
	   }
	
	}
	if($state!==false){
	
	   admin_log($_POST['ad_name'], 'edit', 'jk');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回', 'href' => 'cat_image.php?act=add&id='.$id.'&type='. $types);
   sys_msg($_LANG['edit'] .' '.$_POST['cat_name'].' '. '保存成功!', 0, $href);
	
	}else{
	
	
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
    $sql = 'SELECT COUNT(*) FROM ' .$GLOBALS['ecs']->table('dingzhi_type'). ' AS ad ' . $where;
    $filter['record_count'] = $GLOBALS['db']->getOne($sql);

    $filter = page_and_size($filter);
	


    /* 获得广告数据 */
    $arr = array();
    $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('dingzhi_type'). 'AS ad ' .
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
$url=$image_url;
$imgresort=$image_sort;

if($image_files['error']==0){
$filename =$image->random_filename() . substr($image_files['name'], strpos($image_files['name'], '.'));

$thumb_url = $image->make_thumb($image_files['tmp_name'],172,97,$path.DATA_DIR . "/cat_addtype/");  
$orgImg=DATA_DIR . "/cat_addtype/".$filename;

$thumb_url = DATA_DIR . "/cat_addtype/".is_string($thumb_url) ? $thumb_url : '';
//原图保存
if (!move_upload_file($image_files['tmp_name'],$path.$orgImg))
    {
        return false;
    }
}

$arr[]='';
$arr['orgImg']=$orgImg;
$arr['thumb_url']=$thumb_url;

return $arr;




}


function handle_update_gallery_image($ids,$image_files,$image_title,$image_enname,$image_sort,$isshow)

{ 
    $image_p='';
	$image_p_m='';

	$sql="SELECT * from ".$GLOBALS['ecs']->table('dingzhi_type')." where id=".$ids;
    $resultzt=$GLOBALS['db']->getRow($sql);
$show=$isshow;
$path= ROOT_PATH;
$image = new cls_image();
$imgtitle=$image_title;
$image_enname=$image_enname;
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

$thumb_url = $image->make_thumb($image_files['tmp_name'],100,50,$path.DATA_DIR . "/dingzhi/");  
$orgImg=DATA_DIR . "/dingzhi/".$filename;

$thumb_url = DATA_DIR . "/dingzhi/".is_string($thumb_url) ? $thumb_url : '';
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


	
    $sql = "UPDATE " .$GLOBALS['ecs']->table('dingzhi_type'). " SET ".
            "cat_name = '$imgtitle', ".     
            "cat_enname     = '$image_enname', ".
            "resort  = '$imgresort', ".
            "isshow    = '$isshow', ".
			   "images    = '$image_p', ".
			   	   "thump_o    = '$image_p_m'".
				 
            "WHERE id = '$id'";	

   /* $sql = "UPDATE " .$GLOBALS['ecs']->table('zhutui'). " SET ".
            "title = '$imgtitle', ".         
            "url     = '$url', ".
            "resort  = '$imgresort', ".
            "isshow    = '$isshow' ".
            "WHERE id = '$id'";*/



    $GLOBALS['db']->query($sql);






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