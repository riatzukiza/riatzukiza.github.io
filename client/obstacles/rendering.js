var { 
  Rendering
 } = require("@shared/systems/rendering/rendering.js"),
    config = require("@obstacles/config.js");
const rendering=Rendering.load({ 
  dimensions:[ (1 * config.dimensions[0]), (1 * config.dimensions[1]) ],
  blend:true
 });
rendering.backgroundColor = { 
  r:255,
  g:255,
  b:255,
  a:255
 };
exports.rendering = rendering;