<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
 

if ($_REQUEST['act'] == 'list')
{

       $user_id = !empty($_REQUEST['user_id']) ? intval($_REQUEST['user_id']) : 0;

    $smarty->assign('ur_here',    '个人处方列表');
   
    $smarty->assign('user_id',         $user_id);
     $smarty->assign('full_page',  1);
	 
	 
	    $ads_list = get_chufanglist();

    $smarty->assign('list',     $ads_list['ads']);
    $smarty->assign('filter',       $ads_list['filter']);
    $smarty->assign('record_count', $ads_list['record_count']);
    $smarty->assign('page_count',   $ads_list['page_count']);

    $sort_flag  = sort_flag($ads_list['filter']);
    $smarty->assign($sort_flag['tag'], $sort_flag['img']);

    assign_query_info();
	 
    $smarty->display('chufanglist.htm');
}elseif ($_REQUEST['act'] == 'edit')
{
  
 
  $uid=$_GET['uid'];
  
  if($uid>0 && $_REQUEST['id']>0){

    $sql = "SELECT * FROM " .$ecs->table('chufang'). " WHERE id='".intval($_REQUEST['id'])."'";
    $ads_arr = $db->getRow($sql);

  $sql="select *  from  ".$ecs->table('dingzhi_chufan_child')." order by parent_id asc,value asc";
$cflist=$db->getAll($sql);
$cfarray=array();
 foreach($cflist as $k=>$v){
 $cfarray[$v['parent_id']][$v['id']]=$v['value'];
}
foreach($cflist as $k=>$v){

if($v['parent_id']==8 || $v['parent_id']==4){


   if($v['parent_id']==4){
    if($cfinfo['l_eye_t']==$v['value']){
	 $cfarray['l_eye_t']['html'].='<option value="'.$v['id'].'" selected="selected">'.$v['value'].'</option>';
	}else{
		 $cfarray['l_eye_t']['html'].='<option value="'.$v['id'].'" >'.$v['value'].'</option>';
	}

  }else if($v['parent_id']==8){
      if($cfinfo['r_eye_t']==$v['value']){
	 $cfarray['r_eye_t']['html'].='<option value="'.$v['id'].'" selected="selected">'.$v['value'].'</option>';
	}else{
     $cfarray['r_eye_t']['html'].='<option value="'.$v['id'].'" >'.$v['value'].'</option>';
	}
  }
  


}else if($v['parent_id']==1 || $v['parent_id']==5){

  
    if($v['parent_id']==1){
	    if($cfinfo['l_eye_s']==$v['value']){
	 $cfarray['l_eye_s']['html'].='<option value="'.$v['id'].'" selected="selected">'.$v['value'].'</option>';
	}else{
		 $cfarray['l_eye_s']['html'].='<option value="'.$v['id'].'" >'.$v['value'].'</option>';
	}
	}else if($v['parent_id']==5){
		    if($cfinfo['r_eye_s']==$v['value']){
	 $cfarray['r_eye_s']['html'].='<option value="'.$v['id'].'" selected="selected">'.$v['value'].'</option>';
	}else{
		 $cfarray['r_eye_s']['html'].='<option value="'.$v['id'].'" >'.$v['value'].'</option>';
	}
	
	}
  
  

  
 

}else if($v['parent_id']==2 || $v['parent_id']==6){

      if($v['parent_id']==2){
      if($cfinfo['l_eye_c']==$v['value']){
	 $cfarray['l_eye_c']['html'].='<option value="'.$v['id'].'" selected="selected">'.$v['value'].'</option>';
	}else{
		 $cfarray['l_eye_c']['html'].='<option value="'.$v['id'].'" >'.$v['value'].'</option>';
	}
	}else if($v['parent_id']==6){
	
			    if($cfinfo['r_eye_c']==$v['value']){
	 $cfarray['r_eye_c']['html'].='<option value="'.$v['id'].'" selected="selected">'.$v['value'].'</option>';
	}else{
		 $cfarray['r_eye_c']['html'].='<option value="'.$v['id'].'" >'.$v['value'].'</option>';
	}
	}

  

}
}
      
		$smarty->assign('cfarray',    $cfarray); 

    $smarty->assign('ur_here',       "处方信息修改");
    $smarty->assign('action_link',   array('href' => 'chufang.php?act=list&id='.$_REQUEST['id'].'&user_id='.$uids.'', 'text' =>'我的处方列表'));
    $smarty->assign('form_act',      'update');
	    $smarty->assign('ids',        $_REQUEST['id']);
		    $smarty->assign('uids',        $uid);
 
    $smarty->assign('cfc',           $ads_arr);
 
    assign_query_info();   
	$smarty->display('chufangedit.htm');
  }else{
	      $link[1]['text'] = "返回用户列表";
       $link[1]['href'] = 'users.php?act=list';
	     sys_msg('非法参数',0, $link);  
	  
  }

}elseif ($_REQUEST['act'] == 'remove')
{
  
    $id = intval($_REQUEST['id']);
	
 
   
    $sql="DELETE  FROM  ".$ecs->table('chufang'). " where id=$id";

    $state=$db->query($sql);
	

  $url = 'chufang.php?act=query&' . str_replace('act=remove', '', $_SERVER['QUERY_STRING']);

    ecs_header("Location: $url\n");
}elseif($_REQUEST['act'] == 'update'){
	
	
 
	
	$chufang['l_eye_s']=getCfval($_POST['l_eye_s']);
	$chufang['l_eye_c']=getCfval($_POST['l_eye_c']);
	$chufang['l_eye_a']=getCfval($_POST['l_eye_a']);
	$chufang['l_eye_t']=getCfval($_POST['l_eye_t']);
	$chufang['r_eye_s']=getCfval($_POST['r_eye_s']);
	$chufang['r_eye_c']=getCfval($_POST['r_eye_c']);
	$chufang['r_eye_a']=getCfval($_POST['r_eye_a']);
	$chufang['r_eye_t']=getCfval($_POST['r_eye_t']);
	$chufang['r_eye_pd']=$l_eye_t+$r_eye_t;
	$uid=$_POST['uid'];
	$id=$_POST['id'];					 
						  
		$sql="UPDATE " .$ecs->table('chufang'). " SET 
`l_eye_s` = '".$chufang['l_eye_s']."',
`l_eye_c` = '".$chufang['l_eye_c']."',
`l_eye_a` = '".$chufang['l_eye_a']."',
`l_eye_t` = '".$chufang['l_eye_t']."',
`r_eye_s` = '".$chufang['r_eye_s']."',
`r_eye_c` = '".$chufang['r_eye_c']."',
`r_eye_a` = '".$chufang['r_eye_a']."',
`r_eye_t` = '".$chufang['r_eye_t']."',
`pd_eye_t` = '".$chufang['pd_eye_t']."' WHERE `id` =$id";			  
$state=$db->query($sql);
	     if($state!==false){	
	   $link[1]['text'] = "返回";
       $link[1]['href'] = 'chufang.php?act=edit&id='.$id.'&uid='.$uid.'';
	   sys_msg('修改成功',0, $link);  
			}else{
		  $link[1]['text'] = "返回";
          $link[1]['href'] = 'chufang.php?act=edit&id='.$id.'&uid='.$uid.'';
	      sys_msg('修改失败',0, $link); 	
			}
	
	
	
}elseif ($_REQUEST['act'] == 'query')
{   

     $ads_list['user_id']=$_REQUEST['user_id'];
    $ads_list = get_chufanglist();
  
    $smarty->assign('list',     $ads_list['ads']);
    $smarty->assign('filter',       $ads_list['filter']);
    $smarty->assign('record_count', $ads_list['record_count']);
    $smarty->assign('page_count',   $ads_list['page_count']);

    $sort_flag  = sort_flag($ads_list['filter']);
    $smarty->assign($sort_flag['tag'], $sort_flag['img']);

    make_json_result($smarty->fetch('chufanglist.htm'), '',
        array('filter' => $ads_list['filter'], 'page_count' => $ads_list['page_count']));
}


