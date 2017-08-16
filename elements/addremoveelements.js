
  //document.addEventListener("DOMContentLoaded", function() {
     var lista = document.getElementById('lista');

     //[].forEach.call(lista.children, function(hijo) {
     Array.prototype.forEach.call(lista.children, function(hijo) {
     	console.log(hijo);
        hijo.addEventListener('click', agregarElemento, false);
        hijo.addEventListener('contextmenu', eliminarme, false);
     });


     function eliminarme(evt) {
      //setTimeout(function() {
        if (lista.children.length > 1) {
		  evt.target.addEventListener('transitionend', function(){lista.removeChild(evt.target);}, false);
		  evt.target.style.transition = 'transform 0.4s ease-in, opacity 0.4s ease-in';
		  evt.target.style.opacity = '0.1';
		  evt.target.style.transform = 'rotateX(-90deg)';
		}
      //}, 150);
      evt.preventDefault();
     }

     function agregarElemento(evt) {
       //setTimeout(function() {
        var hijoNuevo = evt.target.cloneNode(true);
        hijoNuevo.innerHTML = 'Elemento Nuevo';
        hijoNuevo.style.backgroundColor = unColor();
        hijoNuevo.addEventListener('click', agregarElemento, false);
        hijoNuevo.addEventListener('contextmenu', eliminarme, false);

		hijoNuevo.style.opacity = '0';
		hijoNuevo.style.transformOrigin = '50% 50%';
		hijoNuevo.style.transform = 'rotateX(-90deg)';
		hijoNuevo.style.transition = 'transform 0.4s ease-in, opacity 0.4s ease-in';
        lista.insertBefore(hijoNuevo,evt.target.nextElementSibling);
		setTimeout(function(){
			hijoNuevo.style.opacity = '1';
			hijoNuevo.style.transform = 'rotateX(0deg)';
		}, 10);
      //}, 150);

      evt.preventDefault();
     }


    function unColor() {
      var colores = ["#66ff66", "#33ccff", "#ff0066", "#ccff33", "#0000ff", "#ff9966", "#ff99ff", "#009999", "#996633", "#33cccc"];
      var color = colores[Math.floor(Math.random()*colores.length)];

      return color;
    }

  //}, false);
