require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@world-gen-worker/world-gen/modules/roads/straight.js":[function(require,module,exports){
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
const grassBelowRoad=TerrainModule.create(roadWeight, "stone", "stone", "stone", "grass", "grass", "grass", "grass", "grass", "grass");
const grassAboveRoad=TerrainModule.create(roadWeight, "grass", "grass", "grass", "grass", "grass", "grass", "stone", "stone", "stone");
const flowersBelowRoad=TerrainModule.create(roadWeight, "stone", "stone", "stone", "grass", "grass", "grass", "floweryGrass", "floweryGrass", "floweryGrass");
const flowersAboveRoad=TerrainModule.create(roadWeight, "floweryGrass", "floweryGrass", "floweryGrass", "grass", "grass", "grass", "stone", "stone", "stone");
const grassOnRightOfRoad=TerrainModule.create(roadWeight, "stone", "grass", "grass", "stone", "grass", "grass", "stone", "grass", "grass");
const grassOnLeftOfRoad=TerrainModule.create(roadWeight, "grass", "grass", "stone", "grass", "grass", "stone", "grass", "grass", "stone");
const flowersOnRightOfRoad=TerrainModule.create(roadWeight, "stone", "grass", "floweryGrass", "stone", "grass", "floweryGrass", "stone", "grass", "floweryGrass");
const flowersOnLeftOfRoad=TerrainModule.create(roadWeight, "floweryGrass", "grass", "stone", "floweryGrass", "grass", "stone", "floweryGrass", "grass", "stone");
},{"@crash-landed/world-gen/modules/roads/weights.js":"@crash-landed/world-gen/modules/roads/weights.js","@crash-landed/world-gen/terrain-module.js":"@crash-landed/world-gen/terrain-module.js"}]},{},[]);
