Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1692 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1754 */

  return Object.keys(this).forEach(((k) => {
  	return f(this[k], k);
  }));
});
import { 
  mixin,
  create,
  extend
 } from "/shared/kit/core/util.js";
var R = require("ramda");
var { 
  create,
  extend,
  mixin,
  conditional,
  cond,
  partiallyApplyAfter
 } = require("@kit-js/core/js/util");
const { 
  
 }=require(createDocumentNode);
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