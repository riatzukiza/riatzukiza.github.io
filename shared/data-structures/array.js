Array.transform = (function Array$transform$(f, a, r = a) {
  /* Array.transform eval.sibilant:1:330 */

  return (function(r) {
    /* eval.sibilant:1:412 */
  
    a.each(((e, i) => {
    	
      return r[i] = f(e, i);
    
    }));
    return r;
  }).call(this, r);
});
Array.prototype.bind = Array.bind = (function Array$bind$(a, f) {
  /* Array.bind eval.sibilant:1:463 */

  return a.reduce(((r, e, i) => {
  	
    f(e, i).each(((x) => {
    	
      return r.push(x);
    
    }));
    return r;
  
  }), []);
});
Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each eval.sibilant:1:624 */

  this.forEach(f);
  return this;
});
Array.prototype.bind = (function Array$prototype$bind$(f) {
  /* Array.prototype.bind eval.sibilant:1:688 */

  return (function(r) {
    /* eval.sibilant:1:412 */
  
    this.each(((a) => {
    	
      return r.push(f(a));
    
    }));
    return r;
  }).call(this, []);
});
Map.prototype.each = (function Map$prototype$each$(f) {
  /* Map.prototype.each eval.sibilant:1:779 */

  this.forEach(f);
  return this;
});