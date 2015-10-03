'use strict';

(function(){
	var mice = document.getElementsByClassName("mouse");
	var mouse = mice[0];
	var mouseLeft = 100;
	var maxMouseLeft = 400;
	var currStep;
	
	// https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
	function animLoop( render ) {
		var running = true;
		var lastFrame = undefined;
		function loop( now ) {
			console.log('loop ' + now);
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
	
	currStep = moveRight;
	animLoop(function(delta) {
		var proceedWithCurrentStep = currStep(delta);
		if (proceedWithCurrentStep !== true) {
			currStep = getNextStep();
			return typeof(currStep) !== 'undefined';
		}
		return proceedWithCurrentStep;
	});
	
	function getNextStep() {
		return undefined;
	}
	
	function moveRight(delta) {
		mouseLeft += 3 * delta / 16;
		var proceed = mouseLeft < maxMouseLeft;
		if (!proceed) {
			mouseLeft = maxMouseLeft;
		}
		mouse.style.left = mouseLeft + 'px';
		return proceed;
	}
})();
