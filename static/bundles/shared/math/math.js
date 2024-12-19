require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@shared/math/math.js":[function(require,module,exports){
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
var tau = (Math.PI * 2);
exports.tau = tau;
var euclidianDistance = (function euclidianDistance$(x, y, a, b) {
  /* euclidian-distance eval.sibilant:1:848 */

  return Math.sqrt((Math.pow((x - a), 2) + Math.pow((y - b), 2)));
});
exports.euclidianDistance = euclidianDistance;
var productOf = (function productOf$(a) {
  /* product-of eval.sibilant:1:981 */

  return a.reduce(((value, e) => {
  	
    return (value * e);
  
  }), 1);
});
exports.productOf = productOf;
var randomUbyte = (function randomUbyte$() {
  /* random-ubyte eval.sibilant:1:1067 */

  return randomInt(0, 255);
});
exports.randomUbyte = randomUbyte;
var square = (function square$(dim, f) {
  /* square eval.sibilant:1:1134 */

  var lim = Math.round((dim / 2));
  (function() {
    /* node_modules/kit/inc/loops.sibilant:26:8 */
  
    var $for = null;
    for (var i = (0 - lim);i <= lim;++(i))
    {
    $for = (function() {
      /* node_modules/kit/inc/loops.sibilant:28:35 */
    
      return (function() {
        /* node_modules/kit/inc/loops.sibilant:26:8 */
      
        var $for = null;
        for (var j = (0 - lim);j <= lim;++(j))
        {
        $for = (function() {
          /* node_modules/kit/inc/loops.sibilant:28:35 */
        
          return f(i, j);
        }).call(this);
        }
        ;
        return $for;
      }).call(this);
    }).call(this);
    }
    ;
    return $for;
  }).call(this);
  return null;
});
exports.square = square;
var inverseSquare = (function inverseSquare$(rate, c, pos, { 
  x,
  y
 }) {
  /* inverse-square eval.sibilant:1:1342 */

  return (rate / (c + Math.pow(euclidianDistance(x, y, pos.x, pos.y), 2)));
});
exports.inverseSquare = inverseSquare;
var add = (function add$(a, b) {
  /* add eval.sibilant:1:1486 */

  return (a + b);
});
exports.add = add;
var summate = (function summate$(a) {
  /* summate eval.sibilant:1:1527 */

  return a.reduce(add, 0);
});
exports.summate = summate;
},{}]},{},[]);
