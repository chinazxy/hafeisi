<?php

/**
 * ECSHOP 商品分类管理程序
 * ============================================================================
 * 版权所有 2005-2010 上海商派网络科技有限公司，并保留所有权利。
 * 网站地址: http://www.ecshop.com；
 * ----------------------------------------------------------------------------
 * 这不是一个自由软件！您只能在不用于商业目的的前提下对程序代码进行修改和
 * 使用；不允许对程序代码以任何形式任何目的的再发布。
 * ============================================================================
 * $Author: liuhui $
 * $Id: category.php 17063 2010-03-25 06:35:46Z liuhui $
*/

define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');
$exc = new exchange($ecs->table("category"), $db, 'cat_id', 'cat_name');
require_once(ROOT_PATH . 'includes/cls_image.php');
/* act操作项的初始化 */
if (empty($_REQUEST['act']))
{
    $_REQUEST['act'] = 'list';
}
else
{
    $_REQUEST['act'] = trim($_REQUEST['act']);
}

/*------------------------------------------------------ */
//-- 商品分类列表
/*------------------------------------------------------ */
if ($_REQUEST['act'] == 'list')
{
    /* 获取分类列表 */
    $cat_list = cat_list(0, 0, false);
	
	foreach($cat_list as $k=>$v){
	  $catadd=array(); 	
	  if(!empty($v['cat_addtype'])){
		  
	    $catadd=explode(",",$v['cat_addtype']);
	  }	
	  $cat_list[$k]['cat_addtypes']=$catadd;
	}


    /* 模板赋值 */
    $smarty->assign('ur_here',      $_LANG['03_category_list']);
    $smarty->assign('action_link',  array('href' => 'category.php?act=add', 'text' => $_LANG['04_category_add']));
    $smarty->assign('full_page',    1);

    $smarty->assign('cat_info',     $cat_list);

    /* 列表页面 */
    assign_query_info();
    $smarty->display('category_list.htm');
}

/*------------------------------------------------------ */
//-- 排序、分页、查询
/*------------------------------------------------------ */
elseif ($_REQUEST['act'] == 'query')
{
    $cat_list = cat_list(0, 0, false);
    $smarty->assign('cat_info',     $cat_list);

    make_json_result($smarty->fetch('category_list.htm'));
}
/*------------------------------------------------------ */
//-- 添加商品分类
/*------------------------------------------------------ */
if ($_REQUEST['act'] == 'add')
{
    /* 权限检查 */
    admin_priv('cat_manage');



    /* 模板赋值 */
    $smarty->assign('ur_here',      $_LANG['04_category_add']);
    $smarty->assign('action_link',  array('href' => 'category.php?act=list', 'text' => $_LANG['03_category_list']));

    $smarty->assign('goods_type_list',  goods_type_list(0)); // 取得商品类型
    $smarty->assign('attr_list',        get_attr_list()); // 取得商品属性

    $smarty->assign('cat_select',   cat_list(0, 0, true));
    $smarty->assign('form_act',     'insert');
    $smarty->assign('cat_info',     array('is_show' => 1));



    /* 显示页面 */
    assign_query_info();
    $smarty->display('category_info.htm');
}

/*------------------------------------------------------ */
//-- 商品分类添加时的处理
/*------------------------------------------------------ */
if ($_REQUEST['act'] == 'insert')
{
    /* 权限检查 */
    admin_priv('cat_manage');

    /* 初始化变量 */
    $cat['cat_id']       = !empty($_POST['cat_id'])       ? intval($_POST['cat_id'])     : 0;
    $cat['parent_id']    = !empty($_POST['parent_id'])    ? intval($_POST['parent_id'])  : 0;
    $cat['sort_order']   = !empty($_POST['sort_order'])   ? intval($_POST['sort_order']) : 0;
    $cat['keywords']     = !empty($_POST['keywords'])     ? trim($_POST['keywords'])     : '';
    $cat['cat_desc']     = !empty($_POST['cat_desc'])     ? $_POST['cat_desc']           : '';
	$cat['cat_endesc']   = !empty($_POST['cat_endesc'])     ? trim($_POST['cat_endesc'])     : '';
    $cat['measure_unit'] = !empty($_POST['measure_unit']) ? trim($_POST['measure_unit']) : '';
    $cat['cat_name']     = !empty($_POST['cat_name'])     ? trim($_POST['cat_name'])     : '';
	$cat['cat_enname']   = !empty($_POST['cat_enname'])     ? trim($_POST['cat_enname'])     : '';
    $cat['show_in_nav']  = !empty($_POST['show_in_nav'])  ? intval($_POST['show_in_nav']): 0;
    $cat['style']        = !empty($_POST['style'])        ? trim($_POST['style'])        : '';
    $cat['is_show']      = !empty($_POST['is_show'])      ? intval($_POST['is_show'])    : 0;
    $cat['grade']        = !empty($_POST['grade'])        ? intval($_POST['grade'])      : 0;
	$cat['des_title']     = !empty($_POST['des_title'])     ? trim($_POST['des_title'])     : '';
	$cat['des_entitle']   = !empty($_POST['des_entitle'])     ? trim($_POST['des_entitle'])     : '';
	$cat['des_ogv']   = !empty($_POST['des_ogv'])     ? trim($_POST['des_ogv'])     : '';
	$cat['des_mp4']   = !empty($_POST['des_mp4'])     ? trim($_POST['des_mp4'])     : '';
	$cat['des_wemb']   = !empty($_POST['des_wemb'])     ? trim($_POST['des_wemb'])     : '';
	$cat['cat_endesc']   = !empty($_POST['cat_endesc'])     ? trim($_POST['cat_endesc'])     : '';
    $cat['filter_attr']  = !empty($_POST['filter_attr'])  ? implode(',', array_unique(array_diff($_POST['filter_attr'],array(0)))) : 0;

    $cat['cat_recommend']  = !empty($_POST['cat_recommend'])  ? $_POST['cat_recommend'] : array();
     $cat['cat_addtype']  = !empty($_POST['cat_addtype'])  ? implode(',',$_POST['cat_addtype']) : 0;
	 
	 
	 $cat['yd_title']     = !empty($_POST['yd_title'])     ? trim($_POST['yd_title'])     : '';
	 $cat['yd_entitle']     = !empty($_POST['yd_entitle'])     ? trim($_POST['yd_entitle'])     : '';
	 $cat['syd_title']     = !empty($_POST['syd_title'])     ? trim($_POST['syd_title'])     : '';
	 $cat['syd_entitle']     = !empty($_POST['syd_entitle'])     ? trim($_POST['syd_entitle'])     : '';
	 
	 
	 	 $cat['b_title1']     = !empty($_POST['b_title1'])     ? trim($_POST['b_title1'])     : '';
	 $cat['b_title2']     = !empty($_POST['b_title2'])     ? trim($_POST['b_title2'])     : '';
	 $cat['b_title3']     = !empty($_POST['b_title3'])     ? trim($_POST['b_title3'])     : '';
	 
	 
	 	 	 $cat['b_entitle1']     = !empty($_POST['b_entitle1'])     ? trim($_POST['b_entitle1'])     : '';
	 $cat['b_entitle2']     = !empty($_POST['b_entitle2'])     ? trim($_POST['b_entitle2'])     : '';
	 $cat['b_entitle3']     = !empty($_POST['b_entitle3'])     ? trim($_POST['b_entitle3'])     : '';
	 
	 
	 	 $cat['b_url1']     = !empty($_POST['b_url1'])     ? trim($_POST['b_url1'])     : '';
	 $cat['b_url2']     = !empty($_POST['b_url2'])     ? trim($_POST['b_url2'])     : '';
	 $cat['b_url3']     = !empty($_POST['b_url3'])     ? trim($_POST['b_url3'])     : '';

	 
    if (cat_exists($cat['cat_name'], $cat['parent_id']))
    {
        /* 同级别下不能有重复的分类名称 */
       $link[] = array('text' => $_LANG['go_back'], 'href' => 'javascript:history.back(-1)');
       sys_msg($_LANG['catname_exist'], 0, $link);
    }

    if($cat['grade'] > 10 || $cat['grade'] < 0)
    {
        /* 价格区间数超过范围 */
       $link[] = array('text' => $_LANG['go_back'], 'href' => 'javascript:history.back(-1)');
       sys_msg($_LANG['grade_error'], 0, $link);
    }

    /* 入库的操作 */
    if ($db->autoExecute($ecs->table('category'), $cat) !== false)
    {
        $cat_id = $db->insert_id();
		//echo "sadsad";
			 // if($_FILES['cat_plot']['error']==0){
			 if($_FILES['cat_plot']){
		  if($_POST['parent_id']==0){
       handle_bg_image($cat_id,$_FILES['cat_plot'],208,380,0);
	  // echo "上";
	   }else{
	  // echo "到这";
	   handle_bg_image($cat_id,$_FILES['cat_plot'],184,275,0);
	   }
      }
	  //exit;
	  
        if($cat['show_in_nav'] == 1)
        {
            $vieworder = $db->getOne("SELECT max(vieworder) FROM ". $ecs->table('nav') . " WHERE type = 'middle'");
            $vieworder += 2;
            //显示在自定义导航栏中
            $sql = "INSERT INTO " . $ecs->table('nav') .
                " (name,ctype,cid,ifshow,vieworder,opennew,url,type)".
                " VALUES('" . $cat['cat_name'] . "', 'c', '".$db->insert_id()."','1','$vieworder','0', '" . build_uri('category', array('cid'=> $cat_id), $cat['cat_name']) . "','middle')";
            $db->query($sql);
        }
        insert_cat_recommend($cat['cat_recommend'], $cat_id);

        admin_log($_POST['cat_name'], 'add', 'category');   // 记录管理员操作
        clear_cache_files();    // 清除缓存

        /*添加链接*/
        $link[0]['text'] = $_LANG['continue_add'];
        $link[0]['href'] = 'category.php?act=add';

        $link[1]['text'] = $_LANG['back_list'];
        $link[1]['href'] = 'category.php?act=list';

        sys_msg($_LANG['catadd_succed'], 0, $link);
    }
 }

