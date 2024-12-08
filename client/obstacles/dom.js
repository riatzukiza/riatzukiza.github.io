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
  RockPanel
 } = require("@obstacles/dom/rocks.js"),
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
const debugView=createDocumentNode("div", {
  'id': "debug-view",
  'className': "panel",
  'style': { 
    height:(config.dimensions[1] + "px"),
    width:(Math.round(((window.innerWidth * 0.2) - 24)) + "px"),
    "overflow-y":"scroll"
   }
}, []);
var container = createDocumentNode("div", { 'id': "container" }, [ gameView, debugView ]);
createDocumentNode("div", { 'id': "frame" }, [ container ]).render(DocumentRoot);
var startInterface = (function startInterface$() {
  /* start-interface eval.sibilant:42:0 */

  
});
exports.startInterface = startInterface;