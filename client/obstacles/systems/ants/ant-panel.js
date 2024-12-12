var { 
  PropertyView,
  ViewPanel
 } = require("@obstacles/systems/property-view.js");
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