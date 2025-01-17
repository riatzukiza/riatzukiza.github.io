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
  TerrainModule
 } = require("@crash-landed/world-gen/terrain-module.js");
const adjacentStoneWeight=0;
const paralellHorizontalRoads=TerrainModule.create(adjacentStoneWeight, "stone", "stone", "stone", "grass", "grass", "grass", "stone", "stone", "stone");
exports.paralellHorizontalRoads = paralellHorizontalRoads;
const paralellVerticalRoads=TerrainModule.create(adjacentStoneWeight, "stone", "grass", "stone", "stone", "grass", "stone", "stone", "grass", "stone");
exports.paralellVerticalRoads = paralellVerticalRoads;
const fullStone=TerrainModule.create(adjacentStoneWeight, "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone");
exports.fullStone = fullStone;
const loneStoneWeight=0;
TerrainModule.create(loneStoneWeight, "grass", "grass", "grass", "grass", "stone", "grass", "grass", "grass", "grass");
TerrainModule.create(loneStoneWeight, "grass", "stone", "grass", "grass", "grass", "grass", "grass", "grass", "grass");
TerrainModule.create(loneStoneWeight, "stone", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass");
TerrainModule.create(loneStoneWeight, "grass", "grass", "grass", "stone", "grass", "grass", "grass", "grass", "grass");
TerrainModule.create(loneStoneWeight, "grass", "grass", "grass", "grass", "grass", "grass", "stone", "grass", "grass");
TerrainModule.create(loneStoneWeight, "grass", "grass", "grass", "grass", "grass", "grass", "grass", "stone", "grass");
TerrainModule.create(loneStoneWeight, "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "stone");
TerrainModule.create(loneStoneWeight, "grass", "grass", "grass", "grass", "grass", "stone", "grass", "grass", "grass");
TerrainModule.create(loneStoneWeight, "grass", "grass", "stone", "grass", "grass", "grass", "grass", "grass", "grass");
const roadEndStoneWeight=0;
TerrainModule.create(roadEndStoneWeight, "grass", "stone", "grass", "grass", "stone", "grass", "grass", "grass", "grass");
TerrainModule.create(roadEndStoneWeight, "grass", "grass", "grass", "grass", "stone", "grass", "grass", "stone", "grass");
TerrainModule.create(roadEndStoneWeight, "grass", "grass", "grass", "stone", "stone", "grass", "grass", "grass", "grass");
TerrainModule.create(roadEndStoneWeight, "grass", "grass", "grass", "grass", "stone", "stone", "grass", "grass", "grass");