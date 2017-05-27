<?php


define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');




$sql="SELECT * FROM ". $GLOBALS['ecs']->table('salestone_type')." order by resort asc";

$typelist=$GLOBALS['db']->getAll($sql);


$sqls="SELECT * FROM ". $GLOBALS['ecs']->table('salestone')." where type=1 order by resort asc";


$list=$GLOBALS['db']->getAll($sqls);

$smarty->assign("list",$list);
$smarty->assign("typelist",$typelist);
$smarty->assign("nums",count($typelist));
$smarty->display("map.dwt");

?>