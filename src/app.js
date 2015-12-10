"use strict";

(function(parser, animator, cloner){
	var steps;
	var btnStart = document.getElementById("start");
	var btnStop = document.getElementById("stop");
	var btnReset = document.getElementById("reset");
	var mouseBubble = document.getElementById("mouse-bubble");
	var commonBubble = document.getElementById("common-bubble");

	var setupHelpOnInstructions = function () {
	    var helpElement = document.getElementById("helpOnInstructions");
	    var text = parser.instructions.map(function(item) {
	        return item.instructions.map(function(item) { return "<b>" + item + "</b>" }).join(" = ");
	    }).join("\n");
	    helpElement.innerHTML = text;
	};
	var setupBackground = function () {
	    var templateFlower = document.getElementById("flower-template");
        for (var i = 0; i < 7; i++) {
            var clonedFlower = cloner.cloneDeep(templateFlower);
            clonedFlower.style.left = 70 + (100 * i) + "px";
            clonedFlower.style.display = "block";
            templateFlower.parentElement.appendChild(clonedFlower);
        }
	};

	function hideCommonMessage() {
	    commonBubble.style.opacity = 0;
	}

    function showCommonMessage(message) {
        //console.log("showMouseMessage(\"" + message + "\")");
        commonBubble.innerHTML = message;
        commonBubble.style.top = "10px";
        commonBubble.style.opacity = .8;
        setTimeout(function() {
            hideCommonMessage();
        }, 5000);
    }

    function hideMouseMessage() {
        mouseBubble.style.opacity = 0;
    }

    function showMouseMessage(context, message) {
        //console.log("showMouseMessage(\"" + message + "\")");
        mouseBubble.innerHTML = message;
        mouseBubble.style.left = context.mouseLeft + 50;
        mouseBubble.style.top = "40px";
        mouseBubble.style.opacity = .8;
        setTimeout(function() {
            hideMouseMessage();
        }, 5000);
    }

    function updateUI() {
        btnStart.disabled = animator.isRunning();
        btnStop.disabled = !animator.isRunning();
    }

    function hookEventHandler() {
        btnStart.addEventListener("click", function () {
            var code = document.getElementById("code").value;
            try {
                steps = parser.parse(code);
                if (steps.length === 0) {
                    showCommonMessage("Schreib der Maus was sie tun soll.");
                }
                else {
                    animator.run(steps,
                        function () {
                            updateUI();
                        },
                        function () {
                            updateUI();
                        },
                        function (arg1, arg2) {
                            if (typeof (arg1) !== "string") {
                                showMouseMessage(arg1, arg2);
                            }
                            else {
                                showCommonMessage(arg1);
                            }
                        });
                }
            }
            catch (xcp) {
                alert(xcp);
            }
        });
		
        btnStop.addEventListener("click", function() {
            animator.stop();
        });
		
        btnReset.addEventListener("click", function() {
            animator.reset();
            updateUI();
            hideMouseMessage();
        });
    }

    setupBackground();
    setupHelpOnInstructions();
    hookEventHandler();
	updateUI();
})(parser, animator, cloner);