/*------------------------------------------------------ */
//-- 编辑商品分类信息
/*------------------------------------------------------ */
if ($_REQUEST['act'] == 'edit')
{
    admin_priv('cat_manage');   // 权限检查
    $cat_id = intval($_REQUEST['cat_id']);
    $cat_info = get_cat_info($cat_id);  // 查询分类信息数据
    $attr_list = get_attr_list();
    $filter_attr_list = array();
	$cat_addtype[1]=0;
	$cat_addtype[2]=0;
    if(!empty($cat_info['cat_addtype'])){
		$cat_addtypes=explode(",",$cat_info['cat_addtype']);
		for($i=0;$i<count($cat_addtypes);$i++){
			 if($cat_addtypes[$i]==1){
				 $cat_addtype[1]=$cat_addtypes[$i];
			 }
		    if($cat_addtypes[$i]==2){
				 $cat_addtype[2]=$cat_addtypes[$i];
			 }
		
			
		}
	}

    if ($cat_info['filter_attr'])
    {
        $filter_attr = explode(",", $cat_info['filter_attr']);  //把多个筛选属性放到数组中

        foreach ($filter_attr AS $k => $v)
        {
            $attr_cat_id = $db->getOne("SELECT cat_id FROM " . $ecs->table('attribute') . " WHERE attr_id = '" . intval($v) . "'");
            $filter_attr_list[$k]['goods_type_list'] = goods_type_list($attr_cat_id);  //取得每个属性的商品类型
            $filter_attr_list[$k]['filter_attr'] = $v;
            $attr_option = array();

            foreach ($attr_list[$attr_cat_id] as $val)
            {
                $attr_option[key($val)] = current ($val);
            }

            $filter_attr_list[$k]['option'] = $attr_option;
        }

        $smarty->assign('filter_attr_list', $filter_attr_list);
    }
    else
    {
        $attr_cat_id = 0;
    }

    /* 模板赋值 */
	
    $smarty->assign('attr_list',        $attr_list); // 取得商品属性
    $smarty->assign('attr_cat_id',      $attr_cat_id);
    $smarty->assign('ur_here',     $_LANG['category_edit']);
    $smarty->assign('action_link', array('text' => $_LANG['03_category_list'], 'href' => 'category.php?act=list'));

    //分类是否存在首页推荐
    $res = $db->getAll("SELECT recommend_type FROM " . $ecs->table("cat_recommend") . " WHERE cat_id=" . $cat_id);
    if (!empty($res))
    {
        $cat_recommend = array();
        foreach($res as $data)
        {
            $cat_recommend[$data['recommend_type']] = 1;
        }
        $smarty->assign('cat_recommend', $cat_recommend);
    }

    $smarty->assign('cat_addtype',    $cat_addtype);
    $smarty->assign('cat_info',    $cat_info);
    $smarty->assign('form_act',    'update');
    $smarty->assign('cat_select',  cat_list(0, $cat_info['parent_id'], true));
    $smarty->assign('goods_type_list',  goods_type_list(0)); // 取得商品类型

    /* 显示页面 */
    assign_query_info();
    $smarty->display('category_info.htm');
}
elseif($_REQUEST['act'] == 'im1'){//删除第一张
	$sql = "select * from".$GLOBALS['ecs']->table('category')."where cat_id=".$_GET['id'];
	$ss=$GLOBALS['db']->query($sql);
	$ss=mysql_fetch_assoc($ss);
	//var_dump($ss);
	//exit;
	 if ($ss['cat_plot'] != '' && is_file('../' . $ss['cat_plot']))
            {
                @unlink('../' . $ss['cat_plot']);
            }
            if ($ss['cat_plot_m'] != '' && is_file('../' . $ss['cat_plot_m']))
            {
                @unlink('../' . $ss['cat_plot_m']);
             }
	$sql = "UPDATE  ".$GLOBALS['ecs']->table('category')." SET cat_plot='',cat_plot_m='' where cat_id=".$_GET['id'];			
    $GLOBALS['db']->query($sql);
	$url = 'category.php?act=edit&cat_id='.$_GET['id'];
    ecs_header("Location: $url\n");	
}
elseif($_REQUEST['act'] == 'im2'){//删除第二张
	$sql = "select * from".$GLOBALS['ecs']->table('category')."where cat_id=".$_GET['id'];
	$ss=$GLOBALS['db']->query($sql);
	$ss=mysql_fetch_assoc($ss);
	 if ($ss['cat_plots'] != '' && is_file('../' . $ss['cat_plots']))
            {
				//echo "1";
                @unlink('../' . $ss['cat_plots']);
            }
            if ($ss['cat_plots_m'] != '' && is_file('../' . $ss['cat_plots_m']))
            {
                @unlink('../' . $ss['cat_plots_m']);
             }
	$sql = "UPDATE  ".$GLOBALS['ecs']->table('category')." SET cat_plots='',cat_plots_m='' where cat_id=".$_GET['id'];		
    $GLOBALS['db']->query($sql);
	$url = 'category.php?act=edit&cat_id='.$_GET['id'];
    ecs_header("Location: $url\n");	
}
elseif($_REQUEST['act'] == 'im3'){//删除第三张
	$sql = "select * from".$GLOBALS['ecs']->table('category')."where cat_id=".$_GET['id'];
	$ss=$GLOBALS['db']->query($sql);
	$ss=mysql_fetch_assoc($ss);
	 if ($ss['cat_plotsx'] != '' && is_file('../' . $ss['cat_plotsx']))
            {
				//echo "1";
                @unlink('../' . $ss['cat_plotsx']);
            }
            if ($ss['cat_plotsx_m'] != '' && is_file('../' . $ss['cat_plotsx_m']))
            {
                @unlink('../' . $ss['cat_plotsx_m']);
             }
	$sql = "UPDATE  ".$GLOBALS['ecs']->table('category')." SET cat_plotsx='',cat_plotsx_m='' where cat_id=".$_GET['id'];		
    $GLOBALS['db']->query($sql);
	$url = 'category.php?act=edit&cat_id='.$_GET['id'];
    ecs_header("Location: $url\n");	
}
elseif($_REQUEST['act'] == 'im4'){//删除第四张
	$sql = "select * from".$GLOBALS['ecs']->table('category')."where cat_id=".$_GET['id'];
	$ss=$GLOBALS['db']->query($sql);
	$ss=mysql_fetch_assoc($ss);
	 if ($ss['cat_photo'] != '' && is_file('../' . $ss['cat_photo']))
            {
				//echo "1";
                @unlink('../' . $ss['cat_photo']);
            }
            if ($ss['cat_photo_m'] != '' && is_file('../' . $ss['cat_photo_m']))
            {
                @unlink('../' . $ss['cat_photo_m']);
             }
	$sql = "UPDATE  ".$GLOBALS['ecs']->table('category')." SET cat_photo='',cat_photo_m='' where cat_id=".$_GET['id'];		
    $GLOBALS['db']->query($sql);
	$url = 'category.php?act=edit&cat_id='.$_GET['id'];
    ecs_header("Location: $url\n");	
}
elseif($_REQUEST['act'] == 'im5'){//删除视频封面
	$sql = "select * from".$GLOBALS['ecs']->table('category')."where cat_id=".$_GET['id'];
	$ss=$GLOBALS['db']->query($sql);
	$ss=mysql_fetch_assoc($ss);
	 if ($ss['cat_video'] != '' && is_file('../' . $ss['cat_video']))
            {
				//echo "1";
                @unlink('../' . $ss['cat_video']);
            }
            if ($ss['cat_video_m'] != '' && is_file('../' . $ss['cat_video_m']))
            {
                @unlink('../' . $ss['cat_video_m']);
             }
	$sql = "UPDATE  ".$GLOBALS['ecs']->table('category')." SET cat_video='',cat_video_m='' where cat_id=".$_GET['id'];		
    $GLOBALS['db']->query($sql);
	$url = 'category.php?act=edit&cat_id='.$_GET['id'];
    ecs_header("Location: $url\n");	
}
elseif($_REQUEST['act'] == 'im6'){//删除第三张
	$sql = "select * from".$GLOBALS['ecs']->table('category')."where cat_id=".$_GET['id'];
	$ss=$GLOBALS['db']->query($sql);
	$ss=mysql_fetch_assoc($ss);
	 if ($ss['b_img1'] != '' && is_file('../' . $ss['b_img1']))
            {
				//echo "1";
                @unlink('../' . $ss['b_img1']);
            }
     
	$sql = "UPDATE  ".$GLOBALS['ecs']->table('category')." SET b_img1='' where cat_id=".$_GET['id'];		
    $GLOBALS['db']->query($sql);
	$url = 'category.php?act=edit&cat_id='.$_GET['id'];
    ecs_header("Location: $url\n");	
}
elseif($_REQUEST['act'] == 'im7'){//删除第三张
	$sql = "select * from".$GLOBALS['ecs']->table('category')."where cat_id=".$_GET['id'];
	$ss=$GLOBALS['db']->query($sql);
	$ss=mysql_fetch_assoc($ss);
	 if ($ss['b_img2'] != '' && is_file('../' . $ss['b_img2']))
            {
				//echo "1";
                @unlink('../' . $ss['b_img2']);
            }
     
	$sql = "UPDATE  ".$GLOBALS['ecs']->table('category')." SET b_img2='' where cat_id=".$_GET['id'];		
    $GLOBALS['db']->query($sql);
	$url = 'category.php?act=edit&cat_id='.$_GET['id'];
    ecs_header("Location: $url\n");	
}

