<?php



if (!defined('IN_ECS'))
{
    die('Hacking attempt');
}

$payment_lang = ROOT_PATH . 'languages/' .$GLOBALS['_CFG']['lang']. '/payment/bipay.php';

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
    $modules[$i]['desc']    = 'pipay_desc';

    /* 是否支持货到付款 */
    $modules[$i]['is_cod']  = '0';

    /* 是否支持在线支付 */
    $modules[$i]['is_online']  = '1';

    /* 作者 */
    $modules[$i]['author']  = 'LIVFEIS';

    /* 网址 */
    $modules[$i]['website'] = 'http://pay.biipay.com';

    /* 版本号 */
    $modules[$i]['version'] = '1.0.0';

    /* 配置信息 */
    $modules[$i]['config'] = array(
        array('name' => 'bipay_account', 'type' => 'text', 'value' => ''),
        array('name' => 'bibay_currency', 'type' => 'text', 'value' => '')
    );

    return;
}



/**
 * 类
 */
class bipay
{
    /**
     * 构造函数
     *
     * @access  public
     * @param
     *
     * @return void
     */  
	 function __construct()
    {
        $this->bipal();
    }
    function bipal()
    {
    }

 

    /**
     * 生成支付代码
     * @param   array   $order  订单信息
     * @param   array   $payment    支付方式信息
     */
    function get_code($order, $payment)
    {
	     $p0_Cmd="Buy";
		 $p1_MerId=$payment['bipay_account'];
        $p2_Order      = $order['order_sn'];
		if(empty($p2_Order)){
		
		$p2_Order=$this->makeOrder();
		}
        $p3_Amt        = $order['order_amount'];
       
        $data_pay_account   = $payment['bipay_account'];
        $currency_code      = $payment['bibay_currency'];
        $cancel_return      = $GLOBALS['ecs']->url();
       
		$p4_Cur = "CNY";
		$p5_Pid="";
		$p6_Pcat ="";
         $p7_Pdesc=$p2_Order; 
		 $p8_Url    = return_url(basename(__FILE__, '.php'));
		$pr_NeedResponse = 1;
		$pd_FrpId="";
		$pa_MP="";
		$key= $payment['bibay_currency'];
		$hmac =$this->getReqHmacString($p0_Cmd,$p2_Order,$p3_Amt,$p4_Cur,$p5_Pid,$p6_Pcat,$p7_Pdesc,$p8_Url,$pa_MP,$pd_FrpId,$pr_NeedResponse,$p1_MerId,$key);
        $def_url  = '<br /><form style="text-align:center;" action="http://pay.biipay.com/api/" method="post" target="_blank">' .   // 不能省略
            "<input type='hidden' name='p0_Cmd' value='".$p0_Cmd."'>" .
		    "<input type='hidden' name='p1_MerId' value='".$p1_MerId."'>".
			"<input type='hidden' name='p2_Order' value='".$p2_Order."'>".
			"<input type='hidden' name='p3_Amt' value='".$p3_Amt."'>".
			"<input type='hidden' name='p4_Cur' value='".$p4_Cur."'>".
			"<input type='hidden' name='p5_Pid' value=''>".
			"<input type='hidden' name='p6_Pcat' value=''>".
			"<input type='hidden' name='p7_Pdesc' value='".$p7_Pdesc."'>".
			"<input type='hidden' name='p8_Url' value='".$p8_Url."'>".
			"<input type='hidden' name='pa_MP' value=''>".
			"<input type='hidden' name='pd_FrpId' value='".$pd_FrpId."'>".
			"<input type='hidden' name='pr_NeedResponse' value='".$pr_NeedResponse."'>".
			"<input type='hidden' name='hmac' value='".$hmac."'>".
			
			/*'<table width="760" border="0" align="center" cellpadding="0" cellspacing="0" style="border:solid 1px #107929">
<tr>
	<td>
	<table width="100%" border="0" align="center" cellpadding="5" cellspacing="1">

	<tr>
		<td align="left">&nbsp;&nbsp;选择银行</td>
		<td align="left">
		<table width="600" border="0"  cellpadding="2" cellspacing="0" style="left:0;" id="banklist" >
		<tr>
			<td valign="middle" height="40" width="150">
			<div class="banklogo">
			<input name="pd_FrpId" type="radio" value="ICBC-NET-B2C" checked>
			<img src="images/bank/gongshang.gif" title="工商银行" alt="工商银行" width="93" height="20" border="0" style="border:1px solid #CCCCCC;" />
			</div>
			</td>
			<td valign="middle" height="40" width="150">
			<div class="banklogo">
			<input name="pd_FrpId" type="radio" value="ABC-NET-B2C">
			<img src="images/bank/nongye.gif" title="中国农业银行"  alt="中国农业银行" width="93" height="20" border="0" style="border:1px solid #CCCCCC;" />
			</div>
			</td>
			<td valign="middle" height="40" width="150">
			<div class="banklogo">
			<input name="pd_FrpId" type="radio" value="CCB-NET-B2C">
			<img src="images/bank/jianshe.gif" title="建设银行" alt="建设银行" width="93" height="20" border="0" style="border:1px solid #CCCCCC;" />
			</div>
			</td>
			<td>
			<div class="banklogo">
			<input name="pd_FrpId" type="radio" value="CMBCHINA-NET-B2C"  />
			<img src="images/bank/zhaohang.gif" title="招商银行" alt="招商银行" width="93" height="20" border="0" style="border:1px solid #CCCCCC;" />
			</div>
			</td>
		</tr>
		<tr>								     
			<td>
			<div class="banklogo">
			<input name="pd_FrpId" type="radio" value="BOC-NET-B2C">
			<img src="images/bank/zhongguo.gif" title="中国银行" alt="中国银行" width="93" height="20" border="0" style="border:1px solid #CCCCCC;" />
			</div>
			</td>
			<td>
			<div class="banklogo">
			<input name="pd_FrpId" type="radio" value="BOCO-NET-B2C">
			<img src="images/bank/jiaotong.gif" title="交通银行" alt="交通银行" width="93" height="20" border="0" style="border:1px solid #CCCCCC;" />
			</div>
			</td>
			<td>
			<div class="banklogo">
			<input name="pd_FrpId" type="radio" value="CEB-NET-B2C">
			<img src="images/bank/guangda.gif" title="光大银行" alt="光大银行" width="93" height="20" border="0" style="border:1px solid #CCCCCC;" />
			</div>
			</td>
			<td>
			<div class="banklogo">
			<input name="pd_FrpId" type="radio" value="CMBC-NET-B2C">
			<img src="images/bank/minsheng.gif" title="中国民生银行" alt="中国民生银行" width="93" height="20" border="0" style="border:1px solid #CCCCCC;" />
			</div>
			</td>
		</tr>
		<tr>
			<td>
			<div class="banklogo">
			<input name="pd_FrpId" type="radio" value="SPDB-NET-B2C">
			<img src="images/bank/shangpufa.gif"  title="上海浦东发展银行" alt="上海浦东发展银行" width="93" height="20" border="0" style="border:1px solid #CCCCCC;" />
			</div>
			</td>
			<td>
			<div class="banklogo">
			<input name="pd_FrpId" type="radio" value="CIB-NET-B2C">
			<img src="images/bank/xingye.gif" title="兴业银行" alt="兴业银行" width="93" height="20" border="0" style="border:1px solid #CCCCCC;" />
			</div>
			</td>
			<td>
			<div class="banklogo">
			<input name="pd_FrpId" type="radio" value="SDB-NET-B2C">
			<img src="images/bank/shenfa.gif" title="深圳发展银行" alt="深圳发展银行" width="93" height="20" border="0" style="border:1px solid #CCCCCC;" />
			</div>
			</td>
			<td>
			<div class="banklogo">
			<input name="pd_FrpId" type="radio" value="GDB-NET-B2C">
			<img src="images/bank/guangfa.gif" title="广发银行" alt="广发银行" width="93" height="20" border="0" style="border:1px solid #CCCCCC;" />
			</div>
			</td>
		</tr>
		<tr>
			<td>
			<div class="banklogo">
			<input name="pd_FrpId" type="radio" value="ECITIC-NET-B2C">
			<img src="images/bank/zhongxin.gif" title="中信银行" alt="中信银行" width="93" height="20" border="0" style="border:1px solid #CCCCCC;" />
			</div>
			</td>
			<td>
			<div class="banklogo">
			<input name="pd_FrpId" type="radio" value="HKBEA-NET-B2C">
			<img src="images/bank/dongya.gif" title="东亚银行" alt="东亚银行" width="93" height="20" border="0" style="border:1px solid #CCCCCC;" />
			</div>
			</td>
			<td>
			<div class="banklogo">
			<input name="pd_FrpId" type="radio" value="CBHB-NET-B2C">
			<img src="images/bank/buohai.gif" title="渤海银行" alt="渤海银行" width="93" height="20" border="0" style="border:1px solid #CCCCCC;" />
			</div>
			</td>
			<td>
			<div class="banklogo">
			<input name="pd_FrpId" type="radio" value="PINGANBANK-NET">
			<img src="images/bank/pingan.gif" title="平安银行" alt="平安银行" width="93" height="20" border="0" style="border:1px solid #CCCCCC;" />
			</div>
			</td>
		</tr>
		<tr>
			<td>
			<div class="banklogo">
			<input name="pd_FrpId" type="radio" value="BCCB-NET-B2C">
			<img src="images/bank/beijing.gif" title="北京银行" alt="北京银行" width="93" height="20" border="0" style="border:1px solid #CCCCCC;" />
			</div>
			</td>
			<td>
			<div class="banklogo">
			<input name="pd_FrpId" type="radio" value="NBCB-NET-B2C">
			<img src="images/bank/ningbo.gif" title="宁波银行" alt="宁波银行" width="93" height="20" border="0" style="border:1px solid #CCCCCC;" />
			</div>
			</td>
			<td>
			<div class="banklogo">
			<input name="pd_FrpId" type="radio" value="POST-NET-B2C">
			<img src="images/bank/youzheng.gif" title="中国邮政" alt="中国邮政" width="93" height="20" border="0" style="border:1px solid #CCCCCC;" />
			</div>
			</td>
			<td>
			<div class="banklogo">
			<input name="pd_FrpId" type="radio" value="BJRCB-NET-B2C">
			<img src="images/bank/nongcunshangye.gif" title="北京农村商业银行" alt="北京农村商业银行" width="93" height="20" border="0" style="border:1px solid #CCCCCC;" />
			</div>
			</td>
		</tr>
		<tr>
			<td>
			<div class="banklogo">
			<input name="pd_FrpId" type="radio" value="HXB-NET-B2C">
			<img src="images/bank/huaxia.gif" title="华夏银行" alt="华夏银行" width="93" height="20" border="0" style="border:1px solid #CCCCCC;" />
			</div>
			</td>
			<td>
			<div class="banklogo">
			<input name="pd_FrpId" type="radio" value="SHB-NET-B2C">
			<img src="images/bank/shanghaibank.gif"  title="上海银行" alt="上海银行" width="93" height="20" border="0" style="border:1px solid #CCCCCC;" />
			</div>
			</td>
			<td>
			<div class="banklogo">
			<input name="pd_FrpId" type="radio" value="NJCB-NET-B2C">
			<img src="images/bank/nanjing.gif" title="南京银行" alt="南京银行" width="93" height="20" border="0" style="border:1px solid #CCCCCC;" />
			</div>
			</td>
			<td>
			<div class="banklogo">
			<input name="pd_FrpId" type="radio" value="CZ-NET-B2C">
			<img src="images/bank/zheshang.gif" title="浙商银行" alt="浙商银行" width="93" height="20" border="0" style="border:1px solid #CCCCCC;" />
			</div>
			</td>
		</tr>
		</table>
		</td>
	</tr>
	<tr>
		<td align="left">&nbsp;</td>
		<td align="left">&nbsp;&nbsp;<input type="submit" value="马上支付" /></td>
	</tr>
	</form>
	</table>
	</td>
</tr>
<tr>
<td></td>
</tr>
</table>'*/
         
           "<input class='zhifu' type='submit' value='" . $GLOBALS['_LANG']['bipal_button'] . "'>";                     // 按钮
            "</form><br />";

        return $def_url;
    }

