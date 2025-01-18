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
  Matrix,
  MatrixView,
  Kernel
 } = require("kit/js/matrix"),
    { 
  Tree,
  TreeMap
 } = require("tree-kit");
exports.Matrix = Matrix;
exports.MatrixView = MatrixView;
exports.kernel = kernel;
var matrix = create(Matrix);
exports.matrix = matrix;
var kernel = create(Kernel);
exports.kernel = kernel;
var matrixView = create(MatrixView);
exports.matrixView = matrixView;
var treeMap = create(TreeMap);
exports.treeMap = treeMap;