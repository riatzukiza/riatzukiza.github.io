var { 
  Interface
 } = require("@kit-js/interface");
var { 
  OrderedMap
 } = require("sibilant-game-engine/client/data-structures/ordered-map"),
    { 
  DynamicPool
 } = require("sibilant-game-engine/client/pooling/dynamic-pool"),
    { 
  Group
 } = require("sibilant-game-engine/client/data-structures/group"),
    { 
  EntityGroup,
  Entity,
  EntitySystem
 } = require("sibilant-game-engine/client/ecs/entity"),
    { 
  Component,
  System
 } = require("sibilant-game-engine/client/ecs/component");
var { 
  Interface
 } = require("@kit-js/interface");
var R = require("ramda");
var spawnComponent = (function spawnComponent$(entity, systems) {
  /* spawn-component eval.sibilant:20:0 */

  return (function() {
    /* eval.sibilant:20:39 */
  
    return systems.get(arguments[0]).spawn(entity);
  });
});
var componentList = (function componentList$(entity) {
  /* component-list eval.sibilant:22:0 */

  return R.map(spawnComponent(entity));
});
var remove = (function remove$(entity) {
  /* remove eval.sibilant:24:0 */

  return (function() {
    /* eval.sibilant:24:21 */
  
    return arguments[0].system.clear(entity);
  });
});
var clear = (function() {
  /* eval.sibilant:26:11 */

  return arguments[0].clear();
});
Entity.despawn = (function Entity$despawn$(entity = this.entity, components = this.components) {
  /* Entity.despawn node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  return this.clear();
});
Entity.clear = (function Entity$clear$(system = this.system) {
  /* Entity.clear node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  this.components.each(((c) => {
  	
    return c.clear();
  
  }));
  this.id = null;
  return system.pool.release(this);
});
exports.Entity = Entity;
EntitySystem.clear = (function EntitySystem$clear$() {
  /* Entity-system.clear eval.sibilant:39:0 */

  return this.pool.clear();
});
EntitySystem.spawn = (function EntitySystem$spawn$(aspects) {
  /* Entity-system.spawn eval.sibilant:42:0 */

  return this.pool.spawn(this, ((this.currentId)++), aspects);
});
exports.EntitySystem = EntitySystem;
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

  return group.each(((e) => {
  	
    console.log("despawning", e);
    return e.clear();
  
  }));
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
Component.clear = (function Component$clear$(system = this.system) {
  /* Component.clear node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  return system.pool.release(this);
});
exports.Component = Component;
System.build = (function System$build$() {
  /* System.build eval.sibilant:76:0 */

  return (function() {
    if (!((this.template))) {
      return this.init();
    }
  }).call(this);
});
System.clear = (function System$clear$(pool = this.pool, components = this.components, entity = this.entity) {
  /* System.clear node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  return pool.clear();
});
System.get = (function System$get$(entity = this.entity, components = this.components) {
  /* System.get node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  return components.get(entity);
});
System.spawn = (function System$spawn$(entity = this.entity, pool = this.pool, components = this.components) {
  /* System.spawn node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  return (function(c) {
    /* node_modules/kit/inc/scope.sibilant:12:9 */
  
    components.set(entity, c);
    return c;
  })(pool.spawn(entity, this));
});
System._updateComponent = (function System$_updateComponent$(component, t) {
  /* System.*update-component eval.sibilant:91:0 */

  throw (new Error("need to override *update-component on sub classes of component system"))
});
System._updateAll = (function System$_updateAll$(t = this.t, components = this.components) {
  /* System.*update-all node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  return components.each((($fpipe) => {
  	
    return this._updateComponent($fpipe, t);
  
  }));
});
System.update = (function System$update$(t) {
  /* System.update eval.sibilant:97:0 */

  return this.thread = this.thread.then(((nil) => {
  	
    return this._updateAll(t);
  
  }));
});
exports.System = System;