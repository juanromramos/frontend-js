"use strict";
cuandoEsteListo(inicio);

function inicio() {
	var tiempoParrafos = [10.0, 30.0, 45.0, 50.5, 60.0, 70.5, 90.0, 105.0, 110.0];

	// Contenido de hgroup, audio, menu
	// y la barra de progreso de la canción
	var articulo = document.getElementsByTagName('article')[0];
	document.body.style.width = 'initial';
	articulo.style.width = '500px';
	articulo.style.margin = '0 auto';

	var titulo = document.createElement('h1');
	titulo.appendChild(document.createTextNode('(There she goes) I wish her well'));
	document.getElementsByTagName('hgroup')[0].appendChild(titulo);
	var autor = document.createElement('h3');
	autor.innerHTML = 'por Don Gibson</br><i><span style="font-size: 16px;">incluído en "Don Gibson sings Hank Williams"</span></i>';
	document.getElementsByTagName('hgroup')[0].appendChild(autor);

	var cancion = document.getElementsByTagName('audio')[0];
	var cancionMp3 = document.createElement('source');
	cancion.appendChild(cancionMp3);
	cancionMp3.setAttribute('src', 'audio/audio.mp3');
	cancionMp3.setAttribute('type', 'audio/mpeg');
	var cancionOgg = document.createElement('source');
	cancion.appendChild(cancionOgg);
	cancionOgg.setAttribute('src', 'audio/audio.ogg');
	cancionOgg.setAttribute('type', 'audio/ogg');


	document.getElementsByTagName('menu')[0].style.textAlign = 'center';
	var botonPlay = document.createElement('li');
	botonPlay.innerHTML = 'REPRODUCIR';
	botonPlay.style.width = '106px';
	botonPlay.style.paddingLeft = '20px';
	botonPlay.style.backgroundImage = 'url(img/icon-play.png)';
	botonPlay.style.backgroundRepeat = 'no-repeat';
	botonPlay.style.backgroundPosition = '2px';
	botonPlay.style.backgroundSize = '20px';
	document.getElementsByTagName('menu')[0].appendChild(botonPlay);

	var botonReplay = document.createElement('li');
	botonReplay.innerHTML = 'REINICIAR';
	botonReplay.style.width = '106px';
	botonReplay.style.paddingLeft = '20px';
	botonReplay.style.backgroundImage = 'url(img/icon-rewind.png)';
	botonReplay.style.backgroundRepeat = 'no-repeat';
	botonReplay.style.backgroundPosition = '5px';
	botonReplay.style.backgroundSize = '20px';
	document.getElementsByTagName('menu')[0].appendChild(botonReplay);


	var contenedorBarra = document.createElement('div');
	contenedorBarra.style.border = '1px solid orange';
	contenedorBarra.style.maxWidth = '150px';
	contenedorBarra.style.width = '150px';
	contenedorBarra.style.height = '20px';
	contenedorBarra.style.margin = '15px auto';
	document.getElementsByTagName('menu')[0].appendChild(contenedorBarra);
	var barra = document.createElement('div');
	barra.style.backgroundColor = 'lightgray';
	barra.style.maxWidth = '150px';
	barra.style.width = '1px';
	barra.style.height = '20px';
	contenedorBarra.appendChild(barra);

	// Recorre las estrofas y reemplaza el caracter '\n' por '</br>'
	// y añade los 'listeners' para cambiar de estrofa
	var poema = document.getElementsByTagName('p');
	for (var i = 0; i < poema.length; i++) {
		poema[i].style.transition = '1s';
		poema[i].setAttribute('id', i);
		poema[i].innerHTML = poema[i].innerHTML.replace(/\n/g,'</br>');

		if(document.addEventListener) {
			poema[i].addEventListener("click", fPonEstrofa, true);
		} else {
			poema[i].attachEvent("onclick", fPonEstrofa, true);
		}
	}

	// Añade los eventos de los botones de control y teclado
	// uno que comprueba la posición actual de la canción
	// y otro para el control de la canción por medio de la barra
	if(document.addEventListener) {
		botonPlay.addEventListener("click", fPlay);
		botonReplay.addEventListener("click", fReplay);
		document.addEventListener("keydown", teclado);
		cancion.addEventListener('timeupdate', fContador);
		barra.addEventListener('mousedown', alliAbajo, false);
	} else {
		botonPlay.attachEvent("onclick", fPlay);
		botonReplay.attachEvent("onclick", fReplay);
		window.attachEvent("onkeydown", teclado);
		cancion.attachEvent('timeupdate', fContador);
		barra.attachEvent('mousedown', alliAbajo, false);
	}

	// Funciones de los botones 'Reproducir' y 'Reiniciar'
	function fPlay() {
		if (botonPlay.innerHTML == 'REPRODUCIR') {
			cancion.play();
			botonPlay.style.backgroundImage = 'url(img/icon-pause.png)';
			botonPlay.style.backgroundPosition = '8px';
			botonPlay.innerHTML = 'PAUSAR';
		} else {
			cancion.pause();
			botonPlay.style.backgroundImage = 'url(img/icon-play.png)';
			botonPlay.style.backgroundPosition = '2px';
			botonPlay.innerHTML = 'REPRODUCIR';
		}
	}

	function fReplay() {
		cancion.currentTime = 0;
		cancion.play();
		fPonNegrita();
		if (botonPlay.innerHTML == 'REPRODUCIR') {
			botonPlay.style.backgroundImage = 'url(img/icon-pause.png)';
			botonPlay.style.backgroundPosition = '8px';
			botonPlay.innerHTML = 'PAUSAR';
		}
	}

	// Función que se activa cada vez que el audio avanza
	// duración audio = 119.6092, cada paso = 0.7973946666666667
	function fContador() {
		var etiquetaOutput = document.getElementsByTagName('output')[0];
		var minutos = Math.floor(cancion.currentTime/60);
		var segundos = (Math.floor(cancion.currentTime))%60;
		var tiempo = '';
		minutos > 0 ? tiempo += minutos + ':' + segundos : tiempo += segundos;
		etiquetaOutput.innerHTML = tiempo;

		barra.style.width = cancion.currentTime*1.2540841339963815 + 'px';
		fControlaTiempo();
	}

	// Función encargada de controlar en qué segundo se encuentra el audio
	function fControlaTiempo() {
		if (cancion.currentTime < tiempoParrafos[0]) {
			fPonNegrita();
		} else {
			for (var i = 0; i < tiempoParrafos.length; i++) {
				cancion.currentTime >= tiempoParrafos[i] ? fPonNegrita(i) : null;
			}
		}
	}

	// Función que se encarga de resaltar el párrafo que esté sonando
	function fPonNegrita(n) {
		for (var i = 0; i < poema.length; i++) {
			poema[i].style.fontWeight = 'normal';
			poema[i].style.backgroundColor = 'white';
		}

		if (n != undefined) {
			poema[n].style.fontWeight = 'bold';
			poema[n].style.backgroundColor = 'lightpink';
		}
	}

	// Función encargada de cambiar de estrofa el audio
	function fPonEstrofa(e) {
		cancion.currentTime = tiempoParrafos[e.target.getAttribute('id')];
	}

	// Función encargada de la gestión del teclado
	function teclado(e) {
		if (e.keyCode == 32) {
			e.preventDefault();
			fPlay();
		} else if (e.keyCode == 8 || e.keyCode == 82) {
			e.preventDefault();
			fReplay();
		}
	}

	// Funciones encargadas de la barra de reproducción del audio
	var ultimaX;
	function alliAbajo(e) {
		if (e.which == 1) {
			if (!cancion.paused) {
				fPlay();
			}
			ultimaX = e.pageX;
			this.addEventListener('mousemove', seMueve, false);
			e.preventDefault();
		}
	}

	function seMueve(e) {
		if (botonPulsado(e)) {
			var dist = e.pageX - ultimaX;
			var ancho = parseInt(this.style.width) + dist;
			ultimaX = e.pageX;
			this.style.width = ancho + "px";
		} else {
			cancion.currentTime = (parseFloat(barra.style.width)/1.2540841339963815);
			fPlay();
			this.removeEventListener('mousemove', seMueve);
		}
	}

	function botonPulsado(e) {
		if (e.button == null) {
			return e.buttons = 0;
		} else {
			return e.buttons !=0;
		}
	}
}
