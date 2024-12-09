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
  register(  ){ 
    
      return this.config = config;
    
   }
 });
var SignalField = SignalField.define("SignalField", { 
  register(  ){ 
    
      this.config = config;
      this.field = createVectorField(config.columns, config.rows);
      return this.layer = createVectorField(config.columns, config.rows);
    
   },
  config:config,
  game:game,
  get entities(  ){ 
    
      return require("@obstacles/entities.js");
    
   },
  updateParticle:createParticleUpdater(config, game)
 });
exports.Friction = Friction;
exports.SignalField = SignalField;