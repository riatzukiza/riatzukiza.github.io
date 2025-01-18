var R = require("ramda");
var { 
  create,
  extend,
  mixin,
  conditional,
  cond,
  partiallyApplyAfter
 } = require("@kit-js/core/js/util");
Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1692 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1754 */

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
 } = require("@shared/grid.js");
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
      return this.data;
    
   }
 });
var Chunk = GridChunk.define("Chunk", { 
  get data(  ){ 
    
      return Array.from(this.collapse());
    
   },
  *collapse(  ){ 
    
      console.log("collapsing chunk", this);
      if( this.collapsed ){ 
        return ;
       };
      for (var cell of this.cells)
      {
      if( cell.type ){ 
        console.log("previously collapsed cell detected");
        continue
       };
      yield(cell.collapse())
      }
      ;
      return this.collapsed = true;
    
   }
 });
exports.Tile = Tile;
var TileGrid = Grid.define("TileGrid", { 
  Chunk:Chunk,
  Cell:Tile,
  init( events = create(EventEmitter)() ){ 
    
      this.events = events;
      Grid.init.call(this);
      return this;
    
   },
  chunkSize:16,
  overlapFactor:2,
  collapseArea( x,y,w,h ){ 
    
   },
  collapseCell( x,y ){ 
    
      return this.get(x, y).collapse();
    
   },
  collapseChunk( x,y ){ 
    
      return this.getChunk(x, y).collapse();
    
   },
  collapseNearestChunk( x,y ){ 
    
      return this.getNearestChunk(x, y).collapse();
    
   },
  collapseCells( coords ){ 
    
      return coords.map(((p) => {
      	
        return this.get(p.x, p.y).collapse();
      
      }));
    
   },
  collapseNearestChunks( x,y,n ){ 
    
      console.log(this);
      return Array.from(this.getNearestChunks(x, y, n), ((chunk) => {
      	
        return chunk.data;
      
      })).flat();
    
   }
 });
exports.TileGrid = TileGrid;