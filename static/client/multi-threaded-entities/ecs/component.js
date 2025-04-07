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
var GameComponent = DataType.define("GameComponent", { 
  get keys(  ){ 
    
      return (function() {
        if (this._keys) {
          return this._keys;
        } else {
          return this._keys = (function() {
            /* inc/misc.sibilant:1:4125 */
          
            return [ "eid" ].concat(dataKeys);
          }).call(this);
        }
      }).call(this);
    
   },
  dataKeys:[]
 });
export { 
  GameComponent
 };
var GameComponentArray = Interface.define("GameComponentArray", { 
  dataType:GameComponent,
  get indexMap(  ){ 
    
      return (function() {
        if (this._indexMap) {
          return this._indexMap;
        } else {
          return this._indexMap = (function() {
            /* inc/misc.sibilant:1:4125 */
          
            return (new Map());
          }).call(this);
        }
      }).call(this);
    
   },
  get entityMap(  ){ 
    
      return (function() {
        if (this._entityMap) {
          return this._entityMap;
        } else {
          return this._entityMap = (function() {
            /* inc/misc.sibilant:1:4125 */
          
            return (new Map());
          }).call(this);
        }
      }).call(this);
    
   },
  get changedEntities(  ){ 
    
      return (function() {
        if (this._changedEntities) {
          return this._changedEntities;
        } else {
          return this._changedEntities = (function() {
            /* inc/misc.sibilant:1:4125 */
          
            return (new Set());
          }).call(this);
        }
      }).call(this);
    
   },
  init( maxSize = this.maxSize,source = DynamicArray.spawn(0, maxSize) ){ 
    
      this.maxSize = maxSize;this.source = source;
      return this;
    
   },
  attach( eid = this.eid,entityMap = this.entityMap,changedEntities = this.changedEntities ){ 
    
      if( (entityMap.has(eid) || changedEntities.has(eid)) ){ 
        return ;
       };
      this.changedEntities.add(eid);
      this.grow();
      return this.last.eid = eid;
    
   },
  step( Length = this.Length,source = this.source,changedEntities = this.changedEntities,entityMap = this.entityMap,indexMap = this.indexMap,data = this.data ){ 
    
      const l=this.length;
      Length.step();
      source.step();
      changedEntities.clear();
      if( l > this.length ){ 
        for (var i = (this.length - 1);l > i;((i)++))
        {
        entityMap.delete(indexMap.get(i));
        indexMap.delete(i)
        }
        
       };
      return if( l < this.length ){ 
        for (var i = (l - 1);length > i;((i)++))
        {
        const c=data[i];;
        indexMap.set(i, c.eid);
        entityMap.set(c.eid, i)
        }
        
       };
    
   },
  getByEid( eid = this.eid,entityMap = this.entityMap,data = this.data ){ 
    
      const i=entityMap.get(eid);
      return data[i];
    
   },
  detatch( eid = this.eid ){ 
    
      const c=this.getByEid(eid);
      this.changedEntities.add(eid);
      this.entityMap.delete(eid);
      this.indexMap.delete(c.id);
      return this.source.swapAndRemove(c.id);
    
   }
 });
export { 
  GameComponentArray
 };