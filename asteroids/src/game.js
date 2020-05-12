const Asteroid = require('./asteroid.js');
const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');
const Ship = require('./ship.js');

// hardcode the dimensions or dynamically define based on canvas using event listener???
// TA QUESTIONS
Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_ASTEROIDS = 20;


function Game(){
    this.asteroids = [];
    this.addAsteroids();
    this.ship = new Ship(this); 
}

Game.prototype.addAsteroids = function(){
    let num = Game.NUM_ASTEROIDS;
    while (num > 0){
        let pos = this.randomPosition();
        this.asteroids.push(new Asteroid(pos, this));
        num--;
    }
}

Game.prototype.randomPosition= function(){
    let pos = [];
    pos[0] = Game.DIM_X * Math.random();
    pos[1] = Game.DIM_Y * Math.random();
    return pos;
};

Game.prototype.draw = function(ctx) {
    ctx.clearRect(0,0,500,500);
    
    this.allObjects().forEach(obj=> {obj.draw(ctx)});
}

Game.prototype.moveObjects = function(){
    this.allObjects().forEach(obj=> {obj.move()});
}

Game.prototype.checkCollisions = function(){
    const collided = [];
    const objects = this.allObjects();
    for (let i = 0; i < objects.length - 1; i++){
        for (let j = i + 1; j < objects.length; j++){
            objects[i].collideWith(objects[j]);
            objects[j].collideWith(objects[i]);
                // collided.push(objects[i], objects[j]);
        }
    }

    // collided.forEach( asteroid => this.remove(asteroid));
}

Game.prototype.step = function(){
    this.moveObjects();
    this.checkCollisions();
}

Game.prototype.remove = function(asteroid){
    let i = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(i,1);
}

Game.prototype.wrap = function(pos){
    //wrap x coordinate
    pos[0] = (pos[0] + 500) % 500;

    //wrap y coordinate
    pos[1] = (pos[1] + 500) % 500;
    
    return pos; 
}

Game.prototype.allObjects = function(){
    const objects = [];
    objects.push(...this.asteroids);
    objects.push(this.ship);
    return objects; 
}

module.exports = Game;