<?php
define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');
if ($_REQUEST['act'] == 'import')
{
    $act = isset($_POST['uploadFangwei']) ? $_POST['uploadFangwei'] : 0;
    if($act == 1){

        if($_FILES['fangwei']['error'] == 0){
            // 最大上传文件大小
            $php_maxsize = ini_get('upload_max_filesize');
            $htm_maxsize = '2M';

            $tmp_name = $_FILES['fangwei']['tmp_name'];
            $name = $_FILES['fangwei']['name'];
            $size = $_FILES['fangwei']['size'];

            $allow_file_types = '|TXT|';
            if (!check_file_type($tmp_name,$name,$allow_file_types)){
                sys_msg("请上传TXT文件！", 1, array(), true);
            }

            $fangwei = explode("\n", file_get_contents($tmp_name));
            
            $num = "";
            foreach($fangwei as $v){
                if($v == ""){
                    continue;
                }else{
                $a = preg_replace('/\D/','',$v);
                    $num .= "('".$a."'),";
                }
            }
            $num = rtrim($num , ",");
            //var_dump($num);exit;
            $sql = "INSERT INTO product_security_info(PRODUCT_SECURITY_SEQ) values $num";
			
            $result = $db->query($sql);
            //var_dump($result);exit;
            if($result){
                sys_msg("上传成功！", 0, array(), false);
            }else{
                sys_msg("上传失败，请重新上传！", 1, array(), true);
            }

        }
        elseif ($_FILES['fangwei']['error'] == 1)
        {
            sys_msg(sprintf("文件过大，请控制文件大小！", $php_maxsize), 1, array(), true);
        }
        elseif ($_FILES['fangwei']['error'] == 2)
        {
            sys_msg(sprintf("文件大小请控制在2M以内！", $htm_maxsize), 1, array(), true);
        }elseif($_FILES['fangwei']['error'] == 4){
            sys_msg("没有文件被上传！", 1, array(), true);
        }
    }
    /* 检查权限 */
    admin_priv('fangwei');

    /* 参数赋值 */
    $ur_here = $_LANG['05_fangwei'];
    $smarty->assign('ur_here',    $ur_here);

    /* 显示模板 */
    assign_query_info();
    $smarty->display('fangweiimport.htm');
}


?>