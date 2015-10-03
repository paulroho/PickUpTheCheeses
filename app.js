'use strict';

(function(){
	var mice = document.getElementsByClassName("mouse");
	var mouse = mice[0];
	var mouseLeft = 100;
	
	// https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
	function animLoop( render ) {
		var running = true;
		var lastFrame = undefined;
		function loop( now ) {
			if (typeof(lastFrame) === 'undefined') {
				lastFrame = now;
			}

			if ( running !== false ) {
				requestAnimationFrame( loop );
				running = render( now - lastFrame );
				lastFrame = now;
			}
		}
		requestAnimationFrame(loop);
	}
	
	animLoop(function(delta) {
		mouseLeft += 2 * delta / 16;
		mouse.style.left = mouseLeft + 'px';
		if (mouseLeft >= 400)
			return false;
	});
})();