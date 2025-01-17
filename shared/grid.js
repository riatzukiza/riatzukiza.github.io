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
 } = require("@crash-landed/world-gen/super-position.js");
var GridCell = Spawnable.define("GridCell", { 
  init( x = this.x,y = this.y,graph = this.graph ){ 
    
      this.x = x;this.y = y;this.graph = graph;
      return this;
    
   },
  get data(  ){ 
    
      throw (new TypeError((this.name + " expects a definition of " + "data")))
    
   },
  get north(  ){ 
    
      return this.graph.get(this.x, (this.y + 1));
    
   },
  get south(  ){ 
    
      return this.graph.get(this.x, (this.y - 1));
    
   },
  get east(  ){ 
    
      return this.graph.get((this.x + 1), this.y);
    
   },
  get west(  ){ 
    
      return this.graph.get((this.x - 1), this.y);
    
   },
  get northEast(  ){ 
    
      return this.graph.get((this.x + 1), (this.y + 1));
    
   },
  get northWest(  ){ 
    
      return this.graph.get((this.x - 1), (this.y + 1));
    
   },
  get southEast(  ){ 
    
      return this.graph.get((this.x + 1), (this.y - 1));
    
   },
  get southWest(  ){ 
    
      return this.graph.get((this.x - 1), (this.y - 1));
    
   },
  def_:area,
  get edges(  ){ 
    
      return (function() {
        if (this._edges) {
          return this._edges;
        } else {
          return this._edges = (function() {
            /* inc/misc.sibilant:1:3417 */
          
            return Array.from(this.area(1));
          }).call(this);
        }
      }).call(this);
    
   },
  get neighbors(  ){ 
    
      return edges.neighbors;
    
   },
  get adjacentTiles(  ){ 
    
      return edges.adjacentTiles;
    
   },
  get adjacent(  ){ 
    
      return edges.adjacent;
    
   }
 });
exports.TileNode = TileNode;
var GridChunk = GridView.define("GridChunk", { 
  init( x = this.x,y = this.y,grid = this.grid ){ 
    
      this.x = x;this.y = y;this.grid = grid;
      return this;
    
   },
  get size(  ){ 
    
      return this.grid.chunkSize;
    
   },
  get overlapFactor(  ){ 
    
      return this.grid.overlapFactor;
    
   },
  get cells(  ){ 
    
      return (function() {
        if (this._cells) {
          return this._cells;
        } else {
          return this._cells = (function() {
            /* inc/misc.sibilant:1:3417 */
          
            return Array.from(this.grid.squareArea(this.x, this.y, this.size));
          }).call(this);
        }
      }).call(this);
    
   },
  get gridX(  ){ 
    
      return (function() {
        if (this._gridX) {
          return this._gridX;
        } else {
          return this._gridX = (function() {
            /* inc/misc.sibilant:1:3417 */
          
            return (this.x * this.size * this.overlapFactor);
          }).call(this);
        }
      }).call(this);
    
   },
  get gridY(  ){ 
    
      return (function() {
        if (this._gridY) {
          return this._gridY;
        } else {
          return this._gridY = (function() {
            /* inc/misc.sibilant:1:3417 */
          
            return (this.y * this.size * this.overlapFactor);
          }).call(this);
        }
      }).call(this);
    
   },
  get( x = this.x,y = this.y,grid = this.grid,gridX = this.gridX,gridY = this.gridY,size = this.size ){ 
    
      `
      Shared/Grid/Grid-chunk/get.md

      # Shared.Grid.Grid-chunk.get

      ## arguments

      x: signed int, y: signed int

      ## description

      Retrieves a grid cell from within the chunk.`

      ;
      return this.grid.get((gridX + (x % size)), (gridY + (y % size)));
    
   }
 });
