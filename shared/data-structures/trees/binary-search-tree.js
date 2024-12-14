var BinarySearchTree = Spawnable.define("BinarySearchTree", { 
  init( key = null,depth = 5,values = List.spawn(),left = (function() {
    if (depth) {
      return BinarySearchTree.spawn(null, (depth - 1));
    }
  }).call(this),right = (function() {
    if (depth) {
      return BinarySearchTree.spawn(null, (depth - 1));
    }
  }).call(this) ){ 
    
      this.key = key;this.depth = depth;this.values = values;this.left = left;this.right = right;
      return this;
    
   },
  set( key = null,value = this.value,depth = this.depth ){ 
    
      return (function() {
        if ((!(key) || key === this.key)) {
          this.key = key;
          return this.values.push(value);
        } else if (key > this.key) {
          return this.left.set(key, value);
        } else if (key < this.key) {
          return this.right.set(key, value);
        }
      }).call(this);
    
   },
  map( f ){ 
    
      const r=this.proto.spawn();
      return this.each(((node, k) => {
      	
        return r.set(k, f(node, k));
      
      }));
    
   },
  each( f ){ 
    
      this.values.each(((v) => {
      	
        return f(v, this.key);
      
      }));
      this.left.each(f);
      return this.right.each(f);
    
   },
  remove( key,value ){ 
    
      `
      shared/datastructures/trees/binary-search-tree/remove.md

      # shared.datastructures.trees.binary-search-tree.remove

      ## arguments

      key: A numeric key, value: A value to be removed.

      ## description

      Search the tree as deep as needed to find and remove a value`

      ;
      const branch=this.search(key, this.depth);
      return (function() {
        if (branch.values.remove(value)) {
          return (function() {
            if (branch.values.length === 0) {
              return this.key = null;
            }
          }).call(this);
        }
      }).call(this);
    
   },
  prune( key,depth ){ 
    
      return `
      shared/datastructures/trees/binary-search-tree/prune.md

      # shared.datastructures.trees.binary-search-tree.prune

      ## arguments

      key: A numeric key, depth: How far to  traverse the tree before cutting off

      ## description

      Search the tree to a given depth for a key, removing the branch at the depth.`

      ;
    
   },
  search( key,depth ){ 
    
      `
      shared/datastructures/trees/binary-searchtree/search.md

      # shared.datastructures.trees.binary-searchtree.search

      ## arguments

      key: A numeric key, depth: How far down the tree to search.

      ## description

      Search the tree to a given depth for a key, returning the branch at the requested depth.`

      ;
      return (function() {
        if ((depth === 0 || key === this.key)) {
          return this;
        } else if (key > this.key) {
          return this.left.search(key, (depth - 1));
        } else if (key < this.key) {
          return this.right.search(key, (depth - 1));
        }
      }).call(this);
    
   }
 });