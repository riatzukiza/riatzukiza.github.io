var { 
  Interface
 } = require("@kit-js/interface");
var { 
  List
 } = require("@shared/data-structures/list.js");
var OrderedMap = Interface.define("OrderedMap", { 
  init( _members = (new Map()),_values = create(List)() ){ 
    
      this._members = _members;this._values = _values;
      return this;
    
   },
  get values(  ){ 
    
      return this._values;
    
   },
  get members(  ){ 
    
      return this._members;
    
   },
  get size(  ){ 
    
      return this._values.length;
    
   },
  get length(  ){ 
    
      return this._values.length;
    
   },
  clear( _members = this._members,_values = this._values ){ 
    
      members.clear();
      return _values.clear();
    
   },
  has( key = this.key,_members = this._members ){ 
    
      return _members.has(key);
    
   },
  get( key = this.key,_members = this._members,_keys = this._keys ){ 
    
      return _members.get(key).item;
    
   },
  each( callback = this.callback,_members = this._members ){ 
    
      var node = this._values.head;
      while( node ){ 
        callback(node.item, node.key);
        node = node.next;
       };
      return this;
    
   },
  map( callback = this.callback,_members = this._members,_values = this._values ){ 
    
      return (function(r) {
        /* inc/misc.sibilant:1:782 */
      
        _values.each(((item, node) => {
        	
          return r.set(node.key, f(item, node.key, r));
        
        }));
        return r;
      }).call(this, create(OrderedMap)());
    
   },
  _delete( key = this.key,_members = this._members,_values = this._values ){ 
    
      const node=_members.get(key);
      _values.removeNode(node);
      return _members.delete(key);
    
   },
  delete( key = this.key,_members = this._members ){ 
    
      return this._delete(key);
    
   },
  push( [ key, value ] = [ this.key, this.value ],_members = this._members,_values = this._values ){ 
    
      return (function() {
        if (!(_members.has(key))) {
          _values.push(value);
          _values.tail.key = key;
          _members.set(key, _values.tail);
          return _values.length;
        }
      }).call(this);
    
   },
  unshift( [ key, value ] = [ this.key, this.value ],_members = this._members,_values = this._values ){ 
    
      return (function() {
        if (!(_members.has(key))) {
          _values.unshift(key);
          _values.head.key = key;
          _members.set(key, _values.head);
          return _values.length;
        }
      }).call(this);
    
   },
  pop( _members = this._members,_values = this._values ){ 
    
      _members.delete(_values.tail.key);
      return _values.pop();
    
   },
  shift( _members = this._members,_values = this._values ){ 
    
      _members.delete(_values.head.key);
      return _values.shift();
    
   },
  set( key = this.key,value = this.value,_members = this._members,_values = this._values ){ 
    
      return (function() {
        if (!(_members.has(key))) {
          _values.push(value);
          _values.tail.key = key;
          return _members.set(key, _values.tail);
        }
      }).call(this);
    
   }
 });
exports.OrderedMap = OrderedMap;