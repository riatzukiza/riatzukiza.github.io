Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1692 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1754 */

  return Object.keys(this).forEach(((k) => {
  	return f(this[k], k);
  }));
});
import { 
  mixin,
  create,
  extend
 } from "/shared/kit/core/util.js";
var { 
  TimeLimit,
  Timer
 } = require("@obstacles/systems/timer.js"),
    { 
  RedBlackTree
 } = require("@shared/data-structures/trees/red-black-tree.js"),
    { 
  rgba
 } = require("@obstacles/colors.js"),
    config = require("@obstacles/config.js");
import { 
  renderChildren,
  createDocumentNode,
  DocumentNode,
  DocumentBody,
  DocumentHead,
  DocumentRoot
 } from "/shared/dom.js";
var displayDecimal = (function displayDecimal$(d = this.d, n = 6) {
  /* display-decimal inc/core/function-expressions.sibilant:28:8 */

  return (Math.round((Math.pow(10, n) * d)) / Math.pow(10, n));
});
var TrailSegment = TimeLimit.define("TrailSegment", { 
  docString:"obstacles.systems.ant-trails.Trail-vector",
  duration:config.trailLimit,
  updateView__QUERY:true,
  get views(  ){ 

      return (function() {
        if (this._views) {
          return this._views;
        } else {
          return this._views = (new Map());
        }
      }).call(this);

   },
  get view(  ){ 
  
    return (() => {
    	return (function() {
      if (this.views.has("view")) {
        return this.views.get("view");
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
          }) ]) ]);
        }).call(this);
        this.views.set("view", r);
        return r;
      }
    }).call(this);
    });
  
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
      return (function() {
        if (config.rewardWinners) {
          const weight=(this.entity.ant.antLife.looseCount / (this.entity.ant.antLife.winCount + 1));
          this.pheremones.addTo({ 
            x:(this.x * weight * config.antInfluence),
            y:(this.y * weight * config.antInfluence)
           });
          return this.reset((this.remainingTime + config.trailResultDuration));
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
      return (function() {
        if (config.punishLoosers) {
          const weight=(this.entity.ant.antLife.looseCount / (this.entity.ant.antLife.winCount + 1));
          this.pheremones.subFrom({ 
            x:(this.x * weight * config.antInfluence),
            y:(this.y * weight * config.antInfluence)
           });
          return this.reset((this.remainingTime + config.trailResultDuration));
        }
      }).call(this);
    
   }
 });
export { 
  TrailSegment
 };
var DecayingTrails = Timer.define("DecayingTrails", { 
  get defaultDuration(  ){ 
    
      return config.trailLimit;
    
   },
  interface:TrailSegment
 });
export { 
  DecayingTrails
 };