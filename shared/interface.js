Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1121 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1183 */

  return Object.keys(this).forEach(((k) => {
  	
    return f(this[k], k);
  
  }));
});
var R = require("ramda");
var { 
  create,
  extend,
  mixin,
  conditional,
  cond,
  partiallyApplyAfter
 } = require("@kit-js/core/js/util");
var define = (function define$(interfaceName = this.interfaceName, _obj = this._obj, _types = this._types, _symbols = this._symbols, _shares = (_obj.borrows || _obj.shares || []), _ext = (_obj.extend || this), _build = _obj.build) {
  /* define node_modules/@kit-js/core/inc/core/function-expressions.sibilant:29:8 */

  return (function() {
    if (interfaceName in _symbols) {
      return mixin(_obj, _types[_symbols[interfaceName]]);
    } else {
      return Interface._construct(interfaceName, _obj, _ext, _shares, _symbols, _types, _build);
    }
  }).call(this);
});
var _construct = (function _construct$(interfaceName = this.interfaceName, _obj = this._obj, _ext = this._ext, _shares = this._shares, _symbols = this._symbols, _types = this._types, _build = this._build) {
  /* *construct node_modules/@kit-js/core/inc/core/function-expressions.sibilant:29:8 */

  return (function(proto) {
    /* node_modules/@kit-js/core/inc/scope.sibilant:12:9 */
  
    proto.construct = (function proto$construct$() {
      /* proto.construct eval.sibilant:28:11 */
    
      return Object.create(proto).init(...arguments);
    });
    Interface.init.call(proto);
    _symbols[interfaceName] = proto.symbol;
    _types[proto.symbol] = proto;
    (function() {
      if (proto.build) {
        return proto.build();
      }
    }).call(this);
    proto;
    return proto;
  })(extend(_ext, mixin([ { 
    interfaceName,
    symbol:Symbol(interfaceName),
    define:Interface.define,
    proto:_ext,
    _construct:Interface._construct
   }, ..._shares ], _obj)));
});
var Interface = { 
  _symbols:{  },
  _types:{  },
  init( interfaceName = this.interfaceName,_obj = this._obj,_types = {  },_symbols = {  } ){ 
    
      this.interfaceName = interfaceName;this._obj = _obj;this._types = _types;this._symbols = _symbols;
      return this;
    
   },
  get name(  ){ 
    
      return this.interfaceName;
    
   },
  get typeName(  ){ 
    
      return this.interfaceName;
    
   },
  define,
  _construct
 };
exports.Interface = Interface;