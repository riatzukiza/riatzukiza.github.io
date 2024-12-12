var { 
  PropertyView,
  ViewPanel
 } = require("@obstacles/property-view.js");
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
var AntsViewPanel = ViewPanel.define("AntsViewPanel", { 
  pageSize:5,
  page:0,
  cursor:0,
  title:"Ants"
 });