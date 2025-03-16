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
  simplex3
 } from "/shared/noise.js";
import { 
  Vector2dPhaseSpace
 } from "../typed-arrays/vector-2d.js";
var setMoveNoise = (function setMoveNoise$(v = this.v, x = this.x, y = this.y, t = 0, force = 16) {
  /* set-move-noise inc/core/function-expressions.sibilant:28:8 */

  v.setAngle((simplex3(x, y, t) * Math.PI * 2));
  return v.setLength((simplex3(x, y, t) * force));
});
self.onmessage = (function self$onmessage$(e) {
  /* self.onmessage eval.sibilant:9:0 */

  const [ vb1, pb1, vb2, pb2 ]=e.data;
  const velocities=Vector2dPhaseSpace.fromBuffers(vb1, vb2);
  const positions=Vector2dPhaseSpace.fromBuffers(pb1, pb2);
  for (var v_ of velocities.nextState.data)
  {
  const p=positions.data[v_.index];;
  setMoveNoise(v_, p.x, p.y)
  }
  ;
  return null;
});