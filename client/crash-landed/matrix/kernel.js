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
var Kernel = extend(Matrix, { 
  symbol:Symbol("Kernel")
 });
describe(Kernel, init( width = this.width,height = this.height,_kernel = (function(r) {
  /* eval.sibilant:1:489 */

  for (var x = 0;x < width;++(x))
  {
  r.push([])
  }
  ;
  return r;
}).call(this, []) ){ 
  
    this.width = width;this.height = height;this._kernel = _kernel;
    return this;
  
 }, get _matrix(  ){ 
  
    return this._kernel;
  
 }, get array(  ){ 
  
    return this._kernel;
  
 });
Kernel.get = (function Kernel$get$(x = this.x, y = this.y, width = this.width, height = this.height, _kernel = this._kernel) {
  /* Kernel.get node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  "retrieve an element of a matrix by its x and y coordinates";
  return _kernel[x][y];
});
Kernel.set = (function Kernel$set$(x = this.x, y = this.y, value = this.value, _kernel = this._kernel) {
  /* Kernel.set node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  "change the value of an array using 2d coordinates.";
  return _kernel[x][y] = value;
});
Kernel.convolve = (function Kernel$convolve$(B = this.B, A = this, height = this.height, width = this.width) {
  /* Kernel.convolve node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  "perform a kernel filter convolution of two matricies '";
  return (function(m) {
    /* eval.sibilant:1:489 */
  
    for (var x = 0;x < width;++(x))
    {
    for (var y = 0;y < height;++(y))
    {
    m = (m + (A.get(x, y) * B.get(x, y)));
    }
    
    }
    ;
    return m;
  }).call(this, 0);
});
Kernel.identity = (function Kernel$identity$(w, h) {
  /* Kernel.identity eval.sibilant:33:0 */

  return kernel(w, h).dmap((() => {
  	
    return 1;
  
  }));
});
var kernel = create(Kernel);