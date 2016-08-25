var width = 960;
var height = 540;

var blocks = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

var colors = [
	null,
	'rgba(240, 240, 240, 1.0)',
	'rgba(240, 120, 0, 1.0)',
	'rgba(0, 120, 240, 1.0)',
];

var c = document.getElementById("game_canvas");
var ctx = c.getContext("2d");

var x = 0;

function request_frame() {
	window.requestAnimationFrame(draw); // TODO draw() -> frame()
}

function draw() {
	window.requestAnimationFrame(draw);
	ctx.clearRect(0, 0, width, height);

	for (var y = 0; y < 10; ++y) {
		for (var x = 0; x < 10; ++x) {
			if (blocks[y][x]) {
				ctx.fillStyle = colors[blocks[y][x]];
				ctx.fillRect(x * 32, y * 32, 32, 32);
			}
		}
	}
	x += 5;
	if (x > 800) {
		x = -100;
	}
}

window.requestAnimationFrame(draw);
