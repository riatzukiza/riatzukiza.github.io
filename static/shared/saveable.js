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
  /* get-database eval.sibilant:6:0 */

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
  _nonSerializableKeys:[],
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
  _injestionTarget(  ){ 
    
      return Object.create(this);
    
   },
  injestProperty( data = this.data,_types = this._types,_symbols = this._symbols ){ 
    
      return (function() {
        if (data.saveIndex) {
          const instance=_types[_symbols[data.collectionName]].load(saveName, data.saveIndex, database);
          (function() {
            if (instance.register) {
              return instance.register();
            }
          }).call(this);
          return instance;
        } else if (data.interfaceReference) {
          return _types[_symbols[data.interfaceReference]];
        } else if (Array.isArray(data)) {
          return data.map(((value) => {
          	return Saveable.injestProperty(value, saveName, database);
          }));
        } else if ((data instanceof Set)) {
          const set=(new Map());
          for (var value of data)
          {
          set.add(Saveable.injestProperty(value, data))
          }
          ;
          return map;
        } else if ((data instanceof Map)) {
          const map=(new Map());
          for (var [ key, value ] of data)
          {
          map.set(key, Saveable.injestProperty(value, data))
          }
          ;
          return map;
        } else {
          return data;
        }
      }).call(this);
    
   },
  injest( serializedObject = this.serializedObject,saveName = this.saveName,database = create(Database)(saveName),r = this._injestionTarget(),_types = this._types ){ 
    
      Object.keys(serializedObject).each(((key) => {
      	const data=serializedObject[key];
      return r[key] = Saveable.injestProperty(data);
      }));
      return r;
    
   },
  getSerializableProperties(  ){ 
    
      return Object.entries(Object.getOwnPropertyDescriptors(this)).filter((([ key, describer ]) => {
      	return (describer.hasOwnProperty("value") && describer.value && typeof describer.value !== "symbol" && typeof key !== "symbol" && typeof describer.value !== "function" && this._filterSerializable(key, describer.value));
      }));
    
   },
  getSaveableMembers(  ){ 
    
      `
      shared/saveable.md

      # shared.saveable

      ## arguments

      no args

      ## description

      get all property entries which implement the saveable interface.`

      ;
      return this.getSerializableProperties().filter((([ key, describer ]) => {
      	return ((Object.hasOwn(describer.value, "save") && Object.hasOwn(describer.value, "load")) || (Array.isArray(describer.value) && describer.value.some(((value) => {
      	return value.save;
      }))) || ((describer.value instanceof Map) && Array.from(describer.value.values()).some(((value) => {
      	return value.save;
      }))));
      })).map((([ key, describer ]) => {
      	return (function() {
        if ((describer.value instanceof Map)) {
          return Array.from(describer.value.values()).filter(((value) => {
          	return value.save;
          }));
        } else if (Array.isArray()) {
          return describer.value.filter(((value) => {
          	return value.save;
          }));
        } else {
          return describer.value;
        }
      }).call(this);
      })).flat();
    
   },
  build(  ){ 
    
      return Database.addCollection(this.name);
    
   },
  serializeProperty( value = this.value,_types = this._types,_symbols = this._symbols ){ 
    
      return (function() {
        if ((value.symbol && this === _types[value.symbol])) {
          return { 
            interfaceReference:value.name
           };
        } else if (value.save) {
          return { 
            collectionName:value.name,
            saveIndex:value.saveIndex
           };
        } else if (Array.isArray(value)) {
          return value.map(((v) => {
          	return this.serializeProperty(v, _types, _symbols);
          }));
        } else if ((value instanceof Map)) {
          const map=(new Map());
          for (var [ key, v ] of value)
          {
          (function() {
            if ((key && typeof key !== "symbol")) {
              return map.set(key, (function() {
                if (v.serialize) {
                  return v.serialize(_types, _symbols);
                } else {
                  return v;
                }
              }).call(this));
            }
          }).call(this)
          }
          ;
          return map;
        } else {
          return value;
        }
      }).call(this);
    
   },
  serialize( _types = this._types,_symbols = this._symbols ){ 
    
      return this.getSerializableProperties().reduce(((result, [ key, describer ]) => {
      	console.log("Serializing key", key, describer);
      result[key] = this.serializeProperty(describer.value, _types, _symbols);
      return result;
      }), { 
        typeName:this.name,
        saveIndex:this.saveIndex
       });
    
   },
  save( saveName = this.saveName,database = create(Database)(saveName) ){ 
    
      return database.put(this.name, this.serialize()).then(((nil) => {
      	return Promise.all(this.getSaveableMembers().map(((value) => {
      	return value.save(saveName, database);
      })));
      }));
    
   },
   async loadAll(  ){ 
  
    const r=[];
    for (var p of this.db.getCursor(this.name))
    {
    const obj=await p;;
    (function() {
      if (this.loadedInstances.has(saveIndex)) {
        return this.loadedInstances.get(saveIndex);
      } else {
        var r = (function() {
          /* eval.sibilant:11:23 */
        
          return this.injest(obj);
        }).call(this);
        this.loadedInstances.set(saveIndex, r);
        return r;
      }
    }).call(this)
    }
    ;
    return r;
  
 },
  load( saveName = this.saveName,saveIndex = 0,database = create(Database)(saveName) ){ 
    
      return (function() {
        if (this.loadedInstances.has(saveIndex)) {
          return this.loadedInstances.get(saveIndex);
        } else {
          var r = (function() {
            /* eval.sibilant:11:23 */
          
            return database.get([ this.name, saveIndex ]).then(((data) => {
            	return this.injest(data, saveName, saveIndex, database);
            }));
          }).call(this);
          this.loadedInstances.set(saveIndex, r);
          return r;
        }
      }).call(this);
    
   },
   async delete(  ){ 
  
 }
 });
export { 
  Saveable
 };