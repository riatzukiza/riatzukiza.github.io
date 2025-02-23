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
  Spawnable
 } from "../data-structures/spawnable.js";
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
  /* spawn-component eval.sibilant:15:0 */

  return (function() {
    /* eval.sibilant:15:39 */
  
    return systems.get(arguments[0]).spawn(entity);
  });
});
var componentList = (function componentList$(entity) {
  /* component-list eval.sibilant:17:0 */

  return R.map(spawnComponent(entity));
});
var remove = (function remove$(entity) {
  /* remove eval.sibilant:19:0 */

  return (function() {
    /* eval.sibilant:19:21 */
  
    return arguments[0].system.clear(entity);
  });
});
var clear = (function() {
  /* eval.sibilant:21:11 */

  return arguments[0].clear();
});
var Entity = Spawnable.define("Entity", { 
  doc:"used as a key to retrieve related components from different systems.",
  init( aspects = this.aspects,components = aspects.map(((aspect, i) => {
  	return this.game.systems.get(aspect).spawn(this);
  })) ){ 
    
      this.aspects = aspects;this.components = components;
      return this;
    
   },
  get entity(  ){ 
    
      return this;
    
   },
  clear( entity = this.entity,components = this.components ){ 
    
      entity.components.each(remove(entity));
      return entity.id = null;
    
   }
 });
export { 
  Entity
 };