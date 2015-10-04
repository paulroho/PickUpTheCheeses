'use strict';

(function(parser, animator){
	var steps;
	
	hookEventHandler();
		
	function hookEventHandler() {
		var btnStart = document.getElementById("start");
		btnStart.addEventListener('click', function() {
			var code = document.getElementById("code").value;
			try {
				var steps = parser.parse(code);
			}
			catch (xcp) {
				alert(xcp);
			}
			
			if (steps.length === 0) {
				alert("Schreib der Maus was sie tun soll.");
			}
			else {
				animator.run(steps);
			}			
		});
		
		var btnStop = document.getElementById("stop");
		btnStop.addEventListener('click', function() {
			animator.stop();
		});
		
		var btnReset = document.getElementById("reset");
		btnReset.addEventListener('click', function() {
			animator.reset();
		});
	}
})(parser, animator);
