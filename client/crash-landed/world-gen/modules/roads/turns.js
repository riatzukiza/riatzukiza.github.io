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
  crossRoadWeight
 } = require("@crash-landed/world-gen/modules/roads/weights.js");
const northEastTurn=TileChunk.create(turnWeight, "grass", "grass", "grass", "grass", "stone", "stone", "grass", "stone", "grass");
exports.northEastTurn = northEastTurn;
const northWestTurn=TileChunk.create(turnWeight, "grass", "grass", "grass", "stone", "stone", "grass", "grass", "stone", "grass");
exports.northWestTurn = northWestTurn;
const southWestTurn=TileChunk.create(turnWeight, "grass", "stone", "grass", "stone", "stone", "grass", "grass", "grass", "grass");
exports.southWestTurn = southWestTurn;
const southEastTurn=TileChunk.create(roadWeight, "grass", "stone", "grass", "grass", "stone", "stone", "grass", "grass", "grass");
exports.southEastTurn = southEastTurn;