var { 
  Component,
  System
 } = require("@shared/ecs.js"),
    config = require("@obstacles/config.js");
var TimeLimit = Component.define("TimeLimit", { 
  docString:```
  Obstacles/systems/Time-limit.md

  # Obstacles.systems.Time-limit

  ## arguments

  Inherits shared.ecs.Component arguments

  ## description

  Sets somthing to happen at a given time.
  Requires a 
  \`duration\`
  and
  \`callback\````,
  register(  ){ 
    
      return this.createdAt = Date.now();
    
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
    
      return 0 > this.timeRemaining;
    
   }
 });
var Timer = System.define("Timer", { 
  docString:```
  Obstacles/systems/Timer.md

  # Obstacles.systems.Timer

  ## arguments

  Inherits from shared.ecs.ComponentSystem

  ## description

  Allows timed events to occur for entities with time limit components```,
  _updateComponent( c ){ 
    
      return (function() {
        if (c.expired) {
          c.callback(c.entity);
          return c.despawn();
        }
      }).call(this);
    
   }
 });