var { 
  Interface
 } = require("@kit-js/interface");
var { 
  PooledDataStructure
 } = require("@shared/data-structures/pooled.js");
var Table = PooledDataStructure.define("Table", { 
  init( iterable = null,_map = this._map ){ 
    
      this.iterable = iterable;this._map = _map;
      (function() {
        if (!(_map)) {
          return this._map = (new Map());
        }
      }).call(this);
      return this;
    
   },
  clear(  ){ 
    
      this._map.clear();
      return this;
    
   },
  get( key = null,_map = this._map ){ 
    
      return _map.get(key);
    
   },
  set( key = null,value = null,_map = this._map ){ 
    
      return _map.set(key, value);
    
   },
  has( key = null,_map = this._map ){ 
    
      return _map.has(key);
    
   },
  delete( key = null,_map = this._map ){ 
    
      return _map.delete(key);
    
   },
  each( f = null,_map = this._map ){ 
    
      return _map.each(f);
    
   }
 });
exports.Table = Table;