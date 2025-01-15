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
    
      return this.entity.physicalProperties.scale;
    
   },
  get physics(  ){ 
    
      return this.entity.physicalProperties;
    
   },
  get x(  ){ 
    
      return this.entity.positionInterface.x;
    
   },
  get y(  ){ 
    
      return this.entity.positionInterface.y;
    
   },
  get height(  ){ 
    
      return this.entity.physicalProperties.scale;
    
   },
  get width(  ){ 
    
      return this.entity.physicalProperties.scale;
    
   },
  get maxX(  ){ 
    
      return (this.entity.positionInterface.x + (this.entity.physicalProperties.scale * 0.5));
    
   },
  get maxY(  ){ 
    
      return (this.entity.positionInterface.y + (this.entity.physicalProperties.scale * 0.5));
    
   },
  get minX(  ){ 
    
      return (this.entity.positionInterface.x - (this.entity.physicalProperties.scale * 0.5));
    
   },
  get minY(  ){ 
    
      return (this.entity.positionInterface.y - (this.entity.physicalProperties.scale * 0.5));
    
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
    
      var d1x = (c_.minX - c.maxX),
          d1y = (c_.minY - c.maxY),
          d2x = (c.minX - c_.maxX),
          d2y = (c.minY - c_.maxY);
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
  _check( c,c_ ){ 
    
      if( c.isColliding__QUERY(c_) ){ 
        c.system.game.events.emit("collision", c, c_)
       };
      return ;
    
   },
  _updateAll( t = this.t,components = this.components ){ 
    
      this.quads.clear();
      var node = this.components.values.head;
      while( node ){ 
        var c = node.item;;
        c.checked = false;;
        this.quads.insert(c);
        node = node.next;
       };
      node = this.components.values.head;
      while( node ){ 
        var c = node.item;;
        const possibleCollisions=this.quads.retrieve(c);;
        for (var c_ of possibleCollisions)
        {
        if( (!(c === c_) && !(c_.checked)) ){ 
          this._check(c, c_)
         };
        null
        }
        ;
        c.checked = true;;
        node = node.next;
       };
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
   }, 20, 500));
  const c=game.systems.get(Collision, entity);
  const placementVector=Vector.spawn(1, 1);
  var colliding = true;
  (function() {
    var while$50 = undefined;
    while (colliding) {
      while$50 = (function() {
        var noCollisions = true;
        placementTree.clear();
        c.system.components.each(((c_) => {
        	
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
          var while$51 = undefined;
          while (c.isColliding__QUERY(c_)) {
            while$51 = (function() {
              noCollisions = false;
              placementVector.setLength((1 * c_.scale));
              placementVector.setAngle(((Math.random() * ( - 360)) + 360));
              return c.pos.system.shift(c.pos, [ placementVector.x, placementVector.y ]);
            }).call(this);
          };
          return while$51;
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
    return while$50;
  }).call(this);
  placementVector.despawn();
  return entity;
});
exports.placeEntity = placeEntity;