var display = 0;//the value currently displayed
var sum = 0;
var operand = 0;
var enteringNumber = 0; //the number the user is currently entering

var memory = 0;//the value in memory

var decimalPoint = false;
var tempDisplay = false;


var plus = function(previous, current){
	return fitToSize(previous + current)
};
var minus = function(previous, current){
	return fitToSize(previous - current)
};
var times = function(previous, current){
	return fitToSize(previous * current)
};
var divide = function(previous, current){
	return fitToSize(previous / current)
};
var noFunction = function(previous, current){
	return fitToSize(current)
};

var operator = noFunction;

var operatorPressed = function(type, strType){
	console.log("pressed the " + strType + " button")
	if(tempDisplay === false){//this means that a value has been entered, and that is the new operator
		operand = enteringNumber;
		sum = operator(sum, operand);
	}
	operator = type;
	tempDisplay = true;
	decimalPoint = false;
	updateDisplay();
};

var numberPressed = function(n){
	console.log('pressed ' + n)
	if(tempDisplay === true){
		enteringNumber = 0;
	}
	tempDisplay = false;
	if(n < 9 || n > 0){//Make sure that the value is a legal one
		if(enteringNumber < Math.pow(10, 7)){//Eight is the number of displayable digits on a normal calculator
			if(decimalPoint === false){
				enteringNumber*=10;//Move all the other numbers over and add the number pressed
				enteringNumber+=n;
			}
			else{
				var displayString = enteringNumber.toString().replace('-','');
				var pointIndex = displayString.indexOf('.')
				if(pointIndex === -1){
					pointIndex = 0;
				}
				var digitPlace = displayString.length - pointIndex;//determines the negative exponent that the value must be raised to, in order to append it to the end of the display value
				enteringNumber += n / Math.pow(10, digitPlace);
			};
		}
	}
	updateDisplay();
}

var eq = function(){
	console.log("pressed eq");
	if(tempDisplay === false){
		operand = enteringNumber;
	};
	sum = operator(sum, operand);
	tempDisplay = true;
	decimalPoint = false;
	operand = 0;
	operator = noFunction;
	updateDisplay();
	enteringNumber = 0;
}

var clear = function(){
	display = 0;
	sum = 0;
	operand = 0;
	operator = noFunction;
	decimalPoint = false;
	enteringNumber = 0;
}

var fitToSize = function (n){
	//If the function is longer than eight digits, returns an overflow error
	if(Math.abs(n) > Math.pow(10, 8) - 1){
		clear();
		return "Overflow";
	}
	else{
		return n;
	};
}

var updateDisplay = function(){
	if(tempDisplay === true){
		display = sum;
	}
	else{
		display = enteringNumber;
	}
	console.log("\tdisplay: " + display + " operand: " + operand + " sum: " + sum + " enteringNumber: " + enteringNumber);
	display = fitToSize(display);
	text = display.toString();
	offset = 0;
	if(display<0){offset++;};
	if(text.search(".") > 0){offset++;};
	text = text.substr(0,8+offset);
	/*if(text.search(".")>0){

		if(text.endsWith('.')){
			text.slice(0,9+offset)
		}
	}*/
	$("#display").text(text);
};


$(document).ready(function(){
	$("#0").click(function(){
		numberPressed(0);
	});
	$("#1").click(function(){
		numberPressed(1);
	});
	$("#2").click(function(){
		numberPressed(2);
	});
	$("#3").click(function(){
		numberPressed(3);
	});
	$("#4").click(function(){
		numberPressed(4);
	});
	$("#5").click(function(){
		numberPressed(5);
	});
	$("#6").click(function(){
		numberPressed(6);
	});
	$("#7").click(function(){
		numberPressed(7);
	});
	$("#8").click(function(){
		numberPressed(8);
	});
	$("#9").click(function(){
		numberPressed(9);
	});
	$("#eq").click(function(){
		eq();
	});
	$("#plus").click(function(){
		operatorPressed(plus, "plus");
	});
	$("#minus").click(function(){
		operatorPressed(minus, "minus");
	});
	$("#divide").click(function(){
		operatorPressed(divide, "divide");
	});
	$("#times").click(function(){
		operatorPressed(times, "times");
	});
	$("#clear").click(function(){
		console.log("clear");
		clear();
		updateDisplay();
	});
	$("#mplus").click(function(){
		memory += display;
		updateDisplay();
	});
	$("#mminus").click(function(){
		memory -= display;
		updateDisplay();
	});
	$("#mrc").click(function(){
		display = memory;
		memory = 0;
		updateDisplay();
	});
	$("#point").click(function(){
		decimalPoint=true;
	});
});