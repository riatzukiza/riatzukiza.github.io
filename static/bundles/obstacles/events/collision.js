require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@obstacles/events/collision.js":[function(require,module,exports){
var { 
  Velocity
 } = require("@shared/systems/velocity.js");
var { 
  Position
 } = require("@shared/systems/position.js"),
    { 
  Physics
 } = require("@shared/systems/physics/system.js");
var { 
  game
 } = require("@obstacles/game.js"),
    { 
  home,
  plants,
  ants,
  rocks
 } = require("@obstacles/entities.js");
game.events.on("collision", ((c, c_) => {
	
  var v = game.systems.get(Velocity, c.entity);
  var v_ = game.systems.get(Velocity, c_.entity);
  var p = game.systems.get(Physics, c.entity);
  var p_ = game.systems.get(Physics, c_.entity);
  if( (c.entity === home && plants.has(c_.entity)) ){ 
    return game.events.emit("plantCollidingWithSpawn", c, c_);
   };
  if( (c_.entity === home && plants.has(c.entity)) ){ 
    return game.events.emit("plantCollidingWithSpawn", c_, c);
   };
  if( (c.entity === home && rocks.has(c_.entity)) ){ 
    return game.events.emit("plantCollidingWithSpawn", c, c_);
   };
  if( (c_.entity === home && rocks.has(c.entity)) ){ 
    return game.events.emit("plantCollidingWithSpawn", c_, c);
   };
  if( (v && v_ && p && p_) ){ 
    if( (ants.has(c_.entity) && plants.has(c.entity)) ){ 
      return game.events.emit("antFoundPlant", c_, c);
     };
    if( (ants.has(c.entity) && plants.has(c_.entity)) ){ 
      return game.events.emit("antFoundPlant", c, c_);
     };
    if( (ants.has(c.entity) && ants.has(c_.entity)) ){ 
      game.events.emit("simpleCollision", c_, c);
      return game.events.emit("antCollision", c, c_);
     };
    v.pos.x = (v.priorX || v.pos.x);;
    v.pos.y = (v.priorY || v.pos.y);;
    v_.pos.x = (v_.priorX || v_.pos.x);;
    v_.pos.y = (v_.priorY || v_.pos.y);;
    if( ((plants.has(c.entity) && plants.has(c_.entity)) || (plants.has(c.entity) && rocks.has(c_.entity)) || (rocks.has(c.entity) && plants.has(c_.entity)) || (rocks.has(c.entity) && rocks.has(c_.entity))) ){ 
      game.events.emit("staticObjectCollision", c, c_)
     };
    game.events.emit("simpleCollision", c_, c)
   };
  c_.colliding = false;
  return c.colliding = false;

})).once("error", ((err) => {
	
  console.log("error on", "collision", "of", "game.events", "given", "c(c_)");
  return console.log(err);

}));
},{"@obstacles/entities.js":"@obstacles/entities.js","@obstacles/game.js":"@obstacles/game.js","@shared/systems/physics/system.js":"@shared/systems/physics/system.js","@shared/systems/position.js":"@shared/systems/position.js","@shared/systems/velocity.js":"@shared/systems/velocity.js"}]},{},[]);
