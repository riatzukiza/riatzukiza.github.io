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
var ItemInterface = Component.define("ItemInterface", { 
  type:"food",
  calories:100,
  container:null,
  store( container ){ 
    
      return (function() {
        if (container.entity.container.add(this.entity)) {
          return this.container = container;
        } else {
          return false;
        }
      }).call(this);
    
   },
  consume( entity ){ 
    
      return entity.needs.eat(this);
    
   },
  clear(  ){ 
    
      return (function() {
        if (this.container) {
          this.container.remove(this.entity);
          return this.container = null;
        }
      }).call(this);
    
   }
 });
var Item = System.define("Item", { 
  
 });