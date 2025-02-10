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
var Collection = Interface.define("Collection", { 
  init( name = this.name,database = this.database ){ 
    
      this.name = name;this.database = database;
      return this;
    
   },
  _stateTransaction(  ){ 
    
   },
  get( key ){ 
    
   },
  delete( key ){ 
    
   },
  set( key,value ){ 
    
   }
 });
var Database = Interface.define("Database", { 
  init( name = this.name,events = create(EventEmitter)() ){ 
    
      this.name = name;this.events = events;
      return this;
    
   },
  get db(  ){ 
    
      return (function() {
        if (this._db) {
          return this._db;
        } else {
          return this._db = (function() {
            /* inc/misc.sibilant:1:3986 */
          
            return this.start();
          }).call(this);
        }
      }).call(this);
    
   },
  get versionKey(  ){ 
    
      return (this.name + "Version");
    
   },
  get version(  ){ 
    
      return localStorage.getItem(this.versionKey);
    
   },
  set version( v ){ 
    
      return localStorage.setItem(this.versionKey, v);
    
   },
  get collectionNamesKey(  ){ 
    
      return (this.name + "CollectionNames");
    
   },
  set collectionNames( v ){ 
    
      this.version = (1 + this.version);
      return localStorage.setItem(this.collectionNamesKey, JSON.stringify(v));
    
   },
  get collectionNames(  ){ 
    
      return JSON.parse(localStorage.getItem(this.collectionNamesKey));
    
   },
  addCollection( name ){ 
    
      const names=this.collectionNames;
      if( names.includes(name) ){ 
        return ;
       };
      names.push(name);
      return this.collectionNames = names;
    
   },
  upgrade( db ){ 
    
      return this.collections.each(((c) => {
      	return (function() {
        if (!(db.objectStoreNames.includes(c))) {
          return db.createObjectStore(c, { 
            keyPath:"saveIndex"
           });
        }
      }).call(this);
      }));
    
   },
  removeCollection( name ){ 
    
      const names=this.collectionNames;
      if( !(names.includes(name)) ){ 
        throw (new Error("Attempting to remove a collection that doesn't exist"))
       };
      names.push(name);
      return this.collectionNames = names;
    
   },
  async *getCursor( collectionName ){ 
  
    const db=await this.db;
    const transaction=db.transaction([ collectionName ], "readwrite");
    const objectStore=transaction.objectStore(collectionName);
    const cursor=objectStore.openCursor();
    var looping__QUERY = true;
    const getNext=(() => {
    	return (new Promise(((success, fail) => {
    	var resolve = success,
        reject = fail;
    cursor.onsuccess = (function cursor$onsuccess$(e) {
      /* cursor.onsuccess eval.sibilant:48:25 */
    
      return success(e.target.result);
    });
    return cursor.onsuccess;
    })));
    });
    var p = getNext();
    return while( true ){ 
      const c=await p;;
      if( !(c) ){ 
        break
       };
      yield(c);
      p = getNext();;
      c.continue()
     };
  
 },
  defAsync:clear,
  defAsync:get,
  defAsync:delete,
  put( collectionName,value ){ 
    
      const db=await this.db;
      const transaction=db.transaction([ collectionName ], "readwrite");
      const objectStore=transaction.objectStore(collectionName);
      const request=objectStore.put(value);
      return (new Promise(((success, fail) => {
      	var resolve = success,
          reject = fail;
      request.onsuccess = (function request$onsuccess$(event) {
        /* request.onsuccess eval.sibilant:97:5 */
      
        return success(event);
      });
      request.onerror = (function request$onerror$(event) {
        /* request.onerror eval.sibilant:99:5 */
      
        return reject(event);
      });
      return request.onerror;
      })));
    
   },
  defAsync:start
 });