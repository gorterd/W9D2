const MovingObject = require("./moving_object.js");
const Util = require("./utils.js");

Util.inherits(Ship, MovingObject);

Ship.RADIUS = 5;
Ship.COLOR = "red";  

function Ship(game){
  options = {};
  options.color = Ship.COLOR;
  options.radius = Ship.RADIUS; 
  options.vel = [0,0];
  options.game = game; 
  options.pos = game.randomPosition(); 
  MovingObject.call(this, options)
}

Ship.prototype.relocate = function(){
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
}

Ship.prototype.power = function(impulse){
  this.vel[0] += impulse[0]; 
  this.vel[1] += impulse[1]; 
}

module.exports = Ship; 

