var Vector = function(x, y) {
	this.x = x;
	this.y = y;
}

Vector.prototype = {
	isub: function(other) {
		this.x -= other.x;
		this.y -= other.y;
		return this;
	},
	sub: function(other) {
		return new Vector(
			this.x - other.x,
			this.y - other.y
		);
	},
	iadd: function(other) {
		this.x += other.x;
		this.y += other.y;
		return this;
	},
	add: function(other) {
		return new Vector(
			this.x + other.x,
			this.y + other.y
		);
	},

	imul: function(scalar) {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	},
	mul: function(scalar) {
		return new Vector(
			this.x * scalar,
			this.y * scalar
		)
	},
	idiv: function(scalar) {
		this.x /= scalar;
		this.y /= scalar;
		return this;
	},
	div: function(scalar) {
		return new Vector(
			this.x / scalar,
			this.y / scalar
		)
	},

	normalized: function() {
		var x=this.x, y=this.y;
		var length = Math.sqrt(x*x + y*y);
		if(length > 0) {
			return new Vector(x/length, y/length);
		}
		else{
			return new Vector(0, 0);
		}
	},
	normalize: function() {
		var x=this.x, y=this.y;
		var length = Math.sqrt(x*x + y*y);
		if(length > 0) {
			this.x = x/length;
			this.y = y/length;
		}
		return this;
	},

	length: function() {
		return Math.sqrt(this.x*this.x + this.y*this.y);
	},

	distance: function(other) {
		var x = this.x - other.x;
		var y = this.y - other.y;
		return Math.sqrt(x*x + y*y);
	},

	copy: function() {
		return new Vector(this.x, this.y);
	},
	zero: function() {
		this.x = 0;
		this.y = 0;
	}
}

var Point = function(x, y) {
	this.position = new Vector(x, y);
	this.previous = new Vector(x, y);
	this.acceleration = new Vector(0, 0);
}

Point.prototype = {
	accelerate: function(vector) {
		this.acceleration.iadd(vector);
	},
	correct: function(vector) {
		this.position.iadd(vector);
	},
	simulate: function(delta) {
		this.acceleration.imul(delta*delta);
   
		var position = this.position.mul(2).sub(this.previous).add(this.acceleration);

		this.previous = this.position;
		this.position = position;
		this.acceleration.zero();
	},
	draw: function(ctx) {
		ctx.fillStyle = 'rgba(0, 240, 0, 1.0)';
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, 12, 0, Math.PI * 2, false);
		ctx.fill();
	},
}

var width = 960;
var height = 540;

var blocks = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 3, 3, 1, 1, 0],
	[0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

var colors = [
	null,
	'rgba(240, 240, 240, 1.0)',
	'rgba(240, 120, 0, 1.0)',
	'rgba(0, 120, 240, 1.0)',
];

var c;
var ctx;

function init() {

}

function update() {

}

function keyDown(e) {
	var keyCode = e.keyCode;
}

function draw() {
	window.requestAnimationFrame(draw);
	ctx.clearRect(0, 0, width, height);

	var p = new Point(100, 100);
	p.draw(ctx);

	for (var y = 0; y < 20; ++y) {
		for (var x = 0; x < 20; ++x) {
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

function request_frame() {
	window.requestAnimationFrame(loop);
}

function loop() {
	update();
	draw();
	request_frame();
}

function main() {
	c = document.getElementById("game_canvas");
	ctx = c.getContext("2d");
	c.width = width;
	c.height = height;
	
	init();
	request_frame();
}

main();
window.addEventListener("keydown", this.keyDown, false);