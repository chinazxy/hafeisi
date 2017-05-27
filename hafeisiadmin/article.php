<?php



define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');
require_once(ROOT_PATH . "includes/fckeditor/fckeditor.php");
require_once(ROOT_PATH . 'includes/cls_image.php');

/*初始化数据交换对象 */
$exc   = new exchange($ecs->table("article"), $db, 'article_id', 'title');
//$image = new cls_image();

/* 允许上传的文件类型 */
$allow_file_types = '|GIF|JPG|PNG|BMP|SWF|DOC|XLS|PPT|MID|WAV|ZIP|RAR|PDF|CHM|RM|TXT|';

/*------------------------------------------------------ */
//-- 文章列表
/*------------------------------------------------------ */

if ($_REQUEST['act'] == 'list')
{
    /* 取得过滤条件 */
    $filter = array();
    $smarty->assign('cat_select',  article_cat_list(0));
    $smarty->assign('ur_here',      $_LANG['03_article_list']);
    $smarty->assign('action_link',  array('text' => $_LANG['article_add'], 'href' => 'article.php?act=add'));
    $smarty->assign('full_page',    1);
    $smarty->assign('filter',       $filter);

    $article_list = get_articleslist();

    $smarty->assign('article_list',    $article_list['arr']);
    $smarty->assign('filter',          $article_list['filter']);
    $smarty->assign('record_count',    $article_list['record_count']);
    $smarty->assign('page_count',      $article_list['page_count']);

    $sort_flag  = sort_flag($article_list['filter']);
    $smarty->assign($sort_flag['tag'], $sort_flag['img']);

    assign_query_info();
    $smarty->display('article_list.htm');
}

/*------------------------------------------------------ */
//-- 翻页，排序
/*------------------------------------------------------ */
elseif ($_REQUEST['act'] == 'query')
{
    check_authz_json('article_manage');

    $article_list = get_articleslist();

    $smarty->assign('article_list',    $article_list['arr']);
    $smarty->assign('filter',          $article_list['filter']);
    $smarty->assign('record_count',    $article_list['record_count']);
    $smarty->assign('page_count',      $article_list['page_count']);

    $sort_flag  = sort_flag($article_list['filter']);
    $smarty->assign($sort_flag['tag'], $sort_flag['img']);

    make_json_result($smarty->fetch('article_list.htm'), '',
        array('filter' => $article_list['filter'], 'page_count' => $article_list['page_count']));
}

/*------------------------------------------------------ */
//-- 添加文章
/*------------------------------------------------------ */
if ($_REQUEST['act'] == 'add')
{
    /* 权限判断 */
    admin_priv('article_manage');

    /* 创建 html editor */
    create_html_editor('FCKeditor1');
	create_html_editor('encontent',$article['encontent']);
    /*初始化*/
    $article = array();
    $article['is_open'] = 1;

    /* 取得分类、品牌 */
    $smarty->assign('goods_cat_list', cat_list());
    $smarty->assign('brand_list',     get_brand_list());

    /* 清理关联商品 */
    $sql = "DELETE FROM " . $ecs->table('goods_article') . " WHERE article_id = 0";
    $db->query($sql);

    if (isset($_GET['id']))
    {
        $smarty->assign('cur_id',  $_GET['id']);
    }
    $smarty->assign('article',     $article);
    $smarty->assign('cat_select',  article_cat_list(0));
    $smarty->assign('ur_here',     $_LANG['article_add']);
    $smarty->assign('action_link', array('text' => $_LANG['03_article_list'], 'href' => 'article.php?act=list'));
    $smarty->assign('form_action', 'insert');

    assign_query_info();
    $smarty->display('article_info.htm');
}

