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
var DataType = Spawnable.define("DataType", { 
  keys:[],
  init( index = this.index,array = this.array ){ 
    
      this.index = index;this.array = array;
      return this;
    
   },
  get size(  ){ 
    
      return this.keys.length;
    
   },
  buffer( length ){ 
    
      return (new SharedArrayBuffer((length * this.size * Float64Array.BYTES_PER_ELEMENT)));
    
   },
  build(  ){ 
    
      return defineEachProperty(this.keys, key(i), var get = (function get$() {
        /* get eval.sibilant:16:6 */
      
        return this.array.currentState.array[((this.index * this.keys.length) + i)];
      });, var set = (function set$(value) {
        /* set eval.sibilant:19:6 */
      
        return this.array.nextState.array[((this.index * this.keys.length) + i)] = value;
      }););
    
   }
 });
var Vector2D = DataType.define("Vector2D", { 
  keys:[ "x", "y" ],
  setAngle( angle ){ 
    
      const length=this.getLength();
      this.x = (Math.cos(angle) * length);
      this.y = (Math.sin(angle) * length);
      return (function() {
        if ((isNaN(this.x) || isNaN(this.y))) {
          throw (new Error("Vector parameter is NaN"))
        }
      }).call(this);
    
   },
  setLength( length ){ 
    
      const angle=this.getAngle();
      this.x = (Math.cos(angle) * length);
      this.y = (Math.sin(angle) * length);
      (function() {
        if ((isNaN(this.x) || isNaN(this.y))) {
          throw (new Error("Vector parameter is NaN"))
        }
      }).call(this);
      return this;
    
   },
  addTo( v ){ 
    
      this.x += v.x;
      this.y += v.y;
      return (function() {
        if ((isNaN(this.x) || isNaN(this.y))) {
          throw (new Error("Vector parameter is NaN"))
        }
      }).call(this);
    
   }
 });