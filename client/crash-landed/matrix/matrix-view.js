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
var MatrixView = extend(Matrix, { 
  symbol:Symbol("MatrixView")
 });
describe(MatrixView, offset([ 0, 0 ]), init( _matrix = this._matrix,width = this.width,height = this.height,offset = this.offset ){ 
  
    this._matrix = _matrix;this.width = width;this.height = height;this.offset = offset;
    return this;
  
 });
MatrixView.getIndex = (function MatrixView$getIndex$([ x, y ] = [ 0, 0 ], [ offx, offy ] = this.offset, width = (this.width + this._matrix.width)) {
  /* Matrix-view.get-index node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  "\n"+"Locate the index of an element with an offset, and a limit on width and height.\n"+"";
  return (((x + offx) * width) + (y + offy));
});
MatrixView.get = (function MatrixView$get$(x = this.x, y = this.y, width = this.width, height = this.height, [ offx, offy ] = this.offset) {
  /* Matrix-view.get node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  "retrieve an element of a matrix by its x and y coordinates ";
  return this._matrix.get((x + offx), (y + offy));
});
MatrixView.set = (function MatrixView$set$(x = this.x, y = this.y, value = this.value, width = this.width, height = this.height, [ offx, offy ] = this.offset) {
  /* Matrix-view.set node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  "change the value of an array using 2d coordinates.";
  return this._matrix.set((x + offx), (y + offy), value);
});