/*------------------------------------------------------ */
//-- 添加文章
/*------------------------------------------------------ */
if ($_REQUEST['act'] == 'insert')
{
    /* 权限判断 */
    admin_priv('article_manage');

    /*检查是否重复*/
    $is_only = $exc->is_only('title', $_POST['title'],0, " cat_id ='$_POST[article_cat]'");

    if (!$is_only)
    {
        sys_msg(sprintf($_LANG['title_exist'], stripslashes($_POST['title'])), 1);
    }

    /* 取得文件地址 */
    $file_url = '';
	$file_thump_url = '';
    if ((isset($_FILES['file']['error']) && $_FILES['file']['error'] == 0) || (!isset($_FILES['file']['error']) && isset($_FILES['file']['tmp_name']) && $_FILES['file']['tmp_name'] != 'none'))
    {
        // 检查文件格式
        if (!check_file_type($_FILES['file']['tmp_name'], $_FILES['file']['name'], $allow_file_types))
        {
            sys_msg($_LANG['invalid_file']);
        }

        // 复制文件
        $res = upload_article_file($_FILES['file']);
        if ($res != false)
        {
            $file_url = $res[2];
			$file_thump_t= $res[1];
			$file_thump_m= $res[0];
        }
    }
	
 	$index_plot="";
	
	    if ((isset($_FILES['file_index_plot']['error']) && $_FILES['file_index_plot']['error'] == 0) || (!isset($_FILES['file_index_plot']['error']) && isset($_FILES['file_index_plot']['tmp_name']) && $_FILES['file_index_plot']['tmp_name'] != 'none'))
    {
        // 检查文件格式
        if (!check_file_type($_FILES['file_index_plot']['tmp_name'], $_FILES['file_index_plot']['name'], $allow_file_types))
        {
            sys_msg($_LANG['invalid_file']);
        }

        // 复制文件
        $res = 	upload_article_index_plot($_FILES['file_index_plot']);
        if ($res != false)
        {
            $index_plot = $res;
			
        }
    }
	


    if ($file_url == '')
    {
        $file_url = $_POST['file_url'];
    }

    /* 计算文章打开方式 */
    if ($file_url == '')
    {
        $open_type = 0;
    }
    else
    {
        $open_type = $_POST['FCKeditor1'] == '' ? 1 : 2;
    }
	 if ($file_url == '')
    {
        $open_type = 0;
    }
    else
    {
        $open_type = $_POST['encontent'] == '' ? 1 : 2;
    }
	
	$isshow=$_POST['is_show'] == '' ? 1 : 2;
	$fptime=!empty($_POST['fp_time'])?strtotime($_POST['fp_time']):time();
    $resort=isset($_POST['resort'])?$_POST['resort']:0;
    /*插入数据*/
    $add_time = time();
	$month=date("n",$add_time);
    if (empty($_POST['cat_id']))
    {
        $_POST['cat_id'] = 0;
    }
    $sql = "INSERT INTO ".$ecs->table('article')."(title,entitle, cat_id, article_type, is_open,is_show, author, ".
                "author_email, keywords, content,encontent, add_time, file_url, open_type, link, description,endescription,file_ulr_m,file_url_t,index_plot,month,fp_time,resort) ".
            "VALUES ('$_POST[title]', '$_POST[entitle]','$_POST[article_cat]', '$_POST[article_type]', '$_POST[is_open]','$_POST[is_show]', ".
                "'$_POST[author]', '$_POST[author_email]', '$_POST[keywords]', '$_POST[FCKeditor1]','$_POST[encontent]', ".
                "'$add_time', '$file_url', '$open_type', '$_POST[link_url]', '$_POST[description]','$_POST[endescription]','$file_thump_m','$file_thump_t','$index_plot','$month','$fptime','$resort')";
    $db->query($sql);

    /* 处理关联商品 */
    $article_id = $db->insert_id();
    $sql = "UPDATE " . $ecs->table('goods_article') . " SET article_id = '$article_id' WHERE article_id = 0";
    $db->query($sql);
	handle_gallery_image($article_id,$_FILES['img_url'],$_POST['img_title'],$_POST['img_sort']);

    $link[0]['text'] = $_LANG['continue_add'];
    $link[0]['href'] = 'article.php?act=add';

    $link[1]['text'] = $_LANG['back_list'];
    $link[1]['href'] = 'article.php?act=list';

    admin_log($_POST['title'],'add','article');

    clear_cache_files(); // 清除相关的缓存文件

    sys_msg($_LANG['articleadd_succeed'],0, $link);
}

/*------------------------------------------------------ */
//-- 编辑
/*------------------------------------------------------ */
if ($_REQUEST['act'] == 'edit')
{
    /* 权限判断 */
    admin_priv('article_manage');

    /* 取文章数据 */
    $sql = "SELECT * FROM " .$ecs->table('article'). " WHERE article_id='$_REQUEST[id]'";
    $article = $db->GetRow($sql);
	
	/*获取图片例表*/
	
	 $sql = "SELECT * FROM " . $ecs->table('news_img') . " WHERE cat_id = '$_REQUEST[id]' order by resort asc";
        $img_list = $db->getAll($sql);

    /* 创建 html editor */
    create_html_editor('FCKeditor1',$article['content']);
	create_html_editor('encontent',$article['encontent']);
	$article['fp_time']=date("Y-m-d H:i:s",$article['fp_time']);

    /* 取得分类、品牌 */
    $smarty->assign('goods_cat_list', cat_list());
    $smarty->assign('brand_list', get_brand_list());

    /* 取得关联商品 */
    $goods_list = get_article_goods($_REQUEST['id']);
    $smarty->assign('goods_list', $goods_list);
    $smarty->assign('img_list',$img_list);
    $smarty->assign('article',  $article);
    $smarty->assign('cat_select',  article_cat_list(0, $article['cat_id']));
    $smarty->assign('ur_here',     $_LANG['article_edit']);
    $smarty->assign('action_link', array('text' => $_LANG['03_article_list'], 'href' => 'article.php?act=list&' . list_link_postfix()));
    $smarty->assign('form_action', 'update');
   
    assign_query_info();
	
    $smarty->display('article_info.htm');
}

