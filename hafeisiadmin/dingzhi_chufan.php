<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');

  require_once(ROOT_PATH . 'includes/cls_image.php');
  require_once(ROOT_PATH . 'data/config.php');
if ($_REQUEST['act'] == 'list')
{

       $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 0;

    $smarty->assign('ur_here',    '镜盒管理');
    $smarty->assign('action_link', array('text' =>'镜盒添加', 'href' => 'dingzhi_chufan.php?act=add'));
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
	 
    $smarty->display('dingzhi_chufan_list.htm');
}elseif($_REQUEST['act'] == 'add'){
	admin_priv('dingzhi_chufan');
	//exit;
    $sql="select * from ".$GLOBALS['ecs']->table('dingzhi_chufan_child')." order by value asc";
	$result=$GLOBALS['db']->getAll($sql);
	 $smarty->assign('result',        $result);
    $smarty->assign('action',        'add');
	$smarty->assign('form_act', 'update');
    $smarty->display('dingzhi_chufan.htm');
}elseif ($_REQUEST['act'] == 'insert')
{
	admin_priv('dingzhi_chufan');
	$parent_id=intval($_GET['parent_id']);
    $value=trim($_GET['value']);
//var_dump($value);
//exit;
/*$parent_id=intval($_GET['parent_id']);
	//exit;
    //$value=trim($_GET['value']);
	$sql="INSERT INTO ".$GLOBALS['ecs']->table('dingzhi_chufan_child')."(parent_id,value)". "VALUES ";
	$sql1='';
    for($i=25.0;$i<=45.0;$i=$i+0.5){
	 $sql1 = $sql1."('$parent_id','$i'),";		
	}
	$sql=$sql.substr($sql1,0,strlen($sql1)-1);
	echo $sql;*/
	 $sql = "INSERT INTO ".$GLOBALS['ecs']->table('dingzhi_chufan_child')."(parent_id,value)".
            "VALUES ('$parent_id','$value')";
			$GLOBALS['db']->query($sql);
    /* 记录管理员操作 */
    admin_log($_POST['ad_name'], 'add', 'dingzhi_chufan');

    clear_cache_files(); // 清除缓存文件
//exit;
    /* 提示信息 */

  $url = 'dingzhi_chufan.php?act=add';

    ecs_header("Location: $url\n");
   //$href[] = array('text' => '返回列表', 'href' => 'dingzhi_chufan.php?act=add');
  // sys_msg($_LANG['edit'] .' '.$_POST['title'].' '. '添加成功!', 0, $href);
	

}elseif ($_REQUEST['act'] == 'edit')
{



	$smarty->assign('ads_arr',      $ads_arr);
    //$smarty->assign('ur_here',       "镜盒修改");
   // $smarty->assign('action_link',   array('href' => 'dingzhi_chufan.php?act=list', 'text' =>'镜盒管理列表'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
	$smarty->assign('child',           $child);
    assign_query_info();
    $smarty->display('dingzhi_chufan.htm');
}


