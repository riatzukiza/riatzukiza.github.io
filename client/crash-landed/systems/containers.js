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
var { 
  System,
  Component
 } = require("@shared/ecs.js"),
    { 
  List
 } = require("@shared/data-structures/list.js");
var Container = Component.define("Container", { 
  itemLimit:1,
  objects:null,
  add( entity ){ 
    
      return (function() {
        if ((object.itemInterface && this.itemLimit > this.objects.length)) {
          return this.objects.push(entity);
        } else {
          return false;
        }
      }).call(this);
    
   },
  hasType( type ){ 
    
      return (this.objects.head && this.objects.head.item.type === type);
    
   },
  has( entity ){ 
    
      return this.objects.head.item === entity;
    
   },
  remove( entity ){ 
    
      return this.objects.remove(entity);
    
   },
  clear(  ){ 
    
      this.objects.head.item.despawn();
      return this.objects.despawn();
    
   },
  register(  ){ 
    
      return this.objects = List.spawn();
    
   }
 });
var Containers = System.define("Containers", { 
  interface:Container,
  _updateAll(  ){ 
    
   },
  _updateComponent(  ){ 
    
   }
 });