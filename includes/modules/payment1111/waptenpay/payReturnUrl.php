<?php
error_reporting(0);//禁用错误报告
//---------------------------------------------------------
//财付通即时到帐支付页面回调示例，商户按照此文档进行开发即可
//---------------------------------------------------------
define('IN_ECS', true);
require_once('../../../init.php');

require_once('../../../lib_payment.php');
require_once("./classes/ResponseHandler.class.php");
require_once("./classes/WapResponseHandler.class.php");

//echo 11;
//var_dump($smarty);
$payment=get_payment('waptenpay');
var_dump($payment);

/* 密钥 */
//$key = "8934e7d15453e97507ef794cf7b0519d";

$key=$payment['waptenpay_key'];
//echo $key;
//exit;
/* 创建支付应答对象 */
$resHandler = new WapResponseHandler();
$resHandler->setKey($key);
//var_dump($_POST);
//var_dump($_GET);
//exit;
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
		
		$string = "<br/>" . "支付成功" . "<br/>";
	
	} else {
		//当做不成功处理
		$string =  "<br/>" . "支付失败" . "<br/>";
	}
	
} else {
	$string =  "<br/>" . "认证签名失败" . "<br/>";
}

?>
<?xml version="1.0" encoding="utf-8"?>
 <!DOCTYPE wml PUBLIC "-//WAPFORUM//DTD WML 1.1//EN"
 "http://www.wapforum.org/DTD/wml_1.1.xml">
    <wml>
     <head>
       <meta http-equiv="Cache-Control" content="max-age=0" forua="true"/>
       <meta http-equiv="Cache-control" content="must-revalidate" />
       <meta http-equiv="Cache-control" content="private" />
       <meta http-equiv="Cache-control" content="no-cache" />
     <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>
     <card id="wappay" title="财付通wap手机支付示例——前台结果">
     <p>
     	<?php echo $string; ?>
     </p>
	</card>
	</wml>     