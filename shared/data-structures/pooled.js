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
  get dataPool(  ){ 
    
      const symbol=this.symbol;
      console.log("finding pool");
      return (function() {
        if (pools.has(symbol)) {
          return pools.get(symbol);
        } else {
          return (function(value) {
            /* node_modules/kit/inc/scope.sibilant:12:9 */
          
            pools.set(symbol, value);
            return value;
          })((function() {
            /* node_modules/kit/inc/macros.sibilant:30:25 */
          
            console.log("pool cache miss");
            return create(DynamicPool)(this);
          }).call(this));
        }
      }).call(this);
    
   },
  spawn( ...args ){ 
    
      console.log("spawning", this, this.dataPool);
      return this.dataPool.aquire().init(...args);
    
   },
  despawn(  ){ 
    
      return this.dataPool.release(this);
    
   }
 });
exports.PooledDataStructure = PooledDataStructure;