elseif($_REQUEST['act'] == 'im8'){//删除第三张
	$sql = "select * from".$GLOBALS['ecs']->table('category')."where cat_id=".$_GET['id'];
	$ss=$GLOBALS['db']->query($sql);
	$ss=mysql_fetch_assoc($ss);
	 if ($ss['b_img3'] != '' && is_file('../' . $ss['b_img3']))
            {
				//echo "1";
                @unlink('../' . $ss['b_img3']);
            }
     
	$sql = "UPDATE  ".$GLOBALS['ecs']->table('category')." SET b_img3='' where cat_id=".$_GET['id'];		
    $GLOBALS['db']->query($sql);
	$url = 'category.php?act=edit&cat_id='.$_GET['id'];
    ecs_header("Location: $url\n");	
}
elseif($_REQUEST['act'] == 'add_category')
{
    $parent_id = empty($_REQUEST['parent_id']) ? 0 : intval($_REQUEST['parent_id']);
    $category = empty($_REQUEST['cat']) ? '' : json_str_iconv(trim($_REQUEST['cat']));

    if(cat_exists($category, $parent_id))
    {
        make_json_error($_LANG['catname_exist']);
    }
    else
    {
        $sql = "INSERT INTO " . $ecs->table('category') . "(cat_name, parent_id, is_show)" .
               "VALUES ( '$category', '$parent_id', 1)";

        $db->query($sql);
        $category_id = $db->insert_id();

        $arr = array("parent_id"=>$parent_id, "id"=>$category_id, "cat"=>$category);

        clear_cache_files();    // 清除缓存

        make_json_result($arr);
    }
}

