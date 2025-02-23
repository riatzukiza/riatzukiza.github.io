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
var { 
  TreeMap
 } = require("tree-kit");
TreeMap.get = (function TreeMap$get$(...args) {
  /* Tree-map.get eval.sibilant:3:0 */

  return this.find(...args).value;
});
var memoize = (function memoize$(f) {
  /* memoize eval.sibilant:6:0 */

  var cache = create(TreeMap)();
  return ((...args) => {
  	return (function() {
    if (cache.has(args)) {
      return cache.get(args);
    } else {
      var r = (function() {
        /* inc/misc.sibilant:1:1260 */
      
        return f(...args);
      }).call(this);
      cache.set(args, r);
      return r;
    }
  }).call(this);
  });
});
var rgba = memoize(((r, g, b, a) => {
	return { 
  r,
  g,
  b,
  a
 };
}));
export { 
  rgba
 };