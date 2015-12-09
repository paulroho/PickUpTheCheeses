"use strict";

var parser = (function() {
	function getStep(line) {
		switch(line) {
			case "Gehe nach rechts":
			case "G":
			case "gehe":
			case "g":
				return moveRight();
			case "Nimm den Käse":
			case "N":
			case "nimm":
			case "n":
				return pickUpTheCheese();
			case "Iss den Käse":
			case "I":
			case "iss":
			case "i":
				return eatTheCheese();
			default:
				throw "Die Anweisung \"" + line + "\" kenne ich leider nicht!";
		}
	}
	
	return {
		parse: function(code) {
			var steps = [];
			if (code.trim().length !== 0) {
				var lines = code.match(/[^\r\n]+/g);
				for (var i=0; i<lines.length; i++) {
					var line = lines[i].trim();
					var step = getStep(line);
					steps.push(step);
				}
			}
			return steps;
		}
	};
})();