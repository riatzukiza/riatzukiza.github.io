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