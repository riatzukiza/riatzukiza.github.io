var R = require("ramda");
var { 
  create,
  extend,
  mixin,
  conditional,
  cond,
  partiallyApplyAfter
 } = require("@kit-js/core/js/util");
var { 
  renderChildren,
  createDocumentNode,
  DocumentNode,
  DocumentBody,
  DocumentHead,
  DocumentRoot
 } = require("@shared/dom.js");
const rockViews=[];
var { 
  EntityPanel
 } = require("@obstacles/dom/entity-panel.js");
var displayDecimal = (function displayDecimal$(d = this.d, n = 6) {
  /* display-decimal node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  return (Math.round((Math.pow(10, n) * d)) / Math.pow(10, n));
});
var RockPanel = EntityPanel.define("RockPanel", { 
  Dot( dot ){ 
    
      console.log("rendering color");
      const colorString=("rgb(" + dot.color.r + "," + dot.color.g + "," + dot.color.b + ")");
      return createDocumentNode("div", {
        'className': "panel",
        'style': { 
          "background-color":colorString,
          "color":"grey"
         }
      }, [ colorString ]);
    
   },
  Position( pos ){ 
    
   },
  Velocity( vel ){ 
    
   },
  Physics( phys ){ 
    
      return createDocumentNode("div", { 'className': "panel" }, [ createDocumentNode("div", { 'className': "panel" }, [ "scale:", displayDecimal(phys.scale, 2) ]), createDocumentNode("div", { 'className': "panel" }, [ "mass:", displayDecimal(phys.mass, 2) ]), createDocumentNode("div", { 'className': "panel" }, [ "vol:", displayDecimal(phys.volume, 1) ]), createDocumentNode("div", { 'className': "panel" }, [ "density:", displayDecimal(phys.density, 4) ]) ]);
    
   }
 });
exports.RockPanel = RockPanel;