//对数据进行更新和修改
elseif ($_REQUEST['act'] == 'update')
{
	admin_priv('dingzhi_chufan');
    $value=$_POST['value'];
   //$id=intval(trim($_POST['id']));
    $sql1="UPDATE ".$ecs->table('dingzhi_chufan_child')." SET value = CASE id";
	$sql2='';
	$sql3=" END WHERE id IN (";
    foreach($value as $k=>$v){
    $k=intval($k);
	$val=(double)trim($v);
	//if($k==2||$k==3){
		$sql2=$sql2." WHEN ".$k." THEN ".$val;
	//$sql=$sql."Update ".$ecs->table('dingzhi_chufan_child')." SET value='{$val}' where id='".$k."';";   
	    $sql3=$sql3.$k.",";
	//" WHEN 1 THEN 3 WHEN 2 THEN 4 WHEN 3 THEN 5 END WHERE id IN (1,2,3)";
	//}	
	}
	$sql3=substr($sql3,0,strlen($sql3)-1);
	$sql=$sql1.$sql2.$sql3;
    $sql=$sql.")";
	//echo $sql;
	//exit;
	
	//echo $sql;
	//$link = mysql_connect("localhost","root","")or die("不能连接到数据库服务器".mysql_error());
	//mysql_select_db("xbll",$link);
    $a=$db->query($sql);
	//$a=mysql_query($sql,$link);
	//var_dump($a);
	//exit;
   /* 记录管理员操作 */
   admin_log($_POST['ad_name'], 'edit', 'dingzhi_chufan');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回列表', 'href' => 'dingzhi_chufan.php?act=add');
   sys_msg($_LANG['edit'] .' '.$_POST['title'].' '. '修改成功!', 0, $href);

   
   
   
}
elseif ($_REQUEST['act'] == 'genxin')
{
	admin_priv('dingzhi_chufan');
   $id=intval(trim($_GET['id']));
   $value=trim($_GET['value']);

	$sql="Update  ".$ecs->table('dingzhi_chufan_child')." SET value='{$value}' where id=".$id;

        $db->query($sql);
	//var_dump($a);
	//exit;
   /* 记录管理员操作 */
   admin_log($_POST['ad_name'], 'edit', 'dingzhi_chufan');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回列表', 'href' => 'dingzhi_chufan.php?act=add');
   sys_msg($_LANG['edit'] .' '.$_POST['title'].' '. '更新成功!', 0, $href);
 
}
elseif ($_REQUEST['act'] == 'remove')
{
  
    $id = intval($_REQUEST['id']);
	$sql="SELECT * FROM ".$ecs->table('dingzhi_chufan')." where id=".$id;
    $image=$db->getRow($sql); 
	
	$sqll="SELECT * FROM ".$ecs->table('dingzhi_chufan_child')." where parent_id=".$id;//子集
    $result=$db->query($sqll); 
	while($child = mysql_fetch_assoc($result)){//解析结果集并遍历
		
	   removeALLimage('image','image_m',$child);
	   removeALLimage('s_image','s_image_m',$child);
		
    }
	 removeALLimage('image','image_m',$image);
    $sql="DELETE  FROM  ".$ecs->table('dingzhi_chufan'). " where id=$id";

    $state=$db->query($sql);
	$sql="DELETE  FROM  ".$ecs->table('dingzhi_chufan_child'). " where parent_id=$id";

    $state=$db->query($sql);

  $url = 'dingzhi_chufan.php?act=query&' . str_replace('act=remove', '', $_SERVER['QUERY_STRING']);

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

    make_json_result($smarty->fetch('dingzhi_chufan_list.htm'), '',
        array('filter' => $ads_list['filter'], 'page_count' => $ads_list['page_count']));
}elseif($_REQUEST['act']=="deleteimg"){

 $id=$_GET['id'];
 $state='';//初始化使其全局
 $sql="SELECT * FROM ".$ecs->table('dingzhi_chufan')." where id=".$id;
 
 $image=$db->getRow($sql); 
 
 $sqll="SELECT * FROM ".$ecs->table('dingzhi_chufanchild')." where parent_id=".$id;

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
	$sql="Update  ".$ecs->table('dingzhi_chufan')." SET bkimage_p='',bkimage_p_m='' where id=".$id;

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
	$sql="Update  ".$ecs->table('dingzhi_chufan')." SET bkimage_s='',bkimage_s_m='' where id=".$id;

    $state=$db->query($sql);
}

 if($_GET['din']=='tp'){//判断是否电脑弹窗图
    if ($image['tanchuan_p'] != '' && is_file('../' . $image['tanchuan_p']))
    {
        @unlink('../' . $image['tanchuan_p']);
    }
    if ($image['tanchuan_p_m'] != '' && is_file('../' . $image['tanchuan_p_m']))
    {
        @unlink('../' . $image['tanchuan_p_m']);
    }
	$sql="Update  ".$ecs->table('dingzhi_chufan')." SET tanchuan_p='',tanchuan_p_m='' where id=".$id;

    $state=$db->query($sql);
}
 if($_GET['din']=='ts'){//判断是否电脑
    if ($image['tanchuan_s'] != '' && is_file('../' . $image['tanchuan_s']))
    {
        @unlink('../' . $image['tanchuan_s']);
    }
    if ($image['tanchuan_s_m'] != '' && is_file('../' . $image['tanchuan_s_m']))
    {
        @unlink('../' . $image['tanchuan_s_m']);
    }
	$sql="Update  ".$ecs->table('dingzhi_chufan')." SET tanchuan_s='',tanchuan_s_m='' where id=".$id;

    $state=$db->query($sql);
}

