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
  PropertyView,
  ViewPanel
 } = require("@obstacles/systems/property-view.js"),
    { 
  TrailDots
 } = require("@obstacles/systems/ants/trail-dots.js");
import { 
  renderChildren,
  createDocumentNode,
  DocumentNode,
  DocumentBody,
  DocumentHead,
  DocumentRoot
 } from "/shared/dom.js";
var TrailsPropertyView = PropertyView.define("TrailsPropertyView", { 
  
 });
var TrailsPanel = ViewPanel.define("TrailsPanel", { 
  get trailDots(  ){ 
    
      return this.game.systems.getBySymbol(TrailDots.symbol);
    
   },
  get visible__QUERY(  ){ 
    
      return this.trailDots.visible__QUERY;
    
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
  get settingsPanel(  ){ 
  
    return (() => {
    	return (function() {
      if (this.views.has("settingsPanel")) {
        return this.views.get("settingsPanel");
      } else {
        var r = (function() {
          /* eval.sibilant:11:23 */
        
          return createDocumentNode("div", { 'className': "panel" }, [ createDocumentNode("button", { 'onclick': (() => {
          	return this.trailDots.toggleVisibility();
          }) }, [ (() => {
          	return (function() {
            if (this.visible__QUERY) {
              return "visible";
            } else {
              return "hidden";
            }
          }).call(this);
          }) ]) ]);
        }).call(this);
        this.views.set("settingsPanel", r);
        return r;
      }
    }).call(this);
    });
  
 },
  pageSize:20,
  page:0,
  cursor:0,
  title:"Trails"
 });
export { 
  TrailsPropertyView
 };
export { 
  TrailsPanel
 };