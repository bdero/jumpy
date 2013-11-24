/**
 * Manages platforms and player.
 *
 * @ctor
 * Constructs the World object.
 */
function World() {
    Sprite.call(this);

    this.controller = new Controller();

    this.platformsSprite = new Sprite();
    this.addChild(this.platformsSprite);

    this.player = new Player(OPTIMAL_WIDTH/2, 0);
    this.addChild(this.player);

    this.platforms = [];
}

World.prototype = new Sprite();


World.prototype.top = function() {
    return -stage.stageHeight/world.scaleX;
};

/**
 * Updates everything, including the platforms and player. 
 *
 * @tparam float dt The delta time multiplier of the current frame.
 */
World.prototype.update = function(dt) {
    this.player.update(dt);

    for (var i = 0; i < this.platforms.length; i++) {
	this.platforms[i].update(dt);
    }
};
