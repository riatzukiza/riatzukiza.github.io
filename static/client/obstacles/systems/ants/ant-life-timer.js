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
  RedBlackTree
 } = require("@shared/data-structures/trees/red-black-tree.js"),
    config = require("@obstacles/config.js");
var { 
  Timer,
  TimeLimit
 } = require("@obstacles/systems/timer.js"),
    { 
  placeEntity
 } = require("@shared/systems/collision.js"),
    config = require("@obstacles/config.js");
import { 
  renderChildren,
  createDocumentNode,
  DocumentNode,
  DocumentBody,
  DocumentHead,
  DocumentRoot
 } from "/shared/dom.js";
const views=(new Map());
var AntLife = TimeLimit.define("AntLife", { 
  duration:config.antLife,
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
        
          return createDocumentNode("div", {
            'className': "panel",
            'style': { 
              width:"48%"
             }
          }, [ createDocumentNode("div", {  }, [ "life", (() => {
          	return this.remainingTime;
          }) ]), createDocumentNode("div", {  }, [ "wins", (() => {
          	return this.winCount;
          }) ]), createDocumentNode("div", {  }, [ "losses", (() => {
          	return this.looseCount;
          }) ]) ]);
        }).call(this);
        this.views.set("view", r);
        return r;
      }
    }).call(this);
    });
  
 },
  _clear(  ){ 
    
      TimeLimit._clear.call(this);
      this.views.delete(this.entity);
      this.winCount = 0;
      return this.looseCount = 0;
    
   },
  register(  ){ 
    
      TimeLimit.register.call(this);
      this.winCount = 0;
      return this.looseCount = 0;
    
   },
  get homePos(  ){ 
    
      return require("@obstacles/entities.js").homePos;
    
   },
  get segGroup(  ){ 
    
      return require("@obstacles/entities/trail-segments.js").trailSegments;
    
   },
  callback( e,c ){ 
    
      e.positionInterface.x = this.homePos.x;
      e.positionInterface.y = this.homePos.y;
      placeEntity(e, c.system.process, config);
      for (var seg of e.antTrail.segments)
      {
      seg.trailSegment.applyInverse()
      }
      ;
      ((c.looseCount)++);
      e.antTrail.segments.clear();
      return c.reset(config.antLifeDuration);
    
   }
 });
export { 
  AntLife
 };
var AntLifeTimer = Timer.define("AntLifeTimer", { 
  get defaultDuration(  ){ 
    
      return config.antLife;
    
   },
  interface:AntLife
 });
export { 
  AntLifeTimer
 };