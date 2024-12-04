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
const ants=create(EntityGroup)("Ants", activeGameSystems, game.ent);
var clearAnts = (function clearAnts$() {
  /* clear-ants eval.sibilant:20:0 */

  return ants.clear();
});
var spawnAnt = (function spawnAnt$(x_y$4, home, startingLife) {
  /* spawn-ant eval.sibilant:21:0 */

  var x = x_y$4[0],
      y = x_y$4[1];

  var ant = ants.spawn(activeGameSystems);
  game.systems.get(Dot, ant).color = rgba(255, 0, 0, 255);
  game.systems.get(Position, ant).x = x;
  game.systems.get(Position, ant).y = y;
  game.systems.get(Position, ant).z = 0;
  game.systems.get(Physics, ant).scale = 1;
  game.systems.get(Physics, ant).mass = 1;
  game.systems.get(Physics, ant).forces = [ SignalField, Friction ];
  var v = game.systems.get(Velocity, ant);
  (function() {
    if (!(config.spawnStatic === 0)) {
      return v.accelerate([ (1 + ((Math.random() * config.spawnStatic) * (function() {
        if (Math.random() < 0.5) {
          return -1;
        } else {
          return 1;
        }
      }).call(this))), (1 + ((Math.random() * config.spawnStatic) * (function() {
        if (Math.random() < 0.5) {
          return -1;
        } else {
          return 1;
        }
      }).call(this))) ]);
    }
  }).call(this);
  return ant;
});
exports.spawnAnt = spawnAnt;
exports.clearAnts = clearAnts;
exports.ants = ants;