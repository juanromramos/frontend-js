var barra_progreso = document.querySelector(".progreso");
var inputs = document.querySelectorAll("input.control");
var slides = document.querySelectorAll("article.slide");
var porcentaje = 0,
	valor_zoom = 1.28,
	i = 0;
setInterval(barraProgreso, 30);
setInterval(zoomFondo, 90);

function barraProgreso() {
	barra_progreso.style.width = porcentaje + "%";
	porcentaje = porcentaje + 0.5;
	if (porcentaje >= 100) {
		cambiaSlide(1);
		porcentaje = 0;
		valor_zoom = 1.28;
	}
}

function zoomFondo() {
	slides[i].style.transform = "scale(" + valor_zoom + ")";
	valor_zoom = valor_zoom - 0.0008;
}

function cambiaSlide(dir) {
	for (var n = 0; n < inputs.length; n++) {
		if (inputs[n].checked) {
			muevePalabra(n, -dir*30 + "px", 0);
			inputs[n].checked = false;
			i = n;
			break;
		}
	}
	if (dir == -1) {
		i == 0 ? i = inputs.length-1 : i--;
	} else {
	    i == inputs.length-1 ? i = 0 : i++;
	}
	muevePalabra(i, dir*30 + "px", 0);
	setTimeout(function(){
		muevePalabra(i, "0px", 1);
	},300);
	inputs[i].checked = true;
}

function muevePalabra(m, dist, opacity) {
	var h1 = document.querySelectorAll(".palabra > h1")[m];
	h1.style.opacity = "" + opacity;
	h1.style.top = dist;
}