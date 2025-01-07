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
  Dot
 } = require("@shared/systems/rendering/dot.js"),
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
  Group
 } = require("@shared/data-structures/group.js"),
    { 
  List
 } = require("@shared/data-structures/list.js"),
    { 
  Vector
 } = require("@shared/vectors.js"),
    QuadTree = require("@timohausmann/quadtree-js"),
    { 
  Trie
 } = require("@shared/data-structures/trees/trie.js"),
    { 
  Collision,
  placeEntity
 } = require("@shared/systems/collision.js"),
    { 
  Friction,
  SignalField
 } = require("@crash-landed/forces.js"),
    { 
  TreeMap
 } = require("tree-kit"),
    { 
  game,
  activeGameSystems
 } = require("@crash-landed/game.js"),
    { 
  RockSprites
 } = require("@crash-landed/systems/rock-sprites.js"),
    { 
  rgba
 } = require("@crash-landed/colors.js"),
    config = require("@crash-landed/config.js");
const rocks=create(EntityGroup)("Rocks", [ RockSprites, Position, Physics, Collision, Velocity ], game.ent);
const rockPlacementVector=Vector.spawn(0, 0);
const rockScaleVariation=(config.rockMaxSize - config.rockMinSize);
const rockMassVariation=(config.rockMaxMassFactor - config.rockMinMassFactor);
const maxRockBaseMass=(config.rockMassScalingFactor * config.rockMaxMassFactor);
const minRockBaseMass=(config.rockMassScalingFactor * config.rockMinMassFactor);
const maxRockDensity=((config.rockMinSize * maxRockBaseMass) / Math.pow(config.rockMinSize, 3));
const minRockDensity=((config.rockMaxSize * maxRockBaseMass) / Math.pow(config.rockMaxSize, 3));
var spawnRock = (function spawnRock$(x_y$16, mass, scale) {
  /* spawn-rock eval.sibilant:41:0 */

  var x = x_y$16[0],
      y = x_y$16[1];

  console.log("spawning rock");
  var rock = rocks.spawn([ RockSprites, Position, Physics, Collision, Velocity ]);
  const pos=game.systems.get(Position, rock);
  pos.x = x;
  pos.y = y;
  pos.z = 0;
  const phys=game.systems.get(Physics, rock);
  phys.mass = mass;
  phys.scale = scale;
  phys.forces = [ Friction ];
  const velocity=phys.velocity;
  var hardness = Math.max(60, Math.min(225, Math.round((maxRockDensity / phys.density))));
  return placeEntity(rock, game, config);
});
var lastRockPos = [ ((Math.random() * ( - config.dimensions[0])) + config.dimensions[0]), ((Math.random() * ( - config.dimensions[1])) + config.dimensions[1]) ];
var rockGenStep = (function rockGenStep$(position = lastRockPos, mass = (config.rockMinMassFactor + ((Math.random() * ( - rockMassVariation)) + rockMassVariation)), scale = (config.rockMinSize + ((Math.random() * ( - rockScaleVariation)) + rockScaleVariation))) {
  /* rock-gen-step node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  spawnRock(position, (config.rockMassScalingFactor * scale * mass), scale);
  rockPlacementVector.rotateTo((5 * Math.random()));
  rockPlacementVector.setLength((((Math.random() * ( - 50)) + 50) * scale));
  return lastRockPos = [ Math.abs((position[0] + rockPlacementVector.x)), Math.abs((position[1] + rockPlacementVector.y)) ];
});
exports.rocks = rocks;
exports.spawnRock = spawnRock;
exports.rockGenStep = rockGenStep;