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
  get tile(  ){ 
    
      return this.system.game.tiles.getClosestFromWorldPos(this.entity.positionInterface.x, this.entity.positionInterface.y);
    
   },
  get visible__QUERY(  ){ 
    
      return this.tile.entity.visibleStatus.visible__QUERY;
    
   },
  get explored__QUERY(  ){ 
    
      return this.tile.entity.visibleStatus.explored__QUERY;
    
   },
  add( entity ){ 
    
      return (function() {
        if ((entity.itemInterface && this.itemLimit > this.objects.length)) {
          this.objects.push(entity);
          return entity.itemInterface.container = this;
        } else {
          throw (new Error("Container cannot store any more items"))
        }
      }).call(this);
    
   },
  hasType( type ){ 
    
      return (this.objects.head && this.objects.head.item.itemInterface.type === type);
    
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
exports.Container = Container;
var Containers = System.define("Containers", { 
  interface:Container,
  _updateAll(  ){ 
    
   },
  _updateComponent(  ){ 
    
   }
 });
exports.Containers = Containers;