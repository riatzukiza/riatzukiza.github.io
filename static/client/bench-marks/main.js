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
var R = require("ramda");
var { 
  create,
  extend,
  mixin,
  conditional,
  cond,
  partiallyApplyAfter
 } = require("@kit-js/core/js/util");
var { 
  Interface
 } = require("@kit-js/interface");
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
global.mixin = mixin;
global.create = create;
var { 
  BinarySearchTree
 } = require("@shared/data-structures/trees/binary-search-tree.js"),
    { 
  RedBlackTree
 } = require("@shared/data-structures/trees/red-black-tree.js"),
    { 
  Ticker
 } = require("@shared/ticker.js"),
    { 
  Spawnable
 } = require("@shared/data-structures/spawnable.js");
const { 
  
 }=require(createDocumentNode);
const rbTree=RedBlackTree.spawn();
const low=Math.floor((Math.random() * 9000));
const high=(low + Math.floor((Math.random() * 10000)));
var timedFn = (function timedFn$(f) {
  /* timed-fn eval.sibilant:30:0 */

  return ((...args) => {
  	
    const start=Date.now();
    const r=f(...args);
    const end=Date.now();
    return (end - start);
  
  });
});
function* randomNumbers( maxValue,count ){ 
  
    for (var i = 0;i < count;++(i))
    {
    const n=Math.round((Math.random() * maxValue));;
    yield(n)
    }
    ;
    return ;
  
 };
console.log("generating a large array of random numbers");
const reallyBigArray=Array.from(randomNumbers(Number.MAX_SAFE_INTEGER, 1000));
console.log("Done generating data", reallyBigArray);
var ArrayWrapper = Spawnable.define("ArrayWrapper", { 
  init( array = (this.array || []) ){ 
    
      this.array = array;
      return this;
    
   },
  clear(  ){ 
    
      return this.array.length = 0;
    
   },
  filter( f = this.f,array = this.array ){ 
    
      const r=ArrayWrapper.spawn();
      for (var n of array)
      {
      if( n > 10000 ){ 
        r.array.push(n)
       }
      }
      ;
      return r;
    
   }
 });
var arrayDotFilter = (function arrayDotFilter$(array) {
  /* array-dot-filter eval.sibilant:58:0 */

  return array.filter(((n) => {
  	
    return n > 10000;
  
  }));
});
var forOfFilter = (function forOfFilter$(array) {
  /* for-of-filter eval.sibilant:61:0 */

  const r=[];
  for (var n of array)
  {
  if( n > 10000 ){ 
    r.push(n)
   }
  }
  ;
  return r;
});
var pooledDotFilter = (function pooledDotFilter$(array) {
  /* pooled-dot-filter eval.sibilant:66:0 */

  return ArrayWrapper.filter(((n) => {
  	
    return n > 10000;
  
  }), array).despawn();
});
var pooledForOfFilter = (function pooledForOfFilter$(array) {
  /* pooled-for-of-filter eval.sibilant:69:0 */

  const r=ArrayWrapper.spawn();
  for (var n of array)
  {
  if( n > 10000 ){ 
    r.array.push(n)
   }
  }
  ;
  return r.despawn();
});
var arrayDotFilters = (function arrayDotFilters$(array, times) {
  /* array-dot-filters eval.sibilant:75:0 */

  for (var i = 0;i < times;++(i))
  {
  arrayDotFilter(array)
  }
  ;
  return null;
});
var forOfFilters = (function forOfFilters$(array, times) {
  /* for-of-filters eval.sibilant:76:0 */

  for (var i = 0;i < times;++(i))
  {
  forOfFilter(array)
  }
  ;
  return null;
});
var pooledForOfFilters = (function pooledForOfFilters$(array, times) {
  /* pooled-for-of-filters eval.sibilant:77:0 */

  for (var i = 0;i < times;++(i))
  {
  pooledForOfFilter(array)
  }
  ;
  return null;
});
var pooledDotFilters = (function pooledDotFilters$(array, times) {
  /* pooled-dot-filters eval.sibilant:78:0 */

  for (var i = 0;i < times;++(i))
  {
  pooledDotFilter(array)
  }
  ;
  return null;
});
console.log("array.filter", timedFn(arrayDotFilter)(reallyBigArray));
console.log("for ... of array filter", timedFn(forOfFilter)(reallyBigArray));
console.log("pooled for...of filter", timedFn(pooledForOfFilter)(reallyBigArray));
console.log("pooled.filter", timedFn(pooledDotFilter)(reallyBigArray));
const times=1000000;
console.log("array.filter", times, "times", timedFn(arrayDotFilters)(reallyBigArray, times));
console.log("for ... of array filter", times, "times", timedFn(forOfFilters)(reallyBigArray, times));
console.log("pooled for...of filter", times, "times", timedFn(pooledForOfFilters)(reallyBigArray, times));
console.log("pooled.filter", times, "times", timedFn(pooledDotFilters)(reallyBigArray, times));