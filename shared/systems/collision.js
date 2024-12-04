var R = require("ramda");
var { 
  create,
  extend,
  mixin,
  conditional,
  cond,
  partiallyApplyAfter
 } = require("@kit-js/core/js/util");
var { 
  Interface
 } = require("@kit-js/interface");
var { 
  Component,
  System
 } = require("@shared/ecs.js"),
    { 
  Physics
 } = require("@shared/systems/physics/system.js"),
    { 
  Position
 } = require("@shared/systems/position.js"),
    { 
  Velocity
 } = require("@shared/systems/velocity.js"),
    { 
  Vector
 } = require("@shared/vectors.js"),
    { 
  Trie
 } = require("@shared/data-structures/trees/trie.js"),
    QuadTree = require("@timohausmann/quadtree-js");
var { 
  List
 } = require("@shared/data-structures/list.js"),
    { 
  DynamicPool
 } = require("@shared/pooling/dynamic-pool.js"),
    { 
  PooledDataStructure
 } = require("@shared/data-structures/pooled.js");
var CollisionBounds = Component.define("CollisionBounds", { 
  get dimensions(  ){ 
    
      return this.area;
    
   },
  get dim(  ){ 
    
      return this.dimensions;
    
   },
  get scale(  ){ 
    
      return (1.1 * this.physics.scale);
    
   },
  get physics(  ){ 
    
      return this.system.process.systems.get(Physics, this.entity);
    
   },
  get x(  ){ 
    
      return this.pos.x;
    
   },
  get y(  ){ 
    
      return this.pos.y;
    
   },
  get height(  ){ 
    
      return this.scale;
    
   },
  get width(  ){ 
    
      return this.scale;
    
   },
  get boundingBox(  ){ 
    
      return BoundingBox.spawn(this.x, this.y, this.height, this.width);
    
   },
  get maxX(  ){ 
    
      return (this.x + this.scale);
    
   },
  get maxY(  ){ 
    
      return (this.y + this.scale);
    
   },
  get minX(  ){ 
    
      return this.x;
    
   },
  get minY(  ){ 
    
      return this.y;
    
   },
  get position(  ){ 
    
      return this.system.process.systems.get(Position, this.entity);
    
   },
  get pos(  ){ 
    
      return this.position;
    
   },
  get velocity(  ){ 
    
      return this.system.process.systems.get(Velocity, this.entity);
    
   },
  isColliding__QUERY( c_ = this.c_,c = this ){ 
    
      var d = [ (c_.minX - c.maxX), (c_.minY - c.maxY), (c.minX - c_.maxX), (c.minY - c_.maxY) ];
      var d1x = d[0],
          d1y = d[1],
          d2x = d[2],
          d2y = d[3];
      c.colliding = false;
      return !((d1x >= 0 || d1y >= 0 || d2x >= 0 || d2y >= 0));
    
   }
 });
exports.CollisionBounds = CollisionBounds;
var Collision = System.define("Collision", { 
  interface:CollisionBounds,
  setBounds( height = 100,width = 100,maxObjects = 10,maxLevels = 10 ){ 
    
      if( this.quads ){ 
        throw (new Error("bounds are already set"))
       };
      return this.quads = (new QuadTree({ 
        x:0,
        y:0,
        width,
        height
       }, maxObjects, maxLevels));
    
   },
  _check:R.curry((function(c, c_) {
    /* eval.sibilant:9:73 */
  
    c.colliding = false;
    if( c.isColliding__QUERY(c_) ){ 
      c.colliding = true;;
      c_.colliding = true;;
      c.system.game.events.emit("collision", c, c_)
     };
    return ;
  })),
  _updateAll( t = this.t,components = this.components ){ 
    
      this.quads.clear();
      this.bitField = Trie.spawn();
      components.each(((c) => {
      	
        const pos=[ c.pos.x, c.pos.y, c.entity ];
        const node__QUERY=this.bitField.find([ c.pos.x, c.pos.y ]);
        this.bitField.set(pos, c);
        return this.quads.insert(c);
      
      }));
      components.each(((c) => {
      	
        const possibleCollisions=this.quads.retrieve(c);
        for (var pc of possibleCollisions)
        {
        const node=this.bitField.find([ pc.x, pc.y ]);;
        node.each(((c_) => {
        	
          if( !(c === c_.value) ){ 
            this._check(c, c_.value)
           };
          return null;
        
        }))
        }
        ;
        return ;
      
      }));
      this.bitField.despawn();
      return null;
    
   }
 });
exports.Collision = Collision;