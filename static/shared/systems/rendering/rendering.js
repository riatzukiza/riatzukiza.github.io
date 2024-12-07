var { 
  Interface
 } = require("@kit-js/interface");
var { 
  Layer
 } = require("@shared/systems/rendering/layer.js"),
    { 
  PooledSystem
 } = require("@shared/pooling/pooled-system.js"),
    { 
  System
 } = require("@shared/ecs.js"),
    { 
  Gl
 } = require("@shared/gl.js"),
    { 
  Scalar
 } = require("@shared/math/scalar.js");
var bound = (function() {
  /* eval.sibilant:1:431 */

  return arguments[0].bind();
}),
    clear = (function() {
  /* eval.sibilant:1:456 */

  return arguments[0].clear();
}),
    rendered = (function() {
  /* eval.sibilant:1:485 */

  return arguments[0].render();
}),
    unbound = (function() {
  /* eval.sibilant:1:515 */

  return arguments[0].unbind();
}),
    disabled = (function() {
  /* eval.sibilant:1:544 */

  return arguments[0].disable();
}),
    enabled = (function() {
  /* eval.sibilant:1:575 */

  return arguments[0].enable();
});
var allowAlphaBlending = (function allowAlphaBlending$(context) {
  /* allow-alpha-blending eval.sibilant:1:593 */

  context.gl.enable(context.gl.BLEND);
  context.gl.blendEquation(context.gl.FUNC_ADD);
  return context.gl.blendFuncSeparate(context.gl.SRC_ALPHA, context.gl.ONE_MINUS_SRC_ALPHA, context.gl.ONE, context.gl.ONE_MINUS_SRC_ALPHA);
});
var Rendering = PooledSystem.define("Rendering", { 
  init( dimensions = window.size(),blend = true,context = Gl.context(dimensions, blend),layers = [] ){ 
    
      this.dimensions = dimensions;this.blend = blend;this.context = context;this.layers = layers;
      this.interface.context = context;
      this.interface.rendering = this;
      if( blend ){ 
        allowAlphaBlending(context)
       };
      PooledSystem.init.call(this);
      return this;
    
   },
  interface:Layer,
  set backgroundColor( { 
    r,
    g,
    b,
    a
   } ){ 
    
      return this.context.makeCurrent().clearColor(...Scalar.div([ r, g, b, a ], 255));
    
   },
  resize( [ width, height ] = [ this.width, this.height ],context = this.context ){ 
    
      return context.resize(width, height);
    
   },
  load( { 
    dimensions,
    blend
   } ){ 
    
      return create(Rendering)(dimensions, blend);
    
   },
  update( layers = this.layers,context = this.context ){ 
    
      "render each visible dot to the screen";
      return layers.each(rendered);
    
   }
 });
exports.Rendering = Rendering;