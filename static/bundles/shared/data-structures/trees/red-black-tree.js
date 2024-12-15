require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@shared/data-structures/trees/red-black-tree.js":[function(require,module,exports){
var RedBlackTree = BinarySearchTree.define("RedBlackTree", { 
  init( key = null,depth = 10,parent = null,color = "black",root = (function() {
    if (!(parent)) {
      return this;
    } else {
      return parent.root;
    }
  }).call(this),values = List.spawn() ){ 
    
      this.key = key;this.depth = depth;this.parent = parent;this.color = color;this.root = root;this.values = values;
      return this;
    
   },
  get hasRedChild__QUERY(  ){ 
    
      return ((this.left && this.left.color === "red") || (this.right && this.right.color === "red"));
    
   },
  swapColors( node ){ 
    
      const temp=this.color;
      this.color = node.color;
      return node.color = temp;
    
   },
  fixRedRed(  ){ 
    
      if( this.isRoot__QUERY ){ 
        this.color = "black";
       };
      var parent = this.parent,
          grandparent = this.parent.parent,
          uncle = this.uncle;
      return (function() {
        if (!(this.parent.color === "black")) {
          return (function() {
            if ((uncle && uncle.color === "red")) {
              this.parent.color = "black";
              uncle.color = "black";
              grandparent.color = "red";
              return grandparent.fixRedRed();
            } else {
              return (function() {
                if (parent.isOnLeft__QUERY) {
                  (function() {
                    if (this.isOnLeft__QUERY) {
                      return parent.swapColors(grandparent);
                    } else {
                      parent.roateLeft();
                      return this.swapColors(grandparent);
                    }
                  }).call(this);
                  return grandparent.rotateRight();
                } else {
                  (function() {
                    if (this.isOnLeft__QUERY) {
                      parent.rotateRight();
                      return this.swapColors(grandparent);
                    } else {
                      return parent.swapColors(grandparent);
                    }
                  }).call(this);
                  return grandparent.rotateLeft();
                }
              }).call(this);
            }
          }).call(this);
        }
      }).call(this);
    
   },
  fixDoubleBlack(  ){ 
    
   },
  fixInsert(  ){ 
    
      var k = this;
      (function() {
        var while$124 = undefined;
        while ((k.parent && k.parent.color === "red")) {
          while$124 = (function() {
            return (function() {
              if (k.parent === k.parent.parent.left) {
                var u = k.parent.parent.right;
                return (function() {
                  if (u.color === "red") {
                    k.parent.color = "black";
                    u.color = "black";
                    k.parent.parent.color = "red";
                    return k = k.parent.parent;
                  } else {
                    (function() {
                      if (k === k.parent.right) {
                        k = k.parent;
                        return k.rotateLeft();
                      }
                    }).call(this);
                    k.parent.color = "black";
                    k.parent.parent.color = "red";
                    return k.parent.parent.rotateRight();
                  }
                }).call(this);
              } else {
                var u = k.parent.parent.left;
                return (function() {
                  if (u.color === "red") {
                    k.parent.color = "black";
                    u.color = "black";
                    k.parent.parent.color = "red";
                    return k = k.parent.parent;
                  } else {
                    (function() {
                      if (k === k.parent.right) {
                        k = k.parent;
                        return k.rotateRight();
                      }
                    }).call(this);
                    k.parent.color = "black";
                    k.parent.parent.color = "red";
                    return k.parent.parent.rotateLeft();
                  }
                }).call(this);
              }
            }).call(this);
          }).call(this);
        };
        return while$124;
      }).call(this);
      return this.root.color = "black";
    
   },
  deleteNode( key ){ 
    
   },
  deleteByValue( value ){ 
    
   }
 });
},{}]},{},[]);
