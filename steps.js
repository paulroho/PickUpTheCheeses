'use strict';

var moveRightStep = function(name) {
	var ctx;
	var name = name;
	var maxMouseLeft;
	var stepLength = 100;
	
	return {
		init: function(context) {
			ctx = context;
			maxMouseLeft = ctx.mouseLeft + stepLength;
		},
		
		nextFrame:  function(delta) {
			console.log(name + ', ctx.mouseLeft = ' + ctx.mouseLeft);
			var prevPos = ctx.mouseLeft;
			var speed = (ctx.hasPickedUpCheese) ? 1 : 3;
			ctx.mouseLeft += speed * delta / 16;
			var proceed = ctx.mouseLeft < maxMouseLeft;
			if (!proceed) {
				ctx.mouseLeft = maxMouseLeft;
			}
			ctx.mouse.style.left = ctx.mouseLeft + 'px';
			if (ctx.hasPickedUpCheese) {
				ctx.cheeseLeft += ctx.mouseLeft - prevPos;
				ctx.cheese.style.left = ctx.cheeseLeft + 'px';
			}
			return proceed;
		}
	};
};

var pickupTheCheese = function() {
	var ctx;
	
	return {
		init: function(context) {
			ctx = context;
		},
		
		nextFrame: function() {
			console.log('pickupTheCheese');
			ctx.cheeseTop -= 20;
			ctx.cheese.style.top = ctx.cheeseTop + 'px';
			ctx.cheeseLeft -= 20;
			ctx.cheese.style.left = ctx.cheeseLeft + 'px';
			ctx.hasPickedUpCheese = true;
		}
	};
};