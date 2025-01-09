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
  Component,
  System
 } = require("@shared/ecs.js"),
    { 
  List
 } = require("@shared/data-structures/list.js");
var FieldOfView = Component.define("FieldOfView", { 
  visibleTiles:List.spawn(),
  get worldPos(  ){ 
    
      return this.entity.positionInterface;
    
   },
  range:8
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
      for (var x = (occupiedTile.x - c.range);x < (occupiedTile.x + c.range);++(x))
      {
      for (var y = (occupiedTile.y - c.range);y < (occupiedTile.y + c.range);++(y))
      {
      const visibleTile=this.tiles.get(x, y);;
      (function() {
        if (!(visibleTile.entity.visibleStatus.explored__QUERY)) {
          return visibleTile.setup();
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