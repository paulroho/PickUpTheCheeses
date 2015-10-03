'use strict';

(function(parser, animator){
	var steps;
	
	hookEventHandler();
		
	function hookEventHandler() {
		var btnStart = document.getElementById("start");
		btnStart.addEventListener('click', function() {
			var code = 'xGehe nach rechts\r\nGehe nach rechts\r\nGehe nach rechts\r\nNimm den Käse\r\nGehe nach rechts\r\nIss den Käse';
			try {
				var steps = parser.parse(code);
			}
			catch (xcp) {
				alert(xcp);
			}
			animator.run(steps);
		});
	}
})(parser, animator);
