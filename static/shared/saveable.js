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
        if (typeof this._loadedInstances !== "undefined") {
          return this._loadedInstances;
        } else {
          return this._loadedInstances = (function() {
            /* inc/misc.sibilant:1:3997 */
          
            return (new Map());
          }).call(this);
        }
      }).call(this);
    
   },
  get savedInstances(  ){ 
    
      return (function() {
        if (typeof this._savedInstances !== "undefined") {
          return this._savedInstances;
        } else {
          return this._savedInstances = (function() {
            /* inc/misc.sibilant:1:3997 */
          
            return (new Map());
          }).call(this);
        }
      }).call(this);
    
   },
  get saveIndex(  ){ 
    
      return (function() {
        if (typeof this._saveIndex !== "undefined") {
          return this._saveIndex;
        } else {
          return this._saveIndex = (function() {
            /* inc/misc.sibilant:1:3997 */
          
            const _type=this._types[this.symbol];
            return (function() {
              if (!(typeof _type.currentSaveIndex === "undefined")) {
                return ++(_type.currentSaveIndex);
              } else {
                return _type.currentSaveIndex = 0;
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
  injestProperty( saveName = this.saveName,data = this.data,database = this.database,_types = this._types,_symbols = this._symbols ){ 
    
      return Promise.resolve((function() {
        if (data.collectionName) {
          return _types[_symbols[data.collectionName]].load(saveName, data.saveIndex, database).then(((instance) => {
          	(function() {
            if (instance.register) {
              return instance.register();
            }
          }).call(this);
          return instance;
          }));
        } else if (data.interfaceReference) {
          return _types[_symbols[data.interfaceReference]];
        } else if (Array.isArray(data)) {
          return Promise.all(data.map(((value) => {
          	return Saveable.injestProperty(saveName, value, database);
          })));
        } else if ((data instanceof Set)) {
          const set=(new Set());
          const promises=[];
          for (var value of data)
          {
          promises.push(Saveable.injestProperty(saveName, value, database).then(((value) => {
          	return set.add(value);
          })))
          }
          ;
          return Promise.all(promises).then(((nil) => {
          	return set;
          }));
        } else if ((data instanceof Map)) {
          const map=(new Map());
          const promises=[];
          for (var [ key, value ] of data)
          {
          promises.push(Saveable.injestProperty(saveName, value, database).then(((value) => {
          	return map.set((function() {
            if (key.collectionName) {
              return _types[_symbols[key.collectionName]].load(saveName, key.saveIndex, database);
            } else {
              return key;
            }
          }).call(this), value);
          })))
          }
          ;
          return Promise.all(promises).then(((nil) => {
          	return map;
          }));
        } else {
          return data;
        }
      }).call(this));
    
   },
  injest( serializedObject = this.serializedObject,saveName = this.saveName,database = create(Database)(saveName),r = this._injestionTarget(),_types = this._types ){ 
    
      r._saveIndex = serializedObject.saveIndex;
      return Promise.all(Object.keys(serializedObject).filter(((key) => {
      	return ("collectionName" !== key && "saveIndex" !== key);
      })).map(((key) => {
      	const data=serializedObject[key];
      return Saveable.injestProperty(saveName, data, database).then(((value) => {
      	return [ key, value ];
      }));
      }))).then(((properties) => {
      	return properties.reduce(((result, [ key, value ]) => {
      	result[key] = value;
      return result;
      }), r);
      }));
    
   },
  getSerializableProperties(  ){ 
    
      return Object.entries(Object.getOwnPropertyDescriptors(this)).filter((([ key, describer ]) => {
      	return (describer.hasOwnProperty("value") && describer.value && !(describer.value.then) && typeof describer.value !== "symbol" && typeof key !== "symbol" && typeof describer.value !== "function" && this._filterSerializable(key, describer.value));
      }));
    
   },
  getSaveableMembers( _types = this._types ){ 
    
      `
      shared/saveable.md

      # shared.saveable

      ## arguments

      no args

      ## description

      get all property entries which implement the saveable interface.`

      ;
      return this.getSerializableProperties().filter((([ key, describer ]) => {
      	return ((describer.value.save && describer.value.load) || (Array.isArray(describer.value) && describer.value.some(((value) => {
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
      })).flat().filter(((value) => {
      	return value !== _types[value.symbol];
      }));
    
   },
  build(  ){ 
    
      return Database.addCollection(this.name);
    
   },
  serializeProperty( value = this.value,_types = this._types,_symbols = this._symbols ){ 
    
      return (function() {
        if ((value.symbol && value === _types[value.symbol])) {
          return value.serializedSelfInterfaceReference;
        } else if (value.save) {
          return value.serializedSelfReference;
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
              return map.set(this.serializeProperty(key, _types, _symbols), (function() {
                if (v.serialize) {
                  return this.serializeProperty(v, _types, _symbols);
                } else {
                  return v;
                }
              }).call(this));
            }
          }).call(this)
          }
          ;
          return map;
        } else if ((value instanceof Set)) {
          const set=(new Set());
          for (var v of value)
          {
          map.add((function() {
            if (v.serialize) {
              return this.serializeProperty(v, _types, _symbols);
            } else {
              return v;
            }
          }).call(this))
          }
          ;
          return map;
        } else {
          return value;
        }
      }).call(this);
    
   },
  get serializedSelfInterfaceReference(  ){ 
    
      return (function() {
        if (typeof this._serializedSelfInterfaceReference !== "undefined") {
          return this._serializedSelfInterfaceReference;
        } else {
          return this._serializedSelfInterfaceReference = (function() {
            /* inc/misc.sibilant:1:3997 */
          
            return { 
              interfaceReference:this.name
             };
          }).call(this);
        }
      }).call(this);
    
   },
  get serializedSelfReference(  ){ 
    
      return (function() {
        if (typeof this._serializedSelfReference !== "undefined") {
          return this._serializedSelfReference;
        } else {
          return this._serializedSelfReference = (function() {
            /* inc/misc.sibilant:1:3997 */
          
            return { 
              collectionName:this.name,
              saveIndex:this.saveIndex
             };
          }).call(this);
        }
      }).call(this);
    
   },
  get serializedObject(  ){ 
    
      return (function() {
        if (typeof this._serializedObject !== "undefined") {
          return this._serializedObject;
        } else {
          return this._serializedObject = (function() {
            /* inc/misc.sibilant:1:3997 */
          
            return this.serialize();
          }).call(this);
        }
      }).call(this);
    
   },
  serialize( _types = this._types,_symbols = this._symbols ){ 
    
      return this.getSerializableProperties().reduce(((result, [ key, describer ]) => {
      	result[key] = this.serializeProperty(describer.value, _types, _symbols);
      return result;
      }), { 
        collectionName:this.name,
        saveIndex:this.saveIndex
       });
    
   },
  save( saveName = this.saveName,database = create(Database)(saveName),_types = this._types,_symbols = this._symbols ){ 
    
      return Promise.resolve((function() {
        if ((!(this.saved__QUERY) && this !== _types[this.symbol])) {
          return database.put(this.name, this.serializedObject).then(((nil) => {
          	this.saved__QUERY = true;
          return Promise.all(this.getSaveableMembers().map(((value) => {
          	return value.save(saveName, database, _types, _symbols);
          })));
          }));
        }
      }).call(this));
    
   },
  load( saveName = this.saveName,saveIndex = this.saveIndex,database = create(Database)(saveName) ){ 
    
      console.log("loading", saveName, saveIndex, this);
      return (function() {
        if (this.loadedInstances.has(saveIndex)) {
          return this.loadedInstances.get(saveIndex);
        } else {
          var r = (function() {
            /* eval.sibilant:11:23 */
          
            return database.get([ this.name, saveIndex ]).then(((data) => {
            	return this.injest(data, saveName, database);
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