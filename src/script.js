var c = document.getElementById('canv');
var $ = c.getContext('2d');

var intLines = 22;
var t = 0;
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;

var grd = $.createLinearGradient(50,250,150,10);
grd.addColorStop(0,"rgba(159,212,70,1)");
grd.addColorStop(1,"rgba(0,212,255,1)");

var up = false;
var point = h;
var speed = 0.5;

var draw = function(a, b, t) {
  $.lineWidth = 0.8;
  //background color
  $.fillStyle = 'black';
  $.fillRect(0, 0, w, h);
  //i sets the number of lines
  for (var i = 0; i < intLines; i++) {
    $.strokeStyle = grd;
    $.beginPath();
    $.moveTo(-0, h - point);
    for (var j = 0; j < w; j += 0.5) {
      var start = 60 * Math.sin(i / 100) + j + 0.008 * j * j;
      var end = Math.floor(h - point + j / 1.5 * Math.sin(j / 50- t / 50 - i / 6) + (i * 3) * Math.sin(j / 25 - (i + t) / 65));
      $.lineTo(start,end);
    };
    $.stroke();
  }
}

var changeRunPoint = function() {
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

var run = function() {
  t += 0.5;
  draw(33, 52 * Math.sin(t / 2400), t);
};

//basic UI and ruyn code
window.requestAnimationFrame(() => {
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
});
window.setInterval(changeRunPoint, 5);
window.setInterval(run, 5);