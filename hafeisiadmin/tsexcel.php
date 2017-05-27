<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
require_once(ROOT_PATH . 'includes/cls_image.php');
require_once(ROOT_PATH . "includes/fckeditor/fckeditor.php");


if ($_REQUEST['act'] == '')
{
  



    $smarty->assign('ur_here',       "导出投诉信息");
    $smarty->assign('action_link',   array('href' => 'ts.php?act=list&pid=0', 'text' =>'投诉列表'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');
   

    assign_query_info();
    $smarty->display('tsexcel.htm');
}elseif($_REQUEST['act']=="import_excel"){

 $starttime=$_POST['start_time'];
 
 $endtime=$_POST['end_time'];
 $where=" where ad.zhixun_type = 1";
 
 if(!empty($starttime) && !empty($endtime)){
 
  $st=strtotime($starttime);
  
  $et=strtotime($endtime." 23:59:59");
  
   if($st!=$et){
  
  $where.=" and addtime >=".$st." and addtime<=".$et;
  
  }else{
  

   $where.=" and addtime >=".$st." and addtime<=".$et;
  }
  
 }
 
 if(!empty($starttime) && empty($endtime)){
 
   $st=strtotime($starttime);
  
   $where.=" and  addtime>=".$st;
 
 }
 
  if(empty($starttime) && !empty($endtime)){
   $et=strtotime($endtime." 23:59:59");
    $where.=" and  addtime<=".$et;
 
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

$objPHPExcel->getActiveSheet()->setCellValue('B1', '性别');

$objPHPExcel->getActiveSheet()->getStyle("B1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("B1")->getFont();  
$objFont->setSize(10);   
$objFont->getColor()->setARGB('000000');  


$objPHPExcel->getActiveSheet()->setCellValue('C1', '联系号码');
$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(30); 
$objPHPExcel->getActiveSheet()->getStyle("C1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("C1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000'); 

$objPHPExcel->getActiveSheet()->setCellValue('D1', '留言标题');
$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(60); 
$objPHPExcel->getActiveSheet()->getStyle("D1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("D1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000');  

$objPHPExcel->getActiveSheet()->setCellValue('E1', '留言内容');
$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(100); 
$objPHPExcel->getActiveSheet()->getStyle("E1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("E1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000'); 

$objPHPExcel->getActiveSheet()->setCellValue('F1', '添加时间');
$objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(30); 
$objPHPExcel->getActiveSheet()->getStyle("F1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("F1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000');   

 
 
 $sql = 'SELECT *'.  'FROM ' .$GLOBALS['ecs']->table('zixun'). 'AS ad ' .$where.' order BY ad.id desc';
 

 $product_array=$GLOBALS['db']->getAll($sql);
 
 if(!empty($product_array)){
 
    $t=2;
   
   for($i=0;$i<count($product_array);$i++){


 $objPHPExcel->getActiveSheet()->getRowDimension($t)->setRowHeight(50);
   
  $objPHPExcel->getActiveSheet()->setCellValue('A'.$t, $product_array[$i]['name']);
  
$objPHPExcel->getActiveSheet()->getStyle('A'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);

$sex="男";
 if($product_array[$i]['sex']==0){
 $sex="男";
 
 }else{
 $sex="女";
 }
  $objPHPExcel->getActiveSheet()->setCellValue('B'.$t,$sex);
  

$objPHPExcel->getActiveSheet()->getStyle('B'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
  
  
  
$objPHPExcel->getActiveSheet()->setCellValue('C'.$t, $product_array[$i]['telephone']);

$objPHPExcel->getActiveSheet()->getStyle('C'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);


$objPHPExcel->getActiveSheet()->setCellValue('D'.$t, $product_array[$i]['title']);

$objPHPExcel->getActiveSheet()->getStyle('D'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);


$objPHPExcel->getActiveSheet()->setCellValue('E'.$t,$product_array[$i]['content']);

$objPHPExcel->getActiveSheet()->getStyle('E'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);


$addtime=date("Y-m-d H:i:s",$product_array[$i]['addtime']);
$objPHPExcel->getActiveSheet()->setCellValue('F'.$t, $addtime);
$objPHPExcel->getActiveSheet()->getStyle('F'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
     $t++;
	 $g++;
}


$savetime="投诉Excel_".date('Y-m-d',time());
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
    $link[1]['href'] = 'tsexcel.php';

    sys_msg($_POST['title'] . "&nbsp;" .'EXCEL导出失败,请重试!',0, $link);

}
}else{

    $link[1]['text'] = "返回";
    $link[1]['href'] = 'tsexcel.php';

    sys_msg($_POST['title'] . "&nbsp;" .'没有查找到该时间点的任何数据！',0, $link);

}


}

?>