if ($_REQUEST['act'] =='update')
{
    /* 权限判断 */
    admin_priv('article_manage');

    /*检查文章名是否相同*/
    $is_only = $exc->is_only('title', $_POST['title'], $_POST['id'], "cat_id = '$_POST[article_cat]'");

    if (!$is_only)
    {
        sys_msg(sprintf($_LANG['title_exist'], stripslashes($_POST['title'])), 1);
    }


    if (empty($_POST['cat_id']))
    {
        $_POST['cat_id'] = 0;
    }

    /* 取得文件地址 */
    $file_url = '';
	$file_thump_url='';
	$index_plot="";
    if (empty($_FILES['file']['error']) || (!isset($_FILES['file']['error']) && isset($_FILES['file']['tmp_name']) && $_FILES['file']['tmp_name'] != 'none'))
    {
        // 检查文件格式
        if (!check_file_type($_FILES['file']['tmp_name'], $_FILES['file']['name'], $allow_file_types))
        {
            sys_msg($_LANG['invalid_file']);
        }

        // 复制文件
        $res = upload_article_file($_FILES['file']);
        if ($res!= false)
        {
		    
             $file_url = $res[2];
			$file_thump_t= $res[1];
			$file_thump_m= $res[0];
			
        }
    }
	
	 if ($file_url == '')
    {
                 $file_url = $_POST['file_url'];
			$file_thump_t=$_POST['file_ulr_m'];
			$file_thump_m= $_POST['file_url_t']; 
    }
	
	  if (empty($_FILES['file_index_plot']['error']) || (!isset($_FILES['file_index_plot']['error']) && isset($_FILES['file_index_plot']['tmp_name']) && $_FILES['file_index_plot']['tmp_name'] != 'none'))
    {
        // 检查文件格式
        if (!check_file_type($_FILES['file_index_plot']['tmp_name'], $_FILES['file_index_plot']['name'], $allow_file_types))
        {
            sys_msg($_LANG['invalid_file']);
        }

        // 复制文件
        $res = upload_article_index_plot($_FILES['file_index_plot']);
        if ($res!= false)
        {
		    
            $index_plot=$res;
			
        }
    }
	
	
	if($index_plot==""){
	
	      $index_plot=$_POST['hid_index_plot'];
	}
 
    
    /* 计算文章打开方式 */
    if ($file_url == '')
    {
        $open_type = 0;
    }
    else
    {
        $open_type = $_POST['FCKeditor1'] == '' ? 1 : 2;
    }
	 if ($file_url == '')
    {
        $open_type = 0;
    }
    else
    {
        $open_type = $_POST['encontent'] == '' ? 1 : 2;
    }
	$fptime=!empty($_POST['fp_time'])?strtotime($_POST['fp_time']):time();
	    $resort=isset($_POST['resort'])?$_POST['resort']:0;
    /* 如果 file_url 跟以前不一样，且原来的文件是本地文件，删除原来的文件 */
    $sql = "SELECT file_url FROM " . $ecs->table('article') . " WHERE article_id = '$_POST[id]'";
    $old_url = $db->getOne($sql);
    if ($old_url != '' && $old_url != $file_url && strpos($old_url, 'http://') === false && strpos($old_url, 'https://') === false)
    {
        @unlink(ROOT_PATH . $old_url);
    }
    
    if ($exc->edit("title='$_POST[title]',entitle='$_POST[entitle]', cat_id='$_POST[article_cat]', article_type='$_POST[article_type]', is_open='$_POST[is_open]',is_show='$_POST[is_show]', author='$_POST[author]', author_email='$_POST[author_email]', keywords ='$_POST[keywords]', file_url ='$file_url', open_type='$open_type', content='$_POST[FCKeditor1]',encontent='$_POST[encontent]', link='$_POST[link_url]', description = '$_POST[description]',endescription = '$_POST[endescription]',file_ulr_m='$file_thump_m',file_url_t='$file_thump_t',index_plot='$index_plot',fp_time='$fptime',resort='$resort'", $_POST['id']))
    {
        $link[0]['text'] = $_LANG['back_list'];
        $link[0]['href'] = 'article.php?act=list&' . list_link_postfix();

        $note = sprintf($_LANG['articleedit_succeed'], stripslashes($_POST['title']));
        admin_log($_POST['title'], 'edit', 'article');
	
     
	    handle_gallery_image($_POST['id'],$_FILES['img_url'],$_POST['img_title'],$_POST['img_sort']);
	
        clear_cache_files();
      
        sys_msg($note, 0, $link);
    }
    else
    {
        die($db->error());
    }
}

