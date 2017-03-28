// Enemies our player must avoid
var Enemy = function(enemyRow) {

    // Initial x position is off the screen, this allows the enemy to "enter"
    this.x = -101;

    // Initial y position is calculated to match enemy to stone row
    this.y = (enemyRow + 1) * 83;

    // Assign a random number between 0 and 2 for speed for each
    // enemy to make game more interesting. 2 was chosen by experimenting
    this.speed = Math.random() * 2 + 1;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
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

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // Sets initial position of player to bottom centre square
    this.x = 202;
    this.y = 415;

    // Sets which image of player to be used
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {

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

// Declare array to hold enemies and place one enemy in each row of stones
var allEnemies = [];
allEnemies[0] = new Enemy(0);
allEnemies[1] = new Enemy(1);
allEnemies[2] = new Enemy(2);
allEnemies[3] = new Enemy(0);
allEnemies[4] = new Enemy(1);
allEnemies[5] = new Enemy(2);

// Declare and instantiate the player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
