<?php

/**
* ECSHOP 上海银联在线插件
* ============================================================================
* 版权所有 2005-2008 上海商派网络科技有限公司，并保留所有权利。
* 网站地址: http://www.ecshop.com；
* ----------------------------------------------------------------------------
* 这不是一个自由软件！您只能在不用于商业目的的前提下对程序代码进行修改和
* 使用；不允许对程序代码以任何形式任何目的的再发布。
* ============================================================================
 * jakehu
 * http://www.jakehu.me/
*/

if (!defined('IN_ECS'))
{
die('Hacking attempt');
}


$payment_lang = ROOT_PATH . 'languages/' .$GLOBALS['_CFG']['lang']. '/payment/ChinaPay.php';

include_once(ROOT_PATH ."includes/modules/payment/chinapay/SecssUtil.class.php");
include_once(ROOT_PATH ."includes/modules/payment/chinapay/config.php");




if (file_exists($payment_lang))
{
global $_LANG;

include_once($payment_lang);
}

/* 模块的基本信息 */
if (isset($set_modules) && $set_modules == TRUE)
{
$i = isset($modules) ? count($modules) : 0;

/* 代码 */
$modules[$i]['code'] = basename(__FILE__, '.php');

/* 描述对应的语言项 */
$modules[$i]['desc'] = 'chinapay_desc';

/* 是否支持货到付款 */
$modules[$i]['is_cod'] = '0';

/* 是否支持在线支付 */
$modules[$i]['is_online'] = '1';

/* 支付费用 */
$modules[$i]['pay_fee'] = '0';

/* 作者 */
$modules[$i]['author'] = 'LVFEI';

/* 网址 */
$modules[$i]['website'] = 'thello.com';

/* 版本号 */
$modules[$i]['version'] = '1.0.0';

/* 配置信息 */
$modules[$i]['config'] = array(
array('name' => 'chinapay_account', 'type' => 'text', 'value' => ''),
array('name' => 'chinapay_merkey_file', 'type' => 'text', 'value' => ''),
array('name' => 'chinapay_pubkey_file', 'type' => 'text', 'value' => '')
);

return;
}

