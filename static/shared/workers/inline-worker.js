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
import '/bundles/external.js';
import { 
  mixin,
  create,
  extend
 } from "/shared/kit/core/util.js";
import { 
  Spawnable
 } from "./data-structures/spawnable.js";
import { 
  EventEmitter
 } from "./kit/events/index.js";
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
            /* inc/misc.sibilant:1:3986 */
          
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
            /* inc/misc.sibilant:1:3986 */
          
            return (new Blob([ this.code ], { 
              type:"text/javascript"
             }));
          }).call(this);
        }
      }).call(this);
    
   }
 });
export { 
  InlineWorker
 };