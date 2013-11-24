/**
 * Listens to and stores user input.
 *
 * @ctor
 * Constructs a controller object.
 */
function Controller() {
    // Define actions
    this.actions = {};
    for (var key in this.ACTION_HASH)
	if (this.ACTION_HASH.hasOwnProperty(key))
	    this.actions[key] = false;

    stage.addEventListener2(KeyboardEvent.KEY_DOWN, this.keyDown, this);
    stage.addEventListener2(KeyboardEvent.KEY_UP, this.keyUp, this);    
}

Controller.prototype.ACTION_HASH = {
    //"up": [87, 38], // W, up
    //"down": [83, 40], // S, down
    "left": [65, 37], // A, left
    "right": [68, 39], // D, right
    //"select": [13, 32] // enter, space
};

/**
 * Event listener callback that triggers whenever any keyboard key is pressed. 
 * @tparam KeyboardEvent e Keyboard event generated when triggered by the event listener.
 */
Controller.prototype.keyDown = function(e) {
    //console.log(e.keyCode + " pressed");
    this.keyboardAction(e, true);
};

/**
 * Event listener callback that triggers whenever any keyboard key is released. 
 * @tparam KeyboardEvent e Keyboard event generated when triggered by the event listener.
 */
Controller.prototype.keyUp = function(e) {
    this.keyboardAction(e, false);
};

/**
 * Changes the input state of the actions that correspond to a given
 * keyboard event. The value of the modified action is changed to
 * the given <code>value</code>.
 * @tparam KeyboardEvent e Keyboard event generated when triggered by one of the event listeners.
 * @tparam boolean value The value to set all changed actions to.
 */
Controller.prototype.keyboardAction = function(e, value) {
    for (var key in this.ACTION_HASH)
	if (this.ACTION_HASH.hasOwnProperty(key))
	    for (var i in this.ACTION_HASH[key])
		if (this.ACTION_HASH[key][i] == e.keyCode) {
		    this.actions[key] = value;
		    //console.log(key + " set to " + value);
		    break;
		}
};
