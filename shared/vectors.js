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
  List
 } = require("@shared/data-structures/list.js"),
    { 
  PooledDataStructure
 } = require("@shared/data-structures/pooled.js"),
    { 
  DynamicPool
 } = require("@shared/pooling/dynamic-pool.js");
var Vector = Interface.define("Vector", { 
  init( x = 0,y = 0 ){ 
    
      this.x = x;this.y = y;
      return this;
    
   },
  add( v ){ 
    
      return Vector.spawn((this.x + v.x), (this.y + v.y));
    
   },
  addTo( v ){ 
    
      this.x += v.x;
      return this.y += v.y;
    
   },
  sub( v ){ 
    
      return Vector.spawn((this.x + v.x), (this.y + v.y));
    
   },
  subFrom( v ){ 
    
      this.x = (this.x - v.x);
      return this.y = (this.y - v.y);
    
   },
  mult( n ){ 
    
      return Vector.spawn((this.x * n), (this.y * n));
    
   },
  multTo( n ){ 
    
      this.x = (this.x * n);
      return this.y = (this.y * n);
    
   },
  div( n ){ 
    
      return Vector.spawn((this.x / n), (this.y / n));
    
   },
  divTo( n ){ 
    
      this.x = (this.x / n);
      return this.y = (this.y / n);
    
   },
  setAngle( angle ){ 
    
      const length=this.getLength();
      this.x = (Math.cos(angle) * length);
      return this.y = (Math.sin(angle) * length);
    
   },
  setLength( length ){ 
    
      const angle=this.getAngle();
      this.x = (Math.cos(angle) * length);
      this.y = (Math.sin(angle) * length);
      return this;
    
   },
  getAngle(  ){ 
    
      return Math.atan2(this.y, this.x);
    
   },
  getLength(  ){ 
    
      return Math.hypot(this.x, this.y);
    
   },
  getLengthSq(  ){ 
    
   },
  distanceTo( v ){ 
    
      return this.sub(v);
    
   },
  distanceToSq( v ){ 
    
   },
  manhattanDistanceTo(  ){ 
    
   },
  copy(  ){ 
    
   },
  rotate( angle ){ 
    
      return Vector.spawn(((this.x * Math.cos(angle)) - (this.y * Math.sin(angle))), ((this.x * Math.sin(angle)) - (this.y * Math.cos(angle))));
    
   },
  rotateTo( angle ){ 
    
      const x=((this.x * Math.cos(angle)) - (this.y * Math.sin(angle)));
      const y=((this.x * Math.sin(angle)) - (this.y * Math.cos(angle)));
      this.x = x;
      this.y = y;
      return this;
    
   },
  rotateAround( v,angle ){ 
    
   },
  rotateMeAround( v,angle ){ 
    
   },
  equals( v ){ 
    
   },
  despawn(  ){ 
    
      return vectorPool.release(this);
    
   },
  spawn( x,y ){ 
    
      return vectorPool.aquire().init(x, y);
    
   },
  clear(  ){ 
    
      this.x = null;
      return this.y = null;
    
   }
 });
exports.Vector = Vector;
var TrailVector = Interface.define("TrailVector", { 
  init( x = this.x,y = this.y,pheremones = this.pheremones ){ 
    
      this.x = x;this.y = y;this.pheremones = pheremones;
      return this;
    
   },
  clear(  ){ 
    
      this.x = null;
      this.y = null;
      return this.pheremones = null;
    
   },
  spawn( x,y,pheremones ){ 
    
      return trailPool.aquire().init(x, y, pheremones);
    
   },
  despawn(  ){ 
    
      return trailPool.release(this);
    
   }
 });
exports.TrailVector = TrailVector;
const vectorPool=create(DynamicPool)(Vector);
const trailPool=create(DynamicPool)(TrailVector);
exports.vectorPool = vectorPool;
exports.trailPool = trailPool;