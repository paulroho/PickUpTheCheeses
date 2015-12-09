"use strict";

(function(parser, animator){
	var steps;
	var btnStart = document.getElementById("start");
	var btnStop = document.getElementById("stop");
	var btnReset = document.getElementById("reset");
    var mouseBubble = document.getElementById("mouse-bubble");

    function showMouseMessage(context, message) {
        //console.log("showMouseMessage(\"" + message + "\")");
        mouseBubble.textContent = message;
        mouseBubble.style.left = context.mouseLeft + 50;
        mouseBubble.style.top = "100px";
        mouseBubble.style.opacity = 1;
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

    hookEventHandler();
	updateUI();
})(parser, animator);
