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
html("\n"+"        .panel {\n"+"            float: left;\n"+"            border-style: solid;\n"+"            border-width: 1px;\n"+"        }\n"+"        .bordered {\n"+"            border-style: solid;\n"+"            border-width: 1px;\n"+"        }\n"+"img {\n"+"position:absolute;\n"+"}\n"+"\n"+"".style().head(src.script("https://cdn.jsdelivr.net/quicksettings/3.0/quicksettings.min.js")), src.script("/socket.io/socket.io.js"), (function() {
  /* eval.sibilant:15:153 */

  var { 
    FileSystem
   } = require("kit-file-system"),
      Path = require("path");
  return FileSystem.load("./shared").each(((file) => {
  	
    return markup(src.script(Path.join("/bundles/shared", file.rel)));
  
  }));
}).call(this), (function() {
  /* eval.sibilant:15:396 */

  var { 
    FileSystem
   } = require("kit-file-system"),
      Path = require("path");
  return FileSystem.load("./client/obstacles").each(((file) => {
  	
    return (function() {
      if (!(Path.basename(file.path) === "main.js")) {
        return markup(src.script(Path.join("/bundles/obstacles", file.rel)));
      }
    }).call(this);
  
  }));
}).call(this), id.img("ant-texture", src, "/ant.png", hidden, "true").body(id.img("rock-texture", src, "/rock.png", hidden, "true")), src.script("/bundles/obstacles/main.js"));