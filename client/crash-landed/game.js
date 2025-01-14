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
  Physics
 } = require("@shared/systems/physics/index.js"),
    { 
  Position
 } = require("@shared/systems/position.js"),
    { 
  PlayerSprites
 } = require("@crash-landed/systems/sprites/player.js"),
    { 
  PropsSprites
 } = require("@crash-landed/systems/sprites/basic-props.js"),
    { 
  rendering
 } = require("@crash-landed/rendering.js"),
    { 
  Velocity
 } = require("@shared/systems/velocity.js"),
    { 
  Sight
 } = require("@crash-landed/systems/sight.js"),
    { 
  GroundTypes
 } = require("@crash-landed/systems/floor-type.js"),
    { 
  TileVisibility
 } = require("@crash-landed/systems/visibility.js"),
    { 
  PathFinding
 } = require("@crash-landed/systems/path-finding.js"),
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
    config = require("@crash-landed/config.js");
var { 
  FloorSprites
 } = require("@crash-landed/systems/sprites/floor.js");
var { 
  CliffSprites
 } = require("@crash-landed/systems/sprites/cliff.js");
var activeGameSystems = [ Position, Physics, Velocity, TileVisibility, Sight, FloorSprites, CliffSprites, PlayerSprites, PropsSprites, GroundTypes, PathFinding, Metabolisim, Containers, MentalState, Item ];
var game = create(Game)(config, rendering, activeGameSystems, config.gameSpeed);
console.log({ 
  PlayerSprites,
  FloorSprites
 });
console.log("this is a game", game);
console.log("and these are it's entities", game.ent);
exports.game = game;
exports.activeGameSystems = activeGameSystems;