var { 
  Interface
 } = require("@kit-js/interface");
var Renderable = Interface.define("Renderable", { 
  init( layer = this.layer,structure = this.structure ){ 
    
      this.layer = layer;this.structure = structure;
      return this;
    
   }
 });
exports.Renderable = Renderable;