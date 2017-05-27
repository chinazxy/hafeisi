<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');

  require_once(ROOT_PATH . 'includes/cls_image.php');
if ($_REQUEST['act'] == 'list')
{

       $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 0;

    $smarty->assign('ur_here',    '眼镜包装管理');
    $smarty->assign('action_link', array('text' =>'眼镜包装添加', 'href' => 'glasses_pack.php?act=add'));
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
	 
    $smarty->display('glasses_pack_list.htm');
}elseif($_REQUEST['act'] == 'add'){


    $smarty->assign('action',        'add');
	$smarty->assign('form_act', 'insert');
    $smarty->display('glasses_pack.htm');
}elseif ($_REQUEST['act'] == 'insert')
{
	$title=isset($_POST['title'])?trim($_POST['title']):"";
	$content=isset($_POST['content'])?trim($_POST['content']):"";
	$en_content=isset($_POST['en_content'])?trim($_POST['en_content']):"";
	$en_title=isset($_POST['en_title'])?trim($_POST['en_title']):"";
	//$type=isset($_POST['type'])?trim($_POST['type']):"";
    $resort=isset($_POST['resort'])?intval(trim($_POST['resort'])):0;
	
	
	$addtime=time();
	
    
	$sql = "INSERT INTO ".$GLOBALS['ecs']->table('glasses_pack')."(title,content,en_title,en_content,resort,addtime)".
            "VALUES ('$title','$content','$en_title','$en_content','$resort','$addtime')";
    $GLOBALS['db']->query($sql);
	 $bsql = 'SELECT id FROM '.$ecs->table('glasses_pack').'order by id desc limit 1';
	 $parent_id= $db->getOne($bsql);

	// var_dump($_FILES['zj_file']);
	 //exit;
    foreach($_POST['zj_title'] as $key=>$value){
	   $imageinfo=handle_more_upload_image($_FILES['zj_file'],$key);
	   $image=$imageinfo['orgImg'];
	   $image_m=$imageinfo['thumb_url'];
	   $child_title=trim($value);
	   $child_title_en=isset($_POST['zj_title_en'][$key])?trim($_POST['zj_title_en'][$key]):"";
	   $resort=isset($_POST['zj_resort'][$key])?intval(trim($_POST['zj_resort'][$key])):"";
	   
	   $addtime=time();
	   $sql = "INSERT INTO ".$GLOBALS['ecs']->table('glasses_pack_child')."(child_title,child_title_en,resort,addtime,image,image_m,parent_id)".
            "VALUES ('$child_title','$child_title_en','$resort','$addtime','$image','$image_m','$parent_id')";
			$GLOBALS['db']->query($sql);
	}
	//exit;
//}
    /* 记录管理员操作 */
    admin_log($_POST['ad_name'], 'add', 'glasses_pack');

    clear_cache_files(); // 清除缓存文件
//exit;
    /* 提示信息 */

    $link[1]['text'] = "返回列表";
    $link[1]['href'] = 'glasses_pack.php?act=list';

    $link[2]['text'] = "继续添加";
    $link[2]['href'] = 'glasses_pack.php?act=add';
    sys_msg($_LANG['add'] . "&nbsp;" .$_POST['title'] . "&nbsp;" .'添加成功',0, $link);
	

}elseif ($_REQUEST['act'] == 'edit')
{



    $sql = "SELECT * FROM " .$ecs->table('glasses_pack'). " WHERE id='".intval($_REQUEST['id'])."'";
    $ads_arr = $db->getRow($sql);
	$sqll = "SELECT * FROM " .$ecs->table('glasses_pack_child'). " WHERE parent_id='".intval($_REQUEST['id'])."'"."order by id asc";
    $child = $db->getAll($sqll);
    $ads_arr['title'] = htmlspecialchars($ads_arr['title']);
	//print_r($child);
	$here="";
if($ads_arr['id']==1){
	$here="镜袋列表";
	
}else{
	$here="镜盒列表";
}
	
	
    $smarty->assign('ur_here',       $here);
    //$smarty->assign('action_link',   array('href' => 'glasses_pack.php?act=list', 'text' =>'眼镜包装列表'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
    $smarty->assign('ads',           $ads_arr);
	$smarty->assign('child',           $child);
    assign_query_info();
    $smarty->display('glasses_pack.htm');
}


