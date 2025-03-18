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
import '/bundles/external.js';
import { 
  mixin,
  create,
  extend
 } from "/shared/kit/core/util.js";
var CompositeTypedArray = Interface.define("CompositeTypedArray", { 
  dataType:DataType,
  init( length = 0,buffer = this.dataType.buffer(),array = (new Float64Array(buffer)),currentState = this,nextState = this ){ 
    
      this.length = length;this.buffer = buffer;this.array = array;this.currentState = currentState;this.nextState = nextState;
      return this;
    
   },
  get data(  ){ 
    
      return (function() {
        if (this._data) {
          return this._data;
        } else {
          return this._data = (function() {
            /* inc/misc.sibilant:1:3986 */
          
            return data(Array.from(this.generate()));
          }).call(this);
        }
      }).call(this);
    
   },
  get elementSize(  ){ 
    
      return this.dataType.size;
    
   },
  *generate(  ){ 
  
    return for (var i = 0;this.length;i += this.elementSize)
    {
    yield(this.dataType.spawn(i, this))
    }
    ;
  
 }
 });