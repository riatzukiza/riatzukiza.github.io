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
var System = Interface.define("System", { 
  init( inputs = this.inputs,target = this.target,entities = this.entities ){ 
    
      this.inputs = inputs;this.target = target;this.entities = entities;
      return this;
    
   },
  defAsync:_update
 });
var Movement = System.define("Movement", { 
  inputs:[ Position, Velocity ],
  outputs:Position,
  update( pos,vel,target ){ 
    
      target.x = (vel.x + pos.x);
      return target.y = (vel.y + pos.y);
    
   }
 });
var Acceleration = System.define("Acceleration", { 
  inputs:[ Acceleration, Velocity ],
  update( accel,vel,target ){ 
    
      target.x = (vel.x + accel.x);
      return target.y = (vel.y + accel.y);
    
   }
 });
var CollisionDetection = System.define("CollisionDetection", { 
  components:[ Position, Geometry ],
  target:Position,
  defThreaded:update
 });