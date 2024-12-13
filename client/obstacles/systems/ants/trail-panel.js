var { 
  PropertyView,
  ViewPanel
 } = require("@obstacles/systems/property-view.js"),
    { 
  TrailDots
 } = require("@obstacles/systems/trail-dots.js");
var { 
  renderChildren,
  createDocumentNode,
  DocumentNode,
  DocumentBody,
  DocumentHead,
  DocumentRoot
 } = require("@shared/dom.js");
var TrailsPropertyView = PropertyView.define("TrailsPropertyView", { 
  
 });
var TrailsPanel = ViewPanel.define("TrailsPanel", { 
  get trailDots(  ){ 
    
      return this.game.systems.getBySymbol(TrailDots.symbol);
    
   },
  get visible__QUERY(  ){ 
    
      return this.trailDots.visible__QUERY;
    
   },
  get settingsView(  ){ 
    
      return createDocumentNode("div", {  }, [ createDocumentNode("button", { 'onclick': (() => {
      	
        return this.trailDots.toggleVisibility();
      
      }) }, [ (function() {
        if (this.visible__QUERY) {
          return "toggle visibility off";
        } else {
          return "toggle visiblity on";
        }
      }).call(this) ]) ]);
    
   },
  pageSize:20,
  page:0,
  cursor:0,
  title:"Trails"
 });
exports.TrailsPropertyView = TrailsPropertyView;
exports.TrailsPanel = TrailsPanel;