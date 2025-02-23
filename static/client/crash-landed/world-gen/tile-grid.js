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
import { 
  mixin,
  create,
  extend
 } from "/shared/kit/core/util.js";
import { 
  EventEmitter
 } from "/shared/kit/events/index.js";
import { 
  Spawnable
 } from "/shared/data-structures/spawnable.js";
import { 
  Trie
 } from "/shared/data-structures/trees/trie.js";
import { 
  SuperPosition
 } from "./super-position.js";
import { 
  GridCell,
  Grid,
  GridChunk
 } from "/shared/grid.js";
import { 
  BinaryHeap,
  Heapable
 } from "/shared/data-structures/trees/binary-heap.js";
import { 
  Vector
 } from "/shared/vectors.js";
var Tile = GridCell.define("Tile", { 
  get superPosition(  ){ 
    
      return (function() {
        if (typeof this._superPosition !== "undefined") {
          return this._superPosition;
        } else {
          return this._superPosition = (function() {
            /* inc/misc.sibilant:1:3997 */
          
            return SuperPosition.spawn(this);
          }).call(this);
        }
      }).call(this);
    
   },
  get data(  ){ 
    
      return { 
        x:this.x,
        y:this.y,
        type:this.type
       };
    
   },
  collapse(  ){ 
    
      this.superPosition.collapse();
      return this.data;
    
   }
 });
var sleep = (function sleep$(n) {
  /* sleep eval.sibilant:32:0 */

  return (new Promise(((success, fail) => {
  	var resolve = success,
      reject = fail;
  return setTimeout(resolve, n);
  })));
});
var Chunk = GridChunk.define("Chunk", { 
  get positionVector(  ){ 
    
      return (function() {
        if (typeof this._positionVector !== "undefined") {
          return this._positionVector;
        } else {
          return this._positionVector = (function() {
            /* inc/misc.sibilant:1:3997 */
          
            return Vector.spawn(this.gridX, this.gridY);
          }).call(this);
        }
      }).call(this);
    
   },
  get data(  ){ 
    
      return Array.from(this.collapse());
    
   },
  get heap(  ){ 
    
      return this.grid.heap.heap;
    
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
          return 1;
        } else {
          return -1;
        }
      }).call(this);
    
   },
  *collapse(  ){ 
    
      console.log("collapsing chunk", this);
      if( this.collapsed ){ 
        return ;
       };
      this.collapsing = true;
      var cell = this.cells[(Math.floor((Math.random() * ( - this.cells.length))) + this.cells.length)];
      const visited=(new Set());
      while( cell ){ 
        yield(cell.collapse());
        visited.add(cell);
        const lowestEntropyNeighbor=cell.superPosition.uncollapsedNeighbors.find(((superPosition) => {
        	return superPosition.cell.chunk === this;
        }));;
        (function() {
          if (lowestEntropyNeighbor) {
            return cell = lowestEntropyNeighbor.cell;
          } else {
            return cell = this.cells.find(((cell) => {
            	return !(visited.has(cell));
            }));
          }
        }).call(this)
       };
      this.collapsed = true;
      return this.collapsing = false;
    
   }
 });
export { 
  Tile
 };
var TileGrid = Grid.define("TileGrid", { 
  init(  ){ 
    
      
      Grid.init.call(this);
      return this;
    
   },
  events:create(EventEmitter)(),
  chunkSize:16,
  overlapFactor:2,
  Chunk:Chunk,
  Cell:Tile,
  playerPos:Vector.spawn(0, 0),
  heap:BinaryHeap.spawn(),
  loadingChunks:(new Set()),
  unsentChunks:[],
  searchRadius:1,
  get chunkProcessor(  ){ 
    
      return (function() {
        if (typeof this._chunkProcessor !== "undefined") {
          return this._chunkProcessor;
        } else {
          return this._chunkProcessor = (function() {
            /* inc/misc.sibilant:1:3997 */
          
            return this.processChunks();
          }).call(this);
        }
      }).call(this);
    
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
  get playerChunk(  ){ 
    
      return this.getNearestChunk(this.playerPos.x, this.playerPos.y);
    
   },
  get chunksInSearchRadius(  ){ 
    
      return this.getChunksInSearchRadius();
    
   },
  get nextChunk(  ){ 
    
      return this.getNextChunk();
    
   },
  *requestChunks(  ){ 
  
    while( this.unsentChunks.length ){ 
      yield(this.unsentChunks.pop())
     };
    return null;
  
 },
   async step(  ){ 
  
    const value=await this.chunkProcessor.next();
    console.log("stepping with value", value.value, this.playerChunk, this.playerPos);
    return this.unsentChunks.push(value.value);
  
 },
   async *processChunks(  ){ 
  
    while( true ){ 
      await sleep(0);
      yield(this.nextChunk.data)
     };
    return null;
  
 },
  addToHeap( chunk ){ 
    
      if( (!((chunk.collapsed || this.loadingChunks.has(chunk))) && !(this.heap.includes(chunk))) ){ 
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
      console.log("next chunk", nextChunk, this.playerChunk);
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
    
      console.log("Updating player position", pos, this.playerPos, this.getNearestChunk(pos.x, pos.y), this.playerChunk);
      return (function() {
        if (this.getNearestChunk(pos.x, pos.y) !== this.playerChunk) {
          this.resetSearchRadius();
          this.heap.heapify();
          this.playerPos.x = pos.x;
          return this.playerPos.y = pos.y;
        }
      }).call(this);
    
   },
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
export { 
  TileGrid
 };