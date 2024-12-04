require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@obstacles/events/ant-collision.js":[function(require,module,exports){
var { 
  Velocity
 } = require("@shared/systems/velocity.js");
var { 
  Position
 } = require("@shared/systems/position.js");
var { 
  game
 } = require("@obstacles/game.js"),
    { 
  createParticleUpdater
 } = require("@shared/field.js"),
    { 
  homePos,
  plants,
  ants,
  rocks
 } = require("@obstacles/entities.js"),
    { 
  Friction,
  SignalField
 } = require("@obstacles/forces.js"),
    { 
  Physics
 } = require("@shared/systems/physics/index.js"),
    config = require("@obstacles/config.js");
const updateParticle=createParticleUpdater(config, game);
game.events.on("antCollision", ((c, c_) => {
	
  var v = game.systems.get(Velocity, c.entity);
  var v_ = game.systems.get(Velocity, c_.entity);
  var p = game.systems.get(Physics, c.entity);
  var p_ = game.systems.get(Physics, c_.entity);
  var xd = ((Math.random() * config.collisionStatic) * (function() {
    if (Math.random() < 0.5) {
      return -1;
    } else {
      return 1;
    }
  }).call(this));
  var yd = ((Math.random() * config.collisionStatic) * (function() {
    if (Math.random() < 0.5) {
      return -1;
    } else {
      return 1;
    }
  }).call(this));
  v.accelerate([ xd, yd ]);
  v_.accelerate([ (xd * -1), (yd * -1) ]);
  updateParticle(v, v.pos, SignalField.field, SignalField.layer, game.ticker.ticks, false, false, homePos);
  return updateParticle(v_, v_.pos, SignalField.field, SignalField.layer, game.ticker.ticks, false, false, homePos);

})).once("error", ((err) => {
	
  console.log("error on", "antCollision", "of", "game.events", "given", "c(c_)");
  return console.log(err);

}));
},{"@obstacles/config.js":"@obstacles/config.js","@obstacles/entities.js":"@obstacles/entities.js","@obstacles/forces.js":"@obstacles/forces.js","@obstacles/game.js":"@obstacles/game.js","@shared/field.js":"@shared/field.js","@shared/systems/physics/index.js":"@shared/systems/physics/index.js","@shared/systems/position.js":"@shared/systems/position.js","@shared/systems/velocity.js":"@shared/systems/velocity.js"}]},{},[]);
