Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1692 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1754 */

  return Object.keys(this).forEach(((k) => {
  	return f(this[k], k);
  }));
});
import { 
  mixin,
  create,
  extend
 } from "/shared/kit/core/util.js";
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
	var v = c.entity.velocityInterface;
var v_ = c_.entity.velocityInterface;
var p = c.entity.physicalProperties;
var p_ = c_.entity.physicalProperties;
return updateParticle(v, v.pos, SignalField.field, SignalField.layer, game.ticker.ticks, config.decayOnCollision, false, homePos);
})).once("error", ((err) => {
	console.log("error on", "antCollision", "of", "game.events", "given", "c(c_)");
return console.log(err);
}));