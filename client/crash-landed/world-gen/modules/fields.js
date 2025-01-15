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
const field=TileChunk.create(15.1, "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass");
exports.field = field;
const meadow=TileChunk.create(5.1, "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass");
exports.meadow = meadow;
const grassyMeadow=TileChunk.create(5, "grass", "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass", "grass");
exports.grassyMeadow = grassyMeadow;
const otherGrassyMeadow=TileChunk.create(5.1, "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass");
exports.otherGrassyMeadow = otherGrassyMeadow;
const loneFlower=TileChunk.create(0.1, "grass", "grass", "grass", "grass", "floweryGrass", "grass", "grass", "grass", "grass");
exports.loneFlower = loneFlower;