<?php

/**
 * ECSHOP 支付接口函数库
 * ============================================================================
 * 版权所有 2005-2010 上海商派网络科技有限公司，并保留所有权利。
 * 网站地址: http://www.ecshop.com；
 * ----------------------------------------------------------------------------
 * 这不是一个自由软件！您只能在不用于商业目的的前提下对程序代码进行修改和
 * 使用；不允许对程序代码以任何形式任何目的的再发布。
 * ============================================================================
 * $Author: liuhui $
 * $Id: lib_payment.php 17063 2010-03-25 06:35:46Z liuhui $
 */
define('IN_ECS', true);
if (!defined('IN_ECS'))
{
    die('Hacking attempt');
}

/**
 * 取得返回信息地址
 * @param   string  $code   支付方式代码
 */
function return_url($code)
{
    return $GLOBALS['ecs']->url() . 'respond.php?code=' . $code;
}

/**
 *  取得某支付方式信息
 *  @param  string  $code   支付方式代码
 */
function get_payment($code)
{
    $sql = 'SELECT * FROM ' . $GLOBALS['ecs']->table('payment').
           " WHERE pay_code = '$code' AND enabled = '1'";
    $payment = $GLOBALS['db']->getRow($sql);

    if ($payment)
    {
        $config_list = unserialize($payment['pay_config']);

        foreach ($config_list AS $config)
        {
            $payment[$config['name']] = $config['value'];
        }
    }

    return $payment;
}

/**
 *  通过订单sn取得订单ID
 *  @param  string  $order_sn   订单sn
 *  @param  blob    $voucher    是否为会员充值
 */
function get_order_id_by_sn($order_sn, $voucher = 'false')
{
    if ($voucher == 'true')
    {
        return $GLOBALS['db']->getOne("SELECT log_id FROM " . $GLOBALS['ecs']->table('pay_log') . " WHERE order_id=" . $order_sn . ' AND order_type=1');
    }
    else
    {
        if(is_numeric($order_sn))
        {
            $sql = 'SELECT order_id FROM ' . $GLOBALS['ecs']->table('order_info'). " WHERE order_sn = '$order_sn'";
            $order_id = $GLOBALS['db']->getOne($sql);
        }
        if (!empty($order_id))
        {
            $pay_log_id = $GLOBALS['db']->getOne("SELECT log_id FROM " . $GLOBALS['ecs']->table('pay_log') . " WHERE order_id='" . $order_id . "'");
            return $pay_log_id;
        }
        else
        {
            return "";
        }
    }
}

/**
 *  通过订单ID取得订单商品名称
 *  @param  string  $order_id   订单ID
 */
function get_goods_name_by_id($order_id)
{
    $sql = 'SELECT goods_name FROM ' . $GLOBALS['ecs']->table('order_goods'). " WHERE order_id = '$order_id'";
    $goods_name = $GLOBALS['db']->getCol($sql);
    return implode(',', $goods_name);
}

/**
 * 检查支付的金额是否与订单相符
 *
 * @access  public
 * @param   string   $log_id      支付编号
 * @param   float    $money       支付接口返回的金额
 * @return  true
 */
function check_money($log_id, $money)
{
    $sql = 'SELECT order_amount FROM ' . $GLOBALS['ecs']->table('pay_log') .
              " WHERE log_id = '$log_id'";
    $amount = $GLOBALS['db']->getOne($sql);

    if ($money == $amount)
    {
        return true;
    }
    else
    {
        return false;
    }
}

/**
 * 修改订单的支付状态
 *
 * @access  public
 * @param   string  $log_id     支付编号
 * @param   integer $pay_status 状态
 * @param   string  $note       备注
 * @return  void
 */
