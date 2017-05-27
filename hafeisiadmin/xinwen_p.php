<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');

  require_once(ROOT_PATH . 'includes/cls_image.php');
if ($_REQUEST['act'] == 'list')
{

       $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 0;

    $smarty->assign('ur_here',    '新闻管理');
    $smarty->assign('action_link', array('text' =>'新闻添加', 'href' => 'xinwen_p.php?act=add'));
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
	 
    $smarty->display('xinwen_p_list.htm');
}elseif($_REQUEST['act'] == 'add'){


    $smarty->assign('action',        'add');
	$smarty->assign('form_act', 'insert');
    $smarty->display('xinwen_p.htm');
}elseif ($_REQUEST['act'] == 'insert')
{
	$title=isset($_POST['title'])?trim($_POST['title']):"";
	$content=isset($_POST['content'])?trim($_POST['content']):"";
    $ogv=isset($_POST['ogv'])?trim($_POST['ogv']):0;
	$sim_show=isset($_POST['sim_show'])?trim($_POST['sim_show']):1;
	$sim_position=isset($_POST['sim_position'])?trim($_POST['sim_position']):0;
 
	$content_position=isset($_POST['content_position'])?trim($_POST['content_position']):0;
	//$content_backcolor=isset($_POST['content_backcolor'])?trim($_POST['content_backcolor']):'';
	
	$imageinfo=handle_ad_image($_FILES['small_file']);
	 $small_im=   $imageinfo['orgImg'];
	$small_im_m=   $imageinfo['thumb_url'];
	$imageinfo=handle_ad_image($_FILES['big_file']);
	 $big_im=   $imageinfo['orgImg'];
	$big_im_m=   $imageinfo['thumb_url'];
	
	
	$addtime=time();

	//exit;
    
	$sql = "INSERT INTO ".$GLOBALS['ecs']->table('xinwen_p')."(title,content,small_im,small_im_m,big_im,big_im_m,resort,addtime,sim_show,sim_position,content_position)".
            "VALUES ('$title','$content','$small_im','$small_im_m','$big_im','$big_im_m','$ogv','$addtime','$sim_show','$sim_position','$content_position')";
	
    $GLOBALS['db']->query($sql);
	
	
	 //$bsql = 'SELECT * FROM '.$ecs->table('xinwen_p').'order by id desc limit 1';
	 //$parent= $db->getRow($bsql);
	
	//handle_child_image($_FILES['zj_file'],$parent['id']);
	
//}
    /* 记录管理员操作 */
    admin_log($_POST['ad_name'], 'add', 'xinwen_p');

    clear_cache_files(); // 清除缓存文件
//exit;
    /* 提示信息 */

    $link[1]['text'] = "返回列表";
    $link[1]['href'] = 'xinwen_p.php?act=list';

    $link[2]['text'] = "继续添加";
    $link[2]['href'] = 'xinwen_p.php?act=add';
    sys_msg($_LANG['add'] . "&nbsp;" .$_POST['title'] . "&nbsp;" .'添加成功',0, $link);
	

}elseif ($_REQUEST['act'] == 'edit')
{



    $sql = "SELECT * FROM " .$ecs->table('xinwen_p'). " WHERE id='".intval($_REQUEST['id'])."'";
    $ads_arr = $db->getRow($sql);
	
    $ads_arr['title'] = htmlspecialchars($ads_arr['title']);
	//print_r($child);

	
	
    $smarty->assign('ur_here',       "新闻修改");
    $smarty->assign('action_link',   array('href' => 'xinwen_p.php?act=list', 'text' =>'新闻列表'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
    $smarty->assign('ads',           $ads_arr);

    assign_query_info();
    $smarty->display('xinwen_p.htm');
}


//对数据进行更新和修改
elseif ($_REQUEST['act'] == 'update')
{
  
    $id=trim($_POST['id']);

	$title=isset($_POST['title'])?trim($_POST['title']):"";
	$content=isset($_POST['content'])?trim($_POST['content']):"";
    $ogv=isset($_POST['ogv'])?trim($_POST['ogv']):0;
	$sim_show=isset($_POST['sim_show'])?trim($_POST['sim_show']):1;
	$sim_position=isset($_POST['sim_position'])?trim($_POST['sim_position']):0;
 
	$content_position=isset($_POST['content_position'])?trim($_POST['content_position']):0;
	//$content_backcolor=isset($_POST['content_backcolor'])?trim($_POST['content_backcolor']):'';
	
	
	
    $sql = "SELECT * FROM " .$ecs->table('xinwen_p'). " WHERE id='".intval($_REQUEST['id'])."'";
     $image = $db->getRow($sql);
	/*if (empty($_FILES['file']['error']) || (!isset($_FILES['file']['error']) && isset($_FILES['file']['tmp_name']) && $_FILES['file']['tmp_name'] != 'none'))
     {*/
	 
	 
	 $small_im= '';
	$small_im_m= '';
	 $big_im= ''; 
	$big_im_m= '';
	  //exit;
	if($_FILES['small_file']['name']){//判断是否有替换图片
		if ($image['small_im'] != '' && is_file('../' . $image['small_im']))
       {
        @unlink('../' . $image['small_im']);
       }
       if ($image['small_im_m'] != '' && is_file('../' . $image['small_im_m']))
       {
        @unlink('../' . $image['small_im_m']);
       }
	   	$imageinfo=handle_ad_image($_FILES['small_file']);
	 $small_im=   $imageinfo['orgImg'];
	$small_im_m=   $imageinfo['thumb_url'];
	}else{
		
		$small_im=$image['small_im'];
	    $small_im_m=$image['small_im_m'];
	}
	
	if($_FILES['big_file']['name']){
		//exit;
       if ($image['big_im'] != '' && is_file('../' . $image['big_im']))
        {
        @unlink('../' . $image['big_im']);
        }
       if ($image['big_im_m'] != '' && is_file('../' . $image['big_im_m']))
       {
        @unlink('../' . $image['big_im_m']);
       }
	   $imageinfo=handle_ad_image($_FILES['big_file']);
	   $big_im=   $imageinfo['orgImg'];
	   $big_im_m=   $imageinfo['thumb_url'];
	}
	else{
		
		$big_im=$image['big_im'];
	    $big_im_m=$image['big_im_m'];
	}
	
		    $sql = "UPDATE " .$GLOBALS['ecs']->table('xinwen_p'). " SET ".
            "title = '$title', ".
            "content     = '$content', ".
            "small_im_m = '$small_im_m', ".
            "small_im  = '$small_im', ".
             "big_im_m  = '$big_im_m', ".
            "big_im  = '$big_im', ".
			 "resort    = '$ogv',".
			 "sim_show  = '$sim_show', ".
			"sim_position  = '$sim_position',".
			"content_position  = '$content_position'".
			
            "WHERE id = '$id'";		
     $GLOBALS['db']->query($sql);

   /* 记录管理员操作 */
   admin_log($_POST['ad_name'], 'edit', 'xinwen_p');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回列表', 'href' => 'xinwen_p.php?act=list');
   sys_msg($_LANG['edit'] .' '.$_POST['title'].' '. '修改成功!', 0, $href);

   
   
   
}elseif ($_REQUEST['act'] == 'remove')
{
  
    $id = intval($_REQUEST['id']);
	$sql="SELECT * FROM ".$ecs->table('xinwen_p')." where id=".$id;
    $image=$db->getRow($sql); 
	if ($image['big_im'] != '' && is_file('../' . $image['big_im']))
        {
        @unlink('../' . $image['big_im']);
        }
       if ($image['big_im_m'] != '' && is_file('../' . $image['big_im_m']))
       {
        @unlink('../' . $image['big_im_m']);
       }
	   
	   if ($image['small_im'] != '' && is_file('../' . $image['small_im']))
       {
        @unlink('../' . $image['small_im']);
       }
       if ($image['small_im_m'] != '' && is_file('../' . $image['small_im_m']))
       {
        @unlink('../' . $image['small_im_m']);
       }
	
    $sql="DELETE  FROM  ".$ecs->table('xinwen_p'). " where id=$id";

    $state=$db->query($sql);

 

  $url = 'xinwen_p.php?act=query&' . str_replace('act=remove', '', $_SERVER['QUERY_STRING']);

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

    make_json_result($smarty->fetch('xinwen_p_list.htm'), '',
        array('filter' => $ads_list['filter'], 'page_count' => $ads_list['page_count']));
}elseif($_REQUEST['act']=="deleteimg"){

 $id=$_GET['id'];
 $state='';//初始化使其全局
 $sql="SELECT * FROM ".$ecs->table('xinwen_p')." where id=".$id;

 $image=$db->getRow($sql); 

 if($_GET['din']=='s'){//判断是否电脑
    if ($image['small_im'] != '' && is_file('../' . $image['small_im']))
       {
        @unlink('../' . $image['small_im']);
       }
       if ($image['small_im_m'] != '' && is_file('../' . $image['small_im_m']))
       {
        @unlink('../' . $image['small_im_m']);
       }
	$sql="Update  ".$ecs->table('xinwen_p')." SET small_im='',small_im_m='' where id=".$id;

    $state=$db->query($sql);
}
if($_GET['din']=='b'){//判断是否手机
   if ($image['big_im'] != '' && is_file('../' . $image['big_im']))
        {
        @unlink('../' . $image['big_im']);
        }
       if ($image['big_im_m'] != '' && is_file('../' . $image['big_im_m']))
       {
        @unlink('../' . $image['big_im_m']);
       }
	$sql="Update  ".$ecs->table('xinwen_p')." SET big_im='',big_im_m='' where id=".$id;

    $state=$db->query($sql);
}

if($state){
 $links[0]['text']    ="返回";
  $links[0]['href']    = 'xinwen_p.php?act=edit&id='.$id;
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回";
  $links[0]['href']    = 'xinwen_p.php?act=edit&id='.$id;
  sys_msg("图片删除失败", 0, $links);
  }
}
elseif($_REQUEST['act']=="delet"){
	 $id=trim($_GET['id']);
	 //echo $id;
	 //exit;
	 $sql= "SELECT * FROM " .$GLOBALS['ecs']->table('xinwen_pchild'). " WHERE id='".intval($id)."'";
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
	$sql="DELETE  FROM  ".$ecs->table('xinwen_pchild'). " where id=$id";

    $state=$db->query($sql);
if($state){
		
	 $links[0]['text']    ="返回";
     $links[0]['href']    = 'xinwen_p.php?act=edit&id='.$image['parent_id'];
     sys_msg("数据删除成功", 0, $links);
 }else{
     $links[0]['text']    ="返回";
     $links[0]['href']    = 'xinwen_p.php?act=edit&id='.$image['parent_id'];
     sys_msg("数据删除失败", 0, $links);
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
    $sql = 'SELECT COUNT(*) FROM ' .$GLOBALS['ecs']->table('xinwen_p'). ' AS ad ' . $where;
    $filter['record_count'] = $GLOBALS['db']->getOne($sql);

    $filter = page_and_size($filter);
	


    /* 获得广告数据 */
    $arr = array();
    $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('xinwen_p'). 'AS ad ' .
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


$path= ROOT_PATH;
$image = new cls_image();

if($image_files['error']==0){
	//var_dump($image_files);
//exit;
$filename =$image->random_filename() . substr($image_files['name'], strpos($image_files['name'], '.'));

$thumb_url = $image->make_thumb($image_files['tmp_name'],100,50,$path.DATA_DIR . "/news/");  
$thumb_url = DATA_DIR . "/news/".is_string($thumb_url) ? $thumb_url : '';
//原图保r存
$orgImg=DATA_DIR . "/news/".$filename;

$array['orgImg']=$orgImg;
$array['thumb_url']=$thumb_url;
//原图保存
if (!move_upload_file($image_files['tmp_name'],$path.$orgImg))
    {
        return false;
    }
}


return $array;




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