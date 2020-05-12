/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n\nAsteroid.COLOR = \"grey\";\nAsteroid.RADIUS = 10;\nUtil.inherits(Asteroid, MovingObject);\n\nfunction Asteroid(pos, game){\n  const options = {};\n\n  options.pos = pos;\n  options.game = game;\n  options.color = Asteroid.COLOR;\n  options.radius = Asteroid.RADIUS;  \n\n  //we used Math.random() * 10 for length- should we randomize this? \n    //TA QUESTION\n  options.vel = Util.randomVec(10 * Math.random())\n  MovingObject.call(this, options); \n}\n\nAsteroid.prototype.collideWith = function (otherObject) { \n    if (this.isCollidedWith(otherObject) && otherObject instanceof Ship){\n        otherObject.relocate();\n    }\n}\n\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n\n// hardcode the dimensions or dynamically define based on canvas using event listener???\n// TA QUESTIONS\nGame.DIM_X = 500;\nGame.DIM_Y = 500;\nGame.NUM_ASTEROIDS = 20;\n\n\nfunction Game(){\n    this.asteroids = [];\n    this.addAsteroids();\n    this.ship = new Ship(this); \n}\n\nGame.prototype.addAsteroids = function(){\n    let num = Game.NUM_ASTEROIDS;\n    while (num > 0){\n        let pos = this.randomPosition();\n        this.asteroids.push(new Asteroid(pos, this));\n        num--;\n    }\n}\n\nGame.prototype.randomPosition= function(){\n    let pos = [];\n    pos[0] = Game.DIM_X * Math.random();\n    pos[1] = Game.DIM_Y * Math.random();\n    return pos;\n};\n\nGame.prototype.draw = function(ctx) {\n    ctx.clearRect(0,0,500,500);\n    \n    this.allObjects().forEach(obj=> {obj.draw(ctx)});\n}\n\nGame.prototype.moveObjects = function(){\n    this.allObjects().forEach(obj=> {obj.move()});\n}\n\nGame.prototype.checkCollisions = function(){\n    const collided = [];\n    const objects = this.allObjects();\n    for (let i = 0; i < objects.length - 1; i++){\n        for (let j = i + 1; j < objects.length; j++){\n            objects[i].collideWith(objects[j]);\n            objects[j].collideWith(objects[i]);\n                // collided.push(objects[i], objects[j]);\n        }\n    }\n\n    // collided.forEach( asteroid => this.remove(asteroid));\n}\n\nGame.prototype.step = function(){\n    this.moveObjects();\n    this.checkCollisions();\n}\n\nGame.prototype.remove = function(asteroid){\n    let i = this.asteroids.indexOf(asteroid);\n    this.asteroids.splice(i,1);\n}\n\nGame.prototype.wrap = function(pos){\n    //wrap x coordinate\n    pos[0] = (pos[0] + 500) % 500;\n\n    //wrap y coordinate\n    pos[1] = (pos[1] + 500) % 500;\n    \n    return pos; \n}\n\nGame.prototype.allObjects = function(){\n    const objects = [];\n    objects.push(...this.asteroids);\n    objects.push(this.ship);\n    return objects; \n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n \n\nfunction GameView(ctx){\n    this.game = new Game();\n    this.ctx = ctx;\n}\n\nGameView.prototype.start = function(){\n    this.bindKeyHandlers();\n    setInterval(this.game.step.bind(this.game), 20);\n    setInterval(this.game.draw.bind(this.game, this.ctx), 20);\n}\n\nGameView.prototype.bindKeyHandlers = function (){\n    const that = this;\n    key('w', function () {that.game.ship.power([0,-1])});\n    key('a', function () {that.game.ship.power([-1,0])});\n    key('s', function () {that.game.ship.power([0,1])});\n    key('d', function () {that.game.ship.power([1,0])});\n\n    \n}\n\nmodule.exports = GameView;\n\n\n\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\");\n\ndocument.addEventListener('DOMContentLoaded', function() {\n    const canvas = document.getElementById(\"game-canvas\");\n    const ctx = canvas.getContext('2d');\n    const view = new GameView(ctx);\n    view.start();\n    window.ctx = ctx;\n})\n\nwindow.MovingObject = MovingObject;\nwindow.Asteroid = Asteroid;\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function MovingObject(options){\n    this.pos = options.pos;\n    this.vel = options.vel;\n    this.radius = options.radius;\n    this.color = options.color;\n    this.game = options.game;\n}\n\nMovingObject.prototype.draw = function(ctx){\n    ctx.beginPath();\n    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);\n    ctx.fillStyle = this.color;\n    ctx.stroke();\n    ctx.fill();\n}\n\nMovingObject.prototype.move = function() {\n    this.pos[0] += this.vel[0];\n    this.pos[1] += this.vel[1];\n    this.game.wrap(this.pos);\n}\n\nMovingObject.prototype.isCollidedWith = function(otherObject) {\n    let hypSquared = (this.pos[0] - otherObject.pos[0]) ** 2 + (this.pos[1] - otherObject.pos[1]) ** 2;\n    let distance = Math.sqrt(hypSquared);\n    return distance <= this.radius + otherObject.radius; \n}\n\nMovingObject.prototype.collideWith = function(otherObject){}\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n\nUtil.inherits(Ship, MovingObject);\n\nShip.RADIUS = 5;\nShip.COLOR = \"red\";  \n\nfunction Ship(game){\n  options = {};\n  options.color = Ship.COLOR;\n  options.radius = Ship.RADIUS; \n  options.vel = [0,0];\n  options.game = game; \n  options.pos = game.randomPosition(); \n  MovingObject.call(this, options)\n}\n\nShip.prototype.relocate = function(){\n    this.pos = this.game.randomPosition();\n    this.vel = [0,0];\n}\n\nShip.prototype.power = function(impulse){\n  this.vel[0] += impulse[0]; \n  this.vel[1] += impulse[1]; \n}\n\nmodule.exports = Ship; \n\n\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n    inherits(childClass, ParentClass){\n        function Surrogate(){};\n        Surrogate.prototype = ParentClass.prototype;\n        childClass.prototype = new Surrogate(); \n        childClass.prototype.constructor = childClass;\n    },\n\n    randomVec(length) {\n        const deg = 2 * Math.PI * Math.random();\n        return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n    },\n\n    scale(vec, m) {\n        return [vec[0] * m, vec[1] * m];\n    }\n};\n\nmodule.exports = Util; \n\n\n\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ });