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
function* generateId( id = 0 ){ 
  
    return yield(((id)++));
  
 };
const idGenerator=generateId();
var Data = Interface.define("Data", { 
  init( args = [],_data = this.construct.apply(this, args),id = idGenerator.next() ){ 
    
      this.args = args;this._data = _data;this.id = id;
      return this;
    
   },
  get data(  ){ 
    
      return this._data;
    
   },
  get construct(  ){ 
    
      throw (new TypeError((this.name + " expects a definition of " + "construct")))
    
   },
  clone(  ){ 
    
   },
  create( args ){ 
    
      return Object.create(this).init(args);
    
   },
  map( f ){ 
    
      return this.create(f(this.data));
    
   }
 });