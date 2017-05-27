<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
require_once(ROOT_PATH . 'includes/cls_image.php');
require_once(ROOT_PATH . "includes/fckeditor/fckeditor.php");


if ($_REQUEST['act'] == '')
{
  
 


    $smarty->assign('ur_here',       "导出问卷调查信息");
    $smarty->assign('action_link',   array('href' => 'question.php?act=list&pid=1', 'text' =>'问卷调查列表'));
    $smarty->assign('form_act',      'update');
    $smarty->assign('action',        'edit');


    assign_query_info();
    $smarty->display('questionexcel.htm');
}elseif($_REQUEST['act']=="import_excel"){

 $starttime=$_POST['start_time'];
 
 $endtime=$_POST['end_time'];
 $where=" where ad.id > 0";
 
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
		 
		 
		 
$objPHPExcel->getActiveSheet()->setCellValue('A1', '请问您是通过哪种渠道购买的暴龙眼镜?');
$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(45); 
$objPHPExcel->getActiveSheet()->getStyle("A1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("A1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000');   

$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(20); 
$objPHPExcel->getActiveSheet()->setCellValue('B1', '买家ID');

$objPHPExcel->getActiveSheet()->getStyle("B1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("B1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000');  

$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(20); 
$objPHPExcel->getActiveSheet()->setCellValue('C1', '个人姓名');
$objPHPExcel->getActiveSheet()->getStyle("C1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("C1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000'); 

$objPHPExcel->getActiveSheet()->setCellValue('D1', '性  别');
$objPHPExcel->getActiveSheet()->getStyle("D1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("D1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000');  
$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(30); 
$objPHPExcel->getActiveSheet()->setCellValue('E1', '所在城市');
$objPHPExcel->getActiveSheet()->getStyle("E1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("E1")->getFont();  
$objFont->setSize(10);   
$objFont->getColor()->setARGB('000000'); 
$objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(30); 
$objPHPExcel->getActiveSheet()->setCellValue('F1', '联系电话');
$objPHPExcel->getActiveSheet()->getStyle("F1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("F1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000'); 
$objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(20); 
$objPHPExcel->getActiveSheet()->setCellValue('G1', '年  龄');
$objPHPExcel->getActiveSheet()->getStyle("G1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("G1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000');
$objPHPExcel->getActiveSheet()->getColumnDimension('H')->setWidth(50); 
$objPHPExcel->getActiveSheet()->setCellValue('H1', '您是从哪种渠道进入到暴龙官方网上购买平台的');
$objPHPExcel->getActiveSheet()->getStyle("H1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("H1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000');

$objPHPExcel->getActiveSheet()->getColumnDimension('I')->setWidth(50); 
$objPHPExcel->getActiveSheet()->setCellValue('I1', '您对暴龙官方网店的首页设计有何评价');
$objPHPExcel->getActiveSheet()->getStyle("I1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("I1")->getFont();  
$objFont->setSize(10);   
$objFont->getColor()->setARGB('000000');  
$objPHPExcel->getActiveSheet()->getColumnDimension('J')->setWidth(50); 
$objPHPExcel->getActiveSheet()->setCellValue('J1', '在暴龙官方网店挑选眼镜时有遇到困难吗');
$objPHPExcel->getActiveSheet()->getStyle("J1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("J1")->getFont();  
$objFont->setSize(10);   
$objFont->getColor()->setARGB('000000'); 
$objPHPExcel->getActiveSheet()->getColumnDimension('K')->setWidth(40); 
$objPHPExcel->getActiveSheet()->setCellValue('K1', '您选择在网上购买眼镜的原因');
$objPHPExcel->getActiveSheet()->getStyle("K1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("K1")->getFont();  
$objFont->setSize(10);    
$objFont->getColor()->setARGB('000000');

$objPHPExcel->getActiveSheet()->getColumnDimension('L')->setWidth(50); 
$objPHPExcel->getActiveSheet()->setCellValue('L1', '您会在网上购买定制眼镜吗：（例如配镜等）');
$objPHPExcel->getActiveSheet()->getStyle("L1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("L1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000');  


$objPHPExcel->getActiveSheet()->getColumnDimension('M')->setWidth(40); 
$objPHPExcel->getActiveSheet()->setCellValue('M1', '您在挑选眼镜的过程中会找客服咨询吗');
$objPHPExcel->getActiveSheet()->getStyle("M1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("M1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000');  
 
$objPHPExcel->getActiveSheet()->getColumnDimension('N')->setWidth(40); 
$objPHPExcel->getActiveSheet()->setCellValue('N1', '您在购买眼镜时最看重的是');
$objPHPExcel->getActiveSheet()->getStyle("N1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("N1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000');   






$objPHPExcel->getActiveSheet()->getColumnDimension('O')->setWidth(40); 
$objPHPExcel->getActiveSheet()->setCellValue('O1', '如果收到眼镜不喜欢，您会');
$objPHPExcel->getActiveSheet()->getStyle("O1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("O1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000');  


$objPHPExcel->getActiveSheet()->getColumnDimension('P')->setWidth(40); 
$objPHPExcel->getActiveSheet()->setCellValue('P1', '您在网上购物最无法忍受的事情是');
$objPHPExcel->getActiveSheet()->getStyle("P1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("P1")->getFont();  
$objFont->setSize(10);   
$objFont->getColor()->setARGB('000000');    

$objPHPExcel->getActiveSheet()->getColumnDimension('Q')->setWidth(40); 
$objPHPExcel->getActiveSheet()->setCellValue('Q1', '您在挑选产品时首先参考的是');
$objPHPExcel->getActiveSheet()->getStyle("Q1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("Q1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000');   
$objPHPExcel->getActiveSheet()->getColumnDimension('R')->setWidth(40); 
$objPHPExcel->getActiveSheet()->setCellValue('R1', '您对太阳镜功能有哪些要求');
$objPHPExcel->getActiveSheet()->getStyle("R1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("R1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000'); 

$objPHPExcel->getActiveSheet()->getColumnDimension('S')->setWidth(40); 
$objPHPExcel->getActiveSheet()->setCellValue('S1', '您会更换眼镜的原因是');
$objPHPExcel->getActiveSheet()->getStyle("S1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("S1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000'); 

$objPHPExcel->getActiveSheet()->getColumnDimension('T')->setWidth(40); 
$objPHPExcel->getActiveSheet()->setCellValue('T1', '您喜欢的镜框材质是');
$objPHPExcel->getActiveSheet()->getStyle("T1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("T1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000'); 


$objPHPExcel->getActiveSheet()->getColumnDimension('U')->setWidth(50); 
$objPHPExcel->getActiveSheet()->setCellValue('U1', '您认为暴龙最应该提升和改良的地方是');
$objPHPExcel->getActiveSheet()->getStyle("U1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("U1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000'); 

$objPHPExcel->getActiveSheet()->getColumnDimension('V')->setWidth(50); 
$objPHPExcel->getActiveSheet()->setCellValue('V1', '您购买暴龙时，希望得到的保证是');
$objPHPExcel->getActiveSheet()->getStyle("V1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("V1")->getFont();  
$objFont->setSize(10);   
$objFont->getColor()->setARGB('000000'); 



$objPHPExcel->getActiveSheet()->getColumnDimension('W')->setWidth(30); 
$objPHPExcel->getActiveSheet()->setCellValue('W1', '你对暴龙客服服务的满意度是');
$objPHPExcel->getActiveSheet()->getStyle("W1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("W1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000'); 


$objPHPExcel->getActiveSheet()->getColumnDimension('X')->setWidth(30); 
$objPHPExcel->getActiveSheet()->setCellValue('X1', '您对暴龙质量的满意度是');
$objPHPExcel->getActiveSheet()->getStyle("X1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("X1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000'); 


$objPHPExcel->getActiveSheet()->getColumnDimension('Y')->setWidth(30); 
$objPHPExcel->getActiveSheet()->setCellValue('Y1', '您对暴龙性价比的满意度是');
$objPHPExcel->getActiveSheet()->getStyle("Y1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("Y1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000'); 

$objPHPExcel->getActiveSheet()->getColumnDimension('Z')->setWidth(30); 
$objPHPExcel->getActiveSheet()->setCellValue('Z1', '您对暴龙设计的满意度是');
$objPHPExcel->getActiveSheet()->getStyle("Z1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("Z1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000'); 

$objPHPExcel->getActiveSheet()->getColumnDimension('AA')->setWidth(30); 
$objPHPExcel->getActiveSheet()->setCellValue('AA1', '您对暴龙佩戴舒适的满意度是');
$objPHPExcel->getActiveSheet()->getStyle("AA1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("AA1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000'); 

$objPHPExcel->getActiveSheet()->getColumnDimension('AB')->setWidth(30); 
$objPHPExcel->getActiveSheet()->setCellValue('AB1', '您对暴龙售后维修服务的满意度是');
$objPHPExcel->getActiveSheet()->getStyle("AB1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("AB1")->getFont();  
$objFont->setSize(10);   
$objFont->getColor()->setARGB('000000'); 

$objPHPExcel->getActiveSheet()->getColumnDimension('AC')->setWidth(30); 
$objPHPExcel->getActiveSheet()->setCellValue('AC1', '您对暴龙物流服务的满意度是');
$objPHPExcel->getActiveSheet()->getStyle("AC1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("AC1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000'); 

$objPHPExcel->getActiveSheet()->getColumnDimension('AD')->setWidth(100); 
$objPHPExcel->getActiveSheet()->setCellValue('AD1', '除暴龙外，目前您最喜欢的眼镜品牌（包含太阳镜和光学镜）是什么？');
$objPHPExcel->getActiveSheet()->getStyle("AD1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("AD1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000'); 

$objPHPExcel->getActiveSheet()->getColumnDimension('AE')->setWidth(100); 
$objPHPExcel->getActiveSheet()->setCellValue('AE1', '您对我司有什么意见和建议');
$objPHPExcel->getActiveSheet()->getStyle("AE1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("AE1")->getFont();  
$objFont->setSize(10);  
$objFont->getColor()->setARGB('000000'); 

$objPHPExcel->getActiveSheet()->getColumnDimension('AF')->setWidth(30); 
$objPHPExcel->getActiveSheet()->setCellValue('AF1', '添加时间');
$objPHPExcel->getActiveSheet()->getStyle("AF1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$objFont=$objPHPExcel->getActiveSheet()->getStyle("AF1")->getFont();  
$objFont->setSize(10);   
$objFont->getColor()->setARGB('000000'); 
 

 
 
 $sql = 'SELECT *'.  'FROM ' .$GLOBALS['ecs']->table('question'). 'AS ad ' .$where.' order BY ad.id desc';
 

 $product_array=$GLOBALS['db']->getAll($sql);
 
 if(!empty($product_array)){
 
    $t=2;
   
   for($i=0;$i<count($product_array);$i++){


  $objPHPExcel->getActiveSheet()->getRowDimension($t)->setRowHeight(50);
   
  $objPHPExcel->getActiveSheet()->setCellValue('A'.$t, $product_array[$i]['channels']);
  
$objPHPExcel->getActiveSheet()->getStyle('A'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);

  
  
$objPHPExcel->getActiveSheet()->setCellValue('B'.$t, $product_array[$i]['user_id']);
$objPHPExcel->getActiveSheet()->getStyle('B'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);



$objPHPExcel->getActiveSheet()->setCellValue('C'.$t, $product_array[$i]['name']);
$objPHPExcel->getActiveSheet()->getStyle('C'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);




  $sex="男";
 if($product_array[$i]['sex']==0){
 $sex="男";
 
 }else{
 $sex="女";
 }
  $objPHPExcel->getActiveSheet()->setCellValue('D'.$t,$sex);
$objPHPExcel->getActiveSheet()->getStyle('D'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);

  
  
  	$province_name=getRegionName($product_array[$i]['province']);
	$city_name=getRegionName($product_array[$i]['city']);
	
	$cp=$province_name." ".$city_name;
  
  
 $objPHPExcel->getActiveSheet()->setCellValue('E'.$t, $cp);
$objPHPExcel->getActiveSheet()->getStyle('E'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);



$objPHPExcel->getActiveSheet()->setCellValue('F'.$t, $product_array[$i]['telephone']);
$objPHPExcel->getActiveSheet()->getStyle('F'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);



$objPHPExcel->getActiveSheet()->setCellValue('G'.$t, $product_array[$i]['age']);
$objPHPExcel->getActiveSheet()->getStyle('G'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);



$objPHPExcel->getActiveSheet()->setCellValue('H'.$t, $product_array[$i]['enter_web']);
$objPHPExcel->getActiveSheet()->getStyle('H'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);


$objPHPExcel->getActiveSheet()->setCellValue('I'.$t, $product_array[$i]['design']);
$objPHPExcel->getActiveSheet()->getStyle('I'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);



$objPHPExcel->getActiveSheet()->setCellValue('J'.$t, $product_array[$i]['hard']);
$objPHPExcel->getActiveSheet()->getStyle('J'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);



$objPHPExcel->getActiveSheet()->setCellValue('K'.$t, $product_array[$i]['choice']);
$objPHPExcel->getActiveSheet()->getStyle('K'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);



$objPHPExcel->getActiveSheet()->setCellValue('L'.$t, $product_array[$i]['made']);
$objPHPExcel->getActiveSheet()->getStyle('L'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);



$objPHPExcel->getActiveSheet()->setCellValue('M'.$t, $product_array[$i]['advice']);
$objPHPExcel->getActiveSheet()->getStyle('M'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);




$objPHPExcel->getActiveSheet()->setCellValue('N'.$t, $product_array[$i]['important']);
$objPHPExcel->getActiveSheet()->getStyle('N'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);

 

$objPHPExcel->getActiveSheet()->setCellValue('O'.$t, $product_array[$i]['dislike']);
$objPHPExcel->getActiveSheet()->getStyle('O'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);


$objPHPExcel->getActiveSheet()->setCellValue('P'.$t, $product_array[$i]['intolerability']);
$objPHPExcel->getActiveSheet()->getStyle('P'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);



$objPHPExcel->getActiveSheet()->setCellValue('Q'.$t, $product_array[$i]['refer']);
$objPHPExcel->getActiveSheet()->getStyle('Q'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);



$objPHPExcel->getActiveSheet()->setCellValue('R'.$t, $product_array[$i]['funtions']);
$objPHPExcel->getActiveSheet()->getStyle('R'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);



$objPHPExcel->getActiveSheet()->setCellValue('S'.$t, $product_array[$i]['change']);
$objPHPExcel->getActiveSheet()->getStyle('S'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);



$objPHPExcel->getActiveSheet()->setCellValue('T'.$t, $product_array[$i]['material']);
$objPHPExcel->getActiveSheet()->getStyle('T'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);



$objPHPExcel->getActiveSheet()->setCellValue('U'.$t, $product_array[$i]['improve']);
$objPHPExcel->getActiveSheet()->getStyle('U'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);




$objPHPExcel->getActiveSheet()->setCellValue('V'.$t, $product_array[$i]['pledge']);
$objPHPExcel->getActiveSheet()->getStyle('V'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);



$objPHPExcel->getActiveSheet()->setCellValue('W'.$t, $product_array[$i]['service']."分");
$objPHPExcel->getActiveSheet()->getStyle('W'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);




$objPHPExcel->getActiveSheet()->setCellValue('X'.$t, $product_array[$i]['quality']."分");
$objPHPExcel->getActiveSheet()->getStyle('X'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);





$objPHPExcel->getActiveSheet()->setCellValue('Y'.$t, $product_array[$i]['cost']."分");
$objPHPExcel->getActiveSheet()->getStyle('Y'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);




$objPHPExcel->getActiveSheet()->setCellValue('Z'.$t, $product_array[$i]['design_satisfaction']."分");
$objPHPExcel->getActiveSheet()->getStyle('Z'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);



$objPHPExcel->getActiveSheet()->setCellValue('AA'.$t, $product_array[$i]['comfortable']."分");
$objPHPExcel->getActiveSheet()->getStyle('AA'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);



$objPHPExcel->getActiveSheet()->setCellValue('AB'.$t, $product_array[$i]['m_service']."分");
$objPHPExcel->getActiveSheet()->getStyle('AB'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);




$objPHPExcel->getActiveSheet()->setCellValue('AC'.$t, $product_array[$i]['l_service']."分");
$objPHPExcel->getActiveSheet()->getStyle('AC'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);



$objPHPExcel->getActiveSheet()->setCellValue('AD'.$t, $product_array[$i]['content']);
$objPHPExcel->getActiveSheet()->getStyle('AD'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);




$objPHPExcel->getActiveSheet()->setCellValue('AE'.$t, $product_array[$i]['comments']);
$objPHPExcel->getActiveSheet()->getStyle('AE'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);


$addtime=date("Y-m-d H:i:s",$product_array[$i]['addtime']);
$objPHPExcel->getActiveSheet()->setCellValue('AF'.$t, $addtime);
$objPHPExcel->getActiveSheet()->getStyle('AF'.$t)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);

  
     $t++;
	 $g++;
}


$savetime="问卷调查Excel_".date('Y-m-d',time());
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
    $link[1]['href'] = 'questionexcel.php';

    sys_msg($_POST['title'] . "&nbsp;" .'EXCEL导出失败,请重试!',0, $link);

}
}else{

    $link[1]['text'] = "返回";
    $link[1]['href'] = 'questionexcel.php';

    sys_msg($_POST['title'] . "&nbsp;" .'没有查找到该时间点的任何数据！',0, $link);

}


}


  function getRegionName($id){
  
   $sql="SELECT region_name FROM ".$GLOBALS['ecs']->table('region')." WHERE region_id=".$id;
  
  
    $region_name=$GLOBALS['db']->getOne($sql);
	
	
	return $region_name;
  
  }
?>