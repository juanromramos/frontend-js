"use strict"
var slide2_textos = [[],
		["PASO 1", "SOMOS PUBLICIDAD"],
		["PASO 2", "SOMOS COMUNICACIÓN"],
		["PASO 3", "SOMOS ESTRATEGIA"]],
	slide2_color = "rgb(58, 67, 75)",
	porcentaje_tiempo = 0,
	n_slide_actual = 1,
	n_mueve_fondo = 0,

	barras_tiempo_interval,
	anima_fondo_interval,

	mediaquery = window.matchMedia("(min-width: 31em)"),
	cambiando = false;

$(document).ready(function(){
	$(".slide2-boton").click(avanzaSlide);
	$(".slide2-list:nth-child(1)").click(function() { avanzaSlide(1); });
	$(".slide2-list:nth-child(2)").click(function() { avanzaSlide(2); });
	$(".slide2-list:nth-child(3)").click(function() { avanzaSlide(3); });
	$(".slide2-list:nth-child(" + n_slide_actual + ")").addClass("selec");

	barras_tiempo_interval = setInterval(barrasTiempo, 30);
	compruebaQuery();
});

function cambiaSlide2(n) {
	if (!cambiando) {
		cambiando = true;

		n_slide_actual = n;
		n_slide_actual < 1 ? n_slide_actual = 3 : null;
		n_slide_actual > 3 ? n_slide_actual = 1 : null;
		abreDivSuperior(1);
		clearInterval(anima_fondo_interval);
		$(".slide2-inf-textos > :eq(0)").toggleClass("fadeIn");
		$(".slide2-inf-textos > :eq(1), .slide2-inf-textos > :eq(2), .slide2-inf-textos :eq(3)").toggleClass("fadeInUp");
		setTimeout(function(){
			cambiaTextosDiv();
			cambiaImagenDiv("inf");
			abreDivSuperior(0);
			$(".slide2-inf-textos > :eq(0)").toggleClass("fadeIn");
			$(".slide2-inf-textos > :eq(1), .slide2-inf-textos > :eq(2), .slide2-inf-textos :eq(3)").toggleClass("fadeInUp");
			barras_tiempo_interval = setInterval(barrasTiempo, 30);
			porcentaje_tiempo = 0;
			$(".slide2-timeline-progres").css({"transition" : "none"});
			compruebaQuery();

			cambiando = false;
		}, 1000);
	}
}

function barrasTiempo() {
	if (porcentaje_tiempo <= 100) {
		$(".slide2-timeline-progres").css({"width" : porcentaje_tiempo + "%"});
		porcentaje_tiempo = porcentaje_tiempo + 0.5;		
	} else {
		avanzaSlide();
	}
}

function avanzaSlide(e) {
	if (!cambiando) {
		clearInterval(barras_tiempo_interval);
		$(".slide2-timeline-progres").css({
			"transition" : "1s ease-in-out",
			"width" : "0%"});
		$(".slide2-list:nth-child(" + n_slide_actual + ")").removeClass("selec");
		if (e) {
			if ($.isNumeric(e)) {
				cambiaSlide2(e);
			} else {
				var dir = e.target.className.slice(-3) == "izq" ? cambiaSlide2(--n_slide_actual) : cambiaSlide2(++n_slide_actual);
			}			
		} else { cambiaSlide2(++n_slide_actual); }
		$(".slide2-list:nth-child(" + n_slide_actual + ")").addClass("selec");
	}
}

function abreDivSuperior(dir) {
	$(".slide2-cont-superior").css({"transition": "none"});
	dir == true && cambiaImagenDiv("sup");
	dir == true && $(".slide2-cont-superior").css({"transition": "width 1s cubic-bezier(1, 0.01, 0.57, 0.93)"});
	$(".slide2-cont-superior").css({"opacity": dir, "width": dir*100 + "%"});
}

function animaFondoDiv() {
	$(".slide2-inf-der").css({"background-position" : n_mueve_fondo});
	n_mueve_fondo--;
}

function cambiaTextosDiv() {
	$(".slide2-inf-textos > h4").html(slide2_textos[n_slide_actual][0]);
	$(".slide2-inf-textos > h2").html(slide2_textos[n_slide_actual][1]);
}

function cambiaImagenDiv(div) {
	$(".slide2-" + div + "-izq").css({"background-color" : slide2_color});
	$(".slide2-" + div + "-der").css({
		"background" : "url('img/slider2-0" + n_slide_actual + ".jpg')",
		"background-size" : "cover",
		"background-position" : "0 0"
	});
}

function compruebaQuery() {
	if (mediaquery.matches) {
		n_mueve_fondo = 0;
		anima_fondo_interval = setInterval("animaFondoDiv()", 100);
	}
}