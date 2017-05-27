<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
require_once(ROOT_PATH . 'includes/cls_image.php');
require_once(ROOT_PATH . "includes/fckeditor/fckeditor.php");

if ($_REQUEST['act'] == 'list')
{

       $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 0;

    $smarty->assign('ur_here',    '镜架管理');
    $smarty->assign('action_link', array('text' =>'定制镜架添加', 'href' => 'dingzhi.php?act=add'));
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
	 
    $smarty->display('dingzhilist.htm');
}elseif($_REQUEST['act'] == 'add'){

    $sql="SELECT * FROM ".$GLOBALS['ecs']->table('dingzhi_menu')." order by resort asc";
	
	$menulist=$db->getAll($sql);
	
	$smarty->assign('menulist', $menulist);
    $smarty->assign('action',        'add');
	   $smarty->assign('form_act', 'insert');
	   	
 $smarty->display('dingzhi.htm');
}elseif ($_REQUEST['act'] == 'insert')
{


	$cat_name=isset($_POST['cat_name'])?trim($_POST['cat_name']):"";
    $cat_enname=isset($_POST['cat_enname'])?trim($_POST['cat_enname']):"";
    $resort=isset($_POST['resort'])?(int)$_POST['resort']:1;
    $isshow=isset($_POST['isshow'])?(int)$_POST['isshow']:1;
   
	 $max_pd=isset($_POST['max_pd'])?trim($_POST['max_pd']):"";
	  $min_pd=isset($_POST['min_pd'])?trim($_POST['min_pd']):"";
	    $tg_max=isset($_POST['tg_max'])?trim($_POST['tg_max']):"";
	    $tg_min=isset($_POST['tg_min'])?trim($_POST['tg_min']):"";
		    $max_c=isset($_POST['max_c'])?trim($_POST['max_c']):"";
			  $number=isset($_POST['number'])?trim($_POST['number']):"";
			    $brand=isset($_POST['brand'])?trim($_POST['brand']):"";
				    $price=isset($_POST['price'])?trim($_POST['price']):"";
						    $style=isset($_POST['style'])?intval($_POST['style']):0;
							    $year=isset($_POST['year'])?intval($_POST['year']):date("Y",time());
											$menuset=$_POST['navval'];
							 $share_title=isset($_POST['share_title'])?trim($_POST['share_title']):"";
									 $share_content=isset($_POST['share_content'])?trim($_POST['share_content']):"";
									 
		    $right_val=isset($_POST['right_val'])?(int)$_POST['right_val']:0;
    $bottom_val=isset($_POST['bottom_val'])?(int)$_POST['bottom_val']:0;
		$right_val_w=isset($_POST['right_val_w'])?(int)$_POST['right_val_w']:0;
	$bottom_val_w=isset($_POST['bottom_val_w'])?(int)$_POST['bottom_val_w']:0;
	
	
		    $s_right_val=isset($_POST['s_right_val'])?(int)$_POST['s_right_val']:0;
    $s_bottom_val=isset($_POST['s_bottom_val'])?(int)$_POST['s_bottom_val']:0;
		$s_right_val_w=isset($_POST['s_right_val_w'])?(int)$_POST['s_right_val_w']:0;
	$s_bottom_val_w=isset($_POST['s_bottom_val_w'])?(int)$_POST['s_bottom_val_w']:0;
								$menuarray=array();
								
								foreach($menuset as $k=>$v){
								
								 if(!empty($v)){
								 
								   $menuarray[$k]=$v;
								 
								 }
								
								
								}
								
				$menustr=implode(",",$menuarray);
								
    $menuset=$_POST['navval'];
	
    $arr=handle_gallery_image($_FILES['images']);
	$image_p=$arr['orgImg'];
	$image_p_m=$arr['thumb_url'];

	$addtime=time();
$sql = "INSERT INTO ".$GLOBALS['ecs']->table('dingzhi_type')."(cat_name,number,brand,price,style,year,cat_enname,images,resort,addtime,isshow,thump_o,max_pd,min_pd,tg_max,tg_min,max_c,menu_set,share_title,share_content,right_val,bottom_val,right_val_w,bottom_val_w,s_right_val,s_bottom_val,s_right_val_w,s_bottom_val_w) ".
            "VALUES ('$cat_name','$number','$brand','$price','$style','$year','$cat_enname','$image_p','$resort','$addtime','$isshow','$image_p_m','$max_pd','$min_pd','$tg_max','$tg_min','$max_c','$menustr','$$share_title','$share_content','$right_val','$bottom_val','$right_val_w','$bottom_val_w','$s_right_val','$s_bottom_val','$s_right_val_w','$s_bottom_val_w')";
	
    $GLOBALS['db']->query($sql);
	
	$lastid=$GLOBALS['db']->insert_id();
	
	
	$sql = "INSERT INTO ".$GLOBALS['ecs']->table('dingzhi_category')."(cat_name,cat_enname,resort,addtime,type_c,type_id,gid) ".
            "VALUES ('name','enname','1','$addtime','3','$lastid','$gid')";
	
    $GLOBALS['db']->query($sql);
    /* 记录管理员操作 */
    admin_log($_POST['ad_name'], 'add', 'dingzhi');

    clear_cache_files(); // 清除缓存文件

    /* 提示信息 */

    $link[1]['text'] = "返回列表";
    $link[1]['href'] = 'dingzhi.php?act=list';

    $link[2]['text'] = "继续添加";
    $link[2]['href'] = 'dingzhi.php?act=add';
    sys_msg($_LANG['add'] . "&nbsp;" .$_POST['title'] . "&nbsp;" .'添加成功',0, $link);

}elseif ($_REQUEST['act'] == 'edit')
{



    $sql = "SELECT * FROM " .$ecs->table('dingzhi_type'). " WHERE id='".intval($_REQUEST['id'])."'";
    $ads_arr = $db->getRow($sql);
	
	$ments=$ads_arr['menu_set'];
	
	if(!empty($ments)){
	
	$menuarray=explode(",",$ments);
	}
	
	
	$sql="SELECT * FROM ".$GLOBALS['ecs']->table('dingzhi_menu')." order by resort asc";
	
	$menulist=$db->getAll($sql); 
	
	for($i=0;$i<count($menulist);$i++){
	
	  if(in_array($menulist[$i]['id'],$menuarray)){
	  
	  $menulist[$i]['checked']="checked";
	  
	  }else{
	  
	  	  $menulist[$i]['checked']="";
	  }
	
	
	}

	$smarty->assign('menulist', $menulist);

    $ads_arr['title'] = htmlspecialchars($ads_arr['title']);


    $smarty->assign('ur_here',       "镜架修改");
    $smarty->assign('action_link',   array('href' => 'dingzhi.php?act=list', 'text' =>'镜架管理列表'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
    $smarty->assign('ads',           $ads_arr);

    assign_query_info();
    $smarty->display('dingzhi.htm');
}
elseif ($_REQUEST['act'] == 'update')
{
  
   $id=$_REQUEST['cid'];
  
    /* 初始化变量 */
 	$cat_name=isset($_POST['cat_name'])?trim($_POST['cat_name']):"";
    $cat_enname=isset($_POST['cat_enname'])?trim($_POST['cat_enname']):"";
	 $max_pd=isset($_POST['max_pd'])?(int)$_POST['max_pd']:0;
	  $min_pd=isset($_POST['min_pd'])?(int)$_POST['min_pd']:0;
    $resort=isset($_POST['resort'])?(int)$_POST['resort']:1;
	$isshow=isset($_POST['isshow'])?(int)$_POST['isshow']:1;
    	 $max_pd=isset($_POST['max_pd'])?trim($_POST['max_pd']):"";
	  $min_pd=isset($_POST['min_pd'])?trim($_POST['min_pd']):"";
	    $tg_max=isset($_POST['tg_max'])?trim($_POST['tg_max']):"";
	    $tg_min=isset($_POST['tg_min'])?trim($_POST['tg_min']):"";
		    $max_c=isset($_POST['max_c'])?trim($_POST['max_c']):"";
					  $number=isset($_POST['number'])?trim($_POST['number']):"";
			    $brand=isset($_POST['brand'])?trim($_POST['brand']):"";
				    $price=isset($_POST['price'])?trim($_POST['price']):"";
						    $style=isset($_POST['style'])?intval($_POST['style']):0;
							    $year=isset($_POST['year'])?intval($_POST['year']):date("Y",time());
								
								 $share_title=isset($_POST['share_title'])?trim($_POST['share_title']):"";
									 $share_content=isset($_POST['share_content'])?trim($_POST['share_content']):"";
										    $right_val=isset($_POST['right_val'])?(int)$_POST['right_val']:0;
    $bottom_val=isset($_POST['bottom_val'])?(int)$_POST['bottom_val']:0;
		$right_val_w=isset($_POST['right_val_w'])?(int)$_POST['right_val_w']:0;
	$bottom_val_w=isset($_POST['bottom_val_w'])?(int)$_POST['bottom_val_w']:0;
	
	
			    $s_right_val=isset($_POST['s_right_val'])?(int)$_POST['s_right_val']:0;
    $s_bottom_val=isset($_POST['s_bottom_val'])?(int)$_POST['s_bottom_val']:0;
		$s_right_val_w=isset($_POST['s_right_val_w'])?(int)$_POST['s_right_val_w']:0;
	$s_bottom_val_w=isset($_POST['s_bottom_val_w'])?(int)$_POST['s_bottom_val_w']:0;
								$menuset=$_POST['navval'];
								
								$menuarray=array();
								
								foreach($menuset as $k=>$v){
								
								 if(!empty($v)){
								 
								   $menuarray[$k]=$v;
								 
								 }
								
								
								}
								
				$menustr=implode(",",$menuarray);
	
 
    handle_update_gallery_image($id,$_FILES['images'],$cat_name,$cat_enname,$max_pd,$min_pd,$tg_max,$tg_min,$max_c,$number,$brand,$price,$style,$year,$resort,$menustr,$isshow,$share_title,$share_content,$right_val,$bottom_val,$right_val_w,$bottom_val_w,$s_right_val,$s_bottom_val,$s_right_val_w,$s_bottom_val_w);
   /* 记录管理员操作 */
   admin_log($_POST['ad_name'], 'edit', 'dingzhi');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回镜架管理列表', 'href' => 'dingzhi.php?act=list');
   sys_msg($_LANG['edit'] .' '.$_POST['title'].' '. '修改成功!', 0, $href);

}else if($_REQUEST['act'] =="deleteimg"){

$id=$_GET['id'];
$din=$_GET['din'];
$sql="SELECT * from ".$ecs->table('dingzhi')." where id=".$id;

$image=$db->getRow($sql);

    if ($image['images'] != '' && is_file('../' . $image['images']))
    {
        @unlink('../' . $image['images']);
    }
    if ($image['thump_o'] != '' && is_file('../' . $image['thump_o']))
    {
        @unlink('../' . $image['thump_o']);
    }
	
$sql="Update  ".$ecs->table('dingzhi')." SET images='',thump_o='' where id=".$id;

$state=$db->query($sql);

if($state){

 $links[0]['text']    ="镜架修改页面";
  $links[0]['href']    = 'dingzhi_type.php?act=edit&id='.$id;
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回镜架管理页面";
  $links[0]['href']    = 'dingzhi_type.php?act=edit&id='.$id;
  sys_msg("图片删除失败", 0, $links);
  }

}elseif ($_REQUEST['act'] == 'remove')
{
  
    $id = intval($_REQUEST['id']);
	
	$sql="SELECT * from ".$ecs->table('dingzhi_type')." where id=".$id;
  
    $image=$db->getRow($sql);
	
	$sql="DELETE  FROM  ".$ecs->table('dingzhi_type'). " where id=$id";

    $state=$db->query($sql);
	
	if($state!==false){

    if ($image['images'] != '' && is_file('../' . $image['images']))
    {
        @unlink('../' . $image['images']);
    }
    if ($image['thump_o'] != '' && is_file('../' . $image['thump_o']))
    {
        @unlink('../' . $image['thump_o']);
    }
	
	//删除dingzhi_category表里相关数据
	$sqlg="DELETE  FROM  ".$ecs->table('dingzhi_category'). " where type_id=".$id;
   
    $sqlcf=$db->getAll($sqlg);
   

	$sqlc="SELECT *  FROM  ".$ecs->table('dingzhi_attr'). " where pid=".$id;
   
    $attrlist=$db->getAll($sqlc);
	
		for($i=0;$i<count($attrlist);$i++){
		$sqls="DELETE from ".$ecs->table('dingzhi_attr')." where id=".$attrlist[$i]['id'];
	
	$ftf=$db->query($sqls);
	if($ftf!==false){
	if ($attrlist[$i]['color_img'] != '' && is_file('../' . $attrlist[$i]['color_img']))
    {
        @unlink('../' . $attrlist[$i]['color_img']);
    }
	
	 if ($attrlist[$i]['img_c'] != '' && is_file('../' . $attrlist[$i]['img_c']))
    {
        @unlink('../' . $attrlist[$i]['img_c']);
    }
	 if ($attrlist[$i]['img_c_t'] != '' && is_file('../' . $attrlist[$i]['img_c_t']))
    {
        @unlink('../' . $attrlist[$i]['img_c_t']);
    }
	 if ($attrlist[$i]['img_l'] != '' && is_file('../' . $attrlist[$i]['img_l']))
    {
        @unlink('../' . $attrlist[$i]['img_l']);
    }
	
		 if ($attrlist[$i]['img_l_t'] != '' && is_file('../' . $attrlist[$i]['img_l_t']))
    {
        @unlink('../' . $attrlist[$i]['img_l_t']);
    }
	
			 if ($attrlist[$i]['img_r'] != '' && is_file('../' . $attrlist[$i]['img_r']))
    {
        @unlink('../' . $attrlist[$i]['img_r']);
    }
	
				 if ($attrlist[$i]['img_r_t'] != '' && is_file('../' . $attrlist[$i]['img_r_t']))
    {
        @unlink('../' . $attrlist[$i]['img_r_t']);
    }
	
					 if ($attrlist[$i]['img_b'] != '' && is_file('../' . $attrlist[$i]['img_b']))
    {
        @unlink('../' . $attrlist[$i]['img_b']);
    }
	
     if ($attrlist[$i]['img_b_t'] != '' && is_file('../' . $attrlist[$i]['img_b_t']))
    {
        @unlink('../' . $attrlist[$i]['img_b_t']);
    }
	
	}

	}
	
  //删除dingzhi_size表里相关数据
	$sqls="SELECT * from ".$ecs->table('dingzhi_size')." where type_id=".$id;
	
	$sizeinfo=$db->getAll($sql);
	
	for($i=0;$i<count($sizeinfo);$i++){
		$sqls="DELETE from ".$ecs->table('dingzhi_size')." where type_id=".$sizeinfo[$i]['id'];
	
	$ft=$db->query($sqls);
	
	if($ft!==false){
	
			   if ($sizeinfo[$i]['images'] != '' && is_file('../' . $sizeinfo[$i]['images']))
    {
        @unlink('../' . $sizeinfo[$i]['images']);
    }
	
				   if ($sizeinfo[$i]['thumb'] != '' && is_file('../' . $sizeinfo[$i]['thumb']))
    {
        @unlink('../' . $sizeinfo[$i]['thumb']);
    }
   }
	

	}
	//删除dingzhi_size_info表里相关数据
  	$sqf="SELECT * from ".$ecs->table('dingzhi_size_info')." where type_id=".$id;
	
	$sizef=$db->getRow($sqf);

	   if ($sizef['images'] != '' && is_file('../' . $sizef['images']))
    {
        @unlink('../' . $sizef['images']);
    }
	
    $sqlf="DELETE from ".$ecs->table('dingzhi_size_info')." where type_id=".$id;
	
	$ft=$db->query($sqlf);
	
	$sql="SELECT * FROM ".$ecs->table('dingzhi_default')." WHERE relative_id=".$id;
	
	$dfa=$db->getAll($sql);
	
	foreach($dfa as $k=>$v){
	
	  $sqls="DELETE FROM ".$ecs->table('dingzhi_default')." WHERE id=".$v['id'];
	  
	  $sta=$db->query($sqls);
	  
	  if($sta!=false){
	
		    if ($v['dingzhi_img'] != '' && is_file('../' . $v['dingzhi_img']))
    {
        @unlink('../' . $v['dingzhi_img']);
    }
    if ($v['dingzhi_thumb'] != '' && is_file('../' . $v['dingzhi_thumb']))
    {
        @unlink('../' . $v['dingzhi_thumb']);
    }
	
	}
	}
	
	$sql="SELECT * FROM ".$ecs->table('dingzhi_type_detail')." WHERE relative_id=".$id;
	
	$delist=$db->getAll($sql);
	
		foreach($delist as $k=>$v){
	
	  $sqls="DELETE FROM ".$ecs->table('dingzhi_type_detail')." WHERE id=".$v['id'];
	  
	  $sta=$db->query($sqls);
	  
	  if($sta!=false){
	
		    if ($v['images'] != '' && is_file('../' . $v['images']))
    {
        @unlink('../' . $v['images']);
    }
    if ($v['s_images'] != '' && is_file('../' . $v['s_images']))
    {
        @unlink('../' . $v['s_images']);
    }
	
	}
	}
	
	
	$sql="DELETE FROM ".$ecs->table('dingzhi_peij')." WHERE relative_id=".$id;
	
	$db->query($sql);
	
	}
   
   
	

  $url = 'dingzhi.php?act=query&' . str_replace('act=remove', '', $_SERVER['QUERY_STRING']);

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

    make_json_result($smarty->fetch('dingzhilist.htm'), '',
        array('filter' => $ads_list['filter'], 'page_count' => $ads_list['page_count']));
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
	  $sqls="SELECT * FROM " .$GLOBALS['ecs']->table('dingzhi_menu'). "  order by resort asc";
  	 $menulist=$GLOBALS['db']->getAll($sqls);
    while ($rows = $GLOBALS['db']->fetchRow($res))
    {
	
	     //$sqls="SELECT * FROM " .$GLOBALS['ecs']->table('dingzhi_jp'). " where type_id=".$rows['id']." order by resort asc";
		 
	
	   
	   //  $rows['jplist']=$GLOBALS['db']->getAll($sqls);
	   $marray=array();
		 if(!empty($rows['menu_set'])){
		 
	     $menustrs=explode(",",$rows['menu_set']);
		 for($i=0;$i<count($menulist);$i++){
		 
		    if($menulist[$i]['type_c']>=0){
			
			   if(in_array($menulist[$i]['id'],$menustrs)){
			   
			     $marray[$i]=$menulist[$i];
			   }
			
			}
			
		 
		 }
		 
		 }
		 
	
	 $rows['marray']=$marray;
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


function handle_update_gallery_image($ids,$image_files,$image_title,$image_enname,$max_pd,$min_pd,$tg_max,$tg_min,$max_c,$number,$brand,$price,$style,$year,$image_sort,$menustr,$isshow,$share_title,$share_content,$right_val,$bottom_val,$right_val_w,$bottom_val_w,$s_right_val,$s_bottom_val,$s_right_val_w,$s_bottom_val_w)

{ 
    $image_p='';
	$image_p_m='';
	$rightval=$right_val;
	$bottomval=$bottom_val;
	
$id=$ids;
	$sql="SELECT * from ".$GLOBALS['ecs']->table('dingzhi_type')." where id=".$id;
    $resultzt=$GLOBALS['db']->getRow($sql);
$show=$isshow;
$path= ROOT_PATH;
$image = new cls_image();
$imgtitle=$image_title;
$image_enname=$image_enname;
$imgresort=$image_sort;
$addtime=time();
$max_pd=$max_pd;
$min_pd=$min_pd;
$tg_max=$tg_max;
$tg_min=$tg_min;
$max_c=$max_c;
$number=$number;
$brand=$brand;
$price=$price;
$style=$style;
$year=$year;
$share_title=$share_title;
$share_content=$share_content;
$menustr=$menustr;
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
			 "max_pd    = '$max_pd', ".
			  "min_pd    = '$min_pd', ".
			   "tg_max    = '$tg_max', ".
			    "tg_min    = '$tg_min', ".
				 "max_c    = '$max_c', ".
			  		 "number    = '$number', ".
					 	 "brand    = '$brand', ".
						 	 "price    = '$price', ".
							 	 "style    = '$style', ".
								  	 "menu_set    = '$menustr', ".
								 	 	 "year    = '$year', ".
											 "share_content    = '$share_content', ".
	 "share_title    = '$share_title', ".
	 "right_val    = '$rightval', ".	
	 "bottom_val    = '$bottomval', ".
	 "right_val_w    = '$right_val_w', ".	
	 "bottom_val_w    = '$bottom_val_w', ".		
	 "s_right_val    = '$s_right_val', ".	
	 "s_bottom_val    = '$s_bottom_val', ".
	 "s_right_val_w    = '$s_right_val_w', ".	
	 "s_bottom_val_w    = '$s_bottom_val_w', ".		 
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