function order_paid($log_id, $pay_status = PS_PAYED, $note = '')
{
    /* 取得支付编号 */

    $log_id = $log_id;

    if ($log_id > 0)
    {
		
        /* 取得要修改的支付记录信息 */
        $sql = "SELECT * FROM " . $GLOBALS['ecs']->table('pay_log') .
               " WHERE log_id = '$log_id'";
        $pay_log = $GLOBALS['db']->getRow($sql);

       if ($pay_log && $pay_log['is_paid'] == 0)
        {
            /* 修改此次支付操作的状态为已付款 */
            $sql = 'UPDATE ' . $GLOBALS['ecs']->table('pay_log') .
			        " SET is_paid = '1' WHERE log_id = '$log_id'";
                    //" SET is_paid = '1' WHERE log_id = '$log_id'";
            $GLOBALS['db']->query($sql);
			
            /* 根据记录类型做相应处理 */
            if ($pay_log['order_type'] == PAY_ORDER)
            {

                $sql = 'SELECT order_id, user_id, order_sn, consignee, address, tel, shipping_id, extension_code, extension_id, goods_amount ' .
                        'FROM ' . $GLOBALS['ecs']->table('order_info') .
                       " WHERE order_id = '$pay_log[order_id]'";
				 	   
                $order    = $GLOBALS['db']->getRow($sql);
				
                $order_id = $order['order_id'];
                $order_sn = $order['order_sn'];
				$goods_amount=$order['goods_amount'];
				$sql="select * from ".$GLOBALS['ecs']->table('order_goods')." where order_id=".$order_id;
				$result=$GLOBALS['db']->getAll($sql);
				$extension_code=array();
				$dingzhi_rec_id=array();
				$dingzhi_goods_price_total=array();
				$i=0;
				foreach($result as $k=>$v){
					$extension_code[$k]=false;
					if($v['extension_code']=='dingzhi'){
						$extension_code[$k]=true;
						$dingzhi_rec_id[$i]=$v['rec_id'];
						$dingzhi_goods_price_total[$i]=$v['goods_price']*$v['goods_number'];
						$goods_amount=$goods_amount-$v['goods_price']*$v['goods_number'];
						$i++;
					}
				}
                /* 修改订单状态为已付款 */
				$dizcount=count($dingzhi_rec_id);
				if(count($result)>1 && $dizcount!=count($result) && $dizcount!=0){
			
					$sql = 'UPDATE ' . $GLOBALS['ecs']->table('order_info') .
                            " SET order_status = '" . OS_CONFIRMED . "', " .
                                " confirm_time = '" . gmtime() . "', " .
                                " pay_status = '$pay_status', " .
                                " pay_time = '".gmtime()."', " .
								" goods_amount = '$goods_amount'," .
                                " money_paid = '$goods_amount'," .
								" extension_code = ''," .
                                " order_amount = 0 ".
                       "WHERE order_id = '$order_id'";
					   $a=$GLOBALS['db']->query($sql);
					   
					  $sql = 'UPDATE ' . $GLOBALS['ecs']->table('pay_log') .
			        " SET order_amount = '$goods_amount' WHERE log_id = '$log_id'";
                    //" SET is_paid = '1' WHERE log_id = '$log_id'";
                       $GLOBALS['db']->query($sql);
					   //var_dump($a);
				     //$s=get_order_sn();
				
					 for($i=0;$i<$dizcount;$i++){
				       $new_order_sn[$i]=build_order_no();
				      $new_order_d_sn[$i]='D'.$new_order_sn[$i];
					   $add_time=gmtime();
						$sql="insert into ". $GLOBALS['ecs']->table('order_info') ."(order_sn,order_d_sn, user_id, order_status, shipping_status,".
					   "pay_status, consignee, surname, ming, quhao, haoma, room, country, province, city, district, address,".
					  "zipcode, tel, mobile, email, iphone, best_time, sign_building, postscript,".
					  "shipping_id, shipping_name, pay_id, pay_name, how_oos, how_surplus, pack_name, card_name,".
					  "card_message, inv_payee, inv_content, inv_types, inv_surname, inv_name, inv_quhao, inv_tel,".
					  "inv_email, inv_number, inv_company_name, inv_province, inv_city, inv_district, inv_address, inv_room,".
					  "inv_zipcode, goods_amount, shipping_fee, insure_fee, pay_fee, pack_fee, card_fee, money_paid, surplus, integral,".
					  "integral_money, bonus, order_amount, from_ad, referer, add_time, confirm_time, pay_time, shipping_time, pack_id, card_id, bonus_id,".
					  "invoice_no, extension_code, extension_id, to_buyer, pay_note, agency_id, inv_type, tax, is_separate, parent_id, discount)".
					  "select  '".$new_order_sn[$i]."','".$new_order_d_sn[$i]."',user_id, order_status, shipping_status, pay_status, consignee, surname, ming, quhao, haoma, room, country,".
					  "province, city, district, address, zipcode, tel, mobile, email, iphone, best_time, sign_building, postscript, shipping_id, shipping_name,".
					  "pay_id, pay_name, how_oos, how_surplus, pack_name, card_name, card_message, inv_payee, inv_content, inv_types, inv_surname, inv_name, inv_quhao,". 
					  "inv_tel, inv_email, inv_number, inv_company_name, inv_province, inv_city, inv_district, inv_address, inv_room, inv_zipcode,'".$dingzhi_goods_price_total[$i]."', shipping_fee,".
					  "insure_fee, pay_fee, pack_fee, card_fee,'".$dingzhi_goods_price_total[$i]."', surplus, integral, integral_money, bonus, order_amount, from_ad, referer, '$add_time', confirm_time,".
					  "pay_time, shipping_time, pack_id, card_id, bonus_id, invoice_no, 'dingzhi', extension_id, to_buyer, pay_note, agency_id, inv_type, tax, is_separate,".
					  "parent_id, discount from ". $GLOBALS['ecs']->table('order_info') ." where order_id = '$order_id'";
				
				      $b=$GLOBALS['db']->query($sql);
					  $new_order_id=mysql_insert_id();
					  if($b!==false){
					
					  
					  $sql = 'INSERT into ' . $GLOBALS['ecs']->table('pay_log') .
			        "(log_id,order_id,order_amount,order_type,is_paid) values(NULL,'$new_order_id','".$dingzhi_goods_price_total[$i]."',0,1)";
				      $GLOBALS['db']->query($sql);
					  $sql = 'UPDATE ' . $GLOBALS['ecs']->table('order_goods') .
                            " SET  order_id = '$new_order_id' ".
                       "WHERE rec_id = ".$dingzhi_rec_id[$i];
					   $as=$GLOBALS['db']->query($sql);
					 
					   PostXml($new_order_id);
					
					   }
					  }
		 
				}else{
					if($extension_code[0]){
					if(!strstr($order['order_sn'],'D')){
						$order['order_d_sn']='D'.$order['order_sn'];
					}
                     $sql = 'UPDATE ' . $GLOBALS['ecs']->table('order_info') .
                            " SET order_status = '" . OS_CONFIRMED . "', " .
							 " order_sn = '".$order['order_sn']."', " .
							 	 " order_d_sn = '".$order['order_d_sn']."', " .
							 
                                " confirm_time = '" . gmtime() . "', " .
                                " pay_status = '$pay_status', " .
                                " pay_time = '".gmtime()."', " .
								" extension_code = 'dingzhi'," .
                                " money_paid = order_amount," .
                                " order_amount = 0 ".
                       "WHERE order_id = '$order_id'";
					
					      $states=$GLOBALS['db']->query($sql);
					   if($states!==false){
					     PostXml($order_id);
					   }
					 
					}else{
						
						//echo 'pu';
                   $sql = 'UPDATE ' . $GLOBALS['ecs']->table('order_info') .
                            " SET order_status = '" . OS_CONFIRMED . "', " .
                                " confirm_time = '" . gmtime() . "', " .
                                " pay_status = '$pay_status', " .
                                " pay_time = '".gmtime()."', " .
                                " money_paid = order_amount," .
                                " order_amount = 0 ".
                       "WHERE order_id = '$order_id'";
					   $GLOBALS['db']->query($sql);
					}
					
				}
               // exit;
             
                /* 记录订单操作记录 */
                order_action($order_sn, OS_CONFIRMED, SS_UNSHIPPED, $pay_status, $note, $GLOBALS['_LANG']['buyer']);

                /* 如果需要，发短信 */
                if ($GLOBALS['_CFG']['sms_order_payed'] == '1' && $GLOBALS['_CFG']['sms_shop_mobile'] != '')
                {
                    include_once(ROOT_PATH.'includes/cls_sms.php');
                    $sms = new sms();
                    $sms->send($GLOBALS['_CFG']['sms_shop_mobile'],
                        sprintf($GLOBALS['_LANG']['order_payed_sms'], $order_sn, $order['consignee'], $order['tel']), 0);
                }

                /* 对虚拟商品的支持 */
                $virtual_goods = get_virtual_goods($order_id);
                if (!empty($virtual_goods))
                {
                    $msg = '';
                    if (!virtual_goods_ship($virtual_goods, $msg, $order_sn, true))
                    {
                        $GLOBALS['_LANG']['pay_success'] .= '<div style="color:red;">'.$msg.'</div>'.$GLOBALS['_LANG']['virtual_goods_ship_fail'];
                    }

                    /* 如果订单没有配送方式，自动完成发货操作 */
                    if ($order['shipping_id'] == -1)
                    {
                        /* 将订单标识为已发货状态，并记录发货记录 */
                        $sql = 'UPDATE ' . $GLOBALS['ecs']->table('order_info') .
                               " SET shipping_status = '" . SS_SHIPPED . "', shipping_time = '" . gmtime() . "'" .
                               " WHERE order_id = '$order_id'";
                        $GLOBALS['db']->query($sql);

                         /* 记录订单操作记录 */
                        order_action($order_sn, OS_CONFIRMED, SS_SHIPPED, $pay_status, $note, $GLOBALS['_LANG']['buyer']);
                        $integral = integral_to_give($order);
                        log_account_change($order['user_id'], 0, 0, intval($integral['rank_points']), intval($integral['custom_points']), sprintf($GLOBALS['_LANG']['order_gift_integral'], $order['order_sn']));
                    }
                }

            }
            elseif ($pay_log['order_type'] == PAY_SURPLUS)
            {
                /* 更新会员预付款的到款状态 */
                $sql = 'UPDATE ' . $GLOBALS['ecs']->table('user_account') .
                       " SET paid_time = '" .gmtime(). "', is_paid = 1" .
                       " WHERE id = '$pay_log[order_id]' LIMIT 1";
                $GLOBALS['db']->query($sql);

                /* 取得添加预付款的用户以及金额 */
                $sql = "SELECT user_id, amount FROM " . $GLOBALS['ecs']->table('user_account') .
                        " WHERE id = '$pay_log[order_id]'";
                $arr = $GLOBALS['db']->getRow($sql);

                /* 修改会员帐户金额 */
                $_LANG = array();
                include_once(ROOT_PATH . 'languages/' . $GLOBALS['_CFG']['lang'] . '/user.php');
                log_account_change($arr['user_id'], $arr['amount'], 0, 0, 0, $_LANG['surplus_type_0'], ACT_SAVING);
            }
        }
        else
        {
            /* 取得已发货的虚拟商品信息 */
            $post_virtual_goods = get_virtual_goods($pay_log['order_id'], true);

            /* 有已发货的虚拟商品 */
            if (!empty($post_virtual_goods))
            {
                $msg = '';
                /* 检查两次刷新时间有无超过12小时 */
                $sql = 'SELECT pay_time, order_sn FROM ' . $GLOBALS['ecs']->table('order_info') . " WHERE order_id = '$pay_log[order_id]'";
                $row = $GLOBALS['db']->getRow($sql);
                $intval_time = gmtime() - $row['pay_time'];
                if ($intval_time >= 0 && $intval_time < 3600 * 12)
                {
                    $virtual_card = array();
                    foreach ($post_virtual_goods as $code => $goods_list)
                    {
                        /* 只处理虚拟卡 */
                        if ($code == 'virtual_card')
                        {
                            foreach ($goods_list as $goods)
                            {
                                if ($info = virtual_card_result($row['order_sn'], $goods))
                                {
                                    $virtual_card[] = array('goods_id'=>$goods['goods_id'], 'goods_name'=>$goods['goods_name'], 'info'=>$info);
                                }
                            }

                            $GLOBALS['smarty']->assign('virtual_card',      $virtual_card);
                        }
                    }
                }
                else
                {
                    $msg = '<div>' .  $GLOBALS['_LANG']['please_view_order_detail'] . '</div>';
                }

                $GLOBALS['_LANG']['pay_success'] .= $msg;
            }

           /* 取得未发货虚拟商品 */
           $virtual_goods = get_virtual_goods($pay_log['order_id'], false);
           if (!empty($virtual_goods))
           {
               $GLOBALS['_LANG']['pay_success'] .= '<br />' . $GLOBALS['_LANG']['virtual_goods_ship_fail'];
           }
        }
    }
	

}
 
?>