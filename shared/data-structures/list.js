var { 
  Interface
 } = require("@kit-js/interface");
var { 
  List
 } = require("@shared/data-structures/list.js");
const emptyNodes=[];
var Node = Interface.define("Node", { 
  init( list = this.list,next = this.next,prev = this.prev,item = this.item ){ 
    
      this.list = list;this.next = next;this.prev = prev;this.item = item;
      return this;
    
   },
  spawn( list,next,prev,item ){ 
    
      return (function() {
        if (emptyNodes.length === 0) {
          return create(Node)(list, next, prev, item);
        } else {
          return emptyNodes.pop().bind(list, next, prev).set(item);
        }
      }).call(this);
    
   },
  despawn(  ){ 
    
      this.list = null;
      this.next = null;
      this.prev = null;
      return emptyNodes.push(this);
    
   },
  get isHead(  ){ 
    
      return this === this.list.head;
    
   },
  get isTail(  ){ 
    
      return this === this.list.tail;
    
   },
  bind( list,next,prev ){ 
    
      this.init(list, next, prev);
      return this;
    
   },
  set( item ){ 
    
      this.item = item;
      return this;
    
   }
 });
var List = Interface.define("List", { 
  init(  ){ 
    
      
      this.length = 0;
      return this;
    
   },
  get count(  ){ 
    
      return this.length;
    
   },
  get size(  ){ 
    
      return this.length;
    
   },
  get empty__QUERY(  ){ 
    
      return this.length === 0;
    
   },
  from( arrayLike = this.arrayLike,f = ((a) => {
  	
    return a;
  
  }) ){ 
    
      const list=create(this)();
      arrayLike.each(((e, i) => {
      	
        return list.push(f(e));
      
      }));
      return list;
    
   },
  clear(  ){ 
    
      return (function() {
        var while$8 = undefined;
        while (this.length > 0) {
          while$8 = (function() {
            return this.pop();
          }).call(this);
        };
        return while$8;
      }).call(this);
    
   },
  of( ...items ){ 
    
      return this.from(items);
    
   },
  push( item ){ 
    
      return this.pushNode(Node.spawn(this, null, null, item)).item;
    
   },
  unshift( item ){ 
    
      return this.unshiftNode(Node.spawn(this, null, null, item)).item;
    
   },
  pop(  ){ 
    
      return this.popNode().item;
    
   },
  shift(  ){ 
    
      return this.shiftNode().item;
    
   },
  insert( item,predicate ){ 
    
   },
  remove( item ){ 
    
      var node = this.head;
      var success = false;
      return (function() {
        var while$9 = undefined;
        while (node) {
          while$9 = (function() {
            return (function() {
              if (node.item !== item) {
                node = node.next;
                return false;
              } else {
                node = false;
                return this.removeNode(node).item;
              }
            }).call(this);
          }).call(this);
        };
        return while$9;
      }).call(this);
    
   },
  node( item ){ 
    
      return Node.spawn(this, null, null, item);
    
   },
  pushNode( node ){ 
    
      (function() {
        if (!(this.empty__QUERY)) {
          return this.tail = this.tail.next = node.bind(this, null, this.tail);
        } else {
          return this.head = this.tail = node.bind(this, null, null);
        }
      }).call(this);
      ((this.length)++);
      return node;
    
   },
  unshiftNode( node ){ 
    
      (function() {
        if (!(this.empty__QUERY)) {
          return this.head = this.head.prev = node.bind(this, this.head, null);
        } else {
          return this.head = this.tail = node.bind(this, null, null);
        }
      }).call(this);
      ((this.length)++);
      return node;
    
   },
  popNode(  ){ 
    
      return (this.empty__QUERY) ? null : this.removeNode(this.tail);
    
   },
  shiftNode(  ){ 
    
      return (this.empty__QUERY) ? null : this.removeNode(this.head);
    
   },
  insertNode( n,predicate ){ 
    
   },
  removeNode( node ){ 
    
      (function() {
        if (!(node.list === this)) {
          return false;
        }
      }).call(this);
      (function() {
        if (node === this.head) {
          return this.head = node.next;
        }
      }).call(this);
      (function() {
        if (node === this.tail) {
          return this.tail = node.prev;
        }
      }).call(this);
      (function() {
        if (node.next) {
          return node.next.prev = node.prev;
        }
      }).call(this);
      (function() {
        if (node.prev) {
          return node.prev.next = node.next;
        }
      }).call(this);
      ((this.length)--);
      node.despawn();
      return node;
    
   },
  spliceNode( prev,node,next ){ 
    
   },
  sort( predicat,e ){ 
    
   },
  each( f ){ 
    
      var node = this.head;
      (function() {
        var while$10 = undefined;
        while (node) {
          while$10 = (function() {
            f(node.item, node);
            return node = node.next;
          }).call(this);
        };
        return while$10;
      }).call(this);
      return this;
    
   },
  map( f ){ 
    
      var result = create(List)();
      var node = this.head;
      return (function() {
        var while$11 = undefined;
        while (node) {
          while$11 = (function() {
            return result.push(f(node, node.next, node.prev));
          }).call(this);
        };
        return while$11;
      }).call(this);
    
   },
  toArray(  ){ 
    
   },
  reduce( f,r ){ 
    
      this.each(((e, i, l) => {
      	
        return r = f(r, e, i, l);
      
      }));
      return r;
    
   },
  findNode( f = this.f,node = this.head ){ 
    
      return (function() {
        if (f(node)) {
          return node;
        } else if (!(node === this.tail)) {
          return List.find(f, node.next);
        } else {
          return false;
        }
      }).call(this);
    
   },
  find( f = this.f,node = this.head ){ 
    
      var r = List.findNode(f, node);
      return (function() {
        if (r) {
          return r.value;
        } else {
          return false;
        }
      }).call(this);
    
   },
  rotate(  ){ 
    
      this.push(this.shift());
      return this;
    
   },
  rotateUntil( predicate = this.predicate,t = 0 ){ 
    
      const condition=predicate(this.head.item);
      return (function() {
        if (condition) {
          return this.head.item;
        } else if (t < this.size) {
          this.rotate();
          const t_=(t + 1);
          return this.rotateUntil(predicate, t_);
        } else {
          return false;
        }
      }).call(this);
    
   }
 });
exports.List = List;