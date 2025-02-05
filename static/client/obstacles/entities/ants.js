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
  AntSprites
 } = require("@obstacles/systems/ant-sprites.js"),
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
const ants=create(EntityGroup)("Ants", [ Collision, AntSprites, AntPanel, Physics, Velocity, Position, AntTrails, AntLifeTimer ], game.ent);
var clearAnts = (function clearAnts$() {
  /* clear-ants eval.sibilant:29:0 */

  return ants.clear();
});
var spawnAnt = (function spawnAnt$(x_y$1, home, startingLife) {
  /* spawn-ant eval.sibilant:30:0 */

  var x = x_y$1[0],
      y = x_y$1[1];

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
      return v.accelerate([ (1 + (function() {
        /* eval.sibilant:1:792 */
      
        var rand = ((Math.random() * (config.spawnStatic - 0)) + 0);
        return (config.spawnStatic - (rand / 2));
      }).call(this)), (1 + (function() {
        /* eval.sibilant:1:792 */
      
        var rand = ((Math.random() * (config.spawnStatic - 0)) + 0);
        return (config.spawnStatic - (rand / 2));
      }).call(this)) ]);
    }
  }).call(this);
  return placeEntity(ant, game, config);
});
export { 
  spawnAnt
 };
export { 
  clearAnts
 };
export { 
  ants
 };
var { 
  Friction,
  SignalField
 } = require("@obstacles/forces.js");