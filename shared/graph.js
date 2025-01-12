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
var Graph = Spawnable.define("Graph", { 
  get edges(  ){ 
    
      return this._edges;
    
   },
  get nodes(  ){ 
    
      return this._nodes;
    
   },
  init( nodes = [],edges = [] ){ 
    
      this.nodes = nodes;this.edges = edges;
      return this;
    
   },
  traverse( fsa ){ 
    
   }
 });
var Node = Spawnable.define("Node", { 
  
 });
var Edge = Spawnable.define("Edge", { 
  init( left = this.left,right = this.right ){ 
    
      this.left = left;this.right = right;
      return this;
    
   }
 });