var RectangularView = GridView.define("RectangularView", { 
  init( x = this.x,y = this.y,w = this.w,h = this.h,grid = this.grid ){ 
    
      this.x = x;this.y = y;this.w = w;this.h = h;this.grid = grid;
      return this;
    
   },
  get gridX(  ){ 
    
      return (function() {
        if (this._gridX) {
          return this._gridX;
        } else {
          return this._gridX = (function() {
            /* inc/misc.sibilant:1:3417 */
          
            return (this.x * this.w * 2);
          }).call(this);
        }
      }).call(this);
    
   },
  get gridY(  ){ 
    
      return (function() {
        if (this._gridY) {
          return this._gridY;
        } else {
          return this._gridY = (function() {
            /* inc/misc.sibilant:1:3417 */
          
            return (this.y * this.h * 2);
          }).call(this);
        }
      }).call(this);
    
   },
  get cells(  ){ 
    
      return (function() {
        if (this._cells) {
          return this._cells;
        } else {
          return this._cells = (function() {
            /* inc/misc.sibilant:1:3417 */
          
            return this.grid.area(this.gridX, this.gridY, this.w, this.h);
          }).call(this);
        }
      }).call(this);
    
   }
 });
var GridView = Spawnable.define("GridView", { 
  docString:`
  Shared/Grid/Grid-view.md

  # Shared.Grid.Grid-view

  ## arguments

  None

  ## description

  A generic interface for accessing subsections of a grid.
  Expects an implementation of:
  - Cells: A list of cells in the grid that are in the view area.
  - grid: The grid this is a view into.
  - grid-x: The x coordinate of the origin cell of the grid.
  - grid-y: The y coordinate of the origin cell of the grid.
  - get(x, y): An accessor method for locating cells with in the grid-view.`

  ,
  get grid(  ){ 
    
      throw (new TypeError((this.name + " expects a definition of " + "grid")))
    
   },
  get init(  ){ 
    
      throw (new TypeError((this.name + " expects a definition of " + "init")))
    
   },
  get cells(  ){ 
    
      throw (new TypeError((this.name + " expects a definition of " + "cells")))
    
   },
  get gridX(  ){ 
    
      throw (new TypeError((this.name + " expects a definition of " + "gridX")))
    
   },
  get gridY(  ){ 
    
      throw (new TypeError((this.name + " expects a definition of " + "gridY")))
    
   },
  get get(  ){ 
    
      throw (new TypeError((this.name + " expects a definition of " + "get")))
    
   }
 });
var Grid = Spawnable.define("Grid", { 
  init( cells = Trie.spawn(),chunks = Trie.spawn() ){ 
    
      this.cells = cells;this.chunks = chunks;
      return this;
    
   },
  chunkSize:256,
  overlapFactor:2,
  getNearestChunk( x = this.x,y = this.y,chunkSize = this.chunkSize,overlapFactor = this.overlapFactor ){ 
    
      return this.getChunk(Math.round((x / chunkSize / overlapFactor)), Math.round((y / chunkSize / overlapFactor)));
    
   },
  getChunk( x = this.x,y = this.y,chunkSize = this.chunkSize,overlapFactor = this.overlapFactor ){ 
    
      return (function() {
        if (this.chunks.has([ x, y ])) {
          return this.chunks.get([ x, y ]);
        } else {
          var r = (function() {
            /* inc/misc.sibilant:1:691 */
          
            return Chunk.spawn(x, y, this);
          }).call(this);
          this.chunks.set([ x, y ], r);
          return r;
        }
      }).call(this);
    
   },
  def_:area,
  def_:squareArea,
  get( x,y ){ 
    
      return (function() {
        if (this.cells.has([ x, y ])) {
          return this.cells.get([ x, y ]);
        } else {
          var r = (function() {
            /* inc/misc.sibilant:1:691 */
          
            return (function() {
              if (this.cells.has([ x, y ])) {
                return this.cells.get([ x, y ]);
              } else {
                const tile=GridCell.spawn(x, y, this);
                this.cells.set([ x, y ], tile);
                return tile;
              }
            }).call(this);
          }).call(this);
          this.cells.set([ x, y ], r);
          return r;
        }
      }).call(this);
    
   }
 });
exports.TileLoader = TileLoader;