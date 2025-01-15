require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@obstacles/entities/ants.js":[function(require,module,exports){
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
var spawnAnt = (function spawnAnt$(x_y$3, home, startingLife) {
  /* spawn-ant eval.sibilant:30:0 */

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
 } = require("@obstacles/forces.js");
},{"@obstacles/config.js":"@obstacles/config.js","@obstacles/forces.js":"@obstacles/forces.js","@obstacles/game.js":"@obstacles/game.js","@obstacles/systems/ant-sprites.js":"@obstacles/systems/ant-sprites.js","@obstacles/systems/ants/ant-dot.js":"@obstacles/systems/ants/ant-dot.js","@obstacles/systems/ants/ant-life-timer.js":"@obstacles/systems/ants/ant-life-timer.js","@obstacles/systems/ants/ant-panel.js":"@obstacles/systems/ants/ant-panel.js","@obstacles/systems/ants/ant-trails.js":"@obstacles/systems/ants/ant-trails.js","@obstacles/systems/position.js":"@obstacles/systems/position.js","@obstacles/systems/velocity.js":"@obstacles/systems/velocity.js","@shared/ecs.js":"@shared/ecs.js","@shared/systems/collision.js":"@shared/systems/collision.js","@shared/systems/physics/index.js":"@shared/systems/physics/index.js"}]},{},[]);
