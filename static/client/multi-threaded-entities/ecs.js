Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1831 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1893 */

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
const maxGameEntities=(8 * 1024);
const maxComponentTypeInstances=(8 * 1024);
const gameEntities=GameEntityArray.spawn(0, maxGameEntities);
var Position = GameComponent.define("Position", { 
  dataKeys:[ "x", "y" ]
 });