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
  Interface
 } from "/shared/kit/interface/index.js";
const maxMass=(64 * 1024);
const spawnArea=(8 * 4096);
var config = Interface.define("config", { 
  spawnArea:spawnArea,
  spawnWidth:spawnArea,
  spawnHeight:spawnArea,
  particleCount:(1 * 2048),
  maxMass:maxMass,
  gravitationalConstant:1e-11,
  minDist:1,
  maxObjects:200,
  maxLevels:10,
  minMass:512,
  particleRenderSize:512,
  actualMaximumMass:Math.pow(maxMass, 3),
  get dimensions(  ){ 
    
      return (function() {
        if (this._dimensions) {
          return this._dimensions;
        } else {
          return this._dimensions = (function() {
            /* inc/misc.sibilant:1:3986 */
          
            return [ Math.round((0.8 * window.innerWidth)), Math.round((window.innerHeight - 3)) ];
          }).call(this);
        }
      }).call(this);
    
   }
 });
export { 
  config
 };