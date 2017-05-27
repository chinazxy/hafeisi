<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
require_once(ROOT_PATH . 'includes/cls_image.php');
require_once(ROOT_PATH . "includes/fckeditor/fckeditor.php");
if ($_REQUEST['act'] == 'list')
{

       $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 0;

    $smarty->assign('ur_here',    '导航管理');
    $smarty->assign('action_link', array('text' =>'定制导航添加', 'href' => 'dz.php?act=add'));
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
	 
    $smarty->display('dzlist.htm');
}else if($_REQUEST['act'] == 'add'){


       $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('dingzhi_menu'). 'AS ad ' .
            ' GROUP BY ad.id desc,ad.resort asc ';

			

	$res=$GLOBALS['db']->getAll($sql);


	    $smarty->assign('res',        $res);		

	  $smarty->assign('ids',        $_GET['id']);
    $smarty->assign('action',        'add');
	   $smarty->assign('form_act', 'insert');
 $smarty->display('dz.htm');
}elseif ($_REQUEST['act'] == 'insert')
{

$type_c=isset($_POST['type_c'])?(int)$_POST['type_c']:0;
$ids=isset($_POST['ids'])?(int)$_POST['ids']:0;
$gid=isset($_POST['gid'])?(int)$_POST['gid']:0;
	$cat_name=isset($_POST['cat_name'])?trim($_POST['cat_name']):"";
    $cat_enname=isset($_POST['cat_enname'])?trim($_POST['cat_enname']):"";
    $resort=isset($_POST['resort'])?(int)$_POST['resort']:1;

    $arr=handle_gallery_image($_FILES['images']);
	
	$menuset=isset($_POST['menuset'])?(int)$_POST['menuset']:0;
	$image_p=$arr['orgImg'];

$sql = "INSERT INTO ".$GLOBALS['ecs']->table('dingzhi_menu')."(name,enname,resort,images,menu_set) ".
            "VALUES ('$cat_name','$cat_enname','$resort','$image_p','$menuset')";
	
    $GLOBALS['db']->query($sql);
    /* 记录管理员操作 */
    admin_log($_POST['ad_name'], 'add', 'dz');

    clear_cache_files(); // 清除缓存文件

    /* 提示信息 */

    $link[1]['text'] = "返回";
    $link[1]['href'] = 'dz.php?act=add';

    sys_msg($_LANG['add'] . "&nbsp;" .$_POST['title'] . "&nbsp;" .'添加成功',0, $link);

}elseif ($_REQUEST['act'] == 'edit')
{



    $sql = "SELECT * FROM " .$ecs->table('dingzhi_menu'). " WHERE id=".intval($_REQUEST['cid']);
    $ads_arr = $db->getRow($sql);

    $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('dingzhi_menu'). 'AS ad ' .
            ' GROUP BY ad.id desc,ad.resort asc ';
	$res=$GLOBALS['db']->getAll($sql);

    $ads_arr['title'] = htmlspecialchars($ads_arr['title']);

	    $smarty->assign('res',        $res);		

	  $smarty->assign('ids',        $_GET['id']);

    $smarty->assign('ur_here',       "修改");
    $smarty->assign('action_link',   array('href' => 'dz.php?act=add', 'text' =>'返回'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
    $smarty->assign('ads',           $ads_arr);

    assign_query_info();
    $smarty->display('dz.htm');
}
elseif ($_REQUEST['act'] == 'update')
{
 $image = new cls_image();
$path= ROOT_PATH;
   $id=$_REQUEST['cid'];

  
    /* 初始化变量 */
 	$cat_name=isset($_POST['cat_name'])?trim($_POST['cat_name']):"";
    $cat_enname=isset($_POST['cat_enname'])?trim($_POST['cat_enname']):"";
    $resort=isset($_POST['resort'])?(int)$_POST['resort']:1;
	$menuset=isset($_POST['menuset'])?(int)$_POST['menuset']:0;
		
		
	if($_FILES['images']['error']==0){
	
	$sql="SELECT * from ".$ecs->table('dingzhi_menu')." where id=".$id;

    $resultzt=$db->getRow($sql);
	 if ($resultzt['images'] != '' && is_file('../' . $resultzt['images']))
    {
        @unlink('../' . $resultzt['images']);
    }
    if ($resultzt['thump_o'] != '' && is_file('../' . $resultzt['thump_o']))
    {
        @unlink('../' . $resultzt['thump_o']);
    }
$filename =$image->random_filename() . substr($_FILES['images']['name'], strpos($_FILES['images']['name'], '.'));
$orgImg=DATA_DIR . "/dingzhi_menu/".$filename;

//原图保存
if (!move_upload_file($_FILES['images']['tmp_name'],$path.$orgImg))
    {
        return false;
    }
	$image_p=$orgImg;

}else{
	$image_p=$_POST['hide_img'];

}
    $sql = "UPDATE " .$GLOBALS['ecs']->table('dingzhi_menu'). " SET ".
            "name = '$cat_name', ".     
            "enname     = '$cat_enname', ".
			 "images     = '$image_p', ".
			 	 "menu_set     = '$menuset', ".
			 
            "resort  = '$resort'".
				 
            "WHERE id = '$id'";	





    $GLOBALS['db']->query($sql);
   /* 记录管理员操作 */
   admin_log($_POST['ad_name'], 'edit', 'jk');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回', 'href' => 'dz.php?act=add');
   sys_msg($_LANG['edit'] .' '.$_POST['cat_name'].' '. '修改成功!', 0, $href);

}else if($_REQUEST['act'] =="deleteitem"){



require_once(ROOT_PATH . 'includes/cls_json.php');

$id=$_POST['id'];


 $rs = array('err' => 0,"id"=>$id);
$sql="SELECT * from ".$ecs->table('dingzhi_attr')." where id=".$id;

$image=$db->getRow($sql);

 if ($image['img_c'] != '' && is_file('../' . $image['img_c']))
    {
        @unlink('../' . $image['img_c']);
    }
    if ($image['img_c_t'] != '' && is_file('../' . $image['img_c_t']))
    {
        @unlink('../' . $image['img_c_t']);
    }
	
	
    if ($image['img_l'] != '' && is_file('../' . $image['img_l']))
    {
        @unlink('../' . $image['img_l']);
    }
    if ($image['img_l_t'] != '' && is_file('../' . $image['img_l_t']))
    {
        @unlink('../' . $image['img_l_t']);
    }
	
	
	 if ($image['img_r'] != '' && is_file('../' . $image['img_r']))
    {
        @unlink('../' . $image['img_r']);
    }
    if ($image['img_r_t'] != '' && is_file('../' . $image['img_r_t']))
    {
        @unlink('../' . $image['img_r_t']);
    }
	
	
   if ($image['img_b'] != '' && is_file('../' . $image['img_b']))
    {
        @unlink('../' . $image['img_b']);
    }
    if ($image['img_b_t'] != '' && is_file('../' . $image['img_b_t']))
    {
        @unlink('../' . $image['img_b_t']);
    }

$sql="delete from ".$ecs->table('dingzhi_attr')."  where id=".$id;

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

   $sql="SELECT * FROM ".$ecs->table('dingzhi_menu'). " where id=".$id;
   $attrlist=$db->getRow($sql);


    if ($attrlist['images'] != '' && is_file('../' . $attrlist['images']))
    {
        @unlink('../' . $attrlist['images']);
    }



    $sql="DELETE  FROM  ".$ecs->table('dingzhi_menu'). " where id=$id";

    $states=$db->query($sql);
	

   if($states!==false){
   
    $rs = array('err' => 1,"id"=>$id,"c_type"=>$ctype,"gid"=>$gid);
   }else{
       $rs = array('err' => 0,"id"=>$id,"c_type"=>$ctype,"gid"=>$gid);
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

    make_json_result($smarty->fetch('dzlist.htm'), '',
        array('filter' => $ads_list['filter'], 'page_count' => $ads_list['page_count']));
}elseif($_REQUEST['act'] == 'attr_add'){



$image = new cls_image();
$path= ROOT_PATH;
 $title=$_POST['att_title'];
 
 $entitle=$_POST['att_entitle'];
 
 $type=$_POST['jktype'];
 
 $color=$_POST['att_color'];
 
 $resort=$_POST['attr_resort'];
 
 $type_c=$_POST['type_c'];
 
 $ids=$_POST['ids'];
  $gid=$_POST['gid'];
 $addtime=time();
 
 $price=$_POST['att_price'];
 
 $att_des=$_POST['att_des'];
  $att_endes=$_POST['att_endes'];
 if(!empty($type)){
 
   for($i=0;$i<count($type);$i++){
   
   
      if($type[$i]!=0){
	 
	  	    if($_FILES['color_img']['error'][$i]!=4){
		
	$filename =$image->random_filename() . substr($_FILES['color_img']['name'][$i], strpos($_FILES['color_img']['name'][$i], '.'));

    $color_img=DATA_DIR . "/dingzhi_color/".$filename;
   if (!move_upload_file($_FILES['color_img']['tmp_name'][$i],$path.$color_img))
    {
        return false;
    }

		
		}
	  
	  
	    if($_FILES['attr_jdc']['error'][$i]!=4){
		
	$filename =$image->random_filename() . substr($_FILES['attr_jdc']['name'][$i], strpos($_FILES['attr_jdc']['name'][$i], '.'));
    $img_c_t = $image->make_thumb($_FILES['attr_jdc']['tmp_name'][$i],100,50,$path.DATA_DIR . "/dingzhi_attr/");  
    $img_c=DATA_DIR . "/dingzhi_attr/".$filename;
    $img_c_t = DATA_DIR . "/dingzhi_attr/".is_string($img_c_t) ? $img_c_t : '';
   if (!move_upload_file($_FILES['attr_jdc']['tmp_name'][$i],$path.$img_c))
    {
        return false;
    }

		
		}
		
   if($_FILES['attr_jdl']['error'][$i]!=4){
		
	$filename =$image->random_filename() . substr($_FILES['attr_jdl']['name'][$i], strpos($_FILES['attr_jdl']['name'][$i], '.'));
    $img_l_t = $image->make_thumb($_FILES['attr_jdl']['tmp_name'][$i],100,50,$path.DATA_DIR . "/dingzhi_attr/");  
    $img_l=DATA_DIR . "/dingzhi_attr/".$filename;
    $img_l_t = DATA_DIR . "/dingzhi_attr/".is_string($img_l_t) ? $img_l_t : '';
   if (!move_upload_file($_FILES['attr_jdl']['tmp_name'][$i],$path.$img_l))
    {
        return false;
    }

		
		}
		
		   if($_FILES['attr_jdr']['error'][$i]!=4){
		
	$filename =$image->random_filename() . substr($_FILES['attr_jdr']['name'][$i], strpos($_FILES['attr_jdr']['name'][$i], '.'));
    $img_r_t = $image->make_thumb($_FILES['attr_jdr']['tmp_name'][$i],100,50,$path.DATA_DIR . "/dingzhi_attr/");  
    $img_r=DATA_DIR . "/dingzhi_attr/".$filename;
    $img_r_t = DATA_DIR . "/dingzhi_attr/".is_string($img_r_t) ? $img_r_t : '';
   if (!move_upload_file($_FILES['attr_jdr']['tmp_name'][$i],$path.$img_r))
    {
        return false;
    }

		
		}
		
				   if($_FILES['attr_jdb']['error'][$i]!=4){
		
	$filename =$image->random_filename() . substr($_FILES['attr_jdb']['name'][$i], strpos($_FILES['attr_jdb']['name'][$i], '.'));
    $img_b_t = $image->make_thumb($_FILES['attr_jdb']['tmp_name'][$i],100,50,$path.DATA_DIR . "/dingzhi_attr/");  
    $img_b=DATA_DIR . "/dingzhi_attr/".$filename;
    $img_b_t = DATA_DIR . "/dingzhi_attr/".is_string($img_b_t) ? $img_b_t : '';
   if (!move_upload_file($_FILES['attr_jdb']['tmp_name'][$i],$path.$img_b))
    {
        return false;
    }

		
		}
		
		
		$sql="INSERT INTO ".$ecs->table('dingzhi_attr'). " (`id`, `title`, `en_title`, `resort`, `img_c`, `img_l`, `img_r`, `img_b`, `addtime`, `color`, `type_id`, `img_c_t`, `img_l_t`, `img_r_t`, `img_b_t`,`pid`,`price`,`color_img`,`descript`,`en_descript`,`gid`) VALUES (NULL, '".$title[$i]."', '".$entitle[$i]."', '".$resort[$i]."', '".$img_c."', '".$img_l."', '".$img_r."', '".$img_b."', '".$addtime."', '".$color[$i]."', '".$type[$i]."', '".$img_c_t."', '".$img_l_t."', '".$img_r_t."', '".$img_b_t."','".$ids."','".$price[$i]."','".$color_img."','".$att_des[$i]."','".$att_endes[$i]."','".$gid."');";
	    $state=$db->query($sql);
	  }
   
   
   }
 
 
 
 }
 
 $eid=$_POST['jd_id'];
 $etitle=$_POST['att_title_e'];
 $e_entitle=$_POST['att_entitle_e'];
 $e_jktype_e=$_POST['jktype_e'];
 $att_color_e=$_POST['att_color_e'];
 $attr_resort_e=$_POST['attr_resort_e'];
 $attr_price_e=$_POST['att_price_e'];
 
 
  $att_des_e=$_POST['att_des_e'];
 $att_endes_e=$_POST['att_endes_e'];
 
 $jd_hide_c=$_POST['jd_hide_c'];
  $jd_hide_l=$_POST['jd_hide_l'];
  $jd_hide_r=$_POST['jd_hide_r'];
    $jd_hide_b=$_POST['jd_hide_b'];
	 $jd_hide_color=$_POST['jd_hide_color'];
	 $jd_hide_c_t=$_POST['jd_hide_c_t'];
  $jd_hide_l_t=$_POST['jd_hide_l_t'];
  $jd_hide_r_t=$_POST['jd_hide_r_t'];
    $jd_hide_b_t=$_POST['jd_hide_b_t'];
	
	if(!empty($eid)){
	
	   for($t=0;$t<count($eid);$t++){
	   
	   
	   	      if($_FILES['color_img_e']['error'][$t]!=4){
		  
		  $itemsql="SELECT * FROM ".$ecs->table('dingzhi_attr'). " WHERE id=".$eid[$t];
		  $imageinfo=$db->getRow($itemsql);
		 
		   if ($imageinfo['	color_img'] != '' && is_file('../' . $imageinfo['color_img']))
    {
        @unlink('../' . $imageinfo['color_img']);
    }

	
	
   
		
	$filename =$image->random_filename() . substr($_FILES['color_img_e']['name'][$t], strpos($_FILES['color_img_e']['name'][$t], '.'));
    $img_color_e=DATA_DIR . "/dingzhi_color/".$filename;
   if (!move_upload_file($_FILES['color_img_e']['tmp_name'][$t],$path.$img_color_e))
    {
        return false;
    }		
		}else{
		
		$img_color_e =$jd_hide_color[$t];  
       
		
		}
	   
	      if($_FILES['attr_jdc_e']['error'][$t]!=4){
		  
		  $itemsql="SELECT * FROM ".$ecs->table('dingzhi_attr'). " WHERE id=".$eid[$t];
		  $imageinfo=$db->getRow($itemsql);
		 
		   if ($imageinfo['img_c'] != '' && is_file('../' . $imageinfo['img_c']))
    {
        @unlink('../' . $imageinfo['img_c']);
    }
    if ($imageinfo['img_c_t'] != '' && is_file('../' . $imageinfo['img_c_t']))
    {
        @unlink('../' . $imageinfo['img_c_t']);
    }
	
	
   
		
	$filename =$image->random_filename() . substr($_FILES['attr_jdc_e']['name'][$t], strpos($_FILES['attr_jdc_e']['name'][$t], '.'));
    $img_c_t_e = $image->make_thumb($_FILES['attr_jdc_e']['tmp_name'][$t],100,50,$path.DATA_DIR . "/dingzhi_attr/");  
    $img_c_e=DATA_DIR . "/dingzhi_attr/".$filename;
    $img_c_t_e = DATA_DIR . "/dingzhi_attr/".is_string($img_c_t_e) ? $img_c_t_e : '';
   if (!move_upload_file($_FILES['attr_jdc_e']['tmp_name'][$t],$path.$img_c_e))
    {
        return false;
    }		
		}else{
		
		$img_c_t_e =$jd_hide_c_t[$t];  
        $img_c_e=$jd_hide_c[$t]; 
		
		}
		
		
			      if($_FILES['attr_jdl_e']['error'][$t]!=4){
		  
		  $itemsql="SELECT * FROM ".$ecs->table('dingzhi_attr'). " WHERE id=".$eid[$t];
		  $imageinfo=$db->getRow($itemsql);
		 
		   if ($imageinfo['img_l'] != '' && is_file('../' . $imageinfo['img_l']))
    {
        @unlink('../' . $imageinfo['img_l']);
    }
    if ($imageinfo['img_l_t'] != '' && is_file('../' . $imageinfo['img_l_t']))
    {
        @unlink('../' . $imageinfo['img_l_t']);
    }
	
	
   
		
	$filename =$image->random_filename() . substr($_FILES['attr_jdl_e']['name'][$t], strpos($_FILES['attr_jdl_e']['name'][$t], '.'));
    $img_l_t_e = $image->make_thumb($_FILES['attr_jdl_e']['tmp_name'][$t],100,50,$path.DATA_DIR . "/dingzhi_attr/");  
    $img_l_e=DATA_DIR . "/dingzhi_attr/".$filename;
    $img_l_t_e = DATA_DIR . "/dingzhi_attr/".is_string($img_l_t_e) ? $img_l_t_e : '';
   if (!move_upload_file($_FILES['attr_jdl_e']['tmp_name'][$t],$path.$img_l_e))
    {
        return false;
    }		
		}else{
		
		$img_l_t_e =$jd_hide_l_t[$t];  
        $img_l_e=$jd_hide_l[$t]; 
		
		}
		
		
					      if($_FILES['attr_jdr_e']['error'][$t]!=4){
		  
		  $itemsql="SELECT * FROM ".$ecs->table('dingzhi_attr'). " WHERE id=".$eid[$t];
		  $imageinfo=$db->getRow($itemsql);
		 
		   if ($imageinfo['img_r'] != '' && is_file('../' . $imageinfo['img_r']))
    {
        @unlink('../' . $imageinfo['img_r']);
    }
    if ($imageinfo['img_r_t'] != '' && is_file('../' . $imageinfo['img_r_t']))
    {
        @unlink('../' . $imageinfo['img_r_t']);
    }
	
	
   
		
	$filename =$image->random_filename() . substr($_FILES['attr_jdr_e']['name'][$t], strpos($_FILES['attr_jdr_e']['name'][$t], '.'));
    $img_r_t_e = $image->make_thumb($_FILES['attr_jdr_e']['tmp_name'][$t],100,50,$path.DATA_DIR . "/dingzhi_attr/");  
    $img_r_e=DATA_DIR . "/dingzhi_attr/".$filename;
    $img_r_t_e = DATA_DIR . "/dingzhi_attr/".is_string($img_r_t_e) ? $img_r_t_e : '';
   if (!move_upload_file($_FILES['attr_jdr_e']['tmp_name'][$t],$path.$img_r_e))
    {
        return false;
    }		
		}else{
		
		$img_r_t_e =$jd_hide_r_t[$t];  
        $img_r_e=$jd_hide_r[$t]; 
		
		}
	   
	   					      if($_FILES['attr_jdb_e']['error'][$t]!=4){
		  
		  $itemsql="SELECT * FROM ".$ecs->table('dingzhi_attr'). " WHERE id=".$eid[$t];
		  $imageinfo=$db->getRow($itemsql);
		 
		   if ($imageinfo['img_b'] != '' && is_file('../' . $imageinfo['img_b']))
    {
        @unlink('../' . $imageinfo['img_b']);
    }
    if ($imageinfo['img_b_t'] != '' && is_file('../' . $imageinfo['img_b_t']))
    {
        @unlink('../' . $imageinfo['img_b_t']);
    }
	
	
   
		
	$filename =$image->random_filename() . substr($_FILES['attr_jdb_e']['name'][$t], strpos($_FILES['attr_jdb_e']['name'][$t], '.'));
    $img_b_t_e = $image->make_thumb($_FILES['attr_jdb_e']['tmp_name'][$t],100,50,$path.DATA_DIR . "/dingzhi_attr/");  
    $img_b_e=DATA_DIR . "/dingzhi_attr/".$filename;
    $img_b_t_e = DATA_DIR . "/dingzhi_attr/".is_string($img_b_t_e) ? $img_b_t_e : '';
   if (!move_upload_file($_FILES['attr_jdb_e']['tmp_name'][$t],$path.$img_b_e))
    {
        return false;
    }		
		}else{
		
		$img_b_t_e =$jd_hide_b_t[$t];  
        $img_b_e=$jd_hide_b[$t]; 
		
		}
		
		
		$sql="UPDATE ".$ecs->table('dingzhi_attr'). " SET `title` = '".$etitle[$t]."',
`en_title` = '".$e_entitle[$t]."',
`resort` = '".$attr_resort_e[$t]."',
`price` = '".$attr_price_e[$t]."',
`color_img` = '".$img_color_e."',
`img_c` = '".$img_c_e."',
`img_l` = '".$img_l_e."',
`img_r` = '".$img_r_e."',
`img_b` = '".$img_b_e."',
`color` = '".$att_color_e[$t]."',
`type_id` = '".$e_jktype_e[$t]."',
`img_c_t` = '".$img_c_t_e."',
`img_l_t` = '".$img_l_t_e."',
`img_r_t` = '".$img_r_t_e."',
`descript` = '".$att_des_e[$t]."',
`en_descript` = '".$att_endes_e[$t]."',
`img_b_t` = '".$img_b_t_e."' WHERE `id` =".$eid[$t];

  $state=$db->query($sql);
	   
	   }
	
	}
	if($state!==false){
	
	   admin_log($_POST['ad_name'], 'edit', 'jk');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回', 'href' => 'jk.php?act=add&id='.$ids.'&type_c='. $type_c.'&gid='.$gid);
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
    $sql = 'SELECT COUNT(*) FROM ' .$GLOBALS['ecs']->table('dingzhi_menu'). ' AS ad ' . $where;
    $filter['record_count'] = $GLOBALS['db']->getOne($sql);

    $filter = page_and_size($filter);
	


    /* 获得广告数据 */
    $arr = array();
    $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('dingzhi_menu'). 'AS ad ' .
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

$thumb_url = $image->make_thumb($image_files['tmp_name'],100,50,$path.DATA_DIR . "/dingzhi_menu/");  
$orgImg=DATA_DIR . "/dingzhi_menu/".$filename;

$thumb_url = DATA_DIR . "/dingzhi_menu/".is_string($thumb_url) ? $thumb_url : '';
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