var { 
  Interface
 } = require("@kit-js/interface");
var OrderedMap = Interface.define("OrderedMap", { 
  init( _members = (new Map()),_values = create(List)() ){ 
    
      this._members = _members;this._values = _values;
      return this;
    
   },
  get size(  ){ 
    
      return this._keys.length;
    
   },
  get length(  ){ 
    
      return this._keys.length;
    
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
  each( callback = this.callback,_values = this._values ){ 
    
      _values.each(((v, i) => {
      	
        return (function() {
          if (!(v === null)) {
            return callback(v, this._keys[i]);
          }
        }).call(this);
      
      }));
      return this;
    
   },
  map( callback = this.callback,_members = this._members,_values = this._values ){ 
    
      return (function(r) {
        /* node_modules/kit/inc/scope.sibilant:12:9 */
      
        _values.each(((k) => {
        	
          return r.set(k, f(_members[k], k, r));
        
        }));
        return r;
      })(create(OrderedMap)());
    
   },
  _delete( key = this.key,_members = this._members,_keys = this._keys ){ 
    
      const node=_members.get(key);
      _keys.removeNode(node);
      return _members.delete(key);
    
   },
  delete( key = this.key,_members = this._members,_keys = this._keys ){ 
    
      return this._delete(key);
    
   },
  push( [ key, value ] = [ this.key, this.value ],_members = this._members,_values = this._values ){ 
    
      _values.push(value);
      _values.tail.key = key;
      _members.set(key, _values.tail);
      return _values.length;
    
   },
  unshift( [ key, value ] = [ this.key, this.value ],_members = this._members,_values = this._values ){ 
    
      _values.unshift(key);
      _values.head.key = key;
      _members.set(key, _values.head);
      return _values.length;
    
   },
  pop( _members = this._members,_values = this._values ){ 
    
      _members.delete(key);
      return _values.pop();
    
   },
  shift( _members = this._members,_values = this._values ){ 
    
      _members.delete(_values.head.key);
      return _values.shift();
    
   },
  set( key = this.key,value = this.value,_members = this._members,_keys = this._keys ){ 
    
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