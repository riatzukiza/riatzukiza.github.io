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
create(HtmlElement)("html", {  }, [ create(HtmlElement)("head", {  }, [ create(HtmlElement)("style", {  }, [ "\n"+"        .panel {\n"+"            float: left;\n"+"            border-style: solid;\n"+"            border-width: 1px;\n"+"        }\n"+"        .bordered {\n"+"            border-style: solid;\n"+"            border-width: 1px;\n"+"        }\n"+"\n"+"" ]), create(HtmlElement)("script", { 'src': "https://cdn.jsdelivr.net/quicksettings/3.0/quicksettings.min.js" }, []) ]), create(HtmlElement)("script", { 'src': "/socket.io/socket.io.js" }, []), (function() {
  /* eval.sibilant:12:153 */

  var { 
    FileSystem
   } = require("kit-file-system"),
      Path = require("path");
  return FileSystem.load("./shared").each(((file) => {
  	
    return create(HtmlElement)("script", { 'src': Path.join("/bundles/shared", file.rel) }, []);
  
  }));
}).call(this), (function() {
  /* eval.sibilant:12:396 */

  var { 
    FileSystem
   } = require("kit-file-system"),
      Path = require("path");
  return FileSystem.load("./client/obstacles").each(((file) => {
  	
    return (function() {
      if (!(Path.basename(file.path) === "main.js")) {
        return create(HtmlElement)("script", { 'src': Path.join("/bundles/obstacles", file.rel) }, []);
      }
    }).call(this);
  
  }));
}).call(this), create(HtmlElement)("script", { 'src': "/bundles/obstacles/main.js" }, []), create(HtmlElement)("img", {
  'id': "sprite-texture",
  'src': "/ant.png",
  'hidden': "true"
}, []) ]);