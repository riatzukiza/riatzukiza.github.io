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
var PhysicsComponent = GameComponent.define("PhysicsComponent", { 
  dataKeys:[ "radius", "mass" ]
 });
var Barycenter = GameComponent.define("Barycenter", { 
  dataKeys:[ "mass", "x", "y" ]
 });
var Vector2dComponent = GameComponent.define("Vector2dComponent", { 
  dataKeys:[ "x", "y" ]
 });
var Position = Vector2dComponent.define("Position", { 
  
 });
var Velocity = Vector2dComponent.define("Velocity", { 
  
 });
var Acceleration = Vector2dComponent.define("Acceleration", { 
  
 });
var Deflection = Vector2dComponent.define("Deflection", { 
  
 });
var Deflector = GameComponent.define("Deflector", { 
  dataKeys:[ "deflectorId" ]
 });
var Impact = GameComponent.define("Impact", { 
  dataKeys:[ "targetId", "impactorId" ]
 });