/*------------------------------------------------------ */
//-- 编辑文章主题
/*------------------------------------------------------ */
elseif ($_REQUEST['act'] == 'edit_title')
{
    check_authz_json('article_manage');

    $id    = intval($_POST['id']);
    $title = json_str_iconv(trim($_POST['val']));
  
    /* 检查文章标题是否重复 */
    if ($exc->num("title", $title, $id) != 0)
    {
        make_json_error(sprintf($_LANG['title_exist'], $title));
    }
    else
    {
        if ($exc->edit("title = '$title'", $id))
        {
		     $sql="SELECT cat_id FROM " . $ecs->table('article') . " WHERE article_id =".$id;
	
         	$cat_id=$db->getOne($sql);
		
            clear_cache_files();
            admin_log($title, 'edit', 'article');
            make_json_result(stripslashes($title));
        }
        else
        {
            make_json_error($db->error());
        }
    }
}

/*------------------------------------------------------ */
//-- 切换是否显示
/*------------------------------------------------------ */
elseif ($_REQUEST['act'] == 'toggle_show')
{
    check_authz_json('article_manage');

    $id     = intval($_POST['id']);
    $val    = intval($_POST['val']);

    $exc->edit("is_open = '$val'", $id);
	     $sql="SELECT cat_id FROM " . $ecs->table('article') . " WHERE article_id =".$id;
	
         	$cat_id=$db->getOne($sql);
		   
    clear_cache_files();

    make_json_result($val);
}
elseif ($_REQUEST['act'] == 'is_show')
{
    check_authz_json('article_manage');

    $id     = intval($_POST['id']);
    $val    = intval($_POST['val']);

    $exc->edit("is_show = '$val'", $id);
	     $sql="SELECT cat_id FROM " . $ecs->table('article') . " WHERE article_id =".$id;
	
         	$cat_id=$db->getOne($sql);
		   
    clear_cache_files();

    make_json_result($val);
}elseif ($_REQUEST['act'] == 'article_type')
{
    check_authz_json('article_manage');

    $id     = intval($_POST['id']);
    $val    = intval($_POST['val']);

    $exc->edit("article_type = '$val'", $id);
	     $sql="SELECT cat_id FROM " . $ecs->table('article') . " WHERE article_id =".$id;
	
         	$cat_id=$db->getOne($sql);
		   
    clear_cache_files();

    make_json_result($val);
}

/*------------------------------------------------------ */
//-- 切换文章重要性
/*------------------------------------------------------ */
elseif ($_REQUEST['act'] == 'toggle_type')
{
    check_authz_json('article_manage');

    $id     = intval($_POST['id']);
    $val    = intval($_POST['val']);

    $exc->edit("article_type = '$val'", $id);
    clear_cache_files();
     $sql="SELECT cat_id FROM " . $ecs->table('article') . " WHERE article_id =".$id;
	
         	$cat_id=$db->getOne($sql);
		
    make_json_result($val);
}



/*------------------------------------------------------ */
//-- 删除文章主题
/*------------------------------------------------------ */
elseif ($_REQUEST['act'] == 'remove')
{
    check_authz_json('article_manage');

    $id = intval($_GET['id']);

    /* 删除原来的文件 */
    $sql = "SELECT file_url,file_ulr_m,file_url_t,index_plot,cat_id FROM " . $ecs->table('article') . " WHERE article_id = '$id'";
    $old_url = $db->getRow($sql);
    if ($old_url['file_url'] != '' && strpos($old_url['file_url'], 'http://') === false && strpos($old_url['file_url'], 'https://') === false)
    {
        @unlink(ROOT_PATH . $old_url['file_url']);
    }
	
	   if ($old_url['file_ulr_m'] != '')
    {
        @unlink(ROOT_PATH . $old_url['file_ulr_m']);
    }
	
		   if ($old_url['file_url_t'] != '')
    {
        @unlink(ROOT_PATH . $old_url['file_url_t']);
    }
	
	
			   if ($old_url['index_plot'] != '')
    {
        @unlink(ROOT_PATH . $old_url['index_plot']);
    }

    $name = $exc->get_name($id);
    if ($exc->drop($id))
    {
        $db->query("DELETE FROM " . $ecs->table('comment') . " WHERE " . "comment_type = 1 AND id_value = $id");
 
        admin_log(addslashes($name),'remove','article');
		
        clear_cache_files();
    }
  
    $url = 'article.php?act=query&' . str_replace('act=remove', '', $_SERVER['QUERY_STRING']);
  
    ecs_header("Location: $url\n");
    exit;
}

