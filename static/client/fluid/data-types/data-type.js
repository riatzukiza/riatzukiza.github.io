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
import { 
  Spawnable
 } from "/shared/data-structures/spawnable.js";
var DataType = Spawnable.define("DataType", { 
  keys:[],
  init( id = this.id,array = this.array ){ 
    
      this.id = id;this.array = array;
      return this;
    
   },
  get index(  ){ 
    
      return (this.size * this.id);
    
   },
  get size(  ){ 
    
      return this.keys.length;
    
   },
  buffer( length ){ 
    
      return (new SharedArrayBuffer((length * this.size * Float64Array.BYTES_PER_ELEMENT)));
    
   },
  build(  ){ 
    
      return this.keys.each(((key, i) => {
      	return Object.defineProperty(this, key, { 
        get(  ){ 
          
            return this.array.currentState.array[(this.index + i)];
          
         },
        set( value ){ 
          
            return this.array.nextState.array[(this.index + i)] = value;
          
         }
       });
      }));
    
   }
 });
export { 
  DataType
 };