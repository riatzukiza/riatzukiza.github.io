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
  Position
 } = require("@shared/systems/position.js"),
    { 
  Sight
 } = require("@crash-landed/systems/sight.js"),
    { 
  player
 } = require("@crash-landed/units.js"),
    { 
  getCardinalDirectionName
 } = require("@crash-landed/directions.js"),
    { 
  generateMainRoad
 } = require("@crash-landed/world-gen.js"),
    { 
  tiles
 } = require("@crash-landed/tiles.js"),
    { 
  PathFinding
 } = require("@crash-landed/systems/path-finding.js"),
    { 
  Velocity
 } = require("@shared/systems/velocity.js"),
    noise = require("@shared/noise.js"),
    config = require("@crash-landed/config.js");
const p=player;
const v=p.velocity.vector;
const gameScale=config.gameScale;
p.physics.scale = config.gameScale;
p.physics.forces = [];
game.tiles = tiles;
PathFinding.tiles = tiles;
Velocity.realTime__QUERY = false;
Position.wraps__QUERY = false;
Sight.registerTileGraph(tiles);
p.sprite.selectSequence("east");
game.start();
game.events.on("tick", ((t) => {
	
  (function() {
    if ((t % 10) === 0) {
      return p.sprite.step();
    }
  }).call(this);
  const directionName=getCardinalDirectionName(v);
  return p.sprite.selectSequence(directionName);

})).once("error", ((err) => {
	
  console.log("error on", "tick", "of", "game.events", "given", "t()");
  return console.log(err);

}));
startInterface();