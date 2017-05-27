<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');

  require_once(ROOT_PATH . 'includes/cls_image.php');
if ($_REQUEST['act'] == 'list')
{

       $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 0;

    $smarty->assign('ur_here',    '品牌管理');
    $smarty->assign('action_link', array('text' =>'品牌添加', 'href' => 'brand_p.php?act=add'));
    $smarty->assign('pid',         $pid);
     $smarty->assign('full_page',  1);
	 
	    $ads_list = get_lunbolist();//自定义函数获取数据，翻页或者截取内容

    $smarty->assign('ads_list',     $ads_list['ads']);
    $smarty->assign('filter',       $ads_list['filter']);
    $smarty->assign('record_count', $ads_list['record_count']);
    $smarty->assign('page_count',   $ads_list['page_count']);

    $sort_flag  = sort_flag($ads_list['filter']);
    $smarty->assign($sort_flag['tag'], $sort_flag['img']);

    assign_query_info();
	 
    $smarty->display('brand_p_list.htm');
}elseif($_REQUEST['act'] == 'add'){


    $smarty->assign('action',        'add');
	$smarty->assign('form_act', 'insert');
    $smarty->display('brand_p.htm');
}elseif ($_REQUEST['act'] == 'insert')
{
	$title=isset($_POST['title'])?trim($_POST['title']):"";
	$content=isset($_POST['content'])?trim($_POST['content']):"";
    $sudu=isset($_POST['sudu'])?trim($_POST['sudu']):"";
	//$isshow=isset($_POST['isshow'])?intval($_POST['isshow']):1;
    $ogv=isset($_POST['ogv'])?trim($_POST['ogv']):0;
	$isshow=isset($_POST['isshow'])?trim($_POST['isshow']):1;
	$position=isset($_POST['position'])?trim($_POST['position']):0;
	$theme_title=isset($_POST['theme_title'])?trim($_POST['theme_title']):'';

	$imageinfo=handle_ad_image($_FILES['file']);
	$bkimage_p=$imageinfo['orgImg'];
	$bkimage_p_m=$imageinfo['thumb_url'];
	
	$addtime=time();
	$bkimage_s=$imageinfo['orgImg_s'];
	$bkimage_s_m=$imageinfo['thumb_url_s'];
	//exit;
    
	$sql = "INSERT INTO ".$GLOBALS['ecs']->table('brand_p')."(title,content,offset_sudu,bkimage_p,bkimage_p_m,bkimage_s,bkimage_s_m,resort,addtime,isshow,position,theme_title)".
            "VALUES ('$title','$content','$sudu','$bkimage_p','$bkimage_p_m','$bkimage_s','$bkimage_s_m','$ogv','$addtime','$isshow','$position','$theme_title')";
    $GLOBALS['db']->query($sql);
	 $bsql = 'SELECT * FROM '.$ecs->table('brand_p').'order by id desc limit 1';
	 $parent= $db->getRow($bsql);
	// var_dump($parent);
	// exit;
    /*子集部分*/
	//if($_FILES['zj_file']){
	//$zjchan=sizeof($_FILES['zj_file']['name'])/2;

	//$sql = "SELECT id FROM " .$ecs->table('brand_p'). " WHERE title='".$title."'";
    //$parent = $db->getRow($sql);
	
	handle_child_image($_FILES['zj_file'],$parent['id']);
	
//}
    /* 记录管理员操作 */
    admin_log($_POST['ad_name'], 'add', 'brand_p');

    clear_cache_files(); // 清除缓存文件
//exit;
    /* 提示信息 */

    $link[1]['text'] = "返回列表";
    $link[1]['href'] = 'brand_p.php?act=list';

    $link[2]['text'] = "继续添加";
    $link[2]['href'] = 'brand_p.php?act=add';
    sys_msg($_LANG['add'] . "&nbsp;" .$_POST['title'] . "&nbsp;" .'添加成功',0, $link);
	

}elseif ($_REQUEST['act'] == 'edit')
{



    $sql = "SELECT * FROM " .$ecs->table('brand_p'). " WHERE id='".intval($_REQUEST['id'])."'";
    $ads_arr = $db->getRow($sql);
	$sqll = "SELECT * FROM " .$ecs->table('brand_pchild'). " WHERE parent_id='".intval($_REQUEST['id'])."'"."order by id asc";
    $child = $db->getAll($sqll);
    $ads_arr['title'] = htmlspecialchars($ads_arr['title']);
	//print_r($child);

	
	
    $smarty->assign('ur_here',       "品牌修改");
    $smarty->assign('action_link',   array('href' => 'brand_p.php?act=list', 'text' =>'品牌列表'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
    $smarty->assign('ads',           $ads_arr);
	$smarty->assign('child',           $child);
    assign_query_info();
    $smarty->display('brand_p.htm');
}


//对数据进行更新和修改
elseif ($_REQUEST['act'] == 'update')
{
  
    $id=trim($_POST['id']);

	$title=isset($_POST['title'])?trim($_POST['title']):"";
	$content=isset($_POST['content'])?trim($_POST['content']):"";
	//var_dump($content);
	//exit;
    $sudu=isset($_POST['sudu'])?trim($_POST['sudu']):"";
	$isshow=isset($_POST['isshow'])?intval($_POST['isshow']):1;
    $ogv=isset($_POST['ogv'])?trim($_POST['ogv']):0;
	$position=isset($_POST['position'])?trim($_POST['position']):0;
	$theme_title=isset($_POST['theme_title'])?trim($_POST['theme_title']):'';
	
	$bkimage_p='';
	$bkimage_p_m='';
	$bkimage_s='';
	$bkimage_s_m='';		
    $sql = "SELECT * FROM " .$ecs->table('brand_p'). " WHERE id='".intval($_REQUEST['id'])."'";
     $image = $db->getRow($sql);
	/*if (empty($_FILES['file']['error']) || (!isset($_FILES['file']['error']) && isset($_FILES['file']['tmp_name']) && $_FILES['file']['tmp_name'] != 'none'))
     {*/
    if($_FILES['file']){//判断是否有替换图片
	 
	  $imageinfo=handle_ad_image($_FILES['file']);		
	  $bkimage_p=$imageinfo['orgImg'];
	  $bkimage_p_m=$imageinfo['thumb_url'];
	  $bkimage_s=$imageinfo['orgImg_s'];
	  $bkimage_s_m=$imageinfo['thumb_url_s'];
	  //exit;
	if($_FILES['file']['name'][0]){
		if ($image['bkimage_p'] != '' && is_file('../' . $image['bkimage_p']))
       {
        @unlink('../' . $image['bkimage_p']);
       }
       if ($image['bkimage_p_m'] != '' && is_file('../' . $image['bkimage_p_m']))
       {
        @unlink('../' . $image['bkimage_p_m']);
       }
	}else{
		$bkimage_p=$image['bkimage_p'];
	    $bkimage_p_m=$image['bkimage_p_m'];
	}
	if($_FILES['file']['name'][1]){
       if ($image['bkimage_s'] != '' && is_file('../' . $image['bkimage_s']))
        {
        @unlink('../' . $image['bkimage_s']);
        }
       if ($image['bkimage_s_m'] != '' && is_file('../' . $image['bkimage_s_m']))
       {
        @unlink('../' . $image['bkimage_s_m']);
       }
	}
	else{
		$bkimage_s=$image['bkimage_s'];
	    $bkimage_s_m=$image['bkimage_s_m'];
	}
	}else
	{
		$bkimage_p=$image['bkimage_p'];
	    $bkimage_p_m=$image['bkimage_p_m'];
		$bkimage_s=$image['bkimage_s'];
	    $bkimage_s_m=$image['bkimage_s_m'];
		
	}
		    $sql = "UPDATE " .$GLOBALS['ecs']->table('brand_p'). " SET ".
            "title = '$title', ".
            "content     = '$content', ".
			"offset_sudu  = '$sudu', ".
            "bkimage_s_m = '$bkimage_s_m', ".
            "bkimage_s  = '$bkimage_s', ".
             "bkimage_p_m  = '$bkimage_p_m', ".
            "bkimage_p  = '$bkimage_p', ".
			 "resort    = '$ogv',".
			 "isshow  = '$isshow', ".
			"position  = '$position',".
			"theme_title  = '$theme_title'".
            "WHERE id = '$id'";		
     $GLOBALS['db']->query($sql);
//子集更新
        
		 handle_updatechild_image($_FILES['zj_file'],$id);
		 if($_POST['zj_ttitle'][0]!=''){
         handle_childjia_image($_FILES['zj_tfile'],$id);
		 }
   /* 记录管理员操作 */
   admin_log($_POST['ad_name'], 'edit', 'brand_p');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回列表', 'href' => 'brand_p.php?act=list');
   sys_msg($_LANG['edit'] .' '.$_POST['title'].' '. '修改成功!', 0, $href);

   
   
   
}elseif ($_REQUEST['act'] == 'remove')
{
  
    $id = intval($_REQUEST['id']);
	$sql="SELECT * FROM ".$ecs->table('brand_p')." where id=".$id;
    $image=$db->getRow($sql); 
	
	$sqll="SELECT * FROM ".$ecs->table('brand_pchild')." where parent_id=".$id;//子集
    $result=$db->query($sqll); 
	while($child = mysql_fetch_assoc($result)){//解析结果集并遍历
		
		if ($child['child_imp'] != '' && is_file('../' . $child['child_imp']))
      {
        @unlink('../' . $child['child_imp']);
      }
      if ($child['child_imp_m'] != '' && is_file('../' . $child['child_imp_m']))
       {
        @unlink('../' . $child['child_imp_m']);
       }
	 if ($child['child_ims'] != '' && is_file('../' . $child['child_ims']))
       {
        @unlink('../' . $child['child_ims']);
       } 
    if ($child['child_ims_m'] != '' && is_file('../' . $child['child_ims_m']))
       {
        @unlink('../' . $child['child_ims_m']);
       }
		
    }
	
	
	/*父集删除*/
	if ($image['bkimage_p'] != '' && is_file('../' . $image['bkimage_p']))
    {
        @unlink('../' . $image['bkimage_p']);
    }
    if ($image['bkimage_p_m'] != '' && is_file('../' . $image['bkimage_p_m']))
    {
        @unlink('../' . $image['bkimage_p_m']);
    }
	 if ($image['bkimage_s'] != '' && is_file('../' . $image['bkimage_s']))
    {
        @unlink('../' . $image['bkimage_s']);
    } 
    if ($image['bkimage_s_m'] != '' && is_file('../' . $image['bkimage_s_m']))
    {
        @unlink('../' . $image['bkimage_s_m']);
    }
	
	
    $sql="DELETE  FROM  ".$ecs->table('brand_p'). " where id=$id";

    $state=$db->query($sql);
	$sql="DELETE  FROM  ".$ecs->table('brand_pchild'). " where parent_id=$id";

    $state=$db->query($sql);

  $url = 'brand_p.php?act=query&' . str_replace('act=remove', '', $_SERVER['QUERY_STRING']);

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

    make_json_result($smarty->fetch('brand_p_list.htm'), '',
        array('filter' => $ads_list['filter'], 'page_count' => $ads_list['page_count']));
}elseif($_REQUEST['act']=="deleteimg"){

 $id=$_GET['id'];
 $state='';//初始化使其全局
 $sql="SELECT * FROM ".$ecs->table('brand_p')." where id=".$id;

 $image=$db->getRow($sql); 
 $sqll="SELECT * FROM ".$ecs->table('brand_pchild')." where parent_id=".$id;

 $child=$db->getRow($sqll); 
 
 if($_GET['din']=='p'){//判断是否电脑
    if ($image['bkimage_p'] != '' && is_file('../' . $image['bkimage_p']))
    {
        @unlink('../' . $image['bkimage_p']);
    }
    if ($image['bkimage_p_m'] != '' && is_file('../' . $image['bkimage_p_m']))
    {
        @unlink('../' . $image['bkimage_p_m']);
    }
	$sql="Update  ".$ecs->table('brand_p')." SET bkimage_p='',bkimage_p_m='' where id=".$id;

    $state=$db->query($sql);
}
if($_GET['din']=='s'){//判断是否手机
     if ($image['bkimage_s'] != '' && is_file('../' . $image['bkimage_s']))
    {
        @unlink('../' . $image['bkimage_s']);
    }
	
	 
    if ($image['bkimage_s_m'] != '' && is_file('../' . $image['bkimage_s_m']))
    {
        @unlink('../' . $image['bkimage_s_m']);
    }
	$sql="Update  ".$ecs->table('brand_p')." SET bkimage_s='',bkimage_s_m='' where id=".$id;

    $state=$db->query($sql);
}

if($state){
 $links[0]['text']    ="返回";
  $links[0]['href']    = 'brand_p.php?act=edit&id='.$id;
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回";
  $links[0]['href']    = 'brand_p.php?act=edit&id='.$id;
  sys_msg("图片删除失败", 0, $links);
  }
}
elseif($_REQUEST['act']=="delet"){
	 $id=trim($_GET['id']);
	 //echo $id;
	 //exit;
	 $sql= "SELECT * FROM " .$GLOBALS['ecs']->table('brand_pchild'). " WHERE id='".intval($id)."'";
	 $image=$db->getRow($sql);
	 if ($image['child_imp'] != '' && is_file('../' . $image['child_imp']))
    {
        @unlink('../' . $image['child_imp']);
    }
    if ($image['child_imp_m'] != '' && is_file('../' . $image['child_imp_m']))
    {
        @unlink('../' . $image['child_imp_m']);
    }
	 if ($image['child_ims'] != '' && is_file('../' . $image['child_ims']))
    {
        @unlink('../' . $image['child_ims']);
    }
    if ($image['child_ims_m'] != '' && is_file('../' . $image['child_ims_m']))
    {
        @unlink('../' . $image['child_ims_m']);
    }
	$sql="DELETE  FROM  ".$ecs->table('brand_pchild'). " where id=$id";

    $state=$db->query($sql);
if($state){
		
	 $links[0]['text']    ="返回";
     $links[0]['href']    = 'brand_p.php?act=edit&id='.$image['parent_id'];
     sys_msg("数据删除成功", 0, $links);
 }else{
     $links[0]['text']    ="返回";
     $links[0]['href']    = 'brand_p.php?act=edit&id='.$image['parent_id'];
     sys_msg("数据删除失败", 0, $links);
     }	
	 
	 
}
elseif($_REQUEST['act']=="deleteimgz"){

 $id=$_GET['id'];
 $state='';//初始化使其全局

 $sqll="SELECT * FROM ".$ecs->table('brand_pchild')." where id=".$id;

 $child=$db->getRow($sqll);

 if($_GET['din']=='p_z'){//判断是否电脑
    if ($child['child_imp'] != '' && is_file('../' . $child['child_imp']))
    {
        @unlink('../' . $child['child_imp']);
    }
    if ($child['child_imp_m'] != '' && is_file('../' . $child['child_imp_m']))
    {
        @unlink('../' . $child['child_imp_m']);
    }
	$sql="Update  ".$ecs->table('brand_pchild')." SET child_imp='',child_imp_m='' where id=".$id;

    $state=$db->query($sql);
}
if($_GET['din']=='s_z'){//判断是否手机
     if ($child['child_ims'] != '' && is_file('../' . $child['child_ims']))
    {
        @unlink('../' . $child['child_ims']);
    }
	
	 
    if ($child['child_ims_m'] != '' && is_file('../' . $child['child_ims_m']))
    {
        @unlink('../' . $child['child_ims_m']);
    }
	$sql="Update  ".$ecs->table('brand_pchild')." SET child_ims='',child_ims_m='' where id=".$id;

    $state=$db->query($sql);
}
clear_cache_files(); // 清除模版缓存
if($state){
 $links[0]['text']    ="返回";
  $links[0]['href']    = 'brand_p.php?act=edit&id='.$child['parent_id'];
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回";
  $links[0]['href']    = 'brand_p.php?act=edit&id='.$child['parent_id'];
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
    $sql = 'SELECT COUNT(*) FROM ' .$GLOBALS['ecs']->table('brand_p'). ' AS ad ' . $where;
    $filter['record_count'] = $GLOBALS['db']->getOne($sql);

    $filter = page_and_size($filter);
	


    /* 获得广告数据 */
    $arr = array();
    $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('brand_p'). 'AS ad ' .
            'GROUP BY ad.id desc';

    $res = $GLOBALS['db']->selectLimit($sql, $filter['page_size'], $filter['start']);
  
    while ($rows = $GLOBALS['db']->fetchRow($res))
    {
         /* 广告类型的名称 */
	
           $rows['addtime']  = date("Y-m-d",$rows['addtime']);
		   if(strlen($rows['content'])>20){
           $rows['content']  = utf8sub($rows['content'],10)."...";
		   }

         $arr[] = $rows;
    }

    return array('ads' => $arr, 'filter' => $filter, 'page_count' => $filter['page_count'], 'record_count' => $filter['record_count']);
}



function handle_ad_image($image_files)
{ 
$array=array();
$chang = sizeof($image_files['name']);

$path= ROOT_PATH;
$image = new cls_image();
for($i=0;$i<$chang;$i++)
{
if($image_files['error'][$i]==0){
$filename =$image->random_filename() . substr($image_files['name'][$i], strpos($image_files['name'][$i], '.'));

$thumb_url = $image->make_thumb($image_files['tmp_name'][$i],100,50,$path.DATA_DIR . "/pinpai/");  
$thumb_url = DATA_DIR . "/pinpai/".is_string($thumb_url) ? $thumb_url : '';
//原图保r存
$orgImg=DATA_DIR . "/pinpai/".$filename;
if($i==0){
$array['thumb_url']=$thumb_url;
$array['orgImg']=$orgImg;
}
if($i==1){
$array['thumb_url_s']=$thumb_url;
$array['orgImg_s']=$orgImg;
}
//原图保存
if (!move_upload_file($image_files['tmp_name'][$i],$path.$orgImg))
    {
        return false;
    }
}

}
return $array;




}
/*子集上传图片处理函数*/
//function handle_child_image($image_files,$parent_id,$title,$content,$sudu,$resort)
function handle_child_image($image_files,$parent_id)
{ 
$chang = sizeof($image_files['name']);
//echo "===".$chang."==";
/*初始化参数*/
$title='';
$content='';
$sudu='';
$resort='';
$child_imp='';
$child_imp_m='';
$child_ims='';
$child_ims_m='';
$orgImg='';
$thumb_url='';
$ci=0;
for($i=0;$i<$chang;$i++)
{
$path= ROOT_PATH;
$image = new cls_image();
if($image_files['error'][$i]==0){
	// echo "fff<br/>";
   $filename =$image->random_filename() . substr($image_files['name'][$i], strpos($image_files['name'][$i], '.'));

   $thumb_url = $image->make_thumb($image_files['tmp_name'][$i],100,50,$path.DATA_DIR . "/pinpai/");  
   $thumb_url = DATA_DIR . "/pinpai/".is_string($thumb_url) ? $thumb_url : '';
   
//原图保r存
   $orgImg=DATA_DIR . "/pinpai/".$filename;

//原图保存
    if (!move_upload_file($image_files['tmp_name'][$i],$path.$orgImg))
      {
		 // echo "错误";
        return false;
      }
	}
else{
		
		$orgImg='';
        $thumb_url='';
		
	}
	 if(($i+1)%2==1){
		$child_imp=$orgImg;
        $child_imp_m=$thumb_url;
	  }else{
	    $child_ims=$orgImg;
        $child_ims_m=$thumb_url;
		$title=isset($_POST['zj_title'][$ci])?trim($_POST['zj_title'][$ci]):'';
		$content=isset($_POST['zj_content'][$ci])?trim($_POST['zj_content'][$ci]):'';
		$sudu=isset($_POST['zj_sudu'][$ci])?trim($_POST['zj_sudu'][$ci]):'';
		$resort=isset($_POST['zj_resort'][$ci])?trim($_POST['zj_resort'][$ci]):0;
		$isshow=isset($_POST['zj_isshow'][$ci])?trim($_POST['zj_isshow'][$ci]):1;
		$position=isset($_POST['zj_position'][$ci])?trim($_POST['zj_position'][$ci]):0;
		$maskshow=isset($_POST['zj_maskshow'][$ci])?trim($_POST['zj_maskshow'][$ci]):1;
		$percentage=isset($_POST['zj_percentage'][$ci])?trim($_POST['zj_percentage'][$ci]):0;
		if($position==0){
			$percentage=1;
		}
		$addtime=time();
		$sql = "INSERT INTO ".$GLOBALS['ecs']->table('brand_pchild')."(title,content,offset_sudu,child_imp,child_imp_m,child_ims,child_ims_m,resort,addtime,parent_id,isshow,position,maskshow,percentage)".
        "VALUES ('$title','$content','$sudu','$child_imp','$child_imp_m','$child_ims','$child_ims_m','$resort','$addtime','$parent_id','$isshow','$position','$maskshow','$percentage')";
        $GLOBALS['db']->query($sql);
		$ci++;
     }
}
}
function handle_childjia_image($image_files,$parent_id)
{ 
$chang = sizeof($image_files['name']);
/*初始化参数*/
$title='';
$content='';
$sudu='';
$resort='';
$child_imp='';
$child_imp_m='';
$child_ims='';
$child_ims_m='';
$orgImg='';
$thumb_url='';
$ci=0;
for($i=0;$i<$chang;$i++)
{
$path= ROOT_PATH;
$image = new cls_image();
if($image_files['error'][$i]==0){
	// echo "fff<br/>";
   $filename =$image->random_filename() . substr($image_files['name'][$i], strpos($image_files['name'][$i], '.'));

   $thumb_url = $image->make_thumb($image_files['tmp_name'][$i],100,50,$path.DATA_DIR . "/pinpai/");  
   $thumb_url = DATA_DIR . "/pinpai/".is_string($thumb_url) ? $thumb_url : '';
   
//原图保r存
   $orgImg=DATA_DIR . "/pinpai/".$filename;

//原图保存
    if (!move_upload_file($image_files['tmp_name'][$i],$path.$orgImg))
      {
		 // echo "错误";
        return false;
      }
	}
else{
		
		$orgImg='';
        $thumb_url='';
		
	}
	 if(($i+1)%2==1){
		$child_imp=$orgImg;
        $child_imp_m=$thumb_url;
	  }else{
	    $child_ims=$orgImg;
        $child_ims_m=$thumb_url;
		$title=isset($_POST['zj_ttitle'][$ci])?trim($_POST['zj_ttitle'][$ci]):'';
		$content=isset($_POST['zj_tcontent'][$ci])?trim($_POST['zj_tcontent'][$ci]):'';
		$sudu=isset($_POST['zj_tsudu'][$ci])?trim($_POST['zj_tsudu'][$ci]):'';
		$resort=isset($_POST['zj_tresort'][$ci])?trim($_POST['zj_tresort'][$ci]):0;
		$isshow=isset($_POST['zj_tisshow'][$ci])?trim($_POST['zj_tisshow'][$ci]):1;
		$position=isset($_POST['zj_tposition'][$ci])?trim($_POST['zj_tposition'][$ci]):0;
		$maskshow=isset($_POST['zj_tmaskshow'][$ci])?trim($_POST['zj_tmaskshow'][$ci]):1;
		$percentage=isset($_POST['zj_tpercentage'][$ci])?trim($_POST['zj_tpercentage'][$ci]):0;
		if($position==0){
			$percentage=1;
		}
		$addtime=time();
		$sql = "INSERT INTO ".$GLOBALS['ecs']->table('brand_pchild')."(title,content,offset_sudu,child_imp,child_imp_m,child_ims,child_ims_m,resort,addtime,parent_id,isshow,position,maskshow,percentage)".
        "VALUES ('$title','$content','$sudu','$child_imp','$child_imp_m','$child_ims','$child_ims_m','$resort','$addtime','$parent_id','$isshow','$position','$maskshow','$percentage')";
        $GLOBALS['db']->query($sql);
		$ci++;
     }
}
}
function handle_updatechild_image($image_files,$parent_id)
{ 
$chang = sizeof($image_files['name']);
//echo $parent_id;
//exit;
$sql = "SELECT * FROM " .$GLOBALS['ecs']->table('brand_pchild'). " WHERE parent_id='".intval($parent_id)."'"."order by id asc";
$images = $GLOBALS['db']->getAll($sql);
//var_dump($images[0]['child_imp']);
//exit;
/*初始化参数*/
$title='';
$content='';
$sudu='';
$resort='';
$child_imp='';
$child_imp_m='';
$child_ims='';
$child_ims_m='';
$orgImg='';
$thumb_url='';
$ci=0;
for($i=0;$i<$chang;$i++)
{
$path= ROOT_PATH;
$image = new cls_image();
if($image_files['error'][$i]==0){
	// echo "fff<br/>";
	if(($i+1)%2==1){
	         if ($images[$ci]['child_imp'] != '' && is_file('../' . $images[$ci]['child_imp']))
             {
               @unlink('../' . $images[$ci]['child_imp']);
             }
             if ($images[$ci]['child_imp_m'] != '' && is_file('../' . $images[$ci]['child_imp_m']))
             {
              @unlink('../' . $images[$ci]['child_imp_m']);
             }
    }
	else{
		
		  if ($images[$ci]['child_ims'] != '' && is_file('../' . $images[$ci]['child_ims']))
             {
               @unlink('../' . $images[$ci]['child_ims']);
             }
             if ($images[$ci]['child_ims_m'] != '' && is_file('../' . $images[$ci]['child_ims_m']))
             {
              @unlink('../' . $images[$ci]['child_ims_m']);
             }
	}

   $filename =$image->random_filename() . substr($image_files['name'][$i], strpos($image_files['name'][$i], '.'));

   $thumb_url = $image->make_thumb($image_files['tmp_name'][$i],100,50,$path.DATA_DIR . "/pinpai/");  
   $thumb_url = DATA_DIR . "/pinpai/".is_string($thumb_url) ? $thumb_url : '';
   
//原图保r存
   $orgImg=DATA_DIR . "/pinpai/".$filename;
   
   if(($i+1)%2==1){
       $child_imp=$orgImg;
       $child_imp_m=$thumb_url;
   }else{
	   $child_ims=$orgImg;
       $child_ims_m=$thumb_url;
   }

//原图保存
    if (!move_upload_file($image_files['tmp_name'][$i],$path.$orgImg))
      {
		 //echo "错误";
        return false;
      }
	}
else{
		if(($i+1)%2==1){
		    $orgImg=$images[$ci]['child_imp'];
            $thumb_url=$images[$ci]['child_imp_m'];
			$child_imp=$orgImg;
            $child_imp_m=$thumb_url;
		}
		else{
			$orgImg=$images[$ci]['child_ims'];
            $thumb_url=$images[$ci]['child_ims_m'];
			$child_ims=$orgImg;
            $child_ims_m=$thumb_url;
		}
}
	
	if(($i+1)%2==1){
		$child_imp=$orgImg;
        $child_imp_m=$thumb_url;
	}
	else{
		$child_ims=$orgImg;
        $child_ims_m=$thumb_url;
		$title=isset($_POST['zj_title'][$ci])?trim($_POST['zj_title'][$ci]):'';
		$content=isset($_POST['zj_content'][$ci])?trim($_POST['zj_content'][$ci]):'';
		$sudu=isset($_POST['zj_sudu'][$ci])?trim($_POST['zj_sudu'][$ci]):'';
		$resort=isset($_POST['zj_resort'][$ci])?trim($_POST['zj_resort'][$ci]):0;
		$isshow=isset($_POST['zj_isshow'][$ci])?trim($_POST['zj_isshow'][$ci]):1;
		$position=isset($_POST['zj_position'][$ci])?trim($_POST['zj_position'][$ci]):0;
		$percentage=isset($_POST['zj_percentage'][$ci])?trim($_POST['zj_percentage'][$ci]):0;
		$maskshow=isset($_POST['zj_maskshow'][$ci])?trim($_POST['zj_maskshow'][$ci]):1;
		//$addtime=time();
		if($position==0){
			$percentage=1;
		}
		$id=$images[$ci]['id'];
		 $sql = "UPDATE " .$GLOBALS['ecs']->table('brand_pchild'). " SET ".
            "title = '$title', ".
            "content     = '$content', ".
			"offset_sudu  = '$sudu', ".
            "child_ims_m = '$child_ims_m', ".
            "child_ims  = '$child_ims', ".
             "child_imp_m  = '$child_imp_m', ".
            "child_imp  = '$child_imp', ".
			 "resort    = '$resort',".
			 "isshow  = '$isshow', ".
			"position  = '$position',".
			"maskshow  = '$maskshow',".
			"percentage  = '$percentage'".
            "WHERE id = '$id'";
        $GLOBALS['db']->query($sql);
		$ci++;
	}
}
}
function utf8sub($str,$len){  
    if($len<0){  
        return '';  
    }  
    $res = '';  
    $offset = 0;  
    $chars = 0;  
    $count = 0;  
    $length = strlen($str);//待截取字符串的字节数  
    while($chars<$len && $offset<$length){  
        $high = decbin(ord(substr($str,$offset,1)));//先截取客串的一个字节，substr按字节进行截取  
        //重要突破，已经能够判断高位字节  
        if(strlen($high)<8){//英文字符ascii编码长度为7，通过长度小于8来判断  
            $count = 1;  
            // echo 'hello,I am in','<br>';  
        }elseif (substr($high,0,3) == '110') {  
            $count = 2; //取两个字节的长度  
        }elseif (substr($high,0,4) == '1110') {  
            $count = 3; //取三个字节的长度  
        }elseif (substr($high,0,5) == '11110') {  
            $count = 4;  
  
        }elseif (substr($high,0,6) == '111110') {  
            $count = 5;  
        }elseif(substr($high,0,7)=='1111110'){  
            $count = 6;  
        }  
        $res .= substr($str,$offset,$count);  
        $chars +=1;  
        $offset += $count;  
    }  
  
    return $res;  
}  

?>