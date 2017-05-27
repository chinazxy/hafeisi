<?php
define('IN_ECS', true);
$url=EFAST_URL;
/*库存接口*/


function product_stock($product_sku){

 header("Content-Type:text/html;charset=utf-8");
 $url=EFAST_URL;
 $header=array();
 $lens=$len;
$ch = curl_init();

$sku=$product_sku;

$data=array(
    "app_act"=>"efast.sku.stock.get",
	"sd_id"=>SD_ID,
	"sku"=>$sku,
	"app_nick"=>APP_NICK,
	"app_key"=>APP_KEY,
	"app_secret"=>APP_SECRET
	);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true); 
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);  
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch); 
$str=json_decode($response);
$array=object_array($str);  
if(isset($array['resp_data'][''.$sku]['sl']) && $array['resp_data'][''.$sku]['sl']>=0){


 return $array['resp_data'][''.$sku]['sl'];

}else{

 return 0;

}

}


function object_array($array)
{
   if(is_object($array))
   {
    $array = (array)$array;
   }
   if(is_array($array))
   {
    foreach($array as $key=>$value)
    {
     $array[$key] = object_array($value);
    }
   }
   return $array;
}

?>