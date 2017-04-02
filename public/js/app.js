// Enemies our player must avoid
var Enemy = function(enemyRow) {

    // Initial x position is random between -101 (just to the left of the screen) and
    //606, just to the right of the screen.
    this.x = Math.random() * 707 - 101;

    // Initial y position is calculated to match enemy to stone row
    this.y = (enemyRow + 1) * 83;

    // Assign a random number between 1 and 3 for speed for each
    // enemy to make game more interesting. 3 was chosen by experimenting
    this.speed = Math.random() * 2 + 1;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Update the position of the enemy based on speed and time elapsed
    this.x = (this.x + 101 * dt * this.speed);
    // Once enemy has exited the scene from right side, reset position
    // to renter from the left side
    if (this.x > 606) {
        this.x = -101;
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This is the player class
var Player = function() {
    // Sets initial position of player to bottom centre square
    this.x = 202;
    this.y = 415;

    // Sets which image of player to be used
    this.sprite = 'images/char-boy.png';
};

//Draw the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Updates player position properties based on which key has been pressed
Player.prototype.handleInput = function(key) {

    // Move character based on key, but only if character is not at the edge
    if (key === 'left') {
        if (this.x > 0) {
            this.x = this.x - 101;
        }
    }

    if (key === 'right') {
        if (this.x < 404) {
            this.x = this.x + 101;
        }
    }

    if (key === 'up') {
        if (this.y > 0) {
            this.y = this.y - 83;
        }
    }

    if (key === 'down') {
        if (this.y < 415) {
            this.y = this.y + 83;
        }
    }
};

//Initiate level at 1
var level = 1;
// Declare array to hold enemies
var allEnemies = [];

//This function creates the enemies (instantiates the classes)
var createEnemies = function(level){
    allEnemies = [];
    for (i=0; i<level; i++){
        allEnemies[i] = new Enemy(i%3);
    }
};

// Declare and instantiate the player
var player = new Player();


// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
