var { 
  DotInterface,
  Dot
 } = require("@shared/systems/rendering/dot.js"),
    { 
  rgba
 } = require("@obstacles/colors.js");
var TrailDot = DotInterface.define("TrailDot", { 
  color:rgba(0, 0, 255, 255)
 });
exports.TrailDot = TrailDot;
var TrailDots = Dot.define("TrailDots", { 
  interface:TrailDot
 });
exports.TrailDots = TrailDots;