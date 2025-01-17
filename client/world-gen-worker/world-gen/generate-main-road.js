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
var generateMainRoad = (function generateMainRoad$() {
  /* generate-main-road eval.sibilant:1:210 */

  var tile = tiles.get(0, 0);
  var i = 0;
  console.log(tile.entity.ground.type);
  return (function() {
    var while$214 = undefined;
    while ((i < 256 && tile.entity.ground.type !== "stone")) {
      while$214 = (function() {
        ((i)++);
        tile.entity.ground.type = "stone";
        const v=getTileNoise(tile.x, tile.y);
        const direction=getCardinalDirectionName(v);
        console.log(v, direction, tile, tile.entity, tile.entity.ground, tile.entity.ground.type);
        tile = tile[direction];
        return v.despawn();
      }).call(this);
    };
    return while$214;
  }).call(this);
});
exports.generateMainRoad = generateMainRoad;