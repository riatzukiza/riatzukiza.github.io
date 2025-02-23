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
import { 
  renderChildren,
  createDocumentNode,
  DocumentNode,
  DocumentBody,
  DocumentHead,
  DocumentRoot
 } from "/shared/dom.js";
var { 
  rendering
 } = require("@obstacles/rendering.js"),
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
  /* display-decimal inc/core/function-expressions.sibilant:28:8 */

  return (Math.round((Math.pow(10, n) * d)) / Math.pow(10, n));
});
const gameView=createDocumentNode("div", {
  'id': "game-view",
  'className': "panel",
  'style': { 
    "background-color":"sandyBrown"
   }
}, [ rendering.context.canvas ]);
const getStats=(() => {
	var { 
  game
 } = require("@obstacles/game.js"),
    { 
  ants,
  rocks,
  plants,
  trailSegments
 } = require("@obstacles/entities.js");
const getTotalAntMass=(() => {
	return displayDecimal(ants.group.reduce(((sum, el) => {
	return (sum + (el.physicalProperties.mass || 0));
}), 0), 2);
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
const wins=getWins();
const losses=getLosses();
return [ createDocumentNode("div", {  }, [ "Ants" ]), createDocumentNode("div", {  }, [ "count:", getAntCount ]), createDocumentNode("div", {  }, [ "latency:", game.ticker.averageLatency ]), createDocumentNode("div", {  }, [ "fps:", game.ticker.averageFps ]), createDocumentNode("div", {  }, [ "target fps:", game.ticker.fps ]), createDocumentNode("div", {  }, [ "total mass:", getTotalAntMass ]), createDocumentNode("div", {  }, [ "wins:", displayDecimal(wins) ]), createDocumentNode("div", {  }, [ "losses:", displayDecimal(losses) ]), createDocumentNode("div", {  }, [ "win/loss:", displayDecimal((wins / losses)) ]) ];
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
	var { 
  game
 } = require("@obstacles/game.js"),
    { 
  ants,
  rocks,
  plants,
  trailSegments
 } = require("@obstacles/entities.js");
rocks.clear();
ants.clear();
plants.clear();
trailSegments.clear();
return game.systems.getBySymbol(Physics.symbol).forces.each(((force) => {
	return f.reset();
}));
}) }, [ "Reset" ]);
const inputField=((label, initialInput, type, f) => {
	return createDocumentNode("div", {
  'className': "panel",
  'style': { 
    width:"49%"
   }
}, [ label, createDocumentNode("input", {
  'value': initialInput,
  'type': (type || "number"),
  'onchange': f
}, []) ]);
});
const numberInput=((label, initialInput, f) => {
	return inputField(label, initialInput, "number", f);
});
const configNumberInput=((label) => {
	return numberInput(label, config[label], ((event) => {
	return config[label] = event.target.value;
}));
});
const settingsPanel=createDocumentNode("div", { 'className': "panel" }, [ configNumberInput("angleZoom"), configNumberInput("noiseZ"), configNumberInput("fieldForce"), configNumberInput("decay"), configNumberInput("maxLength"), configNumberInput("trailResultDuration"), configNumberInput("growthRate"), configNumberInput("plantMassLimit"), configNumberInput("maxInDecay"), configNumberInput("trailLimit"), configNumberInput("antLife"), configNumberInput("antInfluence"), configNumberInput("trailResolution"), configNumberInput("stationaryResistanceCoefficiant") ]);
const debugView=createDocumentNode("div", {
  'id': "debug-view",
  'className': "panel",
  'style': { 
    height:(config.dimensions[1] + "px"),
    width:(Math.round(((window.innerWidth * 0.2) - 42)) + "px"),
    "overflow-y":"scroll"
   }
}, [ createDocumentNode("div", {  }, [ createDocumentNode("b", {  }, [ "stats" ]), resetButton, stats, poolsView ]), createDocumentNode("div", {  }, [ settingsPanel ]) ]);
var container = createDocumentNode("div", { 'id': "container" }, [ gameView, debugView ]);
export { 
  container
 };
export { 
  gameView
 };
export { 
  debugView
 };
var startInterface = (function startInterface$() {
  /* start-interface eval.sibilant:125:0 */

  var { 
    game
   } = require("@obstacles/game.js");
  createDocumentNode("div", { 'id': "frame" }, [ container ]).render(DocumentBody);
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
export { 
  startInterface
 };