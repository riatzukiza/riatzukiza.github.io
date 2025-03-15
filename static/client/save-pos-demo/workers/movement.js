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
  VectorPhaseSpace
 } from "./typed-arrays.js";
self.onmessage = (function self$onmessage$(e) {
  /* self.onmessage eval.sibilant:3:0 */

  const [ vb1, pb1, vb2, pb2 ]=e.data;
  const velocities=VectorPhaseSpace.fromBuffers(vb1, vb2);
  const positions=VectorPhaseSpace.fromBuffers(pb1, pb2);
  positions.addTo(velocities);
  return self.postMessage([]);
});