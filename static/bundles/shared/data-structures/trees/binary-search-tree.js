require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@shared/data-structures/trees/binary-search-tree.js":[function(require,module,exports){
var { 
  Spawnable
 } = require("@shared/data-structures/spawnable.js"),
    { 
  List
 } = require("@shared/data-structures/list.js");
var BinarySearchTree = Spawnable.define("BinarySearchTree", { 
  init( key = null,parent = null,values = List.spawn() ){ 
    
      this.key = key;this.parent = parent;this.values = values;
      return this;
    
   },
  get hasTwoChildren__QUERY(  ){ 
    
      return (this.left && this.right);
    
   },
  get root(  ){ 
    
      var node = this;
      (function() {
        var while$323 = undefined;
        while (node.parent) {
          while$323 = (function() {
            return node = node.parent;
          }).call(this);
        };
        return while$323;
      }).call(this);
      return node;
    
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
        var while$324 = undefined;
        while (temp.left) {
          while$324 = (function() {
            return temp = temp.left;
          }).call(this);
        };
        return while$324;
      }).call(this);
      return temp;
    
   },
  get isRoot__QUERY(  ){ 
    
      return this === this.root;
    
   },
  get uncle(  ){ 
    
      return (function() {
        if ((!(this.parent) || !(this.parent.parent))) {
          return null;
        } else if (this.parent.isOnLeft__QUERY) {
          return this.parent.parent.right;
        } else {
          return this.parent.parent.left;
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
  moveDown( nParent ){ 
    
      (function() {
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
      nParent.parent = this.parent;
      return this.parent = nParent;
    
   },
  swapKeys( node ){ 
    
      const temp=this.key;
      this.key = node.key;
      return node.key = temp;
    
   },
  rotateLeft(  ){ 
    
      const nParent=this.right;
      this.moveDown(nParent);
      this.right = nParent.left;
      (function() {
        if (nParent.left) {
          return nParent.left.parent = this;
        }
      }).call(this);
      return nParent.left = this;
    
   },
  rotateRight(  ){ 
    
      const nParent=this.left;
      this.moveDown(nParent);
      this.left = nParent.right;
      (function() {
        if (nParent.right) {
          return nParent.right.parent = this;
        }
      }).call(this);
      return nParent.right = this;
    
   },
  set( key = this.key,value = this.value ){ 
    
      (function() {
        if ((!(this.key) || key === this.key)) {
          this.key = key;
          return this.values.push(value);
        } else if (key < this.key) {
          return (function() {
            if (this.left) {
              return this.left.set(key, value);
            } else {
              return this.left = BinarySearchTree.spawn(null, this).set(key, value);
            }
          }).call(this);
        } else if (key > this.key) {
          return (function() {
            if (this.right) {
              return this.right.set(key, value);
            } else {
              return this.right = BinarySearchTree.spawn(null, this).set(key, value);
            }
          }).call(this);
        }
      }).call(this);
      return this;
    
   },
  map( f ){ 
    
      const r=this.proto.spawn();
      this.each(((node, k) => {
      	
        return r.set(k, f(node, k));
      
      }));
      return r;
    
   },
  each( f ){ 
    
      this.values.each(((v) => {
      	
        return f(v, this.key);
      
      }));
      (function() {
        if (this.left) {
          return this.left.each(f);
        }
      }).call(this);
      return (function() {
        if (this.right) {
          return this.right.each(f);
        }
      }).call(this);
    
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
      const branch=this.search(key);
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
  prune( key ){ 
    
      return `
      shared/datastructures/trees/binary-search-tree/prune.md

      # shared.datastructures.trees.binary-search-tree.prune

      ## arguments

      key: A numeric key

      ## description

      Search the tree for a key, removing the branch`

      ;
    
   },
  search( key = this.key ){ 
    
      `
      shared/datastructures/trees/binary-searchtree/search.md

      # shared.datastructures.trees.binary-searchtree.search

      ## arguments

      key: A numeric key.

      ## description

      Search the tree for a key, returning the branch.`

      ;
      return (function() {
        if (key === this.key) {
          return this;
        } else if ((key < this.key && this.left)) {
          return this.left.search(key);
        } else if ((key > this.key && this.right)) {
          return this.right.search(key);
        } else {
          return this;
        }
      }).call(this);
    
   }
 });
exports.BinarySearchTree = BinarySearchTree;
},{"@shared/data-structures/list.js":"@shared/data-structures/list.js","@shared/data-structures/spawnable.js":"@shared/data-structures/spawnable.js"}]},{},[]);
