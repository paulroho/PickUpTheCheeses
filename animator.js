'use strict';

var animator = (function() {
	var context = {
		mouse: document.getElementsByClassName("mouse")[0],
		mouseLeft: 100,
		hasPickedUpCheese: false,
		
		cheese: document.getElementsByClassName("cheese")[0],
		cheeseLeft: 500,
		cheeseTop: 0,
	};
	
	var steps = [moveRight('move w/o cheese #1'), 
				 moveRight('move w/o cheese #2'), 
				 moveRight('move w/o cheese #3'),
				 // moveRight('move w/o cheese #4'),
	             pickupTheCheese(),
				 moveRight('move with cheese #1'),
				 // moveRight('move with cheese #2'),
				 // moveRight('move with cheese #3'),
				 eatTheCheese()];
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
	
	function getNextStep() {
		var nextStep = steps[stepCnt++];
		if (typeof(nextStep) !== 'undefined') {
			var error = nextStep.start(context);
			if (typeof(error) === 'string') {
				alert(error);
				return undefined;
			}
		}
		return nextStep;
	}

	return {
		run: function() {
			currStep = getNextStep();
			animLoop(function(delta) {
				var proceedWithCurrentStep = currStep.nextFrame(delta);
				if (proceedWithCurrentStep !== true) {
					currStep = getNextStep();
					return typeof(currStep) !== 'undefined';
				}
				return proceedWithCurrentStep;
			});
		}
	};
})();