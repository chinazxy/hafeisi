<?php
 
define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');

if ((DEBUG_MODE & 2) != 2)
{
    $smarty->caching = true;
}
 
$act=$_POST['act'];

if(empty($act)){
 
    $timestamp=time();
	$mdstr=MD5_STR.$timestamp;
    $token=md5($mdstr);
	  $smarty->assign('token',     $token);
	  $smarty->assign('timestamp',     $timestamp);
	  $is_mobile = is_mobile();
		if($is_mobile){
		    $smarty->display('mobile/Untitled-1.dwt');
		}else {
			$smarty->display('fangwei.dwt');	
		}
}else if($act=="query"){
	
	 $timestamp=$_POST['timestamp'];
	 $token=$_POST['token'];
	 $mdstr=MD5_STR.$timestamp;
	 $verifyToken =md5($mdstr);
	 $code=$_POST['code'];
	 $captcha=$_POST['captcha'];
	 $rs=array();
	  if($verifyToken==$token){
		 
        /* 检查验证码 */
         include_once('includes/cls_captcha.php');
		 if(!empty($_POST['captcha'])){
         $validator = new captcha();
            if (!$validator->check_word($_POST['captcha']))
            {
              $rs['err']="captcha_err";
            }else{
				
				  if(empty($code)){
					   $rs['err']="code_err";  
					  
				  }else{
					  
				 $sql = "SELECT *  FROM product_security_info WHERE PRODUCT_SECURITY_SEQ = '" . $code . "'";

                 $codeinfo = $db->getRow($sql);
				  
				 
				 if(!empty($codeinfo['PRODUCT_SECURITY_SEQ'])){
				 if($codeinfo['is_check']==0){
					 $sql = "UPDATE  product_security_info SET is_check=1 WHERE PRODUCT_SECURITY_SEQ = '" . $code . "'";
                    $db->query($sql);
					 $rs['err']="sucess"; 
					 }else{
					 $rs['err']="has_check";  
					 }					 
				 }else{
				    $rs['err']="fail"; 
				 }
					  
					  
				  }
				
			}
	     }else{
			  $rs['err']="captcha_emp"; 
		 }
	  }else{
		  
		  $rs['err']="ver_err";
	  }
	 
	 
	  echo json_encode($rs);
	
}



 

?>