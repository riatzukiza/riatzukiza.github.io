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
var Gravity = Physics.Force.define("Gravity", { 
  apply( c ){ 
    
      var v = c.velocity;
      var collision = c.system.process.systems.get(Collision, c.entity);
      return (function() {
        if (!(collision.colliding)) {
          return v.yd += 9.8;
        }
      }).call(this);
    
   }
 });
exports.Gravity = Gravity;