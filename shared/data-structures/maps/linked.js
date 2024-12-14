var { 
  Interface
 } = require("@kit-js/interface");
var OrderedMap = Interface.define("OrderedMap", { 
  init( _members = (new Map()),_keys = create(List)() ){ 
    
      this._members = _members;this._keys = _keys;
      return this;
    
   },
  get size(  ){ 
    
      return this._keys.length;
    
   },
  get length(  ){ 
    
      return this._keys.length;
    
   },
  clear( _members = this._members,_keyPointers = this._keyPointers,_keys = this._keys,_values = this._values ){ 
    
      members.clear();
      _keyPointers.clear();
      this._keys = [];
      return this._values = [];
    
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
  map( callback = this.callback,[ _members, _, _keys, _values ] = [ this._members, this._, this._keys, this._values ] ){ 
    
      return (function(r) {
        /* inc/misc.sibilant:1:782 */
      
        _keys.each(((k) => {
        	
          return r.set(k, f(_members[k], k, r));
        
        }));
        return r;
      }).call(this, create(OrderedMap)());
    
   },
  _delete( key = this.key,_members = this._members,_keys = this._keys ){ 
    
      const node=_members.get(key);
      _keys.removeNode(node);
      return _members.delete(key);
    
   },
  delete( key = this.key,_members = this._members,_keys = this._keys ){ 
    
      return this._delete(key);
    
   },
  push( [ key, value ] = [ this.key, this.value ],_members = this._members,_keys = this._keys ){ 
    
      return (function() {
        if (_members.has(key)) {
          return _members.get(key);
        } else {
          var r = (function() {
            /* inc/misc.sibilant:1:673 */
          
            _keys.push(key);
            _keyPointers.set(key, _keys.tail);
            return value;
          }).call(this);
          _members.set(key, r);
          return r;
        }
      }).call(this);
    
   },
  pop( _members = this._members,_keys = this._keys ){ 
    
      const node=_keys.pop();
      members.delete(key);
      return value;
    
   },
  shift( [ _members, _keyPointers, _keys, _values ] = [ this._members, this._keyPointers, this._keys, this._values ] ){ 
    
      var key = _keys.shift(),
          value = _values.shift();
      _keyPointers.delete(key);
      _members.delete(key);
      return value;
    
   },
  unshift( [ key, value ] = [ this.key, this.value ],[ _members, _keyPointers, _keys, _values ] = [ this._members, this._keyPointers, this._keys, this._values ] ){ 
    
      return (function() {
        if (_members.has(key)) {
          return _members.get(key);
        } else {
          var r = (function() {
            /* inc/misc.sibilant:1:673 */
          
            _keys.unshift(key);
            _keyPointers.set(key, (_values.unshift(value) - 1));
            return value;
          }).call(this);
          _members.set(key, r);
          return r;
        }
      }).call(this);
    
   },
  set( key = this.key,value = this.value,[ _members, _keyPointers, _keys, _values ] = [ this._members, this._keyPointers, this._keys, this._values ] ){ 
    
      return (function() {
        if (_members.has(key)) {
          return (function(i) {
            /* node_modules/kit/inc/scope.sibilant:12:9 */
          
            _values[i] = value;
            return _members.set(key, value);
          })(_keyPointers[key]);
        } else {
          _keys.push(key);
          _keyPointers.set(key, (_values.push(value) - 1));
          _members.set(key, value);
          return value;
        }
      }).call(this);
    
   }
 });
exports.OrderedMap = OrderedMap;