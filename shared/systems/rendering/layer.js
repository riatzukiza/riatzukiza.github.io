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
var { 
  ObjectPool
 } = require("@shared/pooling/object-pool.js"),
    { 
  PooledSystem
 } = require("@shared/pooling/pooled-system.js"),
    { 
  Renderable
 } = require("@shared/systems/rendering/renderable.js"),
    { 
  Gl
 } = require("@shared/gl.js");
var bound = (function() {
  /* eval.sibilant:1:515 */

  return arguments[0].bind();
}),
    clear = (function() {
  /* eval.sibilant:1:540 */

  return arguments[0].clear();
}),
    rendered = (function() {
  /* eval.sibilant:1:569 */

  return arguments[0].render();
}),
    unbound = (function() {
  /* eval.sibilant:1:599 */

  return arguments[0].unbind();
}),
    disabled = (function() {
  /* eval.sibilant:1:628 */

  return arguments[0].disable();
}),
    enabled = (function() {
  /* eval.sibilant:1:659 */

  return arguments[0].enable();
});
var Layer = PooledSystem.define("Layer", { 
  render__QUERY:true,
  init( limit = this.limit,interface = Renderable,uniform = [],shaders = [],context = this.context,program = Gl.program(shaders[0], shaders[1], context),_members = interface.structure.Array(limit),buffer = Gl.buffer(_members, context) ){ 
    
      this.limit = limit;this.interface = interface;this.uniform = uniform;this.shaders = shaders;this.context = context;this.program = program;this._members = _members;this.buffer = buffer;
      PooledSystem.init.call(this, interface, create(ObjectPool)(limit, interface, _members));
      this.rendering.layers.push(this);
      return this;
    
   },
  spawn(  ){ 
    
      return this._pool.aquire();
    
   },
  despawn( o ){ 
    
      return this._pool.release(o);
    
   },
  clear( buffer = this.buffer,_members = this._members,context = this.context ){ 
    
      return buffer.bind().data(_members.data).unbind();
    
   },
  enable( buffer = this.buffer,uniform = this.uniform,program = this.program,context = this.context ){ 
    
      buffer.bind();
      program.enable();
      uniform.each(((uniform) => {
      	
        return (function() {
          if (typeof uniform === "function") {
            return uniform(context).enable();
          } else {
            return uniform.enable();
          }
        }).call(this);
      
      }));
      return this.interface.structure.enableGlAttributes();
    
   },
  disable( buffer = this.buffer,uniform = this.uniform,program = this.program ){ 
    
      program.disable();
      return buffer.unbind();
    
   },
  draw( context = this.context ){ 
    
      return (function() {
        if (!(this._pool.used === 0)) {
          return context.draw(context.POINTS, (this._pool.size - this._pool.used), this._pool.used);
        }
      }).call(this);
    
   },
  render(  ){ 
    
      return (function() {
        if (this.render__QUERY) {
          this.clear();
          this.enable();
          this.draw();
          return this.disable();
        }
      }).call(this);
    
   }
 });
exports.Layer = Layer;