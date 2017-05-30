console.log('test');

$( () => {
	console.log('jquery is live');

	// creating the box elements that I need
	const boxMaker = (boxes) => {
		for(let i = 0; i < boxes; i++){
			let myBox = $('<div></div>');
			myBox.addClass('box');
			// myBox.addClass(`box${i}`);
			myBox.text('Click Me!');
			myBox.attr('id', `box${i}`);
			myBox.appendTo($('body'));
		}
	}

	// cool, made 4 boxes
	boxMaker(4); 

	// grabbing my boxes.
	// for some reason if I select them by class, I can't add another class?

	// need global access to clear these
	var blueInterval;
	var redInterval;
	var greenInterval;
	var purpleInterval;

	var $b0 = $('#box0');
	var $b1 = $('#box1');
	var $b2 = $('#box2');
	var $b3 = $('#box3');

	/////////////////
	// ARRAYS ///////
	/////////////////

	var elmnts = [$b0, $b1, $b2, $b3];
	var intrvls = [blueInterval, redInterval, greenInterval, purpleInterval];
	var clrs = ['blue', 'red', 'green', 'purple'];


	/////////////////
	// FUNCTIONS ////
	/////////////////
	
	const colorBinder = (element, color, interval) => {
		// this is the glow stuff
		interval = setInterval( () => {
			element.addClass(color);
			setTimeout( () => {
				element.removeClass(color);
			}, 1000);
		}, 2000);
		// this is the event handler stuff
		element.click( () => {
			clearInterval(interval);
			element.unbind();
			setTimeout( () => {
				element.addClass(color);
			}, 500);
		});
	}

	// binds color glowers and event listeners to each element.
	const binder = (element) => {
		$.each(elmnts, (index, element) => {
			colorBinder(element, clrs[index], intrvls[index]);
		});
	}

	

	// Begins everything
	binder();

});