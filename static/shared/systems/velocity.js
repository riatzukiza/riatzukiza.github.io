var { 
  Interface
 } = require("@kit-js/interface");
var { 
  Component,
  System
 } = require("@shared/ecs.js"),
    { 
  Position
 } = require("@shared/systems/position.js");
var VelocityInterface = Component.define("VelocityInterface", { 
  xd:0,
  yd:0,
  get pos(  ){ 
    
      return this.system.process.systems.get(Position, this.entity);
    
   },
  accelerate( [ v1, v2 ] ){ 
    
      this.xd += v1;
      this.yd += v2;
      return this;
    
   }
 });
exports.VelocityInterface = VelocityInterface;
var Velocity = System.define("Velocity", { 
  interface:VelocityInterface,
  _updateComponent( m ){ 
    
      var p = m.pos,
          { 
        xd,
        yd
       } = m;
      m.moved = false;
      return (function() {
        if (!((xd === 0 && yd === 0))) {
          m.priorX = p.x;
          m.priorY = p.y;
          m.moved = true;
          this.game.events.emit("move", m);
          p.x = (p.x + (xd * (this.game.ticker.elapsed / 1000)));
          return p.y = (p.y + (yd * (this.game.ticker.elapsed / 1000)));
        }
      }).call(this);
    
   }
 });
exports.Velocity = Velocity;