function get_chufanglist()
{
    /* 过滤查询 */
   // $user_id = !empty($_REQUEST['user_id']) ? intval($_REQUEST['user_id']) : 0;
 //   echo $pid;
 
    $filter = array();
    $filter['user_id']    = empty($_REQUEST['user_id']) ? 'ad.user_id' : trim($_REQUEST['user_id']);


    $where = 'where ad.id >0';
    if ($filter['user_id']>=0)
    {
        $where .= " AND ad.uid = '". $filter['user_id']."' ";
    }

    /* 获得总记录数据 */
    $sql = 'SELECT COUNT(*) FROM ' .$GLOBALS['ecs']->table('chufang'). ' AS ad ' . $where;
	
	
    $filter['record_count'] = $GLOBALS['db']->getOne($sql);

    $filter = page_and_size($filter);
	


    /* 获得广告数据 */
    $arr = array();
    $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('chufang'). 'AS ad ' .$where.' ORDER BY ad.id desc';

    $res = $GLOBALS['db']->selectLimit($sql, $filter['page_size'], $filter['start']);
  
    while ($rows = $GLOBALS['db']->fetchRow($res))
    {
         /* 广告类型的名称 */
	
           $rows['addtime']  = date("Y-m-d H:i:s",$rows['addtime']);


         $arr[] = $rows;
    }

    return array('ads' => $arr, 'filter' => $filter, 'page_count' => $filter['page_count'], 'record_count' => $filter['record_count']);
}


function getCfval($id){
	
	if($id>=0){
	
	$sql="SELECT  value FROM " .$GLOBALS['ecs']->table('dingzhi_chufan_child'). " WHERE id='".$id."'";
	
	$finfo=$GLOBALS['db']->getOne($sql);
	
	return $finfo;
	}
	
}


?>