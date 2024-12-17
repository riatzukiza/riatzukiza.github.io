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
var config = require("@obstacles/config.js");
var randomLocation = (function randomLocation$() {
  /* random-location eval.sibilant:2:0 */

  return [ ((Math.random() * config.dimensions[0]) * (function() {
    if (Math.random() < 0.5) {
      return -1;
    } else {
      return 1;
    }
  }).call(this)), ((Math.random() * config.dimensions[1]) * (function() {
    if (Math.random() < 0.5) {
      return -1;
    } else {
      return 1;
    }
  }).call(this)) ];
});
exports.randomLocation = randomLocation;