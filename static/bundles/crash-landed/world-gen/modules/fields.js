require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@crash-landed/world-gen/modules/fields.js":[function(require,module,exports){
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
  TerrainModule
 } = require("@crash-landed/world-gen/terrain-module.js");
const field=TerrainModule.create(15.1, "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass");
exports.field = field;
const meadow=TerrainModule.create(5.1, "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass");
exports.meadow = meadow;
const grassyMeadow=TerrainModule.create(5, "grass", "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass", "grass");
exports.grassyMeadow = grassyMeadow;
const otherGrassyMeadow=TerrainModule.create(5.1, "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass");
exports.otherGrassyMeadow = otherGrassyMeadow;
const loneFlower=TerrainModule.create(0.1, "grass", "grass", "grass", "grass", "floweryGrass", "grass", "grass", "grass", "grass");
exports.loneFlower = loneFlower;
},{"@crash-landed/world-gen/terrain-module.js":"@crash-landed/world-gen/terrain-module.js"}]},{},[]);
