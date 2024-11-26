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
var app = require("./app");
var PORT = (process.env.PORT || 8000);
var server = create(Http.Server)(PORT);
server.use(app);
exports.server = server;
exports.app = app;
exports.PORT = PORT;