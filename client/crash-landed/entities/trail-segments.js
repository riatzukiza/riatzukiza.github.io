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
 } = require("@crash-landed/systems/ants/trail-dots.js"),
    { 
  DecayingTrails
 } = require("@crash-landed/systems/ants/trail-segments.js"),
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
  Component,
  System,
  EntityGroup
 } = require("@shared/ecs.js"),
    { 
  rgba
 } = require("@crash-landed/colors.js"),
    { 
  Collision,
  placeEntity
 } = require("@shared/systems/collision.js"),
    { 
  game,
  activeGameSystems
 } = require("@crash-landed/game.js"),
    { 
  TrailsPanel
 } = require("@crash-landed/systems/ants/trail-panel.js"),
    config = require("@crash-landed/config.js");
const systems=[ Position, TrailDots, DecayingTrails, TrailsPanel ];
const trailSegments=create(EntityGroup)("Trail segments", systems, game.ent);
exports.trailSegments = trailSegments;
var spawnAntTrailSegment = (function spawnAntTrailSegment$(ant) {
  /* spawn-ant-trail-segment eval.sibilant:22:0 */

  `
  crash-landed/entities/trail-segment/spawn-trail-segment.md

  # crash-landed.entities.trail-segment.spawn-trail-segment

  ## arguments

  ant: An entity from the crash-landed.entities.ant entity group

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
 } = require("@crash-landed/forces.js");