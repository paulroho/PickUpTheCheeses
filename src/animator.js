"use strict";

var animator = (function() {
	var animation;
	var context = {};
	var steps;
	var stepCnt;
	var currStep;
	var isRunning = false;
	var startedCallback;
	var stoppedCallback;
    var showMessageCallback;
	var initMouseLeft;
	var initCheeseLeft;
	var initCheeseTop;

	// https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
    function onStarted() {
        if (typeof(startedCallback) !== "undefined") {
            startedCallback();
        }
    }

    function onStopped() {
        if (typeof(stoppedCallback) !== "undefined") {
            stoppedCallback();
        }
    }

    function onShowCommonMessage(message) {
        if (typeof (showMessageCallback) !== "undefined") {
            showMessageCallback(message);
        }
    }

    function onShowMouseMessage(message) {
        if (typeof (showMessageCallback) !== "undefined") {
            showMessageCallback(context, message);
        }
    }

    function animLoop( render ) {
		isRunning = true;
		onStarted();
		var lastFrame = undefined;

		function loop(now) {
		    //console.log("loop");
			if (typeof(lastFrame) === "undefined") {
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
		if (typeof(nextStep) !== "undefined") {
			var error = nextStep.start(context);
			if (typeof(error) === "string") {
				onShowMouseMessage(error);
				return undefined;
			}
		}
		return nextStep;
	}

    function resetContext() {
        context.mouseLeft = initMouseLeft;
        context.hasPickedUpCheese = false;
        context.cheeseIsVisible = true;
        context.cheeseLeft = initCheeseLeft;
        context.cheeseTop = initCheeseTop;
    }

    function init() {
		var mouse = document.getElementsByClassName("mouse")[0];
		var mouseTail = document.getElementsByClassName("tail")[0];
		var cheese = document.getElementsByClassName("cheese")[0];
		var cheeseStyle = getComputedStyle(cheese);
		var mouseStyle = getComputedStyle(mouse);
		initMouseLeft = parseInt(mouseStyle.left);
		initCheeseLeft = parseInt(cheeseStyle.left);
		initCheeseTop = parseInt(cheeseStyle.top);
		
		context.mouse = mouse;
        context.mouseTail = mouseTail;
		context.cheese = cheese;
        context.showMessage = onShowMouseMessage;
		resetContext();
	}

    function stop() {
        if (typeof(animation) !== "undefined") {
            cancelAnimationFrame(animation);
            if (isRunning) {
                isRunning = false;
                onStopped();
            }
        }
    }

    function updateView() {
        context.mouse.style.left = context.mouseLeft + "px";
        context.cheese.style.left = context.cheeseLeft + "px";
        context.cheese.style.top = context.cheeseTop + "px";
        context.cheese.style.display = (context.cheeseIsVisible) ? "block" : "none";
        context.mouseTail.classList.remove("paused");
    }

    function reset() {
		stop();

		resetContext();
		updateView();
	}

    init();
	
	return {
	    run: function (psteps, pstartedCallback, pstoppedCallback, pshowMessageCallback) {
			steps = psteps;
			startedCallback = pstartedCallback;
			stoppedCallback = pstoppedCallback;
			showMessageCallback = pshowMessageCallback;
			stepCnt = 0;
			currStep = getNextStep();
			if (typeof(currStep) !== "undefined") {
			    animLoop(function (delta) {
				    var proceedWithCurrentStep = currStep.nextFrame(delta);
					if (proceedWithCurrentStep !== true) {
						currStep = getNextStep();
						return typeof(currStep) !== "undefined";
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
