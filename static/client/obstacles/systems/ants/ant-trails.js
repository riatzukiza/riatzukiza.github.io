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
  Component,
  System
 } = require("@shared/ecs.js"),
    { 
  Timer,
  TimeLimit
 } = require("@obstacles/systems/timer.js"),
    config = require("@obstacles/config.js");
import { 
  renderChildren,
  createDocumentNode,
  DocumentNode,
  DocumentBody,
  DocumentHead,
  DocumentRoot
 } from "/shared/dom.js";
var AntTrail = Component.define("AntTrail", { 
  _clear(  ){ 
    
      return this.segments.each(((s) => {
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
export { 
  AntTrail
 };
var AntTrails = System.define("AntTrails", { 
  interface:AntTrail,
  get spawnAntTrailSegment(  ){ 
    
      return require("@obstacles/entities/trail-segments.js").spawnAntTrailSegment;
    
   },
  _updateComponent( c ){ 
    
      return (function() {
        if (((c.entity.id + c.system.process.ticker.ticks) % config.trailResolution) === 0) {
          return c.segments.add(this.spawnAntTrailSegment(c.entity));
        }
      }).call(this);
    
   }
 });
export { 
  AntTrails
 };