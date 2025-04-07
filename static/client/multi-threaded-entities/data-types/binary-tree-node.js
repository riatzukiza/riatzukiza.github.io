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
import { 
  DataType
 } from "./data-type.js";
var BinaryTreeNode = DataType.define("BinaryTreeNode", { 
  get left(  ){ 
    
      return this.array.data[((2 * this.id) + 1)];
    
   },
  set left( data ){ 
    
      const node=this.left;
      for (var key of this.dataType.keys)
      {
      node[key] = data[key];
      }
      ;
      return null;
    
   },
  copyTo( target ){ 
    
      for (var key of this.dataType.keys)
      {
      target[key] = this[key];
      }
      ;
      return target;
    
   },
  get right(  ){ 
    
      return this.array.data[((2 * this.id) + 2)];
    
   },
  set right( data ){ 
    
      const node=this.right;
      for (var key of this.dataType.keys)
      {
      node[key] = data[key];
      }
      ;
      return null;
    
   },
  get parent(  ){ 
    
      return this.data.array[Math.floor(((this.id - 1) / 2))];
    
   },
  get hasOneChild__QUERY(  ){ 
    
      return (!(this.left) || !(this.right));
    
   },
  get hasTwoChildren__QUERY(  ){ 
    
      return (this.left && this.right);
    
   },
  get grandparent(  ){ 
    
      return this.parent.parent;
    
   },
  get isLeaf__QUERY(  ){ 
    
      return (!(this.left) && !(this.right));
    
   },
  get successor(  ){ 
    
      var temp = this;
      (function() {
        var while$245 = undefined;
        while (temp.left) {
          while$245 = (function() {
            return temp = temp.left;
          }).call(this);
        };
        return while$245;
      }).call(this);
      return temp;
    
   },
  get isRoot__QUERY(  ){ 
    
      return !(this.parent);
    
   },
  get uncle(  ){ 
    
      return (function() {
        if ((!(this.parent) || !(this.grandparent))) {
          return null;
        } else if (this.parent.isOnLeft__QUERY) {
          return this.grandparent.right;
        } else {
          return this.grandparent.left;
        }
      }).call(this);
    
   },
  get isOnLeft__QUERY(  ){ 
    
      return this === this.parent.left;
    
   },
  get sibling(  ){ 
    
      return (function() {
        if (!(this.parent)) {
          return null;
        } else if (this.isOnLeft__QUERY) {
          return this.parent.right;
        } else {
          return this.parent.left;
        }
      }).call(this);
    
   },
  clear(  ){ 
    
      return DataType.clear.call(this);
    
   },
  moveDown( nParent ){ 
    
      return (function() {
        if (this.parent) {
          return (function() {
            if (this.isOnLeft__QUERY) {
              return this.parent.left = nParent;
            } else {
              return this.parent.right = nParent;
            }
          }).call(this);
        }
      }).call(this);
    
   },
  rotateLeft(  ){ 
    
      const nParent=this.right;
      this.moveDown(nParent);
      return this.right = nParent.left;
    
   },
  rotateRight(  ){ 
    
      const nParent=this.left;
      this.moveDown(nParent);
      return this.left = nParent.right;
    
   }
 });
export { 
  BinaryTreeNode
 };