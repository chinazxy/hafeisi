<?php

/**
 * ECSHOP wap财付通插件
 * ============================================================================
 * 版权所有 2005-2011 上海商派网络科技有限公司，并保留所有权利。
 * 网站地址: http://www.ecshop.com；
 * ----------------------------------------------------------------------------
 * 这不是一个自由软件！您只能在不用于商业目的的前提下对程序代码进行修改和
 * 使用；不允许对程序代码以任何形式任何目的的再发布。
 * ============================================================================
 * $Author: liubo $
 * $Id: waptenpay.php 17217 2011-01-19 06:29:08Z liubo $
 */

if (!defined('IN_ECS'))
{
    die('Hacking attempt');
}
$payment_lang = ROOT_PATH . 'languages/' .$GLOBALS['_CFG']['lang']. '/payment/waptenpay.php';
if (file_exists($payment_lang))
{
    global $_LANG;

    include_once($payment_lang);
}
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
    $modules[$i]['website'] = 'https://www.tenpay.com';

    /* 版本号 */
    $modules[$i]['version'] = '2.0.0';

    /* 配置信息 */
    $modules[$i]['config']  = array(
        array('name' => 'waptenpay_account',           'type' => 'text',   'value' => ''),
        array('name' => 'waptenpay_key',               'type' => 'text',   'value' => ''),
        array('name' => 'waptenpay_partner',           'type' => 'text',   'value' => ''),
//        array('name' => 'alipay_real_method',       'type' => 'select', 'value' => '0'),
//        array('name' => 'alipay_virtual_method',    'type' => 'select', 'value' => '0'),
//        array('name' => 'is_instant',               'type' => 'select', 'value' => '0')
        array('name' => 'waptenpay_pay_method',        'type' => 'select', 'value' => '')
    );

    return;
}
class waptenpay{
   
	 function get_code($order, $payment)
     { 
	    $return_url=return_url(basename(__FILE__, '.php'));
       //echo $return_url;
	  //var_dump($payment);
	  //exit;
	      include_once('includes/modules/payment/waptenpay/payRequest.php');
		  return $button;
	 }
}

?>