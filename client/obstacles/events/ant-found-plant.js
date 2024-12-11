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
  console.log("found plant", ant.entity.antTrail.segments, plant);
  ant.entity.antTrail.segments.each(((seg) => {
  	
    console.log("applying segment", seg);
    return seg.trailSegment.apply();
  
  }));
  ant.entity.antTrail.segments.clear();
  av.pos.x = homePos.x;
  av.pos.y = homePos.y;
  placeEntity(ant.entity, game, config);
  var pp = game.systems.get(Physics, plant.entity);
  return pp.scale = pp.mass = Math.max((pp.mass - (0.05 * ap.mass)), 0);

}));