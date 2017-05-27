<?php

//---------------------------------------------------------
//财付通即时到帐支付后台回调示例，商户按照此文档进行开发即可
//---------------------------------------------------------
define('IN_ECS', true);
require_once('../../../init.php');
require_once('../../../lib_payment.php');
require_once("classes/ResponseHandler.class.php");
require_once("classes/WapNotifyResponseHandler.class.php");
$payment=get_payment('waptenpay');//获取wap财付通配置
/* 商户号 */
//$partner = "1900000109";
//var_dump($payment);
$partner=$payment['waptenpay_account'];

/* 密钥 */
//$key = "8934e7d15453e97507ef794cf7b0519d";
$key=$payment['waptenpay_key'];

//var_dump($_POST);
//var_dump($_GET);
$arr=$_GET;
//exit;
/* 创建支付应答对象 */
$resHandler = new WapNotifyResponseHandler();
$resHandler->setKey($key);

//判断签名
if($resHandler->isTenpaySign()) {
	
	//商户订单号
	$bargainor_id = $resHandler->getParameter("bargainor_id");
	
	//财付通交易单号
	$transaction_id = $resHandler->getParameter("transaction_id");
	//金额,以分为单位
	$total_fee = $resHandler->getParameter("total_fee");
	
	//支付结果
	$pay_result = $resHandler->getParameter("pay_result");

	if( "0" == $pay_result  ) {
		
		$sql="update ".$GLOBALS['ecs']->table('order_info')."set order_status=1,pay_status=2 "."where order_sn=".$arr['sp_billno'];
		$result=$GLOBALS['db']->query($sql);
		if($result){
		   echo 'success';
		}
	}
	else
	{
		echo 'fail';
	} 
	
} else {
	//回调签名错误
	echo "fail";
}


?>