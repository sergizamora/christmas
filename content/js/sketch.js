var numBalls = 50;
var spring = 0.005;
var gravity = 0.5;
var friction = -0.25;
var balls = [];
var positionCursorX = 0;
var positionCursorY = 0;

function setup() {
	var canvas = createCanvas(300, 300);

  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('ball');
  for (var i = 0; i < numBalls; i++) {
  	balls[i] = new Ball(
  		random(width*0.25,width*1.50),
  		random(height*0.25,height*1.50),
  		25,
  		i,
  		balls
  		);

  }
}

function draw() {
	clear();
	fill("white");
	noStroke();

	balls.forEach(ball => {
		ball.move();
		ball.collide();
		ball.display();

	});

	if (mouseX < -150){
		positionCursorX = 0;
	}else if(mouseX > 300){
		positionCursorX = 1;
	}
	if (mouseY > -150){
		positionCursorY = 0;
	}else if(mouseY < 300){
		positionCursorY = 1;
	}
	
	noFill();
	stroke(0, 0, 0);
	strokeWeight(10);
	ellipse(width/2, height/2, width, width);

}

function Ball(xin, yin, din, idin, oin) {
	this.x = xin;
	this.y = yin;
	var vx = 0;
	var vy = 0;
	this.diameter = din;
	this.id = idin;
	this.others = oin;

	this.move = function() {
		
		if (positionCursorY == 0){
			vy -= -gravity;
		}else{
			vy -= gravity;
		}

		this.x += vx;
		this.y += vy;
		var rad = width/2;
		var d = int(dist(this.x, this.y, rad, rad));
		if (positionCursorX == 0){
			this.x = this.x + 2;
		}else{
			this.x = this.x - 2;
		}

		if (d+this.diameter/2 >= rad && this.y + this.diameter >= rad) {
			this.y = this.y - 2;
			vy *= friction;
		}if (d-this.diameter/2 >= rad && this.y + this.diameter <= rad){
			this.y = this.y + 2;
			vy *= -friction;
		}
		if (d+this.diameter/2 >= rad && this.x + this.diameter >= rad){
			this.x = this.x - 2;
			vx *= friction;
		}if (d-this.diameter/2 >= rad && this.x + this.diameter <= rad){
			this.x = this.x + 2;
			vx *= -friction;
		}	

		



		
	}


	this.collide = function() {
		for (var i = this.id + 1; i < numBalls; i++) {
      // console.log(others[i]);
      var dx = this.others[i].x - this.x;
      var dy = this.others[i].y - this.y;
      var distance = sqrt(dx * dx + dy * dy);
      var minDist = this.others[i].diameter;
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        var angle = atan2(dy, dx);
        var targetX = this.x + cos(angle) * minDist;
        var targetY = this.y + sin(angle) * minDist;
        var ax = (targetX - this.others[i].x) * spring;
        var ay = (targetY - this.others[i].y) * spring;
        vx -= ax/2;
        vy -= ay/2;
    }
}
}


this.display = function() {
	ellipse(this.x, this.y, this.diameter, this.diameter);
}
};