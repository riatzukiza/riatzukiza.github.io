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
var BinaryTreeNode = DataType.define("BinaryTreeNode", { 
  get left(  ){ 
    
      return this.array.data[((2 * this.index) + 1)];
    
   },
  get right(  ){ 
    
      return this.array.data[((2 * this.index) + 2)];
    
   },
  get parent(  ){ 
    
      return this.data.array[Math.floor(((this.index - 1) / 2))];
    
   },
  bindType( t ){ 
    
      return mixin(t, this);
    
   }
 });
var BinaryTree = DoubleBufferedArray.define("BinaryTree", { 
  elementType:null,
  nodeType:BinaryTreeNode,
  get dataType(  ){ 
    
      return (function() {
        if (this._dataType) {
          return this._dataType;
        } else {
          return this._dataType = (function() {
            /* inc/misc.sibilant:1:4125 */
          
            return this.nodeType.bindType(this.elementType);
          }).call(this);
        }
      }).call(this);
    
   },
  get root(  ){ 
    
      return (function() {
        if (this._root) {
          return this._root;
        } else {
          return this._root = (function() {
            /* inc/misc.sibilant:1:4125 */
          
            return this.data[0];
          }).call(this);
        }
      }).call(this);
    
   }
 });
var KMeansTrees = BinaryTree.define("KMeansTrees", { 
  
 });