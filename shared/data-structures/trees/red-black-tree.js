var { 
  BinarySearchTree
 } = require("@shared/data-structures/trees/binary-search-tree.js");
var { 
  List
 } = require("@shared/data-structures/list.js");
var RedBlackTree = BinarySearchTree.define("RedBlackTree", { 
  init( key = null,parent = null,color = (function() {
    if (parent) {
      return (function() {
        if (parent.isBlack__QUERY) {
          return "red";
        } else {
          return "black";
        }
      }).call(this);
    } else {
      return "black";
    }
  }).call(this),values = List.spawn() ){ 
    
      this.key = key;this.parent = parent;this.color = color;this.values = values;
      return this;
    
   },
  get isTimeTraveler__QUERY(  ){ 
    
      return this.parent === this;
    
   },
  get hasRedChild__QUERY(  ){ 
    
      return ((this.left && this.left.isRed__QUERY) || (this.right && this.right.isRed__QUERY));
    
   },
  get isLeftRed__QUERY(  ){ 
    
      return (this.left && this.left.isRed__QUERY);
    
   },
  get isRed__QUERY(  ){ 
    
      return this.color === "red";
    
   },
  get isBlack__QUERY(  ){ 
    
      return this.color === "black";
    
   },
  swapColors( node ){ 
    
      const temp=this.color;
      this.color = node.color;
      return node.color = temp;
    
   },
  fixRedRed(  ){ 
    
      if( this.isRoot__QUERY ){ 
        this.color = "black";;
        return ;
       };
      var parent = this.parent,
          grandparent = parent.parent,
          uncle = this.uncle;
      return (function() {
        if (!(parent.isBlack__QUERY)) {
          return (function() {
            if ((uncle && uncle.isRed__QUERY)) {
              parent.color = "black";
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
                      parent.rotateLeft();
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
                      return this.parent.swapColors(grandparent);
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
  fixDoubleBlack( sibling = this.sibling,parent = this.parent ){ 
    
      if( this.isRoot__QUERY ){ 
        return ;
       };
      return (function() {
        if (!(this.sibling)) {
          return this.parent.fixDoubleBlack();
        } else {
          return (function() {
            if (this.sibling.isRed__QUERY) {
              parent.color = "red";
              sibling.color = "black";
              (function() {
                if (this.sibling.isOnLeft__QUERY) {
                  return this.parent.rotateRight();
                } else {
                  return this.parent.rotateLeft();
                }
              }).call(this);
              return this.fixDoubleBlack();
            } else {
              return (function() {
                if (this.sibling.hasRedChild__QUERY) {
                  (function() {
                    if (this.sibling.isLeftRed__QUERY) {
                      return (function() {
                        if (this.sibling.isOnLeft__QUERY) {
                          sibling.left.color = sibling.color;
                          sibling.color = parent.color;
                          return parent.rotateRight();
                        } else {
                          sibling.left.color = parent.color;
                          sibling.rotateRight();
                          return parent.rotateLeft();
                        }
                      }).call(this);
                    } else {
                      return (function() {
                        if (sibling.isOnLeft__QUERY) {
                          sibling.right.color = parent.color;
                          sibling.rotateLeft();
                          return parent.rotateRight();
                        } else {
                          sibling.right.color = sibling.color;
                          sibling.color = parent.color;
                          return parent.rotateLeft();
                        }
                      }).call(this);
                    }
                  }).call(this);
                  return parent.color = "black";
                } else {
                  sibling.color = "red";
                  return (function() {
                    if (parent.isBlack__QUERY) {
                      return parent.fixDoubleBlack();
                    } else {
                      return parent.color = "black";
                    }
                  }).call(this);
                }
              }).call(this);
            }
          }).call(this);
        }
      }).call(this);
    
   },
  getReplacementNode(  ){ 
    
      return (function() {
        if (this.hasTwoChildren__QUERY) {
          return this.right.successor;
        } else if (this.isLeaf__QUERY) {
          return null;
        } else {
          return (this.left || this.right);
        }
      }).call(this);
    
   },
  deleteNode( parent = this.parent ){ 
    
      var u = this.getReplacementNode();
      var uvBlack = ((!(u) || u.isBlack__QUERY) && this.isBlack__QUERY);
      if( !(u) ){ 
        (function() {
          if (!(this.isRoot__QUERY)) {
            (function() {
              if (uvBlack) {
                return this.fixDoubleBlack();
              } else if (this.hasSibling__QUERY) {
                return this.sibling.color = "red";
              }
            }).call(this);
            return (function() {
              if (this.isOnLeft__QUERY) {
                return parent.left = null;
              } else {
                return parent.right = null;
              }
            }).call(this);
          }
        }).call(this);
        return ;
       };
      if( (!(this.left) || !(this.right)) ){ 
        (function() {
          if (this.isRoot__QUERY) {
            this.key = u.key;return 
            this.left = this.right = null;
          } else {
            (function() {
              if (this.isOnLeft__QUERY) {
                return parent.left = u;
              } else {
                return parent.right = u;
              }
            }).call(this);
            u.parent = parent;
            return (function() {
              if (uvBlack) {
                return u.fixDoubleBlack();
              } else {
                return u.color = "black";
              }
            }).call(this);
          }
        }).call(this);
        return ;
       };
      u.swapKeys(this);
      return u.deleteNode();
    
   },
  deleteByKey( key ){ 
    
      if( !(this.root) ){ 
        return ;
       };
      const node=this.search(key);
      return node.deleteNode();
    
   },
  remove( key = this.key,value = this.value,depth = null ){ 
    
      const node=this.search(key, depth);
      const item=node.values.remove(value);
      (function() {
        if (!(item)) {
          throw (new Error("Trying to remove a value not on this node."))
        }
      }).call(this);
      return (function() {
        if (node.values.length === 0) {
          return node.deleteNode();
        }
      }).call(this);
    
   },
  insert( key = this.key,depth = null ){ 
    
      if( (this.isRoot__QUERY && !(this.key)) ){ 
        this.key = key;;
        this.color = "black";;
        return this;
       };
      const temp=this.search(key, depth);
      if( temp.key === key ){ 
        return temp;
       };
      const newNode=RedBlackTree.spawn(key, temp);
      (function() {
        if (key < temp.key) {
          return temp.left = newNode;
        } else {
          return temp.right = newNode;
        }
      }).call(this);
      newNode.fixRedRed();
      return newNode;
    
   },
  search( key = this.key,depth = null ){ 
    
      var temp = this,
          break__QUERY = false;
      (function() {
        var while$493 = undefined;
        while ((temp && !(break__QUERY) && (function() {
          if (typeof depth === "number") {
            return depth > 0;
          } else {
            return true;
          }
        }).call(this))) {
          while$493 = (function() {
            (function() {
              if (typeof depth === "number") {
                return ((depth)--);
              }
            }).call(this);
            return (function() {
              if (key < temp.key) {
                return (function() {
                  if (!(temp.left)) {
                    return break__QUERY = true;
                  } else {
                    return temp = temp.left;
                  }
                }).call(this);
              } else if (key === temp.key) {
                return break__QUERY = true;
              } else {
                return (function() {
                  if (!(temp.right)) {
                    return break__QUERY = true;
                  } else {
                    return temp = temp.right;
                  }
                }).call(this);
              }
            }).call(this);
          }).call(this);
        };
        return while$493;
      }).call(this);
      return temp;
    
   },
  set( key = this.key,value = this.value,depth = null ){ 
    
      const node=this.insert(key, depth);
      this.search(key).values.push(value);
      return this;
    
   }
 });
exports.RedBlackTree = RedBlackTree;