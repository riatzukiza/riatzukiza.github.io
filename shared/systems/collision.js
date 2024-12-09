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
  _clear(  ){ 
    
   },
  get dimensions(  ){ 
    
      return this.area;
    
   },
  get dim(  ){ 
    
      return this.dimensions;
    
   },
  get scale(  ){ 
    
      return this.physics.scale;
    
   },
  get physics(  ){ 
    
      return this.system.process.systems.get(Physics, this.entity);
    
   },
  get x(  ){ 
    
      return Math.round(this.pos.x);
    
   },
  get y(  ){ 
    
      return Math.round(this.pos.y);
    
   },
  get height(  ){ 
    
      return Math.round((2 * this.scale));
    
   },
  get width(  ){ 
    
      return Math.round((2 * this.scale));
    
   },
  get maxX(  ){ 
    
      return (this.x + (this.scale / 2));
    
   },
  get maxY(  ){ 
    
      return (this.y + (this.scale / 2));
    
   },
  get minX(  ){ 
    
      return (this.x - (this.scale / 2));
    
   },
  get minY(  ){ 
    
      return (this.y - (this.scale / 2));
    
   },
  get position(  ){ 
    
      return this.entity.positionInterface;
    
   },
  get pos(  ){ 
    
      return this.position;
    
   },
  get velocity(  ){ 
    
      return this.entity.velocityInterface;
    
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
      components.each(((c) => {
      	
        return this.quads.insert(c);
      
      }));
      components.each(((c) => {
      	
        const possibleCollisions=this.quads.retrieve(c);
        for (var c_ of possibleCollisions)
        {
        if( !(c === c_) ){ 
          this._check(c, c_)
         };
        null
        }
        ;
        return ;
      
      }));
      return null;
    
   }
 });
exports.Collision = Collision;
var placeEntity = (function placeEntity$(entity = this.entity, game = this.game, config = this.config) {
  /* place-entity node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  const placementTree=(new QuadTree({ 
    x:0,
    y:0,
    width:config.dimensions[0],
    height:config.dimensions[1]
   }, 10, 5));
  const c=game.systems.get(Collision, entity);
  const placementVector=Vector.spawn(1, 1);
  var colliding = true;
  (function() {
    var while$12 = undefined;
    while (colliding) {
      while$12 = (function() {
        var noCollisions = true;
        placementTree.clear();
        c.system.components._members.each(((c_) => {
        	
          return (function() {
            if (!(c === c_)) {
              return placementTree.insert(c_);
            }
          }).call(this);
        
        }));
        const possibleCollisions=placementTree.retrieve(c);
        for (var c_ of possibleCollisions)
        {
        (function() {
          var while$13 = undefined;
          while (c.isColliding__QUERY(c_)) {
            while$13 = (function() {
              noCollisions = false;
              placementVector.setLength((0.5 * c_.scale));
              placementVector.setAngle(((Math.random() * ( - 360)) + 360));
              return c.pos.system.shift(c.pos, [ placementVector.x, placementVector.y ]);
            }).call(this);
          };
          return while$13;
        }).call(this)
        }
        ;
        (function() {
          if (noCollisions) {
            return colliding = false;
          }
        }).call(this);
        return null;
      }).call(this);
    };
    return while$12;
  }).call(this);
  placementVector.despawn();
  return entity;
});
exports.placeEntity = placeEntity;