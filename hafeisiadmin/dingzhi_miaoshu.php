<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');

  require_once(ROOT_PATH . 'includes/cls_image.php');
  /*导入文本编辑器*/
require_once(ROOT_PATH . "includes/fckeditor/fckeditor.php");

admin_priv('dingzhi_miaoshu');
 //exit;
if ($_REQUEST['act'] == 'list')
{

       $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 0;
    $smarty->assign('ur_here',    '定制描述页');
	
	
 
 $ads_list= select('dingzhi_miaoshu','where id=1',1);
 //var_dump($ads_list);
 //exit;
 create_html_editor_lys('FCKeditor',$ads_list['html_content'],'806px','800px');
  create_html_editor_lys('en_FCKeditor',$ads_list['en_html_content'],'806px','800px');
    //$smarty->assign('xilie',     $xilie);
  $smarty->assign('ads_list',     $ads_list);
  $smarty->assign('form_act',     'update');
  $smarty->assign('action',     'list');
    assign_query_info();
	 
    $smarty->display('dingzhi_miaoshu_list.htm');
}elseif($_REQUEST['act'] == 'add'){
	//exit;
    $sql="select * from ".$GLOBALS['ecs']->table('dingzhi_chufan_child')." order by value asc";
	$result=$GLOBALS['db']->getAll($sql);
	 $smarty->assign('result',        $result);
    $smarty->assign('action',        'add');
	$smarty->assign('form_act', 'update');
    $smarty->display('dingzhi_chufan.htm');
}elseif ($_REQUEST['act'] == 'insert')
{

	//$parent_id=intval($_GET['parent_id']);
   //$value=trim($_GET['value']); 
	$title=isset($_POST['title'])?trim($_POST['title']):'';
		$title_en=isset($_POST['title_en'])?trim($_POST['title_en']):'';
	
		$resort=isset($_POST['resort'])?intval(trim($_POST['resort'])):0;
		$image_info=handle_upload_image($_FILES['image']);
		$image_icon=$image_info['orgImg'];
		$image_icon_m=$image_info['thumb_url'];
		$addtime=time();
	 $sql = "INSERT INTO ".$GLOBALS['ecs']->table('dingzhi_flow_content')."(title,title_en,resort,image_icon,addtime,image_icon_m)".
            "VALUES ('$title','$title_en','$resort','$image_icon','$addtime','$image_icon_m')";
	$GLOBALS['db']->query($sql);
    /* 记录管理员操作 */
    admin_log($_POST['ad_name'], 'add', 'dingzhi_flow_content');

    clear_cache_files(); // 清除缓存文件
//exit;
    /* 提示信息 */

  $url = 'dingzhi_miaoshu.php?act=list';

    ecs_header("Location: $url\n");
   //$href[] = array('text' => '返回列表', 'href' => 'dingzhi_chufan.php?act=add');
  // sys_msg($_LANG['edit'] .' '.$_POST['title'].' '. '添加成功!', 0, $href);
	

}elseif ($_REQUEST['act'] == 'update_xi')
{
//exit;
    foreach($_POST['series_title'] as $key=>$val){
	    $title=isset($val)?trim($val):'';
		$title_en=isset($_POST['series_title_en'][$key])?trim($_POST['series_title_en'][$key]):'';
		//$resort=isset($_POST['series_resort'][$key])?intval(trim($_POST['series_resort'][$key])):0;
		
		//$url=isset($_POST['series_url'][$key])?trim($_POST['series_url'][$key]):'#';
		$id=isset($_POST['xi_id'][$key])?trim($_POST['xi_id'][$key]):'0';
		$addtime=time();
		 $sql = "UPDATE " .$GLOBALS['ecs']->table('dingzhi_xilie'). " SET ".
            "title = '$title', ".
            "title_en     = '$title_en', ".
			// "resort    = '$resort',".
			"addtime  = '$addtime'".
            "WHERE id = '$id'";	
		$GLOBALS['db']->query($sql);
   }
	
    /* 记录管理员操作 */
    admin_log($_POST['ad_name'], 'update', 'dingzhi_xilie');

    clear_cache_files(); // 清除缓存文件
//exit;
    /* 提示信息 */

  //$url = 'dingzhi_miaoshu.php?act=list';

    //ecs_header("Location: $url\n");
   $href[] = array('text' => '返回列表', 'href' => 'dingzhi_miaoshu.php?act=list');
   sys_msg($_LANG['edit'] .' '.'系列标题'.' '. '成功!', 0, $href);
	

}
elseif ($_REQUEST['act'] == 'edit')
{

   $id=intval($_GET['id']);
   $sql="select * from ".$ecs->table('dingzhi_flow_content')." order by id asc";
   $ads_list=$db->getAll($sql);
      foreach($ads_list as $k=>$v){
	   $ads_list[$k]['addtime']=date('Y-m-d',$v['addtime']);
   }
   $sql="select * from ".$ecs->table('dingzhi_flow_content')." where id=".$id;
   $liuchen=$db->getRow($sql);
	$smarty->assign('ads_arr',      $ads_arr);
    //$smarty->assign('ur_here',       "镜盒修改");
   $smarty->assign('action_link',   array('href' => 'dingzhi_miaoshu.php?act=list', 'text' =>'返回列表'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
	$smarty->assign('ads_list',           $ads_list);
	$smarty->assign('liuchen',           $liuchen);
    assign_query_info();
    $smarty->display('dingzhi_miaoshu_list.htm');
}


//对数据进行更新和修改
elseif ($_REQUEST['act'] == 'update')
{
	$id=intval($_POST['id']);
	$css_content=trim($_POST['yanshi']);
	$html_content=trim($_POST[FCKeditor]);
	$en_css_content=trim($_POST['en_yanshi']);
	$en_html_content=trim($_POST[en_FCKeditor]);
	
		  $sql = "UPDATE " .$GLOBALS['ecs']->table('dingzhi_miaoshu'). " SET ".
		  " en_css_content = '$en_css_content', ".
            "en_html_content     = '$en_html_content', ".
            "css_content = '$css_content', ".
            "html_content     = '$html_content' ".
            "WHERE id = '$id'";	
     $dd=$GLOBALS['db']->query($sql);

   /* 记录管理员操作 */
   admin_log($_POST['ad_name'], 'edit', 'dingzhi_miaoshu');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回列表', 'href' => 'dingzhi_miaoshu.php?act=list');
   if($dd){
	    sys_msg($_LANG['edit'] .' '.$_POST['title'].' '. '修改成功!', 0, $href);
	   
   }else{
	    sys_msg($_LANG['edit'] .' '.$_POST['title'].' '. '修改失败!', 0, $href);
   }
  


   
}
function select($tablename,$tiaojian,$case=0){//返回所有字段，条件为where或order by等都可以
$arr=array();
	$sql="select * from".$GLOBALS['ecs']->table($tablename)." ".$tiaojian;
	switch($case){
		case 0:$arr=$GLOBALS['db']->getAll($sql);
		break;
		case 1:$arr=$GLOBALS['db']->getRow($sql);
		break;
	}
	return $arr;
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
$orgImg=DATA_DIR . "/dingzhi_pack/".$filename;

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
function chaxun_select($tablename){
	$sql="select * from".$GLOBALS['ecs']->table($tablename)." order by id asc";
	$arr=$GLOBALS['db']->getAll($sql);
	foreach($arr as $k=>$v){
		$arr[$k]['addtime']=date('Y-m-d',$v['addtime']);
	}
	return $arr;
}
function ecs_reup_image_genxin($yuantu,$suolue,$id,$file,$tablename){//图片更新修改版2015.05.19
   $sql="select * from".$GLOBALS['ecs']->table($tablename)." where id =".$id;
   $image=$GLOBALS['db']->getRow($sql);
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
function ecs_reup_image_more_genxin($yuantu,$suolue,$id,$key,$file,$tablename){//批量图片更新修改版
 $sql="select * from".$GLOBALS['ecs']->table($tablename)." where id =".$id;
   $image=$GLOBALS['db']->getRow($sql);
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
?>