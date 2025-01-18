var R = require("ramda");
var { 
  create,
  extend,
  mixin,
  conditional,
  cond,
  partiallyApplyAfter
 } = require("@kit-js/core/js/util");
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
html("\n"+"        .panel {\n"+"            float: left;\n"+"            border-style: solid;\n"+"            border-width: 1px;\n"+"        }\n"+"        .bordered {\n"+"            border-style: solid;\n"+"            border-width: 1px;\n"+"        }\n"+"img {\n"+"position:absolute;\n"+"}\n"+"\n"+"".style().head(), "window._workerScripts = [];".script(), (function() {
  /* eval.sibilant:23:6 */

  var { 
    FileSystem
   } = require("kit-file-system"),
      Path = require("path");
  return FileSystem.load("./shared").each(((file) => {
  	
    return markup(src.script(Path.join("/bundles/shared", file.rel)).div(("window._workerScripts" + ".push(" + "location.origin" + "+" + "'" + Path.join("/bundles/shared", file.rel) + "'" + ")").script()));
  
  }));
}).call(this), (function() {
  /* eval.sibilant:33:6 */

  var { 
    FileSystem
   } = require("kit-file-system"),
      Path = require("path");
  return FileSystem.load("./client/crash-landed").each(((file) => {
  	
    return (function() {
      if (!(Path.basename(file.path) === "main.js")) {
        return markup(src.script(Path.join("/bundles/crash-landed", file.rel)).div(("window._workerScripts" + ".push(" + "location.origin" + "+" + "'" + Path.join("/bundles/crash-landed", file.rel) + "'" + ")").script()));
      }
    }).call(this);
  
  }));
}).call(this), id.img("player-sprite", src, "/sprites/Small-8-Direction-Characters_by_AxulArt/8-way-128-72.png", hidden, "true").body(id.img("grass-sprite", src, "/sprites/Pixel_art_top_down_basic_v1.1.2/TX_Tileset_Grass.png", hidden, "true"), id.img("cliff-sprite", src, "/sprites/Pixel_art_top_down_basic_v1.1.2/TX_Tileset_Wall.png", hidden, "true"), id.img("props-sprite", src, "/sprites/Cute_Fantasy_Free/Outdoor_decoration/Outdoor_Decor_Free.png", hidden, "true")), src.script("/bundles/crash-landed/main.js"));