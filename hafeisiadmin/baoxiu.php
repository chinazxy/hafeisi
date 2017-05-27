<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
require_once(ROOT_PATH . 'includes/cls_image.php');
require_once(ROOT_PATH . "includes/fckeditor/fckeditor.php");

if ($_REQUEST['act'] == 'list')
{

       $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 1;

    $smarty->assign('ur_here',    '在线保修列表');
	
	    $smarty->assign('action_link',   array('href' => 'bxexcel.php', 'text' =>'导出EXCEL文件'));
  
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
	 
    $smarty->display('bxlist.htm');
}elseif ($_REQUEST['act'] == 'edit')
{
  
    $ck=time();
    
	$sql="UPDATE  " .$ecs->table('baoxiu'). " SET check_time='".$ck."' WHERE id='".intval($_REQUEST['id'])."'";
	
	$db->query($sql);

    $sql = "SELECT * FROM " .$ecs->table('baoxiu'). " WHERE id='".intval($_REQUEST['id'])."'";
    $ads_arr = $db->getRow($sql);
    $ads_arr['province_name']=getRegionName($ads_arr['province']);
   	$ads_arr['districts_name']=getRegionName($ads_arr['districts']);
	$ads_arr['city_name']=getRegionName($ads_arr['city']);
	
	$ads_arr['server_time']=date("Y-m-d H:i:s",$ads_arr['server_time']);
	$ads_arr['buy_time']=date("Y-m-d",$ads_arr['buy_time']);
	$ads_arr['goods_name1']=$db->getOne("SELECT cat_name FROM " .$ecs->table('category'). " WHERE cat_id='".$ads_arr['catergory']."'");
	
	$ads_arr['goods_name2']=$db->getOne("SELECT cat_name FROM " .$ecs->table('category'). " WHERE cat_id='".$ads_arr['catergory_c']."'");

		$ads_arr['goods_name3']=$db->getOne("SELECT cat_name FROM " .$ecs->table('category'). " WHERE cat_id='".$ads_arr['catergory_s']."'");

    $smarty->assign('ur_here',       "查看保修信息");
    $smarty->assign('action_link',   array('href' => 'baoxiu.php?act=list', 'text' =>'在线保修列表'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
    $smarty->assign('ads',           $ads_arr);

    assign_query_info();
    $smarty->display('bx.htm');
}elseif ($_REQUEST['act'] == 'query')
{
    $ads_list = get_lunbolist();

    $smarty->assign('ads_list',     $ads_list['ads']);
    $smarty->assign('filter',       $ads_list['filter']);
    $smarty->assign('record_count', $ads_list['record_count']);
    $smarty->assign('page_count',   $ads_list['page_count']);

    $sort_flag  = sort_flag($ads_list['filter']);
    $smarty->assign($sort_flag['tag'], $sort_flag['img']);

    make_json_result($smarty->fetch('bxlist.htm'), '',
        array('filter' => $ads_list['filter'], 'page_count' => $ads_list['page_count']));
}elseif ($_REQUEST['act'] == 'remove')
{
  
    $id = intval($_REQUEST['id']);
	
   
    $sql="DELETE  FROM  ".$ecs->table('baoxiu'). " where id=$id";

    $state=$db->query($sql);
	

  $url = 'baoxiu.php?act=query&' . str_replace('act=remove', '', $_SERVER['QUERY_STRING']);

    ecs_header("Location: $url\n");
}


function get_lunbolist()
{
    /* 过滤查询 */
    $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 0;
 //   echo $pid;
    $filter = array();
      //$filter['pid']    = empty($_REQUEST['pid']) ? 'ad.zhixun_type' : trim($_REQUEST['pid']);


    $where = 'where ad.id >0';
 

    /* 获得总记录数据 */
    $sql = 'SELECT COUNT(*) FROM ' .$GLOBALS['ecs']->table('baoxiu'). ' AS ad ' . $where;
    $filter['record_count'] = $GLOBALS['db']->getOne($sql);

    $filter = page_and_size($filter);
	


    /* 获得广告数据 */
    $arr = array();
    $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('baoxiu'). 'AS ad ' .$where.' ORDER BY ad.id desc';

    $res = $GLOBALS['db']->selectLimit($sql, $filter['page_size'], $filter['start']);
  
    while ($rows = $GLOBALS['db']->fetchRow($res))
    {
         /* 广告类型的名称 */
	  $rows['servertime']  = date("Y-m-d H:i:s",$rows['server_time']);
	    $rows['buytime']  = date("Y-m-d H:i:s",$rows['buy_time']);
           $rows['addtime']  = date("Y-m-d H:i:s",$rows['addtime']);


         $arr[] = $rows;
    }

    return array('ads' => $arr, 'filter' => $filter, 'page_count' => $filter['page_count'], 'record_count' => $filter['record_count']);
}

  function getRegionName($id){
  
   $sql="SELECT region_name FROM ".$GLOBALS['ecs']->table('region')." WHERE region_id=".$id;
  
  
    $region_name=$GLOBALS['db']->getOne($sql);
	
	
	return $region_name;
  
  }

?>