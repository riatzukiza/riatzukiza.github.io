var R = require("ramda");
var { 
  create,
  extend,
  mixin,
  conditional,
  cond,
  partiallyApplyAfter
 } = require("@kit-js/core/js/util");
Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1692 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1754 */

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
const diagonalCrossRoads=TerrainModule.create(intersectionWeight, "stone", "grass", "stone", "grass", "stone", "grass", "stone", "grass", "stone");
const northTJunction=TerrainModule.create(intersectionWeight, "grass", "grass", "grass", "stone", "stone", "stone", "grass", "stone", "grass");
const southTJunction=TerrainModule.create(intersectionWeight, "grass", "stone", "grass", "stone", "stone", "stone", "grass", "grass", "grass");
const eastTJunction=TerrainModule.create(intersectionWeight, "grass", "stone", "grass", "stone", "stone", "grass", "grass", "stone", "grass");
const westTJunction=TerrainModule.create(intersectionWeight, "grass", "stone", "grass", "grass", "stone", "stone", "grass", "stone", "grass");
exports.crossRoads = crossRoads;