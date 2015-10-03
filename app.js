'use strict';

(function(parser, animator){
	var steps;
	
	hookEventHandler();
		
	function hookEventHandler() {
		var btnStart = document.getElementById("start");
		btnStart.addEventListener('click', function() {
			var code = 'TODO';
			var steps = parser.parse(code);
			animator.run(steps);
		});
	}
})(parser, animator);
