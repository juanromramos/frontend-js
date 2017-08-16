function crearXHRObject(){
	var peticionAjax;
	// Opera 8.0+, Firefox, Safari
	try{
		peticionAjax = new XMLHttpRequest();
	} catch (e) {
		// Navegadores
		try {
			peticionAjax  = new ActiveXObject('Mxsml2.XMLHTTP');
		} catch (e) {
			try {
				peticionAjax  = new ActiveXObject('Microsoft.XMLHTTP');
			} catch (e) {
				return false;
			}
		}
	}
	return peticionAjax;
}