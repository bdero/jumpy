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

    this.xSpeed = this.ySpeed = 0;

    this.bitmap = new Bitmap(loader.images.person);
    this.bitmap.x = -this.bitmap.bitmapData.width/2;
    this.bitmap.y = -this.bitmap.bitmapData.height;
    this.addChild(this.bitmap);

    this.collisionRect = new Rectangle();

    // For debugging
    this.graphics.beginFill(0xff0000, 0.9);
    this.graphics.drawRect(
	    -this.bitmap.bitmapData.width/2, -10, this.bitmap.bitmapData.width, 10);
    this.graphics.endFill();
}

Player.prototype = new Sprite();

Player.prototype.GRAVITY = 0.4;
Player.prototype.BOUNCE = -15;
Player.prototype.ACCEL_X_SPEED = 0.5;
Player.prototype.FRICTION = 0.2;

Player.prototype.MAX_X_SPEED = 12;
Player.prototype.MAX_Y_SPEED = 20;

/**
 * Update the player movement based on the controller.
 *
 * @tparam float dt The delta time multiplier of the current frame.
 */
Player.prototype.update = function(dt) {
    // Controller input
    var left = world.controller.actions.left;
    var right = world.controller.actions.right;

    // Movement
    if ((!left && !right) || (left && right)) {
	// Friction
	if (this.xSpeed > this.FRICTION) this.xSpeed -= this.FRICTION*dt;
	else if (this.xSpeed < -this.FRICTION) this.xSpeed +=  this.FRICTION*dt;
	else this.xSpeed = 0;
    } else if (left)
	this.xSpeed -= this.ACCEL_X_SPEED*dt;
    else // right
	this.xSpeed += this.ACCEL_X_SPEED*dt;

    var width = this.bitmap.bitmapData.width;

    // Update collision rect
    this.collisionRect.setTo(-width/2, -10, width, 10);

    // Collision detection
    if (this.y > 0) this.ySpeed = this.BOUNCE;
    else this.ySpeed += this.GRAVITY*dt; // Gravity

    // Speed limits
    this.xSpeed = Math.max(-this.MAX_X_SPEED, Math.min(this.MAX_X_SPEED, this.xSpeed));
    if (this.ySpeed > this.MAX_Y_SPEED) this.ySpeed = this.MAX_Y_SPEED;

    // Apply position change
    this.x += this.xSpeed*dt;
    this.y += this.ySpeed*(Math.min(dt, 3));

    // Graphical flipping
    if (this.xSpeed > this.FRICTION) this.scaleX = 1;
    else if (this.xSpeed < -this.FRICTION) this.scaleX = -1;

    // Loop around sides
    var loopSize = OPTIMAL_WIDTH + width;
    if (this.x < -width/2) this.x += loopSize;
    else if (this.x > OPTIMAL_WIDTH + width/2) this.x -= loopSize;
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
    this.addChild(this.bitmap);

    this.x = Math.random()*(OPTIMAL_WIDTH - this.bitmap.bitmapData.width);
    this.y = y;

    this.collisionRect = new Rectangle();

    // For debugging
    this.graphics.beginFill(0xff0000, 0.9);
    this.graphics.drawRect(10, 10, this.bitmap.bitmapData.width - 20, 10);
    this.graphics.endFill();

    world.platforms.push(this);
    world.platformsSprite.addChild(this);
}

Platform.prototype = new Sprite();

/**
 * Updates the platform's collision rectangle.
 */
Platform.prototype.update = function() {
    this.collisionRect.setTo(this.x + 10, this.y + 10, this.bitmap.bitmapData.width - 20, 10);
};

Platform.prototype.die = function() {
    world.platforms.removeObject(this);
    world.platformsSprite.removeChild(this);
};
