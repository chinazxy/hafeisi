<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
/*导入文本编辑器*/
require_once(ROOT_PATH . "includes/fckeditor/fckeditor.php");
  require_once(ROOT_PATH . 'includes/cls_image.php');
if ($_REQUEST['act'] == 'list')
{

       $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 0;

    $smarty->assign('ur_here',    '个人中心菜单管理');
    $smarty->assign('action_link', array('text' =>'个人中心菜单添加', 'href' => 'user_person.php?act=add'));
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
	 
    $smarty->display('user_person_list.htm');
}elseif($_REQUEST['act'] == 'add'){

       /* 创建 html editor */
    create_html_editor('FCKeditor1','','806px','800px');
    $smarty->assign('action',        'add');
	$smarty->assign('form_act', 'insert');
    $smarty->display('user_person.htm');
}elseif ($_REQUEST['act'] == 'insert')
{
	$menu_title=isset($_POST['menu_title'])?trim($_POST['menu_title']):"";
	$menu_content=isset($_POST['menu_content'])?trim($_POST['menu_content']):"";
    $resort=isset($_POST['ogv'])?intval(trim($_POST['ogv'])):0;
	$menu_url=isset($_POST['menu_url'])?trim($_POST['menu_url']):"";
	$imageinfo=handle_ad_image($_FILES['file']);
	$menu_icon=   $imageinfo['orgImg'];
	//$small_im_m=   $imageinfo['thumb_url'];


	$addtime=time();

	//exit;
    
	$sql = "INSERT INTO ".$GLOBALS['ecs']->table('user_person')."(menu_title,menu_content,resort,menu_icon,menu_url,addtime)".
            "VALUES ('$menu_title','$menu_content','$resort','$menu_icon','$menu_url','$addtime')";
	
    $GLOBALS['db']->query($sql);
	
	
	 //$bsql = 'SELECT * FROM '.$ecs->table('user_person').'order by id desc limit 1';
	 //$parent= $db->getRow($bsql);
	
	//handle_child_image($_FILES['zj_file'],$parent['id']);
	
//}
    /* 记录管理员操作 */
    admin_log($_POST['ad_name'], 'add', 'user_person');

    clear_cache_files(); // 清除缓存文件
//exit;
    /* 提示信息 */

    $link[1]['text'] = "返回列表";
    $link[1]['href'] = 'user_person.php?act=list';

    $link[2]['text'] = "继续添加";
    $link[2]['href'] = 'user_person.php?act=add';
    sys_msg($_LANG['add'] . "&nbsp;" .$_POST['title'] . "&nbsp;" .'添加成功',0, $link);
	

}elseif ($_REQUEST['act'] == 'edit')
{
   


    $sql = "SELECT * FROM " .$ecs->table('user_person'). " WHERE id='".intval($_REQUEST['id'])."'";
    $ads_arr = $db->getRow($sql);
	
    $ads_arr['menu_title'] = htmlspecialchars($ads_arr['menu_title']);
	//print_r($child);

    $smarty->assign('ur_here',       "个人中心菜单修改");
    $smarty->assign('action_link',   array('href' => 'user_person.php?act=list', 'text' =>'个人中心菜单列表'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
    $smarty->assign('ads',           $ads_arr);

    assign_query_info();
    $smarty->display('user_person.htm');
}


//对数据进行更新和修改
elseif ($_REQUEST['act'] == 'update')
{
  
    $id=trim($_POST['id']);

	$menu_title=isset($_POST['menu_title'])?trim($_POST['menu_title']):"";
	$menu_content=isset($_POST['menu_content'])?trim($_POST['menu_content']):"";
    $resort=isset($_POST['ogv'])?intval(trim($_POST['ogv'])):0;
	$menu_url=isset($_POST['menu_url'])?trim($_POST['menu_url']):"";
	//$imageinfo=handle_ad_image($_FILES['file']);
	//$menu_icon=   $imageinfo['orgImg'];
	
    $sql = "SELECT * FROM " .$ecs->table('user_person'). " WHERE id='".intval($_REQUEST['id'])."'";
     $image = $db->getRow($sql);

	 
	 
	 $menu_icon= '';
	  //exit;
	if($_FILES['file']['name']){//判断是否有替换图片
		if ($image['menu_icon'] != '' && is_file('../' . $image['menu_icon']))
       {
        @unlink('../' . $image['menu_icon']);
       }
	   	$imageinfo=handle_ad_image($_FILES['file']);
	 $menu_icon= $imageinfo['orgImg'];

	}else{
		
		$menu_icon=$image['menu_icon'];
	}
	
		    $sql = "UPDATE " .$GLOBALS['ecs']->table('user_person'). " SET ".
            "menu_title = '$menu_title', ".
            "menu_content     = '$menu_content', ".
			 "resort    = '$resort',".
			 "menu_url  = '$menu_url', ".
			"menu_icon  = '$menu_icon'".
            "WHERE id = '$id'";	

		
     $GLOBALS['db']->query($sql);

   /* 记录管理员操作 */
   admin_log($_POST['ad_name'], 'edit', 'user_person');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回列表', 'href' => 'user_person.php?act=list');
   sys_msg($_LANG['edit'] .' '.$_POST['title'].' '. '修改成功!', 0, $href);

   
   
   
}elseif ($_REQUEST['act'] == 'remove')
{
  
    $id = intval($_REQUEST['id']);
	$sql="SELECT * FROM ".$ecs->table('user_person')." where id=".$id;
    $image=$db->getRow($sql); 
	if ($image['menu_icon'] != '' && is_file('../' . $image['menu_icon']))
       {
        @unlink('../' . $image['menu_icon']);
       }
	
    $sql="DELETE  FROM  ".$ecs->table('user_person'). " where id=$id";

    $state=$db->query($sql);

 

  $url = 'user_person.php?act=query&' . str_replace('act=remove', '', $_SERVER['QUERY_STRING']);

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

    make_json_result($smarty->fetch('user_person_list.htm'), '',
        array('filter' => $ads_list['filter'], 'page_count' => $ads_list['page_count']));
}elseif($_REQUEST['act']=="deleteimg"){

 $id=$_GET['id'];
 $state='';//初始化使其全局
 $sql="SELECT * FROM ".$ecs->table('user_person')." where id=".$id;

 $image=$db->getRow($sql); 

 if ($image['menu_icon'] != '' && is_file('../' . $image['menu_icon']))
       {
        @unlink('../' . $image['menu_icon']);
       }
	$sql="Update  ".$ecs->table('user_person')." SET menu_icon='' where id=".intval($id);

    $state=$db->query($sql);


if($state){
 $links[0]['text']    ="返回";
  $links[0]['href']    = 'user_person.php?act=edit&id='.$id;
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回";
  $links[0]['href']    = 'user_person.php?act=edit&id='.$id;
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
    $sql = 'SELECT COUNT(*) FROM ' .$GLOBALS['ecs']->table('user_person'). ' AS ad ' . $where;
    $filter['record_count'] = $GLOBALS['db']->getOne($sql);

    $filter = page_and_size($filter);
	


    /* 获得广告数据 */
    $arr = array();
    $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('user_person'). 'AS ad ' .
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

//$thumb_url = $image->make_thumb($image_files['tmp_name'],100,50,$path.DATA_DIR . "/news/");  

//$thumb_url = DATA_DIR . "/doc/".is_string($thumb_url) ? $thumb_url : '';
//var_dump($thumb_url);
//exit;
//原图保r存
$orgImg=DATA_DIR . "/doc/".$filename;

$array['orgImg']=$orgImg;
//$array['thumb_url']=$thumb_url;
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