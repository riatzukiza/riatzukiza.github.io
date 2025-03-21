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
import '/bundles/external.js';
import { 
  Vector
 } from "/shared/vectors.js";
import { 
  Vector2DPhaseSpace
 } from "../typed-arrays/vector-2d.js";
const bounds=[ 10000001000000 ];
var ParentThread = Interface.define("ParentThread", { 
  
 });
self.onmessage = (function self$onmessage$(e) {
  /* self.onmessage eval.sibilant:9:0 */

  const [ [ a1, a2 ], [ b1, b2 ] ]=e.data.buffers;
  const a=Vector2DPhaseSpace.fromBuffers(a1, a2);
  const b=Vector2DPhaseSpace.fromBuffers(b1, b2);
  a.addTo(b);
  self.postMessage([ [ vb1, pb1 ], [ vb2, pb2 ] ]);
  velocities.despawn();
  return positions.despawn();
});