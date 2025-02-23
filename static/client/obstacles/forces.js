Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1692 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1754 */

  return Object.keys(this).forEach(((k) => {
  	return f(this[k], k);
  }));
});
import { 
  mixin,
  create,
  extend
 } from "/shared/kit/core/util.js";
var { 
  SignalField
 } = require("@shared/systems/physics/forces/signal-field.js"),
    { 
  Friction
 } = require("@shared/systems/physics/forces/friction.js"),
    { 
  game
 } = require("@obstacles/game.js"),
    { 
  createParticleUpdater,
  createVectorField
 } = require("@shared/field.js"),
    config = require("@obstacles/config.js");
console.log("initializing forces", { 
  Friction,
  SignalField
 });
var Friction = Friction.define("Friction", { 
  config:config,
  template:false,
  register(  ){ 
    
      return this.config = config;
    
   },
  reset(  ){ 
    
   }
 });
var SignalField = SignalField.define("SignalField", { 
  template:false,
  field:createVectorField(config.columns, config.rows),
  layer:createVectorField(config.columns, config.rows),
  register(  ){ 
    
      this.config = config;
      this.field = createVectorField(config.columns, config.rows);
      this.layer = createVectorField(config.columns, config.rows);
      return console.log("registering", this);
    
   },
  reset(  ){ 
    
      this.clear();
      return this.init();
    
   },
  clear(  ){ 
    
      this.field.each(((column) => {
      	return column.each(((cell) => {
      	return cell.release();
      }));
      }));
      this.layer.each(((column) => {
      	return column.each(((cell) => {
      	return cell.release();
      }));
      }));
      this.field = null;
      return this.layer = null;
    
   },
  config:config,
  game:game,
  get entities(  ){ 
    
      return require("@obstacles/entities.js");
    
   },
  updateParticle:createParticleUpdater(config, game)
 });
export { 
  Friction
 };
export { 
  SignalField
 };