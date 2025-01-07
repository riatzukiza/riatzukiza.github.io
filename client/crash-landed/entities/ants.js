Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1121 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1183 */

  return Object.keys(this).forEach(((k) => {
  	
    return f(this[k], k);
  
  }));
});
var { 
  AntDots
 } = require("@crash-landed/systems/ants/ant-dot.js"),
    { 
  AntTrails
 } = require("@crash-landed/systems/ants/ant-trails.js"),
    { 
  AntLifeTimer
 } = require("@crash-landed/systems/ants/ant-life-timer.js"),
    { 
  Position
 } = require("@crash-landed/systems/position.js"),
    { 
  Velocity
 } = require("@crash-landed/systems/velocity.js"),
    { 
  Physics
 } = require("@shared/systems/physics/index.js"),
    { 
  EntityGroup
 } = require("@shared/ecs.js"),
    { 
  AntSprites
 } = require("@crash-landed/systems/ant-sprites.js"),
    { 
  Collision,
  placeEntity
 } = require("@shared/systems/collision.js"),
    { 
  game,
  activeGameSystems
 } = require("@crash-landed/game.js"),
    { 
  AntPanel
 } = require("@crash-landed/systems/ants/ant-panel.js"),
    { 
  GoalFinder
 } = require("@crash-landed/systems/signals/goal.js"),
    { 
  Noise
 } = require("@crash-landed/systems/signals/noise.js"),
    config = require("@crash-landed/config.js");
const ants=create(EntityGroup)("Ants", [ Collision, AntSprites, AntPanel, Physics, Velocity, Position, GoalFinder, Noise, AntLifeTimer ], game.ent);
var clearAnts = (function clearAnts$() {
  /* clear-ants eval.sibilant:34:0 */

  return ants.clear();
});
var spawnAnt = (function spawnAnt$(x_y$15, home, startingLife) {
  /* spawn-ant eval.sibilant:35:0 */

  var x = x_y$15[0],
      y = x_y$15[1];

  var ant = ants.spawn();
  game.systems.get(Position, ant).x = x;
  game.systems.get(Position, ant).y = y;
  game.systems.get(Position, ant).z = 0;
  game.systems.get(Physics, ant).scale = 10;
  game.systems.get(Physics, ant).mass = 1;
  game.systems.get(Physics, ant).forces = [ Friction ];
  var v = game.systems.get(Velocity, ant);
  (function() {
    if (!(config.spawnStatic === 0)) {
      return v.accelerate([ (1 + (function() {
        /* eval.sibilant:1:511 */
      
        var rand = ((Math.random() * (config.spawnStatic - 0)) + 0);
        return (config.spawnStatic - (rand / 2));
      }).call(this)), (1 + (function() {
        /* eval.sibilant:1:511 */
      
        var rand = ((Math.random() * (config.spawnStatic - 0)) + 0);
        return (config.spawnStatic - (rand / 2));
      }).call(this)) ]);
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
 } = require("@crash-landed/forces.js");