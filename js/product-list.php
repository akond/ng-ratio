<?php

//header ('application/javascript');

if (empty ($_REQUEST ['callback']))
{
	return;
}

$products = file_get_contents ('products.js');
echo vsprintf ('void function () {
	%s(%s);
}();', [$_REQUEST ['callback'], $products]);
