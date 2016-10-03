	var thecontext;
	var socket = io.connect();
	
	socket.on('connect', function() {
		console.log("Connected");
	});


	var dx = 0;
	var dy = 0;
	
	socket.on('drawing', function(drawingdata) {
		console.log(drawingdata);
		drawing.beginPath();
		drawing.moveTo(dx,dy);
		drawing.lineTo(drawingdata.x, drawingdata.y);
		drawing.stroke();
		dx = drawingdata.x;
		dy = drawingdata.y;
	});
	

	function draw() {
		var px = 0;
		var py = 0;

		var thecanvas = document.getElementById('thecanvas');
		thecanvas.addEventListener('mousemove', 
			function(evt) {
				//console.log(evt);
				drawing.beginPath();
				drawing.moveTo(px,py);
				drawing.lineTo(evt.clientX, evt.clientY);
				drawing.stroke();

				px = evt.clientX;
				py = evt.clientY;

				var thedata = {
					x: evt.clientX,
					y: evt.clientY
				};

				socket.emit('drawing',thedata);

			}
		);

		drawing = thecanvas.getContext('2d');
	}

	window.addEventListener('load', draw);
