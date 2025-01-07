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
var R = require("ramda");
var { 
  create,
  extend,
  mixin,
  conditional,
  cond,
  partiallyApplyAfter
 } = require("@kit-js/core/js/util");
var { 
  Game
 } = require("@shared/game.js"),
    { 
  Dot
 } = require("@shared/systems/rendering/dot.js"),
    { 
  Sprites
 } = require("@shared/systems/rendering/gl-sprites.js"),
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
  Collision
 } = require("@shared/systems/collision.js"),
    { 
  rendering
 } = require("@obstacles/rendering.js"),
    { 
  ViewPanel
 } = require("@obstacles/systems/property-view.js"),
    { 
  AntDots
 } = require("@obstacles/systems/ants/ant-dot.js"),
    { 
  AntTrails
 } = require("@obstacles/systems/ants/ant-trails.js"),
    { 
  AntLifeTimer
 } = require("@obstacles/systems/ants/ant-life-timer.js"),
    { 
  TrailDots
 } = require("@obstacles/systems/ants/trail-dots.js"),
    { 
  AntPanel
 } = require("@obstacles/systems/ants/ant-panel.js"),
    { 
  TrailsPanel
 } = require("@obstacles/systems/ants/trail-panel.js"),
    { 
  DecayingTrails
 } = require("@obstacles/systems/ants/trail-segments.js"),
    { 
  AntSprites
 } = require("@obstacles/systems/ant-sprites.js"),
    { 
  RockSprites
 } = require("@obstacles/systems/rock-sprites.js"),
    config = require("@obstacles/config.js");
Position.wraps__QUERY = true;
var activeGameSystems = [ DecayingTrails, AntLifeTimer, Dot, TrailDots, AntDots, AntPanel, TrailsPanel, RockSprites, AntSprites, AntTrails, Physics, Velocity, Position, Collision ];
var game = create(Game)(config, rendering, activeGameSystems, config.gameSpeed);
exports.game = game;
exports.activeGameSystems = activeGameSystems;