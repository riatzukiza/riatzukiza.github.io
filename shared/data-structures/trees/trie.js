var { 
  Interface
 } = require("@kit-js/interface");
var { 
  Table
 } = require("@shared/data-structures/table.js"),
    { 
  Tree
 } = require("@shared/data-structures/trees/base.js");
var Trie = Tree.define("Trie", { 
  init( value = this.value,parent = this.parent,_children = Table.spawn() ){ 
    
      this.value = value;this.parent = parent;this._children = _children;
      return this;
    
   },
  get( key ){ 
    
      return this.find(key).value;
    
   },
  set( key = null,value = null ){ 
    
      return this.insert(key).value = value;
    
   },
  clear( value = this.value,_children = this._children,tree = this ){ 
    
      tree.value = null;
      tree.parent = null;
      return _children.each(((child) => {
      	
        child.clear();
        return _children.delete(tree.key);
      
      }));
    
   },
  add( key = this.key,tree = this,_children = tree._children ){ 
    
      var node = (_children.get(key) || Trie.spawn(undefined, tree));
      node.key = key;
      return node;
    
   },
  delete( seq = this.seq,tree = this ){ 
    
      var node = tree.find(seq);
      node.clear();
      return node.parent._children.delete(seq.slice(-1)[0]);
    
   },
  _find( seq = this.seq,node = this._children.get(seq[0]) ){ 
    
      return (function() {
        if (node) {
          return node.find(seq.slice(1));
        } else {
          return false;
        }
      }).call(this);
    
   },
  _insert( seq = this.seq,_children = this._children,tree = this,node = tree.add(seq[0]) ){ 
    
      _children.set(seq[0], node);
      return node;
    
   }
 });
exports.Trie = Trie;