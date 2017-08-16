<?php
	include_once('users.php');
	$reqEmail = $_REQUEST['email'];
	while ($email = current($usuarios)) {
	    if (key($usuarios) == $reqEmail) {
	        echo true;
	    }
	    next($usuarios);
	}
?>