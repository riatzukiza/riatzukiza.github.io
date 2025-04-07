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
var GameSystem = Spawnable.define("GameSystem", { 
  dataTypes:[],
  get data(  ){ 
    
      return (function() {
        if (this._data) {
          return this._data;
        } else {
          return this._data = (function() {
            /* inc/misc.sibilant:1:4125 */
          
            return this.buffers.map(((b, i) => {
            	return this.dataTypes[i].fromBuffers(b);
            }));
          }).call(this);
        }
      }).call(this);
    
   },
  init( entities = this.entities ){ 
    
      this.entities = entities;
      return this;
    
   },
  _update( args = this.args,buffers = this.buffers,data = this.data,dataTypes = this.dataTypes ){ 
    
      for (var d of data)
      {
      d.step()
      }
      ;
      return this.update(args, data).then(((results) => {
      	return for (var entities of results.entities)
      {
      const eid=this.entities.aquire();
      }
      ;
      }));
    
   }
 });
export { 
  GameSystem
 };