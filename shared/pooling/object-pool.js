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
var { 
  Interface
 } = require("@kit-js/interface");
var { 
  Group
 } = require("@shared/data-structures/group.js");
var _assignId = ((m, k) => {
	
  m.id = k;
  return m;

});
var ObjectPool = Interface.define("ObjectPool", { 
  init( size = this.size,_interface = null,_array = (function(array) {
    /* eval.sibilant:1:489 */
  
    (function() {
      /* node_modules/kit/inc/loops.sibilant:26:8 */
    
      var $for = null;
      for (var i = 0;i < size;++(i))
      {
      $for = (function() {
        /* node_modules/kit/inc/loops.sibilant:28:35 */
      
        array.push((function() {
          /* eval.sibilant:1:477 */
        
          return Object.create(_interface);
        }).call(this));
        return array;
      }).call(this);
      }
      ;
      return $for;
    }).call(this);
    return array;
  }).call(this, []),_available = Group.from(_array),_inUse = Group.create() ){ 
    
      this.size = size;this._interface = _interface;this._array = _array;this._available = _available;this._inUse = _inUse;
      _array.each(_assignId);
      return this;
    
   },
  pools:(new Map()),
  get free(  ){ 
    
      return this._available.size;
    
   },
  get used(  ){ 
    
      return this._inUse.size;
    
   },
  get total(  ){ 
    
      return this.size;
    
   },
  clear( size = this.size,_interface = this._interface,_array = this._array,_inUse = this._inUse ){ 
    
      _inUse.each(((o) => {
      	
        return o.clear();
      
      }));
      return this.init(size, _interface, _array);
    
   },
  aquire( _available = this._available,_members = this._members,_inUse = this._inUse ){ 
    
      "remove an object from the collection of available ones,\n"+"adding it to the collection of objects currently in use,\n"+"and return it to the caller.";
      return (function(member) {
        /* eval.sibilant:1:489 */
      
        _inUse.add(member);
        return member;
      }).call(this, _available.pop());
    
   },
  release( obj = this.obj,_available = this._available,_members = this._members,_inUse = this._inUse ){ 
    
      "take an object that is a member of this pool, and remove it\n"+"from the collection of in use objects, and adding it to the collection of\n"+"available ones, for later use";
      obj.clear();
      _inUse.remove(obj);
      return _available.add(obj);
    
   }
 });
exports.ObjectPool = ObjectPool;