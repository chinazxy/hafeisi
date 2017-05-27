<?php

define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');

$randString=gen_random_string();

$number="15005921879";

echo send_short_messages($number,$randString);

?>