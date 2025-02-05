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
  Matrix,
  MatrixView,
  Kernel
 } = require("kit/js/matrix"),
    { 
  Tree,
  TreeMap
 } = require("tree-kit");
import { 
  Matrix,
  MatrixView,
  Kernel
 } from "../kit/core/matrix/index.js";
export { 
  Matrix
 };
export { 
  MatrixView
 };
export { 
  kernel
 };
var matrix = create(Matrix);
export { 
  matrix
 };
var kernel = create(Kernel);
export { 
  kernel
 };
var matrixView = create(MatrixView);
export { 
  matrixView
 };
var treeMap = create(TreeMap);
export { 
  treeMap
 };