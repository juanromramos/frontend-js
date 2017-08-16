<?php
	include_once('users.php');
	$reqNombre = $_REQUEST['nombre'];
	$reqApellidos = $_REQUEST['apellidos'];
	$reqEmail = $_REQUEST['email'];
	$reqPassword = $_REQUEST['password'];
	$usuarios[$reqEmail] = $reqPassword;
	echo 'Usuario creado correctamente';
?>