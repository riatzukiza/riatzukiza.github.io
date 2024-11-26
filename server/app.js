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
var staticDir = FileSystem.load("./");
var app = create(Http.MiddleWare)();
console.log("yo man");
var js = Interface.define("js", { 
  client:FileSystem.load("./client"),
  bundles:FileSystem.load("./bundles")
 });
var html = Interface.define("html", { 
  files:FileSystem.load("./html")
 });
app.use("/html", serveStaticFiles(html.files));
app.use("/js", serveStaticFiles(js.client));
app.use("/bundles", serveStaticFiles(js.bundles));
module.exports = app;
console.log("who????");