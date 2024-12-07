var { 
  Interface
 } = require("@kit-js/interface");
var { 
  Renderable
 } = require("@shared/systems/rendering/renderable.js"),
    { 
  Andy
 } = require("@shared/gl.js");
var ScalingVertex = Renderable.define("ScalingVertex", { 
  init( layer = this.layer ){ 
    
      this.layer = layer;
      return this;
    
   },
  clear(  ){ 
    
   },
  structure:(new Andy.Gl.Type.Composite({ 
    point:Andy.Type.Vector3,
    color:Andy.Color.RGBA,
    size:Andy.Type.float
   }))
 });