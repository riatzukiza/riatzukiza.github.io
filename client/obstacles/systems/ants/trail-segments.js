var { 
  TimeLimit,
  Timer
 } = require("@obstacles/systems/timer.js"),
    { 
  TrailVector
 } = require("@shared/vectors.js"),
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
      return this.vector.despawn();
    
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
      this.entity.trailDot.color = rgba(0, 255, 0, 255);
      return (function() {
        if (config.rewardWinners) {
          const weight=(this.entity.ant.antLife.looseCount / (this.entity.ant.antLife.winCount + 1));
          this.vector.pheremones.addTo({ 
            x:(this.vector.x * weight * config.antInfluence),
            y:(this.vector.y * weight * config.antInfluence)
           });
          this.duration = config.trailResultDuration;
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
      this.entity.trailDot.color = rgba(255, 0, 0, 255);
      (function() {
        if (config.punishLoosers) {
          const weight=(this.entity.ant.antLife.looseCount / (this.entity.ant.antLife.winCount + 1));
          return this.vector.pheremones.subFrom({ 
            x:(this.vector.x * weight * config.antInfluence),
            y:(this.vector.y * weight * config.antInfluence)
           });
        }
      }).call(this);
      this.duration = config.trailResultDuration;
      return this.reset();
    
   },
  register(  ){ 
    
      TimeLimit.register.call(this);
      return this.vector = TrailVector.spawn();
    
   }
 });
exports.TrailSegment = TrailSegment;
var DecayingTrails = Timer.define("DecayingTrails", { 
  interface:TrailSegment
 });
exports.DecayingTrails = DecayingTrails;