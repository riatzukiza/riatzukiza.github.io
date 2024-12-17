var { 
  AntDots
 } = require("@obstacles/systems/ants/ant-dot.js"),
    { 
  AntTrails
 } = require("@obstacles/systems/ants/ant-trails.js"),
    { 
  AntLifeTimer
 } = require("@obstacles/systems/ants/ant-life-timer.js"),
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
  EntityGroup
 } = require("@shared/ecs.js"),
    { 
  Collision,
  placeEntity
 } = require("@shared/systems/collision.js"),
    { 
  game,
  activeGameSystems
 } = require("@obstacles/game.js"),
    { 
  AntPanel
 } = require("@obstacles/systems/ants/ant-panel.js"),
    config = require("@obstacles/config.js");
const ants=create(EntityGroup)("Ants", [ Collision, AntDots, AntPanel, Physics, Velocity, Position, AntTrails, AntLifeTimer ], game.ent);
var clearAnts = (function clearAnts$() {
  /* clear-ants eval.sibilant:25:0 */

  return ants.clear();
});
var spawnAnt = (function spawnAnt$(x_y$3, home, startingLife) {
  /* spawn-ant eval.sibilant:26:0 */

  var x = x_y$3[0],
      y = x_y$3[1];

  var ant = ants.spawn();
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
  return placeEntity(ant, game, config);
});
exports.spawnAnt = spawnAnt;
exports.clearAnts = clearAnts;
exports.ants = ants;
var { 
  Friction,
  SignalField
 } = require("@obstacles/forces.js");