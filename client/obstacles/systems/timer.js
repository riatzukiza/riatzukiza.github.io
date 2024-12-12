var { 
  Component,
  System
 } = require("@shared/ecs.js"),
    config = require("@obstacles/config.js");
var TimeLimit = Component.define("TimeLimit", { 
  docString:"Obstacles.systems.Time-limit",
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
    
      this.createdAt = 0;
      return this.triggered = false;
    
   }
 });
exports.TimeLimit = TimeLimit;
var Timer = System.define("Timer", { 
  docString:"Obstacles.systems.Timer",
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