var stage, loader, world;
var timestamp;
var loading;

var MS_FRAME = 1000/60; // Milliseconds per frame
var OPTIMAL_WIDTH = 800;

function start() {
    stage = new Stage('c');

    loader = new Loader([
	'person.png', 'platform_big.png',
	'platform_medium.png', 'platform_small.png'
    ]);

    timestamp = Date.now();
    stage.addEventListener(Event.ENTER_FRAME, update);
}

/**
 * Calculates the delta time multiplier and updates the world along with scaling.
 *
 * @tparam float dt The delta time multiplier of the current frame.
 */
function update() {
    if (loader.loading) {
	loader.update();
    } else {
	if (!world) {
	    world = new World();
	    stage.addChild(world);
	}

	var currentTime = Date.now();
	var dt = (currentTime - timestamp)/MS_FRAME;
	timestamp = currentTime;

	world.y = stage.stageHeight;
	world.scaleX = world.scaleY = stage.stageWidth/OPTIMAL_WIDTH;
	world.update(dt);
    }
}

function Loader(imageLocations) {
    Sprite.call(this);

    this.imageLocations = imageLocations;

    this.complete = 0;
    this.loading = true;

    this.text = new TextField();
    this.text.height = 30;
    this.text.setTextFormat(new TextFormat(
	"sans-serif", this.text.height, 0x111111, false, false, TextFormatAlign.CENTER, 0
    ));
    this.addChild(this.text);

    this.images = {};
    for (var i = 0; i < imageLocations.length; i++) {
	var img = new BitmapData('img/' + imageLocations[i]);
	this.images[imageLocations[i].slice(0, -4)] = img;

	img.loader.addEventListener2(Event.COMPLETE, this.completeCallback, this);
    }

    stage.addChild(this);
}

Loader.prototype = new Sprite();

Loader.prototype.update = function() {
    this.text.x = 0;
    this.text.y = stage.stageHeight/2 - this.text.height/2;
    this.text.width = stage.stageWidth;
    var percent = Math.round(this.complete/this.imageLocations.length*100);
    this.text.text = 'Loading.. ' + percent + '%';
};

Loader.prototype.completeCallback = function() {
    this.complete++;

    if (this.complete >= this.imageLocations.length) {
	this.loading = false;
	stage.removeChild(this);
    }
};
