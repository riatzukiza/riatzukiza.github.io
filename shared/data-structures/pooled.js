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
      return (function() {
        if (pools.has(symbol)) {
          return pools.get(symbol);
        } else {
          var r = (function() {
            /* inc/misc.sibilant:1:689 */
          
            return create(DynamicPool)(this);
          }).call(this);
          pools.set(symbol, r);
          return r;
        }
      }).call(this);
    
   },
  spawn( ...args ){ 
    
      return this.dataPool.aquire().init(...args);
    
   },
  despawn(  ){ 
    
      return this.dataPool.release(this);
    
   }
 });
exports.PooledDataStructure = PooledDataStructure;