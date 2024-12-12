require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@obstacles/systems/ants/ant-life-timer.js":[function(require,module,exports){
var { 
  Timer,
  TimeLimit
 } = require("@obstacles/systems/timer.js"),
    { 
  placeEntity
 } = require("@shared/systems/collision.js"),
    config = require("@obstacles/config.js");
var { 
  renderChildren,
  createDocumentNode,
  DocumentNode,
  DocumentBody,
  DocumentHead,
  DocumentRoot
 } = require("@shared/dom.js");
const views=(new Map());
var AntLife = TimeLimit.define("AntLife", { 
  get duration(  ){ 
    
      return config.antLife;
    
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
          
          }) ]) ]).render(this.parentView);
        }).call(this);
        this.views.set(this.entity, r);
        return r;
      }
    }).call(this);
  
 },
  _clear(  ){ 
    
      this.winCount = null;
      this.looseCount = null;
      return this.triggered = false;
    
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
      ((c.looseCount)++);
      for (var seg of e.antTrail.segments)
      {
      seg.trailSegment.applyInverse()
      }
      ;
      e.antTrail.segments.clear();
      return c.reset();
    
   }
 });
exports.AntLife = AntLife;
var AntLifeTimer = Timer.define("AntLifeTimer", { 
  interface:AntLife
 });
exports.AntLifeTimer = AntLifeTimer;
},{"@obstacles/config.js":"@obstacles/config.js","@obstacles/entities.js":"@obstacles/entities.js","@obstacles/entities/trail-segments.js":"@obstacles/entities/trail-segments.js","@obstacles/systems/timer.js":"@obstacles/systems/timer.js","@shared/dom.js":"@shared/dom.js","@shared/systems/collision.js":"@shared/systems/collision.js"}]},{},[]);
