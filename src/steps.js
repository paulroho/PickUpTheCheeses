"use strict";

var moveRight = function() {
	var ctx;
    var maxMouseLeft;
	var stepLength = 100;
	
	return {
		start: function(context) {
			ctx = context;
			maxMouseLeft = ctx.mouseLeft + stepLength;
		},
		
		nextFrame:  function(delta) {
			// console.log(name + ', ctx.mouseLeft = ' + ctx.mouseLeft);
			var prevPos = ctx.mouseLeft;
			var speed = (ctx.hasPickedUpCheese) ? 1 : 3;
			ctx.mouseLeft += speed * delta / 16;
			var proceed = ctx.mouseLeft < maxMouseLeft;
			if (!proceed) {
				ctx.mouseLeft = maxMouseLeft;
			}
			ctx.mouse.style.left = ctx.mouseLeft + "px";
			if (ctx.hasPickedUpCheese) {
				ctx.cheeseLeft += ctx.mouseLeft - prevPos;
				ctx.cheese.style.left = ctx.cheeseLeft + "px";
			}
			return proceed;
		}
	};
};

var pickUpTheCheese = function() {
	var ctx;

	function checkPreconditions() {
		var noseLeft = ctx.mouseLeft + 100;
		if (noseLeft !== ctx.cheeseLeft) {
			return "Ich kann den K\xE4se hier nicht nehmen.<br/>Bring mich zuerst zum K\xE4se.";
		}

		if (ctx.hasPickedUpCheese) {
		    return "Ich kann den K\xE4se nicht nocheinmal nehmen weil ich ihn schon genommen habe.";
		}
	    return undefined;
	}
	
	return {
		start: function(context) {
			ctx = context;
		    return checkPreconditions();
		},
		
		nextFrame: function() {
			// console.log('pickUpTheCheese');
			ctx.cheeseTop -= 20;
			ctx.cheese.style.top = ctx.cheeseTop + "px";
			// ctx.cheeseLeft -= 20;
			// ctx.cheese.style.left = ctx.cheeseLeft + 'px';
			ctx.hasPickedUpCheese = true;
		}
	};
};

var eatTheCheese = function() {
	var ctx;
	var initCheeseLeft;

	function checkPreconditions() {
	    if (ctx.hasPickedUpCheese !== true) {
			return "Ich kann den K\xE4se jetzt nicht essen.<br/>Lass ihn mich zuerst nehmen.";
		}
	    return undefined;
	}

    return {
		start: function(context) {
			ctx = context;
			initCheeseLeft = ctx.cheeseLeft;
			return checkPreconditions();
		},
		
		nextFrame: function(delta) {
			// console.log('eatTheCheese');
			var moveBy = delta / 50;
			ctx.cheeseLeft -= 3 * moveBy;
			ctx.cheeseTop += 2 * moveBy;
			ctx.cheese.style.left = ctx.cheeseLeft + "px";
			ctx.cheese.style.top = ctx.cheeseTop + "px";

		    var eatUp = ctx.cheeseLeft < initCheeseLeft - 35;
			if (eatUp) {
			    ctx.cheese.style.display = "none";
			    ctx.mouseTail.classList.add("paused");
			    ctx.showMessage("Hmmm, das war gut!");
			}
			return !eatUp;
		}
	};
};