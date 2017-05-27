<?php
//获取文章列表
function getCatArticle(){

  $catearray=array();

  $sql="SELECT * FROM ".$GLOBALS['ecs']->table('article_cat')." WHERE show_in_nav=1 order by sort_order asc";

  $catlist=$GLOBALS['db']->getAll($sql);
  
  $tophelp=array();
  
  $g=0;
  
  for($i=0;$i<count($catlist);$i++){
  
    $catearray['artlist'][$i]['catname']=$catlist[$i]['cat_name'];
	 $catearray['artlist'][$i]['cat_id']=$catlist[$i]['cat_id'];
	$sql="SELECT * FROM ".$GLOBALS['ecs']->table('article')."  WHERE is_open=1 and cat_id=".$catlist[$i]['cat_id']." order by article_id asc";
	
    $catearray['artlist'][$i]['articlelist']=$GLOBALS['db']->getAll($sql);
	
	for($t=0;$t<count($catearray['artlist'][$i]['articlelist']);$t++){
	
	      
		  if($g<3){
		  
		  	      if($catearray['artlist'][$i]['articlelist'][$t]['article_type']==1){
		  
		  
		   $tophelp[$g]=$catearray['artlist'][$i]['articlelist'][$t];
		  
		    $g++;
		  }
		  
		  }
	

	
	}
   
  
  }
  
  $catearray['help_list']=$tophelp;
  


  return $catearray;
   



}




function gen_random_string()
{
    $CaseSensitive =  $GLOBALS['db']->getOne("select value from ".$GLOBALS['ecs']->table('shop_config')." where code='strCase'");
	$len=$GLOBALS['db']->getOne("select value from ".$GLOBALS['ecs']->table('shop_config')." where code='sub_str'");
    $chars = array( "0", "1", "2","3", "4", "5", "6", "7", "8", "9");
    $charsLen = count($chars) - 1;
	if($len>0){
	$length=$len;
	}else{
	$length=6;
	}
	if($length>$charsLen){
	 $length=$charsLen;
	}
    shuffle($chars);// 将数组打乱
    $output = "";
    for ($i=0; $i<$length; $i++)
    {
        $output .= $chars[mt_rand(0, $charsLen)]; //获得一个数组元素
    }
   if(empty($CaseSensitive)){ 
	 $CaseSensitive=false;
	}
    if(!$CaseSensitive)	{
	 $output=strtoupper($output);
	}
    return $output;
}


 function gen_UserRandom_string()
{ 
   
    $chars = array(
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",  
        "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",  
        "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G",  
        "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",  
        "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2",  
        "3", "4", "5", "6", "7", "8", "9"
    );
    $charsLen = count($chars) - 1;
   
    shuffle($chars);// 将数组打乱
    $output = "";
    for ($i=0; $i<6; $i++)
    {
        $output .= $chars[mt_rand(0, $charsLen)]; //获得一个数组元素
    }
	
	$state=$GLOBALS['db']->getOne("select count(*) as count from ".$GLOBALS['ecs']->table('users')." where user_name='$output'");
	
	if($state>0){
	
	gen_UserRandom_string();
	}else{
	 return $output;
	}
  

   
}


function getAttribute($id){

  $attrArray=array();
  $attrs=array();
  $sql="SELECT * FROM ".$GLOBALS['ecs']->table('attribute')." WHERE cat_id=".$id." and isshow=1 order by sort_order asc";
  
  $attrs=$GLOBALS['db']->getAll($sql);
  
  for($i=0;$i<count($attrs);$i++){
   
   
    $attrArray[$i]['attr_name']=$attrs[$i]['attr_name'];
	
	$attrArray[$i]['attr_enname']=$attrs[$i]['attr_enname'];
	$attrArray[$i]['attr_id']=$attrs[$i]['attr_id'];
$attrArray[$i]['goods_attr_id']=$attrs[$i]['goods_attr_id'];
	
	 $attrArray[$i]['attr_values']=explode("\n",$attrs[$i]['attr_values']);
	 
	 if(!empty($attrs[$i]['attr_values'])){
	 
	  $attrArray[$i]['count']=1;
	 }
    
  }
  
  
  return $attrArray;
  



}