    /**
     * 响应操作
     */
    function respond()
    {
        $payment        = get_payment('bipal');
        $key    = $payment['paypal_account'];               ///获取商户编号

       $fromurl=$_SERVER['HTTP_REFERER'];
empty($fromurl) && $fromurl=$HTTP_SERVER_VARS["HTTP_REFERER"];


$p1_MerId=$_REQUEST['p1_MerId'];
$r0_Cmd=$_REQUEST['r0_Cmd'];
$r1_Code=$_REQUEST['r1_Code'];
$r2_TrxId=$_REQUEST['r2_TrxId'];
$r3_Amt=$_REQUEST['r3_Amt'];
$r4_Cur=$_REQUEST['r4_Cur'];
$r5_Pid=urlencode($_REQUEST['r5_Pid']);
$r6_Order=$_REQUEST['r6_Order'];
$r7_Uid=$_REQUEST['r7_Uid'];
$r8_MP=urlencode($_REQUEST['r8_MP']);
$r9_BType=$_REQUEST['r9_BType'];
$rb_BankId=$_REQUEST['rb_BankId'];
$ro_BankOrderId=$_REQUEST['ro_BankOrderId'];
$rp_PayDate=$_REQUEST['rp_PayDate'];
$hmac=$_REQUEST['hmac'];
$currency_code      = $payment['bibay_currency'];
#	判断返回签名是否正确（True/False）
$bRet = $this->CheckHmac($r0_Cmd,$r1_Code,$r2_TrxId,$r3_Amt,$r4_Cur,$r5_Pid,$r6_Order,$r7_Uid,$r8_MP,$r9_BType,$hmac,$p1_MerId,$currency_code);

#	校验码正确.
$returnMsg="";
if($bRet){
	if($r1_Code=="1"){
			
		#	需要比较返回的金额与商家数据库中订单的金额是否相等，只有相等的情况下才认为是交易成功.
		#	并且需要对返回的处理进行事务控制，进行记录的排它性处理，防止对同一条交易重复发货的情况发生.
		if($r9_BType=="1"){
			 order_paid($r6_Order, 2);
			 return true;
		}else{
		order_paid($r6_Order, 2);
			 return true;
		}
		
	}else{
		return false;
	}
}else{
	
		return false;
}
    }
	
