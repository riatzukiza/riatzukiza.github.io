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
  DotInterface,
  Dot
 } = require("@shared/systems/rendering/dot.js"),
    { 
  rgba
 } = require("@crash-landed/colors.js");
const views=(new Map());
var AntDot = DotInterface.define("AntDot", { 
  docString:`
  Crash-Landed/systems/Ant-dot.md

  # Crash-Landed.systems.Ant-dot

  ## arguments

  entity system

  ## description

  A component for rendering ants as red dots.
  Inhereits from Dot-interface (@shared/systems/rendering/dot.js)`

  ,
  color:rgba(255, 255, 255, 255)
 });
exports.AntDot = AntDot;
var AntDots = Dot.define("AntDots", { 
  interface:AntDot,
  docString:`
  Crash-Landed/systems/Ant-dots.md

  # Crash-Landed.systems.Ant-dots

  ## arguments

  entity system

  ## description

  A component for rendering ants as red dots`

  
 });
exports.AntDots = AntDots;