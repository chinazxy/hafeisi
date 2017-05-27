<?php


require_once (ROOT_PATH."includes/modules/classes/RequestHandler.class.php");
require (ROOT_PATH."includes/modules/classes/client/ClientResponseHandler.class.php");
require (ROOT_PATH."includes/modules/classes/client/TenpayHttpClient.class.php");



if (!defined('IN_ECS'))
{
    die('Hacking attempt');
}
require_once(ROOT_PATH . 'includes/cls_transport.php');
$payment_lang = ROOT_PATH . 'languages/' .$GLOBALS['_CFG']['lang']. '/payment/waptenpay.php';

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
    $modules[$i]['code']    = basename(__FILE__, '.php');

    /* 描述对应的语言项 */
    $modules[$i]['desc']    = 'waptenpay_desc';

    /* 是否支持货到付款 */
    $modules[$i]['is_cod']  = '0';

    /* 是否支持在线支付 */
    $modules[$i]['is_online']  = '1';

    /* 作者 */
    $modules[$i]['author']  = 'THNID  TEAM';

    /* 网址 */
    $modules[$i]['website'] = 'http://www.tenpay.com';

    /* 版本号 */
    $modules[$i]['version'] = '2.0';

    /* 配置信息 */
    $modules[$i]['config']  = array(
        array('name' => 'waptenpay_account',   'type' => 'text', 'value' => ''),
        array('name' => 'waptenpay_key',       'type' => 'text', 'value' => ''),
        array('name' => 'waptenpay_type',       'type' => 'select', 'value'=>'1')
    );

    return;
}

/**
 * 类
 */
class wappayten
{
    /**
     * 构造函数
     *
     * @access  public
     * @param
     *
     * @return void
     */
	var $t          = null;
    function __construct()
    {
        $this->wappayten();
    }
    function wappayten()
    {
		$this->t = new transport(-1, -1, -1, false);
    }



    /**
     * 生成支付代码
     * @param   array    $order       订单信息
     * @param   array    $payment     支付方式信息
     */
    function get_code($order, $payment)
    {
        if (!defined('EC_CHARSET'))
        {
            $charset = 'GBK';
        }
        else
        {
            $charset = EC_CHARSET;
        }
		
		$reqHandler = new RequestHandler();
        $reqHandler->init();
        $reqHandler->setKey($payment['waptenpay_key']);
		$reqHandler->setGateUrl("https://www.tenpay.com/app/mpay/wappay_init.cgi");
		$httpClient = new TenpayHttpClient();
        $resHandler = new ClientResponseHandler();
        $partner      =  $payment['waptenpay_account'];
        $out_trade_no = $order['order_sn'];
        
        $total_fee = floatval($order['order_amount']) * 100;
        /* 订单描述，用订单号替代 */
        if (!empty($order['order_id']))
        {
            $body = $order['order_sn'];
            $attach = '';
        }
        else
        {
            $body = $GLOBALS['_LANG']['account_voucher'];
            $attach = 'voucher';
        }		
		 $reqHandler->setParameter("total_fee", "1");
		 $reqHandler->setParameter("spbill_create_ip",  $_SERVER['REMOTE_ADDR']);
		 $reqHandler->setParameter("ver", "2.0");
		 $reqHandler->setParameter("bank_type","0");
	    $reqHandler->setParameter("desc", $body);
		$reqHandler->setParameter("bargainor_id", $partner);
		$reqHandler->setParameter("sp_billno", $out_trade_no);
		$reqHandler->setParameter("fee_type", 1);
		$reqHandler->setParameter("notify_url", return_url(basename(__FILE__, '.php')));
	    $reqHandler->setParameter("callback_url",return_url(basename(__FILE__, '.php')));
	     $reqHandler->setParameter("attach",  $attach);
	
		 
		 
$httpClient->setReqContent($reqHandler->getRequestURL());

if($httpClient->call()) {

	$resHandler->setContent($httpClient->getResContent());
	$token_id = $resHandler->getParameter('token_id');
	$reqHandler->setParameter("token_id", $token_id);
	$reqHandler->setGateUrl("https://wap.tenpay.com/cgi-bin/wappayv2.0/wappay_gate.cgi");
	$reqUrl = $reqHandler->getRequestURL(); 

}

		$button = '<a href="'.$reqUrl.'"> <div class="jiesuan pay_btn">WAP财付通支付</div><a>'; 
        
        return $button;
    }


     /**
     * 响应操作
     */
    function respond()
    {
require (ROOT_PATH."includes/modules/classes/ResponseHandler.class.php");
require (ROOT_PATH."includes/modules/classes/WapNotifyResponseHandler.class.php");
	
$partner      =  $payment['waptenpay_account'];
$key = $payment['waptenpay_key'];


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
	$attach    = $resHandler->getParameter("attach");
	    if ($attach == 'voucher')
        {
            $log_id = get_order_id_by_sn($bargainor_id, "true");
        }
        else
        {
            $log_id = get_order_id_by_sn($bargainor_id);
        }
	//支付结果
	$pay_result = $resHandler->getParameter("pay_result");

	if( "0" == $pay_result  ) {
		 echo 'success';
		   order_paid($log_id);
		     return true;
	}
	else
	{
		echo 'fail';
		  return false;
	} 
	
} else {
	//回调签名错误
	 return false;
}
	
	


    }

}

?>