require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@shared/gl.js":[function(require,module,exports){
(function (global){(function (){
var Andy = require("@shared/andy.js"),
    utils = require("@shared/utils.js");
var Gl = {  };
var { 
  Buffer,
  Program,
  Shader,
  Attribute,
  Type,
  Context,
  Uniform
 } = Andy.Gl,
    { 
  BlendMode
 } = Andy.Color;
global.Program = Program;
Gl.shader = (function Gl$shader$(typeName, string, context) {
  /* Gl.shader eval.sibilant:1:308 */

  return (new Andy.Gl.Shader(Andy.Gl.Shader[typeName], string));
});
Gl.buffer = (function Gl$buffer$(_members, context) {
  /* Gl.buffer eval.sibilant:1:418 */

  return (new Andy.Gl.Buffer(context.ARRAY_BUFFER, context.DYNAMIC_DRAW)).bind().data(_members.data).unbind();
});
Gl.context = (function Gl$context$(dimensions, blend) {
  /* Gl.context eval.sibilant:1:598 */

  return (new Andy.Context()).makeCurrent().resize(...dimensions).clearColor(0, 0, 0, 0).blend(blend).clear();
});
Gl.uniform = (function Gl$uniform$(typeName, varName, value) {
  /* Gl.uniform eval.sibilant:1:802 */

  return (new Andy.Gl.Uniform[typeName](varName, value));
});
Gl.program = (function Gl$program$(vert, frag, context) {
  /* Gl.program eval.sibilant:1:1106 */

  return (new Andy.Gl.Program(Gl.shader("vertex", vert, context), Gl.shader("fragment", frag, context)));
});
exports.Gl = Gl;
exports.Andy = Andy;
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"@shared/andy.js":"@shared/andy.js","@shared/utils.js":"@shared/utils.js"}]},{},[]);