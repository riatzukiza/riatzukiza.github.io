Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1123 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1185 */

  return Object.keys(this).forEach(((k) => {
  	
    return f(this[k], k);
  
  }));
});
var { 
  Friction
 } = require("@shared/systems/physics/forces/friction.js"),
    { 
  SignalField
 } = require("@shared/systems/physics/forces/signal-field.js");
exports.Friction = Friction;
exports.SignalField = SignalField;