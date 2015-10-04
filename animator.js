'use strict';

var animator = (function() {
	var animation;
	var context;
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
				animation = requestAnimationFrame( loop );
				running = render( now - lastFrame );
				lastFrame = now;
			}
		}
		animation = requestAnimationFrame(loop);
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
	
	function reset() {
		if (typeof(animation) !== 'undefined') {
			cancelAnimationFrame(animation);
		}
		context = {
			mouse: document.getElementsByClassName("mouse")[0],
			mouseLeft: 100,
			hasPickedUpCheese: false,
			
			cheese: document.getElementsByClassName("cheese")[0],
			cheeseLeft: 500,
			cheeseTop: 70,
		};
		
		updateView();
	}
	
	function updateView() {
		context.cheese.style.left = context.cheeseLeft + 'px';
		context.mouse.style.left = context.mouseLeft + 'px';
	}

	reset();
	
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
		},
		reset: reset
	};
})();
