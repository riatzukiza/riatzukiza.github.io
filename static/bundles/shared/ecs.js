require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@shared/ecs.js":[function(require,module,exports){
var { 
  System
 } = require("@shared/ecs/component-system.js"),
    { 
  Component
 } = require("@shared/ecs/component.js"),
    { 
  Entity
 } = require("@shared/ecs/entity.js"),
    { 
  EntityGroup
 } = require("@shared/ecs/entity-group.js"),
    { 
  EntitySystem
 } = require("@shared/ecs/entity-system.js");
exports.System = System;
exports.Component = Component;
exports.Entity = Entity;
exports.EntityGroup = EntityGroup;
exports.EntitySystem = EntitySystem;
},{"@shared/ecs/component-system.js":"@shared/ecs/component-system.js","@shared/ecs/component.js":"@shared/ecs/component.js","@shared/ecs/entity-group.js":"@shared/ecs/entity-group.js","@shared/ecs/entity-system.js":"@shared/ecs/entity-system.js","@shared/ecs/entity.js":"@shared/ecs/entity.js"}]},{},[]);
