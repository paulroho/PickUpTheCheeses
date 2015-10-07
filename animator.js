'use strict';

var animator = (function() {
	var animation;
	var context = {};
	var steps;
	var stepCnt;
	var currStep;
	var isRunning = false;
	var startedCallback;
	var stoppedCallback;
	var initMouseLeft;
	var initCheeseLeft;
	var initCheeseTop;

	// https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
	function animLoop( render ) {
		isRunning = true;
		onStarted();
		var lastFrame = undefined;
		function loop(now) {
			if (typeof(lastFrame) === 'undefined') {
				lastFrame = now;
			}

			if (isRunning !== false) {
				animation = requestAnimationFrame(loop);
				isRunning = render(now - lastFrame);
				if (isRunning === false) {
					onStopped();
				}
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
	
	function init() {
		var mouse = document.getElementsByClassName("mouse")[0];
		var cheese = document.getElementsByClassName("cheese")[0];
		var cheeseStyle = getComputedStyle(cheese);
		var mouseStyle = getComputedStyle(mouse);
		initMouseLeft = parseInt(mouseStyle.left);
		initCheeseLeft = parseInt(cheeseStyle.left);
		initCheeseTop = parseInt(cheeseStyle.top);
		
		context.mouse = mouse;
		context.cheese = cheese;
		resetContext();
	}
	
	function reset() {
		stop();

		resetContext();
		updateView();
	}
	
	function resetContext() {
		context.mouseLeft = initMouseLeft;
		context.hasPickedUpCheese = false;
		context.cheeseIsVisible = true;
		context.cheeseLeft = initCheeseLeft;
		context.cheeseTop = initCheeseTop;
	}
	
	function updateView() {
		context.mouse.style.left = context.mouseLeft + 'px';
		context.cheese.style.left = context.cheeseLeft + 'px';
		context.cheese.style.top = context.cheeseTop + 'px';
		context.cheese.style.display = (context.cheeseIsVisible) ? 'block' : 'none';
	}
	
	function stop() {
		if (typeof(animation) !== 'undefined') {
			cancelAnimationFrame(animation);
			if (isRunning) {
				isRunning = false;
				onStopped();
			}
		}
	}
	
	function onStarted() {
		if (typeof(startedCallback) !== 'undefined') {
			startedCallback();
		}
	}
	
	function onStopped() {
		if (typeof(stoppedCallback) !== 'undefined') {
			stoppedCallback();
		}
	}

	init();
	
	return {
		run: function(psteps, pstartedCallback, pstoppedCallback) {
			steps = psteps;
			startedCallback = pstartedCallback;
			stoppedCallback = pstoppedCallback;
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
		stop: stop,
		reset: reset,
		isRunning: function() {
			return isRunning;
		}
	};
})();