if($state){
 $links[0]['text']    ="返回";
  $links[0]['href']    = 'dingzhi_chufan.php?act=edit&id='.$id;
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回";
  $links[0]['href']    = 'dingzhi_chufan.php?act=edit&id='.$id;
  sys_msg("图片删除失败", 0, $links);
  }
}
elseif($_REQUEST['act']=="delet"){
	 $id=intval(trim($_GET['id']));
	
	
	$sql="DELETE  FROM  ".$ecs->table('dingzhi_chufan_child'). " where id=$id";

    $state=$db->query($sql);
if($state){
		
	 $links[0]['text']    ="返回";
     $links[0]['href']    = 'dingzhi_chufan.php?act=add';
     sys_msg("数据删除成功", 0, $links);
 }else{
     $links[0]['text']    ="返回";
     $links[0]['href']    = 'dingzhi_chufan.php?act=add';
     sys_msg("数据删除失败", 0, $links);
     }	
	 
	 
}
elseif($_REQUEST['act']=="deleteimgz"){

 $id=intval($_GET['id']);
 
 $state='';//初始化使其全局
 $tiao_id='';
 
if($_GET['din']=='c'){
	 
	 $sqll="SELECT * FROM ".$ecs->table('dingzhi_chufan_child')." where id=".$id;

     $child=$db->getRow($sqll);
	  $tiao_id=$child['parent_id'];
     $state=removeImages('image','image_m','dingzhi_chufan_child',$id,$child);//删除图片并使数据库内的路径=NULL
}
else if($_GET['din']=='p'){
	
	
	 $sqll="SELECT * FROM ".$ecs->table('dingzhi_chufan')." where id=".$id;

     $result=$db->getRow($sqll);
	 $tiao_id=$result['id'];
     $state=removeImages('image','image_m','dingzhi_chufan',$id,$result);//删除图片并使数据库内的路径=NULL
}else{
	
	 $sqll="SELECT * FROM ".$ecs->table('dingzhi_chufan_child')." where id=".$id;

     $child=$db->getRow($sqll);
	  $tiao_id=$child['parent_id'];
     $state=removeImages('s_image','s_image_m','dingzhi_chufan_child',$id,$child);//删除图片并使数据库内的路径=NULL
}
 
	//$sql="Update  ".$ecs->table('dingzhi_chufan_child')." SET child_ims='',child_ims_m='' where id=".$id;

    //$state=$db->query($sql);

clear_cache_files(); // 清除模版缓存
if($state){
 $links[0]['text']    ="返回";
  $links[0]['href']    = 'dingzhi_chufan.php?act=edit&id='.$tiao_id;
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回";
  $links[0]['href']    = 'dingzhi_chufan.php?act=edit&id='.$tiao_id;
  sys_msg("图片删除失败", 0, $links);
  }
}elseif ($_REQUEST['act'] == 'chushihua')
{
  //var_dump($_POST);
  // exit;
  $number=$_POST['number'];
   $operation=$_POST['operation'];
   $end=$_POST['end'];
  foreach($_POST['start'] as $k=>$v){
	  
	   $sql = "UPDATE " .$GLOBALS['ecs']->table('dingzhi_chufan'). " SET ".
            "start = '$v', ".
            "number     = '$number[$k]', ".
			"operation  = '$operation[$k]',".
			"end  = '$end[$k]'".
			
            "WHERE id = '$k'";		
     $GLOBALS['db']->query($sql);
	   if($operation[$k]==1){  
	     while($start[$k]<=$end[$k]){
			 $sql = "INSERT INTO ".$GLOBALS['ecs']->table('dingzhi_chufan_child')."(id,value,parent_id)".
            "VALUES (null,'$start[$k]','$k')";
			$GLOBALS['db']->query($sql);
	        $start[$k]=$start[$k]+$number[$k];   
         }
	   }else{
		  while($start[$k]>=$end[$k]){
	   	   $sql = "INSERT INTO ".$GLOBALS['ecs']->table('dingzhi_chufan_child')."(id,value,parent_id)".
            "VALUES (null,'$start[$k]','$k')";
			$GLOBALS['db']->query($sql);
	       $start[$k]=$start[$k]-$number[$k];
         }
		   
	   }
  }
   
  $url = 'dingzhi_chufan.php?act=add';

    ecs_header("Location: $url\n");
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
    $sql = 'SELECT COUNT(*) FROM ' .$GLOBALS['ecs']->table('dingzhi_chufan'). ' AS ad ' . $where;
    $filter['record_count'] = $GLOBALS['db']->getOne($sql);

    $filter = page_and_size($filter);
	


    /* 获得广告数据 */
    $arr = array();
    $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('dingzhi_chufan'). 'AS ad ' .
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
		$sql = "INSERT INTO ".$GLOBALS['ecs']->table('dingzhi_chufanchild')."(title,content,offset_sudu,child_imp,child_imp_m,child_ims,child_ims_m,resort,addtime,parent_id,isshow,position,maskshow,percentage)".
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
		$sql = "INSERT INTO ".$GLOBALS['ecs']->table('dingzhi_chufanchild')."(title,content,offset_sudu,child_imp,child_imp_m,child_ims,child_ims_m,resort,addtime,parent_id,isshow,position,maskshow,percentage)".
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
$sql = "SELECT * FROM " .$GLOBALS['ecs']->table('dingzhi_chufanchild'). " WHERE parent_id='".intval($parent_id)."'"."order by id asc";
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
		 $sql = "UPDATE " .$GLOBALS['ecs']->table('dingzhi_chufanchild'). " SET ".
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
function handle_upload_image($image_files)
{ 
$array=array();


$path= ROOT_PATH;
$image = new cls_image();

if($image_files['error']==0){
$filename =$image->random_filename() . substr($image_files['name'], strpos($image_files['name'], '.'));

$thumb_url = $image->make_thumb($image_files['tmp_name'],100,50,$path.DATA_DIR . "/dingzhi_pack/");  
$thumb_url = DATA_DIR . "/dingzhi_pack/".is_string($thumb_url) ? $thumb_url : '';
//原图保r存
$orgImg=DATA_DIR . "/dingzhi_pack/".$filename;
$orgImg=trim($orgImg);
$thumb_url=trim($thumb_url);
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
function ecs_reup_image($yuantu,$suolue,$image,$file){//图片更新
    $result=array();
   if($file['name']){//有的话先删除旧图
		
       if ($image[$yuantu] != '' && is_file('../' . $image[$yuantu]))
        {
        @unlink('../' . $image[$yuantu]);
        }
       if ($image[$suolue] != '' && is_file('../' . $image[$suolue]))
       {
        @unlink('../' . $image[$suolue]);
       }
	   $imageinfo=handle_upload_image($file);//传递新图
	   $result['orgImg']=   $imageinfo['orgImg'];
	   $result['thumb_url']=   $imageinfo['thumb_url'];
	}
	else{//没有的话执行原来sql中的数据插回原表先当与没有更新图片
		
		$result['orgImg']=$image[$yuantu];
	    $result['thumb_url']=$image[$suolue];
	}
	return $result;
}
function ecs_reup_image_more($file,$yuantu,$suolue,$image,$key){//批量图片更新
    $result=array();
   if($file['error'][$key]==0){//有的话先删除旧图
		
       if ($image[$yuantu] != '' && is_file('../' . $image[$yuantu]))
        {
        @unlink('../' . $image[$yuantu]);
        }
       if ($image[$suolue] != '' && is_file('../' . $image[$suolue]))
       {
        @unlink('../' . $image[$suolue]);
       }
	   $imageinfo=handle_more_upload_image($file,$key);//传递新图
	   $result['orgImg']=   $imageinfo['orgImg'];
	   $result['thumb_url']=   $imageinfo['thumb_url'];
	}
	else{//没有的话执行原来sql中的数据插回原表相当与没有更新图片
		
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
     if ($image[$yuantu] != '' && is_file('../'.$image[$yuantu]))
    {
        @unlink('../'.$image[$yuantu]);
    }
    if ($image[$suolue] != '' && is_file('../'.$image[$suolue]))
    {
        @unlink('../'.$image[$suolue]);
    }
	return true;
}
function handle_more_upload_image($image_files,$key)
{ 
$array=array();


$path= ROOT_PATH;
$image = new cls_image();

if($image_files['error'][$key]==0){
$filename =$image->random_filename() . substr($image_files['name'][$key], strpos($image_files['name'][$key], '.'));

$thumb_url = $image->make_thumb($image_files['tmp_name'][$key],100,50,$path.DATA_DIR . "/dingzhi_pack/");  
$thumb_url = DATA_DIR . "/dingzhi_pack/".is_string($thumb_url) ? $thumb_url : '';
//原图保r存
$orgImg=DATA_DIR . "/dingzhi_pack/".$filename;
$orgImg=trim($orgImg);
$thumb_url=trim($thumb_url);
$array['thumb_url']=$thumb_url;
$array['orgImg']=$orgImg;


//原图保存
if (!move_upload_file($image_files['tmp_name'][$key],$path.$orgImg))
    {
        return false;
    }
}

return $array;




}

?>