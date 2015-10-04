'use strict';

(function(parser, animator){
	var steps;
	
	hookEventHandler();
		
	function hookEventHandler() {
		var btnStart = document.getElementById("start");
		btnStart.addEventListener('click', function() {
			// 'Gehe nach rechts\r\nGehe nach rechts\r\nGehe nach rechts\r\nNimm den Käse\r\nGehe nach rechts\r\nIss den Käse';
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
	}
})(parser, animator);
