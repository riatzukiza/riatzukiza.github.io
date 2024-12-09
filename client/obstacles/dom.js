var R = require("ramda");
var { 
  create,
  extend,
  mixin,
  conditional,
  cond,
  partiallyApplyAfter
 } = require("@kit-js/core/js/util");
var { 
  renderChildren,
  createDocumentNode,
  DocumentNode,
  DocumentBody,
  DocumentHead,
  DocumentRoot
 } = require("@shared/dom.js");
var { 
  rendering
 } = require("@obstacles/rendering.js"),
    { 
  ants,
  rocks,
  plants
 } = require("@obstacles/entities.js"),
    { 
  game
 } = require("@obstacles/game.js"),
    { 
  vectorPool,
  trailPool
 } = require("@shared/vectors.js"),
    { 
  Physics
 } = require("@shared/systems/physics/index.js"),
    { 
  Dot
 } = require("@shared/systems/rendering/dot.js"),
    { 
  summate
 } = require("@shared/math/math.js"),
    { 
  ViewPanel,
  PropertyView
 } = require("@obstacles/systems/property-view.js"),
    config = require("@obstacles/config.js");
var displayDecimal = (function displayDecimal$(d = this.d, n = 6) {
  /* display-decimal node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  return (Math.round((Math.pow(10, n) * d)) / Math.pow(10, n));
});
console.log("We got this from dom", { 
  game
 });
console.log("tick");
const gameView=createDocumentNode("div", {
  'id': "game-view",
  'className': "panel"
}, [ rendering.context.canvas ]);
const stats=createDocumentNode("div", { 'className': "panel" }, [ (() => {
	
  const wins=ants.group.reduce(((sum, el) => {
  	
    return (sum + (el.velocityInterface.winCount || 0));
  
  }), 0);
  const losses=ants.group.reduce(((sum, el) => {
  	
    return (sum + (el.velocityInterface.looseCount || 0));
  
  }), 0);
  return [ createDocumentNode("div", {  }, [ "Ants" ]), createDocumentNode("div", {  }, [ "count:", (() => {
  	
    return ants.size;
  
  }) ]), createDocumentNode("div", {  }, [ "elapsed:", game.ticker.elapsed ]), createDocumentNode("div", {  }, [ "total mass:", (() => {
  	
    return displayDecimal(ants.group.reduce(((sum, el) => {
    	
      return (sum + (el.physicalProperties.mass || 0));
    
    }), 0));
  
  }) ]), createDocumentNode("div", {  }, [ "wins:", (() => {
  	
    return displayDecimal(wins);
  
  }) ]), createDocumentNode("div", {  }, [ "losses:", (() => {
  	
    return displayDecimal(losses);
  
  }) ]), createDocumentNode("div", {  }, [ "win/loss:", (() => {
  	
    return displayDecimal((wins / losses));
  
  }) ]) ];

}) ]);
const poolsView=createDocumentNode("div", { 'className': "panel" }, [ createDocumentNode("h3", {  }, [ "Pools" ]), createDocumentNode("div", {  }, [ "vector buckets", (() => {
	
  return vectorPool.buckets.length;

}) ]), createDocumentNode("div", {  }, [ "trail buckets", (() => {
	
  return trailPool.buckets.length;

}) ]) ]);
const debugView=createDocumentNode("div", {
  'id': "debug-view",
  'className': "panel",
  'style': { 
    height:(config.dimensions[1] + "px"),
    width:(Math.round(((window.innerWidth * 0.2) - 24)) + "px"),
    "overflow-y":"scroll"
   }
}, [ stats, poolsView ]);
var container = createDocumentNode("div", { 'id': "container" }, [ gameView, debugView ]);
exports.container = container;
exports.gameView = gameView;
exports.debugView = debugView;
createDocumentNode("div", { 'id': "frame" }, [ container ]).render(DocumentRoot);
var startInterface = (function startInterface$() {
  /* start-interface eval.sibilant:68:0 */

  return game.events.on("tick", ((t) => {
  	
    return (function() {
      if ((t % 10) === 0) {
        stats.render();
        return poolsView.render();
      }
    }).call(this);
  
  })).once("error", ((err) => {
  	
    console.log("error on", "tick", "of", "game.events", "given", "t()");
    return console.log(err);
  
  }));
});
exports.startInterface = startInterface;