<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
require_once(ROOT_PATH . 'includes/cls_image.php');
require_once(ROOT_PATH . "includes/fckeditor/fckeditor.php");


if ($_REQUEST['act'] == '')
{
  



    $smarty->assign('ur_here',       "导出保修列表信息");
    $smarty->assign('action_link',   array('href' => 'baoxiu.php?act=list', 'text' =>'保修列表'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
   

    assign_query_info();
    $smarty->display('bxexcel.htm');
}elseif($_REQUEST['act']=="import_excel"){

 $starttime=$_POST['start_time'];
 
 $endtime=$_POST['end_time'];

 $where.=" where id > 0";
 if(!empty($starttime) && !empty($endtime)){
 
  $st=strtotime($starttime);
  
  $et=strtotime($endtime." 23:59:59");
  
   if($st!=$et){
  
  $where.=" and addtime >='".$st."' and addtime<='".$et."'";
  
  }else{
  

   $where.=" and addtime >='".$st."' and addtime<='".$et."'";
  }
  
 }
 
 if(!empty($starttime) && empty($endtime)){
 
   $st=strtotime($starttime);
  
   $where.=" and  addtime>='".$st."'";
 
 }
 
  if(empty($starttime) && !empty($endtime)){
   $et=strtotime($endtime." 23:59:59");
    $where.=" and  addtime<='".$et."'";
 
 }
 
   if(empty($starttime) && empty($endtime)){

    $where.="";
 
    }
 
 
 require_once 'PHPExcel/PHPExcel.php';

         $objPHPExcel = new PHPExcel();

         $objAtrr=$objPHPExcel->getProperties();
		 
		 $objAtrr->setCreator("1");   
		     
         $objAtrr->setLastModifiedBy("2");     
		   
         $objAtrr->setTitle("3");  
		      
         $objAtrr->setSubject("4");       
		 
         $objAtrr->setDescription("5");    
		    
         $objAtrr->setKeywords("6");   
		     
         $objAtrr->setCategory("7"); 
		 
		 
		 
$objPHPExcel->getActiveSheet()->setCellValue('A1', '姓名');
$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(20); 
$objPHPExcel->getActiveSheet()->getStyle("A1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("A1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000');   

$objPHPExcel->getActiveSheet()->setCellValue('B1', '手机号码');
$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(30); 
$objPHPExcel->getActiveSheet()->getStyle("B1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("B1")->getFont();  
$objFont->setSize(10);   
$objFont->getColor()->setARGB('000000');  


$objPHPExcel->getActiveSheet()->setCellValue('C1', '座机号码');
$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(30); 
$objPHPExcel->getActiveSheet()->getStyle("C1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("C1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000'); 

$objPHPExcel->getActiveSheet()->setCellValue('D1', '联系地址');
$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(60); 
$objPHPExcel->getActiveSheet()->getStyle("D1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("D1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000');  

$objPHPExcel->getActiveSheet()->setCellValue('E1', '邮政编码');
$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(10); 
$objPHPExcel->getActiveSheet()->getStyle("E1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("E1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000'); 

$objPHPExcel->getActiveSheet()->setCellValue('F1', '产品类型');
$objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(30); 
$objPHPExcel->getActiveSheet()->getStyle("F1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("F1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000');   


$objPHPExcel->getActiveSheet()->setCellValue('G1', '联系服务时间');
$objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(30); 
$objPHPExcel->getActiveSheet()->getStyle("G1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("G1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000');   

$objPHPExcel->getActiveSheet()->setCellValue('H1', '购买时间');
$objPHPExcel->getActiveSheet()->getColumnDimension('H')->setWidth(20); 
$objPHPExcel->getActiveSheet()->getStyle("H1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("H1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000');   


$objPHPExcel->getActiveSheet()->setCellValue('I1', '保修状态');
$objPHPExcel->getActiveSheet()->getColumnDimension('I')->setWidth(10); 
$objPHPExcel->getActiveSheet()->getStyle("I1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("I1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000');  


$objPHPExcel->getActiveSheet()->setCellValue('J1', '眼镜损坏描述');
$objPHPExcel->getActiveSheet()->getColumnDimension('J')->setWidth(80); 
$objPHPExcel->getActiveSheet()->getStyle("J1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("J1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000');  

$objPHPExcel->getActiveSheet()->setCellValue('K1', '添加时间');
$objPHPExcel->getActiveSheet()->getColumnDimension('K')->setWidth(30); 
$objPHPExcel->getActiveSheet()->getStyle("K1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("K1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000');   

 
 
 $sql = 'SELECT * '.  'FROM ' .$GLOBALS['ecs']->table('baoxiu') .$where.' order BY id desc';
 
 

 $product_array=$GLOBALS['db']->getAll($sql);
 
 if(!empty($product_array)){
 
    $t=2;
   
   for($i=0;$i<count($product_array);$i++){


 $objPHPExcel->getActiveSheet()->getRowDimension($t)->setRowHeight(50);
   
  $objPHPExcel->getActiveSheet()->setCellValue('A'.$t, $product_array[$i]['name']);
  
$objPHPExcel->getActiveSheet()->getStyle('A'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);


  $objPHPExcel->getActiveSheet()->setCellValue('B'.$t,$product_array[$i]['telephone']);
  

$objPHPExcel->getActiveSheet()->getStyle('B'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
  
  
  $phones=($product_array[$i]['phones']=="-")?"暂无数据!":$product_array[$i]['phones'];
$objPHPExcel->getActiveSheet()->setCellValue('C'.$t, $phones);

$objPHPExcel->getActiveSheet()->getStyle('C'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);


    $province_name=getRegionName($product_array[$i]['province']);
   	$districts_name=getRegionName($product_array[$i]['districts']);
	$city_name=getRegionName($product_array[$i]['city']);

$objPHPExcel->getActiveSheet()->setCellValue('D'.$t, $province_name.$city_name.$districts_name.$product_array[$i]['address']);

$objPHPExcel->getActiveSheet()->getStyle('D'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);

  $post=($product_array[$i]['post']=="")?"暂无数据!":$product_array[$i]['post'];
$objPHPExcel->getActiveSheet()->setCellValue('E'.$t,$post);

$objPHPExcel->getActiveSheet()->getStyle('E'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);




	$goods_name1=$db->getOne("SELECT cat_name FROM " .$ecs->table('category'). " WHERE cat_id='".$product_array[$i]['catergory']."'");
	
	$goods_name2=$db->getOne("SELECT cat_name FROM " .$ecs->table('category'). " WHERE cat_id='".$product_array[$i]['catergory_c']."'");

		$goods_name3=$db->getOne("SELECT cat_name FROM " .$ecs->table('category'). " WHERE cat_id='".$product_array[$i]['catergory_s']."'");

$objPHPExcel->getActiveSheet()->setCellValue('F'.$t, $goods_name1.$goods_name2.$goods_name3);
$objPHPExcel->getActiveSheet()->getStyle('F'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
    	$server_time=date("Y-m-d H:i:s",$product_array[$i]['server_time']);

$objPHPExcel->getActiveSheet()->setCellValue('G'.$t, $server_time);
$objPHPExcel->getActiveSheet()->getStyle('G'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$buy_time=date("Y-m-d",$product_array[$i]['buy_time']);
$objPHPExcel->getActiveSheet()->setCellValue('H'.$t, $buy_time);
$objPHPExcel->getActiveSheet()->getStyle('H'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objPHPExcel->getActiveSheet()->setCellValue('I'.$t, $product_array[$i]['paoxiutime']);
$objPHPExcel->getActiveSheet()->getStyle('I'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objPHPExcel->getActiveSheet()->setCellValue('J'.$t, $product_array[$i]['bao_txt']);
$objPHPExcel->getActiveSheet()->getStyle('J'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);

$addtime=date("Y-m-d H:i:s",$product_array[$i]['addtime']);
$objPHPExcel->getActiveSheet()->setCellValue('K'.$t, $addtime);
$objPHPExcel->getActiveSheet()->getStyle('K'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$t++;
	 $g++;
}


$savetime="在线保修Excel_".date('Y-m-d',time());
$savename=iconv("UTF-8", "GBK", $savetime);
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$state=$objWriter->save("../Xml/".$savename.".xlsx");

if($state!==false){

       $file = fopen("../Xml/".$savename.".xlsx","r");
         header('Content-Encoding: none');
         header("Content-type: application/octet-stream");
         header("Accept-Ranges: bytes");
         header("Accept-Length: ".filesize("../Xml/".$savename.".xlsx"));
         header( 'Content-Transfer-Encoding: binary' );
         header("Content-Disposition: attachment; filename=" .$savename.".xlsx"); //以真实文件名提供给浏览器下载 
         header('Pragma: no-cache');
         header('Expires: 0');
         echo fread($file,filesize("../Xml/".$savename.".xlsx"));
         fclose($file);

 //return  "../Xml/".$savename.".xlsx";

}else{

    $link[1]['text'] = "返回";
    $link[1]['href'] = 'bxexcel.php';

    sys_msg($_POST['title'] . "&nbsp;" .'EXCEL导出失败,请重试!',0, $link);

}
}else{

    $link[1]['text'] = "返回";
    $link[1]['href'] = 'tsexcel.php';

    sys_msg($_POST['title'] . "&nbsp;" .'没有查找到该时间点的任何数据！',0, $link);

}


}


  function getRegionName($id){
  
   $sql="SELECT region_name FROM ".$GLOBALS['ecs']->table('region')." WHERE region_id=".$id;
  
  
    $region_name=$GLOBALS['db']->getOne($sql);
	
	
	return $region_name;
  
  }
?>