/*------------------------------------------------------ */
//-- 将商品加入关联
/*------------------------------------------------------ */
elseif ($_REQUEST['act'] == 'add_link_goods')
{
    include_once(ROOT_PATH . 'includes/cls_json.php');
    $json = new JSON;

    check_authz_json('article_manage');

    $add_ids = $json->decode($_GET['add_ids']);
    $args = $json->decode($_GET['JSON']);
    $article_id = $args[0];

    if ($article_id == 0)
    {
        $article_id = $db->getOne('SELECT MAX(article_id)+1 AS article_id FROM ' .$ecs->table('article'));
    }

    foreach ($add_ids AS $key => $val)
    {
        $sql = 'INSERT INTO ' . $ecs->table('goods_article') . ' (goods_id, article_id) '.
               "VALUES ('$val', '$article_id')";
        $db->query($sql, 'SILENT') or make_json_error($db->error());
    }

    /* 重新载入 */
    $arr = get_article_goods($article_id);
    $opt = array();

    foreach ($arr AS $key => $val)
    {
        $opt[] = array('value'  => $val['goods_id'],
                        'text'  => $val['goods_name'],
                        'data'  => '');
    }

    make_json_result($opt);
}

/*------------------------------------------------------ */
//-- 将商品删除关联
/*------------------------------------------------------ */
elseif ($_REQUEST['act'] == 'drop_link_goods')
{
    include_once(ROOT_PATH . 'includes/cls_json.php');
    $json = new JSON;

    check_authz_json('article_manage');

    $drop_goods     = $json->decode($_GET['drop_ids']);
    $arguments      = $json->decode($_GET['JSON']);
    $article_id     = $arguments[0];

    if ($article_id == 0)
    {
        $article_id = $db->getOne('SELECT MAX(article_id)+1 AS article_id FROM ' .$ecs->table('article'));
    }

    $sql = "DELETE FROM " . $ecs->table('goods_article').
            " WHERE article_id = '$article_id' AND goods_id " .db_create_in($drop_goods);
    $db->query($sql, 'SILENT') or make_json_error($db->error());

    /* 重新载入 */
    $arr = get_article_goods($article_id);
    $opt = array();

    foreach ($arr AS $key => $val)
    {
        $opt[] = array('value'  => $val['goods_id'],
                        'text'  => $val['goods_name'],
                        'data'  => '');
    }

    make_json_result($opt);
	
}elseif ($_REQUEST['act'] == 'drop_image')
{
    check_authz_json('article_manage');

    $img_id = empty($_REQUEST['img_id']) ? 0 : intval($_REQUEST['img_id']);

    /* 删除图片文件 */
    $sql = "SELECT thump_o, thump_t, thump_m,cat_id " .
            " FROM " . $GLOBALS['ecs']->table('news_img') .
            " WHERE id = '$img_id'";
    $row = $GLOBALS['db']->getRow($sql);

    if ($row['thump_o'] != '' && is_file('../' . $row['thump_o']))
    {
        @unlink('../' . $row['thump_o']);
    }
    if ($row['thump_t'] != '' && is_file('../' . $row['thump_t']))
    {
        @unlink('../' . $row['thump_t']);
    }
    if ($row['thump_m'] != '' && is_file('../' . $row['thump_m']))
    {
        @unlink('../' . $row['thump_m']);
    }

    /* 删除数据 */
    $sql = "DELETE FROM " . $GLOBALS['ecs']->table('news_img') . " WHERE id = '$img_id' LIMIT 1";
    $GLOBALS['db']->query($sql);


    clear_cache_files();
    make_json_result($img_id);
}elseif ($_REQUEST['act'] == 'drop_plot_image')
{
    check_authz_json('article_manage');

    $img_id = empty($_REQUEST['img_id']) ? 0 : intval($_REQUEST['img_id']);

    /* 删除图片文件 */
    $sql = "SELECT file_url,file_ulr_m,cat_id " .
            " FROM " . $GLOBALS['ecs']->table('article') .
            " WHERE article_id = '$img_id'";
    $row = $GLOBALS['db']->getRow($sql);

    if ($row['file_url'] != '' && is_file('../' . $row['file_url']))
    {
        @unlink('../' . $row['file_url']);
    }
    if ($row['file_ulr_m'] != '' && is_file('../' . $row['file_ulr_m']))
    {
        @unlink('../' . $row['file_ulr_m']);
    }
    $sql = "UPDATE " . $ecs->table('article') . " SET file_url = '',file_ulr_m='' WHERE article_id =".$img_id;
    $db->query($sql);
    /* 删除数据 */
    //$sql = "DELETE FROM " . $GLOBALS['ecs']->table('news_img') . " WHERE id = '$img_id' LIMIT 1";
    //$GLOBALS['db']->query($sql);

    clear_cache_files();
    make_json_result($img_id);
}elseif ($_REQUEST['act'] == 'drop_index_plot_image')
{
    check_authz_json('article_manage');

    $img_id = empty($_REQUEST['img_id']) ? 0 : intval($_REQUEST['img_id']);

    /* 删除图片文件 */
    $sql = "SELECT index_plot,cat_id " .
            " FROM " . $GLOBALS['ecs']->table('article') .
            " WHERE article_id = '$img_id'";
    $row = $GLOBALS['db']->getRow($sql);

    if ($row['index_plot'] != '' && is_file('../' . $row['index_plot']))
    {
        @unlink('../' . $row['index_plot']);
    }
 
    $sql = "UPDATE " . $ecs->table('article') . " SET index_plot = '' WHERE article_id =".$img_id;
    $db->query($sql);
    /* 删除数据 */
    //$sql = "DELETE FROM " . $GLOBALS['ecs']->table('news_img') . " WHERE id = '$img_id' LIMIT 1";
    //$GLOBALS['db']->query($sql);

    clear_cache_files();
    make_json_result($img_id);
}

