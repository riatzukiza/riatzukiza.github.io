var { 
  displayDecimal
 } = require("@obstacles/strings.js"),
    { 
  VelocityInterface,
  Velocity
 } = require("@shared/systems/velocity.js");
var { 
  renderChildren,
  createDocumentNode,
  DocumentNode,
  DocumentBody,
  DocumentHead,
  DocumentRoot
 } = require("@shared/dom.js");
const views=(new Map());
const oldClear=VelocityInterface._clear;
var VelocityInterface = VelocityInterface.define("VelocityInterface", { 
  get parentView(  ){ 
    
      return this.entity.propertyView.view;
    
   },
  get view(  ){ 
    
      return (function() {
        if (views.has(this.entity)) {
          return views.get(this.entity);
        } else {
          var r = (function() {
            /* inc/misc.sibilant:1:673 */
          
            return createDocumentNode("div", {
              'className': "panel",
              'id': ("velocity-panel" + this.entity.id),
              'style': { 
                width:"48%"
               }
            }, [ createDocumentNode("div", {  }, [ "velocity:" ]), createDocumentNode("div", {  }, [ (() => {
            	
              return displayDecimal(this.xd, 2);
            
            }), ",", (() => {
            	
              return displayDecimal(this.yd, 2);
            
            }) ]) ]).render(this.parentView);
          }).call(this);
          views.set(this.entity, r);
          return r;
        }
      }).call(this);
    
   },
  get updateView__QUERY(  ){ 
    
      return this.moved;
    
   },
  _clear(  ){ 
    
      oldClear.call(this);
      return (function() {
        if (this.trail) {
          this.winCount = 0;
          this.looseCount = 0;
          this.trail.each(((seq) => {
          	
            return seq.despawn();
          
          }));
          return this.trail = [];
        }
      }).call(this);
    
   }
 });
exports.VelocityInterface = VelocityInterface;
var Velocity = Velocity.define("Velocity", { 
  interface:VelocityInterface
 });
exports.Velocity = Velocity;