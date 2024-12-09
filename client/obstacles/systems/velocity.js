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
var VelocityInterface = VelocityInterface.define("VelocityInterface", { 
  get parentView(  ){ 
    
      return this.entity.propertyView.view;
    
   },
  get view(  ){ 
    
      return (function() {
        if (views.has(this.entity)) {
          return views.get(this.entity);
        } else {
          return (function(value) {
            /* node_modules/kit/inc/scope.sibilant:12:9 */
          
            views.set(this.entity, value);
            return value;
          })((function() {
            /* node_modules/kit/inc/macros.sibilant:30:25 */
          
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
          }).call(this));
        }
      }).call(this);
    
   },
  get updateView__QUERY(  ){ 
    
      return this.moved;
    
   }
 });
exports.VelocityInterface = VelocityInterface;
var Velocity = Velocity.define("Velocity", { 
  interface:VelocityInterface
 });
exports.Velocity = Velocity;