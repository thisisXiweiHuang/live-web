var eraseButton;
var canvasone;
var drawing;
var myColor;
var isDrawing;
var dx = 0;
var dy = 0;
var socket = io.connect();

socket.on('connect', function() {
	console.log("Connected");
});

socket.on('drawing', function(drawingdata) {
	console.log(drawingdata);
	drawing.beginPath();
	drawing.moveTo(dx,dy);
	drawing.lineTo(drawingdata.x, drawingdata.y);
	drawing.stroke();
	dx = drawingdata.x;
	dy = drawingdata.y;
});

function init(){
	eraseButton = document.getElementById('eraseButton');
	eraseButton.addEventListener('cilck',erase);
	myColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
	canvasone = document.getElementById('canvasone');
	drawing = canvasone.getContext('2d');
	drawing.lineWidth = 10;
	drawing.lineJoin = drawing.lineCap = 'round';
	socket.emit('getcolor',myColor);
	draw();
}

function draw(){
	drawtheword();
}

function drawtheword() {
	canvasone.onmousedown = function(evt){
		isDrawing = true;
		drawing.moveTo(evt.clientX,evt.clientY);
	};
	canvasone.addEventListener('mousemove',function(evt){
		if(isDrawing){
			drawing.lineTo(evt.clientX - 107, evt.clientY - 172);
			drawing.strokeStyle = myColor;
			drawing.stroke();
			var thedata = {
				x: evt.clientX,
				y: evt.clientY
			};
			socket.emit('drawing',thedata);
			// socket.emit('drawing',thedata);
		}
	});
	drawing.onmouseup = function(){
		isDrawing = false;
	};
}

 function erase(){
        drawing.clearRect(0, 0, 1000, 1000);
        socket.emit('erased', data);
        myColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
}

window.addEventListener('load', init);


  