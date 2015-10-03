'use strict';

var moveRightStep = function(data){
	var ctx;
	var aux = data;
	var maxMouseLeft;
	var stepLength = 100;
	
	var init = function(context) {
		ctx = context;
		maxMouseLeft = ctx.mouseLeft + stepLength;
	};
	
	var moveRight = function(delta) {
		console.log(aux + ', ctx.mouseLeft = ' + ctx.mouseLeft);
		ctx.mouseLeft += 3 * delta / 16;
		var proceed = ctx.mouseLeft < maxMouseLeft;
		if (!proceed) {
			ctx.mouseLeft = maxMouseLeft;
		}
		ctx.mouse.style.left = ctx.mouseLeft + 'px';
		return proceed;
	};
	
	return {
		init: init,
		nextFrame: moveRight
	};
};

(function(){
	var mice = document.getElementsByClassName("mouse");
	var context = {
		mouse: mice[0],
		mouseLeft: 100
	};
	var steps = [moveRightStep('1'), moveRightStep('2'), moveRightStep('3')];
	var stepCnt = 0;
	var currStep;
	
	// https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
	function animLoop( render ) {
		var running = true;
		var lastFrame = undefined;
		function loop( now ) {
			if (typeof(lastFrame) === 'undefined') {
				lastFrame = now;
			}

			if ( running !== false ) {
				requestAnimationFrame( loop );
				running = render( now - lastFrame );
				lastFrame = now;
			}
		}
		requestAnimationFrame(loop);
	}
	
	currStep = getNextStep();
	animLoop(function(delta) {
		var proceedWithCurrentStep = currStep.nextFrame(delta);
		if (proceedWithCurrentStep !== true) {
			currStep = getNextStep();
			return typeof(currStep) !== 'undefined';
		}
		return proceedWithCurrentStep;
	});
	
	function getNextStep() {
		var nextStep = steps[stepCnt++];
		if (typeof(nextStep) !== 'undefined') {
			nextStep.init(context);
		}
		return nextStep;
	}
})();
