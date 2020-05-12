const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');
const Ship = require('./ship.js');

Asteroid.COLOR = "grey";
Asteroid.RADIUS = 10;
Util.inherits(Asteroid, MovingObject);

function Asteroid(pos, game){
  const options = {};

  options.pos = pos;
  options.game = game;
  options.color = Asteroid.COLOR;
  options.radius = Asteroid.RADIUS;  

  //we used Math.random() * 10 for length- should we randomize this? 
    //TA QUESTION
  options.vel = Util.randomVec(10 * Math.random())
  MovingObject.call(this, options); 
}

Asteroid.prototype.collideWith = function (otherObject) { 
    if (this.isCollidedWith(otherObject) && otherObject instanceof Ship){
        otherObject.relocate();
    }
}


module.exports = Asteroid;