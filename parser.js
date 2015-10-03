'use strict';

var parser = (function() {
	function getStep(line) {
		switch(line) {
			case "Gehe nach rechts":
				return moveRight();
			case "Nimm den Käse":
				return pickupTheCheese();
			case "Iss den Käse":
				return eatTheCheese();
			default:
				throw 'Die Anweisung "' + line + '" kenne ich leider nicht!';
		}
	}
	
	return {
		parse: function(code) {
			var steps = [];
			
			var lines = code.match(/[^\r\n]+/g);
			console.log(lines);
			for (var i=0; i<lines.length; i++) {
				var line = lines[i];
				var step = getStep(line);
				steps.push(step);
			}
			// var steps = [moveRight('move w/o cheese #1'), 
						 // moveRight('move w/o cheese #2'), 
						 // moveRight('move w/o cheese #3'),
						 // // moveRight('move w/o cheese #4'),
						 // pickupTheCheese(),
						 // moveRight('move with cheese #1'),
						 // // moveRight('move with cheese #2'),
						 // // moveRight('move with cheese #3'),
						 // eatTheCheese()];
			return steps;
		}
	};
})();