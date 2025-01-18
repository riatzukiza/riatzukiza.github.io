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
 } = require("@shared/grid.js"),
    { 
  BinaryHeap,
  Heapable
 } = require("@shared/data-structures/trees/binary-heap.js"),
    { 
  Vector
 } = require("@shared/vectors.js");
var Tile = GridCell.define("Tile", { 
  get data(  ){ 
    
      return { 
        x:this.x,
        y:this.y,
        type:this.type
       };
    
   },
  get heap(  ){ 
    
      return this.chunk.cellHeap.heap;
    
   },
  get superPosition(  ){ 
    
      return (function() {
        if (this._superPosition) {
          return this._superPosition;
        } else {
          return this._superPosition = (function() {
            /* inc/misc.sibilant:1:3986 */
          
            return SuperPosition.spawn(this);
          }).call(this);
        }
      }).call(this);
    
   },
  get parentIndex(  ){ 
    
      return Heapable.getParentIndex(this.index);
    
   },
  get entropy(  ){ 
    
      return this.superPosition.entropy;
    
   },
  compareTo( s ){ 
    
      return (function() {
        if (this.entropy > s.entropy) {
          return 1;
        } else {
          return -1;
        }
      }).call(this);
    
   },
  collapse(  ){ 
    
      this.superPosition.collapse();
      return this.data;
    
   }
 });
var sleep = (function sleep$(n) {
  /* sleep eval.sibilant:27:0 */

  return (new Promise(((success, fail) => {
  	
    var resolve = success,
        reject = fail;
    return setTimeout(resolve, n);
  
  })));
});
var Chunk = GridChunk.define("Chunk", { 
  get data(  ){ 
    
      return Array.from(this.collapse());
    
   },
  get heap(  ){ 
    
      return this.grid.heap.heap;
    
   },
  get _cellFn(  ){ 
    
      return ((cell, i) => {
      	
        cell.index = i;
        return cell.chunk = this;
      
      });
    
   },
  get cellHeap(  ){ 
    
      return (function() {
        if (this._cellHeap) {
          return this._cellHeap;
        } else {
          return this._cellHeap = (function() {
            /* inc/misc.sibilant:1:3986 */
          
            return BinaryHeap.spawn(this.cells);
          }).call(this);
        }
      }).call(this);
    
   },
  get positionVector(  ){ 
    
      return (function() {
        if (this._positionVector) {
          return this._positionVector;
        } else {
          return this._positionVector = (function() {
            /* inc/misc.sibilant:1:3986 */
          
            return Vector.spawn(this.gridX, this.gridY);
          }).call(this);
        }
      }).call(this);
    
   },
  get parentIndex(  ){ 
    
      return Heapable.getParentIndex(this.index);
    
   },
  get playerPos(  ){ 
    
      return this.grid.playerPos;
    
   },
  get distanceFromPlayer(  ){ 
    
      const dv=this.playerPos.distanceTo(this.positionVector);
      const d=Math.abs(dv.getLength());
      dv.despawn();
      return d;
    
   },
  compareTo( chunk ){ 
    
      return (function() {
        if (this.distanceFromPlayer > chunk.distanceFromPlayer) {
          return -1;
        } else {
          return 1;
        }
      }).call(this);
    
   },
  *collapse(  ){ 
    
      console.log("collapsing chunk", this);
      if( this.collapsed ){ 
        return ;
       };
      this.collapsing = true;
      this.cellHeap.heapify();
      while( this.cellHeap.getMin() ){ 
        yield(this.cellHeap.getMin().collapse());
        this.cellHeap.heapify()
       };
      this.collapsed = true;
      return this.collapsing = false;
    
   }
 });
exports.Tile = Tile;
var TileGrid = Grid.define("TileGrid", { 
  Chunk:Chunk,
  Cell:Tile,
  playerPos:Vector.spawn(0, 0),
  heap:BinaryHeap.spawn(),
  loadingChunks:(new Set()),
  unsentChunks:[],
  *requestChunks(  ){ 
  
    while( this.unsentChunks.length ){ 
      yield(this.unsentChunks.pop())
     };
    return null;
  
 },
  get readyChunks(  ){ 
    
      return Promise.all(Array.from(this.requestChunks()));
    
   },
  get readyTiles(  ){ 
    
      return this.readyChunks.then(((chunks) => {
      	
        console.log("flattening chunks", chunks);
        return chunks.flat();
      
      }));
    
   },
  get chunkProcessor(  ){ 
    
      return (function() {
        if (this._chunkProcessor) {
          return this._chunkProcessor;
        } else {
          return this._chunkProcessor = (function() {
            /* inc/misc.sibilant:1:3986 */
          
            return this.processChunks();
          }).call(this);
        }
      }).call(this);
    
   },
  searchRadius:1,
  get playerChunk(  ){ 
    
      return this.getNearestChunk(this.playerPos.x, this.playerPos.y);
    
   },
  get chunksInSearchRadius(  ){ 
    
      return this.getChunksInSearchRadius();
    
   },
   async step(  ){ 
  
    const value=await this.chunkProcessor.next();
    console.log("stepping with value", value.value);
    return this.unsentChunks.push(value.value);
  
 },
   async *processChunks(  ){ 
  
    while( true ){ 
      await sleep(0);
      yield(this.nextChunk.data)
     };
    return null;
  
 },
  get nextChunk(  ){ 
    
      return this.getNextChunk();
    
   },
  addToHeap( chunk ){ 
    
      if( !((chunk.collapsed || this.loadingChunks.has(chunk))) ){ 
        this.loadingChunks.add(chunk);
        this.heap.insert(chunk)
       };
      return null;
    
   },
  getNextChunk(  ){ 
    
      var nextChunk = this.heap.extractMin();
      while( !(nextChunk) ){ 
        ((this.searchRadius)++);
        for (var chunk of this.chunksInSearchRadius)
        {
        this.addToHeap(chunk)
        }
        ;
        nextChunk = this.heap.extractMin();
       };
      console.log("next chunk", nextChunk);
      this.loadingChunks.delete(nextChunk);
      return nextChunk;
    
   },
  resetSearchRadius(  ){ 
    
      return this.searchRadius = 1;
    
   },
  getChunksInSearchRadius(  ){ 
    
      return this.getNearestChunks(this.playerPos.x, this.playerPos.y, this.searchRadius);
    
   },
  updatePlayerPos( pos ){ 
    
      (function() {
        if (this.getNearestChunk(pos.x, pos.y) !== this.playerChunk) {
          this.resetSearchRadius();
          return this.heap.heapify();
        }
      }).call(this);
      this.playerPos.x = pos.x;
      return this.playerPos.y = pos.y;
    
   },
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
    
      return this.getChunk(x, y).data;
    
   },
  collapseNearestChunk( x,y ){ 
    
      return this.getNearestChunk(x, y).data;
    
   },
  collapseCells( coords ){ 
    
      return coords.map(((p) => {
      	
        return this.get(p.x, p.y).collapse();
      
      }));
    
   },
  collapseNearestChunks( x,y,n ){ 
    
      return Array.from(this.getNearestChunks(x, y, n), ((chunk) => {
      	
        return chunk.data;
      
      })).flat();
    
   }
 });
exports.TileGrid = TileGrid;