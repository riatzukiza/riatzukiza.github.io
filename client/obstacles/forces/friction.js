var { 
  Physics
 } = require("sibilant-game-engine/client/systems/physics"),
    { 
  Collision
 } = require("sibilant-game-engine/client/systems/collision");
var config = require("../config");
var Friction = Physics.Force.define("Friction", { 
  apply( c ){ 
    
      var v = c.velocity;
      var collision = c.system.process.systems.get(Collision, c.entity);
      var physics = c.system.process.systems.get(Physics, c.entity);
      return (function() {
        if (!((v.xd === 0 && v.yd === 0))) {
          v.xd = (v.xd * (1 / (physics.scale * physics.mass * config.friction)));
          v.yd = (v.yd * (1 / (physics.scale * physics.mass * config.friction)));
          return null;
        }
      }).call(this);
    
   }
 });
exports.Friction = Friction;