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
var GameEntity = DataType.define("GameEntity", { 
  keys:[ "eid" ]
 });
var GameEntityArray = DynamicArray.define("GameEntityArray", { 
  dataType:GameEntity
 });
var GameEntityManager = Interface.define("GameEntityManager", { 
  init( entities = GameEntityArray.spawn(0, maxGameEntities),indexes = {  },currentId = 0 ){ 
    
      this.entities = entities;this.indexes = indexes;this.currentId = currentId;
      return this;
    
   },
  aquire(  ){ 
    
      const e=this.entities.grow();
      const eid=((this.currentId)++);
      this.indexes[eid] = e.id;
      e.eid = eid;
      return e;
    
   },
  release( eid ){ 
    
      const newIndex=this.last;
      return this.swapAndRemove(this.indexes[eid]);
    
   }
 });