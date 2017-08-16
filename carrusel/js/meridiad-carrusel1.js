function cambiaSlide(dir) {
	var slides = document.querySelectorAll("input.carrusel1-control");
	for (var n = 0; n < slides.length; n++) {
		if (slides[n].checked) {
			slides[n].checked = false;
			var i = n;
			break;
		}
	}
	if (dir == -1) {
		i == 0 ? i = slides.length-1 : i--;
	} else {
	    i == slides.length-1 ? i = 0 : i++;
	}
	slides[i].checked = true;
}