function getCatecoryInfo($catid){

  $cateinfo=array();
  if($catid>0){
  
   $sql="SELECT * FROM ".$GLOBALS['ecs']->table('category')." WHERE cat_id=".$catid;
  
    $cateinfo=$GLOBALS['db']->getRow($sql);
  
  
  }
  
  return $cateinfo;


}


function getParentList(){

  $cateinfo=array();

  
   $sql="SELECT * FROM ".$GLOBALS['ecs']->table('category')." WHERE parent_id=0 order by sort_order asc";
  
    $cateinfo=$GLOBALS['db']->getAll($sql);
  
  

  
  return $cateinfo;


}




function get_cart_list_goods()
{

    /* 初始化 */
    $goods_list = array();
    $total = array(
        'goods_price'  => 0, // 本店售价合计（有格式）
        'market_price' => 0, // 市场售价合计（有格式）
        'saving'       => 0, // 节省金额（有格式）
        'save_rate'    => 0, // 节省百分比
        'goods_amount' => 0, // 本店售价合计（无格式）
    );

    /* 循环、统计 */
    $sql = "SELECT *, IF(parent_id, parent_id, goods_id) AS pid " .
            " FROM " . $GLOBALS['ecs']->table('cart') . " " .
            " WHERE session_id = '" . SESS_ID . "' AND rec_type = '" . CART_GENERAL_GOODS . "'" .
            " ORDER BY pid, parent_id";
    $res = $GLOBALS['db']->query($sql);

    /* 用于统计购物车中实体商品和虚拟商品的个数 */

    while ($row = $GLOBALS['db']->fetchRow($res))
    {    


         if ($row['extension_code'] == 'package_buy')
        {
            $row['package_goods_list'] = get_package_goods($row['goods_id']);
			
			if($row['package_goods_list'][0]['goods_id']>0){
			
			  $goodsinfo = $GLOBALS['db']->getRow("SELECT `goods_thumb`,brand_id,goods_id FROM " . $GLOBALS['ecs']->table('goods') . " WHERE `goods_id`=".$row['package_goods_list'][0]['goods_id']);
            // $goodsttrinfo=$GLOBALS['db']->getRow("SELECT `attr_thumb`  FROM " . $GLOBALS['ecs']->table('goods_attr') . " WHERE `goods_id`=".$row['package_goods_list'][0]['goods_id'])." and goods_attr_id=".$row['package_goods_list'][0]['goods_attr_id'];
             $row['goods_thumb'] = get_image_path($row['goods_id'], $goodsinfo['goods_thumb'], true);
			// $row['goods_color_thumb'] = get_image_path($row['goods_id'], $goodsttrinfo['attr_thumb'], true);
			  $row['goods_id']=$goodsinfo['goods_id'];
			
			}
			

		     $row['shop_price']=  $packageTotal;
		  
		   $row['formart_shop_price']= price_format($packageTotal,true);
        }else if($row['extension_code'] == 'dingzhi'){
		  
		      $row['goods_thumb'] =$row['dingzhi_thumb'];
			  
			   $row['dingzhi_url']="dingzhi.php?url=".encrypt_url("act=dingzhi_edit&id=".$row['rec_id']."&time=".time(),URL_KEY)." ";
			   
			 $row['cart_id']=$row['rec_id'];
	       // $row['goods_id']=$goodsinfo['goods_id'];
		
		
		}else{
		
	 //   $row['shop_price']=$GLOBALS['db']->getOne("SELECT shop_price FROM ". $GLOBALS['ecs']->table('goods') ."WHERE goods_id=$row[goods_id]");
	  //  if ($row['goods_attr_id']>0){
		
		// $row['attr_price']=$GLOBALS['db']->getOne("SELECT attr_price FROM ". $GLOBALS['ecs']->table('goods_attr') ."WHERE goods_attr_id=$row[goods_attr_id]");
		// 
		// $row['shop_price']=$row['shop_price']+$row['attr_price'];
		
	//	}
		
		 //    $row['formart_shop_price']= price_format($row['shop_price'],true);
		 
		 
		     $goodsinfo = $GLOBALS['db']->getRow("SELECT `goods_thumb`,brand_id FROM " . $GLOBALS['ecs']->table('goods') . " WHERE `goods_id`='{$row['goods_id']}'");
				 if($row['goods_attr_id']>0){
          $goodsttrinfo=$GLOBALS['db']->getRow("SELECT a.attr_left_thumb,a.attr_value,b.attr_name,a.frame_des,a.glass_des,a.xinghao  FROM " . $GLOBALS['ecs']->table('goods_attr') . " as a inner join " . $GLOBALS['ecs']->table('attribute') . " as b on a.attr_id=b.attr_id  WHERE a.goods_id=".$row['goods_id']." and a.goods_attr_id=".$row['goods_attr_id']."");
			$row['attr_name'] = $goodsttrinfo['attr_name'];
			$row['attr_value'] = $goodsttrinfo['attr_value'];
			$row['goods_color_thumb'] =$goodsttrinfo['attr_left_thumb'];
			$row['frame_des'] =$goodsttrinfo['frame_des'];   
			$row['glass_des'] =$goodsttrinfo['glass_des']; 
			$row['xinghao'] =$goodsttrinfo['xinghao']; 
			 }

			 $row['goods_thumb'] = get_image_path($row['goods_id'], $goodsinfo['goods_thumb'], true);
          //  $row['brand_name'] = $GLOBALS['db']->getOne("SELECT `brand_name` FROM " . $GLOBALS['ecs']->table('brand') . " WHERE `brand_id`='".$goodsinfo['brand_id']."'");
		}

       // $total['goods_price']  += $row['goods_price'] * $row['goods_number'];
		
		
       // $row['subtotal']     = $row['goods_price'] * $row['goods_number'];
		 //  $row['formart_subtotal']     =price_format($row['subtotal'],true);
		//$discountprice=$discountprice+$row['subtotal'];
		      $row['noformat_goods_price']  =$row['goods_price'];
        $row['goods_price']  = price_format($row['goods_price'], true);
       // $row['market_price'] = price_format($row['market_price'], false);
		//$goods_count=$goods_count+$row['goods_number'];
        //$row['shop_price']=price_format($row['shop_price'], false);
        /* 统计实体商品和虚拟商品的个数 */
        if ($row['is_real'])
        {
            $real_goods_count++;
        }
        else
        {
            $virtual_goods_count++;
        }

        /* 查询规格 
        if (trim($row['goods_attr']) != '')
        {
            $sql = "SELECT attr_value FROM " . $GLOBALS['ecs']->table('goods_attr') . " WHERE goods_attr_id " .
            db_create_in($row['goods_attr']);
            $attr_list = $GLOBALS['db']->getCol($sql);
            foreach ($attr_list AS $attr)
            {
                $row['goods_name'] .= ' [' . $attr . '] ';
            }
						 $attr="";
		   if(!empty($row['goods_attr'])){
		
		    $attr=explode(":",$row['goods_attr']);
			$attrs=explode("[",$attr[1]);
			$attr=$attrs[0];
		   }
		   $row['attr']=$attr;
        }*/

      

      
  
        $goods_list[] = $row;
    }

    $total['real_goods_count']    = $real_goods_count;
    $total['virtual_goods_count'] = $virtual_goods_count;
 
    return array('goods_list' => $goods_list, 'total' => $total,'goods_count'=>$goods_count,'totalprice'=>$totalprice,'jsmoney'=>$jsmoney,"paymoney"=>$paymoney);
}



