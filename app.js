'use strict';

(function(animator){
	hookEventHandler();
	
	function hookEventHandler() {
		var btnStart = document.getElementById("start");
		btnStart.addEventListener('click', function() {
			animator.run();
		});
	}
})(animator);
