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
var roads = require("@crash-landed/world-gen/modules/roads.js"),
    fields = require("@crash-landed/world-gen/modules/fields.js"),
    exclusions = require("@crash-landed/world-gen/modules/exclusions.js");
exports.roads = roads;
exports.fields = fields;