require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@crash-landed/systems/signal.js":[function(require,module,exports){
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
 } = require("@shared/ecs.js");
var Influence = Component.define("Influence", { 
  get minX(  ){ 
    
      return Math.floor(this.entity.collisionBounds.minX);
    
   },
  get minY(  ){ 
    
      return Math.floor(this.entity.collisionBounds.minY);
    
   },
  get maxX(  ){ 
    
      return Math.ceil(this.entity.collisionBounds.maxX);
    
   },
  get maxY(  ){ 
    
      return Math.ceil(this.entity.collisionBounds.maxY);
    
   },
  get velocity(  ){ 
    
      return this.entity.velocityInterface;
    
   },
  get pos(  ){ 
    
      return this.entity.positionInterface;
    
   },
  get quadTree(  ){ 
    
      return this.entity.collisionBounds.system.quads;
    
   }
 });
exports.Influence = Influence;
var Signal = System.define("Signal", { 
  get field(  ){ 
    
      throw (new Error("No signal matrix defined for signal system"))
    
   },
  evolve( cell ){ 
    
   },
  _updateComponent( c ){ 
    
      const signalCell=this.field.get(Math.round(c.pos.x), Math.round(c.pos.y), this.game.ticker.ticks);
      console.log({ 
        signalCell,
        c
       });
      (function() {
        if (c.velocity) {
          return c.velocity.accelerate([ signalCell.x, signalCell.y ]);
        }
      }).call(this);
      this.evolve(signalCell, c);
      return null;
    
   }
 });
exports.Signal = Signal;
},{"@shared/ecs.js":"@shared/ecs.js"}]},{},[]);
