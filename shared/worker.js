Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1123 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1185 */

  return Object.keys(this).forEach(((k) => {
  	
    return f(this[k], k);
  
  }));
});
var { 
  Spawnable
 } = require("@shared/data-structures/spawnable.js"),
    { 
  EventEmitter
 } = require("kit-events");
var WebWorker = Spawnable.define("WebWorker", { 
  init( events = create(EventEmitter)() ){ 
    
      this.events = events;
      return this;
    
   },
  get worker(  ){ 
    
      return (function() {
        if (this._worker) {
          return this._worker;
        } else {
          return this._worker = (function() {
            /* inc/misc.sibilant:1:3417 */
          
            return (new Worker(this.url));
          }).call(this);
        }
      }).call(this);
    
   },
  get url(  ){ 
    
      throw (new TypeError((this.name + " expects a definition of " + "url")))
    
   },
  clear(  ){ 
    
      (function() {
        if (this._blob) {
          (function() {
            if (this._blob.spawn) {
              return this._blob.despawn();
            } else if ((this._blob[0] && this._blob[0].spawn)) {
              return this._blob.each(((el) => {
              	
                return el.despawn();
              
              }));
            }
          }).call(this);
          return this._blob = null;
        }
      }).call(this);
      (function() {
        if (this._worker) {
          (function() {
            if (this._worker.spawn) {
              return this._worker.despawn();
            } else if ((this._worker[0] && this._worker[0].spawn)) {
              return this._worker.each(((el) => {
              	
                return el.despawn();
              
              }));
            }
          }).call(this);
          return this._worker = null;
        }
      }).call(this);
      return this.code = null;
    
   },
  start(  ){ 
    
      const self=this;
      this.worker.onmessage = (function this$worker$onmessage$(m) {
        /* this.worker.onmessage eval.sibilant:15:4 */
      
        return self.events.emit("message", m.data);
      });
      this.worker.onerror = (function this$worker$onerror$(e) {
        /* this.worker.onerror eval.sibilant:17:4 */
      
        return self.events.emit("error", e.message);
      });
      return self.events.emit("start");
    
   },
  _send( data ){ 
    
      return this.worker.postMessage(data);
    
   },
  get send(  ){ 
    
      throw (new TypeError((this.name + " expects a definition of " + "send")))
    
   }
 });
exports.Worker = Worker;
var InlineWorker = WebWorker.define("InlineWorker", { 
  get code(  ){ 
    
      throw (new TypeError((this.name + " expects a definition of " + "code")))
    
   },
  get url(  ){ 
    
      return (function() {
        if (this._url) {
          return this._url;
        } else {
          return this._url = (function() {
            /* inc/misc.sibilant:1:3417 */
          
            return window.URL.createObjectURL(this.blob);
          }).call(this);
        }
      }).call(this);
    
   },
  get blob(  ){ 
    
      return (function() {
        if (this._blob) {
          return this._blob;
        } else {
          return this._blob = (function() {
            /* inc/misc.sibilant:1:3417 */
          
            return (new Blob([ this.code ], { 
              type:"text/javascript"
             }));
          }).call(this);
        }
      }).call(this);
    
   }
 });
exports.InlineWorker = InlineWorker;
var Thread = InlineWorker.define("Thread", { 
  init( code = this.code,promise = Promise.resolve() ){ 
    
      this.code = code;this.promise = promise;
      WebWorker.init.call(this);
      return this;
    
   },
  defAccumulator:send
 });
exports.Thread = Thread;