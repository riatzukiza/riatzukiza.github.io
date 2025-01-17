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
  Component,
  System
 } = require("@shared/ecs.js"),
    { 
  List
 } = require("@shared/data-structures/list.js");
var FieldOfView = Component.define("FieldOfView", { 
  visibleTiles:List.spawn(),
  unloadedTiles:List.spawn(),
  loadingTiles:(new Set()),
  visibleUnloadedTiles:List.spawn(),
  get worldPos(  ){ 
    
      return this.entity.positionInterface;
    
   },
  range:16,
  collapseRange:64
 });
var Sight = System.define("Sight", { 
  interface:FieldOfView,
  registerTileGraph( tiles ){ 
    
      return this.tiles = tiles;
    
   },
  _updateComponent( c ){ 
    
      const pos=c.entity.positionInterface;
      const occupiedTile=this.tiles.getClosestFromWorldPos(pos.x, pos.y);
      c.visibleTiles.each(((tile) => {
      	
        tile.entity.visibleStatus.explored__QUERY = true;
        return tile.entity.visibleStatus.visible__QUERY = false;
      
      }));
      c.visibleTiles.clear();
      c.unloadedTiles.clear();
      c.loadingVisibleTiles = false;
      for (var x = (occupiedTile.x - c.collapseRange);x < (occupiedTile.x + c.collapseRange);++(x))
      {
      for (var y = (occupiedTile.y - c.collapseRange);y < (occupiedTile.y + c.collapseRange);++(y))
      {
      const tile=this.tiles.get(x, y);;
      (function() {
        if ((!(c.loadingTiles.has(tile)) && !(tile.entity.ground.type))) {
          c.loadingTiles.add(tile);
          return c.unloadedTiles.push(tile);
        }
      }).call(this)
      }
      
      }
      ;
      for (var x = (occupiedTile.x - c.range);x < (occupiedTile.x + c.range);++(x))
      {
      for (var y = (occupiedTile.y - c.range);y < (occupiedTile.y + c.range);++(y))
      {
      const visibleTile=this.tiles.get(x, y);;
      (function() {
        if (c.loadingTiles.has(visibleTile)) {
          return c.loadingVisibleTiles = true;
        }
      }).call(this);
      c.visibleTiles.push(visibleTile);
      visibleTile.entity.visibleStatus.visible__QUERY = true;
      }
      
      }
      ;
      return this;
    
   }
 });
exports.Sight = Sight;