/*------------------------------------------------------ */
//-- 搜索商品
/*------------------------------------------------------ */
if ($_REQUEST['act'] == 'get_goods_list')
{
    include_once(ROOT_PATH . 'includes/cls_json.php');
    $json = new JSON;

    $filters = $json->decode($_GET['JSON']);

    $arr = get_goods_list($filters);
    $opt = array();

    foreach ($arr AS $key => $val)
    {
        $opt[] = array('value' => $val['goods_id'],
                        'text' => $val['goods_name'],
                        'data' => $val['shop_price']);
    }

    make_json_result($opt);
}
/*------------------------------------------------------ */
//-- 批量操作
/*------------------------------------------------------ */

elseif ($_REQUEST['act'] == 'batch')
{
    /* 批量删除 */
    if (isset($_POST['type']))
    {
        if ($_POST['type'] == 'button_remove')
        {
            admin_priv('article_manage');

            if (!isset($_POST['checkboxes']) || !is_array($_POST['checkboxes']))
            {
                sys_msg($_LANG['no_select_article'], 1);
            }

            /* 删除原来的文件 */
            $sql = "SELECT file_url,file_ulr_m FROM " . $ecs->table('article') .
                    " WHERE article_id " . db_create_in(join(',', $_POST['checkboxes'])) .
                    " AND file_url <> ''";

            $res = $db->query($sql);
            while ($row = $db->fetchRow($res))
            {
                $old_url = $row['file_url'];
                if (strpos($old_url, 'http://') === false && strpos($old_url, 'https://') === false)
                {
                    @unlink(ROOT_PATH . $old_url);
				    @unlink(ROOT_PATH . $row['file_ulr_m']);
                }
            }
			
			 

            foreach ($_POST['checkboxes'] AS $key => $id)
            {
                if ($exc->drop($id))
                {
				     /* 删除图片文件 */
    $sql = "SELECT thump_o, thump_t, thump_m " .
            " FROM " . $GLOBALS['ecs']->table('news_img') .
            " WHERE cat_id = '$id'";
    $rows = $GLOBALS['db']->getAll($sql);
	
	 foreach($rows as $vals){

    if ($vals['thump_o'] != '' && is_file('../' . $vals['thump_o']))
    {
        @unlink('../' . $vals['thump_o']);
    }
    if ($vals['thump_t'] != '' && is_file('../' . $vals['thump_t']))
    {
        @unlink('../' . $vals['thump_t']);
    }
    if ($vals['thump_m'] != '' && is_file('../' . $vals['thump_m']))
    {
        @unlink('../' . $vals['thump_m']);
    }
	
	}
                    $name = $exc->get_name($id);
                    admin_log(addslashes($name),'remove','article');
                }
            }

        }

        /* 批量隐藏 */
        if ($_POST['type'] == 'button_hide')
        {
            check_authz_json('article_manage');
            if (!isset($_POST['checkboxes']) || !is_array($_POST['checkboxes']))
            {
                sys_msg($_LANG['no_select_article'], 1);
            }

            foreach ($_POST['checkboxes'] AS $key => $id)
            {
              $exc->edit("is_open = '0'", $id);
            }
        }

        /* 批量显示 */
        if ($_POST['type'] == 'button_show')
        {
            check_authz_json('article_manage');
            if (!isset($_POST['checkboxes']) || !is_array($_POST['checkboxes']))
            {
                sys_msg($_LANG['no_select_article'], 1);
            }

            foreach ($_POST['checkboxes'] AS $key => $id)
            {
              $exc->edit("is_open = '1'", $id);
            }
        }

        /* 批量移动分类 */
        if ($_POST['type'] == 'move_to')
        {
            check_authz_json('article_manage');
            if (!isset($_POST['checkboxes']) || !is_array($_POST['checkboxes']) )
            {
                sys_msg($_LANG['no_select_article'], 1);
            }

            if(!$_POST['target_cat'])
            {
                sys_msg($_LANG['no_select_act'], 1);
            }
            
            foreach ($_POST['checkboxes'] AS $key => $id)
            {
              $exc->edit("cat_id = '".$_POST['target_cat']."'", $id);
            }
        }
    }

    /* 清除缓存 */
    clear_cache_files();
	   
    $lnk[] = array('text' => $_LANG['back_list'], 'href' => 'article.php?act=list');

    sys_msg($_LANG['batch_handle_ok'], 0, $lnk);
}

