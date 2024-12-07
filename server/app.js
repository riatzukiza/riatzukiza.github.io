var R = require("ramda");
var { 
  create,
  extend,
  mixin,
  conditional,
  cond,
  partiallyApplyAfter
 } = require("@kit-js/core/js/util");
var Http = require("@kit-js/http/index.js");
var { 
  Router
 } = Http;
var handleRouterError = R.curry(((res, e) => {
	
  res.writeHead(500);
  return res.end(e.message);

}));
var { 
  Interface
 } = require("@kit-js/interface");
var { 
  FileSystem
 } = require("kit-file-system"),
    { 
  serveStaticFiles
 } = require("./static-files");
var app = create(Http.MiddleWare)();
const staticFiles=FileSystem.load("./static");
console.log("who????");
app.use(".", serveStaticFiles(staticFiles));
module.exports = app;