function getBrnad(){

   
     $sql="SELECT * FROM " . $GLOBALS['ecs']->table('brand') . " where is_show=1 ORDER BY sort_order asc";
	 
	 
	 $bannerarray=$GLOBALS['db']->getAll($sql);
	 
	 
	 return $bannerarray;

}


function getSearchItem(){

   
   $item=array();


   $sql="SELECT  cat_name,cat_id FROM " . $GLOBALS['ecs']->table('category') . " order by sort_order asc";
   
   $item['category']=$GLOBALS['db']->getAll($sql);
   
   
   $sql="SELECT brand_name,brand_id FROM  " . $GLOBALS['ecs']->table('brand') . " order by sort_order asc";
   
   
   $item['brand']=$GLOBALS['db']->getAll($sql);
   
   
    $item['price']=array(0=>"0-99",1=>"99-100");
   
   return $item;

  

}

function getColors($goods_id){
  
  $res=array();
  
  if($goods_id>0){
  
    $sql="SELECT * FROM ".$GLOBALS['ecs']->table('goods_attr')." WHERE attr_detail_show=1 and  goods_id=".$goods_id." order by goods_attr_id asc";
  
  
    $res=$GLOBALS['db']->getAll($sql);
	
  }

  
  return $res;



}
function keyED($txt,$encrypt_key)
{    
    $encrypt_key =    md5($encrypt_key); 
    $ctr=0;
    $tmp = "";        
    for($i=0;$i<strlen($txt);$i++)        
    {
        if ($ctr==strlen($encrypt_key))
        $ctr=0;    
        $tmp.= substr($txt,$i,1) ^ substr($encrypt_key,$ctr,1);
        $ctr++;
    } 
    return $tmp; 
}
function encrypt($txt,$key)    
{
    $encrypt_key = md5(mt_rand(0,100));
    $ctr=0;   
    $tmp = "";
     for ($i=0;$i<strlen($txt);$i++)      
     {
        if ($ctr==strlen($encrypt_key))
            $ctr=0;        
        $tmp.=substr($encrypt_key,$ctr,1) . (substr($txt,$i,1) ^ substr($encrypt_key,$ctr,1));
        $ctr++;
     }   
     return keyED($tmp,$key);
}
function decrypt($txt,$key)
{
    $txt = keyED($txt,$key);    
    $tmp = "";
    for($i=0;$i<strlen($txt);$i++)     
    {
        $md5 = substr($txt,$i,1);
        $i++;
        $tmp.= (substr($txt,$i,1) ^ $md5);       
    }
    return $tmp;
} 
function encrypt_url($url,$key) 
{
    return rawurlencode(base64_encode(encrypt($url,$key)));
}
function decrypt_url($url,$key)
{
    return decrypt(base64_decode(rawurldecode($url)),$key);
}
function geturl($str,$key)
{
    $str = decrypt_url($str,$key); 
    $url_array = explode('&',$str); 
    if (is_array($url_array)) 
    {
        foreach ($url_array as $var) 
        {
            $var_array = explode("=",$var); 
            $vars[$var_array[0]]=$var_array[1]; 
        }
    }
    return $vars;
}



