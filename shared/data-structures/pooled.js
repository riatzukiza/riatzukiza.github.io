var { 
  Interface
 } = require("@kit-js/interface");
var { 
  DynamicPool
 } = require("@shared/pooling/dynamic-pool.js");
const pools=(new Map());
var PooledDataStructure = Interface.define("PooledDataStructure", { 
  init(  ){ 
    
      
      throw (new Error("Abstract interface missing init function")());
      return this;
    
   },
  clear(  ){ 
    
      throw (new Error("Abstract interface missing clear function")())
    
   },
  get pool(  ){ 
    
      return (function() {
        if (pools.has(this)) {
          return pools.get(this);
        } else {
          return (function(value) {
            /* node_modules/kit/inc/scope.sibilant:12:9 */
          
            pools.set(this, value);
            return value;
          })((function() {
            /* node_modules/kit/inc/macros.sibilant:30:25 */
          
            return create(DynamicPool)(this);
          }).call(this));
        }
      }).call(this);
    
   },
  spawn( args ){ 
    
      return this.pool.aquire().init(args);
    
   },
  despawn(  ){ 
    
      return this.pool.release(this);
    
   }
 });
exports.PooledDataStructure = PooledDataStructure;