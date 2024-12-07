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
 } = require("@obstacles/forces.js"),
    { 
  TreeMap
 } = require("tree-kit"),
    { 
  game,
  activeGameSystems
 } = require("@obstacles/game.js"),
    { 
  rgba
 } = require("@obstacles/colors.js"),
    config = require("@obstacles/config.js");
const rocks=create(EntityGroup)("Rocks", [ Dot, Position, Physics, Collision, Velocity ], game.ent);
const rockBoundries=create(EntityGroup)("Rock boundries", [ Dot, Position, Physics ], game.ent);
const rockPlacementVector=Vector.spawn(0, 0);
const rockScaleVariation=(config.rockMaxSize - config.rockMinSize);
const rockMassVariation=(config.rockMaxMassFactor - config.rockMinMassFactor);
const maxRockBaseMass=(config.rockMassScalingFactor * config.rockMaxMassFactor);
const minRockBaseMass=(config.rockMassScalingFactor * config.rockMinMassFactor);
const maxRockDensity=((config.rockMinSize * maxRockBaseMass) / Math.pow(config.rockMinSize, 3));
const minRockDensity=((config.rockMaxSize * maxRockBaseMass) / Math.pow(config.rockMaxSize, 3));
var spawnRock = (function spawnRock$(x_y$3, mass, scale) {
  /* spawn-rock eval.sibilant:39:0 */

  var x = x_y$3[0],
      y = x_y$3[1];

  var rock = rocks.spawn([ Dot, Position, Physics, Collision, Velocity ]);
  const pos=game.systems.get(Position, rock);
  pos.x = x;
  pos.y = y;
  pos.z = 0;
  const phys=game.systems.get(Physics, rock);
  phys.mass = mass;
  phys.scale = scale;
  phys.forces = [ Friction ];
  const velocity=phys.velocity;
  var hardness = Math.min(200, Math.round((maxRockDensity / phys.density)));
  game.systems.get(Dot, rock).color = rgba(hardness, hardness, hardness, 255);
  return placeEntity(rock, game, config);
});
var lastRockPos = [ ((Math.random() * ( - config.dimensions[0])) + config.dimensions[0]), ((Math.random() * ( - config.dimensions[1])) + config.dimensions[1]) ];
var rockGenStep = (function rockGenStep$(position = lastRockPos, mass = (config.rockMinMassFactor + ((Math.random() * ( - rockMassVariation)) + rockMassVariation)), scale = (config.rockMinSize + ((Math.random() * ( - rockScaleVariation)) + rockScaleVariation))) {
  /* rock-gen-step node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  spawnRock(position, (config.rockMassScalingFactor * scale * mass), scale);
  rockPlacementVector.rotateTo((30 * Math.random()));
  rockPlacementVector.setLength((((Math.random() * ( - 20)) + 20) * scale));
  return lastRockPos = [ (Math.abs((position[0] + rockPlacementVector.x)) % config.dimensions[0]), (Math.abs((position[1] + rockPlacementVector.y)) % config.dimensions[1]) ];
});
exports.rocks = rocks;
exports.spawnRock = spawnRock;
exports.rockGenStep = rockGenStep;