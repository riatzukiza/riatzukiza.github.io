var R = require("ramda");
var { 
  create,
  extend,
  mixin,
  conditional,
  cond,
  partiallyApplyAfter
 } = require("@kit-js/core/js/util");
var mimeTypes = require("mime-types"),
    Path = require("path");
var serveStaticFiles = (function serveStaticFiles$(sys) {
  /* serve-static-files eval.sibilant:1:233 */

  return async function serve({ 
    request,
    response,
    route,
    key
   }){
  
    var path = key.filter(((k) => {
    	
      return !((k === "." || k === ".."));
    
    })).join("/");
    return sys.find(path).then(((file) => {
    	
      return (function() {
        if (file.isDir__QUERY()) {
          return response.end("directory");
        } else {
          var ext = Path.extname(file.path),
              mime = mimeTypes.lookup(ext);
          response.setHeader("Content-Type", mime);
          return file.readStream.pipe(response);
        }
      }).call(this);
    
    })).catch(((err) => {
    	
      response.statusCode = 404;
      return response.end();
    
    }));
  
  };
});
exports.serveStaticFiles = serveStaticFiles;