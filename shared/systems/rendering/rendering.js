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
  /* eval.sibilant:1:539 */

  return arguments[0].bind();
}),
    clear = (function() {
  /* eval.sibilant:1:564 */

  return arguments[0].clear();
}),
    rendered = (function() {
  /* eval.sibilant:1:593 */

  return arguments[0].render();
}),
    unbound = (function() {
  /* eval.sibilant:1:623 */

  return arguments[0].unbind();
}),
    disabled = (function() {
  /* eval.sibilant:1:652 */

  return arguments[0].disable();
}),
    enabled = (function() {
  /* eval.sibilant:1:683 */

  return arguments[0].enable();
});
var allowAlphaBlending = (function allowAlphaBlending$(context) {
  /* allow-alpha-blending eval.sibilant:1:701 */

  context.gl = context.canvas.getContext("webgl2", { 
    premultipliedAlpha:false
   });
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  return context.gl.blendFuncSeparate(context.gl.SRC_ALPHA, context.gl.ONE_MINUS_SRC_ALPHA, context.gl.ONE, context.gl.ONE_MINUS_SRC_ALPHA);
});
var Rendering = PooledSystem.define("Rendering", { 
  init( dimensions = window.size(),blend = true,context = Gl.context(dimensions, blend),layers = [] ){ 
    
      this.dimensions = dimensions;this.blend = blend;this.context = context;this.layers = layers;
      if( blend ){ 
        allowAlphaBlending(context)
       };
      this.interface.context = context;
      this.interface.rendering = this;
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
    
      return this.context.makeCurrent().clearColor(0, 0, 0, 0);
    
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
  update( layers = this.layers,context = this.context,blend = this.blend ){ 
    
      "render each visible dot to the screen";
      return layers.each(rendered);
    
   }
 });
exports.Rendering = Rendering;