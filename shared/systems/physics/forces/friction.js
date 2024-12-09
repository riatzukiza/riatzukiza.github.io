var { 
  Physics
 } = require("@shared/systems/physics/system.js"),
    { 
  Collision
 } = require("@shared/systems/collision.js");
var Friction = Physics.Force.define("Friction", { 
  template:true,
  get config(  ){ 
    
      throw (new Error("No config provided to friction force sub system."))
    
   },
  apply( c = this.c,config = this.config ){ 
    
      var v = c.velocity;
      var collision = c.system.process.systems.get(Collision, c.entity);
      var physics = c.system.process.systems.get(Physics, c.entity);
      return (function() {
        if (!((v.xd === 0 && v.yd === 0))) {
          v.xd = (v.xd * (1 / (config.stationaryResistanceCoefficiant + (physics.mass * config.friction))));
          v.yd = (v.yd * (1 / (config.stationaryResistanceCoefficiant + (physics.mass * config.friction))));
          return null;
        }
      }).call(this);
    
   }
 });
exports.Friction = Friction;