var c = document.getElementById('canv');
var $ = c.getContext('2d');

var intLines = 22;
var backgroundColor = "#000";
var startGradientColor = "#9fd446";
var endGradientColor = "#00d4ff";
var time = 0;
var changeTime = 0.5

var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;

// Test change color Gradient
// var grd = $.createLinearGradient(0,150,150,0);
// var grd = $.createLinearGradient(h, 0, w, 0);
// grd.addColorStop(0, '#FF3636');
// grd.addColorStop(1 / 4, '#FF9B2D');
// grd.addColorStop(2 / 4, '#FBFF4E');
// grd.addColorStop(3 / 4, '#66FF46');
// grd.addColorStop(4 / 4, '#4BFFD2');

var up = false;
var point = h;
var speed = 2;

var draw = function (a, b, t) {
  var grd = $.createLinearGradient(h, h, w - h, 0);
  grd.addColorStop(0, startGradientColor);
  grd.addColorStop(1, endGradientColor);

  $.lineWidth = 0.8;
  //background color
  $.fillStyle = backgroundColor;
  $.fillRect(0, 0, w, h);
  //i sets the number of lines
  for (var i = 0; i < intLines; i++) {
    $.strokeStyle = grd;
    $.beginPath();
    $.moveTo(-0, h - point);
    for (var j = 0; j < w; j += 0.5) {
      var start = 60 * Math.sin(i / 100) + j + 0.008 * j * j;
      var end = Math.floor(h - point + j / 1.5 * Math.sin(j / 50 - t / 50 - i / 6) + (i * 3) * Math.sin(j / 25 - (i + t) / 65));
      $.lineTo(start, end);
    };
    $.stroke();
  }
}

var changeRunPoint = function () {
  if (up == true && point <= h) {
    point += speed

    if (point >= h) {
      up = false;
    }
  } else {
    up = false
    point -= speed;

    if (point <= 0) {
      up = true;
    }
  }
}

var run = function () {
  time += changeTime;
  draw(33, 52 * Math.sin(time / 2400), time);
};

function livelyPropertyListener(name, val) {
  switch (name) {
    case "intLines":
      intLines = val;
      break;
    case "backgroundColor":
      backgroundColor = val;
      break;
    case "startGradientColor":
      startGradientColor = val;
      break;
    case "endGradientColor":
      endGradientColor = val;
      break;
    case "t":
      changeTime = val / 10;
      break;
    case "speed":
      speed = val;
      break;
    default:
      break;
  }
}

//basic UI and ruyn code
window.requestAnimationFrame(() => {
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
});

window.setInterval(changeRunPoint, 5);
window.setInterval(run, 5);