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
  SignalField
 } = require("@obstacles/forces.js"),
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
  'className': "panel",
  'style': { 
    "background-color":"sandyBrown"
   }
}, [ rendering.context.canvas ]);
const getTotalAntMass=(() => {
	
  return displayDecimal(ants.group.reduce(((sum, el) => {
  	
    return (sum + (el.physicalProperties.mass || 0));
  
  }), 0));

});
const getAntCount=(() => {
	
  return ants.size;

});
const getWins=(() => {
	
  return ants.group.reduce(((sum, el) => {
  	
    return (sum + (el.antLife.winCount || 0));
  
  }), 0);

});
const getLosses=(() => {
	
  return ants.group.reduce(((sum, el) => {
  	
    return (sum + (el.antLife.looseCount || 0));
  
  }), 0);

});
const getStats=(() => {
	
  const wins=getWins();
  const losses=getLosses();
  return [ createDocumentNode("div", {  }, [ "Ants" ]), createDocumentNode("div", {  }, [ "count:", getAntCount ]), createDocumentNode("div", {  }, [ "elapsed:", game.ticker.elapsed ]), createDocumentNode("div", {  }, [ "total mass:", getTotalAntMass ]), createDocumentNode("div", {  }, [ "wins:", displayDecimal(wins) ]), createDocumentNode("div", {  }, [ "losses:", displayDecimal(losses) ]), createDocumentNode("div", {  }, [ "win/loss:", displayDecimal((wins / losses)) ]) ];

});
const stats=createDocumentNode("div", { 'className': "panel" }, [ getStats ]);
const getVectorBucketCount=(() => {
	
  return vectorPool.buckets.length;

});
const getTrailBucketCount=(() => {
	
  return trailPool.buckets.length;

});
const poolsView=createDocumentNode("div", { 'className': "panel" }, [ createDocumentNode("h3", {  }, [ "Pools" ]), createDocumentNode("div", {  }, [ "vector buckets", getVectorBucketCount ]), createDocumentNode("div", {  }, [ "trail buckets", getTrailBucketCount ]) ]);
const resetButton=createDocumentNode("button", { 'onclick': (() => {
	
  rocks.clear();
  ants.clear();
  plants.clear();
  return game.systems.getBySymbol(Physics.symbol).forces.each(((force) => {
  	
    return f.reset();
  
  }));

}) }, [ "Reset" ]);
const debugView=createDocumentNode("div", {
  'id': "debug-view",
  'className': "panel",
  'style': { 
    height:(config.dimensions[1] + "px"),
    width:(Math.round(((window.innerWidth * 0.2) - 24)) + "px"),
    "overflow-y":"scroll"
   }
}, [ resetButton, stats, poolsView ]);
var container = createDocumentNode("div", { 'id': "container" }, [ gameView, debugView ]);
exports.container = container;
exports.gameView = gameView;
exports.debugView = debugView;
createDocumentNode("div", { 'id': "frame" }, [ container ]).render(DocumentRoot);
var startInterface = (function startInterface$() {
  /* start-interface eval.sibilant:81:0 */

  return game.events.on("tick", ((t) => {
  	
    return (function() {
      if ((t % config.uiPollingRate) === 0) {
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