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
var Boundry = Interface.define("Boundry", { 
  init( x = this.x,y = this.y,hieght = this.hieght,width = this.width ){ 
    
      this.x = x;this.y = y;this.hieght = hieght;this.width = width;
      return this;
    
   },
  clear(  ){ 
    
      this.x = 0;
      this.y = 0;
      this.height = 0;
      return this.width = 0;
    
   }
 });
const boundryPool=create(DynamicPool)(Boundry);
const bitFieldPool=create(DynamicPool)(TreeMap);
var CollisionBounds = Component.define("CollisionBounds", { 
  area:0,
  get dimensions(  ){ 
    
      return this.area;
    
   },
  get dim(  ){ 
    
      return this.dimensions;
    
   },
  get scale(  ){ 
    
      return (1 * this.physics.scale);
    
   },
  get physics(  ){ 
    
      return this.system.process.systems.get(Physics, this.entity);
    
   },
  get minBounds(  ){ 
    
      return this.pos;
    
   },
  get boundingBox(  ){ 
    
   },
  get maxBounds(  ){ 
    
      return Vector.spawn((this.pos.x + this.scale), (this.pos.y + this.scale));
    
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
    /* eval.sibilant:9:73 */
  
    const maxBounds=c.maxBounds;
    const maxBounds_=c_.maxBounds;
    const dx1=(c_.minBounds.x - maxBounds.x);
    const dx2=(c.minBounds.x - maxBounds_.x);
    c.colliding = false;
    if( !((dx1 >= 0 || dx1 >= 0 || dx2 >= 0 || dx2 >= 0)) ){ 
      c.colliding = true;;
      c_.colliding = true;;
      c.system.game.events.emit("collision", c, c_)
     };
    maxBounds.despawn();
    maxBounds_.despawn();
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
      	
        const bounds=boundryPool.spawn(c.pos.x, c.pos.y, c.scale, c.scale);
        const possibleCollisions=this.quads.retrieve(bounds);
        boundryPool.despawn(bounds);
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
      this.bitField = null;
      return null;
    
   }
 });
exports.Collision = Collision;