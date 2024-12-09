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
  Component
 } = require("@shared/ecs/component.js"),
    { 
  Group
 } = require("@shared/data-structures/group.js");
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
  _prepare(  ){ 
    
   },
  _cleanup(  ){ 
    
   },
  prepare(  ){ 
    
      return this._prepare();
    
   },
  cleanup(  ){ 
    
      return this._cleanup();
    
   },
  _updateAll( t = this.t,components = this.components ){ 
    
      this.prepare();
      components.each((($fpipe) => {
      	
        return this._updateComponent($fpipe, t);
      
      }));
      return this.cleanup();
    
   },
  update( t ){ 
    
      return this.thread = this.thread.then(((nil) => {
      	
        return this._updateAll(t);
      
      }));
    
   }
 });
System.build = (function System$build$() {
  /* System.build eval.sibilant:69:0 */

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
System.update = (function System$update$(t) {
  /* System.update eval.sibilant:84:0 */

  return this.thread = this.thread.then(((nil) => {
  	
    return this._updateAll(t);
  
  }));
});
exports.System = System;