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
  updateParticle(v, v.pos, SignalField.field, SignalField.layer, game.ticker.ticks, config.decayOnCollision, false, homePos);
  return updateParticle(v_, v_.pos, SignalField.field, SignalField.layer, game.ticker.ticks, config.decayOnCollision, false, homePos);

})).once("error", ((err) => {
	
  console.log("error on", "antCollision", "of", "game.events", "given", "c(c_)");
  return console.log(err);

}));