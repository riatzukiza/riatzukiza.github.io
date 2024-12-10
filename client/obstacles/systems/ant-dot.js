var { 
  DotInterface,
  Dot
 } = require("@shared/systems/rendering/dot.js"),
    { 
  rgba
 } = require("@obstacles/colors.js");
const views=(new Map());
var AntDot = DotInterface.define("AntDot", { 
  docString:```
  Obstacles/systems/Ant-dot.md

  # Obstacles.systems.Ant-dot

  ## arguments

  entity system

  ## description

  A component for rendering ants as red dots.
  Inhereits from Dot-interface (@shared/systems/rendering/dot.js)```,
  color:rgba(255, 0, 0, 255)
 });
exports.AntDot = AntDot;
var AntDots = Dot.define("AntDots", { 
  interface:AntDot,
  docString:```
  Obstacles/systems/Ant-dots.md

  # Obstacles.systems.Ant-dots

  ## arguments

  entity system

  ## description

  A component for rendering ants as red dots```
 });
exports.AntDots = AntDots;