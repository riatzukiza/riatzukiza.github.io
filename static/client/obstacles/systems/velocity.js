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
  displayDecimal
 } = require("@obstacles/strings.js"),
    { 
  VelocityInterface,
  Velocity
 } = require("@shared/systems/velocity.js");
import { 
  renderChildren,
  createDocumentNode,
  DocumentNode,
  DocumentBody,
  DocumentHead,
  DocumentRoot
 } from "/shared/dom.js";
const views=(new Map());
const oldClear=VelocityInterface._clear;
var VelocityInterface = VelocityInterface.define("VelocityInterface", { 
  get parentView(  ){ 
    
      return this.entity.propertyView.view;
    
   },
  get updateView__QUERY(  ){ 
    
      return this.moved;
    
   },
  _clear(  ){ 
    
      return oldClear.call(this);
    
   },
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
            'id': ("velocity-panel" + this.entity.id),
            'style': { 
              width:"48%"
             }
          }, [ createDocumentNode("div", {  }, [ "velocity:" ]), createDocumentNode("div", {  }, [ (() => {
          	return displayDecimal(this.xd, 2);
          }), ",", (() => {
          	return displayDecimal(this.yd, 2);
          }) ]) ]);
        }).call(this);
        this.views.set("view", r);
        return r;
      }
    }).call(this);
    });
  
 }
 });
export { 
  VelocityInterface
 };
var Velocity = Velocity.define("Velocity", { 
  interface:VelocityInterface
 });
export { 
  Velocity
 };