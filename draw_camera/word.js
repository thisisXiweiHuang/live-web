var myArray = ['yellow', 'gross', 'school', 'boy', 'work', 'cool', 'car', '42', 'yes', 'love', 'no', 'broken', 'space', 'boring' ];

var output = document.getElementById("result");
var randGen = function () {
  	
  	output.innerHTML = " ";
  
  	var randi = myArray[Math.round(Math.random() * (myArray.length - 1))];

    output.innerHTML = randi;
};

var Reset = function() {
  output.innerHTML = " ";
};