
var numWin = 0, numLose = 0;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;

    // the speed will be assigned in
    // another function generateRandomSpeed()

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.generateRandomSpeed = function() {
    // assign a random speed
    this.speed = 125 + Math.round(Math.random() * 512);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x >  500) {
        this.x = -100;
        this.generateRandomSpeed();
        // this.speed = 125 + Math.round(Math.random() * 512);
    }

    // check for collisions between players and bugs
    if ( (player.x < this.x + 60) && (player.x + 37 > this.x)
      && (player.y < this.y + 25) && (30 + player.y > this.y) ) {
          player.x = 200;
          player.y = 380;
          numLose++;
          recordGameData();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;

    this.heart = 'images/heart.png';
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {

    // prevent players from going beyond the canvas
    if (this.y > 380) {
      this.y = 380;
    }

    if (this.x > 400) {
      this.x = 400;
    }

    if (this.x < 0) {
      this.x = 0;
    }

    // Check for player reaching top of canvas and winning the game
    if (this.y < 0) {
      this.x = 200;
      this.y = 380;
      numWin++;
      recordGameData();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {

    switch (keyPress) {

        case 'up'  :
            this.y -= this.speed + 30;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy, allEnemies = [];
var enemyPosition = [60, 140, 220];
var player = new Player(200, 380, 50);

enemyPosition.forEach(function(y) {
    // create a new enemy
    enemy = new Enemy(0, y);

    // assign a random speed
    enemy.generateRandomSpeed();
    allEnemies.push(enemy);
});

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

function recordGameData() {
    document.getElementById("counter").innerHTML = " # of Successes : " + numWin + " # of Failures : " + numLose;
}
