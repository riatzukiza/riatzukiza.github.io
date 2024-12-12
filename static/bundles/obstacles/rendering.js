require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@obstacles/rendering.js":[function(require,module,exports){
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
},{"@obstacles/config.js":"@obstacles/config.js","@shared/systems/rendering/rendering.js":"@shared/systems/rendering/rendering.js"}]},{},[]);
