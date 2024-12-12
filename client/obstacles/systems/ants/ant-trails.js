var { 
  Component,
  System
 } = require("@shared/ecs.js"),
    { 
  Timer,
  TimeLimit
 } = require("@obstacles/systems/timer.js"),
    config = require("@obstacles/config.js");
var AntTrail = Component.define("AntTrail", { 
  _clear(  ){ 
    
      return this.segments.each(((s) => {
      	
        s.despawn();
        return this.segments.delete(s);
      
      }));
    
   },
  register(  ){ 
    
      return (function() {
        if (!(this.segments)) {
          return this.segments = (new Set());
        }
      }).call(this);
    
   }
 });
exports.AntTrail = AntTrail;
var AntTrails = System.define("AntTrails", { 
  interface:AntTrail,
  get spawnAntTrailSegment(  ){ 
    
      return require("@obstacles/entities/trail-segments.js").spawnAntTrailSegment;
    
   },
  _updateComponent( c ){ 
    
      return (function() {
        if ((c.system.process.ticker.ticks % 10) === 0) {
          return c.segments.add(this.spawnAntTrailSegment(c.entity));
        }
      }).call(this);
    
   }
 });
exports.AntTrails = AntTrails;