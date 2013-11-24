/**
 * The little guy who hops up the platforms.
 *
 * @ctor
 * Constructs the Player object.
 * @tparam float Starting X-location of the player.
 * @tparam float Starting Y-position of the player.
 */
function Player(x, y) {
    Sprite.call(this);

    this.x = x;
    this.y = y;

    this.bitmap = new Bitmap(loader.images.person);
    this.bitmap.x = -this.bitmap.bitmapData.width/2;
    this.bitmap.y = -this.bitmap.bitmapData.height;

    this.addChild(this.bitmap);
}

Player.prototype = new Sprite();
Player.prototype.GRAVITY = 0.09;

/**
 * Update the player movement based on the controller.
 *
 * @tparam float dt The delta time multiplier of the current frame.
 */
Player.prototype.update = function(dt) {
    
};

/**
 * Objects that the player can pass through going up, but don't allow the
 * reverse.
 *
 * @ctor
 * Constructs a Platform object.
 * @tparam BitmapData bitmapData The bitmapData to use for the platform.
 * @tparam float y The starting height of the platform.
 */
function Platform(bitmapData, y) {
    Sprite.call(this);

    this.bitmap = new Bitmap(bitmapData);
    this.x = Math.random()*(OPTIMAL_WIDTH - this.bitmap.bitmapData.width);
    this.y = y;

    this.collisionRect = new Rectangle();

    // For debugging
    this.graphics.drawRect(10, 10, this.bitmap.bitmapData.width - 20, 10);

    world.platforms.push(this);
    world.addChild(this);
}

Platform.prototype = new Sprite();

/**
 * Updates the platform's collision rectangle.
 */
Platform.prototype.update = function() {
    this.collisionRect.setTo(this.x + 10, this.y + 10, this.bitmap.bitmapData.width - 20, 10);
}
