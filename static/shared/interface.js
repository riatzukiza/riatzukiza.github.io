Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1692 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1754 */

  return Object.keys(this).forEach(((k) => {
  	return f(this[k], k);
  }));
});
import { 
  mixin,
  create,
  extend
 } from "/shared/kit/core/util.js";
var define = (function define$(interfaceName = this.interfaceName, _obj = this._obj, _types = this._types, _symbols = this._symbols, _shares = (_obj.borrows || _obj.shares || []), _ext = (_obj.extend || this), _build = _obj.build) {
  /* define inc/core/function-expressions.sibilant:28:8 */

  return (function() {
    if (interfaceName in _symbols) {
      return mixin(_obj, _types[_symbols[interfaceName]]);
    } else {
      return Interface._construct(interfaceName, _obj, _ext, _shares, _symbols, _types, _build);
    }
  }).call(this);
});
var _construct = (function _construct$(interfaceName = this.interfaceName, _obj = this._obj, _ext = this._ext, _shares = this._shares, _symbols = this._symbols, _types = this._types, _build = this._build) {
  /* *construct inc/core/function-expressions.sibilant:28:8 */

  const shares=[ ..._shares, { 
    interfaceName,
    symbol:Symbol(interfaceName),
    define:Interface.define,
    proto:_ext,
    _construct:Interface._construct
   } ];
  return (function(proto) {
    /* inc/scope.sibilant:12:9 */
  
    proto.construct = (function proto$construct$() {
      /* proto.construct eval.sibilant:28:11 */
    
      return Object.create(proto).init(...arguments);
    });
    Interface.init.call(proto);
    _symbols.set(proto, proto.symbol);
    _types.set(proto.symbol, proto);
    (function() {
      if (proto.build) {
        return proto.build();
      }
    }).call(this);
    proto;
    return proto;
  })(extend(_ext, mixin(_obj)));
});
defObject(Interface, null, _symbols((new Map())), _interfaces((new Map())), cached(), init( interfaceName = this.interfaceName,_obj = this._obj,_types = {  },_symbols = {  } ){ 
  
    this.interfaceName = interfaceName;this._obj = _obj;this._types = _types;this._symbols = _symbols;
    return this;
  
 }, get name(  ){ 
  
    return this.interfaceName;
  
 }, get typeName(  ){ 
  
    return this.interfaceName;
  
 }, define, _construct);
var Interface = undefined;
export { 
  Interface
 };