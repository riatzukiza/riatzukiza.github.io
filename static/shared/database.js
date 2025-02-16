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
  EventEmitter
 } from "/shared/kit/events/index.js";
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
  init( name = this.name,events = create(EventEmitter)(),writerPromises = {  } ){ 
    
      this.name = name;this.events = events;this.writerPromises = writerPromises;
      return this;
    
   },
  get db(  ){ 
    
      return (function() {
        if (typeof this._db !== "undefined") {
          return this._db;
        } else {
          return this._db = (function() {
            /* inc/misc.sibilant:1:3997 */
          
            return this.start();
          }).call(this);
        }
      }).call(this);
    
   },
  version:4,
  collections:[],
  addCollection( name ){ 
    
      if( this.collections.includes(name) ){ 
        return ;
       };
      return this.collections.push(name);
    
   },
  upgrade( db ){ 
    
      return this.collections.each(((c) => {
      	return (function() {
        if (!(Array.from(db.objectStoreNames).includes(c))) {
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
      /* cursor.onsuccess eval.sibilant:46:25 */
    
      return success(e.target.result);
    });
    return cursor.onsuccess;
    })));
    });
    var p = getNext();
    while( true ){ 
      const c=await p;;
      if( !(c) ){ 
        break
       };
      yield(c);
      p = getNext();;
      c.continue()
     };
    return null;
  
 },
   async clear( collectionName ){ 
  
    const db=await this.db;
    const transaction=db.transaction([ collectionName ], "readwrite");
    const objectStore=transaction.objectStore(collectionName);
    const cursor=objectStore.openCursor();
    return (new Promise(((success, fail) => {
    	var resolve = success,
        reject = fail;
    cursor.onsuccess = (function cursor$onsuccess$(e) {
      /* cursor.onsuccess eval.sibilant:64:5 */
    
      const c=e.target.result;
      return (function() {
        if (c) {
          return this.delete([ collectionName, c.key ]).then(((nil) => {
          	return c.continue();
          }));
        } else {
          return success();
        }
      }).call(this);
    });
    return cursor.onsuccess;
    })));
  
 },
   async get( [ collectionName, key ] ){ 
  
    console.log("getting from db", this, collectionName, key);
    const db=await this.db;
    const transaction=db.transaction([ collectionName ], "readonly");
    const objectStore=transaction.objectStore(collectionName);
    const request=objectStore.get(key);
    return (new Promise(((success, fail) => {
    	var resolve = success,
        reject = fail;
    request.onsuccess = (function request$onsuccess$(event) {
      /* request.onsuccess eval.sibilant:77:5 */
    
      console.log("gotten from db", event);
      return success(event.target.result);
    });
    request.onerror = (function request$onerror$(event) {
      /* request.onerror eval.sibilant:80:5 */
    
      console.log("error!", event);
      return reject(event);
    });
    return request.onerror;
    })));
  
 },
   async delete( [ collectionName, key ] ){ 
  
    const db=await this.db;
    const transaction=db.transaction([ collectionName ], "readwrite");
    const objectStore=transaction.objectStore(collectionName);
    const request=objectStore.delete(key);
    return (new Promise(((success, fail) => {
    	var resolve = success,
        reject = fail;
    request.onsuccess = (function request$onsuccess$(event) {
      /* request.onsuccess eval.sibilant:89:5 */
    
      return success(event.result);
    });
    request.onerror = (function request$onerror$(event) {
      /* request.onerror eval.sibilant:91:5 */
    
      return reject(event);
    });
    return request.onerror;
    })));
  
 },
   async put( collectionName,value ){ 
  
    return this.writerPromises[collectionName] = Promise.resolve(this.writerPromises[collectionName]).then(((nil) => {
    	return this.db.then(((db) => {
    	const transaction=db.transaction([ collectionName ], "readwrite");
    const objectStore=transaction.objectStore(collectionName);
    const request=objectStore.put(value);
    return (new Promise(((success, fail) => {
    	var resolve = success,
        reject = fail;
    var success__QUERY = false;
    setTimeout((() => {
    	return (function() {
      if (!(success__QUERY)) {
        return reject((new Error("Took too long.")));
      }
    }).call(this);
    }), 10000);
    request.onsuccess = (function request$onsuccess$(event) {
      /* request.onsuccess eval.sibilant:108:20 */
    
      return success(event);
    });
    request.onerror = (function request$onerror$(event) {
      /* request.onerror eval.sibilant:110:20 */
    
      return reject(event);
    });
    return request.onerror;
    })));
    }));
    }));
  
 },
   async start(  ){ 
  
    const request=indexedDB.open(this.name, this.version);
    const self=this;
    request.onupgradeneeded = (function request$onupgradeneeded$(e) {
      /* request.onupgradeneeded eval.sibilant:115:4 */
    
      return self.upgrade(e.target.result);
    });
    return (new Promise(((success, fail) => {
    	var resolve = success,
        reject = fail;
    request.onerror = (function request$onerror$(e) {
      /* request.onerror eval.sibilant:117:5 */
    
      return reject(e);
    });
    request.onsuccess = (function request$onsuccess$(e) {
      /* request.onsuccess eval.sibilant:118:5 */
    
      self.events.emit("start", e.target.result);
      return success(e.target.result);
    });
    return request.onsuccess;
    })));
  
 }
 });
export { 
  Database
 };