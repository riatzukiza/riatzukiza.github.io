var R = require("ramda");
var { 
  create,
  extend,
  mixin,
  conditional,
  cond,
  partiallyApplyAfter
 } = require("@kit-js/core/js/util");
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
var { 
  Interface
 } = require("@kit-js/interface");
var { 
  TreeMap
 } = require("@shared/data-structures/contrib.js"),
    { 
  OrderedMap
 } = require("@shared/data-structures/maps/ordered.js");
var BucketedTree = TreeMap.define("BucketedTree", { 
  init( value = [],parent = this.parent,_children = create(OrderedMap)() ){ 
    
      this.value = value;this.parent = parent;this._children = _children;
      return this;
    
   }
 });
exports.BucketedTree = BucketedTree;