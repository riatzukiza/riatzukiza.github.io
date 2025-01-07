Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1121 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1183 */

  return Object.keys(this).forEach(((k) => {
  	
    return f(this[k], k);
  
  }));
});
var { 
  Component,
  System
 } = require("@shared/ecs.js"),
    { 
  List
 } = require("@shared/data-structures/list.js");
var VisibleStatus = Component.define("VisibleStatus", { 
  visible__QUERY:false,
  explored__QUERY:false
 });
var TileVisibility = System.define("TileVisibility", { 
  interface:VisibleStatus,
  _updateComponent( c ){ 
    
   }
 });
exports.TileVisibility = TileVisibility;