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
 } = require("@obstacles/systems/property-view.js");
import { 
  renderChildren,
  createDocumentNode,
  DocumentNode,
  DocumentBody,
  DocumentHead,
  DocumentRoot
 } from "/shared/dom.js";
var AntsPropertyView = PropertyView.define("AntsPropertyView", { 
  
 });
var AntPanel = ViewPanel.define("AntPanel", { 
  pageSize:5,
  page:0,
  cursor:0,
  title:"Ants"
 });
export { 
  AntsPropertyView
 };
export { 
  AntPanel
 };