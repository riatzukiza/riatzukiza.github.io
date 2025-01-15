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
  TileGraph,
  TileNode
 } = require("@shared/tiles.js"),
    { 
  FloorSprites
 } = require("@crash-landed/systems/sprites/floor.js"),
    { 
  TileVisibility
 } = require("@crash-landed/systems/visibility.js"),
    { 
  GroundTypes
 } = require("@crash-landed/systems/floor-type.js"),
    { 
  Containers
 } = require("@crash-landed/systems/containers.js"),
    { 
  game
 } = require("@crash-landed/game.js"),
    config = require("@crash-landed/config.js");
const gameScale=config.gameScale;
const tileSystems=[ FloorSprites, TileVisibility, GroundTypes, Containers ];
const tiles=TileGraph.spawn(gameScale, tileSystems, game);
exports.tiles = tiles;
exports.tileSystems = tileSystems;