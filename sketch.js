var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

var walls = [];
var ray;
var KEY_PAUSE = 'P'.charCodeAt(0);
var g_pause = false;

function update(){

	if(shouldSkipUpdate()) return;

	Ray.prototype.update();
}

function draw(){

	//background and clear background
	g_ctx.clearRect(0, 0, g_canvas.width, g_canvas.height);
	g_ctx.fillStyle = "black";
	g_ctx.fillRect(0, 0, g_ctx.canvas.width, g_ctx.canvas.height);
	Boundary.prototype.show();
	Ray.prototype.show();
}

function shouldSkipUpdate() {
	  if (eatKey(KEY_PAUSE)) {
        g_pause = !g_pause;
    }
    return g_pause;
}

function setup(){
	for (var i = 0; i < 5; i++){

		//Math.floor(Math.random()*(max-min+1)+min);
		var x1 = Math.floor(Math.random() * (g_canvas.width - 1) + 1);
		var x2 = Math.floor(Math.random() * (g_canvas.width - 1) + 1);
		var y1 = Math.floor(Math.random() * (g_canvas.height - 1) + 1);
		var y2 = Math.floor(Math.random() * (g_canvas.height - 1) + 1);
	
		
		this.walls.push( 
			new Boundary({
				x1 : x1,
				y1 : y1,
				x2 : x2,
				y2 : y2,
			})
		);
	}

	this.walls.push(
		new Boundary({
			x1 : 0,
			y1 : 0,
			x2 : g_canvas.width,
			y2 : 0,
		})
	);
	this.walls.push(
		new Boundary({
			x1 : 0,
			y1 : 0,
			x2 : 0,
			y2 : g_canvas.height,
		})
	);
	this.walls.push(
		new Boundary({
			x1 : g_canvas.width,
			y1 : 0,
			x2 : g_canvas.width,
			y2 : g_canvas.height,
		})
	);
	this.walls.push(
		new Boundary({
			x1 : 0,
			y1 : g_canvas.height,
			x2 : g_canvas.width,
			y2 : g_canvas.height,
		})
	);
	
	ray = new Ray();
	this.rays = [];
	
	for(var  a = 0; a < 360; a += 0.25){
			this.rays.push(new Ray({
				posX1 : 200, 
				posY1 : 200,
				posX2 : 200 + Math.cos(a*Math.PI/360)*1000,
				posY2 : 200 + Math.sin(a*Math.PI/360)*1000,
				dist  : 10000,
			})
		);	
	}
	main();
};

function main(){
	update();
	draw();
	window.requestAnimationFrame(main);
}

setup();