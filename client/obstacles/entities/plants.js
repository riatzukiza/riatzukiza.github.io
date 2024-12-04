var { 
  Dot
 } = require("@shared/systems/rendering/dot.js"),
    { 
  Position
 } = require("@shared/systems/position.js"),
    { 
  Velocity
 } = require("@shared/systems/velocity.js"),
    { 
  Physics
 } = require("@shared/systems/physics/index.js"),
    { 
  Component,
  System,
  EntityGroup
 } = require("@shared/ecs.js"),
    { 
  Group
 } = require("@shared/data-structures/group.js"),
    { 
  List
 } = require("@shared/data-structures/list.js"),
    { 
  Vector
 } = require("@shared/vectors.js"),
    { 
  rgba
 } = require("@obstacles/colors.js"),
    { 
  Collision
 } = require("@shared/systems/collision.js"),
    { 
  Friction,
  SignalField
 } = require("@obstacles/forces.js"),
    { 
  TreeMap
 } = require("tree-kit"),
    { 
  game,
  activeGameSystems
 } = require("@obstacles/game.js"),
    config = require("@obstacles/config.js");
const plants=create(EntityGroup)("Plants", [ Dot, Position, Physics, Collision, Velocity ], game.ent);
var spawnPlant = (function spawnPlant$(x_y$5, mass) {
  /* spawn-plant eval.sibilant:26:0 */

  var x = x_y$5[0],
      y = x_y$5[1];

  var plant = plants.spawn([ Dot, Position, Physics, Collision, Velocity ]);
  game.systems.get(Dot, plant).color = rgba(0, 255, 0, 255);
  game.systems.get(Physics, plant).mass = mass;
  game.systems.get(Physics, plant).scale = mass;
  game.systems.get(Physics, plant).forces = [ Friction ];
  game.systems.get(Position, plant).x = x;
  game.systems.get(Position, plant).y = y;
  game.systems.get(Position, plant).z = 0;
  return plant;
});
exports.plants = plants;
exports.spawnPlant = spawnPlant;