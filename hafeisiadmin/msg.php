<?php

define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');

$act=!empty($_REQUEST['act'])?trim($_REQUEST['act']):"list";

if ($act == 'list')
{
    /* 模板赋值 */
    $smarty->assign('ur_here',"留言列表");
    $smarty->assign('action_link', array('href' => 'msg.php', 'text' => $_LANG['04_kefu']));

    $smarty->assign('full_page',        1);

     $serial_list = get_serial_list();
    $smarty->assign('serial_list',   $serial_list['serial_list']);
    $smarty->assign('filter',       $serial_list['filter']);
    $smarty->assign('record_count', $serial_list['record_count']);
    $smarty->assign('page_count',   $serial_list['page_count']);
    $smarty->assign('sort_order_time', '<img src="images/sort_desc.gif">');

    /* 显示模板 */
    assign_query_info();
    $smarty->display('msglist.htm');
}elseif($act=="delete"){

  $id=$_GET['id'];
  
  $sql="DELETE FROM ".$ecs->table('message')." WHERE id=".$id; 
  
  $state=$db->query($sql);
  
 
  
  if($state){
   

         $links[0]['text']    ="留言列表页";
    $links[0]['href']    = 'msg.php';
      sys_msg("删除成功", 0, $links);
  }else{
      $links[0]['text']    ="留言列表页";
    $links[0]['href']    = 'msg.php';
     sys_msg("删除失败", 0, $links);
  }


}elseif($act=="join_batch_remove"){

 $serial=$_POST['checkboxes'];
  
  $count=count($serial);
  
  $t=0;
   
  for($i=0;$i<$count;$i++){
  
   $sql="DELETE FROM ".$ecs->table('contact_message')." WHERE id=".$serial[$i];
   
   $state=$db->query($sql);
   
   
  
  }
  

  
    $links[0]['text']    ="留言列表页";
    $links[0]['href']    = 'msg.php';
    sys_msg("删除成功", 0, $links);
  

}elseif ($act == 'join_query')
{

    $serial_list = get_serial_list();

   $smarty->assign('serial_list',   $serial_list['serial_list']);
    $smarty->assign('filter',       $serial_list['filter']);
    $smarty->assign('record_count', $serial_list['record_count']);
    $smarty->assign('page_count',   $serial_list['page_count']);
   

    $sort_flag = sort_flag($result['filter']);
    $smarty->assign($sort_flag['tag'], $sort_flag['img']);
 make_json_result($smarty->fetch('msglist.htm'), '', array('filter' => $serial_list['filter'], 'page_count' => $serial_list['page_count']));
}elseif($act=="detail"){

   $id=$_GET['id'];
   $sql="SELECT * from ".$ecs->table('contact_message')." WHERE id=".$id;
   $msg=$db->getRow($sql);
	
	  $sql="UPDATE  ".$ecs->table('contact_message')." SET checktime='".time()."' WHERE id=".$id;
      $db->query($sql);
$smarty->assign('msg',$msg);
    $smarty->display('msgdetail.htm');
}
function get_serial_list(){


    $result = get_filter();
	//echo $user_id;
    if ($result === false)
    {
        /* 过滤条件 */
        $filter['keywords'] = empty($_REQUEST['keywords']) ? '' : trim($_REQUEST['keywords']);
        if (isset($_REQUEST['is_ajax']) && $_REQUEST['is_ajax'] == 1)
        {
            $filter['keywords'] = json_str_iconv($filter['keywords']);
        }

        $filter['sort_by']    = empty($_REQUEST['sort_by'])    ? 'id' : trim($_REQUEST['sort_by']);
        $filter['sort_order'] = empty($_REQUEST['sort_order']) ? 'DESC'     : trim($_REQUEST['sort_order']);

        $ex_where = ' WHERE 1 ';
        if ($filter['keywords'])
        {
            $ex_where .= " AND name ='" . mysql_like_quote($filter['keywords']) ."'";
        }
  
 
        $filter['record_count'] = $GLOBALS['db']->getOne("SELECT COUNT(*) FROM " . $GLOBALS['ecs']->table('contact_message') . $ex_where);

        /* 分页大小 */
        $filter = page_and_size($filter);
		
        $sql = "SELECT * ".
                " FROM " . $GLOBALS['ecs']->table('contact_message') . $ex_where .
                " ORDER by " . $filter['sort_by'] . ' ' . $filter['sort_order'] .
                " LIMIT " . $filter['start'] . ',' . $filter['page_size'];

        $filter['keywords'] = stripslashes($filter['keywords']);
        set_filter($filter, $sql);
    }
    else
    {
        $sql    = $result['sql'];
        $filter = $result['filter'];
    }

    $serial_list = $GLOBALS['db']->getAll($sql);
	
		for($i=0;$i<count($serial_list);$i++){
	
	    $serial_list[$i]['addtime']=date("Y-m-d H:i:s",$serial_list[$i]['add_time']);
		
		if(!empty($serial_list[$i]['checktime'])){
		
		  $serial_list[$i]['checktime']=date("Y-m-d H:i:s",$serial_list[$i]['checktime']);
		}else{
		$serial_list[$i]['checktime']="未查阅";
		
		}
	
	}

    $arr = array('serial_list' => $serial_list, 'filter' => $filter,
        'page_count' => $filter['page_count'], 'record_count' => $filter['record_count']);

    return $arr;



}


?>