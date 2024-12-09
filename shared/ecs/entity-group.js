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
var EntityGroup = Interface.define("EntityGroup", { 
  init( name = this.name,aspects = this.aspects,system = this.system,group = create(Group)() ){ 
    
      this.name = name;this.aspects = aspects;this.system = system;this.group = group;
      return this;
    
   },
  get size(  ){ 
    
      return this.group.size;
    
   },
  clear( group ){ 
    
      return group.each(clear);
    
   },
  spawn( aspects = this.aspects,system = this.system,group = this.group ){ 
    
      return (function(e) {
        /* node_modules/kit/inc/scope.sibilant:12:9 */
      
        e.group = this;
        group.add(e);
        return e;
      })(system.spawn(aspects));
    
   }
 });
EntityGroup.init = (function EntityGroup$init$(name = this.name, aspects = this.aspects, system = this.system, group = create(Group)()) {
  /* Entity-group.init node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  this.name = name;
  this.aspects = aspects;
  this.system = system;
  this.group = group;
  return this;
});
EntityGroup.clear = (function EntityGroup$clear$(group = this.group) {
  /* Entity-group.clear node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  return (function() {
    var while$11 = undefined;
    while (0 < group.length) {
      while$11 = (function() {
        return group.pop().clear();
      }).call(this);
    };
    return while$11;
  }).call(this);
});
EntityGroup.has = (function EntityGroup$has$(entity = this.entity, group = this.group) {
  /* Entity-group.has node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  return group.has(entity);
});
EntityGroup.spawn = (function EntityGroup$spawn$(aspects = this.aspects, system = this.system, group = this.group) {
  /* Entity-group.spawn node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  return (function(e) {
    /* node_modules/kit/inc/scope.sibilant:12:9 */
  
    group.add(e);
    return e;
  })(system.spawn(aspects));
});
EntityGroup.despawn = (function EntityGroup$despawn$(entity = this.entity, group = this.group) {
  /* Entity-group.despawn node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  group.remove(entity);
  return entity.clear();
});
exports.EntityGroup = EntityGroup;