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
  DoubleBufferedArray
 } from "./typed-arrays/double-buffered.js";
var ObjectPoolLength = DataType.define("ObjectPoolLength", { 
  keys:[ "length" ]
 });
var ObjectPoolLengths = DoubleBufferedArray.define("ObjectPoolLengths", { 
  dataType:ObjectPoolLength
 });
var ObjectPool = Interface.define("ObjectPool", { 
  nextId:0,
  arrayType:DoubleBufferedArray,
  indexKey:"poolId",
  Lengths:ObjectPoolLengths.spawn(1024),
  get length(  ){ 
    
      return this.Lengths[this.id].length;
    
   },
  init( maxSize = this.maxSize,id = ((this.nextId)++),typedArray = this.arrayType.spawn(maxSize) ){ 
    
      this.maxSize = maxSize;this.id = id;this.typedArray = typedArray;
      return this;
    
   },
  aquire( args ){ 
    
   },
  release(  ){ 
    
   },
  step(  ){ 
    
   }
 });