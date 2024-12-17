var { 
  Interface
 } = require("@kit-js/interface");
var Spawnable = Interface.define("Spawnable", { 
  build(  ){ 
    
      return this.pool = [];
    
   },
  spawn( ...args ){ 
    
      return (function() {
        if (this.pool.length > 0) {
          return this.pool.pop().init(...args);
        } else {
          return create(this)(...args);
        }
      }).call(this);
    
   },
  clear(  ){ 
    
      throw (new Error("No clear function defined for spawnable datatype"))
    
   },
  despawn(  ){ 
    
      this.clear();
      return this.pool.push(this);
    
   }
 });
exports.Spawnable = Spawnable;