<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
require_once(ROOT_PATH . 'includes/cls_image.php');
require_once(ROOT_PATH . "includes/fckeditor/fckeditor.php");

if($_REQUEST['act'] == 'add'){

   if( $_GET['id']>0){
    $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('dingzhi_size'). 'AS ad ' .
            'where type_id='.$_GET['id'].' GROUP BY ad.id desc,ad.resort asc ';
	    $res=$GLOBALS['db']->getAll($sql);
	   

			}
			
	 $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('dingzhi_size_info'). 'AS a ' .
            'where a.type_id='.$_GET['id'].'';
	$minfo=$db->getRow($sql);

			  $smarty->assign('minfo',        $minfo);	
	    $smarty->assign('res',        $res);		
    $smarty->assign('type_c',        $_GET['type_c']);
	  $smarty->assign('ids',        $_GET['id']);
    $smarty->assign('action',        'add');
	   $smarty->assign('form_act', 'insert');
 $smarty->display('size.htm');
}elseif ($_REQUEST['act'] == 'insert')
{
$image = new cls_image();
$path= ROOT_PATH;
$type_c=isset($_POST['type_c'])?(int)$_POST['type_c']:0;
$ids=isset($_POST['ids'])?(int)$_POST['ids']:0;
	$title=isset($_POST['title'])?trim($_POST['title']):"";
    $en_title=isset($_POST['en_title'])?trim($_POST['en_title']):"";
    $descript=isset($_POST['descript'])?trim($_POST['descript']):"";
	$en_descript=isset($_POST['en_descript'])?trim($_POST['en_descript']):"";
	 $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('dingzhi_size_info'). 'AS a ' .
            'where a.type_id='.$_POST['ids'].'';
	   $minfo=$db->getRow($sql);
	   

		  	    if($_FILES['c_image']['error']!=4){
				
	
			
    if ($minfo['images'] != '' && is_file('../' . $minfo['images']))
    {
        @unlink('../' . $minfo['images']);
    }
	$filename =$image->random_filename() . substr($_FILES['c_image']['name'], strpos($_FILES['c_image']['name'], '.'));
    $color_img=DATA_DIR . "/dingzhi_size/".$filename;
   if (!move_upload_file($_FILES['c_image']['tmp_name'],$path.$color_img))
    {
        return false;
    }

		
		}else{
		$color_img=$_POST['c_image_hide'];
		
		}
	   if($minfo['id']>0){
	   
	   $sql="UPDATE " .$GLOBALS['ecs']->table('dingzhi_size_info'). " SET 
`title` = '$title',
`en_title` = '$en_title',
`descript` = '$descript',
`en_descript` = '$en_descript',
`images` = '$color_img' WHERE `id` =".$minfo['id'];
	   
	   }else{
	   $sql = "INSERT INTO ".$GLOBALS['ecs']->table('dingzhi_size_info')."(title,en_title,descript,en_descript,images,type_id) ".
            "VALUES ('$title','$en_title','$descript','$en_descript','$color_img','$ids')";
	   
	   }

	
    $GLOBALS['db']->query($sql);
    /* 记录管理员操作 */
    admin_log($_POST['ad_name'], 'add', 'dingzhi');

    clear_cache_files(); // 清除缓存文件

    /* 提示信息 */

    $link[1]['text'] = "返回";
    $link[1]['href'] = 'size.php?act=add&id='.$ids;

    sys_msg($_LANG['add'] . "&nbsp;" .$_POST['title'] . "&nbsp;" .'添加成功',0, $link);

}elseif ($_REQUEST['act'] == 'edit')
{



    $sql = "SELECT * FROM " .$ecs->table('dingzhi_category'). " WHERE id='".intval($_REQUEST['cid'])."'";
    $ads_arr = $db->getRow($sql);
   if( $_GET['id']>0){
    $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('dingzhi_category'). 'AS ad ' .
            'where type_id='.$_GET['id'].' GROUP BY ad.id desc,ad.resort asc ';
	$res=$GLOBALS['db']->getAll($sql);
			}
			
    $ads_arr['title'] = htmlspecialchars($ads_arr['title']);

	    $smarty->assign('res',        $res);		
    $smarty->assign('type_c',        $_GET['type_c']);
	  $smarty->assign('ids',        $_GET['id']);
	  	  $smarty->assign('cid',        $_GET['cid']);
    $smarty->assign('ur_here',       "修改");
    $smarty->assign('action_link',   array('href' => 'jk.php?act=add&id='.$_GET['id'].'type_c='. $_GET['type_c'].'', 'text' =>'返回'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
    $smarty->assign('ads',           $ads_arr);

    assign_query_info();
    $smarty->display('jk.htm');
}
elseif ($_REQUEST['act'] == 'update')
{
 
   $id=$_REQUEST['ids'];
  $type_c=$_REQUEST['type_c'];
  
  
    /* 初始化变量 */
 	$cat_name=isset($_POST['cat_name'])?trim($_POST['cat_name']):"";
    $cat_enname=isset($_POST['cat_enname'])?trim($_POST['cat_enname']):"";
    $resort=isset($_POST['resort'])?(int)$_POST['resort']:1;
        $cid=isset($_POST['cid'])?(int)$_POST['cid']:1;
	
    $sql = "UPDATE " .$GLOBALS['ecs']->table('dingzhi_category'). " SET ".
            "cat_name = '$cat_name', ".     
            "cat_enname     = '$cat_enname', ".
            "resort  = '$resort'".
				 
            "WHERE id = '$cid'";	





    $GLOBALS['db']->query($sql);
   /* 记录管理员操作 */
   admin_log($_POST['ad_name'], 'edit', 'jk');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回', 'href' => 'jk.php?act=add&id='.$id.'&type_c='. $type_c.'');
   sys_msg($_LANG['edit'] .' '.$_POST['cat_name'].' '. '修改成功!', 0, $href);

}else if($_REQUEST['act'] =="deleteitem"){



require_once(ROOT_PATH . 'includes/cls_json.php');

$id=$_POST['id'];


 $rs = array('err' => 0,"id"=>$id);
$sql="SELECT * from ".$ecs->table('dingzhi_attr')." where id=".$id;

$image=$db->getRow($sql);


	
    if ($image['thumb'] != '' && is_file('../' . $image['thumb']))
    {
        @unlink('../' . $image['thumb']);
    }
    if ($image['images'] != '' && is_file('../' . $image['images']))
    {
        @unlink('../' . $image['images']);
    }


$sql="delete from ".$ecs->table('dingzhi_size')."  where id=".$id;

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
   
    $rs = array('err' => 1,"id"=>$cid,"c_type"=>$ctype);
   }else{
       $rs = array('err' => 0,"id"=>$cid,"c_type"=>$ctype);
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
 $title=$_POST['att_title'];
 $entitle=$_POST['att_entitle'];
 $resort=$_POST['attr_resort'];
  $att_size=$_POST['att_size'];

   $default_show=$_POST['checkboxvalue'];
 $ids=$_POST['ids'];
 
 $addtime=time();
 

 
 if(!empty($att_size)){
 
   for($i=0;$i<count($att_size);$i++){
   
   
      if($att_size[$i]!=""){
	  
	  	    if($_FILES['color_img']['error'][$i]!=4){
		
	$filename =$image->random_filename() . substr($_FILES['color_img']['name'][$i], strpos($_FILES['color_img']['name'][$i], '.'));
     $color_img_t = $image->make_thumb($_FILES['color_img']['tmp_name'][$i],135,100,$path.DATA_DIR . "/dingzhi_attr/");
	
    $color_img_t = DATA_DIR . "/dingzhi_size/".is_string($color_img_t) ? $color_img_t : '';

    $color_img=DATA_DIR . "/dingzhi_size/".$filename;
   if (!move_upload_file($_FILES['color_img']['tmp_name'][$i],$path.$color_img))
    {
        return false;
    }

		
		}

		
		
		$sql="INSERT INTO ".$ecs->table('dingzhi_size'). " (`id`, `title`, `en_title`, `resort`, `size`, `addtime`, `type_id`,`images`,`thumb`,`default_show`) VALUES (NULL, '".$title[$i]."', '".$entitle[$i]."', '".$resort[$i]."', '".$att_size[$i]."', '".$addtime."','".$ids."','".$color_img."','".$color_img_t."','".$default_show[$i]."')";
	    $state=$db->query($sql);
	  }
   
   
   }
 
 
 
 }
 
 $eid=$_POST['jd_id'];
 $etitle=$_POST['att_title_e'];
 $e_entitle=$_POST['att_entitle_e'];
 $attr_resort_e=$_POST['attr_resort_e'];
 $att_size_e=$_POST['att_size_e'];
 	 $jd_hide_color=$_POST['jd_hide_color'];
	 	 $jd_hide_color_t=$_POST['jd_hide_color_t']; 
	 
 $checkboxvalue_edit=$_POST['checkboxvalue_edit'];
	
	if(!empty($eid)){
	
	   for($t=0;$t<count($eid);$t++){
	   
	   
	   	      if($_FILES['color_img_e']['error'][$t]!=4){
		  
		  $itemsql="SELECT * FROM ".$ecs->table('dingzhi_size'). " WHERE id=".$eid[$t];
		  $imageinfo=$db->getRow($itemsql);
		 
		   if ($imageinfo['images'] != '' && is_file('../' . $imageinfo['images']))
    {
        @unlink('../' . $imageinfo['images']);
    }

			   if ($imageinfo['thumb'] != '' && is_file('../' . $imageinfo['thumb']))
    {
        @unlink('../' . $imageinfo['thumb']);
    }

	
   
		
	$filename =$image->random_filename() . substr($_FILES['color_img_e']['name'][$t], strpos($_FILES['color_img_e']['name'][$t], '.'));
	     $color_img_t_e = $image->make_thumb($_FILES['color_img_e']['tmp_name'][$t],135,100,$path.DATA_DIR . "/dingzhi_size/");  
    $color_img_t_e= DATA_DIR . "/dingzhi_size/".is_string($color_img_t_e) ? $color_img_t_e : '';
    $img_color_e=DATA_DIR . "/dingzhi_size/".$filename;
   if (!move_upload_file($_FILES['color_img_e']['tmp_name'][$t],$path.$img_color_e))
    {
        return false;
    }		
		}else{
		
		$img_color_e =$jd_hide_color[$t];  
       $color_img_t_e=$jd_hide_color_t[$t];
		
		}
	   
		
		
		$sql="UPDATE ".$ecs->table('dingzhi_size'). " SET `title` = '".$etitle[$t]."',
`en_title` = '".$e_entitle[$t]."',
`resort` = '".$attr_resort_e[$t]."',
`size` = '".$att_size_e[$t]."',
`images` = '".$img_color_e."',
`default_show` = '".$checkboxvalue_edit[$t]."',
`thumb` = '".$color_img_t_e."' WHERE `id` =".$eid[$t];
  $state=$db->query($sql);
	   
	   }
	
	}
	if($state!==false){
	
	   admin_log($_POST['ad_name'], 'edit', 'jk');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回', 'href' => 'size.php?act=add&id='.$ids);
   sys_msg($_LANG['edit'] .' '.$_POST['en_title'].' '. '保存成功!', 0, $href);
	
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

$thumb_url = $image->make_thumb($image_files['tmp_name'],100,50,$path.DATA_DIR . "/dingzhi/");  
$orgImg=DATA_DIR . "/dingzhi/".$filename;

$thumb_url = DATA_DIR . "/dingzhi/".is_string($thumb_url) ? $thumb_url : '';
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

?>