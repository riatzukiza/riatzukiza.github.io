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
  Spawnable
 } = require("@shared/data-structures/spawnable.js");
var TileNode = Spawnable.define("TileNode", { 
  init( entity = this.entity,graph = this.graph ){ 
    
      this.entity = entity;this.graph = graph;
      return this;
    
   },
  get pos(  ){ 
    
      return this.entity.positionInterface;
    
   },
  set x( x ){ 
    
      return this.pos.x = x;
    
   },
  set y( y ){ 
    
      return this.pos.y = y;
    
   },
  get x(  ){ 
    
      return this.pos.x;
    
   },
  get y(  ){ 
    
      return this.pos.y;
    
   },
  get tileSize(  ){ 
    
      return this.graph.tileSize;
    
   },
  get north(  ){ 
    
      return graph.get(this.x, (this.y + this.tileSize));
    
   },
  get south(  ){ 
    
      return graph.get(this.x, (this.y - this.tileSize));
    
   },
  get east(  ){ 
    
      return graph.get((this.x + this.tileSize), this.y);
    
   },
  get west(  ){ 
    
      return graph.get((this.x - this.tileSize), this.y);
    
   },
  get northEast(  ){ 
    
      return graph.get((this.x + this.tileSize), (this.y + this.tileSize));
    
   },
  get northWest(  ){ 
    
      return graph.get((this.x - this.tileSize), (this.y + this.tileSize));
    
   },
  get southEast(  ){ 
    
      return graph.get((this.x + this.tileSize), (this.y - this.tileSize));
    
   },
  get southWest(  ){ 
    
      return graph.get((this.x - this.tileSize), (this.y - this.tileSize));
    
   },
  cached:edges
 });
var TileGraph = Spawnable.define("TileGraph", { 
  init( tileSize = 30,tileProperties = [],trie = Trie.spawn(),tileEntities = create(EntityGroup)([ Position, Physics ].concat(tileProperties)) ){ 
    
      this.tileSize = tileSize;this.tileProperties = tileProperties;this.trie = trie;this.tileEntities = tileEntities;
      return this;
    
   },
  get( x,y ){ 
    
      return (function() {
        if (this.trie.has([ x, y ])) {
          return this.trie.get([ x, y ]);
        } else {
          const entity=this.tileEntities.spawn();
          const tile=TileNode.spawn(entity, this);
          tile.x = x;
          tile.y = y;
          return this.trie.set([ x, y ], tile);
        }
      }).call(this);
    
   }
 });
exports.TileGraph = TileGraph;