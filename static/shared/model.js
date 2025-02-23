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
var Model = Data.define("Model", { 
  get objectStoreName(  ){ 
    
      return name.objectStoreName;
    
   },
  get modelName(  ){ 
    
      return name.modelName;
    
   },
  save( databaseName,objectStoreName ){ 
    
   },
  load( databaseName,objectStoreName ){ 
    
   },
  delete( databaseName,objectStoreName ){ 
    
   }
 });