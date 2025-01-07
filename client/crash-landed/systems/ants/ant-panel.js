Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1121 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1183 */

  return Object.keys(this).forEach(((k) => {
  	
    return f(this[k], k);
  
  }));
});
var { 
  PropertyView,
  ViewPanel
 } = require("@crash-landed/systems/property-view.js");
var { 
  renderChildren,
  createDocumentNode,
  DocumentNode,
  DocumentBody,
  DocumentHead,
  DocumentRoot
 } = require("@shared/dom.js");
var AntsPropertyView = PropertyView.define("AntsPropertyView", { 
  
 });
var AntPanel = ViewPanel.define("AntPanel", { 
  pageSize:5,
  page:0,
  cursor:0,
  title:"Ants"
 });
exports.AntsPropertyView = AntsPropertyView;
exports.AntPanel = AntPanel;