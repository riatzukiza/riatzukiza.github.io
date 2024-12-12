var { 
  Component,
  System
 } = require("@shared/ecs.js"),
    config = require("@obstacles/config.js");
var TimeLimit = Component.define("TimeLimit", { 
  docString:`
  Obstacles/systems/Time-limit.md

  # Obstacles.systems.Time-limit

  ## arguments

  Inherits shared.ecs.Component arguments

  ## description

  Sets somthing to happen at a given time.
  Requires a 
  \`duration\`
  and
  \`callback\``

  ,
  register(  ){ 
    
      this.createdAt = Date.now();
      return this.triggered = false;
    
   },
  get duration(  ){ 
    
      throw (new Error("no duration was given to time limit component"))
    
   },
  get callback(  ){ 
    
      throw (new Error("No callback was given to time limit component"))
    
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
  reset(  ){ 
    
      this.createdAt = Date.now();
      return this.triggered = false;
    
   },
  _clear(  ){ 
    
      this.createdAt = null;
      return this.triggered = null;
    
   }
 });
exports.TimeLimit = TimeLimit;
var Timer = System.define("Timer", { 
  docString:`
  Obstacles/systems/Timer.md

  # Obstacles.systems.Timer

  ## arguments

  Inherits from shared.ecs.ComponentSystem

  ## description

  Allows timed events to occur for entities with time limit components`

  ,
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