const Game = require('./game.js');
 

function GameView(ctx){
    this.game = new Game();
    this.ctx = ctx;
}

GameView.prototype.start = function(){
    this.bindKeyHandlers();
    setInterval(this.game.step.bind(this.game), 20);
    setInterval(this.game.draw.bind(this.game, this.ctx), 20);
}

GameView.prototype.bindKeyHandlers = function (){
    const that = this;
    key('w', function () {that.game.ship.power([0,-1])});
    key('a', function () {that.game.ship.power([-1,0])});
    key('s', function () {that.game.ship.power([0,1])});
    key('d', function () {that.game.ship.power([1,0])});

    
}

module.exports = GameView;


