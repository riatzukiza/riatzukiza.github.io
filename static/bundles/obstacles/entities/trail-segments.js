require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@obstacles/entities/trail-segments.js":[function(require,module,exports){
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
  TrailDots
 } = require("@obstacles/systems/ants/trail-dots.js"),
    { 
  DecayingTrails
 } = require("@obstacles/systems/ants/trail-segments.js"),
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
    { 
  TrailsPanel
 } = require("@obstacles/systems/ants/trail-panel.js"),
    config = require("@obstacles/config.js");
const systems=[ Position, TrailDots, DecayingTrails, TrailsPanel ];
const trailSegments=create(EntityGroup)("Trail segments", systems, game.ent);
exports.trailSegments = trailSegments;
var spawnAntTrailSegment = (function spawnAntTrailSegment$(ant) {
  /* spawn-ant-trail-segment eval.sibilant:22:0 */

  `
  obstacles/entities/trail-segment/spawn-trail-segment.md

  # obstacles.entities.trail-segment.spawn-trail-segment

  ## arguments

  ant: An entity from the obstacles.entities.ant entity group

  ## description

  Spawns a new trail vector entity from the ants current location and velocity.`

  ;
  const trailSegment=trailSegments.spawn();
  trailSegment.ant = ant;
  const tpos=trailSegment.positionInterface;
  const apos=ant.positionInterface;
  const avel=ant.velocityInterface;
  trailSegment.trailDot.vertex.point.x = tpos.x = apos.x;
  trailSegment.trailDot.vertex.point.y = tpos.y = apos.y;
  trailSegment.trailDot.vertex.point.z = apos.z;
  trailSegment.trailSegment.x = avel.xd;
  trailSegment.trailSegment.y = avel.yd;
  trailSegment.trailSegment.pheremones = SignalField.layer[(Math.min(Math.max(Math.round((apos.x / config.size)), 0), (config.columns - 1)) || 1)][(Math.min(Math.max(Math.round((apos.y / config.size)), 0), (config.rows - 1)) || 1)];
  return trailSegment;
});
exports.spawnAntTrailSegment = spawnAntTrailSegment;
var { 
  Friction,
  SignalField
 } = require("@obstacles/forces.js");
},{"@obstacles/colors.js":"@obstacles/colors.js","@obstacles/config.js":"@obstacles/config.js","@obstacles/forces.js":"@obstacles/forces.js","@obstacles/game.js":"@obstacles/game.js","@obstacles/systems/ants/trail-dots.js":"@obstacles/systems/ants/trail-dots.js","@obstacles/systems/ants/trail-panel.js":"@obstacles/systems/ants/trail-panel.js","@obstacles/systems/ants/trail-segments.js":"@obstacles/systems/ants/trail-segments.js","@obstacles/systems/position.js":"@obstacles/systems/position.js","@obstacles/systems/velocity.js":"@obstacles/systems/velocity.js","@shared/ecs.js":"@shared/ecs.js","@shared/systems/collision.js":"@shared/systems/collision.js","@shared/systems/physics/index.js":"@shared/systems/physics/index.js"}]},{},[]);