function build_order_no(){
      return date('Ymd') . str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT);

    }
	
	
	function PostXml($order_id){
	

	    $host=$_SERVER['SERVER_NAME'];
	    $sqls="SELECT a.*,b.dingzhi_number,b.order_id,b.dingzhi_attr_list,b.goods_name,b.goods_number,b.dingzhi_price FROM ".$GLOBALS['ecs']->table('order_info') ." as a inner join ".$GLOBALS['ecs']->table('order_goods') ." as b  on a.order_id=b.order_id where  a.order_id=".$order_id;
	 	$arrays=$GLOBALS['db']->getRow($sqls);
		


		$dingzhi_numbber=unserialize($arrays['dingzhi_number']);
		$dingzhi_attr=unserialize($arrays['dingzhi_attr_list']);
        $dingzhi_price=unserialize($arrays['dingzhi_price']);


	$dom=new DomDocument('1.0', 'utf-8');
	$list = $dom->createElement('list');
	$dom->appendchild($list);
	
	$bill = $dom->createElement('bill');
	$list->appendchild($bill);
	
	$billid=$dom->createElement('bill_id');
	$billid->appendchild($dom->createTextNode($arrays['order_d_sn']));
    $bill->appendchild($billid);
	
	$outbid=$dom->createElement("out_bill_id");
	$outbid->appendchild($dom->createTextNode($arrays['order_sn']));
	$bill->appendchild($outbid);
	
	$productid=$dom->createElement('product_cd');
	$productid->appendchild($dom->createTextNode($dingzhi_numbber['zjk_number']));
	$bill->appendchild($productid);
	
	$lens_cd=$dom->createElement('lens_cd');
	$lens_cd->appendchild($dom->createTextNode($dingzhi_numbber['jp']));
	$bill->appendchild($lens_cd);
	$times=date("Y-m-d",strtotime('+'.$dingzhi_attr['maxtime'].' day',$arrays['pay_time']));
	$send_date=$dom->createElement('send_date');
	$send_date->appendchild($dom->createTextNode($times));
	$bill->appendchild($send_date);
	
	$market_price=$dom->createElement('market_price');
	$market_price->appendchild($dom->createTextNode($arrays['goods_amount']));
	$bill->appendchild($market_price);
	
	if($dingzhi_attr['jp_type']==0){
	  $jptype=1;
	}else{
	  $jptype=0;
	}
	$fill_id=$dom->createElement('fill_id');
	$fill_id->appendchild($dom->createTextNode($jptype));
	$bill->appendchild($fill_id);
	
	$apply_date=$dom->createElement('apply_date');
	$applytime=date("Y-m-d H:i:s",$arrays['pay_time']);
	$apply_date->appendchild($dom->createTextNode($applytime));
	$bill->appendchild($apply_date);
	
	$lens_type=$dom->createElement('lens_type');
	$lens_type->appendchild($dom->createTextNode(1));
	$bill->appendchild($lens_type);
	
	$brand=$dom->createElement('brand');
	$brand->appendchild($dom->createTextNode($dingzhi_attr['brand_name']));
	$bill->appendchild($brand);
	
	$l_sph=$dom->createElement('l_sph');
	$l_sph->appendchild($dom->createTextNode($dingzhi_attr['l_eye_s']));
	$bill->appendchild($l_sph);
	
	
	$r_sph=$dom->createElement('r_sph');
	$r_sph->appendchild($dom->createTextNode($dingzhi_attr['r_eye_s']));
	$bill->appendchild($r_sph);
	
	$l_cyl=$dom->createElement('l_cyl');
	$l_cyl->appendchild($dom->createTextNode($dingzhi_attr['l_eye_c']));
	$bill->appendchild($l_cyl);
	
	$r_cyl=$dom->createElement('r_cyl');
	$r_cyl->appendchild($dom->createTextNode($dingzhi_attr['r_eye_c']));
	$bill->appendchild($r_cyl);
	
    $l_axis=$dom->createElement('l_axis');
	$l_axis->appendchild($dom->createTextNode($dingzhi_attr['l_eye_a']));
	$bill->appendchild($l_axis);
	
	$r_axis=$dom->createElement('r_axis');
	$r_axis->appendchild($dom->createTextNode($dingzhi_attr['r_eye_a']));
	$bill->appendchild($r_axis);
	
	$l_pd=$dom->createElement('l_pd');
	$l_pd->appendchild($dom->createTextNode($dingzhi_attr['l_eye_t']));
	$bill->appendchild($l_pd);
	
   	$r_pd=$dom->createElement('r_pd');
	$r_pd->appendchild($dom->createTextNode($dingzhi_attr['r_eye_t']));
	$bill->appendchild($r_pd);
	
	if($arrays['province']>0){
	  $province_val=get_region_n($arrays['province']);
	}
	
	$province=$dom->createElement('province');
	$province->appendchild($dom->createTextNode($province_val));
	$bill->appendchild($province);
	if($arrays['city']>0){
	  $city_val=get_region_n($arrays['city']);
	}
	$city=$dom->createElement('city');
	$city->appendchild($dom->createTextNode($city_val));
	$bill->appendchild($city);
    if($arrays['district']>0){
	  $district_val=get_region_n($arrays['district']);
	}
    $areas=$dom->createElement('area');
	$areas->appendchild($dom->createTextNode($district_val));
	$bill->appendchild($areas);
	
	$address=$dom->createElement('address');
	$address->appendchild($dom->createTextNode($arrays['address']));
	$bill->appendchild($address);
	
    $dep_name=$dom->createElement('dep_name');
	$dep_name->appendchild($dom->createTextNode($arrays['consignee']));
	$bill->appendchild($dep_name);
	
	
	$dep_tel=$dom->createElement('dep_tel');
	$dep_tel->appendchild($dom->createTextNode($arrays['mobile']));
	$bill->appendchild($dep_tel);
	
	$zip=$dom->createElement('zip');
	$zip->appendchild($dom->createTextNode($arrays['zipcode']));
	$bill->appendchild($zip);
	
	$url=$dom->createElement('url');
	$url->appendchild($dom->createTextNode("http://".$host."/pay_dingzhigoods.php?order_sn=".$arrays['order_sn']));
	$bill->appendchild($url);
	
	$material_list=$dom->createElement('material_list');
	$bill->appendchild($material_list);
	if(!empty($dingzhi_numbber) && is_array($dingzhi_numbber)){
	foreach($dingzhi_numbber as $k=>$v){
	if($k!="zjk_number" && $k!="jk" && $k!="jk_r" && $k!="jp" && $k!="peijian"){
	$material=$dom->createElement('material');
	$material_list->appendchild($material);
	$material_id=$dom->createElement('material_id');
    $material_id->appendchild($dom->createTextNode($v));
	$material->appendchild($material_id);
	$qty=$dom->createElement('qty');
	$qty->appendchild($dom->createTextNode($arrays['goods_number']));
	$material->appendchild($qty);
	$price=$dom->createElement('price');
	if($k=="cz"){
    $price->appendchild($dom->createTextNode(0));
	}else{
	 $prefix=explode("_",$k);

     $prices=$dingzhi_price[$prefix[0]."_id"];
	 $price->appendchild($dom->createTextNode($prices));
	}
	$material->appendchild($price);
	}else if($k=="peijian"){
	  
	    if($v && count($v)>0){
		foreach($dingzhi_numbber['peijian'] as $k=>$v){
     if(!empty($v['number'])){
	$material=$dom->createElement('material');
	$material_list->appendchild($material);
	$material_id=$dom->createElement('material_id');
    $material_id->appendchild($dom->createTextNode($v['number']));
	$material->appendchild($material_id);
	$qty=$dom->createElement('qty');
	$qty->appendchild($dom->createTextNode($arrays['goods_number']));
	$material->appendchild($qty);
	$price=$dom->createElement('price');
	$price->appendchild($dom->createTextNode(0));
	$material->appendchild($price);
	}
			}
		
		}
	
	}
	
	}
	
	}
	$xmlstr=$dom->saveXML();

   
	$filename=ROOT_PATH."dingzhi"."/".time().".xml";


	$file=fopen($filename,"w+");
  	fputs($file,$xmlstr);
    fclose($file);
	 
	// exit;

	//file_put_contents($filename,$xmlstr); 

   // $client = new SoapClient(null,array('location' =>'http://115.29.193.5:7001/services/MsgServiceUT',"uri"=>"http://115.29.193.5:7001/services"));
   // $client->soap_defencoding = 'utf-8';
   // $client->decode_utf8 = false;
  //  $client->xml_encoding = 'utf-8';
  //   $out =$client->createMadeInfo($xmlstr);
  $out="";
	//var_dump($out);
	if($out!=""){
	//推送失败时加入库，后台队列处理
	   $sql="insert into  ".$GLOBALS['ecs']->table('ts_order')."(id,order_id,add_time) VALUES(NULL,'".$order_id."','".time()."')";

	   $GLOBALS['db']->query($sql);
	}
 
	
	}
  function get_region_n($id){
  
   if(!empty($id)){
  
   $sql="SELECT region_name FROM ".$GLOBALS['ecs']->table('region')." WHERE region_id=".$id;

    $region_name=$GLOBALS['db']->getOne($sql);
	return $region_name;
	}else{
	 return "";
	}
  
  }

		function is_mobile() {
$user_agent = $_SERVER['HTTP_USER_AGENT'];


$mobile_browser = Array("Android","Touch", "iPhone","BlackBerry OS","mqqbrowser","opera mobi","juc","iuc","fennec","applewebKit/420","applewebkit/525","applewebkit/532","iemobile","windows ce","240x320","480x640","acer","asus","audio","blazer","coolpad","dopod","etouch","hitachi","htc","huawei","jbrowser","lenovo","lg","lg-","lge-","lge", "mobi","moto","nokia","phone","samsung","sony","symbian","tablet","tianyu","wap","xda","xde","zte","SymbianOS", "Windows Phone", "iPad", "iPod");
$is_mobile = 0;
foreach ($mobile_browser as $device) {
if (stristr($user_agent, $device)) {
$is_mobile = 1;
break;
}
}
return $is_mobile;
}

