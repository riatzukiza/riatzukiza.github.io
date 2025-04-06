Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1831 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1893 */

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
import { 
  DoubleBufferedArray
 } from "./double-buffered.js";
var Singleton = DoubleBufferedArray.define("Singleton", { 
  keys:[],
  get dataType(  ){ 
    
      return (function() {
        if (this._dataType) {
          return this._dataType;
        } else {
          return this._dataType = (function() {
            /* inc/misc.sibilant:1:4125 */
          
            const r=Object.create(DataType);
            r.keys = this.keys;
            return r;
          }).call(this);
        }
      }).call(this);
    
   },
  get currentState(  ){ 
    
      return (function() {
        if (this._currentState) {
          return this._currentState;
        } else {
          return this._currentState = (function() {
            /* inc/misc.sibilant:1:4125 */
          
            return this.arrayType.spawn(1);
          }).call(this);
        }
      }).call(this);
    
   },
  get nextState(  ){ 
    
      return (function() {
        if (this._nextState) {
          return this._nextState;
        } else {
          return this._nextState = (function() {
            /* inc/misc.sibilant:1:4125 */
          
            return this.arrayType.spawn(1);
          }).call(this);
        }
      }).call(this);
    
   },
  init(  ){ 
    
      
      return this;
    
   },
  get length(  ){ 
    
      return 1;
    
   },
  build(  ){ 
    
      return this.keys.each(((key, i) => {
      	return Object.defineProperty(this, key, { 
        get(  ){ 
          
            return this.currentState.array[i];
          
         },
        set( value ){ 
          
            return this.nextState.array[i] = value;
          
         }
       });
      }));
    
   }
 });
export { 
  Singleton
 };