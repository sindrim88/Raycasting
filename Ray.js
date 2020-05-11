function Ray(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

var num;
var den;
var x3;
var x4;
var y3;
var y4;
var u;
var t;
var px = -10000;
var py = -10000;
var d;
var c;
var temp1;
var temp2;

Ray.prototype.update = function(){
	// Reset all the rays to current position before checking them all again
	for (var i = 0; i < 1440; i += 1) {
		rays[i].posX1 = g_mouseX;
		rays[i].posY1 = g_mouseY;
		
		rays[i].posX2 = rays[i].posX1 + Math.cos((i/4)*Math.PI/180)*1000;
		rays[i].posY2 = rays[i].posY1 + Math.sin((i/4)*Math.PI/180)*1000;
		rays[i].dist = 10000;
    }
    

    // Check every ray against every walls
    // Super inefficient but works for this coding challenge
    // Would be better to check only the rays on the edges of the walls, then update the rays in between those points
	for (var i = 0; i < walls.length; i++) {

		//console.log(x1,x2,y1,y2);
	    for (var j = 0; j < rays.length; j++) {
	    	
			//Reset px,py to somewhere out of canvas then check again
	    	px = -10000;
    		py = -10000;
    		x3 = rays[j].posX1;
			x4 = rays[j].posX2;	
			y3 = rays[j].posY1;
			y4 = rays[j].posY2;

	      	x1 = walls[i].x1;
	      	y1 = walls[i].y1;

	      	x2 = walls[i].x2;
	      	y2 = walls[i].y2;

	      	//Line to line intersection math...
		    num = (x1-x2)*(y1-y3) - (y1-y2)*(x1-x3);
		    den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

		    if(den === 0){
				return;
			}
			//Line to line intersection math...
		    u =  -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;;
		    t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;

		    if(t > 0 && t < 1 && u > 0){
				
				px = x1 + t * (x2 - x1);
				py = y1 + t * (y2 - y1);

		    	temp1 = (px - rays[j].posX1);
		    	temp2 = (py - rays[j].posY1);

		    	c = (temp1*temp1) + (temp2*temp2);
		    	d = Math.sqrt(c);

		    	if(d < rays[j].dist){
		    		rays[j].dist = d;
		    		rays[j].posX2 = px;
		    		rays[j].posY2 = py;
		    	}
			}
		}
	}
}

Ray.prototype.show = function(){
    for (var i = 0; i < rays.length; i++) {
    	g_ctx.save();
	 	g_ctx.beginPath(); 
        g_ctx.strokeStyle = 'white';
        g_ctx.strokeStyle = 1;
	    // Staring point 
	    g_ctx.moveTo(rays[i].posX1, rays[i].posY1);
	    // End point 
	    g_ctx.lineTo(rays[i].posX2 , rays[i].posY2);
	    // Make the line visible
	    g_ctx.globalAlpha = 0.8;
	    g_ctx.lineWidth = 0.25;
	    g_ctx.stroke();
	    g_ctx.closePath();
		g_ctx.restore();
	}
}
