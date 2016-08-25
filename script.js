var c = document.getElementById("game_canvas");
var ctx = c.getContext("2d");

var x = 0;

function draw() {
	window.requestAnimationFrame(draw);
	ctx.clearRect(0, 0, 800, 600);
	ctx.fillRect(x, 20, 150, 100);
	x += 5;
	if (x > 800) {
		x %= 800;
	}
}

window.requestAnimationFrame(draw);