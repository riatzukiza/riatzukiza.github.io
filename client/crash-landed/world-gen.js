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
  SuperPosition
 } = require("@crash-landed/world-gen/super-position.js"),
    { 
  PossibleState
 } = require("@crash-landed/world-gen/possible-state.js"),
    { 
  TerrainModule
 } = require("@crash-landed/world-gen/terrain-module.js"),
    { 
  baseWeights
 } = require("@crash-landed/world-gen/base-weights.js"),
    probabilities = require("@crash-landed/world-gen/probabilities.js"),
    modules = require("@crash-landed/world-gen/modules.js");
require("@crash-landed/world-gen/tile-setup.js");
exports.SuperPosition = SuperPosition;
exports.PossibleState = PossibleState;
exports.TerrainModule = TerrainModule;
exports.TerrainModule = TerrainModule;
exports.baseWeights = baseWeights;
exports.probabilities = probabilities;
exports.modules = modules;