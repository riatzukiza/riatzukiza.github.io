Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1123 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1185 */

  return Object.keys(this).forEach(((k) => {
  	
    return f(this[k], k);
  
  }));
});
create(HtmlElement)("html", {  }, [ create(HtmlElement)("head", {  }, [ create(HtmlElement)("style", {  }, [ "\n"+"        .panel {\n"+"            float: left;\n"+"            border-style: solid;\n"+"            border-width: 1px;\n"+"        }\n"+"        .bordered {\n"+"            border-style: solid;\n"+"            border-width: 1px;\n"+"        }\n"+"\n"+"" ]), (function() {
  /* eval.sibilant:16:7 */

  var { 
    FileSystem
   } = require("kit-file-system"),
      Path = require("path");
  return FileSystem.load("./shared").each(((file) => {
  	
    return create(HtmlElement)("script", { 'src': Path.join("/bundles/shared", file.rel) }, []);
  
  }));
}).call(this), (function() {
  /* eval.sibilant:20:15 */

  var { 
    FileSystem
   } = require("kit-file-system"),
      Path = require("path");
  return FileSystem.load("./client/tests").each(((file) => {
  	
    return (function() {
      if (!(Path.basename(file.path) === "main.js")) {
        return create(HtmlElement)("script", { 'src': Path.join("/bundles/tests", file.rel) }, []);
      }
    }).call(this);
  
  }));
}).call(this) ]), create(HtmlElement)("body", {  }, [ "" ]), create(HtmlElement)("script", { 'src': "/bundles/tests/main.js" }, []) ]);