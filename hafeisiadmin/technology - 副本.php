<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
require_once(ROOT_PATH . "includes/fckeditor/fckeditor.php");

if ($_REQUEST['act'] == 'list')
{

       $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 0;

    $smarty->assign('ur_here',    '招聘管理');
    $smarty->assign('action_link', array('text' =>'招聘添加', 'href' => 'join.php?act=add'));
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
	 
    $smarty->display('joinlist.htm');
}elseif($_REQUEST['act'] == 'add'){
 create_html_editor2('statement',"");
 create_html_editor3('requirements',"");
    $smarty->assign('action',        'add');
	   $smarty->assign('form_act', 'insert');
 $smarty->display('joinadd.htm');
}elseif ($_REQUEST['act'] == 'insert')
{


	$position=isset($_POST['position'])?trim($_POST['position']):"";
	if(empty($_POST['fp_time'])){
	
	$_POST['fp_time']=time();
	}
	$address=isset($_POST['address'])?trim($_POST['address']):"";
    $fp_time=isset($_POST['fp_time'])?trim(strtotime($_POST['fp_time'])):"";

  
	$treatment=isset($_POST['treatment'])?trim($_POST['treatment']):"";
    $validity=isset($_POST['validity'])?trim($_POST['validity']):"";
		$statement=isset($_POST['statement'])?trim($_POST['statement']):"";
    $requirements=isset($_POST['requirements'])?trim($_POST['requirements']):"";
$deparment=isset($_POST['deparment'])?trim($_POST['deparment']):"";
 $resort=isset($_POST['resort'])?intval($_POST['resort']):0;
	$sql = "INSERT INTO ".$GLOBALS['ecs']->table('position')."(position,address,fp_time,treatment,validity,statement,requirements,deparment,resort) ".
            "VALUES ('$position','$address','$fp_time','$treatment','$validity','$statement','$requirements','$deparment','$resort')";

    $GLOBALS['db']->query($sql);

    /* 记录管理员操作 */
    admin_log($_POST['ad_name'], 'add', 'joinadd');

    clear_cache_files(); // 清除缓存文件

    /* 提示信息 */

    $link[1]['text'] = "返回列表";
    $link[1]['href'] = 'join.php?act=list';

    $link[2]['text'] = "继续添加";
    $link[2]['href'] = 'join.php?act=add';
    sys_msg($_LANG['add'] . "&nbsp;" .$_POST['title'] . "&nbsp;" .'添加成功',0, $link);

}elseif ($_REQUEST['act'] == 'edit')
{



    $sql = "SELECT * FROM " .$ecs->table('position'). " WHERE id='".intval($_REQUEST['id'])."'";
    $ads_arr = $db->getRow($sql);

    $ads_arr['title'] = htmlspecialchars($ads_arr['title']);
 $ads_arr['addtime']=date("Y-m-d H:i:s",$ads_arr['fp_time']);
 create_html_editor2('statement',$ads_arr['statement']);
 create_html_editor3('requirements',$ads_arr['requirements']);
    $smarty->assign('ur_here',       "招聘修改");
    $smarty->assign('action_link',   array('href' => 'join.php?act=list', 'text' =>'招聘列表'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
    $smarty->assign('ads',           $ads_arr);

    assign_query_info();
    $smarty->display('joinadd.htm');
}
elseif ($_REQUEST['act'] == 'update')
{
  
    $id=$_POST['id'];
    /* 初始化变量 */
	$position=isset($_POST['position'])?trim($_POST['position']):"";
	
	$address=isset($_POST['address'])?trim($_POST['address']):"";
    $fp_time=isset($_POST['fp_time'])?trim(strtotime($_POST['fp_time'])):"";

  $deparment=isset($_POST['deparment'])?trim($_POST['deparment']):"";
	$treatment=isset($_POST['treatment'])?trim($_POST['treatment']):"";
    $validity=isset($_POST['validity'])?trim($_POST['validity']):"";
		$statement=isset($_POST['statement'])?trim($_POST['statement']):"";
    $requirements=isset($_POST['requirements'])?trim($_POST['requirements']):"";
      $resort=isset($_POST['resort'])?intval($_POST['resort']):0;
	    $sql = "UPDATE " .$GLOBALS['ecs']->table('position'). " SET ".
            "position = '$position', ".
            "address     = '$address', ".
            "fp_time     = '$fp_time', ".
            "treatment  = '$treatment', ".
            "validity    = '$validity', ".
			 "deparment    = '$deparment', ".
			   "statement    = '$statement', ".
			      "resort    = '$resort', ".
			   	   "requirements    = '$requirements' ".
            "WHERE id = '$id'";	
			
		
     $GLOBALS['db']->query($sql);
   /* 记录管理员操作 */
   admin_log($_POST['ad_name'], 'edit', 'joinadd');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回列表', 'href' => 'join.php?act=list');
   sys_msg($_LANG['edit'] .' '.$_POST['position'].' '. '修改成功!', 0, $href);

}elseif ($_REQUEST['act'] == 'remove')
{
  
    $id = intval($_REQUEST['id']);
	
    $sql="DELETE  FROM  ".$ecs->table('position'). " where id=$id";

    $state=$db->query($sql);
	

  $url = 'join.php?act=query&' . str_replace('act=remove', '', $_SERVER['QUERY_STRING']);

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

    make_json_result($smarty->fetch('joinlist.htm'), '',
        array('filter' => $ads_list['filter'], 'page_count' => $ads_list['page_count']));
}


function get_lunbolist()
{
    /* 过滤查询 */
    $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 0;

    $filter = array();
    $filter['position']    = empty($_REQUEST['position']) ? 'ad.position' : trim($_REQUEST['position']);


    $where = '';
    if ($pid > 0)
    {
        $where .= " AND ad.id = '$pid' ";
    }

    /* 获得总记录数据 */
    $sql = 'SELECT COUNT(*) FROM ' .$GLOBALS['ecs']->table('position'). ' AS ad ' . $where;
    $filter['record_count'] = $GLOBALS['db']->getOne($sql);

    $filter = page_and_size($filter);
	


    /* 获得广告数据 */
    $arr = array();
    $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('position'). 'AS ad ' .
            'GROUP BY ad.id desc';

    $res = $GLOBALS['db']->selectLimit($sql, $filter['page_size'], $filter['start']);
  
    while ($rows = $GLOBALS['db']->fetchRow($res))
    {
         /* 广告类型的名称 */
	
           $rows['addtime']  = date("Y-m-d",$rows['fp_time']);


         $arr[] = $rows;
    }

    return array('ads' => $arr, 'filter' => $filter, 'page_count' => $filter['page_count'], 'record_count' => $filter['record_count']);
}






?>