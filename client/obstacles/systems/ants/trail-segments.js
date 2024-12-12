var { 
  TimeLimit,
  Timer
 } = require("@obstacles/systems/timer.js"),
    { 
  rgba
 } = require("@obstacles/colors.js"),
    config = require("@obstacles/config.js");
var TrailSegment = TimeLimit.define("TrailSegment", { 
  docString:`
  obstacles/systems/ant-trails/Trail-vector.md

  # obstacles.systems.ant-trails.Trail-vector

  ## arguments

  inherits from shared.ecs.Component

  ## description

  A time limited vector component that modifies the signal field when the ant has either succeeded or failed
  If the time limit expires, it disapears.`

  ,
  duration:config.trailLimit,
  _clear(  ){ 
    
      this.duration = config.trailLimit;
      this.triggered = null;
      this.x = null;
      this.y = null;
      return this.pheremones = null;
    
   },
  get segGroup(  ){ 
    
      return require("@obstacles/entities/trail-segments.js").trailSegments;
    
   },
  callback( entity,c ){ 
    
      entity.ant.antTrail.segments.delete(entity);
      return this.segGroup.despawn(entity);
    
   },
  apply(  ){ 
    
      `
      obstacles/systems/ant-trails/Trail-segment/apply.md

      # obstacles.systems.ant-trails.Trail-segment.apply

      ## arguments

      ## description

      Apply the trail segment forward`

      ;
      this.entity.trailDot.color = rgba(20, 200, 20, 255);
      return (function() {
        if (config.rewardWinners) {
          const weight=(this.entity.ant.antLife.looseCount / (this.entity.ant.antLife.winCount + 1));
          this.pheremones.addTo({ 
            x:(this.x * weight * config.antInfluence),
            y:(this.y * weight * config.antInfluence)
           });
          this.duration = (this.remainingTime + config.trailResultDuration);
          return this.reset();
        }
      }).call(this);
    
   },
  applyInverse(  ){ 
    
      `
      obstacles/systems/ant-trails/Trail-segment/apply.md

      # obstacles.systems.ant-trails.Trail-segment.apply

      ## arguments

      ## description

      Apply the trail segment backward`

      ;
      this.entity.trailDot.color = rgba(255, 20, 20, 255);
      (function() {
        if (config.punishLoosers) {
          const weight=(this.entity.ant.antLife.looseCount / (this.entity.ant.antLife.winCount + 1));
          return this.pheremones.subFrom({ 
            x:(this.x * weight * config.antInfluence),
            y:(this.y * weight * config.antInfluence)
           });
        }
      }).call(this);
      this.duration = (this.remaining + config.trailResultDuration);
      return this.reset();
    
   }
 });
exports.TrailSegment = TrailSegment;
var DecayingTrails = Timer.define("DecayingTrails", { 
  interface:TrailSegment
 });
exports.DecayingTrails = DecayingTrails;