/*------------------------------------------------------ */
//-- 编辑商品分类信息
/*------------------------------------------------------ */
if ($_REQUEST['act'] == 'update')
{
    /* 权限检查 */
    admin_priv('cat_manage');

    /* 初始化变量 */
    $cat_id              = !empty($_POST['cat_id'])       ? intval($_POST['cat_id'])     : 0;
    $old_cat_name        = $_POST['old_cat_name'];
    $cat['parent_id']    = !empty($_POST['parent_id'])    ? intval($_POST['parent_id'])  : 0;
    $cat['sort_order']   = !empty($_POST['sort_order'])   ? intval($_POST['sort_order']) : 0;
    $cat['keywords']     = !empty($_POST['keywords'])     ? trim($_POST['keywords'])     : '';
    $cat['cat_desc']     = !empty($_POST['cat_desc'])     ? $_POST['cat_desc']           : '';
    $cat['measure_unit'] = !empty($_POST['measure_unit']) ? trim($_POST['measure_unit']) : '';
    $cat['cat_name']     = !empty($_POST['cat_name'])     ? trim($_POST['cat_name'])     : '';
	$cat['cat_enname']     = !empty($_POST['cat_enname'])     ? trim($_POST['cat_enname'])     : '';
    $cat['is_show']      = !empty($_POST['is_show'])      ? intval($_POST['is_show'])    : 0;
    $cat['show_in_nav']  = !empty($_POST['show_in_nav'])  ? intval($_POST['show_in_nav']): 0;
    $cat['style']        = !empty($_POST['style'])        ? trim($_POST['style'])        : '';
    $cat['grade']        = !empty($_POST['grade'])        ? intval($_POST['grade'])      : 0;
	$cat['des_title']     = !empty($_POST['des_title'])     ? trim($_POST['des_title'])     : '';
	$cat['des_entitle']   = !empty($_POST['des_entitle'])     ? trim($_POST['des_entitle'])     : '';
	$cat['des_ogv']   = !empty($_POST['des_ogv'])     ? trim($_POST['des_ogv'])     : '';
	$cat['des_mp4']   = !empty($_POST['des_mp4'])     ? trim($_POST['des_mp4'])     : '';
	$cat['des_wemb']   = !empty($_POST['des_wemb'])     ? trim($_POST['des_wemb'])     : '';
	$cat['cat_endesc']   = !empty($_POST['cat_endesc'])     ? trim($_POST['cat_endesc'])     : '';
    $cat['filter_attr']  = !empty($_POST['filter_attr'])  ? implode(',', array_unique(array_diff($_POST['filter_attr'],array(0)))) : 0;
    $cat['cat_recommend']  = !empty($_POST['cat_recommend'])  ? $_POST['cat_recommend'] : array();
	     $cat['cat_addtype']  = !empty($_POST['cat_addtype'])  ? implode(',',$_POST['cat_addtype']) : 0;
		 $cat['yd_title']     = !empty($_POST['yd_title'])     ? trim($_POST['yd_title'])     : '';
	 $cat['yd_entitle']     = !empty($_POST['yd_entitle'])     ? trim($_POST['yd_entitle'])     : '';
	 $cat['syd_title']     = !empty($_POST['syd_title'])     ? trim($_POST['syd_title'])     : '';
	 $cat['syd_entitle']     = !empty($_POST['syd_entitle'])     ? trim($_POST['syd_entitle'])     : '';
	 	 $cat['b_title1']     = !empty($_POST['b_title1'])     ? trim($_POST['b_title1'])     : '';
	 $cat['b_title2']     = !empty($_POST['b_title2'])     ? trim($_POST['b_title2'])     : '';
	 $cat['b_title3']     = !empty($_POST['b_title3'])     ? trim($_POST['b_title3'])     : '';
	 
	 
	 	 	 $cat['b_entitle1']     = !empty($_POST['b_entitle1'])     ? trim($_POST['b_entitle1'])     : '';
	 $cat['b_entitle2']     = !empty($_POST['b_entitle2'])     ? trim($_POST['b_entitle2'])     : '';
	 $cat['b_entitle3']     = !empty($_POST['b_entitle3'])     ? trim($_POST['b_entitle3'])     : '';
	 
	 
	 	 $cat['b_url1']     = !empty($_POST['b_url1'])     ? trim($_POST['b_url1'])     : '';
	 $cat['b_url2']     = !empty($_POST['b_url2'])     ? trim($_POST['b_url2'])     : '';
	 $cat['b_url3']     = !empty($_POST['b_url3'])     ? trim($_POST['b_url3'])     : '';
    /* 判断分类名是否重复 */
		 /* if($_FILES['cat_plot']['error']==0){*/
		  if($_FILES['cat_plot']){
			  echo "有";
			  
		$res= $db->getRow("SELECT * FROM " . $ecs->table('category') . " WHERE cat_id =".$cat_id);
		//var_dump($res);

	for($i=0;$i<5;$i++){
	if($_FILES['cat_plot']['name'][$i]){
	   if($i==0){
		   echo "0";
		   
		    if ($res['cat_plot'] != '' && is_file('../' . $res['cat_plot']))
            {
				echo "伤处";
				
                unlink('../' . $res['cat_plot']);
            }
            if ($res['cat_plot_m'] != '' && is_file('../' . $res['cat_plot_m']))
            {
                unlink('../' . $res['cat_plot_m']);
             }
	     }
		  if($i==1){
			  echo "1";
		    if ($res['cat_plots'] != '' && is_file('../' . $res['cat_plots']))
            {
                unlink('../' . $res['cat_plots']);
            }
            if ($res['cat_plots_m'] != '' && is_file('../' . $res['cat_plots_m']))
            {
                unlink('../' . $res['cat_plots_m']);
             }
	     }
		  if($i==2){
		    if ($res['cat_plotsx'] != '' && is_file('../' . $res['cat_plotsx']))
            {
                @unlink('../' . $res['cat_plotsx']);
            }
            if ($res['cat_plotsx_m'] != '' && is_file('../' . $res['cat_plotsx_m']))
            {
                @unlink('../' . $res['cat_plotsx_m']);
             }
	     }
		  if($i==3){
		    if ($res['cat_photo'] != '' && is_file('../' . $res['cat_photo']))
            {
                @unlink('../' . $res['cat_photo']);
            }
            if ($res['cat_photo_m'] != '' && is_file('../' . $res['cat_photo_m']))
            {
                @unlink('../' . $res['cat_photo_m']);
             }
	     }
		   if($i==4){
		    if ($res['cat_video'] != '' && is_file('../' . $res['cat_video']))
            {
                @unlink('../' . $res['cat_video']);
            }
            if ($res['cat_video_m'] != '' && is_file('../' . $res['cat_video_m']))
            {
                @unlink('../' . $res['cat_video_m']);
             }
	     }
		 
		 	   if($i==5){
		    if ($res['b_img1'] != '' && is_file('../' . $res['b_img1']))
            {
                @unlink('../' . $res['b_img1']);
            }
       
	     }
		 
		 
		  	   if($i==6){
		    if ($res['b_img2'] != '' && is_file('../' . $res['b_img2']))
            {
                @unlink('../' . $res['b_img2']);
            }
       
	     }
		 
		   	   if($i==7){
		    if ($res['b_img3'] != '' && is_file('../' . $res['b_img3']))
            {
                @unlink('../' . $res['b_img3']);
            }
       
	     }
	}
	}
	//exit;
		    if($_POST['parent_id'] ==0){
       handle_bg_image($cat_id,$_FILES['cat_plot'],208,380,'update');
	   
	   }else{
	   
	   handle_bg_image($cat_id,$_FILES['cat_plot'],184,275,'update');
	   }
   
      
}
    if ($cat['cat_name'] != $old_cat_name)
    {
        if (cat_exists($cat['cat_name'],$cat['parent_id'], $cat_id))
        {
           $link[] = array('text' => $_LANG['go_back'], 'href' => 'javascript:history.back(-1)');
           sys_msg($_LANG['catname_exist'], 0, $link);
        }
    }

    /* 判断上级目录是否合法 */
    $children = array_keys(cat_list($cat_id, 0, false));     // 获得当前分类的所有下级分类
    if (in_array($cat['parent_id'], $children))
    {
        /* 选定的父类是当前分类或当前分类的下级分类 */
       $link[] = array('text' => $_LANG['go_back'], 'href' => 'javascript:history.back(-1)');
       sys_msg($_LANG["is_leaf_error"], 0, $link);
    }

    if($cat['grade'] > 10 || $cat['grade'] < 0)
    {
        /* 价格区间数超过范围 */
       $link[] = array('text' => $_LANG['go_back'], 'href' => 'javascript:history.back(-1)');
       sys_msg($_LANG['grade_error'], 0, $link);
    }

    $dat = $db->getRow("SELECT cat_name, show_in_nav FROM ". $ecs->table('category') . " WHERE cat_id = '$cat_id'");

    if ($db->autoExecute($ecs->table('category'), $cat, 'UPDATE', "cat_id='$cat_id'"))
    {
        if($cat['cat_name'] != $dat['cat_name'])
        {
            //如果分类名称发生了改变
            $sql = "UPDATE " . $ecs->table('nav') . " SET name = '" . $cat['cat_name'] . "' WHERE ctype = 'c' AND cid = '" . $cat_id . "' AND type = 'middle'";
            $db->query($sql);
        }
        if($cat['show_in_nav'] != $dat['show_in_nav'])
        {
            //是否显示于导航栏发生了变化
            if($cat['show_in_nav'] == 1)
            {
                //显示
                $nid = $db->getOne("SELECT id FROM ". $ecs->table('nav') . " WHERE ctype = 'c' AND cid = '" . $cat_id . "' AND type = 'middle'");
                if(empty($nid))
                {
                    //不存在
                    $vieworder = $db->getOne("SELECT max(vieworder) FROM ". $ecs->table('nav') . " WHERE type = 'middle'");
                    $vieworder += 2;
                    $uri = build_uri('category', array('cid'=> $cat_id), $cat['cat_name']);

                    $sql = "INSERT INTO " . $ecs->table('nav') . " (name,ctype,cid,ifshow,vieworder,opennew,url,type) VALUES('" . $cat['cat_name'] . "', 'c', '$cat_id','1','$vieworder','0', '" . $uri . "','middle')";
                }
                else
                {
                    $sql = "UPDATE " . $ecs->table('nav') . " SET ifshow = 1 WHERE ctype = 'c' AND cid = '" . $cat_id . "' AND type = 'middle'";
                }
                $db->query($sql);
            }
            else
            {
                //去除
                $db->query("UPDATE " . $ecs->table('nav') . " SET ifshow = 0 WHERE ctype = 'c' AND cid = '" . $cat_id . "' AND type = 'middle'");
            }
        }

        //更新首页推荐
        insert_cat_recommend($cat['cat_recommend'], $cat_id);
        /* 更新分类信息成功 */
        clear_cache_files(); // 清除缓存
        admin_log($_POST['cat_name'], 'edit', 'category'); // 记录管理员操作

        /* 提示信息 */
        $link[] = array('text' => $_LANG['back_list'], 'href' => 'category.php?act=list');
        sys_msg($_LANG['catedit_succed'], 0, $link);
    }
}