/*
* @type 1 为tmail地址 2为信购商城地址
* @id type为1时 id为官网产品ID type为2时 id为信购产品接口ID
* @url type为1时 url为该产品天猫地址，为2是留空
* @return [String]  
*/
 
function qcode($type,$id,$url=""){
	 
    $url=$url;
	$path="./data/qrcode/";
    if($type==2){
	  $logo = $path.'xlogo.png'; 
	 $url='http://wshop.hiro.net.cn/#/good/'.$id.'/info';
     }

   if($type==1){
      $logo = $path.'tlogo.png'; 
	 $imgpath=$path."tmail_".$id.".png";
	 if (file_exists($imgpath)) {
     return $imgpath;
     }
    
   }else{
	   
	  $imgpath=$path."xingou_".$id.".png";  
	  if (file_exists($imgpath)) {
       return $imgpath;
     } 
	   
   }

$value = $url;  
$errorCorrectionLevel = 'L'; 
$matrixPointSize =6;

QRcode::png(urldecode($value), $path.$id.'_qrcode.png', $errorCorrectionLevel, $matrixPointSize, 2); 

$QR =$path.$id.'_qrcode.png';
if ($logo !== FALSE) { 
 $QR = imagecreatefromstring(file_get_contents($QR)); 
 $logo = imagecreatefromstring(file_get_contents($logo)); 
 $QR_width = imagesx($QR);
 $QR_height = imagesy($QR);
 $logo_width = 50;
 $logo_height = 50;
 $logo_qr_width = $QR_width / 5; 
 $scale = $logo_width/$logo_qr_width; 
 $logo_qr_height = $logo_height/$scale; 
 $from_width = ($QR_width - $logo_qr_width) / 2; 
 imagecopyresampled($QR, $logo, $from_width, $from_width, 0, 0, $logo_qr_width, 
 $logo_qr_height, 50, 50); 
} 
 
   if($type==1){
	    $nimgp= $path.'tmail_'.$id.".png";
    imagepng($QR, $nimgp); 
   }else{
	    $nimgp= $path.'xingou_'.$id.".png";
	 imagepng($QR, $nimgp);    
	   
   }
   imagedestroy($QR);
   
   return $nimgp;
}
	
