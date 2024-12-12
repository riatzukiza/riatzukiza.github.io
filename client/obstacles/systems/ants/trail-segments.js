var { 
  TimeLimit,
  Timer
 } = require("@obstacles/systems/timer.js"),
    { 
  rgba
 } = require("@obstacles/colors.js"),
    config = require("@obstacles/config.js");
var { 
  renderChildren,
  createDocumentNode,
  DocumentNode,
  DocumentBody,
  DocumentHead,
  DocumentRoot
 } = require("@shared/dom.js");
var displayDecimal = (function displayDecimal$(d = this.d, n = 6) {
  /* display-decimal node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  return (Math.round((Math.pow(10, n) * d)) / Math.pow(10, n));
});
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
      return this.startedAt = 0;
    
   },
  updateView__QUERY:true,
  views:(new Map()),
  get parentView(  ){ 

      return this.entity.propertyView.view;

   },
  get view(  ){ 
  
    return (function() {
      if (this.views.has(this.entity)) {
        return this.views.get(this.entity);
      } else {
        var r = (function() {
          /* eval.sibilant:11:23 */
        
          return createDocumentNode("div", { 'className': "panel" }, [ "trail segment", createDocumentNode("div", {  }, [ "pos:", (() => {
          	
            return displayDecimal(this.x, 2);
          
          }), ",", (() => {
          	
            return displayDecimal(this.y, 2);
          
          }) ]), createDocumentNode("div", {  }, [ "remaining", (() => {
          	
            return this.remainingTime;
          
          }) ]), createDocumentNode("div", {  }, [ "duration", (() => {
          	
            return ("" + this.duration);
          
          }) ]), createDocumentNode("div", {  }, [ "triggered?", (() => {
          	
            return ("" + this.triggered);
          
          }) ]), createDocumentNode("div", {  }, [ "started at", (() => {
          	
            return this.createdAt;
          
          }) ]) ]).render(this.parentView);
        }).call(this);
        this.views.set(this.entity, r);
        return r;
      }
    }).call(this);
  
 },
  get segGroup(  ){ 
    
      return require("@obstacles/entities/trail-segments.js").trailSegments;
    
   },
  callback( entity,c ){ 
    
      entity.ant.antTrail.segments.delete(entity);
      return entity.group.despawn(entity);
    
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
      console.log("reward the strong");
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
      console.log("punish the weak", this);
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
      this.duration = (this.remainingTime + config.trailResultDuration);
      return this.reset();
    
   }
 });
exports.TrailSegment = TrailSegment;
var DecayingTrails = Timer.define("DecayingTrails", { 
  interface:TrailSegment
 });
exports.DecayingTrails = DecayingTrails;