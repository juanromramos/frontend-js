
var cambiando = false;
var elemento_hammer = document.querySelector(".container");
var mc = new Hammer(elemento_hammer);
mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
mc.on("swipeup", abajo);
mc.on("swipedown", arriba);

function arriba() {
	if (!cambiando) {
		cambiando = true;
		var velocidad = parseInt($(".velocidad")[0].value);
		var se_mueve = false;
		var tipo = String($(".tipo:checked")[0].value);
		var divs = $(".midiv");
		var docu_y = $(".container").scrollTop();
		for (var i = divs.length-1; i >= 0; i--) {
			var div_y = $(".midiv:eq("+i+")").height()*i;
			if (docu_y > div_y) {
				se_mueve = true;
				$(".container").animate({scrollTop: div_y}, velocidad, tipo).promise().then(function() {cambiando = false;});
				break;
			}
		}
		cambiando = se_mueve;
	}
}

function abajo() {
	if (!cambiando) {
		cambiando = true;
		var se_mueve = false;
		var velocidad = parseInt($(".velocidad")[0].value);
		var tipo = String($(".tipo:checked")[0].value);
		var divs = $(".midiv");
		var docu_y = $(".container").scrollTop();
		for (var i = 0; i < divs.length; i++) {
			var div_y = $(".midiv:eq("+i+")").height()*i;
			if (docu_y < div_y) {
				se_mueve = true;
				$(".container").animate({scrollTop: div_y}, velocidad, tipo).promise().then(function() {cambiando = false;});
				break;
			}
		}
		cambiando = se_mueve;
	}
}