function tmail_qcode($type,$id,$url=""){
 
    $url=$url;
	$path="./data/qrcode/";
    if($type==2){
	  $logo = $path.'xlogo.png'; 
	 $url='http://wshop.xingou.net.cn/#/good/'.$id.'/info';   
     }

   if($type==1){
      $logo = $path.'tlogo.png'; 
	 $imgpath=$path."tmail_".$id.".png";
	 if (file_exists($imgpath)) {
     return $imgpath;
     }
    
   }else{
	   
	  $imgpath=$path."xingou_".$id.".png";  
	  if (file_exists($imgpath)) {
       return $imgpath;
     } 
	   
   }

$value = $url;  
$errorCorrectionLevel = 'L'; 
$matrixPointSize =6;

QRcode::png(urldecode($value), $path.$id.'_qrcode.png', $errorCorrectionLevel, $matrixPointSize, 2); 

$QR =$path.$id.'_qrcode.png';
if ($logo !== FALSE) { 
 $QR = imagecreatefromstring(file_get_contents($QR)); 
 $logo = imagecreatefromstring(file_get_contents($logo)); 
 $QR_width = imagesx($QR);
 $QR_height = imagesy($QR);
 $logo_width = 50;
 $logo_height = 50;
 $logo_qr_width = $QR_width / 5; 
 $scale = $logo_width/$logo_qr_width; 
 $logo_qr_height = $logo_height/$scale; 
 $from_width = ($QR_width - $logo_qr_width) / 2; 
 imagecopyresampled($QR, $logo, $from_width, $from_width, 0, 0, $logo_qr_width, 
 $logo_qr_height, 50, 50); 
} 
 
   if($type==1){
	    $nimgp= $path.'tmail_'.$id.".png";
    imagepng($QR, $nimgp); 
   }else{
	    $nimgp= $path.'xingou_'.$id.".png";
	 imagepng($QR, $nimgp);    
	   
   }
   imagedestroy($QR);
   
   return $nimgp;
}
function host_qcode($type,$url=""){

	$url=$url;
	$path="./data/qrcode/";


	if($type==1){
		$logo = $path.'tlogo.png';
		$imgpath=$path."tmail.png";
		if (file_exists($imgpath)) {
			return $imgpath;
		}

	}else{
		$logo = $path.'xlogo.png';
		$imgpath=$path."xingou.png";
		if (file_exists($imgpath)) {
			return $imgpath;
		}

	}

	$value = $url;
	$errorCorrectionLevel = 'L';
	$matrixPointSize =6;

	QRcode::png(urldecode($value), $path.'host_qrcode.png', $errorCorrectionLevel, $matrixPointSize, 2);

	$QR =$path.'host_qrcode.png';
	if ($logo !== FALSE) {
		$QR = imagecreatefromstring(file_get_contents($QR));
		$logo = imagecreatefromstring(file_get_contents($logo));
		$QR_width = imagesx($QR);
		$QR_height = imagesy($QR);
		$logo_width = 50;
		$logo_height = 50;
		$logo_qr_width = $QR_width / 5;
		$scale = $logo_width/$logo_qr_width;
		$logo_qr_height = $logo_height/$scale;
		$from_width = ($QR_width - $logo_qr_width) / 2;
		imagecopyresampled($QR, $logo, $from_width, $from_width, 0, 0, $logo_qr_width,
			$logo_qr_height, 50, 50);
	}

	if($type==1){
		$nimgp= $path."tmail.png";
		imagepng($QR, $nimgp);
	}else{
		$nimgp= $path."xingou.png";
		imagepng($QR, $nimgp);

	}
	imagedestroy($QR);

	return $nimgp;
}

?>