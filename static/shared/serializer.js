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
import { 
  Interface
 } from "/shared/kit/interface/index.sibilant";
var Serializer = Actor.define("Serializer", { 
  serializeProperty( value = this.value,_types = this._types,_symbols = this._symbols ){ 
    
      (function() {
        if (value === null) {
          return null;
        } else if ((value.symbol && value === _types[value.symbol])) {
          return value.serializedSelfInterfaceReference;
        } else if (value.save) {
          return value.serializedSelfReference;
        } else if (Array.isArray(value)) {
          return value.map(((v) => {
          	return this.serializeProperty(v, _types, _symbols);
          }));
        } else if ((value instanceof Map)) {
          const map=(new Map());
          for (var [ key, v ] of value)
          {
          (function() {
            if ((key && typeof key !== "symbol")) {
              return map.set(this.serializeProperty(key, _types, _symbols), (function() {
                if (v.serialize) {
                  return this.serializeProperty(v, _types, _symbols);
                } else {
                  return v;
                }
              }).call(this));
            }
          }).call(this)
          }
          ;
          return map;
        } else if ((value instanceof Set)) {
          const set=(new Set());
          for (var v of value)
          {
          map.add((function() {
            if (v.serialize) {
              return this.serializeProperty(v, _types, _symbols);
            } else {
              return v;
            }
          }).call(this))
          }
          ;
          return map;
        } else {
          return value;
        }
      }).call(this);
      var serializeArray = (function serializeArray$(a) {
        /* serialize-array eval.sibilant:35:4 */
      
        return value.map(((v) => {
        	return this.serializeProperty(v, _types, _symbols);
        }));
      });
      var serializeSet = (function serializeSet$(s) {
        /* serialize-set eval.sibilant:38:4 */
      
        const set=(new Set());
        for (var v of value)
        {
        set.add((function() {
          if (v.serialize) {
            return this.serializeProperty(v, _types, _symbols);
          } else {
            return v;
          }
        }).call(this))
        }
        ;
        return map;
      });
      var serializeMap = (function serializeMap$(m) {
        /* serialize-map eval.sibilant:47:4 */
      
        const map=(new Map());
        for (var [ key, v ] of value)
        {
        (function() {
          if ((key && typeof key !== "symbol")) {
            return map.set(this.serializeProperty(key, _types, _symbols), (function() {
              if (v.serialize) {
                return this.serializeProperty(v, _types, _symbols);
              } else {
                return v;
              }
            }).call(this));
          }
        }).call(this)
        }
        ;
        return map;
      });
      return var serialize = (function serialize$(_types = this._types, _symbols = this._symbols) {
        /* serialize inc/core/function-expressions.sibilant:28:8 */
      
        return this.getSerializableProperties().reduce(((result, [ key, describer ]) => {
        	result[key] = this.serializeProperty(describer.value, _types, _symbols);
        return result;
        }), { 
          
         });
      });
    
   }
 });