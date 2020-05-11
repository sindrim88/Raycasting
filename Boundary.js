function Boundary(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}
Boundary.prototype.x1;
Boundary.prototype.x2;
Boundary.prototype.y1;
Boundary.prototype.y2;

var boundary = new Boundary(); 

Boundary.prototype.show = function(){

    for (var i = 0; i < walls.length; i++) {
      g_ctx.beginPath();
      g_ctx.strokeStyle = 'white';
      g_ctx.lineWidth = 3;
      // Staring point (10,45)
      g_ctx.moveTo(walls[i].x1, walls[i].y1);
      // End point (180,47)
      g_ctx.lineTo(walls[i].x2, walls[i].y2);
      // Make the line visible
      g_ctx.stroke();
      g_ctx.closePath();
    }
}