/* 把商品删除关联 */
function drop_link_goods($goods_id, $article_id)
{
    $sql = "DELETE FROM " . $GLOBALS['ecs']->table('goods_article') .
            " WHERE goods_id = '$goods_id' AND article_id = '$article_id' LIMIT 1";
    $GLOBALS['db']->query($sql);
    create_result(true, '', $goods_id);
}

/* 取得文章关联商品 */
function get_article_goods($article_id)
{
    $list = array();
    $sql  = 'SELECT g.goods_id, g.goods_name'.
            ' FROM ' . $GLOBALS['ecs']->table('goods_article') . ' AS ga'.
            ' LEFT JOIN ' . $GLOBALS['ecs']->table('goods') . ' AS g ON g.goods_id = ga.goods_id'.
            " WHERE ga.article_id = '$article_id'";
    $list = $GLOBALS['db']->getAll($sql);

    return $list;
}

/* 获得文章列表 */
function get_articleslist()
{
    $result = get_filter();
    if ($result === false)
    {
        $filter = array();
        $filter['keyword']    = empty($_REQUEST['keyword']) ? '' : trim($_REQUEST['keyword']);
        if (isset($_REQUEST['is_ajax']) && $_REQUEST['is_ajax'] == 1)
        {
            $filter['keyword'] = json_str_iconv($filter['keyword']);
        }
        $filter['cat_id'] = empty($_REQUEST['cat_id']) ? 0 : intval($_REQUEST['cat_id']);
        $filter['sort_by']    = empty($_REQUEST['sort_by']) ? 'a.article_id' : trim($_REQUEST['sort_by']);
        $filter['sort_order'] = empty($_REQUEST['sort_order']) ? 'DESC' : trim($_REQUEST['sort_order']);

        $where = '';
        if (!empty($filter['keyword']))
        {
            $where = " AND a.title LIKE '%" . mysql_like_quote($filter['keyword']) . "%'";
        }
        if ($filter['cat_id'])
        {
            $where .= " AND a." . get_article_children($filter['cat_id']);
        }

        /* 文章总数 */
        $sql = 'SELECT COUNT(*) FROM ' .$GLOBALS['ecs']->table('article'). ' AS a '.
               'LEFT JOIN ' .$GLOBALS['ecs']->table('article_cat'). ' AS ac ON ac.cat_id = a.cat_id '.
               'WHERE 1 ' .$where;
        $filter['record_count'] = $GLOBALS['db']->getOne($sql);

        $filter = page_and_size($filter);

        /* 获取文章数据 */
        $sql = 'SELECT a.* , ac.cat_name '.
               'FROM ' .$GLOBALS['ecs']->table('article'). ' AS a '.
               'LEFT JOIN ' .$GLOBALS['ecs']->table('article_cat'). ' AS ac ON ac.cat_id = a.cat_id '.
               'WHERE 1 ' .$where. ' ORDER by '.$filter['sort_by'].' '.$filter['sort_order'];

        $filter['keyword'] = stripslashes($filter['keyword']);
        set_filter($filter, $sql);
    }
    else
    {
        $sql    = $result['sql'];
        $filter = $result['filter'];
    }
    $arr = array();
    $res = $GLOBALS['db']->selectLimit($sql, $filter['page_size'], $filter['start']);

    while ($rows = $GLOBALS['db']->fetchRow($res))
    {
        $rows['date'] = local_date($GLOBALS['_CFG']['time_format'], $rows['add_time']);

        $arr[] = $rows;
    }
    return array('arr' => $arr, 'filter' => $filter, 'page_count' => $filter['page_count'], 'record_count' => $filter['record_count']);
}

