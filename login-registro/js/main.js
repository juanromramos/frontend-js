/*
*
*	La función 'sendData' se encarga de enviar
*	los datos de los formularios al servidor.
*
*	La validación previa de los mismos los hará
*	el script mediante la función 'validate'.
*
*/

'use strict';
onReady(main);

function main() {

	// Selecciona los dos formularios,
	var login = document.getElementById('login');
	var register = document.getElementById('register');
	// ... las etiquetas input ...
	var nombre = document.getElementById('nombre');
	var apellidos = document.getElementById('apellidos');
	var email = document.getElementById('email');
	var password = document.getElementById('password');
	var email2 = document.getElementById('email2');
	var password2 = document.getElementById('password2');
	var aceptar = document.getElementById('aceptar');
	// ...y el label que muestra la opción para cambiar al
	// formulario para crear una cuenta nueva
	var label = login.previousElementSibling.previousElementSibling;

	// añade los 'EventListener' correspondientes.
	// 'Validate' para los formularios
	login.addEventListener('submit', validate, false);
	register.addEventListener('submit', validate, false);
	// ... y 'checkEmail' para los campos de correo electrónico
	email.addEventListener('keyup', checkEmail, false);
	email2.addEventListener('keyup', checkEmail, false);
	// Esto evita que se puedan insertar espacios al crear una cuenta
	email2.addEventListener('keydown', function(e){ e.keyCode == '32' ? e.preventDefault() : null; }, false);
	password2.addEventListener('keydown', function(e){ e.keyCode == '32' ? e.preventDefault() : null; }, false);

	// Función encargada de validar según el formulario
	function validate(e) {
		e.preventDefault();
		var valid = true;
		e.target.id == 'login' ? valid = validateLogin(valid) : valid = validateRegister(valid);
		valid ? sendData(e) : e.returnValue = false;
	}

	function validateLogin(valid) {
		valid = valid & !isEmpty(email);
		valid = valid & !isEmpty(password);
		return valid;
	}

	function validateRegister(valid) {
		valid = valid & !isEmpty(nombre);
		valid = valid & !isEmpty(apellidos);
		valid = valid & !isEmpty(email2);
		valid = valid & isEmail(email2);
		valid = valid & !isEmpty(password2);
		valid = valid & isChecked(aceptar);
		return valid;
	}

	function isEmpty(e) {
		e.previousElementSibling.style.opacity = '0';
		if (e.value.trim().length == 0) {
			e.previousElementSibling.style.opacity = '1';
			return true;
		}
		return false;
	}

	function isEmail(e) {
		var formulario = e.parentNode.parentNode.id;
		e.previousElementSibling.style.opacity = '0';
		if (e.value.trim().match(/^\w+@\w+\.\w{2,3}$/) == null) {
			e.previousElementSibling.innerHTML = 'Introduce un correo electrónico válido';
			e.previousElementSibling.style.opacity = '1';
			return false;
		}
		return true;
	}

	function isChecked(e) {
		e.previousElementSibling.previousElementSibling.style.opacity = '0';
		if (!e.checked) {
			e.previousElementSibling.previousElementSibling.style.opacity = '1';
			return false;
		}
		return true;
	}

/*	
*
*	Función encargada de enviar los datos al servidor
*	mediante AJAX.
*
*	La respuesta del servidor es presentada en el
*	navegador mediante una llamada a 'alert'.
*
*	Como requisito final para que se envíen los datos,
*	tienen que estar 'activados' ('disabled == false')
*	los campos de las contraseñas.
*
*	El archivo al que se realiza la petición AJAX
*	dependerá del formulario que se esté gestionando.
*	Igualmente ocurrirá con los datos que se envíen.
*
*/

	function sendData(e) {
		var formulario = e.target.id;
		var ajaxQuery = crearXHRObject();
		var sendString;
		ajaxQuery.onreadystatechange = function(){
			if (formulario == 'login' && password.disabled == false || formulario == 'register' && password2.disabled == false) {
				if (ajaxQuery.readyState == 4 && ajaxQuery.status == 200) {

					// Si estamos en el formulario de login
					if (formulario == 'login') {
						ajaxQuery.responseText == 'Usuario o contraseña incorrectos' ? password.previousElementSibling.style.opacity = '1' :
							 password.previousElementSibling.style.opacity = '0'
						alert(ajaxQuery.responseText);						
					} else {

					// Si estamos en el formulario de registro
						alert(ajaxQuery.responseText);
					}			
				}
			}
		}
		ajaxQuery.open('POST', 'php/' + formulario + '.php');
		ajaxQuery.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		formulario == 'login' ? sendString = 'email=' + email.value
								 + '&password=' + password.value + '' :
								sendString = 'nombre=' + nombre.value
								 + '&apellidos=' + apellidos.value 
								 + '&email=' + email2.value 
								 + '&password=' + password2.value + '';
		ajaxQuery.send(sendString);
	}

/*	
*
*	Esta es la función encargada de comprobar de
*	forma asíncrona (con AJAX) mientras se rellena el
*	campo 'email' si la dirección existe o no en el servidor.
*
*	Dependiendo de si se encuentra o no el email (si 'responseText'
*	vale '1'), llama una función u otra para gestionar
*	la modificación de elementos visuales del formulario.
*/

	function checkEmail(e) {
		var formulario = e.target.parentNode.parentNode.id;
		var ajaxQuery = crearXHRObject();
		ajaxQuery.onreadystatechange = function(){
			if (ajaxQuery.readyState == 4 && ajaxQuery.status == 200) {
				ajaxQuery.responseText == '1' ? emailExists(e, formulario) : emailNotExists(e, formulario);
			}
		}
		ajaxQuery.open('POST', 'php/checkmail.php');
		ajaxQuery.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		ajaxQuery.send('email=' + e.target.value);
	}

/*	
*
*	Esta función se ocupa de gestionar la respuesta
*	de la petición AJAX para alterar los elementos
*	visibles de la página y activar/desactivar el
*	campo 'password'.
*
*/

	function emailExists(e, formulario) {
		if (formulario == 'login') {
			e.target.previousElementSibling.style.opacity = '0';
			password.disabled = false;
			label.style.visibility = 'hidden';
		} else {
			e.target.previousElementSibling.style.opacity = '1';
			e.target.previousElementSibling.innerHTML = 'El correo electrónico ya existe en la base de datos';
			password2.disabled = true;
		}
	}

	function emailNotExists(e, formulario) {
		if (formulario == 'login') {
			e.target.previousElementSibling.style.opacity = '1';
			e.target.previousElementSibling.innerHTML = 'El correo electrónico no existe en la base de datos';
			password.disabled = true;
			label.style.visibility = 'visible';
		} else {
			e.target.previousElementSibling.style.opacity = '0';
			password2.disabled = false;
		}
	}
}