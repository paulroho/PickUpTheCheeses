(function(){
	var mice = document.getElementsByClassName("mouse");
	var mouse = mice[0];
	var left = 100;
	
	var timer = setInterval(function() {
		left += 1;
		mouse.style.left = left + 'px';
		if (left >= 550) {
			clearInterval(timer);
		}
	}, 10);
})();