//对数据进行更新和修改
elseif ($_REQUEST['act'] == 'update')
{
  
    $id=intval(trim($_POST['id']));
	
    $title=isset($_POST['title'])?trim($_POST['title']):"";
	$content=isset($_POST['content'])?trim($_POST['content']):"";
	$en_content=isset($_POST['en_content'])?trim($_POST['en_content']):"";
	$en_title=isset($_POST['en_title'])?trim($_POST['en_title']):"";
	//$type=isset($_POST['type'])?trim($_POST['type']):"";
    $resort=isset($_POST['resort'])?intval(trim($_POST['resort'])):0;
		    $sql = "UPDATE " .$GLOBALS['ecs']->table('glasses_pack'). " SET ".
            "title = '$title', ".
            "content     = '$content', ".
			
			"en_title  = '$en_title',".
			"en_content  = '$en_content',".
		
			"resort = '$resort'".
            "WHERE id = '$id'";		
     $GLOBALS['db']->query($sql);
	

	
    $sql = "SELECT * FROM " .$ecs->table('glasses_pack_child'). " WHERE parent_id='".intval($_REQUEST['id'])."'"."order by id asc";
     $info_image = $db->getAll($sql);
if(isset($_POST['zj_title'])){
	 foreach($_POST['zj_title'] as $key=>$value){
	   $imageinfo=ecs_reup_image_more($_FILES['zj_file'],'image','image_m',$info_image[$key],$key);
	   $image=$imageinfo['orgImg'];
	   $image_m=$imageinfo['thumb_url'];
	   $child_title=isset($_POST['zj_title'][$key])?trim($_POST['zj_title'][$key]):"";;
	   $child_title_en=isset($_POST['zj_title_en'][$key])?trim($_POST['zj_title_en'][$key]):"";
	   $content=isset($_POST['zj_content'][$key])?trim($_POST['zj_content'][$key]):"";;
	   $content_en=isset($_POST['zj_content_en'][$key])?trim($_POST['zj_content_en'][$key]):"";
	   $resort=isset($_POST['zj_resort'][$key])?intval(trim($_POST['zj_resort'][$key])):"";
	   
			$sql = "UPDATE " .$GLOBALS['ecs']->table('glasses_pack_child'). " SET ".
            "child_title = '$child_title', ".
            "child_title_en = '$child_title_en', ".
			"image  = '$image',".
			"image_m  = '$image_m',".
			"content  = '$content',".
			"content_en  = '$content_en',".
			"resort = '$resort'".
            "WHERE id = '".$info_image[$key]['id']."'";		
     $GLOBALS['db']->query($sql);
	}
}

//子集更新
        
if($_POST['z_zj_title'][0]!=''){
   foreach($_POST['z_zj_title'] as $key=>$value){
	   $imageinfo=handle_more_upload_image($_FILES['z_zj_file'],$key);
	   $image=$imageinfo['orgImg'];
	   $image_m=$imageinfo['thumb_url'];
	   $child_title=trim($value);
	   $child_title_en=isset($_POST['z_zj_title_en'][$key])?trim($_POST['z_zj_title_en'][$key]):"";
	   $resort=isset($_POST['z_zj_resort'][$key])?intval(trim($_POST['z_zj_resort'][$key])):"";
	   $content_en=isset($_POST['z_zj_content_en'][$key])?trim($_POST['z_zj_content_en'][$key]):"";
	   $content=isset($_POST['z_zj_content'][$key])?trim($_POST['z_zj_content'][$key]):"";;
	   $addtime=time();
	   $sql = "INSERT INTO ".$GLOBALS['ecs']->table('glasses_pack_child')."(child_title,child_title_en,resort,addtime,image,image_m,parent_id,content,content_en)".
            "VALUES ('$child_title','$child_title_en','$resort','$addtime','$image','$image_m','$id','$content','$content_en')";
			$GLOBALS['db']->query($sql);
	}
}
		// exit;

   /* 记录管理员操作 */
   admin_log($_POST['ad_name'], 'edit', 'glasses_pack');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回列表', 'href' => 'glasses_pack.php?act=edit&id='.$id);
   sys_msg($_LANG['edit'] .' '.$_POST['title'].' '. '修改成功!', 0, $href);

   
   
   
}elseif ($_REQUEST['act'] == 'remove')
{
  
    $id = intval($_REQUEST['id']);
	//$sql="SELECT * FROM ".$ecs->table('glasses_pack')." where id=".$id;
   // $image=$db->getRow($sql); 
	
	$sqll="SELECT * FROM ".$ecs->table('glasses_pack_child')." where parent_id=".$id;//子集
    $result=$db->query($sqll); 
	while($image = mysql_fetch_assoc($result)){//解析结果集并遍历
	
	//removeALLimage('image','image_m',$child);
    if ($image['image'] != '' && is_file('../'.$image['image']))
    {
        @unlink('../'.$image['image']);
    }
    if ($image['image_m'] != '' && is_file('../'.$image['image_m']))
    {
        @unlink('../'.$image['image_m']);
    }
		
 }
	
	
	
	
	
    $sql="DELETE  FROM  ".$ecs->table('glasses_pack'). " where id=$id";

    $state=$db->query($sql);
	$sql="DELETE  FROM  ".$ecs->table('glasses_pack_child'). " where parent_id=$id";

    $state=$db->query($sql);

  $url = 'glasses_pack.php?act=query&' . str_replace('act=remove', '', $_SERVER['QUERY_STRING']);

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

    make_json_result($smarty->fetch('glasses_pack_list.htm'), '',
        array('filter' => $ads_list['filter'], 'page_count' => $ads_list['page_count']));
}elseif($_REQUEST['act']=="deleteimg"){

 $id=intval($_GET['id']);

 $sqll="SELECT * FROM ".$ecs->table('glasses_pack_child')." where id=".$id;

 $child=$db->getRow($sqll); 
 

 
    if ($child['image'] != '' && is_file('../' . $child['image']))
    {
        @unlink('../' . $child['image']);
    }
    if ($child['image_m'] != '' && is_file('../' . $child['image_m']))
    {
        @unlink('../' . $child['image_m']);
    }
	$sql="Update  ".$ecs->table('glasses_pack_child')." SET image='',image_m='' where id=".$id;

    $state=$db->query($sql);


if($state){
 $links[0]['text']    ="返回";
  $links[0]['href']    = 'glasses_pack.php?act=edit&id='.$child['parent_id'];
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回";
  $links[0]['href']    = 'glasses_pack.php?act=edit&id='.$child['parent_id'];
  sys_msg("图片删除失败", 0, $links);
  }
}
elseif($_REQUEST['act']=="delet"){
	 $id=trim($_GET['id']);
	 
	 $sql= "SELECT * FROM " .$GLOBALS['ecs']->table('glasses_pack_child'). " WHERE id='".intval($id)."'";
	 $image=$db->getRow($sql);
	// echo $image['image']."&nbsp;&nbsp;&nbsp;&nbsp;".$image['image_m'];
	
	if ($image['image'] != '' && is_file('../' . $image['image']))
    {
         @unlink('../' . $image['image']);
    }
    if ($image['image_m'] != '' && is_file('../' . $image['image_m']))
    {
        @unlink('../' . $image['image_m']);
    }
	// exit;
	$sql="DELETE  FROM  ".$ecs->table('glasses_pack_child'). " where id=$id";

    $state=$db->query($sql);
if($state){
		
	 $links[0]['text']    ="返回";
     $links[0]['href']    = 'glasses_pack.php?act=edit&id='.$image['parent_id'];
     sys_msg("数据删除成功", 0, $links);
 }else{
     $links[0]['text']    ="返回";
     $links[0]['href']    = 'glasses_pack.php?act=edit&id='.$image['parent_id'];
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
    $sql = 'SELECT COUNT(*) FROM ' .$GLOBALS['ecs']->table('glasses_pack'). ' AS ad ' . $where;
    $filter['record_count'] = $GLOBALS['db']->getOne($sql);

    $filter = page_and_size($filter);
	


    /* 获得广告数据 */
    $arr = array();
    $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('glasses_pack'). 'AS ad ' .
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

$thumb_url = $image->make_thumb($image_files['tmp_name'][$i],100,50,$path.DATA_DIR . "/dingzhi_pack/");  
$thumb_url = DATA_DIR . "/dingzhi_pack/".is_string($thumb_url) ? $thumb_url : '';
//原图保r存
$orgImg=DATA_DIR . "/dingzhi_pack/".$filename;
$orgImg=trim($orgImg);
$thumb_url=trim($thumb_url);
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


?>