/*------------------------------------------------------ */
//-- 批量转移商品分类页面
/*------------------------------------------------------ */
if ($_REQUEST['act'] == 'move')
{
    /* 权限检查 */
    admin_priv('cat_drop');

    $cat_id = !empty($_REQUEST['cat_id']) ? intval($_REQUEST['cat_id']) : 0;

    /* 模板赋值 */
    $smarty->assign('ur_here',     $_LANG['move_goods']);
    $smarty->assign('action_link', array('href' => 'category.php?act=list', 'text' => $_LANG['03_category_list']));

    $smarty->assign('cat_select', cat_list(0, $cat_id, true));
    $smarty->assign('form_act',   'move_cat');

    /* 显示页面 */
    assign_query_info();
    $smarty->display('category_move.htm');
}

/*------------------------------------------------------ */
//-- 处理批量转移商品分类的处理程序
/*------------------------------------------------------ */
if ($_REQUEST['act'] == 'move_cat')
{
    /* 权限检查 */
    admin_priv('cat_drop');

    $cat_id        = !empty($_POST['cat_id'])        ? intval($_POST['cat_id'])        : 0;
    $target_cat_id = !empty($_POST['target_cat_id']) ? intval($_POST['target_cat_id']) : 0;

    /* 商品分类不允许为空 */
    if ($cat_id == 0 || $target_cat_id == 0)
    {
        $link[] = array('text' => $_LANG['go_back'], 'href' => 'category.php?act=move');
        sys_msg($_LANG['cat_move_empty'], 0, $link);
    }

    /* 更新商品分类 */
    $sql = "UPDATE " .$ecs->table('goods'). " SET cat_id = '$target_cat_id' ".
           "WHERE cat_id = '$cat_id'";
    if ($db->query($sql))
    {
        /* 清除缓存 */
        clear_cache_files();

        /* 提示信息 */
        $link[] = array('text' => $_LANG['go_back'], 'href' => 'category.php?act=list');
        sys_msg($_LANG['move_cat_success'], 0, $link);
    }
}

