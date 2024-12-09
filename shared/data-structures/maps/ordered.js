var { 
  Interface
 } = require("@kit-js/interface");
var OrderedMap = Interface.define("OrderedMap", { 
  init( _members = (new Map()),_keyPointers = (new Map()),_keys = [],_values = [] ){ 
    
      this._members = _members;this._keyPointers = _keyPointers;this._keys = _keys;this._values = _values;
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
  has( key = this.key,[ _members ] = [ this._members ] ){ 
    
      return _members.has(key);
    
   },
  get( key = this.key,[ _members, _, _keys ] = [ this._members, this._, this._keys ] ){ 
    
      return _members.get(key);
    
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
        /* node_modules/kit/inc/scope.sibilant:12:9 */
      
        _keys.each(((k) => {
        	
          return r.set(k, f(_members[k], k, r));
        
        }));
        return r;
      })(create(OrderedMap)());
    
   },
  rebuild(  ){ 
    
      const newKeys=[];
      const newValues=[];
      this.each(((v, k) => {
      	
        this._keyPointers.set(k, newKeys.length);
        newKeys.push(k);
        return newValues.push(v);
      
      }));
      this._values = newValues;
      return this._keys = newKeys;
    
   },
  _delete( key = this.key,_members = this._members,_keyPointers = this._keyPointers,_keys = this._keys,_values = this._values ){ 
    
      var i = _keyPointers.get(key);
      _members.delete(key);
      _keyPointers.delete(key);
      _keys[i] = null;
      return _values[i] = null;
    
   },
  delete( key = this.key,_members = this._members,_keys = this._keys ){ 
    
      this._delete(key);
      return (function() {
        if ((_keys.length - _members.size) > 2) {
          return this.rebuild();
        }
      }).call(this);
    
   },
  push( [ key, value ] = [ this.key, this.value ],[ _members, _keyPointers, _keys, _values ] = [ this._members, this._keyPointers, this._keys, this._values ] ){ 
    
      return (function() {
        if (_members.has(key)) {
          return _members.get(key);
        } else {
          return (function(value) {
            /* node_modules/kit/inc/scope.sibilant:12:9 */
          
            _members.set(key, value);
            return value;
          })((function() {
            /* node_modules/kit/inc/macros.sibilant:30:25 */
          
            _keys.push(key);
            _keyPointers.set(key, (_values.push(value) - 1));
            return value;
          }).call(this));
        }
      }).call(this);
    
   },
  pop( [ _members, _keyPointers, _keys, _values ] = [ this._members, this._keyPointers, this._keys, this._values ] ){ 
    
      var key = _keys.pop(),
          value = _values.pop();
      _keyPointers.delete(key);
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
          return (function(value) {
            /* node_modules/kit/inc/scope.sibilant:12:9 */
          
            _members.set(key, value);
            return value;
          })((function() {
            /* node_modules/kit/inc/macros.sibilant:30:25 */
          
            _keys.unshift(key);
            _keyPointers.set(key, (_values.unshift(value) - 1));
            return value;
          }).call(this));
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