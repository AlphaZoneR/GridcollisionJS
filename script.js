var Vector = function(x, y) {
	this.x = x;
	this.y = y;
}
var keys = [false,false,false,false];

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
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
	[1,	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

var colors = [
	null,
	'rgba(240, 240, 240, 1.0)',
	'rgba(240, 120, 0, 1.0)',
	'rgba(0, 120, 240, 1.0)',
];

var c;
var ctx;

function Timer() {
	return new Date().getTime() / 1000;
}

var old = Timer();

var p = new Point(50, 100);
//p.previous.x -= 1;

function init() {
}

function update() {
	var now = Timer();
	var tick = now - old;
	old = now;
	//keys = [false,false,false,false];
	p.accelerate(new Vector(0, 200.0));
	//p.simulate(0.00001);
	if(keys[0]){
		//console.log("left");
		keys[0] = false;
		p.previous.x += 1;
	}else if(keys[2]){
		//console.log("rigth");
		keys[2] = false;
		p.previous.x -= 1;
	}

	if(keys[1]){
		//console.log("up");
		keys[1] = false;
		p.previous.y += 1;
	}else if(keys[3]){
		//console.log("down");
		keys[3] = false;
		p.previous.y -= 1;
	}
	var n = 4;
	for (var i = 0; i < n; ++i) {
		p.simulate(tick);
		var tx = Math.floor((p.position.x) / 32);
		var ty = Math.floor((p.position.y + 12) / 32);
		if (blocks[ty][tx]) {
			p.position.y = ty * 32 - 12;
		}
		var tx1 = Math.floor((p.position.x + 12) / 32);
		var ty1 = Math.floor((p.position.y) / 32);
		if(blocks[Math.abs(tx1)][Math.abs(ty1)]){
			p.position.x = Math.abs(tx1) * 32 - 12;
		}

		var tx2 = Math.floor((p.position.x) / 32);
		var ty2 = Math.floor((p.position.y - 12) / 32)
		if(blocks[Math.abs(tx2)][Math.abs(ty2)]){
			p.position.y = Math.abs(ty2) * 32 + 12;
		}
		var tx3 = Math.floor((p.position.x - 12) / 32);
		var ty3 = Math.floor((p.position.y) / 32);
		if(blocks[Math.abs(tx3)][Math.abs(ty3)]){
			p.position.x = Math.abs(tx1) * 32 + 12;
		}
		//console.log(tx1 + " " + ty1);
	}
}
function keyDown(e) {
	
	var keyCode = e.keyCode;
	console.log(keyCode);
	if(keyCode == 37){
		keys[0] = true;
	}
	if(keyCode == 38){
		keys[1] = true;
	}
	if(keyCode == 39){
		keys[2] = true;
	}
	if(keyCode == 40){
		keys[3] = true;
	}
}

function draw() {
	window.requestAnimationFrame(draw);
	ctx.clearRect(0, 0, width, height);

	p.draw(ctx);

	for (var y = 0; y < 20; ++y) {
		for (var x = 0; x < 20; ++x) {
			if (blocks[y][x]) {
				ctx.fillStyle = colors[blocks[y][x]];
				ctx.fillRect(x * 32, y * 32, 32, 32);
			}
		}
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