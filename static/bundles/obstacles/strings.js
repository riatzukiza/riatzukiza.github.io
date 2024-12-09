require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@obstacles/strings.js":[function(require,module,exports){
var displayDecimal = (function displayDecimal$(d = this.d, n = 6) {
  /* display-decimal node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  return (Math.round((Math.pow(10, n) * d)) / Math.pow(10, n));
});
exports.displayDecimal = displayDecimal;
},{}]},{},[]);
