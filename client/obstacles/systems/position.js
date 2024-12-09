var { 
  displayDecimal
 } = require("@obstacles/strings.js"),
    { 
  Position,
  PositionInterface
 } = require("@shared/systems/position.js");
var { 
  renderChildren,
  createDocumentNode,
  DocumentNode,
  DocumentBody,
  DocumentHead,
  DocumentRoot
 } = require("@shared/dom.js");
const views=(new Map());
var PositionInterface = PositionInterface.define("PositionInterface", { 
  get parentView(  ){ 
    
      return this.entity.propertyView.view;
    
   },
  get updateView__QUERY(  ){ 
    
      return (function() {
        if (this.entity.velocityInterface) {
          return this.entity.velocityInterface.updateView__QUERY;
        }
      }).call(this);
    
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
              'style': { 
                width:"48%"
               }
            }, [ createDocumentNode("div", {  }, [ "position" ]), createDocumentNode("div", {  }, [ (() => {
            	
              return displayDecimal(this.x, 2);
            
            }), ", ", (() => {
            	
              return displayDecimal(this.y, 2);
            
            }) ]) ]).render(this.parentView);
          }).call(this);
          views.set(this.entity, r);
          return r;
        }
      }).call(this);
    
   }
 });
var Position = Position.define("Position", { 
  interface:PositionInterface
 });
exports.Position = Position;
exports.PositionInterface = PositionInterface;