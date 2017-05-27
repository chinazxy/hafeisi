<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');


if($_REQUEST['act'] == 'add'){

   if( $_GET['id']>0){
    $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('dingzhi_peij'). 'AS ad ' .
            'where relative_id='.$_GET['id'].' GROUP BY ad.id desc';
	    $res=$GLOBALS['db']->getAll($sql);
	   
        foreach($res as $k=>$v){
		  $res[$k]['format']=date("Y-m-d",$v["addtime"]);
		}
			}
			


	
	    $smarty->assign('res',        $res);		
	  $smarty->assign('ids',        $_GET['id']);
    $smarty->assign('action',        'add');
	   $smarty->assign('form_act', 'insert');
 $smarty->display('peigian.htm');
}elseif ($_REQUEST['act'] == 'insert')
{

$ids=isset($_POST['ids'])?(int)$_POST['ids']:0;
	$name=isset($_POST['name'])?trim($_POST['name']):"";
    $number=isset($_POST['number'])?trim($_POST['number']):"";
    
	   $sql = "INSERT INTO ".$GLOBALS['ecs']->table('dingzhi_peij')."(name,number,relative_id,addtime) ".
            "VALUES ('$name','$number','$ids','".time()."')";


	
    $GLOBALS['db']->query($sql);
    /* 记录管理员操作 */
    admin_log($_POST['ad_name'], 'add', 'dingzhi');

    clear_cache_files(); // 清除缓存文件

    /* 提示信息 */

    $link[1]['text'] = "返回";
    $link[1]['href'] = 'peigian.php?act=add&id='.$ids;

    sys_msg($_LANG['add'] . "&nbsp;" .$_POST['name'] . "&nbsp;" .'添加成功',0, $link);

}elseif ($_REQUEST['act'] == 'edit')
{



    $sql = "SELECT * FROM " .$ecs->table('dingzhi_peij'). " WHERE id='".intval($_REQUEST['cid'])."'";
    $ads_arr = $db->getRow($sql);
    $ads_arr['name'] = htmlspecialchars($ads_arr['name']);

	    $smarty->assign('res',        $res);		
	  $smarty->assign('ids',        $_GET['id']);
	  	  $smarty->assign('cid',        $_GET['cid']);
    $smarty->assign('ur_here',       "修改");
    $smarty->assign('action_link',   array('href' => 'peigian.php?act=add&id='. $_GET['id'].'', 'text' =>'返回列表'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
    $smarty->assign('ads',           $ads_arr);

    assign_query_info();
    $smarty->display('peigian.htm');
}
elseif ($_REQUEST['act'] == 'update')
{
 
   $id=$_REQUEST['ids'];
  $cid=$_REQUEST['cid'];
  
  
    /* 初始化变量 */
 	$name=isset($_POST['name'])?trim($_POST['name']):"";
    $number=isset($_POST['number'])?trim($_POST['number']):"";
	
    $sql = "UPDATE " .$GLOBALS['ecs']->table('dingzhi_peij'). " SET ".
            "name = '$name', ".     
            "number  = '$number'".
				 
            "WHERE id = '$cid'";	





    $GLOBALS['db']->query($sql);
   /* 记录管理员操作 */
   admin_log($_POST['ad_name'], 'edit', 'jk');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回', 'href' => 'peigian.php?act=edit&id='.$id.'&cid='. $cid.'');
   sys_msg($_POST['name'].' '. '修改成功!', 0, $href);

}elseif ($_REQUEST['act'] == 'remove')
{


  require_once(ROOT_PATH . 'includes/cls_json.php');
    $id = intval($_REQUEST['id']);
	$cid = intval($_REQUEST['cid']);
    $sql="DELETE  FROM  ".$ecs->table('dingzhi_peij'). " where id=$cid and relative_id=".$id;

    $states=$db->query($sql);
	

   if($states!==false){
   
    $rs = array('err' => 1,"id"=>$id,"cid"=>$cid);
   }else{
       $rs = array('err' => 0,"id"=>$id,"cid"=>$cid);
   }
   
       $json  = new JSON;
 die($json->encode($rs));
}






?>