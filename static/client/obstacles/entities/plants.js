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
  Dot
 } = require("@shared/systems/rendering/dot.js"),
    { 
  Position
 } = require("@obstacles/systems/position.js"),
    { 
  Velocity
 } = require("@obstacles/systems/velocity.js"),
    { 
  Physics
 } = require("@shared/systems/physics/index.js"),
    { 
  Component,
  System,
  EntityGroup
 } = require("@shared/ecs.js"),
    { 
  rgba
 } = require("@obstacles/colors.js"),
    { 
  Collision,
  placeEntity
 } = require("@shared/systems/collision.js"),
    { 
  game,
  activeGameSystems
 } = require("@obstacles/game.js"),
    config = require("@obstacles/config.js");
const plants=create(EntityGroup)("Plants", [ Dot, Position, Physics, Collision, Velocity ], game.ent);
var spawnPlant = (function spawnPlant$(x_y$3, mass) {
  /* spawn-plant eval.sibilant:21:0 */

  var x = x_y$3[0],
      y = x_y$3[1];

  var plant = plants.spawn([ Dot, Position, Physics, Collision, Velocity ]);
  game.systems.get(Dot, plant).color = rgba(0, 255, 0, 255);
  game.systems.get(Physics, plant).mass = mass;
  game.systems.get(Physics, plant).scale = mass;
  game.systems.get(Physics, plant).forces = [ Friction ];
  game.systems.get(Position, plant).x = x;
  game.systems.get(Position, plant).y = y;
  game.systems.get(Position, plant).z = 0;
  return placeEntity(plant, game, config);
});
export { 
  plants
 };
export { 
  spawnPlant
 };
var { 
  Friction,
  SignalField
 } = require("@obstacles/forces.js");