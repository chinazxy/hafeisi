<?php


define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');
require_once(ROOT_PATH . '/includes/lib_order.php');
require_once(ROOT_PATH . 'includes/cls_image.php');

/*------------------------------------------------------ */
//-- 框架
/*------------------------------------------------------ */
if ($_REQUEST['act'] == 'list')
{

       $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 0;

    $smarty->assign('ur_here',    '直营店管理');
    $smarty->assign('action_link', array('text' =>'直营店添加', 'href' => 'salestone.php?act=add'));
    $smarty->assign('pid',         $pid);
     $smarty->assign('full_page',  1);
	 
	 
	    $ads_list = get_salelist();

    $smarty->assign('ads_list',     $ads_list['ads']);
    $smarty->assign('filter',       $ads_list['filter']);
    $smarty->assign('record_count', $ads_list['record_count']);
    $smarty->assign('page_count',   $ads_list['page_count']);

    $sort_flag  = sort_flag($ads_list['filter']);
    $smarty->assign($sort_flag['tag'], $sort_flag['img']);

    assign_query_info();
	 
    $smarty->display('stonelist.htm');
}elseif($_REQUEST['act'] == 'add'){

 $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('salestone_type'). 'AS st ' .
            'GROUP BY st.id asc';

 $typelist=$GLOBALS['db']->getAll($sql);
 $smarty->assign("typelist",$typelist);
    $smarty->assign('action',        'add');
	   $smarty->assign('form_act', 'insert');
 $smarty->display('salestoneadd.htm');
}
elseif ($_REQUEST['act'] == 'insert')
{
    //admin_priv('ad_manage');

    /* 初始化变量 */

    $title = !empty($_POST['title']) ? trim($_POST['title']) : '';


    /* 查看广告名称是否有重复 */
    $sql = "SELECT COUNT(*) FROM " .$ecs->table('salestone'). " WHERE title = '$title'";
    if ($db->getOne($sql) > 0)
    {
        $link[] = array('text' => $_LANG['go_back'], 'href' => 'javascript:history.back(-1)');
        sys_msg("该直营店已存在！", 0, $link);
    }
	$name=isset($_POST['title'])?trim($_POST['title']):"";
	$entitle=isset($_POST['entitle'])?trim($_POST['entitle']):"";
	$type=isset($_POST['stone_types'])?(int)$_POST['stone_types']:1;
		$address=isset($_POST['address'])?trim($_POST['address']):"";
	$enaddress=isset($_POST['enaddress'])?trim($_POST['enaddress']):"";
	$fax=isset($_POST['fax'])?trim($_POST['fax']):"";

	$xsize=isset($_POST['xsize'])?trim($_POST['xsize']):"";
	$ysize=isset($_POST['ysize'])?trim($_POST['ysize']):"";
	$phone=isset($_POST['phone'])?trim($_POST['phone']):"";
	$onlinephone=isset($_POST['onlinephone'])?trim($_POST['onlinephone']):"";
   $resort=isset($_POST['resort'])?(int)$_POST['resort']:1;
   
   $orgImg='';
   
   if(isset($_FILES['images']['name']) && $_FILES['images']['name'] != ''  && $_FILES['images']['error']==0) {

$path= ROOT_PATH;
$image = new cls_image();
$filename =$image->random_filename() . substr($_FILES['images']['name'], strpos($_FILES['images']['name'], '.'));
$orgImg=DATA_DIR . "/salestone/".$filename;


//原图保存
if (!move_upload_file($_FILES['images']['tmp_name'],$path.$orgImg))
    {
        return false;
    }
	

	

}else{

 $orgImg=$_POST['hide_img'];

}


    /* 插入数据 */
    $sql = "INSERT INTO ".$ecs->table('salestone'). " (id,title,entitle,address,enaddress,fax,xsize,ysize,phone,onlinephone,type,resort,images)
    VALUES (NULL,
            '$title',
			'$entitle',
            '$address',
			'$enaddress',
            '$fax',
            '$xsize',
            '$ysize',
            '$phone',
            '$onlinephone',
            '$type',
            '$resort',
			'$orgImg'
			)";

    $db->query($sql);
    /* 记录管理员操作 */
    admin_log($_POST['ad_name'], 'add', 'salestone');

    clear_cache_files(); // 清除缓存文件

    /* 提示信息 */

    $link[1]['text'] = "返回列表";
    $link[1]['href'] = 'salestone.php?act=list';

    $link[2]['text'] = "继续添加";
    $link[2]['href'] = 'salestone.php?act=add';
    sys_msg($_LANG['add'] . "&nbsp;" .$_POST['title'] . "&nbsp;" .'添加成功',0, $link);

}elseif ($_REQUEST['act'] == 'edit')
{

 $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('salestone_type'). 'AS st ' .
            'GROUP BY st.id asc';

 $typelist=$GLOBALS['db']->getAll($sql);
 $smarty->assign("typelist",$typelist);
    /* 获取广告数据 */
    $sql = "SELECT * FROM " .$ecs->table('salestone'). " WHERE id='".intval($_REQUEST['id'])."'";
    $ads_arr = $db->getRow($sql);

    $ads_arr['title'] = htmlspecialchars($ads_arr['title']);
    /* 格式化广告的有效日期 */

    $smarty->assign('ur_here',       "直营店修改");
    $smarty->assign('action_link',   array('href' => 'salestone.php?act=list', 'text' =>'直营店列表'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
    $smarty->assign('ads',           $ads_arr);

    assign_query_info();
    $smarty->display('salestoneadd.htm');
}
elseif ($_REQUEST['act'] == 'update')
{
  

    /* 初始化变量 */
    $id   = !empty($_POST['id'])   ? intval($_POST['id'])   : 0;
  	$name=isset($_POST['title'])?trim($_POST['title']):"";
	$entitle=isset($_POST['entitle'])?trim($_POST['entitle']):"";
	$type=isset($_POST['stone_types'])?(int)$_POST['stone_types']:1;
		$address=isset($_POST['address'])?trim($_POST['address']):"";
		$enaddress=isset($_POST['enaddress'])?trim($_POST['enaddress']):"";
	$fax=isset($_POST['fax'])?trim($_POST['fax']):"";

	$xsize=isset($_POST['xsize'])?trim($_POST['xsize']):"";
	$ysize=isset($_POST['ysize'])?trim($_POST['ysize']):"";
	$phone=isset($_POST['phone'])?trim($_POST['phone']):"";
	$onlinephone=isset($_POST['onlinephone'])?trim($_POST['onlinephone']):"";
	$resort=isset($_POST['resort'])?(int)$_POST['resort']:1;
	   $orgImg='';
   
   if(isset($_FILES['images']['name']) && $_FILES['images']['name'] != ''  && $_FILES['images']['error']==0) {

$path= ROOT_PATH;
$image = new cls_image();
$filename =$image->random_filename() . substr($_FILES['images']['name'], strpos($_FILES['images']['name'], '.'));
$orgImg=DATA_DIR . "/salestone/".$filename;


//原图保存
if (!move_upload_file($_FILES['images']['tmp_name'],$path.$orgImg))
    {
        return false;
    }
	

	

}else{

 $orgImg=$_POST['hide_img'];

}
    /* 更新信息 */
    $sql = "UPDATE " .$ecs->table('salestone'). " SET ".
            "title = '$name', ".
			"entitle = '$entitle', ".
            "address     = '$address', ".
			"enaddress     = '$enaddress', ".
            "fax     = '$fax', ".
            "xsize  = '$xsize', ".
            "ysize    = '$ysize', ".
            "phone    = '$phone', ".
            "onlinephone  = '$onlinephone', ".
            "type  = '$type', ".
			"images='$orgImg',".
            "resort     = '$resort' ".
            "WHERE id = '$id'";
    $db->query($sql);

   /* 记录管理员操作 */
   admin_log($_POST['ad_name'], 'edit', 'salestone');

   clear_cache_files(); // 清除模版缓存

   /* 提示信息 */
   $href[] = array('text' => '返回列表', 'href' => 'salestone.php?act=list');
   sys_msg($_LANG['edit'] .' '.$_POST['title'].' '. '修改成功!', 0, $href);

}elseif ($_REQUEST['act'] == 'remove')
{
  
    $id = intval($_REQUEST['id']);
   
    $sql="DELETE  FROM  ".$ecs->table('salestone'). " where id=$id";

    $db->query($sql);

    admin_log('', 'remove', 'salestone');

    $url = 'salestone.php?act=query&' . str_replace('act=remove', '', $_SERVER['QUERY_STRING']);

    ecs_header("Location: $url\n");
    exit;
}elseif ($_REQUEST['act'] == 'query')
{
    $ads_list = get_salelist();

    $smarty->assign('ads_list',     $ads_list['ads']);
    $smarty->assign('filter',       $ads_list['filter']);
    $smarty->assign('record_count', $ads_list['record_count']);
    $smarty->assign('page_count',   $ads_list['page_count']);

    $sort_flag  = sort_flag($ads_list['filter']);
    $smarty->assign($sort_flag['tag'], $sort_flag['img']);

    make_json_result($smarty->fetch('stonelist.htm'), '',
        array('filter' => $ads_list['filter'], 'page_count' => $ads_list['page_count']));
}



function get_salelist()
{
    /* 过滤查询 */
    $pid = !empty($_REQUEST['pid']) ? intval($_REQUEST['pid']) : 0;

    $filter = array();
    $filter['title']    = empty($_REQUEST['title']) ? 'ad.title' : trim($_REQUEST['title']);
   // $filter['id'] = empty($_REQUEST['id']) ? 'DESC' : trim($_REQUEST['id']);

    $where = '';
    if ($pid > 0)
    {
        $where .= " AND ad.id = '$pid' ";
    }

    /* 获得总记录数据 */
    $sql = 'SELECT COUNT(*) FROM ' .$GLOBALS['ecs']->table('salestone'). ' AS ad ' . $where;
    $filter['record_count'] = $GLOBALS['db']->getOne($sql);

    $filter = page_and_size($filter);
	


    /* 获得广告数据 */
    $arr = array();
    $sql = 'SELECT *'.
            'FROM ' .$GLOBALS['ecs']->table('salestone'). 'AS ad ' .
            'GROUP BY ad.id desc,ad.resort asc';

    $res = $GLOBALS['db']->selectLimit($sql, $filter['page_size'], $filter['start']);
  
    while ($rows = $GLOBALS['db']->fetchRow($res))
    {
         /* 广告类型的名称 */
	       $sqls='SELECT t.name FROM ' .$GLOBALS['ecs']->table('salestone_type'). ' AS t where t.id='.$rows['type'];
		   $rowf=$GLOBALS['db']->getRow($sqls);
           $rows['type_name']  = $rowf['name'];

         /* 格式化日期 */
        // $rows['start_date']    = local_date($GLOBALS['_CFG']['date_format'], $rows['start_time']);
         //$rows['end_date']      = local_date($GLOBALS['_CFG']['date_format'], $rows['end_time']);

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