/**
* 类
*/
class chinapay
{
/**
* 构造函数
*
* @access public
* @param
*
* @return void
*/
function __construct()
{
$this->chinapay();
}

function chinapay()
{
}

/**
* 生成支付代码
* @param array $order 订单信息
* @param array $payment 支付方式信息
*/
function get_code($order, $payment)
{

	$securityPropFile=ROOT_PATH ."includes/modules/payment/chinapay/security.properties";

$MerId = trim($payment['chinapay_account']);


$sbs=$MerId."3456";
$MerOrderNo =$order['order_sn'].$sbs;

$OrderAmt = floatval($order['order_amount']) * 100;
$TranDate = date('Ymd',time());
$CommodityMsg="商品";
$TranTime=date('his',time());
$TranType = '0002'; 
$Version = '20140728';
$BusiType="0001";
$CurryNo="CNY";
$AccessType=0;
$data_vreturnurl = return_url(basename(__FILE__, '.php'));
$paramArray=array(
"MerId"=>$MerId,
"MerOrderNo"=>$MerOrderNo,
"BusiType"=>$BusiType,
"CommodityMsg"=>$CommodityMsg,
"CurryNo"=> $CurryNo,
"AccessType"=>$AccessType,
"MerBgUrl"=>$data_vreturnurl,
"MerPageUrl"=>$data_vreturnurl,
"TranTime"=>$TranTime);

$secssUtil = new SecssUtil(); 
$ffs=$secssUtil->init($securityPropFile); //初始化安全控件：

echo $secssUtil.getErrCode();
echo $ffs;
$secssUtil->sign($paramArray);

if("00"!==$secssUtil.getErrCode()){
echo"签名过程发生错误，错误信息为-->".$secssUtil.getErrMsg();
return;
}


$def_url = "<br /><form style='text-align:center;' method=post action='".REQ_URL_PAY."' target='_blank'>";
$def_url .= "<input type=HIDDEN name='MerId' value='".$MerId."'/>"; 
$def_url .= "<input type=HIDDEN name='MerOrderNo' value='".$MerOrderNo."'>";
$def_url .= "<input type=HIDDEN name='TranDate' value='".$TransDate."'>";
$def_url .= "<input type=HIDDEN name='TranTime' value='".$TranTime."'>";
$def_url .= "<input type=HIDDEN name='OrderAmt' value='".$OrderAmt."'>";
$def_url .= "<input type=HIDDEN name='TranType' value='".$TranType."'>";
$def_url .= "<input type=HIDDEN name='BusiType' value='".$BusiType."'>";
$def_url .= "<input type=HIDDEN name='CommodityMsg' value='".$CommodityMsg."'>";
$def_url .= "<input type=HIDDEN name='CurryNo' value='".$CurryNo."'>";
$def_url .= "<input type=HIDDEN name='Version' value='".$Version."'>";
$def_url .= "<input type=HIDDEN name='MerBgUrl' value='".$data_vreturnurl."'>";
$def_url .= "<input type=HIDDEN name='MerPageUrl' value='".$data_vreturnurl."'>";
$def_url .= "<input type=HIDDEN name='Signature' value='".$Signature."'>";
$def_url .= "<input type=submit value='" .$GLOBALS['_LANG']['pay_button']. "'>";
$def_url .= "</form>";
return $def_url;
}

/**
* 响应操作
*/
function respond()
{
$securityPropFile=ROOT_PATH ."includes/modules/payment/chinapay/security.properties";
$payment = get_payment(basename(__FILE__, '.php'));

$Version = trim(urldecode($_POST['Version']));
$AccessType = trim(urldecode($_POST['AccessType']));
$MerId =  trim(urldecode($_POST['MerId']));
$MerOrderNo =trim(urldecode($_POST['MerOrderNo']));
$OrderAmt =trim(urldecode($_POST['OrderAmt']));
$TranDate =trim(urldecode($_POST['TranDate']));
$CommodityMsg=trim(urldecode($_POST['CommodityMsg']));
$TranTime=trim(urldecode($_POST['TranTime']));
$TranType =trim(urldecode($_POST['TranType']));
$BusiType=trim(urldecode($_POST['BusiType']));
$CurryNo=trim(urldecode($_POST['CurryNo']));
$OrderStatus=trim(urldecode($_POST['OrderStatus']));

$Signature=trim(urldecode($_POST['Signature']));
 
$data_vreturnurl = return_url(basename(__FILE__, '.php'));
$paramArray=array(
"MerId"=>$MerId,
"MerOrderNo"=>$MerOrderNo,
"BusiType"=>$BusiType,
"CommodityMsg"=>$CommodityMsg,
"CurryNo"=> $CurryNo,
"AccessType"=>$AccessType,
"MerBgUrl"=>$data_vreturnurl,
"MerPageUrl"=>$data_vreturnurl,
"TranTime"=>$TranTime,
"Signature"=>$Signature);


$secssUtil = new SecssUtil();
$secssUtil->init($securityPropFile); //初始化安全控件：
$secssUtil->verify($paramArray);
$sbs=$MerId."3456";
$orderid=str_replace($sbs,'',$MerOrderNo);

if("00"!==$secssUtil.getErrCode()){
echo"验签过程发生错误，错误信息为-->".$secssUtil.getErrMsg();
	return;
}else{
	if ($OrderStatus == '0000')
{
	order_paid($orderid);
	return true;
}else{
	
	return false;
}

	
	
}

 
}


/*
*本地订单号转为银联订单号
*/
function ecshopsn2chinapaysn($order_sn, $vid){
if($order_sn && $vid){
$sub_vid = substr($vid, 10, 5);
$sub_start = substr($order_sn, 2, 4);
$sub_end = substr($order_sn, 6);
$temp = $pay_id;
return $sub_start . $sub_vid . $sub_end;
}
}

/*
*银联订单号转为本地订单号
*/
function chinapaysn2ecshopsn($chinapaysn){
if($chinapaysn){ 
$year = date('Y',time());

return substr($year,0,2) . substr($chinapaysn, 0, 4) . substr($chinapaysn, 9) ;
}
}

/*
*格式化交易金额，以分位单位的12位数字。
*/
function formatamount($amount){
if($amount){
if(!strstr($amount, ".")){
$amount = $amount.".00";
}
$amount = str_replace(".", "", $amount);
$temp = $amount;
for($i=0; $i< 12 - strlen($amount); $i++){
$temp = "0" . $temp;
}
return $temp;
}
}
}
?>