/*------------------------------------------------------ */
//-- 编辑排序序号
/*------------------------------------------------------ */

if ($_REQUEST['act'] == 'edit_sort_order')
{
    check_authz_json('cat_manage');

    $id = intval($_POST['id']);
    $val = intval($_POST['val']);

    if (cat_update($id, array('sort_order' => $val)))
    {
        clear_cache_files(); // 清除缓存
        make_json_result($val);
    }
    else
    {
        make_json_error($db->error());
    }
}

/*------------------------------------------------------ */
//-- 编辑数量单位
/*------------------------------------------------------ */

if ($_REQUEST['act'] == 'edit_measure_unit')
{
    check_authz_json('cat_manage');

    $id = intval($_POST['id']);
    $val = json_str_iconv($_POST['val']);

    if (cat_update($id, array('measure_unit' => $val)))
    {
        clear_cache_files(); // 清除缓存
        make_json_result($val);
    }
    else
    {
        make_json_error($db->error());
    }
}

/*------------------------------------------------------ */
//-- 编辑排序序号
/*------------------------------------------------------ */

if ($_REQUEST['act'] == 'edit_grade')
{
    check_authz_json('cat_manage');

    $id = intval($_POST['id']);
    $val = intval($_POST['val']);

    if($val > 10 || $val < 0)
    {
        /* 价格区间数超过范围 */
        make_json_error($_LANG['grade_error']);
    }

    if (cat_update($id, array('grade' => $val)))
    {
        clear_cache_files(); // 清除缓存
        make_json_result($val);
    }
    else
    {
        make_json_error($db->error());
    }
}

/*------------------------------------------------------ */
//-- 切换是否显示在导航栏
/*------------------------------------------------------ */

if ($_REQUEST['act'] == 'toggle_show_in_nav')
{
    check_authz_json('cat_manage');

    $id = intval($_POST['id']);
    $val = intval($_POST['val']);

    if (cat_update($id, array('show_in_nav' => $val)) != false)
    {
        if($val == 1)
        {
            //显示
            $vieworder = $db->getOne("SELECT max(vieworder) FROM ". $ecs->table('nav') . " WHERE type = 'middle'");
            $vieworder += 2;
            $catname = $db->getOne("SELECT cat_name FROM ". $ecs->table('category') . " WHERE cat_id = '$id'");
            //显示在自定义导航栏中
            $_CFG['rewrite'] = 0;
            $uri = build_uri('category', array('cid'=> $id), $catname);

            $nid = $db->getOne("SELECT id FROM ". $ecs->table('nav') . " WHERE ctype = 'c' AND cid = '" . $id . "' AND type = 'middle'");
            if(empty($nid))
            {
                //不存在
                $sql = "INSERT INTO " . $ecs->table('nav') . " (name,ctype,cid,ifshow,vieworder,opennew,url,type) VALUES('" . $catname . "', 'c', '$id','1','$vieworder','0', '" . $uri . "','middle')";
            }
            else
            {
                $sql = "UPDATE " . $ecs->table('nav') . " SET ifshow = 1 WHERE ctype = 'c' AND cid = '" . $id . "' AND type = 'middle'";
            }
            $db->query($sql);
        }
        else
        {
            //去除
            $db->query("UPDATE " . $ecs->table('nav') . "SET ifshow = 0 WHERE ctype = 'c' AND cid = '" . $id . "' AND type = 'middle'");
        }
        clear_cache_files();
        make_json_result($val);
    }
    else
    {
        make_json_error($db->error());
    }
}

/*------------------------------------------------------ */
//-- 切换是否显示
/*------------------------------------------------------ */

if ($_REQUEST['act'] == 'toggle_is_show')
{
    check_authz_json('cat_manage');

    $id = intval($_POST['id']);
    $val = intval($_POST['val']);

    if (cat_update($id, array('is_show' => $val)) != false)
    {
        clear_cache_files();
        make_json_result($val);
    }
    else
    {
        make_json_error($db->error());
    }
}

