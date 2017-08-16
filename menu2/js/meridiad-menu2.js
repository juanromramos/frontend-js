$(document).ready(function(){
	$("#boton-menu").change(
		function(){
			$("#boton-contacto").prop("checked", false);
		}
	);
	$(".cont-main").click(
		function(){
			$("#boton-menu").prop("checked", false);
			$("#boton-contacto").prop("checked", false);
	});
});