	function makeOrder(){
   $Order_pre='biipay_';
   $Order = date("YmdHis");
   $Order .= rand(10000,99999);
   return  $Order_pre.$Order;
}

function CheckHmac($r0_Cmd,$r1_Code,$r2_TrxId,$r3_Amt,$r4_Cur,$r5_Pid,$r6_Order,$r7_Uid,$r8_MP,$r9_BType,$hmac,$p1_MerId,$key)
{
	if($hmac==getCallbackHmacString($r0_Cmd,$r1_Code,$r2_TrxId,$r3_Amt,$r4_Cur,$r5_Pid,$r6_Order,$r7_Uid,$r8_MP,$r9_BType,$p1_MerId,$key)){
		return true;
	}else{
		return false;
	}
}


function getReqHmacString($p0_Cmd,$p2_Order,$p3_Amt,$p4_Cur,$p5_Pid,$p6_Pcat,$p7_Pdesc,$p8_Url,$pa_MP,$pd_FrpId,$pr_NeedResponse,$p1_MerId,$key)
{
	
	$sbOld = "";
	#加入业务类型
	$sbOld = $sbOld.$p0_Cmd;
	#加入商家ID
	$sbOld = $sbOld.$p1_MerId;
	#加入订单号
	$sbOld = $sbOld.$p2_Order;
	#加入交易金额
	$sbOld = $sbOld.$p3_Amt;
	#加入货币单位
	$sbOld = $sbOld.$p4_Cur;
	#加入商品名称或者会员名称
	$sbOld = $sbOld.$p5_Pid;
	#加入商品分类
	$sbOld = $sbOld.$p6_Pcat;
	#加入商品描述
	$sbOld = $sbOld.$p7_Pdesc;
	#加入商户接收支付成功数据的地址
	$sbOld = $sbOld.$p8_Url;
	#加入扩展信息
	$sbOld = $sbOld.$pa_MP;
	#加入银行通道
	$sbOld = $sbOld.$pd_FrpId;
	#加入是否需要应答机制
	$sbOld = $sbOld.$pr_NeedResponse;
	
	#加入商户key
	$sbOld = $sbOld.$key;
	#返回值进行2次md5加密
	return md5(md5($sbOld));
}

function getCallbackHmacString($r0_Cmd,$r1_Code,$r2_TrxId,$r3_Amt,$r4_Cur,$r5_Pid,$r6_Order,$r7_Uid,$r8_MP,$r9_BType,$p1_MerId,$key)
{
	
	
	#取得加密前的字符串
	$sbOld = "";
	#加入商家ID
	$sbOld = $sbOld.$p1_MerId;
	#加入业务类型
	$sbOld = $sbOld.$r0_Cmd;
	#加入交易结果
	$sbOld = $sbOld.$r1_Code;
	#加入币宝流水号
	$sbOld = $sbOld.$r2_TrxId;
	#加入支付金额
	$sbOld = $sbOld.$r3_Amt;
	#加入交易币种
	$sbOld = $sbOld.$r4_Cur;
	#加入商品名称
	$sbOld = $sbOld.$r5_Pid;
	#加入订单号
	$sbOld = $sbOld.$r6_Order;
	#加入会员ID
	$sbOld = $sbOld.$r7_Uid;
	#加入交易扩展信息
	$sbOld = $sbOld.$r8_MP;
	#加入交易结果返回类型
	$sbOld = $sbOld.$r9_BType;
	
	#加入商户key
	$sbOld = $sbOld.$merchantKey;
	#返回值进行2次md5加密
	return md5(md5($sbOld));
}
}

?>