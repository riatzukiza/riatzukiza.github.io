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
var NextEntityId = Singleton.define("NextEntityId", { 
  keys:[ "nextId" ]
 });
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
const maxGameEntities=(8 * 1024);
const maxComponentTypeInstances=(8 * 1024);
const gameEntities=GameEntityArray.spawn(0, maxGameEntities);
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
  attach( eid ){ 
    
      if( (this.entityMap.has(eid) || this.changedEntities.has(eid)) ){ 
        return ;
       };
      this.changedEntities.add(eid);
      this.grow();
      return this.last.eid = eid;
    
   },
  step(  ){ 
    
      const l=this.length;
      this.Length.step();
      this.source.step();
      this.changedEntities.clear();
      if( l > this.length ){ 
        for (var i = (this.length - 1);l > i;((i)++))
        {
        this.entityMap.delete(this.indexMap.get(i));
        this.indexMap.delete(i)
        }
        
       };
      return if( l < this.length ){ 
        for (var i = (l - 1);this.length > i;((i)++))
        {
        const c=this.data[i];;
        this.indexMap.set(i, c.eid);
        this.entityMap.set(c.eid, i)
        }
        
       };
    
   },
  getByEid( eid ){ 
    
      const i=this.entityMap.get(eid);
      return this.data[i];
    
   },
  detatch( eid ){ 
    
      const c=this.getByEid(eid);
      this.changedEntities.add(eid);
      this.entityMap.delete(eid);
      this.indexMap.delete(c.id);
      return this.source.swapAndRemove(c.id);
    
   }
 });
var Position = GameComponent.define("Position", { 
  dataKeys:[ "x", "y" ]
 });