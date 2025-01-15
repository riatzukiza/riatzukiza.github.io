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
var straight = require("@crash-landed/world-gen/modules/roads/straight.js"),
    turns = require("@crash-landed/world-gen/modules/roads/turns.js"),
    intersections = require("@crash-landed/world-gen/modules/roads/intersections.js");
exports.straight = straight;
exports.turns = turns;
exports.intersections = intersections;