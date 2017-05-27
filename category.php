<?php



define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');

if($_POST['act'] == load){

}
if ((DEBUG_MODE & 2) != 2)
{
    $smarty->caching = true;
}
$is_mobile = is_mobile();
 $cat_id=1;
     $position = assign_ur_here();
	  
	  $sql = "SELECT * FROM " .$ecs->table('category'). " WHERE parent_id =".$cat_id." order by sort_order asc";
	    $sqls = "SELECT * FROM " .$ecs->table('category'). " WHERE cat_id =".$cat_id;
		$cinfo=$GLOBALS['db']->getRow($sqls);
		
		
	  $products = $GLOBALS['db']->getAll($sql);
	   $smarty->assign('page_title',    $cinfo['cat_name']."-".$position['title']);    // 页面标题
    $smarty->assign('ur_here',         $position['ur_here']);  // 当前位置
     
	  	$smarty->assign("products",$products);
	    $smarty->assign("states",$states);
		 $cat = get_cat_info($cat_id);   // 获得分类的相关信息

	if(empty($cat['cat_plot'])){
	 $cat_plot=get_cat_info($cat_id);
	 $cat['cat_plot']=$cat_plot['cat_plot'];
	
	}
	$addtypes=array();
	$addtypeinfo=array();
	if(!empty($cat['cat_addtype'])){
		
	  $addtypes=explode(",",$cat['cat_addtype']);
	  for($i=0;$i<count($addtypes);$i++){
		     $glsql="SELECT * FROM " .$ecs->table('cat_addtype'). " WHERE cat_id=".$cat_id." and type=".$addtypes[$i];
			 $adinfo=$db->getRow($glsql);
		   if($addtypes[$i]==1){
			
			  $sqls="SELECT * FROM " .$ecs->table('cat_images'). " WHERE cat_id=".$cat_id." order by resort asc";
			  $imglist=$db->getAll($sqls);
			   $addtypeinfo[$addtypes[$i]]['imglist']=$imglist;
		   }
		   $addtypeinfo[$addtypes[$i]]['typeinfo']=$adinfo;
		   
		  
	  }
	}
$sql = 'select cat_plotsx,cat_plots,cat_enname,cat_name,cat_endesc,cat_id from ' . $ecs->table('category') . 'order by sort_order' . " limit 0,6";
$category = $GLOBALS['db']->getAll($sql);
$data = [];
foreach($category as $k => $v){
	if ($is_mobile) {
		$sql = "select goods_id,cat_id,xingou_id,goods_name from " . $ecs->table('goods') . " where is_delete=0 and is_on_sale=1 and cat_id = " . $v['cat_id'] . " limit 0,2";
	}else{
		$sql = "select goods_id,cat_id,xingou_id,goods_name from " . $ecs->table('goods') . " where is_delete=0 and is_on_sale=1 and cat_id = " . $v['cat_id'] . " limit 0,3";
	}
	$goods = $db->getAll($sql);
	$sqll = "select count(*) from ". $ecs->table('goods'). " where is_delete=0 and cat_id = ". $v['cat_id'];
	$count = $db->getOne($sqll);
	
	foreach($goods as $kk => $vv){
		$goodsInfo = json_decode(getInfo($vv['xingou_id']),true);
		$goodsoff = $goodsInfo['data']['goodoff'];
		$item_id = $goodsInfo['data']['props']['items'][0]['children'][0]['id'];
		$name = $goodsInfo['data']['details'][$item_id]['name'];
		$goodsInfo['name'] = $name;
		$goods[$kk]['goodsinfo'] = $goodsInfo;
		if ($goodsoff == 1) {

			unset($goods[$kk]);
		}
		


	}
	
	$cat_endesc = !empty($v['cat_desc']) ? $v['cat_desc'] : $v['cat_endesc'];
	$arr = explode("\n" , $cat_endesc);
	$data[$k]['cat_plots'] = $v['cat_plots'];
	$data[$k]['cat_enname'] = $v['cat_enname'];
	$data[$k]['cat_name'] = $v['cat_name'];
	$data[$k]['cat_endesc'] = implode("<br/>" , $arr);
	$data[$k]['cat_id'] = $v['cat_id'];
	$data[$k]['goods'] = $goods;
	$data[$k]['count'] = $count;
	$data[$k]['cat_plotsx'] = $v['cat_plotsx'];

}
//var_dump($data);exit();

//var_dump($data);exit();
	$keywords = "韩菲诗 护肤 化妆品 美妆";
    $description = "Hey face!韩菲诗 我们从大自然中萃取适用于肌肤的有益物质，改善传统护肤品牌的冗长、繁琐与低效，提倡简单的获取和使用，从体验到购买，从使用乃至携带，韩菲诗都能做到简洁高效、事半功倍，成就您的美丽肌肤。更多了解韩菲诗：新浪微博入口，客服热线400-622-5215！";
	$smarty->assign('keywords',        $keywords);
	$smarty->assign('description',     $description);
	$smarty->assign('cinfo',$cinfo);
	$smarty->assign('addtypes',$addtypes);
	$smarty->assign('addtypeinfo',$addtypeinfo);
	$smarty->assign('hasd',  "d");
	$smarty->assign('npage',1);
	$smarty->assign('cat',$cat);
	$smarty->assign('category',$data);
//$smart->assign('category' , $category);
	$smarty->assign('is_mobile' , $is_mobile);
if($is_mobile){
	$smarty->display('mobile/has-pinp.dwt');
}else {
	$smarty->display('category.dwt');
}

 
function get_cat_info($cat_id)
{
    return $GLOBALS['db']->getRow('SELECT cat_name, keywords, cat_desc,cat_endesc,cat_addtype,des_title,des_entitle, style, grade, filter_attr, parent_id,cat_plot,cat_enname,yd_title,yd_entitle,syd_title,syd_entitle FROM ' . $GLOBALS['ecs']->table('category') .
        " WHERE cat_id = ".$cat_id);
}

//function getInfo($id)
//{
//	$url = 'http://api.xingou.net.cn/hanfeishi/info?id=' . $id;
//
//	$ch = curl_init();
//	curl_setopt($ch, CURLOPT_URL, $url);
//	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
//	curl_setopt($ch, CURLOPT_POST, 1); //启用POST提交
//	$file_contents = curl_exec($ch);
//	curl_close($ch);
//	return $file_contents;
//}
//function buildimg($pic){
//
//	$imghost="http://img.xingou.net.cn/";
//
//	if(!empty($pic)){
//		return $imghost.$pic;
//	}
//
//
//}

?>
