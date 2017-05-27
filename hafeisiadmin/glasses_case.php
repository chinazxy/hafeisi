<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');

  require_once(ROOT_PATH . 'includes/cls_image.php');
if ($_REQUEST['act'] == 'list')
{

       $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 0;

    $smarty->assign('ur_here',    '镜盒管理');
    $smarty->assign('action_link', array('text' =>'镜盒添加', 'href' => 'glasses_case.php?act=add'));
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
	 
    $smarty->display('glasses_case_list.htm');
}elseif($_REQUEST['act'] == 'add'){

/*$addOrder='<td  style="border-bottom:1px solid #bbdde5; padding:20px 0px;">'.
              '<a href="javascript:;" onclick="removeImg(this)">[-]</a>'.
			   ' 产品代码： <input type="text" name="number[]" size="20" /><br/>中文标题：<input type="text" name="zj_title[]" size="20"/><br/>'.
			   '英文标题：<input type="text" name="zj_title_en[]" size="20"/><br/> '. 
			   '显示排序：<input type="text" name="zj_resort[]" size="20" style="width:80px"/><br/>'.
			   '设为默认：<input class="moren" type="checkbox" name="zj_moren[]" onchange="checkDefault(this)" value="1"/><input type="hidden" value="0" name="zj_moren1[]"/><br/>'.
			   '库存：<input type="text" name="dingzhi_number[]" value="" size="20"/>配送时间(库存为0时指定的最大配货时间)： <input type="text" name="delivery_time[]" value="" size="20" /><br/>'.
              '材质图片：<input type="file" name="zj_file[]"/><span style="color:#FF0000">宽1920*高1080</span><br/>'.
			  '展开图片：<input type="file" name="zj_file2[]"/><span style="color:#FF0000">宽1920*高1080</span><br/>'.
			   '材质色块图：<input type="file" name="zj_file1[]"/><span style="color:#FF0000">宽*高*</span><br/>'.
			   '镌刻字体颜色：<input type="text" name="font_color[]"/><span style="color:#FF0000">（默认字体白色,请填写颜色代码，如白色（#ffffff））</span></td></tr>';*/
			  
	$smarty->assign('addOrder',      $addOrder);
    $smarty->assign('action',        'add');
	$smarty->assign('form_act', 'insert');
    $smarty->display('glasses_case.htm');
}elseif ($_REQUEST['act'] == 'insert')
{
	$title=isset($_POST['title'])?trim($_POST['title']):"";
	$content=isset($_POST['content'])?trim($_POST['content']):"";
	$content_en=isset($_POST['content_en'])?trim($_POST['content_en']):"";
	$title_en=isset($_POST['title_en'])?trim($_POST['title_en']):"";
    $resort=isset($_POST['resort'])?intval(trim($_POST['resort'])):0;
    $moren=isset($_POST['moren'])?intval(trim($_POST['moren'])):0;

	$imageinfo=handle_upload_image($_FILES['file']);

	$image=$imageinfo['orgImg'];
	$image_m=$imageinfo['thumb_url'];

	
	$addtime=time();
	if($moren==1){
		 $sql = "UPDATE " .$GLOBALS['ecs']->table('glasses_case'). " SET ".
            "moren = '0'";
     $GLOBALS['db']->query($sql);
	}
    
	$sql = "INSERT INTO ".$GLOBALS['ecs']->table('glasses_case')."(title,content,title_en,content_en,resort,addtime,image,image_m,moren)".
            "VALUES ('$title','$content','$title_en','$content_en','$resort','$addtime','$image','$image_m','$moren')";
    $GLOBALS['db']->query($sql);
	 $bsql = 'SELECT * FROM '.$ecs->table('glasses_case').'order by id desc limit 1';
	 $parent= $db->getRow($bsql);
	foreach($_POST['zj_title'] as $key=>$val){
		$child_title=isset($_POST['zj_title'][$key])?trim($_POST['zj_title'][$key]):"";
	   $child_title_en=isset($_POST['zj_title_en'][$key])?trim($_POST['zj_title_en'][$key]):"";
       $resort=isset($_POST['zj_resort'][$key])?intval(trim($_POST['zj_resort'][$key])):0;
	   $moren=isset($_POST['zj_moren1'][$key])?intval(trim($_POST['zj_moren1'][$key])):0;
	     $number=isset($_POST['number'][$key])?trim($_POST['number'][$key]):"";
		 	     $dingzhi_number=isset($_POST['dingzhi_number'][$key])?intval(trim($_POST['dingzhi_number'][$key])):0;
				   $delivery_time=isset($_POST['delivery_time'][$key])?intval(trim($_POST['delivery_time'][$key])):0;
				       $fontcolor=isset($_POST['font_color1'][$key])?trim($_POST['font_color1'][$key]):"#ffffff";
	   $parent_id=$parent['id'];
	   if($moren==1){
		   $sql = "UPDATE " .$GLOBALS['ecs']->table('glasses_case_child'). " SET ".
            "moren = '0'".
			"where parent_id='$parent_id'";
         $GLOBALS['db']->query($sql);	   
	   }
	   $addtime=time();
	   $imageinfo=handle_more_upload_image($_FILES['zj_file'],$key);
	   $image=$imageinfo['orgImg'];
	   $image_m=$imageinfo['thumb_url'];  
	   $imageinfo=handle_more_upload_image($_FILES['zj_file1'],$key);
	   $s_image=$imageinfo['orgImg'];
	   $s_image_m=$imageinfo['thumb_url'];  
	   
	   $sql = "INSERT INTO ".$GLOBALS['ecs']->table('glasses_case_child')."(child_title,child_title_en,number,dingzhi_number,delivery_time,resort,addtime,image,image_m,parent_id,s_image,s_image_m,moren,font_color)".
            "VALUES ('$child_title','$child_title_en','$number','$dingzhi_number','$delivery_time','$resort','$addtime','$image','$image_m','$parent_id','$s_image','$s_image_m','$moren','$fontcolor')";
			
			$GLOBALS['db']->query($sql);
	}
     
    /* 记录管理员操作 */
    admin_log($_POST['ad_name'], 'add', 'glasses_case');

    clear_cache_files(); // 清除缓存文件
//exit;
    /* 提示信息 */

    $link[1]['text'] = "返回列表";
    $link[1]['href'] = 'glasses_case.php?act=list';

    $link[2]['text'] = "继续添加";
    $link[2]['href'] = 'glasses_case.php?act=add';
    sys_msg($_LANG['add'] . "&nbsp;" .$_POST['title'] . "&nbsp;" .'添加成功',0, $link);
	

}elseif ($_REQUEST['act'] == 'edit')
{



    $sql = "SELECT * FROM " .$ecs->table('glasses_case'). " WHERE id='".intval($_REQUEST['id'])."'";
    $ads_arr = $db->getRow($sql);
	$sqll = "SELECT * FROM " .$ecs->table('glasses_case_child'). " WHERE parent_id='".intval($_REQUEST['id'])."'"."order by id asc";
    $child = $db->getAll($sqll);
    $ads_arr['title'] = htmlspecialchars($ads_arr['title']);
	//print_r($child);

	 $addOrder='<td  style="border-bottom:1px solid #bbdde5; padding:20px 0px;">'.
              '<a href="javascript:;" onclick="removeImg(this)">[-]</a>'.
			   '产品代码： <input type="text" name="tnumber[]" size="20" /><br/>中文标题：<input type="text" name="zj_ttitle[]" size="20"/><br/>'.
			   '英文标题：<input type="text" name="zj_ttitle_en[]" size="20"/><br/> '. 
			   '显示排序：<input type="text" name="zj_tresort[]" size="20" style="width:80px"/><br/>'.
			   '设为默认：<input class="moren" type="checkbox" name="zj_tmoren[]" onchange="checkDefault(this)" value="1"/><input type="hidden" value="0" name="zj_tmoren1[]"/><br/>'.
			      '库存：<input type="text" name="tdingzhi_number[]" value="" size="20"/>配送时间(库存为0时指定的最大配货时间)： <input type="text" name="tdelivery_time[]" value="" size="20" /><br/>'.
              ' 材质图片：<input type="file" name="zj_tfile[]"/><span style="color:#FF0000">宽1920*高1080</span><br/>'.
			   '展开图片：<input type="file" name="zj_tfile2[]"/><span style="color:#FF0000">宽1920*高1080</span><br/>'.
			   '材质色块图：<input type="file" name="zj_tfile1[]"/><span style="color:#FF0000">宽40px*高40px</span><br/>镌刻字体颜色：<input type="text" name="font_color1[]"/><span style="color:#FF0000">（默认字体白色,请填写颜色代码，如白色（#ffffff））</span></td></tr>';
			  
	$smarty->assign('addOrder',      $addOrder);
    $smarty->assign('ur_here',       "镜盒修改");
    $smarty->assign('action_link',   array('href' => 'glasses_case.php?act=list', 'text' =>'镜盒管理列表'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
    $smarty->assign('ads',           $ads_arr);
	$smarty->assign('child',           $child);
    assign_query_info();
    $smarty->display('glasses_case.htm');
}


//对数据进行更新和修改
elseif ($_REQUEST['act'] == 'update')
{
  

    $id=intval(trim($_POST['id']));

	$title=isset($_POST['title'])?trim($_POST['title']):"";
	$content=isset($_POST['content'])?trim($_POST['content']):"";
	$content_en=isset($_POST['content_en'])?trim($_POST['content_en']):"";
	$title_en=isset($_POST['title_en'])?trim($_POST['title_en']):"";
    $resort=isset($_POST['resort'])?intval(trim($_POST['resort'])):0;
	 $moren0=isset($_POST['moren'])?intval(trim($_POST['moren'])):0;
	
	//echo 
	
	//exit;
	
   if($moren0==1){
		 $sql = "UPDATE " .$GLOBALS['ecs']->table('glasses_case'). " SET ".
            "moren = '0'";
     $GLOBALS['db']->query($sql);
	}
   




	
    $sql = "SELECT * FROM " .$ecs->table('glasses_case'). " WHERE id='".intval($_REQUEST['id'])."'";
     $image = $db->getRow($sql);
	 $imageinfo=ecs_reup_image('image','image_m',$image,$_FILES['file']);
	  $image=$imageinfo['orgImg'];
	   $image_m=$imageinfo['thumb_url'];  
	  $sql = "UPDATE " .$GLOBALS['ecs']->table('glasses_case'). " SET ".
            "title = '$title', ".
            "content     = '$content', ".
			
			"title_en  = '$title_en',".
			"content_en  = '$content_en',".
			"image  = '$image',".
			"image_m  = '$image_m',".
		    "moren  = '$moren0',".
			"resort = '$resort'".
            "WHERE id = '$id'";		
     $GLOBALS['db']->query($sql);
	 
	 $sql = "SELECT * FROM " .$ecs->table('glasses_case_child'). " WHERE parent_id='".intval($_REQUEST['id'])."'"."order by id asc";
     $info_image = $db->getAll($sql);
	 //var_dump($_POST['zj_moren']);
	 //exit;
	 if(isset($_POST['zj_title'])){
	 foreach($_POST['zj_title'] as $key=>$value){
	   $imageinfo=ecs_reup_image_more($_FILES['zj_file'],'image','image_m',$info_image[$key],$key);
	   $image=$imageinfo['orgImg'];
	   $image_m=$imageinfo['thumb_url'];
	    $imageinfo=ecs_reup_image_more($_FILES['zj_file1'],'s_image','s_image_m',$info_image[$key],$key);
	   $s_image=$imageinfo['orgImg'];
	   $s_image_m=$imageinfo['thumb_url'];
	       $imageinfo=ecs_reup_image_more($_FILES['zj_file2'],'z_image','z_image_m',$info_image[$key],$key);
	   $z_image=$imageinfo['orgImg'];
	   $z_image_m=$imageinfo['thumb_url'];
	   $child_title=isset($_POST['zj_title'][$key])?trim($_POST['zj_title'][$key]):"";
		     $number=isset($_POST['zj_number'][$key])?trim($_POST['zj_number'][$key]):"";
		 	     $dingzhi_number=isset($_POST['dingzhi_number'][$key])?intval(trim($_POST['dingzhi_number'][$key])):0;
				   $delivery_time=isset($_POST['delivery_time'][$key])?intval(trim($_POST['delivery_time'][$key])):0;
	   $child_title_en=isset($_POST['zj_title_en'][$key])?trim($_POST['zj_title_en'][$key]):"";
       $resort=isset($_POST['zj_resort'][$key])?intval(trim($_POST['zj_resort'][$key])):0;
	    $moren1=isset($_POST['zj_moren1'][$key])?intval(trim($_POST['zj_moren1'][$key])):0;
			       $fontcolor=isset($_POST['font_color'][$key])?trim($_POST['font_color'][$key]):"#ffffff";
		  $parent_id=$id;
	 if($moren1==1){
		   $sql = "UPDATE " .$GLOBALS['ecs']->table('glasses_case_child'). " SET ".
            "moren = '0'".
			"where parent_id='$parent_id'";
         $GLOBALS['db']->query($sql);	   
	 }
			$sql = "UPDATE " .$GLOBALS['ecs']->table('glasses_case_child'). " SET ".
            "child_title = '$child_title',".
            "child_title_en = '$child_title_en', ".
			"image  = '$image',".
			"image_m  = '$image_m',".
				"number  = '$number',".
				"dingzhi_number  = '$dingzhi_number',".
					"delivery_time  = '$delivery_time',".
				"s_image  = '$s_image',".
			"s_image_m  = '$s_image_m',".
				"z_image  = '$z_image',".
			"z_image_m  = '$z_image_m',".
			"moren  = '$moren1',".
			"font_color  = '$fontcolor',".
			"resort = '$resort'".
            "WHERE id = '".$info_image[$key]['id']."'";		
     $GLOBALS['db']->query($sql);
	}
}
	
//子集更新
        
		 if($_POST['zj_ttitle'][0]!=''){
            foreach($_POST['zj_ttitle'] as $key=>$val){
		  $child_title=isset($_POST['zj_ttitle'][$key])?trim($_POST['zj_ttitle'][$key]):"";
	      $child_content=isset($_POST['zj_tcontent'][$key])?trim($_POST['zj_tcontent'][$key]):"";
	      $child_content_en=isset($_POST['zj_tcontent_en'][$key])?trim($_POST['zj_tcontent_en'][$key]):"";
	      $child_title_en=isset($_POST['zj_ttitle_en'][$key])?trim($_POST['zj_ttitle_en'][$key]):"";
		  
		    $number=isset($_POST['tnumber'][$key])?trim($_POST['tnumber'][$key]):"";
		 	     $dingzhi_number=isset($_POST['tdingzhi_number'][$key])?intval(trim($_POST['tdingzhi_number'][$key])):0;
				   $delivery_time=isset($_POST['tdelivery_time'][$key])?intval(trim($_POST['tdelivery_time'][$key])):0;
         $resort=isset($_POST['zj_tresort'][$key])?intval(trim($_POST['zj_tresort'][$key])):0;
		  $moren2=isset($_POST['zj_tmoren1'][$key])?intval(trim($_POST['zj_tmoren1'][$key])):0;
		        $fontcolor1=isset($_POST['font_color1'][$key])?trim($_POST['font_color1'][$key]):"#ffffff";
	     $parent_id=$id;
		 //var_dump($_POST['zj_tmoren1']);
		 //exit;
		 if($moren2==1){
		   $sql = "UPDATE " .$GLOBALS['ecs']->table('glasses_case_child'). " SET ".
            "moren = '0'".
			"where parent_id='$parent_id'";
            $GLOBALS['db']->query($sql);	   
	     }
		
	     $addtime=time();
	     $imageinfo=handle_more_upload_image($_FILES['zj_tfile'],$key);
	     $image=$imageinfo['orgImg'];
	     $image_m=$imageinfo['thumb_url'];  
		 $imageinfo=handle_more_upload_image($_FILES['zj_tfile1'],$key);
	     $s_image=$imageinfo['orgImg'];
	     $s_image_m=$imageinfo['thumb_url'];  
		  $imageinfo=handle_more_upload_image($_FILES['zj_tfile2'],$key);
	     $z_image=$imageinfo['orgImg'];
	     $z_image_m=$imageinfo['thumb_url'];  
	     $sql = "INSERT INTO ".$GLOBALS['ecs']->table('glasses_case_child')."(child_title,child_title_en,child_content,child_content_en,number,dingzhi_number,delivery_time,resort,addtime,image,image_m,parent_id,s_image,s_image_m,moren,font_color,z_image,z_image_m)".
            "VALUES ('$child_title','$child_title_en','$child_content','$child_content_en','$number','$dingzhi_number','$delivery_time','$resort','$addtime','$image','$image_m','$parent_id','$s_image','$s_image_m','$moren2','$fontcolor1','$z_image','$z_image_m')";
			$GLOBALS['db']->query($sql);
		//	echo $sql;
			//exit;
			 // var_dump($_POST['tnumber']);
         //exit;
	}
		 }
		 //echo $moren0."<br/>";
  //var_dump($_POST['zj_moren1']);
  //exit;
   /* 记录管理员操作 */
   admin_log($_POST['ad_name'], 'edit', 'glasses_case');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回列表', 'href' => 'glasses_case.php?act=list');
   sys_msg($_LANG['edit'] .' '.$_POST['title'].' '. '修改成功!', 0, $href);

   
   
   
}elseif ($_REQUEST['act'] == 'remove')
{
  
    $id = intval($_REQUEST['id']);
	$sql="SELECT * FROM ".$ecs->table('glasses_case')." where id=".$id;
    $image=$db->getRow($sql); 
	
	$sqll="SELECT * FROM ".$ecs->table('glasses_case_child')." where parent_id=".$id;//子集
    $result=$db->query($sqll); 
	while($child = mysql_fetch_assoc($result)){//解析结果集并遍历
		
	   removeALLimage('image','image_m',$child);
	   removeALLimage('s_image','s_image_m',$child);
		
    }
	 removeALLimage('image','image_m',$image);
    $sql="DELETE  FROM  ".$ecs->table('glasses_case'). " where id=$id";

    $state=$db->query($sql);
	$sql="DELETE  FROM  ".$ecs->table('glasses_case_child'). " where parent_id=$id";

    $state=$db->query($sql);

  $url = 'glasses_case.php?act=query&' . str_replace('act=remove', '', $_SERVER['QUERY_STRING']);

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

    make_json_result($smarty->fetch('glasses_case_list.htm'), '',
        array('filter' => $ads_list['filter'], 'page_count' => $ads_list['page_count']));
}elseif($_REQUEST['act']=="deleteimg"){

 $id=$_GET['id'];
 $state='';//初始化使其全局
 $sql="SELECT * FROM ".$ecs->table('glasses_case')." where id=".$id;
 
 $image=$db->getRow($sql); 
 
 $sqll="SELECT * FROM ".$ecs->table('glasses_casechild')." where parent_id=".$id;

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
	$sql="Update  ".$ecs->table('glasses_case')." SET bkimage_p='',bkimage_p_m='' where id=".$id;

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
	$sql="Update  ".$ecs->table('glasses_case')." SET bkimage_s='',bkimage_s_m='' where id=".$id;

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
	$sql="Update  ".$ecs->table('glasses_case')." SET tanchuan_p='',tanchuan_p_m='' where id=".$id;

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
	$sql="Update  ".$ecs->table('glasses_case')." SET tanchuan_s='',tanchuan_s_m='' where id=".$id;

    $state=$db->query($sql);
}

if($state){
 $links[0]['text']    ="返回";
  $links[0]['href']    = 'glasses_case.php?act=edit&id='.$id;
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回";
  $links[0]['href']    = 'glasses_case.php?act=edit&id='.$id;
  sys_msg("图片删除失败", 0, $links);
  }
}
elseif($_REQUEST['act']=="delet"){
	 $id=intval(trim($_GET['id']));
	
	 $sql= "SELECT * FROM " .$GLOBALS['ecs']->table('glasses_case_child'). " WHERE id='".intval($id)."'";
	 $image=$db->getRow($sql);
	 removeALLimage('image','image_m',$image);
	  removeALLimage('s_image','s_image_m',$image);
	  removeALLimage('z_image','z_image_m',$image);
	$sql="DELETE  FROM  ".$ecs->table('glasses_case_child'). " where id=$id";

    $state=$db->query($sql);
if($state){
		
	 $links[0]['text']    ="返回";
     $links[0]['href']    = 'glasses_case.php?act=edit&id='.$image['parent_id'];
     sys_msg("数据删除成功", 0, $links);
 }else{
     $links[0]['text']    ="返回";
     $links[0]['href']    = 'glasses_case.php?act=edit&id='.$image['parent_id'];
     sys_msg("数据删除失败", 0, $links);
     }	
	 
	 
}
elseif($_REQUEST['act']=="deleteimgz"){

 $id=intval($_GET['id']);
 
 $state='';//初始化使其全局
 $tiao_id='';
 
if($_GET['din']=='c'){
	 
	 $sqll="SELECT * FROM ".$ecs->table('glasses_case_child')." where id=".$id;

     $child=$db->getRow($sqll);
	  $tiao_id=$child['parent_id'];
     $state=removeImages('image','image_m','glasses_case_child',$id,$child);//删除图片并使数据库内的路径=NULL
}
else if($_GET['din']=='p'){
	
	
	 $sqll="SELECT * FROM ".$ecs->table('glasses_case')." where id=".$id;

     $result=$db->getRow($sqll);
	 $tiao_id=$result['id'];
     $state=removeImages('image','image_m','glasses_case',$id,$result);//删除图片并使数据库内的路径=NULL
}else if($_GET['din']=='s'){
	
	 $sqll="SELECT * FROM ".$ecs->table('glasses_case_child')." where id=".$id;

     $child=$db->getRow($sqll);
	  $tiao_id=$child['parent_id'];
     $state=removeImages('s_image','s_image_m','glasses_case_child',$id,$child);//删除图片并使数据库内的路径=NULL
}else if($_GET['din']=='z'){
	
	 $sqll="SELECT * FROM ".$ecs->table('glasses_case_child')." where id=".$id;

     $child=$db->getRow($sqll);
	  $tiao_id=$child['parent_id'];
     $state=removeImages('z_image','z_image_m','glasses_case_child',$id,$child);//删除图片并使数据库内的路径=NULL
}
 
	//$sql="Update  ".$ecs->table('glasses_case_child')." SET child_ims='',child_ims_m='' where id=".$id;

    //$state=$db->query($sql);

clear_cache_files(); // 清除模版缓存
if($state){
 $links[0]['text']    ="返回";
  $links[0]['href']    = 'glasses_case.php?act=edit&id='.$tiao_id;
  sys_msg("图片删除成功", 0, $links);
 }else{
  $links[0]['text']    ="返回";
  $links[0]['href']    = 'glasses_case.php?act=edit&id='.$tiao_id;
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
    $sql = 'SELECT COUNT(*) FROM ' .$GLOBALS['ecs']->table('glasses_case'). ' AS ad ' . $where;
    $filter['record_count'] = $GLOBALS['db']->getOne($sql);

    $filter = page_and_size($filter);
	


    /* 获得广告数据 */
    $arr = array();
    $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('glasses_case'). 'AS ad ' .
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
		$sql = "INSERT INTO ".$GLOBALS['ecs']->table('glasses_casechild')."(title,content,offset_sudu,child_imp,child_imp_m,child_ims,child_ims_m,resort,addtime,parent_id,isshow,position,maskshow,percentage)".
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
		$sql = "INSERT INTO ".$GLOBALS['ecs']->table('glasses_casechild')."(title,content,offset_sudu,child_imp,child_imp_m,child_ims,child_ims_m,resort,addtime,parent_id,isshow,position,maskshow,percentage)".
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
$sql = "SELECT * FROM " .$GLOBALS['ecs']->table('glasses_casechild'). " WHERE parent_id='".intval($parent_id)."'"."order by id asc";
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
		 $sql = "UPDATE " .$GLOBALS['ecs']->table('glasses_casechild'). " SET ".
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