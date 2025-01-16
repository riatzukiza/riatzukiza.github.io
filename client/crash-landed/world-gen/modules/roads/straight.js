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
  roadWeight,
  turnWeight
 } = require("@crash-landed/world-gen/modules/roads/weights.js");
var { 
  TerrainModule
 } = require("@crash-landed/world-gen/terrain-module.js");
const horizontalRoad=TerrainModule.create(roadWeight, "grass", "grass", "grass", "stone", "stone", "stone", "grass", "grass", "grass");
exports.horizontalRoad = horizontalRoad;
const verticalRoad=TerrainModule.create(roadWeight, "grass", "stone", "grass", "grass", "stone", "grass", "grass", "stone", "grass");
exports.verticalRoad = verticalRoad;
const leftDiagonalRoad=TerrainModule.create(roadWeight, "stone", "grass", "grass", "grass", "stone", "grass", "grass", "grass", "stone");
exports.leftDiagonalRoad = leftDiagonalRoad;
const rightDiagonalRoad=TerrainModule.create(roadWeight, "grass", "grass", "stone", "grass", "stone", "grass", "stone", "grass", "grass");
exports.rightDiagonalRoad = rightDiagonalRoad;