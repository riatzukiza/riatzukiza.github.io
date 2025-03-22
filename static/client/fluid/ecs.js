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
var ComponentStore = Interface.define("ComponentStore", { 
  
 });
var GameComponent = DataType.define("GameComponent", { 
  get keys(  ){ 
    
      return (function() {
        if (this._keys) {
          return this._keys;
        } else {
          return this._keys = (function() {
            /* inc/misc.sibilant:1:3986 */
          
            return [ "entityId", this.dataType ];
          }).call(this);
        }
      }).call(this);
    
   }
 });
var GameEntity = DataType.define("GameEntity", { 
  
 });
var GameSystem = Spawnable.define("GameSystem", { 
  init( components = this.components ){ 
    
      this.components = components;
      return this;
    
   }
 });