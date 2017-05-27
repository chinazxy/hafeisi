<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');

  require_once(ROOT_PATH . 'includes/cls_image.php');
if ($_REQUEST['act'] == 'list')
{

       $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 0;

    $smarty->assign('ur_here',    '商品管理');
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
    $smarty->display('goods_p.htm');
}elseif ($_REQUEST['act'] == 'insert')
{
	$title=isset($_POST['title'])?trim($_POST['title']):"";
	$content=isset($_POST['content'])?trim($_POST['content']):"";
    $sudu=isset($_POST['sudu'])?trim($_POST['sudu']):"";
	//$isshow=isset($_POST['isshow'])?intval($_POST['isshow']):1;
    $ogv=isset($_POST['ogv'])?trim($_POST['ogv']):"";
	$isshow=isset($_POST['isshow'])?trim($_POST['isshow']):'';
	$position=isset($_POST['position'])?trim($_POST['position']):'';
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
    admin_log($_POST['ad_name'], 'add', 'goods_p');

    clear_cache_files(); // 清除缓存文件
//exit;
    /* 提示信息 */

    $link[1]['text'] = "返回列表";
    $link[1]['href'] = 'goods_p.php?act=list';

    $link[2]['text'] = "继续添加";
    $link[2]['href'] = 'goods_p.php?act=add';
    sys_msg($_LANG['add'] . "&nbsp;" .$_POST['title'] . "&nbsp;" .'添加成功',0, $link);
	

}elseif ($_REQUEST['act'] == 'edit')
{


    $spe=get_goods_properties($_REQUEST['id']);

	$sqll = "SELECT * FROM " .$ecs->table('goods_color_img'). " WHERE relative_id='".intval($_REQUEST['id'])."'"."order by id asc";
    $child = $db->getAll($sqll);
   
    $smarty->assign('ur_here',       "商品修改");
    $smarty->assign('action_link',   array('href' => 'goods_p.php?act=list', 'text' =>'商品列表'));
    $smarty->assign('form_act',      'update');
	    $smarty->assign('spe',     $spe['spe']);
    $smarty->assign('action',        'edit');
	
	$smarty->assign("ids",$_REQUEST['id']);

	$smarty->assign('child',           $child);
    assign_query_info();
    $smarty->display('goods_p.htm');
}


