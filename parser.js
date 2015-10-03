'use strict';

var parser = (function() {
	return {
		parse: function(code) {
			var steps = [moveRight('move w/o cheese #1'), 
						 moveRight('move w/o cheese #2'), 
						 moveRight('move w/o cheese #3'),
						 // moveRight('move w/o cheese #4'),
						 pickupTheCheese(),
						 moveRight('move with cheese #1'),
						 // moveRight('move with cheese #2'),
						 // moveRight('move with cheese #3'),
						 eatTheCheese()];
			return steps;
		}
	};
})();