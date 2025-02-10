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
  Interface
 } from "/shared/kit/interface/index.js";
import { 
  Database
 } from "/shared/database.js";
const dbs=(new Map());
var getDatabase = (function getDatabase$(name) {
  /* get-database eval.sibilant:4:0 */

  return (function() {
    if (dbs.has(name)) {
      return dbs.get(name);
    } else {
      var r = (function() {
        /* inc/misc.sibilant:1:1260 */
      
        return create(Database)(name);
      }).call(this);
      dbs.set(name, r);
      return r;
    }
  }).call(this);
});
var Saveable = Interface.define("Saveable", { 
  get saveName(  ){ 
    
      throw (new TypeError((this.name + " expects a definition of " + "saveName")))
    
   },
  _nonSerializableKeys:[],
  get database(  ){ 
    
      return (function() {
        if (this._database) {
          return this._database;
        } else {
          return this._database = (function() {
            /* inc/misc.sibilant:1:3986 */
          
            return create(Database)(this.saveName);
          }).call(this);
        }
      }).call(this);
    
   },
  get loadedInstances(  ){ 
    
      return (function() {
        if (this._loadedInstances) {
          return this._loadedInstances;
        } else {
          return this._loadedInstances = (function() {
            /* inc/misc.sibilant:1:3986 */
          
            return (new Map());
          }).call(this);
        }
      }).call(this);
    
   },
  get saveIndex(  ){ 
    
      return (function() {
        if (this._saveIndex) {
          return this._saveIndex;
        } else {
          return this._saveIndex = (function() {
            /* inc/misc.sibilant:1:3986 */
          
            return (function() {
              if (this.currentSaveIndex) {
                return ++(this.currentSaveIndex);
              } else {
                return this.currentSaveIndex = 0;
              }
            }).call(this);
          }).call(this);
        }
      }).call(this);
    
   },
  _filterSerializable( key,value ){ 
    
      return !(this._nonSerializableKeys.includes(key));
    
   },
  getSerializableProperties(  ){ 
    
   },
  _injestionTarget(  ){ 
    
      return Object.create(this);
    
   },
  injest( serializedObject = this.serializedObject,r = this._injestionTarget() ){ 
    
      Object.keys(serializedObject).each(((key) => {
      	const data=serializedObject[key];
      return r[key] = (function() {
        if (data.saveIndex) {
          return this._types[data.collectionName].load();
        } else if (data.interfaceReference) {
          return (function() {
            if (data.interfaceReference.name === "EventEmitter") {
              return create(this._types[data.interfaceReference])();
            } else {
              return this._types[data.interfaceReference];
            }
          }).call(this);
        } else {
          return data;
        }
      }).call(this);
      }));
      return r;
    
   },
  serialize(  ){ 
    
      const serializedObject={ 
        typeName:this.name,
        saveId:this.saveId
       };
      return Object.entries(Object.getOwnPropertyDescriptors(this)).filter((([ key, describer ]) => {
      	return (describer.hasOwnProperty("value") && key !== "_saveId" && typeof describer.value !== "function" && this._filterSerializable(key, describer.value));
      })).reduce(((result, [ key, describer ]) => {
      	result[key] = (function() {
        if (describer.value.save) {
          return { 
            collectionName:describer.value.name,
            saveIndex:describer.value.saveIndex
           };
        } else if (describer.value.symbol) {
          return { 
            interfaceReference:describer.value.name
           };
        } else {
          return result[key] = describer.value;
        }
      }).call(this);
      return result;
      }), serializedObject);
    
   },
  defAsync:save,
  defAsync:loadAll,
  defAsync:load,
  defAsync:delete
 });
export { 
  Saveable
 };