'use strict';

var animator = (function() {
	var context = {
		mouse: document.getElementsByClassName("mouse")[0],
		mouseLeft: 100,
		hasPickedUpCheese: false,
		
		cheese: document.getElementsByClassName("cheese")[0],
		cheeseLeft: 500,
		cheeseTop: 70,
	};
	
	var steps;
	var stepCnt;
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
		run: function(psteps) {
			steps = psteps;
			stepCnt = 0;
			currStep = getNextStep();
			if (typeof(currStep) !== 'undefined') {
				animLoop(function(delta) {
					var proceedWithCurrentStep = currStep.nextFrame(delta);
					if (proceedWithCurrentStep !== true) {
						currStep = getNextStep();
						return typeof(currStep) !== 'undefined';
					}
					return proceedWithCurrentStep;
				});
			}
		}
	};
})();
