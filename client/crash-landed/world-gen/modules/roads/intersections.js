Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1123 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1185 */

  return Object.keys(this).forEach(((k) => {
  	
    return f(this[k], k);
  
  }));
});
var { 
  intersectionWeight
 } = require("@crash-landed/world-gen/modules/roads/weights.js");
var { 
  TerrainModule
 } = require("@crash-landed/world-gen/terrain-module.js");
const crossRoads=TerrainModule.create(intersectionWeight, "grass", "stone", "grass", "stone", "stone", "stone", "grass", "stone", "grass");
exports.crossRoads = crossRoads;