/*------------------------------------------------------ */
//-- 删除商品分类
/*------------------------------------------------------ */
if ($_REQUEST['act'] == 'remove')
{
    check_authz_json('cat_manage');

    /* 初始化分类ID并取得分类名称 */
    $cat_id   = intval($_GET['id']);
    $catinfo = $db->getOne('SELECT * FROM ' .$ecs->table('category'). " WHERE cat_id='$cat_id'");

    /* 当前分类下是否有子分类 */
    $cat_count = $db->getOne('SELECT COUNT(*) FROM ' .$ecs->table('category'). " WHERE parent_id='$cat_id'");

    /* 当前分类下是否存在商品 */
    $goods_count = $db->getOne('SELECT COUNT(*) FROM ' .$ecs->table('goods'). " WHERE cat_id='$cat_id'");

    /* 如果不存在下级子分类和商品，则删除之 */
    if ($cat_count == 0 && $goods_count == 0)
    {
        /* 删除分类 */
		//echo 'you';
		$sql = 'select * from' .$ecs->table('category'). " where cat_id = '$cat_id'";
			 $res = mysql_fetch_assoc($db->query($sql));
		
        $sql = 'DELETE FROM ' .$ecs->table('category'). " WHERE cat_id = '$cat_id'";
        if ($db->query($sql))
        {
			echo '不存在下级子';
			var_dump($res);
		 $sqls="select * from ".$ecs->table('cat_addtype')."where cat_id='$cat_id'";
		 $addinfos=$db->getAll($sqls);
		
		 for($i=0;$i<count($addinfos);$i++){
			if ($addinfos[$i]['image'] != '' && is_file('../' . $addinfos[$i]['image']))
            {
                @unlink('../' . $addinfos[$i]['image']);
            }
			if ($addinfos[$i]['images_t'] != '' && is_file('../' . $addinfos[$i]['images_t']))
            {
                @unlink('../' . $addinfos[$i]['images_t']);
            }
		  $sqld='DELETE FROM ' .$ecs->table('cat_addtype'). " WHERE id = '".$addinfos[$i]['id']."'";
		  $db->query($sqld);
		 }
		 
		  $sqls="select * from ".$ecs->table('cat_images')."where cat_id='$cat_id'";
		  $imglist=$db->getAll($sqls);
		  	 for($i=0;$i<count($imglist);$i++){
			if ($imglist[$i]['images'] != '' && is_file('../' . $imglist[$i]['images']))
            {
                @unlink('../' . $imglist[$i]['images']);
            }
		   
		   	if ($imglist[$i]['images_t'] != '' && is_file('../' . $imglist[$i]['images_t']))
            {
                @unlink('../' . $imglist[$i]['images_t']);
            }
			
		  $sqld='DELETE FROM ' .$ecs->table('cat_images'). " WHERE id = '".$imglist[$i]['id']."'";
		  $db->query($sqld);
		   }
		  
		 if ($res['cat_plot'] != '' && is_file('../' . $res['cat_plot']))
            {
                @unlink('../' . $res['cat_plot']);
            }
            if ($res['cat_plot_m'] != '' && is_file('../' . $res['cat_plot_m']))
            {
                @unlink('../' . $res['cat_plot_m']);
             }
			if ($res['cat_plots'] != '' && is_file('../' . $res['cat_plots']))
            {
                @unlink('../' . $res['cat_plots']);
            }
            if ($res['cat_plots_m'] != '' && is_file('../' . $res['cat_plots_m']))
            {
                @unlink('../' . $res['cat_plots_m']);
             }
			 if ($res['cat_plotsx'] != '' && is_file('../' . $res['cat_plotsx']))
            {
                @unlink('../' . $res['cat_plotsx']);
            }
            if ($res['cat_plotsx_m'] != '' && is_file('../' . $res['cat_plotsx_m']))
            {
                @unlink('../' . $res['cat_plotsx_m']);
             }
			 if ($res['cat_photo'] != '' && is_file('../' . $res['cat_photo']))
            {
                @unlink('../' . $res['cat_photo']);
             }
			 if ($res['cat_photo_m'] != '' && is_file('../' . $res['cat_photo_m']))
            {
                @unlink('../' . $res['cat_photo_m']);
             }
			if ($res['cat_video'] != '' && is_file('../' . $res['cat_video']))
            {
                @unlink('../' . $res['cat_video']);
            }
            if ($res['cat_video_m'] != '' && is_file('../' . $res['cat_video_m']))
            {
                @unlink('../' . $res['cat_video_m']);
             }
            $db->query("DELETE FROM " . $ecs->table('nav') . "WHERE ctype = 'c' AND cid = '" . $cat_id . "' AND type = 'middle'");
            clear_cache_files();
            admin_log($catinfo['cat_name'], 'remove', 'category');
        }
    }
    else
    {
        make_json_error($catinfo['cat_name'] .' '. $_LANG['cat_isleaf']);
    }

    $url = 'category.php?act=query&' . str_replace('act=remove', '', $_SERVER['QUERY_STRING']);
    //$url='category.php?act=list';
    ecs_header("Location: $url\n");

}

/*------------------------------------------------------ */
//-- PRIVATE FUNCTIONS
/*------------------------------------------------------ */
//
///**
// * 检查分类是否已经存在
// *
// * @param   string      $cat_name       分类名称
// * @param   integer     $parent_cat     上级分类
// * @param   integer     $exclude        排除的分类ID
// *
// * @return  boolean
// */
//function cat_exists($cat_name, $parent_cat, $exclude = 0)
//{
//    $sql = "SELECT COUNT(*) FROM " .$GLOBALS['ecs']->table('category').
//           " WHERE parent_id = '$parent_cat' AND cat_name = '$cat_name' AND cat_id<>'$exclude'";
//    return ($GLOBALS['db']->getOne($sql) > 0) ? true : false;
//}

/**
 * 获得商品分类的所有信息
 *
 * @param   integer     $cat_id     指定的分类ID
 *
 * @return  mix
 */
function get_cat_info($cat_id)
{
    $sql = "SELECT * FROM " .$GLOBALS['ecs']->table('category'). " WHERE cat_id='$cat_id' LIMIT 1";
    return $GLOBALS['db']->getRow($sql);
}

/**
 * 添加商品分类
 *
 * @param   integer $cat_id
 * @param   array   $args
 *
 * @return  mix
 */
function cat_update($cat_id, $args)
{
    if (empty($args) || empty($cat_id))
    {
        return false;
    }

    return $GLOBALS['db']->autoExecute($GLOBALS['ecs']->table('category'), $args, 'update', "cat_id='$cat_id'");
}


/**
 * 获取属性列表
 *
 * @access  public
 * @param
 *
 * @return void
 */
function get_attr_list()
{
    $sql = "SELECT a.attr_id, a.cat_id, a.attr_name ".
           " FROM " . $GLOBALS['ecs']->table('attribute'). " AS a,  ".
           $GLOBALS['ecs']->table('goods_type') . " AS c ".
           " WHERE  a.cat_id = c.cat_id AND c.enabled = 1 ".
           " ORDER BY a.cat_id , a.sort_order";

    $arr = $GLOBALS['db']->getAll($sql);

    $list = array();

    foreach ($arr as $val)
    {
        $list[$val['cat_id']][] = array($val['attr_id']=>$val['attr_name']);
    }

    return $list;
}

/**
 * 插入首页推荐扩展分类
 *
 * @access  public
 * @param   array   $recommend_type 推荐类型
 * @param   integer $cat_id     分类ID
 *
 * @return void
 */