//对数据进行更新和修改
elseif ($_REQUEST['act'] == 'update')
{
  
    $id=trim($_POST['id']);

	//$title=isset($_POST['title'])?trim($_POST['title']):"";
	
         if($_POST['zj_ttitle'][0]!=''){
         handle_childjia_image($_FILES['zj_tfile'],$id);
		 }
		 handle_updatechild_image($_FILES['zj_file'],$id);
   /* 记录管理员操作 */
   admin_log($_POST['ad_name'], 'edit', 'brand_p');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回列表', 'href' => 'goods.php?act=list');
   sys_msg($_LANG['edit'] .' '.$_POST['title'].' '. '修改成功!', 0, $href);

   
   
   
}elseif ($_REQUEST['act'] == 'remove')
{
  
    $id = intval($_REQUEST['id']);
	$sql="SELECT * FROM ".$ecs->table('brand_p')." where id=".$id;
    $image=$db->getRow($sql); 
	
	$sqll="SELECT * FROM ".$ecs->table('brand_pchild')." where parent_id=".$id;//子集
    $result=$db->query($sqll); 
	while($child = mysql_fetch_assoc($result)){//解析结果集并遍历使其删除图片
		
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
}/*elseif($_REQUEST['act']=="deleteimg"){

 $id=$_GET['id'];
 $state='';//初始化使其全局

 $sqll="SELECT * FROM ".$ecs->table('goods_color_img')." where id=".$id;

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
  $links[0]['href']    = 'goods_p.php?act=edit&id='.$id;
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回";
  $links[0]['href']    = 'goods_p.php?act=edit&id='.$id;
  sys_msg("图片删除失败", 0, $links);
  }
}*/
elseif($_REQUEST['act']=="delet"){
	 $id=trim($_GET['id']);
	 //echo $id;
	 //exit;
	 $sql= "SELECT * FROM " .$ecs->table('goods_color_img'). " WHERE id='".intval($id)."'";
   
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
	$sql="DELETE  FROM  ".$ecs->table('goods_color_img'). " where id=$id";

    $state=$db->query($sql);
if($state){
		
	 $links[0]['text']    ="返回";
     $links[0]['href']    = 'goods_p.php?act=edit&id='.$image['relative_id'];
     sys_msg("数据删除成功", 0, $links);
 }else{
     $links[0]['text']    ="返回";
     $links[0]['href']    = 'goods_p.php?act=edit&id='.$image['relative_id'];
     sys_msg("数据删除失败", 0, $links);
     }	 
}
elseif($_REQUEST['act']=="deleteimgz"){

 $id=$_GET['id'];
 $state='';//初始化使其全局

 $sqll="SELECT * FROM ".$ecs->table('goods_color_img')." where id=".$id;

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
	$sql="Update  ".$ecs->table('goods_color_img')." SET child_imp='',child_imp_m='' where id=".$id;

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
	$sql="Update  ".$ecs->table('goods_color_img')." SET child_ims='',child_ims_m='' where id=".$id;

    $state=$db->query($sql);
}
clear_cache_files(); // 清除模版缓存
if($state){
 $links[0]['text']    ="返回";
  $links[0]['href']    = 'goods_p.php?act=edit&id='.$child['relative_id'];
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回";
  $links[0]['href']    = 'goods_p.php?act=edit&id='.$child['relative_id'];
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

function get_goods_properties($goods_id)
{
    /* 对属性进行重新排序和分组 */
    $sql = "SELECT attr_group ".
            "FROM " . $GLOBALS['ecs']->table('goods_type') . " AS gt, " . $GLOBALS['ecs']->table('goods') . " AS g ".
            "WHERE g.goods_id='$goods_id' AND gt.cat_id=g.goods_type";
    $grp = $GLOBALS['db']->getOne($sql);

    if (!empty($grp))
    {
        $groups = explode("\n", strtr($grp, "\r", ''));
    }

    /* 获得商品的规格 */
    $sql = "SELECT a.attr_id, a.attr_name,g.color,g.attr_org,g.attr_thumb,g.attr_thumps, a.attr_group, a.is_linked, a.attr_type, ".
                "g.goods_attr_id, g.attr_value, g.attr_price " .
            'FROM ' . $GLOBALS['ecs']->table('goods_attr') . ' AS g ' .
            'LEFT JOIN ' . $GLOBALS['ecs']->table('attribute') . ' AS a ON a.attr_id = g.attr_id ' .
            "WHERE g.goods_id = '$goods_id' " .
            'ORDER BY a.sort_order, g.attr_price, g.goods_attr_id';
    $res = $GLOBALS['db']->getAll($sql);

    $arr['pro'] = array();     // 属性
    $arr['spe'] = array();     // 规格
    $arr['lnk'] = array();     // 关联的属性

    foreach ($res AS $row)
    {
        $row['attr_value'] = str_replace("\n", '<br />', $row['attr_value']);

        if ($row['attr_type'] == 0)
        {
            $group = (isset($groups[$row['attr_group']])) ? $groups[$row['attr_group']] : $GLOBALS['_LANG']['goods_attr'];

            $arr['pro'][$group][$row['attr_id']]['name']  = $row['attr_name'];
            $arr['pro'][$group][$row['attr_id']]['value'] = $row['attr_value'];
        }
        else
        {
            $arr['spe'][$row['attr_id']]['attr_type'] = $row['attr_type'];
            $arr['spe'][$row['attr_id']]['name']     = $row['attr_name'];
            $arr['spe'][$row['attr_id']]['values'][] = array(
                                                        'label'        => $row['attr_value'],
                                                        'price'        => $row['attr_price'],
														 'color'        => $row['color'],
														  'attr_org'        => $row['attr_org'],
														  'attr_thumb'=>$row['attr_thumb'],
														    'attr_thumps'=>$row['attr_thumps'],
                                                        'format_price' => price_format(abs($row['attr_price']), false),
                                                        'id'           => $row['goods_attr_id']);
        }

        if ($row['is_linked'] == 1)
        {
            /* 如果该属性需要关联，先保存下来 */
            $arr['lnk'][$row['attr_id']]['name']  = $row['attr_name'];
            $arr['lnk'][$row['attr_id']]['value'] = $row['attr_value'];
        }
    }

    return $arr;
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
		$color_id=$_POST['zj_ccolor'][$ci];
		$resort=isset($_POST['zj_resort'][$ci])?trim($_POST['zj_resort'][$ci]):'';
		$isshow=isset($_POST['zj_isshow'][$ci])?trim($_POST['zj_isshow'][$ci]):"";

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

$resort='';
$child_imp='';
$child_imp_m='';
$child_ims='';
$child_ims_m='';
$orgImg='';
$thumb_url='';
$ci=0;
$path= ROOT_PATH;
$image = new cls_image();
for($i=0;$i<$chang;$i++)
{
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
			$color_id=$_POST['zj_ccolor'][$ci];
		$resort=isset($_POST['zj_tresort'][$ci])?trim($_POST['zj_tresort'][$ci]):'';
		
	
		$sql = "INSERT INTO ".$GLOBALS['ecs']->table('goods_color_img')."(id,title,child_imp,child_imp_m,child_ims,child_ims_m,resort,color_id,relative_id)".
        "VALUES (NULL,'$title','$child_imp','$child_imp_m','$child_ims','$child_ims_m','$resort','$color_id','$parent_id')";
        $GLOBALS['db']->query($sql);
		$ci++;
     }
}

}
function handle_updatechild_image($image_files,$parent_id)
{ 
$chang = sizeof($image_files['name']);

$sql = "SELECT * FROM " .$GLOBALS['ecs']->table('goods_color_img'). " WHERE relative_id='".intval($parent_id)."'"."order by id asc";
$images = $GLOBALS['db']->getAll($sql);

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
$path= ROOT_PATH;
$image = new cls_image();
for($i=0;$i<$chang;$i++)
{
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

   $thumb_url = $image->make_thumb($image_files['tmp_name'][$i],100,50,$path.DATA_DIR . "/pinpai/");  //压缩图路径
   $thumb_url = DATA_DIR . "/pinpai/".is_string($thumb_url) ? $thumb_url : '';
   
//原图保url存
   $orgImg=DATA_DIR . "/pinpai/".$filename;
   
   if(($i+1)%2==1){//有上传图片第一次赋值
       $child_imp=$orgImg;
       $child_imp_m=$thumb_url;
   }else{//有上传图片第二次
	   $child_ims=$orgImg;
       $child_ims_m=$thumb_url;
   }

//原图保存
    if (!move_upload_file($image_files['tmp_name'][$i],$path.$orgImg))
      {

        return false;
      }
	}
else{
		if(($i+1)%2==1){//没上传图片第一次赋值为空
		    $orgImg=$images[$ci]['child_imp'];
            $thumb_url=$images[$ci]['child_imp_m'];
			$child_imp=$orgImg;
            $child_imp_m=$thumb_url;
		}
		else{//没上传图片第二次
			$orgImg=$images[$ci]['child_ims'];
            $thumb_url=$images[$ci]['child_ims_m'];
			$child_ims=$orgImg;
            $child_ims_m=$thumb_url;
		}
}
		if(($i+1)%2!=1){
		$title=isset($_POST['zj_title'][$ci])?trim($_POST['zj_title'][$ci]):'';
		$zj_color=isset($_POST['zj_color'][$ci])?trim($_POST['zj_color'][$ci]):'';
		$resort=isset($_POST['zj_resort'][$ci])?trim($_POST['zj_resort'][$ci]):0;
         $id=$images[$ci]['id'];
		 $sql = "UPDATE " .$GLOBALS['ecs']->table('goods_color_img'). " SET ".
            "title = '$title', ".
            "child_ims_m = '$child_ims_m', ".
            "child_ims  = '$child_ims', ".
             "child_imp_m  = '$child_imp_m', ".
            "child_imp  = '$child_imp', ".
			"color_id  = '$zj_color', ".
		    "relative_id  = '$parent_id', ".
			 "resort    = '$resort'".
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