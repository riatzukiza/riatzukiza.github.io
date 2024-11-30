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
 } = require("./ecs"),
    { 
  Physics
 } = require("sibilant-game-engine/client/systems/physics"),
    { 
  Position
 } = require("sibilant-game-engine/client/systems/position"),
    { 
  Velocity
 } = require("sibilant-game-engine/client/systems/velocity"),
    { 
  Vector
 } = require("@shared/vectors.js"),
    { 
  TreeMap
 } = require("tree-kit"),
    QuadTree = require("@timohausmann/quadtree-js");
var { 
  List
 } = require("sibilant-game-engine/client/data-structures/list"),
    { 
  DynamicPool
 } = require("sibilant-game-engine/client/pooling/dynamic-pool");
null;
List.rotateUntil = (function List$rotateUntil$(predicate = this.predicate, t = 0) {
  /* List.rotate-until node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  return (function() {
    if (predicate(this.head.item)) {
      return this.head.item;
    } else if (t > (this.size - 1)) {
      return this.rotate().rotateUntil(predicate, ++(t));
    } else {
      return false;
    }
  }).call(this);
});
var CollisionBounds = Component.define("CollisionBounds", { 
  area:0,
  get dimensions(  ){ 
    
      return this.area;
    
   },
  get dim(  ){ 
    
      return this.dimensions;
    
   },
  get scale(  ){ 
    
      return (1.2 * this.physics.scale);
    
   },
  get physics(  ){ 
    
      return this.system.process.systems.get(Physics, this.entity);
    
   },
  get minBounds(  ){ 
    
      var { 
        x,
        y
       } = this.pos;
      return { 
        x,
        y
       };
    
   },
  get boundingBox(  ){ 
    
   },
  get maxBounds(  ){ 
    
      var height = this.scale,
          width = this.scale;
      var { 
        x,
        y
       } = this.pos;
      return { 
        x:(x + this.scale),
        y:(y + this.scale)
       };
    
   },
  get position(  ){ 
    
      return this.system.process.systems.get(Position, this.entity);
    
   },
  get pos(  ){ 
    
      return this.position;
    
   },
  get velocity(  ){ 
    
      return this.system.process.systems.get(Velocity, this.entity);
    
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
    /* eval.sibilant:8:73 */
  
    var d = [ (c_.minBounds.x - c.maxBounds.x), (c_.minBounds.y - c.maxBounds.y), (c.minBounds.x - c_.maxBounds.x), (c.minBounds.y - c_.maxBounds.y) ];
    var d1x = d[0],
        d1y = d[1],
        d2x = d[2],
        d2y = d[3];
    c.colliding = false;
    if( !((d1x >= 0 || d1y >= 0 || d2x >= 0 || d2y >= 0)) ){ 
      c.colliding = true;;
      c_.colliding = true;;
      c.system.game.events.emit("collision", c, c_, d)
     };
    return ;
  })),
  _updateAll( t = this.t,components = this.components ){ 
    
      this.quads.clear();
      this.bitField = create(TreeMap)();
      components.each(((c) => {
      	
        const pos=[ Math.round(c.pos.x), Math.round(c.pos.y) ];
        if( this.bitField.has(pos) ){ 
          return c.system.game.events.emit("collision", c, this.bitField.get(pos));
         };
        const bounds={ 
          x:pos[0],
          y:pos[1],
          height:c.scale,
          width:c.scale
         };
        this.bitField.set(pos, c);
        return this.quads.insert(bounds);
      
      }));
      components.each(((c) => {
      	
        const possibleCollisions=this.quads.retrieve({ 
          x:c.pos.x,
          y:c.pos.y,
          height:c.scale,
          width:c.scale
         });
        for (var pc of possibleCollisions)
        {
        const c_=this.bitField.get([ pc.x, pc.y ]);;
        if( !(c === c_) ){ 
          this._check(c, c_)
         }
        }
        ;
        return ;
      
      }));
      return null;
    
   }
 });
exports.Collision = Collision;