function insert_cat_recommend($recommend_type, $cat_id)
{
    //检查分类是否为首页推荐
    if (!empty($recommend_type))
    {
        //取得之前的分类
        $recommend_res = $GLOBALS['db']->getAll("SELECT recommend_type FROM " . $GLOBALS['ecs']->table("cat_recommend") . " WHERE cat_id=" . $cat_id);
        if (empty($recommend_res))
        {
            foreach($recommend_type as $data)
            {
                $data = intval($data);
                $GLOBALS['db']->query("INSERT INTO " . $GLOBALS['ecs']->table("cat_recommend") . "(cat_id, recommend_type) VALUES ('$cat_id', '$data')");
            }
        }
        else
        {
            $old_data = array();
            foreach($recommend_res as $data)
            {
                $old_data[] = $data['recommend_type'];
            }
            $delete_array = array_diff($old_data, $recommend_type);
            if (!empty($delete_array))
            {
                $GLOBALS['db']->query("DELETE FROM " . $GLOBALS['ecs']->table("cat_recommend") . " WHERE cat_id=$cat_id AND recommend_type " . db_create_in($delete_array));
            }
            $insert_array = array_diff($recommend_type, $old_data);
            if (!empty($insert_array))
            {
                foreach($insert_array as $data)
                {
                    $data = intval($data);
                    $GLOBALS['db']->query("INSERT INTO " . $GLOBALS['ecs']->table("cat_recommend") . "(cat_id, recommend_type) VALUES ('$cat_id', '$data')");
                }
            }
        }
    }
    else
    {
        $GLOBALS['db']->query("DELETE FROM ". $GLOBALS['ecs']->table("cat_recommend") . " WHERE cat_id=" . $cat_id);
    }
}
function handle_bg_image($news_id, $image_files,$width,$hight,$update)
{ 
//exit;
$uu = $update;
//echo "HI";
$articel_width = $width;

$articel_height =$hight;
$thumb_url_p='';
$orgImg_p='';
$thumb_url_s='';
$orgImg_s='';
$thumb_url_sx='';
$orgImg_sx='';
$path= ROOT_PATH;
$image = new cls_image();
//var_dump($image_files);
//exit;
$imgtitle=$title;
$imgresort=$image_sort[$key];
if($uu!='update'){
for($i=0;$i<8;$i++){
$filename =$image->random_filename() . substr($image_files['name'][$i], strpos($image_files['name'][$i], '.'));
$orgImg=DATA_DIR . "/pro/".$filename;
$path_m    = DATA_DIR . "/pro/"."m_".$filename;
$thumb_url = $image->make_thumb($image_files['tmp_name'][$i],$articel_width,$articel_height,$path.DATA_DIR . "/pro/");  

$thumb_url = DATA_DIR . "/pro/".is_string($thumb_url) ? $thumb_url : '';
if($i==0){
    $thumb_url_p=$thumb_url;
    $orgImg_p=$orgImg; 
}
if($i==1){
    $thumb_url_s=$thumb_url;
    $orgImg_s=$orgImg; 
}
if($i==2){
    $thumb_url_sx=$thumb_url;
    $orgImg_sx=$orgImg; 
}
if($i==3){
    $thumb_url_pt=$thumb_url;
    $orgImg_pt=$orgImg; 
}
if($i==4){
    $thumb_url_vm=$thumb_url;
    $orgImg_v=$orgImg; 
}
if($i==5){

    $orgImg_bimg1=$orgImg; 
}
if($i==6){

    $orgImg_bimg2=$orgImg; 
}
if($i==7){

    $orgImg_bimg3=$orgImg; 
}
//原图保存
if (!move_upload_file($image_files['tmp_name'][$i],$path.$orgImg))
    {
        return false;
    }
}

$sql = "UPDATE  ".$GLOBALS['ecs']->table('category')." SET cat_plot='".$orgImg_p."',cat_plot_m='".$thumb_url_p."',cat_plots='".$orgImg_s."',cat_plots_m='".$thumb_url_s."',cat_plotsx='".$orgImg_sx."',cat_plotsx_m='".$thumb_url_sx."',cat_photo='".$orgImg_pt."',cat_photo_m='".$thumb_url_pt."',cat_video='".$orgImg_v."',cat_video_m='".$thumb_url_vm."',b_img1='".$orgImg_bimg1."',b_img2='".$orgImg_bimg2."',b_img3='".$orgImg_bimg3."' where cat_id=".$news_id;			
    $GLOBALS['db']->query($sql);

}
else{	
$sql = "select * from".$GLOBALS['ecs']->table('category')."where cat_id=".$news_id;			
   $jihe = $GLOBALS['db']->query($sql);
   $jihe = mysql_fetch_assoc($jihe);
   //var_dump($jihe);
   //echo $jihe['cat_plotsx_m'];
for($i=0;$i<8;$i++){
$filename =$image->random_filename() . substr($image_files['name'][$i], strpos($image_files['name'][$i], '.'));
$orgImg=DATA_DIR . "/pro/".$filename;
$path_m    = DATA_DIR . "/pro/"."m_".$filename;
$thumb_url = $image->make_thumb($image_files['tmp_name'][$i],$articel_width,$articel_height,$path.DATA_DIR . "/pro/");  
$thumb_url = DATA_DIR . "/pro/".is_string($thumb_url) ? $thumb_url : '';
if($i==0){
if($image_files['name'][0]){
	
    $thumb_url_p=$thumb_url;
    $orgImg_p=$orgImg; 
	
}
else{
   $thumb_url_p=$jihe['cat_plot_m']; 
   $orgImg_p= $jihe['cat_plot'];
}
}
if($i==1){
if($image_files['name'][1]){
	
    $thumb_url_s=$thumb_url;
    $orgImg_s=$orgImg; 
	
}
else{
   $thumb_url_s=$jihe['cat_plots_m'];  
   $orgImg_s=$jihe['cat_plots'];
}
}
if($i==2){
if($image_files['name'][2]){
	
    $thumb_url_sx=$thumb_url;
    $orgImg_sx=$orgImg; 
	
}
else{
   $thumb_url_sx=$jihe['cat_plotsx_m'];  
   $orgImg_sx=$jihe['cat_plotsx'];
}
}

if($i==3){
if($image_files['name'][3]){
	
    $thumb_url_pt=$thumb_url;
    $orgImg_pt=$orgImg; 
	
}
else{
   $thumb_url_pt=$jihe['cat_photo_m'];  
   $orgImg_pt=$jihe['cat_photo'];
}
}
if($i==4){
if($image_files['name'][4]){
	
    $thumb_url_vm=$thumb_url;
    $orgImg_v=$orgImg; 
	
}
else{
   $thumb_url_vm=$jihe['cat_video_m'];  
   $orgImg_v=$jihe['cat_video'];
}
}

if($i==5){
if($image_files['name'][5]){
	

    $thumb_url_pimg1=$orgImg; 
	
}
else{
   $thumb_url_pimg1=$jihe['b_img1'];
}
}
if($i==6){
if($image_files['name'][6]){
	
    $thumb_url_pimg2=$orgImg; 
	
}
else{
   $thumb_url_pimg2=$jihe['b_img2'];
}
}
if($i==7){
if($image_files['name'][7]){
	
    $thumb_url_pimg3=$orgImg; 
	
}
else{
   $thumb_url_pimg3=$jihe['b_img3'];
}

}
//原图保存

if($image_files['name'][$i])
{
if (!move_upload_file($image_files['tmp_name'][$i],$path.$orgImg))
    {
        return false;
    }
}
}

//exit;

$sql = "UPDATE  ".$GLOBALS['ecs']->table('category')." SET cat_plot='".$orgImg_p."',cat_plot_m='".$thumb_url_p."',cat_plots='".$orgImg_s."',cat_plots_m='".$thumb_url_s."',cat_plotsx='".$orgImg_sx."',cat_plotsx_m='".$thumb_url_sx."',cat_photo='".$orgImg_pt."',cat_photo_m='".$thumb_url_pt."',cat_video='".$orgImg_v."',cat_video_m='".$thumb_url_vm."',b_img1='".$thumb_url_pimg1."',b_img2='".$thumb_url_pimg2."',b_img3='".$thumb_url_pimg3."' where cat_id=".$news_id;			
    $GLOBALS['db']->query($sql);

		
}
}
?>