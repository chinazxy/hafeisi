<?php
define('IN_ECS', true);
require('../includes/init.php');
$url=EFAST_URL;
/*库存接口*/
 if(function_exists("curl_init")){
 header("Content-Type:text/html;charset=utf-8");
 $header=array(); 
 $sql="SELECT product_id,product_sku FROM " . $ecs->table('products')." where product_sku!=''";
$result=$db->getAll($sql);
$t=0;
$que=array();
for($i=0;$i<count($result);$i++){
if(!empty($result[$i]['product_sku'])){
$que[$t]['product_sku']=$result[$i]['product_sku'];
$que[$t]['product_id']=$result[$i]['product_id'];
$t++;
}
}
quene($que,0,count($que));
}else if(function_exists("file_put_contents")){

$str=file_get_contents($url);

$strs=json_decode($str);
$array=object_array($strs);


echo $array['resp_data']['total_results'];

}

function quene($row,$i,$len){

 header("Content-Type:text/html;charset=utf-8");
 $url=EFAST_URL;
 $header=array();
 $lens=$len;
$ch = curl_init();

$sku=$row[$i]['product_sku'];

$data=array(
    "app_act"=>"efast.sku.stock.get",
	"sd_id"=>4,
	"sku"=>$row[$i]['product_sku'],
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
if(isset($array['resp_data'][''.$row[$i]['product_sku']]['sl']) && $array['resp_data'][''.$row[$i]['product_sku']]['sl']>=0){

$sql="UPDATE  " . $GLOBALS['ecs']->table('products')." SET product_number=".$array['resp_data'][''.$row[$i]['product_sku']]['sl']." WHERE product_id='".$row[$i]['product_id']."'";

$state=$GLOBALS['db']->query($sql);

if($state!==false){
    $i++;
   if($i<=$lens-1){
   quene($row,$i,$lens);
   }else{
   curl_close($ch);
   }   

 }
}else{
  $i++; 
   if($i<=$lens-1){
   quene($row,$i,$lens);
   }else{
   curl_close($ch);
   } 
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