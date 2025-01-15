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
  Interface
 } = require("@kit-js/interface");
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
global.mixin = mixin;
global.create = create;
var { 
  game,
  activeGameSystems
 } = require("@crash-landed/game.js");
var { 
  startInterface
 } = require("@crash-landed/dom.js"),
    { 
  Physics
 } = require("@shared/systems/physics/index.js"),
    { 
  Friction
 } = require("@crash-landed/forces.js"),
    { 
  Position
 } = require("@shared/systems/position.js"),
    { 
  Velocity
 } = require("@shared/systems/velocity.js"),
    { 
  PlayerSprites
 } = require("@crash-landed/systems/sprites/player.js"),
    { 
  FloorSprites
 } = require("@crash-landed/systems/sprites/floor.js"),
    { 
  PropsSprites
 } = require("@crash-landed/systems/sprites/basic-props.js"),
    { 
  Sight
 } = require("@crash-landed/systems/sight.js"),
    { 
  TileVisibility
 } = require("@crash-landed/systems/visibility.js"),
    { 
  PathFinding
 } = require("@crash-landed/systems/path-finding.js"),
    { 
  GroundTypes
 } = require("@crash-landed/systems/floor-type.js"),
    { 
  Metabolisim
 } = require("@crash-landed/systems/metabolisim.js"),
    { 
  Containers
 } = require("@crash-landed/systems/containers.js"),
    { 
  MentalState
 } = require("@crash-landed/systems/mental-state.js"),
    { 
  Item
 } = require("@crash-landed/systems/item.js"),
    { 
  EntityGroup
 } = require("@shared/ecs/entity-group.js"),
    { 
  UnitGroup,
  UnitInstance
 } = require("@shared/units.js"),
    { 
  ItemGroup
 } = require("@crash-landed/units.js"),
    { 
  Vector
 } = require("@shared/vectors.js"),
    { 
  Trie
 } = require("@shared/data-structures/trees/trie.js"),
    { 
  Spawnable
 } = require("@shared/data-structures/spawnable.js"),
    { 
  getTileNoise
 } = require("@crash-landed/noise.js"),
    { 
  summate
 } = require("@shared/math/math.js"),
    noise = require("@shared/noise.js"),
    { 
  getCardinalDirection,
  getCardinalDirectionName
 } = require("@crash-landed/directions.js"),
    { 
  tiles
 } = require("@crash-landed/tiles.js"),
    config = require("@crash-landed/config.js");
var { 
  TileGraph,
  TileNode
 } = require("@shared/tiles.js");
var generateMainRoad = (function generateMainRoad$() {
  /* generate-main-road eval.sibilant:85:0 */

  var tile = tiles.get(0, 0);
  var i = 0;
  console.log(tile.entity.ground.type);
  return (function() {
    var while$778 = undefined;
    while ((i < 256 && tile.entity.ground.type !== "stone")) {
      while$778 = (function() {
        ((i)++);
        tile.entity.ground.type = "stone";
        const v=getTileNoise(tile.x, tile.y);
        const direction=getCardinalDirectionName(v);
        console.log(v, direction, tile, tile.entity, tile.entity.ground, tile.entity.ground.type);
        tile = tile[direction];
        return v.despawn();
      }).call(this);
    };
    return while$778;
  }).call(this);
});
exports.generateMainRoad = generateMainRoad;
var nextType = 0;
var isFirstTile__QUERY = true;
var baseWeights = Interface.define("baseWeights", { 
  grass:100,
  stone:1,
  floweryGrass:100
 });