"use strict";

var parser = (function () {
    var instructions = [
        { instruction: ["Gehe nach rechts", "G", "gehe", "g"], stepFunc: moveRight },
        { instruction: ["Nimm den Käse", "N", "nimm", "n"], stepFunc: pickUpTheCheese },
        { instruction: ["Iss den Käse", "I", "iss", "i"], stepFunc: eatTheCheese }
    ];

    function getStep(line) {
        var matchingInstructions = instructions.filter(function(item) {
            return item.instruction.indexOf(line) !== -1;
        });

        if (matchingInstructions.length === 0) {
            throw "Die Anweisung \"" + line + "\" kenne ich leider nicht!";
        }

        return matchingInstructions[0].stepFunc();
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