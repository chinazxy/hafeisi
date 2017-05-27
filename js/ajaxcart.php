<?php

/**
 * ECSHOP 购物流程
 * ============================================================================
 * 版权所有 2005-2010 上海商派网络科技有限公司，并保留所有权利。
 * 网站地址: http://www.ecshop.com；
 * ----------------------------------------------------------------------------
 * 这不是一个自由软件！您只能在不用于商业目的的前提下对程序代码进行修改和
 * 使用；不允许对程序代码以任何形式任何目的的再发布。
 * ============================================================================
 * $Author: liuhui $
 * $Id: flow.php 17124 2010-04-23 02:32:13Z liuhui $
 */

define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');
require(ROOT_PATH . 'includes/lib_order.php');

/* 载入语言文件 */
require_once(ROOT_PATH . 'languages/' .$_CFG['lang']. '/user.php');
require_once(ROOT_PATH . 'languages/' .$_CFG['lang']. '/shopping_flow.php');


if($_REQUEST['step']=="add_number"){

  $recid=isset($_POST['recid'])?intval($_POST['recid']):0;
  
  $number=isset($_POST['number'])?intval($_POST['number']):0;
  

  
  $rs=array();
  
  if($recid>0 && $number>0){
  
 
	  $goodsinfo=$db->getRow("SELECT goods_price, goods_number FROM " .$ecs->table('cart'). " WHERE rec_id = '$recid' AND session_id = '" . SESS_ID . "' ");
	  
	  $spec=$goodsinfo['goods_attr_id'];
	  $specarray=explode(",",$spec);
   
	  $product_info = get_products_info($goodsinfo['goods_id'], $specarray);
	  print_r($product_info);
	  $gnums=$product_info['product_number'];
	  echo $gnums."sssssss";
	 if($number<=$gnums){
	      $state = $db->query("UPDATE " .$ecs->table('cart'). " SET goods_number=$number WHERE rec_id = '$recid' AND session_id = '" . SESS_ID . "' ");
		   
	  $goodsinfo=$db->getRow("SELECT goods_price, goods_number FROM " .$ecs->table('cart'). " WHERE rec_id = '$recid' AND session_id = '" . SESS_ID . "' ");
	  $goodsprice=price_format($goodsinfo['goods_price']* $goodsinfo['goods_number'],false);
	  
	  $goodsnum=0;
	  $trueprice=0;
	  $discountprice=0;
	  $jsmoney=0;
	  $paymoney=0;
	  $totalprice=0;
	  if($state){
	  
	   $goodslist=$db->getAll("SELECT  * FROM ".$ecs->table('cart')." WHERE session_id = '" . SESS_ID . "'");
	   
	   $shop_price=0;
	   for($i=0;$i<count($goodslist);$i++){
	   if($goodslist[$i]['extension_code']=="package_buy"){
	   
	    $package_goods_list = get_package_goods($goodslist[$i]['goods_id']);
			
		
			
			for($pa=0;$pa<count($package_goods_list);$pa++){
			  
			    $shop_prices+=$package_goods_list[$pa]['shop_price'];
				
			}
			
	     $totalprice=$totalprice+$shop_prices*$goodslist[$i]['goods_number'];
	   
	   }else{
	    $goodsnum=$goodsnum+$goodslist[$i]['goods_number'];
	 
	    $shop_price=$db->getOne("SELECT shop_price FROM ". $ecs->table('goods') ." WHERE goods_id= ".$goodslist[$i]['goods_id']);
		  if($goodslist[$i]['goods_attr_id']>0){
			 $attrid=explode(",",$goodslist[$i]['goods_attr_id']);
		  $attrpice=0;
	
		   for($t=0;$t<count($attrid);$t++){
			 $attrpice+=$GLOBALS['db']->getOne("SELECT attr_price FROM ". $GLOBALS['ecs']->table('goods_attr') ."WHERE goods_attr_id=".$attrid[$t]);
			}
		 $shop_price=$shop_price+$attrpice;
	
	      }
	 
		    $totalprice=$totalprice+$shop_price*$goodslist[$i]['goods_number'];
		}
	
		$subtotal     = $goodslist[$i]['goods_price'] * $goodslist[$i]['goods_number'];
		$discountprice=$discountprice+$subtotal;
		$goods_count=$goods_count+$row['goods_number'];
	   }
	   $jsmoney=price_format($totalprice-$discountprice,false);
	
	   $paymoney=price_format($discountprice,false);
	 
	    $rs['jsmoney']=$jsmoney;
		 $rs['paymoney']=$paymoney;
		$rs['totalprice']=price_format($totalprice,false);
	  $rs['goods_number']=$goodsnum;
	   	 $rs['price']=$goodsprice;
     $rs['msg']="sucess";
	 

	  
	  }else{
	   
     $rs['msg']="error";
	  
	  }
	  }else{
	  
	   $rs['msg']="kc_error";
	  }
  
  }else{
  
    $rs['msg']="error";
  
  }
  echo json_encode($rs);

}elseif($_REQUEST['step']=="delete_rec_id"){

  $idarray=$_POST['idarray'];
  
  $rs=array();
  
  if(count($idarray)>0){
  
    for($i=0;$i<count($idarray);$i++){
	
	 $state = $db->query("DELETE FROM  " .$ecs->table('cart'). " WHERE rec_id = '$idarray[$i]' AND session_id = '" . SESS_ID . "' ");
	}
  
   
     $rs['msg']="sucess";
  }else{
  
  $rs['msg']="length_error";
  }

 echo json_encode($rs);

  }

?>