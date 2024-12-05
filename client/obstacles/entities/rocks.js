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
var spawnRock = (function spawnRock$(x_y$5, mass, scale) {
  /* spawn-rock eval.sibilant:34:0 */

  var x = x_y$5[0],
      y = x_y$5[1];

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
  const xd=((Math.random() * config.spawnStatic) * (function() {
    if (Math.random() < 0.5) {
      return -1;
    } else {
      return 1;
    }
  }).call(this));
  const yd=((Math.random() * config.spawnStatic) * (function() {
    if (Math.random() < 0.5) {
      return -1;
    } else {
      return 1;
    }
  }).call(this));
  velocity.xd = xd;
  velocity.yd = yd;
  var hardness = Math.round((200 * (phys.density / maxRockDensity)));
  console.log("spawning rock", { 
    x,
    y,
    mass,
    scale,
    rock,
    density:phys.density,
    volume:phys.volume,
    hardness,
    minRockBaseMass,
    maxRockBaseMass,
    minRockDensity,
    maxRockDensity
   });
  game.systems.get(Dot, rock).color = rgba(hardness, hardness, hardness, 255);
  return rock;
});
var rockGenStep = (function rockGenStep$(position = [ ((Math.random() * config.dimensions[0]) * (function() {
  if (Math.random() < 0.5) {
    return -1;
  } else {
    return 1;
  }
}).call(this)), ((Math.random() * config.dimensions[1]) * (function() {
  if (Math.random() < 0.5) {
    return -1;
  } else {
    return 1;
  }
}).call(this)) ], mass = (config.rockMinMassFactor + ((Math.random() * ( - rockMassVariation)) + rockMassVariation)), scale = (config.rockMinSize + ((Math.random() * ( - rockScaleVariation)) + rockScaleVariation))) {
  /* rock-gen-step node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  console.log("Placing rock", { 
    position,
    mass,
    scale,
    config,
    rockMassVariation,
    rockScaleVariation
   });
  rockPlacementVector.setLength(scale);
  rockPlacementVector.setAngle(((Math.random() * ( - scale)) + scale));
  const rock=spawnRock([ (position[0] + rockPlacementVector.x), (position[1] + rockPlacementVector.y) ], (config.rockMassScalingFactor * scale * mass), scale);
  return rock;
});
exports.rocks = rocks;
exports.spawnRock = spawnRock;
exports.rockGenStep = rockGenStep;