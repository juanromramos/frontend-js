<?php
	include_once('users.php');
	$reqEmail = $_REQUEST['email'];
	$reqPassword = $_REQUEST['password'];
	if ($usuarios[$reqEmail] == $reqPassword){
		echo 'Login correcto';
	} else {
		echo 'Usuario o contraseña incorrectos';
	}
?>