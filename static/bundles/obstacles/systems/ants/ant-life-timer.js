require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@obstacles/systems/ants/ant-life-timer.js":[function(require,module,exports){
var { 
  Timer,
  TimeLimit
 } = require("@obstacles/systems/timer.js"),
    { 
  placeEntity
 } = require("@shared/systems/collision.js"),
    config = require("@obstacles/config.js");
var AntLife = TimeLimit.define("AntLife", { 
  get duration(  ){ 
    
      return config.antLife;
    
   },
  _clear(  ){ 
    
      TimeLimit._clear.call(this);
      this.winCount = null;
      return this.looseCount = null;
    
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
},{"@obstacles/config.js":"@obstacles/config.js","@obstacles/entities.js":"@obstacles/entities.js","@obstacles/entities/trail-segments.js":"@obstacles/entities/trail-segments.js","@obstacles/systems/timer.js":"@obstacles/systems/timer.js","@shared/systems/collision.js":"@shared/systems/collision.js"}]},{},[]);
