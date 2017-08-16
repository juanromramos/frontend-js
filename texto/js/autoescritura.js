var palabras = "No tv no beer make Homer go crazy";

var cursor = "|";
var timerLetras = 50;
var timerPalabras = 2000;
var cadena = "";
var longitudCadena = 0;
var spanPalabras;
var i = 0;

document.addEventListener("DOMContentLoaded",function(){
	var contenedor = document.getElementById("cont-autoescritura");
	spanPalabras = document.createElement("span");
	contenedor.appendChild(spanPalabras);
	if (cursor) {
		var spanCursor = document.createElement("span");
		spanCursor.innerHTML = cursor;
		contenedor.appendChild(spanCursor);
		spanCursor.style.transition = "opacity .7s cubic-bezier(0.4, 0, 0.2, 1)";
		setInterval(function(){ spanCursor.style.opacity == 1 ? spanCursor.style.opacity = 0 : spanCursor.style.opacity = 1; }, 600);
	}
	escribiendo();
});

function escribiendo() {
    cadena = palabras;
    //i == palabras.length-1 ? i = 0 : i++;
    ponLetra();
}

function ponLetra() {
    spanPalabras.innerHTML = cadena.substr(0, longitudCadena++);
    if(longitudCadena < cadena.length+1) {
        setTimeout('ponLetra()', timerLetras);
    } else {
        longitudCadena = 0;
        cadena = '';
        setTimeout('borrando();', timerPalabras);
    }
}

function borrando() {
    cadena = spanPalabras.innerHTML;
    longitudCadena = cadena.length;
    if (longitudCadena > 0) {
        quitaLetra();
    }
}

function quitaLetra() {
    spanPalabras.innerHTML = cadena.substr(0, longitudCadena--);
    if(longitudCadena >= 0) {
        setTimeout('quitaLetra()', timerLetras);
    } else {
        longitudCadena = 0;
        cadena = '';
        setTimeout('escribiendo();', timerPalabras);
    }
}

function cambiarTexto() {
	palabras = document.getElementById("cont-autoescritura-text").value;
}
