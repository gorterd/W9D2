const MovingObject = require('./moving_object.js');
const Asteroid = require('./asteroid.js');
const GameView = require('./game_view.js');

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext('2d');
    const view = new GameView(ctx);
    view.start();
    window.ctx = ctx;
})

window.MovingObject = MovingObject;
window.Asteroid = Asteroid;
