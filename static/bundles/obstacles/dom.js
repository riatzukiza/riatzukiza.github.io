require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@obstacles/dom.js":[function(require,module,exports){
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
    width:(Math.round(((window.innerWidth * 0.2) - 24)) + "px"),
    "overflow-y":"scroll"
   }
}, [ createDocumentNode("div", {  }, [ createDocumentNode("b", {  }, [ "stats" ]), resetButton, stats, poolsView ]), createDocumentNode("div", {  }, [ settingsPanel ]) ]);
var container = createDocumentNode("div", { 'id': "container" }, [ gameView, debugView ]);
exports.container = container;
exports.gameView = gameView;
exports.debugView = debugView;
var startInterface = (function startInterface$() {
  /* start-interface eval.sibilant:125:0 */

  var { 
    game
   } = require("@obstacles/game.js");
  createDocumentNode("div", { 'id': "frame" }, [ container ]).render(DocumentRoot);
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
},{"@obstacles/config.js":"@obstacles/config.js","@obstacles/entities.js":"@obstacles/entities.js","@obstacles/game.js":"@obstacles/game.js","@obstacles/rendering.js":"@obstacles/rendering.js","@obstacles/systems/property-view.js":"@obstacles/systems/property-view.js","@shared/dom.js":"@shared/dom.js","@shared/math/math.js":"@shared/math/math.js","@shared/systems/physics/index.js":"@shared/systems/physics/index.js","@shared/systems/rendering/dot.js":"@shared/systems/rendering/dot.js","@shared/vectors.js":"@shared/vectors.js"}]},{},[]);
