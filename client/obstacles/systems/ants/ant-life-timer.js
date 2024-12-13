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
    
      this.views.delete(this.entity);
      this.winCount = 0;
      this.looseCount = 0;
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
      for (var seg of e.antTrail.segments)
      {
      seg.trailSegment.applyInverse()
      }
      ;
      ((c.looseCount)++);
      e.antTrail.segments.clear();
      return c.reset();
    
   }
 });
exports.AntLife = AntLife;
var AntLifeTimer = Timer.define("AntLifeTimer", { 
  interface:AntLife
 });
exports.AntLifeTimer = AntLifeTimer;