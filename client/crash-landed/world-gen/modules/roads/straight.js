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
  roadWeight
 } = require("@crash-landed/world-gen/modules/roads/weights.js");
const horizontalRoad=TileChunk.create(roadWeight, "grass", "grass", "grass", "stone", "stone", "stone", "grass", "grass", "grass");
exports.horizontalRoad = horizontalRoad;
const verticalRoad=TileChunk.create(roadWeight, "grass", "stone", "grass", "grass", "stone", "grass", "grass", "stone", "grass");
exports.verticalRoad = verticalRoad;
const leftDiagonalRoad=TileChunk.create(turnWeight, "stone", "grass", "grass", "grass", "stone", "grass", "grass", "grass", "stone");
exports.leftDiagonalRoad = leftDiagonalRoad;
const rightDiagonalRoad=TileChunk.create(turnWeight, "grass", "grass", "stone", "grass", "stone", "grass", "stone", "grass", "grass");
exports.rightDiagonalRoad = rightDiagonalRoad;