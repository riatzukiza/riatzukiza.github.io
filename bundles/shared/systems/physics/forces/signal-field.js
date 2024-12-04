require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@shared/systems/physics/forces/signal-field.js":[function(require,module,exports){
var { 
  Position
 } = require("@shared/systems/position.js"),
    { 
  Physics
 } = require("@shared/systems/physics/system.js"),
    { 
  createVectorField,
  createParticleUpdater
 } = require("@shared/field.js"),
    { 
  Collision
 } = require("@shared/systems/collision.js");
var SignalField = Physics.Force.define("SignalField", { 
  get config(  ){ 
    
      throw Error("No config provided for signal-field force sub system")
    
   },
  get game(  ){ 
    
      throw Error("No game object provided for signal-field force sub system")
    
   },
  get entities(  ){ 
    
      throw Error("No entities object provided for signal-field force sub system")
    
   },
  get updateParticle(  ){ 
    
      throw Error("No update particle function provided for signal-field force sub system")
    
   },
  get field(  ){ 
    
      throw Error("No noise field layer (this.field)  provided for signal-field force sub system")
    
   },
  get layer(  ){ 
    
      throw Error("No signal field layer (this.layer)   provided for signal-field force sub system")
    
   },
  apply( c = this.c,field = this.field,layer = this.layer,config = this.config,game = this.game,entities = this.entities,updateParticle = this.updateParticle ){ 
    
      var v = c.velocity;
      var collision = c.system.process.systems.get(Collision, c.entity);
      updateParticle(v, v.pos, field, layer, game.ticker.ticks, false, false, entities.homePos);
      var winRate = (v.winCount / ((1 + v.looseCount) || 1));
      c.scale = (1 * (function() {
        if (winRate > 1) {
          return winRate;
        } else {
          return 1;
        }
      }).call(this));
      return c.mass = (1 * (function() {
        if (winRate > 1) {
          return winRate;
        } else {
          return 1;
        }
      }).call(this));
    
   }
 });
exports.SignalField = SignalField;
},{"@shared/field.js":"@shared/field.js","@shared/systems/collision.js":"@shared/systems/collision.js","@shared/systems/physics/system.js":"@shared/systems/physics/system.js","@shared/systems/position.js":"@shared/systems/position.js"}]},{},[]);
