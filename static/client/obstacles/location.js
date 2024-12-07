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