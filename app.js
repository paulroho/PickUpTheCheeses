"use strict";

(function(parser, animator, cloner){
	var steps;
	var btnStart = document.getElementById("start");
	var btnStop = document.getElementById("stop");
	var btnReset = document.getElementById("reset");
	var mouseBubble = document.getElementById("mouse-bubble");

	var setupHelpOnInstructions = function () {
	    var helpElement = document.getElementById("helpOnInstructions");
	    var text = parser.instructions.map(function(item) {
	        return item.instructions.join(" = ");
	    }).join("\n");
	    helpElement.innerHTML = text;
	};
	var setupBackground = function () {
	    var templateFlower = document.getElementById("flower-template");
        for (var i = 0; i < 10; i++) {
            var clonedFlower = cloner.cloneDeep(templateFlower);
            clonedFlower.style.left = 86 + (100 * i) + "px";
            clonedFlower.style.display = "block";
            templateFlower.parentElement.appendChild(clonedFlower);
        }
	};

    function showMouseMessage(context, message) {
        //console.log("showMouseMessage(\"" + message + "\")");
        mouseBubble.textContent = message;
        mouseBubble.style.left = context.mouseLeft + 50;
        mouseBubble.style.top = "10px";
        mouseBubble.style.opacity = .8;
    }

    function hideMouseMessage() {
        mouseBubble.style.opacity = 0;
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
                    alert("Schreib der Maus was sie tun soll.");
                }
                else {
                    animator.run(steps,
                        function () {
                            updateUI();
                        },
                        function () {
                            updateUI();
                        },
                        function (context, message) {
                            showMouseMessage(context, message);
                        });
                }
                hideMouseMessage();
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
