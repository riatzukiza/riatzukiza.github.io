require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@shared/systems/physics/forces.js":[function(require,module,exports){
var { 
  Friction
 } = require("@shared/systems/physics/forces/friction.js"),
    { 
  SignalField
 } = require("@shared/systems/physics/forces/signal-field.js");
exports.Friction = Friction;
exports.SignalField = SignalField;
},{"@shared/systems/physics/forces/friction.js":"@shared/systems/physics/forces/friction.js","@shared/systems/physics/forces/signal-field.js":"@shared/systems/physics/forces/signal-field.js"}]},{},[]);