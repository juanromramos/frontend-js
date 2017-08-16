var cuandoEsteListo = (function() {
	var funciones = [];
	var yaCargado = false;
	
	function gestor(e) {
		if (yaCargado == true) {return; }
		if (e.type === "readystatechange" && document.readyState !== "complete") {return; }
		
		for (var i = 0; i < funciones.length; i++) {
			funciones[i].call(document);
		}
		yaCargado = true;
		funciones = null;
	}
	
	if(document.addEventListener) {
		document.addEventListener("DOMContentLoaded", gestor, false);
		document.addEventListener("readystatechange", gestor, false);
		window.addEventListener("load", gestor, false);
	} else {
		document.attachEvent("onreadystatechange", gestor);
		window.attachEvent("onload", gestor);
	}
	
	return function cuandoEsteListo(f) {
		if (yaCargado) {f.call(document);}
		else {funciones.push(f);}
	}

}());