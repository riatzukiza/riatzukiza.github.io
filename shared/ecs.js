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
  /* spawn-component eval.sibilant:12:0 */

  return (function() {
    /* eval.sibilant:12:39 */
  
    return systems.get(arguments[0]).spawn(entity);
  });
});
var componentList = (function componentList$(entity) {
  /* component-list eval.sibilant:14:0 */

  return R.map(spawnComponent(entity));
});
var remove = (function remove$(entity) {
  /* remove eval.sibilant:16:0 */

  return (function() {
    /* eval.sibilant:16:21 */
  
    return arguments[0].system.clear(entity);
  });
});
var clear = (function() {
  /* eval.sibilant:18:11 */

  return arguments[0].clear();
});
var Component = Interface.define("Component", { 
  register(  ){ 
    
   },
  init( entity = this.entity,system = this.system ){ 
    
      this.entity = entity;this.system = system;
      entity[this.name.toLowerCase()] = this;
      this.register();
      return this;
    
   }
 });
var System = Interface.define("System", { 
  interface:Component,
  register(  ){ 
    
   },
  init( process = this.process,interface = this.interface,components = create(OrderedMap)(),pool = create(DynamicPool)(interface),thread = Promise.resolve() ){ 
    
      this.process = process;this.interface = interface;this.components = components;this.pool = pool;this.thread = thread;
      this.register();
      return this;
    
   },
  get system(  ){ 
    
      return this;
    
   },
  template:true,
  get game(  ){ 
    
      return this.process;
    
   },
  build(  ){ 
    
      return (function() {
        if (!((this.template))) {
          return this.init();
        }
      }).call(this);
    
   },
  clear( pool = this.pool,components = this.components,entity = this.entity ){ 
    
      components.delete(entity);
      return pool.clear();
    
   },
  get( entity = this.entity,components = this.components ){ 
    
      return components.get(entity);
    
   },
  spawn( entity = this.entity,pool = this.pool,components = this.components ){ 
    
      return (function(c) {
        /* node_modules/kit/inc/scope.sibilant:12:9 */
      
        components.set(entity, c);
        return c;
      })(pool.spawn(entity, this));
    
   },
  _updateComponent( component,t ){ 
    
      throw (new Error("need to override *update-component on sub classes of component system"))
    
   },
  _updateAll( t = this.t,components = this.components ){ 
    
      return components.each((($fpipe) => {
      	
        return this._updateComponent($fpipe, t);
      
      }));
    
   },
  update( t ){ 
    
      return this.thread = this.thread.then(((nil) => {
      	
        return this._updateAll(t);
      
      }));
    
   }
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
var EntitySystem = Interface.define("EntitySystem", { 
  currentId:0,
  init( process = this.process,pool = create(DynamicPool)(Entity, 256) ){ 
    
      this.process = process;this.pool = pool;
      return this;
    
   },
  get game(  ){ 
    
      return this.process;
    
   },
  clear(  ){ 
    
      return this.pool.clear();
    
   },
  spawn( aspects ){ 
    
      return this.pool.spawn(this, ((this.currentId)++), aspects);
    
   }
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
  /* Entity-system.clear eval.sibilant:118:0 */

  return this.pool.clear();
});
EntitySystem.spawn = (function EntitySystem$spawn$(aspects) {
  /* Entity-system.spawn eval.sibilant:121:0 */

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

  return (function() {
    var while$5 = undefined;
    while (0 < group.length) {
      while$5 = (function() {
        return group.pop().clear();
      }).call(this);
    };
    return while$5;
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
Component.clear = (function Component$clear$(system = this.system) {
  /* Component.clear node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  return system.pool.release(this);
});
exports.Component = Component;
System.build = (function System$build$() {
  /* System.build eval.sibilant:154:0 */

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
  /* System.*update-component eval.sibilant:169:0 */

  throw (new Error("need to override *update-component on sub classes of component system"))
});
System._updateAll = (function System$_updateAll$(t = this.t, components = this.components) {
  /* System.*update-all node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  return components.each((($fpipe) => {
  	
    return this._updateComponent($fpipe, t);
  
  }));
});
System.update = (function System$update$(t) {
  /* System.update eval.sibilant:175:0 */

  return this.thread = this.thread.then(((nil) => {
  	
    return this._updateAll(t);
  
  }));
});
exports.System = System;