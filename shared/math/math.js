var tau = (Math.PI * 2);
exports.tau = tau;
var euclidianDistance = (function euclidianDistance$(x, y, a, b) {
  /* euclidian-distance eval.sibilant:1:817 */

  return Math.sqrt((Math.pow((x - a), 2) + Math.pow((y - b), 2)));
});
exports.euclidianDistance = euclidianDistance;
var productOf = (function productOf$(a) {
  /* product-of eval.sibilant:1:950 */

  return a.reduce(((value, e) => {
  	
    return (value * e);
  
  }), 1);
});
exports.productOf = productOf;
var randomUbyte = (function randomUbyte$() {
  /* random-ubyte eval.sibilant:1:1036 */

  return randomInt(0, 255);
});
exports.randomUbyte = randomUbyte;
var square = (function square$(dim, f) {
  /* square eval.sibilant:1:1103 */

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
  /* inverse-square eval.sibilant:1:1311 */

  return (rate / (c + Math.pow(euclidianDistance(x, y, pos.x, pos.y), 2)));
});
exports.inverseSquare = inverseSquare;
var add = (function add$(a, b) {
  /* add eval.sibilant:1:1455 */

  return (a + b);
});
exports.add = add;
var summate = (function summate$(a) {
  /* summate eval.sibilant:1:1496 */

  return a.reduce(add, 0);
});
exports.summate = summate;