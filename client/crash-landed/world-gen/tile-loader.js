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
  EventEmitter
 } = require("kit-events");
var { 
  Spawnable
 } = require("@shared/data-structures/spawnable.js"),
    { 
  Trie
 } = require("@shared/data-structures/trees/trie.js"),
    { 
  SuperPosition
 } = require("@crash-landed/world-gen/super-position.js"),
    { 
  GridCell,
  Grid,
  GridChunk
 } = undefined;
var Tile = GridCell.define("Tile", { 
  get data(  ){ 
    
      return { 
        x:this.x,
        y:this.y,
        type:this.type
       };
    
   },
  collapse(  ){ 
    
      const s=SuperPosition.spawn(this);
      s.collapse();
      s.despawn();
      return this;
    
   }
 });
exports.Tile = Tile;
var TileGrid = Grid.define("TileGrid", { 
  init( events = create(EventEmitter)() ){ 
    
      this.events = events;
      Grid.init().call();
      return this;
    
   },
  chunkSize:256,
  overlapFactor:2,
  def_:collapseChunk
 });
exports.TileLoader = TileLoader;