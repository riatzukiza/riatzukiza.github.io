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
import { 
  OrderedMap
 } from "../data-structures/maps/ordered.js";
import { 
  DynamicPool
 } from "../pooling/dynamic-pool.js";
import { 
  Group
 } from "../data-structures/group.js";
import { 
  Interface
 } from "/shared/kit/interface/index.js";
import { 
  Saveable
 } from "/shared/saveable.js";
var spawnComponent = (function spawnComponent$(entity, systems) {
  /* spawn-component eval.sibilant:13:0 */

  return (function() {
    /* eval.sibilant:13:39 */
  
    return systems.get(arguments[0]).spawn(entity);
  });
});
var componentList = (function componentList$(entity) {
  /* component-list eval.sibilant:15:0 */

  return R.map(spawnComponent(entity));
});
var remove = (function remove$(entity) {
  /* remove eval.sibilant:17:0 */

  return (function() {
    /* eval.sibilant:17:21 */
  
    return arguments[0].system.clear(entity);
  });
});
var clear = (function() {
  /* eval.sibilant:19:11 */

  return arguments[0].clear();
});
var EntityGroup = Saveable.define("EntityGroup", { 
  init( groupName = this.groupName,aspects = this.aspects,system = this.system,group = create(Group)() ){ 
    
      this.groupName = groupName;this.aspects = aspects;this.system = system;this.group = group;
      return this;
    
   },
  get size(  ){ 
    
      return this.group.size;
    
   },
  spawn( aspects = this.aspects,system = this.system,group = this.group ){ 
    
      const self=this;
      return (function(e) {
        /* inc/misc.sibilant:1:1369 */
      
        e.group = self;
        group.add(e);
        return e;
      }).call(this, system.spawn(aspects));
    
   },
  clear( group = this.group ){ 
    
      group.each(((entity) => {
      	return entity.despawn();
      }));
      return group.clear();
    
   },
  has( entity = this.entity,group = this.group ){ 
    
      return group.has(entity);
    
   },
  despawn( entity = this.entity,group = this.group ){ 
    
      group.remove(entity);
      return entity.despawn();
    
   }
 });
export { 
  EntityGroup
 };