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
  Interface
 } = require("@kit-js/interface");
var R = require("ramda");
var { 
  OrderedMap
 } = require("@shared/data-structures/maps/ordered.js"),
    { 
  DynamicPool
 } = require("@shared/pooling/dynamic-pool.js"),
    { 
  Group
 } = require("@shared/data-structures/group.js");
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
var Entity = Interface.define("Entity", { 
  doc:"used as a key to retrieve related components from different systems.",
  init( system = this.system,id = this.id,aspects = this.aspects,components = aspects.map(((aspect, i) => {
  	
    return system.process.systems.get(aspect).spawn(this);
  
  })) ){ 
    
      this.system = system;this.id = id;this.aspects = aspects;this.components = components;
      return this;
    
   },
  get entity(  ){ 
    
      return this;
    
   },
  despawn( entity = this.entity,components = this.components ){ 
    
      entity.components.each(remove(entity));
      return entity.id = null;
    
   },
  spawn( aspects,system ){ 
    
      return system.spawn(aspects);
    
   }
 });
Entity.despawn = (function Entity$despawn$(entity = this.entity, components = this.components) {
  /* Entity.despawn node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  return this.system.pool.release(this);
});
Entity.clear = (function Entity$clear$() {
  /* Entity.clear node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  this.components.each(((c) => {
  	
    c.system.release(c);
    return c.entity = null;
  
  }));
  this.components.length = 0;
  return this.id = null;
});
exports.Entity = Entity;