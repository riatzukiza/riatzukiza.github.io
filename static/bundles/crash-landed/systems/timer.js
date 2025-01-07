require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@crash-landed/systems/timer.js":[function(require,module,exports){
Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1121 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1183 */

  return Object.keys(this).forEach(((k) => {
  	
    return f(this[k], k);
  
  }));
});
var { 
  Component,
  System
 } = require("@shared/ecs.js"),
    { 
  BinarySearchTree
 } = require("@shared/data-structures/trees/binary-search-tree.js"),
    { 
  RedBlackTree
 } = require("@shared/data-structures/trees/red-black-tree.js"),
    config = require("@crash-landed/config.js");
var TimeLimit = Component.define("TimeLimit", { 
  docString:"Crash-Landed.systems.Time-limit",
  addToTree(  ){ 
    
      return (function() {
        if (this.system.tree) {
          return this.system.tree.set(this.triggerTime, this);
        }
      }).call(this);
    
   },
  removeFromTree(  ){ 
    
      return (function() {
        if (this.system.tree) {
          return this.system.tree.remove(this.triggerTime, this);
        }
      }).call(this);
    
   },
  register(  ){ 
    
      ((this.system.started)++);
      this.createdAt = Date.now();
      this.triggered = false;
      return this.addToTree();
    
   },
  get duration(  ){ 
    
      throw (new Error("no duration was given to time limit component"))
    
   },
  get callback(  ){ 
    
      throw (new Error("No callback was given to time limit component"))
    
   },
  get triggerTime(  ){ 
    
      const r=(this.createdAt + this.duration);
      return (function() {
        if (isNaN(r)) {
          throw (new Error("Non number trigger time"))
        } else {
          return r;
        }
      }).call(this);
    
   },
  get elapsed(  ){ 
    
      return (Date.now() - this.createdAt);
    
   },
  get remainingTime(  ){ 
    
      return (this.duration - this.elapsed);
    
   },
  get expired(  ){ 
    
      return this.elapsed > this.duration;
    
   },
  reset( duration = this.duration ){ 
    
      ((this.system.started)++);
      this.removeFromTree();
      this.createdAt = Date.now();
      this.triggered = false;
      this.duration = duration;
      return this.addToTree();
    
   },
  _clear(  ){ 
    
      this.removeFromTree();
      return this.triggered = true;
    
   }
 });
exports.TimeLimit = TimeLimit;
var Timer = System.define("Timer", { 
  docString:"Crash-Landed.systems.Timer",
  get defaultDuration(  ){ 
    
      return 5000;
    
   },
  register(  ){ 
    
      this.started = 0;
      this.firstTick = this.lastTickAt = Date.now();
      return this.tree = RedBlackTree.spawn();
    
   },
  _updateAll(  ){ 
    
      this.tree = this.tree.root;
      const now=Date.now();
      this.tree.forEachInRange(this.firstTick, now, ((c) => {
      	
        return this._updateComponent(c);
      
      }));
      return this.lastTickAt = now;
    
   },
  _updateComponent( c ){ 
    
      return (function() {
        if ((c.expired && !(c.triggered))) {
          c.triggered = true;
          return c.callback(c.entity, c);
        }
      }).call(this);
    
   }
 });
exports.Timer = Timer;
},{"@crash-landed/config.js":"@crash-landed/config.js","@shared/data-structures/trees/binary-search-tree.js":"@shared/data-structures/trees/binary-search-tree.js","@shared/data-structures/trees/red-black-tree.js":"@shared/data-structures/trees/red-black-tree.js","@shared/ecs.js":"@shared/ecs.js"}]},{},[]);
