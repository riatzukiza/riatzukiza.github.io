Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1692 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1754 */

  return Object.keys(this).forEach(((k) => {
  	return f(this[k], k);
  }));
});
import { 
  mixin,
  create,
  extend
 } from "/shared/kit/core/util.js";
var ArrayLike = Data.define("ArrayLike", { 
  docString:"ArrayLike",
  construct( data,f ){ 
    
      return Array.from(data, f);
    
   },
  map( f,data ){ 
    
      return Array.from(data, f);
    
   },
  each( f = this.f,data = this.data ){ 
    
      return (function() {
        /* inc/misc.sibilant:1:254 */
      
        return for (var v of data)
        {
        f(v)
        }
        ;
      }).call(this);
    
   },
  some( condition = this.condition,data = this.data ){ 
    
      return data.some(condition);
    
   },
  every( condition = this.condition,data = this.data ){ 
    
      return data.every(condition);
    
   },
  flat( depth = this.depth,data = this.data ){ 
    
      return data.flat(depth);
    
   },
  flatMap( f = this.f,data = this.data ){ 
    
      return data.flatMap(f);
    
   },
  includes( searchElement = this.searchElement,fromIndex = this.fromIndex,data = this.data ){ 
    
      return data.includes(searchElement, fromIndex);
    
   },
  where( condition = this.condition,action = this.action,data = this.data ){ 
    
      return this.filter(condition).map(action);
    
   },
  when( condition = this.condition,action = this.action,data = this.data ){ 
    
      return for (var value of data)
      {
      if( condition(value) ){ 
        if( action(value) ){ 
          return value;
         }
       }
      }
      ;
    
   },
  filter( f,data ){ 
    
      return this.filter(data, f);
    
   }
 });