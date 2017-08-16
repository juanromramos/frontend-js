$(document).ready(function() {
  // var s = $("#jrsclock-second");
  // var m = $("#jrsclock-minute");
  // var h = $("#jrsclock-hour");
  // s.css("transform", "rotate(-90deg)");
  // m.css("transform", "rotate(-90deg)");
  // h.css("transform", "rotate(-90deg)");
  //setHour();
  window.setInterval(function() {setClockHands();}, 1000);
});

function setClockHands() {
  var s = $("#jrsclock-second");
  var m = $("#jrsclock-minute");
  var h = $("#jrsclock-hour");
  var d = new Date();
  var seconds = d.getSeconds();
  var minutes = d.getMinutes();
  var hours = d.getHours();
  s.css("transform", "rotate(" + ((seconds*6)-90) + "deg)");
  m.css("transform", "rotate(" + ((minutes*6)-90) + "deg)");
  h.css("transform", "rotate(" + ((hours*30)-90) + "deg)");
}

/*
function getRotationDegrees(obj) {
  // By TwystO
  // http://stackoverflow.com/a/11840120
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if (matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else {
      var angle = 0;
    }
    return (angle < 0) ? angle + 360 : angle;
}
*/
