require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@obstacles/events/ant-found-plant.js":[function(require,module,exports){
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
  placeEntity
 } = require("@shared/systems/collision.js"),
    { 
  config
 } = require("@obstacles/config.js"),
    { 
  Physics
 } = require("@shared/systems/physics/system.js"),
    { 
  Friction,
  SignalField
 } = require("@obstacles/forces.js"),
    config = require("@obstacles/config.js");
const updateParticle=createParticleUpdater(config, game);
Set.prototype.each = (function Set$prototype$each$(f) {
  /* Set.prototype.each eval.sibilant:17:0 */

  this.forEach(f);
  return this;
});
game.events.on("antFoundPlant", ((ant, plant) => {
	
  var av = ant.entity.velocityInterface;
  var ap = game.systems.get(Physics, ant.entity);
  updateParticle(av, av.pos, SignalField.field, SignalField.layer, game.ticker.ticks, true, true, homePos);
  for (var seg of ant.entity.antTrail.segments)
  {
  seg.trailSegment.apply()
  }
  ;
  ant.entity.antLife.reset();
  ((ant.entity.antLife.winCount)++);
  ant.entity.antTrail.segments.clear();
  av.pos.x = homePos.x;
  av.pos.y = homePos.y;
  placeEntity(ant.entity, game, config);
  var pp = game.systems.get(Physics, plant.entity);
  return pp.scale = pp.mass = Math.max((pp.mass - (0.005 * ap.mass)), 0);

}));
},{"@obstacles/config.js":"@obstacles/config.js","@obstacles/entities.js":"@obstacles/entities.js","@obstacles/forces.js":"@obstacles/forces.js","@obstacles/game.js":"@obstacles/game.js","@shared/field.js":"@shared/field.js","@shared/systems/collision.js":"@shared/systems/collision.js","@shared/systems/physics/system.js":"@shared/systems/physics/system.js","@shared/systems/position.js":"@shared/systems/position.js","@shared/systems/velocity.js":"@shared/systems/velocity.js"}]},{},[]);
