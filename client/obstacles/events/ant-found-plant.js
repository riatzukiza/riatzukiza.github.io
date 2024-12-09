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
    config = require("@obstacles/config.js"),
    { 
  Friction,
  SignalField
 } = require("@obstacles/forces.js");
const updateParticle=createParticleUpdater(config, game);
game.events.on("antFoundPlant", ((ant, plant) => {
	
  var av = ant.entity.velocityInterface;
  var ap = game.systems.get(Physics, ant.entity);
  isWin = true;
  updateParticle(av, av.pos, SignalField.field, SignalField.layer, game.ticker.ticks, true, true, homePos);
  placeEntity(ant.entity, game, config);
  var pp = game.systems.get(Physics, plant.entity);
  pp.scale = pp.mass = Math.max((pp.mass - (0.05 * ap.mass)), 0);
  return null;

})).once("error", ((err) => {
	
  console.log("error on", "antFoundPlant", "of", "game.events", "given", "ant(plant)");
  return console.log(err);

}));