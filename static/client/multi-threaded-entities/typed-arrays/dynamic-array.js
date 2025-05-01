Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1831 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1893 */

  return Object.keys(this).forEach(((k) => {
  	return f(this[k], k);
  }));
});
import '/bundles/external.js';
import { 
  mixin,
  create,
  extend
 } from "/shared/kit/core/util.js";
import { 
  Singleton
 } from "./singleton.js";
var LengthIndex = Singleton.define("LengthIndex", { 
  keys:[ "length" ]
 });
var DynamicArray = Interface.define("DynamicArray", { 
  dataType:null,
  get arrayType(  ){ 
    
      const t=Object.create(CompositeTypedArray);
      t.dataType = this.dataType;
      return t;
    
   },
  get data(  ){ 
    
      return this.source.data;
    
   },
  get buffers(  ){ 
    
      return [ this.source.buffers, this.length.buffers ];
    
   },
  get length(  ){ 
    
      return (function() {
        if (this._length) {
          return this._length;
        } else {
          return this._length = this.Length.length;
        }
      }).call(this);
    
   },
  set length( v ){ 
    
      return this.Length.length = this._length = v;
    
   },
  get last(  ){ 
    
      return this.source.data[(this.length - 1)];
    
   },
  init( length = this.length,maxSize = (2 * length),source = this.arrayType.spawn(this.maxSize),Length = LengthIndex.spawn() ){ 
    
      this.length = length;this.maxSize = maxSize;this.source = source;this.Length = Length;
      return this;
    
   },
  fromBuffers( [ b1, b2 ],[ b3, b4 ] ){ 
    
      const Length=LengthIndex.fromBuffers(b3, b4);
      const source=this.arrayType.fromBuffers(b1, b2);
      const maxSize=source.length;
      return this.spawn(Length.length, maxSize, source, Length);
    
   },
  *loop(  ){ 
  
    return for (var i = 0;this.length > i;((i)++))
    {
    yield(this.data[i])
    }
    ;
  
 },
  step(  ){ 
    
      this._length = null;
      this.Length.step();
      return this.source.step();
    
   },
  grow(  ){ 
    
      const v=this.data[this.length];
      this.length = (this.length + 1);
      return v;
    
   },
  swapAndRemove( id ){ 
    
      const v=this.data[id];
      const last=this.last;
      for (var key of this.dataType.keys)
      {
      v[key] = last[key];
      }
      ;
      return this.shrink();
    
   },
  shrink(  ){ 
    
      const i=(this.length - 1);
      this.data[i].clear();
      return this.length = i;
    
   }
 });
export { 
  DynamicArray
 };