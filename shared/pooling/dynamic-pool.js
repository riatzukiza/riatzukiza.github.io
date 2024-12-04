var { 
  Interface
 } = require("@kit-js/interface");
var { 
  ObjectPool
 } = require("@shared/pooling/object-pool.js"),
    { 
  List
 } = require("@shared/data-structures/list.js");
var sumOf = (function sumOf$(list, p) {
  /* sum-of eval.sibilant:1:430 */

  return list.reduce(((total, e) => {
  	
    return (total + e[p]);
  
  }), 0);
});
var DynamicPool = Interface.define("DynamicPool", { 
  bucketSize:256,
  init( interface = this.interface,bucketSize = this.bucketSize,buckets = List.of(create(ObjectPool)(this.bucketSize, interface)) ){ 
    
      this.interface = interface;this.bucketSize = bucketSize;this.buckets = buckets;
      return this;
    
   },
  get current(  ){ 
    
      return this.buckets.head.item;
    
   },
  get size(  ){ 
    
      return (this.bucketSize * this.buckets.length);
    
   },
  get used(  ){ 
    
      return sumOf(this.buckets, "used");
    
   },
  grow( buckets = this.buckets,bucketSize = this.bucketSize,self = this ){ 
    
      
      return (function(newPool) {
        /* eval.sibilant:1:381 */
      
        buckets.unshift(newPool);
        return newPool;
      }).call(this, create(ObjectPool)(bucketSize, this.interface));
    
   },
  adjust( buckets = this.buckets ){ 
    
      
      var p = buckets.rotateUntil((function() {
        /* eval.sibilant:2:127 */
      
        return arguments[0].free > 0;
      }));
      return (p) ? p : this.grow();
    
   },
  aquire( buckets = this.buckets ){ 
    
      
      return (function(object) {
        /* eval.sibilant:1:381 */
      
        object.bucket = this.current;
        (function() {
          if (!(object.bucket)) {
            throw (new Error("no bucket"))
          }
        }).call(this);
        return object;
      }).call(this, (function() {
        if (this.current.free) {
          return this.current.aquire();
        } else {
          return this.adjust().aquire();
        }
      }).call(this));
    
   },
  release( object = this.object,buckets = this.buckets ){ 
    
      
      return object.bucket.release(object);
    
   },
  clear( buckets = this.buckets ){ 
    
      
      var self = this;
      return self.each((function() {
        /* eval.sibilant:2:1800 */
      
        return self.despawn(arguments[0]);
      }));
    
   },
  each( f = this.f,buckets = this.buckets ){ 
    
      
      var self = this;
      return buckets.each((function() {
        /* eval.sibilant:2:2086 */
      
        return arguments[0]._inUse.each(f);
      }));
    
   },
  spawn( ...args ){ 
    
      
      return (function(r) {
        /* eval.sibilant:1:381 */
      
        r.init(...args);
        return r;
      }).call(this, this.aquire());
    
   },
  despawn( obj ){ 
    
      
      obj.clear();
      return this.release(obj);
    
   },
  register( interface ){ 
    
      
      return interface.pool = this;
    
   }
 });
exports.DynamicPool = DynamicPool;