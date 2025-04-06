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
var BinarySearchNode = BinaryTreeNode.define("BinarySearchNode", { 
  dataKeys:[],
  indexKey:"bid",
  get empty__QUERY(  ){ 
    
      return -1 === this.searchIndex;
    
   },
  get occupied__QUERY(  ){ 
    
      return !(this.empty__QUERY);
    
   },
  get searchIndex(  ){ 
    
      return this[this.indexKey];
    
   },
  get keys(  ){ 
    
      return [ this.indexKey ].concat(this.dataKeys);
    
   },
  swapKeys( node ){ 
    
      node.copyTo(this);
      return this.copyTo(node);
    
   }
 });
var BinarySearchTree = BinaryTree.define("BinarySearchTree", { 
  insert( key = this.key,node = this.root ){ 
    
      return (function() {
        
      }).call(this);
    
   },
  find(  ){ 
    
   }
 });