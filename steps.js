'use strict';

var moveRightStep = function(name){
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
			ctx.mouseLeft += 3 * delta / 16;
			var proceed = ctx.mouseLeft < maxMouseLeft;
			if (!proceed) {
				ctx.mouseLeft = maxMouseLeft;
			}
			ctx.mouse.style.left = ctx.mouseLeft + 'px';
			return proceed;
		}
	};
};
