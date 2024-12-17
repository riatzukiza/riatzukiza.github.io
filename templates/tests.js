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
  /* eval.sibilant:20:7 */

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
}).call(this) ]), create(HtmlElement)("script", { 'src': "/bundles/tests/main.js" }, []) ]);