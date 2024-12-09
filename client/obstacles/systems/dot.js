var { 
  Interface
 } = require("@kit-js/interface");
var { 
  DotInterface
 } = require("@shared/systems/rendering/dot.js");
const views=(new Map());
var DotInterface = Interface.define("DotInterface", { 
  get parentView(  ){ 
    
      return this.entity.propertyView;
    
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
                "background-color":colorString,
                "color":"grey"
               }
            }, [ colorString ]);
          }).call(this);
          views.set(this.entity, r);
          return r;
        }
      }).call(this);
    
   },
  mouseEnter(  ){ 
    
      this.originalColor = dot.color;
      return this.color = rgba(255, 255, 0, 255);
    
   },
  mouseLeave(  ){ 
    
      return this.color = this.entity.originalColor;
    
   }
 });