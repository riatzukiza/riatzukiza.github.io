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
var FieldOfView = Component.define("FieldOfView", { 
  visibleTiles:List.spawn(),
  observedTiles:List.spawn(),
  range:4
 });
var Sight = System.define("Sight", { 
  _updateComponent( c ){ 
    
   }
 });