/* 上传文件 */
function upload_article_file($upload)
{
    $image = new cls_image();
    $articleFile=array();
    if (!make_dir("../" . DATA_DIR . "/article"))
    {
        /* 创建目录失败 */
        return false;
    }


$articel_width =  $GLOBALS['db']->getOne("select value from ".$GLOBALS['ecs']->table('shop_config')." where code='articel_width'");

$articel_height =  $GLOBALS['db']->getOne("select value from ".$GLOBALS['ecs']->table('shop_config')." where code='articel_height'");

    $filename = cls_image::random_filename() . substr($upload['name'], strpos($upload['name'], '.'));
    $path     = ROOT_PATH. DATA_DIR . "/article/" . $filename;
	
                       
    if (move_upload_file($upload['tmp_name'], $path))
    {    

                $image->thumbMaxHeight = 1000;
                $image->thumbMaxWidth =300;
                $image->thumbMixHeight =200;
                $image->thumbMixWidth =300;
	            $m = cls_image::cutImg($path, 330,177, "_m", 1);
	            if ($image->thumbMixWidth > 0) {
                         //   $thumbname = cls_image::cutImg($path, 300, 1000,"_g", 2,"_m");
                        } else {
                            $thumbname = $m;
                }
				
				
				     $g = cls_image::cutImg($path,300,200, "_t", 2);
	            if ($image->thumbMixWidth > 0) {
                         //   $thumbname = cls_image::cutImg($path, 300, 1000,"_g", 2,"_m");
                        } else {
                            $thumbname = $g;
                }
				
		
			
						
	     $filenames=explode(".",$filename);
         $thumbnames_m=DATA_DIR . "/article/".$filenames[0]."_m".".".$filenames[1];	
		 
		  $thumbnames_t=DATA_DIR . "/article/".$filenames[0]."_t".".".$filenames[1];	 
	     array_push($articleFile,$thumbnames_m);
	     array_push($articleFile,$thumbnames_t);
	     array_push($articleFile,DATA_DIR . "/article/" . $filename);
        return $articleFile;
    }
    else
    {
        return false;
    }
}

function upload_article_index_plot($upload)
{
    $image = new cls_image();


    $filename = cls_image::random_filename() . substr($upload['name'], strpos($upload['name'], '.'));
    $path     = ROOT_PATH;
	$orgImg=DATA_DIR . "/article/".$filename;     
	if (!move_upload_file($upload['tmp_name'],$path.$orgImg))
    {
        return false;
    }else{
		
		    return $orgImg;
		
	}
                  
}




function handle_gallery_image($news_id, $image_files,$image_title,$image_sort)

{ 
$articel_thump_width =  $GLOBALS['db']->getOne("select value from ".$GLOBALS['ecs']->table('shop_config')." where code='articel_thump_width'");
$articel_thump_height =  $GLOBALS['db']->getOne("select value from ".$GLOBALS['ecs']->table('shop_config')." where code='articel_thump_height'");

$articel_width =  $GLOBALS['db']->getOne("select value from ".$GLOBALS['ecs']->table('shop_config')." where code='articel_width'");

$articel_height =  $GLOBALS['db']->getOne("select value from ".$GLOBALS['ecs']->table('shop_config')." where code='articel_height'");

$path= ROOT_PATH;
$image = new cls_image();
foreach ($image_title AS $key => $title)

{
$imgtitle=$title;
$imgresort=$image_sort[$key];
$filename =$image->random_filename() . substr($image_files['name'][0], strpos($image_files['name'][0], '.'));
$orgImg=DATA_DIR . "/article/".$filename;

$path_t     =  DATA_DIR . "/article/"."t_".$filename;
$path_m    = DATA_DIR . "/article/"."m_".$filename;
$thumb_url = $image->make_thumb($image_files['tmp_name'][$key],200,135,$path.DATA_DIR . "/article/");  

$thumb_url = DATA_DIR . "/article/".is_string($thumb_url) ? $thumb_url : '';
//原图保存
if (!move_upload_file($image_files['tmp_name'][$key],$path.$orgImg))
    {
        return false;
    }
//缩略图生成




    
	            $m = cls_image::cutImg($path.$orgImg, 300,1000, "_m", 1);
				
				$imgarrays=explode(".",$filename);

$path_m    = DATA_DIR . "/article/".$imgarrays[0]."_m".".".$imgarrays[1];
if($image_files['name'][$key]!='')

{
$sql = "INSERT INTO ".$GLOBALS['ecs']->table('news_img')."(cat_id,title,resort,thump_o,thump_t,thump_m) ".
            "VALUES ('$news_id','$imgtitle','$imgresort','$orgImg','$thumb_url','$path_m')";
			
    $GLOBALS['db']->query($sql);


}

}

}




?>