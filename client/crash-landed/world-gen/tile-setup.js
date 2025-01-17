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
  SuperPosition
 } = require("@crash-landed/world-gen/super-position.js"),
    { 
  TileNode
 } = require("@shared/tiles.js"),
    { 
  getTileNoise
 } = require("@crash-landed/noise.js"),
    { 
  SuperPositionDistrobution,
  ExpectedLikelyhoodGivenCurrentState,
  CurrentDistrobution
 } = require("@crash-landed/world-gen/probabilities.js"),
    { 
  ItemGroup
 } = require("@crash-landed/units.js"),
    config = require("@crash-landed/config.js");
var collapsedTiles = 0;
TileNode.collapseWaveFunction = (function TileNode$collapseWaveFunction$(depth = 0, maxDepth = 2) {
  /* Tile-node.collapse-wave-function node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  const superPosition=SuperPosition.spawn(this);
  superPosition.collapse();
  ((collapsedTiles)++);
  return superPosition.despawn();
});
TileNode.setup = (function TileNode$setup$(x = this.x, y = this.y) {
  /* Tile-node.setup node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  const v=getTileNoise(x, y);
  this.collapseWaveFunction();
  (function() {
    if (((v.x + v.y) > 16 && this.entity.ground.type === "floweryGrass")) {
      const item=ItemGroup.spawn();
      item.physics.scale = config.gameScale;
      const tileContainer=this.entity.container;
      item.pos.x = this.worldPos.x;
      item.pos.y = this.worldPos.y;
      return tileContainer.add(item.entity);
    }
  }).call(this);
  const groundStats=this.entity.ground.stats;
  const x_=(Math.abs(Math.round((this.x * v.x))) % (groundStats.spriteCoordMaxX - groundStats.spriteCoordMinX));
  const y_=(Math.abs(Math.round((this.y * v.y))) % (groundStats.spriteCoordMaxY - groundStats.spriteCoordMinY));
  const coords=[ (x_ + this.entity.ground.stats.spriteCoordMinX), (y_ + this.entity.ground.stats.spriteCoordMinY) ];
  this.entity.floorSprite.selectTile(...coords);
  return v.despawn();
});